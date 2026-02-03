import { createRequire } from 'node:module'

import { getConfig } from '../config/index.js'
import { getLibConfig } from '../config/rollup.js'
import { getEntry } from '../shared/entry.js'
import logger from '../shared/logger.js'

const require = createRequire(import.meta.url)
const rollup = require('rollup')

export async function libBundle({ watch = false }) {
  if (!getEntry()) {
    logger.warning('Entry not found')
    return
  }

  const config = await getConfig()
  const optionsList = getLibConfig(config)

  if (watch) {
    const watcher = rollup.watch(optionsList)

    watcher.on('event', (event: { code: string; duration?: number; error?: Error }) => {
      switch (event.code) {
        case 'START':
          logger.info('Bundling...')
          break
        case 'BUNDLE_END':
          logger.success(`Bundled in ${event.duration}ms`)
          break
        case 'ERROR':
          if (event.error) {
            logger.error(event.error.toString())
          }
          break
      }
    })
  } else {
    try {
      for (const options of optionsList) {
        const bundle = await rollup.rollup(options)
        const output = Array.isArray(options.output) ? options.output : [options.output]
        await Promise.all(output.map(bundle.write))
      }
    } catch (e: unknown) {
      logger.error((e as Error).toString())
    }
  }
}
