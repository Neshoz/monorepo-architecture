const { join } = require('path')
/*
type Env = 'prod' | 'staging' | 'dev'
type Feature = 'hub' | 'ui'

interface IBuildOptions {
  feature: Feature
  env: Env
}
*/

const fPath = join(__dirname, '../packages')

function buildFeature({ feature = 'hub', env = 'dev' }) {
  require('esbuild').build({
    entryPoints: [`${fPath}/${feature}/src/index.tsx`],
    outdir: `${fPath}/${feature}/dist`,
    bundle: true,
    splitting: true,
    format: 'esm',
    minify: env === 'prod',
    sourcemap: env === 'dev'
  }).catch(() => process.exit(1))
}

exports.buildFeature = buildFeature
