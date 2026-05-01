import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/dashboard-auth";

export const runtime = "nodejs";

export async function POST() {
  await clearAuthCookie();
  return NextResponse.json({ ok: true });
}
