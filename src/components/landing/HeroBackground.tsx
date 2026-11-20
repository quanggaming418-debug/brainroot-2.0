import { useRef } from 'react';
import { HERO_DEPTH_LAYERS, type DepthLayerConfig } from '../../data/landing';
import { useHeroParallax } from '../../hooks/useHeroParallax';

interface HeroBackgroundProps {
  readonly layers?: readonly DepthLayerConfig[];
}

export function HeroBackground({ layers = HERO_DEPTH_LAYERS }: HeroBackgroundProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  useHeroParallax(sceneRef);

  return (
    <>
      <div className="scene" ref={sceneRef} aria-hidden="true">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className="scene__layer"
            data-strength={layer.strength}
          >
            <img
              src={layer.src}
              alt=""
              draggable={false}
              decoding="async"
              fetchPriority={layer.id === 'sky' ? 'high' : 'auto'}
            />
          </div>
        ))}
      </div>
      <div className="hero__mist" aria-hidden="true" />
    </>
  );
}
