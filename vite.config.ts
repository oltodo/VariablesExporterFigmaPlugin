import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
  },
  plugins: [
    viteSingleFile({
      removeViteModuleLoader: true,
      useRecommendedBuildConfig: true,
    }),
    tailwindcss(),
  ],
})
