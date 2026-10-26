# Plans

A plan turns the spec (or a feature brief) into phases the agent can build and check by itself. The agent writes it when asked to plan (`/plan-build`), with no code, then stops for the owner's review.

- First build: `docs/plans/PLAN.md`
- A feature: `docs/plans/PLAN_<name>.md`

## The plan format

Every plan has these sections, in this order.

```markdown
# Plan: <first build | feature name>

Status: Proposed | Approved | Built
Source: docs/SPEC.md (or docs/features/<name>.md)

## The shape of the build

<!-- A small Mermaid diagram of the parts and how they connect, with a line on each part. -->

## Why these choices

<!-- The reasoning in plain words: each choice, the main alternative, and why this one. Say where each business rule is enforced. List any ADRs this plan proposes. -->

## Contracts

<!-- Include when the build has them, so the owner can review behavior before any code exists. -->

Data states:

| State | Label shown | Set when |
|---|---|---|

API operations:

| Method and path | Name | Used by | What it does |
|---|---|---|---|

## Not in this build

<!-- What is deliberately left out, honestly, including spec items deferred to later. -->

## Phases

<!-- Usually 5 or 6. Each phase builds on the last and ends with a commit. -->

### Phase 1: <name>

<!-- What gets built, and which acceptance criteria (AC-n) it covers. -->

- [ ] <a criterion the agent can check itself>
```

## Writing success criteria

Each criterion is something the agent can verify itself and show the evidence for:

- a test that passes: "`uv run pytest tests/test_books.py` passes, including the case where the title is empty"
- a command and its exact output: "`scripts/check` exits 0"
- an API call and its response: "`POST /books` with no title returns 422 and the message `Title is required`"
- for a screen: a page checked in the browser with the Playwright MCP server: "On `/books`, adding 'Dune' shows it at the top of the list"

Not criteria: "works well", "looks good", "is fast". Every acceptance criterion in the spec maps to at least one phase.
