-- savePlannedDates
-- Updates the planned_date column on the tests table for all stand-scheduled tests.
-- Only tests currently on a stand (i.e. present in the plannedDates output) are updated.
-- Tests in the unallocated queue are left untouched.
--
-- Parameters:
--   {{ plannedDatesJson }}  - JSONB array of {test_id, planned_date} from the component's
--                             plannedDates output state.
--                             e.g. [{"test_id": 42, "planned_date": "2026-03-15"}, ...]
--
-- Retool setup:
--   1. Create a PostgreSQL query named "savePlannedDates".
--   2. Set plannedDatesJson parameter to:
--        {{ JSON.stringify(testScheduler.model.plannedDates) }}
--   3. On the component's "onSavePlannedDates" event, trigger this query.
--   4. Bind component inputs:
--        isSavingDates    = {{ savePlannedDates.isFetching }}
--        hasSaveDatesError = {{ !!savePlannedDates.error }}

UPDATE tests
SET planned_date = (value->>'planned_date')::date
FROM jsonb_array_elements(
    CASE
        WHEN {{ plannedDatesJson }}::text = '[]' THEN '[]'::jsonb
        ELSE {{ plannedDatesJson }}::jsonb
    END
) AS value
WHERE tests.id = (value->>'test_id')::integer;
