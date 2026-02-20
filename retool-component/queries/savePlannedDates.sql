-- savePlannedDates
-- Saves scheduler-computed planned start dates back to tests.planned_date.
-- The On Time / Delayed status in getTestReport compares part_ready_date against
-- planned_date, so writing the scheduler's computed start date here is correct —
-- it is the source of truth for when a test is expected to begin.
--
-- Inputs (bound from component model property "plannedDates"):
--   {{ plannedDate.test_id }}     — test ID
--   {{ plannedDate.planned_date }} — computed start date (YYYY-MM-DD string)

-- ── Step 1: updatePlannedDate (run for each row in plannedDates) ──────────────
UPDATE tests
SET planned_date = {{ plannedDate.planned_date }}::date
WHERE id = {{ plannedDate.test_id }}::integer;

-- ── JS Query (savePlannedDates) ───────────────────────────────────────────────
-- Paste this into a Retool JS query named "savePlannedDates":
--
-- async function run() {
--   const dates = scheduler.model.plannedDates;
--   for (const plannedDate of dates) {
--     await updateSchedulerPlannedDate.trigger({ additionalScope: { plannedDate } });
--   }
-- }
-- return run();
