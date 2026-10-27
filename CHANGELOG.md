# Changelog

All notable changes to the template. Versions are git tags; `copier update` moves an app to the latest one.

## Unreleased

- GUIDE: "Later features" and "Changing behavior" become one section, "Every change after the first build": write it down, review, commit, then code, with step-by-step paths for a new feature, a rule change and a bug.

## v1.1.0

- GUIDE: answers to questions from the first real app build (Card Value). Which commands go in Claude Code and which in your own terminal tab; a new "Add API keys" step (private `.env` link, `.env.example` is yours to edit); keep the first build narrow; accepting an ADR yourself, with the command; committing briefs and plans; when to publish and checking the first CI run; what Dependabot's first pull requests and a failed "uv" job mean. Cheat sheet gains the owner's commands.
- Dependabot skips major versions of `typescript` and `@types/node`; those are deliberate upgrades.
- `.claude/settings.json` denies the agent `evals/answers/` (held-out eval answers) in every app. AGENT_NOTES and the guide now say to put other off-limits paths in the committed `.claude/settings.json`, guarded by a test, not in the git-ignored `settings.local.json`.

## v1.0.1

- Docs: the README and GUIDE explain that updates come from the template's release tags on GitHub, how to pin a release, and how to maintain a fork (edit, test, tag, push). A new app's README links to the changelog.

## v1.0.0

- First public release: `copier.yml` with six questions; spec-driven documents (AGENTS.md, PROCESS.md, SPEC, ARCHITECTURE, STATUS, agent notes, brief, plan and ADR formats); the shared harness (`scripts/setup`, `check`, `format`, `dev`, `publish-github`, lefthook with gitleaks, Claude Code permissions, hooks, plugins and three skills, optional CI and Dependabot); an optional Python layer (uv, ruff, pyright strict, pytest with 80% coverage) and an optional TypeScript layer (TypeScript strict, ESLint with typescript-eslint and SonarJS, Prettier, vitest with 80% coverage); and GUIDE.md with a worked example.
