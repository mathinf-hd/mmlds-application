# test-form

A simple static web page providing a form that can be filled in and then downloaded as a json file.

The user can add as many rows of data as they want.

The fields for the form and the rows of data are defined in [src/lib/form.ts](src/lib/form.ts).

## Developing

Initial setup:

- intall [pnpm](https://pnpm.io/installation), e.g. `curl -fsSL https://get.pnpm.io/install.sh | sh -`
- clone the repo, e.g. `gh repo clone ssciwr/test-form`
- install node dependencies, e.g. `pnpm install`

Start a dev server and open website in browser:

- `pnpm run dev -- --open`

## Building

Website is built and deployed on every push using this [Github Action](.github/workflows/deploy.yml).

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
