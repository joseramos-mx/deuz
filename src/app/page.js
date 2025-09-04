import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import AboutSection from "@/components/About";
import ValuesGrid from "@/components/Values";
import ServicesSection from "@/components/Services";
import QuoteWizard from "@/components/Quotes";
import GroupMarquees from "@/components/GroupMarquees";
import ProjectsCarousel from "@/components/Projects";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <AboutSection />
      <GroupMarquees />
      <ValuesGrid />
      <ServicesSection />
      <QuoteWizard />
      <ProjectsCarousel />
      
    </div>
  );
}
