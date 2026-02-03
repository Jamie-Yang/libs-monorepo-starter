/** @type {import("prettier").Config} */
export default {
  endOfLine: 'lf',
  printWidth: 150,
  proseWrap: 'never',
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: ['*.json5'],
      options: {
        quoteProps: 'preserve',
        singleQuote: false,
      },
    },
  ],
}
