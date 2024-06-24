/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^@/styles/(.*)$",
    "",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "^[./]",
    "^types$",
    "^@/env(.*)$",
    "^@/types$",
    "^@/types/(.*)$",
    "",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "",
    "^@/app/(.*)$",
    "^@/actions/(.*)$",
    "^@/stelify/(.*)$",
    "",
    "^[./]",
  ],
  tailwindFunctions: ["clsx", "cn", "twmerge", "cva"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
}
