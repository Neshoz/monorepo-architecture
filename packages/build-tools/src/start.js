const { exec } = require('child_process')
const { tscWatch } = require("../util")

const start = (package) => {
  exec(`yarn core start`, (err) => {
    if (err) {
      console.error(`Error starting core: `, err)
      process.exit()
    }
  })
  tscWatch('core')
  tscWatch(package)
}

exports.start = start