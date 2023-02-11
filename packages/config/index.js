module.exports = {
  extends: ["next", "turbo", "prettier", "plugin:@typescript-eslint/recommended", "plugin:@next/next/recommended"],
  "plugins": ["react", "@typescript-eslint", "simple-import-sort"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },
};
