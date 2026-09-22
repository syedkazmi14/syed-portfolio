import type { Award, Certification } from "@/lib/types";

export const awards: Award[] = [
  {
    id: "aes",
    title: "AES Award",
    org: "The University of Texas at Dallas",
    description:
      "Recognized by the University of Texas at Dallas for academic and leadership excellence.",
  },
  {
    id: "axxess",
    title: "1st Place - AI Track",
    org: "Axxess Hackathon",
    description:
      "Led a team to victory in the AI track by building an AI-powered physical therapy analysis app.",
  },
  {
    id: "peoples-choice",
    title: "People's Choice Award",
    org: "GuardianGram Showcase",
    description:
      "Awarded for most popular project by audience vote at the GuardianGram presentation event.",
  },
];

/**
 * Certifications. Kept separate from awards — a credential you earn by
 * examination is a different claim from a prize you were given, and the
 * Recognition column labels them apart.
 */
export const certifications: Certification[] = [
  {
    id: "aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    org: "Amazon Web Services",
  },
];
