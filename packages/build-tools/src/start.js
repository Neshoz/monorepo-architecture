const { exec } = require('child_process')
const { tscWatch } = require("../util")

const start = (feature) => {
  exec(`yarn core start`, (err) => {
    if (err) {
      console.error(`Error starting core: `, err)
      process.kill(1)
    }
  })
  tscWatch(feature)
}

exports.start = start