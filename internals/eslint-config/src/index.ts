import type { Linter } from 'eslint'

import { configLocal } from './config-local.js'
import { ignores, importConfig, javascript, node, prettier, typescript, vue } from './configs/index.js'

type Config = Linter.Config

type FlatConfigPromise = Config | Config[] | Promise<Config> | Promise<Config[]>

async function defineConfig(config: Linter.Config | Linter.Config[] = []) {
  const configs: FlatConfigPromise[] = [
    ignores(), //
    importConfig(),
    javascript(),
    node(),
    typescript(),
    vue(),
    ...configLocal,
    ...(Array.isArray(config) ? config : [config]),
    prettier(),
  ]

  const resolved = await Promise.all(configs)

  return resolved.flat()
}

export { defineConfig }
