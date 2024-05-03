import path from 'node:path'

import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), eslintPlugin()],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src')
		}
	},
	base: '/Pokemon-Availability-Checker/'
})
