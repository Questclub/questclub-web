import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type LimitResult = {
  success: boolean;
  remaining: number;
  limit: number;
};

let limiter: Ratelimit | null = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  // 5 intentos por IP cada 10 minutos. Suficiente para que un humano no se bloquee
  // y suficiente para frenar bots básicos.
  limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: true,
    prefix: "qc:waitlist",
  });
}

export async function checkRateLimit(identifier: string): Promise<LimitResult> {
  if (!limiter) {
    // Sin Upstash configurado, dejamos pasar (con warning una vez por proceso)
    if (process.env.NODE_ENV !== "test" && !globalThis.__qcRatelimitWarned) {
      console.warn(
        "[ratelimit] UPSTASH_REDIS_REST_URL/TOKEN no configuradas — sin rate limit"
      );
      globalThis.__qcRatelimitWarned = true;
    }
    return { success: true, remaining: 999, limit: 999 };
  }
  const res = await limiter.limit(identifier);
  return { success: res.success, remaining: res.remaining, limit: res.limit };
}

declare global {
  // eslint-disable-next-line no-var
  var __qcRatelimitWarned: boolean | undefined;
}
