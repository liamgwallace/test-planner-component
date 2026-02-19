# Retool Setup Guide — Test Stand Scheduler Component

Complete step-by-step instructions for wiring the scheduler custom component into a Retool page.

---

## Overview

You need four queries and one custom component. The data flow is:

```
getTestStands ──────────────────────────────────────┐
                                                     ▼
getSchedulerData ───────────────────────────► [Scheduler Component]
                                                     │
                         component events            │ allocations output
                              │                      ▼
                        handleSave.js ──► saveAllocations.sql
                                               │
                                    lastRunAt ─► savedAt binding
                                               (component updates
                                                optimistically — no
                                                getSchedulerData re-fetch)
```

---

## Step 1 — Create `getTestStands` (SQL query)

**Type:** PostgreSQL
**Name:** `getTestStands`
**Trigger:** Run on page load ✓

```sql
SELECT
    id,
    name
FROM test_stands
WHERE is_active = true
ORDER BY name;
```

No parameters needed.

---

## Step 2 — Create `getSchedulerData` (SQL query)

**Type:** PostgreSQL
**Name:** `getSchedulerData`
**Trigger:** Run on page load ✓

Paste the full contents of `retool-component/queries/getSchedulerData.sql`.

No input parameters — the `WHERE` clause is hardcoded to `status IN ('Created', 'Running')`.

---

## Step 3 — Create `saveAllocations` (SQL query)

**Type:** PostgreSQL
**Name:** `saveAllocations`
**Trigger:** Only when manually triggered (do NOT run on page load)

Paste the full contents of `retool-component/queries/saveAllocations.sql`.

This query expects two parameters passed via `additionalScope` from `handleSave`:

| Parameter | Type | Description |
|---|---|---|
| `unallocatedIds` | integer[] | Test IDs that have been removed from all stands (need DELETE) |
| `allocationsJson` | text (JSON) | Current allocations as JSON array (upserted) |

These are always provided by `handleSave.js` — you do not need to configure them manually.

---

## Step 4 — Create `handleSave` (JavaScript query)

**Type:** JavaScript
**Name:** `handleSave`
**Trigger:** Only when manually triggered (do NOT run on page load)

Paste the full contents of `retool-component/queries/handleSave.js`.

> **Note:** Replace `testStandScheduler` with whatever you name the custom component on the page (Retool uses the component name as a variable). If you name it `scheduler1`, use `scheduler1.allocations` etc.

---

## Step 5 — Add the Custom Component

1. In the Retool editor, drag a **Custom Component** onto the page.
2. Name it `testStandScheduler` (or your preferred name — keep it consistent with Step 4).
3. Under **Component URL**, either:
   - Point to your deployed Retool instance URL, or
   - Use the dev server URL (`http://localhost:3000`) while developing.
4. The component will load and show an inspector panel on the right.

---

## Step 6 — Bind Component Inputs (Properties)

In the component inspector, configure each property:

### Required inputs

| Property | Value to enter |
|---|---|
| **Tests Data** (`tests`) | `{{ formatDataAsArray(getSchedulerData.data) }}` |
| **Test Stands Data** (`testStands`) | `{{ formatDataAsArray(getTestStands.data) }}` |

### Save state (required for spinner/error overlay)

| Property | Value to enter |
|---|---|
| **Is Saving** (`isSaving`) | `{{ saveAllocations.isFetching }}` |
| **Has Save Error** (`hasSaveError`) | `{{ !!saveAllocations.error }}` |
| **Saved At** (`savedAt`) | `{{ saveAllocations.lastRunAt }}` |

`isSaving = true` shows the spinner. `hasSaveError = true` shows the error banner. Both `false` clears the overlay. `savedAt` triggers the optimistic state snapshot so the component self-heals without a `getSchedulerData` re-fetch.

### Save mode

| Property | Options | Notes |
|---|---|---|
| **Save Mode** (`saveMode`) | `batch` / `live` | `batch` = Save button appears, user clicks to commit. `live` = every drag auto-saves immediately. |

### Scheduling config (optional — defaults shown)

| Property | Default | Description |
|---|---|---|
| **Changeover Hours** (`changeoverHours`) | `3` | Work hours between tests |
| **Work Start Hour** (`workStart`) | `9` | Start of working day (24h) |
| **Work End Hour** (`workEnd`) | `17` | End of working day (24h) |
| **Default View** (`defaultViewWeeks`) | `4` | Initial timeline viewport in weeks |

### Display templates (optional — defaults shown)

These use `{fieldName}` placeholders that resolve against each test's data fields.

| Property | Default value | Description |
|---|---|---|
| **Card Title** (`cardMainText`) | `{name}` | Main text on queue cards and timeline bars |
| **Card Subtitle** (`cardSubText`) | `Parts: {part_ready_date}` | Second line on queue cards (hidden when empty) |
| **Card Info Row** (`cardInfoRow`) | `{owner} · {duration}h · P{priority}` | Small info row on cards and bars |
| **Tooltip Template** (`tooltipTemplate`) | see below | Multi-line tooltip on hover |

Default tooltip template (use `\n` for line breaks in the Retool text field):
```
Notes: {notes}\nOwner: {owner}\nPriority: {priority}\nPart Status: {part_status}\nParts Due: {part_ready_date}\nAssigned Parts: {assigned_parts}
```

Any field name from the `getSchedulerData` query can be used as a `{placeholder}`. Date fields are auto-formatted to `DD Mon`.

---

## Step 7 — Wire Component Events

In the component inspector, go to the **Events** tab and add the following:

### `onSave` event
Fired when the user clicks **Save Changes** (batch mode only).

| Setting | Value |
|---|---|
| Event | `onSave` |
| Action | Control query |
| Query | `handleSave` |
| Method | Trigger |

### `onChange` event
Fired on every drag-drop when `saveMode = live`.

| Setting | Value |
|---|---|
| Event | `onChange` |
| Action | Control query |
| Query | `handleSave` |
| Method | Trigger |

### `onRetry` event
Fired when the user clicks **Retry** in the error overlay.

| Setting | Value |
|---|---|
| Event | `onRetry` |
| Action | Control query |
| Query | `handleSave` |
| Method | Trigger |

> All three events point to the same `handleSave` query. `onChange` is only active in live mode (the component fires it only when `saveMode = 'live'`), but wiring it unconditionally is harmless.

---

## Step 8 — (Optional) Read Component Output State

The component exposes these output properties, readable as `testStandScheduler.<property>`:

| Property | Type | Description |
|---|---|---|
| `allocations` | array | `[{test_id, test_stand_id, priority_order}]` — current scheduler state |
| `allTestIds` | array | All test IDs the component is managing |
| `hasUnsavedChanges` | boolean | `true` when there are uncommitted changes (batch mode) |

`handleSave.js` reads `allocations` and `allTestIds` automatically. You only need to reference these directly if you want to build additional UI (e.g. a counter badge showing unsaved changes).

---

## Full Wiring Summary

```
getTestStands (SQL, run on load)
  └─► component input: testStands

getSchedulerData (SQL, run on load)
  └─► component input: tests

isSaving binding on component:     {{ saveAllocations.isFetching }}
hasSaveError binding on component: {{ !!saveAllocations.error }}
savedAt binding on component:      {{ saveAllocations.lastRunAt }}

component event: onSave  ──► handleSave (JS)
component event: onChange ──► handleSave (JS)
component event: onRetry ──► handleSave (JS)

handleSave (JS)
  ├─ reads: testStandScheduler.allocations
  ├─ reads: testStandScheduler.allTestIds
  └─► saveAllocations (SQL)   ← narrow DELETE + upsert
        └─ lastRunAt ──► savedAt ──► component optimistic snapshot
```

---

## Save State Machine

```
        idle  (no overlay)
           │
  drag (live) or Save click (batch)
           │  component sets pendingSave internally
           ▼
      spinner overlay
           │
  Retool: isSaving → true
           ▼
      spinner overlay (now driven by Retool)
      ┌────┴────────────┐
   success            error
      │                  │  hasSaveError → true
      ▼                  ▼
  savedAt changes    error overlay (Retry / Discard)
  optimistic snap    ┌───┴───┐
  overlay clears  Retry    Discard
                     │        │
                     ▼        ▼
                 spinner    idle (changes reverted)
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Component shows "No test stands loaded" | `testStands` not bound or `getTestStands` failed | Check the input binding and run the query manually |
| All tests appear in the queue (not allocated to stands) | `tests` data has no `test_stand_id` values | Ensure `getSchedulerData` returns the allocation join correctly |
| Spinner never clears after save | `isSaving` property not bound | Add the `isSaving` binding from Step 6 |
| Error overlay appears on every save | `saveAllocations` always errors | Check the SQL query; inspect the error in Retool's query panel |
| `handleSave` says "testStandScheduler is not defined" | Component name mismatch | Rename the component on the page to match the variable in `handleSave.js` |
| Changes not persisted after refresh | `savedAt` not bound, so optimistic snapshot never fires | Add `savedAt → {{ saveAllocations.lastRunAt }}` binding in the component inspector |
