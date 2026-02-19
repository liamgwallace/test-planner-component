# Retool Setup Guide — Test Stand Scheduler Component

Complete step-by-step instructions for wiring the scheduler custom component into a Retool page.

---

## Overview

You need six queries and one custom component. The data flow is:

```
getTestStands ──────────────────────────────────────┐
                                                     ▼
getSchedulerData ───────────────────────────► [Scheduler Component]
                                                     │
                         component events            │ allocations / selection output
                              │                      ▼
              ┌───────────────┼───────────────────────────────┐
              │               │                               │
        handleSave.js   changePriority.sql          changeStatus.sql
              │               │                               │
    saveAllocations.sql       └───────────┬───────────────────┘
              │                           │
    lastRunAt ─► savedAt      success handler → getSchedulerData
    (optimistic snapshot)
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

> **Note:** Replace `testStandScheduler` with whatever you name the custom component on the page. If you name it `scheduler1`, use `scheduler1.allocations` etc.

---

## Step 5 — Create `changePriority` (SQL query)

**Type:** PostgreSQL
**Name:** `changePriority`
**Trigger:** Only when manually triggered (do NOT run on page load)

Paste the full contents of `retool-component/queries/changePriority.sql`.

The SQL reads component output state directly via Retool template bindings — **no parameters to configure manually**:

```sql
UPDATE tests
SET    priority = {{ testStandScheduler.selectedTestPriority }}::integer
WHERE  id       = {{ testStandScheduler.selectedTestId }}::integer;
```

Retool evaluates `{{ testStandScheduler.selectedTestX }}` at the moment the query runs, which is after the component state has fully propagated.

On the query's **Event Handlers** tab, add a **Success** handler → trigger `getSchedulerData`. This is how the component refreshes after a priority change — no JS wrapper needed.

> Replace `testStandScheduler` if you named the component differently.

---

## Step 6 — Create `changeStatus` (SQL query)

**Type:** PostgreSQL
**Name:** `changeStatus`
**Trigger:** Only when manually triggered (do NOT run on page load)

Paste the full contents of `retool-component/queries/changeStatus.sql`.

The SQL reads component output state directly — **no parameters to configure manually**:

```sql
UPDATE tests
SET    status = NULLIF({{ testStandScheduler.selectedTestStatus }}, '')::test_status
WHERE  id     = {{ testStandScheduler.selectedTestId }}::integer;
```

Two things to note:
- `NULLIF(..., '')` — converts empty string to `NULL` so the "Clear Status (NULL)" option works correctly
- `::test_status` — casts the text value to the Postgres enum type; required if your `status` column is an enum

On the query's **Event Handlers** tab, add a **Success** handler → trigger `getSchedulerData`.

> Replace `testStandScheduler` if you named the component differently. If your `status` column is plain `text`, remove the `::test_status` cast.

---

## Step 7 — Add the Custom Component

1. In the Retool editor, drag a **Custom Component** onto the page.
2. Name it `testStandScheduler` (or your preferred name — keep it consistent with Steps 5–6).
3. Under **Component URL**, either:
   - Point to your deployed Retool instance URL, or
   - Use the dev server URL (`http://localhost:3000`) while developing.
4. The component will load and show an inspector panel on the right.

---

## Step 8 — Bind Component Inputs (Properties)

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

### Right-click context menu (optional)

| Property | Default | Description |
|---|---|---|
| **Status Options** (`statusOptions`) | `["NULL", "Running", "Created", "Tested", "Cancelled"]` | List of status strings shown in the Change Status submenu. `"NULL"` displays as "Clear Status (NULL)" and sets the DB value to `NULL`. |

---

## Step 9 — Wire Component Events

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

> All three events above point to the same `handleSave` query. `onChange` is only active in live mode, but wiring it unconditionally is harmless.

### `onChangePriority` event
Fired when the user confirms a new priority via the right-click context menu.

| Setting | Value |
|---|---|
| Event | `onChangePriority` |
| Action | Control query |
| Query | `changePriority` |
| Method | Trigger |

Before this event fires, the component sets:
- `testStandScheduler.selectedTestId` — ID of the test
- `testStandScheduler.selectedTestPriority` — new priority as a numeric string

The `getSchedulerData` refresh is handled by `changePriority`'s own Success event handler (configured in Step 5).

### `onChangeStatus` event
Fired when the user picks a status from the right-click context menu.

| Setting | Value |
|---|---|
| Event | `onChangeStatus` |
| Action | Control query |
| Query | `changeStatus` |
| Method | Trigger |

Before this event fires, the component sets:
- `testStandScheduler.selectedTestId` — ID of the test
- `testStandScheduler.selectedTestStatus` — new status string, or `""` when the user picked "NULL" (clear status)

The `getSchedulerData` refresh is handled by `changeStatus`'s own Success event handler (configured in Step 6).

### `onEditTest` event
Fired when the user clicks **Edit Test** in the right-click context menu. Wire this to whatever query or action opens your test editing UI.

| Setting | Value |
|---|---|
| Event | `onEditTest` |
| Action | (your choice — open a modal, navigate, etc.) |

Before this event fires, the component sets:
- `testStandScheduler.selectedTestId` — ID of the test to edit

---

## Step 10 — (Optional) Read Component Output State

The component exposes these output properties, readable as `testStandScheduler.<property>`:

### Allocation state

| Property | Type | Description |
|---|---|---|
| `allocations` | array | `[{test_id, test_stand_id, priority_order}]` — current scheduler state |
| `allTestIds` | array | All test IDs the component is managing |
| `hasUnsavedChanges` | boolean | `true` when there are uncommitted changes (batch mode) |

`handleSave.js` reads `allocations` and `allTestIds` automatically. You only need to reference these directly if you want to build additional UI (e.g. a counter badge showing unsaved changes).

### Right-click action state (set immediately before each event fires)

| Property | Type | Description |
|---|---|---|
| `selectedTestId` | string | ID of the test actioned via right-click |
| `selectedTestPriority` | string | New priority value (numeric string); available during `onChangePriority` |
| `selectedTestStatus` | string | New status; available during `onChangeStatus`. Empty string means NULL. |

The SQL queries read these directly via `{{ testStandScheduler.selectedTestX }}` template bindings. Reference them from your own queries or event handlers if needed.

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

component event: onSave          ──► handleSave (JS)
component event: onChange        ──► handleSave (JS)
component event: onRetry         ──► handleSave (JS)
component event: onChangePriority ──► changePriority (SQL)
component event: onChangeStatus  ──► changeStatus (SQL)
component event: onEditTest      ──► (your modal / navigation action)

handleSave (JS)
  ├─ reads: testStandScheduler.allocations
  ├─ reads: testStandScheduler.allTestIds
  └─► saveAllocations (SQL)   ← narrow DELETE + upsert
        └─ lastRunAt ──► savedAt ──► component optimistic snapshot

changePriority (SQL)            ← reads {{ testStandScheduler.selectedTestPriority }}
  └─ success handler ──► getSchedulerData.trigger()

changeStatus (SQL)              ← reads {{ testStandScheduler.selectedTestStatus }}
  └─ success handler ──► getSchedulerData.trigger()
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
| Spinner never clears after save | `isSaving` property not bound | Add the `isSaving` binding from Step 8 |
| Error overlay appears on every save | `saveAllocations` always errors | Check the SQL query; inspect the error in Retool's query panel |
| `handleSave` says "testStandScheduler is not defined" | Component name mismatch | Rename the component on the page to match the variable in `handleSave.js` |
| Changes not persisted after refresh | `savedAt` not bound, so optimistic snapshot never fires | Add `savedAt → {{ saveAllocations.lastRunAt }}` binding in the component inspector |
| Right-click menu does not appear | Event not wired, or right-clicking during drag / save lock | Check events tab; menu is suppressed during active drags and while the save overlay is shown |
| Priority update doesn't reflect in component | `getSchedulerData` success handler not added to `changePriority` | Add a Success event handler on the `changePriority` query that triggers `getSchedulerData` |
| Status not clearing when "NULL" selected | `changeStatus.sql` not using `NULLIF` | Verify the SQL uses `NULLIF(..., '')::test_status` — paste fresh from the queries file |
| `changeStatus` error: column is of type test_status but expression is of type text | Missing enum cast | Ensure the SQL has `::test_status` after `NULLIF(...)`. If your column is plain `text`, remove the cast. |
| `onEditTest` fires but nothing opens | No action wired to the event | Add an event handler in the Events tab (open modal, set variable, navigate, etc.) |
