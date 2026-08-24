// Publishes the HTML CV to public/cv.html, stripping the phone number and
// giving it a proper browser-tab title.
//
// The CV tool exports two shapes:
//   * a single self-contained bundle ("Nasif Safeer CV.html"), and
//   * an unpacked page ("… .dc.html") plus sibling support.js / doc-page.js
//     / _ds assets.
// The unpacked .dc.html is the one that actually gets edited, so we prefer it
// and copy its assets into public/cv-assets/, rewriting the relative paths.
//
// Re-run after any CV edit:
//   node scripts/build-cv.js                 # uses the default source below
//   node scripts/build-cv.js "path/to.html"  # or name one explicitly

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "ATS-friendly CV creation");
const SRC = process.argv[2] || path.join(SRC_DIR, "Nasif Safeer CV.dc.html");

const OUT = path.join(ROOT, "public", "cv.html");
const ASSET_OUT = path.join(ROOT, "public", "cv-assets");
const ASSET_URL = "/cv-assets";

// Sibling files the .dc.html loads relatively.
const ASSETS = ["support.js", "doc-page.js", "_ds"];

const TITLE = "Nasif M Safeer — CV";

// Drop the phone number from the public copy — the CV page is crawlable, and
// email + LinkedIn are enough to make contact. Two markup shapes: plain HTML
// (.dc.html) and JSON-escaped inside the bundler payload (bundled .html).
const PHONE_RES = [
  /<a href="tel:[^"]*">[^<]*<\/a>(?:&nbsp;|\s)*\|(?:&nbsp;|\s)*/g,
  /<a href=\\"tel:[^\\]*\\">[^<]*<\\u002Fa>(?:&nbsp;|\s)*\|(?:&nbsp;|\s)*/g,
];

// What the output must not contain is derived from whatever was redacted, so
// the number itself never gets hardcoded here (this file is committed).

// The CV renders as a fixed-width A4 page (<doc-page>, 864px). On a phone it
// would overflow and get clipped, so scale it down to the available width —
// deterministic, keeps the layout identical, and never scales above 1.
const PAGE_WIDTH = 864;

const RUNTIME_PATCH = `
<script>
  (function () {
    var t = ${JSON.stringify(TITLE)};
    var n = 0;

    function fitToWidth() {
      var page = document.querySelector("doc-page");
      if (!page) return;
      var scale = Math.min(1, document.documentElement.clientWidth / ${PAGE_WIDTH});
      var next = scale < 1 ? String(scale) : "";
      if (page.style.zoom !== next) page.style.zoom = next;
    }

    function fix() {
      if (document.title !== t) document.title = t;
      fitToWidth();
      if (++n > 40) clearInterval(iv);
    }

    fix();
    var iv = setInterval(fix, 250);
    window.addEventListener("resize", fitToWidth);
  })();
</script>
`;

function die(msg) {
  console.error(msg);
  process.exit(1);
}

function copyRecursive(from, to) {
  const stat = fs.statSync(from);
  if (stat.isDirectory()) {
    fs.mkdirSync(to, { recursive: true });
    for (const entry of fs.readdirSync(from)) {
      copyRecursive(path.join(from, entry), path.join(to, entry));
    }
  } else {
    fs.copyFileSync(from, to);
  }
}

if (!fs.existsSync(SRC)) die(`Source CV not found:\n  ${SRC}`);

let html = fs.readFileSync(SRC, "utf8");

// --- Redact the phone number -------------------------------------------
// Fail loudly rather than silently publishing it: if a future export changes
// the markup, that must be fixed, not skipped.
let redacted = 0;
const forbidden = new Set(["tel:"]);
for (const re of PHONE_RES) {
  const m = html.match(re);
  if (m) {
    redacted += m.length;
    // Remember the digit runs we just removed, to verify against later.
    for (const hit of m) {
      for (const digits of hit.match(/\d{6,}/g) || []) forbidden.add(digits);
    }
    html = html.replace(re, "");
  }
}
if (!redacted) {
  die(
    "Could not find the phone number link to redact.\n" +
      "The CV export's markup may have changed — update PHONE_RES in this\n" +
      "script and re-run. Refusing to publish un-redacted."
  );
}

// --- Point relative asset paths at /cv-assets --------------------------
const srcDir = path.dirname(SRC);
const copied = [];
for (const asset of ASSETS) {
  const from = path.join(srcDir, asset);
  if (!fs.existsSync(from)) continue;
  fs.rmSync(path.join(ASSET_OUT, asset), { recursive: true, force: true });
  fs.mkdirSync(ASSET_OUT, { recursive: true });
  copyRecursive(from, path.join(ASSET_OUT, asset));
  copied.push(asset);
}

html = html
  .replace(/(src|href)="\.\//g, `$1="${ASSET_URL}/`)
  .replace(/(src|href)="_ds\//g, `$1="${ASSET_URL}/_ds/`);

// --- Title + mobile fit -------------------------------------------------
if (!html.includes(TITLE)) {
  html = html.includes("</body>")
    ? html.replace("</body>", `${RUNTIME_PATCH}</body>`)
    : html + RUNTIME_PATCH;
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);

// --- Belt and braces ----------------------------------------------------
const written = fs.readFileSync(OUT, "utf8");
const leaked = [...forbidden].filter((s) => written.includes(s));
if (leaked.length) {
  fs.unlinkSync(OUT);
  die(`Phone number still present (${leaked.join(", ")}). Output deleted.`);
}

const stillRelative = html.match(
  /(?:src|href)="(?!https?:|mailto:|tel:|\/|#|data:)[^"]+"/g
);
if (stillRelative) {
  console.warn(
    `  warning: unresolved relative paths — ${[...new Set(stillRelative)].join(", ")}`
  );
}

console.log(
  `cv.html <- ${path.basename(SRC)} (${(fs.statSync(OUT).size / 1024).toFixed(0)}KB)\n` +
    `  redacted phone number (${redacted} link)\n` +
    `  title set to "${TITLE}"\n` +
    `  assets -> public/cv-assets/ (${copied.join(", ") || "none"})`
);
