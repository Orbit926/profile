export async function sendContactForm({
  formData,
  executeRecaptcha,
  endpointURL,
}) {
  try {
    if (!executeRecaptcha) {
      return { ok: false, error: "recaptcha_not_ready" };
    }

    // 1) Token de reCAPTCHA
    const recaptchaToken = await executeRecaptcha("contact_form_submit");

    // 2) Payload final
    const payload = {
      ...formData,
      _hp: "", // honeypot obligatorio
      recaptchaToken,
    };

    // 3) POST al API Gateway
    const res = await fetch(`${endpointURL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: json?.error ?? "request_failed",
        details: json,
      };
    }

    // Todo bien
    return { ok: true, data: json };
  } catch (err) {
    console.error("sendContactForm error:", err);
    return { ok: false, error: "network_or_unexpected", details: err };
  }
}
