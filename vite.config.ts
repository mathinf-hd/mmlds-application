import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { execSync } from 'child_process';

let commitHash = 'unknown';
try {
  commitHash = execSync('git rev-parse HEAD').toString().trim();
} catch (err) {
  console.warn('⚠️  Not a git repository. Using default commit hash.');
}
export default defineConfig({
  plugins: [
    sveltekit(),
    purgeCss()
  ],
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash)
  }
});

