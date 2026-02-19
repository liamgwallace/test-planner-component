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
  container: { display: "flex", height: "100%", background: "#F9FAFB", overflow: "hidden", fontFamily: "'DM Sans', sans-serif", position: "relative" },
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
var SaveOverlay = ({ isError, onRetry, onDiscard }) => /* @__PURE__ */ jsxs("div", { style: {
  position: "absolute",
  inset: 0,
  zIndex: 2e3,
  background: "rgba(249,250,251,0.82)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}, children: [
  /* @__PURE__ */ jsx("style", { children: `@keyframes ccl-spin { to { transform: rotate(360deg); } }` }),
  !isError ? /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }, children: [
    /* @__PURE__ */ jsx("div", { style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      border: "3px solid #E5E7EB",
      borderTopColor: "#3B82F6",
      animation: "ccl-spin 0.7s linear infinite"
    } }),
    /* @__PURE__ */ jsx("span", { style: { fontSize: 13, fontWeight: 600, color: "#374151" }, children: "Saving\u2026" })
  ] }) : /* @__PURE__ */ jsxs("div", { style: {
    background: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
    padding: "24px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    maxWidth: 300
  }, children: [
    /* @__PURE__ */ jsx("div", { style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "#FEF2F2",
      border: "1px solid #FECACA",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      color: "#EF4444",
      fontWeight: 700
    }, children: "!" }),
    /* @__PURE__ */ jsx("div", { style: { fontSize: 15, fontWeight: 700, color: "#111827" }, children: "Save failed" }),
    /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "#6B7280", textAlign: "center", lineHeight: 1.5 }, children: "The allocation could not be saved. You can retry or discard your changes." }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, marginTop: 4 }, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onDiscard,
          style: {
            padding: "7px 16px",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 6,
            border: "1px solid #D1D5DB",
            cursor: "pointer",
            background: "#FFFFFF",
            color: "#374151"
          },
          children: "Discard"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onRetry,
          style: {
            padding: "7px 16px",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            background: "#3B82F6",
            color: "#FFFFFF",
            boxShadow: "0 1px 3px rgba(59,130,246,0.3)"
          },
          children: "Retry"
        }
      )
    ] })
  ] })
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
  const [isSaving] = Retool.useStateBoolean({
    name: "isSaving",
    initialValue: false,
    inspector: "checkbox",
    label: "Is Saving",
    description: "Bind to: {{ saveAllocations.isFetching }}"
  });
  const [hasSaveError] = Retool.useStateBoolean({
    name: "hasSaveError",
    initialValue: false,
    inspector: "checkbox",
    label: "Has Save Error",
    description: "Bind to: {{ !!saveAllocations.error }}"
  });
  const [savedAt] = Retool.useStateString({
    name: "savedAt",
    initialValue: "",
    inspector: "text",
    label: "Saved At",
    description: "Bind to: {{ saveAllocations.lastRunAt }}"
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
  const onRetry = Retool.useEventCallback({ name: "onRetry" });
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
  const [pendingSave, setPendingSave] = import_react.default.useState(false);
  const [saveError, setSaveError] = import_react.default.useState(false);
  const isLocked = pendingSave || isSaving || saveError;
  (0, import_react.useEffect)(() => {
    if (isSaving) {
      setPendingSave(false);
    }
    if (hasSaveError) {
      setPendingSave(false);
      setSaveError(true);
    } else if (!isSaving) {
      setSaveError(false);
    }
  }, [isSaving, hasSaveError]);
  const originalAllocationsRef = (0, import_react.useRef)("");
  const prevSavedAtRef = import_react.default.useRef("");
  const scrollRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const ts = savedAt;
    if (!ts || ts === prevSavedAtRef.current)
      return;
    prevSavedAtRef.current = ts;
    const currentAllocs = buildAllocations(stands);
    originalAllocationsRef.current = allocationsKey(currentAllocs);
    setIsDirty(false);
    setPendingSave(false);
    setSaveError(false);
  }, [savedAt, stands]);
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
    setPendingSave(false);
    setSaveError(false);
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
      setPendingSave(true);
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
    setPendingSave(true);
    onSave();
  }, [onSave]);
  const handleDiscard = (0, import_react.useCallback)(() => {
    setSaveError(false);
    setPendingSave(false);
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
  const handleRetry = (0, import_react.useCallback)(() => {
    setSaveError(false);
    setPendingSave(true);
    onRetry();
  }, [onRetry]);
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
    isLocked && /* @__PURE__ */ jsx(
      SaveOverlay,
      {
        isError: saveError,
        onRetry: handleRetry,
        onDiscard: handleDiscard
      }
    ),
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
                disabled: !isDirty || isLocked,
                style: {
                  ...styles.mono,
                  padding: "6px 14px",
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 6,
                  border: "1px solid #D1D5DB",
                  cursor: isDirty && !isLocked ? "pointer" : "default",
                  background: "#FFFFFF",
                  color: isDirty && !isLocked ? "#374151" : "#9CA3AF",
                  opacity: isDirty && !isLocked ? 1 : 0.5
                },
                children: "Discard"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: handleSave,
                disabled: !isDirty || isLocked,
                style: {
                  ...styles.mono,
                  padding: "6px 14px",
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 6,
                  border: "none",
                  cursor: isDirty && !isLocked ? "pointer" : "default",
                  background: isDirty && !isLocked ? "#3B82F6" : "#93C5FD",
                  color: "#FFFFFF",
                  boxShadow: isDirty && !isLocked ? "0 1px 3px rgba(59,130,246,0.3)" : "none"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhY3QtZ2xvYmFsOnJlYWN0IiwgIi4uL3NyYy9pbmRleC50c3giLCAidHJ5cmV0b29sLWN1c3RvbS1jb21wb25lbnQtY29sbGVjdGlvbnMtZ2xvYmFsOkB0cnlyZXRvb2wvY3VzdG9tLWNvbXBvbmVudC1zdXBwb3J0IiwgInJlYWN0LWpzeC1ydW50aW1lLWdsb2JhbDpyZWFjdC9qc3gtcnVudGltZSJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmVhY3Q7XG4gICAgICAgICIsICJpbXBvcnQgUmVhY3QsIHsgRkMsIHVzZVJlZiwgdXNlTWVtbywgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSZXRvb2wgfSBmcm9tIFwiQHRyeXJldG9vbC9jdXN0b20tY29tcG9uZW50LXN1cHBvcnRcIjtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUeXBlc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFRlc3REYXRhIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkdXJhdGlvbjogbnVtYmVyO1xyXG4gIG93bmVyOiBzdHJpbmc7XHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuICBub3Rlczogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpb3JpdHlfb3JkZXI6IG51bWJlciB8IG51bGw7XHJcbiAgYWxsb2NhdGlvbl9pZDogbnVtYmVyIHwgbnVsbDtcclxuICBhc3NpZ25lZF9wYXJ0czogc3RyaW5nIHwgbnVsbDtcclxuICBwYXJ0X3JlYWR5X2RhdGU6IHN0cmluZyB8IG51bGw7XHJcbiAgcGFydF9zdGF0dXM6IHN0cmluZztcclxuICB0ZXN0X3N0YXJ0ZWRfZGF0ZTogc3RyaW5nIHwgbnVsbDtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7IC8vIGFsbG93IGFyYml0cmFyeSBmaWVsZHMgZm9yIHRlbXBsYXRlIHJlc29sdXRpb25cclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YW5kRGVmIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIEludGVybmFsU3RhbmQge1xyXG4gIGlkOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHRlc3RzOiBUZXN0RGF0YVtdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgU2NoZWR1bGVkVGVzdCBleHRlbmRzIFRlc3REYXRhIHtcclxuICBzdGFydDogRGF0ZTtcclxuICBlbmQ6IERhdGU7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnNlcnRJbmRpY2F0b3Ige1xyXG4gIHN0YW5kSWQ6IG51bWJlciB8IHN0cmluZztcclxuICBpbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQWxsb2NhdGlvblJlY29yZCB7XHJcbiAgdGVzdF9pZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBwcmlvcml0eV9vcmRlcjogbnVtYmVyO1xyXG59XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gVGVtcGxhdGUgUmVzb2x1dGlvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgZm9ybWF0RmllbGRWYWx1ZSA9ICh2YWw6IGFueSk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09ICcnIHx8IHZhbCA9PT0gJ25hbicpIHJldHVybiAnJztcclxuICBjb25zdCBzdHIgPSBTdHJpbmcodmFsKTtcclxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfS8udGVzdChzdHIpKSB7XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoc3RyKTtcclxuICAgIGlmICghaXNOYU4oZC5nZXRUaW1lKCkpKSB7XHJcbiAgICAgIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JyB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHN0cjtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVUZW1wbGF0ZSA9ICh0ZW1wbGF0ZTogYW55LCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogc3RyaW5nID0+IHtcclxuICBpZiAoIXRlbXBsYXRlKSByZXR1cm4gJyc7XHJcbiAgY29uc3Qgc3RyID0gdHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyA/IHRlbXBsYXRlIDogU3RyaW5nKHRlbXBsYXRlKTtcclxuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAoXywgZmllbGQpID0+IGZvcm1hdEZpZWxkVmFsdWUoZGF0YVtmaWVsZF0pKTtcclxufTtcclxuXHJcbmNvbnN0IGlzVGVtcGxhdGVFbXB0eSA9ICh0ZW1wbGF0ZTogYW55LCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgc3RyID0gdHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyA/IHRlbXBsYXRlIDogU3RyaW5nKHRlbXBsYXRlIHx8ICcnKTtcclxuICBjb25zdCByZXNvbHZlZCA9IHJlc29sdmVUZW1wbGF0ZShzdHIsIGRhdGEpO1xyXG4gIGNvbnN0IHN0YXRpY09ubHkgPSBzdHIucmVwbGFjZSgvXFx7KFxcdyspXFx9L2csICcnKTtcclxuICByZXR1cm4gcmVzb2x2ZWQudHJpbSgpID09PSBzdGF0aWNPbmx5LnRyaW0oKSB8fCByZXNvbHZlZC50cmltKCkgPT09ICcnO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIERhdGUgVXRpbGl0aWVzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBNU19QRVJfSE9VUiA9IDM2MDAwMDA7XHJcblxyXG5jb25zdCBwYXJzZUxvY2FsRGF0ZSA9IChkYXRlU3RyOiBzdHJpbmcgfCBudWxsKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghZGF0ZVN0cikgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcGFydHMgPSBkYXRlU3RyLnNwbGl0KCctJykubWFwKE51bWJlcik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKHBhcnRzWzBdLCBwYXJ0c1sxXSAtIDEsIHBhcnRzWzJdLCAwLCAwLCAwLCAwKTtcclxufTtcclxuXHJcbmNvbnN0IHRvTWlkbmlnaHQgPSAoZGF0ZTogRGF0ZSk6IERhdGUgPT4ge1xyXG4gIGNvbnN0IGQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICBkLnNldEhvdXJzKDAsIDAsIDAsIDApO1xyXG4gIHJldHVybiBkO1xyXG59O1xyXG5cclxuY29uc3QgaXNXb3JrRGF5ID0gKGQ6IERhdGUpOiBib29sZWFuID0+IGQuZ2V0RGF5KCkgIT09IDAgJiYgZC5nZXREYXkoKSAhPT0gNjtcclxuXHJcbmNvbnN0IGdldE5leHRXb3JrZGF5U3RhcnQgPSAoZGF0ZTogRGF0ZSwgd29ya1N0YXJ0OiBudW1iZXIpOiBEYXRlID0+IHtcclxuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgZC5zZXRIb3Vycyh3b3JrU3RhcnQsIDAsIDAsIDApO1xyXG4gIHdoaWxlIChkLmdldERheSgpID09PSAwIHx8IGQuZ2V0RGF5KCkgPT09IDYpIHtcclxuICAgIGQuc2V0RGF0ZShkLmdldERhdGUoKSArIDEpO1xyXG4gIH1cclxuICByZXR1cm4gZDtcclxufTtcclxuXHJcbmNvbnN0IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQgPSAoXHJcbiAgcHJldlRlc3RFbmQ6IERhdGUsXHJcbiAgY2hhbmdlb3ZlckhvdXJzOiBudW1iZXIsXHJcbiAgd29ya1N0YXJ0OiBudW1iZXIsXHJcbiAgd29ya0VuZDogbnVtYmVyXHJcbik6IERhdGUgPT4ge1xyXG4gIGxldCBjaGFuZ2VvdmVyU3RhcnQgPSBuZXcgRGF0ZShwcmV2VGVzdEVuZCk7XHJcblxyXG4gIGlmICghaXNXb3JrRGF5KGNoYW5nZW92ZXJTdGFydCkgfHwgY2hhbmdlb3ZlclN0YXJ0LmdldEhvdXJzKCkgPj0gd29ya0VuZCkge1xyXG4gICAgY2hhbmdlb3ZlclN0YXJ0ID0gZ2V0TmV4dFdvcmtkYXlTdGFydChuZXcgRGF0ZShjaGFuZ2VvdmVyU3RhcnQuZ2V0VGltZSgpICsgTVNfUEVSX0hPVVIgKiAxMiksIHdvcmtTdGFydCk7XHJcbiAgfSBlbHNlIGlmIChjaGFuZ2VvdmVyU3RhcnQuZ2V0SG91cnMoKSA8IHdvcmtTdGFydCkge1xyXG4gICAgY2hhbmdlb3ZlclN0YXJ0LnNldEhvdXJzKHdvcmtTdGFydCwgMCwgMCwgMCk7XHJcbiAgfVxyXG5cclxuICBsZXQgcmVtYWluaW5nID0gY2hhbmdlb3ZlckhvdXJzO1xyXG4gIGxldCBlbmQgPSBuZXcgRGF0ZShjaGFuZ2VvdmVyU3RhcnQpO1xyXG5cclxuICB3aGlsZSAocmVtYWluaW5nID4gMCkge1xyXG4gICAgaWYgKCFpc1dvcmtEYXkoZW5kKSkge1xyXG4gICAgICBlbmQgPSBnZXROZXh0V29ya2RheVN0YXJ0KG5ldyBEYXRlKGVuZC5nZXRUaW1lKCkgKyBNU19QRVJfSE9VUiAqIDEyKSwgd29ya1N0YXJ0KTtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBhdmFpbGFibGUgPSB3b3JrRW5kIC0gZW5kLmdldEhvdXJzKCk7XHJcbiAgICBjb25zdCBhcHBseSA9IE1hdGgubWluKHJlbWFpbmluZywgYXZhaWxhYmxlKTtcclxuICAgIGVuZC5zZXRUaW1lKGVuZC5nZXRUaW1lKCkgKyBhcHBseSAqIE1TX1BFUl9IT1VSKTtcclxuICAgIHJlbWFpbmluZyAtPSBhcHBseTtcclxuICAgIGlmIChyZW1haW5pbmcgPiAwKSB7XHJcbiAgICAgIGVuZCA9IGdldE5leHRXb3JrZGF5U3RhcnQobmV3IERhdGUoZW5kLmdldFRpbWUoKSArIE1TX1BFUl9IT1VSICogMTIpLCB3b3JrU3RhcnQpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZW5kO1xyXG59O1xyXG5cclxuY29uc3QgZ2VuZXJhdGVEYXlzID0gKHN0YXJ0OiBEYXRlLCBudW1EYXlzOiBudW1iZXIpOiBEYXRlW10gPT4ge1xyXG4gIGNvbnN0IGRheXM6IERhdGVbXSA9IFtdO1xyXG4gIGxldCBjdXIgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1EYXlzOyBpKyspIHtcclxuICAgIGRheXMucHVzaChuZXcgRGF0ZShjdXIpKTtcclxuICAgIGN1ci5zZXREYXRlKGN1ci5nZXREYXRlKCkgKyAxKTtcclxuICB9XHJcbiAgcmV0dXJuIGRheXM7XHJcbn07XHJcblxyXG5jb25zdCBnZW5lcmF0ZVdlZWtzID0gKHN0YXJ0OiBEYXRlLCBudW1EYXlzOiBudW1iZXIpOiBEYXRlW10gPT4ge1xyXG4gIGNvbnN0IHJlc3VsdDogRGF0ZVtdID0gW107XHJcbiAgbGV0IGN1ciA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICB3aGlsZSAoY3VyLmdldERheSgpICE9PSAxKSBjdXIuc2V0RGF0ZShjdXIuZ2V0RGF0ZSgpIC0gMSk7XHJcbiAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICBlbmREYXRlLnNldERhdGUoZW5kRGF0ZS5nZXREYXRlKCkgKyBudW1EYXlzKTtcclxuICB3aGlsZSAoY3VyIDwgZW5kRGF0ZSkge1xyXG4gICAgcmVzdWx0LnB1c2gobmV3IERhdGUoY3VyKSk7XHJcbiAgICBjdXIuc2V0RGF0ZShjdXIuZ2V0RGF0ZSgpICsgNyk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jb25zdCBob3Vyc0JldHdlZW4gPSAoYTogRGF0ZSwgYjogRGF0ZSk6IG51bWJlciA9PiAoYi5nZXRUaW1lKCkgLSBhLmdldFRpbWUoKSkgLyBNU19QRVJfSE9VUjtcclxuY29uc3QgZm9ybWF0V2VlayA9IChkOiBEYXRlKTogc3RyaW5nID0+IGBXL0MgJHtkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JyB9KX1gO1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFBhcnQgU3RhdHVzIExvZ2ljXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBub3JtYWxpemVQYXJ0U3RhdHVzID0gKHJhd1N0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBpZiAoIXJhd1N0YXR1cyB8fCByYXdTdGF0dXMgPT09ICduYW4nKSByZXR1cm4gJ0luIFByb2dyZXNzJztcclxuICBjb25zdCBsb3dlciA9IHJhd1N0YXR1cy50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICBpZiAobG93ZXIgPT09ICdyZWFkeScpIHJldHVybiAnUmVhZHknO1xyXG4gIGlmIChsb3dlciA9PT0gJ3BhcnRzIG5vdCBhc3NpZ25lZCcpIHJldHVybiAnUGFydHMgTm90IEFzc2lnbmVkJztcclxuICByZXR1cm4gJ0luIFByb2dyZXNzJztcclxufTtcclxuXHJcbmNvbnN0IGdldENhbGN1bGF0ZWRTdGF0dXMgPSAodGVzdDogVGVzdERhdGEsIHRlc3RTdGFydERhdGU6IERhdGUgfCBudWxsID0gbnVsbCk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgYmFzZVN0YXR1cyA9IG5vcm1hbGl6ZVBhcnRTdGF0dXModGVzdC5wYXJ0X3N0YXR1cyk7XHJcbiAgaWYgKGJhc2VTdGF0dXMgPT09ICdSZWFkeScpIHJldHVybiAnUmVhZHknO1xyXG4gIGlmIChiYXNlU3RhdHVzID09PSAnUGFydHMgTm90IEFzc2lnbmVkJykgcmV0dXJuICdQYXJ0cyBOb3QgQXNzaWduZWQnO1xyXG5cclxuICBpZiAodGVzdFN0YXJ0RGF0ZSAmJiB0ZXN0LnBhcnRfcmVhZHlfZGF0ZSkge1xyXG4gICAgY29uc3QgcmVhZHlEYXRlID0gcGFyc2VMb2NhbERhdGUodGVzdC5wYXJ0X3JlYWR5X2RhdGUpO1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gdG9NaWRuaWdodCh0ZXN0U3RhcnREYXRlKTtcclxuICAgIGlmIChyZWFkeURhdGUgJiYgc3RhcnREYXRlKSB7XHJcbiAgICAgIHJldHVybiByZWFkeURhdGUuZ2V0VGltZSgpID4gc3RhcnREYXRlLmdldFRpbWUoKSA/ICdEZWxheWVkJyA6ICdPbiBUaW1lJztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuICdJbiBQcm9ncmVzcyc7XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU3R5bGluZ1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgaXNSdW5uaW5nVGVzdCA9ICh0ZXN0OiBUZXN0RGF0YSk6IGJvb2xlYW4gPT4gdGVzdC5zdGF0dXMgPT09ICdSdW5uaW5nJztcclxuXHJcbmNvbnN0IHN0YXR1c0NhcENvbG9yczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICAnUnVubmluZyc6ICcjOTMzM0VBJyxcclxuICAnUmVhZHknOiAnIzIyQzU1RScsXHJcbiAgJ09uIFRpbWUnOiAnI0U1QTAwRCcsXHJcbiAgJ0RlbGF5ZWQnOiAnI0VGNDQ0NCcsXHJcbiAgJ1BhcnRzIE5vdCBBc3NpZ25lZCc6ICcjOUNBM0FGJyxcclxuICAnSW4gUHJvZ3Jlc3MnOiAnI0QxRDVEQicsXHJcbn07XHJcblxyXG5jb25zdCBzdGF0dXNUZXh0Q29sb3JzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICdSdW5uaW5nJzogJyM3RTIyQ0UnLFxyXG4gICdSZWFkeSc6ICcjMTZBMzRBJyxcclxuICAnT24gVGltZSc6ICcjQjQ1MzA5JyxcclxuICAnRGVsYXllZCc6ICcjREMyNjI2JyxcclxuICAnUGFydHMgTm90IEFzc2lnbmVkJzogJyM2QjcyODAnLFxyXG4gICdJbiBQcm9ncmVzcyc6ICcjOUNBM0FGJyxcclxufTtcclxuXHJcbmNvbnN0IGdldENhcENvbG9yID0gKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IHN0YXR1c0NhcENvbG9yc1tzdGF0dXNdIHx8IHN0YXR1c0NhcENvbG9yc1snSW4gUHJvZ3Jlc3MnXTtcclxuY29uc3QgZ2V0U3RhdHVzVGV4dENvbG9yID0gKHN0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IHN0YXR1c1RleHRDb2xvcnNbc3RhdHVzXSB8fCBzdGF0dXNUZXh0Q29sb3JzWydJbiBQcm9ncmVzcyddO1xyXG5cclxuLy8gUmV0dXJucyAnUnVubmluZycgZm9yIFJ1bm5pbmcgdGVzdHMgKG92ZXJyaWRlcyBwYXJ0IHN0YXR1cyBmb3IgZGlzcGxheSBjb2xvdXJzKVxyXG5jb25zdCBnZXREaXNwbGF5U3RhdHVzID0gKHRlc3Q6IFRlc3REYXRhLCB0ZXN0U3RhcnREYXRlOiBEYXRlIHwgbnVsbCA9IG51bGwpOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChpc1J1bm5pbmdUZXN0KHRlc3QpKSByZXR1cm4gJ1J1bm5pbmcnO1xyXG4gIHJldHVybiBnZXRDYWxjdWxhdGVkU3RhdHVzKHRlc3QsIHRlc3RTdGFydERhdGUpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UHJpb3JpdHlUZXh0Q29sb3IgPSAocHJpb3JpdHk6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gdHlwZW9mIHByaW9yaXR5ID09PSAnbnVtYmVyJyA/IHByaW9yaXR5IDogNTA7XHJcbiAgY29uc3QgY2xhbXBlZCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgdmFsdWUpKTtcclxuICBpZiAoY2xhbXBlZCA8PSAzMCkgcmV0dXJuICcjNkI3MjgwJzsgLy8gZ3JleSBmb3IgbG93IHByaW9yaXR5XHJcbiAgaWYgKGNsYW1wZWQgPD0gNjApIHJldHVybiAnI0Y1OUUwQic7IC8vIG9yYW5nZSBmb3IgbWVkaXVtXHJcbiAgaWYgKGNsYW1wZWQgPD0gODApIHJldHVybiAnI0VBNTgwQyc7IC8vIGRhcmsgb3JhbmdlIGZvciBoaWdoXHJcbiAgcmV0dXJuICcjREMyNjI2JzsgLy8gcmVkIGZvciBjcml0aWNhbFxyXG59O1xyXG5cclxuLy8gS2VlcCBvbGQgZ2V0UHJpb3JpdHlDb2xvciBmb3Igc2lkZWJhciBjYXJkc1xyXG5jb25zdCBnZXRQcmlvcml0eUNvbG9yID0gKHByaW9yaXR5OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBwcmlvcml0eSA9PT0gJ251bWJlcicgPyBwcmlvcml0eSA6IDUwO1xyXG4gIGNvbnN0IGNsYW1wZWQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHZhbHVlKSk7XHJcbiAgY29uc3QgcmF0aW8gPSBjbGFtcGVkIC8gMTAwO1xyXG4gIGNvbnN0IGcgPSBNYXRoLnJvdW5kKDI1NSAqICgxIC0gcmF0aW8pKTtcclxuICBjb25zdCBiID0gTWF0aC5yb3VuZCgyNTUgKiAoMSAtIHJhdGlvKSk7XHJcbiAgcmV0dXJuIGByZ2JhKDI1NSwgJHtnfSwgJHtifSwgMC42KWA7XHJcbn07XHJcblxyXG5jb25zdCBzdHlsZXMgPSB7XHJcbiAgY29udGFpbmVyOiB7IGRpc3BsYXk6ICdmbGV4JywgaGVpZ2h0OiAnMTAwJScsIGJhY2tncm91bmQ6ICcjRjlGQUZCJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCBmb250RmFtaWx5OiBcIidETSBTYW5zJywgc2Fucy1zZXJpZlwiLCBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9IGFzIFJlYWN0LkNTU1Byb3BlcnRpZXMsXHJcbiAgc2lkZWJhcjogeyB3aWR0aDogMzIwLCBtaW5XaWR0aDogMzIwLCBiYWNrZ3JvdW5kOiAnI0ZGRkZGRicsIGJvcmRlclJpZ2h0OiAnMXB4IHNvbGlkICNFNUU3RUInLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nIH0gYXMgUmVhY3QuQ1NTUHJvcGVydGllcyxcclxuICBtb25vOiB7IGZvbnRGYW1pbHk6IFwiJ0pldEJyYWlucyBNb25vJywgbW9ub3NwYWNlXCIgfSBhcyBSZWFjdC5DU1NQcm9wZXJ0aWVzLFxyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFN1Yi1jb21wb25lbnRzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBJbnNlcnRMaW5lOiBGQyA9ICgpID0+IChcclxuICA8ZGl2IHN0eWxlPXt7XHJcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAyLCBib3R0b206IDIsIHdpZHRoOiAzLFxyXG4gICAgYmFja2dyb3VuZDogJyMzQjgyRjYnLCBib3JkZXJSYWRpdXM6IDIsIHpJbmRleDogMzAsXHJcbiAgICBib3hTaGFkb3c6ICcwIDAgMTJweCAjM0I4MkY2LCAwIDAgNHB4ICMzQjgyRjYnLFxyXG4gICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG4gIH19PlxyXG4gICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAtNCwgbGVmdDogLTQsIHdpZHRoOiAxMSwgaGVpZ2h0OiAxMSwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogJyMzQjgyRjYnIH19IC8+XHJcbiAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBib3R0b206IC00LCBsZWZ0OiAtNCwgd2lkdGg6IDExLCBoZWlnaHQ6IDExLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiAnIzNCODJGNicgfX0gLz5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmNvbnN0IE91dGxpbmVLZXk6IEZDID0gKCkgPT4gKFxyXG4gIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMTZweCcsIGJvcmRlclRvcDogJzFweCBzb2xpZCAjRTVFN0VCJywgYmFja2dyb3VuZDogJyNGOUZBRkInIH19PlxyXG4gICAgPGgzIHN0eWxlPXt7IC4uLnN0eWxlcy5tb25vLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDhlbScsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBjb2xvcjogJyM0QjU1NjMnLCBtYXJnaW5Cb3R0b206IDYgfX0+U3RhdHVzIEtleTwvaDM+XHJcbiAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleFdyYXA6ICd3cmFwJywgZ2FwOiAnNHB4IDAnIH19PlxyXG4gICAgICB7KFsnUnVubmluZycsICdSZWFkeScsICdPbiBUaW1lJywgJ0RlbGF5ZWQnLCAnUGFydHMgTm90IEFzc2lnbmVkJ10gYXMgY29uc3QpLm1hcCgoa2V5KSA9PiAoXHJcbiAgICAgICAgPGRpdiBrZXk9e2tleX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA2LCB3aWR0aDogJzUwJScsIG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNCwgaGVpZ2h0OiAxNCwgYmFja2dyb3VuZDogc3RhdHVzQ2FwQ29sb3JzW2tleV0sIGJvcmRlclJhZGl1czogMiwgZmxleFNocmluazogMCB9fSAvPlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgLi4uc3R5bGVzLm1vbm8sIGZvbnRTaXplOiA5LCBjb2xvcjogZ2V0U3RhdHVzVGV4dENvbG9yKGtleSksIGZvbnRXZWlnaHQ6IDYwMCwgd2hpdGVTcGFjZTogJ25vd3JhcCcsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnIH19PntrZXkudG9VcHBlckNhc2UoKX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkpfVxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU2F2ZSBPdmVybGF5XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5pbnRlcmZhY2UgU2F2ZU92ZXJsYXlQcm9wcyB7XHJcbiAgaXNFcnJvcjogYm9vbGVhbjtcclxuICBvblJldHJ5OiAoKSA9PiB2b2lkO1xyXG4gIG9uRGlzY2FyZDogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuY29uc3QgU2F2ZU92ZXJsYXk6IEZDPFNhdmVPdmVybGF5UHJvcHM+ID0gKHsgaXNFcnJvciwgb25SZXRyeSwgb25EaXNjYXJkIH0pID0+IChcclxuICA8ZGl2IHN0eWxlPXt7XHJcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgaW5zZXQ6IDAsIHpJbmRleDogMjAwMCxcclxuICAgIGJhY2tncm91bmQ6ICdyZ2JhKDI0OSwyNTAsMjUxLDAuODIpJyxcclxuICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICB9fT5cclxuICAgIDxzdHlsZT57YEBrZXlmcmFtZXMgY2NsLXNwaW4geyB0byB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0gfWB9PC9zdHlsZT5cclxuICAgIHshaXNFcnJvciA/IChcclxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMiB9fT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogMzIsIGhlaWdodDogMzIsIGJvcmRlclJhZGl1czogJzUwJScsXHJcbiAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgI0U1RTdFQicsIGJvcmRlclRvcENvbG9yOiAnIzNCODJGNicsXHJcbiAgICAgICAgICBhbmltYXRpb246ICdjY2wtc3BpbiAwLjdzIGxpbmVhciBpbmZpbml0ZScsXHJcbiAgICAgICAgfX0gLz5cclxuICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6ICcjMzc0MTUxJyB9fT5TYXZpbmdcdTIwMjY8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKSA6IChcclxuICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICcjRkZGRkZGJywgYm9yZGVyOiAnMXB4IHNvbGlkICNFNUU3RUInLCBib3JkZXJSYWRpdXM6IDEyLFxyXG4gICAgICAgIGJveFNoYWRvdzogJzAgNHB4IDIwcHggcmdiYSgwLDAsMCwwLjEyKScsIHBhZGRpbmc6ICcyNHB4IDI4cHgnLFxyXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDEyLFxyXG4gICAgICAgIG1heFdpZHRoOiAzMDAsXHJcbiAgICAgIH19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgIHdpZHRoOiA0MCwgaGVpZ2h0OiA0MCwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogJyNGRUYyRjInLFxyXG4gICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNGRUNBQ0EnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICBmb250U2l6ZTogMjAsIGNvbG9yOiAnI0VGNDQ0NCcsIGZvbnRXZWlnaHQ6IDcwMCxcclxuICAgICAgICB9fT4hPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTUsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6ICcjMTExODI3JyB9fT5TYXZlIGZhaWxlZDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogJyM2QjcyODAnLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBsaW5lSGVpZ2h0OiAxLjUgfX0+XHJcbiAgICAgICAgICBUaGUgYWxsb2NhdGlvbiBjb3VsZCBub3QgYmUgc2F2ZWQuIFlvdSBjYW4gcmV0cnkgb3IgZGlzY2FyZCB5b3VyIGNoYW5nZXMuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgbWFyZ2luVG9wOiA0IH19PlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkRpc2NhcmR9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxNnB4JywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogNixcclxuICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI0QxRDVEQicsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjRkZGRkZGJywgY29sb3I6ICcjMzc0MTUxJyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5EaXNjYXJkPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uUmV0cnl9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxNnB4JywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogNixcclxuICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMzQjgyRjYnLCBjb2xvcjogJyNGRkZGRkYnLFxyXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMXB4IDNweCByZ2JhKDU5LDEzMCwyNDYsMC4zKScsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+UmV0cnk8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApfVxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEN1c3RvbSBUb29sdGlwIENvbXBvbmVudFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFRvb2x0aXBXcmFwcGVyUHJvcHMge1xyXG4gIHRlc3ROYW1lOiBzdHJpbmc7XHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuICBzdGF0dXM6IHN0cmluZztcclxuICB0b29sdGlwTGluZXM6IHN0cmluZztcclxuICBzY2hlZHVsZWQ/OiB7IHN0YXJ0OiBEYXRlOyBlbmQ6IERhdGUgfSB8IG51bGw7XHJcbiAgd3JhcHBlclN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcclxuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xyXG59XHJcblxyXG5jb25zdCBUb29sdGlwV3JhcHBlcjogRkM8VG9vbHRpcFdyYXBwZXJQcm9wcz4gPSAoeyB0ZXN0TmFtZSwgcHJpb3JpdHksIHN0YXR1cywgdG9vbHRpcExpbmVzLCBzY2hlZHVsZWQsIHdyYXBwZXJTdHlsZSwgY2hpbGRyZW4gfSkgPT4ge1xyXG4gIGNvbnN0IFtzaG93LCBzZXRTaG93XSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcG9zLCBzZXRQb3NdID0gUmVhY3QudXNlU3RhdGUoeyB4OiAwLCB5OiAwLCBib3R0b206IDAgfSk7XHJcbiAgY29uc3QgW2ZsaXBwZWQsIHNldEZsaXBwZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHRpbWVvdXRSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3Qgd3JhcFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcbiAgY29uc3QgdGlwUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRW50ZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAod3JhcFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGNvbnN0IHJlY3QgPSB3cmFwUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIHNldFBvcyh7IHg6IHJlY3QubGVmdCArIHJlY3Qud2lkdGggLyAyLCB5OiByZWN0LnRvcCwgYm90dG9tOiByZWN0LmJvdHRvbSB9KTtcclxuICAgIH1cclxuICAgIHRpbWVvdXRSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHNldFNob3codHJ1ZSksIDQwMCk7XHJcbiAgfSwgW10pO1xyXG4gIGNvbnN0IGhhbmRsZUxlYXZlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHRpbWVvdXRSZWYuY3VycmVudCkgY2xlYXJUaW1lb3V0KHRpbWVvdXRSZWYuY3VycmVudCk7XHJcbiAgICBzZXRTaG93KGZhbHNlKTtcclxuICAgIHNldEZsaXBwZWQoZmFsc2UpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gQWZ0ZXIgdG9vbHRpcCByZW5kZXJzLCBjaGVjayBpZiBpdCBjbGlwcyBhYm92ZSB0aGUgdmlld3BvcnQgYW5kIGZsaXAgaWYgbmVlZGVkXHJcbiAgUmVhY3QudXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzaG93ICYmIHRpcFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGNvbnN0IHJlY3QgPSB0aXBSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgaWYgKHJlY3QudG9wIDwgMCkge1xyXG4gICAgICAgIHNldEZsaXBwZWQodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LCBbc2hvdywgcG9zXSk7XHJcblxyXG4gIGNvbnN0IGxpbmVzID0gdG9vbHRpcExpbmVzLnNwbGl0KCdcXG4nKS5maWx0ZXIobCA9PiB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IGwuc3BsaXQoJzonKTtcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPCAyKSByZXR1cm4gbC50cmltKCkgIT09ICcnO1xyXG4gICAgcmV0dXJuIHBhcnRzLnNsaWNlKDEpLmpvaW4oJzonKS50cmltKCkgIT09ICcnO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCB0b29sdGlwQ29udGVudCA9IChcclxuICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgYmFja2dyb3VuZDogJyNGRkZGRkYnLFxyXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgI0U1RTdFQicsXHJcbiAgICAgIGJvcmRlclJhZGl1czogMTAsXHJcbiAgICAgIGJveFNoYWRvdzogJzAgNHB4IDE2cHggcmdiYSgwLDAsMCwwLjEyKSwgMCAxcHggNHB4IHJnYmEoMCwwLDAsMC4wNiknLFxyXG4gICAgICBwYWRkaW5nOiAnMTJweCAxNnB4JyxcclxuICAgICAgbWF4V2lkdGg6IDMwMCxcclxuICAgICAgbWluV2lkdGg6IDE4MCxcclxuICAgIH19PlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxMywgZm9udFdlaWdodDogNzAwLCBjb2xvcjogJyMxMTE4MjcnLCBtYXJnaW5Cb3R0b206IDYsIGxpbmVIZWlnaHQ6IDEuMyB9fT5cclxuICAgICAgICB7dGVzdE5hbWV9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAxMCwgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogOCB9fT5cclxuICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IGdldFByaW9yaXR5VGV4dENvbG9yKHByaW9yaXR5KSB9fT5cclxuICAgICAgICAgIFB7cHJpb3JpdHl9XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIHN0eWxlPXt7XHJcbiAgICAgICAgICBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDcwMCxcclxuICAgICAgICAgIGNvbG9yOiBnZXRTdGF0dXNUZXh0Q29sb3Ioc3RhdHVzKSxcclxuICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIGFzIGNvbnN0LFxyXG4gICAgICAgICAgbGV0dGVyU3BhY2luZzogJzAuMDVlbScsXHJcbiAgICAgICAgICBwYWRkaW5nOiAnMXB4IDZweCcsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgJHtnZXRDYXBDb2xvcihzdGF0dXMpfTE4YCxcclxuICAgICAgICAgIGJvcmRlclJhZGl1czogNCxcclxuICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke2dldENhcENvbG9yKHN0YXR1cyl9NDBgLFxyXG4gICAgICAgIH19PlxyXG4gICAgICAgICAge3N0YXR1c31cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogMSwgYmFja2dyb3VuZDogJyNFNUU3RUInLCBtYXJnaW46ICcwIC00cHggOHB4JyB9fSAvPlxyXG4gICAgICB7bGluZXMubWFwKChsaW5lLCBpKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29sb25JZHggPSBsaW5lLmluZGV4T2YoJzonKTtcclxuICAgICAgICBpZiAoY29sb25JZHggPT09IC0xKSByZXR1cm4gKFxyXG4gICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IGZvbnRTaXplOiAxMSwgY29sb3I6ICcjMzc0MTUxJywgbWFyZ2luQm90dG9tOiAzLCBsaW5lSGVpZ2h0OiAxLjQgfX0+e2xpbmV9PC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGxpbmUuc2xpY2UoMCwgY29sb25JZHgpLnRyaW0oKTtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGxpbmUuc2xpY2UoY29sb25JZHggKyAxKS50cmltKCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgZm9udFNpemU6IDExLCBtYXJnaW5Cb3R0b206IDMsIGxpbmVIZWlnaHQ6IDEuNCB9fT5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICcjNkI3MjgwJywgZm9udFdlaWdodDogNTAwLCBmbGV4U2hyaW5rOiAwIH19PntsYWJlbH06PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJyMxMTE4MjcnLCBmb250V2VpZ2h0OiA0MDAgfX0+e3ZhbHVlfTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pfVxyXG4gICAgICB7c2NoZWR1bGVkICYmIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IDEsIGJhY2tncm91bmQ6ICcjRTVFN0VCJywgbWFyZ2luOiAnNnB4IC00cHggNnB4JyB9fSAvPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgZm9udFNpemU6IDExLCBtYXJnaW5Cb3R0b206IDIgfX0+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAnIzZCNzI4MCcsIGZvbnRXZWlnaHQ6IDUwMCB9fT5TdGFydHM6PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogJyMxMTE4MjcnIH19PntzY2hlZHVsZWQuc3RhcnQudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1HQicsIHsgZGF5OiAnMi1kaWdpdCcsIG1vbnRoOiAnc2hvcnQnLCB5ZWFyOiAnbnVtZXJpYycgfSl9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBmb250U2l6ZTogMTEgfX0+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAnIzZCNzI4MCcsIGZvbnRXZWlnaHQ6IDUwMCB9fT5FbmRzOjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICcjMTExODI3JyB9fT57c2NoZWR1bGVkLmVuZC50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLUdCJywgeyBkYXk6ICcyLWRpZ2l0JywgbW9udGg6ICdzaG9ydCcsIHllYXI6ICdudW1lcmljJyB9KX08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8Lz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcblxyXG4gIC8vIEFycm93IHBvaW50aW5nIHVwICh3aGVuIHRvb2x0aXAgaXMgYmVsb3cpIG9yIGRvd24gKHdoZW4gYWJvdmUpXHJcbiAgY29uc3QgYXJyb3dEb3duID0gKFxyXG4gICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICB3aWR0aDogMTAsIGhlaWdodDogMTAsIGJhY2tncm91bmQ6ICcjRkZGRkZGJyxcclxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNFNUU3RUInLCBib3JkZXJUb3A6ICdub25lJywgYm9yZGVyTGVmdDogJ25vbmUnLFxyXG4gICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoNDVkZWcpJyxcclxuICAgICAgbWFyZ2luOiAnLTZweCBhdXRvIDAnLFxyXG4gICAgfX0gLz5cclxuICApO1xyXG4gIGNvbnN0IGFycm93VXAgPSAoXHJcbiAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgIHdpZHRoOiAxMCwgaGVpZ2h0OiAxMCwgYmFja2dyb3VuZDogJyNGRkZGRkYnLFxyXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgI0U1RTdFQicsIGJvcmRlckJvdHRvbTogJ25vbmUnLCBib3JkZXJSaWdodDogJ25vbmUnLFxyXG4gICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoNDVkZWcpJyxcclxuICAgICAgbWFyZ2luOiAnMCBhdXRvIC02cHgnLFxyXG4gICAgfX0gLz5cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiByZWY9e3dyYXBSZWZ9IG9uTW91c2VFbnRlcj17aGFuZGxlRW50ZXJ9IG9uTW91c2VMZWF2ZT17aGFuZGxlTGVhdmV9IHN0eWxlPXt3cmFwcGVyU3R5bGUgfHwgeyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgICB7c2hvdyAmJiAoXHJcbiAgICAgICAgPGRpdiByZWY9e3RpcFJlZn0gc3R5bGU9e3tcclxuICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgbGVmdDogcG9zLngsXHJcbiAgICAgICAgICB0b3A6IGZsaXBwZWQgPyBwb3MuYm90dG9tICsgOCA6IHBvcy55IC0gOCxcclxuICAgICAgICAgIHRyYW5zZm9ybTogZmxpcHBlZCA/ICd0cmFuc2xhdGUoLTUwJSwgMCknIDogJ3RyYW5zbGF0ZSgtNTAlLCAtMTAwJSknLFxyXG4gICAgICAgICAgekluZGV4OiAxMDAwLCBwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcbiAgICAgICAgfX0+XHJcbiAgICAgICAgICB7ZmxpcHBlZCA/IChcclxuICAgICAgICAgICAgPD57YXJyb3dVcH17dG9vbHRpcENvbnRlbnR9PC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8Pnt0b29sdGlwQ29udGVudH17YXJyb3dEb3dufTwvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQWxsb2NhdGlvbiBIZWxwZXJzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBidWlsZEFsbG9jYXRpb25zID0gKHN0YW5kczogSW50ZXJuYWxTdGFuZFtdKTogQWxsb2NhdGlvblJlY29yZFtdID0+IHtcclxuICBjb25zdCBhbGxvY2F0aW9uczogQWxsb2NhdGlvblJlY29yZFtdID0gW107XHJcbiAgc3RhbmRzLmZvckVhY2goc3RhbmQgPT4ge1xyXG4gICAgc3RhbmQudGVzdHMuZm9yRWFjaCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgIGFsbG9jYXRpb25zLnB1c2goe1xyXG4gICAgICAgIHRlc3RfaWQ6IHRlc3QuaWQsXHJcbiAgICAgICAgdGVzdF9zdGFuZF9pZDogc3RhbmQuaWQsXHJcbiAgICAgICAgcHJpb3JpdHlfb3JkZXI6IGlkeCArIDEsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGFsbG9jYXRpb25zO1xyXG59O1xyXG5cclxuY29uc3QgYWxsb2NhdGlvbnNLZXkgPSAoYWxsb2NzOiBBbGxvY2F0aW9uUmVjb3JkW10pOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShhbGxvY3MubWFwKGEgPT4gYCR7YS50ZXN0X2lkfToke2EudGVzdF9zdGFuZF9pZH06JHthLnByaW9yaXR5X29yZGVyfWApLnNvcnQoKSk7XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gTWFpbiBDb21wb25lbnRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmV4cG9ydCBjb25zdCBUZXN0U3RhbmRTY2hlZHVsZXI6IEZDID0gKCkgPT4ge1xyXG4gIC8vIFx1MjUwMFx1MjUwMCBJbnB1dCBkYXRhIGZyb20gUmV0b29sIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFtpbnB1dFRlc3RzXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwidGVzdHNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiVGVzdHMgRGF0YVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2YgdGVzdCBvYmplY3RzIGZyb20gZ2V0U2NoZWR1bGVyRGF0YSBxdWVyeVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaW5wdXRTdGFuZHNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJ0ZXN0U3RhbmRzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIlRlc3QgU3RhbmRzIERhdGFcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIHRlc3Qgc3RhbmQgb2JqZWN0cyBmcm9tIGdldFRlc3RTdGFuZHMgcXVlcnlcIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIENvbmZpZ3VyYXRpb24gcHJvcGVydGllcyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbc2F2ZU1vZGVdID0gUmV0b29sLnVzZVN0YXRlRW51bWVyYXRpb24oe1xyXG4gICAgbmFtZTogXCJzYXZlTW9kZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcImJhdGNoXCIsXHJcbiAgICBlbnVtRGVmaW5pdGlvbjogW1wiYmF0Y2hcIiwgXCJsaXZlXCJdLFxyXG4gICAgaW5zcGVjdG9yOiBcInNlZ21lbnRlZFwiLFxyXG4gICAgbGFiZWw6IFwiU2F2ZSBNb2RlXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJiYXRjaCA9IHNhdmUgYnV0dG9uLCBsaXZlID0gZW1pdCBvbiBldmVyeSBjaGFuZ2VcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2lzU2F2aW5nXSA9IFJldG9vbC51c2VTdGF0ZUJvb2xlYW4oe1xyXG4gICAgbmFtZTogXCJpc1NhdmluZ1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgIGluc3BlY3RvcjogXCJjaGVja2JveFwiLFxyXG4gICAgbGFiZWw6IFwiSXMgU2F2aW5nXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJCaW5kIHRvOiB7eyBzYXZlQWxsb2NhdGlvbnMuaXNGZXRjaGluZyB9fVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaGFzU2F2ZUVycm9yXSA9IFJldG9vbC51c2VTdGF0ZUJvb2xlYW4oe1xyXG4gICAgbmFtZTogXCJoYXNTYXZlRXJyb3JcIixcclxuICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICBpbnNwZWN0b3I6IFwiY2hlY2tib3hcIixcclxuICAgIGxhYmVsOiBcIkhhcyBTYXZlIEVycm9yXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJCaW5kIHRvOiB7eyAhIXNhdmVBbGxvY2F0aW9ucy5lcnJvciB9fVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbc2F2ZWRBdF0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJzYXZlZEF0XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiU2F2ZWQgQXRcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG86IHt7IHNhdmVBbGxvY2F0aW9ucy5sYXN0UnVuQXQgfX1cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2NoYW5nZW92ZXJIb3Vyc10gPSBSZXRvb2wudXNlU3RhdGVOdW1iZXIoe1xyXG4gICAgbmFtZTogXCJjaGFuZ2VvdmVySG91cnNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogMyxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDaGFuZ2VvdmVyIEhvdXJzXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJIb3VycyBmb3IgY2hhbmdlb3ZlciBiZXR3ZWVuIHRlc3RzICh3b3JrIGhvdXJzIG9ubHkpXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFt3b3JrU3RhcnRdID0gUmV0b29sLnVzZVN0YXRlTnVtYmVyKHtcclxuICAgIG5hbWU6IFwid29ya1N0YXJ0XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IDksXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiV29yayBTdGFydCBIb3VyXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFt3b3JrRW5kXSA9IFJldG9vbC51c2VTdGF0ZU51bWJlcih7XHJcbiAgICBuYW1lOiBcIndvcmtFbmRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogMTcsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiV29yayBFbmQgSG91clwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaW5pdGlhbFZpZXdXZWVrc1N0cl0gPSBSZXRvb2wudXNlU3RhdGVFbnVtZXJhdGlvbih7XHJcbiAgICBuYW1lOiBcImRlZmF1bHRWaWV3V2Vla3NcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCI0XCIsXHJcbiAgICBlbnVtRGVmaW5pdGlvbjogW1wiMlwiLCBcIjRcIiwgXCI4XCIsIFwiMTJcIiwgXCIyNFwiXSxcclxuICAgIGluc3BlY3RvcjogXCJzZWdtZW50ZWRcIixcclxuICAgIGxhYmVsOiBcIkRlZmF1bHQgVmlld1wiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGluaXRpYWxWaWV3V2Vla3MgPSBOdW1iZXIoaW5pdGlhbFZpZXdXZWVrc1N0cikgfHwgNDtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIENvbmZpZ3VyYWJsZSBkaXNwbGF5IHRlbXBsYXRlcyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbY2FyZE1haW5UZXh0XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNhcmRNYWluVGV4dFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIntuYW1lfVwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkNhcmQgVGl0bGVcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBsYXRlIGZvciBjYXJkIHRpdGxlLiBVc2Uge2ZpZWxkTmFtZX0gZm9yIGRhdGEgZmllbGRzLlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbY2FyZFN1YlRleHRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY2FyZFN1YlRleHRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJQYXJ0czoge3BhcnRfcmVhZHlfZGF0ZX1cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDYXJkIFN1YnRpdGxlXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3Igc3VidGl0bGUuIEhpZGRlbiB3aGVuIGFsbCBmaWVsZHMgYXJlIGVtcHR5LlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbY2FyZEluZm9Sb3ddID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY2FyZEluZm9Sb3dcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJ7b3duZXJ9IFxcdTAwYjcge2R1cmF0aW9ufWggXFx1MDBiNyBQe3ByaW9yaXR5fVwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkNhcmQgSW5mbyBSb3dcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBsYXRlIGZvciB0aGUgaW5mbyByb3cgc2hvd24gb24gY2FyZHMgYW5kIGJhcnMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFt0b29sdGlwVGVtcGxhdGVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwidG9vbHRpcFRlbXBsYXRlXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiTm90ZXM6IHtub3Rlc31cXG5Pd25lcjoge293bmVyfVxcblByaW9yaXR5OiB7cHJpb3JpdHl9XFxuUGFydCBTdGF0dXM6IHtwYXJ0X3N0YXR1c31cXG5QYXJ0cyBEdWU6IHtwYXJ0X3JlYWR5X2RhdGV9XFxuQXNzaWduZWQgUGFydHM6IHthc3NpZ25lZF9wYXJ0c31cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJUb29sdGlwIFRlbXBsYXRlXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3IgaG92ZXIgdG9vbHRpcC4gVXNlIFxcXFxuIGZvciBuZXdsaW5lcy5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIE91dHB1dCBzdGF0ZSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbLCBzZXRBbGxvY2F0aW9uc10gPSBSZXRvb2wudXNlU3RhdGVBcnJheSh7XHJcbiAgICBuYW1lOiBcImFsbG9jYXRpb25zXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQ3VycmVudCBhbGxvY2F0aW9uIHN0YXRlOiBbe3Rlc3RfaWQsIHRlc3Rfc3RhbmRfaWQsIHByaW9yaXR5X29yZGVyfV1cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0QWxsVGVzdElkc10gPSBSZXRvb2wudXNlU3RhdGVBcnJheSh7XHJcbiAgICBuYW1lOiBcImFsbFRlc3RJZHNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGVzdCBJRHMgbWFuYWdlZCBieSB0aGUgc2NoZWR1bGVyIChmb3IgdGhlIGRlbGV0ZSBzdGVwIGluIHNhdmUpXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzXSA9IFJldG9vbC51c2VTdGF0ZUJvb2xlYW4oe1xyXG4gICAgbmFtZTogXCJoYXNVbnNhdmVkQ2hhbmdlc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIldoZXRoZXIgdGhlcmUgYXJlIHVuc2F2ZWQgYWxsb2NhdGlvbiBjaGFuZ2VzXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBFdmVudHMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3Qgb25TYXZlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uU2F2ZVwiIH0pO1xyXG4gIGNvbnN0IG9uQ2hhbmdlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlXCIgfSk7XHJcbiAgY29uc3Qgb25SZXRyeSA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvblJldHJ5XCIgfSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBDb21wb25lbnQgc2V0dGluZ3MgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgUmV0b29sLnVzZUNvbXBvbmVudFNldHRpbmdzKHtcclxuICAgIGRlZmF1bHRIZWlnaHQ6IDYwMCxcclxuICAgIGRlZmF1bHRXaWR0aDogMTIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBJbnRlcm5hbCBzdGF0ZSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbc3RhbmRzLCBzZXRTdGFuZHNdID0gUmVhY3QudXNlU3RhdGU8SW50ZXJuYWxTdGFuZFtdPihbXSk7XHJcbiAgY29uc3QgW3VuYWxsb2NhdGVkLCBzZXRVbmFsbG9jYXRlZF0gPSBSZWFjdC51c2VTdGF0ZTxUZXN0RGF0YVtdPihbXSk7XHJcbiAgY29uc3QgW3ZpZXdwb3J0V2Vla3MsIHNldFZpZXdwb3J0V2Vla3NdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyPihpbml0aWFsVmlld1dlZWtzIGFzIG51bWJlciB8fCA0KTtcclxuICBjb25zdCBbZHJhZ2dlZFRlc3RJZCwgc2V0RHJhZ2dlZFRlc3RJZF0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmcgfCBudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaW5zZXJ0SW5kaWNhdG9yLCBzZXRJbnNlcnRJbmRpY2F0b3JdID0gUmVhY3QudXNlU3RhdGU8SW5zZXJ0SW5kaWNhdG9yIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3F1ZXVlSW5zZXJ0SW5kZXgsIHNldFF1ZXVlSW5zZXJ0SW5kZXhdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2lzRGlydHksIHNldElzRGlydHldID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwZW5kaW5nU2F2ZSwgc2V0UGVuZGluZ1NhdmVdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzYXZlRXJyb3IsIHNldFNhdmVFcnJvcl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgaXNMb2NrZWQgPSBwZW5kaW5nU2F2ZSB8fCAoaXNTYXZpbmcgYXMgYm9vbGVhbikgfHwgc2F2ZUVycm9yO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzU2F2aW5nIGFzIGJvb2xlYW4pIHtcclxuICAgICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpOyAvLyBSZXRvb2wgaGFzIHBpY2tlZCB1cCB0aGUgc2F2ZTsgZHJvcCBvdXIgbG9jYWwgcGVuZGluZyBmbGFnXHJcbiAgICB9XHJcbiAgICBpZiAoaGFzU2F2ZUVycm9yIGFzIGJvb2xlYW4pIHtcclxuICAgICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpO1xyXG4gICAgICBzZXRTYXZlRXJyb3IodHJ1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKCEoaXNTYXZpbmcgYXMgYm9vbGVhbikpIHtcclxuICAgICAgLy8gTm90IHNhdmluZyBhbmQgbm8gZXJyb3IgPSBpZGxlOyBjbGVhciBlcnJvciAoY292ZXJzIHJlY292ZXJ5IGFmdGVyIHJldHJ5KVxyXG4gICAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtpc1NhdmluZywgaGFzU2F2ZUVycm9yXSk7XHJcblxyXG4gIGNvbnN0IG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYgPSB1c2VSZWY8c3RyaW5nPignJyk7XHJcbiAgY29uc3QgcHJldlNhdmVkQXRSZWYgPSBSZWFjdC51c2VSZWY8c3RyaW5nPihcIlwiKTtcclxuICBjb25zdCBzY3JvbGxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xyXG5cclxuICAvLyBPcHRpbWlzdGljIHNhdmU6IHdoZW4gc2F2ZWRBdCBjaGFuZ2VzIHRoZSBEQiB3cml0ZSBzdWNjZWVkZWQgXHUyMDE0IHNuYXBzaG90IHRoZVxyXG4gIC8vIGN1cnJlbnQgc3RhdGUgYXMgdGhlIG5ldyBiYXNlbGluZSB3aXRob3V0IHdhaXRpbmcgZm9yIGEgZ2V0U2NoZWR1bGVyRGF0YSByZS1mZXRjaC5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgdHMgPSBzYXZlZEF0IGFzIHN0cmluZztcclxuICAgIGlmICghdHMgfHwgdHMgPT09IHByZXZTYXZlZEF0UmVmLmN1cnJlbnQpIHJldHVybjsgLy8gc2tpcCBpbml0aWFsIG1vdW50ICsgZHVwbGljYXRlc1xyXG4gICAgcHJldlNhdmVkQXRSZWYuY3VycmVudCA9IHRzO1xyXG4gICAgLy8gU25hcHNob3QgY3VycmVudCBhbGxvY2F0aW9ucyBhcyB0aGUgbmV3IFwib3JpZ2luYWxcIiBzbyBkaXJ0eS1jaGVjayByZXNldHMgY29ycmVjdGx5XHJcbiAgICBjb25zdCBjdXJyZW50QWxsb2NzID0gYnVpbGRBbGxvY2F0aW9ucyhzdGFuZHMpO1xyXG4gICAgb3JpZ2luYWxBbGxvY2F0aW9uc1JlZi5jdXJyZW50ID0gYWxsb2NhdGlvbnNLZXkoY3VycmVudEFsbG9jcyk7XHJcbiAgICBzZXRJc0RpcnR5KGZhbHNlKTtcclxuICAgIHNldFBlbmRpbmdTYXZlKGZhbHNlKTtcclxuICAgIHNldFNhdmVFcnJvcihmYWxzZSk7XHJcbiAgfSwgW3NhdmVkQXQsIHN0YW5kc10pO1xyXG4gIGNvbnN0IFtxdWV1ZVNvcnQsIHNldFF1ZXVlU29ydF0gPSBSZWFjdC51c2VTdGF0ZTwnYXonIHwgJ3ByaW9yaXR5JyB8ICdzdGF0dXMnPignYXonKTtcclxuICBjb25zdCBbcXVldWVGaWx0ZXIsIHNldFF1ZXVlRmlsdGVyXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEluaXRpYWxpemUgZnJvbSBpbnB1dCBkYXRhIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGlucHV0S2V5ID0gdXNlTWVtbyhcclxuICAgICgpID0+IEpTT04uc3RyaW5naWZ5KGlucHV0VGVzdHMpICsgSlNPTi5zdHJpbmdpZnkoaW5wdXRTdGFuZHMpLFxyXG4gICAgW2lucHV0VGVzdHMsIGlucHV0U3RhbmRzXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB0ZXN0c0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRUZXN0cykgPyBpbnB1dFRlc3RzIDogW107XHJcbiAgICBjb25zdCBzdGFuZHNBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0U3RhbmRzKSA/IChpbnB1dFN0YW5kcyBhcyBTdGFuZERlZltdKSA6IFtdO1xyXG5cclxuICAgIGlmIChzdGFuZHNBcnIubGVuZ3RoID09PSAwICYmIHRlc3RzQXJyLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIEJ1aWxkIHN0YW5kIG1hcFxyXG4gICAgY29uc3Qgc3RhbmRNYXAgPSBuZXcgTWFwPG51bWJlciB8IHN0cmluZywgSW50ZXJuYWxTdGFuZD4oKTtcclxuICAgIHN0YW5kc0Fyci5mb3JFYWNoKHMgPT4gc3RhbmRNYXAuc2V0KHMuaWQsIHsgaWQ6IHMuaWQsIG5hbWU6IHMubmFtZSwgdGVzdHM6IFtdIH0pKTtcclxuXHJcbiAgICAvLyBHcm91cCB0ZXN0c1xyXG4gICAgY29uc3QgdW5hbGxvYzogVGVzdERhdGFbXSA9IFtdO1xyXG4gICAgdGVzdHNBcnIuZm9yRWFjaCgodDogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRlc3Q6IFRlc3REYXRhID0ge1xyXG4gICAgICAgIGlkOiB0LmlkLFxyXG4gICAgICAgIG5hbWU6IHQubmFtZSB8fCAnJyxcclxuICAgICAgICBkdXJhdGlvbjogdC5kdXJhdGlvbiB8fCA3MixcclxuICAgICAgICBvd25lcjogdC5vd25lciB8fCAnJyxcclxuICAgICAgICBwcmlvcml0eTogdC5wcmlvcml0eSA/PyA1MCxcclxuICAgICAgICBub3RlczogdC5ub3RlcyB8fCAnJyxcclxuICAgICAgICBzdGF0dXM6IHQuc3RhdHVzIHx8ICcnLFxyXG4gICAgICAgIHRlc3Rfc3RhbmRfaWQ6IHQudGVzdF9zdGFuZF9pZCxcclxuICAgICAgICBwcmlvcml0eV9vcmRlcjogdC5wcmlvcml0eV9vcmRlcixcclxuICAgICAgICBhbGxvY2F0aW9uX2lkOiB0LmFsbG9jYXRpb25faWQsXHJcbiAgICAgICAgYXNzaWduZWRfcGFydHM6IHQuYXNzaWduZWRfcGFydHMgfHwgbnVsbCxcclxuICAgICAgICBwYXJ0X3JlYWR5X2RhdGU6IHQucGFydF9yZWFkeV9kYXRlIHx8IG51bGwsXHJcbiAgICAgICAgcGFydF9zdGF0dXM6IHQucGFydF9zdGF0dXMgfHwgJycsXHJcbiAgICAgICAgLi4udCwgLy8gcHJlc2VydmUgYW55IGV4dHJhIGZpZWxkcyBmb3IgdGVtcGxhdGUgcmVzb2x1dGlvblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHRlc3QudGVzdF9zdGFuZF9pZCAhPSBudWxsICYmIHN0YW5kTWFwLmhhcyh0ZXN0LnRlc3Rfc3RhbmRfaWQpKSB7XHJcbiAgICAgICAgc3RhbmRNYXAuZ2V0KHRlc3QudGVzdF9zdGFuZF9pZCkhLnRlc3RzLnB1c2godGVzdCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdW5hbGxvYy5wdXNoKHRlc3QpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTb3J0IGVhY2ggc3RhbmQncyB0ZXN0cyBieSBwcmlvcml0eV9vcmRlclxyXG4gICAgc3RhbmRNYXAuZm9yRWFjaChzID0+IHtcclxuICAgICAgcy50ZXN0cy5zb3J0KChhLCBiKSA9PiAoYS5wcmlvcml0eV9vcmRlciB8fCA5OTkpIC0gKGIucHJpb3JpdHlfb3JkZXIgfHwgOTk5KSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBuZXdTdGFuZHMgPSBzdGFuZHNBcnIubWFwKHMgPT4gc3RhbmRNYXAuZ2V0KHMuaWQpISk7XHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIHNldFVuYWxsb2NhdGVkKHVuYWxsb2MpO1xyXG4gICAgc2V0SXNEaXJ0eShmYWxzZSk7XHJcblxyXG4gICAgLy8gU25hcHNob3QgdGhlIGluaXRpYWwgYWxsb2NhdGlvbnNcclxuICAgIGNvbnN0IGluaXRpYWxBbGxvY3MgPSBidWlsZEFsbG9jYXRpb25zKG5ld1N0YW5kcyk7XHJcbiAgICBvcmlnaW5hbEFsbG9jYXRpb25zUmVmLmN1cnJlbnQgPSBhbGxvY2F0aW9uc0tleShpbml0aWFsQWxsb2NzKTtcclxuXHJcbiAgICAvLyBTZXQgb3V0cHV0IHN0YXRlXHJcbiAgICBzZXRBbGxvY2F0aW9ucyhpbml0aWFsQWxsb2NzKTtcclxuICAgIHNldEFsbFRlc3RJZHModGVzdHNBcnIubWFwKCh0OiBhbnkpID0+IHQuaWQpKTtcclxuICAgIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzKGZhbHNlKTtcclxuXHJcbiAgICAvLyBDbGVhciBzYXZlIGxvY2sgXHUyMDE0IG5ldyBkYXRhIGFycml2aW5nIGZyb20gUmV0b29sIG1lYW5zIHRoZSBzYXZlIHJvdW5kLXRyaXAgY29tcGxldGVkLlxyXG4gICAgLy8gVGhpcyBpcyBtb3JlIHJlbGlhYmxlIHRoYW4gd2FpdGluZyBmb3IgdGhlIHNhdmVTdGF0ZSBiaW5kaW5nIHRvIHRyYW5zaXRpb24gdGhyb3VnaFxyXG4gICAgLy8gJ3NhdmluZycgXHUyMTkyICdpZGxlJywgd2hpY2ggUmV0b29sIGNhbiBiYXRjaCBhd2F5IHNvIHRoZSB1c2VFZmZlY3QgbmV2ZXIgZmlyZXMuXHJcbiAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7XHJcbiAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gIH0sIFtpbnB1dEtleV0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgU2NoZWR1bGluZyBjb25maWcgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgY2hIb3VycyA9IChjaGFuZ2VvdmVySG91cnMgYXMgbnVtYmVyKSB8fCAzO1xyXG4gIGNvbnN0IHdTdGFydCA9ICh3b3JrU3RhcnQgYXMgbnVtYmVyKSB8fCA5O1xyXG4gIGNvbnN0IHdFbmQgPSAod29ya0VuZCBhcyBudW1iZXIpIHx8IDE3O1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgVmlldyBjb21wdXRhdGlvbnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3Qgdmlld1N0YXJ0ID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcclxuICAgIGQuc2V0SG91cnMoMCwgMCwgMCwgMCk7XHJcbiAgICB3aGlsZSAoZC5nZXREYXkoKSAhPT0gMSkgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpIC0gMSk7XHJcbiAgICByZXR1cm4gZDtcclxuICB9LCBbXSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBTY2hlZHVsZSBjb21wdXRhdGlvbiAobXVzdCBiZSBkZWZpbmVkIGJlZm9yZSB0aW1lbGluZUVuZCkgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgY29tcHV0ZVNjaGVkdWxlID0gdXNlQ2FsbGJhY2soKHRlc3RzOiBUZXN0RGF0YVtdKTogU2NoZWR1bGVkVGVzdFtdID0+IHtcclxuICAgIGNvbnN0IHJ1bm5pbmdUZXN0cyA9IHRlc3RzLmZpbHRlcih0ID0+IGlzUnVubmluZ1Rlc3QodCkpO1xyXG4gICAgY29uc3QgcXVldWVkVGVzdHMgPSB0ZXN0cy5maWx0ZXIodCA9PiAhaXNSdW5uaW5nVGVzdCh0KSk7XHJcblxyXG4gICAgLy8gU29ydCBSdW5uaW5nIHRlc3RzIGJ5IGFjdHVhbCBzdGFydCBkYXRlLCB0aGVuIHByaW9yaXR5IGRlc2MgZm9yIHRpZXNcclxuICAgIGNvbnN0IHNvcnRlZFJ1bm5pbmcgPSBbLi4ucnVubmluZ1Rlc3RzXS5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRhdGVBID0gcGFyc2VMb2NhbERhdGUoYS50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgbmV3IERhdGUoKTtcclxuICAgICAgY29uc3QgZGF0ZUIgPSBwYXJzZUxvY2FsRGF0ZShiLnRlc3Rfc3RhcnRlZF9kYXRlKSB8fCBuZXcgRGF0ZSgpO1xyXG4gICAgICBpZiAoZGF0ZUEuZ2V0VGltZSgpICE9PSBkYXRlQi5nZXRUaW1lKCkpIHJldHVybiBkYXRlQS5nZXRUaW1lKCkgLSBkYXRlQi5nZXRUaW1lKCk7XHJcbiAgICAgIHJldHVybiAoYi5wcmlvcml0eSA/PyA1MCkgLSAoYS5wcmlvcml0eSA/PyA1MCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBSdW5uaW5nIHRlc3RzIHVzZSB0aGVpciBhY3R1YWwgdGVzdF9zdGFydGVkX2RhdGU7IG92ZXJsYXBwaW5nIG9uZXMgYXJlIG1hZGUgc2VxdWVudGlhbFxyXG4gICAgbGV0IGxhc3RSdW5uaW5nRW5kID0gbmV3IERhdGUodmlld1N0YXJ0KTtcclxuICAgIGNvbnN0IHJ1bm5pbmdTY2hlZHVsZWQgPSBzb3J0ZWRSdW5uaW5nLm1hcCh0ZXN0ID0+IHtcclxuICAgICAgY29uc3QgdGVzdERhdGUgPSBwYXJzZUxvY2FsRGF0ZSh0ZXN0LnRlc3Rfc3RhcnRlZF9kYXRlKSB8fCBuZXcgRGF0ZSh2aWV3U3RhcnQpO1xyXG4gICAgICBjb25zdCBzdGFydCA9IHRlc3REYXRlIDwgbGFzdFJ1bm5pbmdFbmQgPyBuZXcgRGF0ZShsYXN0UnVubmluZ0VuZCkgOiBuZXcgRGF0ZSh0ZXN0RGF0ZSk7XHJcbiAgICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHN0YXJ0LmdldFRpbWUoKSArIHRlc3QuZHVyYXRpb24gKiBNU19QRVJfSE9VUik7XHJcbiAgICAgIGxhc3RSdW5uaW5nRW5kID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChlbmQsIGNoSG91cnMsIHdTdGFydCwgd0VuZCk7XHJcbiAgICAgIHJldHVybiB7IC4uLnRlc3QsIHN0YXJ0LCBlbmQgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFF1ZXVlZCB0ZXN0cyBzdGFydCBhZnRlciBsYXN0IFJ1bm5pbmcgdGVzdCdzIGNoYW5nZW92ZXIgKG9yIG5vdytjaGFuZ2VvdmVyLCB3aGljaGV2ZXIgaXMgbGF0ZXIpLlxyXG4gICAgLy8gV2UgbmV2ZXIgc2NoZWR1bGUgYSBwbGFubmVkIHRlc3QgdG8gc3RhcnQgaW4gdGhlIHBhc3QuXHJcbiAgICBjb25zdCBub3dQbHVzQ2hhbmdlb3ZlciA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQobmV3IERhdGUoKSwgY2hIb3Vycywgd1N0YXJ0LCB3RW5kKTtcclxuICAgIGxldCBjdXJyZW50RW5kID0gbmV3IERhdGUoTWF0aC5tYXgobGFzdFJ1bm5pbmdFbmQuZ2V0VGltZSgpLCBub3dQbHVzQ2hhbmdlb3Zlci5nZXRUaW1lKCkpKTtcclxuICAgIGNvbnN0IHF1ZXVlZFNjaGVkdWxlZCA9IHF1ZXVlZFRlc3RzLm1hcCh0ZXN0ID0+IHtcclxuICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZShjdXJyZW50RW5kKTtcclxuICAgICAgY29uc3QgZW5kID0gbmV3IERhdGUoc3RhcnQuZ2V0VGltZSgpICsgdGVzdC5kdXJhdGlvbiAqIE1TX1BFUl9IT1VSKTtcclxuICAgICAgY3VycmVudEVuZCA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQoZW5kLCBjaEhvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICByZXR1cm4geyAuLi50ZXN0LCBzdGFydCwgZW5kIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gWy4uLnJ1bm5pbmdTY2hlZHVsZWQsIC4uLnF1ZXVlZFNjaGVkdWxlZF07XHJcbiAgfSwgW3ZpZXdTdGFydCwgY2hIb3Vycywgd1N0YXJ0LCB3RW5kXSk7XHJcblxyXG4gIGNvbnN0IHRpbWVsaW5lRW5kID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBsZXQgbGF0ZXN0RW5kID0gbmV3IERhdGUodmlld1N0YXJ0KTtcclxuICAgIGxhdGVzdEVuZC5zZXREYXRlKGxhdGVzdEVuZC5nZXREYXRlKCkgKyB2aWV3cG9ydFdlZWtzICogNyk7XHJcblxyXG4gICAgc3RhbmRzLmZvckVhY2goc3RhbmQgPT4ge1xyXG4gICAgICBjb25zdCBzY2hlZHVsZSA9IGNvbXB1dGVTY2hlZHVsZShzdGFuZC50ZXN0cyk7XHJcbiAgICAgIGlmIChzY2hlZHVsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgbGFzdCA9IHNjaGVkdWxlW3NjaGVkdWxlLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZW92ZXJFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKGxhc3QuZW5kLCBjaEhvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICAgIGlmIChjaGFuZ2VvdmVyRW5kID4gbGF0ZXN0RW5kKSBsYXRlc3RFbmQgPSBjaGFuZ2VvdmVyRW5kO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsYXRlc3RFbmQuc2V0RGF0ZShsYXRlc3RFbmQuZ2V0RGF0ZSgpICsgNyk7XHJcbiAgICByZXR1cm4gbGF0ZXN0RW5kO1xyXG4gIH0sIFtzdGFuZHMsIHZpZXdTdGFydCwgdmlld3BvcnRXZWVrcywgY2hIb3Vycywgd1N0YXJ0LCB3RW5kLCBjb21wdXRlU2NoZWR1bGVdKTtcclxuXHJcbiAgY29uc3QgdG90YWxEYXlzID0gdXNlTWVtbygoKSA9PiBNYXRoLmNlaWwoaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgdGltZWxpbmVFbmQpIC8gMjQpLCBbdmlld1N0YXJ0LCB0aW1lbGluZUVuZF0pO1xyXG5cclxuICBjb25zdCB2aWV3cG9ydFdpZHRoID0gODAwO1xyXG4gIGNvbnN0IHB4UGVySG91ciA9IHZpZXdwb3J0V2lkdGggLyAodmlld3BvcnRXZWVrcyAqIDcgKiAyNCk7XHJcbiAgY29uc3QgZGF5cyA9IHVzZU1lbW8oKCkgPT4gZ2VuZXJhdGVEYXlzKHZpZXdTdGFydCwgdG90YWxEYXlzKSwgW3ZpZXdTdGFydCwgdG90YWxEYXlzXSk7XHJcbiAgY29uc3Qgd2Vla3MgPSB1c2VNZW1vKCgpID0+IGdlbmVyYXRlV2Vla3Modmlld1N0YXJ0LCB0b3RhbERheXMpLCBbdmlld1N0YXJ0LCB0b3RhbERheXNdKTtcclxuICBjb25zdCB0b3RhbFdpZHRoID0gdG90YWxEYXlzICogMjQgKiBweFBlckhvdXI7XHJcbiAgY29uc3QgZGF5V2lkdGggPSAyNCAqIHB4UGVySG91cjtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEFmdGVyLWNoYW5nZSBoYW5kbGVyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGFmdGVyQ2hhbmdlID0gdXNlQ2FsbGJhY2soKG5ld1N0YW5kczogSW50ZXJuYWxTdGFuZFtdKSA9PiB7XHJcbiAgICBjb25zdCBhbGxvY3MgPSBidWlsZEFsbG9jYXRpb25zKG5ld1N0YW5kcyk7XHJcbiAgICBjb25zdCBkaXJ0eSA9IGFsbG9jYXRpb25zS2V5KGFsbG9jcykgIT09IG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudDtcclxuICAgIHNldElzRGlydHkoZGlydHkpO1xyXG4gICAgc2V0QWxsb2NhdGlvbnMoYWxsb2NzKTtcclxuICAgIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzKGRpcnR5KTtcclxuXHJcbiAgICBpZiAoKHNhdmVNb2RlIGFzIHN0cmluZykgPT09ICdsaXZlJykge1xyXG4gICAgICBzZXRQZW5kaW5nU2F2ZSh0cnVlKTtcclxuICAgICAgb25DaGFuZ2UoKTtcclxuICAgIH1cclxuICB9LCBbc2F2ZU1vZGUsIHNldEFsbG9jYXRpb25zLCBzZXRIYXNVbnNhdmVkQ2hhbmdlcywgb25DaGFuZ2VdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIERyYWcgYW5kIGRyb3AgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgZmluZFRlc3QgPSB1c2VDYWxsYmFjaygodGVzdElkOiBzdHJpbmcgfCBudW1iZXIpOiBUZXN0RGF0YSB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgcSA9IHVuYWxsb2NhdGVkLmZpbmQodCA9PiB0LmlkID09PSB0ZXN0SWQpO1xyXG4gICAgaWYgKHEpIHJldHVybiBxO1xyXG4gICAgZm9yIChjb25zdCBzIG9mIHN0YW5kcykge1xyXG4gICAgICBjb25zdCB0ID0gcy50ZXN0cy5maW5kKHQgPT4gdC5pZCA9PT0gdGVzdElkKTtcclxuICAgICAgaWYgKHQpIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSwgW3VuYWxsb2NhdGVkLCBzdGFuZHNdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJEcmFnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0RHJhZ2dlZFRlc3RJZChudWxsKTtcclxuICAgIHNldEluc2VydEluZGljYXRvcihudWxsKTtcclxuICAgIHNldFF1ZXVlSW5zZXJ0SW5kZXgobnVsbCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBkcm9wT25TdGFuZCA9IHVzZUNhbGxiYWNrKChzdGFuZElkOiBzdHJpbmcgfCBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIGlmICghZHJhZ2dlZFRlc3RJZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgdGVzdCA9IGZpbmRUZXN0KGRyYWdnZWRUZXN0SWQpO1xyXG4gICAgaWYgKCF0ZXN0KSByZXR1cm47XHJcblxyXG4gICAgLy8gUmVtb3ZlIGZyb20gdW5hbGxvY2F0ZWRcclxuICAgIHNldFVuYWxsb2NhdGVkKHByZXYgPT4gcHJldi5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGZyb20gYWxsIHN0YW5kcyBhbmQgaW5zZXJ0IGF0IHRhcmdldFxyXG4gICAgY29uc3QgbmV3U3RhbmRzID0gc3RhbmRzLm1hcChzID0+IHtcclxuICAgICAgY29uc3QgZmlsdGVyZWQgPSBzLnRlc3RzLmZpbHRlcih0ID0+IHQuaWQgIT09IGRyYWdnZWRUZXN0SWQpO1xyXG4gICAgICBpZiAocy5pZCA9PT0gc3RhbmRJZCkge1xyXG4gICAgICAgIGNvbnN0IG5ld1Rlc3RzID0gWy4uLmZpbHRlcmVkXTtcclxuICAgICAgICBuZXdUZXN0cy5zcGxpY2UoaW5kZXgsIDAsIHRlc3QpO1xyXG4gICAgICAgIHJldHVybiB7IC4uLnMsIHRlc3RzOiBuZXdUZXN0cyB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7IC4uLnMsIHRlc3RzOiBmaWx0ZXJlZCB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0U3RhbmRzKG5ld1N0YW5kcyk7XHJcbiAgICBhZnRlckNoYW5nZShuZXdTdGFuZHMpO1xyXG4gICAgY2xlYXJEcmFnKCk7XHJcbiAgfSwgW2RyYWdnZWRUZXN0SWQsIGZpbmRUZXN0LCBzdGFuZHMsIGFmdGVyQ2hhbmdlLCBjbGVhckRyYWddKTtcclxuXHJcbiAgY29uc3QgZHJvcE9uUXVldWUgPSB1c2VDYWxsYmFjaygoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgaWYgKCFkcmFnZ2VkVGVzdElkKSByZXR1cm47XHJcbiAgICBjb25zdCB0ZXN0ID0gZmluZFRlc3QoZHJhZ2dlZFRlc3RJZCk7XHJcbiAgICBpZiAoIXRlc3QpIHJldHVybjtcclxuXHJcbiAgICAvLyBSZW1vdmUgZnJvbSBzdGFuZHNcclxuICAgIGNvbnN0IG5ld1N0YW5kcyA9IHN0YW5kcy5tYXAocyA9PiAoe1xyXG4gICAgICAuLi5zLFxyXG4gICAgICB0ZXN0czogcy50ZXN0cy5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKSxcclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBBZGQgdG8gdW5hbGxvY2F0ZWRcclxuICAgIHNldFVuYWxsb2NhdGVkKHByZXYgPT4ge1xyXG4gICAgICBjb25zdCBmaWx0ZXJlZCA9IHByZXYuZmlsdGVyKHQgPT4gdC5pZCAhPT0gZHJhZ2dlZFRlc3RJZCk7XHJcbiAgICAgIGNvbnN0IG5leHQgPSBbLi4uZmlsdGVyZWRdO1xyXG4gICAgICBuZXh0LnNwbGljZShpbmRleCwgMCwgdGVzdCk7XHJcbiAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0U3RhbmRzKG5ld1N0YW5kcyk7XHJcbiAgICBhZnRlckNoYW5nZShuZXdTdGFuZHMpO1xyXG4gICAgY2xlYXJEcmFnKCk7XHJcbiAgfSwgW2RyYWdnZWRUZXN0SWQsIGZpbmRUZXN0LCBzdGFuZHMsIGFmdGVyQ2hhbmdlLCBjbGVhckRyYWddKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFNhdmUgLyBEaXNjYXJkIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGhhbmRsZVNhdmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRQZW5kaW5nU2F2ZSh0cnVlKTtcclxuICAgIG9uU2F2ZSgpO1xyXG4gIH0sIFtvblNhdmVdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGlzY2FyZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFNhdmVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7XHJcbiAgICAvLyBSZS1wYXJzZSBmcm9tIGlucHV0IGRhdGFcclxuICAgIGNvbnN0IHRlc3RzQXJyID0gQXJyYXkuaXNBcnJheShpbnB1dFRlc3RzKSA/IGlucHV0VGVzdHMgOiBbXTtcclxuICAgIGNvbnN0IHN0YW5kc0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRTdGFuZHMpID8gKGlucHV0U3RhbmRzIGFzIFN0YW5kRGVmW10pIDogW107XHJcblxyXG4gICAgY29uc3Qgc3RhbmRNYXAgPSBuZXcgTWFwPG51bWJlciB8IHN0cmluZywgSW50ZXJuYWxTdGFuZD4oKTtcclxuICAgIHN0YW5kc0Fyci5mb3JFYWNoKHMgPT4gc3RhbmRNYXAuc2V0KHMuaWQsIHsgaWQ6IHMuaWQsIG5hbWU6IHMubmFtZSwgdGVzdHM6IFtdIH0pKTtcclxuXHJcbiAgICBjb25zdCB1bmFsbG9jOiBUZXN0RGF0YVtdID0gW107XHJcbiAgICB0ZXN0c0Fyci5mb3JFYWNoKCh0OiBhbnkpID0+IHtcclxuICAgICAgY29uc3QgdGVzdDogVGVzdERhdGEgPSB7IC4uLnQsIGR1cmF0aW9uOiB0LmR1cmF0aW9uIHx8IDcyLCBwcmlvcml0eTogdC5wcmlvcml0eSA/PyA1MCB9O1xyXG4gICAgICBpZiAodGVzdC50ZXN0X3N0YW5kX2lkICE9IG51bGwgJiYgc3RhbmRNYXAuaGFzKHRlc3QudGVzdF9zdGFuZF9pZCkpIHtcclxuICAgICAgICBzdGFuZE1hcC5nZXQodGVzdC50ZXN0X3N0YW5kX2lkKSEudGVzdHMucHVzaCh0ZXN0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB1bmFsbG9jLnB1c2godGVzdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgc3RhbmRNYXAuZm9yRWFjaChzID0+IHMudGVzdHMuc29ydCgoYSwgYikgPT4gKGEucHJpb3JpdHlfb3JkZXIgfHwgOTk5KSAtIChiLnByaW9yaXR5X29yZGVyIHx8IDk5OSkpKTtcclxuXHJcbiAgICBjb25zdCBuZXdTdGFuZHMgPSBzdGFuZHNBcnIubWFwKHMgPT4gc3RhbmRNYXAuZ2V0KHMuaWQpISk7XHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIHNldFVuYWxsb2NhdGVkKHVuYWxsb2MpO1xyXG4gICAgc2V0SXNEaXJ0eShmYWxzZSk7XHJcbiAgICBzZXRBbGxvY2F0aW9ucyhidWlsZEFsbG9jYXRpb25zKG5ld1N0YW5kcykpO1xyXG4gICAgc2V0SGFzVW5zYXZlZENoYW5nZXMoZmFsc2UpO1xyXG4gIH0sIFtpbnB1dFRlc3RzLCBpbnB1dFN0YW5kcywgc2V0QWxsb2NhdGlvbnMsIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVJldHJ5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U2F2ZUVycm9yKGZhbHNlKTtcclxuICAgIHNldFBlbmRpbmdTYXZlKHRydWUpO1xyXG4gICAgb25SZXRyeSgpO1xyXG4gIH0sIFtvblJldHJ5XSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBCYXIgcG9zaXRpb24gXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgZ2V0QmFyUG9zID0gdXNlQ2FsbGJhY2soKHN0YXJ0OiBEYXRlLCBkdXJhdGlvbjogbnVtYmVyKSA9PiAoe1xyXG4gICAgbGVmdDogTWF0aC5tYXgoMCwgaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgc3RhcnQpKSAqIHB4UGVySG91cixcclxuICAgIHdpZHRoOiBNYXRoLm1heChkdXJhdGlvbiAqIHB4UGVySG91ciwgMiksXHJcbiAgfSksIFt2aWV3U3RhcnQsIHB4UGVySG91cl0pO1xyXG5cclxuICAvLyBGb3IgUnVubmluZyB0ZXN0czogY2xpcCBsZWZ0IHRvIHZpZXdTdGFydCwgYWRqdXN0IHdpZHRoIHRvIGFjdHVhbCBlbmQgdGltZS5cclxuICAvLyBSZXR1cm5zIG51bGwgaWYgdGhlIHRlc3QgZW5kZWQgYmVmb3JlIHRoZSB0aW1lbGluZSBzdGFydHMuXHJcbiAgY29uc3QgZ2V0UnVubmluZ0JhclBvcyA9IHVzZUNhbGxiYWNrKChzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogeyBsZWZ0OiBudW1iZXI7IHdpZHRoOiBudW1iZXIgfSB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgZWZmZWN0aXZlU3RhcnRNcyA9IE1hdGgubWF4KHN0YXJ0LmdldFRpbWUoKSwgdmlld1N0YXJ0LmdldFRpbWUoKSk7XHJcbiAgICBjb25zdCBlbmRNcyA9IGVuZC5nZXRUaW1lKCk7XHJcbiAgICBpZiAoZW5kTXMgPD0gZWZmZWN0aXZlU3RhcnRNcykgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsZWZ0OiBob3Vyc0JldHdlZW4odmlld1N0YXJ0LCBuZXcgRGF0ZShlZmZlY3RpdmVTdGFydE1zKSkgKiBweFBlckhvdXIsXHJcbiAgICAgIHdpZHRoOiBNYXRoLm1heChob3Vyc0JldHdlZW4obmV3IERhdGUoZWZmZWN0aXZlU3RhcnRNcyksIG5ldyBEYXRlKGVuZE1zKSkgKiBweFBlckhvdXIsIDIpLFxyXG4gICAgfTtcclxuICB9LCBbdmlld1N0YXJ0LCBweFBlckhvdXJdKTtcclxuXHJcbiAgY29uc3QgZHJhZ2dlZFRlc3QgPSBkcmFnZ2VkVGVzdElkICE9IG51bGwgPyBmaW5kVGVzdChkcmFnZ2VkVGVzdElkKSA6IG51bGw7XHJcbiAgY29uc3QgZHJhZ2dlZElzUnVubmluZyA9IGRyYWdnZWRUZXN0ICE9IG51bGwgPyBpc1J1bm5pbmdUZXN0KGRyYWdnZWRUZXN0KSA6IGZhbHNlO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgU3RhdHMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgdG90YWxBbGxvY2F0ZWQgPSBzdGFuZHMucmVkdWNlKChhLCBzKSA9PiBhICsgcy50ZXN0cy5sZW5ndGgsIDApO1xyXG4gIGNvbnN0IHRvdGFsSG91cnMgPSBzdGFuZHMucmVkdWNlKChhLCBzKSA9PiBhICsgcy50ZXN0cy5yZWR1Y2UoKGIsIHQpID0+IGIgKyB0LmR1cmF0aW9uLCAwKSwgMCk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBUZW1wbGF0ZSBhY2Nlc3NvcnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgbWFpblRleHQgPSBTdHJpbmcoY2FyZE1haW5UZXh0IHx8ICd7bmFtZX0nKTtcclxuICBjb25zdCBzdWJUZXh0ID0gU3RyaW5nKGNhcmRTdWJUZXh0IHx8ICcnKTtcclxuICBjb25zdCBpbmZvUm93ID0gU3RyaW5nKGNhcmRJbmZvUm93IHx8ICcnKTtcclxuICBjb25zdCB0aXBUZW1wbGF0ZSA9IFN0cmluZyh0b29sdGlwVGVtcGxhdGUgfHwgJycpLnJlcGxhY2UoL1xcXFxuL2csICdcXG4nKTtcclxuXHJcblxyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgRmlsdGVyZWQgJiBzb3J0ZWQgcXVldWUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgU1RBVFVTX1NPUlRfT1JERVI6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7XHJcbiAgICAnUnVubmluZyc6IDAsICdEZWxheWVkJzogMSwgJ09uIFRpbWUnOiAyLCAnUmVhZHknOiAzLCAnSW4gUHJvZ3Jlc3MnOiA0LCAnUGFydHMgTm90IEFzc2lnbmVkJzogNSxcclxuICB9O1xyXG5cclxuICBjb25zdCBzb3J0ZWRVbmFsbG9jYXRlZCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgbGV0IGxpc3QgPSBbLi4udW5hbGxvY2F0ZWRdO1xyXG4gICAgaWYgKHF1ZXVlRmlsdGVyLnRyaW0oKSkge1xyXG4gICAgICBjb25zdCBxID0gcXVldWVGaWx0ZXIudG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgICAgIC8vIFNlYXJjaCBhY3Jvc3MgYWxsIHJlYWRhYmxlIHN0cmluZy9udW1iZXIgZmllbGRzIG9mIHRoZSB0ZXN0XHJcbiAgICAgIGxpc3QgPSBsaXN0LmZpbHRlcih0ID0+IHtcclxuICAgICAgICBjb25zdCBzZWFyY2hhYmxlID0gW3QubmFtZSwgdC5vd25lciwgdC5ub3RlcywgdC5zdGF0dXMsIHQucGFydF9zdGF0dXMsIHQuYXNzaWduZWRfcGFydHMsXHJcbiAgICAgICAgICB0LnByaW9yaXR5ICE9IG51bGwgPyBTdHJpbmcodC5wcmlvcml0eSkgOiAnJywgdC5kdXJhdGlvbiAhPSBudWxsID8gU3RyaW5nKHQuZHVyYXRpb24pIDogJyddXHJcbiAgICAgICAgICAuam9pbignICcpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHNlYXJjaGFibGUuaW5jbHVkZXMocSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHF1ZXVlU29ydCA9PT0gJ2F6Jykge1xyXG4gICAgICBsaXN0LnNvcnQoKGEsIGIpID0+IChhLm5hbWUgfHwgJycpLmxvY2FsZUNvbXBhcmUoYi5uYW1lIHx8ICcnKSk7XHJcbiAgICB9IGVsc2UgaWYgKHF1ZXVlU29ydCA9PT0gJ3ByaW9yaXR5Jykge1xyXG4gICAgICBsaXN0LnNvcnQoKGEsIGIpID0+IChiLnByaW9yaXR5ID8/IDUwKSAtIChhLnByaW9yaXR5ID8/IDUwKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTb3J0IGJ5IGRpc3BsYXkgc3RhdHVzIHVzaW5nIGEgZml4ZWQgdXJnZW5jeSBvcmRlclxyXG4gICAgICBsaXN0LnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICBjb25zdCBzYSA9IFNUQVRVU19TT1JUX09SREVSW2dldERpc3BsYXlTdGF0dXMoYSldID8/IDk5O1xyXG4gICAgICAgIGNvbnN0IHNiID0gU1RBVFVTX1NPUlRfT1JERVJbZ2V0RGlzcGxheVN0YXR1cyhiKV0gPz8gOTk7XHJcbiAgICAgICAgcmV0dXJuIHNhICE9PSBzYiA/IHNhIC0gc2IgOiAoYi5wcmlvcml0eSA/PyA1MCkgLSAoYS5wcmlvcml0eSA/PyA1MCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbiAgfSwgW3VuYWxsb2NhdGVkLCBxdWV1ZVNvcnQsIHF1ZXVlRmlsdGVyXSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBCYXIgaGVpZ2h0IFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IEJBUl9IRUlHSFQgPSA3MjtcclxuICBjb25zdCBMQU5FX0hFSUdIVCA9IDg0O1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgUmVuZGVyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuY29udGFpbmVyfT5cclxuICAgICAge2lzTG9ja2VkICYmIChcclxuICAgICAgICA8U2F2ZU92ZXJsYXlcclxuICAgICAgICAgIGlzRXJyb3I9e3NhdmVFcnJvcn1cclxuICAgICAgICAgIG9uUmV0cnk9e2hhbmRsZVJldHJ5fVxyXG4gICAgICAgICAgb25EaXNjYXJkPXtoYW5kbGVEaXNjYXJkfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICAgIHsvKiBcdTI1NTBcdTI1NTBcdTI1NTAgUXVldWUgU2lkZWJhciBcdTI1NTBcdTI1NTBcdTI1NTAgKi99XHJcbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zaWRlYmFyfT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcyMHB4IDE2cHggMTJweCcsIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCAjRTVFN0VCJyB9fT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgbWFyZ2luQm90dG9tOiA0IH19PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCB9fT5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA4LCBoZWlnaHQ6IDgsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6IHVuYWxsb2NhdGVkLmxlbmd0aCA+IDAgPyAnI0Y1OUUwQicgOiAnIzEwQjk4MScgfX0gLz5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubW9ubywgZm9udFNpemU6IDEzLCBmb250V2VpZ2h0OiA3MDAsIGxldHRlclNwYWNpbmc6ICcwLjA4ZW0nLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJywgY29sb3I6ICcjNEI1NTYzJyB9fT5RdWV1ZTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDIsIGJhY2tncm91bmQ6ICcjRjNGNEY2JywgYm9yZGVyUmFkaXVzOiA2LCBwYWRkaW5nOiAyLCBib3JkZXI6ICcxcHggc29saWQgI0U1RTdFQicgfX0+XHJcbiAgICAgICAgICAgICAgeyhbWydheicsICdBXHUyMTkyWiddLCBbJ3ByaW9yaXR5JywgJ1ByaW9yaXR5J10sIFsnc3RhdHVzJywgJ1N0YXR1cyddXSBhcyBjb25zdCkubWFwKChbdmFsLCBsYWJlbF0pID0+IChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAga2V5PXt2YWx9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFF1ZXVlU29ydCh2YWwpfVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5tb25vLCBwYWRkaW5nOiAnM3B4IDhweCcsIGZvbnRTaXplOiA5LCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogNCxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogcXVldWVTb3J0ID09PSB2YWwgPyAnIzNCODJGNicgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBxdWV1ZVNvcnQgPT09IHZhbCA/ICcjRkZGJyA6ICcjNkI3MjgwJyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID57bGFiZWx9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCBtYXJnaW5Ub3A6IDYgfX0+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICB2YWx1ZT17cXVldWVGaWx0ZXJ9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRRdWV1ZUZpbHRlcihlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJGaWx0ZXIgdGVzdHMuLi5cIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAuLi5zdHlsZXMubW9ubywgd2lkdGg6ICcxMDAlJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsIHBhZGRpbmc6ICc1cHggMjhweCA1cHggOHB4JywgZm9udFNpemU6IDExLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNFNUU3RUInLCBib3JkZXJSYWRpdXM6IDYsIGJhY2tncm91bmQ6ICcjRjlGQUZCJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzExMTgyNycsIG91dGxpbmU6ICdub25lJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIG9uRm9jdXM9eyhlKSA9PiB7IGUuY3VycmVudFRhcmdldC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjM0I4MkY2JzsgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnI0ZGRkZGRic7IH19XHJcbiAgICAgICAgICAgICAgb25CbHVyPXsoZSkgPT4geyBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI0U1RTdFQic7IGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJyNGOUZBRkInOyB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICB7cXVldWVGaWx0ZXIgJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFF1ZXVlRmlsdGVyKCcnKX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCByaWdodDogNiwgdG9wOiAnNTAlJywgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBjb2xvcjogJyM5Q0EzQUYnLFxyXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTQsIGxpbmVIZWlnaHQ6IDEsIHBhZGRpbmc6IDAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID4mdGltZXM7PC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgc3R5bGU9e3sgZmxleDogMSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6ICc4cHggMTBweCcgfX1cclxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQpIHNldFF1ZXVlSW5zZXJ0SW5kZXgodW5hbGxvY2F0ZWQubGVuZ3RoKTsgfX1cclxuICAgICAgICAgIG9uRHJhZ0xlYXZlPXsoZSkgPT4geyBpZiAoZS5jdXJyZW50VGFyZ2V0ID09PSBlLnRhcmdldCkgc2V0UXVldWVJbnNlcnRJbmRleChudWxsKTsgfX1cclxuICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBkcm9wT25RdWV1ZShxdWV1ZUluc2VydEluZGV4ID8/IHVuYWxsb2NhdGVkLmxlbmd0aCk7IH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3NvcnRlZFVuYWxsb2NhdGVkLm1hcCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IGdldERpc3BsYXlTdGF0dXModGVzdCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNob3dTdWIgPSAhaXNUZW1wbGF0ZUVtcHR5KHN1YlRleHQsIHRlc3QpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17dGVzdC5pZH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgc2V0UXVldWVJbnNlcnRJbmRleChpZHgpOyB9fVxyXG4gICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZHJvcE9uUXVldWUoaWR4KTsgfX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHF1ZXVlSW5zZXJ0SW5kZXggPT09IGlkeCAmJiBkcmFnZ2VkVGVzdElkICYmIGRyYWdnZWRUZXN0SWQgIT09IHRlc3QuaWQgPyA2IDogMCxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzNCODJGNicsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC4xMnMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFRvb2x0aXBXcmFwcGVyXHJcbiAgICAgICAgICAgICAgICAgIHRlc3ROYW1lPXtyZXNvbHZlVGVtcGxhdGUobWFpblRleHQsIHRlc3QpfVxyXG4gICAgICAgICAgICAgICAgICBwcmlvcml0eT17dGVzdC5wcmlvcml0eX1cclxuICAgICAgICAgICAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgICAgICAgICAgIHRvb2x0aXBMaW5lcz17cmVzb2x2ZVRlbXBsYXRlKHRpcFRlbXBsYXRlLCB0ZXN0KX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZSkgPT4geyBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnOyBzZXREcmFnZ2VkVGVzdElkKHRlc3QuaWQpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17Y2xlYXJEcmFnfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgY29uc3QgcmVjdCA9IGUuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgc2V0UXVldWVJbnNlcnRJbmRleChlLmNsaWVudFkgPCByZWN0LnRvcCArIHJlY3QuaGVpZ2h0IC8gMiA/IGlkeCA6IGlkeCArIDEpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KGUpID0+IHsgY29uc3QgZWwgPSBlLmN1cnJlbnRUYXJnZXQ7IGVsLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKC0ycHgpJzsgZWwuc3R5bGUuYm94U2hhZG93ID0gJzAgNHB4IDEycHggcmdiYSgwLDAsMCwwLjE1KSc7IGVsLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtnZXRDYXBDb2xvcihzdGF0dXMpfWA7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoZSkgPT4geyBjb25zdCBlbCA9IGUuY3VycmVudFRhcmdldDsgZWwuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoMCknOyBlbC5zdHlsZS5ib3hTaGFkb3cgPSAnMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4wNiknOyBlbC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICNFNUU3RUInOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBkcmFnZ2VkVGVzdElkID09PSB0ZXN0LmlkID8gJyNGM0Y0RjYnIDogJyNGRkZGRkYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNFNUU3RUInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAnZ3JhYicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBkcmFnZ2VkVGVzdElkID09PSB0ZXN0LmlkID8gMC4zNSA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDFweCAzcHggcmdiYSgwLDAsMCwwLjA2KScsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZSwgYm9yZGVyIDAuMTVzIGVhc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7LyogU3RhdHVzIGNhcCBiYXIgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNSwgbWluV2lkdGg6IDUsIGJhY2tncm91bmQ6IGdldENhcENvbG9yKHN0YXR1cyksIGJvcmRlclJhZGl1czogJzhweCAwIDAgOHB4JywgZmxleFNocmluazogMCB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgcGFkZGluZzogJzhweCAxMnB4JywgbWluV2lkdGg6IDAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7LyogVG9wIHJvdzogcHJpb3JpdHkgbGVmdCwgc3RhdHVzIHJpZ2h0ICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206IDQgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5tb25vLCBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IGdldFByaW9yaXR5VGV4dENvbG9yKHRlc3QucHJpb3JpdHkpIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFB7dGVzdC5wcmlvcml0eX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubW9ubywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA3MDAsIGxldHRlclNwYWNpbmc6ICcwLjA1ZW0nLCBjb2xvcjogZ2V0U3RhdHVzVGV4dENvbG9yKHN0YXR1cyksIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIGFzIGNvbnN0IH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzdGF0dXMudG9VcHBlckNhc2UoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogJyMxMTE4MjcnLCBtYXJnaW5Cb3R0b206IDIsIGxpbmVIZWlnaHQ6IDEuMyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3Jlc29sdmVUZW1wbGF0ZShtYWluVGV4dCwgdGVzdCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgIHtzaG93U3ViICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyAuLi5zdHlsZXMubW9ubywgZm9udFNpemU6IDExLCBjb2xvcjogJyM2QjcyODAnLCBtYXJnaW5Cb3R0b206IDQsIGZvbnRXZWlnaHQ6IDQwMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzb2x2ZVRlbXBsYXRlKHN1YlRleHQsIHRlc3QpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IC4uLnN0eWxlcy5tb25vLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgZm9udFNpemU6IDExLCBjb2xvcjogJyM0QjU1NjMnLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7cmVzb2x2ZVRlbXBsYXRlKGluZm9Sb3csIHRlc3QpLnNwbGl0KCdcXHUwMGI3JykubWFwKChwYXJ0LCBpLCBhcnIpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntwYXJ0LnRyaW0oKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aSA8IGFyci5sZW5ndGggLSAxICYmIDxzcGFuPnsnXFx1MDBiNyd9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvVG9vbHRpcFdyYXBwZXI+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBzZXRRdWV1ZUluc2VydEluZGV4KHVuYWxsb2NhdGVkLmxlbmd0aCk7IH19XHJcbiAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBkcm9wT25RdWV1ZSh1bmFsbG9jYXRlZC5sZW5ndGgpOyB9fVxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGhlaWdodDogKHF1ZXVlSW5zZXJ0SW5kZXggPT09IHVuYWxsb2NhdGVkLmxlbmd0aCAmJiBkcmFnZ2VkVGVzdElkKSA/IDYgOiAwLFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjM0I4MkY2JyxcclxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDMsXHJcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2hlaWdodCAwLjEycyBlYXNlJyxcclxuICAgICAgICAgICAgICBtYXJnaW46ICcwIDRweCcsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAge3VuYWxsb2NhdGVkLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLCBwYWRkaW5nOiAnMzJweCAxNnB4JywgY29sb3I6ICcjNkI3MjgwJywgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgIGJvcmRlcjogZHJhZ2dlZFRlc3RJZCA/ICcycHggZGFzaGVkICMzQjgyRjYnIDogJzJweCBkYXNoZWQgI0QxRDVEQicsXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA4LCBtYXJnaW5Ub3A6IDgsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogZHJhZ2dlZFRlc3RJZCA/ICcjRUZGNkZGJyA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgIHtkcmFnZ2VkVGVzdElkID8gJ0Ryb3AgdG8gcmV0dXJuIHRvIHF1ZXVlJyA6ICdBbGwgdGVzdHMgYWxsb2NhdGVkJ31cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8T3V0bGluZUtleSAvPlxyXG5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDE2cHgnLCBib3JkZXJUb3A6ICcxcHggc29saWQgI0U1RTdFQicsIGJhY2tncm91bmQ6ICcjRjlGQUZCJyB9fT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgLi4uc3R5bGVzLm1vbm8sIGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZm9udFNpemU6IDEwLCBjb2xvcjogJyM2QjcyODAnIH19PlxyXG4gICAgICAgICAgICA8c3Bhbj57dG90YWxBbGxvY2F0ZWR9L3t0b3RhbEFsbG9jYXRlZCArIHVuYWxsb2NhdGVkLmxlbmd0aH0gYWxsb2NhdGVkPC9zcGFuPjxzcGFuPnt0b3RhbEhvdXJzfWg8L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7LyogXHUyNTUwXHUyNTUwXHUyNTUwIE1haW4gVGltZWxpbmUgXHUyNTUwXHUyNTUwXHUyNTUwICovfVxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICB7LyogSGVhZGVyIGJhciAqL31cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDI0cHgnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgI0U1RTdFQicsIGJhY2tncm91bmQ6ICcjRkZGRkZGJywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZ2FwOiAxNiwgZmxleFdyYXA6ICd3cmFwJyB9fT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWluV2lkdGg6IDAgfX0+XHJcbiAgICAgICAgICAgIDxoMSBzdHlsZT17eyBmb250U2l6ZTogMTgsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6ICcjMTExODI3JywgbGV0dGVyU3BhY2luZzogJy0wLjAyZW0nIH19PlRlc3QgU3RhbmQgU2NoZWR1bGVyPC9oMT5cclxuICAgICAgICAgICAgPHAgc3R5bGU9e3sgLi4uc3R5bGVzLm1vbm8sIGZvbnRTaXplOiAxMSwgY29sb3I6ICcjNkI3MjgwJywgbWFyZ2luVG9wOiAyIH19PlxyXG4gICAgICAgICAgICAgIENvbnRpbnVvdXMgdGVzdGluZyBcdTAwQjcge2NoSG91cnN9aCBjaGFuZ2VvdmVyICh7d1N0YXJ0fTowMFx1MjAxM3t3RW5kfTowMCBNb25cdTIwMTNGcmkpXHJcbiAgICAgICAgICAgICAgeyhzYXZlTW9kZSBhcyBzdHJpbmcpID09PSAnbGl2ZScgJiYgPHNwYW4+IFx1MDBCNyBMaXZlIHN5bmM8L3NwYW4+fVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogMTIgfX0+XHJcbiAgICAgICAgICAgIHsvKiBTYXZlL0Rpc2NhcmQgYnV0dG9ucyAoYmF0Y2ggbW9kZSkgKi99XHJcbiAgICAgICAgICAgIHsoc2F2ZU1vZGUgYXMgc3RyaW5nKSA9PT0gJ2JhdGNoJyAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiB9fT5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRGlzY2FyZH1cclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0RpcnR5IHx8IGlzTG9ja2VkfVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5tb25vLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggMTRweCcsIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNEMUQ1REInLCBjdXJzb3I6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyAncG9pbnRlcicgOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNGRkZGRkYnLCBjb2xvcjogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/ICcjMzc0MTUxJyA6ICcjOUNBM0FGJyxcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gMSA6IDAuNSxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgRGlzY2FyZFxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNhdmV9XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNEaXJ0eSB8fCBpc0xvY2tlZH1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMubW9ubyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDE0cHgnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyAncG9pbnRlcicgOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/ICcjM0I4MkY2JyA6ICcjOTNDNUZEJyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNGRkZGRkYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/ICcwIDFweCAzcHggcmdiYSg1OSwxMzAsMjQ2LDAuMyknIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICBTYXZlIENoYW5nZXN7aXNEaXJ0eSAmJiAnIFx1MjAyMid9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIHsvKiBWaWV3cG9ydCBzZWxlY3RvciAqL31cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNCwgYmFja2dyb3VuZDogJyNGM0Y0RjYnLCBib3JkZXJSYWRpdXM6IDgsIHBhZGRpbmc6IDMsIGJvcmRlcjogJzFweCBzb2xpZCAjRTVFN0VCJyB9fT5cclxuICAgICAgICAgICAgICB7WzIsIDQsIDgsIDEyLCAyNF0ubWFwKCh3KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIGtleT17d31cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Vmlld3BvcnRXZWVrcyh3KX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMubW9ubyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEycHgnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB2aWV3cG9ydFdlZWtzID09PSB3ID8gJyMzQjgyRjYnIDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogdmlld3BvcnRXZWVrcyA9PT0gdyA/ICcjRkZGJyA6ICcjNEI1NTYzJyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge3d9V1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHsvKiBUaW1lbGluZSBzY3JvbGwgYXJlYSAqL31cclxuICAgICAgICA8ZGl2IHJlZj17c2Nyb2xsUmVmfSBzdHlsZT17eyBmbGV4OiAxLCBvdmVyZmxvdzogJ2F1dG8nLCBiYWNrZ3JvdW5kOiAnI0Y5RkFGQicgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1pbldpZHRoOiB0b3RhbFdpZHRoLCBwYWRkaW5nOiAnMCAxMnB4IDI0cHgnLCBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuICAgICAgICAgICAgey8qIFRpbWVsaW5lIGhlYWRlciAqL31cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3N0aWNreScsIHRvcDogMCwgekluZGV4OiAyMCwgYmFja2dyb3VuZDogJyNGOUZBRkInLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgI0U1RTdFQicgfX0+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGhlaWdodDogMjgsIHBvc2l0aW9uOiAncmVsYXRpdmUnLCBib3JkZXJCb3R0b206ICcxcHggc29saWQgI0U1RTdFQicgfX0+XHJcbiAgICAgICAgICAgICAgICB7d2Vla3MubWFwKCh3aywgaSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMubW9ubywgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgd2spICogcHhQZXJIb3VyLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3ICogMjQgKiBweFBlckhvdXIsIGhlaWdodDogMjgsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgcGFkZGluZ0xlZnQ6IDgsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDEwLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiAnIzRCNTU2MycsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogaSA+IDAgPyAnMXB4IHNvbGlkICNFNUU3RUInIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0V2Vlayh3ayl9XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGhlaWdodDogMjQgfX0+XHJcbiAgICAgICAgICAgICAgICB7ZGF5cy5tYXAoKGQsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNUb2RheSA9IGQudG9EYXRlU3RyaW5nKCkgPT09IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzV2Vla2VuZCA9IGQuZ2V0RGF5KCkgPT09IDAgfHwgZC5nZXREYXkoKSA9PT0gNjtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5tb25vLCB3aWR0aDogZGF5V2lkdGgsIG1pbldpZHRoOiBkYXlXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiA5LCB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGlzVG9kYXkgPyAnIzI1NjNFQicgOiAnIzZCNzI4MCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiBpc1RvZGF5ID8gNzAwIDogNDAwLCBsaW5lSGVpZ2h0OiAnMjRweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiAnMXB4IHNvbGlkICNFNUU3RUInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaXNUb2RheSA/ICcjRUZGNkZGJyA6IChpc1dlZWtlbmQgPyAnI0YzRjRGNicgOiAndHJhbnNwYXJlbnQnKSxcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIHt2aWV3cG9ydFdlZWtzIDw9IDggPyBkLmdldERhdGUoKSA6IChkLmdldERheSgpID09PSAxID8gZC5nZXREYXRlKCkgOiAnJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICB7LyogXHUyNTUwXHUyNTUwXHUyNTUwIFRlc3QgU3RhbmQgTGFuZXMgXHUyNTUwXHUyNTUwXHUyNTUwICovfVxyXG4gICAgICAgICAgICB7c3RhbmRzLm1hcCgoc3RhbmQpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBzY2hlZHVsZSA9IGNvbXB1dGVTY2hlZHVsZShzdGFuZC50ZXN0cyk7XHJcbiAgICAgICAgICAgICAgY29uc3QgaW5kID0gaW5zZXJ0SW5kaWNhdG9yO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNob3dIZXJlID0gaW5kICYmIGluZC5zdGFuZElkID09PSBzdGFuZC5pZDtcclxuXHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtzdGFuZC5pZH0gc3R5bGU9e3sgbWFyZ2luVG9wOiAxNiB9fT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDgsIG1hcmdpbkJvdHRvbTogNiwgcGFkZGluZ0xlZnQ6IDIgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNiwgaGVpZ2h0OiA2LCBib3JkZXJSYWRpdXM6IDIsIGJhY2tncm91bmQ6IHN0YW5kLnRlc3RzLmxlbmd0aCA+IDAgPyAnIzNCODJGNicgOiAnIzlDQTNBRicgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubW9ubywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiAnIzM3NDE1MScgfX0+e3N0YW5kLm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5tb25vLCBmb250U2l6ZTogMTAsIGNvbG9yOiAnIzZCNzI4MCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7c3RhbmQudGVzdHMubGVuZ3RofSB0ZXN0e3N0YW5kLnRlc3RzLmxlbmd0aCAhPT0gMSA/ICdzJyA6ICcnfXtzdGFuZC50ZXN0cy5sZW5ndGggPiAwICYmIGAgXFx1MDBiNyAke3N0YW5kLnRlc3RzLnJlZHVjZSgoYSwgdCkgPT4gYSArIHQuZHVyYXRpb24sIDApfWhgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBzZXRJbnNlcnRJbmRpY2F0b3IoeyBzdGFuZElkOiBzdGFuZC5pZCwgaW5kZXg6IHN0YW5kLnRlc3RzLmxlbmd0aCB9KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICBvbkRyYWdMZWF2ZT17KGUpID0+IHsgaWYgKCFlLmN1cnJlbnRUYXJnZXQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0IGFzIE5vZGUpKSBzZXRJbnNlcnRJbmRpY2F0b3IobnVsbCk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgb25Ecm9wPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gUnVubmluZyB0ZXN0cyBhbHdheXMgYXBwZW5kIHRvIGVuZCAocG9zaXRpb24gaXMgZ292ZXJuZWQgYnkgdGVzdF9zdGFydGVkX2RhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhZ2dlZElzUnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wT25TdGFuZChzdGFuZC5pZCwgc3RhbmQudGVzdHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BPblN0YW5kKHN0YW5kLmlkLCBpbmQ/LnN0YW5kSWQgPT09IHN0YW5kLmlkID8gaW5kLmluZGV4IDogc3RhbmQudGVzdHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogTEFORV9IRUlHSFQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBzaG93SGVyZSB8fCAoZHJhZ2dlZFRlc3RJZCAmJiBzdGFuZC50ZXN0cy5sZW5ndGggPT09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuICcjRjNGNEY2JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyYWdnZWRJc1J1bm5pbmcgPyAnI0Y1RjNGRicgOiAnI0VGRjZGRic7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gc2hvd0hlcmUgfHwgKGRyYWdnZWRUZXN0SWQgJiYgc3RhbmQudGVzdHMubGVuZ3RoID09PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHJldHVybiAnI0U1RTdFQic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkcmFnZ2VkSXNSdW5uaW5nID8gJyNBNzhCRkEnIDogJyNCRkRCRkUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSkoKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRvdGFsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnYmFja2dyb3VuZCAwLjE1cyBlYXNlLCBib3JkZXItY29sb3IgMC4xNXMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBXZWVrZW5kIHNoYWRpbmcgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge2RheXMubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5nZXREYXkoKSAhPT0gMCAmJiBkLmdldERheSgpICE9PSA2KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgd2UtJHtpfWB9IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGkgKiBkYXlXaWR0aCwgdG9wOiAwLCBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGRheVdpZHRoLCBiYWNrZ3JvdW5kOiAnI0U1RTdFQicsIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBEYXkgZ3JpZCAqL31cclxuICAgICAgICAgICAgICAgICAgICB7ZGF5cy5tYXAoKF8sIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogaSAqIGRheVdpZHRoLCB0b3A6IDAsIGJvdHRvbTogMCwgd2lkdGg6IDEsIGJhY2tncm91bmQ6ICcjRTVFN0VCJyB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogTm93IGxpbmUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoID0gaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaCA8IDAgfHwgaCA+IHRvdGFsRGF5cyAqIDI0KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGggKiBweFBlckhvdXIsIHRvcDogMCwgYm90dG9tOiAwLCB3aWR0aDogMiwgYmFja2dyb3VuZDogJyNFRjQ0NDQnLCB6SW5kZXg6IDEwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTMsIGxlZnQ6IC0zLCB3aWR0aDogOCwgaGVpZ2h0OiA4LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiAnI0VGNDQ0NCcgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBUZXN0IGJhcnMgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3NjaGVkdWxlLm1hcCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1Rlc3RSdW5uaW5nID0gaXNSdW5uaW5nVGVzdCh0ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhclBvcyA9IGlzVGVzdFJ1bm5pbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBnZXRSdW5uaW5nQmFyUG9zKHRlc3Quc3RhcnQsIHRlc3QuZW5kKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGdldEJhclBvcyh0ZXN0LnN0YXJ0LCB0ZXN0LmR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIFJ1bm5pbmcgdGVzdHMgdGhhdCBlbmRlZCBiZWZvcmUgdGhlIHRpbWVsaW5lIHN0YXJ0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCFiYXJQb3MpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgd2lkdGggfSA9IGJhclBvcztcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKHRlc3QuZW5kLCBjaEhvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlb3ZlcldpZHRoID0gaG91cnNCZXR3ZWVuKHRlc3QuZW5kLCBjRW5kKSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlTdGF0dXMgPSBnZXREaXNwbGF5U3RhdHVzKHRlc3QsIHRlc3Quc3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkTWFpbiA9IHJlc29sdmVUZW1wbGF0ZShtYWluVGV4dCwgdGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZEluZm8gPSByZXNvbHZlVGVtcGxhdGUoaW5mb1JvdywgdGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaG93SW5mb09uQmFyID0gcmVzb2x2ZWRJbmZvLnRyaW0oKSAhPT0gJycgJiYgd2lkdGggPiAxMjA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3Rlc3QuaWR9IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0LCB0b3A6IDAsIHdpZHRoOiB3aWR0aCArIGNoYW5nZW92ZXJXaWR0aCwgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIERyb3Agem9uZXMgXHUyMDE0IHN1cHByZXNzZWQgd2hlbiBkcmFnZ2luZyBhIFJ1bm5pbmcgdGVzdCAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZHJhZ2dlZFRlc3RJZCAmJiBkcmFnZ2VkVGVzdElkICE9PSB0ZXN0LmlkICYmICFkcmFnZ2VkSXNSdW5uaW5nICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldEluc2VydEluZGljYXRvcih7IHN0YW5kSWQ6IHN0YW5kLmlkLCBpbmRleDogaWR4IH0pOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBkcm9wT25TdGFuZChzdGFuZC5pZCwgaWR4KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogLTYsIHRvcDogMCwgd2lkdGg6ICc1MCUnLCBoZWlnaHQ6ICcxMDAlJywgekluZGV4OiAyMCwgbWluV2lkdGg6IDIwIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldEluc2VydEluZGljYXRvcih7IHN0YW5kSWQ6IHN0YW5kLmlkLCBpbmRleDogaWR4ICsgMSB9KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIGlkeCArIDEpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCByaWdodDogLTYsIHRvcDogMCwgd2lkdGg6ICc1MCUnLCBoZWlnaHQ6ICcxMDAlJywgekluZGV4OiAyMCwgbWluV2lkdGg6IDIwIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogSW5zZXJ0IGluZGljYXRvciBiZWZvcmUgdGhpcyB0ZXN0IFx1MjAxNCBzdXBwcmVzc2VkIGZvciBSdW5uaW5nIGRyYWdzICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93SGVyZSAmJiAhZHJhZ2dlZElzUnVubmluZyAmJiBpbmQhLmluZGV4ID09PSBpZHggJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogLTQsIHRvcDogMCwgYm90dG9tOiAwIH19PjxJbnNlcnRMaW5lIC8+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFRlc3QgYmFyICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxUb29sdGlwV3JhcHBlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdE5hbWU9e3Jlc29sdmVkTWFpbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW9yaXR5PXt0ZXN0LnByaW9yaXR5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzPXtkaXNwbGF5U3RhdHVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcExpbmVzPXtyZXNvbHZlVGVtcGxhdGUodGlwVGVtcGxhdGUsIHRlc3QpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkPXtpc1Rlc3RSdW5uaW5nID8gbnVsbCA6IHRlc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyU3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAsIHRvcDogMCwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6ICcxMDAlJyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZSkgPT4geyBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnOyBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgU3RyaW5nKHRlc3QuaWQpKTsgc2V0RHJhZ2dlZFRlc3RJZCh0ZXN0LmlkKTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EcmFnRW5kPXtjbGVhckRyYWd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KGUpID0+IHsgaWYgKCFkcmFnZ2VkVGVzdElkKSB7IGNvbnN0IGVsID0gZS5jdXJyZW50VGFyZ2V0OyBlbC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgtMnB4KSc7IGVsLnN0eWxlLmJveFNoYWRvdyA9ICcwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4xNSknOyBlbC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7Z2V0Q2FwQ29sb3IoZGlzcGxheVN0YXR1cyl9YDsgZWwuc3R5bGUuekluZGV4ID0gJzI1JzsgfSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eyhlKSA9PiB7IGNvbnN0IGVsID0gZS5jdXJyZW50VGFyZ2V0OyBlbC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgwKSc7IGVsLnN0eWxlLmJveFNoYWRvdyA9ICcwIDFweCAzcHggcmdiYSgwLDAsMCwwLjA2KSc7IGVsLnN0eWxlLmJvcmRlciA9IGlzVGVzdFJ1bm5pbmcgPyAnMXB4IHNvbGlkICNDNEI1RkQnIDogJzFweCBzb2xpZCAjRTVFN0VCJzsgZWwuc3R5bGUuekluZGV4ID0gJzE1JzsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoLCBoZWlnaHQ6IEJBUl9IRUlHSFQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaXNUZXN0UnVubmluZyA/ICcjRjNFOEZGJyA6ICcjRkZGRkZGJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDgsIGN1cnNvcjogJ2dyYWInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ3JvdycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IGRyYWdnZWRUZXN0SWQgPT09IHRlc3QuaWQgPyAwLjI1IDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDE1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogaXNUZXN0UnVubmluZyA/ICcxcHggc29saWQgI0M0QjVGRCcgOiAnMXB4IHNvbGlkICNFNUU3RUInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogaXNUZXN0UnVubmluZyA/ICcwIDFweCAzcHggcmdiYSgxNDcsNTEsMjM0LDAuMTUpJyA6ICcwIDFweCAzcHggcmdiYSgwLDAsMCwwLjA2KScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjE1cyBlYXNlLCBib3gtc2hhZG93IDAuMTVzIGVhc2UsIGJvcmRlciAwLjE1cyBlYXNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFN0YXR1cyBjYXAgYmFyICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA1LCBtaW5XaWR0aDogNSwgYmFja2dyb3VuZDogZ2V0Q2FwQ29sb3IoZGlzcGxheVN0YXR1cyksIGZsZXhTaHJpbms6IDAgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBwYWRkaW5nOiAnNHB4IDhweCcsIG1pbldpZHRoOiAwLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFRvcCByb3c6IHByaW9yaXR5ICsgc3RhdHVzICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt3aWR0aCA+IDcwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAyIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyAuLi5zdHlsZXMubW9ubywgZm9udFNpemU6IHdpZHRoID4gMTIwID8gMTEgOiA5LCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiBpc1Rlc3RSdW5uaW5nID8gJyM3RTIyQ0UnIDogZ2V0UHJpb3JpdHlUZXh0Q29sb3IodGVzdC5wcmlvcml0eSkgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzVGVzdFJ1bm5pbmcgPyAnXHUyNUI2IFJVTk5JTkcnIDogYFAke3Rlc3QucHJpb3JpdHl9YH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7d2lkdGggPiAxMDAgJiYgIWlzVGVzdFJ1bm5pbmcgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IC4uLnN0eWxlcy5tb25vLCBmb250U2l6ZTogOSwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnMC4wNWVtJywgY29sb3I6IGdldFN0YXR1c1RleHRDb2xvcihkaXNwbGF5U3RhdHVzKSwgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgYXMgY29uc3QgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGlzcGxheVN0YXR1cy50b1VwcGVyQ2FzZSgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIE1haW4gdGV4dCAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IHdpZHRoID4gMTIwID8gMTIgOiB3aWR0aCA+IDgwID8gMTEgOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IGlzVGVzdFJ1bm5pbmcgPyAnIzNCMDc2NCcgOiAnIzExMTgyNycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCBtYXhXaWR0aDogJzEwMCUnLCBsaW5lSGVpZ2h0OiAxLjIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVzb2x2ZWRNYWlufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIEluZm8gcm93ICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93SW5mb09uQmFyICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5tb25vLCBmb250U2l6ZTogOSwgZm9udFdlaWdodDogNDAwLCBjb2xvcjogaXNUZXN0UnVubmluZyA/ICcjN0UyMkNFJyA6ICcjNEI1NTYzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCBtYXhXaWR0aDogJzEwMCUnLCBtYXJnaW5Ub3A6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Jlc29sdmVkSW5mb31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvVG9vbHRpcFdyYXBwZXI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDaGFuZ2VvdmVyIGluZGljYXRvciAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aWR4IDwgc2NoZWR1bGUubGVuZ3RoICYmIGNoYW5nZW92ZXJXaWR0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogd2lkdGgsIHRvcDogTEFORV9IRUlHSFQgLyAyIC0gOCwgd2lkdGg6IGNoYW5nZW92ZXJXaWR0aCwgaGVpZ2h0OiAxNiwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogMSwgd2lkdGg6ICc4MCUnLCBiYWNrZ3JvdW5kOiAncmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCg5MGRlZywgIzlDQTNBRiAwLCAjOUNBM0FGIDRweCwgdHJhbnNwYXJlbnQgNHB4LCB0cmFuc3BhcmVudCA4cHgpJyB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogSW5zZXJ0IGluZGljYXRvciBhdCBlbmQgXHUyMDE0IHN1cHByZXNzZWQgd2hlbiBkcmFnZ2luZyBhIFJ1bm5pbmcgdGVzdCAqL31cclxuICAgICAgICAgICAgICAgICAgICB7c2hvd0hlcmUgJiYgIWRyYWdnZWRJc1J1bm5pbmcgJiYgaW5kIS5pbmRleCA9PT0gc3RhbmQudGVzdHMubGVuZ3RoICYmIHNjaGVkdWxlLmxlbmd0aCA+IDAgJiYgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3QgPSBzY2hlZHVsZVtzY2hlZHVsZS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgd2lkdGggfSA9IGdldEJhclBvcyhsYXN0LnN0YXJ0LCBsYXN0LmR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKGxhc3QuZW5kLCBjaEhvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlb3ZlcldpZHRoID0gaG91cnNCZXR3ZWVuKGxhc3QuZW5kLCBjRW5kKSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBsZWZ0ICsgd2lkdGggKyBjaGFuZ2VvdmVyV2lkdGggKyA4LCB0b3A6IDAsIGJvdHRvbTogMCB9fT48SW5zZXJ0TGluZSAvPjwvZGl2PjtcclxuICAgICAgICAgICAgICAgICAgICB9KSgpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogRW1wdHkgc3RhdGUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3N0YW5kLnRlc3RzLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnN0eWxlcy5tb25vLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgaW5zZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDExLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogZHJhZ2dlZFRlc3RJZCA/ICcjM0I4MkY2JyA6ICcjOUNBM0FGJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogZHJhZ2dlZFRlc3RJZCA/IDYwMCA6IDQwMCxcclxuICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZHJhZ2dlZFRlc3RJZCA/ICdEcm9wIGhlcmUgdG8gc2NoZWR1bGUnIDogJ0Ryb3AgdGVzdHMgaGVyZSB0byBzY2hlZHVsZSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgey8qIE5vIHN0YW5kcyBtZXNzYWdlICovfVxyXG4gICAgICAgICAgICB7c3RhbmRzLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgLi4uc3R5bGVzLm1vbm8sIHRleHRBbGlnbjogJ2NlbnRlcicsIHBhZGRpbmc6ICc0OHB4IDI0cHgnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjNkI3MjgwJywgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgTm8gdGVzdCBzdGFuZHMgbG9hZGVkLiBCaW5kIHRoZSB0ZXN0U3RhbmRzIHByb3BlcnR5IHRvIHlvdXIgZ2V0VGVzdFN0YW5kcyBxdWVyeS5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcbiIsICJcbiAgICAgICAgICBleHBvcnQgY29uc3QgeyBSZXRvb2wgfSA9IHdpbmRvdy5jY2Nfc3VwcG9ydF9SZXRvb2xDdXN0b21Db21wb25lbkNvbGxlY3Rpb25zO1xuICAgICAgICAiLCAiXG4gICAgICAgICAgZXhwb3J0IGNvbnN0IHsgRnJhZ21lbnQsIGpzeHMsIGpzeCwgZGVmYXVsdCB9ID0gd2luZG93LmNjY19zdXBwb3J0X1JlYWN0SlNYUnVudGltZTtcbiAgICAgICAgIl0sCiAgIm1hcHBpbmdzIjog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
