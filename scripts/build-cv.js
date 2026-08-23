// Copies the exported HTML CV into public/cv.html, strips the phone number,
// and gives it a proper browser-tab title.
//
// The CV is a self-extracting "bundled page" — its runtime script rebuilds the
// document head, which wipes any <title> in the source file and leaves the tab
// showing the raw URL. So we append a small script that sets the title after
// the bundler finishes (and re-asserts it briefly, since that happens async).
//
// Re-run this whenever you re-export the CV:
//   node scripts/build-cv.js                 # uses the newest export
//   node scripts/build-cv.js "path/to.html"  # or name one explicitly

const fs = require("fs");
const path = require("path");

const SRC_DIR =
  "C:\\Users\\User2\\Documents\\1_NASIF\\enterpreneship - building an online presence module\\HTML_CV";

// Exports get new filenames each time ("… CV Updated.html", "… _readble.html"),
// so default to whichever .html was modified most recently rather than
// hard-coding a name that goes stale.
function newestExport() {
  const files = fs
    .readdirSync(SRC_DIR)
    .filter((f) => f.toLowerCase().endsWith(".html"))
    .map((f) => path.join(SRC_DIR, f))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  if (!files.length) {
    console.error(`No .html export found in:\n  ${SRC_DIR}`);
    process.exit(1);
  }
  return files[0];
}

const SRC = process.argv[2] || newestExport();
const OUT = path.join(__dirname, "..", "public", "cv.html");
const TITLE = "Nasif M Safeer — CV";

// The public web copy drops the phone number — the CV page is crawlable, and
// email + LinkedIn are enough to make contact. Matches the whole
// `<a href="tel:...">…</a>` plus its trailing " | " separator. Content lives
// JSON-escaped inside the bundler payload, hence the \" and <\u002Fa> forms.
const PHONE_RE =
  /<a href=\\"tel:[^\\]*\\">[^<]*<\\u002Fa>(?:&nbsp;|\s)*\|(?:&nbsp;|\s)*/g;

// Anything here surviving into the output means redaction failed.
const MUST_NOT_APPEAR = ["706851", "tel:"];

// The CV renders as a fixed-width A4 page (<doc-page>, 864px). On a phone it
// overflows and gets clipped. Rather than rely on mobile zoom-to-fit, scale
// the page down explicitly to the available width — deterministic, and it
// keeps the layout identical, just smaller. Never scales above 1.
const PAGE_WIDTH = 864;

const RUNTIME_PATCH = `
<script>
  (function () {
    var t = ${JSON.stringify(TITLE)};
    var n = 0;

    function fitToWidth() {
      var page = document.querySelector("doc-page");
      if (!page) return;
      var avail = document.documentElement.clientWidth;
      var scale = Math.min(1, avail / ${PAGE_WIDTH});
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

if (!fs.existsSync(SRC)) {
  console.error(`Source CV not found:\n  ${SRC}`);
  process.exit(1);
}

let html = fs.readFileSync(SRC, "utf8");

// Redact the phone number. Fail loudly rather than silently publishing it: if
// a future export changes the markup, that must be fixed, not skipped.
const phoneMatches = html.match(PHONE_RE);
if (!phoneMatches) {
  console.error(
    "Could not find the phone number link to redact.\n" +
      "The CV export's markup may have changed — update PHONE_RE in this\n" +
      "script and re-run. Refusing to publish un-redacted."
  );
  process.exit(1);
}
html = html.replace(PHONE_RE, "");

if (!html.includes(TITLE)) {
  html = html.includes("</body>")
    ? html.replace("</body>", `${RUNTIME_PATCH}</body>`)
    : html + RUNTIME_PATCH;
}

fs.writeFileSync(OUT, html);

// Belt and braces: verify the written file, in case PHONE_RE only half-matched.
const written = fs.readFileSync(OUT, "utf8");
const leaked = MUST_NOT_APPEAR.filter((s) => written.includes(s));
if (leaked.length) {
  fs.unlinkSync(OUT);
  console.error(`Phone number still present (${leaked.join(", ")}). Output deleted.`);
  process.exit(1);
}

console.log(
  `cv.html <- ${path.basename(SRC)} (${(fs.statSync(OUT).size / 1024).toFixed(0)}KB)\n` +
    `  redacted phone number (${phoneMatches.length} link)\n` +
    `  title set to "${TITLE}"`
);
