-- saveAllocations
-- Atomic delete-and-reinsert of all allocations managed by the scheduler.
-- Called from handleSave.js which builds the parameters.
--
-- Parameters:
--   {{ allTestIds }}      - integer[] of ALL test IDs the scheduler knows about
--   {{ allocationsJson }} - JSONB array of {test_id, test_stand_id, priority_order}
--
-- This deletes all existing allocations for the managed tests, then inserts
-- only the ones that are currently assigned to a stand.

WITH deleted AS (
    DELETE FROM test_stand_allocations
    WHERE test_id = ANY({{ allTestIds }}::integer[])
    RETURNING id
)
INSERT INTO test_stand_allocations (test_id, test_stand_id, priority_order, allocated_at)
SELECT
    (value->>'test_id')::integer,
    (value->>'test_stand_id')::integer,
    (value->>'priority_order')::integer,
    now()
FROM jsonb_array_elements(
    CASE
        WHEN {{ allocationsJson }}::text = '[]' THEN '[]'::jsonb
        ELSE {{ allocationsJson }}::jsonb
    END
) AS value;
