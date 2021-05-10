#!/usr/bin/env node

const { build } = require('esbuild')
const path = require('path')
const program = require('commander')
const { exec } = require('child_process')

program
  .command('build')
  .description('This is a test build')
  .requiredOption('-f, --feature [value]', 'Which feature to build')
  .option('-e, --env [value]', 'Environment to create build for', 'dev')
  .action((args) => {
    const featurePath = path.join(__dirname, '../../', args.feature)
    exec(`rimraf ${featurePath}/dist`, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
    exec(`tsc --project ${featurePath} --declaration --emitDeclarationOnly`, (typeCheckErr) => {
      if (typeCheckErr) {
        console.error(typeCheckErr)
        process.exit(1)
      }

      build({
        entryPoints: [`${featurePath}/src/index.tsx`],
        chunkNames: '[name]-[hash]',
        outdir: `${featurePath}/dist`,
        bundle: true,
        splitting: true,
        format: 'esm',
        minify: args.env === 'prod',
        sourcemap: args.env === 'dev',
        external: ['react', 'react-router-dom', 'react-redux', 'redux', '@chakra-ui/react']
      }).catch((err) => {
        console.error(err)
        process.exit(1)
      })
    })
  })

program.parse(process.argv)
