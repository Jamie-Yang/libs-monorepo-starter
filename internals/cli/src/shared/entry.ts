import { resolve } from 'node:path'

import { pathExistsSync } from 'fs-extra/esm'

import { CWD, PACKAGE_JS_ENTRY, PACKAGE_TS_ENTRY } from './constant.js'

const POSSIBLE_ENTRIES = [PACKAGE_TS_ENTRY, PACKAGE_JS_ENTRY, resolve(CWD, 'src/main.ts'), resolve(CWD, 'src/main.js')]

export function getEntry(customEntry?: string) {
  if (customEntry) {
    const resolvedCustom = resolve(CWD, customEntry)
    if (pathExistsSync(resolvedCustom)) {
      return resolvedCustom
    }
  }

  for (const entry of POSSIBLE_ENTRIES) {
    if (pathExistsSync(entry)) {
      return entry
    }
  }
}
