import json
import os
import urllib.parse
import urllib.request
import socket
import boto3
from botocore.exceptions import ClientError
import smtplib
from email.message import EmailMessage

# Opcional: reducir tiempos de espera en sockets (evita Lambdas colgadas)
socket.setdefaulttimeout(5)

RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"
RECAPTCHA_SECRET = os.getenv("RECAPTCHA_SECRET", "")
# Nombre o ARN de la Lambda que envía emails (debe existir) -> para el vendor
EMAIL_DISPATCHER_FUNCTION_NAME = os.getenv("EMAIL_DISPATCHER_FUNCTION_NAME", "")

# Cliente Lambda para invocar la función de envío de emails (vendor)
lambda_client = boto3.client("lambda")


def _response(status: int, body: dict):
    """HTTP API v2 response helper."""
    return {
        "statusCode": status,
        "headers": {
            "Content-Type": "application/json; charset=utf-8"
        },
        "body": json.dumps(body, ensure_ascii=False)
    }


def _parse_event_body(event):
    """Extrae el JSON del body (HTTP API v2). Maneja base64 si aplica."""
    if "body" not in event or event["body"] in (None, ""):
        return None

    body_raw = event["body"]
    if event.get("isBase64Encoded"):
        import base64
        body_raw = base64.b64decode(body_raw).decode("utf-8", errors="replace")

    try:
        return json.loads(body_raw)
    except json.JSONDecodeError:
        return None


def _get_remote_ip(event) -> str | None:
    # En HTTP API v2, el IP del cliente suele venir en requestContext.http.sourceIp
    return (
        event.get("requestContext", {})
             .get("http", {})
             .get("sourceIp")
    )


def verify_recaptcha(token: str, remoteip: str | None = None) -> tuple[bool, dict]:
    """Valida el token de reCAPTCHA con Google."""
    if not RECAPTCHA_SECRET:
        return False, {"error": "RECAPTCHA_SECRET not configured in environment"}

    data = {
        "secret": RECAPTCHA_SECRET,
        "response": token
    }
    if remoteip:
        data["remoteip"] = remoteip

    encoded = urllib.parse.urlencode(data).encode("utf-8")
    req = urllib.request.Request(
        RECAPTCHA_VERIFY_URL,
        data=encoded,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )

    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
            ok = bool(payload.get("success", False))
            return ok, payload
    except Exception as e:
        return False, {"error": f"recaptcha_verification_failed: {e.__class__.__name__}: {e}"}


def _invoke_email_dispatcher(payload: dict, invocation_type: str = "RequestResponse", timeout_seconds: int = 10) -> dict:
    """
    Invoca la Lambda email-dispatcher y devuelve un dict con la respuesta parseada.
    invocation_type: "RequestResponse" (sync) o "Event" (async)
    """
    if not EMAIL_DISPATCHER_FUNCTION_NAME:
        return {"error": "EMAIL_DISPATCHER_FUNCTION_NAME not configured"}

    try:
        resp = lambda_client.invoke(
            FunctionName=EMAIL_DISPATCHER_FUNCTION_NAME,
            InvocationType=invocation_type,
            Payload=json.dumps(payload).encode("utf-8")
        )

        # Si es invocación asíncrona, AWS devuelve 202 y payload vacío
        if invocation_type == "Event":
            return {"ok": True, "invocation": "async", "status_code": resp.get("StatusCode")}

        # RequestResponse -> leer payload
        stream = resp.get("Payload")
        if stream is None:
            return {"error": "No payload returned from dispatcher", "raw_resp": resp}

        raw = stream.read().decode("utf-8")
        try:
            parsed = json.loads(raw) if raw else {}
        except Exception:
            parsed = {"raw": raw}

        # Si la función que llamaste devuelve un cuerpo HTTP (por ejemplo _api_response),
        # puede venir como string con keys statusCode/body -> intentamos extraer body si existe
        if isinstance(parsed, dict) and "statusCode" in parsed and "body" in parsed:
            try:
                body = json.loads(parsed.get("body") or "{}")
                return body
            except Exception:
                return {"raw_dispatcher_response": parsed}

        return parsed

    except ClientError as e:
        return {"error": "lambda_invoke_client_error", "detail": str(e)}
    except Exception as e:
        return {"error": "lambda_invoke_error", "detail": f"{e.__class__.__name__}: {e}"}

def _send_customer_ack_via_zoho(to_email: str, name: str, project_type: str, message: str) -> dict:
    """
    Envía un correo de agradecimiento al cliente usando Zoho SMTP con plantilla HTML.
    """
    if not to_email:
        return {"ok": False, "error": "missing_recipient_email"}

    host = os.getenv("ZOHO_SMTP_HOST", "smtp.zoho.com")
    port = int(os.getenv("ZOHO_SMTP_PORT", "465"))
    user = os.getenv("ZOHO_SMTP_USER", "admin@orbit.com.mx")
    password = os.getenv("ZOHO_SMTP_PASS", "")

    from_email = os.getenv("ZOHO_FROM_EMAIL", user)
    from_name = os.getenv("ZOHO_FROM_NAME", "Orbit Studio")

    if not user or not password or not from_email:
        return {
            "ok": False,
            "error": "zoho_smtp_not_configured",
            "details": {
                "ZOHO_SMTP_USER": bool(user),
                "ZOHO_SMTP_PASS": bool(password),
                "ZOHO_FROM_EMAIL": bool(from_email),
            }
        }

    # 🔥 Plantilla HTML (tu código tal cual)
    html = f"""
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Orbit — Gracias por contactarnos</title>

    <!-- Dejamos que el cliente aplique light/dark -->
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">

  </head>
  <body style="
    margin:0;
    padding:0;
    background-color:#f2f4fa;
    font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
  ">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f4fa; padding:24px 0;">
      <tr>
        <td align="center">
          <!-- Card principal -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="
            max-width:540px;
            background-color:#ffffff;
            border-radius:14px;
            overflow:hidden;
            box-shadow:0 18px 45px rgba(0,0,0,0.08);
          ">

            <tr>
              <td>
                <!-- Barra superior con gradiente (clara) -->
                <div style="
                  width:100%;
                  height:4px;
                  background:linear-gradient(135deg,#8a5fd3 0%, #6c7df0 100%);
                "></div>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px 24px 32px; text-align:center;">            
                <!-- Logo Orbit -->
                <img 
                  src="https://www.orbit.com.mx/img/logos/orbit-color.png"
                  alt="Orbit" 
                  width="120"
                  style="display:block; margin:0 auto 16px auto;"
                />

                <!-- Título -->
                <h2 style="
                  margin:0 0 12px 0;
                  color:#1f2937;
                  font-size:22px;
                  font-weight:700;
                  letter-spacing:-0.03em;
                ">
                  ¡Gracias por contactarnos!
                </h2>

                <!-- Texto principal -->
                <p style="
                  margin:0 0 8px 0;
                  color:#4b5563;
                  font-size:14px;
                  line-height:1.6;
                ">
                  Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará
                  y te responderá a la brevedad.
                </p>

                <p style="
                  margin:0 0 16px 0;
                  color:#4b5563;
                  font-size:14px;
                  line-height:1.6;
                ">
                  Si necesitas algo adicional, por favor escríbenos a 
                  <b style="color:#1f2937;">contacto@orbit.com.mx</b>.
                </p>

                <!-- Botón / CTA -->
                <a
                  href="https://www.orbit.com.mx"
                  style="
                    display:inline-block;
                    margin-top:4px;
                    padding:10px 22px;
                    border-radius:999px;
                    background:linear-gradient(135deg,#7d3fb9 0%, #5d5fe9 100%);
                    color:#ffffff;
                    font-size:14px;
                    font-weight:600;
                    text-decoration:none;
                  "
                >
                  Visitar orbit.com.mx
                </a>

                <!-- Firma -->
                <p style="
                  margin:20px 0 0 0;
                  color:#6b7280;
                  font-size:13px;
                  line-height:1.6;
                ">
                  Atentamente,<br/>
                  <strong style="color:#1f2937;">Equipo Orbit</strong>
                </p>
              </td>
            </tr>

            <!-- Separador -->
            <tr>
              <td style="padding:0 32px;">
                <hr style="
                  border:none;
                  border-top:1px solid rgba(0,0,0,0.08);
                  margin:12px 0 0 0;
                " />
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:10px 32px 18px 32px; text-align:center;">
                <small style="
                  color:#9ca3af;
                  font-size:11px;
                  line-height:1.4;
                ">
                  © 2025 Orbit. Todos los derechos reservados.
                </small>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    """

    # Configurar email
    from email.message import EmailMessage
    msg = EmailMessage()
    msg["Subject"] = "¡Gracias por contactarnos!"
    msg["From"] = f"{from_name} <{from_email}>"
    msg["To"] = to_email

    # Ponemos HTML como cuerpo principal
    msg.set_content("Tu cliente no soporta HTML.")  # fallback
    msg.add_alternative(html, subtype="html")

    try:
        import smtplib
        with smtplib.SMTP_SSL(host, port, timeout=10) as server:
            server.login(user, password)
            server.send_message(msg)

        return {"ok": True, "transport": "zoho_smtp", "host": host, "port": port}

    except Exception as e:
        return {
            "ok": False,
            "error": "zoho_smtp_send_failed",
            "detail": f"{e.__class__.__name__}: {e}"
        }

def handler(event, context):
    # 1) Parseo del body
    body = _parse_event_body(event)
    if body is None:
        return _response(400, {"ok": False, "error": "Invalid or empty JSON body"})

    # 2) Honeypot: _hp debe venir vacío
    hp = body.get("_hp", "")
    if hp != "":
        return _response(400, {"ok": False, "error": "honeypot_triggered"})

    # 3) Token de reCAPTCHA
    token = body.get("recaptchaToken")
    if not token or not isinstance(token, str):
        return _response(400, {"ok": False, "error": "missing recaptchaToken"})

    remote_ip = _get_remote_ip(event)
    valid, details = verify_recaptcha(token, remoteip=remote_ip)
    if not valid:
        return _response(400, {"ok": False, "error": "invalid_recaptcha", "details": details})

    # ---- Validación avanzada reCAPTCHA v3 ----
    expected_action = os.getenv("RECAPTCHA_EXPECTED_ACTION", "contact_form_submit")
    expected_host = os.getenv("RECAPTCHA_EXPECTED_HOSTNAME", "www.orbit.com.mx")
    min_score = float(os.getenv("RECAPTCHA_MIN_SCORE", "0.5"))  # valor recomendado 0.5

    # 1️⃣ Acción
    action = details.get("action")
    if expected_action and action != expected_action:
        return _response(400, {
            "ok": False,
            "error": "recaptcha_action_mismatch",
            "details": {"expected": expected_action, "got": action}
        })

    # 2️⃣ Score mínimo
    score = details.get("score")
    if score is None or score < min_score:
        return _response(400, {
            "ok": False,
            "error": "low_recaptcha_score",
            "details": {"score": score, "min_score": min_score}
        })

    # 3️⃣ Dominio esperado
    hostname = details.get("hostname")
    if expected_host and hostname != expected_host:
        return _response(400, {
            "ok": False,
            "error": "recaptcha_hostname_mismatch",
            "details": {"expected": expected_host, "got": hostname}
        })

    # 4️⃣ Token reciente (menos de 2 minutos)
    from datetime import datetime, timezone
    ts = details.get("challenge_ts")
    try:
        if ts:
            issued = datetime.fromisoformat(ts.replace("Z", "+00:00"))
            age = (datetime.now(timezone.utc) - issued).total_seconds()
            if age > 120:
                return _response(400, {
                    "ok": False,
                    "error": "recaptcha_token_expired",
                    "details": {"age_seconds": age}
                })

    except Exception as e:
        # Captura otros errores por seguridad — devuelve 400 y logea
        print("Unexpected error validating challenge_ts:", repr(e), "details:", details)
        return _response(400, {
            "ok": False,
            "error": "recaptcha_timestamp_validation_error",
            "details": {"exception": f"{e.__class__.__name__}: {e}"}
        })

    # 4) Preparar payloads para email-dispatcher
    name = body.get("name", "")
    email = body.get("email", "")
    phone = body.get("phone", "")
    project_type = body.get("projectType", "")
    message = body.get("message", "")

    # Payload para vendor (usa template VendorNotifyTemplate; dispatcher usará VENDOR_EMAIL desde env)
    vendor_payload = {
        "template": "VendorNotifyTemplate",
        "name": name,
        "email": email,
        "phone": phone,
        "projectType": project_type,
        "message": message
    }

    # 5) Invocar dispatcher - primero al vendedor (sync, vía Lambda existente)
    vendor_result = _invoke_email_dispatcher(vendor_payload, invocation_type="RequestResponse")

    # Si el dispatcher devolvió un error grave, lo retornamos
    if vendor_result.get("error"):
        return _response(500, {"ok": False, "stage": "vendor_send_failed", "detail": vendor_result})

    # 6) Enviar ack al cliente usando Zoho SMTP
    customer_result = _send_customer_ack_via_zoho(email, name, project_type, message)

    if not customer_result.get("ok"):
        # Ya notificamos al vendor, pero reportamos el fallo del ack
        return _response(500, {
            "ok": False,
            "stage": "customer_send_failed",
            "detail": customer_result,
            "vendor_result": vendor_result
        })

    # 7) Todo OK
    return _response(200, {
        "ok": True,
        "message": "validated_and_emails_sent",
        "vendor_result": vendor_result,
        "customer_result": customer_result
    })
