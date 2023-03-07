require('dotenv').config();

const fs = require('fs');
const prettier = require('prettier');

const targets = [
  {
    title: 'magazine',
    url: '/supercar/v1/magazine',
    query: {},
  },
  {
    title: 'market',
    url: '/supercar/v1/shop',
    query: {},
  },
  {
    title: 'partnership',
    url: '/supercar/v1/partnership',
    query: {},
  },
  {
    title: 'community',
    url: '/supercar/v1/community',
    query: {
      category: 'all',
    },
  },
];

const today = new Date().toISOString().slice(0, 10);

const DOMAIN =
  process.env.NEXT_PUBLIC_URL || 'https://supercar-market.vercel.app';

const formatted = (sitemap) => prettier.format(sitemap, { parser: 'html' });

const createSiteMap = async (target) => {
  const { title, url, query: _query } = target;

  const list = [];
  let page = 1;

  const fetch = await import('node-fetch');

  while (true) {
    const query = `?${new URLSearchParams({ ..._query, page })}`;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${url}${query}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) throw 'fail to creat dynamic sitemap';

    const result = await response.json();

    const { isLastPage, lastPage, data } = result;

    data.map((d) => list.push(d));

    if (isLastPage || lastPage) {
      break;
    } else {
      page += 1;
    }
  }

  const siteMap = `${list
    .map((data) => {
      if (title !== 'magazine') {
        return `
          <url>
              <loc>${DOMAIN}/${title}/${data.category.toLowerCase()}/${
          data.id || data.brdSeq
        }</loc>
              <lastmod>${today}</lastmod>
          </url>
          `;
      }
      return `
          <url>
              <loc>${DOMAIN}/${title}/${data.id}</loc>
              <lastmod>${today}</lastmod>
          </url>
          `;
    })
    .join('')}
    `;

  const generatedSitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        >
          ${siteMap}
        </urlset>
      `;

  const formattedSitemap = formatted(generatedSitemap).toString();

  fs.writeFileSync(
    `../public/sitemap/sitemap-${title}.xml`,
    formattedSitemap,
    'utf8'
  );
};

targets.forEach(async (target) => await createSiteMap(target));
