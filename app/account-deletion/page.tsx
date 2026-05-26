import Footer from "@/components/footer";

export const metadata = {
  title: "Eliminar cuenta",
  robots: { index: true, follow: true },
};

export default function AccountDeletion() {
  return (
    <>
      <main className="flex-1 px-6 py-16 md:py-20 max-w-3xl mx-auto">
        <a href="/" className="text-sm text-text-muted hover:text-lime-400 transition">
          ← Volver al inicio
        </a>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-6 mb-2">
          Eliminar cuenta
        </h1>
        <p className="text-text-muted mb-12">
          Puedes solicitar la eliminación de tu cuenta de Quest Club desde la app o por email.
        </p>

        <div className="space-y-8 text-text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-text mb-2">Desde la app</h2>
            <ol className="list-decimal list-inside space-y-1">
              <li>Abre Quest Club con tu cuenta.</li>
              <li>Ve a Perfil → Ajustes.</li>
              <li>Pulsa Eliminar cuenta.</li>
              <li>Envía el email prellenado desde el correo asociado a tu cuenta.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">Por email</h2>
            <p>
              También puedes escribir a{" "}
              <a href="mailto:privacy@questclub.app" className="text-lime-400 hover:underline">
                privacy@questclub.app
              </a>{" "}
              con el asunto “Eliminar cuenta Quest Club” desde el email de tu cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">Qué se elimina</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Tu perfil de usuario.</li>
              <li>Tus pruebas subidas y datos personales asociados.</li>
              <li>Tokens de notificaciones vinculados a tu cuenta.</li>
            </ul>
            <p className="mt-2">
              Algunos datos agregados o registros técnicos pueden conservarse sin identificarte o durante
              el tiempo necesario por seguridad y obligaciones legales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text mb-2">Plazo</h2>
            <p>
              Procesamos las solicitudes de eliminación en un máximo de 30 días.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
