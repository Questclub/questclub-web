import { Resend } from "resend";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Por defecto usamos el sender genérico de Resend hasta que verifiquemos questclub.app
export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Quest Club <onboarding@resend.dev>";
