// Copies the exported HTML CV into public/ and patches its <title>.
//
// The CV is a self-extracting "bundled page" — its runtime script rebuilds
// the document head, which wipes any <title> in the source file and leaves
// the browser tab showing the raw URL. So we append a small script that sets
// the title after the bundler has finished (and re-asserts it briefly, since
// the bundler writes the head asynchronously).
//
// Re-run this whenever you re-export the CV:
//   node scripts/build-cv.js                 # uses the newest export
//   node scripts/build-cv.js "path/to.html"  # or name one explicitly

const fs = require("fs");
const path = require("path");

const SRC_DIR =
  "C:\\Users\\User2\\Documents\\1_NASIF\\enterpreneship - building an online presence module\\HTML_CV";

// Exports get new filenames ("… CV Updated.html"), so default to whichever
// .html in the CV folder was modified most recently rather than hard-coding.
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
// email + LinkedIn are enough for someone to make contact. Matches the whole
// `<a href="tel:...">…</a>` plus the trailing " | " separator. Content lives
// JSON-escaped inside the bundler payload, hence the \" and </a> forms.
const PHONE_RE =
  /<a href=\\"tel:[^\\]*\\">[^<]*<\\u002Fa>(?:&nbsp;|\s)*\|(?:&nbsp;|\s)*/g;

const TITLE_PATCH = `
<script>
  (function () {
    var t = ${JSON.stringify(TITLE)};
    var n = 0;
    function set() {
      if (document.title !== t) document.title = t;
      if (++n > 40) clearInterval(iv);
    }
    set();
    var iv = setInterval(set, 250);
  })();
</script>
`;

if (!fs.existsSync(SRC)) {
  console.error(`Source CV not found:\n  ${SRC}`);
  process.exit(1);
}

let html = fs.readFileSync(SRC, "utf8");

// Redact the phone number. Fail loudly rather than silently publishing it:
// if a future re-export changes the markup, this must be fixed, not skipped.
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
console.log(`  redacted phone number (${phoneMatches.length} link)`);

if (html.includes(TITLE)) {
  console.log("Source already patched — copying as-is.");
} else if (html.includes("</body>")) {
  html = html.replace("</body>", `${TITLE_PATCH}</body>`);
} else {
  html += TITLE_PATCH;
}

fs.writeFileSync(OUT, html);
console.log(
  `cv.html <- ${path.basename(SRC)} (${(fs.statSync(OUT).size / 1024).toFixed(0)}KB)\n` +
    `  title set to "${TITLE}"`
);

// Belt and braces: never let the published file contain the number, even if
// the markup shifts in a way PHONE_RE half-matches.
const leaked = ["706851", "tel:"].filter((s) => fs.readFileSync(OUT, "utf8").includes(s));
if (leaked.length) {
  fs.unlinkSync(OUT);
  console.error(`Phone number still present (${leaked.join(", ")}). Output deleted.`);
  process.exit(1);
}
