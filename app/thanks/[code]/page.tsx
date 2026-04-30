import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";
import ClientCopyButton from "@/components/copy-button";

const REFERRAL_CODE_REGEX = /^[A-HJ-NP-Z2-9]{8}$/;

export const dynamic = "force-dynamic";

type Params = { code: string };

type UserStats = {
  email: string;
  raw_position: number;
  effective_position: number;
  total_confirmed: number;
  referees_count: number;
  spots_jumped: number;
  referral_code: string;
};

async function getStats(code: string): Promise<UserStats | null> {
  // 1. Localizar el usuario por código
  const { data: user } = await supabaseAdmin
    .from("waitlist")
    .select("email, confirmed_at")
    .eq("referral_code", code)
    .maybeSingle();

  if (!user || !user.confirmed_at) return null;

  // 2. Obtener stats con la función SQL
  const { data: statsArr, error } = await supabaseAdmin.rpc(
    "waitlist_user_stats",
    { p_email: user.email }
  );

  if (error || !statsArr || statsArr.length === 0) {
    return null;
  }

  return statsArr[0] as UserStats;
}

export default async function ThanksPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { code } = await params;
  const upperCode = code.toUpperCase();

  if (!REFERRAL_CODE_REGEX.test(upperCode)) {
    notFound();
  }

  const stats = await getStats(upperCode);

  if (!stats) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Confirma tu email</h1>
        <p className="text-text-muted max-w-md">
          Esta plaza aún no está confirmada. Pulsa el enlace que te enviamos al
          email y vuelve aquí para ver tu posición.
        </p>
      </main>
    );
  }

  // El referral URL aparece en botones de share — debe ser absoluto y canónico.
  // En prod usamos APP_URL; en dev caemos a la URL en cuyo origin se renderiza la página.
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const protocol = h.get("x-forwarded-proto") ?? "http";
  const baseUrl =
    process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_APP_URL
      ? process.env.NEXT_PUBLIC_APP_URL
      : `${protocol}://${host}`;
  const referralUrl = `${baseUrl}/r/${stats.referral_code}`;

  return (
    <main className="flex-1 px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block text-xs uppercase tracking-widest text-lime-400 border border-lime-400/30 px-3 py-1 rounded-full mb-6">
          Estás dentro
        </span>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.95] mb-4">
          Posición{" "}
          <span className="text-lime-400">
            #{stats.effective_position.toLocaleString("es-ES")}
          </span>
        </h1>

        <p className="text-text-muted mb-12">
          de {stats.total_confirmed.toLocaleString("es-ES")} apuntados ·{" "}
          {stats.referees_count > 0 && (
            <>
              has subido{" "}
              <strong className="text-lime-400">
                {stats.spots_jumped.toLocaleString("es-ES")}
              </strong>{" "}
              puestos
            </>
          )}
          {stats.referees_count === 0 && (
            <>invita a tus amigos para subir puestos</>
          )}
        </p>

        <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 text-left mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Sube en la lista invitando amigos
          </h2>
          <p className="text-text-muted text-sm mb-6">
            Cada amigo que confirme con tu enlace te sube{" "}
            <strong className="text-lime-400">100 puestos</strong>. Cuando
            lancemos el Pack Verano, los primeros 1.000 lo reciben gratis.
          </p>

          <div className="flex items-center gap-2 bg-bg border border-border rounded-full p-2 pl-4 mb-3">
            <code className="text-text text-sm flex-1 truncate font-mono">
              {referralUrl}
            </code>
            <CopyButton text={referralUrl} />
          </div>

          <div className="flex flex-wrap gap-2">
            <ShareLink
              label="WhatsApp"
              href={`https://wa.me/?text=${encodeURIComponent(
                `Mira esto, te apuntas conmigo? ${referralUrl}`
              )}`}
            />
            <ShareLink
              label="Twitter / X"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `Me he apuntado a Quest Club. Si te apuntas con mi enlace ambos subimos puestos: ${referralUrl}`
              )}`}
            />
            <ShareLink
              label="Telegram"
              href={`https://t.me/share/url?url=${encodeURIComponent(
                referralUrl
              )}&text=${encodeURIComponent(
                "Me he apuntado a Quest Club, ¿te vienes?"
              )}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          <Stat
            label="Tu posición"
            value={`#${stats.effective_position.toLocaleString("es-ES")}`}
          />
          <Stat label="Amigos invitados" value={stats.referees_count.toString()} />
          <Stat
            label="Puestos subidos"
            value={`+${stats.spots_jumped.toLocaleString("es-ES")}`}
          />
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4">
      <div className="text-2xl font-bold text-lime-400">{value}</div>
      <div className="text-xs text-text-muted mt-1">{label}</div>
    </div>
  );
}

function ShareLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-bg border border-border hover:border-lime-400 text-text text-sm font-semibold px-4 py-2 rounded-full transition"
    >
      {label}
    </a>
  );
}

function CopyButton({ text }: { text: string }) {
  // El thanks page es server component; el botón de copiar es cliente.
  return <ClientCopyButton text={text} />;
}
