"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  type IconComponent,
} from "@/components/icons/BrandIcons";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";

const strip = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const methods: {
  Icon: IconComponent;
  label: string;
  value: string;
  href: string;
}[] = [
  {
    Icon: Mail,
    label: "Email",
    value: siteConfig.links.emailPlain,
    href: siteConfig.links.email,
  },
  {
    Icon: GithubIcon,
    label: "GitHub",
    value: strip(siteConfig.links.github),
    href: siteConfig.links.github,
  },
  {
    Icon: LinkedinIcon,
    label: "LinkedIn",
    value: strip(siteConfig.links.linkedin),
    href: siteConfig.links.linkedin,
  },
];

export function ContactPanel() {
  return (
    <Section id="contact">
      <SectionHeader
        index="07"
        eyebrow="Pick up the desk phone"
        title="Get in touch"
        description="Have a role, a project, or an idea worth building? Let's talk."
        accent="neon"
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* contact methods */}
        <Reveal>
          <div className="flex h-full flex-col gap-3">
            {methods.map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                {...(label === "Email"
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="panel group flex items-center gap-4 rounded-2xl border border-line p-4 transition-all hover:border-neon/50 hover:shadow-[0_0_28px_-12px_var(--color-neon)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-muted transition-colors group-hover:border-neon/50 group-hover:text-neon">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink">
                    {label}
                  </span>
                  <span className="block truncate font-mono text-xs text-muted">
                    {value}
                  </span>
                </span>
              </a>
            ))}

            <div className="panel mt-auto flex items-center gap-3 rounded-2xl border border-line p-4 text-sm text-muted">
              <MapPin className="h-4 w-4 shrink-0 text-mint" aria-hidden />
              Based in {siteConfig.location} — open to new opportunities.
            </div>
          </div>
        </Reveal>

        {/* contact form */}
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Frontend-only demo. Wire this to an API route, Formspree, Resend, etc.
    setSent(true);
  }

  return (
    <div className="panel relative h-full overflow-hidden rounded-2xl border border-line p-6">
      <div className="mb-5 flex items-center gap-2 font-mono text-xs text-muted">
        <span className="h-2 w-2 rounded-full bg-neon anim-blink" />
        new-message.txt
      </div>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <CheckCircle2 className="h-12 w-12 text-mint" aria-hidden />
            <h3 className="mt-4 text-lg font-semibold text-ink">
              Message ready to send
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Thanks for reaching out! This demo form is frontend-only — for now,
              the fastest way to reach me is by email.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a
                href={siteConfig.links.email}
                className="text-sm font-medium text-neon underline-offset-4 hover:underline"
              >
                {siteConfig.links.emailPlain}
              </a>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Send another
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Field id="name" label="Name">
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Ada Lovelace"
                className={inputClass}
              />
            </Field>
            <Field id="email" label="Email">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                className={inputClass}
              />
            </Field>
            <Field id="message" label="Message">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="What would you like to build?"
                className={cn(inputClass, "resize-none")}
              />
            </Field>
            <Button type="submit" className="w-full" size="lg">
              Send message
              <Send className="h-4 w-4" aria-hidden />
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-base-2/60 px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-neon/60 focus:outline-none focus:ring-2 focus:ring-neon/20";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-ink/85"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
