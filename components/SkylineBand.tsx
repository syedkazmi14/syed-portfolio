import Image from "next/image";

const SRC = "/skyline/skyline.webp";

/**
 * Austin and Dallas on one horizon, closing the page.
 *
 * The photo is a cut-out (sky removed by `npm run gen:skyline`) and gets the
 * same treatment as the SC300 backdrop: grayscale, then a `multiply` layer of
 * the site green masked to the image itself, at low opacity, so it reads as a
 * duotone wash rather than a photograph. The tint layer is masked with the
 * same file the <Image> shows, using the same cover/bottom placement, so the
 * two always line up.
 *
 * `cover` + `bottom` means a wide screen shows the whole horizon and a phone
 * crops in on the middle, where Austin hands over to Dallas. A gradient mask
 * fades the two ends so the row never stops on a hard vertical edge.
 *
 * The skyline is opaque to the lattice behind it: a solid ground-coloured
 * silhouette sits under the tinted photo.
 *
 * Purely atmospheric: `aria-hidden`, no alt text.
 */
export function SkylineBand({ opacity = 0.5 }: { opacity?: number }) {
  const fade =
    "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)";
  // The same file, placed the same way, as a mask.
  const cutout = {
    maskImage: `url(${SRC})`,
    WebkitMaskImage: `url(${SRC})`,
    maskSize: "cover",
    WebkitMaskSize: "cover",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center bottom",
    WebkitMaskPosition: "center bottom",
  } as const;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      {/*
        A solid ground-coloured copy of the silhouette, so the skyline stands
        in front of the jali lattice rather than letting it show through the
        buildings. It sits outside the low-opacity layer below on purpose.
      */}
      <div className="absolute inset-0 bg-ground" style={cutout} />

      <div className="absolute inset-0" style={{ opacity }}>
        <Image
          src={SRC}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom grayscale"
        />
        <div
          className="absolute inset-0 bg-green mix-blend-multiply"
          style={cutout}
        />
      </div>
    </div>
  );
}
