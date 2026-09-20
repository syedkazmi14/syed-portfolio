import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/PageShell";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Louise & Bailey",
  description:
    "The real bosses of the workshop — a complete photo archive of Syed's cats.",
};

/* ------------------------------------------------------------------ */
/*  Cat bios                                                            */
/* ------------------------------------------------------------------ */
const CATS = [
  {
    name: "Louise",
    dot: "#ad93ff",           // iris / lavender matches her vibe
    desc: "dark gray · gentle girl · 2 years old",
  },
  {
    name: "Bailey",
    dot: "#ff8f43",           // heat / orange matches his fur
    desc: "orange · playful boy · 3 years old",
  },
];

/* ------------------------------------------------------------------ */
/*  All photos — mixed together in display order                        */
/* ------------------------------------------------------------------ */
const PHOTOS = [
  // lead with cuddled shots for a warm opener
  { src: "/cats/baileyandlouisecuddled.webp",   alt: "Bailey and Louise cuddled up" },
  { src: "/cats/louisecute.webp",               alt: "Louise" },
  { src: "/cats/baileycute.webp",               alt: "Bailey" },
  { src: "/cats/baileyandlouisecuddled2.webp",  alt: "Bailey and Louise cuddling" },
  { src: "/cats/louisesitting.webp",            alt: "Louise sitting" },
  { src: "/cats/baileycute2.webp",              alt: "Bailey chilling" },
  { src: "/cats/baileyandlouisecute.webp",      alt: "Bailey and Louise" },
  { src: "/cats/louisefunnyface.webp",          alt: "Louise judging everything" },
  { src: "/cats/baileyfunny.webp",              alt: "Bailey being funny" },
  { src: "/cats/baileyandlouiseloafed.webp",    alt: "Bailey and Louise loafed" },
  { src: "/cats/louiseoutside.webp",            alt: "Louise outside" },
  { src: "/cats/baileyandtoy.webp",             alt: "Bailey and his toy" },
  { src: "/cats/baileyandlouiseplaying.webp",   alt: "Bailey and Louise playing" },
  { src: "/cats/louisefunnyface2.webp",         alt: "Louise making a face" },
  { src: "/cats/baileyfunny2.webp",             alt: "Bailey" },
  { src: "/cats/baileyandlouisecuddled3.webp",  alt: "Bailey and Louise napping" },
  { src: "/cats/loiuselookingoutside.webp",     alt: "Louise looking out the window" },
  { src: "/cats/baileycute3.webp",              alt: "Bailey" },
  { src: "/cats/baileyandlouiseloafed2.webp",   alt: "Double loaf" },
  { src: "/cats/baileyandtoy2.webp",            alt: "Bailey and toy" },
  { src: "/cats/baileyandlouiseplaying2.webp",  alt: "Bailey and Louise playing" },
  { src: "/cats/baileybirthday.webp",           alt: "Bailey's birthday" },
  { src: "/cats/baileyandloiusecuddled3.webp",  alt: "Bailey and Louise together" },
  { src: "/cats/baileyinpumpkin.webp",          alt: "Bailey in a pumpkin" },
  { src: "/cats/baileyandlouisecuddling2.webp", alt: "Bailey and Louise cuddling" },
  { src: "/cats/baileyiwthsweater.webp",        alt: "Bailey in a sweater" },
  { src: "/cats/baileyandlouiseresting.webp",   alt: "Bailey and Louise resting" },
  { src: "/cats/baileyfunnyface.webp",          alt: "Bailey making a face" },
  { src: "/cats/baileyonmyshoulder.webp",       alt: "Bailey on my shoulder" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function CatsPage() {
  return (
    <PageShell
      accent="iris"
      eyebrow="// cat-archive"
      title="Louise & Bailey"
      description="The real bosses of the workshop."
    >
      {/* Cat bios */}
      <div className="mb-10 flex flex-wrap gap-4">
        {CATS.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center gap-2.5 rounded-xl border border-line bg-white/[0.03] px-4 py-2.5"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: cat.dot }}
            />
            <span className="font-semibold text-ink">{cat.name}</span>
            <span className="text-sm text-muted">— {cat.desc}</span>
          </div>
        ))}
      </div>

      {/* All photos — one unified grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {PHOTOS.map((photo) => (
          <div
            key={photo.src}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl",
              "ring-2 ring-transparent transition-all duration-300",
              "hover:ring-iris/50",
            )}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </PageShell>
  );
}
