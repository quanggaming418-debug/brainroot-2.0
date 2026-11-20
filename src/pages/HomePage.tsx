import { GardenTransitionBand } from '../components/garden/GardenPrimitives';
import { AboutSection } from '../components/landing/AboutSection';
import { EcosystemSection } from '../components/landing/EcosystemSection';
import { FeaturedGreenPlaySection } from '../components/landing/FeaturedGreenPlaySection';
import { HeroSection } from '../components/landing/HeroSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <GardenTransitionBand />
      <EcosystemSection />
      <FeaturedGreenPlaySection />
      <AboutSection />
    </>
  );
}
