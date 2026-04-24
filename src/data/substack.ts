import type { Article } from "./articles";
import { articles as fallbackArticles } from "./articles";
import substackCache from "./substack-cache.json";

const CACHE_TTL_MS = 15 * 60 * 1000;

let cachedArticles: Article[] | null = null;
let cachedAt = 0;

const isArticle = (value: unknown): value is Article => {
  if (!value || typeof value !== "object") return false;

  const article = value as Record<string, unknown>;
  return (
    typeof article.title === "string" &&
    typeof article.date === "string" &&
    typeof article.excerpt === "string" &&
    typeof article.href === "string" &&
    typeof article.readTime === "string" &&
    (article.image === undefined || typeof article.image === "string")
  );
};

const sortArticles = (articles: Article[]) =>
  [...articles].sort((a, b) => b.date.localeCompare(a.date));

const readCachedArticles = (): Article[] => {
  if (!Array.isArray(substackCache)) {
    throw new Error("Substack cache must be an array");
  }

  const articles = substackCache.filter(isArticle);
  if (articles.length === 0) {
    throw new Error("Substack cache does not contain any valid articles");
  }

  return sortArticles(articles);
};

export const getSubstackArticles = async (limit?: number): Promise<Article[]> => {
  const now = Date.now();
  if (cachedArticles && now - cachedAt < CACHE_TTL_MS) {
    return typeof limit === "number"
      ? cachedArticles.slice(0, limit)
      : cachedArticles;
  }

  try {
    const articles = readCachedArticles();
    cachedArticles = articles;
    cachedAt = now;

    return typeof limit === "number" ? articles.slice(0, limit) : articles;
  } catch (error) {
    console.warn("Substack cache load failed, using fallback articles.", error);
    return typeof limit === "number"
      ? fallbackArticles.slice(0, limit)
      : fallbackArticles;
  }
};
