# test-form

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Initial setup

Brief notes on how this project was initially set up:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
pnpm create svelte@latest
pnpm i -D @sveltejs/adapter-static
```
