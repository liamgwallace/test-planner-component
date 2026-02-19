var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// react-global:react
var require_react = __commonJS({
  "react-global:react"(exports, module) {
    module.exports = window.ccc_support_React;
  }
});

// src/index.tsx
var import_react = __toESM(require_react());

// tryretool-custom-component-collections-global:@tryretool/custom-component-support
var { Retool } = window.ccc_support_RetoolCustomComponenCollections;

// react-jsx-runtime-global:react/jsx-runtime
var { Fragment, jsxs, jsx, default: default2 } = window.ccc_support_ReactJSXRuntime;

// src/index.tsx
var formatFieldValue = (val) => {
  if (val === null || val === void 0 || val === "" || val === "nan")
    return "";
  const str = String(val);
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    }
  }
  return str;
};
var resolveTemplate = (template, data) => {
  if (!template)
    return "";
  const str = typeof template === "string" ? template : String(template);
  return str.replace(/\{(\w+)\}/g, (_, field) => formatFieldValue(data[field]));
};
var isTemplateEmpty = (template, data) => {
  const str = typeof template === "string" ? template : String(template || "");
  const resolved = resolveTemplate(str, data);
  const staticOnly = str.replace(/\{(\w+)\}/g, "");
  return resolved.trim() === staticOnly.trim() || resolved.trim() === "";
};
var MS_PER_HOUR = 36e5;
var parseLocalDate = (dateStr) => {
  if (!dateStr)
    return null;
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3)
    return null;
  return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
};
var toMidnight = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};
var isWorkDay = (d) => d.getDay() !== 0 && d.getDay() !== 6;
var getNextWorkdayStart = (date, workStart) => {
  const d = new Date(date);
  d.setHours(workStart, 0, 0, 0);
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  return d;
};
var calculateChangeoverEnd = (prevTestEnd, changeoverHours, workStart, workEnd) => {
  let changeoverStart = new Date(prevTestEnd);
  if (!isWorkDay(changeoverStart) || changeoverStart.getHours() >= workEnd) {
    changeoverStart = getNextWorkdayStart(new Date(changeoverStart.getTime() + MS_PER_HOUR * 12), workStart);
  } else if (changeoverStart.getHours() < workStart) {
    changeoverStart.setHours(workStart, 0, 0, 0);
  }
  let remaining = changeoverHours;
  let end = new Date(changeoverStart);
  while (remaining > 0) {
    if (!isWorkDay(end)) {
      end = getNextWorkdayStart(new Date(end.getTime() + MS_PER_HOUR * 12), workStart);
      continue;
    }
    const available = workEnd - end.getHours();
    const apply = Math.min(remaining, available);
    end.setTime(end.getTime() + apply * MS_PER_HOUR);
    remaining -= apply;
    if (remaining > 0) {
      end = getNextWorkdayStart(new Date(end.getTime() + MS_PER_HOUR * 12), workStart);
    }
  }
  return end;
};
var generateDays = (start, numDays) => {
  const days = [];
  let cur = new Date(start);
  for (let i = 0; i < numDays; i++) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
};
var generateWeeks = (start, numDays) => {
  const result = [];
  let cur = new Date(start);
  while (cur.getDay() !== 1)
    cur.setDate(cur.getDate() - 1);
  const endDate = new Date(start);
  endDate.setDate(endDate.getDate() + numDays);
  while (cur < endDate) {
    result.push(new Date(cur));
    cur.setDate(cur.getDate() + 7);
  }
  return result;
};
var hoursBetween = (a, b) => (b.getTime() - a.getTime()) / MS_PER_HOUR;
var formatWeek = (d) => `W/C ${d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}`;
var normalizePartStatus = (rawStatus) => {
  if (!rawStatus || rawStatus === "nan")
    return "In Progress";
  const lower = rawStatus.toLowerCase().trim();
  if (lower === "ready")
    return "Ready";
  if (lower === "parts not assigned")
    return "Parts Not Assigned";
  return "In Progress";
};
var getCalculatedStatus = (test, testStartDate = null) => {
  const baseStatus = normalizePartStatus(test.part_status);
  if (baseStatus === "Ready")
    return "Ready";
  if (baseStatus === "Parts Not Assigned")
    return "Parts Not Assigned";
  if (testStartDate && test.part_ready_date) {
    const readyDate = parseLocalDate(test.part_ready_date);
    const startDate = toMidnight(testStartDate);
    if (readyDate && startDate) {
      return readyDate.getTime() > startDate.getTime() ? "Delayed" : "On Time";
    }
  }
  return "In Progress";
};
var isRunningTest = (test) => test.status === "Running";
var statusCapColors = {
  "Running": "#9333EA",
  "Ready": "#22C55E",
  "On Time": "#E5A00D",
  "Delayed": "#EF4444",
  "Parts Not Assigned": "#9CA3AF",
  "In Progress": "#D1D5DB"
};
var statusTextColors = {
  "Running": "#7E22CE",
  "Ready": "#16A34A",
  "On Time": "#B45309",
  "Delayed": "#DC2626",
  "Parts Not Assigned": "#6B7280",
  "In Progress": "#9CA3AF"
};
var getCapColor = (status) => statusCapColors[status] || statusCapColors["In Progress"];
var getStatusTextColor = (status) => statusTextColors[status] || statusTextColors["In Progress"];
var getDisplayStatus = (test, testStartDate = null) => {
  if (isRunningTest(test))
    return "Running";
  return getCalculatedStatus(test, testStartDate);
};
var getPriorityTextColor = (priority) => {
  const value = typeof priority === "number" ? priority : 50;
  const clamped = Math.max(0, Math.min(100, value));
  if (clamped <= 30)
    return "#6B7280";
  if (clamped <= 60)
    return "#F59E0B";
  if (clamped <= 80)
    return "#EA580C";
  return "#DC2626";
};
var styles = {
  container: { display: "flex", height: "100%", background: "#F9FAFB", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" },
  sidebar: { width: 320, minWidth: 320, background: "#FFFFFF", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column" },
  mono: { fontFamily: "'JetBrains Mono', monospace" }
};
var InsertLine = () => /* @__PURE__ */ jsxs("div", { style: {
  position: "absolute",
  top: 2,
  bottom: 2,
  width: 3,
  background: "#3B82F6",
  borderRadius: 2,
  zIndex: 30,
  boxShadow: "0 0 12px #3B82F6, 0 0 4px #3B82F6",
  pointerEvents: "none"
}, children: [
  /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: -4, left: -4, width: 11, height: 11, borderRadius: "50%", background: "#3B82F6" } }),
  /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: -4, left: -4, width: 11, height: 11, borderRadius: "50%", background: "#3B82F6" } })
] });
var OutlineKey = () => /* @__PURE__ */ jsxs("div", { style: { padding: "10px 16px", borderTop: "1px solid #E5E7EB", background: "#F9FAFB" }, children: [
  /* @__PURE__ */ jsx("h3", { style: { ...styles.mono, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4B5563", marginBottom: 6 }, children: "Status Key" }),
  /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px 0" }, children: ["Running", "Ready", "On Time", "Delayed", "Parts Not Assigned"].map((key) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, width: "50%", minWidth: 0 }, children: [
    /* @__PURE__ */ jsx("div", { style: { width: 4, height: 14, background: statusCapColors[key], borderRadius: 2, flexShrink: 0 } }),
    /* @__PURE__ */ jsx("span", { style: { ...styles.mono, fontSize: 9, color: getStatusTextColor(key), fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: key.toUpperCase() })
  ] }, key)) })
] });
var TooltipWrapper = ({ testName, priority, status, tooltipLines, scheduled, wrapperStyle, children }) => {
  const [show, setShow] = import_react.default.useState(false);
  const [pos, setPos] = import_react.default.useState({ x: 0, y: 0, bottom: 0 });
  const [flipped, setFlipped] = import_react.default.useState(false);
  const timeoutRef = (0, import_react.useRef)(null);
  const wrapRef = (0, import_react.useRef)(null);
  const tipRef = (0, import_react.useRef)(null);
  const handleEnter = (0, import_react.useCallback)(() => {
    if (wrapRef.current) {
      const rect = wrapRef.current.getBoundingClientRect();
      setPos({ x: rect.left + rect.width / 2, y: rect.top, bottom: rect.bottom });
    }
    timeoutRef.current = window.setTimeout(() => setShow(true), 400);
  }, []);
  const handleLeave = (0, import_react.useCallback)(() => {
    if (timeoutRef.current)
      clearTimeout(timeoutRef.current);
    setShow(false);
    setFlipped(false);
  }, []);
  import_react.default.useLayoutEffect(() => {
    if (show && tipRef.current) {
      const rect = tipRef.current.getBoundingClientRect();
      if (rect.top < 0) {
        setFlipped(true);
      }
    }
  }, [show, pos]);
  const lines = tooltipLines.split("\n").filter((l) => {
    const parts = l.split(":");
    if (parts.length < 2)
      return l.trim() !== "";
    return parts.slice(1).join(":").trim() !== "";
  });
  const tooltipContent = /* @__PURE__ */ jsxs("div", { style: {
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 10,
    boxShadow: "0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)",
    padding: "12px 16px",
    maxWidth: 300,
    minWidth: 180
  }, children: [
    /* @__PURE__ */ jsx("div", { style: { fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 6, lineHeight: 1.3 }, children: testName }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }, children: [
      /* @__PURE__ */ jsxs("span", { style: { fontSize: 13, fontWeight: 700, color: getPriorityTextColor(priority) }, children: [
        "P",
        priority
      ] }),
      /* @__PURE__ */ jsx("span", { style: {
        fontSize: 11,
        fontWeight: 700,
        color: getStatusTextColor(status),
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        padding: "1px 6px",
        background: `${getCapColor(status)}18`,
        borderRadius: 4,
        border: `1px solid ${getCapColor(status)}40`
      }, children: status })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { height: 1, background: "#E5E7EB", margin: "0 -4px 8px" } }),
    lines.map((line, i) => {
      const colonIdx = line.indexOf(":");
      if (colonIdx === -1)
        return /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "#374151", marginBottom: 3, lineHeight: 1.4 }, children: line }, i);
      const label = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      return /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, fontSize: 11, marginBottom: 3, lineHeight: 1.4 }, children: [
        /* @__PURE__ */ jsxs("span", { style: { color: "#6B7280", fontWeight: 500, flexShrink: 0 }, children: [
          label,
          ":"
        ] }),
        /* @__PURE__ */ jsx("span", { style: { color: "#111827", fontWeight: 400 }, children: value })
      ] }, i);
    }),
    scheduled && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { style: { height: 1, background: "#E5E7EB", margin: "6px -4px 6px" } }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, fontSize: 11, marginBottom: 2 }, children: [
        /* @__PURE__ */ jsx("span", { style: { color: "#6B7280", fontWeight: 500 }, children: "Starts:" }),
        /* @__PURE__ */ jsx("span", { style: { color: "#111827" }, children: scheduled.start.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, fontSize: 11 }, children: [
        /* @__PURE__ */ jsx("span", { style: { color: "#6B7280", fontWeight: 500 }, children: "Ends:" }),
        /* @__PURE__ */ jsx("span", { style: { color: "#111827" }, children: scheduled.end.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) })
      ] })
    ] })
  ] });
  const arrowDown = /* @__PURE__ */ jsx("div", { style: {
    width: 10,
    height: 10,
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderTop: "none",
    borderLeft: "none",
    transform: "rotate(45deg)",
    margin: "-6px auto 0"
  } });
  const arrowUp = /* @__PURE__ */ jsx("div", { style: {
    width: 10,
    height: 10,
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderBottom: "none",
    borderRight: "none",
    transform: "rotate(45deg)",
    margin: "0 auto -6px"
  } });
  return /* @__PURE__ */ jsxs("div", { ref: wrapRef, onMouseEnter: handleEnter, onMouseLeave: handleLeave, style: wrapperStyle || { position: "relative" }, children: [
    children,
    show && /* @__PURE__ */ jsx("div", { ref: tipRef, style: {
      position: "fixed",
      left: pos.x,
      top: flipped ? pos.bottom + 8 : pos.y - 8,
      transform: flipped ? "translate(-50%, 0)" : "translate(-50%, -100%)",
      zIndex: 1e3,
      pointerEvents: "none"
    }, children: flipped ? /* @__PURE__ */ jsxs(Fragment, { children: [
      arrowUp,
      tooltipContent
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      tooltipContent,
      arrowDown
    ] }) })
  ] });
};
var buildAllocations = (stands) => {
  const allocations = [];
  stands.forEach((stand) => {
    stand.tests.forEach((test, idx) => {
      allocations.push({
        test_id: test.id,
        test_stand_id: stand.id,
        priority_order: idx + 1
      });
    });
  });
  return allocations;
};
var allocationsKey = (allocs) => {
  return JSON.stringify(allocs.map((a) => `${a.test_id}:${a.test_stand_id}:${a.priority_order}`).sort());
};
var TestStandScheduler = () => {
  const [inputTests] = Retool.useStateArray({
    name: "tests",
    initialValue: [],
    inspector: "text",
    label: "Tests Data",
    description: "Array of test objects from getSchedulerData query"
  });
  const [inputStands] = Retool.useStateArray({
    name: "testStands",
    initialValue: [],
    inspector: "text",
    label: "Test Stands Data",
    description: "Array of test stand objects from getTestStands query"
  });
  const [saveMode] = Retool.useStateEnumeration({
    name: "saveMode",
    initialValue: "batch",
    enumDefinition: ["batch", "live"],
    inspector: "segmented",
    label: "Save Mode",
    description: "batch = save button, live = emit on every change"
  });
  const [changeoverHours] = Retool.useStateNumber({
    name: "changeoverHours",
    initialValue: 3,
    inspector: "text",
    label: "Changeover Hours",
    description: "Hours for changeover between tests (work hours only)"
  });
  const [workStart] = Retool.useStateNumber({
    name: "workStart",
    initialValue: 9,
    inspector: "text",
    label: "Work Start Hour"
  });
  const [workEnd] = Retool.useStateNumber({
    name: "workEnd",
    initialValue: 17,
    inspector: "text",
    label: "Work End Hour"
  });
  const [initialViewWeeksStr] = Retool.useStateEnumeration({
    name: "defaultViewWeeks",
    initialValue: "4",
    enumDefinition: ["2", "4", "8", "12", "24"],
    inspector: "segmented",
    label: "Default View"
  });
  const initialViewWeeks = Number(initialViewWeeksStr) || 4;
  const [cardMainText] = Retool.useStateString({
    name: "cardMainText",
    initialValue: "{name}",
    inspector: "text",
    label: "Card Title",
    description: "Template for card title. Use {fieldName} for data fields."
  });
  const [cardSubText] = Retool.useStateString({
    name: "cardSubText",
    initialValue: "Parts: {part_ready_date}",
    inspector: "text",
    label: "Card Subtitle",
    description: "Template for subtitle. Hidden when all fields are empty."
  });
  const [cardInfoRow] = Retool.useStateString({
    name: "cardInfoRow",
    initialValue: "{owner} \xB7 {duration}h \xB7 P{priority}",
    inspector: "text",
    label: "Card Info Row",
    description: "Template for the info row shown on cards and bars."
  });
  const [tooltipTemplate] = Retool.useStateString({
    name: "tooltipTemplate",
    initialValue: "Notes: {notes}\nOwner: {owner}\nPriority: {priority}\nPart Status: {part_status}\nParts Due: {part_ready_date}\nAssigned Parts: {assigned_parts}",
    inspector: "text",
    label: "Tooltip Template",
    description: "Template for hover tooltip. Use \\n for newlines."
  });
  const [, setAllocations] = Retool.useStateArray({
    name: "allocations",
    initialValue: [],
    inspector: "hidden",
    description: "Current allocation state: [{test_id, test_stand_id, priority_order}]"
  });
  const [, setAllTestIds] = Retool.useStateArray({
    name: "allTestIds",
    initialValue: [],
    inspector: "hidden",
    description: "All test IDs managed by the scheduler (for the delete step in save)"
  });
  const [, setHasUnsavedChanges] = Retool.useStateBoolean({
    name: "hasUnsavedChanges",
    initialValue: false,
    inspector: "hidden",
    description: "Whether there are unsaved allocation changes"
  });
  const onSave = Retool.useEventCallback({ name: "onSave" });
  const onChange = Retool.useEventCallback({ name: "onChange" });
  Retool.useComponentSettings({
    defaultHeight: 600,
    defaultWidth: 12
  });
  const [stands, setStands] = import_react.default.useState([]);
  const [unallocated, setUnallocated] = import_react.default.useState([]);
  const [viewportWeeks, setViewportWeeks] = import_react.default.useState(initialViewWeeks || 4);
  const [draggedTestId, setDraggedTestId] = import_react.default.useState(null);
  const [insertIndicator, setInsertIndicator] = import_react.default.useState(null);
  const [queueInsertIndex, setQueueInsertIndex] = import_react.default.useState(null);
  const [isDirty, setIsDirty] = import_react.default.useState(false);
  const originalAllocationsRef = (0, import_react.useRef)("");
  const scrollRef = (0, import_react.useRef)(null);
  const [queueSort, setQueueSort] = import_react.default.useState("az");
  const [queueFilter, setQueueFilter] = import_react.default.useState("");
  const inputKey = (0, import_react.useMemo)(
    () => JSON.stringify(inputTests) + JSON.stringify(inputStands),
    [inputTests, inputStands]
  );
  (0, import_react.useEffect)(() => {
    const testsArr = Array.isArray(inputTests) ? inputTests : [];
    const standsArr = Array.isArray(inputStands) ? inputStands : [];
    if (standsArr.length === 0 && testsArr.length === 0)
      return;
    const standMap = /* @__PURE__ */ new Map();
    standsArr.forEach((s) => standMap.set(s.id, { id: s.id, name: s.name, tests: [] }));
    const unalloc = [];
    testsArr.forEach((t) => {
      const test = {
        id: t.id,
        name: t.name || "",
        duration: t.duration || 72,
        owner: t.owner || "",
        priority: t.priority ?? 50,
        notes: t.notes || "",
        status: t.status || "",
        test_stand_id: t.test_stand_id,
        priority_order: t.priority_order,
        allocation_id: t.allocation_id,
        assigned_parts: t.assigned_parts || null,
        part_ready_date: t.part_ready_date || null,
        part_status: t.part_status || "",
        ...t
        // preserve any extra fields for template resolution
      };
      if (test.test_stand_id != null && standMap.has(test.test_stand_id)) {
        standMap.get(test.test_stand_id).tests.push(test);
      } else {
        unalloc.push(test);
      }
    });
    standMap.forEach((s) => {
      s.tests.sort((a, b) => (a.priority_order || 999) - (b.priority_order || 999));
    });
    const newStands = standsArr.map((s) => standMap.get(s.id));
    setStands(newStands);
    setUnallocated(unalloc);
    setIsDirty(false);
    const initialAllocs = buildAllocations(newStands);
    originalAllocationsRef.current = allocationsKey(initialAllocs);
    setAllocations(initialAllocs);
    setAllTestIds(testsArr.map((t) => t.id));
    setHasUnsavedChanges(false);
  }, [inputKey]);
  const chHours = changeoverHours || 3;
  const wStart = workStart || 9;
  const wEnd = workEnd || 17;
  const viewStart = (0, import_react.useMemo)(() => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    while (d.getDay() !== 1)
      d.setDate(d.getDate() - 1);
    return d;
  }, []);
  const computeSchedule = (0, import_react.useCallback)((tests) => {
    const runningTests = tests.filter((t) => isRunningTest(t));
    const queuedTests = tests.filter((t) => !isRunningTest(t));
    const sortedRunning = [...runningTests].sort((a, b) => {
      const dateA = parseLocalDate(a.test_started_date) || /* @__PURE__ */ new Date();
      const dateB = parseLocalDate(b.test_started_date) || /* @__PURE__ */ new Date();
      if (dateA.getTime() !== dateB.getTime())
        return dateA.getTime() - dateB.getTime();
      return (b.priority ?? 50) - (a.priority ?? 50);
    });
    let lastRunningEnd = new Date(viewStart);
    const runningScheduled = sortedRunning.map((test) => {
      const testDate = parseLocalDate(test.test_started_date) || new Date(viewStart);
      const start = testDate < lastRunningEnd ? new Date(lastRunningEnd) : new Date(testDate);
      const end = new Date(start.getTime() + test.duration * MS_PER_HOUR);
      lastRunningEnd = calculateChangeoverEnd(end, chHours, wStart, wEnd);
      return { ...test, start, end };
    });
    const nowPlusChangeover = calculateChangeoverEnd(/* @__PURE__ */ new Date(), chHours, wStart, wEnd);
    let currentEnd = new Date(Math.max(lastRunningEnd.getTime(), nowPlusChangeover.getTime()));
    const queuedScheduled = queuedTests.map((test) => {
      const start = new Date(currentEnd);
      const end = new Date(start.getTime() + test.duration * MS_PER_HOUR);
      currentEnd = calculateChangeoverEnd(end, chHours, wStart, wEnd);
      return { ...test, start, end };
    });
    return [...runningScheduled, ...queuedScheduled];
  }, [viewStart, chHours, wStart, wEnd]);
  const timelineEnd = (0, import_react.useMemo)(() => {
    let latestEnd = new Date(viewStart);
    latestEnd.setDate(latestEnd.getDate() + viewportWeeks * 7);
    stands.forEach((stand) => {
      const schedule = computeSchedule(stand.tests);
      if (schedule.length > 0) {
        const last = schedule[schedule.length - 1];
        const changeoverEnd = calculateChangeoverEnd(last.end, chHours, wStart, wEnd);
        if (changeoverEnd > latestEnd)
          latestEnd = changeoverEnd;
      }
    });
    latestEnd.setDate(latestEnd.getDate() + 7);
    return latestEnd;
  }, [stands, viewStart, viewportWeeks, chHours, wStart, wEnd, computeSchedule]);
  const totalDays = (0, import_react.useMemo)(() => Math.ceil(hoursBetween(viewStart, timelineEnd) / 24), [viewStart, timelineEnd]);
  const viewportWidth = 800;
  const pxPerHour = viewportWidth / (viewportWeeks * 7 * 24);
  const days = (0, import_react.useMemo)(() => generateDays(viewStart, totalDays), [viewStart, totalDays]);
  const weeks = (0, import_react.useMemo)(() => generateWeeks(viewStart, totalDays), [viewStart, totalDays]);
  const totalWidth = totalDays * 24 * pxPerHour;
  const dayWidth = 24 * pxPerHour;
  const afterChange = (0, import_react.useCallback)((newStands) => {
    const allocs = buildAllocations(newStands);
    const dirty = allocationsKey(allocs) !== originalAllocationsRef.current;
    setIsDirty(dirty);
    setAllocations(allocs);
    setHasUnsavedChanges(dirty);
    if (saveMode === "live") {
      onChange();
    }
  }, [saveMode, setAllocations, setHasUnsavedChanges, onChange]);
  const findTest = (0, import_react.useCallback)((testId) => {
    const q = unallocated.find((t) => t.id === testId);
    if (q)
      return q;
    for (const s of stands) {
      const t = s.tests.find((t2) => t2.id === testId);
      if (t)
        return t;
    }
    return null;
  }, [unallocated, stands]);
  const clearDrag = (0, import_react.useCallback)(() => {
    setDraggedTestId(null);
    setInsertIndicator(null);
    setQueueInsertIndex(null);
  }, []);
  const dropOnStand = (0, import_react.useCallback)((standId, index) => {
    if (!draggedTestId)
      return;
    const test = findTest(draggedTestId);
    if (!test)
      return;
    setUnallocated((prev) => prev.filter((t) => t.id !== draggedTestId));
    const newStands = stands.map((s) => {
      const filtered = s.tests.filter((t) => t.id !== draggedTestId);
      if (s.id === standId) {
        const newTests = [...filtered];
        newTests.splice(index, 0, test);
        return { ...s, tests: newTests };
      }
      return { ...s, tests: filtered };
    });
    setStands(newStands);
    afterChange(newStands);
    clearDrag();
  }, [draggedTestId, findTest, stands, afterChange, clearDrag]);
  const dropOnQueue = (0, import_react.useCallback)((index) => {
    if (!draggedTestId)
      return;
    const test = findTest(draggedTestId);
    if (!test)
      return;
    const newStands = stands.map((s) => ({
      ...s,
      tests: s.tests.filter((t) => t.id !== draggedTestId)
    }));
    setUnallocated((prev) => {
      const filtered = prev.filter((t) => t.id !== draggedTestId);
      const next = [...filtered];
      next.splice(index, 0, test);
      return next;
    });
    setStands(newStands);
    afterChange(newStands);
    clearDrag();
  }, [draggedTestId, findTest, stands, afterChange, clearDrag]);
  const handleSave = (0, import_react.useCallback)(() => {
    onSave();
  }, [onSave]);
  const handleDiscard = (0, import_react.useCallback)(() => {
    const testsArr = Array.isArray(inputTests) ? inputTests : [];
    const standsArr = Array.isArray(inputStands) ? inputStands : [];
    const standMap = /* @__PURE__ */ new Map();
    standsArr.forEach((s) => standMap.set(s.id, { id: s.id, name: s.name, tests: [] }));
    const unalloc = [];
    testsArr.forEach((t) => {
      const test = { ...t, duration: t.duration || 72, priority: t.priority ?? 50 };
      if (test.test_stand_id != null && standMap.has(test.test_stand_id)) {
        standMap.get(test.test_stand_id).tests.push(test);
      } else {
        unalloc.push(test);
      }
    });
    standMap.forEach((s) => s.tests.sort((a, b) => (a.priority_order || 999) - (b.priority_order || 999)));
    const newStands = standsArr.map((s) => standMap.get(s.id));
    setStands(newStands);
    setUnallocated(unalloc);
    setIsDirty(false);
    setAllocations(buildAllocations(newStands));
    setHasUnsavedChanges(false);
  }, [inputTests, inputStands, setAllocations, setHasUnsavedChanges]);
  const getBarPos = (0, import_react.useCallback)((start, duration) => ({
    left: Math.max(0, hoursBetween(viewStart, start)) * pxPerHour,
    width: Math.max(duration * pxPerHour, 2)
  }), [viewStart, pxPerHour]);
  const getRunningBarPos = (0, import_react.useCallback)((start, end) => {
    const effectiveStartMs = Math.max(start.getTime(), viewStart.getTime());
    const endMs = end.getTime();
    if (endMs <= effectiveStartMs)
      return null;
    return {
      left: hoursBetween(viewStart, new Date(effectiveStartMs)) * pxPerHour,
      width: Math.max(hoursBetween(new Date(effectiveStartMs), new Date(endMs)) * pxPerHour, 2)
    };
  }, [viewStart, pxPerHour]);
  const draggedTest = draggedTestId != null ? findTest(draggedTestId) : null;
  const draggedIsRunning = draggedTest != null ? isRunningTest(draggedTest) : false;
  const totalAllocated = stands.reduce((a, s) => a + s.tests.length, 0);
  const totalHours = stands.reduce((a, s) => a + s.tests.reduce((b, t) => b + t.duration, 0), 0);
  const mainText = String(cardMainText || "{name}");
  const subText = String(cardSubText || "");
  const infoRow = String(cardInfoRow || "");
  const tipTemplate = String(tooltipTemplate || "").replace(/\\n/g, "\n");
  const STATUS_SORT_ORDER = {
    "Running": 0,
    "Delayed": 1,
    "On Time": 2,
    "Ready": 3,
    "In Progress": 4,
    "Parts Not Assigned": 5
  };
  const sortedUnallocated = (0, import_react.useMemo)(() => {
    let list = [...unallocated];
    if (queueFilter.trim()) {
      const q = queueFilter.toLowerCase().trim();
      list = list.filter((t) => {
        const searchable = [
          t.name,
          t.owner,
          t.notes,
          t.status,
          t.part_status,
          t.assigned_parts,
          t.priority != null ? String(t.priority) : "",
          t.duration != null ? String(t.duration) : ""
        ].join(" ").toLowerCase();
        return searchable.includes(q);
      });
    }
    if (queueSort === "az") {
      list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (queueSort === "priority") {
      list.sort((a, b) => (b.priority ?? 50) - (a.priority ?? 50));
    } else {
      list.sort((a, b) => {
        const sa = STATUS_SORT_ORDER[getDisplayStatus(a)] ?? 99;
        const sb = STATUS_SORT_ORDER[getDisplayStatus(b)] ?? 99;
        return sa !== sb ? sa - sb : (b.priority ?? 50) - (a.priority ?? 50);
      });
    }
    return list;
  }, [unallocated, queueSort, queueFilter]);
  const BAR_HEIGHT = 72;
  const LANE_HEIGHT = 84;
  return /* @__PURE__ */ jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxs("div", { style: styles.sidebar, children: [
      /* @__PURE__ */ jsxs("div", { style: { padding: "20px 16px 12px", borderBottom: "1px solid #E5E7EB" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ jsx("div", { style: { width: 8, height: 8, borderRadius: "50%", background: unallocated.length > 0 ? "#F59E0B" : "#10B981" } }),
            /* @__PURE__ */ jsx("span", { style: { ...styles.mono, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4B5563" }, children: "Queue" })
          ] }),
          /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 6, padding: 2, border: "1px solid #E5E7EB" }, children: [["az", "A\u2192Z"], ["priority", "Priority"], ["status", "Status"]].map(([val, label]) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setQueueSort(val),
              style: {
                ...styles.mono,
                padding: "3px 8px",
                fontSize: 9,
                fontWeight: 600,
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                background: queueSort === val ? "#3B82F6" : "transparent",
                color: queueSort === val ? "#FFF" : "#6B7280"
              },
              children: label
            },
            val
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { position: "relative", marginTop: 6 }, children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: queueFilter,
              onChange: (e) => setQueueFilter(e.target.value),
              placeholder: "Filter tests...",
              style: {
                ...styles.mono,
                width: "100%",
                boxSizing: "border-box",
                padding: "5px 28px 5px 8px",
                fontSize: 11,
                border: "1px solid #E5E7EB",
                borderRadius: 6,
                background: "#F9FAFB",
                color: "#111827",
                outline: "none"
              },
              onFocus: (e) => {
                e.currentTarget.style.borderColor = "#3B82F6";
                e.currentTarget.style.background = "#FFFFFF";
              },
              onBlur: (e) => {
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.background = "#F9FAFB";
              }
            }
          ),
          queueFilter && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setQueueFilter(""),
              style: {
                position: "absolute",
                right: 6,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9CA3AF",
                fontSize: 14,
                lineHeight: 1,
                padding: 0
              },
              children: "\xD7"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          style: { flex: 1, overflowY: "auto", padding: "8px 10px" },
          onDragOver: (e) => {
            e.preventDefault();
            if (e.target === e.currentTarget)
              setQueueInsertIndex(unallocated.length);
          },
          onDragLeave: (e) => {
            if (e.currentTarget === e.target)
              setQueueInsertIndex(null);
          },
          onDrop: (e) => {
            e.preventDefault();
            dropOnQueue(queueInsertIndex ?? unallocated.length);
          },
          children: [
            sortedUnallocated.map((test, idx) => {
              const status = getDisplayStatus(test, null);
              const showSub = !isTemplateEmpty(subText, test);
              return /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    onDragOver: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQueueInsertIndex(idx);
                    },
                    onDrop: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      dropOnQueue(idx);
                    },
                    style: {
                      height: queueInsertIndex === idx && draggedTestId && draggedTestId !== test.id ? 6 : 0,
                      background: "#3B82F6",
                      borderRadius: 3,
                      transition: "height 0.12s ease"
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  TooltipWrapper,
                  {
                    testName: resolveTemplate(mainText, test),
                    priority: test.priority,
                    status,
                    tooltipLines: resolveTemplate(tipTemplate, test),
                    children: /* @__PURE__ */ jsxs(
                      "div",
                      {
                        draggable: true,
                        onDragStart: (e) => {
                          e.dataTransfer.effectAllowed = "move";
                          setDraggedTestId(test.id);
                        },
                        onDragEnd: clearDrag,
                        onDragOver: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          setQueueInsertIndex(e.clientY < rect.top + rect.height / 2 ? idx : idx + 1);
                        },
                        onMouseEnter: (e) => {
                          const el = e.currentTarget;
                          el.style.transform = "translateY(-2px)";
                          el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                          el.style.border = `2px solid ${getCapColor(status)}`;
                        },
                        onMouseLeave: (e) => {
                          const el = e.currentTarget;
                          el.style.transform = "translateY(0)";
                          el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
                          el.style.border = "1px solid #E5E7EB";
                        },
                        style: {
                          display: "flex",
                          marginBottom: 6,
                          background: draggedTestId === test.id ? "#F3F4F6" : "#FFFFFF",
                          border: "1px solid #E5E7EB",
                          borderRadius: 8,
                          cursor: "grab",
                          opacity: draggedTestId === test.id ? 0.35 : 1,
                          overflow: "hidden",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                          transition: "transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease"
                        },
                        children: [
                          /* @__PURE__ */ jsx("div", { style: { width: 5, minWidth: 5, background: getCapColor(status), borderRadius: "8px 0 0 8px", flexShrink: 0 } }),
                          /* @__PURE__ */ jsxs("div", { style: { flex: 1, padding: "8px 12px", minWidth: 0 }, children: [
                            /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }, children: [
                              /* @__PURE__ */ jsxs("span", { style: { ...styles.mono, fontSize: 13, fontWeight: 700, color: getPriorityTextColor(test.priority) }, children: [
                                "P",
                                test.priority
                              ] }),
                              /* @__PURE__ */ jsx("span", { style: { ...styles.mono, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: getStatusTextColor(status), textTransform: "uppercase" }, children: status.toUpperCase() })
                            ] }),
                            /* @__PURE__ */ jsx("div", { style: { fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 2, lineHeight: 1.3 }, children: resolveTemplate(mainText, test) }),
                            showSub && /* @__PURE__ */ jsx("div", { style: { ...styles.mono, fontSize: 11, color: "#6B7280", marginBottom: 4, fontWeight: 400 }, children: resolveTemplate(subText, test) }),
                            /* @__PURE__ */ jsx("div", { style: { ...styles.mono, display: "flex", gap: 8, fontSize: 11, color: "#4B5563", flexWrap: "wrap" }, children: resolveTemplate(infoRow, test).split("\xB7").map((part, i, arr) => /* @__PURE__ */ jsxs(import_react.default.Fragment, { children: [
                              /* @__PURE__ */ jsx("span", { children: part.trim() }),
                              i < arr.length - 1 && /* @__PURE__ */ jsx("span", { children: "\xB7" })
                            ] }, i)) })
                          ] })
                        ]
                      }
                    )
                  }
                )
              ] }, test.id);
            }),
            /* @__PURE__ */ jsx(
              "div",
              {
                onDragOver: (e) => {
                  e.preventDefault();
                  setQueueInsertIndex(unallocated.length);
                },
                onDrop: (e) => {
                  e.preventDefault();
                  dropOnQueue(unallocated.length);
                },
                style: {
                  height: queueInsertIndex === unallocated.length && draggedTestId ? 6 : 0,
                  background: "#3B82F6",
                  borderRadius: 3,
                  transition: "height 0.12s ease",
                  margin: "0 4px"
                }
              }
            ),
            unallocated.length === 0 && /* @__PURE__ */ jsx("div", { style: {
              textAlign: "center",
              padding: "32px 16px",
              color: "#6B7280",
              fontSize: 12,
              border: draggedTestId ? "2px dashed #3B82F6" : "2px dashed #D1D5DB",
              borderRadius: 8,
              marginTop: 8,
              background: draggedTestId ? "#EFF6FF" : "transparent"
            }, children: draggedTestId ? "Drop to return to queue" : "All tests allocated" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(OutlineKey, {}),
      /* @__PURE__ */ jsx("div", { style: { padding: "12px 16px", borderTop: "1px solid #E5E7EB", background: "#F9FAFB" }, children: /* @__PURE__ */ jsxs("div", { style: { ...styles.mono, display: "flex", justifyContent: "space-between", fontSize: 10, color: "#6B7280" }, children: [
        /* @__PURE__ */ jsxs("span", { children: [
          totalAllocated,
          "/",
          totalAllocated + unallocated.length,
          " allocated"
        ] }),
        /* @__PURE__ */ jsxs("span", { children: [
          totalHours,
          "h"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { padding: "12px 24px", borderBottom: "1px solid #E5E7EB", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { minWidth: 0 }, children: [
          /* @__PURE__ */ jsx("h1", { style: { fontSize: 18, fontWeight: 700, color: "#111827", letterSpacing: "-0.02em" }, children: "Test Stand Scheduler" }),
          /* @__PURE__ */ jsxs("p", { style: { ...styles.mono, fontSize: 11, color: "#6B7280", marginTop: 2 }, children: [
            "Continuous testing \xB7 ",
            chHours,
            "h changeover (",
            wStart,
            ":00\u2013",
            wEnd,
            ":00 Mon\u2013Fri)",
            saveMode === "live" && /* @__PURE__ */ jsx("span", { children: " \xB7 Live sync" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
          saveMode === "batch" && /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6 }, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleDiscard,
                disabled: !isDirty,
                style: {
                  ...styles.mono,
                  padding: "6px 14px",
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 6,
                  border: "1px solid #D1D5DB",
                  cursor: isDirty ? "pointer" : "default",
                  background: "#FFFFFF",
                  color: isDirty ? "#374151" : "#9CA3AF",
                  opacity: isDirty ? 1 : 0.5
                },
                children: "Discard"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleSave,
                disabled: !isDirty,
                style: {
                  ...styles.mono,
                  padding: "6px 14px",
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 6,
                  border: "none",
                  cursor: isDirty ? "pointer" : "default",
                  background: isDirty ? "#3B82F6" : "#93C5FD",
                  color: "#FFFFFF",
                  boxShadow: isDirty ? "0 1px 3px rgba(59,130,246,0.3)" : "none"
                },
                children: [
                  "Save Changes",
                  isDirty && " \u2022"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 4, background: "#F3F4F6", borderRadius: 8, padding: 3, border: "1px solid #E5E7EB" }, children: [2, 4, 8, 12, 24].map((w) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setViewportWeeks(w),
              style: {
                ...styles.mono,
                padding: "6px 12px",
                fontSize: 11,
                fontWeight: 600,
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                background: viewportWeeks === w ? "#3B82F6" : "transparent",
                color: viewportWeeks === w ? "#FFF" : "#4B5563"
              },
              children: [
                w,
                "W"
              ]
            },
            w
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { ref: scrollRef, style: { flex: 1, overflow: "auto", background: "#F9FAFB" }, children: /* @__PURE__ */ jsxs("div", { style: { minWidth: totalWidth, padding: "0 12px 24px", position: "relative" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { position: "sticky", top: 0, zIndex: 20, background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }, children: [
          /* @__PURE__ */ jsx("div", { style: { display: "flex", height: 28, position: "relative", borderBottom: "1px solid #E5E7EB" }, children: weeks.map((wk, i) => /* @__PURE__ */ jsx("div", { style: {
            ...styles.mono,
            position: "absolute",
            left: hoursBetween(viewStart, wk) * pxPerHour,
            width: 7 * 24 * pxPerHour,
            height: 28,
            display: "flex",
            alignItems: "center",
            paddingLeft: 8,
            fontSize: 10,
            fontWeight: 600,
            color: "#4B5563",
            borderLeft: i > 0 ? "1px solid #E5E7EB" : "none"
          }, children: formatWeek(wk) }, i)) }),
          /* @__PURE__ */ jsx("div", { style: { display: "flex", height: 24 }, children: days.map((d, i) => {
            const isToday = d.toDateString() === (/* @__PURE__ */ new Date()).toDateString();
            const isWeekend = d.getDay() === 0 || d.getDay() === 6;
            return /* @__PURE__ */ jsx("div", { style: {
              ...styles.mono,
              width: dayWidth,
              minWidth: dayWidth,
              fontSize: 9,
              textAlign: "center",
              color: isToday ? "#2563EB" : "#6B7280",
              fontWeight: isToday ? 700 : 400,
              lineHeight: "24px",
              borderLeft: "1px solid #E5E7EB",
              background: isToday ? "#EFF6FF" : isWeekend ? "#F3F4F6" : "transparent"
            }, children: viewportWeeks <= 8 ? d.getDate() : d.getDay() === 1 ? d.getDate() : "" }, i);
          }) })
        ] }),
        stands.map((stand) => {
          const schedule = computeSchedule(stand.tests);
          const ind = insertIndicator;
          const showHere = ind && ind.standId === stand.id;
          return /* @__PURE__ */ jsxs("div", { style: { marginTop: 16 }, children: [
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6, paddingLeft: 2 }, children: [
              /* @__PURE__ */ jsx("div", { style: { width: 6, height: 6, borderRadius: 2, background: stand.tests.length > 0 ? "#3B82F6" : "#9CA3AF" } }),
              /* @__PURE__ */ jsx("span", { style: { ...styles.mono, fontSize: 11, fontWeight: 600, color: "#374151" }, children: stand.name }),
              /* @__PURE__ */ jsxs("span", { style: { ...styles.mono, fontSize: 10, color: "#6B7280" }, children: [
                stand.tests.length,
                " test",
                stand.tests.length !== 1 ? "s" : "",
                stand.tests.length > 0 && ` \xB7 ${stand.tests.reduce((a, t) => a + t.duration, 0)}h`
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                onDragOver: (e) => {
                  e.preventDefault();
                  setInsertIndicator({ standId: stand.id, index: stand.tests.length });
                },
                onDragLeave: (e) => {
                  if (!e.currentTarget.contains(e.relatedTarget))
                    setInsertIndicator(null);
                },
                onDrop: (e) => {
                  e.preventDefault();
                  if (draggedIsRunning) {
                    dropOnStand(stand.id, stand.tests.length);
                  } else {
                    dropOnStand(stand.id, ind?.standId === stand.id ? ind.index : stand.tests.length);
                  }
                },
                style: {
                  position: "relative",
                  height: LANE_HEIGHT,
                  background: (() => {
                    const active = showHere || draggedTestId && stand.tests.length === 0;
                    if (!active)
                      return "#F3F4F6";
                    return draggedIsRunning ? "#F5F3FF" : "#EFF6FF";
                  })(),
                  border: `1px solid ${(() => {
                    const active = showHere || draggedTestId && stand.tests.length === 0;
                    if (!active)
                      return "#E5E7EB";
                    return draggedIsRunning ? "#A78BFA" : "#BFDBFE";
                  })()}`,
                  borderRadius: 8,
                  width: totalWidth,
                  transition: "background 0.15s ease, border-color 0.15s ease"
                },
                children: [
                  days.map((d, i) => {
                    if (d.getDay() !== 0 && d.getDay() !== 6)
                      return null;
                    return /* @__PURE__ */ jsx("div", { style: {
                      position: "absolute",
                      left: i * dayWidth,
                      top: 0,
                      bottom: 0,
                      width: dayWidth,
                      background: "#E5E7EB",
                      pointerEvents: "none"
                    } }, `we-${i}`);
                  }),
                  days.map((_, i) => /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: i * dayWidth, top: 0, bottom: 0, width: 1, background: "#E5E7EB" } }, i)),
                  (() => {
                    const h = hoursBetween(viewStart, /* @__PURE__ */ new Date());
                    if (h < 0 || h > totalDays * 24)
                      return null;
                    return /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: h * pxPerHour, top: 0, bottom: 0, width: 2, background: "#EF4444", zIndex: 10 }, children: /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: -3, left: -3, width: 8, height: 8, borderRadius: "50%", background: "#EF4444" } }) });
                  })(),
                  schedule.map((test, idx) => {
                    const isTestRunning = isRunningTest(test);
                    const barPos = isTestRunning ? getRunningBarPos(test.start, test.end) : getBarPos(test.start, test.duration);
                    if (!barPos)
                      return null;
                    const { left, width } = barPos;
                    const cEnd = calculateChangeoverEnd(test.end, chHours, wStart, wEnd);
                    const changeoverWidth = hoursBetween(test.end, cEnd) * pxPerHour;
                    const displayStatus = getDisplayStatus(test, test.start);
                    const resolvedMain = resolveTemplate(mainText, test);
                    const resolvedInfo = resolveTemplate(infoRow, test);
                    const showInfoOnBar = resolvedInfo.trim() !== "" && width > 120;
                    return /* @__PURE__ */ jsxs("div", { style: { position: "absolute", left, top: 0, width: width + changeoverWidth, height: "100%" }, children: [
                      draggedTestId && draggedTestId !== test.id && !draggedIsRunning && /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            onDragOver: (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setInsertIndicator({ standId: stand.id, index: idx });
                            },
                            onDrop: (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              dropOnStand(stand.id, idx);
                            },
                            style: { position: "absolute", left: -6, top: 0, width: "50%", height: "100%", zIndex: 20, minWidth: 20 }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            onDragOver: (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setInsertIndicator({ standId: stand.id, index: idx + 1 });
                            },
                            onDrop: (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              dropOnStand(stand.id, idx + 1);
                            },
                            style: { position: "absolute", right: -6, top: 0, width: "50%", height: "100%", zIndex: 20, minWidth: 20 }
                          }
                        )
                      ] }),
                      showHere && !draggedIsRunning && ind.index === idx && /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: -4, top: 0, bottom: 0 }, children: /* @__PURE__ */ jsx(InsertLine, {}) }),
                      /* @__PURE__ */ jsx(
                        TooltipWrapper,
                        {
                          testName: resolvedMain,
                          priority: test.priority,
                          status: displayStatus,
                          tooltipLines: resolveTemplate(tipTemplate, test),
                          scheduled: isTestRunning ? null : test,
                          wrapperStyle: { position: "absolute", left: 0, top: 0, width, height: "100%" },
                          children: /* @__PURE__ */ jsxs(
                            "div",
                            {
                              draggable: true,
                              onDragStart: (e) => {
                                e.dataTransfer.effectAllowed = "move";
                                e.dataTransfer.setData("text/plain", String(test.id));
                                setDraggedTestId(test.id);
                              },
                              onDragEnd: clearDrag,
                              onMouseEnter: (e) => {
                                if (!draggedTestId) {
                                  const el = e.currentTarget;
                                  el.style.transform = "translateY(-2px)";
                                  el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                                  el.style.border = `2px solid ${getCapColor(displayStatus)}`;
                                  el.style.zIndex = "25";
                                }
                              },
                              onMouseLeave: (e) => {
                                const el = e.currentTarget;
                                el.style.transform = "translateY(0)";
                                el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
                                el.style.border = isTestRunning ? "1px solid #C4B5FD" : "1px solid #E5E7EB";
                                el.style.zIndex = "15";
                              },
                              style: {
                                position: "absolute",
                                left: 0,
                                top: 6,
                                width,
                                height: BAR_HEIGHT,
                                background: isTestRunning ? "#F3E8FF" : "#FFFFFF",
                                borderRadius: 8,
                                cursor: "grab",
                                display: "flex",
                                flexDirection: "row",
                                overflow: "hidden",
                                opacity: draggedTestId === test.id ? 0.25 : 1,
                                zIndex: 15,
                                border: isTestRunning ? "1px solid #C4B5FD" : "1px solid #E5E7EB",
                                boxShadow: isTestRunning ? "0 1px 3px rgba(147,51,234,0.15)" : "0 1px 3px rgba(0,0,0,0.06)",
                                transition: "transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease"
                              },
                              children: [
                                /* @__PURE__ */ jsx("div", { style: { width: 5, minWidth: 5, background: getCapColor(displayStatus), flexShrink: 0 } }),
                                /* @__PURE__ */ jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", padding: "4px 8px", minWidth: 0, justifyContent: "center" }, children: [
                                  width > 70 && /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }, children: [
                                    /* @__PURE__ */ jsx("span", { style: { ...styles.mono, fontSize: width > 120 ? 11 : 9, fontWeight: 700, color: isTestRunning ? "#7E22CE" : getPriorityTextColor(test.priority) }, children: isTestRunning ? "\u25B6 RUNNING" : `P${test.priority}` }),
                                    width > 100 && !isTestRunning && /* @__PURE__ */ jsx("span", { style: { ...styles.mono, fontSize: 9, fontWeight: 700, letterSpacing: "0.05em", color: getStatusTextColor(displayStatus), textTransform: "uppercase" }, children: displayStatus.toUpperCase() })
                                  ] }),
                                  /* @__PURE__ */ jsx("span", { style: {
                                    fontSize: width > 120 ? 12 : width > 80 ? 11 : 10,
                                    fontWeight: 600,
                                    color: isTestRunning ? "#3B0764" : "#111827",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                    lineHeight: 1.2
                                  }, children: resolvedMain }),
                                  showInfoOnBar && /* @__PURE__ */ jsx("span", { style: {
                                    ...styles.mono,
                                    fontSize: 9,
                                    fontWeight: 400,
                                    color: isTestRunning ? "#7E22CE" : "#4B5563",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: "100%",
                                    marginTop: 2
                                  }, children: resolvedInfo })
                                ] })
                              ]
                            }
                          )
                        }
                      ),
                      idx < schedule.length && changeoverWidth > 0 && /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: width, top: LANE_HEIGHT / 2 - 8, width: changeoverWidth, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx("div", { style: { height: 1, width: "80%", background: "repeating-linear-gradient(90deg, #9CA3AF 0, #9CA3AF 4px, transparent 4px, transparent 8px)" } }) })
                    ] }, test.id);
                  }),
                  showHere && !draggedIsRunning && ind.index === stand.tests.length && schedule.length > 0 && (() => {
                    const last = schedule[schedule.length - 1];
                    const { left, width } = getBarPos(last.start, last.duration);
                    const cEnd = calculateChangeoverEnd(last.end, chHours, wStart, wEnd);
                    const changeoverWidth = hoursBetween(last.end, cEnd) * pxPerHour;
                    return /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: left + width + changeoverWidth + 8, top: 0, bottom: 0 }, children: /* @__PURE__ */ jsx(InsertLine, {}) });
                  })(),
                  stand.tests.length === 0 && /* @__PURE__ */ jsx("div", { style: {
                    ...styles.mono,
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    color: draggedTestId ? "#3B82F6" : "#9CA3AF",
                    fontWeight: draggedTestId ? 600 : 400
                  }, children: draggedTestId ? "Drop here to schedule" : "Drop tests here to schedule" })
                ]
              }
            )
          ] }, stand.id);
        }),
        stands.length === 0 && /* @__PURE__ */ jsx("div", { style: {
          ...styles.mono,
          textAlign: "center",
          padding: "48px 24px",
          color: "#6B7280",
          fontSize: 12
        }, children: "No test stands loaded. Bind the testStands property to your getTestStands query." })
      ] }) })
    ] })
  ] });
};
export {
  TestStandScheduler
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhY3QtZ2xvYmFsOnJlYWN0IiwgIi4uL3NyYy9pbmRleC50c3giLCAidHJ5cmV0b29sLWN1c3RvbS1jb21wb25lbnQtY29sbGVjdGlvbnMtZ2xvYmFsOkB0cnlyZXRvb2wvY3VzdG9tLWNvbXBvbmVudC1zdXBwb3J0IiwgInJlYWN0LWpzeC1ydW50aW1lLWdsb2JhbDpyZWFjdC9qc3gtcnVudGltZSJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmVhY3Q7XG4gICAgICAgICIsICJpbXBvcnQgUmVhY3QsIHsgRkMsIHVzZVJlZiwgdXNlTWVtbywgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSZXRvb2wgfSBmcm9tIFwiQHRyeXJldG9vbC9jdXN0b20tY29tcG9uZW50LXN1cHBvcnRcIjtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUeXBlc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFRlc3REYXRhIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkdXJhdGlvbjogbnVtYmVyO1xyXG4gIG93bmVyOiBzdHJpbmc7XHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuICBub3Rlczogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpb3JpdHlfb3JkZXI6IG51bWJlciB8IG51bGw7XHJcbiAgYWxsb2NhdGlvbl9pZDogbnVtYmVyIHwgbnVsbDtcclxuICBhc3NpZ25lZF9wYXJ0czogc3RyaW5nIHwgbnVsbDtcclxuICBwYXJ0X3JlYWR5X2RhdGU6IHN0cmluZyB8IG51bGw7XHJcbiAgcGFydF9zdGF0dXM6IHN0cmluZztcclxuICB0ZXN0X3N0YXJ0ZWRfZGF0ZTogc3RyaW5nIHwgbnVsbDtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7IC8vIGFsbG93IGFyYml0cmFyeSBmaWVsZHMgZm9yIHRlbXBsYXRlIHJlc29sdXRpb25cclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YW5kRGVmIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIEludGVybmFsU3RhbmQge1xyXG4gIGlkOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHRlc3RzOiBUZXN0RGF0YVtdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgU2NoZWR1bGVkVGVzdCBleHRlbmRzIFRlc3REYXRhIHtcclxuICBzdGFydDogRGF0ZTtcclxuICBlbmQ6IERhdGU7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnNlcnRJbmRpY2F0b3Ige1xyXG4gIHN0YW5kSWQ6IG51bWJlciB8IHN0cmluZztcclxuICBpbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQWxsb2NhdGlvblJlY29yZCB7XHJcbiAgdGVzdF9pZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBwcmlvcml0eV9vcmRlcjogbnVtYmVyO1xyXG59XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gVGVtcGxhdGUgUmVzb2x1dGlvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgZm9ybWF0RmllbGRWYWx1ZSA9ICh2YWw6IGFueSk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09ICcnIHx8IHZhbCA9PT0gJ25hbicpIHJldHVybiAnJztcclxuICBjb25zdCBzdHIgPSBTdHJpbmcodmFsKTtcclxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfS8udGVzdChzdHIpKSB7XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoc3RyKTtcclxuICAgIGlmICghaXNOYU4oZC5nZXRUaW1lKCkpKSB7XHJcbiAgICAgIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JyB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHN0cjtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVUZW1wbGF0ZSA9ICh0ZW1wbGF0ZTogYW55LCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogc3RyaW5nID0+IHtcclxuICBpZiAoIXRlbXBsYXRlKSByZXR1cm4gJyc7XHJcbiAgY29uc3Qgc3RyID0gdHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyA/IHRlbXBsYXRlIDogU3RyaW5nKHRlbXBsYXRlKTtcclxuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAoXywgZmllbGQpID0+IGZvcm1hdEZpZWxkVmFsdWUoZGF0YVtmaWVsZF0pKTtcclxufTtcclxuXHJcbmNvbnN0IGlzVGVtcGxhdGVFbXB0eSA9ICh0ZW1wbGF0ZTogYW55LCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgc3RyID0gdHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyA/IHRlbXBsYXRlIDogU3RyaW5nKHRlbXBsYXRlIHx8ICcnKTtcclxuICBjb25zdCByZXNvbHZlZCA9IHJlc29sdmVUZW1wbGF0ZShzdHIsIGRhdGEpO1xyXG4gIGNvbnN0IHN0YXRpY09ubHkgPSBzdHIucmVwbGFjZSgvXFx7KFxcdyspXFx9L2csICcnKTtcclxuICByZXR1cm4gcmVzb2x2ZWQudHJpbSgpID09PSBzdGF0aWNPbmx5LnRyaW0oKSB8fCByZXNvbHZlZC50cmltKCkgPT09ICcnO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIERhdGUgVXRpbGl0aWVzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBNU19QRVJfSE9VUiA9IDM2MDAwMDA7XHJcblxyXG5jb25zdCBwYXJzZUxvY2FsRGF0ZSA9IChkYXRlU3RyOiBzdHJpbmcgfCBudWxsKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghZGF0ZVN0cikgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcGFydHMgPSBkYXRlU3RyLnNwbGl0KCctJykubWFwKE51bWJlcik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKHBhcnRzWzBdLCBwYXJ0c1sxXSAtIDEsIHBhcnRzWzJdLCAwLCAwLCAwLCAwKTtcclxufTtcclxuXHJcbmNvbnN0IHRvTWlkbmlnaHQgPSAoZGF0ZTogRGF0ZSk6IERhdGUgPT4ge1xyXG4gIGNvbnN0IGQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICBkLnNldEhvdXJzKDAsIDAsIDAsIDApO1xyXG4gIHJldHVybiBkO1xyXG59O1xyXG5cclxuY29uc3QgaXNXb3JrRGF5ID0gKGQ6IERhdGUpOiBib29sZWFuID0+IGQuZ2V0RGF5KCkgIT09IDAgJiYgZC5nZXREYXkoKSAhPT0gNjtcclxuXHJcbmNvbnN0IGdldE5leHRXb3JrZGF5U3RhcnQgPSAoZGF0ZTogRGF0ZSwgd29ya1N0YXJ0OiBudW1iZXIpOiBEYXRlID0+IHtcclxuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgZC5zZXRIb3Vycyh3b3JrU3RhcnQsIDAsIDAsIDApO1xyXG4gIHdoaWxlIChkLmdldERheSgpID09PSAwIHx8IGQuZ2V0RGF5KCkgPT09IDYpIHtcclxuICAgIGQuc2V0RGF0ZShkLmdldERhdGUoKSArIDEpO1xyXG4gIH1cclxuICByZXR1cm4gZDtcclxufTtcclxuXHJcbmNvbnN0IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQgPSAoXHJcbiAgcHJldlRlc3RFbmQ6IERhdGUsXHJcbiAgY2hhbmdlb3ZlckhvdXJzOiBudW1iZXIsXHJcbiAgd29ya1N0YXJ0OiBudW1iZXIsXHJcbiAgd29ya0VuZDogbnVtYmVyXHJcbik6IERhdGUgPT4ge1xyXG4gIGxldCBjaGFuZ2VvdmVyU3RhcnQgPSBuZXcgRGF0ZShwcmV2VGVzdEVuZCk7XHJcblxyXG4gIGlmICghaXNXb3JrRGF5KGNoYW5nZW92ZXJTdGFydCkgfHwgY2hhbmdlb3ZlclN0YXJ0LmdldEhvdXJzKCkgPj0gd29ya0VuZCkge1xyXG4gICAgY2hhbmdlb3ZlclN0YXJ0ID0gZ2V0TmV4dFdvcmtkYXlTdGFydChuZXcgRGF0ZShjaGFuZ2VvdmVyU3RhcnQuZ2V0VGltZSgpICsgTVNfUEVSX0hPVVIgKiAxMiksIHdvcmtTdGFydCk7XHJcbiAgfSBlbHNlIGlmIChjaGFuZ2VvdmVyU3RhcnQuZ2V0SG91cnMoKSA8IHdvcmtTdGFydCkge1xyXG4gICAgY2hhbmdlb3ZlclN0YXJ0LnNldEhvdXJzKHdvcmtTdGFydCwgMCwgMCwgMCk7XHJcbiAgfVxyXG5cclxuICBsZXQgcmVtYWluaW5nID0gY2hhbmdlb3ZlckhvdXJzO1xyXG4gIGxldCBlbmQgPSBuZXcgRGF0ZShjaGFuZ2VvdmVyU3RhcnQpO1xyXG5cclxuICB3aGlsZSAocmVtYWluaW5nID4gMCkge1xyXG4gICAgaWYgKCFpc1dvcmtEYXkoZW5kKSkge1xyXG4gICAgICBlbmQgPSBnZXROZXh0V29ya2RheVN0YXJ0KG5ldyBEYXRlKGVuZC5nZXRUaW1lKCkgKyBNU19QRVJfSE9VUiAqIDEyKSwgd29ya1N0YXJ0KTtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBhdmFpbGFibGUgPSB3b3JrRW5kIC0gZW5kLmdldEhvdXJzKCk7XHJcbiAgICBjb25zdCBhcHBseSA9IE1hdGgubWluKHJlbWFpbmluZywgYXZhaWxhYmxlKTtcclxuICAgIGVuZC5zZXRUaW1lKGVuZC5nZXRUaW1lKCkgKyBhcHBseSAqIE1TX1BFUl9IT1VSKTtcclxuICAgIHJlbWFpbmluZyAtPSBhcHBseTtcclxuICAgIGlmIChyZW1haW5pbmcgPiAwKSB7XHJcbiAgICAgIGVuZCA9IGdldE5leHRXb3JrZGF5U3RhcnQobmV3IERhdGUoZW5kLmdldFRpbWUoKSArIE1TX1BFUl9IT1VSICogMTIpLCB3b3JrU3RhcnQpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZW5kO1xyXG59O1xyXG5cclxuY29uc3QgZ2VuZXJhdGVEYXlzID0gKHN0YXJ0OiBEYXRlLCBudW1EYXlzOiBudW1iZXIpOiBEYXRlW10gPT4ge1xyXG4gIGNvbnN0IGRheXM6IERhdGVbXSA9IFtdO1xyXG4gIGxldCBjdXIgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1EYXlzOyBpKyspIHtcclxuICAgIGRheXMucHVzaChuZXcgRGF0ZShjdXIpKTtcclxuICAgIGN1ci5zZXREYXRlKGN1ci5nZXREYXRlKCkgKyAxKTtcclxuICB9XHJcbiAgcmV0dXJuIGRheXM7XHJcbn07XHJcblxyXG5jb25zdCBnZW5lcmF0ZVdlZWtzID0gKHN0YXJ0OiBEYXRlLCBudW1EYXlzOiBudW1iZXIpOiBEYXRlW10gPT4ge1xyXG4gIGNvbnN0IHJlc3VsdDogRGF0ZVtdID0gW107XHJcbiAgbGV0IGN1ciA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICB3aGlsZSAoY3VyLmdldERheSgpICE9PSAxKSBjdXIuc2V0RGF0ZShjdXIuZ2V0RGF0ZSgpIC0gMSk7XHJcbiAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICBlbmREYXRlLnNldERhdGUoZW5kRGF0ZS5nZXREYXRlKCkgKyBudW1EYXlzKTtcclxuICB3aGlsZSAoY3VyIDwgZW5kRGF0ZSkge1xyXG4gICAgcmVzdWx0LnB1c2gobmV3IERhdGUoY3VyKSk7XHJcbiAgICBjdXIuc2V0RGF0ZShjdXIuZ2V0RGF0ZSgpICsgNyk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jb25zdCBob3Vyc0JldHdlZW4gPSAoYTogRGF0ZSwgYjogRGF0ZSk6IG51bWJlciA9PiAoYi5nZXRUaW1lKCkgLSBhLmdldFRpbWUoKSkgLyBNU19QRVJfSE9VUjtcclxuY29uc3QgZm9ybWF0V2VlayA9IChkOiBEYXRlKTogc3RyaW5nID0+IGBXL0MgJHtkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JyB9KX1gO1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFBhcnQgU3RhdHVzIExvZ2ljXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBub3JtYWxpemVQYXJ0U3RhdHVzID0gKHJhd1N0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBpZiAoIXJhd1N0YXR1cyB8fCByYXdTdGF0dXMgPT09ICduYW4nKSByZXR1cm4gJ0luIFByb2dyZXNzJztcclxuICBjb25zdCBsb3dlciA9IHJhd1N0YXR1cy50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICBpZiAobG93ZXIgPT09ICdyZWFkeScpIHJldHVybiAnUmVhZHknO1xyXG4gIGlmIChsb3dlciA9PT0gJ3BhcnRzIG5vdCBhc3NpZ25lZCcpIHJldHVybiAnUGFydHMgTm90IEFzc2lnbmVkJztcclxuICByZXR1cm4gJ0luIFByb2dyZXNzJztcclxufTtcclxuXHJcbmNvbnN0IGdldENhbGN1bGF0ZWRTdGF0dXMgPSAodGVzdDogVGVzdERhdGEsIHRlc3RTdGFydERhdGU6IERhdGUgfCBudWxsID0gbnVsbCk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgYmFzZVN0YXR1cyA9IG5vcm1hbGl6ZVBhcnRTdGF0dXModGVzdC5wYXJ0X3N0YXR1cyk7XHJcbiAgaWYgKGJhc2VTdGF0dXMgPT09ICdSZWFkeScpIHJldHVybiAnUmVhZHknO1xyXG4gIGlmIChiYXNlU3RhdHVzID09PSAnUGFydHMgTm90IEFzc2lnbmVkJykgcmV0dXJuICdQYXJ0cyBOb3QgQXNzaWduZWQnO1xyXG5cclxuICBpZiAodGVzdFN0YXJ0RGF0ZSAmJiB0ZXN0LnBhcnRfcmVhZHlfZGF0ZSkge1xyXG4gICAgY29uc3QgcmVhZHlEYXRlID0gcGFyc2VMb2NhbERhdGUodGVzdC5wYXJ0X3JlYWR5X2RhdGUpO1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gdG9NaWRuaWdodCh0ZXN0U3RhcnREYXRlKTtcclxuICAgIGlmIChyZWFkeURhdGUgJiYgc3RhcnREYXRlKSB7XHJcbiAgICAgIHJldHVybiByZWFkeURhdGUuZ2V0VGltZSgpID4gc3RhcnREYXRlLmdldFRpbWUoKSA/ICdEZWxheWVkJyA6ICdPbiBUaW1lJztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuICdJbiBQcm9ncmVzcyc7XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU3R5bGluZ1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgaXNSdW5uaW5nVGVzdCA9ICh0ZXN0OiBUZXN0RGF0YSk6IGJvb2xlYW4gPT4gdGVzdC5zdGF0dXMgPT09ICdSdW5uaW5nJztcclxuXHJcbmNvbnN0IHN0YXR1c0NhcENvbG9yczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICAnUnVubmluZyc6ICcjOTMzM0VBJyxcclxuICAnUmVhZHknOiAnIzIyQzU1RScsXHJcbiAgJ09uIFRpbWUnOiAnI0U1QTAwRCcsXHJcbiAgJ0RlbGF5ZWQnOiAnI0VGNDQ0NCcsXHJcbiAgJ1BhcnRzIE5vdCBBc3NpZ25lZCc6ICcjOUNBM0FGJyxcclxuICAnSW4gUHJvZ3Jlc3MnOiAnI0QxRDVEQicsXHJcbn07XHJcblxyXG5jb25zdCBzdGF0dXNUZXh0Q29sb3JzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICdSdW5uaW5nJzogJyM3RTIyQ0UnLFxyXG4gICdSZWFkeSc6ICcjMTZBMzRBJyxcclxuICAnT24gVGltZSc6ICcjQjQ1MzA5JyxcclxuICAnRGVsYXllZCc6ICcjREMyNjI2JyxcclxuICAnUGFydHMgTm90IEFzc2lnbmVkJzogJyM2QjcyODAnLFxyXG4gICdJbiBQcm9ncmVzcyc6ICcjOUNBM0FGJyxcclxufTtcclxuXHJcbmNvbnN0IGdldENhcENvbG9yID0gKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IHN0YXR1c0NhcENvbG9yc1tzdGF0dXNdIHx8IHN0YXR1c0NhcENvbG9yc1snSW4gUHJvZ3Jlc3MnXTtcclxuY29uc3QgZ2V0U3RhdHVzVGV4dENvbG9yID0gKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IHN0YXR1c1RleHRDb2xvcnNbc3RhdHVzXSB8fCBzdGF0dXNUZXh0Q29sb3JzWydJbiBQcm9ncmVzcyddO1xyXG5cclxuLy8gUmV0dXJucyAnUnVubmluZycgZm9yIFJ1bm5pbmcgdGVzdHMgKG92ZXJyaWRlcyBwYXJ0IHN0YXR1cyBmb3IgZGlzcGxheSBjb2xvdXJzKVxyXG5jb25zdCBnZXREaXNwbGF5U3RhdHVzID0gKHRlc3Q6IFRlc3REYXRhLCB0ZXN0U3RhcnREYXRlOiBEYXRlIHwgbnVsbCA9IG51bGwpOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChpc1J1bm5pbmdUZXN0KHRlc3QpKSByZXR1cm4gJ1J1bm5pbmcnO1xyXG4gIHJldHVybiBnZXRDYWxjdWxhdGVkU3RhdHVzKHRlc3QsIHRlc3RTdGFydERhdGUpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UHJpb3JpdHlUZXh0Q29sb3IgPSAocHJpb3JpdHk6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gdHlwZW9mIHByaW9yaXR5ID09PSAnbnVtYmVyJyA/IHByaW9yaXR5IDogNTA7XHJcbiAgY29uc3QgY2xhbXBlZCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgdmFsdWUpKTtcclxuICBpZiAoY2xhbXBlZCA8PSAzMCkgcmV0dXJuICcjNkI3MjgwJzsgLy8gZ3JleSBmb3IgbG93IHByaW9yaXR5XHJcbiAgaWYgKGNsYW1wZWQgPD0gNjApIHJldHVybiAnI0Y1OUUwQic7IC8vIG9yYW5nZSBmb3IgbWVkaXVtXHJcbiAgaWYgKGNsYW1wZWQgPD0gODApIHJldHVybiAnI0VBNTgwQyc7IC8vIGRhcmsgb3JhbmdlIGZvciBoaWdoXHJcbiAgcmV0dXJuICcjREMyNjI2JzsgLy8gcmVkIGZvciBjcml0aWNhbFxyXG59O1xyXG5cclxuLy8gS2VlcCBvbGQgZ2V0UHJpb3JpdHlDb2xvciBmb3Igc2lkZWJhciBjYXJkc1xyXG5jb25zdCBnZXRQcmlvcml0eUNvbG9yID0gKHByaW9yaXR5OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBwcmlvcml0eSA9PT0gJ251bWJlcicgPyBwcmlvcml0eSA6IDUwO1xyXG4gIGNvbnN0IGNsYW1wZWQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHZhbHVlKSk7XHJcbiAgY29uc3QgcmF0aW8gPSBjbGFtcGVkIC8gMTAwO1xyXG4gIGNvbnN0IGcgPSBNYXRoLnJvdW5kKDI1NSAqICgxIC0gcmF0aW8pKTtcclxuICBjb25zdCBiID0gTWF0aC5yb3VuZCgyNTUgKiAoMSAtIHJhdGlvKSk7XHJcbiAgcmV0dXJuIGByZ2JhKDI1NSwgJHtnfSwgJHtifSwgMC42KWA7XHJcbn07XHJcblxyXG5jb25zdCBzdHlsZXMgPSB7XHJcbiAgY29udGFpbmVyOiB7IGRpc3BsYXk6ICdmbGV4JywgaGVpZ2h0OiAnMTAwJScsIGJhY2tncm91bmQ6ICcjRjlGQUZCJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBmb250RmFtaWx5OiBcIidETSBTYW5zJywgc2Fucy1zZXJpZlwiIH0gYXMgUmVhY3QuQ1NTUHJvcGVydGllcyxcclxuICBzaWRlYmFyOiB7IHdpZHRoOiAzMjAsIG1pbldpZHRoOiAzMjAsIGJhY2tncm91bmQ6ICcjRkZGRkZGJywgYm9yZGVyUmlnaHQ6ICcxcHggc29saWQgI0U1RTdFQicsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfSBhcyBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxyXG4gIG1vbm86IHsgZm9udEZhbWlseTogXCInSmV0QnJhaW5zIE1vbm8nLCBtb25vc3BhY2VcIiB9IGFzIFJlYWN0LkNTU1Byb3BlcnRpZXMsXHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU3ViLWNvbXBvbmVudHNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IEluc2VydExpbmU6IEZDID0gKCkgPT4gKFxyXG4gIDxkaXYgc3R5bGU9e3tcclxuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDIsIGJvdHRvbTogMiwgd2lkdGg6IDMsXHJcbiAgICBiYWNrZ3JvdW5kOiAnIzNCODJGNicsIGJvcmRlclJhZGl1czogMiwgekluZGV4OiAzMCxcclxuICAgIGJveFNoYWRvdzogJzAgMCAxMnB4ICMzQjgyRjYsIDAgMCA0cHggIzNCODJGNicsXHJcbiAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcbiAgfX0+XHJcbiAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IC00LCBsZWZ0OiAtNCwgd2lkdGg6IDExLCBoZWlnaHQ6IDExLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiAnIzNCODJGNicgfX0gLz5cclxuICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGJvdHRvbTogLTQsIGxlZnQ6IC00LCB3aWR0aDogMTEsIGhlaWdodDogMTEsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6ICcjM0I4MkY2JyB9fSAvPlxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuY29uc3QgT3V0bGluZUtleTogRkMgPSAoKSA9PiAoXHJcbiAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNnB4JywgYm9yZGVyVG9wOiAnMXB4IHNvbGlkICNFNUU3RUInLCBiYWNrZ3JvdW5kOiAnI0Y5RkFGQicgfX0+XHJcbiAgICA8aDMgc3R5bGU9e3sgLi4uc3R5bGVzLm1vbm8sIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnMC4wOGVtJywgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsIGNvbG9yOiAnIzRCNTU2MycsIG1hcmdpbkJvdHRvbTogNiB9fT5TdGF0dXMgS2V5PC9oMz5cclxuICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4V3JhcDogJ3dyYXAnLCBnYXA6ICc0cHggMCcgfX0+XHJcbiAgICAgIHsoWydSdW5uaW5nJywgJ1JlYWR5JywgJ09uIFRpbWUnLCAnRGVsYXllZCcsICdQYXJ0cyBOb3QgQXNzaWduZWQnXSBhcyBjb25zdCkubWFwKChrZXkpID0+IChcclxuICAgICAgICA8ZGl2IGtleT17a2V5fSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDYsIHdpZHRoOiAnNTAlJywgbWluV2lkdGg6IDAgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA0LCBoZWlnaHQ6IDE0LCBiYWNrZ3JvdW5kOiBzdGF0dXNDYXBDb2xvcnNba2V5XSwgYm9yZGVyUmFkaXVzOiAyLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubW9ubywgZm9udFNpemU6IDksIGNvbG9yOiBnZXRTdGF0dXNUZXh0Q29sb3Ioa2V5KSwgZm9udFdlaWdodDogNjAwLCB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycgfX0+e2tleS50b1VwcGVyQ2FzZSgpfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSl9XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDdXN0b20gVG9vbHRpcCBDb21wb25lbnRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmludGVyZmFjZSBUb29sdGlwV3JhcHBlclByb3BzIHtcclxuICB0ZXN0TmFtZTogc3RyaW5nO1xyXG4gIHByaW9yaXR5OiBudW1iZXI7XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgdG9vbHRpcExpbmVzOiBzdHJpbmc7XHJcbiAgc2NoZWR1bGVkPzogeyBzdGFydDogRGF0ZTsgZW5kOiBEYXRlIH0gfCBudWxsO1xyXG4gIHdyYXBwZXJTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxufVxyXG5cclxuY29uc3QgVG9vbHRpcFdyYXBwZXI6IEZDPFRvb2x0aXBXcmFwcGVyUHJvcHM+ID0gKHsgdGVzdE5hbWUsIHByaW9yaXR5LCBzdGF0dXMsIHRvb2x0aXBMaW5lcywgc2NoZWR1bGVkLCB3cmFwcGVyU3R5bGUsIGNoaWxkcmVuIH0pID0+IHtcclxuICBjb25zdCBbc2hvdywgc2V0U2hvd10gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Bvcywgc2V0UG9zXSA9IFJlYWN0LnVzZVN0YXRlKHsgeDogMCwgeTogMCwgYm90dG9tOiAwIH0pO1xyXG4gIGNvbnN0IFtmbGlwcGVkLCBzZXRGbGlwcGVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCB0aW1lb3V0UmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHdyYXBSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xyXG4gIGNvbnN0IHRpcFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVudGVyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHdyYXBSZWYuY3VycmVudCkge1xyXG4gICAgICBjb25zdCByZWN0ID0gd3JhcFJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBzZXRQb3MoeyB4OiByZWN0LmxlZnQgKyByZWN0LndpZHRoIC8gMiwgeTogcmVjdC50b3AsIGJvdHRvbTogcmVjdC5ib3R0b20gfSk7XHJcbiAgICB9XHJcbiAgICB0aW1lb3V0UmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBzZXRTaG93KHRydWUpLCA0MDApO1xyXG4gIH0sIFtdKTtcclxuICBjb25zdCBoYW5kbGVMZWF2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICh0aW1lb3V0UmVmLmN1cnJlbnQpIGNsZWFyVGltZW91dCh0aW1lb3V0UmVmLmN1cnJlbnQpO1xyXG4gICAgc2V0U2hvdyhmYWxzZSk7XHJcbiAgICBzZXRGbGlwcGVkKGZhbHNlKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIC8vIEFmdGVyIHRvb2x0aXAgcmVuZGVycywgY2hlY2sgaWYgaXQgY2xpcHMgYWJvdmUgdGhlIHZpZXdwb3J0IGFuZCBmbGlwIGlmIG5lZWRlZFxyXG4gIFJlYWN0LnVzZUxheW91dEVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc2hvdyAmJiB0aXBSZWYuY3VycmVudCkge1xyXG4gICAgICBjb25zdCByZWN0ID0gdGlwUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGlmIChyZWN0LnRvcCA8IDApIHtcclxuICAgICAgICBzZXRGbGlwcGVkKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSwgW3Nob3csIHBvc10pO1xyXG5cclxuICBjb25zdCBsaW5lcyA9IHRvb2x0aXBMaW5lcy5zcGxpdCgnXFxuJykuZmlsdGVyKGwgPT4ge1xyXG4gICAgY29uc3QgcGFydHMgPSBsLnNwbGl0KCc6Jyk7XHJcbiAgICBpZiAocGFydHMubGVuZ3RoIDwgMikgcmV0dXJuIGwudHJpbSgpICE9PSAnJztcclxuICAgIHJldHVybiBwYXJ0cy5zbGljZSgxKS5qb2luKCc6JykudHJpbSgpICE9PSAnJztcclxuICB9KTtcclxuXHJcbiAgY29uc3QgdG9vbHRpcENvbnRlbnQgPSAoXHJcbiAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgIGJhY2tncm91bmQ6ICcjRkZGRkZGJyxcclxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNFNUU3RUInLFxyXG4gICAgICBib3JkZXJSYWRpdXM6IDEwLFxyXG4gICAgICBib3hTaGFkb3c6ICcwIDRweCAxNnB4IHJnYmEoMCwwLDAsMC4xMiksIDAgMXB4IDRweCByZ2JhKDAsMCwwLDAuMDYpJyxcclxuICAgICAgcGFkZGluZzogJzEycHggMTZweCcsXHJcbiAgICAgIG1heFdpZHRoOiAzMDAsXHJcbiAgICAgIG1pbldpZHRoOiAxODAsXHJcbiAgICB9fT5cclxuICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6ICcjMTExODI3JywgbWFyZ2luQm90dG9tOiA2LCBsaW5lSGVpZ2h0OiAxLjMgfX0+XHJcbiAgICAgICAge3Rlc3ROYW1lfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogMTAsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206IDggfX0+XHJcbiAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IDEzLCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiBnZXRQcmlvcml0eVRleHRDb2xvcihwcmlvcml0eSkgfX0+XHJcbiAgICAgICAgICBQe3ByaW9yaXR5fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA3MDAsXHJcbiAgICAgICAgICBjb2xvcjogZ2V0U3RhdHVzVGV4dENvbG9yKHN0YXR1cyksXHJcbiAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyBhcyBjb25zdCxcclxuICAgICAgICAgIGxldHRlclNwYWNpbmc6ICcwLjA1ZW0nLFxyXG4gICAgICAgICAgcGFkZGluZzogJzFweCA2cHgnLFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogYCR7Z2V0Q2FwQ29sb3Ioc3RhdHVzKX0xOGAsXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IDQsXHJcbiAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHtnZXRDYXBDb2xvcihzdGF0dXMpfTQwYCxcclxuICAgICAgICB9fT5cclxuICAgICAgICAgIHtzdGF0dXN9XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IDEsIGJhY2tncm91bmQ6ICcjRTVFN0VCJywgbWFyZ2luOiAnMCAtNHB4IDhweCcgfX0gLz5cclxuICAgICAge2xpbmVzLm1hcCgobGluZSwgaSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbG9uSWR4ID0gbGluZS5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgaWYgKGNvbG9uSWR4ID09PSAtMSkgcmV0dXJuIChcclxuICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBmb250U2l6ZTogMTEsIGNvbG9yOiAnIzM3NDE1MScsIG1hcmdpbkJvdHRvbTogMywgbGluZUhlaWdodDogMS40IH19PntsaW5lfTwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSBsaW5lLnNsaWNlKDAsIGNvbG9uSWR4KS50cmltKCk7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBsaW5lLnNsaWNlKGNvbG9uSWR4ICsgMSkudHJpbSgpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIGZvbnRTaXplOiAxMSwgbWFyZ2luQm90dG9tOiAzLCBsaW5lSGVpZ2h0OiAxLjQgfX0+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAnIzZCNzI4MCcsIGZvbnRXZWlnaHQ6IDUwMCwgZmxleFNocmluazogMCB9fT57bGFiZWx9Ojwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICcjMTExODI3JywgZm9udFdlaWdodDogNDAwIH19Pnt2YWx1ZX08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgICB9KX1cclxuICAgICAge3NjaGVkdWxlZCAmJiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiAxLCBiYWNrZ3JvdW5kOiAnI0U1RTdFQicsIG1hcmdpbjogJzZweCAtNHB4IDZweCcgfX0gLz5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIGZvbnRTaXplOiAxMSwgbWFyZ2luQm90dG9tOiAyIH19PlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJyM2QjcyODAnLCBmb250V2VpZ2h0OiA1MDAgfX0+U3RhcnRzOjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICcjMTExODI3JyB9fT57c2NoZWR1bGVkLnN0YXJ0LnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JywgeWVhcjogJ251bWVyaWMnIH0pfTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgZm9udFNpemU6IDExIH19PlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJyM2QjcyODAnLCBmb250V2VpZ2h0OiA1MDAgfX0+RW5kczo8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAnIzExMTgyNycgfX0+e3NjaGVkdWxlZC5lbmQudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1HQicsIHsgZGF5OiAnMi1kaWdpdCcsIG1vbnRoOiAnc2hvcnQnLCB5ZWFyOiAnbnVtZXJpYycgfSl9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG5cclxuICAvLyBBcnJvdyBwb2ludGluZyB1cCAod2hlbiB0b29sdGlwIGlzIGJlbG93KSBvciBkb3duICh3aGVuIGFib3ZlKVxyXG4gIGNvbnN0IGFycm93RG93biA9IChcclxuICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwLCBiYWNrZ3JvdW5kOiAnI0ZGRkZGRicsXHJcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjRTVFN0VCJywgYm9yZGVyVG9wOiAnbm9uZScsIGJvcmRlckxlZnQ6ICdub25lJyxcclxuICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDQ1ZGVnKScsXHJcbiAgICAgIG1hcmdpbjogJy02cHggYXV0byAwJyxcclxuICAgIH19IC8+XHJcbiAgKTtcclxuICBjb25zdCBhcnJvd1VwID0gKFxyXG4gICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICB3aWR0aDogMTAsIGhlaWdodDogMTAsIGJhY2tncm91bmQ6ICcjRkZGRkZGJyxcclxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNFNUU3RUInLCBib3JkZXJCb3R0b206ICdub25lJywgYm9yZGVyUmlnaHQ6ICdub25lJyxcclxuICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDQ1ZGVnKScsXHJcbiAgICAgIG1hcmdpbjogJzAgYXV0byAtNnB4JyxcclxuICAgIH19IC8+XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgcmVmPXt3cmFwUmVmfSBvbk1vdXNlRW50ZXI9e2hhbmRsZUVudGVyfSBvbk1vdXNlTGVhdmU9e2hhbmRsZUxlYXZlfSBzdHlsZT17d3JhcHBlclN0eWxlIHx8IHsgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgICAge3Nob3cgJiYgKFxyXG4gICAgICAgIDxkaXYgcmVmPXt0aXBSZWZ9IHN0eWxlPXt7XHJcbiAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgIGxlZnQ6IHBvcy54LFxyXG4gICAgICAgICAgdG9wOiBmbGlwcGVkID8gcG9zLmJvdHRvbSArIDggOiBwb3MueSAtIDgsXHJcbiAgICAgICAgICB0cmFuc2Zvcm06IGZsaXBwZWQgPyAndHJhbnNsYXRlKC01MCUsIDApJyA6ICd0cmFuc2xhdGUoLTUwJSwgLTEwMCUpJyxcclxuICAgICAgICAgIHpJbmRleDogMTAwMCwgcG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG4gICAgICAgIH19PlxyXG4gICAgICAgICAge2ZsaXBwZWQgPyAoXHJcbiAgICAgICAgICAgIDw+e2Fycm93VXB9e3Rvb2x0aXBDb250ZW50fTwvPlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPD57dG9vbHRpcENvbnRlbnR9e2Fycm93RG93bn08Lz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFsbG9jYXRpb24gSGVscGVyc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgYnVpbGRBbGxvY2F0aW9ucyA9IChzdGFuZHM6IEludGVybmFsU3RhbmRbXSk6IEFsbG9jYXRpb25SZWNvcmRbXSA9PiB7XHJcbiAgY29uc3QgYWxsb2NhdGlvbnM6IEFsbG9jYXRpb25SZWNvcmRbXSA9IFtdO1xyXG4gIHN0YW5kcy5mb3JFYWNoKHN0YW5kID0+IHtcclxuICAgIHN0YW5kLnRlc3RzLmZvckVhY2goKHRlc3QsIGlkeCkgPT4ge1xyXG4gICAgICBhbGxvY2F0aW9ucy5wdXNoKHtcclxuICAgICAgICB0ZXN0X2lkOiB0ZXN0LmlkLFxyXG4gICAgICAgIHRlc3Rfc3RhbmRfaWQ6IHN0YW5kLmlkLFxyXG4gICAgICAgIHByaW9yaXR5X29yZGVyOiBpZHggKyAxLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiBhbGxvY2F0aW9ucztcclxufTtcclxuXHJcbmNvbnN0IGFsbG9jYXRpb25zS2V5ID0gKGFsbG9jczogQWxsb2NhdGlvblJlY29yZFtdKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYWxsb2NzLm1hcChhID0+IGAke2EudGVzdF9pZH06JHthLnRlc3Rfc3RhbmRfaWR9OiR7YS5wcmlvcml0eV9vcmRlcn1gKS5zb3J0KCkpO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIE1haW4gQ29tcG9uZW50XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5leHBvcnQgY29uc3QgVGVzdFN0YW5kU2NoZWR1bGVyOiBGQyA9ICgpID0+IHtcclxuICAvLyBcdTI1MDBcdTI1MDAgSW5wdXQgZGF0YSBmcm9tIFJldG9vbCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbaW5wdXRUZXN0c10gPSBSZXRvb2wudXNlU3RhdGVBcnJheSh7XHJcbiAgICBuYW1lOiBcInRlc3RzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIlRlc3RzIERhdGFcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIHRlc3Qgb2JqZWN0cyBmcm9tIGdldFNjaGVkdWxlckRhdGEgcXVlcnlcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2lucHV0U3RhbmRzXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwidGVzdFN0YW5kc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJUZXN0IFN0YW5kcyBEYXRhXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiB0ZXN0IHN0YW5kIG9iamVjdHMgZnJvbSBnZXRUZXN0U3RhbmRzIHF1ZXJ5XCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBDb25maWd1cmF0aW9uIHByb3BlcnRpZXMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW3NhdmVNb2RlXSA9IFJldG9vbC51c2VTdGF0ZUVudW1lcmF0aW9uKHtcclxuICAgIG5hbWU6IFwic2F2ZU1vZGVcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJiYXRjaFwiLFxyXG4gICAgZW51bURlZmluaXRpb246IFtcImJhdGNoXCIsIFwibGl2ZVwiXSxcclxuICAgIGluc3BlY3RvcjogXCJzZWdtZW50ZWRcIixcclxuICAgIGxhYmVsOiBcIlNhdmUgTW9kZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiYmF0Y2ggPSBzYXZlIGJ1dHRvbiwgbGl2ZSA9IGVtaXQgb24gZXZlcnkgY2hhbmdlXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtjaGFuZ2VvdmVySG91cnNdID0gUmV0b29sLnVzZVN0YXRlTnVtYmVyKHtcclxuICAgIG5hbWU6IFwiY2hhbmdlb3ZlckhvdXJzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IDMsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiQ2hhbmdlb3ZlciBIb3Vyc1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiSG91cnMgZm9yIGNoYW5nZW92ZXIgYmV0d2VlbiB0ZXN0cyAod29yayBob3VycyBvbmx5KVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbd29ya1N0YXJ0XSA9IFJldG9vbC51c2VTdGF0ZU51bWJlcih7XHJcbiAgICBuYW1lOiBcIndvcmtTdGFydFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiA5LFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIldvcmsgU3RhcnQgSG91clwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbd29ya0VuZF0gPSBSZXRvb2wudXNlU3RhdGVOdW1iZXIoe1xyXG4gICAgbmFtZTogXCJ3b3JrRW5kXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IDE3LFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIldvcmsgRW5kIEhvdXJcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2luaXRpYWxWaWV3V2Vla3NTdHJdID0gUmV0b29sLnVzZVN0YXRlRW51bWVyYXRpb24oe1xyXG4gICAgbmFtZTogXCJkZWZhdWx0Vmlld1dlZWtzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiNFwiLFxyXG4gICAgZW51bURlZmluaXRpb246IFtcIjJcIiwgXCI0XCIsIFwiOFwiLCBcIjEyXCIsIFwiMjRcIl0sXHJcbiAgICBpbnNwZWN0b3I6IFwic2VnbWVudGVkXCIsXHJcbiAgICBsYWJlbDogXCJEZWZhdWx0IFZpZXdcIixcclxuICB9KTtcclxuICBjb25zdCBpbml0aWFsVmlld1dlZWtzID0gTnVtYmVyKGluaXRpYWxWaWV3V2Vla3NTdHIpIHx8IDQ7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBDb25maWd1cmFibGUgZGlzcGxheSB0ZW1wbGF0ZXMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW2NhcmRNYWluVGV4dF0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjYXJkTWFpblRleHRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJ7bmFtZX1cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDYXJkIFRpdGxlXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3IgY2FyZCB0aXRsZS4gVXNlIHtmaWVsZE5hbWV9IGZvciBkYXRhIGZpZWxkcy5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2NhcmRTdWJUZXh0XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNhcmRTdWJUZXh0XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiUGFydHM6IHtwYXJ0X3JlYWR5X2RhdGV9XCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiQ2FyZCBTdWJ0aXRsZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiVGVtcGxhdGUgZm9yIHN1YnRpdGxlLiBIaWRkZW4gd2hlbiBhbGwgZmllbGRzIGFyZSBlbXB0eS5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2NhcmRJbmZvUm93XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNhcmRJbmZvUm93XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwie293bmVyfSBcXHUwMGI3IHtkdXJhdGlvbn1oIFxcdTAwYjcgUHtwcmlvcml0eX1cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDYXJkIEluZm8gUm93XCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3IgdGhlIGluZm8gcm93IHNob3duIG9uIGNhcmRzIGFuZCBiYXJzLlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbdG9vbHRpcFRlbXBsYXRlXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInRvb2x0aXBUZW1wbGF0ZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIk5vdGVzOiB7bm90ZXN9XFxuT3duZXI6IHtvd25lcn1cXG5Qcmlvcml0eToge3ByaW9yaXR5fVxcblBhcnQgU3RhdHVzOiB7cGFydF9zdGF0dXN9XFxuUGFydHMgRHVlOiB7cGFydF9yZWFkeV9kYXRlfVxcbkFzc2lnbmVkIFBhcnRzOiB7YXNzaWduZWRfcGFydHN9XCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiVG9vbHRpcCBUZW1wbGF0ZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiVGVtcGxhdGUgZm9yIGhvdmVyIHRvb2x0aXAuIFVzZSBcXFxcbiBmb3IgbmV3bGluZXMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBPdXRwdXQgc3RhdGUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgWywgc2V0QWxsb2NhdGlvbnNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJhbGxvY2F0aW9uc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkN1cnJlbnQgYWxsb2NhdGlvbiBzdGF0ZTogW3t0ZXN0X2lkLCB0ZXN0X3N0YW5kX2lkLCBwcmlvcml0eV9vcmRlcn1dXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldEFsbFRlc3RJZHNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJhbGxUZXN0SWRzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRlc3QgSURzIG1hbmFnZWQgYnkgdGhlIHNjaGVkdWxlciAoZm9yIHRoZSBkZWxldGUgc3RlcCBpbiBzYXZlKVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRIYXNVbnNhdmVkQ2hhbmdlc10gPSBSZXRvb2wudXNlU3RhdGVCb29sZWFuKHtcclxuICAgIG5hbWU6IFwiaGFzVW5zYXZlZENoYW5nZXNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJXaGV0aGVyIHRoZXJlIGFyZSB1bnNhdmVkIGFsbG9jYXRpb24gY2hhbmdlc1wiLFxyXG4gIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgRXZlbnRzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IG9uU2F2ZSA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvblNhdmVcIiB9KTtcclxuICBjb25zdCBvbkNoYW5nZSA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvbkNoYW5nZVwiIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQ29tcG9uZW50IHNldHRpbmdzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIFJldG9vbC51c2VDb21wb25lbnRTZXR0aW5ncyh7XHJcbiAgICBkZWZhdWx0SGVpZ2h0OiA2MDAsXHJcbiAgICBkZWZhdWx0V2lkdGg6IDEyLFxyXG4gIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgSW50ZXJuYWwgc3RhdGUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW3N0YW5kcywgc2V0U3RhbmRzXSA9IFJlYWN0LnVzZVN0YXRlPEludGVybmFsU3RhbmRbXT4oW10pO1xyXG4gIGNvbnN0IFt1bmFsbG9jYXRlZCwgc2V0VW5hbGxvY2F0ZWRdID0gUmVhY3QudXNlU3RhdGU8VGVzdERhdGFbXT4oW10pO1xyXG4gIGNvbnN0IFt2aWV3cG9ydFdlZWtzLCBzZXRWaWV3cG9ydFdlZWtzXSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oaW5pdGlhbFZpZXdXZWVrcyBhcyBudW1iZXIgfHwgNCk7XHJcbiAgY29uc3QgW2RyYWdnZWRUZXN0SWQsIHNldERyYWdnZWRUZXN0SWRdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nIHwgbnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2luc2VydEluZGljYXRvciwgc2V0SW5zZXJ0SW5kaWNhdG9yXSA9IFJlYWN0LnVzZVN0YXRlPEluc2VydEluZGljYXRvciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtxdWV1ZUluc2VydEluZGV4LCBzZXRRdWV1ZUluc2VydEluZGV4XSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtpc0RpcnR5LCBzZXRJc0RpcnR5XSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBvcmlnaW5hbEFsbG9jYXRpb25zUmVmID0gdXNlUmVmPHN0cmluZz4oJycpO1xyXG4gIGNvbnN0IHNjcm9sbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcbiAgY29uc3QgW3F1ZXVlU29ydCwgc2V0UXVldWVTb3J0XSA9IFJlYWN0LnVzZVN0YXRlPCdheicgfCAncHJpb3JpdHknIHwgJ3N0YXR1cyc+KCdheicpO1xyXG4gIGNvbnN0IFtxdWV1ZUZpbHRlciwgc2V0UXVldWVGaWx0ZXJdID0gUmVhY3QudXNlU3RhdGUoJycpO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgSW5pdGlhbGl6ZSBmcm9tIGlucHV0IGRhdGEgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgaW5wdXRLZXkgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gSlNPTi5zdHJpbmdpZnkoaW5wdXRUZXN0cykgKyBKU09OLnN0cmluZ2lmeShpbnB1dFN0YW5kcyksXHJcbiAgICBbaW5wdXRUZXN0cywgaW5wdXRTdGFuZHNdXHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHRlc3RzQXJyID0gQXJyYXkuaXNBcnJheShpbnB1dFRlc3RzKSA/IGlucHV0VGVzdHMgOiBbXTtcclxuICAgIGNvbnN0IHN0YW5kc0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRTdGFuZHMpID8gKGlucHV0U3RhbmRzIGFzIFN0YW5kRGVmW10pIDogW107XHJcblxyXG4gICAgaWYgKHN0YW5kc0Fyci5sZW5ndGggPT09IDAgJiYgdGVzdHNBcnIubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgLy8gQnVpbGQgc3RhbmQgbWFwXHJcbiAgICBjb25zdCBzdGFuZE1hcCA9IG5ldyBNYXA8bnVtYmVyIHwgc3RyaW5nLCBJbnRlcm5hbFN0YW5kPigpO1xyXG4gICAgc3RhbmRzQXJyLmZvckVhY2gocyA9PiBzdGFuZE1hcC5zZXQocy5pZCwgeyBpZDogcy5pZCwgbmFtZTogcy5uYW1lLCB0ZXN0czogW10gfSkpO1xyXG5cclxuICAgIC8vIEdyb3VwIHRlc3RzXHJcbiAgICBjb25zdCB1bmFsbG9jOiBUZXN0RGF0YVtdID0gW107XHJcbiAgICB0ZXN0c0Fyci5mb3JFYWNoKCh0OiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgdGVzdDogVGVzdERhdGEgPSB7XHJcbiAgICAgICAgaWQ6IHQuaWQsXHJcbiAgICAgICAgbmFtZTogdC5uYW1lIHx8ICcnLFxyXG4gICAgICAgIGR1cmF0aW9uOiB0LmR1cmF0aW9uIHx8IDcyLFxyXG4gICAgICAgIG93bmVyOiB0Lm93bmVyIHx8ICcnLFxyXG4gICAgICAgIHByaW9yaXR5OiB0LnByaW9yaXR5ID8/IDUwLFxyXG4gICAgICAgIG5vdGVzOiB0Lm5vdGVzIHx8ICcnLFxyXG4gICAgICAgIHN0YXR1czogdC5zdGF0dXMgfHwgJycsXHJcbiAgICAgICAgdGVzdF9zdGFuZF9pZDogdC50ZXN0X3N0YW5kX2lkLFxyXG4gICAgICAgIHByaW9yaXR5X29yZGVyOiB0LnByaW9yaXR5X29yZGVyLFxyXG4gICAgICAgIGFsbG9jYXRpb25faWQ6IHQuYWxsb2NhdGlvbl9pZCxcclxuICAgICAgICBhc3NpZ25lZF9wYXJ0czogdC5hc3NpZ25lZF9wYXJ0cyB8fCBudWxsLFxyXG4gICAgICAgIHBhcnRfcmVhZHlfZGF0ZTogdC5wYXJ0X3JlYWR5X2RhdGUgfHwgbnVsbCxcclxuICAgICAgICBwYXJ0X3N0YXR1czogdC5wYXJ0X3N0YXR1cyB8fCAnJyxcclxuICAgICAgICAuLi50LCAvLyBwcmVzZXJ2ZSBhbnkgZXh0cmEgZmllbGRzIGZvciB0ZW1wbGF0ZSByZXNvbHV0aW9uXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodGVzdC50ZXN0X3N0YW5kX2lkICE9IG51bGwgJiYgc3RhbmRNYXAuaGFzKHRlc3QudGVzdF9zdGFuZF9pZCkpIHtcclxuICAgICAgICBzdGFuZE1hcC5nZXQodGVzdC50ZXN0X3N0YW5kX2lkKSEudGVzdHMucHVzaCh0ZXN0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1bmFsbG9jLnB1c2godGVzdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNvcnQgZWFjaCBzdGFuZCdzIHRlc3RzIGJ5IHByaW9yaXR5X29yZGVyXHJcbiAgICBzdGFuZE1hcC5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICBzLnRlc3RzLnNvcnQoKGEsIGIpID0+IChhLnByaW9yaXR5X29yZGVyIHx8IDk5OSkgLSAoYi5wcmlvcml0eV9vcmRlciB8fCA5OTkpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG5ld1N0YW5kcyA9IHN0YW5kc0Fyci5tYXAocyA9PiBzdGFuZE1hcC5nZXQocy5pZCkhKTtcclxuICAgIHNldFN0YW5kcyhuZXdTdGFuZHMpO1xyXG4gICAgc2V0VW5hbGxvY2F0ZWQodW5hbGxvYyk7XHJcbiAgICBzZXRJc0RpcnR5KGZhbHNlKTtcclxuXHJcbiAgICAvLyBTbmFwc2hvdCB0aGUgaW5pdGlhbCBhbGxvY2F0aW9uc1xyXG4gICAgY29uc3QgaW5pdGlhbEFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKTtcclxuICAgIG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudCA9IGFsbG9jYXRpb25zS2V5KGluaXRpYWxBbGxvY3MpO1xyXG5cclxuICAgIC8vIFNldCBvdXRwdXQgc3RhdGVcclxuICAgIHNldEFsbG9jYXRpb25zKGluaXRpYWxBbGxvY3MpO1xyXG4gICAgc2V0QWxsVGVzdElkcyh0ZXN0c0Fyci5tYXAoKHQ6IGFueSkgPT4gdC5pZCkpO1xyXG4gICAgc2V0SGFzVW5zYXZlZENoYW5nZXMoZmFsc2UpO1xyXG4gIH0sIFtpbnB1dEtleV0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgU2NoZWR1bGluZyBjb25maWcgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgY2hIb3VycyA9IChjaGFuZ2VvdmVySG91cnMgYXMgbnVtYmVyKSB8fCAzO1xyXG4gIGNvbnN0IHdTdGFydCA9ICh3b3JrU3RhcnQgYXMgbnVtYmVyKSB8fCA5O1xyXG4gIGNvbnN0IHdFbmQgPSAod29ya0VuZCBhcyBudW1iZXIpIHx8IDE3O1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgVmlldyBjb21wdXRhdGlvbnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3Qgdmlld1N0YXJ0ID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcclxuICAgIGQuc2V0SG91cnMoMCwgMCwgMCwgMCk7XHJcbiAgICB3aGlsZSAoZC5nZXREYXkoKSAhPT0gMSkgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpIC0gMSk7XHJcbiAgICByZXR1cm4gZDtcclxuICB9LCBbXSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBTY2hlZHVsZSBjb21wdXRhdGlvbiAobXVzdCBiZSBkZWZpbmVkIGJlZm9yZSB0aW1lbGluZUVuZCkgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgY29tcHV0ZVNjaGVkdWxlID0gdXNlQ2FsbGJhY2soKHRlc3RzOiBUZXN0RGF0YVtdKTogU2NoZWR1bGVkVGVzdFtdID0+IHtcclxuICAgIGNvbnN0IHJ1bm5pbmdUZXN0cyA9IHRlc3RzLmZpbHRlcih0ID0+IGlzUnVubmluZ1Rlc3QodCkpO1xyXG4gICAgY29uc3QgcXVldWVkVGVzdHMgPSB0ZXN0cy5maWx0ZXIodCA9PiAhaXNSdW5uaW5nVGVzdCh0KSk7XHJcblxyXG4gICAgLy8gU29ydCBSdW5uaW5nIHRlc3RzIGJ5IGFjdHVhbCBzdGFydCBkYXRlLCB0aGVuIHByaW9yaXR5IGRlc2MgZm9yIHRpZXNcclxuICAgIGNvbnN0IHNvcnRlZFJ1bm5pbmcgPSBbLi4ucnVubmluZ1Rlc3RzXS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRhdGVBID0gcGFyc2VMb2NhbERhdGUoYS50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgbmV3IERhdGUoKTtcclxuICAgICAgY29uc3QgZGF0ZUIgPSBwYXJzZUxvY2FsRGF0ZShiLnRlc3Rfc3RhcnRlZF9kYXRlKSB8fCBuZXcgRGF0ZSgpO1xyXG4gICAgICBpZiAoZGF0ZUEuZ2V0VGltZSgpICE9PSBkYXRlQi5nZXRUaW1lKCkpIHJldHVybiBkYXRlQS5nZXRUaW1lKCkgLSBkYXRlQi5nZXRUaW1lKCk7XHJcbiAgICAgIHJldHVybiAoYi5wcmlvcml0eSA/PyA1MCkgLSAoYS5wcmlvcml0eSA/PyA1MCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBSdW5uaW5nIHRlc3RzIHVzZSB0aGVpciBhY3R1YWwgdGVzdF9zdGFydGVkX2RhdGU7IG92ZXJsYXBwaW5nIG9uZXMgYXJlIG1hZGUgc2VxdWVudGlhbFxyXG4gICAgbGV0IGxhc3RSdW5uaW5nRW5kID0gbmV3IERhdGUodmlld1N0YXJ0KTtcclxuICAgIGNvbnN0IHJ1bm5pbmdTY2hlZHVsZWQgPSBzb3J0ZWRSdW5uaW5nLm1hcCh0ZXN0ID0+IHtcclxuICAgICAgY29uc3QgdGVzdERhdGUgPSBwYXJzZUxvY2FsRGF0ZSh0ZXN0LnRlc3Rfc3RhcnRlZF9kYXRlKSB8fCBuZXcgRGF0ZSh2aWV3U3RhcnQpO1xyXG4gICAgICBjb25zdCBzdGFydCA9IHRlc3REYXRlIDwgbGFzdFJ1bm5pbmdFbmQgPyBuZXcgRGF0ZShsYXN0UnVubmluZ0VuZCkgOiBuZXcgRGF0ZSh0ZXN0RGF0ZSk7XHJcbiAgICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHN0YXJ0LmdldFRpbWUoKSArIHRlc3QuZHVyYXRpb24gKiBNU19QRVJfSE9VUik7XHJcbiAgICAgIGxhc3RSdW5uaW5nRW5kID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChlbmQsIGNoSG91cnMsIHdTdGFydCwgd0VuZCk7XHJcbiAgICAgIHJldHVybiB7IC4uLnRlc3QsIHN0YXJ0LCBlbmQgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFF1ZXVlZCB0ZXN0cyBzdGFydCBhZnRlciBsYXN0IFJ1bm5pbmcgdGVzdCdzIGNoYW5nZW92ZXIgKG9yIG5vdytjaGFuZ2VvdmVyLCB3aGljaGV2ZXIgaXMgbGF0ZXIpLlxyXG4gICAgLy8gV2UgbmV2ZXIgc2NoZWR1bGUgYSBwbGFubmVkIHRlc3QgdG8gc3RhcnQgaW4gdGhlIHBhc3QuXHJcbiAgICBjb25zdCBub3dQbHVzQ2hhbmdlb3ZlciA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQobmV3IERhdGUoKSwgY2hIb3Vycywgd1N0YXJ0LCB3RW5kKTtcclxuICAgIGxldCBjdXJyZW50RW5kID0gbmV3IERhdGUoTWF0aC5tYXgobGFzdFJ1bm5pbmdFbmQuZ2V0VGltZSgpLCBub3dQbHVzQ2hhbmdlb3Zlci5nZXRUaW1lKCkpKTtcclxuICAgIGNvbnN0IHF1ZXVlZFNjaGVkdWxlZCA9IHF1ZXVlZFRlc3RzLm1hcCh0ZXN0ID0+IHtcclxuICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZShjdXJyZW50RW5kKTtcclxuICAgICAgY29uc3QgZW5kID0gbmV3IERhdGUoc3RhcnQuZ2V0VGltZSgpICsgdGVzdC5kdXJhdGlvbiAqIE1TX1BFUl9IT1VSKTtcclxuICAgICAgY3VycmVudEVuZCA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQoZW5kLCBjaEhvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICByZXR1cm4geyAuLi50ZXN0LCBzdGFydCwgZW5kIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gWy4uLnJ1bm5pbmdTY2hlZHVsZWQsIC4uLnF1ZXVlZFNjaGVkdWxlZF07XHJcbiAgfSwgW3ZpZXdTdGFydCwgY2hIb3Vycywgd1N0YXJ0LCB3RW5kXSk7XHJcblxyXG4gIGNvbnN0IHRpbWVsaW5lRW5kID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBsZXQgbGF0ZXN0RW5kID0gbmV3IERhdGUodmlld1N0YXJ0KTtcclxuICAgIGxhdGVzdEVuZC5zZXREYXRlKGxhdGVzdEVuZC5nZXREYXRlKCkgKyB2aWV3cG9ydFdlZWtzICogNyk7XHJcblxyXG4gICAgc3RhbmRzLmZvckVhY2goc3RhbmQgPT4ge1xyXG4gICAgICBjb25zdCBzY2hlZHVsZSA9IGNvbXB1dGVTY2hlZHVsZShzdGFuZC50ZXN0cyk7XHJcbiAgICAgIGlmIChzY2hlZHVsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgbGFzdCA9IHNjaGVkdWxlW3NjaGVkdWxlLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZW92ZXJFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKGxhc3QuZW5kLCBjaEhvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICAgIGlmIChjaGFuZ2VvdmVyRW5kID4gbGF0ZXN0RW5kKSBsYXRlc3RFbmQgPSBjaGFuZ2VvdmVyRW5kO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsYXRlc3RFbmQuc2V0RGF0ZShsYXRlc3RFbmQuZ2V0RGF0ZSgpICsgNyk7XHJcbiAgICByZXR1cm4gbGF0ZXN0RW5kO1xyXG4gIH0sIFtzdGFuZHMsIHZpZXdTdGFydCwgdmlld3BvcnRXZWVrcywgY2hIb3Vycywgd1N0YXJ0LCB3RW5kLCBjb21wdXRlU2NoZWR1bGVdKTtcclxuXHJcbiAgY29uc3QgdG90YWxEYXlzID0gdXNlTWVtbygoKSA9PiBNYXRoLmNlaWwoaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgdGltZWxpbmVFbmQpIC8gMjQpLCBbdmlld1N0YXJ0LCB0aW1lbGluZUVuZF0pO1xyXG5cclxuICBjb25zdCB2aWV3cG9ydFdpZHRoID0gODAwO1xyXG4gIGNvbnN0IHB4UGVySG91ciA9IHZpZXdwb3J0V2lkdGggLyAodmlld3BvcnRXZWVrcyAqIDcgKiAyNCk7XHJcbiAgY29uc3QgZGF5cyA9IHVzZU1lbW8oKCkgPT4gZ2VuZXJhdGVEYXlzKHZpZXdTdGFydCwgdG90YWxEYXlzKSwgW3ZpZXdTdGFydCwgdG90YWxEYXlzXSk7XHJcbiAgY29uc3Qgd2Vla3MgPSB1c2VNZW1vKCgpID0+IGdlbmVyYXRlV2Vla3Modmlld1N0YXJ0LCB0b3RhbERheXMpLCBbdmlld1N0YXJ0LCB0b3RhbERheXNdKTtcclxuICBjb25zdCB0b3RhbFdpZHRoID0gdG90YWxEYXlzICogMjQgKiBweFBlckhvdXI7XHJcbiAgY29uc3QgZGF5V2lkdGggPSAyNCAqIHB4UGVySG91cjtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEFmdGVyLWNoYW5nZSBoYW5kbGVyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGFmdGVyQ2hhbmdlID0gdXNlQ2FsbGJhY2soKG5ld1N0YW5kczogSW50ZXJuYWxTdGFuZFtdKSA9PiB7XHJcbiAgICBjb25zdCBhbGxvY3MgPSBidWlsZEFsbG9jYXRpb25zKG5ld1N0YW5kcyk7XHJcbiAgICBjb25zdCBkaXJ0eSA9IGFsbG9jYXRpb25zS2V5KGFsbG9jcykgIT09IG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudDtcclxuICAgIHNldElzRGlydHkoZGlydHkpO1xyXG4gICAgc2V0QWxsb2NhdGlvbnMoYWxsb2NzKTtcclxuICAgIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzKGRpcnR5KTtcclxuXHJcbiAgICBpZiAoKHNhdmVNb2RlIGFzIHN0cmluZykgPT09ICdsaXZlJykge1xyXG4gICAgICBvbkNoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH0sIFtzYXZlTW9kZSwgc2V0QWxsb2NhdGlvbnMsIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzLCBvbkNoYW5nZV0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgRHJhZyBhbmQgZHJvcCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBmaW5kVGVzdCA9IHVzZUNhbGxiYWNrKCh0ZXN0SWQ6IHN0cmluZyB8IG51bWJlcik6IFRlc3REYXRhIHwgbnVsbCA9PiB7XHJcbiAgICBjb25zdCBxID0gdW5hbGxvY2F0ZWQuZmluZCh0ID0+IHQuaWQgPT09IHRlc3RJZCk7XHJcbiAgICBpZiAocSkgcmV0dXJuIHE7XHJcbiAgICBmb3IgKGNvbnN0IHMgb2Ygc3RhbmRzKSB7XHJcbiAgICAgIGNvbnN0IHQgPSBzLnRlc3RzLmZpbmQodCA9PiB0LmlkID09PSB0ZXN0SWQpO1xyXG4gICAgICBpZiAodCkgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9LCBbdW5hbGxvY2F0ZWQsIHN0YW5kc10pO1xyXG5cclxuICBjb25zdCBjbGVhckRyYWcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXREcmFnZ2VkVGVzdElkKG51bGwpO1xyXG4gICAgc2V0SW5zZXJ0SW5kaWNhdG9yKG51bGwpO1xyXG4gICAgc2V0UXVldWVJbnNlcnRJbmRleChudWxsKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGRyb3BPblN0YW5kID0gdXNlQ2FsbGJhY2soKHN0YW5kSWQ6IHN0cmluZyB8IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgaWYgKCFkcmFnZ2VkVGVzdElkKSByZXR1cm47XHJcbiAgICBjb25zdCB0ZXN0ID0gZmluZFRlc3QoZHJhZ2dlZFRlc3RJZCk7XHJcbiAgICBpZiAoIXRlc3QpIHJldHVybjtcclxuXHJcbiAgICAvLyBSZW1vdmUgZnJvbSB1bmFsbG9jYXRlZFxyXG4gICAgc2V0VW5hbGxvY2F0ZWQocHJldiA9PiBwcmV2LmZpbHRlcih0ID0+IHQuaWQgIT09IGRyYWdnZWRUZXN0SWQpKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgZnJvbSBhbGwgc3RhbmRzIGFuZCBpbnNlcnQgYXQgdGFyZ2V0XHJcbiAgICBjb25zdCBuZXdTdGFuZHMgPSBzdGFuZHMubWFwKHMgPT4ge1xyXG4gICAgICBjb25zdCBmaWx0ZXJlZCA9IHMudGVzdHMuZmlsdGVyKHQgPT4gdC5pZCAhPT0gZHJhZ2dlZFRlc3RJZCk7XHJcbiAgICAgIGlmIChzLmlkID09PSBzdGFuZElkKSB7XHJcbiAgICAgICAgY29uc3QgbmV3VGVzdHMgPSBbLi4uZmlsdGVyZWRdO1xyXG4gICAgICAgIG5ld1Rlc3RzLnNwbGljZShpbmRleCwgMCwgdGVzdCk7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4ucywgdGVzdHM6IG5ld1Rlc3RzIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHsgLi4ucywgdGVzdHM6IGZpbHRlcmVkIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIGFmdGVyQ2hhbmdlKG5ld1N0YW5kcyk7XHJcbiAgICBjbGVhckRyYWcoKTtcclxuICB9LCBbZHJhZ2dlZFRlc3RJZCwgZmluZFRlc3QsIHN0YW5kcywgYWZ0ZXJDaGFuZ2UsIGNsZWFyRHJhZ10pO1xyXG5cclxuICBjb25zdCBkcm9wT25RdWV1ZSA9IHVzZUNhbGxiYWNrKChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICBpZiAoIWRyYWdnZWRUZXN0SWQpIHJldHVybjtcclxuICAgIGNvbnN0IHRlc3QgPSBmaW5kVGVzdChkcmFnZ2VkVGVzdElkKTtcclxuICAgIGlmICghdGVzdCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFJlbW92ZSBmcm9tIHN0YW5kc1xyXG4gICAgY29uc3QgbmV3U3RhbmRzID0gc3RhbmRzLm1hcChzID0+ICh7XHJcbiAgICAgIC4uLnMsXHJcbiAgICAgIHRlc3RzOiBzLnRlc3RzLmZpbHRlcih0ID0+IHQuaWQgIT09IGRyYWdnZWRUZXN0SWQpLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIEFkZCB0byB1bmFsbG9jYXRlZFxyXG4gICAgc2V0VW5hbGxvY2F0ZWQocHJldiA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkID0gcHJldi5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKTtcclxuICAgICAgY29uc3QgbmV4dCA9IFsuLi5maWx0ZXJlZF07XHJcbiAgICAgIG5leHQuc3BsaWNlKGluZGV4LCAwLCB0ZXN0KTtcclxuICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIGFmdGVyQ2hhbmdlKG5ld1N0YW5kcyk7XHJcbiAgICBjbGVhckRyYWcoKTtcclxuICB9LCBbZHJhZ2dlZFRlc3RJZCwgZmluZFRlc3QsIHN0YW5kcywgYWZ0ZXJDaGFuZ2UsIGNsZWFyRHJhZ10pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgU2F2ZSAvIERpc2NhcmQgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgaGFuZGxlU2F2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG9uU2F2ZSgpO1xyXG4gICAgLy8gQWZ0ZXIgc2F2ZSBldmVudCBmaXJlcywgUmV0b29sIHdpbGwgdHJpZ2dlciB0aGUgc2F2ZSBxdWVyeVxyXG4gICAgLy8gd2hpY2ggd2lsbCByZWZyZXNoIGRhdGEsIGNhdXNpbmcgcmVpbml0IGFuZCBjbGVhcmluZyBkaXJ0eSBzdGF0ZVxyXG4gIH0sIFtvblNhdmVdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGlzY2FyZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIC8vIFJlLXBhcnNlIGZyb20gaW5wdXQgZGF0YVxyXG4gICAgY29uc3QgdGVzdHNBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0VGVzdHMpID8gaW5wdXRUZXN0cyA6IFtdO1xyXG4gICAgY29uc3Qgc3RhbmRzQXJyID0gQXJyYXkuaXNBcnJheShpbnB1dFN0YW5kcykgPyAoaW5wdXRTdGFuZHMgYXMgU3RhbmREZWZbXSkgOiBbXTtcclxuXHJcbiAgICBjb25zdCBzdGFuZE1hcCA9IG5ldyBNYXA8bnVtYmVyIHwgc3RyaW5nLCBJbnRlcm5hbFN0YW5kPigpO1xyXG4gICAgc3RhbmRzQXJyLmZvckVhY2gocyA9PiBzdGFuZE1hcC5zZXQocy5pZCwgeyBpZDogcy5pZCwgbmFtZTogcy5uYW1lLCB0ZXN0czogW10gfSkpO1xyXG5cclxuICAgIGNvbnN0IHVuYWxsb2M6IFRlc3REYXRhW10gPSBbXTtcclxuICAgIHRlc3RzQXJyLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCB0ZXN0OiBUZXN0RGF0YSA9IHsgLi4udCwgZHVyYXRpb246IHQuZHVyYXRpb24gfHwgNzIsIHByaW9yaXR5OiB0LnByaW9yaXR5ID8/IDUwIH07XHJcbiAgICAgIGlmICh0ZXN0LnRlc3Rfc3RhbmRfaWQgIT0gbnVsbCAmJiBzdGFuZE1hcC5oYXModGVzdC50ZXN0X3N0YW5kX2lkKSkge1xyXG4gICAgICAgIHN0YW5kTWFwLmdldCh0ZXN0LnRlc3Rfc3RhbmRfaWQpIS50ZXN0cy5wdXNoKHRlc3QpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHVuYWxsb2MucHVzaCh0ZXN0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBzdGFuZE1hcC5mb3JFYWNoKHMgPT4gcy50ZXN0cy5zb3J0KChhLCBiKSA9PiAoYS5wcmlvcml0eV9vcmRlciB8fCA5OTkpIC0gKGIucHJpb3JpdHlfb3JkZXIgfHwgOTk5KSkpO1xyXG5cclxuICAgIGNvbnN0IG5ld1N0YW5kcyA9IHN0YW5kc0Fyci5tYXAocyA9PiBzdGFuZE1hcC5nZXQocy5pZCkhKTtcclxuICAgIHNldFN0YW5kcyhuZXdTdGFuZHMpO1xyXG4gICAgc2V0VW5hbGxvY2F0ZWQodW5hbGxvYyk7XHJcbiAgICBzZXRJc0RpcnR5KGZhbHNlKTtcclxuICAgIHNldEFsbG9jYXRpb25zKGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKSk7XHJcbiAgICBzZXRIYXNVbnNhdmVkQ2hhbmdlcyhmYWxzZSk7XHJcbiAgfSwgW2lucHV0VGVzdHMsIGlucHV0U3RhbmRzLCBzZXRBbGxvY2F0aW9ucywgc2V0SGFzVW5zYXZlZENoYW5nZXNdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEJhciBwb3NpdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBnZXRCYXJQb3MgPSB1c2VDYWxsYmFjaygoc3RhcnQ6IERhdGUsIGR1cmF0aW9uOiBudW1iZXIpID0+ICh7XHJcbiAgICBsZWZ0OiBNYXRoLm1heCgwLCBob3Vyc0JldHdlZW4odmlld1N0YXJ0LCBzdGFydCkpICogcHhQZXJIb3VyLFxyXG4gICAgd2lkdGg6IE1hdGgubWF4KGR1cmF0aW9uICogcHhQZXJIb3VyLCAyKSxcclxuICB9KSwgW3ZpZXdTdGFydCwgcHhQZXJIb3VyXSk7XHJcblxyXG4gIC8vIEZvciBSdW5uaW5nIHRlc3RzOiBjbGlwIGxlZnQgdG8gdmlld1N0YXJ0LCBhZGp1c3Qgd2lkdGggdG8gYWN0dWFsIGVuZCB0aW1lLlxyXG4gIC8vIFJldHVybnMgbnVsbCBpZiB0aGUgdGVzdCBlbmRlZCBiZWZvcmUgdGhlIHRpbWVsaW5lIHN0YXJ0cy5cclxuICBjb25zdCBnZXRSdW5uaW5nQmFyUG9zID0gdXNlQ2FsbGJhY2soKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiB7IGxlZnQ6IG51bWJlcjsgd2lkdGg6IG51bWJlciB9IHwgbnVsbCA9PiB7XHJcbiAgICBjb25zdCBlZmZlY3RpdmVTdGFydE1zID0gTWF0aC5tYXgoc3RhcnQuZ2V0VGltZSgpLCB2aWV3U3RhcnQuZ2V0VGltZSgpKTtcclxuICAgIGNvbnN0IGVuZE1zID0gZW5kLmdldFRpbWUoKTtcclxuICAgIGlmIChlbmRNcyA8PSBlZmZlY3RpdmVTdGFydE1zKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxlZnQ6IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIG5ldyBEYXRlKGVmZmVjdGl2ZVN0YXJ0TXMpKSAqIHB4UGVySG91cixcclxuICAgICAgd2lkdGg6IE1hdGgubWF4KGhvdXJzQmV0d2VlbihuZXcgRGF0ZShlZmZlY3RpdmVTdGFydE1zKSwgbmV3IERhdGUoZW5kTXMpKSAqIHB4UGVySG91ciwgMiksXHJcbiAgICB9O1xyXG4gIH0sIFt2aWV3U3RhcnQsIHB4UGVySG91cl0pO1xyXG5cclxuICBjb25zdCBkcmFnZ2VkVGVzdCA9IGRyYWdnZWRUZXN0SWQgIT0gbnVsbCA/IGZpbmRUZXN0KGRyYWdnZWRUZXN0SWQpIDogbnVsbDtcclxuICBjb25zdCBkcmFnZ2VkSXNSdW5uaW5nID0gZHJhZ2dlZFRlc3QgIT0gbnVsbCA/IGlzUnVubmluZ1Rlc3QoZHJhZ2dlZFRlc3QpIDogZmFsc2U7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBTdGF0cyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB0b3RhbEFsbG9jYXRlZCA9IHN0YW5kcy5yZWR1Y2UoKGEsIHMpID0+IGEgKyBzLnRlc3RzLmxlbmd0aCwgMCk7XHJcbiAgY29uc3QgdG90YWxIb3VycyA9IHN0YW5kcy5yZWR1Y2UoKGEsIHMpID0+IGEgKyBzLnRlc3RzLnJlZHVjZSgoYiwgdCkgPT4gYiArIHQuZHVyYXRpb24sIDApLCAwKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFRlbXBsYXRlIGFjY2Vzc29ycyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBtYWluVGV4dCA9IFN0cmluZyhjYXJkTWFpblRleHQgfHwgJ3tuYW1lfScpO1xyXG4gIGNvbnN0IHN1YlRleHQgPSBTdHJpbmcoY2FyZFN1YlRleHQgfHwgJycpO1xyXG4gIGNvbnN0IGluZm9Sb3cgPSBTdHJpbmcoY2FyZEluZm9Sb3cgfHwgJycpO1xyXG4gIGNvbnN0IHRpcFRlbXBsYXRlID0gU3RyaW5nKHRvb2x0aXBUZW1wbGF0ZSB8fCAnJykucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpO1xyXG5cclxuXHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBGaWx0ZXJlZCAmIHNvcnRlZCBxdWV1ZSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBTVEFUVVNfU09SVF9PUkRFUjogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHtcclxuICAgICdSdW5uaW5nJzogMCwgJ0RlbGF5ZWQnOiAxLCAnT24gVGltZSc6IDIsICdSZWFkeSc6IDMsICdJbiBQcm9ncmVzcyc6IDQsICdQYXJ0cyBOb3QgQXNzaWduZWQnOiA1LFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNvcnRlZFVuYWxsb2NhdGVkID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBsZXQgbGlzdCA9IFsuLi51bmFsbG9jYXRlZF07XHJcbiAgICBpZiAocXVldWVGaWx0ZXIudHJpbSgpKSB7XHJcbiAgICAgIGNvbnN0IHEgPSBxdWV1ZUZpbHRlci50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICAgICAgLy8gU2VhcmNoIGFjcm9zcyBhbGwgcmVhZGFibGUgc3RyaW5nL251bWJlciBmaWVsZHMgb2YgdGhlIHRlc3RcclxuICAgICAgbGlzdCA9IGxpc3QuZmlsdGVyKHQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaGFibGUgPSBbdC5uYW1lLCB0Lm93bmVyLCB0Lm5vdGVzLCB0LnN0YXR1cywgdC5wYXJ0X3N0YXR1cywgdC5hc3NpZ25lZF9wYXJ0cyxcclxuICAgICAgICAgIHQucHJpb3JpdHkgIT0gbnVsbCA/IFN0cmluZyh0LnByaW9yaXR5KSA6ICcnLCB0LmR1cmF0aW9uICE9IG51bGwgPyBTdHJpbmcodC5kdXJhdGlvbikgOiAnJ11cclxuICAgICAgICAgIC5qb2luKCcgJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gc2VhcmNoYWJsZS5pbmNsdWRlcyhxKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAocXVldWVTb3J0ID09PSAnYXonKSB7XHJcbiAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4gKGEubmFtZSB8fCAnJykubG9jYWxlQ29tcGFyZShiLm5hbWUgfHwgJycpKTtcclxuICAgIH0gZWxzZSBpZiAocXVldWVTb3J0ID09PSAncHJpb3JpdHknKSB7XHJcbiAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4gKGIucHJpb3JpdHkgPz8gNTApIC0gKGEucHJpb3JpdHkgPz8gNTApKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNvcnQgYnkgZGlzcGxheSBzdGF0dXMgdXNpbmcgYSBmaXhlZCB1cmdlbmN5IG9yZGVyXHJcbiAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNhID0gU1RBVFVTX1NPUlRfT1JERVJbZ2V0RGlzcGxheVN0YXR1cyhhKV0gPz8gOTk7XHJcbiAgICAgICAgY29uc3Qgc2IgPSBTVEFUVVNfU09SVF9PUkRFUltnZXREaXNwbGF5U3RhdHVzKGIpXSA/PyA5OTtcclxuICAgICAgICByZXR1cm4gc2EgIT09IHNiID8gc2EgLSBzYiA6IChiLnByaW9yaXR5ID8/IDUwKSAtIChhLnByaW9yaXR5ID8/IDUwKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGlzdDtcclxuICB9LCBbdW5hbGxvY2F0ZWQsIHF1ZXVlU29ydCwgcXVldWVGaWx0ZXJdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEJhciBoZWlnaHQgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgQkFSX0hFSUdIVCA9IDcyO1xyXG4gIGNvbnN0IExBTkVfSEVJR0hUID0gODQ7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBSZW5kZXIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5jb250YWluZXJ9PlxyXG4gICAgICB7LyogXHUyNTUwXHUyNTUwXHUyNTUwIFF1ZXVlIFNpZGViYXIgXHUyNTUwXHUyNTUwXHUyNTUwICovfVxyXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuc2lkZWJhcn0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjBweCAxNnB4IDEycHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgI0U1RTdFQicgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIG1hcmdpbkJvdHRvbTogNCB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDggfX0+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogOCwgaGVpZ2h0OiA4LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiB1bmFsbG9jYXRlZC5sZW5ndGggPiAwID8gJyNGNTlFMEInIDogJyMxMEI5ODEnIH19IC8+XHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLm1vbm8sIGZvbnRTaXplOiAxMywgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnMC4wOGVtJywgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsIGNvbG9yOiAnIzRCNTU2MycgfX0+UXVldWU8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAyLCBiYWNrZ3JvdW5kOiAnI0YzRjRGNicsIGJvcmRlclJhZGl1czogNiwgcGFkZGluZzogMiwgYm9yZGVyOiAnMXB4IHNvbGlkICNFNUU3RUInIH19PlxyXG4gICAgICAgICAgICAgIHsoW1snYXonLCAnQVx1MjE5MlonXSwgWydwcmlvcml0eScsICdQcmlvcml0eSddLCBbJ3N0YXR1cycsICdTdGF0dXMnXV0gYXMgY29uc3QpLm1hcCgoW3ZhbCwgbGFiZWxdKSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIGtleT17dmFsfVxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRRdWV1ZVNvcnQodmFsKX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMubW9ubywgcGFkZGluZzogJzNweCA4cHgnLCBmb250U2l6ZTogOSwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHF1ZXVlU29ydCA9PT0gdmFsID8gJyMzQjgyRjYnIDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogcXVldWVTb3J0ID09PSB2YWwgPyAnI0ZGRicgOiAnIzZCNzI4MCcsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+e2xhYmVsfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJywgbWFyZ2luVG9wOiA2IH19PlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgdmFsdWU9e3F1ZXVlRmlsdGVyfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UXVldWVGaWx0ZXIoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRmlsdGVyIHRlc3RzLi4uXCJcclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgLi4uc3R5bGVzLm1vbm8sIHdpZHRoOiAnMTAwJScsIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCBwYWRkaW5nOiAnNXB4IDI4cHggNXB4IDhweCcsIGZvbnRTaXplOiAxMSxcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjRTVFN0VCJywgYm9yZGVyUmFkaXVzOiA2LCBiYWNrZ3JvdW5kOiAnI0Y5RkFGQicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJyMxMTE4MjcnLCBvdXRsaW5lOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBvbkZvY3VzPXsoZSkgPT4geyBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnIzNCODJGNic7IGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJyNGRkZGRkYnOyB9fVxyXG4gICAgICAgICAgICAgIG9uQmx1cj17KGUpID0+IHsgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJvcmRlckNvbG9yID0gJyNFNUU3RUInOyBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9ICcjRjlGQUZCJzsgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAge3F1ZXVlRmlsdGVyICYmIChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRRdWV1ZUZpbHRlcignJyl9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgcmlnaHQ6IDYsIHRvcDogJzUwJScsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6ICcjOUNBM0FGJyxcclxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDE0LCBsaW5lSGVpZ2h0OiAxLCBwYWRkaW5nOiAwLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+JnRpbWVzOzwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIHN0eWxlPXt7IGZsZXg6IDEsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAnOHB4IDEwcHgnIH19XHJcbiAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGlmIChlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0KSBzZXRRdWV1ZUluc2VydEluZGV4KHVuYWxsb2NhdGVkLmxlbmd0aCk7IH19XHJcbiAgICAgICAgICBvbkRyYWdMZWF2ZT17KGUpID0+IHsgaWYgKGUuY3VycmVudFRhcmdldCA9PT0gZS50YXJnZXQpIHNldFF1ZXVlSW5zZXJ0SW5kZXgobnVsbCk7IH19XHJcbiAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZHJvcE9uUXVldWUocXVldWVJbnNlcnRJbmRleCA/PyB1bmFsbG9jYXRlZC5sZW5ndGgpOyB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtzb3J0ZWRVbmFsbG9jYXRlZC5tYXAoKHRlc3QsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBnZXREaXNwbGF5U3RhdHVzKHRlc3QsIG51bGwpO1xyXG4gICAgICAgICAgICBjb25zdCBzaG93U3ViID0gIWlzVGVtcGxhdGVFbXB0eShzdWJUZXh0LCB0ZXN0KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e3Rlc3QuaWR9PlxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldFF1ZXVlSW5zZXJ0SW5kZXgoaWR4KTsgfX1cclxuICAgICAgICAgICAgICAgICAgb25Ecm9wPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGRyb3BPblF1ZXVlKGlkeCk7IH19XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBxdWV1ZUluc2VydEluZGV4ID09PSBpZHggJiYgZHJhZ2dlZFRlc3RJZCAmJiBkcmFnZ2VkVGVzdElkICE9PSB0ZXN0LmlkID8gNiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMzQjgyRjYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogMyxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuMTJzIGVhc2UnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxUb29sdGlwV3JhcHBlclxyXG4gICAgICAgICAgICAgICAgICB0ZXN0TmFtZT17cmVzb2x2ZVRlbXBsYXRlKG1haW5UZXh0LCB0ZXN0KX1cclxuICAgICAgICAgICAgICAgICAgcHJpb3JpdHk9e3Rlc3QucHJpb3JpdHl9XHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgICAgICAgICAgICB0b29sdGlwTGluZXM9e3Jlc29sdmVUZW1wbGF0ZSh0aXBUZW1wbGF0ZSwgdGVzdCl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGVcclxuICAgICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17KGUpID0+IHsgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJzsgc2V0RHJhZ2dlZFRlc3RJZCh0ZXN0LmlkKTsgfX1cclxuICAgICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9e2NsZWFyRHJhZ31cclxuICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGNvbnN0IHJlY3QgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IHNldFF1ZXVlSW5zZXJ0SW5kZXgoZS5jbGllbnRZIDwgcmVjdC50b3AgKyByZWN0LmhlaWdodCAvIDIgPyBpZHggOiBpZHggKyAxKTsgfX1cclxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eyhlKSA9PiB7IGNvbnN0IGVsID0gZS5jdXJyZW50VGFyZ2V0OyBlbC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgtMnB4KSc7IGVsLnN0eWxlLmJveFNoYWRvdyA9ICcwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4xNSknOyBlbC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7Z2V0Q2FwQ29sb3Ioc3RhdHVzKX1gOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KGUpID0+IHsgY29uc3QgZWwgPSBlLmN1cnJlbnRUYXJnZXQ7IGVsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDApJzsgZWwuc3R5bGUuYm94U2hhZG93ID0gJzAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMDYpJzsgZWwuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCAjRTVFN0VCJzsgfX1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogZHJhZ2dlZFRlc3RJZCA9PT0gdGVzdC5pZCA/ICcjRjNGNEY2JyA6ICcjRkZGRkZGJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjRTVFN0VCJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogOCxcclxuICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ2dyYWInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogZHJhZ2dlZFRlc3RJZCA9PT0gdGVzdC5pZCA/IDAuMzUgOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4wNiknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjE1cyBlYXNlLCBib3gtc2hhZG93IDAuMTVzIGVhc2UsIGJvcmRlciAwLjE1cyBlYXNlJyxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgey8qIFN0YXR1cyBjYXAgYmFyICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDUsIG1pbldpZHRoOiA1LCBiYWNrZ3JvdW5kOiBnZXRDYXBDb2xvcihzdGF0dXMpLCBib3JkZXJSYWRpdXM6ICc4cHggMCAwIDhweCcsIGZsZXhTaHJpbms6IDAgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIHBhZGRpbmc6ICc4cHggMTJweCcsIG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgey8qIFRvcCByb3c6IHByaW9yaXR5IGxlZnQsIHN0YXR1cyByaWdodCAqL31cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiA0IH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubW9ubywgZm9udFNpemU6IDEzLCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiBnZXRQcmlvcml0eVRleHRDb2xvcih0ZXN0LnByaW9yaXR5KSB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBQe3Rlc3QucHJpb3JpdHl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLm1vbm8sIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnMC4wNWVtJywgY29sb3I6IGdldFN0YXR1c1RleHRDb2xvcihzdGF0dXMpLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyBhcyBjb25zdCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c3RhdHVzLnRvVXBwZXJDYXNlKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6ICcjMTExODI3JywgbWFyZ2luQm90dG9tOiAyLCBsaW5lSGVpZ2h0OiAxLjMgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZXNvbHZlVGVtcGxhdGUobWFpblRleHQsIHRlc3QpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7c2hvd1N1YiAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm1vbm8sIGZvbnRTaXplOiAxMSwgY29sb3I6ICcjNkI3MjgwJywgbWFyZ2luQm90dG9tOiA0LCBmb250V2VpZ2h0OiA0MDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc29sdmVUZW1wbGF0ZShzdWJUZXh0LCB0ZXN0KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubW9ubywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGZvbnRTaXplOiAxMSwgY29sb3I6ICcjNEI1NTYzJywgZmxleFdyYXA6ICd3cmFwJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3Jlc29sdmVUZW1wbGF0ZShpbmZvUm93LCB0ZXN0KS5zcGxpdCgnXFx1MDBiNycpLm1hcCgocGFydCwgaSwgYXJyKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17aX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57cGFydC50cmltKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2kgPCBhcnIubGVuZ3RoIC0gMSAmJiA8c3Bhbj57J1xcdTAwYjcnfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L1Rvb2x0aXBXcmFwcGVyPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgc2V0UXVldWVJbnNlcnRJbmRleCh1bmFsbG9jYXRlZC5sZW5ndGgpOyB9fVxyXG4gICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZHJvcE9uUXVldWUodW5hbGxvY2F0ZWQubGVuZ3RoKTsgfX1cclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBoZWlnaHQ6IChxdWV1ZUluc2VydEluZGV4ID09PSB1bmFsbG9jYXRlZC5sZW5ndGggJiYgZHJhZ2dlZFRlc3RJZCkgPyA2IDogMCxcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzNCODJGNicsXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzLFxyXG4gICAgICAgICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC4xMnMgZWFzZScsXHJcbiAgICAgICAgICAgICAgbWFyZ2luOiAnMCA0cHgnLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHt1bmFsbG9jYXRlZC5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJywgcGFkZGluZzogJzMycHggMTZweCcsIGNvbG9yOiAnIzZCNzI4MCcsIGZvbnRTaXplOiAxMixcclxuICAgICAgICAgICAgICBib3JkZXI6IGRyYWdnZWRUZXN0SWQgPyAnMnB4IGRhc2hlZCAjM0I4MkY2JyA6ICcycHggZGFzaGVkICNEMUQ1REInLFxyXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogOCwgbWFyZ2luVG9wOiA4LFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IGRyYWdnZWRUZXN0SWQgPyAnI0VGRjZGRicgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICB7ZHJhZ2dlZFRlc3RJZCA/ICdEcm9wIHRvIHJldHVybiB0byBxdWV1ZScgOiAnQWxsIHRlc3RzIGFsbG9jYXRlZCd9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPE91dGxpbmVLZXkgLz5cclxuXHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAxNnB4JywgYm9yZGVyVG9wOiAnMXB4IHNvbGlkICNFNUU3RUInLCBiYWNrZ3JvdW5kOiAnI0Y5RkFGQicgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5tb25vLCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGZvbnRTaXplOiAxMCwgY29sb3I6ICcjNkI3MjgwJyB9fT5cclxuICAgICAgICAgICAgPHNwYW4+e3RvdGFsQWxsb2NhdGVkfS97dG90YWxBbGxvY2F0ZWQgKyB1bmFsbG9jYXRlZC5sZW5ndGh9IGFsbG9jYXRlZDwvc3Bhbj48c3Bhbj57dG90YWxIb3Vyc31oPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgey8qIFx1MjU1MFx1MjU1MFx1MjU1MCBNYWluIFRpbWVsaW5lIFx1MjU1MFx1MjU1MFx1MjU1MCAqL31cclxuICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XHJcbiAgICAgICAgey8qIEhlYWRlciBiYXIgKi99XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAyNHB4JywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICNFNUU3RUInLCBiYWNrZ3JvdW5kOiAnI0ZGRkZGRicsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGdhcDogMTYsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgICAgICA8aDEgc3R5bGU9e3sgZm9udFNpemU6IDE4LCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiAnIzExMTgyNycsIGxldHRlclNwYWNpbmc6ICctMC4wMmVtJyB9fT5UZXN0IFN0YW5kIFNjaGVkdWxlcjwvaDE+XHJcbiAgICAgICAgICAgIDxwIHN0eWxlPXt7IC4uLnN0eWxlcy5tb25vLCBmb250U2l6ZTogMTEsIGNvbG9yOiAnIzZCNzI4MCcsIG1hcmdpblRvcDogMiB9fT5cclxuICAgICAgICAgICAgICBDb250aW51b3VzIHRlc3RpbmcgXHUwMEI3IHtjaEhvdXJzfWggY2hhbmdlb3ZlciAoe3dTdGFydH06MDBcdTIwMTN7d0VuZH06MDAgTW9uXHUyMDEzRnJpKVxyXG4gICAgICAgICAgICAgIHsoc2F2ZU1vZGUgYXMgc3RyaW5nKSA9PT0gJ2xpdmUnICYmIDxzcGFuPiBcdTAwQjcgTGl2ZSBzeW5jPC9zcGFuPn1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDEyIH19PlxyXG4gICAgICAgICAgICB7LyogU2F2ZS9EaXNjYXJkIGJ1dHRvbnMgKGJhdGNoIG1vZGUpICovfVxyXG4gICAgICAgICAgICB7KHNhdmVNb2RlIGFzIHN0cmluZykgPT09ICdiYXRjaCcgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYgfX0+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURpc2NhcmR9XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNEaXJ0eX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMubW9ubyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDE0cHgnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjRDFENURCJywgY3Vyc29yOiBpc0RpcnR5ID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjRkZGRkZGJywgY29sb3I6IGlzRGlydHkgPyAnIzM3NDE1MScgOiAnIzlDQTNBRicsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogaXNEaXJ0eSA/IDEgOiAwLjUsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIERpc2NhcmRcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTYXZlfVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRGlydHl9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLm1vbm8sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzZweCAxNHB4JywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogNixcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgY3Vyc29yOiBpc0RpcnR5ID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGlzRGlydHkgPyAnIzNCODJGNicgOiAnIzkzQzVGRCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjRkZGRkZGJyxcclxuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IGlzRGlydHkgPyAnMCAxcHggM3B4IHJnYmEoNTksMTMwLDI0NiwwLjMpJyA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgU2F2ZSBDaGFuZ2Vze2lzRGlydHkgJiYgJyBcdTIwMjInfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICB7LyogVmlld3BvcnQgc2VsZWN0b3IgKi99XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDQsIGJhY2tncm91bmQ6ICcjRjNGNEY2JywgYm9yZGVyUmFkaXVzOiA4LCBwYWRkaW5nOiAzLCBib3JkZXI6ICcxcHggc29saWQgI0U1RTdFQicgfX0+XHJcbiAgICAgICAgICAgICAge1syLCA0LCA4LCAxMiwgMjRdLm1hcCgodykgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3d9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFZpZXdwb3J0V2Vla3Modyl9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLm1vbm8sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzZweCAxMnB4JywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogNixcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdmlld3BvcnRXZWVrcyA9PT0gdyA/ICcjM0I4MkY2JyA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHZpZXdwb3J0V2Vla3MgPT09IHcgPyAnI0ZGRicgOiAnIzRCNTU2MycsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHt3fVdcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7LyogVGltZWxpbmUgc2Nyb2xsIGFyZWEgKi99XHJcbiAgICAgICAgPGRpdiByZWY9e3Njcm9sbFJlZn0gc3R5bGU9e3sgZmxleDogMSwgb3ZlcmZsb3c6ICdhdXRvJywgYmFja2dyb3VuZDogJyNGOUZBRkInIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtaW5XaWR0aDogdG90YWxXaWR0aCwgcGFkZGluZzogJzAgMTJweCAyNHB4JywgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XHJcbiAgICAgICAgICAgIHsvKiBUaW1lbGluZSBoZWFkZXIgKi99XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdzdGlja3knLCB0b3A6IDAsIHpJbmRleDogMjAsIGJhY2tncm91bmQ6ICcjRjlGQUZCJywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICNFNUU3RUInIH19PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBoZWlnaHQ6IDI4LCBwb3NpdGlvbjogJ3JlbGF0aXZlJywgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICNFNUU3RUInIH19PlxyXG4gICAgICAgICAgICAgICAge3dlZWtzLm1hcCgod2ssIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLm1vbm8sIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIHdrKSAqIHB4UGVySG91cixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNyAqIDI0ICogcHhQZXJIb3VyLCBoZWlnaHQ6IDI4LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIHBhZGRpbmdMZWZ0OiA4LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMCwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogJyM0QjU1NjMnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IGkgPiAwID8gJzFweCBzb2xpZCAjRTVFN0VCJyA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAge2Zvcm1hdFdlZWsod2spfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBoZWlnaHQ6IDI0IH19PlxyXG4gICAgICAgICAgICAgICAge2RheXMubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzVG9kYXkgPSBkLnRvRGF0ZVN0cmluZygpID09PSBuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1dlZWtlbmQgPSBkLmdldERheSgpID09PSAwIHx8IGQuZ2V0RGF5KCkgPT09IDY7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMubW9ubywgd2lkdGg6IGRheVdpZHRoLCBtaW5XaWR0aDogZGF5V2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogOSwgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBpc1RvZGF5ID8gJyMyNTYzRUInIDogJyM2QjcyODAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogaXNUb2RheSA/IDcwMCA6IDQwMCwgbGluZUhlaWdodDogJzI0cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzFweCBzb2xpZCAjRTVFN0VCJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGlzVG9kYXkgPyAnI0VGRjZGRicgOiAoaXNXZWVrZW5kID8gJyNGM0Y0RjYnIDogJ3RyYW5zcGFyZW50JyksXHJcbiAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7dmlld3BvcnRXZWVrcyA8PSA4ID8gZC5nZXREYXRlKCkgOiAoZC5nZXREYXkoKSA9PT0gMSA/IGQuZ2V0RGF0ZSgpIDogJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgey8qIFx1MjU1MFx1MjU1MFx1MjU1MCBUZXN0IFN0YW5kIExhbmVzIFx1MjU1MFx1MjU1MFx1MjU1MCAqL31cclxuICAgICAgICAgICAge3N0YW5kcy5tYXAoKHN0YW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2NoZWR1bGUgPSBjb21wdXRlU2NoZWR1bGUoc3RhbmQudGVzdHMpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IGluZCA9IGluc2VydEluZGljYXRvcjtcclxuICAgICAgICAgICAgICBjb25zdCBzaG93SGVyZSA9IGluZCAmJiBpbmQuc3RhbmRJZCA9PT0gc3RhbmQuaWQ7XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17c3RhbmQuaWR9IHN0eWxlPXt7IG1hcmdpblRvcDogMTYgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4LCBtYXJnaW5Cb3R0b206IDYsIHBhZGRpbmdMZWZ0OiAyIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDYsIGhlaWdodDogNiwgYm9yZGVyUmFkaXVzOiAyLCBiYWNrZ3JvdW5kOiBzdGFuZC50ZXN0cy5sZW5ndGggPiAwID8gJyMzQjgyRjYnIDogJyM5Q0EzQUYnIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLm1vbm8sIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogJyMzNzQxNTEnIH19PntzdGFuZC5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubW9ubywgZm9udFNpemU6IDEwLCBjb2xvcjogJyM2QjcyODAnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAge3N0YW5kLnRlc3RzLmxlbmd0aH0gdGVzdHtzdGFuZC50ZXN0cy5sZW5ndGggIT09IDEgPyAncycgOiAnJ317c3RhbmQudGVzdHMubGVuZ3RoID4gMCAmJiBgIFxcdTAwYjcgJHtzdGFuZC50ZXN0cy5yZWR1Y2UoKGEsIHQpID0+IGEgKyB0LmR1cmF0aW9uLCAwKX1oYH1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgc2V0SW5zZXJ0SW5kaWNhdG9yKHsgc3RhbmRJZDogc3RhbmQuaWQsIGluZGV4OiBzdGFuZC50ZXN0cy5sZW5ndGggfSk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgb25EcmFnTGVhdmU9eyhlKSA9PiB7IGlmICghZS5jdXJyZW50VGFyZ2V0LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCBhcyBOb2RlKSkgc2V0SW5zZXJ0SW5kaWNhdG9yKG51bGwpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIFJ1bm5pbmcgdGVzdHMgYWx3YXlzIGFwcGVuZCB0byBlbmQgKHBvc2l0aW9uIGlzIGdvdmVybmVkIGJ5IHRlc3Rfc3RhcnRlZF9kYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGRyYWdnZWRJc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIHN0YW5kLnRlc3RzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wT25TdGFuZChzdGFuZC5pZCwgaW5kPy5zdGFuZElkID09PSBzdGFuZC5pZCA/IGluZC5pbmRleCA6IHN0YW5kLnRlc3RzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IExBTkVfSEVJR0hULFxyXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gc2hvd0hlcmUgfHwgKGRyYWdnZWRUZXN0SWQgJiYgc3RhbmQudGVzdHMubGVuZ3RoID09PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHJldHVybiAnI0YzRjRGNic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkcmFnZ2VkSXNSdW5uaW5nID8gJyNGNUYzRkYnIDogJyNFRkY2RkYnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSkoKSxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAkeygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHNob3dIZXJlIHx8IChkcmFnZ2VkVGVzdElkICYmIHN0YW5kLnRlc3RzLmxlbmd0aCA9PT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWN0aXZlKSByZXR1cm4gJyNFNUU3RUInO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJhZ2dlZElzUnVubmluZyA/ICcjQTc4QkZBJyA6ICcjQkZEQkZFJztcclxuICAgICAgICAgICAgICAgICAgICAgIH0pKCl9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogOCxcclxuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0b3RhbFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2JhY2tncm91bmQgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7LyogV2Vla2VuZCBzaGFkaW5nICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtkYXlzLm1hcCgoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGQuZ2V0RGF5KCkgIT09IDAgJiYgZC5nZXREYXkoKSAhPT0gNikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YHdlLSR7aX1gfSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBpICogZGF5V2lkdGgsIHRvcDogMCwgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBkYXlXaWR0aCwgYmFja2dyb3VuZDogJyNFNUU3RUInLCBwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogRGF5IGdyaWQgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge2RheXMubWFwKChfLCBpKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGkgKiBkYXlXaWR0aCwgdG9wOiAwLCBib3R0b206IDAsIHdpZHRoOiAxLCBiYWNrZ3JvdW5kOiAnI0U1RTdFQicgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIE5vdyBsaW5lICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaCA9IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGggPCAwIHx8IGggPiB0b3RhbERheXMgKiAyNCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBoICogcHhQZXJIb3VyLCB0b3A6IDAsIGJvdHRvbTogMCwgd2lkdGg6IDIsIGJhY2tncm91bmQ6ICcjRUY0NDQ0JywgekluZGV4OiAxMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IC0zLCBsZWZ0OiAtMywgd2lkdGg6IDgsIGhlaWdodDogOCwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogJyNFRjQ0NDQnIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSgpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogVGVzdCBiYXJzICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzY2hlZHVsZS5tYXAoKHRlc3QsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNUZXN0UnVubmluZyA9IGlzUnVubmluZ1Rlc3QodGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXJQb3MgPSBpc1Rlc3RSdW5uaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZ2V0UnVubmluZ0JhclBvcyh0ZXN0LnN0YXJ0LCB0ZXN0LmVuZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBnZXRCYXJQb3ModGVzdC5zdGFydCwgdGVzdC5kdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBSdW5uaW5nIHRlc3RzIHRoYXQgZW5kZWQgYmVmb3JlIHRoZSB0aW1lbGluZSBzdGFydHNcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICghYmFyUG9zKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxlZnQsIHdpZHRoIH0gPSBiYXJQb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjRW5kID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZCh0ZXN0LmVuZCwgY2hIb3Vycywgd1N0YXJ0LCB3RW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZW92ZXJXaWR0aCA9IGhvdXJzQmV0d2Vlbih0ZXN0LmVuZCwgY0VuZCkgKiBweFBlckhvdXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5U3RhdHVzID0gZ2V0RGlzcGxheVN0YXR1cyh0ZXN0LCB0ZXN0LnN0YXJ0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZE1haW4gPSByZXNvbHZlVGVtcGxhdGUobWFpblRleHQsIHRlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRJbmZvID0gcmVzb2x2ZVRlbXBsYXRlKGluZm9Sb3csIHRlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hvd0luZm9PbkJhciA9IHJlc29sdmVkSW5mby50cmltKCkgIT09ICcnICYmIHdpZHRoID4gMTIwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXt0ZXN0LmlkfSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdCwgdG9wOiAwLCB3aWR0aDogd2lkdGggKyBjaGFuZ2VvdmVyV2lkdGgsIGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBEcm9wIHpvbmVzIFx1MjAxNCBzdXBwcmVzc2VkIHdoZW4gZHJhZ2dpbmcgYSBSdW5uaW5nIHRlc3QgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge2RyYWdnZWRUZXN0SWQgJiYgZHJhZ2dlZFRlc3RJZCAhPT0gdGVzdC5pZCAmJiAhZHJhZ2dlZElzUnVubmluZyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBzZXRJbnNlcnRJbmRpY2F0b3IoeyBzdGFuZElkOiBzdGFuZC5pZCwgaW5kZXg6IGlkeCB9KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIGlkeCk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IC02LCB0b3A6IDAsIHdpZHRoOiAnNTAlJywgaGVpZ2h0OiAnMTAwJScsIHpJbmRleDogMjAsIG1pbldpZHRoOiAyMCB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBzZXRJbnNlcnRJbmRpY2F0b3IoeyBzdGFuZElkOiBzdGFuZC5pZCwgaW5kZXg6IGlkeCArIDEgfSk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Ecm9wPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGRyb3BPblN0YW5kKHN0YW5kLmlkLCBpZHggKyAxKTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgcmlnaHQ6IC02LCB0b3A6IDAsIHdpZHRoOiAnNTAlJywgaGVpZ2h0OiAnMTAwJScsIHpJbmRleDogMjAsIG1pbldpZHRoOiAyMCB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIEluc2VydCBpbmRpY2F0b3IgYmVmb3JlIHRoaXMgdGVzdCBcdTIwMTQgc3VwcHJlc3NlZCBmb3IgUnVubmluZyBkcmFncyAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd0hlcmUgJiYgIWRyYWdnZWRJc1J1bm5pbmcgJiYgaW5kIS5pbmRleCA9PT0gaWR4ICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IC00LCB0b3A6IDAsIGJvdHRvbTogMCB9fT48SW5zZXJ0TGluZSAvPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBUZXN0IGJhciAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8VG9vbHRpcFdyYXBwZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlc3ROYW1lPXtyZXNvbHZlZE1haW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmlvcml0eT17dGVzdC5wcmlvcml0eX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cz17ZGlzcGxheVN0YXR1c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBMaW5lcz17cmVzb2x2ZVRlbXBsYXRlKHRpcFRlbXBsYXRlLCB0ZXN0KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZD17aXNUZXN0UnVubmluZyA/IG51bGwgOiB0ZXN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlclN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDAsIHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiAnMTAwJScgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17KGUpID0+IHsgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJzsgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyh0ZXN0LmlkKSk7IHNldERyYWdnZWRUZXN0SWQodGVzdC5pZCk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17Y2xlYXJEcmFnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eyhlKSA9PiB7IGlmICghZHJhZ2dlZFRlc3RJZCkgeyBjb25zdCBlbCA9IGUuY3VycmVudFRhcmdldDsgZWwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoLTJweCknOyBlbC5zdHlsZS5ib3hTaGFkb3cgPSAnMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMTUpJzsgZWwuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke2dldENhcENvbG9yKGRpc3BsYXlTdGF0dXMpfWA7IGVsLnN0eWxlLnpJbmRleCA9ICcyNSc7IH0gfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4geyBjb25zdCBlbCA9IGUuY3VycmVudFRhcmdldDsgZWwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoMCknOyBlbC5zdHlsZS5ib3hTaGFkb3cgPSAnMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4wNiknOyBlbC5zdHlsZS5ib3JkZXIgPSBpc1Rlc3RSdW5uaW5nID8gJzFweCBzb2xpZCAjQzRCNUZEJyA6ICcxcHggc29saWQgI0U1RTdFQic7IGVsLnN0eWxlLnpJbmRleCA9ICcxNSc7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAsIHRvcDogNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCwgaGVpZ2h0OiBCQVJfSEVJR0hULFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGlzVGVzdFJ1bm5pbmcgPyAnI0YzRThGRicgOiAnI0ZGRkZGRicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA4LCBjdXJzb3I6ICdncmFiJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBkcmFnZ2VkVGVzdElkID09PSB0ZXN0LmlkID8gMC4yNSA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGlzVGVzdFJ1bm5pbmcgPyAnMXB4IHNvbGlkICNDNEI1RkQnIDogJzFweCBzb2xpZCAjRTVFN0VCJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IGlzVGVzdFJ1bm5pbmcgPyAnMCAxcHggM3B4IHJnYmEoMTQ3LDUxLDIzNCwwLjE1KScgOiAnMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4wNiknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC4xNXMgZWFzZSwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLCBib3JkZXIgMC4xNXMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBTdGF0dXMgY2FwIGJhciAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNSwgbWluV2lkdGg6IDUsIGJhY2tncm91bmQ6IGdldENhcENvbG9yKGRpc3BsYXlTdGF0dXMpLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgcGFkZGluZzogJzRweCA4cHgnLCBtaW5XaWR0aDogMCwganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBUb3Agcm93OiBwcmlvcml0eSArIHN0YXR1cyAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7d2lkdGggPiA3MCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogMiB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLm1vbm8sIGZvbnRTaXplOiB3aWR0aCA+IDEyMCA/IDExIDogOSwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogaXNUZXN0UnVubmluZyA/ICcjN0UyMkNFJyA6IGdldFByaW9yaXR5VGV4dENvbG9yKHRlc3QucHJpb3JpdHkpIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc1Rlc3RSdW5uaW5nID8gJ1x1MjVCNiBSVU5OSU5HJyA6IGBQJHt0ZXN0LnByaW9yaXR5fWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3dpZHRoID4gMTAwICYmICFpc1Rlc3RSdW5uaW5nICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubW9ubywgZm9udFNpemU6IDksIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDVlbScsIGNvbG9yOiBnZXRTdGF0dXNUZXh0Q29sb3IoZGlzcGxheVN0YXR1cyksIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIGFzIGNvbnN0IH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Rpc3BsYXlTdGF0dXMudG9VcHBlckNhc2UoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBNYWluIHRleHQgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiB3aWR0aCA+IDEyMCA/IDEyIDogd2lkdGggPiA4MCA/IDExIDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiBpc1Rlc3RSdW5uaW5nID8gJyMzQjA3NjQnIDogJyMxMTE4MjcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgbWF4V2lkdGg6ICcxMDAlJywgbGluZUhlaWdodDogMS4yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc29sdmVkTWFpbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBJbmZvIHJvdyAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd0luZm9PbkJhciAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMubW9ubywgZm9udFNpemU6IDksIGZvbnRXZWlnaHQ6IDQwMCwgY29sb3I6IGlzVGVzdFJ1bm5pbmcgPyAnIzdFMjJDRScgOiAnIzRCNTU2MycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgbWF4V2lkdGg6ICcxMDAlJywgbWFyZ2luVG9wOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXNvbHZlZEluZm99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L1Rvb2x0aXBXcmFwcGVyPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogQ2hhbmdlb3ZlciBpbmRpY2F0b3IgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge2lkeCA8IHNjaGVkdWxlLmxlbmd0aCAmJiBjaGFuZ2VvdmVyV2lkdGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IHdpZHRoLCB0b3A6IExBTkVfSEVJR0hUIC8gMiAtIDgsIHdpZHRoOiBjaGFuZ2VvdmVyV2lkdGgsIGhlaWdodDogMTYsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IDEsIHdpZHRoOiAnODAlJywgYmFja2dyb3VuZDogJ3JlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoOTBkZWcsICM5Q0EzQUYgMCwgIzlDQTNBRiA0cHgsIHRyYW5zcGFyZW50IDRweCwgdHJhbnNwYXJlbnQgOHB4KScgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIEluc2VydCBpbmRpY2F0b3IgYXQgZW5kIFx1MjAxNCBzdXBwcmVzc2VkIHdoZW4gZHJhZ2dpbmcgYSBSdW5uaW5nIHRlc3QgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3Nob3dIZXJlICYmICFkcmFnZ2VkSXNSdW5uaW5nICYmIGluZCEuaW5kZXggPT09IHN0YW5kLnRlc3RzLmxlbmd0aCAmJiBzY2hlZHVsZS5sZW5ndGggPiAwICYmICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0ID0gc2NoZWR1bGVbc2NoZWR1bGUubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxlZnQsIHdpZHRoIH0gPSBnZXRCYXJQb3MobGFzdC5zdGFydCwgbGFzdC5kdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjRW5kID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChsYXN0LmVuZCwgY2hIb3Vycywgd1N0YXJ0LCB3RW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZW92ZXJXaWR0aCA9IGhvdXJzQmV0d2VlbihsYXN0LmVuZCwgY0VuZCkgKiBweFBlckhvdXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogbGVmdCArIHdpZHRoICsgY2hhbmdlb3ZlcldpZHRoICsgOCwgdG9wOiAwLCBib3R0b206IDAgfX0+PEluc2VydExpbmUgLz48L2Rpdj47XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIEVtcHR5IHN0YXRlICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzdGFuZC50ZXN0cy5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMubW9ubywgcG9zaXRpb246ICdhYnNvbHV0ZScsIGluc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGRyYWdnZWRUZXN0SWQgPyAnIzNCODJGNicgOiAnIzlDQTNBRicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGRyYWdnZWRUZXN0SWQgPyA2MDAgOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2RyYWdnZWRUZXN0SWQgPyAnRHJvcCBoZXJlIHRvIHNjaGVkdWxlJyA6ICdEcm9wIHRlc3RzIGhlcmUgdG8gc2NoZWR1bGUnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KX1cclxuXHJcbiAgICAgICAgICAgIHsvKiBObyBzdGFuZHMgbWVzc2FnZSAqL31cclxuICAgICAgICAgICAge3N0YW5kcy5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5tb25vLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBwYWRkaW5nOiAnNDhweCAyNHB4JyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzZCNzI4MCcsIGZvbnRTaXplOiAxMixcclxuICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgIE5vIHRlc3Qgc3RhbmRzIGxvYWRlZC4gQmluZCB0aGUgdGVzdFN0YW5kcyBwcm9wZXJ0eSB0byB5b3VyIGdldFRlc3RTdGFuZHMgcXVlcnkuXHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG4iLCAiXG4gICAgICAgICAgZXhwb3J0IGNvbnN0IHsgUmV0b29sIH0gPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmV0b29sQ3VzdG9tQ29tcG9uZW5Db2xsZWN0aW9ucztcbiAgICAgICAgIiwgIlxuICAgICAgICAgIGV4cG9ydCBjb25zdCB7IEZyYWdtZW50LCBqc3hzLCBqc3gsIGRlZmF1bHQgfSA9IHdpbmRvdy5jY2Nfc3VwcG9ydF9SZWFjdEpTWFJ1bnRpbWU7XG4gICAgICAgICJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFDVSxXQUFPLFVBQVUsT0FBTztBQUFBO0FBQUE7OztBQ0RsQyxtQkFBbUU7OztBQ0NsRCxJQUFNLEVBQUUsT0FBTyxJQUFJLE9BQU87OztBQ0ExQixJQUFNLEVBQUUsVUFBVSxNQUFNLEtBQUssU0FBQUEsU0FBUSxJQUFJLE9BQU87OztBRnFEakUsSUFBTSxtQkFBbUIsQ0FBQyxRQUFxQjtBQUM3QyxNQUFJLFFBQVEsUUFBUSxRQUFRLFVBQWEsUUFBUSxNQUFNLFFBQVE7QUFBTyxXQUFPO0FBQzdFLFFBQU0sTUFBTSxPQUFPLEdBQUc7QUFDdEIsTUFBSSxxQkFBcUIsS0FBSyxHQUFHLEdBQUc7QUFDbEMsVUFBTSxJQUFJLElBQUksS0FBSyxHQUFHO0FBQ3RCLFFBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEdBQUc7QUFDdkIsYUFBTyxFQUFFLG1CQUFtQixTQUFTLEVBQUUsS0FBSyxXQUFXLE9BQU8sUUFBUSxDQUFDO0FBQUEsSUFDekU7QUFBQSxFQUNGO0FBQ0EsU0FB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
