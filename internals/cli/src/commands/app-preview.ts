import { pathExistsSync } from 'fs-extra/esm'
import { preview as previewVite } from 'vite'

import { getConfig } from '../config/index.js'
import { getBuildConfig } from '../config/vite.js'
import { APP_OUTPUT_PATH } from '../shared/constant.js'
import logger from '../shared/logger.js'

export async function appPreview() {
  if (!pathExistsSync(APP_OUTPUT_PATH)) {
    logger.warning('Cannot find the output directory, please run "app-build" first.')
    return
  }

  logger.info('Starting preview server...')
  const config = await getConfig()
  const buildConfig = getBuildConfig(config)

  const previewServer = await previewVite(buildConfig)
  previewServer.printUrls()
}
