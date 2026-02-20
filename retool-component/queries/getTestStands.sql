-- getTestStands
-- Returns active test stands. Bind to the component's "testStands" property.

SELECT
    id,
    name,
    changeover_hours,
    non_working
FROM test_stands
WHERE is_active = true
ORDER BY name;
