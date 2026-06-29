import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { InfoCards } from './InfoCards';
import { Features } from './Features';
import { Pricing } from './Pricing';
import { BottomCTA } from './BottomCTA';
import { Footer } from './Footer';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <InfoCards />
      <Features />
      <Pricing />
      <BottomCTA />
      <Footer />
    </div>
  );
}
