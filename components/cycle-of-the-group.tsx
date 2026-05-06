// Bridge entre el feed de IG (carruseles, vídeos) y la landing.
// Reusa el lenguaje de "5 frases que matan cualquier plan" + "Cómo muere un grupo".
// Antes de "Cómo funciona": primero verbalizar el dolor, luego el producto.

const STEPS = [
  { kind: "quote" as const, text: '"ya veremos"' },
  { kind: "stat" as const, big: "147", small: "mensajes" },
  { kind: "stat" as const, big: "0", small: "decisiones" },
  { kind: "quote" as const, text: '"al final no puedo, sorry"' },
  { kind: "quote" as const, text: '"vamos hablando"', muted: true },
  { kind: "end" as const, text: "el grupo muere." },
];

export default function CycleOfTheGroup() {
  return (
    <section className="px-6 py-24 md:py-32 max-w-2xl mx-auto">
      <div className="text-center mb-14">
        <div className="text-xs uppercase tracking-widest text-lime-400 font-mono mb-3">
          Esto siempre pasa
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          El ciclo de cualquier
          <br />
          grupo de amigos.
        </h2>
      </div>

      <ol className="space-y-3">
        {STEPS.map((s, i) => (
          <li key={i}>
            <StepItem step={s} />
            {i < STEPS.length - 1 && <Arrow />}
          </li>
        ))}
      </ol>

      <div className="border-t border-border mt-16 pt-16 text-center">
        <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          Quest Club{" "}
          <span className="text-lime-400">rompe el ciclo.</span>
        </h3>
        <p className="text-text-muted text-sm md:text-base mt-4 max-w-md mx-auto">
          Misiones reales que obligan al grupo a moverse.
          Antes de que el chat muera del todo.
        </p>
      </div>
    </section>
  );
}

type Step =
  | { kind: "quote"; text: string; muted?: boolean }
  | { kind: "stat"; big: string; small: string }
  | { kind: "end"; text: string };

function StepItem({ step }: { step: Step }) {
  if (step.kind === "quote") {
    return (
      <div
        className={`bg-surface border border-border rounded-2xl rounded-bl-sm px-5 py-3 max-w-xs ${
          step.muted ? "opacity-50" : ""
        }`}
      >
        <span className="text-text text-base md:text-lg">{step.text}</span>
      </div>
    );
  }
  if (step.kind === "stat") {
    return (
      <div className="flex items-baseline gap-3 px-2">
        <span className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight">
          {step.big}
        </span>
        <span className="text-text-muted text-base md:text-lg">
          {step.small}
        </span>
      </div>
    );
  }
  // end
  return (
    <div className="flex items-baseline px-2">
      <span className="text-2xl md:text-3xl font-bold text-rose-400 tracking-tight">
        {step.text}
      </span>
    </div>
  );
}

function Arrow() {
  return (
    <div className="text-text-muted/50 text-sm font-mono pl-3 py-1 select-none">
      ↓
    </div>
  );
}
