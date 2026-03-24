import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    transpileDependencies: ['@dcloudio/uni-ui'],
    plugins: createVitePlugins(env, command === 'build')
  }
})
