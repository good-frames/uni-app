import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    transpileDependencies: ['@dcloudio/uni-ui'],
    plugins: createVitePlugins(env, command === 'build'),
    server: {
      host: '0.0.0.0',  // 允许所有 IP 访问，包括局域网
      port: 5173,
      // 如需 HTTPS，可添加：
      // https: true
    }
  }
})
