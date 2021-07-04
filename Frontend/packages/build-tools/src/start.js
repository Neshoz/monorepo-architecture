const { exec } = require('child_process')
const { tscWatch } = require("../util")

const start = (packageName) => {
  exec(`yarn core start`, (err, _, stderr) => {
    if (err) {
      console.error(`Error starting core: `, stderr)
      process.exit()
    }
  }).stdout.pipe(process.stdout)
  tscWatch('core')
  tscWatch(packageName)
}

exports.start = start