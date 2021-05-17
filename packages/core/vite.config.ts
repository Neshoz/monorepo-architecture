import fs from 'fs'
import { defineConfig } from 'vite'
import { join } from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'

const isBuildTool = (name: string) => {
  return name === `@mediatool-poc/build-tools`
}
interface IViteConfig {
  resolveAlias: {
    [packageName: string]: string
  }
  dedupe: string[]
}

const getViteConfig = (): IViteConfig => {
  const packagesPath = join(__dirname, '../')
  return fs.readdirSync(packagesPath)
    .reduce((acc, dir) => {
      const p = require(`${packagesPath}/${dir}/package.json`)
      if (!isBuildTool(p.name)) {
        acc.resolveAlias[p.name] = join(`${packagesPath}/${dir}/${p.module}`)
      }
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
    })
}

const config = getViteConfig()
console.log(config)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
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
    rollupOptions: {
      external: config.dedupe.filter(dep => !dep.includes('@mediatool')),
    }
  },
  plugins: [reactRefresh()],
})
