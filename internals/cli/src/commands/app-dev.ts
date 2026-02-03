import type { FSWatcher } from 'chokidar'

import * as chokidar from 'chokidar'
import { pathExistsSync } from 'fs-extra/esm'
import { createServer, ViteDevServer, mergeConfig } from 'vite'

import { getConfig } from '../config/index.js'
import { getDevConfig } from '../config/vite.js'
import { PACKAGE_CONFIG } from '../shared/constant.js'
import logger from '../shared/logger.js'

let server: ViteDevServer
let watcher: FSWatcher

export async function appDev(args: { force?: boolean }) {
  const { force = false } = args

  const isRestart = Boolean(server)
  logger.info(`${isRestart ? 'Restarting' : 'Starting'} server...`)

  if (server) await server.close()
  if (watcher) await watcher.close()

  const config = await getConfig()
  const devConfig = getDevConfig(config)
  const inlineConfig = mergeConfig(devConfig, force ? { server: { force: true } } : {}, true)

  server = await createServer(inlineConfig)
  await server.listen()
  server.printUrls()

  if (pathExistsSync(PACKAGE_CONFIG)) {
    watcher = chokidar.watch(PACKAGE_CONFIG)
    watcher.on('change', () => appDev({ force }))
  }

  logger.success(`\n${isRestart ? 'Restarted' : 'Started'} server successfully!`)
}
