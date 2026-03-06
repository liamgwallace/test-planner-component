-- getTestStands
-- Returns active test stands. Bind to the component's "testStands" property.
-- Expected shape: [{id, name, changeover_hours}, ...]

SELECT
    id,
    name,
    changeover_hours
FROM test_stands
WHERE is_active = true
ORDER BY name;
