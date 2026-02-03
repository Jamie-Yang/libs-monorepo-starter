import type { Linter } from 'eslint'

import pluginImport from 'eslint-plugin-import'

export async function importConfig(): Promise<Linter.Config[]> {
  return [
    pluginImport.flatConfigs.recommended,
    pluginImport.flatConfigs.typescript,

    {
      name: 'internals/eslint-config/import',

      settings: {
        'import/resolver': {
          typescript: true,
        },
      },

      rules: {
        'import/named': 'off', // TypeScript 已经确保了命名导入在引用的模块中存在
        'import/no-named-as-default-member': 'off',
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            groups: ['type', 'builtin', 'external', ['internal', 'parent', 'sibling', 'index'], 'object', 'unknown'],
            pathGroups: [{ pattern: '@/**', group: 'external', position: 'after' }],
            pathGroupsExcludedImportTypes: ['type'],
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
      },
    },

    {
      name: 'internals/eslint-config/import/alias',

      files: ['apps/playground/**'],

      settings: {
        'import/resolver': {
          typescript: true,
          alias: {
            map: [['^@', './apps/playground/src/']],
            extensions: ['.ts', '.js', '.vue', '.json'],
          },
        },
      },
    },
  ]
}
