import type { Linter } from 'eslint'

import js from '@eslint/js'
import globals from 'globals'

export async function javascript(): Promise<Linter.Config[]> {
  return [
    js.configs.recommended,

    {
      name: 'internals/eslint-config/javascript',

      languageOptions: {
        ecmaVersion: 'latest',
        globals: {
          ...globals.browser,
          ...globals.es2024,
          ...globals.node,
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        sourceType: 'module',
      },

      linterOptions: {
        reportUnusedDisableDirectives: true,
      },

      rules: {
        'arrow-body-style': ['error', 'as-needed'],
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
        'spaced-comment': [
          'error',
          'always',
          {
            line: { markers: ['/'], exceptions: ['-', '+'] },
            block: { markers: ['!'], exceptions: ['*'], balanced: true },
          },
        ],
      },
    },
  ]
}
