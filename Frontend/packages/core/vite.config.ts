import fs from 'fs'
import { defineConfig } from 'vite'
import { join } from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'

const blackList = [
  'build-tools',
  '@types'
]

const doesAppHasBff = (folders: string[]) => {
  return folders.includes('bff')
}

interface IResolveConfig {
  resolveAlias: Record<string, string>
  dedupe: string[]
}

const buildResolveConfig = (): IResolveConfig => {
  const packagesPath = join(__dirname, '../')
  // Read packages folder (list of all packages)
  return fs.readdirSync(packagesPath).reduce((acc, dir): IResolveConfig => {
    if (blackList.includes(dir)) {
      return acc
    }

    // Read package folder
    const packageFolder = fs.readdirSync(join(packagesPath, dir))

    // If it's an app that has a bff, reach for the app/frontend folder
    const packageFrontendPath = doesAppHasBff(packageFolder)
      ? join(packagesPath, dir, 'app')
      : join(packagesPath, dir)

    const p = require(`${packageFrontendPath}/package.json`)
    const resolveEntryPoint = `${packageFrontendPath}/${p.module}`

    console.log('entryPoint ', resolveEntryPoint)

    acc.resolveAlias[p.name] = resolveEntryPoint
    acc.dedupe = [
      ...new Set([
        ...acc.dedupe,
        ...Object.keys(p.dependencies)
      ])
    ]
    return acc
  }, {
    resolveAlias: {},
    dedupe: []
  } as IResolveConfig)
}

const config = buildResolveConfig()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
    host: '0.0.0.0',
    proxy: {
      '/__coverage__': 'http://localhost:5000/__coverage__',
    }
  },
  resolve: {
    alias: config.resolveAlias,
    dedupe: config.dedupe
  },
  build: {
    emptyOutDir: true,
    assetsDir: '',
    outDir: 'dist',
    minify: false,
  },
  plugins: [reactRefresh()],
})
