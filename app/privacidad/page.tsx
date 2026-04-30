import Footer from "@/components/footer";

export const metadata = {
  title: "Política de privacidad",
  robots: { index: true, follow: true },
};

export default function Privacidad() {
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
          Política de privacidad
        </h1>
        <p className="text-text-muted mb-12">
          Última actualización: 30 abril 2026
        </p>

        <div className="prose-content space-y-8 text-text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              1. Quiénes somos
            </h2>
            <p>
              Esta web la opera <strong className="text-text">Quest Club</strong>,
              proyecto en pre-lanzamiento. Para cualquier asunto relacionado con
              tus datos puedes contactarnos en{" "}
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
              2. Qué datos recogemos
            </h2>
            <p>
              Cuando te apuntas a la lista de espera guardamos tu email, junto
              a metadatos mínimos (un hash de tu IP, fecha de alta, user-agent
              truncado y, si aplica, el código de referido que te invitó). El
              hash de IP es irreversible: lo usamos solo para detectar abuso,
              nunca podremos identificarte por él.
            </p>
            <p>No recogemos cookies de seguimiento ni perfilamos a usuarios.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              3. Para qué los usamos
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Mantenerte en la lista de espera y avisarte del lanzamiento.</li>
              <li>Enviarte el código del Pack Verano gratis si entraste antes del cierre.</li>
              <li>Notificaciones puntuales sobre temporadas y novedades del producto.</li>
            </ul>
            <p className="mt-2">
              <strong className="text-text">Base legal:</strong> tu
              consentimiento al apuntarte (Art. 6.1.a RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              4. Quién accede a tus datos
            </h2>
            <p>
              Trabajamos con dos encargados de tratamiento:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong className="text-text">Supabase</strong> (Reino
                Unido/UE) — almacena la base de datos. Cumple RGPD.
              </li>
              <li>
                <strong className="text-text">Resend</strong> (EE. UU.) —
                envía los emails. Transferencia internacional amparada por
                cláusulas contractuales tipo (SCC) y, en su caso, el marco
                Data Privacy Framework UE-EE. UU.
              </li>
            </ul>
            <p>No vendemos tus datos a terceros. Nunca lo haremos.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              5. Cuánto los guardamos
            </h2>
            <p>
              Los datos se conservan mientras estés en la lista o hasta 12
              meses después del lanzamiento, lo que ocurra antes. Si solicitas
              la baja, los borramos en un máximo de 30 días.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              6. Tus derechos
            </h2>
            <p>
              Como titular de los datos puedes ejercer en cualquier momento
              tus derechos de acceso, rectificación, supresión, oposición,
              portabilidad y limitación del tratamiento. Escríbenos a{" "}
              <a
                href="mailto:hola@questclub.app"
                className="text-lime-400 hover:underline"
              >
                hola@questclub.app
              </a>{" "}
              indicando tu petición.
            </p>
            <p>
              Si crees que no hemos atendido bien tu solicitud, puedes
              reclamar ante la Agencia Española de Protección de Datos
              (aepd.es).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">
              7. Cambios en esta política
            </h2>
            <p>
              Podemos actualizar este texto. Cuando haya cambios relevantes
              te avisaremos por email. La fecha de la última actualización
              aparece arriba del documento.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
