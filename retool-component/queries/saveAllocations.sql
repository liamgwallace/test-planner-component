-- saveAllocations
-- Saves all current test stand allocations from the scheduler component.
-- Run as two steps via a JS query (see saveAllocations JS query in Retool):
--   Step 1: deleteOldAllocations  — clears all existing allocations for tests the scheduler knows about
--   Step 2: insertNewAllocations  — inserts the full current allocation set
--
-- Inputs (bound from component model properties):
--   {{ allTestIds }}   — array of all test IDs managed by the scheduler
--   {{ allocations }}  — array of { test_id, test_stand_id, priority_order } objects

-- ── Step 1: deleteOldAllocations ──────────────────────────────────────────────
DELETE FROM test_stand_allocations
WHERE test_id = ANY({{ allTestIds }}::integer[]);

-- ── Step 2: insertNewAllocations ──────────────────────────────────────────────
-- Note: In Retool, use a JS query to loop allocations and call this for each row,
-- or use a bulk-insert approach with format() if your Retool version supports it.
INSERT INTO test_stand_allocations (test_id, test_stand_id, priority_order, allocated_at)
VALUES ({{ allocation.test_id }}, {{ allocation.test_stand_id }}, {{ allocation.priority_order }}, NOW())
ON CONFLICT DO NOTHING;

-- ── JS Query (saveAllocations) ────────────────────────────────────────────────
-- Paste this into a Retool JS query named "saveAllocations":
--
-- async function run() {
--   await deleteOldAllocations.trigger();
--   const allocs = scheduler.model.allocations;
--   for (const allocation of allocs) {
--     await insertNewAllocations.trigger({ additionalScope: { allocation } });
--   }
-- }
-- return run();
