// Test data for scheduler
// partStatus values:
//   - "Ready": Parts are in hand, no partReadyDate needed
//   - "Parts Not Assigned": No parts ordered yet, no partReadyDate
//   - Any other value (or empty): "In Progress" - use partReadyDate to determine if delayed
//
// partReadyDate: Date when parts are expected to arrive (only relevant for "In Progress" items)

const testData = [
  // No partStatus = In Progress, needs partReadyDate comparison
  {"id":"T2","name":"PSALM 1- 500um 60D inner - 30D outer","owner":"Josh","priority":89,"duration":72,"partReadyDate":"2026-02-18"},

  // Parts Not Assigned - no ready date, grey border
  {"id":"T3","name":"BM: PSALM 2- 500um 60D","owner":"Josh","notes":"Parts RE-ALLOCATED TO LEV: ALM - Concentrartion -1","partStatus":"Parts Not Assigned","duration":48,"partReadyDate":null},

  // In Progress with future ready date
  {"id":"T4","name":"PSALM 3 - 300um 60D","owner":"Josh","priority":95,"duration":200,"partReadyDate":"2026-02-25"},

  // Parts Not Assigned
  {"id":"T5","name":"BM: PSALM 4 - 300um 30D","owner":"Josh","priority":40,"partStatus":"Parts Not Assigned","duration":24,"partReadyDate":null},
  {"id":"T7","name":"CAT: PSALM - 7 300um 30D infill","owner":"Tony","priority":60,"notes":"Ran, but cell broke, might have to reorder a cell, double check","partStatus":"Parts Not Assigned","duration":72,"partReadyDate":null},
  {"id":"T8","name":"CAT: PSALM - 8 300um 30D","owner":"Josh","priority":55,"partStatus":"Parts Not Assigned","duration":48,"partReadyDate":null},
  {"id":"T9","name":"BM: PSALM - 9 300um 30D inner - 60D outer","owner":"Josh","priority":45,"notes":"cell block needed + flow frame, maybe run block of 2/3","partStatus":"Parts Not Assigned","duration":24,"partReadyDate":null},
  {"id":"T10","name":"CAT: PSALM - 10 300um 60D inner - 30D outer","owner":"Josh","priority":50,"partStatus":"Parts Not Assigned","duration":200,"partReadyDate":null},

  // Ready - parts in hand, no date comparison needed
  {"id":"T25","name":"BM: EB 1 (baseline)","owner":"Dom Hey Supercritical Solutions","priority":100,"notes":"Baseline BM for 3rd Gen EB design","partStatus":"Ready","assignedParts":"10000030 10000031","duration":72,"partReadyDate":null},

  // In Progress - will need date comparison when scheduled
  {"id":"T41","name":"BM: SC 5","owner":"Natalie Mcleod Supercritical Solutions","priority":85,"partStatus":"In Progress","assignedParts":"10000101","duration":48,"partReadyDate":"2026-03-01"},

  // Ready - parts in hand
  {"id":"T42","name":"BM: SC 6","owner":"Dom Hey Supercritical Solutions","priority":70,"partStatus":"Ready","assignedParts":"10000102","duration":24,"partReadyDate":null},

  // In Progress - future ready date
  {"id":"T43","name":"BM: SC 7","owner":"Natalie Mcleod Supercritical Solutions","priority":80,"partStatus":"In Progress","assignedParts":"10000103","duration":72,"partReadyDate":"2026-02-28"},

  // Ready
  {"id":"T44","name":"BM: SC 8","owner":"Dom Hey Supercritical Solutions","priority":65,"partStatus":"Ready","assignedParts":"10000104","duration":200,"partReadyDate":null},

  // In Progress - future ready date
  {"id":"T45","name":"BM: SC 9","owner":"Natalie Mcleod Supercritical Solutions","priority":90,"partStatus":"In Progress","assignedParts":"10000105","duration":48,"partReadyDate":"2026-03-05"},

  // Ready
  {"id":"T46","name":"BM: SC 10","owner":"Dom Hey Supercritical Solutions","priority":30,"partStatus":"Ready","assignedParts":"10000106","duration":24,"partReadyDate":null},

  // In Progress - should be on time if scheduled early
  {"id":"T47","name":"BM: SC 11","owner":"Natalie Mcleod Supercritical Solutions","priority":75,"partStatus":"In Progress","assignedParts":"10000107","duration":72,"partReadyDate":"2026-02-20"},

  // Ready
  {"id":"T48","name":"BM: SC 12","owner":"Dom Hey Supercritical Solutions","priority":20,"partStatus":"Ready","assignedParts":"10000108","duration":48,"partReadyDate":null},

  // In Progress - future ready date
  {"id":"T49","name":"BM: SC 13","owner":"Natalie Mcleod Supercritical Solutions","priority":92,"partStatus":"In Progress","assignedParts":"10000109","duration":200,"partReadyDate":"2026-03-10"},

  // Ready
  {"id":"T50","name":"BM: SC 14","owner":"Dom Hey Supercritical Solutions","priority":15,"partStatus":"Ready","assignedParts":"10000110","duration":24,"partReadyDate":null}
];
