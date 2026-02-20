-- getSchedulerData
-- Returns all tests with their allocation info and part readiness status.
-- Bind to the component's "tests" property in Retool.

WITH LatestPartDelivery AS (
    SELECT
        tpa.test_id,
        CASE
            WHEN COUNT(*) FILTER (WHERE js.status IS DISTINCT FROM 'Complete') = 0
                THEN MAX(js.completed_date)
            ELSE MAX(js.expected_return_date) FILTER (WHERE js.status IS DISTINCT FROM 'Complete')
        END AS latest_part_delivery_date,
        COUNT(*) FILTER (WHERE js.status IS DISTINCT FROM 'Complete') AS incomplete_steps_count
    FROM public.test_part_assignments tpa
    JOIN public.job_steps js ON tpa.part_id = js.part_id
    GROUP BY tpa.test_id
),
TestParts AS (
    SELECT
        tpa.test_id,
        STRING_AGG(p.serial_number, ', ' ORDER BY p.serial_number) AS assigned_parts
    FROM public.test_part_assignments tpa
    JOIN public.parts p ON tpa.part_id = p.id
    GROUP BY tpa.test_id
)
SELECT
    t.id,
    t.name,
    t.owner,
    t.priority,
    t.duration,
    t.notes,
    t.status,
    tsa.test_stand_id,
    tsa.priority_order,
    tsa.id AS allocation_id,
    tp.assigned_parts,
    lpd.latest_part_delivery_date AS part_ready_date,
    CASE
        WHEN tp.assigned_parts IS NULL THEN 'Parts Not Assigned'
        WHEN lpd.latest_part_delivery_date IS NULL THEN 'In Progress'  -- parts assigned but no job steps exist
        WHEN lpd.incomplete_steps_count = 0 THEN 'Ready'
        ELSE 'In Progress'
    END AS part_status,
    -- test_started_date: uses t.test_started_date if the column exists in the tests table.
    -- Migration: ALTER TABLE tests ADD COLUMN IF NOT EXISTS test_started_date DATE;
    -- Until migrated, Running tests fall back to CURRENT_DATE so bars render at today.
    COALESCE(t.test_started_date::text, CASE WHEN t.status = 'Running' THEN CURRENT_DATE::text ELSE NULL END) AS test_started_date
FROM tests t
LEFT JOIN test_stand_allocations tsa ON t.id = tsa.test_id
LEFT JOIN LatestPartDelivery lpd ON t.id = lpd.test_id
LEFT JOIN TestParts tp ON t.id = tp.test_id
WHERE t.status IN ('Created', 'Running')
   OR t.status IS NULL
ORDER BY
    COALESCE(tsa.test_stand_id, 0),
    COALESCE(tsa.priority_order, 999);
