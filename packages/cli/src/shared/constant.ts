import { resolve } from 'node:path'

import { LibraryFormats } from 'vite'

export const CWD = process.cwd()

export const PACKAGE_JSON = resolve(CWD, 'package.json')
export const PACKAGE_CONFIG = resolve(CWD, 'package.config.js')

export const PACKAGE_SOURCE_PATH = resolve(CWD, 'src')
export const PACKAGE_TS_ENTRY = resolve(CWD, 'src/index.ts')
export const PACKAGE_JS_ENTRY = resolve(CWD, 'src/index.js')
export const PACKAGE_OUTPUT_PATH = resolve(CWD, 'lib')

export const VITE_LIBRARY_FORMATS: LibraryFormats[] = ['es']
export const VITE_RESOLVE_EXTENSIONS = ['.vue', '.tsx', '.ts', '.jsx', '.js', '.scss', '.css']

export const APP_OUTPUT_PATH = resolve(CWD, 'dist')
export const APP_PUBLIC_PATH = resolve(CWD, 'public')
