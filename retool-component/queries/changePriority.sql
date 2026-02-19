-- changePriority
-- Updates the priority of a single test.
-- Triggered by handleChangePriority.js after the onChangePriority component event.
--
-- Parameters resolved directly from component output state at trigger time:
--   {{ testStandScheduler.selectedTestId }}       - integer  ID of the test to update
--   {{ testStandScheduler.selectedTestPriority }} - integer  New priority value (0–100)
--
-- No additionalScope is used. Retool evaluates these template bindings when the
-- query runs, by which point the component state has fully propagated.

UPDATE tests
SET    priority = {{ testStandScheduler.selectedTestPriority }}::integer
WHERE  id       = {{ testStandScheduler.selectedTestId }}::integer;
