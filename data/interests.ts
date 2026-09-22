import type { Interest } from "@/lib/types";

/**
 * ⚠️ THE `body` COPY BELOW IS A DRAFT, NOT SYED'S WORDS. ⚠️
 *
 * Claude wrote these paragraphs to get the section standing up. Only two
 * things in here are verified facts from the rest of the repo:
 *
 *   - cars   the '95 Lexus SC300, described as "the weekend project", and the
 *            photo at /photos/sc300.webp
 *   - games  the Unreal Engine 5 FPS in data/projects.ts (C++/Blueprint,
 *            Chaos Physics, UMG)
 *
 * Everything else — especially all of fitness and reading — is invented
 * scaffolding. Rewrite every `body` in your own voice before this is seen by
 * anyone, and swap the two missing images in.
 */
export const interests: Interest[] = [
  {
    id: "cars",
    title: "Cars",
    blurb: "A '95 SC300 and a permanent list of things to fix",
    images: ["/photos/sc300.webp"],
    imageAlt: "A 1995 Lexus SC300",
    body: [
      "DRAFT — rewrite in your own words. The SC300 is the long-running project: a 1995 Lexus coupe that is equal parts car and to-do list. Weekends go into it.",
      "DRAFT — rewrite in your own words. Say what drew you to this car specifically, what you have changed so far, and what is next.",
    ],
  },
  {
    id: "fitness",
    title: "Fitness",
    blurb: "Training, and the habit of showing up",
    body: [
      "DRAFT — rewrite in your own words. Nothing in the repo told me anything about this one, so treat every sentence here as a placeholder.",
      "DRAFT — rewrite in your own words. What you train, how long you have been at it, and what keeps you going back.",
    ],
  },
  {
    id: "reading",
    title: "Reading",
    blurb: "Mostly non-fiction, occasionally finished",
    body: [
      "DRAFT — rewrite in your own words. Nothing in the repo told me anything about this one either.",
      "DRAFT — rewrite in your own words. What you read, a couple of titles worth naming, and why they stuck.",
    ],
  },
  {
    id: "games",
    title: "Video games",
    blurb: "Playing them, and occasionally building one",
    body: [
      "DRAFT — rewrite in your own words. Playing games turned into taking them apart — building one in Unreal Engine 5, part Blueprint and part C++.",
      "DRAFT — rewrite in your own words. What you actually play, and what building one taught you that playing them did not.",
    ],
  },
];
