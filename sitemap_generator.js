const sitemap = require("nextjs-sitemap-generator");

sitemap({
  baseUrl: "https://peterhub.dev",
  pagesDirectory: `${__dirname}/.next/server/static/VMopyQosvUDsdHcvY3GhY/pages`,
  targetDirectory: "public/",
  ignoredExtensions: ["png", "jpg"],
});

console.log(`✅ sitemap.xml generated!`);
