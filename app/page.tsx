import Navbar from "@/components/Navbar";
import NeuralScrollScene from "@/components/NeuralScrollScene";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      <div className="neural-grid" />
      <Navbar />

      <NeuralScrollScene />

      <div style={{ position: "relative", zHeight: 2, paddingBottom: "100px" }}>
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </div>
      
      <ChatbotWidget />
    </main>
  );
}
