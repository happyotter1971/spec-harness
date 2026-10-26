---
name: plan-build
description: Plan the first build (docs/plans/PLAN.md) or a feature (docs/plans/PLAN_<name>.md) as docs/PROCESS.md describes, then stop for the owner's review. Use when the owner asks to plan. No code.
argument-hint: "[name]"
---

Plan the build as `docs/PROCESS.md` describes ("Clarify" and "Plan").

- No argument: plan the first build from `docs/SPEC.md` and write `docs/plans/PLAN.md`.
- With a name ("$ARGUMENTS"): plan that feature from `docs/features/$ARGUMENTS.md` and write `docs/plans/PLAN_$ARGUMENTS.md`.

1. Read every file AGENTS.md lists under "Start here", in full, plus the brief if there is one.
2. Ask the owner about anything unclear, one question at a time, and record the answers in the spec or brief.
3. Write the plan in the format in `docs/plans/README.md`. Write no code.
4. Stop and wait for the owner's review.
