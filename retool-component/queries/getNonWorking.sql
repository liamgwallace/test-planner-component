-- getNonWorking
-- Returns non-working periods for all test stands.
-- Bind to the component's "nonWorkingData" property.
-- Expected shape: [{id, test_stand_id, start_time, end_time, notes}, ...]
-- The component matches rows to stands by test_stand_id.

SELECT
    id,
    test_stand_id,
    start_time,
    end_time,
    notes
FROM test_stand_non_working
ORDER BY test_stand_id, start_time;
