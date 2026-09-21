import { siteConfig } from "@/data/site";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

const social = [
  { label: "GitHub", href: siteConfig.links.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedinIcon, external: true },
  { label: "Email", href: siteConfig.links.email, Icon: MailIcon, external: false },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto mt-28 w-full max-w-6xl px-6 pb-16 sm:mt-40 sm:px-12"
    >
      <div className="border-t border-rule pt-12">
        {/*
          Factual only: Syed confirmed he is at UT Dallas through December 2026.
          He has NOT told me his job-search status, so this deliberately makes
          no claim about availability. Swap in a call to action once he does.
        */}
        <h2 className="max-w-xl font-display text-4xl leading-[1.12] sm:text-5xl">
          Graduating <span className="text-green">December 2026</span>.
          <br />
          Say hello.
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
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
          <p className="font-mono">Next.js · TypeScript · Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
