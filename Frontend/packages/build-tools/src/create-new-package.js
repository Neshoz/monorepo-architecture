const fs = require('fs')
const { exec } = require('child_process')
const { getPackagePath } = require('../util')

const createPackageJson = (packageName) => ({
  name: `@mediatool-poc/${packageName}`,
  version: '1.0.0',
  description: `The ${packageName} part of the app`,
  main: './dist/module/index.js',
  module: './src/index.tsx',
  types: './dist/module/index.d.ts',
  exports: {
    import: './dist/module/index.js'
  },
})

const createTsConfig = () => ({
  extends: '../../tsconfig.json',
  exclude: ['node_modules', 'dist'],
  compilerOptions: {
    rootDir: 'src',
    outDir: 'dist',
    declaration: true
  }
})

const createRmDirCurry = (folderPath) => () => {
  fs.rmdir(folderPath, () => console.log(`Removed directory ${folderPath}`))
}

const createNewPackage = (packageName) => {
  const packagePath = getPackagePath(packageName)
  const rmDir = createRmDirCurry(packagePath)

  console.log(`Creating new package under packages/${packageName}`)
  fs.mkdir(packagePath, (err) => {
    if (err) {
      console.error('Error creating package folder: ', err)
      return
    }
  })

  console.log('Creating package.json')
  fs.appendFile(
    `${packagePath}/package.json`,
    JSON.stringify(createPackageJson(packageName), null, 2),
    (err) => {
      if (err) {
        console.error('Error creating package.json: ', err)
        rmDir()
        return
      }
    }
  )

  console.log('Creating tsconfig.json')
  fs.appendFile(
    `${packagePath}/tsconfig.json`,
    JSON.stringify(createTsConfig(), null, 2),
    (err) => {
      if (err) {
        console.error('Error creating tsconfig: ', err)
        rmDir()
        return
      }
    }
  )

  console.log('Creating folder structure')
  fs.mkdir(`${packagePath}/src`, () => {
    fs.appendFile(
      `${packagePath}/src/index.tsx`,
      `import React from 'react'`,
      (err) => {
        if (err) {
          console.error('Error creating folder structure: ', err)
          rmDir()
          return
        }
      }
    )
  })

  console.log('Installing base dependencies')
  const yarnInstall = exec(
    `yarn workspace @mediatool-poc/${packageName} add @mediatool-poc/ui @mediatool-poc/tools`,
    (err, _, stderr) => {
      if (err) {
        console.error('Error installing base dependencies: ', stderr)
        yarnInstall.kill(1)
        process.exit()
      }
    }
  )
  yarnInstall.stdout.pipe(process.stdout)
  yarnInstall.stderr.pipe(process.stderr)
}

exports.createNewPackage = createNewPackage