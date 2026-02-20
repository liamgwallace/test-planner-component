// Test data for scheduler
// part_status values:
//   - "Ready": Parts are in hand, no part_ready_date needed
//   - "Parts Not Assigned": No parts ordered yet, no part_ready_date
//   - Any other value (or empty): "In Progress" - use part_ready_date to determine if delayed
//
// part_ready_date: Date when parts are expected to arrive (only relevant for "In Progress" items)

const testData = [
  // Running tests - currently executing on test stands
  {"id":"R1","name":"PSALM Running - 500um 60D","owner":"Josh","priority":80,"duration":120,"status":"Running","test_started_date":"2026-02-15","part_status":"Ready","assigned_parts":"10000030","test_stand_id":"S1","priority_order":1,"allocation_id":101},
  {"id":"R2","name":"BM: Running SC Baseline","owner":"Dom Hey Supercritical Solutions","priority":55,"duration":200,"status":"Running","test_started_date":"2026-02-13","part_status":"In Progress","part_ready_date":"2026-02-20","assigned_parts":"10000101","test_stand_id":"S2","priority_order":1,"allocation_id":102},

  // No part_status = In Progress, needs part_ready_date comparison
  {"id":"T2","name":"PSALM 1- 500um 60D inner - 30D outer","owner":"Josh","priority":89,"duration":72,"part_ready_date":"2026-02-18","status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // Parts Not Assigned - no ready date, grey border
  {"id":"T3","name":"BM: PSALM 2- 500um 60D","owner":"Josh","notes":"Parts RE-ALLOCATED TO LEV: ALM - Concentrartion -1","part_status":"Parts Not Assigned","duration":48,"part_ready_date":null,"status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // In Progress with future ready date
  {"id":"T4","name":"PSALM 3 - 300um 60D","owner":"Josh","priority":95,"duration":200,"part_ready_date":"2026-02-25","status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // Parts Not Assigned
  {"id":"T5","name":"BM: PSALM 4 - 300um 30D","owner":"Josh","priority":40,"part_status":"Parts Not Assigned","duration":24,"part_ready_date":null,"status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},
  {"id":"T7","name":"CAT: PSALM - 7 300um 30D infill","owner":"Tony","priority":60,"notes":"Ran, but cell broke, might have to reorder a cell, double check","part_status":"Parts Not Assigned","duration":72,"part_ready_date":null,"status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},
  {"id":"T8","name":"CAT: PSALM - 8 300um 30D","owner":"Josh","priority":55,"part_status":"Parts Not Assigned","duration":48,"part_ready_date":null,"status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},
  {"id":"T9","name":"BM: PSALM - 9 300um 30D inner - 60D outer","owner":"Josh","priority":45,"notes":"cell block needed + flow frame, maybe run block of 2/3","part_status":"Parts Not Assigned","duration":24,"part_ready_date":null,"status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},
  {"id":"T10","name":"CAT: PSALM - 10 300um 60D inner - 30D outer","owner":"Josh","priority":50,"part_status":"Parts Not Assigned","duration":200,"part_ready_date":null,"status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // Ready - parts in hand, no date comparison needed
  {"id":"T25","name":"BM: EB 1 (baseline)","owner":"Dom Hey Supercritical Solutions","priority":100,"notes":"Baseline BM for 3rd Gen EB design","part_status":"Ready","assigned_parts":"10000030 10000031","duration":72,"part_ready_date":null,"status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // In Progress - will need date comparison when scheduled
  {"id":"T41","name":"BM: SC 5","owner":"Natalie Mcleod Supercritical Solutions","priority":85,"part_status":"In Progress","assigned_parts":"10000101","duration":48,"part_ready_date":"2026-03-01","status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // Ready - parts in hand
  {"id":"T42","name":"BM: SC 6","owner":"Dom Hey Supercritical Solutions","priority":70,"part_status":"Ready","assigned_parts":"10000102","duration":24,"part_ready_date":null,"status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // In Progress - future ready date
  {"id":"T43","name":"BM: SC 7","owner":"Natalie Mcleod Supercritical Solutions","priority":80,"part_status":"In Progress","assigned_parts":"10000103","duration":72,"part_ready_date":"2026-02-28","status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // Ready
  {"id":"T44","name":"BM: SC 8","owner":"Dom Hey Supercritical Solutions","priority":65,"part_status":"Ready","assigned_parts":"10000104","duration":200,"part_ready_date":null,"status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // In Progress - future ready date
  {"id":"T45","name":"BM: SC 9","owner":"Natalie Mcleod Supercritical Solutions","priority":90,"part_status":"In Progress","assigned_parts":"10000105","duration":48,"part_ready_date":"2026-03-05","status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // Ready
  {"id":"T46","name":"BM: SC 10","owner":"Dom Hey Supercritical Solutions","priority":30,"part_status":"Ready","assigned_parts":"10000106","duration":24,"part_ready_date":null,"status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // In Progress - should be on time if scheduled early
  {"id":"T47","name":"BM: SC 11","owner":"Natalie Mcleod Supercritical Solutions","priority":75,"part_status":"In Progress","assigned_parts":"10000107","duration":72,"part_ready_date":"2026-02-20","status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // Ready
  {"id":"T48","name":"BM: SC 12","owner":"Dom Hey Supercritical Solutions","priority":20,"part_status":"Ready","assigned_parts":"10000108","duration":48,"part_ready_date":null,"status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // In Progress - future ready date
  {"id":"T49","name":"BM: SC 13","owner":"Natalie Mcleod Supercritical Solutions","priority":92,"part_status":"In Progress","assigned_parts":"10000109","duration":200,"part_ready_date":"2026-03-10","status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null},

  // Ready
  {"id":"T50","name":"BM: SC 14","owner":"Dom Hey Supercritical Solutions","priority":15,"part_status":"Ready","assigned_parts":"10000110","duration":24,"part_ready_date":null,"status":null,"test_stand_id":null,"priority_order":null,"allocation_id":null}
];
