import type { Project } from "@/lib/types";

/**
 * Software projects.
 *
 * Each project has a Problem / Solution framing for the cards plus a `visual`
 * key that maps to a built-in placeholder illustration in ProjectVisual.tsx.
 * To use a real screenshot instead, set `image: "/projects/<file>.webp"`.
 * Add repo/demo links via the optional `links` array.
 */
export const projects: Project[] = [
  {
    id: "blue-relief",
    name: "BlueRelief",
    tagline: "Real-time crisis detection platform",
    description:
      "I pull live posts from BlueSky, run them through Gemini to find and tag crisis reports, and drop the geolocated ones onto a Mapbox map as they come in. FastAPI workers handle ingest, Redis and Celery move work between them, PostGIS runs the geo queries, and everything ships in Docker.",
    problem:
      "During fast-moving emergencies, responders lack a real-time, geolocated read on what people are reporting across social platforms.",
    solution:
      "An event-driven microservices system: FastAPI workers ingest BlueSky data, Gemini enriches and classifies it, PostGIS stores geospatial records, and a Next.js + Mapbox frontend renders live incident maps. Redis and Celery coordinate the async pipeline, all containerized with Docker.",
    tech: [
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "PostGIS",
      "Gemini API",
      "MapboxJS",
      "Google OAuth 2.0",
      "JWT",
      "Docker",
      "Redis",
      "Celery",
      "TailwindCSS",
    ],
    accent: "neon",
    featured: true,
    visual: "map",
    image: "/projects/blue-relief.webp",
    // links: [{ label: "View Code", href: "https://github.com/..." }],
  },
  {
    id: "telekinetics",
    name: "TeleKinetics",
    tagline: "AI physical-therapy form coach",
    description:
      "Won the AI track at Axxess Hackathon 2024. A physical-therapy app that watches you through a webcam, tracks your joints with PoseNet/MoveNet, checks each rep against its target range, and tells you the moment your form slips — in real time, on-device.",
    problem:
      "Patients doing physical therapy at home have no way to know whether they are performing exercises with correct, safe form.",
    solution:
      "An AI app that runs pose estimation (PoseNet / MoveNet) on live movement, scores form against target ranges, and surfaces real-time corrective feedback — built and shipped in a hackathon weekend.",
    tech: ["Python", "TensorFlow", "PoseNet", "MoveNet", "Machine Learning"],
    accent: "mint",
    featured: true,
    badge: "🏆 1st Place · Axxess AI Track",
    visual: "pose",
    image: "/projects/telekinetics.webp",
  },
  {
    id: "guardiangram",
    name: "GuardianGram",
    tagline: "Mobile personal-safety network",
    description:
      "A safety app I built with ACM. You set up a circle of trusted contacts, hit one button to send them a distress alert with your live location, and answer randomized check-ins so they know you're okay. Express/Prisma API on MongoDB, Next.js front end.",
    problem:
      "People navigating unsafe situations need a fast, trusted way to alert their circle and prove they're okay.",
    solution:
      "A full-stack safety network where users build trusted circles, fire distress alerts, broadcast live location, and respond to randomized safety check-ins — backed by an Express/Prisma API on MongoDB.",
    tech: [
      "Next.js",
      "Node.js",
      "Express.js",
      "Prisma",
      "MongoDB",
      "Tailwind CSS",
      "Git",
    ],
    accent: "iris",
    featured: true,
    badge: "People's Choice Award",
    visual: "shield",
    image: "/projects/guardiangram.webp",
  },
  {
    id: "witchwatch",
    name: "WitchWatch",
    tagline: "Oil-tank monitoring & delivery routing",
    description:
      "Built at HackUTD 2025. It reads oil-tank levels two ways — the EOG API and a Raspberry Pi Pico 2 sensor over serial — to catch level changes, check them against delivery tickets, flag the ones that don't match, and route the next truck on a Mapbox map.",
    problem:
      "Tracking oil tank levels and validating field deliveries is manual and error-prone, leading to wasted trips and unnoticed discrepancies.",
    solution:
      "A hardware-software system that reads EOG API data and a Raspberry Pi Pico 2 sensor feed to detect level changes, validate delivery tickets, flag discrepancies, and compute optimized delivery routes on a Mapbox view.",
    tech: [
      "Python",
      "TypeScript",
      "Flask",
      "Pandas",
      "Mapbox API",
      "Raspberry Pi Pico 2",
      "Hardware",
      "Serial Communication",
      "EOG API",
    ],
    accent: "heat",
    badge: "HackUTD 2025",
    visual: "tank",
    image: "/projects/witchwatch.webp",
  },
  {
    id: "trashtrends",
    name: "TrashTrends",
    tagline: "Drone video → litter heatmaps",
    description:
      "A backend that takes drone footage, runs computer vision over the frames to spot litter, and turns the detections into GIS heatmaps that show where trash collects. Python and C++ on ROS, packaged with Docker.",
    problem:
      "Mapping litter across large areas by hand is slow, inconsistent, and hard to track over time.",
    solution:
      "A cloud backend that ingests drone video, runs computer-vision workflows on the frames, and renders GIS heatmaps that reveal where litter concentrates.",
    tech: ["Python", "C++", "ROS", "Docker", "Computer Vision"],
    accent: "mint",
    visual: "heatmap",
    image: "/projects/trashtrends.webp",
  },
  {
    id: "ecodrive",
    name: "EcoDrive",
    tagline: "OBD fuel-economy dashboard",
    description:
      "I wired an Arduino into a car's OBD-II port to read live engine data, pushed it through a REST API into MongoDB, and charted fuel-economy trends in a Next.js dashboard — so you can see which driving habits actually burn gas.",
    problem:
      "Drivers rarely get clear feedback on how their habits affect real-world fuel economy.",
    solution:
      "A vehicle data platform that reads OBD data via an Arduino bridge, exposes it through a REST API, and visualizes fuel-economy trends in a Next.js dashboard.",
    tech: ["Next.js", "MongoDB", "Arduino", "REST API", "Data Visualization"],
    accent: "neon",
    visual: "gauge",
    image: "/projects/ecodrive.webp",
  },
  {
    id: "hbs-cv",
    name: "HBS Computer Vision Research",
    tagline: "YOLOv8 TCP-coil detection",
    description:
      "A research project where I trained YOLOv8 to detect TCP coils in imagery — Python for the detection pipeline, MATLAB for analysis — so spotting coils no longer means a person checking frames by hand.",
    problem:
      "Detecting TCP coils reliably in imagery is tedious and inconsistent when done manually.",
    solution:
      "A computer-vision pipeline using YOLOv8 and Python (with MATLAB for analysis) trained to detect TCP coils accurately and repeatably.",
    tech: ["Machine Learning", "MATLAB", "Python", "YOLOv8", "Computer Vision"],
    accent: "iris",
    visual: "detect",
    image: "/projects/hbs-cv.webp",
  },
  {
    id: "fps",
    name: "First Person Shooter",
    tagline: "UE5 gameplay & physics",
    description:
      "A playable first-person shooter I built in Unreal Engine 5, part Blueprint and part C++. Chaos Physics drives destructible environments, UMG runs the HUD, and I wrote the core input and gameplay systems myself.",
    problem:
      "Wanted to go deep on real-time game systems: input, UI, and physics-driven destruction.",
    solution:
      "A playable first-person shooter in Unreal Engine 5 combining Blueprint and C++ — destructible environments via Chaos Physics, a UMG-driven HUD, and responsive gameplay systems.",
    tech: ["C++", "Unreal Engine", "Blueprint", "UMG", "Chaos Physics"],
    accent: "heat",
    visual: "fps",
    image: "/projects/fps.webp",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (id: string) => projects.find((p) => p.id === id);
