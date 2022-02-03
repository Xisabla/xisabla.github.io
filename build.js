const esbuild = require('esbuild')
const path = require('path')
const fs = require('fs').promises

// ---- Build config ---------------------------------------------------------------------

// Sources & Dist
const SOURCES_DIR = path.resolve('./src')
const DIST_DIR = path.resolve('./js')
const entryPoints = [path.join(SOURCES_DIR, 'main.ts')]

const outfile = path.resolve(DIST_DIR, 'main.js')

// Watch mode
const watch = process.argv.includes('--watch')

// ---- Build ----------------------------------------------------------------------------

esbuild
	.build({
		entryPoints,
		outfile,

		target: ['chrome58', 'firefox57', 'safari11', 'edge16'],

		bundle: true,
		minify: true,
		sourcemap: true,

		watch,
	})
	.catch(console.error)
