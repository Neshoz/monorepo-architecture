#!/usr/bin/env node

const { build } = require('esbuild')
const path = require('path')
const program = require('commander')
const { exec } = require('child_process')

function featurePath(feature) {
  return path.join(__dirname, '../../', feature)
}

function getPkg(pkg) {
  return require(path.join(featurePath(pkg), 'package.json'))
}

program
  .command('build')
  .description('This is a test build')
  .requiredOption('-f, --feature [value]', 'Which feature to build')
  .option('-e, --env [value]', 'Environment to create build for', 'dev')
  .action((args) => {
    const corePkg = getPkg('core')
    const featurePkg = getPkg(args.feature)
    const fPath = featurePath(args.feature)

    exec(`rimraf ${fPath}/dist`, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
    exec(`tsc --project ${fPath} --declaration --emitDeclarationOnly`, (typeCheckErr) => {
      if (typeCheckErr) {
        console.error(typeCheckErr)
        process.exit(1)
      }

      const external = [...new Set([
        ...Object.keys(corePkg.dependencies),
        ...Object.keys(featurePkg.dependencies)
      ])].filter(str => !str.includes('@mediatool'))

      console.log(external)

      build({
        entryPoints: [`${fPath}/src/index.tsx`],
        chunkNames: '[name]-[hash]',
        outdir: `${fPath}/dist`,
        bundle: true,
        splitting: true,
        format: 'esm',
        minify: args.env === 'prod',
        sourcemap: args.env === 'dev',
        external: [
          'react',
          'react-router-dom',
          ...external
        ]
      }).catch((err) => {
        console.error(err)
        process.exit(1)
      })
    })
  })

program.parse(process.argv)
