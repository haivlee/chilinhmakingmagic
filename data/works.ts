export type WorkImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type WorkRow =
  | { type: "full"; image: WorkImage }
  | { type: "half"; images: [WorkImage, WorkImage] }
  | { type: "third"; images: [WorkImage, WorkImage, WorkImage] }
  | { type: "caption"; text: string };

const work = (seed: string, alt: string): WorkImage => ({
  src: `https://picsum.photos/seed/${seed}/1920/1080`,
  alt,
});

export const workRows: WorkRow[] = [
  {
    type: "half",
    images: [
      work("work-01", "Atmospheric valley with a distant fantasy tower"),
      work("work-02", "Dense futuristic city environment from above"),
    ],
  },
  {
    type: "full",
    image: work("work-03", "Wide desert canyon environment matte painting"),
  },
  {
    type: "half",
    images: [
      work("work-04", "High-rise city corridor in soft morning light"),
      work("work-05", "Top-down view of a compact urban megastructure"),
    ],
  },
  {
    type: "caption",
    text: "I first started my career as a Compositor and Digital Matte Painter. After years of hard work and continuous learning, I am now an Environment Generalist, creating a variety of works in the film industry.",
  },
  {
    type: "full",
    image: work("work-06", "Overgrown forest structure with cinematic haze"),
  },
  {
    type: "half",
    images: [
      work("work-07", "Snowy mountain range under heavy cloud cover"),
      work("work-08", "Neon future city in violet rain and mist"),
    ],
  },
  {
    type: "full",
    image: work("work-09", "Green coastal mountain island under bright sky"),
  },
  {
    type: "half",
    images: [
      work("work-10", "Retro futuristic skyline in warm sunset haze"),
      work("work-11", "Pastel science fiction metropolis with flying craft"),
    ],
  },
  {
    type: "half",
    images: [
      work("work-12", "Stylized night city with warm windows"),
      work("work-13", "Misty rural environment with trees and water"),
    ],
  },
  {
    type: "full",
    image: work("work-14", "Massive ocean wave curling across a pale horizon"),
  },
  {
    type: "caption",
    text: "I am in love with creating worlds where full of amaze and fantasy",
  },
  {
    type: "half",
    images: [
      work("work-15", "Large creatures crossing a fiery prehistoric battlefield"),
      work("work-16", "Dinosaur silhouette beneath a burning sky"),
    ],
  },
  {
    type: "full",
    image: work("work-17", "Dry desert settlement stretching into a bright horizon"),
  },
  {
    type: "half",
    images: [
      work("work-18", "Narrow urban alley after rain"),
      work("work-19", "Street corner with sunlit shopfronts"),
    ],
  },
  {
    type: "half",
    images: [
      work("work-20", "Vietnamese city block in daylight"),
      work("work-21", "Portrait close-up against a stormy mountain backdrop"),
    ],
  },
  {
    type: "full",
    image: work("work-22", "Two figures overlooking an amber city sunset"),
  },
];

export const bottomWorks: WorkImage[] = [
  work("work-23", "Creature concept sculpt in grey material"),
  work("work-24", "Dark biomechanical chamber with a central figure"),
  work("work-25", "Cliffside industrial facility beside open water"),
  work("work-26", "Foggy village environment surrounded by forest"),
  work("work-27", "Forest road leading to a hidden structure"),
  work("work-28", "Sunlit courtyard beneath heavy vines"),
  work("work-29", "Clockwork machinery and luminous gears"),
  work("work-30", "Night city skyline with sharp tower silhouette"),
];
