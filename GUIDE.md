# Guide: building apps with this template

How to go from a blank idea to a working, published app with this template and Claude Code. The template's [README](README.md) lists the commands; this guide explains how to work.

## 1. The idea in two minutes

**Spec-driven development** means the written spec, not the chat, is the source of truth. You write down what the app must do in `docs/SPEC.md`. The coding agent reads it, asks about anything unclear, writes a plan, and builds from that plan. Because the requirements live in files, any fresh session (or a different agent) can pick up the work without the conversation that came before. When the app's behavior changes, the spec changes first.

**Harness engineering** means surrounding the agent with checks it cannot skip. Formatters, linters, type checkers and tests run automatically: after each edit the agent makes, when it finishes a turn, before every commit, and on GitHub. A failing check tells the agent exactly what is wrong, and it fixes it before you see the work. Quality then stops depending on you reading every line of code.

**Why they work together.** The spec tells the agent what "right" means; the harness tells it when it has gone wrong. Each covers the other's blind spot: a spec alone can be ignored, and checks alone can pass on the wrong app. Together they let you spend your time on what to build, while the agent does the building and the checks keep it honest.

Two words you'll see often:

- **Agent:** Claude Code, working in the app's folder.
- **Check:** `scripts/check`, the one command that runs every check for the app. If it passes, the code is formatted, lint-clean, type-correct and tested to at least 80% coverage.

## 2. Who does what

| You (the owner) | The agent |
|---|---|
| Decide what to build and why | Asks about anything unclear in the spec, one question at a time |
| Write and approve `docs/SPEC.md` | Writes the plan in `docs/plans/` and stops |
| Approve the plan | Builds every phase, checks each one and commits it |
| Review the result and try it by hand | Explains its choices and reports what it built and checked |
| Decide when to publish | Never pushes or publishes unless you ask in that session |

**Where your review time pays off most: the spec and the plan, not the code.** A wrong sentence in the spec becomes a wrong feature; a wrong choice in the plan becomes a wrong design. Both are cheap to fix on paper and expensive to fix in code. The harness checks the code line by line; you check the intent.

## 3. The lifecycle, step by step, in Claude Code

### Start a new app

```bash
copier copy gh:happyotter1971/spec-harness ~/Code/my-app
cd ~/Code/my-app
scripts/setup
```

Copier asks six questions: the app's name ("Card Value"), its folder and package name (it suggests one from the name), a one-line description, and yes or no for the Python layer, the TypeScript layer and GitHub Actions. Choose the layers the app will need; a docs-only app (both "no") is fine for an idea you haven't sized yet.

`scripts/setup` checks the tools it needs and names the install command for any that are missing, then creates the git repository, installs dependencies, installs the pre-commit hook and the app's Claude Code plugins, and makes the first commit. Running it again is safe.

**Done when:** `scripts/check` ends with `scripts/check passed.` and `git log` shows the first commit.

### Write the spec

Open `docs/SPEC.md` and replace each prompt (section 4 explains how). Commit it when it reads well: `git add docs/SPEC.md` then `git commit -m "Write the spec"`.

**Done when:** every section is filled in, each acceptance criterion is one testable sentence, and anything undecided is listed under "Open questions".

### Plan the first build

Open Claude Code in the app's folder (`claude`) and type:

```
/plan-build
```

(or say "Please plan the first build"). The agent reads every document, then asks about anything unclear, one question at a time. Answer each one; it records the answers in `docs/SPEC.md`. Then it writes `docs/plans/PLAN.md`, with no code, and stops.

**Done when:** `docs/plans/PLAN.md` exists, `git status` shows only changes under `docs/`, and the agent says it is waiting for your review.

### Review the plan

Read the plan with the checklist in section 5. Ask for changes in plain words ("Use one command name, not two"); the agent edits the plan. When you're happy, commit it.

### Build it

Run `/clear` first. This starts a fresh session: the docs and the plan carry all the context, which is the point of working spec-first, and a clean session builds more reliably than a long one. Then:

```
/implement-plan
```

(or "Please implement the plan"). The agent builds every phase in order without stopping: it writes the code and tests, checks every success criterion, ticks it in the plan, updates `docs/STATUS.md` and commits the phase. After the last phase it runs `scripts/check`, reviews its own work with `/code-review` (and `/security-review` when the build touches sign-in, payments, secrets or user data; that one needs a GitHub remote, so before publishing the agent checks those points by hand), and reports.

**Done when:** every box in the plan is ticked, `scripts/check` passes, and the report lists each criterion with its result.

### Review the build

Read the report, then try the app yourself with `scripts/dev`. Read `docs/STATUS.md`: it should say what's built, how to run it, what was checked by hand, known issues and the next action. If something is wrong, say so; small fixes are handled as a change (below).

### Later features

1. `/new-feature reading-goals` (any short name): the agent interviews you one question at a time and writes the brief in `docs/features/reading-goals.md`. No code.
2. `/plan-build reading-goals`: it writes `docs/plans/PLAN_reading-goals.md` and stops.
3. Review the plan, `/clear`, then `/implement-plan reading-goals`.

The brief's "What stays the same" section is where you protect what already works: name the rules and screens this feature must not change.

### Changing behavior

When the app should behave differently, change `docs/SPEC.md` first, then ask for the change. For a small change (a fix, a message, a limit), use **plan mode**: press Shift+Tab until it says plan mode, describe the change, and Claude proposes the edits; approve them and it makes them. Anything bigger than a small change gets a brief and a plan instead.

After every build or change, `docs/SPEC.md`, `docs/ARCHITECTURE.md` and `docs/STATUS.md` describe the app as it now is.

### Template updates

When the template improves, bring the improvements into an app from its folder, with everything committed:

```bash
copier update
```

Copier fetches the template from GitHub and moves the app to the latest release tag; the template's [CHANGELOG](CHANGELOG.md) says what each release changes.

Copier applies the template changes to template-owned files (AGENTS.md, PROCESS.md, the scripts, the lint configs, the Claude Code settings) and never touches app-owned ones (the spec, architecture, status, agent notes, briefs, plans, decisions, `scripts/dev`, `.env.example` and your code). If you edited a template-owned file and the template changed the same lines, Copier marks the conflict in the file with `<<<<<<<` and `>>>>>>>` lines for you to resolve. Run `scripts/check`, then commit.

### Publishing

```bash
scripts/publish-github --dry-run
scripts/publish-github
```

The dry run shows the repository name, your GitHub account, "private" and the commands, and changes nothing. The real run checks that the GitHub CLI is signed in, the working tree is clean, `scripts/check` passes, there is no remote yet and the name is free. It then waits for you to type `yes`, creates a private repository, pushes, and confirms GitHub reports it as private. If the app includes GitHub Actions, the push starts the first check run.

## 4. Writing a good spec

`docs/SPEC.md` has six sections. Write it for a reader who knows nothing else about the app.

- **Problem:** what is wrong or missing today, for whom, and why now. Two or three sentences.
- **Users:** who uses the app and in what situation, one line each.
- **What they need to do:** the main jobs as numbered goals in plain words.
- **Acceptance criteria:** numbered, testable sentences (below).
- **Non-goals:** what the app deliberately does not do, so the agent doesn't build it.
- **Open questions:** anything undecided. The agent asks about these before planning.

### Acceptance criteria in EARS form

EARS ("Easy Approach to Requirements Syntax") is a set of five sentence shapes that keep requirements short and testable:

| Shape | Pattern |
|---|---|
| Always | The system shall <response>. |
| Event | When <trigger>, the system shall <response>. |
| State | While <state>, the system shall <response>. |
| Unwanted | If <unwanted condition>, then the system shall <response>. |
| Optional | Where <feature is included>, the system shall <response>. |

Good criteria:

- "AC-4: When the user marks a book as read by its number, the system shall record today's date as the finish date."
- "AC-2: If the title or the author is blank, then the system shall refuse the book and say which one is missing."

Bad criteria, and why:

- "Reading list works well." Nothing can test it.
- "The system shall use SQLite." That is a design choice, not a behavior; it belongs in ARCHITECTURE.md or an ADR.
- "When the user adds a book, the system shall save it and show the list and email a summary." Three behaviors in one; split it so each can pass or fail on its own.

Each criterion should be checkable by a test or a command. If you can't say how you'd check it, rewrite it.

### Size

One to three pages. If the spec grows past that, the first build is too big: keep the core in the spec and move later parts into feature briefs.

### ADRs and ARCHITECTURE.md

An **ADR** (Architecture Decision Record) is a one-page note in `docs/decisions/` recording one significant choice: the situation, the options, the decision and its consequences. Write one (or have the plan propose one) before adopting a framework, database or outside service, or when changing a rule the checks enforce. Copy `docs/decisions/0000-template.md` and give it the next number.

`docs/ARCHITECTURE.md` is one page describing the app as it is now: its parts and how they connect (one diagram), the stack with exact versions, the data model, where business rules are enforced, outside services, environment variables (names only) and how it runs. The ADRs keep the history; ARCHITECTURE.md shows the result. The agent keeps it current after each build.

## 5. Reviewing a plan

Every plan follows the format in `docs/plans/README.md`: the shape of the build, why these choices, contracts (data states and API operations or commands, when the build has them), what's not in this build, and phases with checkbox success criteria. Check it with these questions:

1. **Does every acceptance criterion map to a phase?** Look for each AC number in the phases. A missing one means a missing feature.
2. **Can the agent check each success criterion itself?** Good: "`uv run pytest tests/test_books.py` passes", "`scripts/check` exits 0", "On `/books`, adding 'Dune' shows it at the top of the list (checked in the browser)". Bad: "works well", "looks good".
3. **Is anything built that the spec didn't ask for?** Extra settings, extra commands and "while we're here" features are scope creep. Ask for them to be removed.
4. **Is "Not in this build" honest?** It should list everything deliberately left out, including spec items deferred to later.
5. **Do the contracts read right?** The data states and messages tables are the app's behavior in miniature. Wording you dislike is cheapest to fix here.
6. **Are the choices explained?** Each one should say what it is, the main alternative and why. Any new framework or service should come with a proposed ADR.

If all six pass, approve it.

## 6. The harness in practice

| When | What runs | What you see |
|---|---|---|
| After each agent edit | Claude Code's after-edit hook formats the edited file and lints it | Lint problems go straight back to Claude, which fixes them |
| When Claude finishes a turn that left changes | Claude Code's stop hook runs `scripts/check` | If it fails, Claude is told why and keeps working; it gets one retry, so it can't loop |
| Before each commit | lefthook formats the staged files and adds the fixes, runs the checks for the layer that changed, and scans the staged changes for secrets with gitleaks | A failure blocks the commit |
| On GitHub (if CI was chosen) | `scripts/check`, plus gitleaks over the whole history | A red or green check on each push and pull request |
| Weekly (if CI was chosen) | Dependabot opens pull requests to update dependencies | Each one runs the same checks |

**What `scripts/check` runs:**

- Python: ruff format check, ruff lint, pyright, pytest with at least 80% coverage.
- TypeScript: Prettier check, ESLint, tsc, vitest with at least 80% coverage.

**The strict limits**, the same in both languages: complexity 10, nesting 4, functions 50 lines (in Python, 50 statements), 5 parameters, and in TypeScript 300 lines per file. TypeScript also forbids `any`. These keep code in small, readable pieces; agents otherwise tend to write long, tangled functions.

**What Claude Code allows and blocks** (set in `.claude/settings.json`):

- Allowed without asking: `scripts/check`, `scripts/format`, `scripts/dev`, `uv run`, `npm run`, `npx vitest`, `git status`, `git diff`, `git add`, `git commit`.
- Blocked: `git push`, `scripts/publish-github`, `gh repo create`, `git commit --no-verify`, and reading or editing `.env`.
- You can still push or publish yourself, or approve a one-off when you ask for it in the session.
- If an app has files the agent must never read (such as held-out answers for testing an AI feature), list them under "Off limits" in `docs/AGENT_NOTES.md` and add them to `.claude/settings.local.json` as the comment there shows.

**What a failure looks like.** `scripts/check` prints each step as it runs (`== python: lint`) and ends with either `scripts/check passed.` or a list of the steps that failed. The failing tool's own message, above the list, says what and where.

**What to do.** Usually nothing: the agent sees the failure and fixes it. If you're fixing it yourself, run `scripts/format` for formatting problems and read the message for the rest.

**Why checks are never weakened.** A check that is lowered whenever it fails stops protecting anything. The agent's instructions forbid making a check pass by relaxing it: no loosened limits, no disabled rules, no excluded files. If a rule looks wrong, the agent stops and asks. If a rule really is wrong: write an ADR explaining why, change the rule in the template (or your fork of it), not in one app, release it as a new tag, and bring it into apps with `copier update`. That way the change is deliberate, recorded, and the same everywhere.

## 7. Worked example: a reading list

A real run of the template on a tiny app, kept deliberately different from any real project. Everything below is copied from that run.

### The idea

A command-line reading list: books to read and books finished.

```bash
copier copy gh:happyotter1971/spec-harness ~/Code/reading-list
cd ~/Code/reading-list
scripts/setup
```

Answers: name "Reading List", description "A command-line reading list: books to read and books finished.", Python yes, TypeScript no, GitHub Actions no.

### The spec (excerpt)

The owner filled in `docs/SPEC.md` and left one open question ("What should happen when the same book is added twice?"). Four of its criteria:

```markdown
- AC-1: When the user adds a book with a title and an author, the system shall save it as "to read" with today's date as the added date.
- AC-2: If the title or the author is blank, then the system shall refuse the book and say which one is missing.
- AC-4: When the user marks a book as read by its number, the system shall record today's date as the finish date.
- AC-6: The system shall keep the list between runs.
```

### Clarify

`/plan-build` read the documents and asked three questions, one at a time, each with options and a recommendation:

1. "What should happen when the same book is added twice?" Options: refuse it; refuse it only while it's still to read; allow it. Answer: refuse it.
2. "What is a book's 'number'?" Options: a fixed number given when the book is added and never reused; or its position in the current list, which shifts as books are finished. Answer: a fixed number.
3. "What happens if you mark a book as read when it's already finished?" Options: refuse it and keep the original date; or change the date to today. Answer: refuse it.

The agent wrote each answer into the spec: AC-1 gained "and give it a number. Numbers start at 1, go up by one for each book added, and never change or get reused", and two criteria were added:

```markdown
- AC-7: If the user adds a book whose title and author match a book already on the list, to read or finished, ignoring case and extra spaces, then the system shall refuse it and say it is already on the list.
- AC-8: If the user marks a book as read by a number that no book has, or by the number of a book already finished, then the system shall refuse, change nothing, and say why (for a finished book, with the date it was finished).
```

### The plan (excerpt)

The agent wrote `docs/plans/PLAN.md` with five phases and no code. From "Why these choices":

> **A JSON file, not SQLite.** A personal list will hold tens or hundreds of books, so loading the whole file and saving it again after each change is instant. You can also open the file and read it.

From the contracts, the error messages the owner could review before any code existed:

| When | Message |
|---|---|
| Title blank (AC-2) | `Title is missing.` |
| Same title and author already on the list (AC-7) | `"Dune" by Frank Herbert is already on your list.` |
| Book already finished (AC-8) | `"Dune" was already finished on 2026-10-12.` |

And one phase with its success criteria:

```markdown
### Phase 3: Saving the list

`storage.py` with `load(path)` and `save(path, books)`, using the record format in Contracts. Covers AC-6 at the storage level.

- [ ] `uv run pytest tests/test_storage.py` passes, with tests showing that:
  - saving a list with one book to read and one finished book, then loading it, gives back equal books, numbers and dates included (AC-6)
  - loading a path that doesn't exist gives an empty list
  - the saved file is JSON with the fields `number`, `title`, `author`, `added` and `finished`
- [ ] `scripts/check` exits 0
```

Checked against section 5: every AC maps to a phase, every criterion is a test or a command, nothing extra is built, and "Not in this build" lists deleting, editing and rereading books. The owner approved it, ran `/clear`, then `/implement-plan`.

### A failing check and its fix

The agent built the five phases, one commit each, then ran `/code-review`, which found that saving rewrote the list file in place (an interrupted save could empty it); the agent fixed that with a test. In Phase 5 it wrote a test that ran the real `reading-list` command as separate processes, to prove the list survives between runs. The test passed, but `scripts/check` failed on lint:

```
subprocess-without-shell-equals-true: `subprocess` call: check for execution of untrusted input
  --> tests/test_end_to_end.py:13:14
   |
13 |     result = subprocess.run(
   |              ^^^^^^^^^^^^^^
14 |         [uv, "run", "--quiet", "reading-list", *argv],
```

That is ruff's security rule S603, which flags any program started with arguments that aren't fixed text. The only ways to pass were to hard-code the full path to `uv` (which breaks on any other machine) or to switch the rule off for that line. The agent did neither. It left the test out, recorded it under "Known issues" in STATUS.md, and asked:

> Getting a pass means suppressing the rule, so I left the test out and recorded it under "Known issues" in `docs/STATUS.md`.

This is the harness working as designed: a check failed, and the agent stopped instead of weakening it. The owner answered:

```
No, don't suppress the rule. Prove AC-6 without a subprocess instead: a test that calls cli.main several times in a row against the same file in tmp_path, the way separate runs would, adding two books, finishing one, then listing both lists. Update the Phase 5 criterion in the plan to match, tick it, update STATUS.md, and commit.
```

The agent wrote that test, reworded the Phase 5 criterion and said why, cleared the known issue, and committed. `scripts/check` ended with `scripts/check passed.` (33 tests, 100% coverage). It also pointed out the one thing no test now covers (that the installed command is wired up) and that it had checked it by hand with `scripts/dev list`, which STATUS.md records under "Checked by hand".

The whole app, from `copier copy` to a finished first build, took one spec, three answers, one plan review and one decision about a rule.

## 8. When things go wrong

**The agent skipped the docs.** It answers from general knowledge or ignores a rule in the spec. Say: "Read every file AGENTS.md lists under 'Start here', in full, then try again." If it keeps happening, check that `CLAUDE.md` still contains `@AGENTS.md`.

**The agent built ahead of the spec.** It added a feature, setting or option nobody asked for. Say: "Remove <the extra>; it isn't in the spec." If you actually want it, add it to the spec (or a brief) first, then ask for it.

**The agent keeps failing the same check.** Read the failure yourself (`scripts/check`). Usually the agent is fighting a limit (a function that is too long or too complex); tell it to split the code into smaller functions. If you think the rule itself is wrong for this app, don't let the agent change it; see "Why checks are never weakened" in section 6.

**The stop hook said "scripts/check still fails after one retry".** The agent tried once and handed over anyway. Run `scripts/check` to see the problem, then ask the agent to fix it.

**A commit was blocked.** The pre-commit hook found a problem: a failing check, or a secret in the staged changes. Fix it and commit again. Never use `--no-verify`. If gitleaks flagged a real secret, move it into `.env` and change the secret, since it may have been copied somewhere already.

**A template update conflicts.** After `copier update`, `git status` shows the file as conflicted (`UU`), with `<<<<<<< before updating`, `=======` and `>>>>>>> after updating` markers around the two versions. Keep the parts you want, delete the markers, then run `scripts/check` and commit. If you'd rather start over, `git checkout HEAD -- .` puts every tracked file back as it was before the update; `git status` then shows any new files the update added, which you can delete. To avoid repeat conflicts, keep app-specific changes out of template-owned files: agent notes go in `docs/AGENT_NOTES.md`, extra scripts in new files under `scripts/`, personal Claude Code settings in `.claude/settings.local.json`.

**`copier update` refuses to run.** It needs a git repository with everything committed. Run `git status`, commit or remove the changes, and try again.

**`scripts/setup` reports a missing tool.** It names the tool and the command to install it (for example `brew install lefthook`). Install it and run `scripts/setup` again.

**`npm install` fails with ESTRICTALLOWSCRIPTS.** A new package wants to run an install script, which the template blocks unless approved. Decide whether you trust it: `npm approve-scripts <package>` allows it, `npm deny-scripts <package>` skips it. The choice is recorded in `package.json` under `allowScripts`.

**A Claude Code plugin isn't working.** `scripts/setup` installs the plugins the app enables; run it again if one is missing. The Python and TypeScript language plugins also need their language servers, and setup prints the install command if they aren't found.

## 9. Cheat sheet

**In the terminal**

| Command | What it does |
|---|---|
| `copier copy gh:happyotter1971/spec-harness ~/Code/<app>` | Create a new app |
| `scripts/setup` | Git repository, dependencies, hook, plugins, first commit (safe to rerun) |
| `scripts/check` | Every check; must pass before handover |
| `scripts/format` | Format everything |
| `scripts/dev` | Start the app locally |
| `copier update` | Bring in template improvements (commit first) |
| `scripts/publish-github --dry-run` | Show what publishing would do |
| `scripts/publish-github` | Create a private GitHub repository and push, after you type `yes` |

**In Claude Code**

| Type this | Or say | Result |
|---|---|---|
| `/new-feature <name>` | "Please write a brief for <name>" | `docs/features/<name>.md`, no code |
| `/plan-build` | "Please plan the first build" | `docs/plans/PLAN.md`, then it stops |
| `/plan-build <name>` | "Please plan <name>" | `docs/plans/PLAN_<name>.md`, then it stops |
| `/implement-plan` | "Please implement the plan" | Builds, checks and commits every phase |
| `/implement-plan <name>` | "Please implement the plan for <name>" | The same, for a feature |
| `/clear` | | Fresh session; do this after approving a plan |
| Shift+Tab | | Plan mode, for small changes outside a plan |

**The order of work:** spec, `/plan-build`, answer questions, review plan, `/clear`, `/implement-plan`, review build, STATUS.md.

**Files:** spec `docs/SPEC.md`; plans `docs/plans/`; briefs `docs/features/`; decisions `docs/decisions/`; status `docs/STATUS.md`; app-specific agent notes `docs/AGENT_NOTES.md`.

**Rules the agent follows:** build only what the docs ask; never weaken a check; never `--no-verify`; never commit secrets or read `.env`; never push or publish unless you ask in that session.
