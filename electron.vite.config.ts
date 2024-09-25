import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import fixReactVirtualized from 'esbuild-plugin-react-virtualized'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [fixReactVirtualized as import('vite/node_modules/esbuild/lib/main').Plugin]
      }
    }
  }
})
