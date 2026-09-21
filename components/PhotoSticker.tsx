import Image from "next/image";

/**
 * A small photo tucked into the corner of a section, like a sticker stuck to
 * the page behind the content.
 *
 * Distinct from `SectionBackdrop`, which is a full-bleed wash. Use this when a
 * photo should read as an object on the page rather than as the page's
 * background — a section-sized photo of something personal reads as wallpaper
 * and swamps the type.
 *
 * Same grayscale + green multiply treatment as the backdrop so the two sit in
 * the same world. Decorative: `aria-hidden`, no alt.
 */
export function PhotoSticker({
  src,
  width = 300,
  rotate = -3,
  opacity = 0.2,
  aspect = 4 / 3,
  cutout = false,
  tint = true,
  className = "",
}: {
  src: string;
  /** Rendered width in px. */
  width?: number;
  rotate?: number;
  opacity?: number;
  /** Width / height. Set this to the artwork's own ratio for a cutout. */
  aspect?: number;
  /**
   * True when the source has a transparent background. The green tint is then
   * masked to the artwork itself — otherwise it paints a tinted rectangle
   * behind a cut-out subject.
   */
  cutout?: boolean;
  /**
   * Grayscale + green wash. On by default, and right for a rectangular photo
   * — the frame gives it structure. Turn it OFF for a cut-out: with no
   * rectangle, desaturating and tinting collapses the subject into an
   * unreadable silhouette. A cut-out reads better in its own colours, muted
   * by opacity alone.
   */
  tint?: boolean;
  /** Placement utilities, e.g. "bottom-0 right-6". */
  className?: string;
}) {
  const height = Math.round(width / aspect);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 hidden sm:block ${className}`}
      style={{ width, height, opacity, transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={src}
          alt=""
          fill
          sizes={`${width}px`}
          className={`${tint ? "grayscale" : ""} ${cutout ? "object-contain" : "object-cover"}`}
        />
        {tint ? (
        <div
          className="absolute inset-0 bg-green mix-blend-multiply"
          style={
            cutout
              ? {
                  maskImage: `url(${src})`,
                  WebkitMaskImage: `url(${src})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }
              : undefined
          }
        />
        ) : null}
      </div>
    </div>
  );
}
