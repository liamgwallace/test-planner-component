# Test Stand Scheduler - Retool Custom Component

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

## Deploy

```bash
npm run build
npm run deploy
```

Follow prompts to deploy to your Retool instance.

## Component Properties

### Inputs (set from Retool)

| Property | Type | Description |
|----------|------|-------------|
| `tests` | Array | Test objects to schedule. Each needs: `id`, `name`, `duration`, `owner`, `priority`, `partStatus`, `partReadyDate` |
| `stands` | Array | Test stand objects. Each has: `id`, `name`, `tests[]` |
| `viewportWeeks` | Number | Weeks visible in viewport (2, 4, 8, 12, 24) |

### Events (trigger Retool workflows)

| Event | Description |
|-------|-------------|
| `scheduleChange` | Fires when any test is moved |
| `testScheduled` | Fires when a test is added to a stand |

### Reading State

Access `stands` to get the current schedule with tests assigned to each stand.

## Test Object Format

```javascript
{
  id: "T1",
  name: "Test Name",
  duration: 72,           // hours
  owner: "John Doe",
  priority: 85,           // 0-100, higher = more red
  partStatus: "Ready",    // "Ready", "Parts Not Assigned", or "In Progress"
  partReadyDate: "2026-02-18"  // YYYY-MM-DD or null
}
```

## Example Retool Setup

1. Add a SQL query to fetch tests:
```sql
SELECT id, name, duration, owner, priority, part_status, part_ready_date
FROM tests WHERE status = 'pending'
```

2. Connect to component:
   - Set `tests` = `{{ query1.data }}`

3. Handle schedule changes:
   - Add event handler for `scheduleChange`
   - Read `{{ testStandScheduler.stands }}` to get current assignments
   - Save to database as needed
