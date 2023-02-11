module.exports = {
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  tabWidth: 2,
  singleQuote: true,
  arrowParens: "always",
  importOrder: [
    "^@(supercarmarket|ee)/(.*)$",
    "^@lib/(.*)$",
    "^@components/(.*)$",
    "^~/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  plugins: ["simple-import-sort"],
};
