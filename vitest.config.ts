/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['tests/**/*.test.{ts,tsx}', 'packages/*/src/**/*.test.{ts,tsx}'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov'],
            include: ['packages/*/src/**/*.{ts,tsx}'],
            exclude: ['**/index.ts', '**/*.d.ts'],
        },
    },
})
