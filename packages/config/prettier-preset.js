module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  singleQuote: true,
  arrowParens: 'always',
  importOrder: [
    '^@(supercarmarket|ee)/(.*)$',
    '^@lib/(.*)$',
    '^@components/(.*)$',
    '^~/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  endOfLine: 'auto',
};
