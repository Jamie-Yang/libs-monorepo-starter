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

async function startServer(force: boolean | undefined) {
  const isRestart = Boolean(server)
  logger.info(`${isRestart ? 'Res' : 'S'}tarting server...`)

  server && (await server.close())
  watcher && (await watcher.close())

  const config = await getConfig()
  const devConfig = getDevConfig(config)
  const inlineConfig = mergeConfig(devConfig, force ? { server: { force: true } } : {}, true)

  server = await createServer(inlineConfig)
  await server.listen()
  server.printUrls()

  if (pathExistsSync(PACKAGE_CONFIG)) {
    watcher = chokidar.watch(PACKAGE_CONFIG)
    watcher.on('change', () => startServer(force))
  }

  logger.success(`\n${isRestart ? 'Res' : 'S'}tart successfully!!!`)
}

export async function dev(cmd: { force?: boolean }) {
  await startServer(cmd.force)
}
