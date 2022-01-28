import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@modules': path.resolve(__dirname, './src/modules'),
			'@context': path.resolve(__dirname, './src/context/reducer.tsx'),
		},
	},

});
