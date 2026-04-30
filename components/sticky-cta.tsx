"use client";

import { useEffect, useState } from "react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Aparece después de pasar el hero (~700px en mobile)
      setVisible(window.scrollY > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-0 inset-x-0 md:hidden z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-bg/95 backdrop-blur border-t border-border px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-text leading-tight">
            Pack Verano gratis
          </div>
          <div className="text-xs text-text-muted leading-tight">
            Para los primeros apuntados
          </div>
        </div>
        <button
          type="button"
          onClick={scrollTop}
          className="bg-lime-400 text-bg font-bold px-5 py-2.5 rounded-full text-sm shrink-0"
        >
          Apúntate
        </button>
      </div>
    </div>
  );
}
