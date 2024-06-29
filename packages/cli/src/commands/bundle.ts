import { createRequire } from 'node:module'

import * as chokidar from 'chokidar'

import { getConfig } from '../config/index.js'
import { getLibConfig } from '../config/rollup.js'
import { PACKAGE_CONFIG, PACKAGE_SOURCE_PATH } from '../shared/constant.js'
import { getEntry } from '../shared/entry.js'
import logger from '../shared/logger.js'

const require = createRequire(import.meta.url)
const rollup = require('rollup')

async function runTask() {
  if (!getEntry()) {
    logger.warning('Entry not found')
    return
  }

  const config = await getConfig()
  const optionsList = getLibConfig(config)

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

export async function bundle({ watch = false }) {
  await runTask()

  if (watch) {
    const watcher = chokidar.watch([PACKAGE_CONFIG, PACKAGE_SOURCE_PATH], { ignoreInitial: true })
    watcher.on('all', runTask)
  }
}
