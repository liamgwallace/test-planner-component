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
var buildTheme = (raw, statusOverrides = {}, monoFontOverride) => {
  const isDark = raw?.mode === "dark";
  const accent = raw?.primary || "#3B82F6";
  const canvas = raw?.canvas || (isDark ? "#1C1C2E" : "#F9FAFB");
  const surface = raw?.surfacePrimary || (isDark ? "#252535" : "#FFFFFF");
  const surfaceSecondary = raw?.surfaceSecondary || (isDark ? "#1E1E30" : "#F3F4F6");
  const fontFamily = raw?.defaultFont?.name ? `'${raw.defaultFont.name}', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` : "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif";
  const baseRadius = (() => {
    const r = raw?.borderRadius;
    if (!r)
      return 6;
    const n = parseInt(String(r), 10);
    return isNaN(n) ? 6 : n;
  })();
  const textPrimary = isDark ? "#F9FAFB" : "#111827";
  const textSecondary = isDark ? "#D1D5DB" : "#374151";
  const textTertiary = isDark ? "#A0AEC0" : "#4B5563";
  const textMuted = isDark ? "#718096" : "#6B7280";
  const textDisabled = isDark ? "#4B5563" : "#9CA3AF";
  const border = isDark ? "#374151" : "#E5E7EB";
  const borderStrong = isDark ? "#4B5563" : "#D1D5DB";
  const bgSubtle = isDark ? "#1A1A2E" : "#F3F4F6";
  const surfaceHover = isDark ? "#2E2E3E" : "#F3F4F6";
  const accentSubtle = isDark ? `${accent}33` : "#EFF6FF";
  const accentMuted = isDark ? `${accent}80` : "#93C5FD";
  const runningBg = isDark ? "#2D1B4E" : "#F3E8FF";
  const runningBorder = isDark ? "#7E3DAA" : "#C4B5FD";
  const runningText = "#7E22CE";
  const runningTextDark = "#3B0764";
  const defaultCap = {
    "Running": "#9333EA",
    "Ready": "#22C55E",
    "On Time": "#E5A00D",
    "Delayed": "#EF4444",
    "Parts Not Assigned": "#9CA3AF",
    "In Progress": "#E5A00D"
  };
  const defaultText = {
    "Running": "#7E22CE",
    "Ready": "#16A34A",
    "On Time": "#B45309",
    "Delayed": "#DC2626",
    "Parts Not Assigned": "#6B7280",
    "In Progress": "#B45309"
  };
  const statusCap = {};
  const statusText = {};
  for (const key of Object.keys(defaultCap)) {
    statusCap[key] = statusOverrides[key] || defaultCap[key];
    statusText[key] = statusOverrides[key] ? statusOverrides[key] : defaultText[key];
  }
  return {
    isDark,
    canvas,
    surface,
    surfaceSecondary,
    bgSubtle,
    surfaceHover,
    accentSubtle,
    runningBg,
    runningBorder,
    runningText,
    runningTextDark,
    textPrimary,
    textSecondary,
    textTertiary,
    textMuted,
    textDisabled,
    border,
    borderStrong,
    accent,
    accentFg: "#FFFFFF",
    accentMuted,
    fontFamily,
    fontMono: monoFontOverride ? `'${monoFontOverride}', monospace` : fontFamily,
    radiusSm: Math.max(2, baseRadius - 2),
    radius: baseRadius,
    radiusLg: baseRadius + 2,
    radiusXl: baseRadius + 4,
    statusCap,
    statusText
  };
};
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
var parseAssignedPartSerials = (val) => {
  const str = typeof val === "string" ? val.trim() : String(val || "").trim();
  if (!str)
    return [];
  const parts = str.includes(",") ? str.split(",") : /^\d+(\s+\d+)+$/.test(str) ? str.split(/\s+/) : [str];
  return parts.map((part) => part.trim()).filter(Boolean);
};
var buildAssignedPartLink = (baseUrl, serial) => {
  const trimmedBase = String(baseUrl || "").trim();
  if (!trimmedBase)
    return "";
  return `${trimmedBase}${encodeURIComponent(serial)}`;
};
var resolveAssignedPartsValue = (template, data) => {
  const str = typeof template === "string" ? template.trim() : String(template || "").trim();
  if (!str)
    return "";
  if (/^\w+$/.test(str) && Object.prototype.hasOwnProperty.call(data, str)) {
    return formatFieldValue(data[str]);
  }
  return resolveTemplate(str, data);
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
  const datePart = dateStr.split("T")[0];
  const parts = datePart.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN))
    return null;
  const d = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
  return isNaN(d.getTime()) ? null : d;
};
var toMidnight = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};
var formatDateInputValue = (value) => {
  if (!value)
    return "";
  const datePart = String(value).split("T")[0];
  return /^\d{4}-\d{2}-\d{2}$/.test(datePart) ? datePart : "";
};
var getTodayDateInputValue = () => {
  const today = /* @__PURE__ */ new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
};
var formatMenuDateLabel = (value) => {
  const parsed = parseLocalDate(value ?? null);
  if (!parsed)
    return "";
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  });
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
var parseNonWorkingBlocks = (raw) => {
  if (!Array.isArray(raw))
    return [];
  const result = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object")
      continue;
    const start = new Date(entry.start);
    const end = new Date(entry.end);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start)
      continue;
    result.push({ start, end, notes: entry.notes ?? void 0 });
  }
  return result;
};
var advancePastNonWorking = (date, blocks) => {
  let result = new Date(date);
  let changed = true;
  while (changed) {
    changed = false;
    for (const b of blocks) {
      if (result >= b.start && result < b.end) {
        result = new Date(b.end);
        changed = true;
      }
    }
  }
  return result;
};
var findValidStart = (proposedStart, durationHours, blocks) => {
  let result = new Date(proposedStart);
  let changed = true;
  while (changed) {
    changed = false;
    const end = new Date(result.getTime() + durationHours * MS_PER_HOUR);
    for (const b of blocks) {
      if (result < b.end && end > b.start) {
        result = new Date(b.end);
        changed = true;
        break;
      }
    }
  }
  return result;
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
var getCapColor = (status, theme) => theme.statusCap[status] || theme.statusCap["In Progress"] || "#E5A00D";
var getStatusTextColor = (status, theme) => theme.statusText[status] || theme.statusText["In Progress"] || "#B45309";
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
var InsertLine = ({ theme }) => /* @__PURE__ */ jsxs("div", { style: {
  position: "absolute",
  top: 2,
  bottom: 2,
  width: 3,
  background: theme.accent,
  borderRadius: 2,
  zIndex: 30,
  boxShadow: `0 0 12px ${theme.accent}, 0 0 4px ${theme.accent}`,
  pointerEvents: "none"
}, children: [
  /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: -4, left: -4, width: 11, height: 11, borderRadius: "50%", background: theme.accent } }),
  /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: -4, left: -4, width: 11, height: 11, borderRadius: "50%", background: theme.accent } })
] });
var OutlineKey = ({ theme }) => /* @__PURE__ */ jsxs("div", { style: { padding: "10px 16px", borderTop: `1px solid ${theme.border}`, background: theme.canvas }, children: [
  /* @__PURE__ */ jsx("h3", { style: { fontFamily: theme.fontMono, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: theme.textTertiary, marginBottom: 6 }, children: "Status Key" }),
  /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px 0" }, children: ["Running", "Ready", "On Time", "Delayed", "Parts Not Assigned"].map((key) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, width: "50%", minWidth: 0 }, children: [
    /* @__PURE__ */ jsx("div", { style: { width: 4, height: 14, background: theme.statusCap[key], borderRadius: 2, flexShrink: 0 } }),
    /* @__PURE__ */ jsx("span", { style: { fontFamily: theme.fontMono, fontSize: 9, color: theme.statusText[key], fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: key.toUpperCase() })
  ] }, key)) })
] });
var QueueCard = ({
  test,
  draggedTestId,
  status,
  mainText,
  subText,
  infoRow,
  showSub,
  theme,
  onDragStart,
  onDragEnd,
  onDragOver,
  onMenuOpen
}) => {
  const [hovered, setHovered] = import_react.default.useState(false);
  const pillRef = (0, import_react.useRef)(null);
  const capColor = getCapColor(status, theme);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      draggable: true,
      onDragStart: (e) => {
        e.dataTransfer.effectAllowed = "move";
        onDragStart();
      },
      onDragEnd,
      onDragOver,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        position: "relative",
        display: "flex",
        marginBottom: 6,
        background: draggedTestId === test.id ? theme.bgSubtle : theme.surface,
        border: hovered ? `2px solid ${capColor}` : `1px solid ${theme.border}`,
        borderRadius: theme.radiusLg,
        cursor: "grab",
        opacity: draggedTestId === test.id ? 0.35 : 1,
        overflow: "hidden",
        boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease",
        fontFamily: theme.fontFamily
      },
      children: [
        /* @__PURE__ */ jsx("div", { style: { width: 5, minWidth: 5, background: capColor, borderRadius: `${theme.radiusLg}px 0 0 ${theme.radiusLg}px`, flexShrink: 0 } }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1, padding: "8px 12px", minWidth: 0 }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, paddingRight: 20 }, children: [
            /* @__PURE__ */ jsxs("span", { style: { fontFamily: theme.fontMono, fontSize: 13, fontWeight: 700, color: getPriorityTextColor(test.priority) }, children: [
              "P",
              test.priority
            ] }),
            /* @__PURE__ */ jsx("span", { style: { fontFamily: theme.fontMono, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: getStatusTextColor(status, theme), textTransform: "uppercase" }, children: status.toUpperCase() })
          ] }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: 14, fontWeight: 600, color: theme.textPrimary, marginBottom: 2, lineHeight: 1.3 }, children: mainText }),
          showSub && /* @__PURE__ */ jsx("div", { style: { fontFamily: theme.fontMono, fontSize: 11, color: theme.textMuted, marginBottom: 4, fontWeight: 400 }, children: subText }),
          /* @__PURE__ */ jsx("div", { style: { fontFamily: theme.fontMono, display: "flex", gap: 8, fontSize: 11, color: theme.textTertiary, flexWrap: "wrap" }, children: infoRow.split("\xB7").map((part, i, arr) => /* @__PURE__ */ jsxs(import_react.default.Fragment, { children: [
            /* @__PURE__ */ jsx("span", { children: part.trim() }),
            i < arr.length - 1 && /* @__PURE__ */ jsx("span", { children: "\xB7" })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: pillRef,
            draggable: false,
            onMouseDown: (e) => e.stopPropagation(),
            onClick: (e) => {
              e.stopPropagation();
              if (pillRef.current) {
                const r = pillRef.current.getBoundingClientRect();
                onMenuOpen({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
              }
            },
            style: {
              position: "absolute",
              top: 6,
              right: 6,
              background: hovered ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.04)",
              borderRadius: 10,
              padding: "2px 7px",
              fontSize: 13,
              color: theme.textMuted,
              cursor: "pointer",
              letterSpacing: "0.1em",
              lineHeight: 1,
              opacity: hovered ? 1 : 0.4,
              transition: "opacity 0.15s, background 0.15s",
              userSelect: "none",
              fontWeight: 700
            },
            children: "\xB7\xB7\xB7"
          }
        )
      ]
    }
  );
};
var TestBar = ({
  test,
  isTestRunning,
  draggedTestId,
  width,
  BAR_HEIGHT,
  displayStatus,
  resolvedMain,
  resolvedInfo,
  showInfoOnBar,
  theme,
  onDragStart,
  onDragEnd,
  onMenuOpen
}) => {
  const [hovered, setHovered] = import_react.default.useState(false);
  const pillRef = (0, import_react.useRef)(null);
  const capColor = getCapColor(displayStatus, theme);
  const useVerticalDots = width <= 40;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      draggable: true,
      onDragStart,
      onDragEnd,
      onMouseEnter: () => {
        if (!draggedTestId)
          setHovered(true);
      },
      onMouseLeave: () => setHovered(false),
      style: {
        position: "absolute",
        left: 0,
        top: 6,
        width,
        height: BAR_HEIGHT,
        background: isTestRunning ? theme.runningBg : theme.surface,
        borderRadius: theme.radiusLg,
        cursor: "grab",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        opacity: draggedTestId === test.id ? 0.25 : 1,
        zIndex: hovered ? 25 : 15,
        border: hovered ? `2px solid ${capColor}` : isTestRunning ? `1px solid ${theme.runningBorder}` : `1px solid ${theme.border}`,
        boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.15)" : isTestRunning ? `0 1px 3px ${theme.runningBorder}66` : "0 1px 3px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease",
        fontFamily: theme.fontFamily
      },
      children: [
        /* @__PURE__ */ jsx("div", { style: { width: 5, minWidth: 5, background: capColor, flexShrink: 0 } }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", padding: "4px 8px", minWidth: 0, justifyContent: "center" }, children: [
          width > 70 && /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2, paddingRight: width > 90 ? 22 : 0 }, children: [
            /* @__PURE__ */ jsx("span", { style: { fontFamily: theme.fontMono, fontSize: width > 120 ? 11 : 9, fontWeight: 700, color: isTestRunning ? theme.runningText : getPriorityTextColor(test.priority) }, children: isTestRunning ? "\u25B6 RUNNING" : `P${test.priority}` }),
            width > 110 && !isTestRunning && /* @__PURE__ */ jsx("span", { style: { fontFamily: theme.fontMono, fontSize: 9, fontWeight: 700, letterSpacing: "0.05em", color: getStatusTextColor(displayStatus, theme), textTransform: "uppercase" }, children: displayStatus.toUpperCase() })
          ] }),
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: width > 120 ? 12 : width > 80 ? 11 : 10,
            fontWeight: 600,
            color: isTestRunning ? theme.runningTextDark : theme.textPrimary,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            lineHeight: 1.2
          }, children: resolvedMain }),
          showInfoOnBar && /* @__PURE__ */ jsx("span", { style: {
            fontFamily: theme.fontMono,
            fontSize: 9,
            fontWeight: 400,
            color: isTestRunning ? theme.runningText : theme.textTertiary,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            marginTop: 2
          }, children: resolvedInfo })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: pillRef,
            draggable: false,
            onMouseDown: (e) => e.stopPropagation(),
            onClick: (e) => {
              e.stopPropagation();
              if (pillRef.current) {
                const r = pillRef.current.getBoundingClientRect();
                onMenuOpen({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
              }
            },
            style: {
              position: "absolute",
              top: 4,
              right: 4,
              background: hovered ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.04)",
              borderRadius: 10,
              padding: useVerticalDots ? "3px 4px" : "2px 6px",
              fontSize: useVerticalDots ? 10 : 12,
              color: isTestRunning ? theme.runningText : theme.textMuted,
              cursor: "pointer",
              letterSpacing: useVerticalDots ? 0 : "0.1em",
              lineHeight: 1,
              opacity: hovered ? 1 : 0.35,
              transition: "opacity 0.15s, background 0.15s",
              userSelect: "none",
              fontWeight: 700
            },
            children: useVerticalDots ? "\u22EE" : "\xB7\xB7\xB7"
          }
        )
      ]
    }
  );
};
var MenuItem = ({ label, detail, icon, theme, onClick }) => {
  const [hovered, setHovered] = import_react.default.useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onClick: (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onClick({ top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right });
      },
      style: {
        padding: "8px 14px",
        fontSize: 12,
        fontWeight: 500,
        color: theme.textPrimary,
        cursor: "pointer",
        background: hovered ? theme.surfaceHover : "transparent",
        display: "flex",
        alignItems: "center",
        gap: 8,
        userSelect: "none",
        fontFamily: theme.fontFamily
      },
      children: [
        icon && /* @__PURE__ */ jsx("span", { style: { fontSize: 13, width: 18, textAlign: "center", color: theme.textMuted }, children: icon }),
        /* @__PURE__ */ jsxs("div", { style: { minWidth: 0, display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 6, width: "100%" }, children: [
          /* @__PURE__ */ jsx("span", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0, flex: 1 }, children: label }),
          detail && /* @__PURE__ */ jsx("span", { style: { flexShrink: 0, fontFamily: theme.fontMono, fontSize: 9, color: theme.textMuted }, children: detail })
        ] })
      ]
    }
  );
};
var ActionPopover = ({
  popover,
  assignedPartsTemplate,
  assignedPartsLinkBaseUrl,
  theme,
  onClose,
  onOpenEditor,
  onEditTest,
  panelRef
}) => {
  const [flippedV, setFlippedV] = import_react.default.useState(false);
  const viewportPadding = 8;
  const popoverGap = 6;
  const popoverWidth = Math.min(600, window.innerWidth - viewportPadding * 2);
  const { anchorRect, test, displayStatus, tooltipLines, scheduled } = popover;
  const capColor = getCapColor(displayStatus, theme);
  const startDateLabel = formatMenuDateLabel(test.test_started_date);
  const endDateLabel = formatMenuDateLabel(test.test_ended_date);
  const assignedPartSerials = parseAssignedPartSerials(resolveAssignedPartsValue(assignedPartsTemplate, test));
  const isRootTwoColumn = popoverWidth >= 340;
  const spaceBelow = Math.max(0, window.innerHeight - anchorRect.bottom - popoverGap - viewportPadding);
  const spaceAbove = Math.max(0, anchorRect.top - popoverGap - viewportPadding);
  let left = anchorRect.right - popoverWidth;
  left = Math.max(viewportPadding, Math.min(left, window.innerWidth - popoverWidth - viewportPadding));
  const topBelow = anchorRect.bottom + popoverGap;
  const bottomAbove = window.innerHeight - anchorRect.top + popoverGap;
  import_react.default.useLayoutEffect(() => {
    if (panelRef.current) {
      const panelHeight = Math.min(panelRef.current.scrollHeight, window.innerHeight - viewportPadding * 2);
      setFlippedV(panelHeight > spaceBelow && spaceAbove > spaceBelow);
    }
  }, [anchorRect, spaceAbove, spaceBelow, panelRef]);
  const availableHeight = Math.max(220, flippedV ? spaceAbove : spaceBelow);
  const posStyle = flippedV ? { position: "fixed", left, bottom: bottomAbove, zIndex: 3e3 } : { position: "fixed", left, top: topBelow, zIndex: 3e3 };
  const lines = tooltipLines.split("\n").filter((l) => {
    const parts = l.split(":");
    if (parts.length < 2)
      return l.trim() !== "";
    return parts.slice(1).join(":").trim() !== "";
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: panelRef,
      onContextMenu: (e) => e.preventDefault(),
      style: {
        ...posStyle,
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: theme.radiusXl,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)",
        width: popoverWidth,
        maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
        maxHeight: availableHeight,
        overflow: "hidden",
        fontFamily: theme.fontFamily,
        display: "flex",
        flexDirection: "column"
      },
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            style: {
              position: "absolute",
              top: 8,
              right: 8,
              width: 24,
              height: 24,
              border: "none",
              borderRadius: theme.radiusSm,
              background: "transparent",
              color: theme.textMuted,
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0
            },
            "aria-label": "Close menu",
            children: "\xD7"
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: isRootTwoColumn ? "minmax(0, 3fr) minmax(210px, 1.2fr)" : "minmax(0, 1fr)",
              minHeight: 0,
              flex: 1
            },
            children: [
              /* @__PURE__ */ jsxs("div", { style: { padding: "12px 14px 10px", overflowY: "auto", minHeight: 0 }, children: [
                /* @__PURE__ */ jsx("div", { style: { fontSize: 14, fontWeight: 700, color: theme.textPrimary, lineHeight: 1.3, marginBottom: 6, wordBreak: "break-word" }, children: test.name }),
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: lines.length > 0 ? 8 : 0, flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ jsxs("span", { style: { fontFamily: theme.fontMono, fontSize: 12, fontWeight: 700, color: getPriorityTextColor(test.priority) }, children: [
                    "P",
                    test.priority
                  ] }),
                  /* @__PURE__ */ jsx("span", { style: {
                    fontFamily: theme.fontMono,
                    fontSize: 10,
                    fontWeight: 700,
                    color: getStatusTextColor(displayStatus, theme),
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    padding: "1px 6px",
                    background: `${capColor}18`,
                    borderRadius: theme.radiusSm,
                    border: `1px solid ${capColor}40`
                  }, children: displayStatus })
                ] }),
                lines.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("div", { style: { height: 1, background: theme.border, margin: "0 -2px 8px" } }),
                  lines.map((line, i) => {
                    const colonIdx = line.indexOf(":");
                    if (colonIdx === -1)
                      return /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: theme.textSecondary, marginBottom: 4, lineHeight: 1.45, overflowWrap: "anywhere" }, children: line }, i);
                    const label = line.slice(0, colonIdx).trim();
                    const value = line.slice(colonIdx + 1).trim();
                    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, fontSize: 12, marginBottom: 4, lineHeight: 1.45, alignItems: "flex-start", minWidth: 0 }, children: [
                      /* @__PURE__ */ jsxs("span", { style: { color: theme.textMuted, fontWeight: 500, flexShrink: 0 }, children: [
                        label,
                        ":"
                      ] }),
                      /* @__PURE__ */ jsx("span", { style: { color: theme.textPrimary, overflowWrap: "anywhere", minWidth: 0 }, children: value })
                    ] }, i);
                  })
                ] }),
                /* @__PURE__ */ jsx("div", { style: { height: 1, background: theme.border, margin: `${lines.length > 0 ? 8 : 0}px -2px 8px` } }),
                /* @__PURE__ */ jsx("div", { style: { fontSize: 12, marginBottom: assignedPartSerials.length > 0 ? 6 : 0, lineHeight: 1.4 }, children: /* @__PURE__ */ jsx("span", { style: { color: theme.textMuted, fontWeight: 600 }, children: "Assigned Parts" }) }),
                assignedPartSerials.length > 0 ? /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px 8px", fontSize: 12, lineHeight: 1.4 }, children: assignedPartSerials.map((serial) => {
                  const href = buildAssignedPartLink(assignedPartsLinkBaseUrl, serial);
                  return href ? /* @__PURE__ */ jsx(
                    "a",
                    {
                      href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      style: { color: theme.accent, textDecoration: "underline", overflowWrap: "anywhere" },
                      children: serial
                    },
                    serial
                  ) : /* @__PURE__ */ jsx("span", { style: { color: theme.textPrimary, overflowWrap: "anywhere" }, children: serial }, serial);
                }) }) : /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: theme.textMuted, lineHeight: 1.4 }, children: "None" })
              ] }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    borderTop: isRootTwoColumn ? "none" : `1px solid ${theme.border}`,
                    borderLeft: isRootTwoColumn ? `1px solid ${theme.border}` : "none",
                    background: theme.canvas,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0
                  },
                  children: [
                    /* @__PURE__ */ jsxs("div", { style: { padding: "12px 14px 10px", overflowY: "auto", minHeight: 0, flex: 1 }, children: [
                      /* @__PURE__ */ jsx("div", { style: { fontSize: 11, fontWeight: 600, color: theme.textSecondary, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }, children: "Schedule" }),
                      scheduled ? /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, fontSize: 12, marginBottom: 6, alignItems: "flex-start" }, children: [
                          /* @__PURE__ */ jsx("span", { style: { color: theme.textMuted, fontWeight: 500, flexShrink: 0 }, children: "Starts:" }),
                          /* @__PURE__ */ jsx("span", { style: { color: theme.textPrimary }, children: scheduled.start.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, fontSize: 12, alignItems: "flex-start" }, children: [
                          /* @__PURE__ */ jsx("span", { style: { color: theme.textMuted, fontWeight: 500, flexShrink: 0 }, children: "Ends:" }),
                          /* @__PURE__ */ jsx("span", { style: { color: theme.textPrimary }, children: scheduled.end.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) })
                        ] })
                      ] }) : /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: theme.textMuted, lineHeight: 1.4 }, children: "Dates will appear once the test is scheduled." })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { style: { borderTop: `1px solid ${theme.border}`, padding: "4px 0" }, children: [
                      /* @__PURE__ */ jsx(MenuItem, { label: "Change Priority", icon: "\u2B06", theme, onClick: (rect) => onOpenEditor("priority", rect) }),
                      /* @__PURE__ */ jsx(MenuItem, { label: "Change Status", icon: "\u25C9", theme, onClick: (rect) => onOpenEditor("status", rect) }),
                      displayStatus === "Running" && /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(MenuItem, { label: "Change Start Date", detail: startDateLabel || void 0, icon: "\u{1F4C5}", theme, onClick: (rect) => onOpenEditor("start_date", rect) }),
                        /* @__PURE__ */ jsx(MenuItem, { label: "Change End Date", detail: endDateLabel || void 0, icon: "\u{1F4C5}", theme, onClick: (rect) => onOpenEditor("end_date", rect) })
                      ] }),
                      /* @__PURE__ */ jsx(MenuItem, { label: "Edit Test", icon: "\u270E", theme, onClick: () => onEditTest() })
                    ] })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
};
var EditorPopover = ({
  editorPopover,
  popover,
  statusOptionsList,
  priorityInputValue,
  startDateInputValue,
  endDateInputValue,
  theme,
  onClose,
  onPriorityInputChange,
  onConfirmPriority,
  onPickStatus,
  onStartDateInputChange,
  onConfirmStartDate,
  onEndDateInputChange,
  onConfirmEndDate,
  panelRef
}) => {
  const viewportPadding = 8;
  const popoverGap = 8;
  const width = editorPopover.mode === "status" ? 220 : editorPopover.mode === "priority" ? 240 : 260;
  const maxWidth = window.innerWidth - viewportPadding * 2;
  const popoverWidth = Math.min(width, maxWidth);
  const anchorRect = editorPopover.anchorRect;
  const openRight = anchorRect.right + popoverGap + popoverWidth <= window.innerWidth - viewportPadding;
  const openLeft = anchorRect.left - popoverGap - popoverWidth >= viewportPadding;
  let left = openRight ? anchorRect.right + popoverGap : openLeft ? anchorRect.left - popoverWidth - popoverGap : Math.max(viewportPadding, Math.min(anchorRect.right - popoverWidth, window.innerWidth - popoverWidth - viewportPadding));
  left = Math.max(viewportPadding, Math.min(left, window.innerWidth - popoverWidth - viewportPadding));
  const top = Math.max(
    viewportPadding,
    Math.min(anchorRect.top - 6, window.innerHeight - viewportPadding - 220)
  );
  const heading = editorPopover.mode === "priority" ? "Change Priority" : editorPopover.mode === "status" ? "Change Status" : editorPopover.mode === "start_date" ? "Change Start Date" : "Change End Date";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: panelRef,
      style: {
        position: "fixed",
        left,
        top,
        zIndex: 3010,
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: theme.radiusXl,
        boxShadow: "0 6px 18px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.06)",
        width: popoverWidth,
        maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
        maxHeight: `calc(100vh - ${viewportPadding * 2}px)`,
        overflow: "hidden",
        fontFamily: theme.fontFamily
      },
      children: [
        /* @__PURE__ */ jsx("div", { style: { padding: "10px 38px 8px 14px", borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: "flex", alignItems: "center", gap: 8 }, children: /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontWeight: 600, color: theme.textSecondary }, children: heading }) }),
        editorPopover.mode === "priority" ? /* @__PURE__ */ jsxs("div", { style: { padding: "10px 14px" }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: theme.textMuted, marginBottom: 8 }, children: "Enter priority (0\u2013100):" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              max: 100,
              autoFocus: true,
              value: priorityInputValue,
              onChange: (e) => onPriorityInputChange(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter")
                  onConfirmPriority();
                if (e.key === "Escape")
                  onClose();
              },
              style: {
                width: "100%",
                boxSizing: "border-box",
                padding: "6px 8px",
                fontSize: 13,
                borderRadius: theme.radius,
                border: `1px solid ${theme.borderStrong}`,
                outline: "none",
                marginBottom: 8,
                fontFamily: theme.fontFamily,
                background: theme.surface,
                color: theme.textPrimary
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onConfirmPriority,
                style: {
                  flex: 1,
                  padding: "6px 0",
                  fontSize: 12,
                  fontWeight: 600,
                  background: theme.accent,
                  color: theme.accentFg,
                  border: "none",
                  borderRadius: theme.radius,
                  cursor: "pointer",
                  fontFamily: theme.fontFamily
                },
                children: "Confirm"
              }
            ),
            /* @__PURE__ */ jsx("span", { onClick: onClose, style: { fontSize: 12, color: theme.textMuted, cursor: "pointer", textDecoration: "underline" }, children: "Cancel" })
          ] })
        ] }) : editorPopover.mode === "status" ? /* @__PURE__ */ jsx("div", { style: { padding: "4px 0" }, children: statusOptionsList.map((s) => /* @__PURE__ */ jsx(
          MenuItem,
          {
            label: s === "NULL" ? "Clear Status (NULL)" : s,
            detail: popover.test.status === (s === "NULL" ? null : s) ? "Current" : void 0,
            theme,
            onClick: () => onPickStatus(s)
          },
          s
        )) }) : editorPopover.mode === "start_date" ? /* @__PURE__ */ jsxs("div", { style: { padding: "10px 14px" }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: theme.textMuted, marginBottom: 8 }, children: "Enter start date:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              autoFocus: true,
              value: startDateInputValue,
              onChange: (e) => onStartDateInputChange(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter")
                  onConfirmStartDate();
                if (e.key === "Escape")
                  onClose();
              },
              style: {
                width: "100%",
                boxSizing: "border-box",
                padding: "6px 8px",
                fontSize: 13,
                borderRadius: theme.radius,
                border: `1px solid ${theme.borderStrong}`,
                outline: "none",
                marginBottom: 8,
                fontFamily: theme.fontFamily,
                background: theme.surface,
                color: theme.textPrimary
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onConfirmStartDate,
                disabled: !startDateInputValue,
                style: {
                  flex: 1,
                  padding: "6px 0",
                  fontSize: 12,
                  fontWeight: 600,
                  background: startDateInputValue ? theme.accent : theme.border,
                  color: startDateInputValue ? theme.accentFg : theme.textMuted,
                  border: "none",
                  borderRadius: theme.radius,
                  cursor: startDateInputValue ? "pointer" : "default",
                  fontFamily: theme.fontFamily
                },
                children: "Confirm"
              }
            ),
            /* @__PURE__ */ jsx("span", { onClick: onClose, style: { fontSize: 12, color: theme.textMuted, cursor: "pointer", textDecoration: "underline" }, children: "Cancel" })
          ] })
        ] }) : /* @__PURE__ */ jsxs("div", { style: { padding: "10px 14px" }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: theme.textMuted, marginBottom: 8 }, children: "Enter end date:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              autoFocus: true,
              value: endDateInputValue,
              onChange: (e) => onEndDateInputChange(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter")
                  onConfirmEndDate();
                if (e.key === "Escape")
                  onClose();
              },
              style: {
                width: "100%",
                boxSizing: "border-box",
                padding: "6px 8px",
                fontSize: 13,
                borderRadius: theme.radius,
                border: `1px solid ${theme.borderStrong}`,
                outline: "none",
                marginBottom: 8,
                fontFamily: theme.fontFamily,
                background: theme.surface,
                color: theme.textPrimary
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onConfirmEndDate,
                disabled: !endDateInputValue,
                style: {
                  flex: 1,
                  padding: "6px 0",
                  fontSize: 12,
                  fontWeight: 600,
                  background: endDateInputValue ? theme.accent : theme.border,
                  color: endDateInputValue ? theme.accentFg : theme.textMuted,
                  border: "none",
                  borderRadius: theme.radius,
                  cursor: endDateInputValue ? "pointer" : "default",
                  fontFamily: theme.fontFamily
                },
                children: "Confirm"
              }
            ),
            /* @__PURE__ */ jsx("span", { onClick: onClose, style: { fontSize: 12, color: theme.textMuted, cursor: "pointer", textDecoration: "underline" }, children: "Cancel" })
          ] })
        ] })
      ]
    }
  );
};
var SaveOverlay = ({ isError, theme, onRetry, onDiscard }) => /* @__PURE__ */ jsx("div", { style: {
  position: "absolute",
  inset: 0,
  zIndex: 2e3,
  background: theme.isDark ? "rgba(28,28,46,0.82)" : "rgba(249,250,251,0.82)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: theme.fontFamily
}, children: !isError ? /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }, children: [
  /* @__PURE__ */ jsx("div", { style: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: `3px solid ${theme.border}`,
    borderTopColor: theme.accent,
    animation: "ccl-spin 0.7s linear infinite"
  } }),
  /* @__PURE__ */ jsx("span", { style: { fontSize: 13, fontWeight: 600, color: theme.textSecondary }, children: "Saving\u2026" })
] }) : /* @__PURE__ */ jsxs("div", { style: {
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: theme.radiusXl,
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
    background: theme.isDark ? "#3B0000" : "#FEF2F2",
    border: `1px solid ${theme.isDark ? "#7F1D1D" : "#FECACA"}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    color: "#EF4444",
    fontWeight: 700
  }, children: "!" }),
  /* @__PURE__ */ jsx("div", { style: { fontSize: 15, fontWeight: 700, color: theme.textPrimary }, children: "Save failed" }),
  /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: theme.textMuted, textAlign: "center", lineHeight: 1.5 }, children: "The allocation could not be saved. You can retry or discard your changes." }),
  /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, marginTop: 4 }, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onDiscard,
        style: {
          padding: "7px 16px",
          fontSize: 12,
          fontWeight: 600,
          borderRadius: theme.radius,
          border: `1px solid ${theme.borderStrong}`,
          cursor: "pointer",
          background: theme.surface,
          color: theme.textSecondary,
          fontFamily: theme.fontFamily
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
          borderRadius: theme.radius,
          border: "none",
          cursor: "pointer",
          background: theme.accent,
          color: theme.accentFg,
          boxShadow: `0 1px 3px ${theme.accent}4D`,
          fontFamily: theme.fontFamily
        },
        children: "Retry"
      }
    )
  ] })
] }) });
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
var parseStands = (testsArr, standsArr, chHours, nonWorkingArr = []) => {
  const nonWorkingByStand = /* @__PURE__ */ new Map();
  for (const row of nonWorkingArr) {
    if (!row || row.test_stand_id == null)
      continue;
    const key = row.test_stand_id;
    if (!nonWorkingByStand.has(key))
      nonWorkingByStand.set(key, []);
    nonWorkingByStand.get(key).push({ start: row.start_time, end: row.end_time, notes: row.notes });
  }
  const standMap = /* @__PURE__ */ new Map();
  standsArr.forEach((s) => standMap.set(s.id, {
    id: s.id,
    name: s.name,
    tests: [],
    changeover_hours: s.changeover_hours ?? chHours,
    nonWorkingBlocks: parseNonWorkingBlocks(nonWorkingByStand.get(s.id) ?? [])
  }));
  const unallocated = [];
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
      test_started_date: t.test_started_date || null,
      ...t
    };
    if (test.test_stand_id != null && standMap.has(test.test_stand_id)) {
      standMap.get(test.test_stand_id).tests.push(test);
    } else {
      unallocated.push(test);
    }
  });
  standMap.forEach((s) => {
    s.tests.sort((a, b) => (a.priority_order || 999) - (b.priority_order || 999));
  });
  return {
    stands: standsArr.map((s) => standMap.get(s.id)),
    unallocated
  };
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
    description: "Array of test stand objects from getTestStands query (id, name, changeover_hours)"
  });
  const [inputNonWorking] = Retool.useStateArray({
    name: "nonWorkingData",
    initialValue: [],
    inspector: "text",
    label: "Non-Working Blocks",
    description: "Array of non-working periods from getNonWorking query (id, test_stand_id, start_time, end_time, notes)"
  });
  const [saveMode, setSaveMode] = Retool.useStateEnumeration({
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
    initialValue: "Notes: {notes}\nOwner: {owner}\nPriority: {priority}\nPart Status: {part_status}\nParts Due: {part_ready_date}\nTest Started: {test_started_date}",
    inspector: "text",
    label: "Tooltip Template",
    description: "Template for hover tooltip. Use \\n for newlines."
  });
  const [assignedPartsLinkBaseUrl] = Retool.useStateString({
    name: "assignedPartsLinkBaseUrl",
    initialValue: "https://supercriticalsolutions.retool.com/app/marvin/part-multi-wo#serialNo=",
    inspector: "text",
    label: "Assigned Parts Link Base URL",
    description: "Assigned parts render below the tooltip template using this URL prefix plus the serial number."
  });
  const [assignedPartsTemplate] = Retool.useStateString({
    name: "assignedPartsTemplate",
    initialValue: "{assigned_parts}",
    inspector: "text",
    label: "Assigned Parts Source",
    description: "Field or template used for the assigned-parts links section. Accepts {assigned_parts} or assigned_parts."
  });
  const [statusOptions] = Retool.useStateArray({
    name: "statusOptions",
    initialValue: ["NULL", "Running", "Created", "Tested", "Cancelled"],
    inspector: "text",
    label: "Status Options",
    description: "Status strings shown in the right-click Change Status menu. 'NULL' clears the status."
  });
  const [appTheme] = Retool.useStateObject({
    name: "appTheme",
    initialValue: {},
    inspector: "text",
    label: "App Theme",
    description: "Bind to {{ theme }} to inherit app colours, fonts, and border radius"
  });
  const [colorRunning] = Retool.useStateString({
    name: "colorRunning",
    initialValue: "",
    inspector: "text",
    label: "Running Colour",
    description: "Override cap colour for Running status. Leave blank to use default (#9333EA)."
  });
  const [colorReady] = Retool.useStateString({
    name: "colorReady",
    initialValue: "",
    inspector: "text",
    label: "Ready Colour",
    description: "Override cap colour for Ready status. Leave blank to use default (#22C55E)."
  });
  const [colorOnTime] = Retool.useStateString({
    name: "colorOnTime",
    initialValue: "",
    inspector: "text",
    label: "On Time Colour",
    description: "Override cap colour for On Time status. Leave blank to use default (#E5A00D)."
  });
  const [colorDelayed] = Retool.useStateString({
    name: "colorDelayed",
    initialValue: "",
    inspector: "text",
    label: "Delayed Colour",
    description: "Override cap colour for Delayed status. Leave blank to use default (#EF4444)."
  });
  const [colorPartsNotAssigned] = Retool.useStateString({
    name: "colorPartsNotAssigned",
    initialValue: "",
    inspector: "text",
    label: "Parts Not Assigned Colour",
    description: "Override cap colour for Parts Not Assigned status. Leave blank to use default (#9CA3AF)."
  });
  const [colorInProgress] = Retool.useStateString({
    name: "colorInProgress",
    initialValue: "",
    inspector: "text",
    label: "In Progress Colour",
    description: "Override cap colour for In Progress status. Leave blank to use default (#E5A00D)."
  });
  const [monoFont] = Retool.useStateString({
    name: "monoFont",
    initialValue: "",
    inspector: "text",
    label: "Monospace Font",
    description: "Font used for labels, badges, and stats. Leave blank to inherit the app theme font."
  });
  const theme = (0, import_react.useMemo)(() => {
    const statusOverrides = {};
    if (colorRunning)
      statusOverrides["Running"] = colorRunning;
    if (colorReady)
      statusOverrides["Ready"] = colorReady;
    if (colorOnTime)
      statusOverrides["On Time"] = colorOnTime;
    if (colorDelayed)
      statusOverrides["Delayed"] = colorDelayed;
    if (colorPartsNotAssigned)
      statusOverrides["Parts Not Assigned"] = colorPartsNotAssigned;
    if (colorInProgress)
      statusOverrides["In Progress"] = colorInProgress;
    return buildTheme(appTheme, statusOverrides, monoFont || void 0);
  }, [appTheme, colorRunning, colorReady, colorOnTime, colorDelayed, colorPartsNotAssigned, colorInProgress, monoFont]);
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
  const [, setSelectedTestId] = Retool.useStateString({
    name: "selectedTestId",
    initialValue: "",
    inspector: "hidden",
    description: "ID of test actioned via right-click menu (set before events fire)"
  });
  const [, setSelectedTestPriority] = Retool.useStateString({
    name: "selectedTestPriority",
    initialValue: "",
    inspector: "hidden",
    description: "New priority value from Change Priority action (numeric string)"
  });
  const [, setSelectedTestStartDate] = Retool.useStateString({
    name: "selectedTestStartDate",
    initialValue: "",
    inspector: "hidden",
    description: "New start date from Change Start Date action (ISO date string YYYY-MM-DD). Only set for Running tests."
  });
  const [, setSelectedTestEndDate] = Retool.useStateString({
    name: "selectedTestEndDate",
    initialValue: "",
    inspector: "hidden",
    description: "New end date from Change End Date action (ISO date string YYYY-MM-DD). Only set for Running tests."
  });
  const [, setSelectedTestStatus] = Retool.useStateString({
    name: "selectedTestStatus",
    initialValue: "",
    inspector: "hidden",
    description: "New status from Change Status action. Empty string = NULL in DB."
  });
  const [, setPlannedDates] = Retool.useStateArray({
    name: "plannedDates",
    initialValue: [],
    inspector: "hidden",
    description: "Array of {test_id, planned_date} for all stand-scheduled tests. Use with savePlannedDates query."
  });
  const onSave = Retool.useEventCallback({ name: "onSave" });
  const onChange = Retool.useEventCallback({ name: "onChange" });
  const onRetry = Retool.useEventCallback({ name: "onRetry" });
  const onChangePriority = Retool.useEventCallback({ name: "onChangePriority" });
  const onChangeStatus = Retool.useEventCallback({ name: "onChangeStatus" });
  const onChangeStartDate = Retool.useEventCallback({ name: "onChangeStartDate" });
  const onChangeEndDate = Retool.useEventCallback({ name: "onChangeEndDate" });
  const onEditTest = Retool.useEventCallback({ name: "onEditTest" });
  Retool.useComponentSettings({
    defaultHeight: 600,
    defaultWidth: 12
  });
  const [stands, setStands] = import_react.default.useState([]);
  const [unallocated, setUnallocated] = import_react.default.useState([]);
  const [viewportWeeks, setViewportWeeks] = import_react.default.useState(initialViewWeeks || 4);
  const userChangedViewport = import_react.default.useRef(false);
  (0, import_react.useEffect)(() => {
    const weeks2 = Number(initialViewWeeksStr);
    if (weeks2 && !userChangedViewport.current)
      setViewportWeeks(weeks2);
  }, [initialViewWeeksStr]);
  const [draggedTestId, setDraggedTestId] = import_react.default.useState(null);
  const [insertIndicator, setInsertIndicator] = import_react.default.useState(null);
  const [queueInsertIndex, setQueueInsertIndex] = import_react.default.useState(null);
  const [isDirty, setIsDirty] = import_react.default.useState(false);
  const [pendingSave, setPendingSave] = import_react.default.useState(false);
  const [saveError, setSaveError] = import_react.default.useState(false);
  const [popover, setPopover] = import_react.default.useState(null);
  const [editorPopover, setEditorPopover] = import_react.default.useState(null);
  const [priorityInputValue, setPriorityInputValue] = import_react.default.useState("");
  const [startDateInputValue, setStartDateInputValue] = import_react.default.useState("");
  const [endDateInputValue, setEndDateInputValue] = import_react.default.useState("");
  const [pendingStatusChange, setPendingStatusChange] = import_react.default.useState(null);
  const popoverRef = (0, import_react.useRef)(null);
  const editorPopoverRef = (0, import_react.useRef)(null);
  const currentSaveMode = saveMode === "live" ? "live" : "batch";
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
  (0, import_react.useEffect)(() => {
    if (!popover && !editorPopover)
      return;
    const onMouseDown = (e) => {
      const target = e.target;
      const insideMain = popoverRef.current?.contains(target) ?? false;
      const insideEditor = editorPopoverRef.current?.contains(target) ?? false;
      if (!insideMain && !insideEditor) {
        setPopover(null);
        setEditorPopover(null);
        setPendingStatusChange(null);
        setStartDateInputValue("");
        setEndDateInputValue("");
      }
    };
    const onKeyDown = (e) => {
      if (e.key !== "Escape")
        return;
      if (editorPopover) {
        setEditorPopover(null);
        setPendingStatusChange(null);
        setStartDateInputValue("");
        setEndDateInputValue("");
        return;
      }
      setPopover(null);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [popover, editorPopover]);
  const originalAllocationsRef = (0, import_react.useRef)("");
  const prevSavedAtRef = import_react.default.useRef("");
  const scrollRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const el = scrollRef.current;
    if (!el)
      return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width || 800);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
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
  const [containerWidth, setContainerWidth] = import_react.default.useState(800);
  const [queueSort, setQueueSort] = import_react.default.useState("az");
  const [queueFilter, setQueueFilter] = import_react.default.useState("");
  const statusOptionsList = (0, import_react.useMemo)(() => {
    const arr = Array.isArray(statusOptions) ? statusOptions : [];
    return arr.length > 0 ? arr.map(String) : ["NULL", "Running", "Created", "Tested", "Cancelled"];
  }, [statusOptions]);
  const inputKey = (0, import_react.useMemo)(
    () => JSON.stringify(inputTests) + JSON.stringify(inputStands) + JSON.stringify(inputNonWorking),
    [inputTests, inputStands, inputNonWorking]
  );
  (0, import_react.useEffect)(() => {
    const testsArr = Array.isArray(inputTests) ? inputTests : [];
    const standsArr = Array.isArray(inputStands) ? inputStands : [];
    const nonWorkingArr = Array.isArray(inputNonWorking) ? inputNonWorking : [];
    if (standsArr.length === 0 && testsArr.length === 0)
      return;
    const { stands: newStands, unallocated: unalloc } = parseStands(testsArr, standsArr, chHours, nonWorkingArr);
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
  const computeSchedule = (0, import_react.useCallback)((tests, standChangeover, nonWorkingBlocks) => {
    const runningTests = tests.filter((t) => isRunningTest(t));
    const queuedTests = tests.filter((t) => !isRunningTest(t));
    const sortedRunning = [...runningTests].sort((a, b) => {
      const dateA = parseLocalDate(a.test_started_date) || /* @__PURE__ */ new Date();
      const dateB = parseLocalDate(b.test_started_date) || /* @__PURE__ */ new Date();
      if (dateA.getTime() !== dateB.getTime())
        return dateA.getTime() - dateB.getTime();
      return (b.priority ?? 50) - (a.priority ?? 50);
    });
    let lastRunningEnd = null;
    const runningScheduled = sortedRunning.map((test) => {
      const testDate = parseLocalDate(test.test_started_date) || new Date(viewStart);
      const start = lastRunningEnd && testDate < lastRunningEnd ? new Date(lastRunningEnd) : new Date(testDate);
      const durationEnd = new Date(start.getTime() + test.duration * MS_PER_HOUR);
      const end = durationEnd < /* @__PURE__ */ new Date() ? /* @__PURE__ */ new Date() : durationEnd;
      lastRunningEnd = calculateChangeoverEnd(end, standChangeover, wStart, wEnd);
      return { ...test, start, end };
    });
    const nowPlusChangeover = calculateChangeoverEnd(/* @__PURE__ */ new Date(), standChangeover, wStart, wEnd);
    let currentEnd = new Date(Math.max((lastRunningEnd ?? viewStart).getTime(), nowPlusChangeover.getTime()));
    const queuedScheduled = queuedTests.map((test) => {
      const start = findValidStart(new Date(currentEnd), test.duration, nonWorkingBlocks);
      const end = new Date(start.getTime() + test.duration * MS_PER_HOUR);
      currentEnd = advancePastNonWorking(
        calculateChangeoverEnd(end, standChangeover, wStart, wEnd),
        nonWorkingBlocks
      );
      return { ...test, start, end };
    });
    return [...runningScheduled, ...queuedScheduled];
  }, [viewStart, wStart, wEnd]);
  const standSchedules = (0, import_react.useMemo)(
    () => new Map(stands.map((s) => [s.id, computeSchedule(s.tests, s.changeover_hours, s.nonWorkingBlocks)])),
    [stands, computeSchedule]
  );
  const timelineEnd = (0, import_react.useMemo)(() => {
    let latestEnd = new Date(viewStart);
    latestEnd.setDate(latestEnd.getDate() + viewportWeeks * 7);
    stands.forEach((stand) => {
      const schedule = standSchedules.get(stand.id) ?? [];
      if (schedule.length > 0) {
        const last = schedule[schedule.length - 1];
        const changeoverEnd = calculateChangeoverEnd(last.end, stand.changeover_hours, wStart, wEnd);
        if (changeoverEnd > latestEnd)
          latestEnd = changeoverEnd;
      }
    });
    latestEnd.setDate(latestEnd.getDate() + 7);
    return latestEnd;
  }, [standSchedules, stands, viewStart, viewportWeeks, wStart, wEnd]);
  const totalDays = (0, import_react.useMemo)(() => Math.ceil(hoursBetween(viewStart, timelineEnd) / 24), [viewStart, timelineEnd]);
  const scheduledPlannedDates = (0, import_react.useMemo)(() => {
    const result = [];
    stands.forEach((stand) => {
      const schedule = standSchedules.get(stand.id) ?? [];
      schedule.forEach((st) => {
        const d = st.start;
        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        result.push({ test_id: st.id, planned_date: dateStr });
      });
    });
    return result;
  }, [stands, standSchedules]);
  (0, import_react.useEffect)(() => {
    setPlannedDates(scheduledPlannedDates);
  }, [scheduledPlannedDates]);
  const pxPerHour = containerWidth / (viewportWeeks * 7 * 24);
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
    if (currentSaveMode === "live") {
      setPendingSave(true);
      onChange();
    }
  }, [currentSaveMode, setAllocations, setHasUnsavedChanges, onChange]);
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
      const originalIndex = s.tests.findIndex((t) => t.id === draggedTestId);
      const filtered = s.tests.filter((t) => t.id !== draggedTestId);
      if (s.id === standId) {
        const adjustedIndex = originalIndex !== -1 && originalIndex < index ? index - 1 : index;
        const newTests = [...filtered];
        newTests.splice(adjustedIndex, 0, test);
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
  const handleSaveModeChange = (0, import_react.useCallback)((nextMode) => {
    if (nextMode === currentSaveMode || isLocked)
      return;
    setSaveMode(nextMode);
    if (nextMode === "live" && isDirty) {
      setPendingSave(true);
      onChange();
    }
  }, [currentSaveMode, isDirty, isLocked, onChange, setSaveMode]);
  const handleDiscard = (0, import_react.useCallback)(() => {
    setSaveError(false);
    setPendingSave(false);
    const testsArr = Array.isArray(inputTests) ? inputTests : [];
    const standsArr = Array.isArray(inputStands) ? inputStands : [];
    const nonWorkingArr = Array.isArray(inputNonWorking) ? inputNonWorking : [];
    const { stands: newStands, unallocated: unalloc } = parseStands(testsArr, standsArr, chHours, nonWorkingArr);
    setStands(newStands);
    setUnallocated(unalloc);
    setIsDirty(false);
    setAllocations(buildAllocations(newStands));
    setHasUnsavedChanges(false);
  }, [inputTests, inputStands, inputNonWorking, chHours, setAllocations, setHasUnsavedChanges]);
  const handleRetry = (0, import_react.useCallback)(() => {
    setSaveError(false);
    setPendingSave(true);
    onRetry();
  }, [onRetry]);
  const closePopover = (0, import_react.useCallback)(() => {
    setPopover(null);
    setEditorPopover(null);
    setPendingStatusChange(null);
    setStartDateInputValue("");
    setEndDateInputValue("");
  }, []);
  const closeEditorPopover = (0, import_react.useCallback)(() => {
    setEditorPopover(null);
    setPendingStatusChange(null);
    setStartDateInputValue("");
    setEndDateInputValue("");
  }, []);
  const handleOpenEditor = (0, import_react.useCallback)((mode, rect) => {
    setPendingStatusChange(null);
    setEditorPopover({ mode, anchorRect: rect });
    if (mode !== "start_date") {
      setStartDateInputValue("");
    }
    if (mode !== "end_date") {
      setEndDateInputValue("");
    }
  }, []);
  const handleConfirmPriority = (0, import_react.useCallback)(() => {
    if (!popover)
      return;
    const parsed = parseInt(priorityInputValue, 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 100)
      return;
    setSelectedTestId(String(popover.test.id));
    setSelectedTestPriority(String(parsed));
    onChangePriority();
    closePopover();
  }, [popover, priorityInputValue, setSelectedTestId, setSelectedTestPriority, onChangePriority, closePopover]);
  const handlePickStatus = (0, import_react.useCallback)((status) => {
    if (!popover)
      return;
    if (status === "Running") {
      setPendingStatusChange(status);
      setStartDateInputValue(formatDateInputValue(popover.test.test_started_date) || getTodayDateInputValue());
      setEndDateInputValue("");
      setEditorPopover((prev) => prev ? { ...prev, mode: "start_date" } : null);
      return;
    }
    if (status === "Tested") {
      setPendingStatusChange(status);
      setEndDateInputValue(getTodayDateInputValue());
      setStartDateInputValue("");
      setEditorPopover((prev) => prev ? { ...prev, mode: "end_date" } : null);
      return;
    }
    setSelectedTestId(String(popover.test.id));
    setSelectedTestStatus(status === "NULL" ? "" : status);
    onChangeStatus();
    closePopover();
  }, [popover, setSelectedTestId, setSelectedTestStatus, onChangeStatus, closePopover]);
  const handleEditTest = (0, import_react.useCallback)(() => {
    if (!popover)
      return;
    setSelectedTestId(String(popover.test.id));
    onEditTest();
    closePopover();
  }, [popover, setSelectedTestId, onEditTest, closePopover]);
  const handleConfirmStartDate = (0, import_react.useCallback)(() => {
    if (!popover || !startDateInputValue)
      return;
    setSelectedTestId(String(popover.test.id));
    if (pendingStatusChange) {
      setSelectedTestStatus(pendingStatusChange === "NULL" ? "" : pendingStatusChange);
      onChangeStatus();
    }
    setSelectedTestStartDate(startDateInputValue);
    onChangeStartDate();
    closePopover();
  }, [popover, startDateInputValue, pendingStatusChange, setSelectedTestId, setSelectedTestStatus, onChangeStatus, setSelectedTestStartDate, onChangeStartDate, closePopover]);
  const handleConfirmEndDate = (0, import_react.useCallback)(() => {
    if (!popover || !endDateInputValue)
      return;
    setSelectedTestId(String(popover.test.id));
    if (pendingStatusChange) {
      setSelectedTestStatus(pendingStatusChange === "NULL" ? "" : pendingStatusChange);
      onChangeStatus();
    }
    setSelectedTestEndDate(endDateInputValue);
    onChangeEndDate();
    closePopover();
  }, [popover, endDateInputValue, pendingStatusChange, setSelectedTestId, setSelectedTestStatus, onChangeStatus, setSelectedTestEndDate, onChangeEndDate, closePopover]);
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
  return /* @__PURE__ */ jsxs("div", { style: {
    display: "flex",
    height: "100%",
    background: theme.canvas,
    overflow: "hidden",
    fontFamily: theme.fontFamily,
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsx("style", { children: `@keyframes ccl-spin { to { transform: rotate(360deg); } }` }),
    isLocked && /* @__PURE__ */ jsx(
      SaveOverlay,
      {
        isError: saveError,
        theme,
        onRetry: handleRetry,
        onDiscard: handleDiscard
      }
    ),
    /* @__PURE__ */ jsxs("div", { style: { width: 320, minWidth: 320, background: theme.canvas, borderRight: `1px solid ${theme.border}`, display: "flex", flexDirection: "column" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { padding: "12px 16px", borderBottom: `1px solid ${theme.border}`, background: theme.surface }, children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ jsx("div", { style: { width: 8, height: 8, borderRadius: "50%", background: unallocated.length > 0 ? "#F59E0B" : "#10B981" } }),
            /* @__PURE__ */ jsx("span", { style: { fontFamily: theme.fontMono, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: theme.textTertiary }, children: "Queue" })
          ] }),
          /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 2, background: theme.bgSubtle, borderRadius: theme.radius, padding: 2, border: `1px solid ${theme.border}` }, children: [["az", "A\u2192Z"], ["priority", "Priority"], ["status", "Status"]].map(([val, label]) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setQueueSort(val),
              style: {
                fontFamily: theme.fontMono,
                padding: "3px 8px",
                fontSize: 9,
                fontWeight: 600,
                borderRadius: theme.radiusSm,
                border: "none",
                cursor: "pointer",
                background: queueSort === val ? theme.accent : "transparent",
                color: queueSort === val ? theme.accentFg : theme.textMuted
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
                fontFamily: theme.fontMono,
                width: "100%",
                boxSizing: "border-box",
                padding: "5px 28px 5px 8px",
                fontSize: 11,
                border: `1px solid ${theme.border}`,
                borderRadius: theme.radius,
                background: theme.canvas,
                color: theme.textPrimary,
                outline: "none"
              },
              onFocus: (e) => {
                e.currentTarget.style.borderColor = theme.accent;
                e.currentTarget.style.background = theme.surface;
              },
              onBlur: (e) => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.background = theme.canvas;
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
                color: theme.textDisabled,
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
              const resolvedMain = resolveTemplate(mainText, test);
              const resolvedSub = resolveTemplate(subText, test);
              const resolvedInfo = resolveTemplate(infoRow, test);
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
                      background: theme.accent,
                      borderRadius: 3,
                      transition: "height 0.12s ease"
                    }
                  }
                ),
                /* @__PURE__ */ jsx(
                  QueueCard,
                  {
                    test,
                    draggedTestId,
                    status,
                    mainText: resolvedMain,
                    subText: resolvedSub,
                    infoRow: resolvedInfo,
                    showSub,
                    theme,
                    onDragStart: () => setDraggedTestId(test.id),
                    onDragEnd: clearDrag,
                    onDragOver: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const rect = e.currentTarget.getBoundingClientRect();
                      setQueueInsertIndex(e.clientY < rect.top + rect.height / 2 ? idx : idx + 1);
                    },
                    onMenuOpen: (rect) => {
                      if (draggedTestId || isLocked)
                        return;
                      setPriorityInputValue(String(test.priority ?? 50));
                      setStartDateInputValue(formatDateInputValue(test.test_started_date));
                      setEndDateInputValue("");
                      setPendingStatusChange(null);
                      setPopover({
                        anchorRect: rect,
                        test,
                        displayStatus: status,
                        tooltipLines: resolveTemplate(tipTemplate, test),
                        scheduled: null
                      });
                      setEditorPopover(null);
                    }
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
                  background: theme.accent,
                  borderRadius: 3,
                  transition: "height 0.12s ease",
                  margin: "0 4px"
                }
              }
            ),
            unallocated.length === 0 && /* @__PURE__ */ jsx("div", { style: {
              textAlign: "center",
              padding: "32px 16px",
              color: theme.textMuted,
              fontSize: 12,
              border: draggedTestId ? `2px dashed ${theme.accent}` : `2px dashed ${theme.borderStrong}`,
              borderRadius: theme.radiusLg,
              marginTop: 8,
              background: draggedTestId ? theme.accentSubtle : "transparent",
              fontFamily: theme.fontMono
            }, children: draggedTestId ? "Drop to return to queue" : "All tests allocated" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(OutlineKey, { theme }),
      /* @__PURE__ */ jsx("div", { style: { padding: "12px 16px", borderTop: `1px solid ${theme.border}`, background: theme.canvas }, children: /* @__PURE__ */ jsxs("div", { style: { fontFamily: theme.fontMono, display: "flex", justifyContent: "space-between", fontSize: 10, color: theme.textMuted }, children: [
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
      /* @__PURE__ */ jsxs("div", { style: { padding: "12px 24px", borderBottom: `1px solid ${theme.border}`, background: theme.surface, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { minWidth: 0 }, children: [
          /* @__PURE__ */ jsx("h1", { style: { fontSize: 18, fontWeight: 700, color: theme.textPrimary, letterSpacing: "-0.02em", fontFamily: theme.fontFamily }, children: "Test Stand Scheduler" }),
          /* @__PURE__ */ jsxs("p", { style: { fontFamily: theme.fontMono, fontSize: 11, color: theme.textMuted, marginTop: 2 }, children: [
            "Continuous testing \xB7 ",
            chHours,
            "h changeover (default) \xB7 ",
            wStart,
            ":00\u2013",
            wEnd,
            ":00 Mon\u2013Fri",
            currentSaveMode === "live" && /* @__PURE__ */ jsx("span", { children: " \xB7 Live sync" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }, children: [
          currentSaveMode === "batch" && /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, alignItems: "center", alignSelf: "stretch" }, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleDiscard,
                disabled: !isDirty || isLocked,
                style: {
                  fontFamily: theme.fontMono,
                  alignSelf: "flex-end",
                  width: 130,
                  padding: "6px 0",
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: theme.radius,
                  border: `1px solid ${isDirty && !isLocked ? theme.accent : theme.border}`,
                  cursor: isDirty && !isLocked ? "pointer" : "default",
                  background: isDirty && !isLocked ? theme.accent : "transparent",
                  color: isDirty && !isLocked ? theme.accentFg : theme.textDisabled,
                  boxShadow: isDirty && !isLocked ? `0 1px 3px ${theme.accent}4D` : "none"
                },
                children: "Discard Changes"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSave,
                disabled: !isDirty || isLocked,
                style: {
                  fontFamily: theme.fontMono,
                  alignSelf: "flex-end",
                  width: 130,
                  padding: "6px 0",
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: theme.radius,
                  border: `1px solid ${isDirty && !isLocked ? theme.accent : theme.border}`,
                  cursor: isDirty && !isLocked ? "pointer" : "default",
                  background: isDirty && !isLocked ? theme.accent : "transparent",
                  color: isDirty && !isLocked ? theme.accentFg : theme.textDisabled,
                  boxShadow: isDirty && !isLocked ? `0 1px 3px ${theme.accent}4D` : "none"
                },
                children: "Save Changes"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
            /* @__PURE__ */ jsx("span", { style: { fontFamily: theme.fontMono, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: theme.textMuted }, children: "Save Mode" }),
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }, children: [
              /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 2, minWidth: 122, background: theme.bgSubtle, borderRadius: theme.radiusLg, padding: 2, border: `1px solid ${theme.border}` }, children: ["batch", "live"].map((mode) => {
                const active = currentSaveMode === mode;
                const disabled = isLocked;
                return /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleSaveModeChange(mode),
                    disabled,
                    style: {
                      flex: 1,
                      fontFamily: theme.fontMono,
                      padding: "6px 10px",
                      fontSize: 10,
                      fontWeight: 700,
                      borderRadius: theme.radius,
                      border: "none",
                      cursor: disabled ? "default" : "pointer",
                      background: active ? theme.accent : "transparent",
                      color: active ? theme.accentFg : theme.textTertiary,
                      opacity: disabled ? 0.65 : 1,
                      textTransform: "lowercase"
                    },
                    children: mode
                  },
                  mode
                );
              }) }),
              /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 4, background: theme.bgSubtle, borderRadius: theme.radiusLg, padding: 3, border: `1px solid ${theme.border}` }, children: [2, 4, 8, 12, 24].map((w) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    userChangedViewport.current = true;
                    setViewportWeeks(w);
                  },
                  style: {
                    fontFamily: theme.fontMono,
                    padding: "6px 12px",
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: theme.radius,
                    border: "none",
                    cursor: "pointer",
                    background: viewportWeeks === w ? theme.accent : "transparent",
                    color: viewportWeeks === w ? theme.accentFg : theme.textTertiary
                  },
                  children: [
                    w,
                    "W"
                  ]
                },
                w
              )) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { ref: scrollRef, style: { flex: 1, overflow: "auto", background: theme.canvas }, children: /* @__PURE__ */ jsxs("div", { style: { minWidth: totalWidth, padding: "0 12px 24px", position: "relative" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { position: "sticky", top: 0, zIndex: 20, background: theme.canvas, borderBottom: `1px solid ${theme.border}` }, children: [
          /* @__PURE__ */ jsx("div", { style: { display: "flex", height: 28, borderBottom: `1px solid ${theme.border}` }, children: days.map((d, i) => {
            const isMonday = d.getDay() === 1;
            return /* @__PURE__ */ jsx("div", { style: {
              fontFamily: theme.fontMono,
              width: dayWidth,
              minWidth: dayWidth,
              height: 28,
              display: "flex",
              alignItems: "center",
              fontSize: 10,
              fontWeight: 600,
              color: theme.textTertiary,
              borderLeft: `1px solid ${isMonday && i > 0 ? theme.border : "transparent"}`,
              paddingLeft: isMonday ? 7 : 0,
              overflow: "visible",
              whiteSpace: "nowrap"
            }, children: isMonday ? formatWeek(d) : "" }, i);
          }) }),
          /* @__PURE__ */ jsx("div", { style: { display: "flex", height: 24 }, children: days.map((d, i) => {
            const isToday = d.toDateString() === (/* @__PURE__ */ new Date()).toDateString();
            const isWeekend = d.getDay() === 0 || d.getDay() === 6;
            return /* @__PURE__ */ jsx("div", { style: {
              fontFamily: theme.fontMono,
              width: dayWidth,
              minWidth: dayWidth,
              fontSize: 9,
              textAlign: "center",
              color: isToday ? theme.accent : theme.textMuted,
              fontWeight: isToday ? 700 : 400,
              lineHeight: "24px",
              borderLeft: `1px solid ${theme.border}`,
              background: isToday ? theme.accentSubtle : isWeekend ? theme.bgSubtle : "transparent"
            }, children: viewportWeeks <= 8 ? d.getDate() : d.getDay() === 1 ? d.getDate() : "" }, i);
          }) })
        ] }),
        stands.map((stand) => {
          const schedule = standSchedules.get(stand.id) ?? [];
          const ind = insertIndicator;
          const showHere = ind && ind.standId === stand.id;
          return /* @__PURE__ */ jsxs("div", { style: { marginTop: 16 }, children: [
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6, paddingLeft: 2 }, children: [
              /* @__PURE__ */ jsx("div", { style: { width: 6, height: 6, borderRadius: 2, background: stand.tests.length > 0 ? theme.accent : theme.textDisabled } }),
              /* @__PURE__ */ jsx("span", { style: { fontFamily: theme.fontMono, fontSize: 11, fontWeight: 600, color: theme.textSecondary }, children: stand.name }),
              /* @__PURE__ */ jsxs("span", { style: { fontFamily: theme.fontMono, fontSize: 10, color: theme.textMuted }, children: [
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
                      return theme.surfaceSecondary;
                    return draggedIsRunning ? theme.runningBg : theme.accentSubtle;
                  })(),
                  border: `1px solid ${(() => {
                    const active = showHere || draggedTestId && stand.tests.length === 0;
                    if (!active)
                      return theme.border;
                    return draggedIsRunning ? theme.runningBorder : theme.accentMuted;
                  })()}`,
                  borderRadius: theme.radiusLg,
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
                      background: theme.border,
                      opacity: 0.35,
                      pointerEvents: "none"
                    } }, `we-${i}`);
                  }),
                  days.map((_, i) => /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: i * dayWidth, top: 0, bottom: 0, width: 1, background: theme.border } }, i)),
                  (() => {
                    const h = hoursBetween(viewStart, /* @__PURE__ */ new Date());
                    if (h < 0 || h > totalDays * 24)
                      return null;
                    return /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: h * pxPerHour, top: 0, bottom: 0, width: 2, background: "#EF4444", zIndex: 18, pointerEvents: "none" }, children: /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: -3, left: -3, width: 8, height: 8, borderRadius: "50%", background: "#EF4444" } }) });
                  })(),
                  stand.nonWorkingBlocks.map((block, i) => {
                    const left = hoursBetween(viewStart, block.start) * pxPerHour;
                    const width = hoursBetween(block.start, block.end) * pxPerHour;
                    if (left + width < 0 || left > totalWidth)
                      return null;
                    const clampedLeft = Math.max(0, left);
                    const clampedWidth = Math.min(width + Math.min(0, left), totalWidth - clampedLeft);
                    return /* @__PURE__ */ jsxs("div", { style: {
                      position: "absolute",
                      left: clampedLeft,
                      top: 6,
                      width: clampedWidth,
                      height: BAR_HEIGHT,
                      zIndex: 6,
                      pointerEvents: "none",
                      background: `repeating-linear-gradient(45deg, ${theme.border} 0px, ${theme.border} 15px, ${theme.surface} 15px, ${theme.surface} 30px)`,
                      borderRadius: theme.radiusLg,
                      border: `1px solid ${theme.borderStrong}`,
                      display: "flex",
                      flexDirection: "row",
                      overflow: "hidden"
                    }, children: [
                      /* @__PURE__ */ jsx("div", { style: { width: 5, minWidth: 5, background: theme.textDisabled, flexShrink: 0 } }),
                      /* @__PURE__ */ jsx("div", { style: { flex: 1, display: "flex", flexDirection: "column", padding: "4px 8px", minWidth: 0, justifyContent: "center" }, children: /* @__PURE__ */ jsx("span", { style: {
                        fontSize: 12,
                        fontWeight: 700,
                        color: theme.textSecondary,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        lineHeight: 1.2,
                        fontFamily: theme.fontFamily
                      }, children: block.notes || "Maintenance" }) })
                    ] }, `nw-${i}`);
                  }),
                  schedule.map((test, idx) => {
                    const isTestRunning = isRunningTest(test);
                    const barPos = isTestRunning ? getRunningBarPos(test.start, test.end) : getBarPos(test.start, test.duration);
                    if (!barPos)
                      return null;
                    const { left, width } = barPos;
                    const cEnd = calculateChangeoverEnd(test.end, stand.changeover_hours, wStart, wEnd);
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
                      showHere && !draggedIsRunning && ind.index === idx && /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: -4, top: 0, bottom: 0 }, children: /* @__PURE__ */ jsx(InsertLine, { theme }) }),
                      /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: 0, top: 0, width, height: "100%" }, children: /* @__PURE__ */ jsx(
                        TestBar,
                        {
                          test,
                          isTestRunning,
                          draggedTestId,
                          width,
                          BAR_HEIGHT,
                          displayStatus,
                          resolvedMain,
                          resolvedInfo,
                          showInfoOnBar,
                          theme,
                          onDragStart: (e) => {
                            e.dataTransfer.effectAllowed = "move";
                            e.dataTransfer.setData("text/plain", String(test.id));
                            setDraggedTestId(test.id);
                          },
                          onDragEnd: clearDrag,
                          onMenuOpen: (rect) => {
                            if (draggedTestId || isLocked)
                              return;
                            setPriorityInputValue(String(test.priority ?? 50));
                            setStartDateInputValue(formatDateInputValue(test.test_started_date));
                            setEndDateInputValue("");
                            setPendingStatusChange(null);
                            setPopover({
                              anchorRect: rect,
                              test,
                              displayStatus,
                              tooltipLines: resolveTemplate(tipTemplate, test),
                              scheduled: { start: test.start, end: test.end }
                            });
                            setEditorPopover(null);
                          }
                        }
                      ) }),
                      idx < schedule.length && changeoverWidth > 0 && /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: width, top: LANE_HEIGHT / 2 - 8, width: changeoverWidth, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx("div", { style: { height: 1, width: "80%", background: `repeating-linear-gradient(90deg, ${theme.textDisabled} 0, ${theme.textDisabled} 4px, transparent 4px, transparent 8px)` } }) })
                    ] }, test.id);
                  }),
                  showHere && !draggedIsRunning && ind.index === stand.tests.length && schedule.length > 0 && (() => {
                    const last = schedule[schedule.length - 1];
                    const { left, width } = getBarPos(last.start, last.duration);
                    const cEnd = calculateChangeoverEnd(last.end, stand.changeover_hours, wStart, wEnd);
                    const changeoverWidth = hoursBetween(last.end, cEnd) * pxPerHour;
                    return /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: left + width + changeoverWidth + 8, top: 0, bottom: 0 }, children: /* @__PURE__ */ jsx(InsertLine, { theme }) });
                  })(),
                  stand.tests.length === 0 && /* @__PURE__ */ jsx("div", { style: {
                    fontFamily: theme.fontMono,
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    color: draggedTestId ? theme.accent : theme.textDisabled,
                    fontWeight: draggedTestId ? 600 : 400
                  }, children: draggedTestId ? "Drop here to schedule" : "Drop tests here to schedule" })
                ]
              }
            )
          ] }, stand.id);
        }),
        stands.length === 0 && /* @__PURE__ */ jsx("div", { style: {
          fontFamily: theme.fontMono,
          textAlign: "center",
          padding: "48px 24px",
          color: theme.textMuted,
          fontSize: 12
        }, children: "No test stands loaded. Bind the testStands property to your getTestStands query." })
      ] }) })
    ] }),
    popover && /* @__PURE__ */ jsx(
      ActionPopover,
      {
        popover,
        assignedPartsTemplate,
        assignedPartsLinkBaseUrl,
        theme,
        onClose: closePopover,
        onOpenEditor: handleOpenEditor,
        onEditTest: handleEditTest,
        panelRef: popoverRef
      }
    ),
    popover && editorPopover && /* @__PURE__ */ jsx(
      EditorPopover,
      {
        editorPopover,
        popover,
        statusOptionsList,
        priorityInputValue,
        startDateInputValue,
        endDateInputValue,
        theme,
        onClose: closeEditorPopover,
        onPriorityInputChange: setPriorityInputValue,
        onConfirmPriority: handleConfirmPriority,
        onPickStatus: handlePickStatus,
        onStartDateInputChange: setStartDateInputValue,
        onConfirmStartDate: handleConfirmStartDate,
        onEndDateInputChange: setEndDateInputValue,
        onConfirmEndDate: handleConfirmEndDate,
        panelRef: editorPopoverRef
      }
    )
  ] });
};
export {
  TestStandScheduler
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhY3QtZ2xvYmFsOnJlYWN0IiwgIi4uL3NyYy9pbmRleC50c3giLCAidHJ5cmV0b29sLWN1c3RvbS1jb21wb25lbnQtY29sbGVjdGlvbnMtZ2xvYmFsOkB0cnlyZXRvb2wvY3VzdG9tLWNvbXBvbmVudC1zdXBwb3J0IiwgInJlYWN0LWpzeC1ydW50aW1lLWdsb2JhbDpyZWFjdC9qc3gtcnVudGltZSJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmVhY3Q7XG4gICAgICAgICIsICJpbXBvcnQgUmVhY3QsIHsgRkMsIHVzZVJlZiwgdXNlTWVtbywgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSZXRvb2wgfSBmcm9tIFwiQHRyeXJldG9vbC9jdXN0b20tY29tcG9uZW50LXN1cHBvcnRcIjtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUeXBlc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFRlc3REYXRhIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkdXJhdGlvbjogbnVtYmVyO1xyXG4gIG93bmVyOiBzdHJpbmc7XHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuICBub3Rlczogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpb3JpdHlfb3JkZXI6IG51bWJlciB8IG51bGw7XHJcbiAgYWxsb2NhdGlvbl9pZDogbnVtYmVyIHwgbnVsbDtcclxuICBhc3NpZ25lZF9wYXJ0czogc3RyaW5nIHwgbnVsbDtcclxuICBwYXJ0X3JlYWR5X2RhdGU6IHN0cmluZyB8IG51bGw7XHJcbiAgcGFydF9zdGF0dXM6IHN0cmluZztcclxuICB0ZXN0X3N0YXJ0ZWRfZGF0ZTogc3RyaW5nIHwgbnVsbDtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7IC8vIGFsbG93IGFyYml0cmFyeSBmaWVsZHMgZm9yIHRlbXBsYXRlIHJlc29sdXRpb25cclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YW5kRGVmIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBjaGFuZ2VvdmVyX2hvdXJzPzogbnVtYmVyIHwgbnVsbDtcclxufVxyXG5cclxuaW50ZXJmYWNlIE5vbldvcmtpbmdCbG9jayB7XHJcbiAgc3RhcnQ6IERhdGU7XHJcbiAgZW5kOiBEYXRlO1xyXG4gIG5vdGVzPzogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSW50ZXJuYWxTdGFuZCB7XHJcbiAgaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgdGVzdHM6IFRlc3REYXRhW107XHJcbiAgY2hhbmdlb3Zlcl9ob3VyczogbnVtYmVyO1xyXG4gIG5vbldvcmtpbmdCbG9ja3M6IE5vbldvcmtpbmdCbG9ja1tdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgU2NoZWR1bGVkVGVzdCBleHRlbmRzIFRlc3REYXRhIHtcclxuICBzdGFydDogRGF0ZTtcclxuICBlbmQ6IERhdGU7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnNlcnRJbmRpY2F0b3Ige1xyXG4gIHN0YW5kSWQ6IG51bWJlciB8IHN0cmluZztcclxuICBpbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQWxsb2NhdGlvblJlY29yZCB7XHJcbiAgdGVzdF9pZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBwcmlvcml0eV9vcmRlcjogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQW5jaG9yUmVjdCB7XHJcbiAgdG9wOiBudW1iZXI7XHJcbiAgYm90dG9tOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG4gIHJpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBQb3BvdmVyU3RhdGUge1xuICBhbmNob3JSZWN0OiBBbmNob3JSZWN0O1xuICB0ZXN0OiBUZXN0RGF0YTtcbiAgZGlzcGxheVN0YXR1czogc3RyaW5nO1xuICB0b29sdGlwTGluZXM6IHN0cmluZztcbiAgc2NoZWR1bGVkOiB7IHN0YXJ0OiBEYXRlOyBlbmQ6IERhdGUgfSB8IG51bGw7XG59XG5cbnR5cGUgRWRpdG9yUG9wb3Zlck1vZGUgPSAncHJpb3JpdHknIHwgJ3N0YXR1cycgfCAnc3RhcnRfZGF0ZScgfCAnZW5kX2RhdGUnO1xuXG5pbnRlcmZhY2UgRWRpdG9yUG9wb3ZlclN0YXRlIHtcbiAgYW5jaG9yUmVjdDogQW5jaG9yUmVjdDtcbiAgbW9kZTogRWRpdG9yUG9wb3Zlck1vZGU7XG59XG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFRoZW1lXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5pbnRlcmZhY2UgVGhlbWVUb2tlbnMge1xyXG4gIGlzRGFyazogYm9vbGVhbjtcclxuXHJcbiAgLy8gQmFja2dyb3VuZHNcclxuICBjYW52YXM6IHN0cmluZztcclxuICBzdXJmYWNlOiBzdHJpbmc7XHJcbiAgc3VyZmFjZVNlY29uZGFyeTogc3RyaW5nO1xyXG4gIGJnU3VidGxlOiBzdHJpbmc7XHJcbiAgc3VyZmFjZUhvdmVyOiBzdHJpbmc7XHJcbiAgYWNjZW50U3VidGxlOiBzdHJpbmc7XHJcblxyXG4gIC8vIFJ1bm5pbmcgKHB1cnBsZSkgdGludHNcclxuICBydW5uaW5nQmc6IHN0cmluZztcclxuICBydW5uaW5nQm9yZGVyOiBzdHJpbmc7XHJcbiAgcnVubmluZ1RleHQ6IHN0cmluZztcclxuICBydW5uaW5nVGV4dERhcms6IHN0cmluZztcclxuXHJcbiAgLy8gVGV4dFxyXG4gIHRleHRQcmltYXJ5OiBzdHJpbmc7XHJcbiAgdGV4dFNlY29uZGFyeTogc3RyaW5nO1xyXG4gIHRleHRUZXJ0aWFyeTogc3RyaW5nO1xyXG4gIHRleHRNdXRlZDogc3RyaW5nO1xyXG4gIHRleHREaXNhYmxlZDogc3RyaW5nO1xyXG5cclxuICAvLyBCb3JkZXJzXHJcbiAgYm9yZGVyOiBzdHJpbmc7XHJcbiAgYm9yZGVyU3Ryb25nOiBzdHJpbmc7XHJcblxyXG4gIC8vIEFjY2VudCAocHJpbWFyeSBhY3Rpb24pXHJcbiAgYWNjZW50OiBzdHJpbmc7XHJcbiAgYWNjZW50Rmc6IHN0cmluZztcclxuICBhY2NlbnRNdXRlZDogc3RyaW5nO1xyXG5cclxuICAvLyBUeXBvZ3JhcGh5XHJcbiAgZm9udEZhbWlseTogc3RyaW5nO1xyXG4gIGZvbnRNb25vOiBzdHJpbmc7XHJcblxyXG4gIC8vIFJhZGlpIChudW1lcmljIHB4KVxyXG4gIHJhZGl1c1NtOiBudW1iZXI7XHJcbiAgcmFkaXVzOiBudW1iZXI7XHJcbiAgcmFkaXVzTGc6IG51bWJlcjtcclxuICByYWRpdXNYbDogbnVtYmVyO1xyXG5cclxuICAvLyBTdGF0dXMgY29sb3VycyAoY2FwIGJhcnMgJiB0ZXh0KVxyXG4gIHN0YXR1c0NhcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuICBzdGF0dXNUZXh0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG59XHJcblxyXG5jb25zdCBidWlsZFRoZW1lID0gKFxyXG4gIHJhdzogYW55LFxyXG4gIHN0YXR1c092ZXJyaWRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9LFxyXG4gIG1vbm9Gb250T3ZlcnJpZGU/OiBzdHJpbmdcclxuKTogVGhlbWVUb2tlbnMgPT4ge1xyXG4gIGNvbnN0IGlzRGFyayA9IHJhdz8ubW9kZSA9PT0gJ2RhcmsnO1xyXG5cclxuICBjb25zdCBhY2NlbnQgPSByYXc/LnByaW1hcnkgfHwgJyMzQjgyRjYnO1xyXG4gIGNvbnN0IGNhbnZhcyA9IHJhdz8uY2FudmFzIHx8IChpc0RhcmsgPyAnIzFDMUMyRScgOiAnI0Y5RkFGQicpO1xyXG4gIGNvbnN0IHN1cmZhY2UgPSByYXc/LnN1cmZhY2VQcmltYXJ5IHx8IChpc0RhcmsgPyAnIzI1MjUzNScgOiAnI0ZGRkZGRicpO1xyXG4gIGNvbnN0IHN1cmZhY2VTZWNvbmRhcnkgPSByYXc/LnN1cmZhY2VTZWNvbmRhcnkgfHwgKGlzRGFyayA/ICcjMUUxRTMwJyA6ICcjRjNGNEY2Jyk7XHJcbiAgY29uc3QgZm9udEZhbWlseSA9IHJhdz8uZGVmYXVsdEZvbnQ/Lm5hbWVcclxuICAgID8gYCcke3Jhdy5kZWZhdWx0Rm9udC5uYW1lfScsIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBzYW5zLXNlcmlmYFxyXG4gICAgOiBcIidETSBTYW5zJywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCI7XHJcblxyXG4gIGNvbnN0IGJhc2VSYWRpdXMgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgciA9IHJhdz8uYm9yZGVyUmFkaXVzO1xyXG4gICAgaWYgKCFyKSByZXR1cm4gNjtcclxuICAgIGNvbnN0IG4gPSBwYXJzZUludChTdHJpbmcociksIDEwKTtcclxuICAgIHJldHVybiBpc05hTihuKSA/IDYgOiBuO1xyXG4gIH0pKCk7XHJcblxyXG4gIC8vIFRleHRcclxuICBjb25zdCB0ZXh0UHJpbWFyeSAgPSBpc0RhcmsgPyAnI0Y5RkFGQicgOiAnIzExMTgyNyc7XHJcbiAgY29uc3QgdGV4dFNlY29uZGFyeSA9IGlzRGFyayA/ICcjRDFENURCJyA6ICcjMzc0MTUxJztcclxuICBjb25zdCB0ZXh0VGVydGlhcnkgPSBpc0RhcmsgPyAnI0EwQUVDMCcgOiAnIzRCNTU2Myc7XHJcbiAgY29uc3QgdGV4dE11dGVkICAgID0gaXNEYXJrID8gJyM3MTgwOTYnIDogJyM2QjcyODAnO1xyXG4gIGNvbnN0IHRleHREaXNhYmxlZCA9IGlzRGFyayA/ICcjNEI1NTYzJyA6ICcjOUNBM0FGJztcclxuXHJcbiAgLy8gQm9yZGVyc1xyXG4gIGNvbnN0IGJvcmRlciAgICAgICA9IGlzRGFyayA/ICcjMzc0MTUxJyA6ICcjRTVFN0VCJztcclxuICBjb25zdCBib3JkZXJTdHJvbmcgPSBpc0RhcmsgPyAnIzRCNTU2MycgOiAnI0QxRDVEQic7XHJcblxyXG4gIC8vIEJhY2tncm91bmRzXHJcbiAgY29uc3QgYmdTdWJ0bGUgICAgID0gaXNEYXJrID8gJyMxQTFBMkUnIDogJyNGM0Y0RjYnO1xyXG4gIGNvbnN0IHN1cmZhY2VIb3ZlciA9IGlzRGFyayA/ICcjMkUyRTNFJyA6ICcjRjNGNEY2JztcclxuICBjb25zdCBhY2NlbnRTdWJ0bGUgPSBpc0RhcmsgPyBgJHthY2NlbnR9MzNgIDogJyNFRkY2RkYnO1xyXG4gIGNvbnN0IGFjY2VudE11dGVkICA9IGlzRGFyayA/IGAke2FjY2VudH04MGAgOiAnIzkzQzVGRCc7XHJcblxyXG4gIC8vIFJ1bm5pbmcgcHVycGxlXHJcbiAgY29uc3QgcnVubmluZ0JnICAgICAgID0gaXNEYXJrID8gJyMyRDFCNEUnIDogJyNGM0U4RkYnO1xyXG4gIGNvbnN0IHJ1bm5pbmdCb3JkZXIgICA9IGlzRGFyayA/ICcjN0UzREFBJyA6ICcjQzRCNUZEJztcclxuICBjb25zdCBydW5uaW5nVGV4dCAgICAgPSAnIzdFMjJDRSc7XHJcbiAgY29uc3QgcnVubmluZ1RleHREYXJrID0gJyMzQjA3NjQnO1xyXG5cclxuICAvLyBTdGF0dXMgY2FwIGNvbG91cnNcclxuICBjb25zdCBkZWZhdWx0Q2FwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgJ1J1bm5pbmcnOiAgICAgICAgICAgICcjOTMzM0VBJyxcclxuICAgICdSZWFkeSc6ICAgICAgICAgICAgICAnIzIyQzU1RScsXHJcbiAgICAnT24gVGltZSc6ICAgICAgICAgICAgJyNFNUEwMEQnLFxyXG4gICAgJ0RlbGF5ZWQnOiAgICAgICAgICAgICcjRUY0NDQ0JyxcclxuICAgICdQYXJ0cyBOb3QgQXNzaWduZWQnOiAnIzlDQTNBRicsXHJcbiAgICAnSW4gUHJvZ3Jlc3MnOiAgICAgICAgJyNFNUEwMEQnLFxyXG4gIH07XHJcbiAgY29uc3QgZGVmYXVsdFRleHQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAnUnVubmluZyc6ICAgICAgICAgICAgJyM3RTIyQ0UnLFxyXG4gICAgJ1JlYWR5JzogICAgICAgICAgICAgICcjMTZBMzRBJyxcclxuICAgICdPbiBUaW1lJzogICAgICAgICAgICAnI0I0NTMwOScsXHJcbiAgICAnRGVsYXllZCc6ICAgICAgICAgICAgJyNEQzI2MjYnLFxyXG4gICAgJ1BhcnRzIE5vdCBBc3NpZ25lZCc6ICcjNkI3MjgwJyxcclxuICAgICdJbiBQcm9ncmVzcyc6ICAgICAgICAnI0I0NTMwOScsXHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzQ2FwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcbiAgY29uc3Qgc3RhdHVzVGV4dDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGRlZmF1bHRDYXApKSB7XHJcbiAgICBzdGF0dXNDYXBba2V5XSAgPSBzdGF0dXNPdmVycmlkZXNba2V5XSB8fCBkZWZhdWx0Q2FwW2tleV07XHJcbiAgICAvLyBkZXJpdmUgdGV4dCBjb2xvdXI6IGlmIG92ZXJyaWRkZW4sIGRhcmtlbiB0aGUgY2FwIGNvbG91ciBzbGlnaHRseTsgb3RoZXJ3aXNlIHVzZSBkZWZhdWx0XHJcbiAgICBzdGF0dXNUZXh0W2tleV0gPSBzdGF0dXNPdmVycmlkZXNba2V5XVxyXG4gICAgICA/IHN0YXR1c092ZXJyaWRlc1trZXldXHJcbiAgICAgIDogZGVmYXVsdFRleHRba2V5XTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpc0RhcmssXHJcbiAgICBjYW52YXMsIHN1cmZhY2UsIHN1cmZhY2VTZWNvbmRhcnksIGJnU3VidGxlLCBzdXJmYWNlSG92ZXIsIGFjY2VudFN1YnRsZSxcclxuICAgIHJ1bm5pbmdCZywgcnVubmluZ0JvcmRlciwgcnVubmluZ1RleHQsIHJ1bm5pbmdUZXh0RGFyayxcclxuICAgIHRleHRQcmltYXJ5LCB0ZXh0U2Vjb25kYXJ5LCB0ZXh0VGVydGlhcnksIHRleHRNdXRlZCwgdGV4dERpc2FibGVkLFxyXG4gICAgYm9yZGVyLCBib3JkZXJTdHJvbmcsXHJcbiAgICBhY2NlbnQsIGFjY2VudEZnOiAnI0ZGRkZGRicsIGFjY2VudE11dGVkLFxyXG4gICAgZm9udEZhbWlseSxcclxuICAgIGZvbnRNb25vOiBtb25vRm9udE92ZXJyaWRlID8gYCcke21vbm9Gb250T3ZlcnJpZGV9JywgbW9ub3NwYWNlYCA6IGZvbnRGYW1pbHksXHJcbiAgICByYWRpdXNTbTogTWF0aC5tYXgoMiwgYmFzZVJhZGl1cyAtIDIpLFxyXG4gICAgcmFkaXVzOiAgIGJhc2VSYWRpdXMsXHJcbiAgICByYWRpdXNMZzogYmFzZVJhZGl1cyArIDIsXHJcbiAgICByYWRpdXNYbDogYmFzZVJhZGl1cyArIDQsXHJcbiAgICBzdGF0dXNDYXAsXHJcbiAgICBzdGF0dXNUZXh0LFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gVGVtcGxhdGUgUmVzb2x1dGlvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgZm9ybWF0RmllbGRWYWx1ZSA9ICh2YWw6IGFueSk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09ICcnIHx8IHZhbCA9PT0gJ25hbicpIHJldHVybiAnJztcclxuICBjb25zdCBzdHIgPSBTdHJpbmcodmFsKTtcclxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfS8udGVzdChzdHIpKSB7XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoc3RyKTtcclxuICAgIGlmICghaXNOYU4oZC5nZXRUaW1lKCkpKSB7XHJcbiAgICAgIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JyB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHN0cjtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVUZW1wbGF0ZSA9ICh0ZW1wbGF0ZTogYW55LCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogc3RyaW5nID0+IHtcbiAgaWYgKCF0ZW1wbGF0ZSkgcmV0dXJuICcnO1xuICBjb25zdCBzdHIgPSB0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnID8gdGVtcGxhdGUgOiBTdHJpbmcodGVtcGxhdGUpO1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAoXywgZmllbGQpID0+IGZvcm1hdEZpZWxkVmFsdWUoZGF0YVtmaWVsZF0pKTtcbn07XG5cbmNvbnN0IHBhcnNlQXNzaWduZWRQYXJ0U2VyaWFscyA9ICh2YWw6IGFueSk6IHN0cmluZ1tdID0+IHtcbiAgY29uc3Qgc3RyID0gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyB2YWwudHJpbSgpIDogU3RyaW5nKHZhbCB8fCAnJykudHJpbSgpO1xuICBpZiAoIXN0cikgcmV0dXJuIFtdO1xuICBjb25zdCBwYXJ0cyA9IHN0ci5pbmNsdWRlcygnLCcpXG4gICAgPyBzdHIuc3BsaXQoJywnKVxuICAgIDogL15cXGQrKFxccytcXGQrKSskLy50ZXN0KHN0cilcbiAgICAgID8gc3RyLnNwbGl0KC9cXHMrLylcbiAgICAgIDogW3N0cl07XG4gIHJldHVybiBwYXJ0cy5tYXAocGFydCA9PiBwYXJ0LnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pO1xufTtcblxuY29uc3QgYnVpbGRBc3NpZ25lZFBhcnRMaW5rID0gKGJhc2VVcmw6IHN0cmluZywgc2VyaWFsOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB0cmltbWVkQmFzZSA9IFN0cmluZyhiYXNlVXJsIHx8ICcnKS50cmltKCk7XG4gIGlmICghdHJpbW1lZEJhc2UpIHJldHVybiAnJztcbiAgcmV0dXJuIGAke3RyaW1tZWRCYXNlfSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNlcmlhbCl9YDtcbn07XG5cbmNvbnN0IHJlc29sdmVBc3NpZ25lZFBhcnRzVmFsdWUgPSAodGVtcGxhdGU6IGFueSwgZGF0YTogUmVjb3JkPHN0cmluZywgYW55Pik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHN0ciA9IHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycgPyB0ZW1wbGF0ZS50cmltKCkgOiBTdHJpbmcodGVtcGxhdGUgfHwgJycpLnRyaW0oKTtcbiAgaWYgKCFzdHIpIHJldHVybiAnJztcbiAgaWYgKC9eXFx3KyQvLnRlc3Qoc3RyKSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGF0YSwgc3RyKSkge1xuICAgIHJldHVybiBmb3JtYXRGaWVsZFZhbHVlKGRhdGFbc3RyXSk7XG4gIH1cbiAgcmV0dXJuIHJlc29sdmVUZW1wbGF0ZShzdHIsIGRhdGEpO1xufTtcblxyXG5jb25zdCBpc1RlbXBsYXRlRW1wdHkgPSAodGVtcGxhdGU6IGFueSwgZGF0YTogUmVjb3JkPHN0cmluZywgYW55Pik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IHN0ciA9IHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycgPyB0ZW1wbGF0ZSA6IFN0cmluZyh0ZW1wbGF0ZSB8fCAnJyk7XHJcbiAgY29uc3QgcmVzb2x2ZWQgPSByZXNvbHZlVGVtcGxhdGUoc3RyLCBkYXRhKTtcclxuICBjb25zdCBzdGF0aWNPbmx5ID0gc3RyLnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAnJyk7XHJcbiAgcmV0dXJuIHJlc29sdmVkLnRyaW0oKSA9PT0gc3RhdGljT25seS50cmltKCkgfHwgcmVzb2x2ZWQudHJpbSgpID09PSAnJztcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBEYXRlIFV0aWxpdGllc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgTVNfUEVSX0hPVVIgPSAzNjAwMDAwO1xyXG5cclxuY29uc3QgcGFyc2VMb2NhbERhdGUgPSAoZGF0ZVN0cjogc3RyaW5nIHwgbnVsbCk6IERhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIWRhdGVTdHIpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGRhdGVQYXJ0ID0gZGF0ZVN0ci5zcGxpdCgnVCcpWzBdOyAvLyBzdHJpcCB0aW1lIGNvbXBvbmVudCBpZiBwcmVzZW50IChlLmcuIElTTyB0aW1lc3RhbXBzKVxyXG4gIGNvbnN0IHBhcnRzID0gZGF0ZVBhcnQuc3BsaXQoJy0nKS5tYXAoTnVtYmVyKTtcclxuICBpZiAocGFydHMubGVuZ3RoICE9PSAzIHx8IHBhcnRzLnNvbWUoaXNOYU4pKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBkID0gbmV3IERhdGUocGFydHNbMF0sIHBhcnRzWzFdIC0gMSwgcGFydHNbMl0sIDAsIDAsIDAsIDApO1xyXG4gIHJldHVybiBpc05hTihkLmdldFRpbWUoKSkgPyBudWxsIDogZDtcclxufTtcclxuXHJcbmNvbnN0IHRvTWlkbmlnaHQgPSAoZGF0ZTogRGF0ZSk6IERhdGUgPT4ge1xuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSk7XG4gIGQuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBkO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZUlucHV0VmFsdWUgPSAodmFsdWU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gJyc7XG4gIGNvbnN0IGRhdGVQYXJ0ID0gU3RyaW5nKHZhbHVlKS5zcGxpdCgnVCcpWzBdO1xuICByZXR1cm4gL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoZGF0ZVBhcnQpID8gZGF0ZVBhcnQgOiAnJztcbn07XG5cbmNvbnN0IGdldFRvZGF5RGF0ZUlucHV0VmFsdWUgPSAoKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICByZXR1cm4gYCR7dG9kYXkuZ2V0RnVsbFllYXIoKX0tJHtTdHJpbmcodG9kYXkuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyl9LSR7U3RyaW5nKHRvZGF5LmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKX1gO1xufTtcblxuY29uc3QgZm9ybWF0TWVudURhdGVMYWJlbCA9ICh2YWx1ZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlTG9jYWxEYXRlKHZhbHVlID8/IG51bGwpO1xuICBpZiAoIXBhcnNlZCkgcmV0dXJuICcnO1xuICByZXR1cm4gcGFyc2VkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7XG4gICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgICB5ZWFyOiAnMi1kaWdpdCcsXG4gIH0pO1xufTtcblxyXG5jb25zdCBpc1dvcmtEYXkgPSAoZDogRGF0ZSk6IGJvb2xlYW4gPT4gZC5nZXREYXkoKSAhPT0gMCAmJiBkLmdldERheSgpICE9PSA2O1xyXG5cclxuY29uc3QgZ2V0TmV4dFdvcmtkYXlTdGFydCA9IChkYXRlOiBEYXRlLCB3b3JrU3RhcnQ6IG51bWJlcik6IERhdGUgPT4ge1xyXG4gIGNvbnN0IGQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICBkLnNldEhvdXJzKHdvcmtTdGFydCwgMCwgMCwgMCk7XHJcbiAgd2hpbGUgKGQuZ2V0RGF5KCkgPT09IDAgfHwgZC5nZXREYXkoKSA9PT0gNikge1xyXG4gICAgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgfVxyXG4gIHJldHVybiBkO1xyXG59O1xyXG5cclxuY29uc3QgY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZCA9IChcclxuICBwcmV2VGVzdEVuZDogRGF0ZSxcclxuICBjaGFuZ2VvdmVySG91cnM6IG51bWJlcixcclxuICB3b3JrU3RhcnQ6IG51bWJlcixcclxuICB3b3JrRW5kOiBudW1iZXJcclxuKTogRGF0ZSA9PiB7XHJcbiAgbGV0IGNoYW5nZW92ZXJTdGFydCA9IG5ldyBEYXRlKHByZXZUZXN0RW5kKTtcclxuXHJcbiAgaWYgKCFpc1dvcmtEYXkoY2hhbmdlb3ZlclN0YXJ0KSB8fCBjaGFuZ2VvdmVyU3RhcnQuZ2V0SG91cnMoKSA+PSB3b3JrRW5kKSB7XHJcbiAgICBjaGFuZ2VvdmVyU3RhcnQgPSBnZXROZXh0V29ya2RheVN0YXJ0KG5ldyBEYXRlKGNoYW5nZW92ZXJTdGFydC5nZXRUaW1lKCkgKyBNU19QRVJfSE9VUiAqIDEyKSwgd29ya1N0YXJ0KTtcclxuICB9IGVsc2UgaWYgKGNoYW5nZW92ZXJTdGFydC5nZXRIb3VycygpIDwgd29ya1N0YXJ0KSB7XHJcbiAgICBjaGFuZ2VvdmVyU3RhcnQuc2V0SG91cnMod29ya1N0YXJ0LCAwLCAwLCAwKTtcclxuICB9XHJcblxyXG4gIGxldCByZW1haW5pbmcgPSBjaGFuZ2VvdmVySG91cnM7XHJcbiAgbGV0IGVuZCA9IG5ldyBEYXRlKGNoYW5nZW92ZXJTdGFydCk7XHJcblxyXG4gIHdoaWxlIChyZW1haW5pbmcgPiAwKSB7XHJcbiAgICBpZiAoIWlzV29ya0RheShlbmQpKSB7XHJcbiAgICAgIGVuZCA9IGdldE5leHRXb3JrZGF5U3RhcnQobmV3IERhdGUoZW5kLmdldFRpbWUoKSArIE1TX1BFUl9IT1VSICogMTIpLCB3b3JrU3RhcnQpO1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGF2YWlsYWJsZSA9IHdvcmtFbmQgLSBlbmQuZ2V0SG91cnMoKTtcclxuICAgIGNvbnN0IGFwcGx5ID0gTWF0aC5taW4ocmVtYWluaW5nLCBhdmFpbGFibGUpO1xyXG4gICAgZW5kLnNldFRpbWUoZW5kLmdldFRpbWUoKSArIGFwcGx5ICogTVNfUEVSX0hPVVIpO1xyXG4gICAgcmVtYWluaW5nIC09IGFwcGx5O1xyXG4gICAgaWYgKHJlbWFpbmluZyA+IDApIHtcclxuICAgICAgZW5kID0gZ2V0TmV4dFdvcmtkYXlTdGFydChuZXcgRGF0ZShlbmQuZ2V0VGltZSgpICsgTVNfUEVSX0hPVVIgKiAxMiksIHdvcmtTdGFydCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBlbmQ7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZU5vbldvcmtpbmdCbG9ja3MgPSAocmF3OiBhbnkpOiBOb25Xb3JraW5nQmxvY2tbXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHJhdykpIHJldHVybiBbXTtcclxuICBjb25zdCByZXN1bHQ6IE5vbldvcmtpbmdCbG9ja1tdID0gW107XHJcbiAgZm9yIChjb25zdCBlbnRyeSBvZiByYXcpIHtcclxuICAgIGlmICghZW50cnkgfHwgdHlwZW9mIGVudHJ5ICE9PSAnb2JqZWN0JykgY29udGludWU7XHJcbiAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKGVudHJ5LnN0YXJ0KTtcclxuICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKGVudHJ5LmVuZCk7XHJcbiAgICBpZiAoaXNOYU4oc3RhcnQuZ2V0VGltZSgpKSB8fCBpc05hTihlbmQuZ2V0VGltZSgpKSB8fCBlbmQgPD0gc3RhcnQpIGNvbnRpbnVlO1xyXG4gICAgcmVzdWx0LnB1c2goeyBzdGFydCwgZW5kLCBub3RlczogZW50cnkubm90ZXMgPz8gdW5kZWZpbmVkIH0pO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgYWR2YW5jZVBhc3ROb25Xb3JraW5nID0gKGRhdGU6IERhdGUsIGJsb2NrczogTm9uV29ya2luZ0Jsb2NrW10pOiBEYXRlID0+IHtcclxuICBsZXQgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgbGV0IGNoYW5nZWQgPSB0cnVlO1xyXG4gIHdoaWxlIChjaGFuZ2VkKSB7XHJcbiAgICBjaGFuZ2VkID0gZmFsc2U7XHJcbiAgICBmb3IgKGNvbnN0IGIgb2YgYmxvY2tzKSB7XHJcbiAgICAgIGlmIChyZXN1bHQgPj0gYi5zdGFydCAmJiByZXN1bHQgPCBiLmVuZCkge1xyXG4gICAgICAgIHJlc3VsdCA9IG5ldyBEYXRlKGIuZW5kKTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuLy8gUHVzaCBzdGFydCBmb3J3YXJkIHVudGlsIHRoZSBmdWxsIHdpbmRvdyBbc3RhcnQsIHN0YXJ0K2R1cmF0aW9uKSBkb2Vzbid0IG92ZXJsYXAgYW55IGJsb2NrLlxyXG5jb25zdCBmaW5kVmFsaWRTdGFydCA9IChwcm9wb3NlZFN0YXJ0OiBEYXRlLCBkdXJhdGlvbkhvdXJzOiBudW1iZXIsIGJsb2NrczogTm9uV29ya2luZ0Jsb2NrW10pOiBEYXRlID0+IHtcclxuICBsZXQgcmVzdWx0ID0gbmV3IERhdGUocHJvcG9zZWRTdGFydCk7XHJcbiAgbGV0IGNoYW5nZWQgPSB0cnVlO1xyXG4gIHdoaWxlIChjaGFuZ2VkKSB7XHJcbiAgICBjaGFuZ2VkID0gZmFsc2U7XHJcbiAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShyZXN1bHQuZ2V0VGltZSgpICsgZHVyYXRpb25Ib3VycyAqIE1TX1BFUl9IT1VSKTtcclxuICAgIGZvciAoY29uc3QgYiBvZiBibG9ja3MpIHtcclxuICAgICAgaWYgKHJlc3VsdCA8IGIuZW5kICYmIGVuZCA+IGIuc3RhcnQpIHtcclxuICAgICAgICByZXN1bHQgPSBuZXcgRGF0ZShiLmVuZCk7XHJcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlRGF5cyA9IChzdGFydDogRGF0ZSwgbnVtRGF5czogbnVtYmVyKTogRGF0ZVtdID0+IHtcclxuICBjb25zdCBkYXlzOiBEYXRlW10gPSBbXTtcclxuICBsZXQgY3VyID0gbmV3IERhdGUoc3RhcnQpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtRGF5czsgaSsrKSB7XHJcbiAgICBkYXlzLnB1c2gobmV3IERhdGUoY3VyKSk7XHJcbiAgICBjdXIuc2V0RGF0ZShjdXIuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgfVxyXG4gIHJldHVybiBkYXlzO1xyXG59O1xyXG5cclxuY29uc3QgZ2VuZXJhdGVXZWVrcyA9IChzdGFydDogRGF0ZSwgbnVtRGF5czogbnVtYmVyKTogRGF0ZVtdID0+IHtcclxuICBjb25zdCByZXN1bHQ6IERhdGVbXSA9IFtdO1xyXG4gIGxldCBjdXIgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgd2hpbGUgKGN1ci5nZXREYXkoKSAhPT0gMSkgY3VyLnNldERhdGUoY3VyLmdldERhdGUoKSAtIDEpO1xyXG4gIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgZW5kRGF0ZS5zZXREYXRlKGVuZERhdGUuZ2V0RGF0ZSgpICsgbnVtRGF5cyk7XHJcbiAgd2hpbGUgKGN1ciA8IGVuZERhdGUpIHtcclxuICAgIHJlc3VsdC5wdXNoKG5ldyBEYXRlKGN1cikpO1xyXG4gICAgY3VyLnNldERhdGUoY3VyLmdldERhdGUoKSArIDcpO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgaG91cnNCZXR3ZWVuID0gKGE6IERhdGUsIGI6IERhdGUpOiBudW1iZXIgPT4gKGIuZ2V0VGltZSgpIC0gYS5nZXRUaW1lKCkpIC8gTVNfUEVSX0hPVVI7XHJcbmNvbnN0IGZvcm1hdFdlZWsgPSAoZDogRGF0ZSk6IHN0cmluZyA9PiBgVy9DICR7ZC50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLUdCJywgeyBkYXk6ICcyLWRpZ2l0JywgbW9udGg6ICdzaG9ydCcgfSl9YDtcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gUGFydCBTdGF0dXMgTG9naWNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IG5vcm1hbGl6ZVBhcnRTdGF0dXMgPSAocmF3U3RhdHVzOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghcmF3U3RhdHVzIHx8IHJhd1N0YXR1cyA9PT0gJ25hbicpIHJldHVybiAnSW4gUHJvZ3Jlc3MnO1xyXG4gIGNvbnN0IGxvd2VyID0gcmF3U3RhdHVzLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xyXG4gIGlmIChsb3dlciA9PT0gJ3JlYWR5JykgcmV0dXJuICdSZWFkeSc7XHJcbiAgaWYgKGxvd2VyID09PSAncGFydHMgbm90IGFzc2lnbmVkJykgcmV0dXJuICdQYXJ0cyBOb3QgQXNzaWduZWQnO1xyXG4gIHJldHVybiAnSW4gUHJvZ3Jlc3MnO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Q2FsY3VsYXRlZFN0YXR1cyA9ICh0ZXN0OiBUZXN0RGF0YSwgdGVzdFN0YXJ0RGF0ZTogRGF0ZSB8IG51bGwgPSBudWxsKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBiYXNlU3RhdHVzID0gbm9ybWFsaXplUGFydFN0YXR1cyh0ZXN0LnBhcnRfc3RhdHVzKTtcclxuICBpZiAoYmFzZVN0YXR1cyA9PT0gJ1JlYWR5JykgcmV0dXJuICdSZWFkeSc7XHJcbiAgaWYgKGJhc2VTdGF0dXMgPT09ICdQYXJ0cyBOb3QgQXNzaWduZWQnKSByZXR1cm4gJ1BhcnRzIE5vdCBBc3NpZ25lZCc7XHJcblxyXG4gIGlmICh0ZXN0U3RhcnREYXRlICYmIHRlc3QucGFydF9yZWFkeV9kYXRlKSB7XHJcbiAgICBjb25zdCByZWFkeURhdGUgPSBwYXJzZUxvY2FsRGF0ZSh0ZXN0LnBhcnRfcmVhZHlfZGF0ZSk7XHJcbiAgICBjb25zdCBzdGFydERhdGUgPSB0b01pZG5pZ2h0KHRlc3RTdGFydERhdGUpO1xyXG4gICAgaWYgKHJlYWR5RGF0ZSAmJiBzdGFydERhdGUpIHtcclxuICAgICAgcmV0dXJuIHJlYWR5RGF0ZS5nZXRUaW1lKCkgPiBzdGFydERhdGUuZ2V0VGltZSgpID8gJ0RlbGF5ZWQnIDogJ09uIFRpbWUnO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gJ0luIFByb2dyZXNzJztcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBTdGF0dXMgLyBQcmlvcml0eSBoZWxwZXJzICh0aGVtZS1hd2FyZSlcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IGlzUnVubmluZ1Rlc3QgPSAodGVzdDogVGVzdERhdGEpOiBib29sZWFuID0+IHRlc3Quc3RhdHVzID09PSAnUnVubmluZyc7XHJcblxyXG5jb25zdCBnZXRDYXBDb2xvciA9IChzdGF0dXM6IHN0cmluZywgdGhlbWU6IFRoZW1lVG9rZW5zKTogc3RyaW5nID0+XHJcbiAgdGhlbWUuc3RhdHVzQ2FwW3N0YXR1c10gfHwgdGhlbWUuc3RhdHVzQ2FwWydJbiBQcm9ncmVzcyddIHx8ICcjRTVBMDBEJztcclxuXHJcbmNvbnN0IGdldFN0YXR1c1RleHRDb2xvciA9IChzdGF0dXM6IHN0cmluZywgdGhlbWU6IFRoZW1lVG9rZW5zKTogc3RyaW5nID0+XHJcbiAgdGhlbWUuc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHRoZW1lLnN0YXR1c1RleHRbJ0luIFByb2dyZXNzJ10gfHwgJyNCNDUzMDknO1xyXG5cclxuLy8gUmV0dXJucyAnUnVubmluZycgZm9yIFJ1bm5pbmcgdGVzdHMgKG92ZXJyaWRlcyBwYXJ0IHN0YXR1cyBmb3IgZGlzcGxheSBjb2xvdXJzKVxyXG5jb25zdCBnZXREaXNwbGF5U3RhdHVzID0gKHRlc3Q6IFRlc3REYXRhLCB0ZXN0U3RhcnREYXRlOiBEYXRlIHwgbnVsbCA9IG51bGwpOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChpc1J1bm5pbmdUZXN0KHRlc3QpKSByZXR1cm4gJ1J1bm5pbmcnO1xyXG4gIHJldHVybiBnZXRDYWxjdWxhdGVkU3RhdHVzKHRlc3QsIHRlc3RTdGFydERhdGUpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UHJpb3JpdHlUZXh0Q29sb3IgPSAocHJpb3JpdHk6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gdHlwZW9mIHByaW9yaXR5ID09PSAnbnVtYmVyJyA/IHByaW9yaXR5IDogNTA7XHJcbiAgY29uc3QgY2xhbXBlZCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgdmFsdWUpKTtcclxuICBpZiAoY2xhbXBlZCA8PSAzMCkgcmV0dXJuICcjNkI3MjgwJztcclxuICBpZiAoY2xhbXBlZCA8PSA2MCkgcmV0dXJuICcjRjU5RTBCJztcclxuICBpZiAoY2xhbXBlZCA8PSA4MCkgcmV0dXJuICcjRUE1ODBDJztcclxuICByZXR1cm4gJyNEQzI2MjYnO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UHJpb3JpdHlDb2xvciA9IChwcmlvcml0eTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSB0eXBlb2YgcHJpb3JpdHkgPT09ICdudW1iZXInID8gcHJpb3JpdHkgOiA1MDtcclxuICBjb25zdCBjbGFtcGVkID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCB2YWx1ZSkpO1xyXG4gIGNvbnN0IHJhdGlvID0gY2xhbXBlZCAvIDEwMDtcclxuICBjb25zdCBnID0gTWF0aC5yb3VuZCgyNTUgKiAoMSAtIHJhdGlvKSk7XHJcbiAgY29uc3QgYiA9IE1hdGgucm91bmQoMjU1ICogKDEgLSByYXRpbykpO1xyXG4gIHJldHVybiBgcmdiYSgyNTUsICR7Z30sICR7Yn0sIDAuNilgO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFN1Yi1jb21wb25lbnRzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBJbnNlcnRMaW5lOiBGQzx7IHRoZW1lOiBUaGVtZVRva2VucyB9PiA9ICh7IHRoZW1lIH0pID0+IChcclxuICA8ZGl2IHN0eWxlPXt7XHJcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAyLCBib3R0b206IDIsIHdpZHRoOiAzLFxyXG4gICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LCBib3JkZXJSYWRpdXM6IDIsIHpJbmRleDogMzAsXHJcbiAgICBib3hTaGFkb3c6IGAwIDAgMTJweCAke3RoZW1lLmFjY2VudH0sIDAgMCA0cHggJHt0aGVtZS5hY2NlbnR9YCxcclxuICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICB9fT5cclxuICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTQsIGxlZnQ6IC00LCB3aWR0aDogMTEsIGhlaWdodDogMTEsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCB9fSAvPlxyXG4gICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgYm90dG9tOiAtNCwgbGVmdDogLTQsIHdpZHRoOiAxMSwgaGVpZ2h0OiAxMSwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50IH19IC8+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5jb25zdCBPdXRsaW5lS2V5OiBGQzx7IHRoZW1lOiBUaGVtZVRva2VucyB9PiA9ICh7IHRoZW1lIH0pID0+IChcclxuICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDE2cHgnLCBib3JkZXJUb3A6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzIH19PlxyXG4gICAgPGgzIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDhlbScsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBjb2xvcjogdGhlbWUudGV4dFRlcnRpYXJ5LCBtYXJnaW5Cb3R0b206IDYgfX0+U3RhdHVzIEtleTwvaDM+XHJcbiAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleFdyYXA6ICd3cmFwJywgZ2FwOiAnNHB4IDAnIH19PlxyXG4gICAgICB7KFsnUnVubmluZycsICdSZWFkeScsICdPbiBUaW1lJywgJ0RlbGF5ZWQnLCAnUGFydHMgTm90IEFzc2lnbmVkJ10gYXMgY29uc3QpLm1hcCgoa2V5KSA9PiAoXHJcbiAgICAgICAgPGRpdiBrZXk9e2tleX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA2LCB3aWR0aDogJzUwJScsIG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNCwgaGVpZ2h0OiAxNCwgYmFja2dyb3VuZDogdGhlbWUuc3RhdHVzQ2FwW2tleV0sIGJvcmRlclJhZGl1czogMiwgZmxleFNocmluazogMCB9fSAvPlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiA5LCBjb2xvcjogdGhlbWUuc3RhdHVzVGV4dFtrZXldLCBmb250V2VpZ2h0OiA2MDAsIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyB9fT57a2V5LnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApKX1cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuaW50ZXJmYWNlIFF1ZXVlQ2FyZFByb3BzIHtcclxuICB0ZXN0OiBUZXN0RGF0YTtcclxuICBkcmFnZ2VkVGVzdElkOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIG1haW5UZXh0OiBzdHJpbmc7XHJcbiAgc3ViVGV4dDogc3RyaW5nO1xyXG4gIGluZm9Sb3c6IHN0cmluZztcclxuICBzaG93U3ViOiBib29sZWFuO1xyXG4gIHRoZW1lOiBUaGVtZVRva2VucztcclxuICBvbkRyYWdTdGFydDogKCkgPT4gdm9pZDtcclxuICBvbkRyYWdFbmQ6ICgpID0+IHZvaWQ7XHJcbiAgb25EcmFnT3ZlcjogKGU6IFJlYWN0LkRyYWdFdmVudCkgPT4gdm9pZDtcclxuICBvbk1lbnVPcGVuOiAocmVjdDogQW5jaG9yUmVjdCkgPT4gdm9pZDtcclxufVxyXG5cclxuY29uc3QgUXVldWVDYXJkOiBGQzxRdWV1ZUNhcmRQcm9wcz4gPSAoe1xyXG4gIHRlc3QsIGRyYWdnZWRUZXN0SWQsIHN0YXR1cywgbWFpblRleHQsIHN1YlRleHQsIGluZm9Sb3csIHNob3dTdWIsIHRoZW1lLFxyXG4gIG9uRHJhZ1N0YXJ0LCBvbkRyYWdFbmQsIG9uRHJhZ092ZXIsIG9uTWVudU9wZW4sXHJcbn0pID0+IHtcclxuICBjb25zdCBbaG92ZXJlZCwgc2V0SG92ZXJlZF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgcGlsbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcbiAgY29uc3QgY2FwQ29sb3IgPSBnZXRDYXBDb2xvcihzdGF0dXMsIHRoZW1lKTtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBkcmFnZ2FibGVcclxuICAgICAgb25EcmFnU3RhcnQ9eyhlKSA9PiB7IGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7IG9uRHJhZ1N0YXJ0KCk7IH19XHJcbiAgICAgIG9uRHJhZ0VuZD17b25EcmFnRW5kfVxyXG4gICAgICBvbkRyYWdPdmVyPXtvbkRyYWdPdmVyfVxyXG4gICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEhvdmVyZWQodHJ1ZSl9XHJcbiAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SG92ZXJlZChmYWxzZSl9XHJcbiAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIG1hcmdpbkJvdHRvbTogNixcclxuICAgICAgICBiYWNrZ3JvdW5kOiBkcmFnZ2VkVGVzdElkID09PSB0ZXN0LmlkID8gdGhlbWUuYmdTdWJ0bGUgOiB0aGVtZS5zdXJmYWNlLFxyXG4gICAgICAgIGJvcmRlcjogaG92ZXJlZCA/IGAycHggc29saWQgJHtjYXBDb2xvcn1gIDogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzTGcsXHJcbiAgICAgICAgY3Vyc29yOiAnZ3JhYicsXHJcbiAgICAgICAgb3BhY2l0eTogZHJhZ2dlZFRlc3RJZCA9PT0gdGVzdC5pZCA/IDAuMzUgOiAxLFxyXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICBib3hTaGFkb3c6IGhvdmVyZWQgPyAnMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMTUpJyA6ICcwIDFweCAzcHggcmdiYSgwLDAsMCwwLjA2KScsXHJcbiAgICAgICAgdHJhbnNmb3JtOiBob3ZlcmVkID8gJ3RyYW5zbGF0ZVkoLTJweCknIDogJ3RyYW5zbGF0ZVkoMCknLFxyXG4gICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC4xNXMgZWFzZSwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLCBib3JkZXIgMC4xNXMgZWFzZScsXHJcbiAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAgey8qIFN0YXR1cyBjYXAgYmFyICovfVxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA1LCBtaW5XaWR0aDogNSwgYmFja2dyb3VuZDogY2FwQ29sb3IsIGJvcmRlclJhZGl1czogYCR7dGhlbWUucmFkaXVzTGd9cHggMCAwICR7dGhlbWUucmFkaXVzTGd9cHhgLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgcGFkZGluZzogJzhweCAxMnB4JywgbWluV2lkdGg6IDAgfX0+XHJcbiAgICAgICAgey8qIFRvcCByb3c6IHByaW9yaXR5IGxlZnQsIHN0YXR1cyByaWdodCAqL31cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogNCwgcGFkZGluZ1JpZ2h0OiAyMCB9fT5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IGdldFByaW9yaXR5VGV4dENvbG9yKHRlc3QucHJpb3JpdHkpIH19PlxyXG4gICAgICAgICAgICBQe3Rlc3QucHJpb3JpdHl9XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA3MDAsIGxldHRlclNwYWNpbmc6ICcwLjA1ZW0nLCBjb2xvcjogZ2V0U3RhdHVzVGV4dENvbG9yKHN0YXR1cywgdGhlbWUpLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyBhcyBjb25zdCB9fT5cclxuICAgICAgICAgICAge3N0YXR1cy50b1VwcGVyQ2FzZSgpfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSwgbWFyZ2luQm90dG9tOiAyLCBsaW5lSGVpZ2h0OiAxLjMgfX0+XHJcbiAgICAgICAgICB7bWFpblRleHR9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge3Nob3dTdWIgJiYgKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Cb3R0b206IDQsIGZvbnRXZWlnaHQ6IDQwMCB9fT5cclxuICAgICAgICAgICAge3N1YlRleHR9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA4LCBmb250U2l6ZTogMTEsIGNvbG9yOiB0aGVtZS50ZXh0VGVydGlhcnksIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICB7aW5mb1Jvdy5zcGxpdCgnXFx1MDBiNycpLm1hcCgocGFydCwgaSwgYXJyKSA9PiAoXHJcbiAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2l9PlxyXG4gICAgICAgICAgICAgIDxzcGFuPntwYXJ0LnRyaW0oKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAge2kgPCBhcnIubGVuZ3RoIC0gMSAmJiA8c3Bhbj57J1xcdTAwYjcnfTwvc3Bhbj59XHJcbiAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHsvKiBUaHJlZS1kb3QgbWVudSBwaWxsICovfVxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXtwaWxsUmVmfVxyXG4gICAgICAgIGRyYWdnYWJsZT17ZmFsc2V9XHJcbiAgICAgICAgb25Nb3VzZURvd249eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxyXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgaWYgKHBpbGxSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCByID0gcGlsbFJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBvbk1lbnVPcGVuKHsgdG9wOiByLnRvcCwgYm90dG9tOiByLmJvdHRvbSwgbGVmdDogci5sZWZ0LCByaWdodDogci5yaWdodCB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9fVxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgIHRvcDogNixcclxuICAgICAgICAgIHJpZ2h0OiA2LFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogaG92ZXJlZCA/ICdyZ2JhKDAsMCwwLDAuMSknIDogJ3JnYmEoMCwwLDAsMC4wNCknLFxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAxMCxcclxuICAgICAgICAgIHBhZGRpbmc6ICcycHggN3B4JyxcclxuICAgICAgICAgIGZvbnRTaXplOiAxMyxcclxuICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsXHJcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgIGxldHRlclNwYWNpbmc6ICcwLjFlbScsXHJcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxyXG4gICAgICAgICAgb3BhY2l0eTogaG92ZXJlZCA/IDEgOiAwLjQsXHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjE1cywgYmFja2dyb3VuZCAwLjE1cycsXHJcbiAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXHJcbiAgICAgICAgICBmb250V2VpZ2h0OiA3MDAsXHJcbiAgICAgICAgfX1cclxuICAgICAgPlx1MDBCN1x1MDBCN1x1MDBCNzwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmludGVyZmFjZSBUZXN0QmFyUHJvcHMge1xyXG4gIHRlc3Q6IFNjaGVkdWxlZFRlc3Q7XHJcbiAgaXNUZXN0UnVubmluZzogYm9vbGVhbjtcclxuICBkcmFnZ2VkVGVzdElkOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgQkFSX0hFSUdIVDogbnVtYmVyO1xyXG4gIGRpc3BsYXlTdGF0dXM6IHN0cmluZztcclxuICByZXNvbHZlZE1haW46IHN0cmluZztcclxuICByZXNvbHZlZEluZm86IHN0cmluZztcclxuICBzaG93SW5mb09uQmFyOiBib29sZWFuO1xyXG4gIHRoZW1lOiBUaGVtZVRva2VucztcclxuICBvbkRyYWdTdGFydDogKGU6IFJlYWN0LkRyYWdFdmVudCkgPT4gdm9pZDtcclxuICBvbkRyYWdFbmQ6ICgpID0+IHZvaWQ7XHJcbiAgb25NZW51T3BlbjogKHJlY3Q6IEFuY2hvclJlY3QpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmNvbnN0IFRlc3RCYXI6IEZDPFRlc3RCYXJQcm9wcz4gPSAoe1xyXG4gIHRlc3QsIGlzVGVzdFJ1bm5pbmcsIGRyYWdnZWRUZXN0SWQsIHdpZHRoLCBCQVJfSEVJR0hULFxyXG4gIGRpc3BsYXlTdGF0dXMsIHJlc29sdmVkTWFpbiwgcmVzb2x2ZWRJbmZvLCBzaG93SW5mb09uQmFyLCB0aGVtZSxcclxuICBvbkRyYWdTdGFydCwgb25EcmFnRW5kLCBvbk1lbnVPcGVuLFxyXG59KSA9PiB7XHJcbiAgY29uc3QgW2hvdmVyZWQsIHNldEhvdmVyZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHBpbGxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xyXG4gIGNvbnN0IGNhcENvbG9yID0gZ2V0Q2FwQ29sb3IoZGlzcGxheVN0YXR1cywgdGhlbWUpO1xyXG4gIGNvbnN0IHVzZVZlcnRpY2FsRG90cyA9IHdpZHRoIDw9IDQwO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGRyYWdnYWJsZVxyXG4gICAgICBvbkRyYWdTdGFydD17b25EcmFnU3RhcnR9XHJcbiAgICAgIG9uRHJhZ0VuZD17b25EcmFnRW5kfVxyXG4gICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHsgaWYgKCFkcmFnZ2VkVGVzdElkKSBzZXRIb3ZlcmVkKHRydWUpOyB9fVxyXG4gICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldEhvdmVyZWQoZmFsc2UpfVxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDYsXHJcbiAgICAgICAgd2lkdGgsIGhlaWdodDogQkFSX0hFSUdIVCxcclxuICAgICAgICBiYWNrZ3JvdW5kOiBpc1Rlc3RSdW5uaW5nID8gdGhlbWUucnVubmluZ0JnIDogdGhlbWUuc3VyZmFjZSxcclxuICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLCBjdXJzb3I6ICdncmFiJyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxyXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICBvcGFjaXR5OiBkcmFnZ2VkVGVzdElkID09PSB0ZXN0LmlkID8gMC4yNSA6IDEsXHJcbiAgICAgICAgekluZGV4OiBob3ZlcmVkID8gMjUgOiAxNSxcclxuICAgICAgICBib3JkZXI6IGhvdmVyZWRcclxuICAgICAgICAgID8gYDJweCBzb2xpZCAke2NhcENvbG9yfWBcclxuICAgICAgICAgIDogaXNUZXN0UnVubmluZyA/IGAxcHggc29saWQgJHt0aGVtZS5ydW5uaW5nQm9yZGVyfWAgOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXHJcbiAgICAgICAgYm94U2hhZG93OiBob3ZlcmVkXHJcbiAgICAgICAgICA/ICcwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4xNSknXHJcbiAgICAgICAgICA6IGlzVGVzdFJ1bm5pbmcgPyBgMCAxcHggM3B4ICR7dGhlbWUucnVubmluZ0JvcmRlcn02NmAgOiAnMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4wNiknLFxyXG4gICAgICAgIHRyYW5zZm9ybTogaG92ZXJlZCA/ICd0cmFuc2xhdGVZKC0ycHgpJyA6ICd0cmFuc2xhdGVZKDApJyxcclxuICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZSwgYm9yZGVyIDAuMTVzIGVhc2UnLFxyXG4gICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgIH19XHJcbiAgICA+XHJcbiAgICAgIHsvKiBTdGF0dXMgY2FwIGJhciAqL31cclxuICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNSwgbWluV2lkdGg6IDUsIGJhY2tncm91bmQ6IGNhcENvbG9yLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgcGFkZGluZzogJzRweCA4cHgnLCBtaW5XaWR0aDogMCwganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxyXG4gICAgICAgIHsvKiBUb3Agcm93OiBwcmlvcml0eSArIHN0YXR1cyAobGVhdmUgcm9vbSBmb3IgcGlsbCkgKi99XHJcbiAgICAgICAge3dpZHRoID4gNzAgJiYgKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206IDIsIHBhZGRpbmdSaWdodDogd2lkdGggPiA5MCA/IDIyIDogMCB9fT5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiB3aWR0aCA+IDEyMCA/IDExIDogOSwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogaXNUZXN0UnVubmluZyA/IHRoZW1lLnJ1bm5pbmdUZXh0IDogZ2V0UHJpb3JpdHlUZXh0Q29sb3IodGVzdC5wcmlvcml0eSkgfX0+XHJcbiAgICAgICAgICAgICAge2lzVGVzdFJ1bm5pbmcgPyAnXHUyNUI2IFJVTk5JTkcnIDogYFAke3Rlc3QucHJpb3JpdHl9YH1cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICB7d2lkdGggPiAxMTAgJiYgIWlzVGVzdFJ1bm5pbmcgJiYgKFxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogOSwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnMC4wNWVtJywgY29sb3I6IGdldFN0YXR1c1RleHRDb2xvcihkaXNwbGF5U3RhdHVzLCB0aGVtZSksIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIGFzIGNvbnN0IH19PlxyXG4gICAgICAgICAgICAgICAge2Rpc3BsYXlTdGF0dXMudG9VcHBlckNhc2UoKX1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIHsvKiBNYWluIHRleHQgKi99XHJcbiAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgIGZvbnRTaXplOiB3aWR0aCA+IDEyMCA/IDEyIDogd2lkdGggPiA4MCA/IDExIDogMTAsXHJcbiAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiBpc1Rlc3RSdW5uaW5nID8gdGhlbWUucnVubmluZ1RleHREYXJrIDogdGhlbWUudGV4dFByaW1hcnksXHJcbiAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCBtYXhXaWR0aDogJzEwMCUnLCBsaW5lSGVpZ2h0OiAxLjIsXHJcbiAgICAgICAgfX0+XHJcbiAgICAgICAgICB7cmVzb2x2ZWRNYWlufVxyXG4gICAgICAgIDwvc3Bhbj5cclxuXHJcbiAgICAgICAgey8qIEluZm8gcm93ICovfVxyXG4gICAgICAgIHtzaG93SW5mb09uQmFyICYmIChcclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogOSwgZm9udFdlaWdodDogNDAwLFxyXG4gICAgICAgICAgICBjb2xvcjogaXNUZXN0UnVubmluZyA/IHRoZW1lLnJ1bm5pbmdUZXh0IDogdGhlbWUudGV4dFRlcnRpYXJ5LFxyXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIG1heFdpZHRoOiAnMTAwJScsIG1hcmdpblRvcDogMixcclxuICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICB7cmVzb2x2ZWRJbmZvfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgey8qIE1lbnUgcGlsbCBcdTIwMTQgXHUwMEI3XHUwMEI3XHUwMEI3IG9uIHdpZGUgYmFycywgXHUyMkVFIG9uIG5hcnJvdyBiYXJzLCBhbHdheXMgdmlzaWJsZSAqL31cclxuICAgICAgPGRpdlxyXG4gICAgICAgIHJlZj17cGlsbFJlZn1cclxuICAgICAgICBkcmFnZ2FibGU9e2ZhbHNlfVxyXG4gICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cclxuICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIGlmIChwaWxsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgciA9IHBpbGxSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgb25NZW51T3Blbih7IHRvcDogci50b3AsIGJvdHRvbTogci5ib3R0b20sIGxlZnQ6IHIubGVmdCwgcmlnaHQ6IHIucmlnaHQgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfX1cclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICB0b3A6IDQsXHJcbiAgICAgICAgICByaWdodDogNCxcclxuICAgICAgICAgIGJhY2tncm91bmQ6IGhvdmVyZWQgPyAncmdiYSgwLDAsMCwwLjEyKScgOiAncmdiYSgwLDAsMCwwLjA0KScsXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IDEwLFxyXG4gICAgICAgICAgcGFkZGluZzogdXNlVmVydGljYWxEb3RzID8gJzNweCA0cHgnIDogJzJweCA2cHgnLFxyXG4gICAgICAgICAgZm9udFNpemU6IHVzZVZlcnRpY2FsRG90cyA/IDEwIDogMTIsXHJcbiAgICAgICAgICBjb2xvcjogaXNUZXN0UnVubmluZyA/IHRoZW1lLnJ1bm5pbmdUZXh0IDogdGhlbWUudGV4dE11dGVkLFxyXG4gICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiB1c2VWZXJ0aWNhbERvdHMgPyAwIDogJzAuMWVtJyxcclxuICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXHJcbiAgICAgICAgICBvcGFjaXR5OiBob3ZlcmVkID8gMSA6IDAuMzUsXHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjE1cywgYmFja2dyb3VuZCAwLjE1cycsXHJcbiAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXHJcbiAgICAgICAgICBmb250V2VpZ2h0OiA3MDAsXHJcbiAgICAgICAgfX1cclxuICAgICAgPnt1c2VWZXJ0aWNhbERvdHMgPyAnXHUyMkVFJyA6ICdcdTAwQjdcdTAwQjdcdTAwQjcnfTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDb250ZXh0IE1lbnVcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IE1lbnVJdGVtOiBGQzx7IGxhYmVsOiBzdHJpbmc7IGRldGFpbD86IHN0cmluZzsgaWNvbj86IHN0cmluZzsgdGhlbWU6IFRoZW1lVG9rZW5zOyBvbkNsaWNrOiAocmVjdDogQW5jaG9yUmVjdCkgPT4gdm9pZCB9PiA9ICh7IGxhYmVsLCBkZXRhaWwsIGljb24sIHRoZW1lLCBvbkNsaWNrIH0pID0+IHtcbiAgY29uc3QgW2hvdmVyZWQsIHNldEhvdmVyZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0SG92ZXJlZCh0cnVlKX1cbiAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SG92ZXJlZChmYWxzZSl9XG4gICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICBjb25zdCByZWN0ID0gKGUuY3VycmVudFRhcmdldCBhcyBIVE1MRGl2RWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIG9uQ2xpY2soeyB0b3A6IHJlY3QudG9wLCBib3R0b206IHJlY3QuYm90dG9tLCBsZWZ0OiByZWN0LmxlZnQsIHJpZ2h0OiByZWN0LnJpZ2h0IH0pO1xuICAgICAgfX1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHBhZGRpbmc6ICc4cHggMTRweCcsXG4gICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgZm9udFdlaWdodDogNTAwLFxuICAgICAgICBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksXG4gICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICBiYWNrZ3JvdW5kOiBob3ZlcmVkID8gdGhlbWUuc3VyZmFjZUhvdmVyIDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgZ2FwOiA4LFxyXG4gICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcclxuICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7aWNvbiAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTMsIHdpZHRoOiAxOCwgdGV4dEFsaWduOiAnY2VudGVyJywgY29sb3I6IHRoZW1lLnRleHRNdXRlZCB9fT57aWNvbn08L3NwYW4+fVxuICAgICAgPGRpdiBzdHlsZT17eyBtaW5XaWR0aDogMCwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnYmFzZWxpbmUnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBnYXA6IDYsIHdpZHRoOiAnMTAwJScgfX0+XG4gICAgICAgIDxzcGFuIHN0eWxlPXt7IHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgbWluV2lkdGg6IDAsIGZsZXg6IDEgfX0+e2xhYmVsfTwvc3Bhbj5cbiAgICAgICAge2RldGFpbCAmJiAoXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleFNocmluazogMCwgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiA5LCBjb2xvcjogdGhlbWUudGV4dE11dGVkIH19PlxuICAgICAgICAgICAge2RldGFpbH1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cclxuaW50ZXJmYWNlIEFjdGlvblBvcG92ZXJQcm9wcyB7XG4gIHBvcG92ZXI6IFBvcG92ZXJTdGF0ZTtcbiAgYXNzaWduZWRQYXJ0c1RlbXBsYXRlOiBzdHJpbmc7XG4gIGFzc2lnbmVkUGFydHNMaW5rQmFzZVVybDogc3RyaW5nO1xuICB0aGVtZTogVGhlbWVUb2tlbnM7XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9uT3BlbkVkaXRvcjogKG1vZGU6IEVkaXRvclBvcG92ZXJNb2RlLCByZWN0OiBBbmNob3JSZWN0KSA9PiB2b2lkO1xuICBvbkVkaXRUZXN0OiAoKSA9PiB2b2lkO1xuICBwYW5lbFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50Pjtcbn1cblxuY29uc3QgQWN0aW9uUG9wb3ZlcjogRkM8QWN0aW9uUG9wb3ZlclByb3BzPiA9ICh7XG4gIHBvcG92ZXIsIGFzc2lnbmVkUGFydHNUZW1wbGF0ZSwgYXNzaWduZWRQYXJ0c0xpbmtCYXNlVXJsLCB0aGVtZSxcbiAgb25DbG9zZSwgb25PcGVuRWRpdG9yLCBvbkVkaXRUZXN0LCBwYW5lbFJlZixcbn0pID0+IHtcbiAgY29uc3QgW2ZsaXBwZWRWLCBzZXRGbGlwcGVkVl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHZpZXdwb3J0UGFkZGluZyA9IDg7XG4gIGNvbnN0IHBvcG92ZXJHYXAgPSA2O1xuICBjb25zdCBwb3BvdmVyV2lkdGggPSBNYXRoLm1pbig2MDAsIHdpbmRvdy5pbm5lcldpZHRoIC0gdmlld3BvcnRQYWRkaW5nICogMik7XG4gIGNvbnN0IHsgYW5jaG9yUmVjdCwgdGVzdCwgZGlzcGxheVN0YXR1cywgdG9vbHRpcExpbmVzLCBzY2hlZHVsZWQgfSA9IHBvcG92ZXI7XG4gIGNvbnN0IGNhcENvbG9yID0gZ2V0Q2FwQ29sb3IoZGlzcGxheVN0YXR1cywgdGhlbWUpO1xuICBjb25zdCBzdGFydERhdGVMYWJlbCA9IGZvcm1hdE1lbnVEYXRlTGFiZWwodGVzdC50ZXN0X3N0YXJ0ZWRfZGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVMYWJlbCA9IGZvcm1hdE1lbnVEYXRlTGFiZWwodGVzdC50ZXN0X2VuZGVkX2RhdGUpO1xuICBjb25zdCBhc3NpZ25lZFBhcnRTZXJpYWxzID0gcGFyc2VBc3NpZ25lZFBhcnRTZXJpYWxzKHJlc29sdmVBc3NpZ25lZFBhcnRzVmFsdWUoYXNzaWduZWRQYXJ0c1RlbXBsYXRlLCB0ZXN0KSk7XG4gIGNvbnN0IGlzUm9vdFR3b0NvbHVtbiA9IHBvcG92ZXJXaWR0aCA+PSAzNDA7XG4gIGNvbnN0IHNwYWNlQmVsb3cgPSBNYXRoLm1heCgwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSBhbmNob3JSZWN0LmJvdHRvbSAtIHBvcG92ZXJHYXAgLSB2aWV3cG9ydFBhZGRpbmcpO1xuICBjb25zdCBzcGFjZUFib3ZlID0gTWF0aC5tYXgoMCwgYW5jaG9yUmVjdC50b3AgLSBwb3BvdmVyR2FwIC0gdmlld3BvcnRQYWRkaW5nKTtcblxuICAvLyBIb3Jpem9udGFsOiByaWdodC1hbGlnbiB0byBidXR0b24sIGNsYW1wIHRvIHZpZXdwb3J0IGVkZ2VzXG4gIGxldCBsZWZ0ID0gYW5jaG9yUmVjdC5yaWdodCAtIHBvcG92ZXJXaWR0aDtcbiAgbGVmdCA9IE1hdGgubWF4KHZpZXdwb3J0UGFkZGluZywgTWF0aC5taW4obGVmdCwgd2luZG93LmlubmVyV2lkdGggLSBwb3BvdmVyV2lkdGggLSB2aWV3cG9ydFBhZGRpbmcpKTtcblxuICAvLyBWZXJ0aWNhbDogYmVsb3cgYnV0dG9uIGJ5IGRlZmF1bHQ7IGZsaXAgYWJvdmUgaWYgbmVhciBib3R0b21cbiAgY29uc3QgdG9wQmVsb3cgPSBhbmNob3JSZWN0LmJvdHRvbSArIHBvcG92ZXJHYXA7XG4gIGNvbnN0IGJvdHRvbUFib3ZlID0gd2luZG93LmlubmVySGVpZ2h0IC0gYW5jaG9yUmVjdC50b3AgKyBwb3BvdmVyR2FwO1xuXG4gIC8vIE1lYXN1cmUgcGFuZWwgaGVpZ2h0IGFuZCBkZWNpZGUgZmxpcCBkaXJlY3Rpb24gb24gZXZlcnkgbW9kZS9hbmNob3IgY2hhbmdlXG4gIFJlYWN0LnVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHBhbmVsUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IHBhbmVsSGVpZ2h0ID0gTWF0aC5taW4ocGFuZWxSZWYuY3VycmVudC5zY3JvbGxIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCAtIHZpZXdwb3J0UGFkZGluZyAqIDIpO1xuICAgICAgLy8gRmxpcCBhYm92ZSBvbmx5IGlmIGl0IGRvZXNuJ3QgZml0IGJlbG93IEFORCB0aGVyZSdzIG1vcmUgc3BhY2UgYWJvdmVcbiAgICAgIHNldEZsaXBwZWRWKHBhbmVsSGVpZ2h0ID4gc3BhY2VCZWxvdyAmJiBzcGFjZUFib3ZlID4gc3BhY2VCZWxvdyk7XG4gICAgfVxuICB9LCBbYW5jaG9yUmVjdCwgc3BhY2VBYm92ZSwgc3BhY2VCZWxvdywgcGFuZWxSZWZdKTtcblxuICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBNYXRoLm1heCgyMjAsIGZsaXBwZWRWID8gc3BhY2VBYm92ZSA6IHNwYWNlQmVsb3cpO1xuXG4gIGNvbnN0IHBvc1N0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0gZmxpcHBlZFZcbiAgICA/IHsgcG9zaXRpb246ICdmaXhlZCcsIGxlZnQsIGJvdHRvbTogYm90dG9tQWJvdmUsIHpJbmRleDogMzAwMCB9XG4gICAgOiB7IHBvc2l0aW9uOiAnZml4ZWQnLCBsZWZ0LCB0b3A6IHRvcEJlbG93LCB6SW5kZXg6IDMwMDAgfTtcblxyXG4gIGNvbnN0IGxpbmVzID0gdG9vbHRpcExpbmVzLnNwbGl0KCdcXG4nKS5maWx0ZXIobCA9PiB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IGwuc3BsaXQoJzonKTtcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPCAyKSByZXR1cm4gbC50cmltKCkgIT09ICcnO1xyXG4gICAgcmV0dXJuIHBhcnRzLnNsaWNlKDEpLmpvaW4oJzonKS50cmltKCkgIT09ICcnO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxuICAgICAgcmVmPXtwYW5lbFJlZn1cbiAgICAgIG9uQ29udGV4dE1lbnU9eyhlKSA9PiBlLnByZXZlbnREZWZhdWx0KCl9XG4gICAgICBzdHlsZT17e1xuICAgICAgICAuLi5wb3NTdHlsZSxcbiAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSxcbiAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXG4gICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzWGwsXG4gICAgICAgIGJveFNoYWRvdzogJzAgNHB4IDE2cHggcmdiYSgwLDAsMCwwLjEyKSwgMCAxcHggNHB4IHJnYmEoMCwwLDAsMC4wNiknLFxuICAgICAgICB3aWR0aDogcG9wb3ZlcldpZHRoLFxuICAgICAgICBtYXhXaWR0aDogYGNhbGMoMTAwdncgLSAke3ZpZXdwb3J0UGFkZGluZyAqIDJ9cHgpYCxcbiAgICAgICAgbWF4SGVpZ2h0OiBhdmFpbGFibGVIZWlnaHQsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICB0b3A6IDgsXG4gICAgICAgICAgcmlnaHQ6IDgsXG4gICAgICAgICAgd2lkdGg6IDI0LFxuICAgICAgICAgIGhlaWdodDogMjQsXG4gICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNTbSxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsXG4gICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICB9fVxuICAgICAgICBhcmlhLWxhYmVsPVwiQ2xvc2UgbWVudVwiXG4gICAgICA+XG4gICAgICAgIFx1MDBEN1xuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogJ2dyaWQnLFxuICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6IGlzUm9vdFR3b0NvbHVtbiA/ICdtaW5tYXgoMCwgM2ZyKSBtaW5tYXgoMjEwcHgsIDEuMmZyKScgOiAnbWlubWF4KDAsIDFmciknLFxuICAgICAgICAgIG1pbkhlaWdodDogMCxcbiAgICAgICAgICBmbGV4OiAxLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDE0cHggMTBweCcsIG92ZXJmbG93WTogJ2F1dG8nLCBtaW5IZWlnaHQ6IDAgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LCBsaW5lSGVpZ2h0OiAxLjMsIG1hcmdpbkJvdHRvbTogNiwgd29yZEJyZWFrOiAnYnJlYWstd29yZCcgfX0+XG4gICAgICAgICAgICB7dGVzdC5uYW1lfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206IGxpbmVzLmxlbmd0aCA+IDAgPyA4IDogMCwgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IGdldFByaW9yaXR5VGV4dENvbG9yKHRlc3QucHJpb3JpdHkpIH19PlxuICAgICAgICAgICAgICBQe3Rlc3QucHJpb3JpdHl9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xuICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubyxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDEwLCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiBnZXRTdGF0dXNUZXh0Q29sb3IoZGlzcGxheVN0YXR1cywgdGhlbWUpLFxuICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyBhcyBjb25zdCwgbGV0dGVyU3BhY2luZzogJzAuMDVlbScsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICcxcHggNnB4JywgYmFja2dyb3VuZDogYCR7Y2FwQ29sb3J9MThgLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c1NtLCBib3JkZXI6IGAxcHggc29saWQgJHtjYXBDb2xvcn00MGAsXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAge2Rpc3BsYXlTdGF0dXN9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2xpbmVzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IDEsIGJhY2tncm91bmQ6IHRoZW1lLmJvcmRlciwgbWFyZ2luOiAnMCAtMnB4IDhweCcgfX0gLz5cbiAgICAgICAgICAgICAge2xpbmVzLm1hcCgobGluZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9uSWR4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbG9uSWR4ID09PSAtMSkgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5LCBtYXJnaW5Cb3R0b206IDQsIGxpbmVIZWlnaHQ6IDEuNDUsIG92ZXJmbG93V3JhcDogJ2FueXdoZXJlJyB9fT57bGluZX08L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gbGluZS5zbGljZSgwLCBjb2xvbklkeCkudHJpbSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbGluZS5zbGljZShjb2xvbklkeCArIDEpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBmb250U2l6ZTogMTIsIG1hcmdpbkJvdHRvbTogNCwgbGluZUhlaWdodDogMS40NSwgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBtaW5XaWR0aDogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFdlaWdodDogNTAwLCBmbGV4U2hyaW5rOiAwIH19PntsYWJlbH06PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksIG92ZXJmbG93V3JhcDogJ2FueXdoZXJlJywgbWluV2lkdGg6IDAgfX0+e3ZhbHVlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogMSwgYmFja2dyb3VuZDogdGhlbWUuYm9yZGVyLCBtYXJnaW46IGAke2xpbmVzLmxlbmd0aCA+IDAgPyA4IDogMH1weCAtMnB4IDhweGAgfX0gLz5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgbWFyZ2luQm90dG9tOiBhc3NpZ25lZFBhcnRTZXJpYWxzLmxlbmd0aCA+IDAgPyA2IDogMCwgbGluZUhlaWdodDogMS40IH19PlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFdlaWdodDogNjAwIH19PkFzc2lnbmVkIFBhcnRzPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHthc3NpZ25lZFBhcnRTZXJpYWxzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleFdyYXA6ICd3cmFwJywgZ2FwOiAnNHB4IDhweCcsIGZvbnRTaXplOiAxMiwgbGluZUhlaWdodDogMS40IH19PlxuICAgICAgICAgICAgICB7YXNzaWduZWRQYXJ0U2VyaWFscy5tYXAoKHNlcmlhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhyZWYgPSBidWlsZEFzc2lnbmVkUGFydExpbmsoYXNzaWduZWRQYXJ0c0xpbmtCYXNlVXJsLCBzZXJpYWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBocmVmID8gKFxuICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAga2V5PXtzZXJpYWx9XG4gICAgICAgICAgICAgICAgICAgIGhyZWY9e2hyZWZ9XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogdGhlbWUuYWNjZW50LCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsIG92ZXJmbG93V3JhcDogJ2FueXdoZXJlJyB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7c2VyaWFsfVxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e3NlcmlhbH0gc3R5bGU9e3sgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LCBvdmVyZmxvd1dyYXA6ICdhbnl3aGVyZScgfX0+e3NlcmlhbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGxpbmVIZWlnaHQ6IDEuNCB9fT5Ob25lPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYm9yZGVyVG9wOiBpc1Jvb3RUd29Db2x1bW4gPyAnbm9uZScgOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXG4gICAgICAgICAgICBib3JkZXJMZWZ0OiBpc1Jvb3RUd29Db2x1bW4gPyBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgOiAnbm9uZScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgIG1pbkhlaWdodDogMCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAxNHB4IDEwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJywgbWluSGVpZ2h0OiAwLCBmbGV4OiAxIH19PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnksIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBsZXR0ZXJTcGFjaW5nOiAnMC4wNWVtJywgbWFyZ2luQm90dG9tOiA4IH19PlxuICAgICAgICAgICAgICBTY2hlZHVsZVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7c2NoZWR1bGVkID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIGZvbnRTaXplOiAxMiwgbWFyZ2luQm90dG9tOiA2LCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcgfX0+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250V2VpZ2h0OiA1MDAsIGZsZXhTaHJpbms6IDAgfX0+U3RhcnRzOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSB9fT57c2NoZWR1bGVkLnN0YXJ0LnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JywgeWVhcjogJ251bWVyaWMnIH0pfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBmb250U2l6ZTogMTIsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JyB9fT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRXZWlnaHQ6IDUwMCwgZmxleFNocmluazogMCB9fT5FbmRzOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSB9fT57c2NoZWR1bGVkLmVuZC50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLUdCJywgeyBkYXk6ICcyLWRpZ2l0JywgbW9udGg6ICdzaG9ydCcsIHllYXI6ICdudW1lcmljJyB9KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGxpbmVIZWlnaHQ6IDEuNCB9fT5EYXRlcyB3aWxsIGFwcGVhciBvbmNlIHRoZSB0ZXN0IGlzIHNjaGVkdWxlZC48L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBib3JkZXJUb3A6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgcGFkZGluZzogJzRweCAwJyB9fT5cbiAgICAgICAgICAgIDxNZW51SXRlbSBsYWJlbD1cIkNoYW5nZSBQcmlvcml0eVwiIGljb249XCJcdTJCMDZcIiB0aGVtZT17dGhlbWV9IG9uQ2xpY2s9eyhyZWN0KSA9PiBvbk9wZW5FZGl0b3IoJ3ByaW9yaXR5JywgcmVjdCl9IC8+XG4gICAgICAgICAgICA8TWVudUl0ZW0gbGFiZWw9XCJDaGFuZ2UgU3RhdHVzXCIgaWNvbj1cIlx1MjVDOVwiIHRoZW1lPXt0aGVtZX0gb25DbGljaz17KHJlY3QpID0+IG9uT3BlbkVkaXRvcignc3RhdHVzJywgcmVjdCl9IC8+XG4gICAgICAgICAgICB7ZGlzcGxheVN0YXR1cyA9PT0gJ1J1bm5pbmcnICYmIChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8TWVudUl0ZW0gbGFiZWw9XCJDaGFuZ2UgU3RhcnQgRGF0ZVwiIGRldGFpbD17c3RhcnREYXRlTGFiZWwgfHwgdW5kZWZpbmVkfSBpY29uPVwiXHVEODNEXHVEQ0M1XCIgdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXsocmVjdCkgPT4gb25PcGVuRWRpdG9yKCdzdGFydF9kYXRlJywgcmVjdCl9IC8+XG4gICAgICAgICAgICAgICAgPE1lbnVJdGVtIGxhYmVsPVwiQ2hhbmdlIEVuZCBEYXRlXCIgZGV0YWlsPXtlbmREYXRlTGFiZWwgfHwgdW5kZWZpbmVkfSBpY29uPVwiXHVEODNEXHVEQ0M1XCIgdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXsocmVjdCkgPT4gb25PcGVuRWRpdG9yKCdlbmRfZGF0ZScsIHJlY3QpfSAvPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8TWVudUl0ZW0gbGFiZWw9XCJFZGl0IFRlc3RcIiBpY29uPVwiXHUyNzBFXCIgdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXsoKSA9PiBvbkVkaXRUZXN0KCl9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5pbnRlcmZhY2UgRWRpdG9yUG9wb3ZlclByb3BzIHtcbiAgZWRpdG9yUG9wb3ZlcjogRWRpdG9yUG9wb3ZlclN0YXRlO1xuICBwb3BvdmVyOiBQb3BvdmVyU3RhdGU7XG4gIHN0YXR1c09wdGlvbnNMaXN0OiBzdHJpbmdbXTtcbiAgcHJpb3JpdHlJbnB1dFZhbHVlOiBzdHJpbmc7XG4gIHN0YXJ0RGF0ZUlucHV0VmFsdWU6IHN0cmluZztcbiAgZW5kRGF0ZUlucHV0VmFsdWU6IHN0cmluZztcbiAgdGhlbWU6IFRoZW1lVG9rZW5zO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICBvblByaW9yaXR5SW5wdXRDaGFuZ2U6ICh2YWw6IHN0cmluZykgPT4gdm9pZDtcbiAgb25Db25maXJtUHJpb3JpdHk6ICgpID0+IHZvaWQ7XG4gIG9uUGlja1N0YXR1czogKHN0YXR1czogc3RyaW5nKSA9PiB2b2lkO1xuICBvblN0YXJ0RGF0ZUlucHV0Q2hhbmdlOiAodmFsOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQ29uZmlybVN0YXJ0RGF0ZTogKCkgPT4gdm9pZDtcbiAgb25FbmREYXRlSW5wdXRDaGFuZ2U6ICh2YWw6IHN0cmluZykgPT4gdm9pZDtcbiAgb25Db25maXJtRW5kRGF0ZTogKCkgPT4gdm9pZDtcbiAgcGFuZWxSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudD47XG59XG5cbmNvbnN0IEVkaXRvclBvcG92ZXI6IEZDPEVkaXRvclBvcG92ZXJQcm9wcz4gPSAoe1xuICBlZGl0b3JQb3BvdmVyLCBwb3BvdmVyLCBzdGF0dXNPcHRpb25zTGlzdCwgcHJpb3JpdHlJbnB1dFZhbHVlLCBzdGFydERhdGVJbnB1dFZhbHVlLCBlbmREYXRlSW5wdXRWYWx1ZSwgdGhlbWUsXG4gIG9uQ2xvc2UsIG9uUHJpb3JpdHlJbnB1dENoYW5nZSwgb25Db25maXJtUHJpb3JpdHksIG9uUGlja1N0YXR1cyxcbiAgb25TdGFydERhdGVJbnB1dENoYW5nZSwgb25Db25maXJtU3RhcnREYXRlLCBvbkVuZERhdGVJbnB1dENoYW5nZSwgb25Db25maXJtRW5kRGF0ZSwgcGFuZWxSZWYsXG59KSA9PiB7XG4gIGNvbnN0IHZpZXdwb3J0UGFkZGluZyA9IDg7XG4gIGNvbnN0IHBvcG92ZXJHYXAgPSA4O1xuICBjb25zdCB3aWR0aCA9IGVkaXRvclBvcG92ZXIubW9kZSA9PT0gJ3N0YXR1cydcbiAgICA/IDIyMFxuICAgIDogZWRpdG9yUG9wb3Zlci5tb2RlID09PSAncHJpb3JpdHknXG4gICAgICA/IDI0MFxuICAgICAgOiAyNjA7XG4gIGNvbnN0IG1heFdpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSB2aWV3cG9ydFBhZGRpbmcgKiAyO1xuICBjb25zdCBwb3BvdmVyV2lkdGggPSBNYXRoLm1pbih3aWR0aCwgbWF4V2lkdGgpO1xuICBjb25zdCBhbmNob3JSZWN0ID0gZWRpdG9yUG9wb3Zlci5hbmNob3JSZWN0O1xuICBjb25zdCBvcGVuUmlnaHQgPSBhbmNob3JSZWN0LnJpZ2h0ICsgcG9wb3ZlckdhcCArIHBvcG92ZXJXaWR0aCA8PSB3aW5kb3cuaW5uZXJXaWR0aCAtIHZpZXdwb3J0UGFkZGluZztcbiAgY29uc3Qgb3BlbkxlZnQgPSBhbmNob3JSZWN0LmxlZnQgLSBwb3BvdmVyR2FwIC0gcG9wb3ZlcldpZHRoID49IHZpZXdwb3J0UGFkZGluZztcblxuICBsZXQgbGVmdCA9IG9wZW5SaWdodFxuICAgID8gYW5jaG9yUmVjdC5yaWdodCArIHBvcG92ZXJHYXBcbiAgICA6IG9wZW5MZWZ0XG4gICAgICA/IGFuY2hvclJlY3QubGVmdCAtIHBvcG92ZXJXaWR0aCAtIHBvcG92ZXJHYXBcbiAgICAgIDogTWF0aC5tYXgodmlld3BvcnRQYWRkaW5nLCBNYXRoLm1pbihhbmNob3JSZWN0LnJpZ2h0IC0gcG9wb3ZlcldpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCAtIHBvcG92ZXJXaWR0aCAtIHZpZXdwb3J0UGFkZGluZykpO1xuICBsZWZ0ID0gTWF0aC5tYXgodmlld3BvcnRQYWRkaW5nLCBNYXRoLm1pbihsZWZ0LCB3aW5kb3cuaW5uZXJXaWR0aCAtIHBvcG92ZXJXaWR0aCAtIHZpZXdwb3J0UGFkZGluZykpO1xuXG4gIGNvbnN0IHRvcCA9IE1hdGgubWF4KFxuICAgIHZpZXdwb3J0UGFkZGluZyxcbiAgICBNYXRoLm1pbihhbmNob3JSZWN0LnRvcCAtIDYsIHdpbmRvdy5pbm5lckhlaWdodCAtIHZpZXdwb3J0UGFkZGluZyAtIDIyMClcbiAgKTtcblxuICBjb25zdCBoZWFkaW5nID0gZWRpdG9yUG9wb3Zlci5tb2RlID09PSAncHJpb3JpdHknXG4gICAgPyAnQ2hhbmdlIFByaW9yaXR5J1xuICAgIDogZWRpdG9yUG9wb3Zlci5tb2RlID09PSAnc3RhdHVzJ1xuICAgICAgPyAnQ2hhbmdlIFN0YXR1cydcbiAgICAgIDogZWRpdG9yUG9wb3Zlci5tb2RlID09PSAnc3RhcnRfZGF0ZSdcbiAgICAgICAgPyAnQ2hhbmdlIFN0YXJ0IERhdGUnXG4gICAgICAgIDogJ0NoYW5nZSBFbmQgRGF0ZSc7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICByZWY9e3BhbmVsUmVmfVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgIGxlZnQsXG4gICAgICAgIHRvcCxcbiAgICAgICAgekluZGV4OiAzMDEwLFxuICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLFxuICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNYbCxcbiAgICAgICAgYm94U2hhZG93OiAnMCA2cHggMThweCByZ2JhKDAsMCwwLDAuMTQpLCAwIDFweCA0cHggcmdiYSgwLDAsMCwwLjA2KScsXG4gICAgICAgIHdpZHRoOiBwb3BvdmVyV2lkdGgsXG4gICAgICAgIG1heFdpZHRoOiBgY2FsYygxMDB2dyAtICR7dmlld3BvcnRQYWRkaW5nICogMn1weClgLFxuICAgICAgICBtYXhIZWlnaHQ6IGBjYWxjKDEwMHZoIC0gJHt2aWV3cG9ydFBhZGRpbmcgKiAyfXB4KWAsXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAzOHB4IDhweCAxNHB4JywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4IH19PlxuICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnkgfX0+e2hlYWRpbmd9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICB7ZWRpdG9yUG9wb3Zlci5tb2RlID09PSAncHJpb3JpdHknID8gKFxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDE0cHgnIH19PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Cb3R0b206IDggfX0+RW50ZXIgcHJpb3JpdHkgKDBcdTIwMTMxMDApOjwvZGl2PlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICBtaW49ezB9XG4gICAgICAgICAgICBtYXg9ezEwMH1cbiAgICAgICAgICAgIGF1dG9Gb2N1c1xuICAgICAgICAgICAgdmFsdWU9e3ByaW9yaXR5SW5wdXRWYWx1ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25Qcmlvcml0eUlucHV0Q2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBvbkNvbmZpcm1Qcmlvcml0eSgpO1xuICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBvbkNsb3NlKCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggOHB4JywgZm9udFNpemU6IDEzLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcbiAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyU3Ryb25nfWAsIG91dGxpbmU6ICdub25lJyxcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiA4LCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29uZmlybVByaW9yaXR5fVxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGZsZXg6IDEsIHBhZGRpbmc6ICc2cHggMCcsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCwgY29sb3I6IHRoZW1lLmFjY2VudEZnLCBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cywgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+Q29uZmlybTwvYnV0dG9uPlxuICAgICAgICAgICAgPHNwYW4gb25DbGljaz17b25DbG9zZX0gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBjdXJzb3I6ICdwb2ludGVyJywgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnIH19PkNhbmNlbDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogZWRpdG9yUG9wb3Zlci5tb2RlID09PSAnc3RhdHVzJyA/IChcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnNHB4IDAnIH19PlxuICAgICAgICAgIHtzdGF0dXNPcHRpb25zTGlzdC5tYXAoKHMpID0+IChcbiAgICAgICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgICAgICBrZXk9e3N9XG4gICAgICAgICAgICAgIGxhYmVsPXtzID09PSAnTlVMTCcgPyAnQ2xlYXIgU3RhdHVzIChOVUxMKScgOiBzfVxuICAgICAgICAgICAgICBkZXRhaWw9e3BvcG92ZXIudGVzdC5zdGF0dXMgPT09IChzID09PSAnTlVMTCcgPyBudWxsIDogcykgPyAnQ3VycmVudCcgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25QaWNrU3RhdHVzKHMpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogZWRpdG9yUG9wb3Zlci5tb2RlID09PSAnc3RhcnRfZGF0ZScgPyAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMTRweCcgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIG1hcmdpbkJvdHRvbTogOCB9fT5FbnRlciBzdGFydCBkYXRlOjwvZGl2PlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgICAgICAgYXV0b0ZvY3VzXG4gICAgICAgICAgICB2YWx1ZT17c3RhcnREYXRlSW5wdXRWYWx1ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25TdGFydERhdGVJbnB1dENoYW5nZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBvbktleURvd249eyhlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgb25Db25maXJtU3RhcnREYXRlKCk7XG4gICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLCBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgICAgcGFkZGluZzogJzZweCA4cHgnLCBmb250U2l6ZTogMTMsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLFxuICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJTdHJvbmd9YCwgb3V0bGluZTogJ25vbmUnLFxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IDgsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLnN1cmZhY2UsIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA4LCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17b25Db25maXJtU3RhcnREYXRlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IXN0YXJ0RGF0ZUlucHV0VmFsdWV9XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgZmxleDogMSwgcGFkZGluZzogJzZweCAwJywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogc3RhcnREYXRlSW5wdXRWYWx1ZSA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLmJvcmRlcixcbiAgICAgICAgICAgICAgICBjb2xvcjogc3RhcnREYXRlSW5wdXRWYWx1ZSA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dE11dGVkLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cywgY3Vyc29yOiBzdGFydERhdGVJbnB1dFZhbHVlID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnLFxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+Q29uZmlybTwvYnV0dG9uPlxuICAgICAgICAgICAgPHNwYW4gb25DbGljaz17b25DbG9zZX0gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBjdXJzb3I6ICdwb2ludGVyJywgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnIH19PkNhbmNlbDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDE0cHgnIH19PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Cb3R0b206IDggfX0+RW50ZXIgZW5kIGRhdGU6PC9kaXY+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgICBhdXRvRm9jdXNcbiAgICAgICAgICAgIHZhbHVlPXtlbmREYXRlSW5wdXRWYWx1ZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25FbmREYXRlSW5wdXRDaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIG9uQ29uZmlybUVuZERhdGUoKTtcbiAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgb25DbG9zZSgpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDhweCcsIGZvbnRTaXplOiAxMywgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXG4gICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlclN0cm9uZ31gLCBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogOCwgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNvbmZpcm1FbmREYXRlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWVuZERhdGVJbnB1dFZhbHVlfVxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGZsZXg6IDEsIHBhZGRpbmc6ICc2cHggMCcsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGVuZERhdGVJbnB1dFZhbHVlID8gdGhlbWUuYWNjZW50IDogdGhlbWUuYm9yZGVyLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBlbmREYXRlSW5wdXRWYWx1ZSA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dE11dGVkLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cywgY3Vyc29yOiBlbmREYXRlSW5wdXRWYWx1ZSA/ICdwb2ludGVyJyA6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPkNvbmZpcm08L2J1dHRvbj5cbiAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e29uQ2xvc2V9IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyB9fT5DYW5jZWw8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFNhdmUgT3ZlcmxheVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFNhdmVPdmVybGF5UHJvcHMge1xyXG4gIGlzRXJyb3I6IGJvb2xlYW47XHJcbiAgdGhlbWU6IFRoZW1lVG9rZW5zO1xyXG4gIG9uUmV0cnk6ICgpID0+IHZvaWQ7XHJcbiAgb25EaXNjYXJkOiAoKSA9PiB2b2lkO1xyXG59XHJcblxyXG5jb25zdCBTYXZlT3ZlcmxheTogRkM8U2F2ZU92ZXJsYXlQcm9wcz4gPSAoeyBpc0Vycm9yLCB0aGVtZSwgb25SZXRyeSwgb25EaXNjYXJkIH0pID0+IChcclxuICA8ZGl2IHN0eWxlPXt7XHJcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgaW5zZXQ6IDAsIHpJbmRleDogMjAwMCxcclxuICAgIGJhY2tncm91bmQ6IHRoZW1lLmlzRGFyayA/ICdyZ2JhKDI4LDI4LDQ2LDAuODIpJyA6ICdyZ2JhKDI0OSwyNTAsMjUxLDAuODIpJyxcclxuICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgfX0+XHJcbiAgICB7IWlzRXJyb3IgPyAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogMTIgfX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgd2lkdGg6IDMyLCBoZWlnaHQ6IDMyLCBib3JkZXJSYWRpdXM6ICc1MCUnLFxyXG4gICAgICAgICAgYm9yZGVyOiBgM3B4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJvcmRlclRvcENvbG9yOiB0aGVtZS5hY2NlbnQsXHJcbiAgICAgICAgICBhbmltYXRpb246ICdjY2wtc3BpbiAwLjdzIGxpbmVhciBpbmZpbml0ZScsXHJcbiAgICAgICAgfX0gLz5cclxuICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnkgfX0+U2F2aW5nXHUyMDI2PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICkgOiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLCBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNYbCxcclxuICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAyMHB4IHJnYmEoMCwwLDAsMC4xMiknLCBwYWRkaW5nOiAnMjRweCAyOHB4JyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMixcclxuICAgICAgICBtYXhXaWR0aDogMzAwLFxyXG4gICAgICB9fT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogNDAsIGhlaWdodDogNDAsIGJvcmRlclJhZGl1czogJzUwJScsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyAnIzNCMDAwMCcgOiAnI0ZFRjJGMicsXHJcbiAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5pc0RhcmsgPyAnIzdGMUQxRCcgOiAnI0ZFQ0FDQSd9YCxcclxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICAgIGZvbnRTaXplOiAyMCwgY29sb3I6ICcjRUY0NDQ0JywgZm9udFdlaWdodDogNzAwLFxyXG4gICAgICAgIH19PiE8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnkgfX0+U2F2ZSBmYWlsZWQ8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgdGV4dEFsaWduOiAnY2VudGVyJywgbGluZUhlaWdodDogMS41IH19PlxyXG4gICAgICAgICAgVGhlIGFsbG9jYXRpb24gY291bGQgbm90IGJlIHNhdmVkLiBZb3UgY2FuIHJldHJ5IG9yIGRpc2NhcmQgeW91ciBjaGFuZ2VzLlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIG1hcmdpblRvcDogNCB9fT5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgb25DbGljaz17b25EaXNjYXJkfVxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTZweCcsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJTdHJvbmd9YCwgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnksIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+RGlzY2FyZDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvblJldHJ5fVxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTZweCcsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LCBjb2xvcjogdGhlbWUuYWNjZW50RmcsXHJcbiAgICAgICAgICAgICAgYm94U2hhZG93OiBgMCAxcHggM3B4ICR7dGhlbWUuYWNjZW50fTREYCxcclxuICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlJldHJ5PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKX1cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQWxsb2NhdGlvbiBIZWxwZXJzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBidWlsZEFsbG9jYXRpb25zID0gKHN0YW5kczogSW50ZXJuYWxTdGFuZFtdKTogQWxsb2NhdGlvblJlY29yZFtdID0+IHtcclxuICBjb25zdCBhbGxvY2F0aW9uczogQWxsb2NhdGlvblJlY29yZFtdID0gW107XHJcbiAgc3RhbmRzLmZvckVhY2goc3RhbmQgPT4ge1xyXG4gICAgc3RhbmQudGVzdHMuZm9yRWFjaCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgIGFsbG9jYXRpb25zLnB1c2goe1xyXG4gICAgICAgIHRlc3RfaWQ6IHRlc3QuaWQsXHJcbiAgICAgICAgdGVzdF9zdGFuZF9pZDogc3RhbmQuaWQsXHJcbiAgICAgICAgcHJpb3JpdHlfb3JkZXI6IGlkeCArIDEsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGFsbG9jYXRpb25zO1xyXG59O1xyXG5cclxuY29uc3QgYWxsb2NhdGlvbnNLZXkgPSAoYWxsb2NzOiBBbGxvY2F0aW9uUmVjb3JkW10pOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShhbGxvY3MubWFwKGEgPT4gYCR7YS50ZXN0X2lkfToke2EudGVzdF9zdGFuZF9pZH06JHthLnByaW9yaXR5X29yZGVyfWApLnNvcnQoKSk7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZVN0YW5kcyA9IChcclxuICB0ZXN0c0FycjogYW55W10sXHJcbiAgc3RhbmRzQXJyOiBTdGFuZERlZltdLFxyXG4gIGNoSG91cnM6IG51bWJlcixcclxuICBub25Xb3JraW5nQXJyOiBhbnlbXSA9IFtdXHJcbik6IHsgc3RhbmRzOiBJbnRlcm5hbFN0YW5kW107IHVuYWxsb2NhdGVkOiBUZXN0RGF0YVtdIH0gPT4ge1xyXG4gIC8vIEdyb3VwIG5vbi13b3JraW5nIHJvd3MgYnkgdGVzdF9zdGFuZF9pZFxyXG4gIGNvbnN0IG5vbldvcmtpbmdCeVN0YW5kID0gbmV3IE1hcDxzdHJpbmcgfCBudW1iZXIsIGFueVtdPigpO1xyXG4gIGZvciAoY29uc3Qgcm93IG9mIG5vbldvcmtpbmdBcnIpIHtcclxuICAgIGlmICghcm93IHx8IHJvdy50ZXN0X3N0YW5kX2lkID09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgY29uc3Qga2V5ID0gcm93LnRlc3Rfc3RhbmRfaWQ7XHJcbiAgICBpZiAoIW5vbldvcmtpbmdCeVN0YW5kLmhhcyhrZXkpKSBub25Xb3JraW5nQnlTdGFuZC5zZXQoa2V5LCBbXSk7XHJcbiAgICBub25Xb3JraW5nQnlTdGFuZC5nZXQoa2V5KSEucHVzaCh7IHN0YXJ0OiByb3cuc3RhcnRfdGltZSwgZW5kOiByb3cuZW5kX3RpbWUsIG5vdGVzOiByb3cubm90ZXMgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdGFuZE1hcCA9IG5ldyBNYXA8bnVtYmVyIHwgc3RyaW5nLCBJbnRlcm5hbFN0YW5kPigpO1xyXG4gIHN0YW5kc0Fyci5mb3JFYWNoKHMgPT4gc3RhbmRNYXAuc2V0KHMuaWQsIHtcclxuICAgIGlkOiBzLmlkLFxyXG4gICAgbmFtZTogcy5uYW1lLFxyXG4gICAgdGVzdHM6IFtdLFxyXG4gICAgY2hhbmdlb3Zlcl9ob3Vyczogcy5jaGFuZ2VvdmVyX2hvdXJzID8/IGNoSG91cnMsXHJcbiAgICBub25Xb3JraW5nQmxvY2tzOiBwYXJzZU5vbldvcmtpbmdCbG9ja3Mobm9uV29ya2luZ0J5U3RhbmQuZ2V0KHMuaWQpID8/IFtdKSxcclxuICB9KSk7XHJcblxyXG4gIGNvbnN0IHVuYWxsb2NhdGVkOiBUZXN0RGF0YVtdID0gW107XHJcbiAgdGVzdHNBcnIuZm9yRWFjaCgodDogYW55KSA9PiB7XHJcbiAgICBjb25zdCB0ZXN0OiBUZXN0RGF0YSA9IHtcclxuICAgICAgaWQ6IHQuaWQsXHJcbiAgICAgIG5hbWU6IHQubmFtZSB8fCAnJyxcclxuICAgICAgZHVyYXRpb246IHQuZHVyYXRpb24gfHwgNzIsXHJcbiAgICAgIG93bmVyOiB0Lm93bmVyIHx8ICcnLFxyXG4gICAgICBwcmlvcml0eTogdC5wcmlvcml0eSA/PyA1MCxcclxuICAgICAgbm90ZXM6IHQubm90ZXMgfHwgJycsXHJcbiAgICAgIHN0YXR1czogdC5zdGF0dXMgfHwgJycsXHJcbiAgICAgIHRlc3Rfc3RhbmRfaWQ6IHQudGVzdF9zdGFuZF9pZCxcclxuICAgICAgcHJpb3JpdHlfb3JkZXI6IHQucHJpb3JpdHlfb3JkZXIsXHJcbiAgICAgIGFsbG9jYXRpb25faWQ6IHQuYWxsb2NhdGlvbl9pZCxcclxuICAgICAgYXNzaWduZWRfcGFydHM6IHQuYXNzaWduZWRfcGFydHMgfHwgbnVsbCxcclxuICAgICAgcGFydF9yZWFkeV9kYXRlOiB0LnBhcnRfcmVhZHlfZGF0ZSB8fCBudWxsLFxyXG4gICAgICBwYXJ0X3N0YXR1czogdC5wYXJ0X3N0YXR1cyB8fCAnJyxcclxuICAgICAgdGVzdF9zdGFydGVkX2RhdGU6IHQudGVzdF9zdGFydGVkX2RhdGUgfHwgbnVsbCxcclxuICAgICAgLi4udCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRlc3QudGVzdF9zdGFuZF9pZCAhPSBudWxsICYmIHN0YW5kTWFwLmhhcyh0ZXN0LnRlc3Rfc3RhbmRfaWQpKSB7XHJcbiAgICAgIHN0YW5kTWFwLmdldCh0ZXN0LnRlc3Rfc3RhbmRfaWQpIS50ZXN0cy5wdXNoKHRlc3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdW5hbGxvY2F0ZWQucHVzaCh0ZXN0KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgc3RhbmRNYXAuZm9yRWFjaChzID0+IHtcclxuICAgIHMudGVzdHMuc29ydCgoYSwgYikgPT4gKGEucHJpb3JpdHlfb3JkZXIgfHwgOTk5KSAtIChiLnByaW9yaXR5X29yZGVyIHx8IDk5OSkpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3RhbmRzOiBzdGFuZHNBcnIubWFwKHMgPT4gc3RhbmRNYXAuZ2V0KHMuaWQpISksXHJcbiAgICB1bmFsbG9jYXRlZCxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIE1haW4gQ29tcG9uZW50XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5leHBvcnQgY29uc3QgVGVzdFN0YW5kU2NoZWR1bGVyOiBGQyA9ICgpID0+IHtcclxuICAvLyBcdTI1MDBcdTI1MDAgSW5wdXQgZGF0YSBmcm9tIFJldG9vbCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbaW5wdXRUZXN0c10gPSBSZXRvb2wudXNlU3RhdGVBcnJheSh7XHJcbiAgICBuYW1lOiBcInRlc3RzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIlRlc3RzIERhdGFcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIHRlc3Qgb2JqZWN0cyBmcm9tIGdldFNjaGVkdWxlckRhdGEgcXVlcnlcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2lucHV0U3RhbmRzXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwidGVzdFN0YW5kc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJUZXN0IFN0YW5kcyBEYXRhXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiB0ZXN0IHN0YW5kIG9iamVjdHMgZnJvbSBnZXRUZXN0U3RhbmRzIHF1ZXJ5IChpZCwgbmFtZSwgY2hhbmdlb3Zlcl9ob3VycylcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2lucHV0Tm9uV29ya2luZ10gPSBSZXRvb2wudXNlU3RhdGVBcnJheSh7XHJcbiAgICBuYW1lOiBcIm5vbldvcmtpbmdEYXRhXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIk5vbi1Xb3JraW5nIEJsb2Nrc1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2Ygbm9uLXdvcmtpbmcgcGVyaW9kcyBmcm9tIGdldE5vbldvcmtpbmcgcXVlcnkgKGlkLCB0ZXN0X3N0YW5kX2lkLCBzdGFydF90aW1lLCBlbmRfdGltZSwgbm90ZXMpXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBDb25maWd1cmF0aW9uIHByb3BlcnRpZXMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW3NhdmVNb2RlLCBzZXRTYXZlTW9kZV0gPSBSZXRvb2wudXNlU3RhdGVFbnVtZXJhdGlvbih7XG4gICAgbmFtZTogXCJzYXZlTW9kZVwiLFxuICAgIGluaXRpYWxWYWx1ZTogXCJiYXRjaFwiLFxuICAgIGVudW1EZWZpbml0aW9uOiBbXCJiYXRjaFwiLCBcImxpdmVcIl0sXG4gICAgaW5zcGVjdG9yOiBcInNlZ21lbnRlZFwiLFxuICAgIGxhYmVsOiBcIlNhdmUgTW9kZVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcImJhdGNoID0gc2F2ZSBidXR0b24sIGxpdmUgPSBlbWl0IG9uIGV2ZXJ5IGNoYW5nZVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaXNTYXZpbmddID0gUmV0b29sLnVzZVN0YXRlQm9vbGVhbih7XHJcbiAgICBuYW1lOiBcImlzU2F2aW5nXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgaW5zcGVjdG9yOiBcImNoZWNrYm94XCIsXHJcbiAgICBsYWJlbDogXCJJcyBTYXZpbmdcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG86IHt7IHNhdmVBbGxvY2F0aW9ucy5pc0ZldGNoaW5nIH19XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtoYXNTYXZlRXJyb3JdID0gUmV0b29sLnVzZVN0YXRlQm9vbGVhbih7XHJcbiAgICBuYW1lOiBcImhhc1NhdmVFcnJvclwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgIGluc3BlY3RvcjogXCJjaGVja2JveFwiLFxyXG4gICAgbGFiZWw6IFwiSGFzIFNhdmUgRXJyb3JcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG86IHt7ICEhc2F2ZUFsbG9jYXRpb25zLmVycm9yIH19XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtzYXZlZEF0XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNhdmVkQXRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJTYXZlZCBBdFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQmluZCB0bzoge3sgc2F2ZUFsbG9jYXRpb25zLmxhc3RSdW5BdCB9fVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbY2hhbmdlb3ZlckhvdXJzXSA9IFJldG9vbC51c2VTdGF0ZU51bWJlcih7XHJcbiAgICBuYW1lOiBcImNoYW5nZW92ZXJIb3Vyc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiAzLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkNoYW5nZW92ZXIgSG91cnNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkhvdXJzIGZvciBjaGFuZ2VvdmVyIGJldHdlZW4gdGVzdHMgKHdvcmsgaG91cnMgb25seSlcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW3dvcmtTdGFydF0gPSBSZXRvb2wudXNlU3RhdGVOdW1iZXIoe1xyXG4gICAgbmFtZTogXCJ3b3JrU3RhcnRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogOSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJXb3JrIFN0YXJ0IEhvdXJcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW3dvcmtFbmRdID0gUmV0b29sLnVzZVN0YXRlTnVtYmVyKHtcclxuICAgIG5hbWU6IFwid29ya0VuZFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiAxNyxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJXb3JrIEVuZCBIb3VyXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtpbml0aWFsVmlld1dlZWtzU3RyXSA9IFJldG9vbC51c2VTdGF0ZUVudW1lcmF0aW9uKHtcclxuICAgIG5hbWU6IFwiZGVmYXVsdFZpZXdXZWVrc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIjRcIixcclxuICAgIGVudW1EZWZpbml0aW9uOiBbXCIyXCIsIFwiNFwiLCBcIjhcIiwgXCIxMlwiLCBcIjI0XCJdLFxyXG4gICAgaW5zcGVjdG9yOiBcInNlZ21lbnRlZFwiLFxyXG4gICAgbGFiZWw6IFwiRGVmYXVsdCBWaWV3XCIsXHJcbiAgfSk7XHJcbiAgY29uc3QgaW5pdGlhbFZpZXdXZWVrcyA9IE51bWJlcihpbml0aWFsVmlld1dlZWtzU3RyKSB8fCA0O1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQ29uZmlndXJhYmxlIGRpc3BsYXkgdGVtcGxhdGVzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFtjYXJkTWFpblRleHRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY2FyZE1haW5UZXh0XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwie25hbWV9XCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiQ2FyZCBUaXRsZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiVGVtcGxhdGUgZm9yIGNhcmQgdGl0bGUuIFVzZSB7ZmllbGROYW1lfSBmb3IgZGF0YSBmaWVsZHMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtjYXJkU3ViVGV4dF0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjYXJkU3ViVGV4dFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlBhcnRzOiB7cGFydF9yZWFkeV9kYXRlfVwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkNhcmQgU3VidGl0bGVcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBsYXRlIGZvciBzdWJ0aXRsZS4gSGlkZGVuIHdoZW4gYWxsIGZpZWxkcyBhcmUgZW1wdHkuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtjYXJkSW5mb1Jvd10gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjYXJkSW5mb1Jvd1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIntvd25lcn0gXFx1MDBiNyB7ZHVyYXRpb259aCBcXHUwMGI3IFB7cHJpb3JpdHl9XCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiQ2FyZCBJbmZvIFJvd1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiVGVtcGxhdGUgZm9yIHRoZSBpbmZvIHJvdyBzaG93biBvbiBjYXJkcyBhbmQgYmFycy5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW3Rvb2x0aXBUZW1wbGF0ZV0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xuICAgIG5hbWU6IFwidG9vbHRpcFRlbXBsYXRlXCIsXG4gICAgaW5pdGlhbFZhbHVlOiBcIk5vdGVzOiB7bm90ZXN9XFxuT3duZXI6IHtvd25lcn1cXG5Qcmlvcml0eToge3ByaW9yaXR5fVxcblBhcnQgU3RhdHVzOiB7cGFydF9zdGF0dXN9XFxuUGFydHMgRHVlOiB7cGFydF9yZWFkeV9kYXRlfVxcblRlc3QgU3RhcnRlZDoge3Rlc3Rfc3RhcnRlZF9kYXRlfVwiLFxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXG4gICAgbGFiZWw6IFwiVG9vbHRpcCBUZW1wbGF0ZVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBsYXRlIGZvciBob3ZlciB0b29sdGlwLiBVc2UgXFxcXG4gZm9yIG5ld2xpbmVzLlwiLFxuICB9KTtcblxuICBjb25zdCBbYXNzaWduZWRQYXJ0c0xpbmtCYXNlVXJsXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XG4gICAgbmFtZTogXCJhc3NpZ25lZFBhcnRzTGlua0Jhc2VVcmxcIixcbiAgICBpbml0aWFsVmFsdWU6IFwiaHR0cHM6Ly9zdXBlcmNyaXRpY2Fsc29sdXRpb25zLnJldG9vbC5jb20vYXBwL21hcnZpbi9wYXJ0LW11bHRpLXdvI3NlcmlhbE5vPVwiLFxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXG4gICAgbGFiZWw6IFwiQXNzaWduZWQgUGFydHMgTGluayBCYXNlIFVSTFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFzc2lnbmVkIHBhcnRzIHJlbmRlciBiZWxvdyB0aGUgdG9vbHRpcCB0ZW1wbGF0ZSB1c2luZyB0aGlzIFVSTCBwcmVmaXggcGx1cyB0aGUgc2VyaWFsIG51bWJlci5cIixcbiAgfSk7XG5cbiAgY29uc3QgW2Fzc2lnbmVkUGFydHNUZW1wbGF0ZV0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xuICAgIG5hbWU6IFwiYXNzaWduZWRQYXJ0c1RlbXBsYXRlXCIsXG4gICAgaW5pdGlhbFZhbHVlOiBcInthc3NpZ25lZF9wYXJ0c31cIixcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxuICAgIGxhYmVsOiBcIkFzc2lnbmVkIFBhcnRzIFNvdXJjZVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkZpZWxkIG9yIHRlbXBsYXRlIHVzZWQgZm9yIHRoZSBhc3NpZ25lZC1wYXJ0cyBsaW5rcyBzZWN0aW9uLiBBY2NlcHRzIHthc3NpZ25lZF9wYXJ0c30gb3IgYXNzaWduZWRfcGFydHMuXCIsXG4gIH0pO1xuXHJcbiAgY29uc3QgW3N0YXR1c09wdGlvbnNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xuICAgIG5hbWU6IFwic3RhdHVzT3B0aW9uc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXCJOVUxMXCIsIFwiUnVubmluZ1wiLCBcIkNyZWF0ZWRcIiwgXCJUZXN0ZWRcIiwgXCJDYW5jZWxsZWRcIl0sXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiU3RhdHVzIE9wdGlvbnNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJTdGF0dXMgc3RyaW5ncyBzaG93biBpbiB0aGUgcmlnaHQtY2xpY2sgQ2hhbmdlIFN0YXR1cyBtZW51LiAnTlVMTCcgY2xlYXJzIHRoZSBzdGF0dXMuXCIsXG4gIH0pO1xuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFRoZW1lIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFthcHBUaGVtZV0gPSBSZXRvb2wudXNlU3RhdGVPYmplY3Qoe1xyXG4gICAgbmFtZTogXCJhcHBUaGVtZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiB7fSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJBcHAgVGhlbWVcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG8ge3sgdGhlbWUgfX0gdG8gaW5oZXJpdCBhcHAgY29sb3VycywgZm9udHMsIGFuZCBib3JkZXIgcmFkaXVzXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIE9wdGlvbmFsIHN0YXR1cyBjb2xvdXIgb3ZlcnJpZGVzIChsZWF2ZSBibGFuayB0byB1c2UgZGVmYXVsdHMpXHJcbiAgY29uc3QgW2NvbG9yUnVubmluZ10gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjb2xvclJ1bm5pbmdcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJSdW5uaW5nIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgUnVubmluZyBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjOTMzM0VBKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JSZWFkeV0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjb2xvclJlYWR5XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiUmVhZHkgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBSZWFkeSBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjMjJDNTVFKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JPblRpbWVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JPblRpbWVcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJPbiBUaW1lIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgT24gVGltZSBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjRTVBMDBEKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JEZWxheWVkXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNvbG9yRGVsYXllZFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkRlbGF5ZWQgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBEZWxheWVkIHN0YXR1cy4gTGVhdmUgYmxhbmsgdG8gdXNlIGRlZmF1bHQgKCNFRjQ0NDQpLlwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IFtjb2xvclBhcnRzTm90QXNzaWduZWRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JQYXJ0c05vdEFzc2lnbmVkXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiUGFydHMgTm90IEFzc2lnbmVkIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgUGFydHMgTm90IEFzc2lnbmVkIHN0YXR1cy4gTGVhdmUgYmxhbmsgdG8gdXNlIGRlZmF1bHQgKCM5Q0EzQUYpLlwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IFtjb2xvckluUHJvZ3Jlc3NdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JJblByb2dyZXNzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiSW4gUHJvZ3Jlc3MgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBJbiBQcm9ncmVzcyBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjRTVBMDBEKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbbW9ub0ZvbnRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwibW9ub0ZvbnRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJNb25vc3BhY2UgRm9udFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiRm9udCB1c2VkIGZvciBsYWJlbHMsIGJhZGdlcywgYW5kIHN0YXRzLiBMZWF2ZSBibGFuayB0byBpbmhlcml0IHRoZSBhcHAgdGhlbWUgZm9udC5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEJ1aWxkIHRoZW1lIHRva2VucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB0aGVtZSA9IHVzZU1lbW8oKCk6IFRoZW1lVG9rZW5zID0+IHtcclxuICAgIGNvbnN0IHN0YXR1c092ZXJyaWRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gICAgaWYgKGNvbG9yUnVubmluZykgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snUnVubmluZyddICAgICAgICAgICAgPSBjb2xvclJ1bm5pbmcgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yUmVhZHkpICAgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snUmVhZHknXSAgICAgICAgICAgICAgPSBjb2xvclJlYWR5IGFzIHN0cmluZztcclxuICAgIGlmIChjb2xvck9uVGltZSkgICAgICAgICAgICBzdGF0dXNPdmVycmlkZXNbJ09uIFRpbWUnXSAgICAgICAgICAgID0gY29sb3JPblRpbWUgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yRGVsYXllZCkgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snRGVsYXllZCddICAgICAgICAgICAgPSBjb2xvckRlbGF5ZWQgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yUGFydHNOb3RBc3NpZ25lZCkgIHN0YXR1c092ZXJyaWRlc1snUGFydHMgTm90IEFzc2lnbmVkJ10gPSBjb2xvclBhcnRzTm90QXNzaWduZWQgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9ySW5Qcm9ncmVzcykgICAgICAgIHN0YXR1c092ZXJyaWRlc1snSW4gUHJvZ3Jlc3MnXSAgICAgICAgPSBjb2xvckluUHJvZ3Jlc3MgYXMgc3RyaW5nO1xyXG4gICAgcmV0dXJuIGJ1aWxkVGhlbWUoYXBwVGhlbWUsIHN0YXR1c092ZXJyaWRlcywgbW9ub0ZvbnQgYXMgc3RyaW5nIHx8IHVuZGVmaW5lZCk7XHJcbiAgfSwgW2FwcFRoZW1lLCBjb2xvclJ1bm5pbmcsIGNvbG9yUmVhZHksIGNvbG9yT25UaW1lLCBjb2xvckRlbGF5ZWQsIGNvbG9yUGFydHNOb3RBc3NpZ25lZCwgY29sb3JJblByb2dyZXNzLCBtb25vRm9udF0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgT3V0cHV0IHN0YXRlIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFssIHNldEFsbG9jYXRpb25zXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwiYWxsb2NhdGlvbnNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJDdXJyZW50IGFsbG9jYXRpb24gc3RhdGU6IFt7dGVzdF9pZCwgdGVzdF9zdGFuZF9pZCwgcHJpb3JpdHlfb3JkZXJ9XVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRBbGxUZXN0SWRzXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwiYWxsVGVzdElkc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0ZXN0IElEcyBtYW5hZ2VkIGJ5IHRoZSBzY2hlZHVsZXIgKGZvciB0aGUgZGVsZXRlIHN0ZXAgaW4gc2F2ZSlcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0SGFzVW5zYXZlZENoYW5nZXNdID0gUmV0b29sLnVzZVN0YXRlQm9vbGVhbih7XHJcbiAgICBuYW1lOiBcImhhc1Vuc2F2ZWRDaGFuZ2VzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiV2hldGhlciB0aGVyZSBhcmUgdW5zYXZlZCBhbGxvY2F0aW9uIGNoYW5nZXNcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0SWRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwic2VsZWN0ZWRUZXN0SWRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIklEIG9mIHRlc3QgYWN0aW9uZWQgdmlhIHJpZ2h0LWNsaWNrIG1lbnUgKHNldCBiZWZvcmUgZXZlbnRzIGZpcmUpXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldFNlbGVjdGVkVGVzdFByaW9yaXR5XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdFByaW9yaXR5XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJOZXcgcHJpb3JpdHkgdmFsdWUgZnJvbSBDaGFuZ2UgUHJpb3JpdHkgYWN0aW9uIChudW1lcmljIHN0cmluZylcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0U3RhcnREYXRlXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdFN0YXJ0RGF0ZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTmV3IHN0YXJ0IGRhdGUgZnJvbSBDaGFuZ2UgU3RhcnQgRGF0ZSBhY3Rpb24gKElTTyBkYXRlIHN0cmluZyBZWVlZLU1NLUREKS4gT25seSBzZXQgZm9yIFJ1bm5pbmcgdGVzdHMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldFNlbGVjdGVkVGVzdEVuZERhdGVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwic2VsZWN0ZWRUZXN0RW5kRGF0ZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTmV3IGVuZCBkYXRlIGZyb20gQ2hhbmdlIEVuZCBEYXRlIGFjdGlvbiAoSVNPIGRhdGUgc3RyaW5nIFlZWVktTU0tREQpLiBPbmx5IHNldCBmb3IgUnVubmluZyB0ZXN0cy5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0U3RhdHVzXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdFN0YXR1c1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTmV3IHN0YXR1cyBmcm9tIENoYW5nZSBTdGF0dXMgYWN0aW9uLiBFbXB0eSBzdHJpbmcgPSBOVUxMIGluIERCLlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRQbGFubmVkRGF0ZXNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJwbGFubmVkRGF0ZXNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiB7dGVzdF9pZCwgcGxhbm5lZF9kYXRlfSBmb3IgYWxsIHN0YW5kLXNjaGVkdWxlZCB0ZXN0cy4gVXNlIHdpdGggc2F2ZVBsYW5uZWREYXRlcyBxdWVyeS5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEV2ZW50cyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBvblNhdmUgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25TYXZlXCIgfSk7XHJcbiAgY29uc3Qgb25DaGFuZ2UgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25DaGFuZ2VcIiB9KTtcclxuICBjb25zdCBvblJldHJ5ID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uUmV0cnlcIiB9KTtcclxuICBjb25zdCBvbkNoYW5nZVByaW9yaXR5ID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlUHJpb3JpdHlcIiB9KTtcclxuICBjb25zdCBvbkNoYW5nZVN0YXR1cyA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvbkNoYW5nZVN0YXR1c1wiIH0pO1xyXG4gIGNvbnN0IG9uQ2hhbmdlU3RhcnREYXRlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlU3RhcnREYXRlXCIgfSk7XHJcbiAgY29uc3Qgb25DaGFuZ2VFbmREYXRlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlRW5kRGF0ZVwiIH0pO1xyXG4gIGNvbnN0IG9uRWRpdFRlc3QgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25FZGl0VGVzdFwiIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQ29tcG9uZW50IHNldHRpbmdzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIFJldG9vbC51c2VDb21wb25lbnRTZXR0aW5ncyh7XHJcbiAgICBkZWZhdWx0SGVpZ2h0OiA2MDAsXHJcbiAgICBkZWZhdWx0V2lkdGg6IDEyLFxyXG4gIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgSW50ZXJuYWwgc3RhdGUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW3N0YW5kcywgc2V0U3RhbmRzXSA9IFJlYWN0LnVzZVN0YXRlPEludGVybmFsU3RhbmRbXT4oW10pO1xyXG4gIGNvbnN0IFt1bmFsbG9jYXRlZCwgc2V0VW5hbGxvY2F0ZWRdID0gUmVhY3QudXNlU3RhdGU8VGVzdERhdGFbXT4oW10pO1xyXG4gIGNvbnN0IFt2aWV3cG9ydFdlZWtzLCBzZXRWaWV3cG9ydFdlZWtzXSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oaW5pdGlhbFZpZXdXZWVrcyB8fCA0KTtcclxuICBjb25zdCB1c2VyQ2hhbmdlZFZpZXdwb3J0ID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgd2Vla3MgPSBOdW1iZXIoaW5pdGlhbFZpZXdXZWVrc1N0cik7XHJcbiAgICBpZiAod2Vla3MgJiYgIXVzZXJDaGFuZ2VkVmlld3BvcnQuY3VycmVudCkgc2V0Vmlld3BvcnRXZWVrcyh3ZWVrcyk7XHJcbiAgfSwgW2luaXRpYWxWaWV3V2Vla3NTdHJdKTtcclxuICBjb25zdCBbZHJhZ2dlZFRlc3RJZCwgc2V0RHJhZ2dlZFRlc3RJZF0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmcgfCBudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaW5zZXJ0SW5kaWNhdG9yLCBzZXRJbnNlcnRJbmRpY2F0b3JdID0gUmVhY3QudXNlU3RhdGU8SW5zZXJ0SW5kaWNhdG9yIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3F1ZXVlSW5zZXJ0SW5kZXgsIHNldFF1ZXVlSW5zZXJ0SW5kZXhdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2lzRGlydHksIHNldElzRGlydHldID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwZW5kaW5nU2F2ZSwgc2V0UGVuZGluZ1NhdmVdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2F2ZUVycm9yLCBzZXRTYXZlRXJyb3JdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcG9wb3Zlciwgc2V0UG9wb3Zlcl0gPSBSZWFjdC51c2VTdGF0ZTxQb3BvdmVyU3RhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2VkaXRvclBvcG92ZXIsIHNldEVkaXRvclBvcG92ZXJdID0gUmVhY3QudXNlU3RhdGU8RWRpdG9yUG9wb3ZlclN0YXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtwcmlvcml0eUlucHV0VmFsdWUsIHNldFByaW9yaXR5SW5wdXRWYWx1ZV0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW3N0YXJ0RGF0ZUlucHV0VmFsdWUsIHNldFN0YXJ0RGF0ZUlucHV0VmFsdWVdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPignJyk7XG4gIGNvbnN0IFtlbmREYXRlSW5wdXRWYWx1ZSwgc2V0RW5kRGF0ZUlucHV0VmFsdWVdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPignJyk7XG4gIGNvbnN0IFtwZW5kaW5nU3RhdHVzQ2hhbmdlLCBzZXRQZW5kaW5nU3RhdHVzQ2hhbmdlXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwb3BvdmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgZWRpdG9yUG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gIGNvbnN0IGN1cnJlbnRTYXZlTW9kZSA9ICgoc2F2ZU1vZGUgYXMgc3RyaW5nKSA9PT0gJ2xpdmUnID8gJ2xpdmUnIDogJ2JhdGNoJykgYXMgJ2JhdGNoJyB8ICdsaXZlJztcbiAgY29uc3QgaXNMb2NrZWQgPSBwZW5kaW5nU2F2ZSB8fCAoaXNTYXZpbmcgYXMgYm9vbGVhbikgfHwgc2F2ZUVycm9yO1xuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChpc1NhdmluZyBhcyBib29sZWFuKSB7XHJcbiAgICAgIHNldFBlbmRpbmdTYXZlKGZhbHNlKTsgLy8gUmV0b29sIGhhcyBwaWNrZWQgdXAgdGhlIHNhdmU7IGRyb3Agb3VyIGxvY2FsIHBlbmRpbmcgZmxhZ1xyXG4gICAgfVxyXG4gICAgaWYgKGhhc1NhdmVFcnJvciBhcyBib29sZWFuKSB7XHJcbiAgICAgIHNldFBlbmRpbmdTYXZlKGZhbHNlKTtcclxuICAgICAgc2V0U2F2ZUVycm9yKHRydWUpO1xyXG4gICAgfSBlbHNlIGlmICghKGlzU2F2aW5nIGFzIGJvb2xlYW4pKSB7XHJcbiAgICAgIC8vIE5vdCBzYXZpbmcgYW5kIG5vIGVycm9yID0gaWRsZTsgY2xlYXIgZXJyb3IgKGNvdmVycyByZWNvdmVyeSBhZnRlciByZXRyeSlcclxuICAgICAgc2V0U2F2ZUVycm9yKGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbaXNTYXZpbmcsIGhhc1NhdmVFcnJvcl0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcG9wb3ZlciAmJiAhZWRpdG9yUG9wb3ZlcikgcmV0dXJuO1xuICAgIGNvbnN0IG9uTW91c2VEb3duID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIE5vZGU7XG4gICAgICBjb25zdCBpbnNpZGVNYWluID0gcG9wb3ZlclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpID8/IGZhbHNlO1xuICAgICAgY29uc3QgaW5zaWRlRWRpdG9yID0gZWRpdG9yUG9wb3ZlclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpID8/IGZhbHNlO1xuICAgICAgaWYgKCFpbnNpZGVNYWluICYmICFpbnNpZGVFZGl0b3IpIHtcbiAgICAgICAgc2V0UG9wb3ZlcihudWxsKTtcbiAgICAgICAgc2V0RWRpdG9yUG9wb3ZlcihudWxsKTtcbiAgICAgICAgc2V0UGVuZGluZ1N0YXR1c0NoYW5nZShudWxsKTtcbiAgICAgICAgc2V0U3RhcnREYXRlSW5wdXRWYWx1ZSgnJyk7XG4gICAgICAgIHNldEVuZERhdGVJbnB1dFZhbHVlKCcnKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG9uS2V5RG93biA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBpZiAoZS5rZXkgIT09ICdFc2NhcGUnKSByZXR1cm47XG4gICAgICBpZiAoZWRpdG9yUG9wb3Zlcikge1xuICAgICAgICBzZXRFZGl0b3JQb3BvdmVyKG51bGwpO1xuICAgICAgICBzZXRQZW5kaW5nU3RhdHVzQ2hhbmdlKG51bGwpO1xuICAgICAgICBzZXRTdGFydERhdGVJbnB1dFZhbHVlKCcnKTtcbiAgICAgICAgc2V0RW5kRGF0ZUlucHV0VmFsdWUoJycpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRQb3BvdmVyKG51bGwpO1xuICAgIH07XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xyXG4gICAgfTtcclxuICB9LCBbcG9wb3ZlciwgZWRpdG9yUG9wb3Zlcl0pO1xuXHJcbiAgY29uc3Qgb3JpZ2luYWxBbGxvY2F0aW9uc1JlZiA9IHVzZVJlZjxzdHJpbmc+KCcnKTtcclxuICBjb25zdCBwcmV2U2F2ZWRBdFJlZiA9IFJlYWN0LnVzZVJlZjxzdHJpbmc+KFwiXCIpO1xyXG4gIGNvbnN0IHNjcm9sbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbCA9IHNjcm9sbFJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgY29uc3Qgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZW50cmllcyA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xyXG4gICAgICAgIHNldENvbnRhaW5lcldpZHRoKGVudHJ5LmNvbnRlbnRSZWN0LndpZHRoIHx8IDgwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcm8ub2JzZXJ2ZShlbCk7XHJcbiAgICByZXR1cm4gKCkgPT4gcm8uZGlzY29ubmVjdCgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gT3B0aW1pc3RpYyBzYXZlOiB3aGVuIHNhdmVkQXQgY2hhbmdlcyB0aGUgREIgd3JpdGUgc3VjY2VlZGVkIFx1MjAxNCBzbmFwc2hvdCB0aGVcclxuICAvLyBjdXJyZW50IHN0YXRlIGFzIHRoZSBuZXcgYmFzZWxpbmUgd2l0aG91dCB3YWl0aW5nIGZvciBhIGdldFNjaGVkdWxlckRhdGEgcmUtZmV0Y2guXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHRzID0gc2F2ZWRBdCBhcyBzdHJpbmc7XHJcbiAgICBpZiAoIXRzIHx8IHRzID09PSBwcmV2U2F2ZWRBdFJlZi5jdXJyZW50KSByZXR1cm47IC8vIHNraXAgaW5pdGlhbCBtb3VudCArIGR1cGxpY2F0ZXNcclxuICAgIHByZXZTYXZlZEF0UmVmLmN1cnJlbnQgPSB0cztcclxuICAgIC8vIFNuYXBzaG90IGN1cnJlbnQgYWxsb2NhdGlvbnMgYXMgdGhlIG5ldyBcIm9yaWdpbmFsXCIgc28gZGlydHktY2hlY2sgcmVzZXRzIGNvcnJlY3RseVxyXG4gICAgY29uc3QgY3VycmVudEFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMoc3RhbmRzKTtcclxuICAgIG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudCA9IGFsbG9jYXRpb25zS2V5KGN1cnJlbnRBbGxvY3MpO1xyXG4gICAgc2V0SXNEaXJ0eShmYWxzZSk7XHJcbiAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7XHJcbiAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gIH0sIFtzYXZlZEF0LCBzdGFuZHNdKTtcclxuICBjb25zdCBbY29udGFpbmVyV2lkdGgsIHNldENvbnRhaW5lcldpZHRoXSA9IFJlYWN0LnVzZVN0YXRlKDgwMCk7XHJcbiAgY29uc3QgW3F1ZXVlU29ydCwgc2V0UXVldWVTb3J0XSA9IFJlYWN0LnVzZVN0YXRlPCdheicgfCAncHJpb3JpdHknIHwgJ3N0YXR1cyc+KCdheicpO1xyXG4gIGNvbnN0IFtxdWV1ZUZpbHRlciwgc2V0UXVldWVGaWx0ZXJdID0gUmVhY3QudXNlU3RhdGUoJycpO1xyXG5cclxuICBjb25zdCBzdGF0dXNPcHRpb25zTGlzdCA9IHVzZU1lbW88c3RyaW5nW10+KCgpID0+IHtcclxuICAgIGNvbnN0IGFyciA9IEFycmF5LmlzQXJyYXkoc3RhdHVzT3B0aW9ucykgPyBzdGF0dXNPcHRpb25zIGFzIGFueVtdIDogW107XHJcbiAgICByZXR1cm4gYXJyLmxlbmd0aCA+IDAgPyBhcnIubWFwKFN0cmluZykgOiBbXCJOVUxMXCIsIFwiUnVubmluZ1wiLCBcIkNyZWF0ZWRcIiwgXCJUZXN0ZWRcIiwgXCJDYW5jZWxsZWRcIl07XHJcbiAgfSwgW3N0YXR1c09wdGlvbnNdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEluaXRpYWxpemUgZnJvbSBpbnB1dCBkYXRhIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGlucHV0S2V5ID0gdXNlTWVtbyhcclxuICAgICgpID0+IEpTT04uc3RyaW5naWZ5KGlucHV0VGVzdHMpICsgSlNPTi5zdHJpbmdpZnkoaW5wdXRTdGFuZHMpICsgSlNPTi5zdHJpbmdpZnkoaW5wdXROb25Xb3JraW5nKSxcclxuICAgIFtpbnB1dFRlc3RzLCBpbnB1dFN0YW5kcywgaW5wdXROb25Xb3JraW5nXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB0ZXN0c0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRUZXN0cykgPyBpbnB1dFRlc3RzIDogW107XHJcbiAgICBjb25zdCBzdGFuZHNBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0U3RhbmRzKSA/IChpbnB1dFN0YW5kcyBhcyBTdGFuZERlZltdKSA6IFtdO1xyXG4gICAgY29uc3Qgbm9uV29ya2luZ0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXROb25Xb3JraW5nKSA/IGlucHV0Tm9uV29ya2luZyA6IFtdO1xyXG5cclxuICAgIGlmIChzdGFuZHNBcnIubGVuZ3RoID09PSAwICYmIHRlc3RzQXJyLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgc3RhbmRzOiBuZXdTdGFuZHMsIHVuYWxsb2NhdGVkOiB1bmFsbG9jIH0gPSBwYXJzZVN0YW5kcyh0ZXN0c0Fyciwgc3RhbmRzQXJyLCBjaEhvdXJzLCBub25Xb3JraW5nQXJyKTtcclxuICAgIHNldFN0YW5kcyhuZXdTdGFuZHMpO1xyXG4gICAgc2V0VW5hbGxvY2F0ZWQodW5hbGxvYyk7XHJcbiAgICBzZXRJc0RpcnR5KGZhbHNlKTtcclxuXHJcbiAgICAvLyBTbmFwc2hvdCB0aGUgaW5pdGlhbCBhbGxvY2F0aW9uc1xyXG4gICAgY29uc3QgaW5pdGlhbEFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKTtcclxuICAgIG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudCA9IGFsbG9jYXRpb25zS2V5KGluaXRpYWxBbGxvY3MpO1xyXG5cclxuICAgIC8vIFNldCBvdXRwdXQgc3RhdGVcclxuICAgIHNldEFsbG9jYXRpb25zKGluaXRpYWxBbGxvY3MpO1xyXG4gICAgc2V0QWxsVGVzdElkcyh0ZXN0c0Fyci5tYXAoKHQ6IGFueSkgPT4gdC5pZCkpO1xyXG4gICAgc2V0SGFzVW5zYXZlZENoYW5nZXMoZmFsc2UpO1xyXG5cclxuICAgIC8vIENsZWFyIHNhdmUgbG9jayBcdTIwMTQgbmV3IGRhdGEgYXJyaXZpbmcgZnJvbSBSZXRvb2wgbWVhbnMgdGhlIHNhdmUgcm91bmQtdHJpcCBjb21wbGV0ZWQuXHJcbiAgICAvLyBUaGlzIGlzIG1vcmUgcmVsaWFibGUgdGhhbiB3YWl0aW5nIGZvciB0aGUgc2F2ZVN0YXRlIGJpbmRpbmcgdG8gdHJhbnNpdGlvbiB0aHJvdWdoXHJcbiAgICAvLyAnc2F2aW5nJyBcdTIxOTIgJ2lkbGUnLCB3aGljaCBSZXRvb2wgY2FuIGJhdGNoIGF3YXkgc28gdGhlIHVzZUVmZmVjdCBuZXZlciBmaXJlcy5cclxuICAgIHNldFBlbmRpbmdTYXZlKGZhbHNlKTtcclxuICAgIHNldFNhdmVFcnJvcihmYWxzZSk7XHJcbiAgfSwgW2lucHV0S2V5XSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBTY2hlZHVsaW5nIGNvbmZpZyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBjaEhvdXJzID0gKGNoYW5nZW92ZXJIb3VycyBhcyBudW1iZXIpIHx8IDM7XHJcbiAgY29uc3Qgd1N0YXJ0ID0gKHdvcmtTdGFydCBhcyBudW1iZXIpIHx8IDk7XHJcbiAgY29uc3Qgd0VuZCA9ICh3b3JrRW5kIGFzIG51bWJlcikgfHwgMTc7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBWaWV3IGNvbXB1dGF0aW9ucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB2aWV3U3RhcnQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZC5zZXRIb3VycygwLCAwLCAwLCAwKTtcclxuICAgIHdoaWxlIChkLmdldERheSgpICE9PSAxKSBkLnNldERhdGUoZC5nZXREYXRlKCkgLSAxKTtcclxuICAgIHJldHVybiBkO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFNjaGVkdWxlIGNvbXB1dGF0aW9uIChtdXN0IGJlIGRlZmluZWQgYmVmb3JlIHRpbWVsaW5lRW5kKSBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBjb21wdXRlU2NoZWR1bGUgPSB1c2VDYWxsYmFjaygodGVzdHM6IFRlc3REYXRhW10sIHN0YW5kQ2hhbmdlb3ZlcjogbnVtYmVyLCBub25Xb3JraW5nQmxvY2tzOiBOb25Xb3JraW5nQmxvY2tbXSk6IFNjaGVkdWxlZFRlc3RbXSA9PiB7XHJcbiAgICBjb25zdCBydW5uaW5nVGVzdHMgPSB0ZXN0cy5maWx0ZXIodCA9PiBpc1J1bm5pbmdUZXN0KHQpKTtcclxuICAgIGNvbnN0IHF1ZXVlZFRlc3RzID0gdGVzdHMuZmlsdGVyKHQgPT4gIWlzUnVubmluZ1Rlc3QodCkpO1xyXG5cclxuICAgIC8vIFNvcnQgUnVubmluZyB0ZXN0cyBieSBhY3R1YWwgc3RhcnQgZGF0ZSwgdGhlbiBwcmlvcml0eSBkZXNjIGZvciB0aWVzXHJcbiAgICBjb25zdCBzb3J0ZWRSdW5uaW5nID0gWy4uLnJ1bm5pbmdUZXN0c10uc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCBkYXRlQSA9IHBhcnNlTG9jYWxEYXRlKGEudGVzdF9zdGFydGVkX2RhdGUpIHx8IG5ldyBEYXRlKCk7XHJcbiAgICAgIGNvbnN0IGRhdGVCID0gcGFyc2VMb2NhbERhdGUoYi50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgbmV3IERhdGUoKTtcclxuICAgICAgaWYgKGRhdGVBLmdldFRpbWUoKSAhPT0gZGF0ZUIuZ2V0VGltZSgpKSByZXR1cm4gZGF0ZUEuZ2V0VGltZSgpIC0gZGF0ZUIuZ2V0VGltZSgpO1xyXG4gICAgICByZXR1cm4gKGIucHJpb3JpdHkgPz8gNTApIC0gKGEucHJpb3JpdHkgPz8gNTApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUnVubmluZyB0ZXN0cyB1c2UgdGhlaXIgYWN0dWFsIHRlc3Rfc3RhcnRlZF9kYXRlLiBPbmx5IGxhdGVyIFJ1bm5pbmcgdGVzdHMgYXJlXG4gICAgLy8gcHVzaGVkIGZvcndhcmQgdG8gYXZvaWQgb3ZlcmxhcDsgdGhlIGZpcnN0IG9uZSBzaG91bGQgbm90IGJlIGNsYW1wZWQgdG8gdmlld1N0YXJ0LlxuICAgIGxldCBsYXN0UnVubmluZ0VuZDogRGF0ZSB8IG51bGwgPSBudWxsO1xuICAgIGNvbnN0IHJ1bm5pbmdTY2hlZHVsZWQgPSBzb3J0ZWRSdW5uaW5nLm1hcCh0ZXN0ID0+IHtcbiAgICAgIGNvbnN0IHRlc3REYXRlID0gcGFyc2VMb2NhbERhdGUodGVzdC50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgbmV3IERhdGUodmlld1N0YXJ0KTtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gbGFzdFJ1bm5pbmdFbmQgJiYgdGVzdERhdGUgPCBsYXN0UnVubmluZ0VuZCA/IG5ldyBEYXRlKGxhc3RSdW5uaW5nRW5kKSA6IG5ldyBEYXRlKHRlc3REYXRlKTtcbiAgICAgIGNvbnN0IGR1cmF0aW9uRW5kID0gbmV3IERhdGUoc3RhcnQuZ2V0VGltZSgpICsgdGVzdC5kdXJhdGlvbiAqIE1TX1BFUl9IT1VSKTtcbiAgICAgIGNvbnN0IGVuZCA9IGR1cmF0aW9uRW5kIDwgbmV3IERhdGUoKSA/IG5ldyBEYXRlKCkgOiBkdXJhdGlvbkVuZDtcbiAgICAgIGxhc3RSdW5uaW5nRW5kID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChlbmQsIHN0YW5kQ2hhbmdlb3Zlciwgd1N0YXJ0LCB3RW5kKTtcbiAgICAgIHJldHVybiB7IC4uLnRlc3QsIHN0YXJ0LCBlbmQgfTtcbiAgICB9KTtcblxyXG4gICAgLy8gUXVldWVkIHRlc3RzIHN0YXJ0IGFmdGVyIGxhc3QgUnVubmluZyB0ZXN0J3MgY2hhbmdlb3ZlciAob3Igbm93K2NoYW5nZW92ZXIsIHdoaWNoZXZlciBpcyBsYXRlcikuXHJcbiAgICAvLyBXZSBuZXZlciBzY2hlZHVsZSBhIHBsYW5uZWQgdGVzdCB0byBzdGFydCBpbiB0aGUgcGFzdC5cclxuICAgIC8vIGZpbmRWYWxpZFN0YXJ0IHB1c2hlcyB0aGUgc3RhcnQgZm9yd2FyZCB1bnRpbCB0aGUgZnVsbCBbc3RhcnQsIHN0YXJ0K2R1cmF0aW9uKSB3aW5kb3dcclxuICAgIC8vIGRvZXNuJ3Qgb3ZlcmxhcCBhbnkgbm9uLXdvcmtpbmcgYmxvY2sgKGNvdmVycyBib3RoIHN0YXJ0LWluc2lkZSBhbmQgZW5kLWluc2lkZSBjYXNlcykuXHJcbiAgICBjb25zdCBub3dQbHVzQ2hhbmdlb3ZlciA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQobmV3IERhdGUoKSwgc3RhbmRDaGFuZ2VvdmVyLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgbGV0IGN1cnJlbnRFbmQgPSBuZXcgRGF0ZShNYXRoLm1heCgobGFzdFJ1bm5pbmdFbmQgPz8gdmlld1N0YXJ0KS5nZXRUaW1lKCksIG5vd1BsdXNDaGFuZ2VvdmVyLmdldFRpbWUoKSkpO1xuICAgIGNvbnN0IHF1ZXVlZFNjaGVkdWxlZCA9IHF1ZXVlZFRlc3RzLm1hcCh0ZXN0ID0+IHtcclxuICAgICAgY29uc3Qgc3RhcnQgPSBmaW5kVmFsaWRTdGFydChuZXcgRGF0ZShjdXJyZW50RW5kKSwgdGVzdC5kdXJhdGlvbiwgbm9uV29ya2luZ0Jsb2Nrcyk7XHJcbiAgICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHN0YXJ0LmdldFRpbWUoKSArIHRlc3QuZHVyYXRpb24gKiBNU19QRVJfSE9VUik7XHJcbiAgICAgIGN1cnJlbnRFbmQgPSBhZHZhbmNlUGFzdE5vbldvcmtpbmcoXHJcbiAgICAgICAgY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChlbmQsIHN0YW5kQ2hhbmdlb3Zlciwgd1N0YXJ0LCB3RW5kKSxcclxuICAgICAgICBub25Xb3JraW5nQmxvY2tzXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiB7IC4uLnRlc3QsIHN0YXJ0LCBlbmQgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBbLi4ucnVubmluZ1NjaGVkdWxlZCwgLi4ucXVldWVkU2NoZWR1bGVkXTtcclxuICB9LCBbdmlld1N0YXJ0LCB3U3RhcnQsIHdFbmRdKTtcclxuXHJcbiAgY29uc3Qgc3RhbmRTY2hlZHVsZXMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gbmV3IE1hcChzdGFuZHMubWFwKHMgPT4gW3MuaWQsIGNvbXB1dGVTY2hlZHVsZShzLnRlc3RzLCBzLmNoYW5nZW92ZXJfaG91cnMsIHMubm9uV29ya2luZ0Jsb2NrcyldKSksXHJcbiAgICBbc3RhbmRzLCBjb21wdXRlU2NoZWR1bGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdGltZWxpbmVFbmQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGxldCBsYXRlc3RFbmQgPSBuZXcgRGF0ZSh2aWV3U3RhcnQpO1xyXG4gICAgbGF0ZXN0RW5kLnNldERhdGUobGF0ZXN0RW5kLmdldERhdGUoKSArIHZpZXdwb3J0V2Vla3MgKiA3KTtcclxuXHJcbiAgICBzdGFuZHMuZm9yRWFjaChzdGFuZCA9PiB7XHJcbiAgICAgIGNvbnN0IHNjaGVkdWxlID0gc3RhbmRTY2hlZHVsZXMuZ2V0KHN0YW5kLmlkKSA/PyBbXTtcclxuICAgICAgaWYgKHNjaGVkdWxlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBsYXN0ID0gc2NoZWR1bGVbc2NoZWR1bGUubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgY29uc3QgY2hhbmdlb3ZlckVuZCA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQobGFzdC5lbmQsIHN0YW5kLmNoYW5nZW92ZXJfaG91cnMsIHdTdGFydCwgd0VuZCk7XHJcbiAgICAgICAgaWYgKGNoYW5nZW92ZXJFbmQgPiBsYXRlc3RFbmQpIGxhdGVzdEVuZCA9IGNoYW5nZW92ZXJFbmQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxhdGVzdEVuZC5zZXREYXRlKGxhdGVzdEVuZC5nZXREYXRlKCkgKyA3KTtcclxuICAgIHJldHVybiBsYXRlc3RFbmQ7XHJcbiAgfSwgW3N0YW5kU2NoZWR1bGVzLCBzdGFuZHMsIHZpZXdTdGFydCwgdmlld3BvcnRXZWVrcywgd1N0YXJ0LCB3RW5kXSk7XHJcblxyXG4gIGNvbnN0IHRvdGFsRGF5cyA9IHVzZU1lbW8oKCkgPT4gTWF0aC5jZWlsKGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIHRpbWVsaW5lRW5kKSAvIDI0KSwgW3ZpZXdTdGFydCwgdGltZWxpbmVFbmRdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFBsYW5uZWQgZGF0ZXMgZm9yIHNjaGVkdWxlZCB0ZXN0cyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBzY2hlZHVsZWRQbGFubmVkRGF0ZXMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdDogQXJyYXk8eyB0ZXN0X2lkOiBudW1iZXIgfCBzdHJpbmc7IHBsYW5uZWRfZGF0ZTogc3RyaW5nIH0+ID0gW107XHJcbiAgICBzdGFuZHMuZm9yRWFjaChzdGFuZCA9PiB7XHJcbiAgICAgIGNvbnN0IHNjaGVkdWxlID0gc3RhbmRTY2hlZHVsZXMuZ2V0KHN0YW5kLmlkKSA/PyBbXTtcclxuICAgICAgc2NoZWR1bGUuZm9yRWFjaChzdCA9PiB7XHJcbiAgICAgICAgY29uc3QgZCA9IHN0LnN0YXJ0O1xyXG4gICAgICAgIGNvbnN0IGRhdGVTdHIgPSBgJHtkLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyl9LSR7U3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpfWA7XHJcbiAgICAgICAgcmVzdWx0LnB1c2goeyB0ZXN0X2lkOiBzdC5pZCwgcGxhbm5lZF9kYXRlOiBkYXRlU3RyIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9LCBbc3RhbmRzLCBzdGFuZFNjaGVkdWxlc10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0UGxhbm5lZERhdGVzKHNjaGVkdWxlZFBsYW5uZWREYXRlcyk7XHJcbiAgfSwgW3NjaGVkdWxlZFBsYW5uZWREYXRlc10pO1xyXG5cclxuICBjb25zdCBweFBlckhvdXIgPSBjb250YWluZXJXaWR0aCAvICh2aWV3cG9ydFdlZWtzICogNyAqIDI0KTtcclxuICBjb25zdCBkYXlzID0gdXNlTWVtbygoKSA9PiBnZW5lcmF0ZURheXModmlld1N0YXJ0LCB0b3RhbERheXMpLCBbdmlld1N0YXJ0LCB0b3RhbERheXNdKTtcclxuICBjb25zdCB3ZWVrcyA9IHVzZU1lbW8oKCkgPT4gZ2VuZXJhdGVXZWVrcyh2aWV3U3RhcnQsIHRvdGFsRGF5cyksIFt2aWV3U3RhcnQsIHRvdGFsRGF5c10pO1xyXG4gIGNvbnN0IHRvdGFsV2lkdGggPSB0b3RhbERheXMgKiAyNCAqIHB4UGVySG91cjtcclxuICBjb25zdCBkYXlXaWR0aCA9IDI0ICogcHhQZXJIb3VyO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQWZ0ZXItY2hhbmdlIGhhbmRsZXIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgYWZ0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjaygobmV3U3RhbmRzOiBJbnRlcm5hbFN0YW5kW10pID0+IHtcclxuICAgIGNvbnN0IGFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKTtcclxuICAgIGNvbnN0IGRpcnR5ID0gYWxsb2NhdGlvbnNLZXkoYWxsb2NzKSAhPT0gb3JpZ2luYWxBbGxvY2F0aW9uc1JlZi5jdXJyZW50O1xyXG4gICAgc2V0SXNEaXJ0eShkaXJ0eSk7XHJcbiAgICBzZXRBbGxvY2F0aW9ucyhhbGxvY3MpO1xyXG4gICAgc2V0SGFzVW5zYXZlZENoYW5nZXMoZGlydHkpO1xyXG5cclxuICAgIGlmIChjdXJyZW50U2F2ZU1vZGUgPT09ICdsaXZlJykge1xuICAgICAgc2V0UGVuZGluZ1NhdmUodHJ1ZSk7XG4gICAgICBvbkNoYW5nZSgpO1xuICAgIH1cbiAgfSwgW2N1cnJlbnRTYXZlTW9kZSwgc2V0QWxsb2NhdGlvbnMsIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzLCBvbkNoYW5nZV0pO1xuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIERyYWcgYW5kIGRyb3AgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgZmluZFRlc3QgPSB1c2VDYWxsYmFjaygodGVzdElkOiBzdHJpbmcgfCBudW1iZXIpOiBUZXN0RGF0YSB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgcSA9IHVuYWxsb2NhdGVkLmZpbmQodCA9PiB0LmlkID09PSB0ZXN0SWQpO1xyXG4gICAgaWYgKHEpIHJldHVybiBxO1xyXG4gICAgZm9yIChjb25zdCBzIG9mIHN0YW5kcykge1xyXG4gICAgICBjb25zdCB0ID0gcy50ZXN0cy5maW5kKHQgPT4gdC5pZCA9PT0gdGVzdElkKTtcclxuICAgICAgaWYgKHQpIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSwgW3VuYWxsb2NhdGVkLCBzdGFuZHNdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJEcmFnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0RHJhZ2dlZFRlc3RJZChudWxsKTtcclxuICAgIHNldEluc2VydEluZGljYXRvcihudWxsKTtcclxuICAgIHNldFF1ZXVlSW5zZXJ0SW5kZXgobnVsbCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBkcm9wT25TdGFuZCA9IHVzZUNhbGxiYWNrKChzdGFuZElkOiBzdHJpbmcgfCBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIGlmICghZHJhZ2dlZFRlc3RJZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgdGVzdCA9IGZpbmRUZXN0KGRyYWdnZWRUZXN0SWQpO1xyXG4gICAgaWYgKCF0ZXN0KSByZXR1cm47XHJcblxyXG4gICAgLy8gUmVtb3ZlIGZyb20gdW5hbGxvY2F0ZWRcclxuICAgIHNldFVuYWxsb2NhdGVkKHByZXYgPT4gcHJldi5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGZyb20gYWxsIHN0YW5kcyBhbmQgaW5zZXJ0IGF0IHRhcmdldFxyXG4gICAgY29uc3QgbmV3U3RhbmRzID0gc3RhbmRzLm1hcChzID0+IHtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxJbmRleCA9IHMudGVzdHMuZmluZEluZGV4KHQgPT4gdC5pZCA9PT0gZHJhZ2dlZFRlc3RJZCk7XHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkID0gcy50ZXN0cy5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKTtcclxuICAgICAgaWYgKHMuaWQgPT09IHN0YW5kSWQpIHtcclxuICAgICAgICAvLyBBZGp1c3QgaW5kZXggaWYgdGhlIGRyYWdnZWQgdGVzdCB3YXMgb3JpZ2luYWxseSBpbiB0aGlzIHN0YW5kIGJlZm9yZSB0aGUgZHJvcCBwb3NpdGlvblxyXG4gICAgICAgIGNvbnN0IGFkanVzdGVkSW5kZXggPSAob3JpZ2luYWxJbmRleCAhPT0gLTEgJiYgb3JpZ2luYWxJbmRleCA8IGluZGV4KSA/IGluZGV4IC0gMSA6IGluZGV4O1xyXG4gICAgICAgIGNvbnN0IG5ld1Rlc3RzID0gWy4uLmZpbHRlcmVkXTtcclxuICAgICAgICBuZXdUZXN0cy5zcGxpY2UoYWRqdXN0ZWRJbmRleCwgMCwgdGVzdCk7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4ucywgdGVzdHM6IG5ld1Rlc3RzIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHsgLi4ucywgdGVzdHM6IGZpbHRlcmVkIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIGFmdGVyQ2hhbmdlKG5ld1N0YW5kcyk7XHJcbiAgICBjbGVhckRyYWcoKTtcclxuICB9LCBbZHJhZ2dlZFRlc3RJZCwgZmluZFRlc3QsIHN0YW5kcywgYWZ0ZXJDaGFuZ2UsIGNsZWFyRHJhZ10pO1xyXG5cclxuICBjb25zdCBkcm9wT25RdWV1ZSA9IHVzZUNhbGxiYWNrKChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICBpZiAoIWRyYWdnZWRUZXN0SWQpIHJldHVybjtcclxuICAgIGNvbnN0IHRlc3QgPSBmaW5kVGVzdChkcmFnZ2VkVGVzdElkKTtcclxuICAgIGlmICghdGVzdCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFJlbW92ZSBmcm9tIHN0YW5kc1xyXG4gICAgY29uc3QgbmV3U3RhbmRzID0gc3RhbmRzLm1hcChzID0+ICh7XHJcbiAgICAgIC4uLnMsXHJcbiAgICAgIHRlc3RzOiBzLnRlc3RzLmZpbHRlcih0ID0+IHQuaWQgIT09IGRyYWdnZWRUZXN0SWQpLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIEFkZCB0byB1bmFsbG9jYXRlZFxyXG4gICAgc2V0VW5hbGxvY2F0ZWQocHJldiA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkID0gcHJldi5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKTtcclxuICAgICAgY29uc3QgbmV4dCA9IFsuLi5maWx0ZXJlZF07XHJcbiAgICAgIG5leHQuc3BsaWNlKGluZGV4LCAwLCB0ZXN0KTtcclxuICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIGFmdGVyQ2hhbmdlKG5ld1N0YW5kcyk7XHJcbiAgICBjbGVhckRyYWcoKTtcclxuICB9LCBbZHJhZ2dlZFRlc3RJZCwgZmluZFRlc3QsIHN0YW5kcywgYWZ0ZXJDaGFuZ2UsIGNsZWFyRHJhZ10pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgU2F2ZSAvIERpc2NhcmQgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgaGFuZGxlU2F2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRQZW5kaW5nU2F2ZSh0cnVlKTtcbiAgICBvblNhdmUoKTtcbiAgfSwgW29uU2F2ZV0pO1xuXG4gIGNvbnN0IGhhbmRsZVNhdmVNb2RlQ2hhbmdlID0gdXNlQ2FsbGJhY2soKG5leHRNb2RlOiAnYmF0Y2gnIHwgJ2xpdmUnKSA9PiB7XG4gICAgaWYgKG5leHRNb2RlID09PSBjdXJyZW50U2F2ZU1vZGUgfHwgaXNMb2NrZWQpIHJldHVybjtcbiAgICBzZXRTYXZlTW9kZShuZXh0TW9kZSk7XG4gICAgaWYgKG5leHRNb2RlID09PSAnbGl2ZScgJiYgaXNEaXJ0eSkge1xuICAgICAgc2V0UGVuZGluZ1NhdmUodHJ1ZSk7XG4gICAgICBvbkNoYW5nZSgpO1xuICAgIH1cbiAgfSwgW2N1cnJlbnRTYXZlTW9kZSwgaXNEaXJ0eSwgaXNMb2NrZWQsIG9uQ2hhbmdlLCBzZXRTYXZlTW9kZV0pO1xuXG4gIGNvbnN0IGhhbmRsZURpc2NhcmQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0U2F2ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7XHJcbiAgICAvLyBSZS1wYXJzZSBmcm9tIGlucHV0IGRhdGFcclxuICAgIGNvbnN0IHRlc3RzQXJyID0gQXJyYXkuaXNBcnJheShpbnB1dFRlc3RzKSA/IGlucHV0VGVzdHMgOiBbXTtcclxuICAgIGNvbnN0IHN0YW5kc0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRTdGFuZHMpID8gKGlucHV0U3RhbmRzIGFzIFN0YW5kRGVmW10pIDogW107XHJcbiAgICBjb25zdCBub25Xb3JraW5nQXJyID0gQXJyYXkuaXNBcnJheShpbnB1dE5vbldvcmtpbmcpID8gaW5wdXROb25Xb3JraW5nIDogW107XHJcblxyXG4gICAgY29uc3QgeyBzdGFuZHM6IG5ld1N0YW5kcywgdW5hbGxvY2F0ZWQ6IHVuYWxsb2MgfSA9IHBhcnNlU3RhbmRzKHRlc3RzQXJyLCBzdGFuZHNBcnIsIGNoSG91cnMsIG5vbldvcmtpbmdBcnIpO1xyXG4gICAgc2V0U3RhbmRzKG5ld1N0YW5kcyk7XHJcbiAgICBzZXRVbmFsbG9jYXRlZCh1bmFsbG9jKTtcclxuICAgIHNldElzRGlydHkoZmFsc2UpO1xyXG4gICAgc2V0QWxsb2NhdGlvbnMoYnVpbGRBbGxvY2F0aW9ucyhuZXdTdGFuZHMpKTtcclxuICAgIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzKGZhbHNlKTtcclxuICB9LCBbaW5wdXRUZXN0cywgaW5wdXRTdGFuZHMsIGlucHV0Tm9uV29ya2luZywgY2hIb3Vycywgc2V0QWxsb2NhdGlvbnMsIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVJldHJ5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U2F2ZUVycm9yKGZhbHNlKTtcclxuICAgIHNldFBlbmRpbmdTYXZlKHRydWUpO1xyXG4gICAgb25SZXRyeSgpO1xyXG4gIH0sIFtvblJldHJ5XSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBQb3BvdmVyIGFjdGlvbnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgY2xvc2VQb3BvdmVyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFBvcG92ZXIobnVsbCk7XG4gICAgc2V0RWRpdG9yUG9wb3ZlcihudWxsKTtcbiAgICBzZXRQZW5kaW5nU3RhdHVzQ2hhbmdlKG51bGwpO1xuICAgIHNldFN0YXJ0RGF0ZUlucHV0VmFsdWUoJycpO1xuICAgIHNldEVuZERhdGVJbnB1dFZhbHVlKCcnKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsb3NlRWRpdG9yUG9wb3ZlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRFZGl0b3JQb3BvdmVyKG51bGwpO1xuICAgIHNldFBlbmRpbmdTdGF0dXNDaGFuZ2UobnVsbCk7XG4gICAgc2V0U3RhcnREYXRlSW5wdXRWYWx1ZSgnJyk7XG4gICAgc2V0RW5kRGF0ZUlucHV0VmFsdWUoJycpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlT3BlbkVkaXRvciA9IHVzZUNhbGxiYWNrKChtb2RlOiBFZGl0b3JQb3BvdmVyTW9kZSwgcmVjdDogQW5jaG9yUmVjdCkgPT4ge1xuICAgIHNldFBlbmRpbmdTdGF0dXNDaGFuZ2UobnVsbCk7XG4gICAgc2V0RWRpdG9yUG9wb3Zlcih7IG1vZGUsIGFuY2hvclJlY3Q6IHJlY3QgfSk7XG4gICAgaWYgKG1vZGUgIT09ICdzdGFydF9kYXRlJykge1xuICAgICAgc2V0U3RhcnREYXRlSW5wdXRWYWx1ZSgnJyk7XG4gICAgfVxuICAgIGlmIChtb2RlICE9PSAnZW5kX2RhdGUnKSB7XG4gICAgICBzZXRFbmREYXRlSW5wdXRWYWx1ZSgnJyk7XG4gICAgfVxuICB9LCBbXSk7XG5cclxuICBjb25zdCBoYW5kbGVDb25maXJtUHJpb3JpdHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFwb3BvdmVyKSByZXR1cm47XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQocHJpb3JpdHlJbnB1dFZhbHVlLCAxMCk7XG4gICAgaWYgKGlzTmFOKHBhcnNlZCkgfHwgcGFyc2VkIDwgMCB8fCBwYXJzZWQgPiAxMDApIHJldHVybjtcbiAgICBzZXRTZWxlY3RlZFRlc3RJZChTdHJpbmcocG9wb3Zlci50ZXN0LmlkKSk7XG4gICAgc2V0U2VsZWN0ZWRUZXN0UHJpb3JpdHkoU3RyaW5nKHBhcnNlZCkpO1xuICAgIG9uQ2hhbmdlUHJpb3JpdHkoKTtcbiAgICBjbG9zZVBvcG92ZXIoKTtcbiAgfSwgW3BvcG92ZXIsIHByaW9yaXR5SW5wdXRWYWx1ZSwgc2V0U2VsZWN0ZWRUZXN0SWQsIHNldFNlbGVjdGVkVGVzdFByaW9yaXR5LCBvbkNoYW5nZVByaW9yaXR5LCBjbG9zZVBvcG92ZXJdKTtcblxuICBjb25zdCBoYW5kbGVQaWNrU3RhdHVzID0gdXNlQ2FsbGJhY2soKHN0YXR1czogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCFwb3BvdmVyKSByZXR1cm47XG4gICAgaWYgKHN0YXR1cyA9PT0gJ1J1bm5pbmcnKSB7XG4gICAgICBzZXRQZW5kaW5nU3RhdHVzQ2hhbmdlKHN0YXR1cyk7XG4gICAgICBzZXRTdGFydERhdGVJbnB1dFZhbHVlKGZvcm1hdERhdGVJbnB1dFZhbHVlKHBvcG92ZXIudGVzdC50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgZ2V0VG9kYXlEYXRlSW5wdXRWYWx1ZSgpKTtcbiAgICAgIHNldEVuZERhdGVJbnB1dFZhbHVlKCcnKTtcbiAgICAgIHNldEVkaXRvclBvcG92ZXIocHJldiA9PiBwcmV2ID8geyAuLi5wcmV2LCBtb2RlOiAnc3RhcnRfZGF0ZScgfSA6IG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3RhdHVzID09PSAnVGVzdGVkJykge1xuICAgICAgc2V0UGVuZGluZ1N0YXR1c0NoYW5nZShzdGF0dXMpO1xuICAgICAgc2V0RW5kRGF0ZUlucHV0VmFsdWUoZ2V0VG9kYXlEYXRlSW5wdXRWYWx1ZSgpKTtcbiAgICAgIHNldFN0YXJ0RGF0ZUlucHV0VmFsdWUoJycpO1xuICAgICAgc2V0RWRpdG9yUG9wb3ZlcihwcmV2ID0+IHByZXYgPyB7IC4uLnByZXYsIG1vZGU6ICdlbmRfZGF0ZScgfSA6IG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRTZWxlY3RlZFRlc3RJZChTdHJpbmcocG9wb3Zlci50ZXN0LmlkKSk7XG4gICAgc2V0U2VsZWN0ZWRUZXN0U3RhdHVzKHN0YXR1cyA9PT0gJ05VTEwnID8gJycgOiBzdGF0dXMpO1xuICAgIG9uQ2hhbmdlU3RhdHVzKCk7XG4gICAgY2xvc2VQb3BvdmVyKCk7XG4gIH0sIFtwb3BvdmVyLCBzZXRTZWxlY3RlZFRlc3RJZCwgc2V0U2VsZWN0ZWRUZXN0U3RhdHVzLCBvbkNoYW5nZVN0YXR1cywgY2xvc2VQb3BvdmVyXSk7XG5cbiAgY29uc3QgaGFuZGxlRWRpdFRlc3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFwb3BvdmVyKSByZXR1cm47XG4gICAgc2V0U2VsZWN0ZWRUZXN0SWQoU3RyaW5nKHBvcG92ZXIudGVzdC5pZCkpO1xuICAgIG9uRWRpdFRlc3QoKTtcbiAgICBjbG9zZVBvcG92ZXIoKTtcbiAgfSwgW3BvcG92ZXIsIHNldFNlbGVjdGVkVGVzdElkLCBvbkVkaXRUZXN0LCBjbG9zZVBvcG92ZXJdKTtcblxuICBjb25zdCBoYW5kbGVDb25maXJtU3RhcnREYXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghcG9wb3ZlciB8fCAhc3RhcnREYXRlSW5wdXRWYWx1ZSkgcmV0dXJuO1xuICAgIHNldFNlbGVjdGVkVGVzdElkKFN0cmluZyhwb3BvdmVyLnRlc3QuaWQpKTtcbiAgICBpZiAocGVuZGluZ1N0YXR1c0NoYW5nZSkge1xuICAgICAgc2V0U2VsZWN0ZWRUZXN0U3RhdHVzKHBlbmRpbmdTdGF0dXNDaGFuZ2UgPT09ICdOVUxMJyA/ICcnIDogcGVuZGluZ1N0YXR1c0NoYW5nZSk7XG4gICAgICBvbkNoYW5nZVN0YXR1cygpO1xuICAgIH1cbiAgICBzZXRTZWxlY3RlZFRlc3RTdGFydERhdGUoc3RhcnREYXRlSW5wdXRWYWx1ZSk7XG4gICAgb25DaGFuZ2VTdGFydERhdGUoKTtcbiAgICBjbG9zZVBvcG92ZXIoKTtcbiAgfSwgW3BvcG92ZXIsIHN0YXJ0RGF0ZUlucHV0VmFsdWUsIHBlbmRpbmdTdGF0dXNDaGFuZ2UsIHNldFNlbGVjdGVkVGVzdElkLCBzZXRTZWxlY3RlZFRlc3RTdGF0dXMsIG9uQ2hhbmdlU3RhdHVzLCBzZXRTZWxlY3RlZFRlc3RTdGFydERhdGUsIG9uQ2hhbmdlU3RhcnREYXRlLCBjbG9zZVBvcG92ZXJdKTtcblxuICBjb25zdCBoYW5kbGVDb25maXJtRW5kRGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIXBvcG92ZXIgfHwgIWVuZERhdGVJbnB1dFZhbHVlKSByZXR1cm47XG4gICAgc2V0U2VsZWN0ZWRUZXN0SWQoU3RyaW5nKHBvcG92ZXIudGVzdC5pZCkpO1xuICAgIGlmIChwZW5kaW5nU3RhdHVzQ2hhbmdlKSB7XG4gICAgICBzZXRTZWxlY3RlZFRlc3RTdGF0dXMocGVuZGluZ1N0YXR1c0NoYW5nZSA9PT0gJ05VTEwnID8gJycgOiBwZW5kaW5nU3RhdHVzQ2hhbmdlKTtcbiAgICAgIG9uQ2hhbmdlU3RhdHVzKCk7XG4gICAgfVxuICAgIHNldFNlbGVjdGVkVGVzdEVuZERhdGUoZW5kRGF0ZUlucHV0VmFsdWUpO1xuICAgIG9uQ2hhbmdlRW5kRGF0ZSgpO1xuICAgIGNsb3NlUG9wb3ZlcigpO1xuICB9LCBbcG9wb3ZlciwgZW5kRGF0ZUlucHV0VmFsdWUsIHBlbmRpbmdTdGF0dXNDaGFuZ2UsIHNldFNlbGVjdGVkVGVzdElkLCBzZXRTZWxlY3RlZFRlc3RTdGF0dXMsIG9uQ2hhbmdlU3RhdHVzLCBzZXRTZWxlY3RlZFRlc3RFbmREYXRlLCBvbkNoYW5nZUVuZERhdGUsIGNsb3NlUG9wb3Zlcl0pO1xuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEJhciBwb3NpdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBnZXRCYXJQb3MgPSB1c2VDYWxsYmFjaygoc3RhcnQ6IERhdGUsIGR1cmF0aW9uOiBudW1iZXIpID0+ICh7XHJcbiAgICBsZWZ0OiBNYXRoLm1heCgwLCBob3Vyc0JldHdlZW4odmlld1N0YXJ0LCBzdGFydCkpICogcHhQZXJIb3VyLFxyXG4gICAgd2lkdGg6IE1hdGgubWF4KGR1cmF0aW9uICogcHhQZXJIb3VyLCAyKSxcclxuICB9KSwgW3ZpZXdTdGFydCwgcHhQZXJIb3VyXSk7XHJcblxyXG4gIC8vIEZvciBSdW5uaW5nIHRlc3RzOiBjbGlwIGxlZnQgdG8gdmlld1N0YXJ0LCBhZGp1c3Qgd2lkdGggdG8gYWN0dWFsIGVuZCB0aW1lLlxyXG4gIC8vIFJldHVybnMgbnVsbCBpZiB0aGUgdGVzdCBlbmRlZCBiZWZvcmUgdGhlIHRpbWVsaW5lIHN0YXJ0cy5cclxuICBjb25zdCBnZXRSdW5uaW5nQmFyUG9zID0gdXNlQ2FsbGJhY2soKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiB7IGxlZnQ6IG51bWJlcjsgd2lkdGg6IG51bWJlciB9IHwgbnVsbCA9PiB7XHJcbiAgICBjb25zdCBlZmZlY3RpdmVTdGFydE1zID0gTWF0aC5tYXgoc3RhcnQuZ2V0VGltZSgpLCB2aWV3U3RhcnQuZ2V0VGltZSgpKTtcclxuICAgIGNvbnN0IGVuZE1zID0gZW5kLmdldFRpbWUoKTtcclxuICAgIGlmIChlbmRNcyA8PSBlZmZlY3RpdmVTdGFydE1zKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxlZnQ6IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIG5ldyBEYXRlKGVmZmVjdGl2ZVN0YXJ0TXMpKSAqIHB4UGVySG91cixcclxuICAgICAgd2lkdGg6IE1hdGgubWF4KGhvdXJzQmV0d2VlbihuZXcgRGF0ZShlZmZlY3RpdmVTdGFydE1zKSwgbmV3IERhdGUoZW5kTXMpKSAqIHB4UGVySG91ciwgMiksXHJcbiAgICB9O1xyXG4gIH0sIFt2aWV3U3RhcnQsIHB4UGVySG91cl0pO1xyXG5cclxuICBjb25zdCBkcmFnZ2VkVGVzdCA9IGRyYWdnZWRUZXN0SWQgIT0gbnVsbCA/IGZpbmRUZXN0KGRyYWdnZWRUZXN0SWQpIDogbnVsbDtcclxuICBjb25zdCBkcmFnZ2VkSXNSdW5uaW5nID0gZHJhZ2dlZFRlc3QgIT0gbnVsbCA/IGlzUnVubmluZ1Rlc3QoZHJhZ2dlZFRlc3QpIDogZmFsc2U7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBTdGF0cyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB0b3RhbEFsbG9jYXRlZCA9IHN0YW5kcy5yZWR1Y2UoKGEsIHMpID0+IGEgKyBzLnRlc3RzLmxlbmd0aCwgMCk7XHJcbiAgY29uc3QgdG90YWxIb3VycyA9IHN0YW5kcy5yZWR1Y2UoKGEsIHMpID0+IGEgKyBzLnRlc3RzLnJlZHVjZSgoYiwgdCkgPT4gYiArIHQuZHVyYXRpb24sIDApLCAwKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFRlbXBsYXRlIGFjY2Vzc29ycyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBtYWluVGV4dCA9IFN0cmluZyhjYXJkTWFpblRleHQgfHwgJ3tuYW1lfScpO1xyXG4gIGNvbnN0IHN1YlRleHQgPSBTdHJpbmcoY2FyZFN1YlRleHQgfHwgJycpO1xyXG4gIGNvbnN0IGluZm9Sb3cgPSBTdHJpbmcoY2FyZEluZm9Sb3cgfHwgJycpO1xyXG4gIGNvbnN0IHRpcFRlbXBsYXRlID0gU3RyaW5nKHRvb2x0aXBUZW1wbGF0ZSB8fCAnJykucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgRmlsdGVyZWQgJiBzb3J0ZWQgcXVldWUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgU1RBVFVTX1NPUlRfT1JERVI6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7XHJcbiAgICAnUnVubmluZyc6IDAsICdEZWxheWVkJzogMSwgJ09uIFRpbWUnOiAyLCAnUmVhZHknOiAzLCAnSW4gUHJvZ3Jlc3MnOiA0LCAnUGFydHMgTm90IEFzc2lnbmVkJzogNSxcclxuICB9O1xyXG5cclxuICBjb25zdCBzb3J0ZWRVbmFsbG9jYXRlZCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgbGV0IGxpc3QgPSBbLi4udW5hbGxvY2F0ZWRdO1xyXG4gICAgaWYgKHF1ZXVlRmlsdGVyLnRyaW0oKSkge1xyXG4gICAgICBjb25zdCBxID0gcXVldWVGaWx0ZXIudG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgICAgIC8vIFNlYXJjaCBhY3Jvc3MgYWxsIHJlYWRhYmxlIHN0cmluZy9udW1iZXIgZmllbGRzIG9mIHRoZSB0ZXN0XHJcbiAgICAgIGxpc3QgPSBsaXN0LmZpbHRlcih0ID0+IHtcclxuICAgICAgICBjb25zdCBzZWFyY2hhYmxlID0gW3QubmFtZSwgdC5vd25lciwgdC5ub3RlcywgdC5zdGF0dXMsIHQucGFydF9zdGF0dXMsIHQuYXNzaWduZWRfcGFydHMsXHJcbiAgICAgICAgICB0LnByaW9yaXR5ICE9IG51bGwgPyBTdHJpbmcodC5wcmlvcml0eSkgOiAnJywgdC5kdXJhdGlvbiAhPSBudWxsID8gU3RyaW5nKHQuZHVyYXRpb24pIDogJyddXHJcbiAgICAgICAgICAuam9pbignICcpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHNlYXJjaGFibGUuaW5jbHVkZXMocSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHF1ZXVlU29ydCA9PT0gJ2F6Jykge1xyXG4gICAgICBsaXN0LnNvcnQoKGEsIGIpID0+IChhLm5hbWUgfHwgJycpLmxvY2FsZUNvbXBhcmUoYi5uYW1lIHx8ICcnKSk7XHJcbiAgICB9IGVsc2UgaWYgKHF1ZXVlU29ydCA9PT0gJ3ByaW9yaXR5Jykge1xyXG4gICAgICBsaXN0LnNvcnQoKGEsIGIpID0+IChiLnByaW9yaXR5ID8/IDUwKSAtIChhLnByaW9yaXR5ID8/IDUwKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTb3J0IGJ5IGRpc3BsYXkgc3RhdHVzIHVzaW5nIGEgZml4ZWQgdXJnZW5jeSBvcmRlclxyXG4gICAgICBsaXN0LnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICBjb25zdCBzYSA9IFNUQVRVU19TT1JUX09SREVSW2dldERpc3BsYXlTdGF0dXMoYSldID8/IDk5O1xyXG4gICAgICAgIGNvbnN0IHNiID0gU1RBVFVTX1NPUlRfT1JERVJbZ2V0RGlzcGxheVN0YXR1cyhiKV0gPz8gOTk7XHJcbiAgICAgICAgcmV0dXJuIHNhICE9PSBzYiA/IHNhIC0gc2IgOiAoYi5wcmlvcml0eSA/PyA1MCkgLSAoYS5wcmlvcml0eSA/PyA1MCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbiAgfSwgW3VuYWxsb2NhdGVkLCBxdWV1ZVNvcnQsIHF1ZXVlRmlsdGVyXSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBCYXIgaGVpZ2h0IFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IEJBUl9IRUlHSFQgPSA3MjtcclxuICBjb25zdCBMQU5FX0hFSUdIVCA9IDg0O1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgUmVuZGVyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgIGRpc3BsYXk6ICdmbGV4JywgaGVpZ2h0OiAnMTAwJScsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcyxcclxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LCBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgIH19PlxyXG4gICAgICA8c3R5bGU+e2BAa2V5ZnJhbWVzIGNjbC1zcGluIHsgdG8geyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1gfTwvc3R5bGU+XHJcbiAgICAgIHtpc0xvY2tlZCAmJiAoXHJcbiAgICAgICAgPFNhdmVPdmVybGF5XHJcbiAgICAgICAgICBpc0Vycm9yPXtzYXZlRXJyb3J9XHJcbiAgICAgICAgICB0aGVtZT17dGhlbWV9XHJcbiAgICAgICAgICBvblJldHJ5PXtoYW5kbGVSZXRyeX1cclxuICAgICAgICAgIG9uRGlzY2FyZD17aGFuZGxlRGlzY2FyZH1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgICB7LyogXHUyNTUwXHUyNTUwXHUyNTUwIFF1ZXVlIFNpZGViYXIgXHUyNTUwXHUyNTUwXHUyNTUwICovfVxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAzMjAsIG1pbldpZHRoOiAzMjAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcywgYm9yZGVyUmlnaHQ6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyB9fT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDE2cHgnLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSB9fT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgbWFyZ2luQm90dG9tOiA0IH19PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCB9fT5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA4LCBoZWlnaHQ6IDgsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6IHVuYWxsb2NhdGVkLmxlbmd0aCA+IDAgPyAnI0Y1OUUwQicgOiAnIzEwQjk4MScgfX0gLz5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDEzLCBmb250V2VpZ2h0OiA3MDAsIGxldHRlclNwYWNpbmc6ICcwLjA4ZW0nLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJywgY29sb3I6IHRoZW1lLnRleHRUZXJ0aWFyeSB9fT5RdWV1ZTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDIsIGJhY2tncm91bmQ6IHRoZW1lLmJnU3VidGxlLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cywgcGFkZGluZzogMiwgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgfX0+XHJcbiAgICAgICAgICAgICAgeyhbWydheicsICdBXHUyMTkyWiddLCBbJ3ByaW9yaXR5JywgJ1ByaW9yaXR5J10sIFsnc3RhdHVzJywgJ1N0YXR1cyddXSBhcyBjb25zdCkubWFwKChbdmFsLCBsYWJlbF0pID0+IChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAga2V5PXt2YWx9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFF1ZXVlU29ydCh2YWwpfVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBwYWRkaW5nOiAnM3B4IDhweCcsIGZvbnRTaXplOiA5LCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzU20sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHF1ZXVlU29ydCA9PT0gdmFsID8gdGhlbWUuYWNjZW50IDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogcXVldWVTb3J0ID09PSB2YWwgPyB0aGVtZS5hY2NlbnRGZyA6IHRoZW1lLnRleHRNdXRlZCxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID57bGFiZWx9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCBtYXJnaW5Ub3A6IDYgfX0+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICB2YWx1ZT17cXVldWVGaWx0ZXJ9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRRdWV1ZUZpbHRlcihlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJGaWx0ZXIgdGVzdHMuLi5cIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgd2lkdGg6ICcxMDAlJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsIHBhZGRpbmc6ICc1cHggMjhweCA1cHggOHB4JywgZm9udFNpemU6IDExLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksIG91dGxpbmU6ICdub25lJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIG9uRm9jdXM9eyhlKSA9PiB7IGUuY3VycmVudFRhcmdldC5zdHlsZS5ib3JkZXJDb2xvciA9IHRoZW1lLmFjY2VudDsgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSB0aGVtZS5zdXJmYWNlOyB9fVxyXG4gICAgICAgICAgICAgIG9uQmx1cj17KGUpID0+IHsgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJvcmRlckNvbG9yID0gdGhlbWUuYm9yZGVyOyBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9IHRoZW1lLmNhbnZhczsgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAge3F1ZXVlRmlsdGVyICYmIChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRRdWV1ZUZpbHRlcignJyl9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgcmlnaHQ6IDYsIHRvcDogJzUwJScsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6IHRoZW1lLnRleHREaXNhYmxlZCxcclxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDE0LCBsaW5lSGVpZ2h0OiAxLCBwYWRkaW5nOiAwLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+JnRpbWVzOzwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIHN0eWxlPXt7IGZsZXg6IDEsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAnOHB4IDEwcHgnIH19XHJcbiAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGlmIChlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0KSBzZXRRdWV1ZUluc2VydEluZGV4KHVuYWxsb2NhdGVkLmxlbmd0aCk7IH19XHJcbiAgICAgICAgICBvbkRyYWdMZWF2ZT17KGUpID0+IHsgaWYgKGUuY3VycmVudFRhcmdldCA9PT0gZS50YXJnZXQpIHNldFF1ZXVlSW5zZXJ0SW5kZXgobnVsbCk7IH19XHJcbiAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZHJvcE9uUXVldWUocXVldWVJbnNlcnRJbmRleCA/PyB1bmFsbG9jYXRlZC5sZW5ndGgpOyB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtzb3J0ZWRVbmFsbG9jYXRlZC5tYXAoKHRlc3QsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBnZXREaXNwbGF5U3RhdHVzKHRlc3QsIG51bGwpO1xyXG4gICAgICAgICAgICBjb25zdCBzaG93U3ViID0gIWlzVGVtcGxhdGVFbXB0eShzdWJUZXh0LCB0ZXN0KTtcclxuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRNYWluID0gcmVzb2x2ZVRlbXBsYXRlKG1haW5UZXh0LCB0ZXN0KTtcclxuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRTdWIgPSByZXNvbHZlVGVtcGxhdGUoc3ViVGV4dCwgdGVzdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkSW5mbyA9IHJlc29sdmVUZW1wbGF0ZShpbmZvUm93LCB0ZXN0KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e3Rlc3QuaWR9PlxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldFF1ZXVlSW5zZXJ0SW5kZXgoaWR4KTsgfX1cclxuICAgICAgICAgICAgICAgICAgb25Ecm9wPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGRyb3BPblF1ZXVlKGlkeCk7IH19XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBxdWV1ZUluc2VydEluZGV4ID09PSBpZHggJiYgZHJhZ2dlZFRlc3RJZCAmJiBkcmFnZ2VkVGVzdElkICE9PSB0ZXN0LmlkID8gNiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogMyxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuMTJzIGVhc2UnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxRdWV1ZUNhcmRcclxuICAgICAgICAgICAgICAgICAgdGVzdD17dGVzdH1cclxuICAgICAgICAgICAgICAgICAgZHJhZ2dlZFRlc3RJZD17ZHJhZ2dlZFRlc3RJZH1cclxuICAgICAgICAgICAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgICAgICAgICAgIG1haW5UZXh0PXtyZXNvbHZlZE1haW59XHJcbiAgICAgICAgICAgICAgICAgIHN1YlRleHQ9e3Jlc29sdmVkU3VifVxyXG4gICAgICAgICAgICAgICAgICBpbmZvUm93PXtyZXNvbHZlZEluZm99XHJcbiAgICAgICAgICAgICAgICAgIHNob3dTdWI9e3Nob3dTdWJ9XHJcbiAgICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cclxuICAgICAgICAgICAgICAgICAgb25EcmFnU3RhcnQ9eygpID0+IHNldERyYWdnZWRUZXN0SWQodGVzdC5pZCl9XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17Y2xlYXJEcmFnfVxyXG4gICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGNvbnN0IHJlY3QgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IHNldFF1ZXVlSW5zZXJ0SW5kZXgoZS5jbGllbnRZIDwgcmVjdC50b3AgKyByZWN0LmhlaWdodCAvIDIgPyBpZHggOiBpZHggKyAxKTsgfX1cclxuICAgICAgICAgICAgICAgICAgb25NZW51T3Blbj17KHJlY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRyYWdnZWRUZXN0SWQgfHwgaXNMb2NrZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgc2V0UHJpb3JpdHlJbnB1dFZhbHVlKFN0cmluZyh0ZXN0LnByaW9yaXR5ID8/IDUwKSk7XG4gICAgICAgICAgICAgICAgICAgIHNldFN0YXJ0RGF0ZUlucHV0VmFsdWUoZm9ybWF0RGF0ZUlucHV0VmFsdWUodGVzdC50ZXN0X3N0YXJ0ZWRfZGF0ZSkpO1xuICAgICAgICAgICAgICAgICAgICBzZXRFbmREYXRlSW5wdXRWYWx1ZSgnJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldFBlbmRpbmdTdGF0dXNDaGFuZ2UobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHNldFBvcG92ZXIoe1xuICAgICAgICAgICAgICAgICAgICAgIGFuY2hvclJlY3Q6IHJlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdCxcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5U3RhdHVzOiBzdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcExpbmVzOiByZXNvbHZlVGVtcGxhdGUodGlwVGVtcGxhdGUsIHRlc3QpLFxuICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEVkaXRvclBvcG92ZXIobnVsbCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgc2V0UXVldWVJbnNlcnRJbmRleCh1bmFsbG9jYXRlZC5sZW5ndGgpOyB9fVxyXG4gICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZHJvcE9uUXVldWUodW5hbGxvY2F0ZWQubGVuZ3RoKTsgfX1cclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBoZWlnaHQ6IChxdWV1ZUluc2VydEluZGV4ID09PSB1bmFsbG9jYXRlZC5sZW5ndGggJiYgZHJhZ2dlZFRlc3RJZCkgPyA2IDogMCxcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzLFxyXG4gICAgICAgICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC4xMnMgZWFzZScsXHJcbiAgICAgICAgICAgICAgbWFyZ2luOiAnMCA0cHgnLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHt1bmFsbG9jYXRlZC5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJywgcGFkZGluZzogJzMycHggMTZweCcsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRTaXplOiAxMixcclxuICAgICAgICAgICAgICBib3JkZXI6IGRyYWdnZWRUZXN0SWQgPyBgMnB4IGRhc2hlZCAke3RoZW1lLmFjY2VudH1gIDogYDJweCBkYXNoZWQgJHt0aGVtZS5ib3JkZXJTdHJvbmd9YCxcclxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLCBtYXJnaW5Ub3A6IDgsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogZHJhZ2dlZFRlc3RJZCA/IHRoZW1lLmFjY2VudFN1YnRsZSA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sXHJcbiAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgIHtkcmFnZ2VkVGVzdElkID8gJ0Ryb3AgdG8gcmV0dXJuIHRvIHF1ZXVlJyA6ICdBbGwgdGVzdHMgYWxsb2NhdGVkJ31cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8T3V0bGluZUtleSB0aGVtZT17dGhlbWV9IC8+XHJcblxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTZweCcsIGJvcmRlclRvcDogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGZvbnRTaXplOiAxMCwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCB9fT5cclxuICAgICAgICAgICAgPHNwYW4+e3RvdGFsQWxsb2NhdGVkfS97dG90YWxBbGxvY2F0ZWQgKyB1bmFsbG9jYXRlZC5sZW5ndGh9IGFsbG9jYXRlZDwvc3Bhbj48c3Bhbj57dG90YWxIb3Vyc31oPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgey8qIFx1MjU1MFx1MjU1MFx1MjU1MCBNYWluIFRpbWVsaW5lIFx1MjU1MFx1MjU1MFx1MjU1MCAqL31cclxuICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XHJcbiAgICAgICAgey8qIEhlYWRlciBiYXIgKi99XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAyNHB4JywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJhY2tncm91bmQ6IHRoZW1lLnN1cmZhY2UsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGdhcDogMTYsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgICAgICA8aDEgc3R5bGU9e3sgZm9udFNpemU6IDE4LCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSwgbGV0dGVyU3BhY2luZzogJy0wLjAyZW0nLCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5IH19PlRlc3QgU3RhbmQgU2NoZWR1bGVyPC9oMT5cclxuICAgICAgICAgICAgICA8cCBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Ub3A6IDIgfX0+XG4gICAgICAgICAgICAgICAgQ29udGludW91cyB0ZXN0aW5nIFx1MDBCNyB7Y2hIb3Vyc31oIGNoYW5nZW92ZXIgKGRlZmF1bHQpIFx1MDBCNyB7d1N0YXJ0fTowMFx1MjAxM3t3RW5kfTowMCBNb25cdTIwMTNGcmlcbiAgICAgICAgICAgICAge2N1cnJlbnRTYXZlTW9kZSA9PT0gJ2xpdmUnICYmIDxzcGFuPiBcdTAwQjcgTGl2ZSBzeW5jPC9zcGFuPn1cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2ZsZXgtZW5kJywgZ2FwOiAxMiwgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgIHsvKiBTYXZlL0Rpc2NhcmQgYnV0dG9ucyAoYmF0Y2ggbW9kZSkgKi99XG4gICAgICAgICAgICB7Y3VycmVudFNhdmVNb2RlID09PSAnYmF0Y2gnICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgYWxpZ25JdGVtczogJ2NlbnRlcicsIGFsaWduU2VsZjogJ3N0cmV0Y2gnIH19PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURpc2NhcmR9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRGlydHkgfHwgaXNMb2NrZWR9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25TZWxmOiAnZmxleC1lbmQnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLCBwYWRkaW5nOiAnNnB4IDAnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke2lzRGlydHkgJiYgIWlzTG9ja2VkID8gdGhlbWUuYWNjZW50IDogdGhlbWUuYm9yZGVyfWAsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/ICdwb2ludGVyJyA6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IHRoZW1lLmFjY2VudCA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0RGlzYWJsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gYDAgMXB4IDNweCAke3RoZW1lLmFjY2VudH00RGAgOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIERpc2NhcmQgQ2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTYXZlfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0RpcnR5IHx8IGlzTG9ja2VkfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sXG4gICAgICAgICAgICAgICAgICAgIGFsaWduU2VsZjogJ2ZsZXgtZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMCwgcGFkZGluZzogJzZweCAwJywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHtpc0RpcnR5ICYmICFpc0xvY2tlZCA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLmJvcmRlcn1gLFxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyAncG9pbnRlcicgOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyB0aGVtZS5hY2NlbnQgOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dERpc2FibGVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IGAwIDFweCAzcHggJHt0aGVtZS5hY2NlbnR9NERgIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgU2F2ZSBDaGFuZ2VzXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6IDQgfX0+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTAsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDZlbScsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBjb2xvcjogdGhlbWUudGV4dE11dGVkIH19PlxuICAgICAgICAgICAgICAgIFNhdmUgTW9kZVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMiwgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAyLCBtaW5XaWR0aDogMTIyLCBiYWNrZ3JvdW5kOiB0aGVtZS5iZ1N1YnRsZSwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZywgcGFkZGluZzogMiwgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgfX0+XG4gICAgICAgICAgICAgICAgICB7KFsnYmF0Y2gnLCAnbGl2ZSddIGFzIGNvbnN0KS5tYXAobW9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGN1cnJlbnRTYXZlTW9kZSA9PT0gbW9kZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzYWJsZWQgPSBpc0xvY2tlZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e21vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTYXZlTW9kZUNoYW5nZShtb2RlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IGRpc2FibGVkID8gJ2RlZmF1bHQnIDogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyB0aGVtZS5hY2NlbnQgOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogYWN0aXZlID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0VGVydGlhcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IGRpc2FibGVkID8gMC42NSA6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICdsb3dlcmNhc2UnIGFzIGNvbnN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bW9kZX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFZpZXdwb3J0IHNlbGVjdG9yICovfVxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDQsIGJhY2tncm91bmQ6IHRoZW1lLmJnU3VidGxlLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLCBwYWRkaW5nOiAzLCBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCB9fT5cbiAgICAgICAgICAgICAgICAgIHtbMiwgNCwgOCwgMTIsIDI0XS5tYXAoKHcpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17d31cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHVzZXJDaGFuZ2VkVmlld3BvcnQuY3VycmVudCA9IHRydWU7IHNldFZpZXdwb3J0V2Vla3Modyk7IH19XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzZweCAxMnB4JywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdmlld3BvcnRXZWVrcyA9PT0gdyA/IHRoZW1lLmFjY2VudCA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdmlld3BvcnRXZWVrcyA9PT0gdyA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dFRlcnRpYXJ5LFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7d31XXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7LyogVGltZWxpbmUgc2Nyb2xsIGFyZWEgKi99XHJcbiAgICAgICAgPGRpdiByZWY9e3Njcm9sbFJlZn0gc3R5bGU9e3sgZmxleDogMSwgb3ZlcmZsb3c6ICdhdXRvJywgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtaW5XaWR0aDogdG90YWxXaWR0aCwgcGFkZGluZzogJzAgMTJweCAyNHB4JywgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XHJcbiAgICAgICAgICAgIHsvKiBUaW1lbGluZSBoZWFkZXIgKi99XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdzdGlja3knLCB0b3A6IDAsIHpJbmRleDogMjAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgfX0+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGhlaWdodDogMjgsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gIH19PlxyXG4gICAgICAgICAgICAgICAge2RheXMubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTW9uZGF5ID0gZC5nZXREYXkoKSA9PT0gMTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCB3aWR0aDogZGF5V2lkdGgsIG1pbldpZHRoOiBkYXlXaWR0aCwgaGVpZ2h0OiAyOCxcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRUZXJ0aWFyeSxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHtpc01vbmRheSAmJiBpID4gMCA/IHRoZW1lLmJvcmRlciA6ICd0cmFuc3BhcmVudCd9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBpc01vbmRheSA/IDcgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICd2aXNpYmxlJywgd2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7aXNNb25kYXkgPyBmb3JtYXRXZWVrKGQpIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgaGVpZ2h0OiAyNCB9fT5cclxuICAgICAgICAgICAgICAgIHtkYXlzLm1hcCgoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1RvZGF5ID0gZC50b0RhdGVTdHJpbmcoKSA9PT0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNXZWVrZW5kID0gZC5nZXREYXkoKSA9PT0gMCB8fCBkLmdldERheSgpID09PSA2O1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHdpZHRoOiBkYXlXaWR0aCwgbWluV2lkdGg6IGRheVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDksIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogaXNUb2RheSA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLnRleHRNdXRlZCxcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGlzVG9kYXkgPyA3MDAgOiA0MDAsIGxpbmVIZWlnaHQ6ICcyNHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGlzVG9kYXkgPyB0aGVtZS5hY2NlbnRTdWJ0bGUgOiAoaXNXZWVrZW5kID8gdGhlbWUuYmdTdWJ0bGUgOiAndHJhbnNwYXJlbnQnKSxcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIHt2aWV3cG9ydFdlZWtzIDw9IDggPyBkLmdldERhdGUoKSA6IChkLmdldERheSgpID09PSAxID8gZC5nZXREYXRlKCkgOiAnJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICB7LyogXHUyNTUwXHUyNTUwXHUyNTUwIFRlc3QgU3RhbmQgTGFuZXMgXHUyNTUwXHUyNTUwXHUyNTUwICovfVxyXG4gICAgICAgICAgICB7c3RhbmRzLm1hcCgoc3RhbmQpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBzY2hlZHVsZSA9IHN0YW5kU2NoZWR1bGVzLmdldChzdGFuZC5pZCkgPz8gW107XHJcbiAgICAgICAgICAgICAgY29uc3QgaW5kID0gaW5zZXJ0SW5kaWNhdG9yO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNob3dIZXJlID0gaW5kICYmIGluZC5zdGFuZElkID09PSBzdGFuZC5pZDtcclxuXHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtzdGFuZC5pZH0gc3R5bGU9e3sgbWFyZ2luVG9wOiAxNiB9fT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDgsIG1hcmdpbkJvdHRvbTogNiwgcGFkZGluZ0xlZnQ6IDIgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNiwgaGVpZ2h0OiA2LCBib3JkZXJSYWRpdXM6IDIsIGJhY2tncm91bmQ6IHN0YW5kLnRlc3RzLmxlbmd0aCA+IDAgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS50ZXh0RGlzYWJsZWQgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5IH19PntzdGFuZC5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDEwLCBjb2xvcjogdGhlbWUudGV4dE11dGVkIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAge3N0YW5kLnRlc3RzLmxlbmd0aH0gdGVzdHtzdGFuZC50ZXN0cy5sZW5ndGggIT09IDEgPyAncycgOiAnJ317c3RhbmQudGVzdHMubGVuZ3RoID4gMCAmJiBgIFxcdTAwYjcgJHtzdGFuZC50ZXN0cy5yZWR1Y2UoKGEsIHQpID0+IGEgKyB0LmR1cmF0aW9uLCAwKX1oYH1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgc2V0SW5zZXJ0SW5kaWNhdG9yKHsgc3RhbmRJZDogc3RhbmQuaWQsIGluZGV4OiBzdGFuZC50ZXN0cy5sZW5ndGggfSk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgb25EcmFnTGVhdmU9eyhlKSA9PiB7IGlmICghZS5jdXJyZW50VGFyZ2V0LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCBhcyBOb2RlKSkgc2V0SW5zZXJ0SW5kaWNhdG9yKG51bGwpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIFJ1bm5pbmcgdGVzdHMgYWx3YXlzIGFwcGVuZCB0byBlbmQgKHBvc2l0aW9uIGlzIGdvdmVybmVkIGJ5IHRlc3Rfc3RhcnRlZF9kYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGRyYWdnZWRJc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIHN0YW5kLnRlc3RzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wT25TdGFuZChzdGFuZC5pZCwgaW5kPy5zdGFuZElkID09PSBzdGFuZC5pZCA/IGluZC5pbmRleCA6IHN0YW5kLnRlc3RzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IExBTkVfSEVJR0hULFxyXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gc2hvd0hlcmUgfHwgKGRyYWdnZWRUZXN0SWQgJiYgc3RhbmQudGVzdHMubGVuZ3RoID09PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHJldHVybiB0aGVtZS5zdXJmYWNlU2Vjb25kYXJ5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJhZ2dlZElzUnVubmluZyA/IHRoZW1lLnJ1bm5pbmdCZyA6IHRoZW1lLmFjY2VudFN1YnRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHsoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBzaG93SGVyZSB8fCAoZHJhZ2dlZFRlc3RJZCAmJiBzdGFuZC50ZXN0cy5sZW5ndGggPT09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuIHRoZW1lLmJvcmRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyYWdnZWRJc1J1bm5pbmcgPyB0aGVtZS5ydW5uaW5nQm9yZGVyIDogdGhlbWUuYWNjZW50TXV0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRvdGFsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnYmFja2dyb3VuZCAwLjE1cyBlYXNlLCBib3JkZXItY29sb3IgMC4xNXMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBXZWVrZW5kIHNoYWRpbmcgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge2RheXMubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5nZXREYXkoKSAhPT0gMCAmJiBkLmdldERheSgpICE9PSA2KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgd2UtJHtpfWB9IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGkgKiBkYXlXaWR0aCwgdG9wOiAwLCBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGRheVdpZHRoLCBiYWNrZ3JvdW5kOiB0aGVtZS5ib3JkZXIsIG9wYWNpdHk6IDAuMzUsIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBEYXkgZ3JpZCAqL31cclxuICAgICAgICAgICAgICAgICAgICB7ZGF5cy5tYXAoKF8sIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogaSAqIGRheVdpZHRoLCB0b3A6IDAsIGJvdHRvbTogMCwgd2lkdGg6IDEsIGJhY2tncm91bmQ6IHRoZW1lLmJvcmRlciB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogTm93IGxpbmUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoID0gaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaCA8IDAgfHwgaCA+IHRvdGFsRGF5cyAqIDI0KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGggKiBweFBlckhvdXIsIHRvcDogMCwgYm90dG9tOiAwLCB3aWR0aDogMiwgYmFja2dyb3VuZDogJyNFRjQ0NDQnLCB6SW5kZXg6IDE4LCBwb2ludGVyRXZlbnRzOiAnbm9uZScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTMsIGxlZnQ6IC0zLCB3aWR0aDogOCwgaGVpZ2h0OiA4LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiAnI0VGNDQ0NCcgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBOb24td29ya2luZyBibG9ja3MgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3N0YW5kLm5vbldvcmtpbmdCbG9ja3MubWFwKChibG9jaywgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVmdCA9IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIGJsb2NrLnN0YXJ0KSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gaG91cnNCZXR3ZWVuKGJsb2NrLnN0YXJ0LCBibG9jay5lbmQpICogcHhQZXJIb3VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgKyB3aWR0aCA8IDAgfHwgbGVmdCA+IHRvdGFsV2lkdGgpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhbXBlZExlZnQgPSBNYXRoLm1heCgwLCBsZWZ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRXaWR0aCA9IE1hdGgubWluKHdpZHRoICsgTWF0aC5taW4oMCwgbGVmdCksIHRvdGFsV2lkdGggLSBjbGFtcGVkTGVmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YG53LSR7aX1gfSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBjbGFtcGVkTGVmdCwgdG9wOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjbGFtcGVkV2lkdGgsIGhlaWdodDogQkFSX0hFSUdIVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDYsIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCg0NWRlZywgJHt0aGVtZS5ib3JkZXJ9IDBweCwgJHt0aGVtZS5ib3JkZXJ9IDE1cHgsICR7dGhlbWUuc3VyZmFjZX0gMTVweCwgJHt0aGVtZS5zdXJmYWNlfSAzMHB4KWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZywgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyU3Ryb25nfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAncm93Jywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA1LCBtaW5XaWR0aDogNSwgYmFja2dyb3VuZDogdGhlbWUudGV4dERpc2FibGVkLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBwYWRkaW5nOiAnNHB4IDhweCcsIG1pbldpZHRoOiAwLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgbWF4V2lkdGg6ICcxMDAlJywgbGluZUhlaWdodDogMS4yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+e2Jsb2NrLm5vdGVzIHx8ICdNYWludGVuYW5jZSd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBUZXN0IGJhcnMgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3NjaGVkdWxlLm1hcCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1Rlc3RSdW5uaW5nID0gaXNSdW5uaW5nVGVzdCh0ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhclBvcyA9IGlzVGVzdFJ1bm5pbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBnZXRSdW5uaW5nQmFyUG9zKHRlc3Quc3RhcnQsIHRlc3QuZW5kKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGdldEJhclBvcyh0ZXN0LnN0YXJ0LCB0ZXN0LmR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIFJ1bm5pbmcgdGVzdHMgdGhhdCBlbmRlZCBiZWZvcmUgdGhlIHRpbWVsaW5lIHN0YXJ0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCFiYXJQb3MpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgd2lkdGggfSA9IGJhclBvcztcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKHRlc3QuZW5kLCBzdGFuZC5jaGFuZ2VvdmVyX2hvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlb3ZlcldpZHRoID0gaG91cnNCZXR3ZWVuKHRlc3QuZW5kLCBjRW5kKSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlTdGF0dXMgPSBnZXREaXNwbGF5U3RhdHVzKHRlc3QsIHRlc3Quc3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkTWFpbiA9IHJlc29sdmVUZW1wbGF0ZShtYWluVGV4dCwgdGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZEluZm8gPSByZXNvbHZlVGVtcGxhdGUoaW5mb1JvdywgdGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaG93SW5mb09uQmFyID0gcmVzb2x2ZWRJbmZvLnRyaW0oKSAhPT0gJycgJiYgd2lkdGggPiAxMjA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3Rlc3QuaWR9IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0LCB0b3A6IDAsIHdpZHRoOiB3aWR0aCArIGNoYW5nZW92ZXJXaWR0aCwgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIERyb3Agem9uZXMgXHUyMDE0IHN1cHByZXNzZWQgd2hlbiBkcmFnZ2luZyBhIFJ1bm5pbmcgdGVzdCAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZHJhZ2dlZFRlc3RJZCAmJiBkcmFnZ2VkVGVzdElkICE9PSB0ZXN0LmlkICYmICFkcmFnZ2VkSXNSdW5uaW5nICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldEluc2VydEluZGljYXRvcih7IHN0YW5kSWQ6IHN0YW5kLmlkLCBpbmRleDogaWR4IH0pOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBkcm9wT25TdGFuZChzdGFuZC5pZCwgaWR4KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogLTYsIHRvcDogMCwgd2lkdGg6ICc1MCUnLCBoZWlnaHQ6ICcxMDAlJywgekluZGV4OiAyMCwgbWluV2lkdGg6IDIwIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldEluc2VydEluZGljYXRvcih7IHN0YW5kSWQ6IHN0YW5kLmlkLCBpbmRleDogaWR4ICsgMSB9KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIGlkeCArIDEpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCByaWdodDogLTYsIHRvcDogMCwgd2lkdGg6ICc1MCUnLCBoZWlnaHQ6ICcxMDAlJywgekluZGV4OiAyMCwgbWluV2lkdGg6IDIwIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogSW5zZXJ0IGluZGljYXRvciBiZWZvcmUgdGhpcyB0ZXN0IFx1MjAxNCBzdXBwcmVzc2VkIGZvciBSdW5uaW5nIGRyYWdzICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93SGVyZSAmJiAhZHJhZ2dlZElzUnVubmluZyAmJiBpbmQhLmluZGV4ID09PSBpZHggJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogLTQsIHRvcDogMCwgYm90dG9tOiAwIH19PjxJbnNlcnRMaW5lIHRoZW1lPXt0aGVtZX0gLz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogVGVzdCBiYXIgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiAwLCB3aWR0aCwgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGVzdEJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0PXt0ZXN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Rlc3RSdW5uaW5nPXtpc1Rlc3RSdW5uaW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2VkVGVzdElkPXtkcmFnZ2VkVGVzdElkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17d2lkdGh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJBUl9IRUlHSFQ9e0JBUl9IRUlHSFR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlTdGF0dXM9e2Rpc3BsYXlTdGF0dXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVkTWFpbj17cmVzb2x2ZWRNYWlufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZEluZm89e3Jlc29sdmVkSW5mb31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0luZm9PbkJhcj17c2hvd0luZm9PbkJhcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17KGUpID0+IHsgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJzsgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyh0ZXN0LmlkKSk7IHNldERyYWdnZWRUZXN0SWQodGVzdC5pZCk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17Y2xlYXJEcmFnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1lbnVPcGVuPXsocmVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhZ2dlZFRlc3RJZCB8fCBpc0xvY2tlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQcmlvcml0eUlucHV0VmFsdWUoU3RyaW5nKHRlc3QucHJpb3JpdHkgPz8gNTApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RhcnREYXRlSW5wdXRWYWx1ZShmb3JtYXREYXRlSW5wdXRWYWx1ZSh0ZXN0LnRlc3Rfc3RhcnRlZF9kYXRlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEVuZERhdGVJbnB1dFZhbHVlKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGVuZGluZ1N0YXR1c0NoYW5nZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UG9wb3Zlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yUmVjdDogcmVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlTdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcExpbmVzOiByZXNvbHZlVGVtcGxhdGUodGlwVGVtcGxhdGUsIHRlc3QpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZDogeyBzdGFydDogdGVzdC5zdGFydCwgZW5kOiB0ZXN0LmVuZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RWRpdG9yUG9wb3ZlcihudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDaGFuZ2VvdmVyIGluZGljYXRvciAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aWR4IDwgc2NoZWR1bGUubGVuZ3RoICYmIGNoYW5nZW92ZXJXaWR0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogd2lkdGgsIHRvcDogTEFORV9IRUlHSFQgLyAyIC0gOCwgd2lkdGg6IGNoYW5nZW92ZXJXaWR0aCwgaGVpZ2h0OiAxNiwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogMSwgd2lkdGg6ICc4MCUnLCBiYWNrZ3JvdW5kOiBgcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCg5MGRlZywgJHt0aGVtZS50ZXh0RGlzYWJsZWR9IDAsICR7dGhlbWUudGV4dERpc2FibGVkfSA0cHgsIHRyYW5zcGFyZW50IDRweCwgdHJhbnNwYXJlbnQgOHB4KWAgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIEluc2VydCBpbmRpY2F0b3IgYXQgZW5kIFx1MjAxNCBzdXBwcmVzc2VkIHdoZW4gZHJhZ2dpbmcgYSBSdW5uaW5nIHRlc3QgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3Nob3dIZXJlICYmICFkcmFnZ2VkSXNSdW5uaW5nICYmIGluZCEuaW5kZXggPT09IHN0YW5kLnRlc3RzLmxlbmd0aCAmJiBzY2hlZHVsZS5sZW5ndGggPiAwICYmICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0ID0gc2NoZWR1bGVbc2NoZWR1bGUubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxlZnQsIHdpZHRoIH0gPSBnZXRCYXJQb3MobGFzdC5zdGFydCwgbGFzdC5kdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjRW5kID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChsYXN0LmVuZCwgc3RhbmQuY2hhbmdlb3Zlcl9ob3Vycywgd1N0YXJ0LCB3RW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZW92ZXJXaWR0aCA9IGhvdXJzQmV0d2VlbihsYXN0LmVuZCwgY0VuZCkgKiBweFBlckhvdXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogbGVmdCArIHdpZHRoICsgY2hhbmdlb3ZlcldpZHRoICsgOCwgdG9wOiAwLCBib3R0b206IDAgfX0+PEluc2VydExpbmUgdGhlbWU9e3RoZW1lfSAvPjwvZGl2PjtcclxuICAgICAgICAgICAgICAgICAgICB9KSgpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogRW1wdHkgc3RhdGUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3N0YW5kLnRlc3RzLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgaW5zZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDExLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogZHJhZ2dlZFRlc3RJZCA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLnRleHREaXNhYmxlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogZHJhZ2dlZFRlc3RJZCA/IDYwMCA6IDQwMCxcclxuICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZHJhZ2dlZFRlc3RJZCA/ICdEcm9wIGhlcmUgdG8gc2NoZWR1bGUnIDogJ0Ryb3AgdGVzdHMgaGVyZSB0byBzY2hlZHVsZSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgey8qIE5vIHN0YW5kcyBtZXNzYWdlICovfVxyXG4gICAgICAgICAgICB7c3RhbmRzLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHRleHRBbGlnbjogJ2NlbnRlcicsIHBhZGRpbmc6ICc0OHB4IDI0cHgnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgTm8gdGVzdCBzdGFuZHMgbG9hZGVkLiBCaW5kIHRoZSB0ZXN0U3RhbmRzIHByb3BlcnR5IHRvIHlvdXIgZ2V0VGVzdFN0YW5kcyBxdWVyeS5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtwb3BvdmVyICYmIChcbiAgICAgICAgPEFjdGlvblBvcG92ZXJcbiAgICAgICAgICBwb3BvdmVyPXtwb3BvdmVyfVxuICAgICAgICAgIGFzc2lnbmVkUGFydHNUZW1wbGF0ZT17YXNzaWduZWRQYXJ0c1RlbXBsYXRlfVxuICAgICAgICAgIGFzc2lnbmVkUGFydHNMaW5rQmFzZVVybD17YXNzaWduZWRQYXJ0c0xpbmtCYXNlVXJsfVxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICBvbkNsb3NlPXtjbG9zZVBvcG92ZXJ9XG4gICAgICAgICAgb25PcGVuRWRpdG9yPXtoYW5kbGVPcGVuRWRpdG9yfVxuICAgICAgICAgIG9uRWRpdFRlc3Q9e2hhbmRsZUVkaXRUZXN0fVxuICAgICAgICAgIHBhbmVsUmVmPXtwb3BvdmVyUmVmfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHtwb3BvdmVyICYmIGVkaXRvclBvcG92ZXIgJiYgKFxuICAgICAgICA8RWRpdG9yUG9wb3ZlclxuICAgICAgICAgIGVkaXRvclBvcG92ZXI9e2VkaXRvclBvcG92ZXJ9XG4gICAgICAgICAgcG9wb3Zlcj17cG9wb3Zlcn1cbiAgICAgICAgICBzdGF0dXNPcHRpb25zTGlzdD17c3RhdHVzT3B0aW9uc0xpc3R9XG4gICAgICAgICAgcHJpb3JpdHlJbnB1dFZhbHVlPXtwcmlvcml0eUlucHV0VmFsdWV9XG4gICAgICAgICAgc3RhcnREYXRlSW5wdXRWYWx1ZT17c3RhcnREYXRlSW5wdXRWYWx1ZX1cbiAgICAgICAgICBlbmREYXRlSW5wdXRWYWx1ZT17ZW5kRGF0ZUlucHV0VmFsdWV9XG4gICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgIG9uQ2xvc2U9e2Nsb3NlRWRpdG9yUG9wb3Zlcn1cbiAgICAgICAgICBvblByaW9yaXR5SW5wdXRDaGFuZ2U9e3NldFByaW9yaXR5SW5wdXRWYWx1ZX1cbiAgICAgICAgICBvbkNvbmZpcm1Qcmlvcml0eT17aGFuZGxlQ29uZmlybVByaW9yaXR5fVxuICAgICAgICAgIG9uUGlja1N0YXR1cz17aGFuZGxlUGlja1N0YXR1c31cbiAgICAgICAgICBvblN0YXJ0RGF0ZUlucHV0Q2hhbmdlPXtzZXRTdGFydERhdGVJbnB1dFZhbHVlfVxuICAgICAgICAgIG9uQ29uZmlybVN0YXJ0RGF0ZT17aGFuZGxlQ29uZmlybVN0YXJ0RGF0ZX1cbiAgICAgICAgICBvbkVuZERhdGVJbnB1dENoYW5nZT17c2V0RW5kRGF0ZUlucHV0VmFsdWV9XG4gICAgICAgICAgb25Db25maXJtRW5kRGF0ZT17aGFuZGxlQ29uZmlybUVuZERhdGV9XG4gICAgICAgICAgcGFuZWxSZWY9e2VkaXRvclBvcG92ZXJSZWZ9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcbiIsICJcbiAgICAgICAgICBleHBvcnQgY29uc3QgeyBSZXRvb2wgfSA9IHdpbmRvdy5jY2Nfc3VwcG9ydF9SZXRvb2xDdXN0b21Db21wb25lbkNvbGxlY3Rpb25zO1xuICAgICAgICAiLCAiXG4gICAgICAgICAgZXhwb3J0IGNvbnN0IHsgRnJhZ21lbnQsIGpzeHMsIGpzeCwgZGVmYXVsdCB9ID0gd2luZG93LmNjY19zdXBwb3J0X1JlYWN0SlNYUnVudGltZTtcbiAgICAgICAgIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNVLFdBQU8sVUFBVSxPQUFPO0FBQUE7QUFBQTs7O0FDRGxDLG1CQUFtRTs7O0FDQ2xELElBQU0sRUFBRSxPQUFPLElBQUksT0FBTzs7O0FDQTFCLElBQU0sRUFBRSxVQUFVLE1BQU0sS0FBSyxTQUFBQSxTQUFRLElBQUksT0FBTzs7O0FGb0lqRSxJQUFNLGFBQWEsQ0FDakIsS0FDQSxrQkFBMEMsQ0FBQyxHQUMzQyxxQkFDZ0I7QUFDaEIsUUFBTSxTQUFTLEtBQUssU0FBUztBQUU3QixRQUFNLFNBQVMsS0FBSyxXQUFXO0FBQy9CLFFBQU0sU0FBUyxLQUFLLFdBQVcsU0FBUyxZQUFZO0FBQ3BELFFBQU0sVUFBVSxLQUFLLG1CQUFtQixTQUFTLFlBQVk7QUFD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
