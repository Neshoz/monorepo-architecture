#!/usr/bin/env node

const program = require('commander')
const { build } = require('esbuild')
const { exec } = require('child_process')
const { start } = require('../src/start')
// const { createProdBuild } = require('../src/create-prod-build')
const { createNewPackage } = require('../src/create-new-package')
const { buildAllPackages } = require('../src/build-all-packages')
const {
  getExternalDependencies,
  getPackage,
  getPackagePath,
  tscWatch,
  generateTsDeclarations
} = require('../util')

program
  .command('start <package>')
  .description('Start core and tsc watcher for named package')
  .action(start)

/*
program
  .command('build <package>')
  .description('Create a production build for named package')
  .action(createProdBuild)
*/

program
  .command('build:all')
  .description('Builds all the packages')
  .action(buildAllPackages)

program
  .command('create:package <package>')
  .description('Creates a new package and sets up the folder structure')
  .action(createNewPackage)

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
