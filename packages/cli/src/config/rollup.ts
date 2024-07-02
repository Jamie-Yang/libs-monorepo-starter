import type { RollupOptions } from 'rollup'

import { createRequire } from 'module'

import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
// import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

import { PACKAGE_JSON } from '../shared/constant.js'

interface PackageConfig {
  name?: string // lib name
  configureRollup?: (config: RollupOptions[], command: string) => RollupOptions[]
}

const require = createRequire(import.meta.url)

const extensions = ['.js', '.ts']

const commonPlugins = [
  nodeResolve({
    extensions,
    preferBuiltins: false,
  }),
  commonjs(),
  json(),
  typescript({
    tsconfig: false,
    target: 'es5',
    strict: true,
  }),
  // babel({
  //   babelrc: false,
  //   babelHelpers: 'bundled',
  //   presets: [
  //     ['@babel/env', { modules: false }],
  //     ['@babel/typescript', { tsconfig: false }],
  //   ],
  // }),
]

export function getLibConfig(packageConfig: PackageConfig): RollupOptions[] {
  const { name } = packageConfig
  const banner = getBanner()

  return [
    // {
    //   input: 'src/index.ts',
    //   output: [{ file: 'types/index.d.ts', format: 'es' }],
    //   plugins: [dts()],
    // },
    {
      input: 'src/index.ts',
      output: [
        { banner, exports: 'auto', format: 'esm', name, file: `lib/${name}.es.js` },
        // { banner, exports: 'auto', format: 'umd', name, file: `dist/${name}.umd.js` },
      ],
      plugins: commonPlugins,
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
