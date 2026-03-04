# test-planner-component

Retool custom component — Test Stand Scheduler for managing test allocations across multiple test stands.

## Repository structure

| Path | Purpose |
|------|---------|
| `example-page-v4.html` | Standalone browser prototype (React via CDN, no build step) |
| `data.js` | Sample test data for the prototype |
| `retool-component/src/index.tsx` | All Retool component logic (single file) |
| `retool-component/preview.html` | Standalone preview without Retool |
| `retool-component/queries/` | Reference SQL/JS queries for the Retool page |
| `retool-existing-queries.md` | Existing Retool page queries and page structure |
| `retool-setup-guide.md` | Step-by-step Retool wiring guide |

## Development

```bash
cd retool-component
npm install
npm run dev      # hot-reload dev server — point Retool Custom Component URL here
npm run build    # compile to dist/
npm run deploy   # deploy to Retool instance
```

Open `example-page-v4.html` directly in a browser for the standalone prototype.
Open `retool-component/preview.html` to preview the Retool component without Retool.

## Component events & output state

| Event | Output state read | Description |
|-------|------------------|-------------|
| `onSave` | `allocations` | Drag-and-drop allocation order changed and saved |
| `onChange` | `allocations`, `hasUnsavedChanges` | Allocation order changed (unsaved) |
| `onRetry` | — | Retry after save error |
| `onChangePriority` | `selectedTestId`, `selectedTestPriority` | User changed priority via menu |
| `onChangeStatus` | `selectedTestId`, `selectedTestStatus` | User changed status via menu |
| `onChangeStartDate` | `selectedTestId`, `selectedTestStartDate` | User changed start date of a **Running** test via menu |
| `onEditTest` | `selectedTestId` | User clicked Edit Test in menu |
| `onSavePlannedDates` | `plannedDates` | Planned dates saved |

### Change Start Date

The **Change Start Date** option appears in the three-dot menu only for tests whose status is `Running`. It lets users correct the `test_started_date` column (e.g. if a test started at a different time than recorded).

**Wiring in Retool:**

1. Add an event handler on the `onChangeStartDate` event → run query `updateStartDate`.
2. After `updateStartDate` succeeds, trigger your data-refresh query (e.g. `getSchedulerData`).

**Query:** `retool-component/queries/updateStartDate.sql`

```sql
UPDATE tests
SET    test_started_date = {{ testStandScheduler.selectedTestStartDate }}::date
WHERE  id                = {{ testStandScheduler.selectedTestId }}::integer;
```

## Queries reference

| File | Triggered by |
|------|-------------|
| `getSchedulerData.sql` | Page load / refresh |
| `getTestStands.sql` | Page load / refresh |
| `saveAllocations.sql` | `onSave` event |
| `changePriority.sql` | `onChangePriority` event |
| `changeStatus.sql` | `onChangeStatus` event |
| `updateStartDate.sql` | `onChangeStartDate` event |
| `savePlannedDates.sql` | `onSavePlannedDates` event |
| `handleSave.js` | JS transformer used by save flow |
