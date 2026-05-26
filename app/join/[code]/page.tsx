import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/copy-button";

const INVITE_CODE_REGEX = /^[A-Z0-9]{6}$/;

type Params = { code: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { code } = await params;
  const upperCode = code.toUpperCase();

  return {
    title: `Únete a Quest Club · ${upperCode}`,
    description:
      "Abre Quest Club y únete al grupo privado de tus amigos con este enlace.",
    openGraph: {
      title: "Te han invitado a Quest Club",
      description:
        "Únete al grupo privado de tus amigos y empieza la temporada.",
      url: `https://questclub.app/join/${upperCode}`,
    },
  };
}

export default async function JoinInvitePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { code } = await params;
  const upperCode = code.toUpperCase();

  if (!INVITE_CODE_REGEX.test(upperCode)) {
    notFound();
  }

  const appLink = `questclub://join/${upperCode}`;

  return (
    <main className="flex-1 px-6 py-16 md:py-24">
      <section className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="mb-6 inline-flex rounded-full border border-lime-400/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
          Invitación privada
        </span>

        <h1 className="mb-4 text-4xl font-bold leading-[0.95] tracking-tight md:text-6xl">
          Tu grupo te espera en{" "}
          <span className="text-lime-400">Quest Club</span>
        </h1>

        <p className="mb-8 max-w-xl text-base text-text-muted md:text-lg">
          Abre la app para unirte al grupo. Si todavía no la tienes instalada,
          guarda este código y entra cuando la abras.
        </p>

        <div className="mb-8 w-full rounded-2xl border border-border bg-surface p-6 text-left md:p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
            Código del grupo
          </p>
          <div className="flex items-center gap-2 rounded-full border border-border bg-bg p-2 pl-5">
            <code className="flex-1 truncate font-mono text-2xl font-bold tracking-[0.18em] text-text">
              {upperCode}
            </code>
            <CopyButton text={upperCode} eventName="invite_code_copied" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={appLink}
            className="rounded-full bg-lime-400 px-6 py-3 text-center text-sm font-bold text-bg transition hover:bg-lime-300"
          >
            Abrir en Quest Club
          </a>
          <Link
            href="/"
            className="rounded-full border border-border bg-surface px-6 py-3 text-center text-sm font-bold text-text transition hover:border-lime-400"
          >
            Ver qué es Quest Club
          </Link>
        </div>

        <p className="mt-6 max-w-md text-sm text-text-muted">
          Los grupos son privados. Las pruebas, votos y ranking se quedan dentro
          de vuestro grupo.
        </p>
      </section>
    </main>
  );
}
