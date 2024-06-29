#!/usr/bin/env node

import { createRequire } from 'node:module'

import { Command } from 'commander'

import { build } from './commands/build.js'
import { bundle } from './commands/bundle.js'
import { compile } from './commands/compile.js'
import { dev } from './commands/dev.js'
import { preview } from './commands/preview.js'
import logger from './shared/logger.js'

const require = createRequire(import.meta.url)
const program = new Command()

program
  .version(`cli ${require('../package.json').version}`) //
  .usage('<command> [options]')

program
  .command('dev')
  .option('-f --force', 'Force dep pre-optimization regardless of whether deps have changed')
  .description('Run app development environment')
  .action(dev)

program
  .command('build') //
  .description('Build app for production')
  .action(build)

program
  .command('preview') //
  .description('Preview app for production')
  .action(preview)

program
  .command('compile')
  .option('-w --watch', 'Compile Vue component into library code in watch mode')
  .description('Compile Vue component into library code')
  .action(compile)

program
  .command('bundle') //
  .option('-w --watch', 'Bundle utilities in watch mode')
  .description('Bundle utilities')
  .action(bundle)

program.on('command:*', ([cmd]) => {
  program.outputHelp()
  logger.error(`\nUnknown command ${cmd}.\n`)
  process.exitCode = 1
})

program.parse()
