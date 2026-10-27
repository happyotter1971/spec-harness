---
name: write-spec
description: Write docs/SPEC.md from the discovery files in docs/discovery/, or by interviewing the owner when there are none, and record the build decision as an ADR. Use when the owner asks to write or draft the spec. No code, no plan.
---

Write `docs/SPEC.md` as `docs/PROCESS.md` describes ("Spec").

1. Read `AGENTS.md`, `docs/PROCESS.md`, and the current `docs/SPEC.md`, including the prompts in its comments.
2. If `docs/discovery/` exists, read `OUTCOMES.md`, every brief in `research/`, and `DECISION.md`.
   - If `DECISION.md` is not **Accepted**, or its deliverable is not `app`, stop and say why. The spec waits for an accepted decision to build an app.
   - Otherwise copy the decision into `docs/decisions/` as the next numbered ADR (usually `0002-<short-title>.md`), in the format of `0000-template.md`, with status Accepted and the decision's date. Link the research briefs from its Context.
3. If there is no `docs/discovery/`, interview the owner one question at a time until every section of the spec can be filled in.
4. Fill every section of `docs/SPEC.md`:
   - Problem, Users and Success measures from the outcomes.
   - What they need to do as numbered goals.
   - Acceptance criteria in EARS form, numbered AC-1 onward, each one testable and each one a behavior, not a design choice.
   - The first build kept narrow: the smallest slice that is useful on its own. Everything else goes under Non-goals as a later feature.
   - Anything undecided under Open questions.
   Keep it to one to three pages. Remove the prompt comments.
5. Ask the owner about anything ambiguous, missing or contradictory, one question at a time, and record each answer in the spec.
6. Stop. Tell the owner to review and commit the spec, then run `/plan-build`. Write no code and no plan.
