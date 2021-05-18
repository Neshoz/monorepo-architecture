const { exec } = require('child_process')
const { tscWatch } = require("../util")

const start = (packageName) => {
  exec(`yarn core start`, (err) => {
    if (err) {
      console.error(`Error starting core: `, err)
      process.exit()
    }
  }).stdout.pipe(process.stdout)
  tscWatch('core')
  tscWatch(packageName)
}

exports.start = start