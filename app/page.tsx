import Hero from "@/components/hero";
import GroupGate from "@/components/group-gate";
import Countdown from "@/components/countdown";
import HowItWorks from "@/components/how-it-works";
import AppPreview from "@/components/app-preview";
import Seasons from "@/components/seasons";
import Missions from "@/components/missions";
import Founders from "@/components/founders";
import Faq from "@/components/faq";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";
import StickyCTA from "@/components/sticky-cta";

// El Counter en el hero lee desde Supabase en cada request.
// Cuando lleguemos a >5k visitas/día consideraremos cachear con
// unstable_cache + revalidate, pero por ahora el coste es trivial.
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <GroupGate />
        <Countdown />
        <HowItWorks />
        <AppPreview />
        <Seasons />
        <Missions />
        <Founders />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
