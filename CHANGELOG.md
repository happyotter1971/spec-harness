# Changelog

All notable changes to the template. Versions are git tags; `copier update` moves an app to the latest one.

## v1.0.1

- Docs: the README and GUIDE explain that updates come from the template's release tags on GitHub, how to pin a release, and how to maintain a fork (edit, test, tag, push). A new app's README links to the changelog.

## v1.0.0

- First public release: `copier.yml` with six questions; spec-driven documents (AGENTS.md, PROCESS.md, SPEC, ARCHITECTURE, STATUS, agent notes, brief, plan and ADR formats); the shared harness (`scripts/setup`, `check`, `format`, `dev`, `publish-github`, lefthook with gitleaks, Claude Code permissions, hooks, plugins and three skills, optional CI and Dependabot); an optional Python layer (uv, ruff, pyright strict, pytest with 80% coverage) and an optional TypeScript layer (TypeScript strict, ESLint with typescript-eslint and SonarJS, Prettier, vitest with 80% coverage); and GUIDE.md with a worked example.
