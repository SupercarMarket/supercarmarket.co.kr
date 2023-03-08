cd public
rm -rf robots.txt && rm -rf sitemap && rm -rf sitemap.xml
mkdir sitemap
cd .. && cd scripts
node ./robot.js
node ./sitemap-default.js
node ./sitemap-dynamic.js
node ./sitemap-compressor.js
node ./sitemap-merge.js