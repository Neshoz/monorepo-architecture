const { exec } = require('child_process')
const { resolve } = require('path')
const { rmrfDist } = require('../util')

const configPath = resolve(__dirname, '../config/rollup.prod.js')

const createProdBuild = (packageName) => {
  rmrfDist(packageName)
  const childProcess = exec(
    `rollup --config ${configPath} --configPackage ${packageName}`,
    (err) => {
      if (err) {
        childProcess.kill(1)
        process.exit()
      }
    }
  )
  childProcess.stderr.pipe(process.stderr)
}

exports.createProdBuild = createProdBuild
