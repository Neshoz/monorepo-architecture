import { BuildOptions } from 'esbuild'

type Env = 'prod' | 'staging' | 'dev'

interface IBuildOptions {
  feature: string
  env: Env
}

export function createFeatureBuild({ feature, env }: IBuildOptions): BuildOptions {
  return {
    entryPoints: [`${__dirname}/src/${feature}.tsx`],
    outfile: `${__dirname}/dist/${feature}.js`,
    outdir: `${__dirname}/dist`,
    chunkNames: 'chunks/[name]-[hash]',
    bundle: true,
    sourcemap: env === 'dev',
    minify: env === 'prod',
    splitting: true,
    format: 'esm',
  }
}
