import { cn } from "@/lib/utils";

interface AmbientBackgroundProps {
  className?: string;
  /** Show the drifting blueprint grid. */
  grid?: boolean;
  /** Extra glow blobs for hero / feature areas. */
  intense?: boolean;
}

/**
 * Pure-CSS ambient room lighting: blueprint grid + soft radial glows.
 * Sits behind content as an absolutely-positioned, non-interactive layer.
 */
export function AmbientBackground({
  className,
  grid = true,
  intense = false,
}: AmbientBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {grid ? (
        <div className="absolute inset-0 bg-grid grid-mask opacity-70" />
      ) : null}

      {/* cyan monitor glow, upper-center */}
      <div
        className="absolute left-1/2 top-[-10%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px]"
        style={{ background: "var(--color-neon)" }}
      />
      {/* violet ambient, left */}
      <div
        className="absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full opacity-[0.10] blur-[130px]"
        style={{ background: "var(--color-iris)" }}
      />

      {intense ? (
        <>
          {/* amber heat, right */}
          <div
            className="absolute -right-32 top-1/2 h-[30rem] w-[30rem] rounded-full opacity-[0.10] blur-[130px]"
            style={{ background: "var(--color-heat)" }}
          />
          {/* mint floor bounce, bottom */}
          <div
            className="absolute bottom-[-15%] left-1/3 h-[28rem] w-[40rem] rounded-full opacity-[0.07] blur-[130px]"
            style={{ background: "var(--color-mint)" }}
          />
        </>
      ) : null}

      {/* top + bottom vignettes */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-base to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-base to-transparent" />
    </div>
  );
}
