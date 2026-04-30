import { z } from "zod";

const REFERRAL_CODE_REGEX = /^[A-HJ-NP-Z2-9]{8}$/; // sin 0,O,1,I,L (ver schema_waitlist.sql)

export const joinSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Email no válido")
    .max(255, "Email demasiado largo"),

  ref: z
    .string()
    .trim()
    .toUpperCase()
    .regex(REFERRAL_CODE_REGEX, "Código de referido inválido")
    .optional()
    .or(z.literal("").transform(() => undefined)),

  source: z
    .enum([
      "organic",
      "tiktok",
      "instagram",
      "twitter",
      "threads",
      "referral",
      "other",
    ])
    .default("organic"),

  turnstileToken: z.string().min(1, "Verificación anti-spam requerida"),
});

export type JoinInput = z.infer<typeof joinSchema>;
