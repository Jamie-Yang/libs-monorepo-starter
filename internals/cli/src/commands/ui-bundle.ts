import { build as viteBuild } from 'vite'

import { getConfig } from '../config/index.js'
import { getLibConfig } from '../config/vite.js'
import { getEntry } from '../shared/entry.js'
import logger from '../shared/logger.js'

export async function uiBundle({ watch = false }) {
  if (!getEntry()) {
    logger.warning('Entry not found')
    return
  }

  const config = await getConfig()
  const libConfig = getLibConfig(config)

  if (watch) {
    libConfig.build = {
      ...libConfig.build,
      watch: {},
    }
  }

  try {
    await viteBuild(libConfig)
  } catch (e: unknown) {
    logger.error((e as Error).toString())
  }
}
