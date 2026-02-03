import { build as buildVite } from 'vite'

import { getConfig } from '../config/index.js'
import { getBuildConfig } from '../config/vite.js'
import logger from '../shared/logger.js'

export async function appBuild() {
  logger.info('Building application for production...')
  const config = await getConfig()
  const buildConfig = getBuildConfig(config)

  await buildVite(buildConfig)
  logger.success('Build completed successfully!')
}
