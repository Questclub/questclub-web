import { notFound } from "next/navigation";
import Hero from "@/components/hero";
import { supabaseAdmin } from "@/lib/supabase";

const REFERRAL_CODE_REGEX = /^[A-HJ-NP-Z2-9]{8}$/;

export const dynamic = "force-dynamic";

type Params = { code: string };

export default async function ReferralLandingPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { code } = await params;
  const upperCode = code.toUpperCase();

  if (!REFERRAL_CODE_REGEX.test(upperCode)) {
    notFound();
  }

  // Validamos que el código exista y esté confirmado para mostrar el badge.
  const { data } = await supabaseAdmin
    .from("waitlist")
    .select("referral_code")
    .eq("referral_code", upperCode)
    .not("confirmed_at", "is", null)
    .maybeSingle();

  // Si no existe o no está confirmado, mostramos hero genérico (no rompemos el flow)
  const validReferral = !!data;

  return (
    <main className="flex-1">
      <Hero
        refCode={validReferral ? upperCode : undefined}
        showReferralBadge={validReferral}
      />
    </main>
  );
}
