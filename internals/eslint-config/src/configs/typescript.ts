import type { Linter } from 'eslint'

import tsEslint from 'typescript-eslint'

export async function typescript(): Promise<Linter.Config[]> {
  return [
    ...(tsEslint.configs.recommended as Linter.Config[]),

    {
      name: 'internals/eslint-config/typescript',

      files: ['**/*.?([cm])[jt]s?(x)', '**/*.vue'],

      rules: {
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-check': false,
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description',
          },
        ],

        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],

        '@typescript-eslint/no-dynamic-delete': 'off',
      },
    },
  ]
}
