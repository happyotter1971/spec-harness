# Spec harness

A [Copier](https://copier.readthedocs.io/) template for building apps with a coding agent, using spec-driven development and harness engineering. Each app starts from a short written spec and a process the agent follows, and is surrounded by checks the agent cannot skip: formatters, strict linters, type checkers, tests with coverage, a secrets scan, pre-commit hooks and optional GitHub Actions. Copier creates each app from this template and later brings template improvements into apps already built.

It is built for [Claude Code](https://claude.com/claude-code) (project skills, hooks and permissions), with `AGENTS.md` as the shared instructions file so other agents can follow the same process.

How to work with an app made from this template, from a blank idea to a published app, is explained in [GUIDE.md](GUIDE.md). Start there. This page covers the commands.

## Create an app

```bash
copier copy gh:happyotter1971/spec-harness ~/Code/my-app
cd ~/Code/my-app
scripts/setup
```

Copier asks for the app name, folder name, a one-line description, and whether to include the Python layer, the TypeScript layer and GitHub Actions. `scripts/setup` makes the app a git repository with a first commit, installs dependencies and installs the pre-commit hook.

Tools needed: `git`, `jq`, `lefthook`, `gitleaks`, plus `uv` for Python and `node` for TypeScript. `scripts/setup` names any that are missing and how to install them. The template is developed and tested on macOS with Homebrew; the install hints assume `brew`.

## Update an app

Run this from inside the app, with a clean working tree:

```bash
copier update
```

Copier brings in the changes made to the template since the app was created or last updated. App-owned files (the spec, architecture, status, agent notes, briefs, plans, decisions, `scripts/dev`, `.env.example` and the app's own code) are never touched. A local edit to a template-owned file that clashes with a template change is flagged with conflict markers for review.

Updates come from the template's release tags on GitHub: `copier update` moves the app to the latest tag, and [CHANGELOG.md](CHANGELOG.md) lists what each one changes. To move to a particular release instead, add `--vcs-ref v1.0.1` (any tag).

Each app records the template's source in `.copier-answers.yml` (`_src_path`). If you create apps from a fork or a local copy, that is where their updates come from.

## Change the template

To make your own version, fork this repository and create apps from your fork (`copier copy gh:<your-account>/spec-harness ...`). Then, in a clone of it:

1. Edit the files in `template/` (or `copier.yml`).
2. Generate a test app in a scratch folder (`copier copy --vcs-ref HEAD . /tmp/test-app`; `HEAD` includes uncommitted edits) and run `scripts/setup` and `scripts/check` in it.
3. Add a section to [CHANGELOG.md](CHANGELOG.md), commit, and tag a new version (`git tag v1.1.0`).
4. Push the commit and the tag (`git push origin main v1.1.0`). Apps see a new version only once its tag is on GitHub; `copier update` then moves them to it.

Use a patch version (v1.0.1) for fixes and wording, a minor version (v1.1.0) for new behavior, and a major version (v2.0.0) when updating apps needs manual steps, which the changelog then spells out.

## Layout

- `copier.yml`: the questions and update rules.
- `template/`: the files each app gets.
- `GUIDE.md`, `CHANGELOG.md`, `LICENSE`, this README: the template's own documents. They are not copied into apps.

## License

[MIT](LICENSE)
