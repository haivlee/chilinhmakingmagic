export type WorkImageLightboxText = {
  lightboxLeftText?: string;
  lightboxRightText?: string;
};

export type WorkImage = {
  src: string;
  alt: string;
  caption?: string;
} & WorkImageLightboxText;

export type WorkRow =
  | { type: "full"; image: WorkImage }
  | { type: "half"; images: [WorkImage, WorkImage] }
  | { type: "third"; images: [WorkImage, WorkImage, WorkImage] }
  | { type: "caption"; text: string };

/** One image slot: index into sorted files from `public/data/img/artworks`. */
export type WorkSlot = {
  slot: number;
  alt: string;
} & WorkImageLightboxText;

export type WorkRowSpec =
  | { type: "full"; image: WorkSlot }
  | { type: "half"; images: [WorkSlot, WorkSlot] }
  | { type: "third"; images: [WorkSlot, WorkSlot, WorkSlot] }
  | { type: "caption"; text: string };

const PLACEHOLDER_SRC = "/file.svg";
const DEFAULT_LIGHTBOX_TEXT: Required<WorkImageLightboxText> = {
  lightboxLeftText: "Personal Project",
  lightboxRightText: "all aspect",
};

/** Pick artwork by sorted folder index. Optional third argument customizes lightbox labels. */
export function w(
  slot: number,
  alt: string,
  lightboxText: WorkImageLightboxText = {},
): WorkSlot {
  return { slot, alt, ...lightboxText };
}

function resolveSlot(artworkSrcs: readonly string[], s: WorkSlot): WorkImage {
  return {
    src: artworkSrcs[s.slot] ?? PLACEHOLDER_SRC,
    alt: s.alt,
    lightboxLeftText:
      s.lightboxLeftText ?? DEFAULT_LIGHTBOX_TEXT.lightboxLeftText,
    lightboxRightText:
      s.lightboxRightText ?? DEFAULT_LIGHTBOX_TEXT.lightboxRightText,
  };
}

/** Manually arrange rows; only `slot` selects the file—layout and alts live here. */
export const workRows: WorkRowSpec[] = [
  {
    type: "half",
    images: [
      w(0, "Atmospheric valley with a distant fantasy tower"),
      w(1, "Dense futuristic city environment from above"),
    ],
  },
  {
    type: "full",
    image: w(2, "Wide desert canyon environment matte painting"),
  },
  {
    type: "half",
    images: [
      w(3, "High-rise city corridor in soft morning light"),
      w(4, "Top-down view of a compact urban megastructure"),
    ],
  },
  {
    type: "caption",
    text: "I first started my career as a Compositor and Digital Matte Painter. After years of hard work and continuous learning, I am now an Environment Generalist, creating a variety of works in the film industry.",
  },
  {
    type: "full",
    image: w(5, "Overgrown forest structure with cinematic haze"),
  },
  {
    type: "half",
    images: [
      w(6, "Snowy mountain range under heavy cloud cover"),
      w(7, "Neon future city in violet rain and mist"),
    ],
  },
  {
    type: "full",
    image: w(8, "Green coastal mountain island under bright sky"),
  },
  {
    type: "half",
    images: [
      w(9, "Retro futuristic skyline in warm sunset haze"),
      w(10, "Pastel science fiction metropolis with flying craft"),
    ],
  },
  {
    type: "half",
    images: [
      w(11, "Stylized night city with warm windows", {
        lightboxLeftText: "Silver and the book of dreams (2023)",
        lightboxRightText: "city concept",
      }),
      w(12, "Misty rural environment with trees and water"),
    ],
  },
  {
    type: "full",
    image: w(13, "Massive ocean wave curling across a pale horizon", {
      lightboxLeftText: "Silver and the book of dreams (2023)",
      lightboxRightText: "concept & matte painting",
    }),
  },
  {
    type: "caption",
    text: "I am in love with creating worlds where full of amaze and fantasy",
  },
  {
    type: "half",
    images: [
      w(14, "Large creatures crossing a fiery prehistoric battlefield", {
        lightboxLeftText: "Goodbye Earth (2024)",
        lightboxRightText: "matte painting & compositing",
      }),
      w(15, "Dinosaur silhouette beneath a burning sky"),
    ],
  },
  {
    type: "full",
    image: w(16, "Dry desert settlement stretching into a bright horizon", {
      lightboxLeftText: "In search of lost time (2022)",
      lightboxRightText: "matte painting",
    }),
  },
  {
    type: "half",
    images: [
      w(17, "Narrow urban alley after rain", {
        lightboxLeftText: "Helgoland 513 (2024)",
        lightboxRightText: "abandoned city matte painting",
      }),
      w(18, "Street corner with sunlit shopfronts", {
        lightboxLeftText: "Em va Trinh 2022",
        lightboxRightText: "street matte painting",
      }),
    ],
  },
  {
    type: "half",
    images: [
      w(19, "Vietnamese city block in daylight", {
        lightboxLeftText: "Em va Trinh 2022",
        lightboxRightText: "street matte painting",
      }),
      w(20, "Portrait close-up against a stormy mountain backdrop", {
        lightboxLeftText: "Silver and the book of dreams (2023)",
        lightboxRightText: "mountain matte painting",
      }),
    ],
  },
  {
    type: "full",
    image: w(21, "Two figures overlooking an amber city sunset", {
      lightboxLeftText: "Mat Troi Khoc MV",
      lightboxRightText: "city matte painting",
    }),
  },
];

/** Four static images shown in `WorksBottomImageRow`. Edit these slots manually. */
export const bottomRowWorkSlots: [WorkSlot, WorkSlot, WorkSlot, WorkSlot] = [
  w(22, "Creature concept sculpt in grey material"),
  w(23, "Dark biomechanical chamber with a central figure"),
  w(24, "Cliffside industrial facility beside open water"),
  w(25, "Foggy village environment surrounded by forest"),
];

/** Manually selected bottom row slots, kept for callers that still inspect slots. */
export const bottomWorkSlots: WorkSlot[] = [...bottomRowWorkSlots];

function getWorkRowSlots(row: WorkRowSpec): WorkSlot[] {
  if (row.type === "caption") return [];
  if (row.type === "full") return [row.image];
  return [...row.images];
}

function getUsedArtworkSlots(): Set<number> {
  return new Set([
    ...workRows.flatMap((row) => getWorkRowSlots(row).map((slot) => slot.slot)),
    ...bottomRowWorkSlots.map((slot) => slot.slot),
  ]);
}

function getArtworkAltFromSrc(src: string, slot: number): string {
  const fileName = src
    .split("/")
    .pop()
    ?.replace(/\.[^.]+$/, "");
  const label = fileName?.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();

  return label ? `Artwork ${slot + 1}: ${label}` : `Artwork ${slot + 1}`;
}

export function resolveWorkRows(artworkSrcs: readonly string[]): WorkRow[] {
  return workRows.map((row) => {
    if (row.type === "caption") return row;
    if (row.type === "full") {
      return { type: "full", image: resolveSlot(artworkSrcs, row.image) };
    }
    if (row.type === "half") {
      return {
        type: "half",
        images: [
          resolveSlot(artworkSrcs, row.images[0]),
          resolveSlot(artworkSrcs, row.images[1]),
        ],
      };
    }
    return {
      type: "third",
      images: [
        resolveSlot(artworkSrcs, row.images[0]),
        resolveSlot(artworkSrcs, row.images[1]),
        resolveSlot(artworkSrcs, row.images[2]),
      ],
    };
  });
}

export function resolveBottomWorks(
  artworkSrcs: readonly string[],
): WorkImage[] {
  return [
    ...resolveBottomRowWorks(artworkSrcs),
    ...resolveBottomSliderWorks(artworkSrcs),
  ];
}

export function resolveBottomRowWorks(
  artworkSrcs: readonly string[],
): WorkImage[] {
  return bottomRowWorkSlots.map((s) => resolveSlot(artworkSrcs, s));
}

export function resolveBottomSliderWorks(
  artworkSrcs: readonly string[],
): WorkImage[] {
  const usedSlots = getUsedArtworkSlots();

  return artworkSrcs.reduce<WorkImage[]>((works, src, slot) => {
    if (!usedSlots.has(slot)) {
      works.push({
        src,
        alt: getArtworkAltFromSrc(src, slot),
        ...DEFAULT_LIGHTBOX_TEXT,
      });
    }

    return works;
  }, []);
}
