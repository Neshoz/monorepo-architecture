const { execSync } = require('child_process')
const { rmrfDist } = require('../util')

const buildAllPackages = () => {
  const packages = ['ui', 'tools', 'hub']
  packages.forEach(pkg => {
    rmrfDist(pkg)
    execSync(`yarn build ${pkg}`, { stdio: 'inherit' })
  })
}

exports.buildAllPackages = buildAllPackages