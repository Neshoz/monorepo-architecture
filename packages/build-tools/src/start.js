const { build } = require('vite')
const multi = require('@rollup/plugin-multi-entry')
const { getPackage, getExternalDependencies, getPackagePath } = require("../util")

// To be able to use globbing as an entry point for code splitting
// https://github.com/rollup/plugins/tree/master/packages/multi-entry

const start = (args) => {
  const { feature } = args
  const featurePath = getPackagePath(feature)
  const corePkg = getPackage('core')
  const featurePkg = getPackage(feature)

  build({
    build: { 
      rollupOptions: {
        treeshake: true,
        input: [`${featurePath}/**/*.ts`, `${featurePath}/**/*.tsx`],
        output: {
          dir: `${featurePath}/dist`,
          chunkFileNames: '[name]-[hash].js',
          entryFileNames: '[name]-[hash].js'
        },
        external: [
          'react',
          'react-router-dom',
          ...getExternalDependencies(corePkg, featurePkg)
        ],
        plugins: [
          multi({
            options: {
              exports: true
            }
          })
        ]
      }
    }
  })
}

exports.start = start