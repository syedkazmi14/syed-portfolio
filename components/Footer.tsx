import { siteConfig } from "@/data/site";
import { Cat } from "@/components/marginalia";
import { SkylineBand } from "@/components/SkylineBand";
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
                Syed's cat mark, now the back-to-top control.

                A plain <a href="#top"> rather than a button calling
                scrollTo: the HTML spec makes "top" the one fragment that
                needs no matching element — with no `id="top"` in the
                document the browser scrolls to the start of it. So this
                works with scripting off, keeps the footer a server
                component, and the smooth scroll comes from the
                `scroll-behavior` already on <html>.
              */}
              <a
                href="#top"
                aria-label="Back to top"
                data-cursor-label="Back to top"
                className="text-rule transition-colors hover:text-green"
              >
                <Cat aria-hidden className="h-5 w-[1.4rem]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*
        The jali resolves. Everything above has run on a 5% lattice; here it
        comes up to strength at double the tile, below the colophon rather
        than behind it, and the Austin and Dallas skylines stand along the
        bottom edge.
      */}
      <div className="relative mt-14 h-52 w-full sm:h-64">
        {/* Reaches up 3.5rem (the band's own margin) so the lattice begins
            fading in right under the copyright line, not below a blank gap. */}
        <div aria-hidden className="jali-resolve absolute inset-x-0 -top-14 bottom-0" />

        <SkylineBand />
      </div>
    </footer>
  );
}
