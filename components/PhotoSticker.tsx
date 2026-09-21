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
  className = "",
}: {
  src: string;
  /** Rendered width in px. Height follows a 4:3 crop. */
  width?: number;
  rotate?: number;
  opacity?: number;
  /** Placement utilities, e.g. "bottom-0 right-6". */
  className?: string;
}) {
  const height = Math.round((width * 3) / 4);

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
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-green mix-blend-multiply" />
      </div>
    </div>
  );
}
