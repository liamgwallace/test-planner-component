# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This repo contains two parallel implementations of a Test Stand Scheduler for managing test allocations across multiple test stands:

1. **`example-page-v4.html`** — Standalone browser prototype (React 18 via CDN + Babel transpilation, no build step)
2. **`retool-component/`** — Production Retool custom component (TypeScript/React, built with `retool-ccl`)

Both share the same scheduling logic and visual design.

## Running / Developing

**Standalone prototype** — open `example-page-v4.html` directly in a browser. Data comes from `data.js`.

**Retool component:**
```bash
cd retool-component
npm install
npm run dev      # starts dev server; point Retool Custom Component URL here
npm run build    # compile to dist/
npm run deploy   # deploy to Retool instance
```

For standalone testing of the Retool component without Retool, open `retool-component/preview.html`.

## Architecture

### Standalone prototype (`example-page-v4.html` + `data.js`)

Single-file React app. `data.js` exports a `testData` array. The `TestScheduler` component is the root.

### Retool component (`retool-component/src/index.tsx`)

Single-file TypeScript/React component registered via `@tryretool/custom-component-support`. All logic lives in this one file, structured in clearly labelled sections:

- **Types** — `TestData`, `StandDef`, `InternalStand`, `ScheduledTest`, etc.
- **Template Resolution** — `resolveTemplate()` / `formatFieldValue()` for `{fieldName}` placeholder substitution; dates auto-formatted to `DD Mon`
- **Date Utilities** — `calculateChangeoverEnd()`, `computeSchedule()` for work-hour-aware scheduling
- **Part Status Logic** — `normalizePartStatus()`, `getCalculatedStatus()` derive display status from raw DB fields
- **Scheduling** — `computeSchedule()` chains tests per stand: tests run 24/7, changesovers consume only work hours (Mon–Fri, configurable start/end), weekends skipped
- **UI Components** — inline styled components for queue cards, timeline bars, tooltips, drag-and-drop indicators
- **`TestScheduler` root component** — manages all state; exposes Retool model properties via `Retool.useStateXxx` hooks

### Retool integration pattern

Properties are declared with `Retool.useStateXxx` hooks (inputs like `tests`, `testStands`, config params; outputs like `allocations`, `hasUnsavedChanges`). Events fire via `Retool.useEventCallback`. This is the only way to pass data in/out of a Retool custom component.

### Database schema (Postgres via Retool)

Key tables: `tests`, `test_stands`, `test_stand_allocations`, `test_part_assignments`, `parts`, `job_steps`, `work_orders`, `operations`, `vendors`.

Allocation pattern: `test_stand_allocations(id, test_id, test_stand_id, priority_order, allocated_at)` — the component saves via delete-then-reinsert (see `retool-component/queries/saveAllocations.sql`).

The `getSchedulerData` query (see `retool-existing-queries.md`) is the primary data source; it returns `id, name, duration, owner, priority, notes, status, test_stand_id, priority_order, allocation_id, assigned_parts, part_ready_date, part_status`.

### Visual indicators

- **Priority color**: blue→white→red gradient mapped to 0–100
- **Left cap / border color** by `part_status`: Ready=green, On Time=amber, Delayed=red, Parts Not Assigned=grey, In Progress=blue
- **Bar status** (`getCalculatedStatus`): compares `part_ready_date` against computed test start; if `test_started_date` set, status is "Running"

## Key files

| File | Purpose |
|------|---------|
| `example-page-v4.html` | Standalone browser prototype |
| `data.js` | Sample test data for prototype |
| `retool-component/src/index.tsx` | All Retool component logic |
| `retool-component/preview.html` | Standalone preview for Retool component |
| `retool-component/queries/` | Reference SQL/JS queries for Retool page |
| `retool-existing-queries.md` | Existing Retool page queries and page structure documentation |
