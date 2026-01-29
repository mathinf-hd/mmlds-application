import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { execSync } from 'child_process';

<<<<<<< Updated upstream
let commitHash = 'unknown';
try {
  commitHash = execSync('git rev-parse HEAD').toString().trim();
} catch (err) {
  console.warn('⚠️  Not a git repository. Using default commit hash.');
}
=======
function getCommitHash(): string {
	try {
		// Works when the project is a git repo; won't crash if .git is missing
		return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
			.toString()
			.trim();
	} catch {
		return 'unknown';
	}
}

const commitHash = getCommitHash();

>>>>>>> Stashed changes
export default defineConfig({
  plugins: [
    sveltekit(),
    purgeCss()
  ],
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash)
  }
});

