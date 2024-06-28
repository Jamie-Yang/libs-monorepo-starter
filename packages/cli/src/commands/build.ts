import { build as buildVite } from 'vite'

import { getConfig } from '../config/index.js'
import { getBuildConfig } from '../config/vite.js'

export async function build() {
  const config = await getConfig()
  const buildConfig = getBuildConfig(config)

  await buildVite(buildConfig)
}
