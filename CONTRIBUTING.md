# Contributing to @geenius-ui

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

```bash
# Clone the repository
git clone https://github.com/mxn2020/geenius-ui.git
cd geenius-ui

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint
```

## Project Structure

```
packages/
  react/        — React components (Tailwind CSS)
  react-css/    — React components (Vanilla CSS)
  solid/        — Solid components (Tailwind CSS)
  solid-css/    — Solid components (Vanilla CSS)
  shared/       — Shared types and constants
```

## Contribution Workflow

1. **Fork** the repository
2. **Create a branch** for your change: `git checkout -b feat/my-feature`
3. **Make your changes** and add tests
4. **Ensure checks pass**: `pnpm lint && pnpm test && pnpm build`
5. **Commit** with a conventional message: `feat: add NewComponent`
6. **Push** and open a Pull Request

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` — New feature or component
- `fix:` — Bug fix
- `docs:` — Documentation only
- `refactor:` — Code change that neither fixes a bug nor adds a feature
- `test:` — Adding or updating tests
- `chore:` — Tooling, CI, dependencies

## Adding a New Component

1. Create the component in the relevant package(s)
2. Export it from the package's `index.ts`
3. Add at least one unit test
4. Update the README if needed

## Code Style

- TypeScript strict mode
- Prettier for formatting
- ESLint for linting

## Questions?

Open an issue or reach out at support@geenius.app.
