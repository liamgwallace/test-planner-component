-- saveAllocations
-- Saves the current scheduler state with minimal DB churn.
-- Called from handleSave.js which builds the parameters.
--
-- Parameters:
--   {{ unallocatedIds }}   - integer[] of tests that have NO stand assigned (need DELETE)
--   {{ allocationsJson }}  - JSONB array of {test_id, test_stand_id, priority_order}
--
-- Step 1: Delete allocations only for tests that are no longer allocated to any stand.
-- Step 2: Upsert the allocated tests — ON CONFLICT DO UPDATE handles both new allocations
--         and tests that moved between stands without needing a delete+reinsert.

WITH delete_unallocated AS (
    DELETE FROM test_stand_allocations
    WHERE test_id = ANY({{ unallocatedIds }}::integer[])
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
) AS value
ON CONFLICT ON CONSTRAINT unique_test_allocation
    DO UPDATE SET
        test_stand_id  = EXCLUDED.test_stand_id,
        priority_order = EXCLUDED.priority_order,
        allocated_at   = EXCLUDED.allocated_at;
