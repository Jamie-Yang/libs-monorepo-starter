import type { RollupOptions } from 'rollup'

import { createRequire } from 'module'

import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
// import terser from '@rollup/plugin-terser'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'

import { PACKAGE_JSON } from '../shared/constant.js'

interface PackageConfig {
  name?: string // lib name
  configureRollup?: (config: RollupOptions[], command: string) => RollupOptions[]
}

const require = createRequire(import.meta.url)
const { DEFAULT_EXTENSIONS } = require('@babel/core')

const commonPlugins = [
  del({ targets: ['lib/*', 'types/*'] }),
  nodeResolve({
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    preferBuiltins: false,
  }),
  commonjs(),
  json(),
  typescript(),
  babel({
    extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    babelrc: false,
    babelHelpers: 'bundled',
    presets: [
      ['@babel/preset-env', { modules: false }],
      // ['@babel/preset-typescript', { tsconfig: false }],
    ],
  }),
]

export function getLibConfig(packageConfig: PackageConfig): RollupOptions[] {
  const { name } = packageConfig
  const banner = getBanner()

  return [
    {
      input: 'src/index.ts',
      output: [
        { banner, exports: 'auto', format: 'esm', name, file: `lib/${name}.es.js` },
        // { banner, exports: 'auto', format: 'umd', name, file: `dist/${name}.umd.js` },
      ],
      plugins: commonPlugins,
    },
    {
      input: 'lib/index.d.ts',
      output: [{ file: 'types/index.d.ts', format: 'es' }],
      plugins: [dts(), del({ targets: 'lib/*.d.ts', hook: 'buildEnd' })],
    },
    // {
    //   input: 'src/index.ts',
    //   output: { banner, exports: 'auto', format: 'umd', name, file: `dist/${name}.min.js`, sourcemap: true },
    //   plugins: [...commonPlugins, terser()],
    // },
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
