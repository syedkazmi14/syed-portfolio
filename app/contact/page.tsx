import type { Metadata } from "next";
import { PageShell, Subhead } from "@/components/PageShell";
import { AboutIntro } from "@/components/AboutSection";
import { ContactPanel } from "@/components/ContactPanel";

export const metadata: Metadata = {
  title: "About & Contact",
  description:
    "About Syed Kazmi and how to get in touch — email, GitHub, LinkedIn, and a message form.",
};

export default function ContactPage() {
  return (
    <PageShell
      accent="neon"
      eyebrow="// the desk phone"
      title="Get in touch"
      description="A bit about me, and the fastest ways to reach me."
    >
      <AboutIntro />

      <div className="mt-20">
        <Subhead
          title="Say hello"
          description="Have a role, a project, or an idea worth building? Let's talk."
          accent="neon"
        />
        <div className="mt-8">
          <ContactPanel />
        </div>
      </div>
    </PageShell>
  );
}
