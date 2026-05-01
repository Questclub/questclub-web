import SignupForm from "./signup-form";

export default function CtaSection() {
  return (
    <section
      id="cta-final"
      className="px-6 py-20 md:py-24 max-w-3xl mx-auto"
    >
      <div className="bg-gradient-to-br from-lime-400 to-lime-500 rounded-3xl p-8 md:p-14 text-bg text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          Pack Verano gratis
        </h2>
        <p className="text-bg/80 text-base md:text-lg mb-8 max-w-xl mx-auto">
          Para los primeros apuntados. Probáis la versión premium sin pagar
          y después un pack distinto gratis cada mes. Sin tarjeta, sin spam.
        </p>
        <div className="bg-bg/95 rounded-2xl p-6">
          <SignupForm variant="inverted" />
        </div>
      </div>
    </section>
  );
}
