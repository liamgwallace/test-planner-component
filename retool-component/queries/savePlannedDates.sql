-- savePlannedDates
-- Saves scheduler-computed planned start dates back to the tests table.
--
-- ⚠️  IMPORTANT: Do NOT write to tests.planned_date — that field is used by
--     getTestReport to compute On Time / Delayed status against the original
--     committed date. Writing the scheduler's computed date there would always
--     show tests as "On Time".
--
-- Instead, write to tests.scheduler_planned_date (a separate column).
--
-- Migration (run once):
--   ALTER TABLE tests ADD COLUMN IF NOT EXISTS scheduler_planned_date DATE;
--
-- Inputs (bound from component model property "plannedDates"):
--   {{ plannedDate.test_id }}     — test ID
--   {{ plannedDate.planned_date }} — computed start date (YYYY-MM-DD string)

-- ── Step 1: updateSchedulerPlannedDate (run for each row in plannedDates) ─────
UPDATE tests
SET scheduler_planned_date = {{ plannedDate.planned_date }}::date
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
