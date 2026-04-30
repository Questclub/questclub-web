const FAQS = [
  {
    q: "¿Cuándo sale?",
    a: "1 de julio de 2026 en App Store y Google Play. Avisamos por email a quien esté apuntado.",
  },
  {
    q: "¿Es gratis?",
    a: "Sí, hay un pack gratuito al mes. Los packs de temporada cuestan entre 2,99 € y 4,99 €. Pase anual con todos: 14,99 €.",
  },
  {
    q: "¿Quién ve mis fotos?",
    a: "Solo los miembros de tu grupo. Nada se publica fuera. Ni en feeds, ni en stories, ni en perfiles públicos.",
  },
  {
    q: "¿Tengo que subir nada a Instagram?",
    a: "No. Es un juego privado entre vosotros. Si queréis compartir algo afuera, lo descargáis y subís donde queráis.",
  },
  {
    q: "¿Edad mínima?",
    a: "18 años. La app pide verificación de edad antes de jugar.",
  },
  {
    q: "¿Retos picantes?",
    a: "El catálogo oficial es seguro y compatible con cualquier grupo (familia, curro, lo que sea). Si tu grupo quiere meter caña, lo añadís vosotros como misiones custom.",
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
