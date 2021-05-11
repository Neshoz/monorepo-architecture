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

function typeCheckFeature(featurePath) {
  return new Promise((resolve, reject) => {
    const childProcess = exec(
      `tsc --project ${featurePath} --declaration --emitDeclarationOnly`,
      (err) => {
        if (err) {
          childProcess.unref()
          return reject(err)
        }
        resolve()
      }
    )
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
  })
}

program
  .command('build')
  .description('This is a test build')
  .requiredOption('-f, --feature [value]', 'Which feature to build')
  .option('-e, --env [value]', 'Environment to create build for', 'dev')
  .option('-w, --watch', 'Start builder in watch mode', true)
  .action((args) => {
    const { feature, env, watch } = args
    const corePkg = getPkg('core')
    const featurePkg = getPkg(feature)
    const fPath = featurePath(feature)

    exec(`rimraf ${fPath}/dist`, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    })
    typeCheckFeature(fPath)
      .then(() => {
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
          minify: env === 'prod',
          sourcemap: env === 'dev',
          external: [
            'react',
            'react-router-dom',
            ...external
          ],
          watch: (env === 'dev' || watch) && {
            onRebuild(error, result) {
              if (error) {
                console.error('Watch build failed: ', error)
                return
              }
              console.log('Watch build succeeded: ', result)
              typeCheckFeature(fPath)
                .catch(err => process.stdout.write(Buffer.from(err.message)))
            }
          }
        }).catch((err) => {
          console.error(err)
          process.exit(1)
        })
      })
      .catch(err => process.stdout.write(Buffer.from(err.message)))
  })

program.parse(process.argv)
