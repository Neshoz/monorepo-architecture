#!/usr/bin/env node
const { build } = require('esbuild')
const program = require('commander')
const { exec } = require('child_process')
const { start } = require('../src/start')
const {
  getExternalDependencies,
  getPackage,
  getPackagePath,
  tscWatch,
  generateTsDeclarations
} = require('../util')

program
  .command('start <feature>')
  .description('Start core and tsc watcher for named feature')
  .action(start)

program
  .command('build:esbuild')
  .description('This is a test build')
  .requiredOption('-f, --feature [value]', 'Which feature to build')
  .option('-e, --env [value]', 'Environment to create build for', 'dev')
  .action((args) => {
    const { feature, env } = args
    const corePkg = getPackage('core')
    const featurePkg = getPackage(feature)
    const fPath = getPackagePath(feature)

    exec(`rimraf ${fPath}/dist`, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
    generateTsDeclarations(feature)
    tscWatch(feature)
    build({
      entryPoints: [`${fPath}/src/index.tsx`],
      chunkNames: '[name]-[hash]',
      outdir: `${fPath}/dist`,
      bundle: true,
      splitting: true,
      format: 'esm',
      minify: env === 'prod',
      sourcemap: env === 'dev',
      external: [
        'react',
        'react-router-dom',
        ...getExternalDependencies(corePkg, featurePkg)
      ],
    }).catch((err) => {
      console.error(err)
      process.exit(1)
    })
  })

program.parse(process.argv)
