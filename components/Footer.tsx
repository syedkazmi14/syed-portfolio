import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Cat } from "@/components/marginalia";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

const social = [
  { label: "GitHub", href: siteConfig.links.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedinIcon, external: true },
  { label: "Email", href: siteConfig.links.email, Icon: MailIcon, external: false },
];

export function Footer() {
  return (
    /*
     * The width constraint sits on the inner container rather than the
     * <footer> itself, so the jali band underneath can run edge to edge.
     */
    <footer id="contact" className="mt-20 w-full sm:mt-28">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12">
        {/* Spacing tuned for a footer with no heading — it opens straight
            on the email row. */}
        <div className="border-t border-rule pt-10">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={siteConfig.links.email}
              className="font-mono text-base text-green underline decoration-rule underline-offset-[6px] transition-colors hover:text-green-deep hover:decoration-green"
            >
              {siteConfig.links.emailPlain}
            </a>

            <ul className="flex items-center gap-2">
              {social.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="grid h-11 w-11 place-items-center rounded-sm border border-rule text-muted transition-colors hover:border-green hover:text-green"
                  >
                    <Icon className="h-[1.05rem] w-[1.05rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 flex flex-col gap-2 border-t border-rule-soft pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.location}
            </p>
            <div className="flex items-center gap-3">
              <p className="font-mono">Next.js · TypeScript · Tailwind</p>
              {/*
                Syed's cat mark. It used to link to /cats; that page is gone,
                so this is decoration now — kept because the drawing is his and
                the colophon is the last place the site shows any personality.
              */}
              <Cat aria-hidden className="h-5 w-[1.4rem] text-rule" />
            </div>
          </div>
        </div>
      </div>

      {/*
        The jali resolves. Everything above has run on a 5% lattice; here it
        comes up to strength at double the tile, below the colophon rather
        than behind it, and the cats sit at the very bottom edge.
      */}
      <div className="relative mt-14 h-52 w-full overflow-hidden sm:h-64">
        <div aria-hidden className="jali-resolve absolute inset-0" />

        {/*
          Height-constrained rather than width-constrained, so the slot takes
          any photo Syed drops in — portrait or landscape — without spilling
          past the band or being cropped.
        */}
        <div className="absolute bottom-0 left-1/2 flex h-[9.5rem] -translate-x-1/2 items-end sm:h-[13rem]">
          <Image
            src={siteConfig.footerPhoto.src}
            alt={siteConfig.footerPhoto.alt}
            width={siteConfig.footerPhoto.width}
            height={siteConfig.footerPhoto.height}
            sizes="(max-width: 640px) 60vw, 26rem"
            className="h-full w-auto object-contain object-bottom"
          />
        </div>
      </div>
    </footer>
  );
}
