import { createRequire } from 'node:module'

import { build } from 'unbuild'

import { getConfig } from '../config/index.js'
import { CWD, PACKAGE_JSON } from '../shared/constant.js'
import { getEntry } from '../shared/entry.js'
import logger from '../shared/logger.js'

const require = createRequire(import.meta.url)

export async function libBundle({ watch = false }) {
  const pkg = require(PACKAGE_JSON)
  const entry = getEntry()

  if (!entry) {
    logger.error('No entry file found (src/index.ts or src/main.ts)')
    return
  }

  const banner = `/*
 * ${pkg.name}
 * version ${pkg.version}
 */`

  logger.info(`Bundling utility library: ${pkg.name}${watch ? ' (stub mode)' : ''}...`)

  try {
    const config = await getConfig()

    await build(CWD, watch, {
      name: (config.name as string) || pkg.name,
      entries: [entry],
      declaration: true,
      clean: true,
      rollup: {
        emitCJS: false,
        output: {
          banner,
        },
      },
      // 允许通过 cli.config.js 扩展 unbuild 配置
      ...(config.unbuild || {}),
    })

    if (!watch) {
      logger.success('Bundled successfully')
    }
  } catch (e: unknown) {
    logger.error((e as Error).toString())
  }
}
