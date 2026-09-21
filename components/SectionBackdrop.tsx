import Image from "next/image";

/**
 * A photograph sitting far behind a section's content.
 *
 * Desaturated to grayscale and then tinted with the site green via a
 * `multiply` layer, so a photo reads as a duotone wash on the cream ground
 * rather than as a picture competing with the type. A gradient mask fades it
 * out at the edges so sections blend rather than ending on a hard line.
 *
 * `fit` matters: use "cover" for ordinary photographs, and "contain" for
 * die-cut cutouts with transparent backgrounds (the SC300) — cover would crop
 * a square cutout to its middle and lose the subject.
 *
 * Purely atmospheric: `aria-hidden`, no alt text, never the sole carrier of
 * meaning. Keep `opacity` low — above ~0.18 the body copy starts to suffer.
 */
export function SectionBackdrop({
  src,
  opacity = 0.13,
  position = "center",
  fit = "cover",
}: {
  src: string;
  opacity?: number;
  /** object-position, e.g. "center", "top", "50% 30%". */
  position?: string;
  fit?: "cover" | "contain";
}) {
  const mask =
    fit === "contain"
      ? "linear-gradient(to right, transparent, #000 18%, #000 100%)"
      : "linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent)";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ opacity, maskImage: mask, WebkitMaskImage: mask }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className={`grayscale ${fit === "contain" ? "object-contain" : "object-cover"}`}
        style={{ objectPosition: position }}
      />
      {/*
        Tints the grayscale photo green. `contain` cutouts keep their
        transparency, so the tint is masked to the image itself rather than
        filling the whole box.
      */}
      <div
        className="absolute inset-0 bg-green mix-blend-multiply"
        style={
          fit === "contain"
            ? {
                maskImage: `url(${src})`,
                WebkitMaskImage: `url(${src})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: position,
                WebkitMaskPosition: position,
              }
            : undefined
        }
      />
    </div>
  );
}
