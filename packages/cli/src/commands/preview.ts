import { pathExistsSync } from 'fs-extra/esm'
import { preview as previewVite } from 'vite'

import { APP_OUTPUT_PATH } from '../shared/constant.js'
import logger from '../shared/logger.js'

export async function preview() {
  if (!pathExistsSync(APP_OUTPUT_PATH)) {
    logger.warning('Cannot find the dist folder, you must first run the build command to build the app.')
    return
  }

  const previewServer = await previewVite({
    preview: {
      open: true,
      host: true,
    },
  })

  previewServer.printUrls()
}
