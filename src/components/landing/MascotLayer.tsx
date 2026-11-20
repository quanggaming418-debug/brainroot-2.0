import {
  HERO_LEAVES,
  HERO_MASCOTS,
  type LeafAssetConfig,
  type MascotAssetConfig,
} from '../../data/landing';

interface MascotLayerProps {
  readonly mascots?: readonly MascotAssetConfig[];
  readonly leaves?: readonly LeafAssetConfig[];
}

export function MascotLayer({
  mascots = HERO_MASCOTS,
  leaves = HERO_LEAVES,
}: MascotLayerProps) {
  return (
    <>
      {leaves.map((leaf) => (
        <img
          key={leaf.id}
          className={leaf.className}
          src={leaf.src}
          alt=""
          aria-hidden="true"
          draggable={false}
          decoding="async"
        />
      ))}

      {mascots.map((mascot) => (
        <div
          key={mascot.id}
          className={mascot.className}
          aria-hidden="true"
        >
          <img
            src={mascot.src}
            alt=""
            draggable={false}
            decoding="async"
          />
        </div>
      ))}
    </>
  );
}
