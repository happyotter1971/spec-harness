# Process

How work on this app is planned, built and checked. Every request below has a matching Claude Code skill; saying the words works too.

| Request | Skill | Result |
|---|---|---|
| "Please write the spec" | `/write-spec` | `docs/SPEC.md` |
| "Please write a brief for <name>" | `/new-feature <name>` | `docs/features/<name>.md` |
| "Please plan the first build" | `/plan-build` | `docs/plans/PLAN.md` |
| "Please plan <name>" | `/plan-build <name>` | `docs/plans/PLAN_<name>.md` |
| "Please implement the plan" | `/implement-plan` | the build, phase by phase |
| "Please implement the plan for <name>" | `/implement-plan <name>` | the build, phase by phase |

## Setup

Run `scripts/setup` once in a new app. It creates the git repository, installs dependencies and the pre-commit hook, and makes the first commit. Running it again is safe.

## Spec

When asked to write the spec, use `docs/discovery/` if it exists: the outcomes, research briefs and decision from the discovery skills. Write nothing until its `DECISION.md` is Accepted with deliverable `app`; then record the decision as the next ADR in `docs/decisions/`. With no discovery files, interview the owner one question at a time. Fill every section of `docs/SPEC.md`, with acceptance criteria in EARS form and a narrow first build, and stop. No code, no plan.

## Brief

When asked for a brief, interview the owner one question at a time until you can fill every section of the brief format in `docs/features/README.md`. Write `docs/features/<name>.md` and stop. No code.

## Clarify

Before planning, read the files listed in AGENTS.md under "Start here", plus the brief when planning a feature. List everything in the spec or brief that is ambiguous, missing or contradictory, and ask the owner about it, one question at a time, before writing the plan. Record each answer in the spec or brief, not only in the plan.

## Plan

When asked to plan, write the plan in the format in `docs/plans/README.md` and no code. The first build's plan is `docs/plans/PLAN.md`; a feature's plan is `docs/plans/PLAN_<name>.md`. If the plan proposes a new framework, database or outside service, draft an ADR for it in `docs/decisions/` with status "Proposed". Then stop and wait for the owner to approve the plan.

After the owner approves, they run `/clear` and asks for the implementation in a fresh session. The docs and the plan carry all the context.

## Implement

When asked to implement, build every phase of the plan in order without stopping to ask. For each phase:

1. Write the code and the tests that cover it.
2. Verify each success criterion yourself and fix anything that fails; `scripts/check` must pass. For pages in the browser, check them with the Playwright MCP server.
3. Tick the phase's criteria in the plan.
4. Update `docs/STATUS.md`.
5. Commit, with a message that names the phase.

After the last phase:

1. Run `scripts/check`.
2. Run `/code-review` on the build and fix what it finds. Run `/security-review` too when the build touches sign-in, payments, secrets or user data. (`/security-review` needs a GitHub remote; before the app is published, review those points by hand and say so in the report.)
3. Make sure `docs/SPEC.md`, `docs/ARCHITECTURE.md` and `docs/STATUS.md` describe the app as it now is, and set any ADRs the build carried out to "Accepted".
4. Report to the owner: what was built, each success criterion and its result, anything not done and why, and what they should try by hand.

If a criterion can't be met without breaking a rule below, stop and ask.

## Change

When behavior changes, update `docs/SPEC.md` first, then the code. After every build, SPEC.md, ARCHITECTURE.md and STATUS.md describe the app as it now is, not as it was planned.

Small changes outside a plan (a fix, a wording change) use Claude Code's plan mode: propose, wait for the owner's yes, then edit. Anything bigger gets a brief and a plan.

## Rules

- Add tests with every change.
- Tests never call a real AI model or outside service; use a stub.
- A live run against a paid service is small and capped, starts from reset data, and happens only when the plan or the owner asks for it. Record what happened under "Checked by hand" in STATUS.md.
- Outside a plan, commit each change once `scripts/check` passes.
- Never make a check pass by relaxing it: no looser limits, disabled rules or excluded files. If a rule looks wrong, stop and ask.
- If the only way to pass a check is to suppress it, leave that piece out, record it under "Known issues" in `docs/STATUS.md`, finish the rest, and ask in the report.
- Keep `docs/STATUS.md` current.
- Never push, publish or deploy unless the owner asks in that session.
