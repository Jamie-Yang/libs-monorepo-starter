import { pathExistsSync } from 'fs-extra/esm'

import { PACKAGE_JS_ENTRY, PACKAGE_TS_ENTRY } from './constant.js'

export function getEntry() {
  if (pathExistsSync(PACKAGE_TS_ENTRY)) {
    return PACKAGE_TS_ENTRY
  }

  if (pathExistsSync(PACKAGE_JS_ENTRY)) {
    return PACKAGE_JS_ENTRY
  }
}
