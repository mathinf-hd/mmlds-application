import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { execSync } from 'child_process';

const commitHash = execSync("git rev-parse HEAD").toString().trim();

export default defineConfig({
	define: {
		'import.meta.env.VITE_BUILD_DATETIME': JSON.stringify(new Date().toISOString()),
		'import.meta.env.VITE_BUILD_COMMIT': JSON.stringify(commitHash)
	},
	plugins: [sveltekit(), purgeCss()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
