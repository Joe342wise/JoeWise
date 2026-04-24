import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { FEED_URL, parseSubstackFeed } from "../src/data/substack-core.mjs";

const CACHE_PATH = fileURLToPath(
  new URL("../src/data/substack-cache.json", import.meta.url),
);

const response = await fetch(FEED_URL, {
  signal: AbortSignal.timeout(15000),
});

if (!response.ok) {
  throw new Error(`Failed to refresh Substack feed: ${response.status}`);
}

const xml = await response.text();
const articles = parseSubstackFeed(xml);

await writeFile(CACHE_PATH, `${JSON.stringify(articles, null, 2)}\n`, "utf8");

console.log(`Refreshed ${articles.length} Substack articles into ${CACHE_PATH}`);
