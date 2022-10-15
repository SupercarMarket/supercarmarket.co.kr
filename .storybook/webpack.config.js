const path = require('path');

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    constants: path.resolve(__dirname, '../src/constants'),
  };
  return config;
};
