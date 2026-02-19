-- createIndexes.sql
-- Run once on the database to improve getSchedulerData query performance.
-- CONCURRENTLY avoids table locks on a live DB.
-- Safe to re-run; IF NOT EXISTS guards against duplicates.

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_tsa_test_id
    ON test_stand_allocations (test_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_tsa_stand_id
    ON test_stand_allocations (test_stand_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_tpa_test_id
    ON test_part_assignments (test_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_tpa_part_id
    ON test_part_assignments (part_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_job_steps_part_status
    ON job_steps (part_id, status);

-- Partial index covering the scheduler's WHERE clause
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_tests_active
    ON tests (id)
    WHERE status IN ('Created', 'Running');
