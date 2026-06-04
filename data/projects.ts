import type { Project } from "@/lib/types";

/**
 * Software projects.
 *
 * Each project has a Problem / Solution framing for the cards plus a `visual`
 * key that maps to a built-in placeholder illustration in ProjectVisual.tsx.
 * To use a real screenshot instead, set `image: "/projects/<file>.png"`.
 * Add repo/demo links via the optional `links` array.
 */
export const projects: Project[] = [
  {
    id: "blue-relief",
    name: "BlueRelief",
    tagline: "Real-time crisis detection platform",
    description:
      "Real-time crisis detection platform using a containerized, event-driven microservices architecture. BlueSky data is ingested by FastAPI workers, processed with Gemini, stored in PostgreSQL/PostGIS, and displayed on a Next.js frontend with Mapbox visualizations.",
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
    image: "/projects/blue-relief.png",
    // links: [{ label: "View Code", href: "https://github.com/..." }],
  },
  {
    id: "telekinetics",
    name: "TeleKinetics",
    tagline: "AI physical-therapy form coach",
    description:
      "1st Place AI Track winner at Axxess Hackathon 2024. AI-powered physical therapy app using pose estimation to analyze patient form and provide real-time movement feedback.",
    problem:
      "Patients doing physical therapy at home have no way to know whether they are performing exercises with correct, safe form.",
    solution:
      "An AI app that runs pose estimation (PoseNet / MoveNet) on live movement, scores form against target ranges, and surfaces real-time corrective feedback — built and shipped in a hackathon weekend.",
    tech: ["Python", "TensorFlow", "PoseNet", "MoveNet", "Machine Learning"],
    accent: "mint",
    featured: true,
    badge: "🏆 1st Place · Axxess AI Track",
    visual: "pose",
    image: "/projects/telekinetics.png",
  },
  {
    id: "guardiangram",
    name: "GuardianGram",
    tagline: "Mobile personal-safety network",
    description:
      "Full-stack mobile safety network app built through ACM. Users can create safety networks, trigger distress alerts, share location updates, and complete randomized safety check-ins.",
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
    image: "/projects/guardiangram.png",
  },
  {
    id: "witchwatch",
    name: "WitchWatch",
    tagline: "Oil-tank monitoring & delivery routing",
    description:
      "Real-time oil tank monitoring and delivery optimization system using EOG API data. Detects tank level changes, validates delivery tickets, flags discrepancies, and provides optimized delivery routes through hardware-software integration.",
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
    image: "/projects/witchwatch.png",
  },
  {
    id: "trashtrends",
    name: "TrashTrends",
    tagline: "Drone video → litter heatmaps",
    description:
      "Cloud backend for drone video processing and GIS heatmaps. Processes video feeds, supports computer vision workflows, and visualizes litter patterns.",
    problem:
      "Mapping litter across large areas by hand is slow, inconsistent, and hard to track over time.",
    solution:
      "A cloud backend that ingests drone video, runs computer-vision workflows on the frames, and renders GIS heatmaps that reveal where litter concentrates.",
    tech: ["Python", "C++", "ROS", "Docker", "Computer Vision"],
    accent: "mint",
    visual: "heatmap",
    image: "/projects/trashtrends.png",
  },
  {
    id: "ecodrive",
    name: "EcoDrive",
    tagline: "OBD fuel-economy dashboard",
    description:
      "Vehicle data platform using OBD data to visualize fuel economy trends through a web dashboard.",
    problem:
      "Drivers rarely get clear feedback on how their habits affect real-world fuel economy.",
    solution:
      "A vehicle data platform that reads OBD data via an Arduino bridge, exposes it through a REST API, and visualizes fuel-economy trends in a Next.js dashboard.",
    tech: ["Next.js", "MongoDB", "Arduino", "REST API", "Data Visualization"],
    accent: "neon",
    visual: "gauge",
    image: "/projects/ecodrive.png",
  },
  {
    id: "hbs-cv",
    name: "HBS Computer Vision Research",
    tagline: "YOLOv8 TCP-coil detection",
    description:
      "Computer vision system using YOLOv8 and Python to detect TCP coils.",
    problem:
      "Detecting TCP coils reliably in imagery is tedious and inconsistent when done manually.",
    solution:
      "A computer-vision pipeline using YOLOv8 and Python (with MATLAB for analysis) trained to detect TCP coils accurately and repeatably.",
    tech: ["Machine Learning", "MATLAB", "Python", "YOLOv8", "Computer Vision"],
    accent: "iris",
    visual: "detect",
    image: "/projects/hbs-cv.png",
  },
  {
    id: "fps",
    name: "First Person Shooter",
    tagline: "UE5 gameplay & physics",
    description:
      "Playable FPS built in Unreal Engine 5 using Blueprint and C++ with destructible environments, UMG UI, and Chaos Physics.",
    problem:
      "Wanted to go deep on real-time game systems: input, UI, and physics-driven destruction.",
    solution:
      "A playable first-person shooter in Unreal Engine 5 combining Blueprint and C++ — destructible environments via Chaos Physics, a UMG-driven HUD, and responsive gameplay systems.",
    tech: ["C++", "Unreal Engine", "Blueprint", "UMG", "Chaos Physics"],
    accent: "heat",
    visual: "fps",
    image: "/projects/fps.png",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (id: string) => projects.find((p) => p.id === id);
