# Test Stand Scheduler - Retool Custom Component

A drag-and-drop timeline scheduler for managing test allocations across multiple test stands. Features a queue sidebar with filtering/sorting, Gantt-style timeline visualization, and configurable display templates.

## Setup

```bash
cd retool-component
npm install
```

## Development

```bash
npm run dev
```

This starts a dev server. In Retool:
1. Add a Custom Component to your app
2. Set the component URL to the dev server URL (shown in terminal)
3. Changes auto-reload as you edit

For standalone testing without Retool, open `preview.html` in a browser.

## Deploy

```bash
npm run build
npm run deploy
```

Follow prompts to deploy to your Retool instance.

## Component Properties

### Data Inputs

| Property | Type | Description |
|----------|------|-------------|
| `tests` | Array | Test objects from `getSchedulerData` query |
| `testStands` | Array | Test stand objects `{id, name}` from `getTestStands` query |

### Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `saveMode` | `"batch"` \| `"live"` | `"batch"` | batch = manual save button, live = emit on every change |
| `changeoverHours` | Number | `3` | Hours for changeover between tests (work hours only) |
| `workStart` | Number | `9` | Work day start hour (0-23) |
| `workEnd` | Number | `17` | Work day end hour (0-23) |
| `defaultViewWeeks` | Number | `4` | Initial timeline view (2, 4, 8, 12, or 24 weeks) |
| `statusFilter` | Array | `["Created"]` | Test statuses to include (used by SQL query parameter) |

### Display Templates

Templates use `{fieldName}` placeholders that resolve to test data fields. Any field from the test object can be referenced. Dates are auto-formatted to `DD Mon`.

| Property | Default | Description |
|----------|---------|-------------|
| `cardMainText` | `"{name}"` | Card/bar title text |
| `cardSubText` | `"Parts: {part_ready_date}"` | Subtitle (hidden when all fields empty) |
| `cardInfoRow` | `"{owner} · {duration}h · P{priority}"` | Info row on cards and bars |
| `tooltipTemplate` | See below | Hover tooltip content (`\n` for newlines) |

Default tooltip template:
```
Notes: {notes}
Owner: {owner}
Priority: {priority}
Part Status: {part_status}
Parts Due: {part_ready_date}
Assigned Parts: {assigned_parts}
```

### Output State

| Property | Type | Description |
|----------|------|-------------|
| `allocations` | Array | Current allocations: `[{test_id, test_stand_id, priority_order}]` |
| `allTestIds` | Array | All test IDs managed by the scheduler |
| `hasUnsavedChanges` | Boolean | Whether there are unsaved allocation changes |

### Events

| Event | Description |
|-------|-------------|
| `onSave` | Fires when user clicks Save (batch mode) or on every change (live mode) |
| `onChange` | Fires on any allocation change |

## Features

- **Drag & drop** - Drag tests from queue to stands, between stands, or reorder within a stand
- **Timeline visualization** - Gantt-style bars with configurable week ranges (2W-24W)
- **Smart scheduling** - Tests run 24/7, changeovers during work hours only, weekends skipped for changeovers
- **Queue sidebar** - Filter by name, sort by A-Z or priority
- **Status indicators** - Color-coded left cap bar (Ready=green, On Time=amber, Delayed=red, etc.)
- **Priority display** - Color-coded priority labels (grey/orange/red based on value)
- **Hover effects** - Lift animation with status-colored border on hover
- **Smart tooltips** - Auto-flip below when near viewport top
- **Batch or live save** - Choose manual save with unsaved-changes indicator, or auto-save on every change

## SQL Queries

Example queries are in the `queries/` directory:

- `getSchedulerData.sql` - Fetches tests with part status and allocation data
- `getTestStands.sql` - Fetches active test stands
- `saveAllocations.sql` - Saves allocation changes (delete + re-insert pattern)
- `handleSave.js` - JavaScript query to orchestrate the save flow

## Test Object Fields

The component expects test objects with these fields (from `getSchedulerData`):

```
id, name, duration, owner, priority, notes, status,
test_stand_id, priority_order, allocation_id,
assigned_parts, part_ready_date, part_status
```

Additional fields can be referenced in display templates.
