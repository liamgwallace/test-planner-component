-- changeStatus
-- Updates the status of a single test.
-- Triggered by handleChangeStatus.js after the onChangeStatus component event.
--
-- Parameters resolved directly from component output state at trigger time:
--   {{ testStandScheduler.selectedTestId }}     - integer  ID of the test to update
--   {{ testStandScheduler.selectedTestStatus }} - text     New status string.
--                                                          Empty string ('') clears status.
--
-- No additionalScope is used. Retool evaluates these template bindings when the
-- query runs, by which point the component state has fully propagated.
--
-- NULLIF converts '' → NULL so selecting "NULL" in the context menu correctly
-- clears the DB column rather than writing an empty string.
-- ::test_status casts the text value to the Postgres enum type used by this column.

UPDATE tests
SET    status = NULLIF({{ testStandScheduler.selectedTestStatus }}, '')::test_status
WHERE  id     = {{ testStandScheduler.selectedTestId }}::integer;
