// handleSave - Retool JS Query
// Wiring: Set this as the event handler for the component's "onSave" event.
//
// This reads the component's output state and triggers the saveAllocations SQL query,
// then refreshes the scheduler data.
//
// Setup in Retool:
// 1. Create this as a "JavaScript" query named "handleSave"
// 2. On the scheduler component, set onSave event -> trigger handleSave
// 3. Create the saveAllocations SQL query using saveAllocations.sql

const allocations = testStandScheduler.allocations; // array of {test_id, test_stand_id, priority_order}
const allTestIds = testStandScheduler.allTestIds;   // array of all test IDs managed by scheduler

return saveAllocations.trigger({
  additionalScope: {
    allTestIds: allTestIds,
    allocationsJson: JSON.stringify(allocations)
  }
}).then(() => {
  // Refresh the scheduler data after saving
  return getSchedulerData.trigger();
});
