export type Category = "Character Art" | "Environment" | "Typography";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  tools: string[];
  image: string;
  /** Whether the hero/cover image should be fully visible (contain) or fill+crop (cover). */
  heroFit: "cover" | "contain";
  gallery: string[];
  /** Count of /work/<slug>/reference-NNN.webp — mood-board / inspiration images. */
  referenceCount: number;
  /** Count of /work/<slug>/process-NNN.webp — the artist's own remaining wip/process images. */
  processCount: number;
  /** YouTube video id, or null while a reel is still being uploaded */
  video: string | null;
  role: string;
  stat: { value: string; label: string };
  challenge: string;
  process: string;
  outcome: string;
  lessons: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "occultus",
    title: "Occultus",
    category: "Character Art",
    tools: ["ZBrush", "Marmoset Toolbag", "Blender", "Substance Painter", "Photoshop"],
    image: "/work/occultus/hero.webp",
    heroFit: "cover",
    gallery: [
      "/work/occultus/gallery-01.webp",
      "/work/occultus/gallery-02.webp",
      "/work/occultus/gallery-03.webp",
      "/work/occultus/gallery-04.webp",
      "/work/occultus/gallery-05.webp",
      "/work/occultus/gallery-06.webp",
    ],
    referenceCount: 65,
    processCount: 51,
    video: null,
    role: "Character Artist",
    stat: { value: "26-page", label: "concept book, full pipeline breakdown" },
    challenge:
      "Design and build an original heavy-armor creature character from the ground up — antlered skull helm, layered plate and bone armor, hand-designed weapons — believable as a single cohesive being rather than a pile of separate props.",
    process:
      "Blocked out proportions and silhouette early, then sculpted the full character in ZBrush, working from base forms up through musculature, armor plating and surface detail. Weapons and props were designed as their own concept pass before being sculpted and fitted to the character. Final textures were built in Substance Painter, with lookdev and turntables rendered in Marmoset Toolbag and final hero shots composited in Blender's Cycles renderer.",
    outcome:
      "A complete character concept book — sculpt breakdowns, wireframes, prop turnarounds and final cinematic renders — presented as a self-published portfolio piece under the working title OCCVLTVZ.",
    lessons:
      "Documenting the pipeline as a proper book (not just a final image dump) forced a much more disciplined breakdown of decisions at each stage, which made the final presentation far stronger than a single beauty render on its own.",
  },
  {
    slug: "typography-vengeance",
    title: "Vengeance",
    category: "Typography",
    tools: ["Blender", "Photoshop"],
    image: "/work/typography-vengeance/hero.webp",
    heroFit: "contain",
    gallery: [
      "/work/typography-vengeance/gallery-01.webp",
      "/work/typography-vengeance/gallery-02.webp",
      "/work/typography-vengeance/gallery-03.webp",
      "/work/typography-vengeance/gallery-04.webp",
      "/work/typography-vengeance/gallery-05.webp",
    ],
    referenceCount: 0,
    processCount: 20,
    video: null,
    role: "3D Typography & Environment Artist",
    stat: { value: "9 letters", label: "each built as its own fully rendered 3D scene" },
    challenge:
      "Push typography past flat lettering — build each letter of the word VENGEANCE as a complete, dramatically lit 3D war environment, so the word reads as a scene rather than a font.",
    process:
      "Built a WWII-inspired visual language — bomber formations, blast clouds, sunken wreckage, wildlife reclaiming the ruins — and constructed each letterform as a small 3D environment inside that world, using volumetric lighting to mimic sunlight scattering through smoke and water. Every letter was lit, dressed and rendered as its own individual shot before being composited into the final title sequence.",
    outcome:
      "A complete 3D typography piece where every letter is a standalone rendered environment, tied together by a single quote — \"Only the dead have seen the end of war.\"",
    lessons:
      "Treating each letter as a full environment rather than a textured extrusion made the piece far more time-intensive, but it's what makes the title read as cinematic rather than decorative.",
  },
  {
    slug: "kerala-heritage",
    title: "Kerala Art & Craft",
    category: "Environment",
    tools: ["Blender", "Photoshop"],
    image: "/work/kerala-heritage/hero.webp",
    heroFit: "contain",
    gallery: [
      "/work/kerala-heritage/gallery-01.webp",
      "/work/kerala-heritage/gallery-02.webp",
      "/work/kerala-heritage/gallery-03.webp",
      "/work/kerala-heritage/gallery-04.webp",
      "/work/kerala-heritage/gallery-05.webp",
    ],
    referenceCount: 13,
    processCount: 13,
    video: null,
    role: "Environment Artist",
    stat: { value: "6 panoramic shots", label: "ultra-wide renders for a government heritage exhibit" },
    challenge:
      "Commissioned as part of a Kerala government art & craft initiative — render a sequence of ultra-wide panoramic environments tracing the origins of art, from early hominid life on the savanna through to human craft.",
    process:
      "Built and dressed each scene as a full 3D environment — savanna grasslands, orchard trees, early hominid figures — lit for a warm, dusk-leaning naturalistic palette, and rendered in an ultra-wide panoramic format suited to large-scale exhibit display.",
    outcome:
      "A set of six panoramic environment renders delivered for the exhibit, forming a visual timeline from early life to the origins of craft.",
    lessons:
      "Designing for an ultra-wide panoramic format from the start — not cropping down from a standard render — changed how every scene had to be composed and lit.",
  },
  {
    slug: "tintin-bg-study",
    title: "Recreated Shot — Adventure of Tintin",
    category: "Environment",
    tools: ["Autodesk Maya", "Photoshop"],
    image: "/work/tintin-bg-study/hero.webp",
    heroFit: "contain",
    gallery: [
      "/work/tintin-bg-study/gallery-01.webp",
      "/work/tintin-bg-study/gallery-02.webp",
      "/work/tintin-bg-study/gallery-03.webp",
      "/work/tintin-bg-study/gallery-04.webp",
    ],
    referenceCount: 0,
    processCount: 19,
    video: null,
    role: "Personal study — Environment Artist",
    stat: { value: "1:1", label: "shot-for-shot recreation, matched to the original film still" },
    challenge:
      "A personal training exercise: reconstruct a background shot from The Adventures of Tintin (2011) in 3D as closely as possible to the original film still, to study professional matte-painting and background composition.",
    process:
      "Started with traditional watercolour studies of the source shot to understand composition and colour before touching 3D. Modeled the scene's architecture in Autodesk Maya at correct human-scale proportions, matched the camera angle and depth of field to the reference still, then built up detail from blocked-out primitives to the finished background.",
    outcome:
      "A side-by-side recreation matched closely to the original film frame — a personal study, not production work on the film itself.",
    lessons:
      "Matching an existing shot exactly is a different (and harder) discipline than designing an original scene — every proportion and lighting choice has a ground truth to be judged against.",
  },
  {
    slug: "hulk-bust",
    title: "Hulk",
    category: "Character Art",
    tools: ["ZBrush"],
    image: "/work/hulk-bust/hero.webp",
    heroFit: "contain",
    gallery: [
      "/work/hulk-bust/gallery-01.webp",
      "/work/hulk-bust/gallery-02.webp",
      "/work/hulk-bust/gallery-03.webp",
      "/work/hulk-bust/gallery-04.webp",
    ],
    referenceCount: 0,
    processCount: 37,
    video: null,
    role: "Personal study — Character Artist",
    stat: { value: "Full sculpt", label: "base mesh through final anatomy render, fan art study" },
    challenge:
      "A personal anatomy study: sculpt Marvel's Hulk from a base mesh, focusing on believable muscle structure and skin surface detail under ZBrush's sculpting toolset.",
    process:
      "Blocked the figure out with ZBrush's Dynamesh to establish primary proportions, then refined musculature, veins and skin texture using ClayBuildup, DamStandard and Inflate brushes, with close attention to anatomical accuracy in the face, hands and major muscle groups. Finished with polypainting for base skin tones and BPR renders for the final presentation.",
    outcome:
      "A finished character sculpt and render study — fan art, done to practice large-scale anatomical sculpting rather than as licensed or commercial work.",
    lessons:
      "Sculpting an already-iconic character is a useful discipline precisely because there's no room to hide — anatomy that reads wrong is immediately obvious against a design everyone already knows.",
  },
  {
    slug: "mike-the-sculptor",
    title: "Mike the Sculptor",
    category: "Character Art",
    tools: ["ZBrush", "Procreate", "Traditional clay"],
    image: "/work/mike-the-sculptor/hero.webp",
    heroFit: "contain",
    gallery: [
      "/work/mike-the-sculptor/gallery-01.webp",
      "/work/mike-the-sculptor/gallery-02.webp",
      "/work/mike-the-sculptor/gallery-03.webp",
      "/work/mike-the-sculptor/gallery-04.webp",
      "/work/mike-the-sculptor/gallery-05.webp",
    ],
    referenceCount: 0,
    processCount: 0,
    video: null,
    role: "Character Designer",
    stat: { value: "Concept → 3D → clay", label: "designed digitally, then hand-sculpted as a physical maquette" },
    challenge:
      "Design an original stylized character — a warm, chibi-proportioned caricature of Michelangelo, sculptor's tools and curl-textured hair and beard standing in for chiselled marble — and carry the design through into a physical form.",
    process:
      "Developed the character through turnaround sketches to lock proportions and silhouette, referencing Michelangelo's own portraits, sculpting tools and works like David for authentic detail. The design was then hand-sculpted as a physical clay maquette, translating the digital turnaround into a tangible, paintable figure.",
    outcome:
      "A complete stylized character — concept turnaround plus a finished hand-sculpted and painted clay maquette.",
    lessons:
      "Taking a character all the way to a physical clay maquette surfaces proportion and silhouette problems that are easy to miss on screen, where you can rotate around an idealized digital camera instead of a real object in your hands.",
  },
];

/** Mood-board / inspiration images, shown after the curated gallery. */
export function referenceImages(project: Project): string[] {
  return Array.from(
    { length: project.referenceCount },
    (_, i) => `/work/${project.slug}/reference-${String(i + 1).padStart(3, "0")}.webp`
  );
}

/** The artist's own remaining wip/process images, shown after the curated gallery. */
export function processImages(project: Project): string[] {
  return Array.from(
    { length: project.processCount },
    (_, i) => `/work/${project.slug}/process-${String(i + 1).padStart(3, "0")}.webp`
  );
}
