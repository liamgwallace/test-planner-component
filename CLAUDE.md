# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a browser-based Test Stand Scheduler application for managing test allocations across multiple test stands. It's a single HTML file with embedded React/JSX that runs directly in the browser via Babel transpilation.

## Running the Application

Open `example-page-v4.html` directly in a browser. No build step or server required.

## Architecture

**Single-file React app**: All logic is in `example-page-v4.html` using React 18 loaded from CDN and Babel for in-browser JSX transpilation.

**Data source**: `data.js` exports a `testData` array of test objects with properties like `id`, `name`, `owner`, `priority`, `partStatus`, `assignedParts`, `latestPartDue`, and `plannedDate`.

**Key component**: `TestScheduler` manages:
- Drag-and-drop between a queue sidebar and 6 test stands (S1-S6)
- Timeline visualization with configurable view ranges (2W to 24W)
- Automatic scheduling with continuous test execution and 3-hour changeover periods during work hours (9:00-17:00 Mon-Fri)

**Scheduling logic**:
- `computeSchedule()` calculates test start/end times sequentially per stand
- `calculateChangeoverEnd()` handles work-hour-only changeover periods, skipping weekends
- Tests run continuously (24/7), but changesovers only happen during work hours

**Visual indicators**:
- Priority-based background colors (blue→white→red gradient for 0-100)
- Border styles indicate part status (Ready=green solid, Delayed=red solid, etc.)
