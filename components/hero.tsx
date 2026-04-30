import SignupForm from "./signup-form";
import Counter from "./counter";

type Props = {
  refCode?: string;
  /** Mostrar mensaje de "te invitó un amigo" cuando hay refCode. */
  showReferralBadge?: boolean;
};

export default function Hero({ refCode, showReferralBadge = false }: Props) {
  return (
    <section className="px-6 pt-16 pb-20 md:pt-24 md:pb-28 max-w-4xl mx-auto text-center">
      <span className="inline-block text-xs uppercase tracking-widest text-lime-400 border border-lime-400/30 px-3 py-1 rounded-full mb-6">
        Lanzamiento verano 2026 · iOS + Android
      </span>

      {showReferralBadge && refCode && (
        <div className="mb-6 inline-block bg-lime-400/10 border border-lime-400/30 text-lime-400 text-sm rounded-full px-4 py-2">
          🎁 Te ha invitado un amigo · plaza prioritaria
        </div>
      )}

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
        Tu grupo de amigos
        <br />
        <span className="text-lime-400">contra el mundo.</span>
      </h1>

      <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10">
        Quest Club convierte cualquier finde, viaje o fiesta en un juego real.
        Misiones, pruebas, votaciones, y un ranking que os seguirá toda la
        vida.
      </p>

      <SignupForm refCode={refCode} />

      <Counter />
    </section>
  );
}
