import Footer from "@/components/footer";

export const metadata = {
  title: "Términos y condiciones",
  robots: { index: true, follow: true },
};

export default function Terminos() {
  return (
    <>
      <main className="flex-1 px-6 py-16 md:py-20 max-w-3xl mx-auto">
        <a
          href="/"
          className="text-sm text-text-muted hover:text-lime-400 transition"
        >
          ← Volver al inicio
        </a>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-6 mb-2">
          Términos y condiciones
        </h1>
        <p className="text-text-muted mb-12">
          Última actualización: 30 abril 2026
        </p>

        <div className="space-y-8 text-text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              1. Quién opera el servicio
            </h2>
            <p>
              <strong className="text-text">Quest Club</strong> opera esta web
              como página de pre-lanzamiento. Contacto:{" "}
              <a
                href="mailto:hola@questclub.app"
                className="text-lime-400 hover:underline"
              >
                hola@questclub.app
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              2. Qué se ofrece
            </h2>
            <p>
              La web permite registrarte en una lista de espera para recibir
              comunicaciones sobre el lanzamiento de la app Quest Club, así
              como un código del Pack Verano gratuito sujeto a disponibilidad.
              Apuntarte no implica obligación alguna de descargar la app
              cuando se publique.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              3. Edad mínima
            </h2>
            <p>
              El servicio está dirigido a personas mayores de 18 años. Al
              registrarte declaras tener al menos esa edad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              4. Tratamiento de datos
            </h2>
            <p>
              Tu email y los metadatos asociados se procesan según la{" "}
              <a
                href="/privacidad"
                className="text-lime-400 hover:underline"
              >
                Política de privacidad
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              5. Modificaciones del servicio
            </h2>
            <p>
              Podemos modificar, suspender o discontinuar partes del servicio
              en cualquier momento. El acceso al Pack Verano gratis se
              concederá por orden de registro válido y confirmado, hasta
              agotar las plazas que comuniquemos públicamente. Nos
              reservamos el derecho de ajustar el número de plazas o el
              contenido del pack según las necesidades del lanzamiento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              6. Limitación de responsabilidad
            </h2>
            <p>
              Esta web está en pre-lanzamiento. No garantizamos disponibilidad
              continua, ausencia de errores ni que la app final se publique en
              la fecha indicada. Quest Club no se hace responsable de daños
              derivados de la imposibilidad de uso del servicio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              7. Ley aplicable y jurisdicción
            </h2>
            <p>
              Estos términos se rigen por la legislación española. Para
              cualquier disputa relacionada con el servicio, las partes se
              someten a los juzgados y tribunales del domicilio del usuario,
              cuando éste actúe como consumidor.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              8. Cambios en estos términos
            </h2>
            <p>
              Podemos actualizar este texto en cualquier momento. La fecha de
              la última actualización aparece arriba.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
