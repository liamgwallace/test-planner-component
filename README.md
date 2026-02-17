# Test Stand Scheduler

A drag-and-drop Gantt-style scheduler for managing test allocations across multiple test stands. Built as a **Retool Custom Component** for internal use at a small R&D team, with a standalone HTML prototype for rapid iteration.

---

## What It Does

The scheduler replaces a simple Retool table/list-view test planning page with a richer visual tool:

- **Queue sidebar** — unallocated tests shown as cards, filterable and sortable
- **Gantt timeline** — each test stand gets a lane; tests are shown as bars with computed start/end times
- **Drag and drop** — drag tests from the queue onto a stand, reorder within a stand, move between stands, or drag back to the queue
- **Smart scheduling** — tests run continuously (24/7); changeover periods between tests are work-hours-only (configurable, default Mon–Fri 09:00–17:00), weekends skipped
- **Part readiness status** — colour-coded left-cap bar on each card/bar: green (Ready), amber (On Time), red (Delayed), grey (Parts Not Assigned / In Progress)
- **Batch or live save** — choose a manual Save/Discard flow or auto-emit on every drag

---

## Repository Structure

```
test-planner-component/
├── example-page-v4.html       # Standalone browser prototype (no build step)
├── data.js                    # Sample test data used by the prototype
├── retool-component/          # The deployable Retool Custom Component
│   ├── src/
│   │   └── index.tsx          # All component logic (single-file React/TS)
│   ├── queries/
│   │   ├── getSchedulerData.sql   # Main data query
│   │   ├── getTestStands.sql      # Active stands query
│   │   ├── saveAllocations.sql    # Atomic save (delete + re-insert)
│   │   └── handleSave.js          # JS query wiring the save flow
│   ├── package.json
│   ├── retool.config.json
│   └── tsconfig.json
├── research/                  # Background notes on Retool custom components
└── retool-existing-queries.md # Existing Retool page queries (reference)
```

---

## Standalone Prototype

Open `example-page-v4.html` directly in a browser — no server, no build step required. It loads React 18 and Babel from CDN and uses `data.js` for sample tests.

Use this for:
- Quick visual iteration on layout/behaviour
- Demoing to the team without a Retool instance
- Testing the scheduling logic in isolation

To change the sample data, edit `data.js` and refresh the browser.

---

## Retool Custom Component

### Prerequisites

- **Node.js 20+**
- A Retool instance with admin access
- A Retool API key (Settings → API → Personal tokens)

### Install

```bash
cd retool-component
npm install
```

### Authenticate

```bash
npx retool-ccl login
# Enter your Retool domain (e.g. yourco.retool.com) and API key
```

### Develop

```bash
npm run dev
```

This starts a local dev server. In Retool:
1. Open your app in the editor
2. Add a **Custom Component** to the canvas
3. Set the component URL to the dev server URL printed in the terminal
4. Edits to `src/index.tsx` auto-reload in the Retool editor

For standalone testing without Retool, open `retool-component/preview.html` in a browser.

### Deploy

```bash
npm run build
npm run deploy
```

After deploying, the component appears in the Retool component panel under its library name. Pin a specific deployed version from the component's Inspector to lock production behaviour.

---

## Database Schema (Expected)

The queries assume this schema (PostgreSQL):

```sql
-- Tests
tests (id, name, owner, priority, duration, notes, status, planned_date)

-- Test stands
test_stands (id, name, is_active)

-- Allocations — one row per test assigned to a stand
test_stand_allocations (id, test_id, test_stand_id, priority_order, allocated_at)

-- Parts manufacturing pipeline
parts (id, serial_number, ...)
test_part_assignments (test_id, part_id)
job_steps (part_id, work_order_id, step_sequence, status, expected_return_date, completed_date)
```

---

## Retool Setup

### 1. Create the Queries

| Query name | File | Type |
|---|---|---|
| `getSchedulerData` | `queries/getSchedulerData.sql` | SQL (PostgreSQL) |
| `getTestStands` | `queries/getTestStands.sql` | SQL (PostgreSQL) |
| `saveAllocations` | `queries/saveAllocations.sql` | SQL (PostgreSQL) |
| `handleSave` | `queries/handleSave.js` | JavaScript |

### 2. Add the Component and Bind Data

Drag the `TestStandScheduler` component onto your page. In the Inspector, bind:

| Component property | Value |
|---|---|
| `tests` | `{{ getSchedulerData.data }}` |
| `testStands` | `{{ getTestStands.data }}` |

### 3. Wire the Save Event

On the scheduler component → **Events** tab → `onSave` → trigger `handleSave`.

`handleSave` reads `testStandScheduler.allocations` and `testStandScheduler.allTestIds` from component output state, passes them to `saveAllocations`, then re-triggers `getSchedulerData` to refresh.

### 4. statusFilter Parameter

`getSchedulerData` accepts a `statusFilter` array to control which test statuses load into the scheduler. You can bind this to a Retool variable or pass it directly, e.g. `['Created']`. Tests with a `NULL` status are always included regardless.

---

## Component Properties Reference

### Inputs

| Property | Type | Default | Description |
|---|---|---|---|
| `tests` | Array | `[]` | Test objects from `getSchedulerData` |
| `testStands` | Array | `[]` | Stand objects `{id, name}` from `getTestStands` |

### Configuration

| Property | Type | Default | Description |
|---|---|---|---|
| `saveMode` | `"batch"` \| `"live"` | `"batch"` | `batch` = manual Save/Discard buttons; `live` = emit `onChange` on every drag |
| `changeoverHours` | Number | `3` | Work-hours for changeover between consecutive tests |
| `workStart` | Number | `9` | Work day start hour (0–23) |
| `workEnd` | Number | `17` | Work day end hour (0–23) |
| `defaultViewWeeks` | `2\|4\|8\|12\|24` | `4` | Initial timeline zoom level |

### Display Templates

Templates use `{fieldName}` placeholders — any field on the test object is valid. Dates in `YYYY-MM-DD` format are auto-formatted to `DD Mon`.

| Property | Default | Description |
|---|---|---|
| `cardMainText` | `{name}` | Primary title on cards and timeline bars |
| `cardSubText` | `Parts: {part_ready_date}` | Subtitle line (hidden when all referenced fields are empty) |
| `cardInfoRow` | `{owner} · {duration}h · P{priority}` | Small info row on cards and bars |
| `tooltipTemplate` | See below | Hover tooltip content; use `\n` for line breaks |

Default tooltip template:
```
Notes: {notes}
Owner: {owner}
Priority: {priority}
Part Status: {part_status}
Parts Due: {part_ready_date}
Assigned Parts: {assigned_parts}
```

Lines where the value after the colon is empty are automatically hidden from the tooltip.

### Outputs

These are readable from other components in Retool as `testStandScheduler.<property>`:

| Property | Type | Description |
|---|---|---|
| `allocations` | Array | `[{test_id, test_stand_id, priority_order}]` — current scheduler state |
| `allTestIds` | Array | All test IDs the scheduler is managing (needed for the delete step in save) |
| `hasUnsavedChanges` | Boolean | `true` when local state differs from the loaded data |

### Events

| Event | When it fires |
|---|---|
| `onSave` | User clicks Save (batch mode) or on every change (live mode) |
| `onChange` | Every allocation change regardless of save mode |

---

## Scheduling Logic

```
Timeline origin: Monday of the current week at 00:00

For each stand, tests are scheduled sequentially:
  Test N starts immediately after previous changeover ends
  Test N ends  →  changeover starts
  Changeover consumes work hours only (workStart–workEnd, Mon–Fri, skips weekends)
  Changeover end  →  Test N+1 starts

Tests run continuously (24/7). Only the changeover gaps are restricted to work hours.
```

### Part Readiness Status

The left-cap bar colour on every card and timeline bar:

| Status | Condition | Colour |
|---|---|---|
| **Ready** | All job steps complete, or `part_status = 'Ready'` | Green |
| **On Time** | Parts in progress, `part_ready_date` ≤ scheduled test start | Amber |
| **Delayed** | Parts in progress, `part_ready_date` > scheduled test start | Red |
| **Parts Not Assigned** | No parts linked to this test | Grey |
| **In Progress** | Parts assigned but no delivery date available | Light grey |

Queue cards (unscheduled) can only show Ready, Parts Not Assigned, or In Progress since there is no scheduled start date to compare against.

---

## Test Object Fields

Fields returned by `getSchedulerData` and expected by the component:

| Field | Type | Notes |
|---|---|---|
| `id` | int | Primary key |
| `name` | string | Test name |
| `owner` | string | Engineer responsible |
| `priority` | int 0–100 | Higher = more urgent |
| `duration` | int | Test run time in hours (wall-clock, continuous) |
| `notes` | string | Free text |
| `status` | string | e.g. `'Created'` |
| `test_stand_id` | int \| null | `null` if unallocated |
| `priority_order` | int \| null | Position within stand queue |
| `allocation_id` | int \| null | `test_stand_allocations.id` |
| `assigned_parts` | string \| null | Comma-separated serial numbers |
| `part_ready_date` | date string \| null | Latest expected part delivery (`YYYY-MM-DD`) |
| `part_status` | string | `'Ready'`, `'Parts Not Assigned'`, or `'In Progress'` |

Any additional columns returned by the query are preserved on the object and can be referenced in display templates.
