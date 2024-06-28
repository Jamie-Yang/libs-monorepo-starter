import type { InlineConfig, PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { pathExistsSync } from 'fs-extra/esm'
import { mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

import {
  APP_OUTPUT_PATH,
  APP_PUBLIC_PATH,
  PACKAGE_JS_ENTRY,
  VITE_LIBRARY_FORMATS,
  PACKAGE_OUTPUT_PATH,
  PACKAGE_TS_ENTRY,
  VITE_RESOLVE_EXTENSIONS,
} from '../shared/constant.js'

interface PackageConfig {
  name?: string // lib name
  host?: boolean
  configureVite?: (config: InlineConfig, command: string) => InlineConfig
}

export function getEntry() {
  if (pathExistsSync(PACKAGE_TS_ENTRY)) {
    return PACKAGE_TS_ENTRY
  }

  if (pathExistsSync(PACKAGE_JS_ENTRY)) {
    return PACKAGE_JS_ENTRY
  }
}

const commonPlugins = [vue(), vueJsx()] as PluginOption[]

export function getBaseConfig(packageConfig: PackageConfig): InlineConfig {
  const { host = true } = packageConfig

  return {
    resolve: {
      extensions: VITE_RESOLVE_EXTENSIONS,
    },
    server: {
      host,
      open: true,
    },
    publicDir: APP_PUBLIC_PATH,
    plugins: [...commonPlugins],
  }
}

export function getDevConfig(packageConfig: PackageConfig): InlineConfig {
  const configureVite = packageConfig.configureVite ?? (() => ({}))
  const baseConfig = getBaseConfig(packageConfig)

  return mergeConfig(baseConfig, configureVite(baseConfig, 'dev') ?? {}, false)
}

export function getBuildConfig(packageConfig: PackageConfig): InlineConfig {
  const { configureVite = () => {} } = packageConfig
  const baseConfig = getBaseConfig(packageConfig)

  const buildConfig = {
    ...baseConfig,
    base: './',
    build: {
      outDir: APP_OUTPUT_PATH,
      brotliSize: false,
      emptyOutDir: true,
      cssTarget: 'chrome61',
    },
  }

  return mergeConfig(buildConfig, configureVite(buildConfig, 'build') ?? {}, false)
}

export function getLibConfig(packageConfig: PackageConfig): InlineConfig {
  const { name, configureVite = () => {} } = packageConfig

  const libConfig: InlineConfig = {
    publicDir: false,
    base: './',
    plugins: [
      ...commonPlugins,
      dts({
        rollupTypes: true,
      }),
      libInjectCss(),
    ],
    build: {
      emptyOutDir: true,
      outDir: PACKAGE_OUTPUT_PATH,
      lib: {
        formats: VITE_LIBRARY_FORMATS,
        fileName: (format: string) => `${name}.${format}.js`,
        entry: getEntry()!,
      },
      rollupOptions: {
        external: ['vue'],
      },
    },
  }

  return mergeConfig(libConfig, configureVite(libConfig, 'compile') ?? {}, false)
}
