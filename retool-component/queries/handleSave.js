// handleSave - Retool JS Query
// Wiring:
//   • onSave event   → trigger this query  (batch mode: Save button)
//   • onChange event → trigger this query  (live mode: fires on every drag)
//   • onRetry event  → trigger this query  (error overlay Retry button)
//
// Component property bindings (in the component inspector):
//   isSaving    → {{ saveAllocations.isFetching }}
//   hasSaveError → {{ !!saveAllocations.error }}
//   savedAt      → {{ saveAllocations.lastRunAt }}
//
// Flow:
//   1. Component sets pendingSave → shows spinner overlay immediately
//   2. Retool picks up saveState='saving' → useEffect clears pendingSave, keeps spinner
//   3. On success: savedAt changes → component updates optimistically (no re-fetch needed)
//   4. On failure: saveState→'error' → overlay switches to error banner (Retry / Discard)

const allocations = testStandScheduler.allocations; // array of {test_id, test_stand_id, priority_order}
const allTestIds = testStandScheduler.allTestIds;   // array of all test IDs managed by scheduler

// Compute which tests are no longer allocated — only these need a DELETE.
// Allocated tests are handled by ON CONFLICT DO UPDATE in saveAllocations.sql.
const allocatedTestIds = allocations.map(a => a.test_id);
const unallocatedIds = allTestIds.filter(id => !allocatedTestIds.includes(id));

return saveAllocations.trigger({
  additionalScope: {
    unallocatedIds: unallocatedIds,
    allocationsJson: JSON.stringify(allocations)
  }
}).then(() => {
  // Retool resolves the Promise even on query failure — check explicitly.
  if (saveAllocations.error) {
    return Promise.reject(saveAllocations.error);
  }
  // No getSchedulerData.trigger() — component updates optimistically via savedAt binding.
});
