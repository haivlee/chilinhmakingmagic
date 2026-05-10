import fs from "fs";
import path from "path";

const ARTWORKS_PUBLIC_DIR = path.join(
  process.cwd(),
  "public",
  "data",
  "img",
  "artworks",
);

/**
 * Sorted image URLs for `public/data/img/artworks` (numeric-aware order).
 * Use the array index as `slot` in `data/works.ts`.
 */
export function getArtworkSrcs(): string[] {
  if (!fs.existsSync(ARTWORKS_PUBLIC_DIR)) {
    return [];
  }

  return fs
    .readdirSync(ARTWORKS_PUBLIC_DIR)
    .filter((name) => /\.(jpe?g|png|webp|gif|avif)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/data/img/artworks/${file}`);
}
