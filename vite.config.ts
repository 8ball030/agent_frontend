import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import { Server } from "socket.io";
import { createServer } from "http";


// we make a simple server.

export default defineConfig({
	plugins: [sveltekit(), purgeCss(), 

    ]
});
