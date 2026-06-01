import type { WorkshopObjectDef } from "@/lib/types";

/**
 * The six interactive objects in the workshop hub. Each is a PORTAL that
 * navigates (with a zoom transition) to its own dedicated page.
 *
 * `area` positions each object inside the scene box as percentages
 * (left/top of the object's box, and its width). On mobile these become
 * a tap-friendly card grid instead.
 */
export const workshopObjects: WorkshopObjectDef[] = [
  {
    id: "whiteboard",
    label: "Whiteboard",
    caption: "Research & AI work",
    target: "/research",
    accent: "mint",
    icon: "Brain",
    area: { left: 3.5, top: 7, width: 27 },
  },
  {
    id: "trophy-shelf",
    label: "Trophy Shelf",
    caption: "Awards & recognition",
    target: "/awards",
    accent: "iris",
    icon: "Trophy",
    area: { left: 70.5, top: 6, width: 26 },
  },
  {
    id: "monitor",
    label: "Main Monitor",
    caption: "Software projects",
    target: "/projects",
    accent: "neon",
    icon: "Monitor",
    area: { left: 35.5, top: 30, width: 30 },
  },
  {
    id: "soldering-station",
    label: "Soldering Station",
    caption: "Hardware experience",
    target: "/hardware",
    accent: "heat",
    icon: "CircuitBoard",
    area: { left: 69, top: 50, width: 24 },
  },
  {
    id: "desk-phone",
    label: "Desk Phone",
    caption: "Get in touch",
    target: "/contact",
    accent: "neon",
    icon: "Phone",
    area: { left: 9, top: 63, width: 17 },
  },
  {
    id: "toolbox",
    label: "Toolbox",
    caption: "Skills & stack",
    target: "/skills",
    accent: "heat",
    icon: "Wrench",
    area: { left: 30, top: 67, width: 23 },
  },
];

export const getWorkshopObject = (id: string) =>
  workshopObjects.find((o) => o.id === id);
