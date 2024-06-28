import * as chokidar from 'chokidar'
import { build as buildVite } from 'vite'

import { getConfig } from '../config/index.js'
import { getLibConfig, getEntry } from '../config/vite.js'
import { PACKAGE_CONFIG, PACKAGE_SOURCE_PATH } from '../shared/constant.js'
import logger from '../shared/logger.js'

async function runTask() {
  if (!getEntry()) {
    logger.warning('Plugin entry not found')
    return
  }

  const config = await getConfig()
  const libConfig = getLibConfig(config)

  try {
    await buildVite(libConfig)
  } catch (e: unknown) {
    logger.error((e as Error).toString())
  }
}

export async function compile({ watch = false }) {
  await runTask()

  if (watch) {
    const watcher = chokidar.watch([PACKAGE_CONFIG, PACKAGE_SOURCE_PATH], { ignoreInitial: true })
    watcher.on('all', runTask)
  }
}
