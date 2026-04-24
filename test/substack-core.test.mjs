import test from "node:test";
import assert from "node:assert/strict";
import { parseSubstackFeed } from "../src/data/substack-core.mjs";

test("parseSubstackFeed normalizes and sorts RSS items", () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
    <channel>
      <item>
        <title><![CDATA[Older Post]]></title>
        <description><![CDATA[Short description]]></description>
        <link>https://example.com/older</link>
        <pubDate>Mon, 01 Jan 2024 10:00:00 GMT</pubDate>
        <enclosure url="https://example.com/older.png" />
        <content:encoded><![CDATA[<p>Ignored because description wins.</p>]]></content:encoded>
      </item>
      <item>
        <title><![CDATA[Newer Post]]></title>
        <link>https://example.com/newer</link>
        <pubDate>Tue, 02 Jan 2024 10:00:00 GMT</pubDate>
        <content:encoded><![CDATA[
          <p>This body has enough words to produce a one minute read time.</p>
        ]]></content:encoded>
      </item>
    </channel>
  </rss>`;

  const articles = parseSubstackFeed(xml);

  assert.equal(articles.length, 2);
  assert.equal(articles[0].title, "Newer Post");
  assert.equal(articles[0].date, "2024-01-02");
  assert.equal(articles[0].href, "https://example.com/newer");
  assert.equal(articles[0].readTime, "1 min");
  assert.equal(articles[1].excerpt, "Short description");
  assert.equal(articles[1].image, "https://example.com/older.png");
});

test("parseSubstackFeed drops items without links", () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss xmlns:content="http://purl.org/rss/1.0/modules/content/" version="2.0">
    <channel>
      <item>
        <title><![CDATA[Missing Link]]></title>
        <pubDate>Mon, 01 Jan 2024 10:00:00 GMT</pubDate>
        <content:encoded><![CDATA[<p>Body copy</p>]]></content:encoded>
      </item>
    </channel>
  </rss>`;

  const articles = parseSubstackFeed(xml);

  assert.deepEqual(articles, []);
});
