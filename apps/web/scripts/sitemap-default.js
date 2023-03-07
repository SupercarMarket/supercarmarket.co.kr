const fs = require('fs');
const prettier = require('prettier');

const date = new Date().toISOString().slice(0, 10);

const DOMAIN =
  process.env.NEXT_PUBLIC_URL || 'https://supercar-market.vercel.app/';

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

(async () => {
  const { globby } = await import('globby');

  const pages = await globby([
    // include route
    '../src/pages/**/*.tsx',
    '../src/pages/*.tsx',
    // exclude route
    '!../src/pages/_*.tsx',
    '!../src/pages/api/*.tsx',
    '!../src/pages/api/**/*.tsx',
    '!../src/pages/**/[*.tsx',
    '!../src/pages/**/[*/*.tsx',
  ]);

  const pagesSitemap = `
    ${pages
      .map((page) => {
        const path = page
          .replace('../src/pages/', '')
          .replace('.tsx', '')
          .replace(/\/index/g, '');
        const routePath = path === 'index' ? '' : path;
        return `
          <url>
            <loc>${DOMAIN}/${routePath}</loc>
            <lastmod>${date}</lastmod>
          </url>
        `;
      })
      .join('')}
  `;

  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${pagesSitemap}
    </urlset>
  `;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync(
    '../public/sitemap/sitemap-default.xml',
    formattedSitemap,
    'utf8'
  );
})();
