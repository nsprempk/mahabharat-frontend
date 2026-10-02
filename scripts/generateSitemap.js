import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendRoot = path.resolve(__dirname, "..");

const publicDir = path.join(frontendRoot, "public");

const sitemapPath = path.join(publicDir, "sitemap.xml");

const SITE_URL = "https://bhagavadgita.site";

/*
|--------------------------------------------------------------------------
| Bhagavad Gita verse counts
|--------------------------------------------------------------------------
*/

const chapterVerseCounts = {
  1: 47,
  2: 72,
  3: 43,
  4: 42,
  5: 29,
  6: 47,
  7: 30,
  8: 28,
  9: 34,
  10: 42,
  11: 55,
  12: 20,
  13: 34,
  14: 27,
  15: 20,
  16: 24,
  17: 28,
  18: 78,
};

/*
|--------------------------------------------------------------------------
| Static pages
|--------------------------------------------------------------------------
*/

const staticPages = [
  "/",
  "/gita",
  "/about",
  "/contact",
  "/privacy-policy",
  "/cookie-policy",
  "/terms",
  "/disclaimer",
  "/advertising-policy",
];

/*
|--------------------------------------------------------------------------
| XML escape
|--------------------------------------------------------------------------
*/

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/*
|--------------------------------------------------------------------------
| URL entries
|--------------------------------------------------------------------------
*/

const urls = [];

/*
 * Static pages
 */

for (const page of staticPages) {
  urls.push({
    loc: `${SITE_URL}${page}`,
  });
}

/*
 * Chapter pages
 */

for (let chapter = 1; chapter <= 18; chapter++) {
  urls.push({
    loc: `${SITE_URL}/gita/adhyay/${chapter}`,
  });
}

/*
 * Individual shloka pages
 */

for (let chapter = 1; chapter <= 18; chapter++) {
  const verseCount = chapterVerseCounts[chapter];

  for (let verse = 1; verse <= verseCount; verse++) {
    urls.push({
      loc: `${SITE_URL}/gita/adhyay/${chapter}/shlok/${verse}`,
    });
  }
}

/*
|--------------------------------------------------------------------------
| Build XML
|--------------------------------------------------------------------------
*/

const xmlEntries = urls
  .map(
    (item) =>
      `  <url>\n` + `    <loc>${escapeXml(item.loc)}</loc>\n` + `  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${xmlEntries}
</urlset>
`;

/*
|--------------------------------------------------------------------------
| Write file
|--------------------------------------------------------------------------
*/

fs.mkdirSync(publicDir, {
  recursive: true,
});

fs.writeFileSync(sitemapPath, xml, "utf8");

/*
|--------------------------------------------------------------------------
| Verification
|--------------------------------------------------------------------------
*/

console.log("");
console.log("==========================================");
console.log("       GITA SITEMAP GENERATED");
console.log("==========================================");
console.log(`URLs: ${urls.length}`);
console.log(`File: ${sitemapPath}`);
console.log("==========================================");
console.log("");
