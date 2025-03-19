# [mmlds-application](https://mathinf-hd.github.io/mmlds-application/)

A simple static web page providing a form that can be filled in and then downloaded as a json file.

To edit the contents: jj

- the headings and introductory text are defined in [src/routes/+page.svelte](src/routes/+page.svelte)
- the topics and subtopics are defined in [src/lib/formTopics.ts](src/lib/formTopics.ts)
- the additional questions are defined in [src/lib/formQuestions.ts](src/lib/formQuestions.ts)

The website is automatically built and deployed to [mathinf-hd.github.io/mmlds-application](https://mathinf-hd.github.io/mmlds-application) on every push to the main branch using this [Github Action](.github/workflows/deploy.yml).

## Local development

Initial setup to edit the website locally:

- install [pnpm](https://pnpm.io/installation), e.g. `curl -fsSL https://get.pnpm.io/install.sh | sh -`
- clone the repo, e.g. `gh repo clone mathinf-hd/mmlds-application`
- install node dependencies, e.g. `pnpm install`

To start a dev server and open the website in browser:

- `pnpm run dev -- --open`

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
