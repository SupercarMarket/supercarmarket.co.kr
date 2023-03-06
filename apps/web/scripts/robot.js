const fs = require('fs');

const generatedSitemap = `
User-agent: *
Disallow: /api*/
`;

fs.writeFileSync('../public/robots.txt', generatedSitemap, 'utf8');
