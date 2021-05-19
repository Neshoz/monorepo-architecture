import { join } from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import html from '@rollup/plugin-html'
import less from 'rollup-plugin-less'
const { getPackage, getPackagePath } = require("../util")

export default (commandLineArgs) => {
  const { configPackage } = commandLineArgs
  const pkg = getPackage(configPackage)
  const packagePath = getPackagePath(configPackage)
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
        html({
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
        html({
          meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
          ]
        })
      ]
    }
  ]
}