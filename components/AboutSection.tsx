import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { awards } from "@/data/awards";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";

const stats = [
  { value: `${projects.length}`, label: "Projects shipped" },
  { value: `${experience.length}`, label: "Roles held" },
  { value: `${awards.length}`, label: "Awards won" },
];

const facts = [
  { Icon: GraduationCap, text: "B.S. Computer Science — UT Dallas, Spring 2026" },
  { Icon: MapPin, text: siteConfig.location },
  { Icon: Sparkles, text: "AI · Full-stack · Cloud · Hardware" },
];

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeader
        index="06"
        eyebrow="About the engineer"
        title="About"
        accent="neon"
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* identity rail */}
        <Reveal>
          <div className="panel rounded-2xl border border-line p-6">
            {/*
              Replace this monogram tile with a real photo:
              <img src="/me.jpg" alt="Syed Kazmi" className="h-24 w-24 rounded-2xl object-cover" />
            */}
            <div className="grid h-24 w-24 place-items-center rounded-2xl border border-neon/30 bg-gradient-to-br from-neon/15 to-iris/15">
              <span className="text-gradient text-3xl font-bold tracking-tight">
                SK
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
              {siteConfig.name}
            </h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Building AI-powered systems
            </p>

            <ul className="mt-6 space-y-3 border-t border-line pt-5">
              {facts.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-ink/85">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-neon" aria-hidden />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* prose + stats */}
        <Reveal delay={0.1} className="flex flex-col justify-center">
          <p className="text-pretty text-xl font-medium leading-relaxed text-ink sm:text-2xl">
            Syed Kazmi is a Computer Science student at The University of Texas
            at Dallas graduating Spring 2026. He builds AI-powered applications,
            full-stack products, backend systems, and cloud-connected tools.
          </p>
          <p className="mt-5 text-pretty leading-relaxed text-muted">
            His experience spans software engineering, IT infrastructure,
            hardware troubleshooting, computer vision, and hackathon-winning
            product development — from board-level repair with an oscilloscope
            to enterprise agentic-AI platforms. He cares about systems that are
            both deeply engineered and genuinely polished end to end.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="panel rounded-2xl border border-line p-5 text-center"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="text-gradient block text-3xl font-bold tracking-tight sm:text-4xl">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
