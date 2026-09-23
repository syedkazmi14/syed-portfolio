import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A row that reveals a faint photograph behind its text on hover.
 *
 * The image sits at opacity 0 and fades to ~0.16 — enough to read as a
 * photograph without ever competing with the type on a cream ground. It is
 * `pointer-events-none` and `aria-hidden`: purely atmospheric, never the only
 * carrier of information.
 *
 * `group-has-[:focus-visible]` mirrors the hover state so keyboard users
 * tabbing to the row's links get the same feedback. It is not `focus-within`:
 * the drawer hands focus back to the row it opened from, and after a mouse
 * click that would pin the photo on until focus moved to another tile.
 *
 * With no `image` the row simply renders flat — which is what the experience
 * entries do until real photos land for them.
 */
export function HoverTile({
  image,
  children,
  className = "",
  intensity = 0.16,
}: {
  image?: string;
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  return (
    <div className={`group relative isolate ${className}`}>
      {image ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-0 transition-opacity duration-[220ms] ease-out group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-cover"
            style={{ opacity: intensity }}
          />
          {/* Keeps text legible over the busier parts of a photo. */}
          <div className="absolute inset-0 bg-gradient-to-r from-ground via-ground/40 to-transparent" />
        </div>
      ) : null}
      {children}
    </div>
  );
}
