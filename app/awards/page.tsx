import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { AwardsShelf } from "@/components/AwardsShelf";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description:
    "Hackathon wins, audience picks, and university honors earned by Syed Kazmi.",
};

export default function AwardsPage() {
  return (
    <PageShell
      accent="iris"
      eyebrow="// the trophy shelf"
      title="Awards & Recognition"
      description="Hackathon wins, audience picks, and university honors."
    >
      <AwardsShelf />
    </PageShell>
  );
}
