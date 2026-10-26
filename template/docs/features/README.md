# Feature briefs

A brief describes one feature after the first build. It is short (one page) and written before any planning. Create one with `/new-feature <name>`, which interviews the owner and writes `docs/features/<name>.md` in the format below. Then `/plan-build <name>` writes the plan in `docs/plans/PLAN_<name>.md`.

## The brief format

Copy this into `docs/features/<name>.md` and fill in every section.

```markdown
# Brief: <feature name>

## Who asked and why now

<!-- Who wants this, the problem it solves, and why it matters now. Two or three sentences. -->

## What they want

<!-- Numbered outcomes in plain words, each one something a person can see or do. -->

1.

## What stays the same

<!-- Rules and choices this feature must not change: spec criteria, data formats, screens, ADRs. The plan must keep each one. -->

-

## What done looks like

<!-- The checks that pass (tests, commands, pages checked in the browser), and what the owner will see when they try it themselves. -->

-

## Non-goals

<!-- What this feature deliberately leaves out. -->

-

## Plan

The plan goes in `docs/plans/PLAN_<name>.md`.
```
