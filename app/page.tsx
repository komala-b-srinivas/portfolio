import Navbar from "@/components/Navbar";
import NeuralScrollScene from "@/components/NeuralScrollScene";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)" }}>
      <Navbar />

      {/* Scroll-driven neural network hero — 500vh */}
      <NeuralScrollScene />

      {/* Static content sections */}
      <div style={{ position: "relative", zIndex: 20, background: "var(--bg)" }}>
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </div>
    </main>
  );
}
