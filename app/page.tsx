import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSkills from "@/components/AboutSkills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* Dot-grid background */}
      <div className="neural-grid" />

      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <AboutSkills />

      {/* Skills section anchor redirect */}
      <div id="skills" style={{ position: "relative", top: "-80px" }} />

      <Experience />
      <Contact />
      <ChatbotWidget />
    </main>
  );
}
