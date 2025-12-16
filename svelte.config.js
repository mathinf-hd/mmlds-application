import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html',  // Enable SPA mode
            strict: false
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
	},

	preprocess: [vitePreprocess({})]
};

export default config;
