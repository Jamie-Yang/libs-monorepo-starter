import type { Linter } from 'eslint'

import configPrettier from 'eslint-config-prettier'

export async function prettier(): Promise<Linter.Config[]> {
  return [
    {
      name: 'internals/eslint-config/prettier',
      ...configPrettier,
    },
  ]
}
