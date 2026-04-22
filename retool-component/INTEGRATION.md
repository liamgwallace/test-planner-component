# Test Stand Scheduler — Retool Integration Guide

Step-by-step instructions for wiring the custom component into a Retool app.

---

## Prerequisites

- The custom component library is deployed (run `npm run deploy` from `retool-component/`)
- A Postgres resource is connected in Retool pointing to your database
- The following tables exist: `tests`, `test_stands`, `test_stand_allocations`, `test_part_assignments`, `test_stand_non_working`

---

## Step 1 — Create the queries

Create the following queries in your Retool app. SQL is in the `queries/` folder.

### `getSchedulerData` (SQL)

Fetches all active tests with allocation, part, and status data.

- **Trigger:** On page load (auto-run)
- **Resource:** Your Postgres connection
- **SQL:** Copy from `queries/getSchedulerData.sql`

### `getTestStands` (SQL)

Fetches active test stands.

- **Trigger:** On page load (auto-run)
- **Resource:** Your Postgres connection
- **SQL:**
  ```sql
  SELECT id, name, changeover_hours
  FROM test_stands
  WHERE is_active = true
  ORDER BY name;
  ```

### `getNonWorking` (SQL)

Fetches non-working periods for all stands.

- **Trigger:** On page load (auto-run)
- **Resource:** Your Postgres connection
- **SQL:**
  ```sql
  SELECT id, test_stand_id, start_time, end_time, notes
  FROM test_stand_non_working
  ORDER BY test_stand_id, start_time;
  ```

### `saveAllocations` (SQL)

Saves allocation changes using delete + upsert pattern.

- **Trigger:** Manually (called by `handleSave`)
- **Resource:** Your Postgres connection
- **SQL:** Copy from `queries/saveAllocations.sql`

### `handleSave` (JavaScript)

Orchestrates the save flow — reads scheduler output, calls `saveAllocations`.

- **Trigger:** Manually (wired to component events)
- **Code:** Copy from `queries/handleSave.js`

---

## Step 2 — Add the component to the canvas

1. Open the app editor
2. Click **+ Add component** → scroll to **Custom Components**
3. Drag **TestScheduler** (or whatever the library was named) onto the canvas
4. Resize to fill the desired area (recommended: full width, ~600px tall)

---

## Step 3 — Bind Inspector properties

Open the component Inspector and set the following:

### Data inputs

| Property | Value |
|----------|-------|
| `tests` | `{{ getSchedulerData.data }}` |
| `testStands` | `{{ getTestStands.data }}` |
| `nonWorkingData` | `{{ getNonWorking.data }}` |

### Save state feedback (from `saveAllocations`)

| Property | Value |
|----------|-------|
| `isSaving` | `{{ saveAllocations.isFetching }}` |
| `hasSaveError` | `{{ !!saveAllocations.error }}` |
| `savedAt` | `{{ saveAllocations.lastRunAt }}` |

### Configuration (adjust as needed)

| Property | Recommended Value |
|----------|-------------------|
| `saveMode` | `batch` |
| `changeoverHours` | `3` |
| `workStart` | `9` |
| `workEnd` | `17` |
| `defaultViewWeeks` | `4` |
| `appTheme` | `{{ theme }}` |

---

## Step 4 — Wire events

In the component Inspector → **Interaction** tab, add the following event handlers:

| Event | Action |
|-------|--------|
| `onSave` | Trigger query → `handleSave` |
| `onChange` | Trigger query → `handleSave` *(live mode only — skip for batch mode)* |
| `onRetry` | Trigger query → `handleSave` |

---

## Step 5 — (Optional) Wire to other components

The component exposes these output properties that other components can read:

| Property | Example usage |
|----------|---------------|
| `{{ testStandScheduler.allocations }}` | Pass to a table to show current allocations |
| `{{ testStandScheduler.hasUnsavedChanges }}` | Show/hide a warning banner |
| `{{ testStandScheduler.allTestIds }}` | Used internally by `handleSave` |

Replace `testStandScheduler` with the actual component ID shown in the editor.

---

## Step 6 — Verify

1. Run `getSchedulerData`, `getTestStands`, and `getNonWorking` — confirm they return data
2. The scheduler should render stands in the timeline and tests in the queue sidebar
3. Drag a test onto a stand — the timeline bar should appear and `hasUnsavedChanges` → `true`
4. Click Save — `handleSave` runs, allocations persist, unsaved indicator clears

---

## Display template reference

All text templates support `{fieldName}` placeholders resolved from test data fields. Dates are auto-formatted to `DD Mon`.

| Property | Default |
|----------|---------|
| `cardMainText` | `{name}` |
| `cardSubText` | `Parts: {part_ready_date}` |
| `cardInfoRow` | `{owner} · {duration}h · P{priority}` |
| `tooltipTemplate` | `Notes: {notes}\nOwner: {owner}\nPriority: {priority}\nPart Status: {part_status}\nParts Due: {part_ready_date}\nTest Started: {test_started_date}` |
| `assignedPartsTemplate` | `{assigned_parts}` |
| `assignedPartsLinkBaseUrl` | `https://supercriticalsolutions.retool.com/app/marvin/part-multi-wo#serialNo=` |

---

## Database schema reference

```sql
-- test_stands
id, name, changeover_hours, is_active

-- test_stand_non_working
id, test_stand_id, start_time (timestamptz), end_time (timestamptz), notes

-- test_stand_allocations
id, test_id, test_stand_id, priority_order, allocated_at

-- tests (relevant columns)
id, name, owner, priority, duration, notes, status,
test_started_date (DATE — add with ALTER TABLE if not present)
```
