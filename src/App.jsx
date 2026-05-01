import Header from './components/Header';
import Aurora from './components/Aurora';
import Hero from './components/Hero';
import About from './components/pages/About';
import Services from './components/pages/Services';
import Skills from './components/pages/Skill';
import Experience from './components/pages/Experience';
import Project from './components/pages/Project';
import Contact from './components/pages/ContactMe';
import Footer from './components/pages/Footer';

export default function App() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Aurora background */}
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#d946ef", "#763aba", "#6366f1"]} speed={0.5} amplitude={0.5} />
      </div>

      <Header />

      {/* Page content */}
      <div className="relative z-10 pt-20">
        <Hero />
      </div>
      <div className="relative z-10">
        <About />
        <Services />
        <Skills />
        <Experience />
        <Project />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}