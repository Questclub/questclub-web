import { NextRequest, NextResponse } from "next/server";
import { setAuthCookie, verifyPassword } from "@/lib/dashboard-auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const password = body.password ?? "";
  if (!verifyPassword(password)) {
    // Pequeño delay para mitigar brute-force ingenuo
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json({ error: "Invalid" }, { status: 401 });
  }

  await setAuthCookie();
  return NextResponse.json({ ok: true });
}
