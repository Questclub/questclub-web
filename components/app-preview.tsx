import Image, { type StaticImageData } from "next/image";
import inicio from "@/public/mockups/inicio.png";
import mision from "@/public/mockups/mision.png";
import ranking from "@/public/mockups/ranking.png";

/**
 * 3 mockups full-screen de la app, servidos vía next/image para
 * que Next aplique compresión, lazy-load, srcset responsive y
 * placeholder blur. Resuelve el "no se ve el producto" que los 3
 * LLM-reviewers señalaron como el mayor leak de conversión.
 */
export default function AppPreview() {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-3 text-center tracking-tight">
        Así se juega
      </h2>
      <p className="text-text-muted text-center mb-12 max-w-xl mx-auto">
        Misión, prueba, votación, ranking. Todo dentro del grupo. Cero feed
        público, cero stories.
      </p>
      <div className="grid md:grid-cols-3 gap-6 md:gap-10 items-end">
        <Mockup
          src={inicio}
          alt="Pantalla de inicio de QuestClub mostrando el grupo Los Salvajes con 6 miembros, el Pack Verano desbloqueado al 12/30 y la próxima misión Recread una portada de disco en la playa."
          caption="El grupo · pack activo · próxima misión"
        />
        <Mockup
          src={mision}
          alt="Pantalla de detalle de misión: Recread una portada de disco en la playa, con descripción, criterios para ganar y opciones de subir foto o vídeo."
          caption="Misión · cómo ganar · sube tu prueba"
          delay={1}
        />
        <Mockup
          src={ranking}
          alt="Pantalla de ranking del grupo Los Salvajes con podio de Clara, Mario y Lucía, votación abierta y posición actual del usuario."
          caption="Ranking de grupo · votación en curso"
          delay={2}
        />
      </div>
    </section>
  );
}

function Mockup({
  src,
  alt,
  caption,
  delay = 0,
}: {
  src: StaticImageData;
  alt: string;
  caption: string;
  delay?: number;
}) {
  return (
    <div
      className="flex flex-col items-center"
      style={{ animationDelay: `${delay * 80}ms` }}
    >
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        sizes="(min-width: 768px) 33vw, 90vw"
        quality={85}
        className="w-full h-auto max-w-[320px] drop-shadow-[0_20px_60px_rgba(132,204,22,0.08)]"
      />
      <p className="text-text-muted text-sm text-center mt-4 max-w-[260px]">
        {caption}
      </p>
    </div>
  );
}
