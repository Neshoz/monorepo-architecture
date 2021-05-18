import { join } from 'path'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
const { getPackage, getPackagePath } = require("../util")

export default (commandLineArgs) => {
  const { configPackage } = commandLineArgs


  const pkg = getPackage(configPackage)
  const packagePath = getPackagePath(configPackage)
  const pkgDependencies = Object.keys(pkg.dependencies)
  /*
  const mediatoolPackages = Object.keys(pkg.dependencies)
    .filter(dep => dep.includes('@mediatool'))*/


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
          // moduleDirectories: mediatoolPackages,
          dedupe: pkgDependencies
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
          // moduleDirectories: mediatoolPackages,
          dedupe: pkgDependencies
        })
      ]
    }
  ]
}