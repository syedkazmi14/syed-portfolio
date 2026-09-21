import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

/**
 * The easter egg.
 *
 * Deliberately not in the nav — you get here by clicking the cat drawing in
 * the About section. Every photo from the original archive is still here.
 */
export const metadata: Metadata = {
  title: "Louise & Bailey",
  description: "Two cats.",
  robots: { index: false, follow: true },
};

const CATS = [
  { name: "Louise", desc: "dark gray · gentle girl · 2 years old" },
  { name: "Bailey", desc: "orange · playful boy · 3 years old" },
];

const PHOTOS = [
  { src: "/cats/baileyandlouisecuddled.webp", alt: "Bailey and Louise cuddled up" },
  { src: "/cats/louisecute.webp", alt: "Louise" },
  { src: "/cats/baileycute.webp", alt: "Bailey" },
  { src: "/cats/baileyandlouisecuddled2.webp", alt: "Bailey and Louise cuddling" },
  { src: "/cats/louisesitting.webp", alt: "Louise sitting" },
  { src: "/cats/baileycute2.webp", alt: "Bailey chilling" },
  { src: "/cats/baileyandlouisecute.webp", alt: "Bailey and Louise" },
  { src: "/cats/louisefunnyface.webp", alt: "Louise judging everything" },
  { src: "/cats/baileyfunny.webp", alt: "Bailey being funny" },
  { src: "/cats/baileyandlouiseloafed.webp", alt: "Bailey and Louise loafed" },
  { src: "/cats/louiseoutside.webp", alt: "Louise outside" },
  { src: "/cats/baileyandtoy.webp", alt: "Bailey and his toy" },
  { src: "/cats/baileyandlouiseplaying.webp", alt: "Bailey and Louise playing" },
  { src: "/cats/louisefunnyface2.webp", alt: "Louise making a face" },
  { src: "/cats/baileyfunny2.webp", alt: "Bailey" },
  { src: "/cats/baileyandlouisecuddled3.webp", alt: "Bailey and Louise napping" },
  { src: "/cats/loiuselookingoutside.webp", alt: "Louise looking out the window" },
  { src: "/cats/baileycute3.webp", alt: "Bailey" },
  { src: "/cats/baileyandlouiseloafed2.webp", alt: "Double loaf" },
  { src: "/cats/baileyandtoy2.webp", alt: "Bailey and toy" },
  { src: "/cats/baileyandlouiseplaying2.webp", alt: "Bailey and Louise playing" },
  { src: "/cats/baileybirthday.webp", alt: "Bailey's birthday" },
  { src: "/cats/baileyandloiusecuddled3.webp", alt: "Bailey and Louise together" },
  { src: "/cats/baileyinpumpkin.webp", alt: "Bailey in a pumpkin" },
  { src: "/cats/baileyandlouisecuddling2.webp", alt: "Bailey and Louise cuddling" },
  { src: "/cats/baileyiwthsweater.webp", alt: "Bailey in a sweater" },
  { src: "/cats/baileyandlouiseresting.webp", alt: "Bailey and Louise resting" },
  { src: "/cats/baileyfunnyface.webp", alt: "Bailey making a face" },
  { src: "/cats/baileyonmyshoulder.webp", alt: "Bailey on my shoulder" },
];

export default function CatsPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-6xl px-6 pt-32 sm:px-12 sm:pt-40">
        <Reveal>
          <Link
            href="/#about"
            className="font-mono text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink"
          >
            ← Back
          </Link>

          <h1 className="mt-10 font-display text-[2.75rem] leading-[1.06] tracking-[-0.015em] sm:text-6xl">
            Louise &amp; Bailey
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-body">
            You found the cats. They supervise everything I ship.
          </p>

          <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-3">
            {CATS.map((cat) => (
              <div key={cat.name}>
                <dt className="text-[0.97rem] font-semibold text-ink">
                  {cat.name}
                </dt>
                <dd className="font-mono text-xs text-muted">{cat.desc}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PHOTOS.map((photo) => (
            <li key={photo.src} className="relative aspect-square overflow-hidden bg-rule-soft">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.04]"
              />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
