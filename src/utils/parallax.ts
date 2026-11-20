export const PARALLAX_MAX_SCROLL_Y = 360;
export const PARALLAX_AMPLITUDE = 0.06;
export const PARALLAX_BASE_SCALE = 1.032;
export const PARALLAX_MOBILE_BREAKPOINT = 720;

export interface ParallaxEligibilityInput {
  readonly viewportWidth: number;
  readonly prefersReducedMotion: boolean;
}

/**
 * Determines whether subtle scroll-based parallax should be active.
 * Disabled on mobile viewports (<= 720px) and when prefers-reduced-motion is set.
 */
export function shouldEnableParallax({
  viewportWidth,
  prefersReducedMotion,
}: ParallaxEligibilityInput): boolean {
  if (prefersReducedMotion) {
    return false;
  }
  return viewportWidth > PARALLAX_MOBILE_BREAKPOINT;
}

/**
 * Computes conservative vertical parallax travel (in px) for a depth layer.
 * Bounded under 12px to prevent exposing soft horizontal-mask seams.
 */
export function computeParallaxOffset(scrollY: number, strength: number): number {
  const clampedY = Math.min(Math.max(scrollY, 0), PARALLAX_MAX_SCROLL_Y);
  const clampedStrength = Math.min(Math.max(strength, 0), 0.55);
  return Number((clampedY * clampedStrength * PARALLAX_AMPLITUDE).toFixed(2));
}

/**
 * Builds the GPU-accelerated CSS transform for a depth layer.
 */
export function getLayerTransform(scrollY: number, strength: number): string {
  const offsetY = computeParallaxOffset(scrollY, strength);
  return `translate3d(0, ${offsetY}px, 0) scale(${PARALLAX_BASE_SCALE})`;
}
