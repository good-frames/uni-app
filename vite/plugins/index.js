import createAutoImport from './auto-import'
import createUni from './uni'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = []
  vitePlugins.push(createUni())
  vitePlugins.push(createAutoImport())
  return vitePlugins
}
