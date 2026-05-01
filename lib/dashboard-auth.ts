import { cookies } from "next/headers";

const COOKIE_NAME = "qc_dash_session";
const SALT = "qc-dashboard-v1";

/** Hash sha256 hex usando Web Crypto (compatible edge + node). */
async function sha256(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getExpectedToken(): Promise<string | null> {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) return null;
  return sha256(`${password}|${SALT}`);
}

/** Comprueba si la cookie del request coincide con el hash esperado. */
export async function isAuthenticated(): Promise<boolean> {
  const expected = await getExpectedToken();
  if (!expected) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return token === expected;
}

/** Setea cookie HTTP-only firmada con hash del password. */
export async function setAuthCookie(): Promise<void> {
  const expected = await getExpectedToken();
  if (!expected) throw new Error("DASHBOARD_PASSWORD no configurada");
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) return false;
  return password === expected;
}
