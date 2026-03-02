import { defineConfig } from 'tsup'

export default defineConfig([
    // React build
    {
        entry: {
            'index': 'src/react/index.ts',
        },
        outDir: 'dist/react',
        format: ['esm'],
        dts: true,
        sourcemap: true,
        clean: false,
        external: [
            'react',
            'react-dom',
            'solid-js',
            '@tanstack/react-router',
            '@tanstack/react-table',
            '@tanstack/match-sorter-utils',
            'lucide-react',
            'lucide-solid',
        ],
        esbuildOptions(options) {
            options.jsx = 'automatic'
        },
        treeshake: true,
        splitting: true,
    },
    // Shared build
    {
        entry: {
            'index': 'src/shared/index.ts',
        },
        outDir: 'dist/shared',
        format: ['esm'],
        dts: true,
        sourcemap: true,
        clean: false,
        treeshake: true,
    },
    // Note: Solid build is handled separately via tsc (see package.json build script)
    // because esbuild's jsx: 'preserve' mode is intended for Solid's own compiler
])
