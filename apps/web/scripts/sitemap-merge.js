require('dotenv').config();

const fs = require('fs');
const prettier = require('prettier');

const date = new Date().toISOString().slice(0, 10);
const DOMAIN =
  process.env.NEXT_PUBLIC_URL || 'https://supercar-market.vercel.app';

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

(async () => {
  const { globby } = await import('globby');

  const pages = await globby(['../public/sitemap/*.gz']);

  const sitemapIndex = `
    ${pages
      .map((page) => {
        const path = page.replace('../public/', '');
        return `
          <sitemap>
            <loc>${`${DOMAIN}/${path}`}</loc>
            <lastmod>${date}</lastmod>
          </sitemap>`;
      })
      .join('')}
  `;

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapIndex}
    </sitemapindex>
  `;

  const formattedSitemap = formatted(sitemap);

  fs.writeFileSync('../public/sitemap.xml', formattedSitemap, 'utf8');
})();
