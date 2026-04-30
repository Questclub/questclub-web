const STEPS = [
  {
    n: "01",
    t: "Monta tu grupo",
    d: "4 a 8 colegas, código de 6 letras, se unen por WhatsApp en 30 segundos.",
  },
  {
    n: "02",
    t: "Desbloquea el pack",
    d: "Verano, Halloween, Navidad, San Valentín… Un pack nuevo cada 6-8 semanas.",
  },
  {
    n: "03",
    t: "Misión, prueba, ranking",
    d: "Foto o vídeo, tus amigos votan, gana quien se moje.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center tracking-tight">
        Cómo funciona
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="bg-surface border border-border rounded-2xl p-6"
          >
            <div className="text-lime-400 font-mono text-sm mb-3">{s.n}</div>
            <div className="font-bold text-xl mb-2">{s.t}</div>
            <div className="text-text-muted text-sm leading-relaxed">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
