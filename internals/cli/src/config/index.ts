import { pathExistsSync } from 'fs-extra/esm'

import { PACKAGE_CONFIG } from '../shared/constant.js'

export async function getConfig(): Promise<Record<string, unknown>> {
  let config = {}

  if (pathExistsSync(PACKAGE_CONFIG)) {
    config = (await import(PACKAGE_CONFIG)).default
  }

  return config
}
