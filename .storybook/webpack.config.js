const path = require('path');

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    constants: path.resolve(__dirname, '../src/constants'),
    components: path.resolve(__dirname, '../src/components'),
    pages: path.resolve(__dirname, '../src/pages'),
    styles: path.resolve(__dirname, '../src/styles'),
    types: path.resolve(__dirname, '../src/types'),
  };

  const rules = config.module.rules;
  const fileLoaderRule = rules.find((rule) => rule.test.test('.svg'));
  fileLoaderRule.exclude = /\.svg$/;

  rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });

  return config;
};
