import { AboutSection } from '../components/landing/AboutSection';
import { EcosystemSection } from '../components/landing/EcosystemSection';
import { HeroSection } from '../components/landing/HeroSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <EcosystemSection />
      <AboutSection />
    </>
  );
}
