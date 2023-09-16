import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	vitePlugin: {
		inspector: true
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// pages: 'build',
			// assets: 'build',
			// fallback: undefined,
			// precompress: false,
			// strict: false
		}),
		csrf: {
			checkOrigin: false
			// exclude: [ "/webhooks/*" ],
			// AND/OR
			// exclude [ "/webhooks/1", "/webhooks/2" ]
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore deliberate link to shiny 404 page
				console.log('Issue serving: ' + path);
				console.log('Referer: ' + referrer);
				console.log('Message: ' + message);
				return;
			}
		}
	}
};
export default config;
