declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    ticks?: number;
    gravity?: number;
    drift?: number;
    colors?: string[];
    shapes?: ('square' | 'circle')[];
    scalar?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    disableForReducedMotion?: boolean;
  }

  function confetti(options?: ConfettiOptions): void;

  export default confetti;
}
