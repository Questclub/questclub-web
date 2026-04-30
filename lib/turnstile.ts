const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type VerifyResult = {
  success: boolean;
  errorCodes?: string[];
};

export async function verifyTurnstile(
  token: string,
  ip?: string
): Promise<VerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (!globalThis.__qcTurnstileWarned) {
      console.warn(
        "[turnstile] TURNSTILE_SECRET_KEY no configurada — aceptando sin verificar"
      );
      globalThis.__qcTurnstileWarned = true;
    }
    return { success: true };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip) body.append("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };
    return {
      success: data.success === true,
      errorCodes: data["error-codes"],
    };
  } catch (err) {
    console.error("[turnstile] verify failed", err);
    return { success: false, errorCodes: ["network-error"] };
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __qcTurnstileWarned: boolean | undefined;
}
