import { RegistrationProvider } from "@/components/RegistrationContext";
import Topbar from "@/components/Topbar";
import LetterHero from "@/components/LetterHero";
import AskSection from "@/components/AskSection";
import MissionStrip from "@/components/MissionStrip";
import RegisterSection from "@/components/RegisterSection";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import StickyCta from "@/components/StickyCta";

export default function Home() {
  return (
    <RegistrationProvider>
      <Topbar />
      <main id="top">
        <LetterHero />
        <Reveal id="details" className="ask">
          <AskSection />
        </Reveal>
        <Reveal className="mission-strip">
          <MissionStrip />
        </Reveal>
        <Reveal id="register" className="register">
          <RegisterSection />
        </Reveal>
        <Partners />
        <Footer />
      </main>
      <StickyCta />
    </RegistrationProvider>
  );
}
