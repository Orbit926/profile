import json, os, base64
import boto3
from botocore.exceptions import ClientError

SES_REGION     = os.getenv("SES_REGION", "us-east-1")
FROM_EMAIL     = os.getenv("FROM_EMAIL")
ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN", "*")
VENDOR_EMAIL   = os.getenv("VENDOR_EMAIL")

TEMPLATES = {
    "ContactAckTemplate": {
        "required": ["email"],
        "to_mode": "payload",
        "to_key": "email",
        "whitelist": [],
    },
    "VendorNotifyTemplate": {
        "required": ["name", "email", "phone", "projectType", "message"],
        "to_mode": "env",
        "env_key": "VENDOR_EMAIL",
        "whitelist": ["name", "email", "phone", "projectType", "message"],
    },
}

ses = boto3.client("sesv2", region_name=SES_REGION)

# -----------------------------
# Helpers
# -----------------------------
def _api_response(code, body):
    """Respuesta con CORS para API Gateway."""
    return {
        "statusCode": code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
            "Access-Control-Allow-Methods": "OPTIONS,POST",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
        "body": json.dumps(body),
    }

def _normalize_event_to_data(event):
    """
    Acepta:
      - HTTP API (v2 o v1) con body (string JSON, quizá base64)
      - Dict directo (invocación de otra Lambda) con keys nivel raíz
    Devuelve: (data_dict, is_http) donde is_http=True si viene de API Gateway.
    """
    # 1) API Gateway HTTP v2
    if isinstance(event, dict) and "requestContext" in event and isinstance(event.get("body"), (str, type(None))):
        is_http = True
        body = event.get("body")
        if body is None:
            return None, True  # HTTP sin body => 400 después
        if event.get("isBase64Encoded"):
            body = base64.b64decode(body).decode("utf-8")
        try:
            data = json.loads(body)
            return data, True
        except Exception:
            return "__INVALID_JSON__", True

    # 2) API Gateway REST (v1) con httpMethod
    if isinstance(event, dict) and "httpMethod" in event and isinstance(event.get("body"), (str, type(None))):
        is_http = True
        body = event.get("body")
        if body is None:
            return None, True
        if event.get("isBase64Encoded"):
            body = base64.b64decode(body).decode("utf-8")
        try:
            data = json.loads(body)
            return data, True
        except Exception:
            return "__INVALID_JSON__", True

    # 3) Invocación directa de Lambda: esperamos un dict ya usable
    if isinstance(event, dict):
        # Si ya trae 'template' o campos requeridos, úsalo tal cual
        return event, False

    # 4) Cualquier otro caso
    return "__INVALID_EVENT__", False

def _send_templated_email(data):
    """
    Lógica pura: valida, arma TemplateData y envía por SES.
    data: dict con al menos {"template": "<name>", ...}
    Devuelve dict {"ok": True, "messageId": "..."} o {"error": "..."}
    """
    template_name = (data.get("template") or "").strip()
    tpl = TEMPLATES.get(template_name)
    if not tpl:
        return {"error": "Unknown template"}

    missing = [f for f in tpl["required"] if not str(data.get(f) or "").strip()]
    if missing:
        return {"error": f"Missing fields: {', '.join(missing)}"}

    if not FROM_EMAIL:
        return {"error": "FROM_EMAIL not configured"}

    # Resolver destinatario
    if tpl["to_mode"] == "payload":
        to_email = (data.get(tpl["to_key"]) or "").strip()
        if not to_email:
            return {"error": f"Missing destination field '{tpl['to_key']}'"}
    elif tpl["to_mode"] == "env":
        env_key = tpl["env_key"]
        to_email = os.getenv(env_key, "").strip()
        if not to_email:
            return {"error": f"{env_key} not configured"}
    else:
        return {"error": "Invalid template routing"}

    # Construir TemplateData seguro
    if template_name == "ContactAckTemplate":
        safe_payload = {"supportEmail": FROM_EMAIL}
    else:
        whitelist = tpl.get("whitelist", [])
        safe_payload = {k: data.get(k, "") for k in whitelist}

    template_data = json.dumps(safe_payload)

    # Enviar por SES
    try:
        resp = ses.send_email(
            FromEmailAddress=FROM_EMAIL,
            Destination={"ToAddresses": [to_email]},
            Content={"Template": {"TemplateName": template_name, "TemplateData": template_data}},
            ReplyToAddresses=[FROM_EMAIL],
        )
        return {"ok": True, "messageId": resp.get("MessageId")}
    except ClientError as e:
        print("SES error:", str(e))
        return {"error": "SES error", "detail": str(e)}

# -----------------------------
# Handlers
# -----------------------------
def lambda_handler(event, context):
    """
    - Si viene de API Gateway (v1/v2), responde con formato HTTP (CORS).
    - Si viene de otra Lambda (dict directo), devuelve dict simple sin CORS.
    """
    data, is_http = _normalize_event_to_data(event)

    if is_http:
        # Soporte preflight
        method = (event.get("requestContext", {}).get("http", {}).get("method")
                  or event.get("httpMethod", "POST")).upper()
        if method == "OPTIONS":
            return _api_response(200, {"ok": True})

        if data is None:
            return _api_response(400, {"error": "Missing body"})
        if data == "__INVALID_JSON__":
            return _api_response(400, {"error": "Invalid JSON"})
        if data == "__INVALID_EVENT__":
            return _api_response(400, {"error": "Invalid event"})

        result = _send_templated_email(data)
        if "ok" in result:
            return _api_response(200, result)
        # Diferencia errores de cliente (400) vs servidor (500)
        client_errors = ("Unknown template", "Missing fields", "Missing destination field")
        if any(result.get("error", "").startswith(e) for e in client_errors):
            return _api_response(400, result)
        return _api_response(500, result)

    # Invocación directa (otra Lambda)
    if data in ("__INVALID_JSON__", "__INVALID_EVENT__", None):
        return {"error": "Invalid event"}
    result = _send_templated_email(data)
    # Aquí devolvemos dict simple, útil para await en otra Lambda
    return result
