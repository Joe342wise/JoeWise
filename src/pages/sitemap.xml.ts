import type { APIRoute } from "astro";

const routes = ["/"];

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ?? new URL("http://localhost:8080");
  const lastModified = new Date().toISOString();
  const urls = routes
    .map((route) => {
      const location = new URL(route, baseUrl).toString();
      return `<url><loc>${location}</loc><lastmod>${lastModified}</lastmod></url>`;
    })
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
