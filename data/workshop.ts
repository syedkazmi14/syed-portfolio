import type { WorkshopObjectDef } from "@/lib/types";

/**
 * The six interactive objects in the workshop hub. Each is a PORTAL that
 * navigates (with a zoom transition) to its own dedicated page.
 *
 * `area` positions each object inside the room as percentages (left/top of the
 * object's box, and its width). On mobile these become a tap-friendly card grid.
 */
export const workshopObjects: WorkshopObjectDef[] = [
  {
    id: "whiteboard",
    label: "Whiteboard",
    caption: "Research & AI work",
    target: "/research",
    accent: "mint",
    icon: "Brain",
    area: { left: 1.5, top: 19, width: 20 },
  },
  {
    id: "trophy-shelf",
    label: "Trophy Shelf",
    caption: "Awards & recognition",
    target: "/awards",
    accent: "iris",
    icon: "Trophy",
    area: { left: 80.5, top: 12, width: 18 },
  },
  {
    id: "monitor",
    label: "Main Monitor",
    caption: "Software projects",
    target: "/projects",
    accent: "neon",
    icon: "Monitor",
    area: { left: 33, top: 27, width: 35 },
  },
  {
    id: "soldering-station",
    label: "Soldering Station",
    caption: "Hardware experience",
    target: "/hardware",
    accent: "heat",
    icon: "CircuitBoard",
    area: { left: 0.5, top: 47, width: 21 },
  },
  {
    id: "toolbox",
    label: "Toolbox",
    caption: "Skills & stack",
    target: "/skills",
    accent: "heat",
    icon: "Wrench",
    area: { left: 70, top: 53, width: 23 },
  },
  {
    id: "desk-phone",
    label: "Desk Phone",
    caption: "Get in touch",
    target: "/contact",
    accent: "neon",
    icon: "Phone",
    area: { left: 85.5, top: 58, width: 14 },
  },
];

export const getWorkshopObject = (id: string) =>
  workshopObjects.find((o) => o.id === id);
