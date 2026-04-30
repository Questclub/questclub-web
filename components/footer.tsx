export default function Footer() {
  return (
    <footer className="border-t border-border mt-12 px-6 py-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        <div>
          <div className="text-xl font-bold mb-2">Quest Club</div>
          <p className="text-text-muted text-sm max-w-xs">
            Convertid lo siguiente que hagáis juntos en algo legendario.
            Verano 2026.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-text-muted">
          <a
            href="https://tiktok.com/@questclub.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lime-400 transition"
          >
            TikTok @questclub.app
          </a>
          <a
            href="https://instagram.com/questclub.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lime-400 transition"
          >
            Instagram @questclub.app
          </a>
          <a
            href="https://threads.net/@questclub.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lime-400 transition"
          >
            Threads @questclub.app
          </a>
          <a
            href="mailto:hola@questclub.app"
            className="hover:text-lime-400 transition"
          >
            hola@questclub.app
          </a>
        </div>

        <div className="flex flex-col gap-2 text-sm text-text-muted">
          <a href="/privacidad" className="hover:text-lime-400 transition">
            Privacidad
          </a>
          <a href="/terminos" className="hover:text-lime-400 transition">
            Términos
          </a>
          <span className="text-text-muted">© 2026 Quest Club</span>
        </div>
      </div>
    </footer>
  );
}
