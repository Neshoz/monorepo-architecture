const fs = require('fs')
const { join, resolve } = require('path')

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

const createNewPackage = (packageName) => {
  const packagePath = resolve(__dirname, '../../', packageName)
  console.log(`Creating new package under packages/${packageName}`)

  fs.mkdir(packagePath, (err) => {
    if (err) {
      console.error('Error creating package folder: ', err)
      return
    }
  })

  fs.appendFile(
    `${packagePath}/package.json`,
    JSON.stringify(createPackageJson(packageName), null, 2),
    (err) => {
      if (err) {
        console.error('Error creating package.json: ', err)
        return
      }
    }
  )
}

exports.createNewPackage = createNewPackage