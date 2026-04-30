const STEPS = [
  {
    n: "01",
    t: "Crea el grupo",
    d: "Hasta 30 personas. Código de 6 letras, en WhatsApp se unen en 30 segundos. Gratis.",
  },
  {
    n: "02",
    t: "Misiones a medida",
    d: "Las escribís vosotros, o desbloqueáis un pack curado por temporada (Verano, Halloween, Navidad…).",
  },
  {
    n: "03",
    t: "Foto, voto, ranking",
    d: "Subes prueba, vota el grupo, suma puntos. El ranking dura toda la vida del grupo.",
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
