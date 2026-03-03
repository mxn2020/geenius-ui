import { defineConfig } from 'tsup'

export default defineConfig({
    entry: { index: 'src/index.ts' },
    outDir: 'dist',
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    external: [
        'react',
        'react-dom',
        '@tanstack/react-router',
        '@tanstack/react-table',
        '@tanstack/match-sorter-utils',
        'lucide-react',
        '@geenius-ui/shared',
    ],
    esbuildOptions(options) {
        options.jsx = 'automatic'
    },
    treeshake: true,
    splitting: true,
})
