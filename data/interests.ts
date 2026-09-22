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
    blurb: "A '95 SC300",
    images: ["/photos/sc300.webp"],
    imageAlt: "A 1995 Lexus SC300",
    body: [
      "The SC300 was my first long-running project car: a 1995 Lexus coupe. It was a blast to drive and I put many weekends into it.",
      "This car had been sitting in my neighbor's driveway for years, and when I finally pulled the trigger and bought it, I learned so much, not only about car, but hard work too. It started first with mechanical repairs, and then slowly cosmetic because the goal was eventually to make it into a drift car. Unfortunately, it never got to that point and was forced to sell it at the time due to needing reliable transportation. Now I have a V6 Accord Coupe that I daily and am looking for a new project. I am a sucker for American muscle so I am eyeing Corvettes, specifically the C5 and C6.",
    ],
  },
  {
    id: "fitness",
    title: "Fitness",
    blurb: "Training and the outdoors",
    images: [
      "/interests/lake-travis.webp",
      "/interests/greenbelt-overlook.webp",
    ],
    imageAlt: "Syed outdoors around Austin",
    body: [
      "I was not always into fitness, but I was always curious. Since I was a young kid, I remember I loved to explore and try new things. This carried on into the future where I continue to push myself and get out of my comfort zone",
      "I have been playing basketball since 4th grade, but as I have gotten older I have developed other fitness hobbies. I have been working out, I tried bowling, I got into hiking, and more. As I continue to grow, I don't see myself ever quitting at trying something new.",
    ],
  },
  {
    id: "reading",
    title: "Reading",
    blurb: "Mostly fiction",
    body: [
      "Reading allows me to relax by myself. I primarliy read fiction, and some of my favorite series include Harry Potter, Hunger Games, and Percy Jackson",
      "I also like to read books that challenge my thinking such as To Kill a Mockingbird, 1984, and Pride and Prejudice",
    ],
  },
  {
    id: "games",
    title: "Video games",
    blurb: "Playing with friends",
    images: ["/interests/fortnite.webp"],
    imageAlt: "A Fortnite squad drop",
    body: [
      "I love to play games, but recently have not as much time for them. When I do play, I like to play multiplayer games with friends like Minecraft, Fortnite, and Among Us",
      "Growing up, I was a Nintendo boy with the Wii and DS. Some of my favorite games include Super Mario 64, Super Mario Bros Wii, and Mario and Luigi: Bowser's Inside Story",
    ],
  },
];
