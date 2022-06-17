import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), viteCompression(), vueJsx()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'~@': path.resolve(__dirname, './src')
		}
	},
	server: {
		host: '0.0.0.0',
		port: 3000,
		cors: true,
		proxy: {
			'/api': {
				target: 'http://139.9.169.88:8084/',
				changeOrigin: true,
				ws: true,
				rewrite: path => path.replace(/^\/api/, '/api')
			}
		}
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	},
	optimizeDeps: {
		exclude: ['@dc/vue-web-base'],
		include: ['@ant-design/icons-vue', 'axios']
	}
})
