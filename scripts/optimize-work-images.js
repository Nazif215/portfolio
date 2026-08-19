const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC_BASE = "C:\\Users\\User2\\Documents\\1_NASIF\\Portfolio";
const OUT_BASE = path.join(__dirname, "..", "public", "work");

const HERO_MAX_WIDTH = 2400;
const HERO_QUALITY = 82;
const EXTRA_MAX_WIDTH = 1200;
const EXTRA_QUALITY = 72;

const IMAGE_EXT = /\.(jpe?g|png|jfif|webp)$/i;

// slug -> { dir, hero: srcRelPath, gallery: [srcRelPath, ...] }
// "gallery" = hand-curated polished-work highlights (converted at high quality).
// Everything else found under `dir` (excluding video/reel folders) is treated
// as "extra" — converted at a lighter weight and appended after the gallery.
const MANIFEST = {
  occultus: {
    dir: "1.occultus_heavycharacter",
    hero: "finalout and book/00.jpg",
    gallery: [
      "finalout and book/20.jpg",
      "finalout and book/12.jpg",
      "finalout and book/10.jpg",
      "heavy_character_mocap walk/4.png",
      "more images/035.png",
      "more images/040.png",
    ],
    // These live inside the "reference" folder but are the artist's own WIP
    // renders for this project (not third-party mood-board material) — force
    // them into the process bucket instead of the folder-based default.
    forceProcess: [
      "heavy2.1.png",
      "heavy2.png",
      "heavy_final.png",
      "heavy_finala.png",
      "heavy_finalb.png",
      "heavy_png.png",
      "heavy_try.png",
    ],
  },
  "typography-vengeance": {
    dir: "2.Typography_Vengeance",
    hero: "images/009.png",
    gallery: [
      "images/017.png",
      "images/016.png",
      "images/015.png",
      "images/018.png",
      "images/019.png",
    ],
  },
  "kerala-heritage": {
    dir: "3.Kerala Art and Craft project - A Kerala government project",
    hero: "final render/sho2.jpeg",
    gallery: [
      "final render/shot6.jpeg",
      "final render/sho1.jpeg",
      "final render/sho4.jpeg",
      "final render/shot5.jpeg",
      "final render/shot7.jpeg",
    ],
  },
  "tintin-bg-study": {
    dir: "5.BG receration - Adventure of tintin",
    hero: "book and details/48.jpg",
    gallery: [
      "book and details/49.jpg",
      "book and details/26.jpg",
      "book and details/30.jpg",
      "book and details/36.jpg",
    ],
  },
  "hulk-bust": {
    dir: "6.hulk",
    hero: "images/029.png",
    gallery: [
      "book images/60.jpg",
      "book images/53.jpg",
      "hulk_bust mocap/a.png",
      "hulk_bust mocap/1.png",
    ],
  },
  "mike-the-sculptor": {
    dir: "7.cute character",
    hero: "007.png",
    gallery: ["004.png", "001.png", "003.png", "005.png", "006.png"],
  },
  "stone-house": {
    dir: "photogrametry",
    // render/replace/ holds the artist's re-graded pass of the key shots —
    // same framings, brighter and far more readable than the originals. The
    // hero and most of the gallery come from there.
    hero: "render/replace/house_closeup.0004_001.png",
    gallery: [
      "render/sTone_House_cinematics.0003_001.jpg",
      "render/sTone_House_cinematics.0003_002.jpg",
      "render/replace/house_closeup.0004_002.png",
      "process/comp_ext.png",
      "render/replace/house_closeup.0004_005.png",
      "render/replace/house_closeup.0004_003.png",
      // Also the cover shot — shown in the gallery so it can be opened full
      // size, since the case-study hero slot is taken by the video.
      "render/replace/house_closeup.0004_001.png",
      "render/replace/house_closeup.0004_004.png",
    ],
    // A professional photograph of the real building used as capture
    // reference — not the artist's own render.
    forceReference: ["1.APM-June-CF002804-scaled-1-2048x1538.jpg"],
    exclude: [
      // Night frames that are ~95% black — legible in motion, unreadable
      // as stills in a grid.
      "Window.0003.jpg",
      "Window.0003_001.jpg",
      "Window.0003_002.jpg",
      // Near-duplicate of house_closeup.0004.jpg — dropped by the artist.
      "house_closeup.0003.jpg",
      // Darker originals superseded by their render/replace/ re-grades.
      "sTone_House_cinematics.0003.jpg",
      "house_inside.0003_001.jpg",
      "house_inside.0003.jpg",
      "house_closeup.0004_001.jpg",
    ],
  },
};

// Optional CLI filter: `node scripts/optimize-work-images.js stone-house`
// re-processes just that project instead of all of them.
const ONLY = process.argv.slice(2);

function walkImages(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkImages(full));
    } else if (IMAGE_EXT.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

async function convert(srcPath, outPath, { width, quality }) {
  await sharp(srcPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outPath);
  const { size } = fs.statSync(outPath);
  console.log(`  ${path.basename(outPath)} <- ${path.basename(srcPath)} (${(size / 1024).toFixed(0)}KB)`);
}

async function run() {
  for (const [
    slug,
    { dir, hero, gallery, forceProcess = [], forceReference = [], exclude = [] },
  ] of Object.entries(MANIFEST)) {
    if (ONLY.length && !ONLY.includes(slug)) continue;
    const outDir = path.join(OUT_BASE, slug);
    fs.mkdirSync(outDir, { recursive: true });
    console.log(`\n=== ${slug} ===`);

    const projectRoot = path.join(SRC_BASE, dir);
    const heroAbs = path.join(projectRoot, hero);
    const galleryAbs = gallery.map((g) => path.join(projectRoot, g));

    await convert(heroAbs, path.join(outDir, "hero.webp"), {
      width: HERO_MAX_WIDTH,
      quality: HERO_QUALITY,
    });

    for (let i = 0; i < galleryAbs.length; i++) {
      await convert(galleryAbs[i], path.join(outDir, `gallery-${String(i + 1).padStart(2, "0")}.webp`), {
        width: HERO_MAX_WIDTH,
        quality: HERO_QUALITY,
      });
    }

    const used = new Set([heroAbs, ...galleryAbs]);
    const excludeNames = new Set(exclude.map((f) => f.toLowerCase()));
    const all = walkImages(projectRoot);
    const remaining = all.filter(
      (f) => !used.has(f) && !excludeNames.has(path.basename(f).toLowerCase())
    );

    // Files under a folder literally named "reference" are mood-board /
    // inspiration material; everything else remaining is the artist's own
    // process work (mocap, wip screenshots, extra book pages, etc). Some
    // files get saved into "reference" that are actually the artist's own
    // WIP — forceProcess overrides the folder-based default for those, and
    // forceReference does the reverse for third-party material filed
    // alongside the artist's own process shots.
    const forceProcessNames = new Set(forceProcess.map((f) => f.toLowerCase()));
    const forceReferenceNames = new Set(forceReference.map((f) => f.toLowerCase()));
    const isReference = (f) => {
      const base = path.basename(f).toLowerCase();
      if (forceReferenceNames.has(base)) return true;
      if (forceProcessNames.has(base)) return false;
      return path
        .relative(projectRoot, f)
        .split(path.sep)
        .some((segment) => segment.toLowerCase() === "reference");
    };

    const reference = remaining.filter(isReference);
    const process = remaining.filter((f) => !isReference(f));

    for (let i = 0; i < reference.length; i++) {
      await convert(reference[i], path.join(outDir, `reference-${String(i + 1).padStart(3, "0")}.webp`), {
        width: EXTRA_MAX_WIDTH,
        quality: EXTRA_QUALITY,
      });
    }
    for (let i = 0; i < process.length; i++) {
      await convert(process[i], path.join(outDir, `process-${String(i + 1).padStart(3, "0")}.webp`), {
        width: EXTRA_MAX_WIDTH,
        quality: EXTRA_QUALITY,
      });
    }
    console.log(`  (${reference.length} reference, ${process.length} process)`);
  }
  console.log("\nDone.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
