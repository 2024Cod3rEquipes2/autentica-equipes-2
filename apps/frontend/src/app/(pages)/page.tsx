import Features from "../components/landingPage/Features";
import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import HeroSection from "../components/landingPage/HeroSection";
import Pagina from "../components/landingPage/Pagina";

export default function Home() {
  return (
    <Pagina>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Features />
      </main>
      <Footer />
    </Pagina>
  );
}
