import type { Linter } from 'eslint'

import globals from 'globals'

const configLocal: Linter.Config[] = [
  {
    name: 'internals/eslint-config/local-config-files',
    files: ['**/stylelint.config.mjs', '**/.commitlintrc.js', '**/eslint.config.js', '**/vite.config.ts'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    name: 'internals/eslint-config/local-scripts',
    files: ['internals/**/**', 'scripts/**/**'],
    rules: {
      'no-console': 'off',
    },
  },
]

export { configLocal }
