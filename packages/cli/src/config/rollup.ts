import type { RollupOptions } from 'rollup'

import { createRequire } from 'module'

import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'

import { PACKAGE_JSON } from '../shared/constant.js'

interface PackageConfig {
  name?: string // lib name
  configureVite?: (config: RollupOptions[], command: string) => RollupOptions[]
}

const require = createRequire(import.meta.url)
const commonjs = require('@rollup/plugin-commonjs')
const terser = require('@rollup/plugin-terser')
const typescript = require('@rollup/plugin-typescript')

const commonPlugins = [
  nodeResolve(), //
  typescript({ tsconfig: false }),
  babel({ babelHelpers: 'bundled' }),
  commonjs(),
]

export function getLibConfig(packageConfig: PackageConfig): RollupOptions[] {
  const { name } = packageConfig
  const banner = getBanner()

  return [
    {
      input: 'src/index.ts',
      output: [{ file: 'dist_npm/index.d.ts', format: 'es' }],
      plugins: [dts()],
    },
    {
      input: 'src/index.ts',
      output: [
        { banner, exports: 'named', format: 'esm', name, file: `dist_npm/${name}.es.js` },
        { banner, exports: 'named', format: 'cjs', name, file: `dist_npm/${name}.js` },
        { banner, exports: 'named', format: 'umd', name, file: `dist/${name}.js` },
      ],
      plugins: commonPlugins,
    },
    {
      input: 'src/index.ts',
      output: { banner, exports: 'named', format: 'umd', name, file: `dist/${name}.min.js`, sourcemap: true },
      plugins: [...commonPlugins, terser()],
    },
  ]
}

function getBanner() {
  const pkg = require(PACKAGE_JSON)
  return `
/*
 * ${pkg.name}
 * version ${pkg.version}
 */
`
}
