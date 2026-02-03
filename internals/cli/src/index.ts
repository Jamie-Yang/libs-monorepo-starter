#!/usr/bin/env node

import { createRequire } from 'node:module'

import { Command } from 'commander'

import { appBuild } from './commands/app-build.js'
import { appDev } from './commands/app-dev.js'
import { appPreview } from './commands/app-preview.js'
import { libBundle } from './commands/lib-bundle.js'
import { uiBundle } from './commands/ui-bundle.js'
import logger from './shared/logger.js'

const require = createRequire(import.meta.url)
const program = new Command()

program
  .version(`cli ${require('../package.json').version}`) //
  .usage('<command> [options]')

program
  .command('app-dev')
  .option('-f --force', 'Force dep pre-optimization regardless of whether deps have changed')
  .description('Run application development server')
  .action(appDev)

program
  .command('app-build') //
  .description('Build application for production')
  .action(appBuild)

program
  .command('app-preview') //
  .description('Preview production application locally')
  .action(appPreview)

program
  .command('ui-bundle') //
  .option('-w --watch', 'Bundle UI component library in watch mode')
  .description('Bundle UI component library')
  .action(uiBundle)

program
  .command('lib-bundle') //
  .option('-w --watch', 'Bundle utility library in watch mode')
  .description('Bundle utility library')
  .action(libBundle)

program.on('command:*', ([cmd]) => {
  program.outputHelp()
  logger.error(`\nUnknown command ${cmd}.\n`)
  process.exitCode = 1
})

program.parse()
