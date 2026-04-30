const FAQS = [
  {
    q: "¿Cuándo sale?",
    a: "1 de julio de 2026 en App Store y Google Play. Avisamos por email a los apuntados.",
  },
  {
    q: "¿Cuánto cuesta jugar?",
    a: "Cero. Crear grupo y vuestras misiones es gratis para siempre. Los packs temáticos cuestan 2,99-4,99 € si queréis ahorraros el curro de inventarlas, o gratis si esperáis al pack del mes que rota. Pase anual con todos: 14,99 €.",
  },
  {
    q: "¿Y para qué sirven los packs entonces?",
    a: "Para no inventaros 30 misiones cada temporada. Cada pack tiene tema (Verano = playa/viajes, Halloween = sustos/disfraces, Navidad = familia/regalos…), va curado por nosotros y se queda en vuestro grupo para siempre. Si os mola, lo desbloqueáis. Si no, jugáis con las vuestras.",
  },
  {
    q: "¿Quién ve mis fotos?",
    a: "Solo tu grupo. Cero feed, cero stories, cero perfil público.",
  },
  {
    q: "¿Tengo que subir nada a Instagram?",
    a: "No. Es un juego privado entre vosotros. Si queréis sacar algo afuera, lo descargáis y subís donde os apetezca.",
  },
  {
    q: "¿Edad mínima?",
    a: "18 años. La app pide verificación al instalar.",
  },
  {
    q: "¿Retos picantes?",
    a: "El catálogo oficial es seguro y compatible con cualquier grupo (familia, curro, lo que sea). Picante lo añadís vosotros como misiones custom.",
  },
];

export default function Faq() {
  return (
    <section className="px-6 py-20 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center tracking-tight">
        Preguntas rápidas
      </h2>
      <div className="space-y-3">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="bg-surface border border-border rounded-xl p-5 group"
          >
            <summary className="font-bold cursor-pointer flex justify-between items-center list-none">
              {f.q}
              <span className="text-lime-400 text-2xl font-light transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="text-text-muted mt-3 text-sm leading-relaxed">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
