currently on retool there is a page with a test readiness report that has a query to get the information for a test, the things to note is the test planned date is not relevant for this vies, the latest part due is usefull, the test status is, the part status is only relevant for if the part is ready, no parts are assigned or the third catagory is for assigned, but not ready (this would be used to calculate the status within the scheduler component of on time or delayed) . It would be good also to know  the assigned parts, but not the operations or vendor names

```getTestReport
WITH
  -- CTE 1: Get basic info for each test, including a comma-separated list of its parts' serial numbers.
  TestPartsInfo AS (
    SELECT
      t.id AS test_id,
      t.name AS test_name,
      t.status AS test_status,
      t.planned_date AS test_planned_date,
      t.priority AS test_priority,
      STRING_AGG(p.serial_number, ', ' ORDER BY p.serial_number) AS required_parts_sn_list
    FROM
      public.tests t
      LEFT JOIN public.test_part_assignments tpa ON t.id = tpa.test_id
      LEFT JOIN public.parts p ON tpa.part_id = p.id
    GROUP BY
      t.id,
      t.name,
      t.status,
      t.planned_date,
      t.priority
  ),
  
  -- CTE 2: Find the earliest planned start date from assigned work orders.
  WorkOrderPlanDate AS (
    SELECT
      twoa.test_id,
      MIN(wo.planned_date) AS work_order_planned_date
    FROM
      public.test_work_order_assignments twoa
      JOIN public.work_orders wo ON twoa.work_order_id = wo.id
    WHERE wo.planned_date IS NOT NULL
    GROUP BY
      twoa.test_id
  ),
  
  -- CTE 3: Calculate the latest part delivery date for any part associated with a test.
  LatestPartDelivery AS (
    SELECT
      tpa.test_id,
      CASE
        WHEN COUNT(*) FILTER (WHERE js.status IS DISTINCT FROM 'Complete') = 0 
          THEN MAX(js.completed_date)
        ELSE MAX(js.expected_return_date) FILTER (WHERE js.status IS DISTINCT FROM 'Complete')
      END AS latest_part_delivery_date,
      COUNT(*) FILTER (WHERE js.status IS DISTINCT FROM 'Complete') AS incomplete_steps_count
    FROM
      public.test_part_assignments tpa
      JOIN public.job_steps js ON tpa.part_id = js.part_id
    GROUP BY
      tpa.test_id
  ),
  
  -- CTE 4: Determine the "active" work order per part (has incomplete steps), 
  -- or fall back to highest work order ID if all are complete
  ActiveWorkOrderPerPart AS (
    SELECT DISTINCT ON (js.part_id)
      js.part_id,
      js.work_order_id
    FROM
      public.job_steps js
    GROUP BY
      js.part_id,
      js.work_order_id
    ORDER BY
      js.part_id,
      -- Prioritise work orders with incomplete steps, then by highest ID
      CASE WHEN COUNT(*) FILTER (WHERE js.status IS DISTINCT FROM 'Complete') > 0 THEN 0 ELSE 1 END,
      js.work_order_id DESC
  ),
  
  -- CTE 5: Current operation per part (status = 'In Progress')
  CurrentOperationPerPart AS (
    SELECT
      tpa.test_id,
      tpa.part_id,
      p.serial_number,
      COALESCE(op.name, 'none') AS current_operation,
      COALESCE(v.name, 'none') AS current_vendor_name
    FROM
      public.test_part_assignments tpa
      JOIN public.parts p ON tpa.part_id = p.id
      LEFT JOIN LATERAL (
        SELECT js.operation_id
        FROM public.job_steps js
        WHERE js.part_id = tpa.part_id
          AND js.status = 'In Progress'
        ORDER BY js.work_order_id DESC, js.step_sequence DESC
        LIMIT 1
      ) current_js ON true
      LEFT JOIN public.operations op ON current_js.operation_id = op.id
      LEFT JOIN public.vendors v ON op.vendor_id = v.id
  ),
  
  -- CTE 6: Last completed operation per part (highest step_sequence with 'Complete' status 
  -- within the active work order only)
  LastOperationPerPart AS (
    SELECT
      tpa.test_id,
      tpa.part_id,
      p.serial_number,
      COALESCE(op.name, 'none') AS last_operation,
      COALESCE(v.name, 'none') AS last_vendor_name
    FROM
      public.test_part_assignments tpa
      JOIN public.parts p ON tpa.part_id = p.id
      LEFT JOIN ActiveWorkOrderPerPart awop ON tpa.part_id = awop.part_id
      LEFT JOIN LATERAL (
        SELECT js.operation_id
        FROM public.job_steps js
        WHERE js.part_id = tpa.part_id
          AND js.work_order_id = awop.work_order_id
          AND js.status = 'Complete'
        ORDER BY js.step_sequence DESC
        LIMIT 1
      ) last_js ON true
      LEFT JOIN public.operations op ON last_js.operation_id = op.id
      LEFT JOIN public.vendors v ON op.vendor_id = v.id
  ),
  
  -- CTE 7: Aggregate current operations per test
  CurrentOperationAgg AS (
    SELECT
      test_id,
      STRING_AGG(current_operation, ', ' ORDER BY serial_number) AS current_operation,
      STRING_AGG(current_vendor_name, ', ' ORDER BY serial_number) AS current_vendor_name
    FROM CurrentOperationPerPart
    GROUP BY test_id
  ),
  
  -- CTE 8: Aggregate last operations per test
  LastOperationAgg AS (
    SELECT
      test_id,
      STRING_AGG(last_operation, ', ' ORDER BY serial_number) AS last_operation,
      STRING_AGG(last_vendor_name, ', ' ORDER BY serial_number) AS last_vendor_name
    FROM LastOperationPerPart
    GROUP BY test_id
  )

-- Final SELECT
SELECT
  tpi.test_id AS "test_id",
  tpi.test_name AS "Test Name",
  tpi.test_status AS "Test Status",
  tpi.test_priority AS "Test Priority",
  tpi.required_parts_sn_list AS "Required Parts (SN List)",
  tpi.test_planned_date AS "Test Planned Date",
  wopd.work_order_planned_date AS "Work Order Planned Date",
  lpd.latest_part_delivery_date AS "Latest Part Delivery Date",
  EXTRACT(
    DAY
    FROM
      lpd.latest_part_delivery_date - wopd.work_order_planned_date
  ) AS "Days Difference (Delivery - WO Planned)",
  CASE
    WHEN tpi.test_status = 'Tested' THEN 'Ready'
    WHEN lpd.incomplete_steps_count = 0 THEN 'Ready'
    WHEN tpi.required_parts_sn_list IS NULL THEN 'Parts Not Assigned'
    WHEN tpi.test_planned_date IS NULL THEN 'No Planned Date'
    WHEN lpd.latest_part_delivery_date IS NULL THEN 'Parts Missing in Job Steps'
    WHEN lpd.latest_part_delivery_date > tpi.test_planned_date THEN 'Delayed'
    ELSE 'On Time'
  END AS "Readiness Status",
  coa.current_operation AS "Current Operation",
  coa.current_vendor_name AS "Current Vendor Name",
  loa.last_operation AS "Last Operation",
  loa.last_vendor_name AS "Last Vendor Name"
FROM
  TestPartsInfo tpi
  LEFT JOIN WorkOrderPlanDate wopd ON tpi.test_id = wopd.test_id
  LEFT JOIN LatestPartDelivery lpd ON tpi.test_id = lpd.test_id
  LEFT JOIN CurrentOperationAgg coa ON tpi.test_id = coa.test_id
  LEFT JOIN LastOperationAgg loa ON tpi.test_id = loa.test_id
ORDER BY
  tpi.test_planned_date ASC NULLS LAST,
  lpd.latest_part_delivery_date ASC NULLS LAST;
```

on a test plan page that this would be replacing it is a bit more simple. There is a table showing unallocated parts, and a list view that shows a table for each test stand. And the tests are ranked by their order for each test stand. The user can move a test to a stand (adding allocation), remove an allocation, and move the allocation to a new stand. They can also edit the priority order.

### unallocatedTestTable
#### Data Source "{{ formatDataAsArray(getAllTests.data).filter(row => row.test_stand_id === null) }}"
#### Query
```getAllTests
SELECT 
  t.id,
  t.name,
  t.owner,
  t.priority,
  t.planned_date,
  t.notes,
  t.status,
  t.duration,
  tsa.test_stand_id,
  tsa.priority_order,
  tsa.id as allocation_id,
  ts.name as stand_name
FROM tests t
LEFT JOIN test_stand_allocations tsa ON t.id = tsa.test_id
LEFT JOIN test_stands ts ON tsa.test_stand_id = ts.id
WHERE t.status IN ('Created') OR t.status IS NULL
ORDER BY 
  COALESCE(tsa.test_stand_id, 0),
  COALESCE(tsa.priority_order, 999);
  ```
#### Row Actions
##### Allocate stand
 - click action: moveStand.Modal.show()
 - click action: set variable "selectedTestID" to "{{ currentRow.id }}"
 - click action: set variable "moveModalSource" to "unallocated"
 
 
  
### ListView1
#### Data Source 
```getTestStands
SELECT 
  id,
  name
FROM test_stands
WHERE is_active = true
ORDER BY name;
```
#### primary key: "{{ item.name }}"


### AllocatedTestTables - table within the ListView1
#### Data Source: "{{ formatDataAsArray(getAllTests.data).filter(row => row.test_stand_id === item.id).sort((a, b) => a.priority_order - b.priority_order) }}"
#### Row Actions
##### Move Up
 - click action: set variable: "selectedTestID" to "{{ currentRow.id }}"
 - click action: set variable: "selectedAllocationId" to "{{ currentRow.allocation_id }}"
 - click action: set variable: "selectedPriorityOrder" to "{{ currentRow.priority_order }}"
 - click action: set variable: "selectedStandId" to "{{ currentRow.test_stand_id }}"
 - click action: control query trigger: "moveUp"
##### Move Down
 - click action: set variable: "selectedTestID" to "{{ currentRow.id }}"
 - click action: set variable: "selectedAllocationId" to "{{ currentRow.allocation_id }}"
 - click action: set variable: "selectedPriorityOrder" to "{{ currentRow.priority_order }}"
 - click action: set variable: "selectedStandId" to "{{ currentRow.test_stand_id }}"
 - click action: control query trigger: "moveDown"
##### Move To Stand
 - click action: set variable: "selectedTestID" to "{{ currentRow.id }}"
 - click action: set variable: "selectedAllocationId" to "{{ currentRow.allocation_id }}"
 - click action: set variable: "selectedPriorityOrder" to "{{ currentRow.priority_order }}"
 - click action: set variable: "selectedStandId" to "{{ currentRow.test_stand_id }}"
 - click action: set variable: "moveModalSource" to "allocated"
 - click action: control component: "moveStandModal" show
##### remove allocation
 - click action: set variable: "selectedTestID" to "{{ currentRow.id }}"
 - click action: set variable: "selectedAllocationId" to "{{ currentRow.allocation_id }}"
 - click action: set variable: "selectedPriorityOrder" to "{{ currentRow.priority_order }}"
 - click action: set variable: "selectedStandId" to "{{ currentRow.test_stand_id }}"
 - click action: control query trigger: "returnToUnallocated"
 
 
### moveStandModal
#### targetStandSelect
##### Source getTestStands
#### buttonOKMove
##### Source:
``` // JS Query: handleMoveConfirm
if (moveModalSource.value === 'unallocated') {
  return moveToStand.trigger();
} else {
  return moveBetweenStands.trigger();
}```
 
```moveToStand
const testId = selectedTestId.value;
const standId = targetStandSelect.value;

return insertAllocation.trigger({
  additionalScope: {
    selectedTestId: testId,
    selectedStandId: standId
  }
});
```

```moveBetweenStands
const testId = selectedTestId.value;
const standId = targetStandSelect.value;

return updateAllocation.trigger({
  additionalScope: {
    selectedTestId: testId,
    selectedStandId: standId
  }
});
```

```moveUp
const allocationId = selectedAllocationId.value;
const currentPriority = selectedPriorityOrder.value;
const standId = selectedStandId.value;

const allData = getAllTests.data.id.map((_, i) => {
  return Object.fromEntries(
    Object.keys(getAllTests.data).map(key => [key, getAllTests.data[key][i]])
  );
});

const standTests = allData
  .filter(row => row.test_stand_id === standId)
  .sort((a, b) => a.priority_order - b.priority_order);

const currentIndex = standTests.findIndex(row => row.allocation_id === allocationId);

if (currentIndex <= 0) return;

const itemAbove = standTests[currentIndex - 1];

return swapPriority.trigger({
  additionalScope: {
    allocationIdA: allocationId,
    priorityA: itemAbove.priority_order,
    allocationIdB: itemAbove.allocation_id,
    priorityB: currentPriority
  }
});

```


```moveDown

const allocationId = selectedAllocationId.value;
const currentPriority = selectedPriorityOrder.value;
const standId = selectedStandId.value;

const allData = getAllTests.data.id.map((_, i) => {
  return Object.fromEntries(
    Object.keys(getAllTests.data).map(key => [key, getAllTests.data[key][i]])
  );
});

const standTests = allData
  .filter(row => row.test_stand_id === standId)
  .sort((a, b) => a.priority_order - b.priority_order);

const currentIndex = standTests.findIndex(row => row.allocation_id === allocationId);

if (currentIndex >= standTests.length - 1) return;

const itemBelow = standTests[currentIndex + 1];

return swapPriority.trigger({
  additionalScope: {
    allocationIdA: allocationId,
    priorityA: itemBelow.priority_order,
    allocationIdB: itemBelow.allocation_id,
    priorityB: currentPriority
  }
});
```

```swapPriority
UPDATE test_stand_allocations
SET priority_order = CASE
  WHEN id = {{ allocationIdA }}::integer THEN {{ priorityA }}::integer
  WHEN id = {{ allocationIdB }}::integer THEN {{ priorityB }}::integer
END
WHERE id IN ({{ allocationIdA }}::integer, {{ allocationIdB }}::integer);
```

```updateAllocation
UPDATE test_stand_allocations
SET 
  test_stand_id = {{ selectedStandId }},
  priority_order = COALESCE((
    SELECT MAX(priority_order) + 1 
    FROM test_stand_allocations 
    WHERE test_stand_id = {{ selectedStandId }}
  ), 1),
  allocated_at = now()
WHERE test_id = {{ selectedTestId }};

```

```deleteAllocation
DELETE FROM test_stand_allocations
WHERE test_id = {{ selectedTestId }};
```

```returnToUnallocated
const testId = selectedTestId.value;

return deleteAllocation.trigger({
  additionalScope: {
    selectedTestId: testId
  }
});
```