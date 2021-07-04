const { exec } = require('child_process')
const { resolve } = require('path')
const { rmrfDist } = require('../util')

const configPath = resolve(__dirname, '../config/rollup.prod.js')

const createProdBuild = (packageName) => {
  rmrfDist(packageName)
  const childProcess = exec(
    `rollup --config ${configPath} --configPackage ${packageName}`,
    (err, _, stderr) => {
      if (err) {
        console.log('stderr ', stderr)
        childProcess.kill(1)
        process.exit()
      }
    }
  )
}

exports.createProdBuild = createProdBuild
