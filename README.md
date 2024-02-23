# test-form

A simple static web page providing a form that can be filled in and then downloaded as a json file

## Developing

Initial setup:

- [install pnpm](https://pnpm.io/installation)
- clone the repo
- `pnpm install`

Start a dev server and open website in browser:

- `pnpm run dev -- --open`

## Building

Website is built and deployed on every push using Github Actions.

## Notes

Commands used to generate most of the first commit:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
pnpm create svelte@latest
pnpm i -D @sveltejs/adapter-static
```

Commands used to add flowbite-svelte UI library:

```bash
npx svelte-add@latest tailwindcss
pnpm i -D flowbite-svelte flowbite
```
