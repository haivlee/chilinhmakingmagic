import fs from "fs";
import path from "path";

export type PosterItem = {
  id: string;
  src: string;
  title: string;
};

const POSTERS_PUBLIC_DIR = path.join(
  process.cwd(),
  "public",
  "data",
  "img",
  "posters",
);

/** Poster files in `public/data/img/posters` — URL path matches folder layout. */
export function getPosterItems(): PosterItem[] {
  if (!fs.existsSync(POSTERS_PUBLIC_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTERS_PUBLIC_DIR)
    .filter((name) => /\.(jpe?g|png|webp|gif|avif)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return files.map((file, i) => ({
    id: `poster-${i}-${file.replace(/[^a-z0-9.-]/gi, "-")}`,
    src: `/data/img/posters/${file}`,
    title: file.replace(/\.[^.]+$/i, "").replace(/[-_]+/g, " ").trim() || "Poster",
  }));
}
