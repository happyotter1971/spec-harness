---
name: implement-plan
description: Build every phase of an approved plan in order, checking and committing each one, as docs/PROCESS.md describes. Use when the owner asks to implement the plan.
argument-hint: "[name]"
---

Implement the plan as `docs/PROCESS.md` describes ("Implement").

- No argument: the plan is `docs/plans/PLAN.md`.
- With a name ("$ARGUMENTS"): the plan is `docs/plans/PLAN_$ARGUMENTS.md`.

1. Read every file AGENTS.md lists under "Start here", in full, and the plan.
2. Work through the phases in order without pausing between them: write the code and its tests, verify each success criterion and fix what fails, tick the criteria, update `docs/STATUS.md`, commit.
3. After the last phase, finish as PROCESS.md says (`scripts/check`, `/code-review`, `/security-review` when needed, docs current) and report to the owner.
