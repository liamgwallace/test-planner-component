-- updateStartDate
-- Updates the test_started_date for a Running test.
-- Triggered by a query event handler wired to the onChangeStartDate component event.
--
-- Parameters resolved from component output state at trigger time:
--   {{ testStandScheduler.selectedTestId }}        - integer  ID of the test to update
--   {{ testStandScheduler.selectedTestStartDate }} - text     New start date (YYYY-MM-DD)
--
-- Only Running tests expose the Change Start Date menu option, so this query
-- should only ever fire for tests with status = 'Running'.

UPDATE tests
SET    test_started_date = {{ testStandScheduler.selectedTestStartDate }}::date
WHERE  id                = {{ testStandScheduler.selectedTestId }}::integer;
