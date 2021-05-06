const { join } = require('path')
/*
type Env = 'prod' | 'staging' | 'dev'
type Feature = 'hub' | 'ui'

interface IBuildOptions {
  feature: Feature
  env: Env
}
*/

/*
const entry = join('../packages/hub/src/index.tsx')
const outdir = join('../packages/hub/dist')
console.log(entry)
console.log(outdir)
*/

function buildFeature({ feature = 'hub', env = 'dev' }) {
  require('esbuild').build({
    entryPoints: ['../packages/hub/src/index.tsx'],
    outdir: '../packages/hub/dist',
    bundle: true,
    write: true,
    splitting: true,
    format: 'esm',
  }).catch(() => process.exit(0))
}

exports = buildFeature
