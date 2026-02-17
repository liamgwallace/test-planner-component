-- getTestStands
-- Returns active test stands. Bind to the component's "testStands" property.

SELECT
    id,
    name
FROM test_stands
WHERE is_active = true
ORDER BY name;
