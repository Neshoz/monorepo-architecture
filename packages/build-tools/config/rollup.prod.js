const { join } = require('path')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')
const html = require('@rollup/plugin-html')
const less = require('rollup-plugin-less')
const { getPackage, getPackagePath } = require("../util")

module.exports.createRollupConfig = (packageName) => {
  const isCore = packageName === 'core'
  const pkg = getPackage(packageName)
  const packagePath = getPackagePath(packageName)
  const pkgDependencies = Object.keys(pkg.dependencies)

  const packageDist = `${packagePath}/dist`
  const external = [
    'react',
    'react-dom',
    'react-router-dom',
    ...pkgDependencies
  ]

  return [
    {
      input: join(`${packagePath}/${pkg.module}`),
      output: [
        {
          dir: `${packageDist}/module`,
          format: 'es',
          sourcemap: true,
        },
      ],
      external,
      plugins: [
        typescript({
          tsconfig: `${packagePath}/tsconfig.json`,
          outDir: `${packageDist}/module`,
          declarationDir: `${packageDist}/module`,
          declaration: true,
          noEmitOnError: true,
        }),
        nodeResolve({
          dedupe: pkgDependencies
        }),
        less(),
        isCore && html({
          meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
          ]
        })
      ]
    },
    {
      input: join(`${packagePath}/${pkg.module}`),
      output: [
        {
          dir: `${packageDist}/nomodule`,
          format: 'system',
          sourcemap: true,
        },
      ],
      external,
      plugins: [
        typescript({
          tsconfig: `${packagePath}/tsconfig.json`,
          outDir: `${packageDist}/nomodule`,
          declaration: false,
          noEmitOnError: true,
        }),
        nodeResolve({
          dedupe: pkgDependencies
        }),
        less(),
        isCore && html({
          meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
          ]
        })
      ]
    }
  ]
}