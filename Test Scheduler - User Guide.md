# Test Stand Scheduler - Overview

## What It Does

The Test Stand Scheduler is a visual planning tool for allocating tests across physical test stands. It shows a timeline of when each test will run on each stand, and lets you drag-and-drop tests to rearrange priorities, move tests between stands, or pull tests off stands entirely.

---

## Layout

The screen is split into two sections:

- **Left sidebar ("Queue")** - Tests that are not currently assigned to any test stand
- **Right panel ("Timeline")** - A Gantt-style timeline showing each test stand as a row, with test blocks positioned across a date axis

---

## Queue Sidebar

- Shows all **unallocated tests** as cards
- Each card displays: priority number, part status, test name, owner, duration
- **Sort options** at the top: A-Z, Priority, or Status
- **Search/filter** box to find tests by name
- You can **drag a test from the queue onto a stand** in the timeline to allocate it
- You can also **drag a test from a stand back to the queue** to unallocate it

---

## Timeline Panel

- Each **test stand** is a row
- Tests appear as **horizontal bars** - their width represents duration
- A **"today" line** marks the current date
- **Running tests** (actively in progress) appear with a purple highlight and show their actual start date
- **Queued tests** are scheduled sequentially after any running tests, with changeover gaps between them
- **Non-working blocks** appear as hatched/shaded regions on the timeline (e.g. planned maintenance)
- Weekend columns are subtly shaded

### Zoom Levels

Buttons at the top-right let you switch the timeline view: **2, 4, 8, 12, or 24 weeks**

### Drag and Drop on the Timeline

- **Reorder tests within a stand** by dragging a bar to a new position - a blue insertion line shows where it will land
- **Move tests between stands** by dragging a bar from one row to another
- **Drag a bar to the queue** to unallocate it

---

## Test Cards & Bars - What's Displayed

Each test shows:

- **Priority** (P0-P100) - colour-coded from grey (low) through amber to red (high priority)
- **Part readiness status** - shown as a coloured left-edge stripe and status label
- **Test name**, owner, duration, and other configurable info

---

## Status Colours (Left Edge Stripe)

| Colour | Status | Meaning |
|--------|--------|---------|
| Purple | Running | Test is actively in progress on the stand |
| Green | Ready | All parts are ready to go |
| Amber | On Time | Parts are in progress but expected before the scheduled start |
| Red | Delayed | Parts won't be ready before the scheduled start date |
| Grey | Parts Not Assigned | No parts have been assigned to this test yet |

---

## Three-Dot Menu (Actions)

Every test card and timeline bar has a **"..." button** (top-right corner, more visible on hover). Clicking it opens a popover with:

1. **Test details** - name, priority, status, scheduled start/end dates, and tooltip info (notes, owner, parts info)
2. **Change Priority** - set a new priority value (0-100)
3. **Change Status** - pick from a list (e.g. Running, Created, Tested, Cancelled, or clear it)
4. **Change Start Date** - only available for Running tests, lets you adjust when a running test actually started
5. **Edit Test** - triggers the Retool "Edit Test" flow (opens a separate form/modal)

---

## Saving Changes

### Allocation Changes (drag-and-drop)

Two modes (configured in component settings):

- **Batch mode** (default) - A blue **"Save"** button appears in the toolbar when you have unsaved changes. Changes are only written to the database when you click Save.
- **Live mode** - Every drag-and-drop change is saved immediately

If a save fails, a **full-screen overlay** appears with **Retry** and **Discard** options.

### Save Planned Dates

A separate **"Save Planned Dates"** button writes the computed start dates for all scheduled tests back to the database. This is independent of allocation saves.

---

## Key Scheduling Rules

- **Tests run 24/7** once started
- **Changeovers** between tests only consume work hours (Mon-Fri, configurable start/end times)
- Weekends are skipped for changeover calculations
- Non-working blocks (e.g. maintenance windows) push test starts forward so they don't overlap
