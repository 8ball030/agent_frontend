# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## Running a dev agent
### Running in docker

```bash
docker run -p 8001:8001 -p 8080:8080 -it valory/open-autonomy-user:0.10.7
export AGENT_HASH=bafybeiepvtx6bjafcqf73ykwwjyuddvb3cdjach6bkeplg7mrtdzf2q7fy
aea fetch $AGENT_HASH --alias agent
cd agent
export LOG_FILE="log.txt"
export LOG_DIR="."
aea -s generate-key ethereum && aea -s add-key ethereum && \
aea -s install && \
aea -s run
```
