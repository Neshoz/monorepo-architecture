const fs = require('fs')
const { exec } = require('child_process')
const { join } = require('path')

function getPackagePath(feature) {
  return join(__dirname, '../../', feature)
}

function getPackage(pkg) {
  return require(join(getPackagePath(pkg), 'package.json'))
}

function getExternalDependencies(...packages) {
  const uniquePackages = packages.reduce((acc, curr) => {
    return acc.concat(
      [...new Set([
        ...acc,
        ...Object.keys(curr.dependencies)
      ])]
    )
  }, [])

  return uniquePackages.filter(pkg => !pkg.includes('@mediatool'))
}

function tscWatch(package) {
  const childProcess = exec(
    `tsc --watch --noEmit --project ${getPackagePath(package)}`,
    (err) => {
      if (err) {
        childProcess.stdout.unpipe(process.stdout)
        childProcess.kill(1)
      }
    }
  )
  childProcess.stdout.pipe(process.stdout)
}

function generateTsDeclarations(package) {
  const childProcess = exec(
    `tsc --declaration --emitDeclarationOnly --project ${getPackagePath(package)}`,
    (err) => {
      if (err) {
        childProcess.kill(1)
      }
    }
  )
}

function rmrfDist(package) {
  const childProcess = exec(
    `rimraf ${getPackagePath(package)}/dist`,
    (err) => {
      if (err) {
        childProcess.kill(1)
      }
    }
  )
}

module.exports = {
  getPackage,
  getPackagePath,
  getExternalDependencies,
  tscWatch,
  generateTsDeclarations,
  rmrfDist
}