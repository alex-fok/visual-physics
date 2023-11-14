import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import solid from 'vite-plugin-solid'

export default ({ mode }: {mode: string}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  
  return defineConfig({
    base: process.env.VITE_BASE || '/',
    plugins: [solid()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    }
  })
}
