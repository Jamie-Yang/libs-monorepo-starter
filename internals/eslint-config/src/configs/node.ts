import type { Linter } from 'eslint'

import pluginNode from 'eslint-plugin-n'

export async function node(): Promise<Linter.Config[]> {
  return [
    {
      name: 'internals/eslint-config/node',

      plugins: {
        n: pluginNode,
      },

      files: ['internals/**/*.?([cm])[jt]s?(x)'],

      rules: {
        'n/prefer-global/process': 'off',
      },
    },
  ]
}
