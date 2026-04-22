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
      onClick,
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
        /* @__PURE__ */ jsxs("div", { style: { minWidth: 0, display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, width: "100%" }, children: [
          /* @__PURE__ */ jsx("span", { style: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: label }),
          detail && /* @__PURE__ */ jsx("span", { style: { flexShrink: 0, fontFamily: theme.fontMono, fontSize: 10, color: theme.textMuted }, children: detail })
        ] })
      ]
    }
  );
};
var ActionPopover = ({
  popover,
  assignedPartsTemplate,
  assignedPartsLinkBaseUrl,
  statusOptionsList,
  priorityInputValue,
  startDateInputValue,
  endDateInputValue,
  theme,
  onClose,
  onModeChange,
  onPriorityInputChange,
  onConfirmPriority,
  onPickStatus,
  onEditTest,
  onStartDateInputChange,
  onConfirmStartDate,
  onEndDateInputChange,
  onConfirmEndDate,
  panelRef
}) => {
  const [flippedV, setFlippedV] = import_react.default.useState(false);
  const viewportPadding = 8;
  const popoverGap = 6;
  const popoverWidth = Math.min(520, window.innerWidth - viewportPadding * 2);
  const { anchorRect, test, mode, displayStatus, tooltipLines, scheduled } = popover;
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
  }, [mode, anchorRect, spaceAbove, spaceBelow]);
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
        mode === "root" ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: isRootTwoColumn ? "minmax(0, 3fr) minmax(150px, 1fr)" : "minmax(0, 1fr)",
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
                assignedPartSerials.length > 0 ? assignedPartSerials.map((serial) => {
                  const href = buildAssignedPartLink(assignedPartsLinkBaseUrl, serial);
                  return /* @__PURE__ */ jsx("div", { style: { fontSize: 12, marginBottom: 4, lineHeight: 1.4 }, children: href ? /* @__PURE__ */ jsx(
                    "a",
                    {
                      href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      style: { color: theme.accent, textDecoration: "underline", overflowWrap: "anywhere" },
                      children: serial
                    }
                  ) : /* @__PURE__ */ jsx("span", { style: { color: theme.textPrimary, overflowWrap: "anywhere" }, children: serial }) }, serial);
                }) : /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: theme.textMuted, lineHeight: 1.4 }, children: "None" })
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
                      /* @__PURE__ */ jsx(MenuItem, { label: "Change Priority", icon: "\u2B06", theme, onClick: () => onModeChange("priority") }),
                      /* @__PURE__ */ jsx(MenuItem, { label: "Change Status", icon: "\u25C9", theme, onClick: () => onModeChange("status") }),
                      displayStatus === "Running" && /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(MenuItem, { label: "Change Start Date", detail: startDateLabel || void 0, icon: "\u{1F4C5}", theme, onClick: () => onModeChange("start_date") }),
                        /* @__PURE__ */ jsx(MenuItem, { label: "Change End Date", detail: endDateLabel || void 0, icon: "\u{1F4C5}", theme, onClick: () => onModeChange("end_date") })
                      ] }),
                      /* @__PURE__ */ jsx(MenuItem, { label: "Edit Test", icon: "\u270E", theme, onClick: onEditTest })
                    ] })
                  ]
                }
              )
            ]
          }
        ) }) : mode === "priority" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { style: { padding: "10px 38px 8px 14px", borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: "flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ jsx("span", { onClick: () => onModeChange("root"), style: { cursor: "pointer", color: theme.textMuted, fontSize: 16, lineHeight: 1 }, children: "\u2190" }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontWeight: 600, color: theme.textSecondary }, children: "Change Priority" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { padding: "10px 14px" }, children: [
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
          ] })
        ] }) : mode === "status" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { style: { padding: "10px 38px 8px 14px", borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: "flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ jsx("span", { onClick: () => onModeChange("root"), style: { cursor: "pointer", color: theme.textMuted, fontSize: 16, lineHeight: 1 }, children: "\u2190" }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontWeight: 600, color: theme.textSecondary }, children: "Change Status" })
          ] }),
          /* @__PURE__ */ jsx("div", { style: { padding: "4px 0" }, children: statusOptionsList.map((s) => /* @__PURE__ */ jsx(MenuItem, { label: s === "NULL" ? "Clear Status (NULL)" : s, theme, onClick: () => onPickStatus(s) }, s)) })
        ] }) : mode === "start_date" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { style: { padding: "10px 38px 8px 14px", borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: "flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ jsx("span", { onClick: () => onModeChange("root"), style: { cursor: "pointer", color: theme.textMuted, fontSize: 16, lineHeight: 1 }, children: "\u2190" }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontWeight: 600, color: theme.textSecondary }, children: "Change Start Date" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { padding: "10px 14px" }, children: [
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
          ] })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { style: { padding: "10px 38px 8px 14px", borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: "flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ jsx("span", { onClick: () => onModeChange("root"), style: { cursor: "pointer", color: theme.textMuted, fontSize: 16, lineHeight: 1 }, children: "\u2190" }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontWeight: 600, color: theme.textSecondary }, children: "Change End Date" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { padding: "10px 14px" }, children: [
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
  const [priorityInputValue, setPriorityInputValue] = import_react.default.useState("");
  const [startDateInputValue, setStartDateInputValue] = import_react.default.useState("");
  const [endDateInputValue, setEndDateInputValue] = import_react.default.useState("");
  const [pendingStatusChange, setPendingStatusChange] = import_react.default.useState(null);
  const popoverRef = (0, import_react.useRef)(null);
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
    if (!popover)
      return;
    const onMouseDown = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target))
        setPopover(null);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape")
        setPopover(null);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [popover]);
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
    setPendingStatusChange(null);
    setStartDateInputValue("");
    setEndDateInputValue("");
  }, []);
  const handlePopoverModeChange = (0, import_react.useCallback)((mode) => {
    setPopover((prev) => prev ? { ...prev, mode } : null);
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
      setPopover((prev) => prev ? { ...prev, mode: "start_date" } : null);
      return;
    }
    if (status === "Tested") {
      setPendingStatusChange(status);
      setEndDateInputValue(getTodayDateInputValue());
      setStartDateInputValue("");
      setPopover((prev) => prev ? { ...prev, mode: "end_date" } : null);
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
                        mode: "root",
                        displayStatus: status,
                        tooltipLines: resolveTemplate(tipTemplate, test),
                        scheduled: null
                      });
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
                              mode: "root",
                              displayStatus,
                              tooltipLines: resolveTemplate(tipTemplate, test),
                              scheduled: { start: test.start, end: test.end }
                            });
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
        statusOptionsList,
        priorityInputValue,
        startDateInputValue,
        endDateInputValue,
        theme,
        onClose: closePopover,
        onModeChange: handlePopoverModeChange,
        onPriorityInputChange: setPriorityInputValue,
        onConfirmPriority: handleConfirmPriority,
        onPickStatus: handlePickStatus,
        onEditTest: handleEditTest,
        onStartDateInputChange: setStartDateInputValue,
        onConfirmStartDate: handleConfirmStartDate,
        onEndDateInputChange: setEndDateInputValue,
        onConfirmEndDate: handleConfirmEndDate,
        panelRef: popoverRef
      }
    )
  ] });
};
export {
  TestStandScheduler
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhY3QtZ2xvYmFsOnJlYWN0IiwgIi4uL3NyYy9pbmRleC50c3giLCAidHJ5cmV0b29sLWN1c3RvbS1jb21wb25lbnQtY29sbGVjdGlvbnMtZ2xvYmFsOkB0cnlyZXRvb2wvY3VzdG9tLWNvbXBvbmVudC1zdXBwb3J0IiwgInJlYWN0LWpzeC1ydW50aW1lLWdsb2JhbDpyZWFjdC9qc3gtcnVudGltZSJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmVhY3Q7XG4gICAgICAgICIsICJpbXBvcnQgUmVhY3QsIHsgRkMsIHVzZVJlZiwgdXNlTWVtbywgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSZXRvb2wgfSBmcm9tIFwiQHRyeXJldG9vbC9jdXN0b20tY29tcG9uZW50LXN1cHBvcnRcIjtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUeXBlc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFRlc3REYXRhIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkdXJhdGlvbjogbnVtYmVyO1xyXG4gIG93bmVyOiBzdHJpbmc7XHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuICBub3Rlczogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpb3JpdHlfb3JkZXI6IG51bWJlciB8IG51bGw7XHJcbiAgYWxsb2NhdGlvbl9pZDogbnVtYmVyIHwgbnVsbDtcclxuICBhc3NpZ25lZF9wYXJ0czogc3RyaW5nIHwgbnVsbDtcclxuICBwYXJ0X3JlYWR5X2RhdGU6IHN0cmluZyB8IG51bGw7XHJcbiAgcGFydF9zdGF0dXM6IHN0cmluZztcclxuICB0ZXN0X3N0YXJ0ZWRfZGF0ZTogc3RyaW5nIHwgbnVsbDtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7IC8vIGFsbG93IGFyYml0cmFyeSBmaWVsZHMgZm9yIHRlbXBsYXRlIHJlc29sdXRpb25cclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YW5kRGVmIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBjaGFuZ2VvdmVyX2hvdXJzPzogbnVtYmVyIHwgbnVsbDtcclxufVxyXG5cclxuaW50ZXJmYWNlIE5vbldvcmtpbmdCbG9jayB7XHJcbiAgc3RhcnQ6IERhdGU7XHJcbiAgZW5kOiBEYXRlO1xyXG4gIG5vdGVzPzogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSW50ZXJuYWxTdGFuZCB7XHJcbiAgaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgdGVzdHM6IFRlc3REYXRhW107XHJcbiAgY2hhbmdlb3Zlcl9ob3VyczogbnVtYmVyO1xyXG4gIG5vbldvcmtpbmdCbG9ja3M6IE5vbldvcmtpbmdCbG9ja1tdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgU2NoZWR1bGVkVGVzdCBleHRlbmRzIFRlc3REYXRhIHtcclxuICBzdGFydDogRGF0ZTtcclxuICBlbmQ6IERhdGU7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnNlcnRJbmRpY2F0b3Ige1xyXG4gIHN0YW5kSWQ6IG51bWJlciB8IHN0cmluZztcclxuICBpbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQWxsb2NhdGlvblJlY29yZCB7XHJcbiAgdGVzdF9pZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBwcmlvcml0eV9vcmRlcjogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQW5jaG9yUmVjdCB7XHJcbiAgdG9wOiBudW1iZXI7XHJcbiAgYm90dG9tOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG4gIHJpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBQb3BvdmVyU3RhdGUge1xuICBhbmNob3JSZWN0OiBBbmNob3JSZWN0O1xuICB0ZXN0OiBUZXN0RGF0YTtcbiAgbW9kZTogJ3Jvb3QnIHwgJ3ByaW9yaXR5JyB8ICdzdGF0dXMnIHwgJ3N0YXJ0X2RhdGUnIHwgJ2VuZF9kYXRlJztcbiAgZGlzcGxheVN0YXR1czogc3RyaW5nO1xuICB0b29sdGlwTGluZXM6IHN0cmluZztcbiAgc2NoZWR1bGVkOiB7IHN0YXJ0OiBEYXRlOyBlbmQ6IERhdGUgfSB8IG51bGw7XG59XG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFRoZW1lXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5pbnRlcmZhY2UgVGhlbWVUb2tlbnMge1xyXG4gIGlzRGFyazogYm9vbGVhbjtcclxuXHJcbiAgLy8gQmFja2dyb3VuZHNcclxuICBjYW52YXM6IHN0cmluZztcclxuICBzdXJmYWNlOiBzdHJpbmc7XHJcbiAgc3VyZmFjZVNlY29uZGFyeTogc3RyaW5nO1xyXG4gIGJnU3VidGxlOiBzdHJpbmc7XHJcbiAgc3VyZmFjZUhvdmVyOiBzdHJpbmc7XHJcbiAgYWNjZW50U3VidGxlOiBzdHJpbmc7XHJcblxyXG4gIC8vIFJ1bm5pbmcgKHB1cnBsZSkgdGludHNcclxuICBydW5uaW5nQmc6IHN0cmluZztcclxuICBydW5uaW5nQm9yZGVyOiBzdHJpbmc7XHJcbiAgcnVubmluZ1RleHQ6IHN0cmluZztcclxuICBydW5uaW5nVGV4dERhcms6IHN0cmluZztcclxuXHJcbiAgLy8gVGV4dFxyXG4gIHRleHRQcmltYXJ5OiBzdHJpbmc7XHJcbiAgdGV4dFNlY29uZGFyeTogc3RyaW5nO1xyXG4gIHRleHRUZXJ0aWFyeTogc3RyaW5nO1xyXG4gIHRleHRNdXRlZDogc3RyaW5nO1xyXG4gIHRleHREaXNhYmxlZDogc3RyaW5nO1xyXG5cclxuICAvLyBCb3JkZXJzXHJcbiAgYm9yZGVyOiBzdHJpbmc7XHJcbiAgYm9yZGVyU3Ryb25nOiBzdHJpbmc7XHJcblxyXG4gIC8vIEFjY2VudCAocHJpbWFyeSBhY3Rpb24pXHJcbiAgYWNjZW50OiBzdHJpbmc7XHJcbiAgYWNjZW50Rmc6IHN0cmluZztcclxuICBhY2NlbnRNdXRlZDogc3RyaW5nO1xyXG5cclxuICAvLyBUeXBvZ3JhcGh5XHJcbiAgZm9udEZhbWlseTogc3RyaW5nO1xyXG4gIGZvbnRNb25vOiBzdHJpbmc7XHJcblxyXG4gIC8vIFJhZGlpIChudW1lcmljIHB4KVxyXG4gIHJhZGl1c1NtOiBudW1iZXI7XHJcbiAgcmFkaXVzOiBudW1iZXI7XHJcbiAgcmFkaXVzTGc6IG51bWJlcjtcclxuICByYWRpdXNYbDogbnVtYmVyO1xyXG5cclxuICAvLyBTdGF0dXMgY29sb3VycyAoY2FwIGJhcnMgJiB0ZXh0KVxyXG4gIHN0YXR1c0NhcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuICBzdGF0dXNUZXh0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG59XHJcblxyXG5jb25zdCBidWlsZFRoZW1lID0gKFxyXG4gIHJhdzogYW55LFxyXG4gIHN0YXR1c092ZXJyaWRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9LFxyXG4gIG1vbm9Gb250T3ZlcnJpZGU/OiBzdHJpbmdcclxuKTogVGhlbWVUb2tlbnMgPT4ge1xyXG4gIGNvbnN0IGlzRGFyayA9IHJhdz8ubW9kZSA9PT0gJ2RhcmsnO1xyXG5cclxuICBjb25zdCBhY2NlbnQgPSByYXc/LnByaW1hcnkgfHwgJyMzQjgyRjYnO1xyXG4gIGNvbnN0IGNhbnZhcyA9IHJhdz8uY2FudmFzIHx8IChpc0RhcmsgPyAnIzFDMUMyRScgOiAnI0Y5RkFGQicpO1xyXG4gIGNvbnN0IHN1cmZhY2UgPSByYXc/LnN1cmZhY2VQcmltYXJ5IHx8IChpc0RhcmsgPyAnIzI1MjUzNScgOiAnI0ZGRkZGRicpO1xyXG4gIGNvbnN0IHN1cmZhY2VTZWNvbmRhcnkgPSByYXc/LnN1cmZhY2VTZWNvbmRhcnkgfHwgKGlzRGFyayA/ICcjMUUxRTMwJyA6ICcjRjNGNEY2Jyk7XHJcbiAgY29uc3QgZm9udEZhbWlseSA9IHJhdz8uZGVmYXVsdEZvbnQ/Lm5hbWVcclxuICAgID8gYCcke3Jhdy5kZWZhdWx0Rm9udC5uYW1lfScsIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBzYW5zLXNlcmlmYFxyXG4gICAgOiBcIidETSBTYW5zJywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCI7XHJcblxyXG4gIGNvbnN0IGJhc2VSYWRpdXMgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgciA9IHJhdz8uYm9yZGVyUmFkaXVzO1xyXG4gICAgaWYgKCFyKSByZXR1cm4gNjtcclxuICAgIGNvbnN0IG4gPSBwYXJzZUludChTdHJpbmcociksIDEwKTtcclxuICAgIHJldHVybiBpc05hTihuKSA/IDYgOiBuO1xyXG4gIH0pKCk7XHJcblxyXG4gIC8vIFRleHRcclxuICBjb25zdCB0ZXh0UHJpbWFyeSAgPSBpc0RhcmsgPyAnI0Y5RkFGQicgOiAnIzExMTgyNyc7XHJcbiAgY29uc3QgdGV4dFNlY29uZGFyeSA9IGlzRGFyayA/ICcjRDFENURCJyA6ICcjMzc0MTUxJztcclxuICBjb25zdCB0ZXh0VGVydGlhcnkgPSBpc0RhcmsgPyAnI0EwQUVDMCcgOiAnIzRCNTU2Myc7XHJcbiAgY29uc3QgdGV4dE11dGVkICAgID0gaXNEYXJrID8gJyM3MTgwOTYnIDogJyM2QjcyODAnO1xyXG4gIGNvbnN0IHRleHREaXNhYmxlZCA9IGlzRGFyayA/ICcjNEI1NTYzJyA6ICcjOUNBM0FGJztcclxuXHJcbiAgLy8gQm9yZGVyc1xyXG4gIGNvbnN0IGJvcmRlciAgICAgICA9IGlzRGFyayA/ICcjMzc0MTUxJyA6ICcjRTVFN0VCJztcclxuICBjb25zdCBib3JkZXJTdHJvbmcgPSBpc0RhcmsgPyAnIzRCNTU2MycgOiAnI0QxRDVEQic7XHJcblxyXG4gIC8vIEJhY2tncm91bmRzXHJcbiAgY29uc3QgYmdTdWJ0bGUgICAgID0gaXNEYXJrID8gJyMxQTFBMkUnIDogJyNGM0Y0RjYnO1xyXG4gIGNvbnN0IHN1cmZhY2VIb3ZlciA9IGlzRGFyayA/ICcjMkUyRTNFJyA6ICcjRjNGNEY2JztcclxuICBjb25zdCBhY2NlbnRTdWJ0bGUgPSBpc0RhcmsgPyBgJHthY2NlbnR9MzNgIDogJyNFRkY2RkYnO1xyXG4gIGNvbnN0IGFjY2VudE11dGVkICA9IGlzRGFyayA/IGAke2FjY2VudH04MGAgOiAnIzkzQzVGRCc7XHJcblxyXG4gIC8vIFJ1bm5pbmcgcHVycGxlXHJcbiAgY29uc3QgcnVubmluZ0JnICAgICAgID0gaXNEYXJrID8gJyMyRDFCNEUnIDogJyNGM0U4RkYnO1xyXG4gIGNvbnN0IHJ1bm5pbmdCb3JkZXIgICA9IGlzRGFyayA/ICcjN0UzREFBJyA6ICcjQzRCNUZEJztcclxuICBjb25zdCBydW5uaW5nVGV4dCAgICAgPSAnIzdFMjJDRSc7XHJcbiAgY29uc3QgcnVubmluZ1RleHREYXJrID0gJyMzQjA3NjQnO1xyXG5cclxuICAvLyBTdGF0dXMgY2FwIGNvbG91cnNcclxuICBjb25zdCBkZWZhdWx0Q2FwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgJ1J1bm5pbmcnOiAgICAgICAgICAgICcjOTMzM0VBJyxcclxuICAgICdSZWFkeSc6ICAgICAgICAgICAgICAnIzIyQzU1RScsXHJcbiAgICAnT24gVGltZSc6ICAgICAgICAgICAgJyNFNUEwMEQnLFxyXG4gICAgJ0RlbGF5ZWQnOiAgICAgICAgICAgICcjRUY0NDQ0JyxcclxuICAgICdQYXJ0cyBOb3QgQXNzaWduZWQnOiAnIzlDQTNBRicsXHJcbiAgICAnSW4gUHJvZ3Jlc3MnOiAgICAgICAgJyNFNUEwMEQnLFxyXG4gIH07XHJcbiAgY29uc3QgZGVmYXVsdFRleHQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAnUnVubmluZyc6ICAgICAgICAgICAgJyM3RTIyQ0UnLFxyXG4gICAgJ1JlYWR5JzogICAgICAgICAgICAgICcjMTZBMzRBJyxcclxuICAgICdPbiBUaW1lJzogICAgICAgICAgICAnI0I0NTMwOScsXHJcbiAgICAnRGVsYXllZCc6ICAgICAgICAgICAgJyNEQzI2MjYnLFxyXG4gICAgJ1BhcnRzIE5vdCBBc3NpZ25lZCc6ICcjNkI3MjgwJyxcclxuICAgICdJbiBQcm9ncmVzcyc6ICAgICAgICAnI0I0NTMwOScsXHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzQ2FwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcbiAgY29uc3Qgc3RhdHVzVGV4dDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGRlZmF1bHRDYXApKSB7XHJcbiAgICBzdGF0dXNDYXBba2V5XSAgPSBzdGF0dXNPdmVycmlkZXNba2V5XSB8fCBkZWZhdWx0Q2FwW2tleV07XHJcbiAgICAvLyBkZXJpdmUgdGV4dCBjb2xvdXI6IGlmIG92ZXJyaWRkZW4sIGRhcmtlbiB0aGUgY2FwIGNvbG91ciBzbGlnaHRseTsgb3RoZXJ3aXNlIHVzZSBkZWZhdWx0XHJcbiAgICBzdGF0dXNUZXh0W2tleV0gPSBzdGF0dXNPdmVycmlkZXNba2V5XVxyXG4gICAgICA/IHN0YXR1c092ZXJyaWRlc1trZXldXHJcbiAgICAgIDogZGVmYXVsdFRleHRba2V5XTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpc0RhcmssXHJcbiAgICBjYW52YXMsIHN1cmZhY2UsIHN1cmZhY2VTZWNvbmRhcnksIGJnU3VidGxlLCBzdXJmYWNlSG92ZXIsIGFjY2VudFN1YnRsZSxcclxuICAgIHJ1bm5pbmdCZywgcnVubmluZ0JvcmRlciwgcnVubmluZ1RleHQsIHJ1bm5pbmdUZXh0RGFyayxcclxuICAgIHRleHRQcmltYXJ5LCB0ZXh0U2Vjb25kYXJ5LCB0ZXh0VGVydGlhcnksIHRleHRNdXRlZCwgdGV4dERpc2FibGVkLFxyXG4gICAgYm9yZGVyLCBib3JkZXJTdHJvbmcsXHJcbiAgICBhY2NlbnQsIGFjY2VudEZnOiAnI0ZGRkZGRicsIGFjY2VudE11dGVkLFxyXG4gICAgZm9udEZhbWlseSxcclxuICAgIGZvbnRNb25vOiBtb25vRm9udE92ZXJyaWRlID8gYCcke21vbm9Gb250T3ZlcnJpZGV9JywgbW9ub3NwYWNlYCA6IGZvbnRGYW1pbHksXHJcbiAgICByYWRpdXNTbTogTWF0aC5tYXgoMiwgYmFzZVJhZGl1cyAtIDIpLFxyXG4gICAgcmFkaXVzOiAgIGJhc2VSYWRpdXMsXHJcbiAgICByYWRpdXNMZzogYmFzZVJhZGl1cyArIDIsXHJcbiAgICByYWRpdXNYbDogYmFzZVJhZGl1cyArIDQsXHJcbiAgICBzdGF0dXNDYXAsXHJcbiAgICBzdGF0dXNUZXh0LFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gVGVtcGxhdGUgUmVzb2x1dGlvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgZm9ybWF0RmllbGRWYWx1ZSA9ICh2YWw6IGFueSk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09ICcnIHx8IHZhbCA9PT0gJ25hbicpIHJldHVybiAnJztcclxuICBjb25zdCBzdHIgPSBTdHJpbmcodmFsKTtcclxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfS8udGVzdChzdHIpKSB7XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoc3RyKTtcclxuICAgIGlmICghaXNOYU4oZC5nZXRUaW1lKCkpKSB7XHJcbiAgICAgIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JyB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHN0cjtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVUZW1wbGF0ZSA9ICh0ZW1wbGF0ZTogYW55LCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogc3RyaW5nID0+IHtcbiAgaWYgKCF0ZW1wbGF0ZSkgcmV0dXJuICcnO1xuICBjb25zdCBzdHIgPSB0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnID8gdGVtcGxhdGUgOiBTdHJpbmcodGVtcGxhdGUpO1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAoXywgZmllbGQpID0+IGZvcm1hdEZpZWxkVmFsdWUoZGF0YVtmaWVsZF0pKTtcbn07XG5cbmNvbnN0IHBhcnNlQXNzaWduZWRQYXJ0U2VyaWFscyA9ICh2YWw6IGFueSk6IHN0cmluZ1tdID0+IHtcbiAgY29uc3Qgc3RyID0gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyB2YWwudHJpbSgpIDogU3RyaW5nKHZhbCB8fCAnJykudHJpbSgpO1xuICBpZiAoIXN0cikgcmV0dXJuIFtdO1xuICBjb25zdCBwYXJ0cyA9IHN0ci5pbmNsdWRlcygnLCcpXG4gICAgPyBzdHIuc3BsaXQoJywnKVxuICAgIDogL15cXGQrKFxccytcXGQrKSskLy50ZXN0KHN0cilcbiAgICAgID8gc3RyLnNwbGl0KC9cXHMrLylcbiAgICAgIDogW3N0cl07XG4gIHJldHVybiBwYXJ0cy5tYXAocGFydCA9PiBwYXJ0LnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pO1xufTtcblxuY29uc3QgYnVpbGRBc3NpZ25lZFBhcnRMaW5rID0gKGJhc2VVcmw6IHN0cmluZywgc2VyaWFsOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB0cmltbWVkQmFzZSA9IFN0cmluZyhiYXNlVXJsIHx8ICcnKS50cmltKCk7XG4gIGlmICghdHJpbW1lZEJhc2UpIHJldHVybiAnJztcbiAgcmV0dXJuIGAke3RyaW1tZWRCYXNlfSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNlcmlhbCl9YDtcbn07XG5cbmNvbnN0IHJlc29sdmVBc3NpZ25lZFBhcnRzVmFsdWUgPSAodGVtcGxhdGU6IGFueSwgZGF0YTogUmVjb3JkPHN0cmluZywgYW55Pik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHN0ciA9IHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycgPyB0ZW1wbGF0ZS50cmltKCkgOiBTdHJpbmcodGVtcGxhdGUgfHwgJycpLnRyaW0oKTtcbiAgaWYgKCFzdHIpIHJldHVybiAnJztcbiAgaWYgKC9eXFx3KyQvLnRlc3Qoc3RyKSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGF0YSwgc3RyKSkge1xuICAgIHJldHVybiBmb3JtYXRGaWVsZFZhbHVlKGRhdGFbc3RyXSk7XG4gIH1cbiAgcmV0dXJuIHJlc29sdmVUZW1wbGF0ZShzdHIsIGRhdGEpO1xufTtcblxyXG5jb25zdCBpc1RlbXBsYXRlRW1wdHkgPSAodGVtcGxhdGU6IGFueSwgZGF0YTogUmVjb3JkPHN0cmluZywgYW55Pik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IHN0ciA9IHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycgPyB0ZW1wbGF0ZSA6IFN0cmluZyh0ZW1wbGF0ZSB8fCAnJyk7XHJcbiAgY29uc3QgcmVzb2x2ZWQgPSByZXNvbHZlVGVtcGxhdGUoc3RyLCBkYXRhKTtcclxuICBjb25zdCBzdGF0aWNPbmx5ID0gc3RyLnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAnJyk7XHJcbiAgcmV0dXJuIHJlc29sdmVkLnRyaW0oKSA9PT0gc3RhdGljT25seS50cmltKCkgfHwgcmVzb2x2ZWQudHJpbSgpID09PSAnJztcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBEYXRlIFV0aWxpdGllc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgTVNfUEVSX0hPVVIgPSAzNjAwMDAwO1xyXG5cclxuY29uc3QgcGFyc2VMb2NhbERhdGUgPSAoZGF0ZVN0cjogc3RyaW5nIHwgbnVsbCk6IERhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIWRhdGVTdHIpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGRhdGVQYXJ0ID0gZGF0ZVN0ci5zcGxpdCgnVCcpWzBdOyAvLyBzdHJpcCB0aW1lIGNvbXBvbmVudCBpZiBwcmVzZW50IChlLmcuIElTTyB0aW1lc3RhbXBzKVxyXG4gIGNvbnN0IHBhcnRzID0gZGF0ZVBhcnQuc3BsaXQoJy0nKS5tYXAoTnVtYmVyKTtcclxuICBpZiAocGFydHMubGVuZ3RoICE9PSAzIHx8IHBhcnRzLnNvbWUoaXNOYU4pKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBkID0gbmV3IERhdGUocGFydHNbMF0sIHBhcnRzWzFdIC0gMSwgcGFydHNbMl0sIDAsIDAsIDAsIDApO1xyXG4gIHJldHVybiBpc05hTihkLmdldFRpbWUoKSkgPyBudWxsIDogZDtcclxufTtcclxuXHJcbmNvbnN0IHRvTWlkbmlnaHQgPSAoZGF0ZTogRGF0ZSk6IERhdGUgPT4ge1xuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSk7XG4gIGQuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBkO1xufTtcblxuY29uc3QgZm9ybWF0RGF0ZUlucHV0VmFsdWUgPSAodmFsdWU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gJyc7XG4gIGNvbnN0IGRhdGVQYXJ0ID0gU3RyaW5nKHZhbHVlKS5zcGxpdCgnVCcpWzBdO1xuICByZXR1cm4gL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoZGF0ZVBhcnQpID8gZGF0ZVBhcnQgOiAnJztcbn07XG5cbmNvbnN0IGdldFRvZGF5RGF0ZUlucHV0VmFsdWUgPSAoKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICByZXR1cm4gYCR7dG9kYXkuZ2V0RnVsbFllYXIoKX0tJHtTdHJpbmcodG9kYXkuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyl9LSR7U3RyaW5nKHRvZGF5LmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKX1gO1xufTtcblxuY29uc3QgZm9ybWF0TWVudURhdGVMYWJlbCA9ICh2YWx1ZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlTG9jYWxEYXRlKHZhbHVlID8/IG51bGwpO1xuICBpZiAoIXBhcnNlZCkgcmV0dXJuICcnO1xuICByZXR1cm4gcGFyc2VkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7XG4gICAgZGF5OiAnMi1kaWdpdCcsXG4gICAgbW9udGg6ICcyLWRpZ2l0JyxcbiAgICB5ZWFyOiAnMi1kaWdpdCcsXG4gIH0pO1xufTtcblxyXG5jb25zdCBpc1dvcmtEYXkgPSAoZDogRGF0ZSk6IGJvb2xlYW4gPT4gZC5nZXREYXkoKSAhPT0gMCAmJiBkLmdldERheSgpICE9PSA2O1xyXG5cclxuY29uc3QgZ2V0TmV4dFdvcmtkYXlTdGFydCA9IChkYXRlOiBEYXRlLCB3b3JrU3RhcnQ6IG51bWJlcik6IERhdGUgPT4ge1xyXG4gIGNvbnN0IGQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICBkLnNldEhvdXJzKHdvcmtTdGFydCwgMCwgMCwgMCk7XHJcbiAgd2hpbGUgKGQuZ2V0RGF5KCkgPT09IDAgfHwgZC5nZXREYXkoKSA9PT0gNikge1xyXG4gICAgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgfVxyXG4gIHJldHVybiBkO1xyXG59O1xyXG5cclxuY29uc3QgY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZCA9IChcclxuICBwcmV2VGVzdEVuZDogRGF0ZSxcclxuICBjaGFuZ2VvdmVySG91cnM6IG51bWJlcixcclxuICB3b3JrU3RhcnQ6IG51bWJlcixcclxuICB3b3JrRW5kOiBudW1iZXJcclxuKTogRGF0ZSA9PiB7XHJcbiAgbGV0IGNoYW5nZW92ZXJTdGFydCA9IG5ldyBEYXRlKHByZXZUZXN0RW5kKTtcclxuXHJcbiAgaWYgKCFpc1dvcmtEYXkoY2hhbmdlb3ZlclN0YXJ0KSB8fCBjaGFuZ2VvdmVyU3RhcnQuZ2V0SG91cnMoKSA+PSB3b3JrRW5kKSB7XHJcbiAgICBjaGFuZ2VvdmVyU3RhcnQgPSBnZXROZXh0V29ya2RheVN0YXJ0KG5ldyBEYXRlKGNoYW5nZW92ZXJTdGFydC5nZXRUaW1lKCkgKyBNU19QRVJfSE9VUiAqIDEyKSwgd29ya1N0YXJ0KTtcclxuICB9IGVsc2UgaWYgKGNoYW5nZW92ZXJTdGFydC5nZXRIb3VycygpIDwgd29ya1N0YXJ0KSB7XHJcbiAgICBjaGFuZ2VvdmVyU3RhcnQuc2V0SG91cnMod29ya1N0YXJ0LCAwLCAwLCAwKTtcclxuICB9XHJcblxyXG4gIGxldCByZW1haW5pbmcgPSBjaGFuZ2VvdmVySG91cnM7XHJcbiAgbGV0IGVuZCA9IG5ldyBEYXRlKGNoYW5nZW92ZXJTdGFydCk7XHJcblxyXG4gIHdoaWxlIChyZW1haW5pbmcgPiAwKSB7XHJcbiAgICBpZiAoIWlzV29ya0RheShlbmQpKSB7XHJcbiAgICAgIGVuZCA9IGdldE5leHRXb3JrZGF5U3RhcnQobmV3IERhdGUoZW5kLmdldFRpbWUoKSArIE1TX1BFUl9IT1VSICogMTIpLCB3b3JrU3RhcnQpO1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGF2YWlsYWJsZSA9IHdvcmtFbmQgLSBlbmQuZ2V0SG91cnMoKTtcclxuICAgIGNvbnN0IGFwcGx5ID0gTWF0aC5taW4ocmVtYWluaW5nLCBhdmFpbGFibGUpO1xyXG4gICAgZW5kLnNldFRpbWUoZW5kLmdldFRpbWUoKSArIGFwcGx5ICogTVNfUEVSX0hPVVIpO1xyXG4gICAgcmVtYWluaW5nIC09IGFwcGx5O1xyXG4gICAgaWYgKHJlbWFpbmluZyA+IDApIHtcclxuICAgICAgZW5kID0gZ2V0TmV4dFdvcmtkYXlTdGFydChuZXcgRGF0ZShlbmQuZ2V0VGltZSgpICsgTVNfUEVSX0hPVVIgKiAxMiksIHdvcmtTdGFydCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBlbmQ7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZU5vbldvcmtpbmdCbG9ja3MgPSAocmF3OiBhbnkpOiBOb25Xb3JraW5nQmxvY2tbXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHJhdykpIHJldHVybiBbXTtcclxuICBjb25zdCByZXN1bHQ6IE5vbldvcmtpbmdCbG9ja1tdID0gW107XHJcbiAgZm9yIChjb25zdCBlbnRyeSBvZiByYXcpIHtcclxuICAgIGlmICghZW50cnkgfHwgdHlwZW9mIGVudHJ5ICE9PSAnb2JqZWN0JykgY29udGludWU7XHJcbiAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKGVudHJ5LnN0YXJ0KTtcclxuICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKGVudHJ5LmVuZCk7XHJcbiAgICBpZiAoaXNOYU4oc3RhcnQuZ2V0VGltZSgpKSB8fCBpc05hTihlbmQuZ2V0VGltZSgpKSB8fCBlbmQgPD0gc3RhcnQpIGNvbnRpbnVlO1xyXG4gICAgcmVzdWx0LnB1c2goeyBzdGFydCwgZW5kLCBub3RlczogZW50cnkubm90ZXMgPz8gdW5kZWZpbmVkIH0pO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgYWR2YW5jZVBhc3ROb25Xb3JraW5nID0gKGRhdGU6IERhdGUsIGJsb2NrczogTm9uV29ya2luZ0Jsb2NrW10pOiBEYXRlID0+IHtcclxuICBsZXQgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgbGV0IGNoYW5nZWQgPSB0cnVlO1xyXG4gIHdoaWxlIChjaGFuZ2VkKSB7XHJcbiAgICBjaGFuZ2VkID0gZmFsc2U7XHJcbiAgICBmb3IgKGNvbnN0IGIgb2YgYmxvY2tzKSB7XHJcbiAgICAgIGlmIChyZXN1bHQgPj0gYi5zdGFydCAmJiByZXN1bHQgPCBiLmVuZCkge1xyXG4gICAgICAgIHJlc3VsdCA9IG5ldyBEYXRlKGIuZW5kKTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuLy8gUHVzaCBzdGFydCBmb3J3YXJkIHVudGlsIHRoZSBmdWxsIHdpbmRvdyBbc3RhcnQsIHN0YXJ0K2R1cmF0aW9uKSBkb2Vzbid0IG92ZXJsYXAgYW55IGJsb2NrLlxyXG5jb25zdCBmaW5kVmFsaWRTdGFydCA9IChwcm9wb3NlZFN0YXJ0OiBEYXRlLCBkdXJhdGlvbkhvdXJzOiBudW1iZXIsIGJsb2NrczogTm9uV29ya2luZ0Jsb2NrW10pOiBEYXRlID0+IHtcclxuICBsZXQgcmVzdWx0ID0gbmV3IERhdGUocHJvcG9zZWRTdGFydCk7XHJcbiAgbGV0IGNoYW5nZWQgPSB0cnVlO1xyXG4gIHdoaWxlIChjaGFuZ2VkKSB7XHJcbiAgICBjaGFuZ2VkID0gZmFsc2U7XHJcbiAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShyZXN1bHQuZ2V0VGltZSgpICsgZHVyYXRpb25Ib3VycyAqIE1TX1BFUl9IT1VSKTtcclxuICAgIGZvciAoY29uc3QgYiBvZiBibG9ja3MpIHtcclxuICAgICAgaWYgKHJlc3VsdCA8IGIuZW5kICYmIGVuZCA+IGIuc3RhcnQpIHtcclxuICAgICAgICByZXN1bHQgPSBuZXcgRGF0ZShiLmVuZCk7XHJcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlRGF5cyA9IChzdGFydDogRGF0ZSwgbnVtRGF5czogbnVtYmVyKTogRGF0ZVtdID0+IHtcclxuICBjb25zdCBkYXlzOiBEYXRlW10gPSBbXTtcclxuICBsZXQgY3VyID0gbmV3IERhdGUoc3RhcnQpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtRGF5czsgaSsrKSB7XHJcbiAgICBkYXlzLnB1c2gobmV3IERhdGUoY3VyKSk7XHJcbiAgICBjdXIuc2V0RGF0ZShjdXIuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgfVxyXG4gIHJldHVybiBkYXlzO1xyXG59O1xyXG5cclxuY29uc3QgZ2VuZXJhdGVXZWVrcyA9IChzdGFydDogRGF0ZSwgbnVtRGF5czogbnVtYmVyKTogRGF0ZVtdID0+IHtcclxuICBjb25zdCByZXN1bHQ6IERhdGVbXSA9IFtdO1xyXG4gIGxldCBjdXIgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgd2hpbGUgKGN1ci5nZXREYXkoKSAhPT0gMSkgY3VyLnNldERhdGUoY3VyLmdldERhdGUoKSAtIDEpO1xyXG4gIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgZW5kRGF0ZS5zZXREYXRlKGVuZERhdGUuZ2V0RGF0ZSgpICsgbnVtRGF5cyk7XHJcbiAgd2hpbGUgKGN1ciA8IGVuZERhdGUpIHtcclxuICAgIHJlc3VsdC5wdXNoKG5ldyBEYXRlKGN1cikpO1xyXG4gICAgY3VyLnNldERhdGUoY3VyLmdldERhdGUoKSArIDcpO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgaG91cnNCZXR3ZWVuID0gKGE6IERhdGUsIGI6IERhdGUpOiBudW1iZXIgPT4gKGIuZ2V0VGltZSgpIC0gYS5nZXRUaW1lKCkpIC8gTVNfUEVSX0hPVVI7XHJcbmNvbnN0IGZvcm1hdFdlZWsgPSAoZDogRGF0ZSk6IHN0cmluZyA9PiBgVy9DICR7ZC50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLUdCJywgeyBkYXk6ICcyLWRpZ2l0JywgbW9udGg6ICdzaG9ydCcgfSl9YDtcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gUGFydCBTdGF0dXMgTG9naWNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IG5vcm1hbGl6ZVBhcnRTdGF0dXMgPSAocmF3U3RhdHVzOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghcmF3U3RhdHVzIHx8IHJhd1N0YXR1cyA9PT0gJ25hbicpIHJldHVybiAnSW4gUHJvZ3Jlc3MnO1xyXG4gIGNvbnN0IGxvd2VyID0gcmF3U3RhdHVzLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xyXG4gIGlmIChsb3dlciA9PT0gJ3JlYWR5JykgcmV0dXJuICdSZWFkeSc7XHJcbiAgaWYgKGxvd2VyID09PSAncGFydHMgbm90IGFzc2lnbmVkJykgcmV0dXJuICdQYXJ0cyBOb3QgQXNzaWduZWQnO1xyXG4gIHJldHVybiAnSW4gUHJvZ3Jlc3MnO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Q2FsY3VsYXRlZFN0YXR1cyA9ICh0ZXN0OiBUZXN0RGF0YSwgdGVzdFN0YXJ0RGF0ZTogRGF0ZSB8IG51bGwgPSBudWxsKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBiYXNlU3RhdHVzID0gbm9ybWFsaXplUGFydFN0YXR1cyh0ZXN0LnBhcnRfc3RhdHVzKTtcclxuICBpZiAoYmFzZVN0YXR1cyA9PT0gJ1JlYWR5JykgcmV0dXJuICdSZWFkeSc7XHJcbiAgaWYgKGJhc2VTdGF0dXMgPT09ICdQYXJ0cyBOb3QgQXNzaWduZWQnKSByZXR1cm4gJ1BhcnRzIE5vdCBBc3NpZ25lZCc7XHJcblxyXG4gIGlmICh0ZXN0U3RhcnREYXRlICYmIHRlc3QucGFydF9yZWFkeV9kYXRlKSB7XHJcbiAgICBjb25zdCByZWFkeURhdGUgPSBwYXJzZUxvY2FsRGF0ZSh0ZXN0LnBhcnRfcmVhZHlfZGF0ZSk7XHJcbiAgICBjb25zdCBzdGFydERhdGUgPSB0b01pZG5pZ2h0KHRlc3RTdGFydERhdGUpO1xyXG4gICAgaWYgKHJlYWR5RGF0ZSAmJiBzdGFydERhdGUpIHtcclxuICAgICAgcmV0dXJuIHJlYWR5RGF0ZS5nZXRUaW1lKCkgPiBzdGFydERhdGUuZ2V0VGltZSgpID8gJ0RlbGF5ZWQnIDogJ09uIFRpbWUnO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gJ0luIFByb2dyZXNzJztcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBTdGF0dXMgLyBQcmlvcml0eSBoZWxwZXJzICh0aGVtZS1hd2FyZSlcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IGlzUnVubmluZ1Rlc3QgPSAodGVzdDogVGVzdERhdGEpOiBib29sZWFuID0+IHRlc3Quc3RhdHVzID09PSAnUnVubmluZyc7XHJcblxyXG5jb25zdCBnZXRDYXBDb2xvciA9IChzdGF0dXM6IHN0cmluZywgdGhlbWU6IFRoZW1lVG9rZW5zKTogc3RyaW5nID0+XHJcbiAgdGhlbWUuc3RhdHVzQ2FwW3N0YXR1c10gfHwgdGhlbWUuc3RhdHVzQ2FwWydJbiBQcm9ncmVzcyddIHx8ICcjRTVBMDBEJztcclxuXHJcbmNvbnN0IGdldFN0YXR1c1RleHRDb2xvciA9IChzdGF0dXM6IHN0cmluZywgdGhlbWU6IFRoZW1lVG9rZW5zKTogc3RyaW5nID0+XHJcbiAgdGhlbWUuc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHRoZW1lLnN0YXR1c1RleHRbJ0luIFByb2dyZXNzJ10gfHwgJyNCNDUzMDknO1xyXG5cclxuLy8gUmV0dXJucyAnUnVubmluZycgZm9yIFJ1bm5pbmcgdGVzdHMgKG92ZXJyaWRlcyBwYXJ0IHN0YXR1cyBmb3IgZGlzcGxheSBjb2xvdXJzKVxyXG5jb25zdCBnZXREaXNwbGF5U3RhdHVzID0gKHRlc3Q6IFRlc3REYXRhLCB0ZXN0U3RhcnREYXRlOiBEYXRlIHwgbnVsbCA9IG51bGwpOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChpc1J1bm5pbmdUZXN0KHRlc3QpKSByZXR1cm4gJ1J1bm5pbmcnO1xyXG4gIHJldHVybiBnZXRDYWxjdWxhdGVkU3RhdHVzKHRlc3QsIHRlc3RTdGFydERhdGUpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UHJpb3JpdHlUZXh0Q29sb3IgPSAocHJpb3JpdHk6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gdHlwZW9mIHByaW9yaXR5ID09PSAnbnVtYmVyJyA/IHByaW9yaXR5IDogNTA7XHJcbiAgY29uc3QgY2xhbXBlZCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgdmFsdWUpKTtcclxuICBpZiAoY2xhbXBlZCA8PSAzMCkgcmV0dXJuICcjNkI3MjgwJztcclxuICBpZiAoY2xhbXBlZCA8PSA2MCkgcmV0dXJuICcjRjU5RTBCJztcclxuICBpZiAoY2xhbXBlZCA8PSA4MCkgcmV0dXJuICcjRUE1ODBDJztcclxuICByZXR1cm4gJyNEQzI2MjYnO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UHJpb3JpdHlDb2xvciA9IChwcmlvcml0eTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSB0eXBlb2YgcHJpb3JpdHkgPT09ICdudW1iZXInID8gcHJpb3JpdHkgOiA1MDtcclxuICBjb25zdCBjbGFtcGVkID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCB2YWx1ZSkpO1xyXG4gIGNvbnN0IHJhdGlvID0gY2xhbXBlZCAvIDEwMDtcclxuICBjb25zdCBnID0gTWF0aC5yb3VuZCgyNTUgKiAoMSAtIHJhdGlvKSk7XHJcbiAgY29uc3QgYiA9IE1hdGgucm91bmQoMjU1ICogKDEgLSByYXRpbykpO1xyXG4gIHJldHVybiBgcmdiYSgyNTUsICR7Z30sICR7Yn0sIDAuNilgO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFN1Yi1jb21wb25lbnRzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBJbnNlcnRMaW5lOiBGQzx7IHRoZW1lOiBUaGVtZVRva2VucyB9PiA9ICh7IHRoZW1lIH0pID0+IChcclxuICA8ZGl2IHN0eWxlPXt7XHJcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAyLCBib3R0b206IDIsIHdpZHRoOiAzLFxyXG4gICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LCBib3JkZXJSYWRpdXM6IDIsIHpJbmRleDogMzAsXHJcbiAgICBib3hTaGFkb3c6IGAwIDAgMTJweCAke3RoZW1lLmFjY2VudH0sIDAgMCA0cHggJHt0aGVtZS5hY2NlbnR9YCxcclxuICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICB9fT5cclxuICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTQsIGxlZnQ6IC00LCB3aWR0aDogMTEsIGhlaWdodDogMTEsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCB9fSAvPlxyXG4gICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgYm90dG9tOiAtNCwgbGVmdDogLTQsIHdpZHRoOiAxMSwgaGVpZ2h0OiAxMSwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50IH19IC8+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5jb25zdCBPdXRsaW5lS2V5OiBGQzx7IHRoZW1lOiBUaGVtZVRva2VucyB9PiA9ICh7IHRoZW1lIH0pID0+IChcclxuICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDE2cHgnLCBib3JkZXJUb3A6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzIH19PlxyXG4gICAgPGgzIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDhlbScsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBjb2xvcjogdGhlbWUudGV4dFRlcnRpYXJ5LCBtYXJnaW5Cb3R0b206IDYgfX0+U3RhdHVzIEtleTwvaDM+XHJcbiAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleFdyYXA6ICd3cmFwJywgZ2FwOiAnNHB4IDAnIH19PlxyXG4gICAgICB7KFsnUnVubmluZycsICdSZWFkeScsICdPbiBUaW1lJywgJ0RlbGF5ZWQnLCAnUGFydHMgTm90IEFzc2lnbmVkJ10gYXMgY29uc3QpLm1hcCgoa2V5KSA9PiAoXHJcbiAgICAgICAgPGRpdiBrZXk9e2tleX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA2LCB3aWR0aDogJzUwJScsIG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNCwgaGVpZ2h0OiAxNCwgYmFja2dyb3VuZDogdGhlbWUuc3RhdHVzQ2FwW2tleV0sIGJvcmRlclJhZGl1czogMiwgZmxleFNocmluazogMCB9fSAvPlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiA5LCBjb2xvcjogdGhlbWUuc3RhdHVzVGV4dFtrZXldLCBmb250V2VpZ2h0OiA2MDAsIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyB9fT57a2V5LnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApKX1cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuaW50ZXJmYWNlIFF1ZXVlQ2FyZFByb3BzIHtcclxuICB0ZXN0OiBUZXN0RGF0YTtcclxuICBkcmFnZ2VkVGVzdElkOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIG1haW5UZXh0OiBzdHJpbmc7XHJcbiAgc3ViVGV4dDogc3RyaW5nO1xyXG4gIGluZm9Sb3c6IHN0cmluZztcclxuICBzaG93U3ViOiBib29sZWFuO1xyXG4gIHRoZW1lOiBUaGVtZVRva2VucztcclxuICBvbkRyYWdTdGFydDogKCkgPT4gdm9pZDtcclxuICBvbkRyYWdFbmQ6ICgpID0+IHZvaWQ7XHJcbiAgb25EcmFnT3ZlcjogKGU6IFJlYWN0LkRyYWdFdmVudCkgPT4gdm9pZDtcclxuICBvbk1lbnVPcGVuOiAocmVjdDogQW5jaG9yUmVjdCkgPT4gdm9pZDtcclxufVxyXG5cclxuY29uc3QgUXVldWVDYXJkOiBGQzxRdWV1ZUNhcmRQcm9wcz4gPSAoe1xyXG4gIHRlc3QsIGRyYWdnZWRUZXN0SWQsIHN0YXR1cywgbWFpblRleHQsIHN1YlRleHQsIGluZm9Sb3csIHNob3dTdWIsIHRoZW1lLFxyXG4gIG9uRHJhZ1N0YXJ0LCBvbkRyYWdFbmQsIG9uRHJhZ092ZXIsIG9uTWVudU9wZW4sXHJcbn0pID0+IHtcclxuICBjb25zdCBbaG92ZXJlZCwgc2V0SG92ZXJlZF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgcGlsbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcbiAgY29uc3QgY2FwQ29sb3IgPSBnZXRDYXBDb2xvcihzdGF0dXMsIHRoZW1lKTtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBkcmFnZ2FibGVcclxuICAgICAgb25EcmFnU3RhcnQ9eyhlKSA9PiB7IGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7IG9uRHJhZ1N0YXJ0KCk7IH19XHJcbiAgICAgIG9uRHJhZ0VuZD17b25EcmFnRW5kfVxyXG4gICAgICBvbkRyYWdPdmVyPXtvbkRyYWdPdmVyfVxyXG4gICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEhvdmVyZWQodHJ1ZSl9XHJcbiAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SG92ZXJlZChmYWxzZSl9XHJcbiAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIG1hcmdpbkJvdHRvbTogNixcclxuICAgICAgICBiYWNrZ3JvdW5kOiBkcmFnZ2VkVGVzdElkID09PSB0ZXN0LmlkID8gdGhlbWUuYmdTdWJ0bGUgOiB0aGVtZS5zdXJmYWNlLFxyXG4gICAgICAgIGJvcmRlcjogaG92ZXJlZCA/IGAycHggc29saWQgJHtjYXBDb2xvcn1gIDogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzTGcsXHJcbiAgICAgICAgY3Vyc29yOiAnZ3JhYicsXHJcbiAgICAgICAgb3BhY2l0eTogZHJhZ2dlZFRlc3RJZCA9PT0gdGVzdC5pZCA/IDAuMzUgOiAxLFxyXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICBib3hTaGFkb3c6IGhvdmVyZWQgPyAnMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMTUpJyA6ICcwIDFweCAzcHggcmdiYSgwLDAsMCwwLjA2KScsXHJcbiAgICAgICAgdHJhbnNmb3JtOiBob3ZlcmVkID8gJ3RyYW5zbGF0ZVkoLTJweCknIDogJ3RyYW5zbGF0ZVkoMCknLFxyXG4gICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC4xNXMgZWFzZSwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLCBib3JkZXIgMC4xNXMgZWFzZScsXHJcbiAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAgey8qIFN0YXR1cyBjYXAgYmFyICovfVxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA1LCBtaW5XaWR0aDogNSwgYmFja2dyb3VuZDogY2FwQ29sb3IsIGJvcmRlclJhZGl1czogYCR7dGhlbWUucmFkaXVzTGd9cHggMCAwICR7dGhlbWUucmFkaXVzTGd9cHhgLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgcGFkZGluZzogJzhweCAxMnB4JywgbWluV2lkdGg6IDAgfX0+XHJcbiAgICAgICAgey8qIFRvcCByb3c6IHByaW9yaXR5IGxlZnQsIHN0YXR1cyByaWdodCAqL31cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogNCwgcGFkZGluZ1JpZ2h0OiAyMCB9fT5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IGdldFByaW9yaXR5VGV4dENvbG9yKHRlc3QucHJpb3JpdHkpIH19PlxyXG4gICAgICAgICAgICBQe3Rlc3QucHJpb3JpdHl9XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA3MDAsIGxldHRlclNwYWNpbmc6ICcwLjA1ZW0nLCBjb2xvcjogZ2V0U3RhdHVzVGV4dENvbG9yKHN0YXR1cywgdGhlbWUpLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyBhcyBjb25zdCB9fT5cclxuICAgICAgICAgICAge3N0YXR1cy50b1VwcGVyQ2FzZSgpfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSwgbWFyZ2luQm90dG9tOiAyLCBsaW5lSGVpZ2h0OiAxLjMgfX0+XHJcbiAgICAgICAgICB7bWFpblRleHR9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge3Nob3dTdWIgJiYgKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Cb3R0b206IDQsIGZvbnRXZWlnaHQ6IDQwMCB9fT5cclxuICAgICAgICAgICAge3N1YlRleHR9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA4LCBmb250U2l6ZTogMTEsIGNvbG9yOiB0aGVtZS50ZXh0VGVydGlhcnksIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICB7aW5mb1Jvdy5zcGxpdCgnXFx1MDBiNycpLm1hcCgocGFydCwgaSwgYXJyKSA9PiAoXHJcbiAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2l9PlxyXG4gICAgICAgICAgICAgIDxzcGFuPntwYXJ0LnRyaW0oKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAge2kgPCBhcnIubGVuZ3RoIC0gMSAmJiA8c3Bhbj57J1xcdTAwYjcnfTwvc3Bhbj59XHJcbiAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHsvKiBUaHJlZS1kb3QgbWVudSBwaWxsICovfVxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXtwaWxsUmVmfVxyXG4gICAgICAgIGRyYWdnYWJsZT17ZmFsc2V9XHJcbiAgICAgICAgb25Nb3VzZURvd249eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxyXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgaWYgKHBpbGxSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCByID0gcGlsbFJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBvbk1lbnVPcGVuKHsgdG9wOiByLnRvcCwgYm90dG9tOiByLmJvdHRvbSwgbGVmdDogci5sZWZ0LCByaWdodDogci5yaWdodCB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9fVxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgIHRvcDogNixcclxuICAgICAgICAgIHJpZ2h0OiA2LFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogaG92ZXJlZCA/ICdyZ2JhKDAsMCwwLDAuMSknIDogJ3JnYmEoMCwwLDAsMC4wNCknLFxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAxMCxcclxuICAgICAgICAgIHBhZGRpbmc6ICcycHggN3B4JyxcclxuICAgICAgICAgIGZvbnRTaXplOiAxMyxcclxuICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsXHJcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgIGxldHRlclNwYWNpbmc6ICcwLjFlbScsXHJcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxyXG4gICAgICAgICAgb3BhY2l0eTogaG92ZXJlZCA/IDEgOiAwLjQsXHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjE1cywgYmFja2dyb3VuZCAwLjE1cycsXHJcbiAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXHJcbiAgICAgICAgICBmb250V2VpZ2h0OiA3MDAsXHJcbiAgICAgICAgfX1cclxuICAgICAgPlx1MDBCN1x1MDBCN1x1MDBCNzwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmludGVyZmFjZSBUZXN0QmFyUHJvcHMge1xyXG4gIHRlc3Q6IFNjaGVkdWxlZFRlc3Q7XHJcbiAgaXNUZXN0UnVubmluZzogYm9vbGVhbjtcclxuICBkcmFnZ2VkVGVzdElkOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgQkFSX0hFSUdIVDogbnVtYmVyO1xyXG4gIGRpc3BsYXlTdGF0dXM6IHN0cmluZztcclxuICByZXNvbHZlZE1haW46IHN0cmluZztcclxuICByZXNvbHZlZEluZm86IHN0cmluZztcclxuICBzaG93SW5mb09uQmFyOiBib29sZWFuO1xyXG4gIHRoZW1lOiBUaGVtZVRva2VucztcclxuICBvbkRyYWdTdGFydDogKGU6IFJlYWN0LkRyYWdFdmVudCkgPT4gdm9pZDtcclxuICBvbkRyYWdFbmQ6ICgpID0+IHZvaWQ7XHJcbiAgb25NZW51T3BlbjogKHJlY3Q6IEFuY2hvclJlY3QpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmNvbnN0IFRlc3RCYXI6IEZDPFRlc3RCYXJQcm9wcz4gPSAoe1xyXG4gIHRlc3QsIGlzVGVzdFJ1bm5pbmcsIGRyYWdnZWRUZXN0SWQsIHdpZHRoLCBCQVJfSEVJR0hULFxyXG4gIGRpc3BsYXlTdGF0dXMsIHJlc29sdmVkTWFpbiwgcmVzb2x2ZWRJbmZvLCBzaG93SW5mb09uQmFyLCB0aGVtZSxcclxuICBvbkRyYWdTdGFydCwgb25EcmFnRW5kLCBvbk1lbnVPcGVuLFxyXG59KSA9PiB7XHJcbiAgY29uc3QgW2hvdmVyZWQsIHNldEhvdmVyZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHBpbGxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xyXG4gIGNvbnN0IGNhcENvbG9yID0gZ2V0Q2FwQ29sb3IoZGlzcGxheVN0YXR1cywgdGhlbWUpO1xyXG4gIGNvbnN0IHVzZVZlcnRpY2FsRG90cyA9IHdpZHRoIDw9IDQwO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGRyYWdnYWJsZVxyXG4gICAgICBvbkRyYWdTdGFydD17b25EcmFnU3RhcnR9XHJcbiAgICAgIG9uRHJhZ0VuZD17b25EcmFnRW5kfVxyXG4gICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHsgaWYgKCFkcmFnZ2VkVGVzdElkKSBzZXRIb3ZlcmVkKHRydWUpOyB9fVxyXG4gICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldEhvdmVyZWQoZmFsc2UpfVxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDYsXHJcbiAgICAgICAgd2lkdGgsIGhlaWdodDogQkFSX0hFSUdIVCxcclxuICAgICAgICBiYWNrZ3JvdW5kOiBpc1Rlc3RSdW5uaW5nID8gdGhlbWUucnVubmluZ0JnIDogdGhlbWUuc3VyZmFjZSxcclxuICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLCBjdXJzb3I6ICdncmFiJyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxyXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICBvcGFjaXR5OiBkcmFnZ2VkVGVzdElkID09PSB0ZXN0LmlkID8gMC4yNSA6IDEsXHJcbiAgICAgICAgekluZGV4OiBob3ZlcmVkID8gMjUgOiAxNSxcclxuICAgICAgICBib3JkZXI6IGhvdmVyZWRcclxuICAgICAgICAgID8gYDJweCBzb2xpZCAke2NhcENvbG9yfWBcclxuICAgICAgICAgIDogaXNUZXN0UnVubmluZyA/IGAxcHggc29saWQgJHt0aGVtZS5ydW5uaW5nQm9yZGVyfWAgOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXHJcbiAgICAgICAgYm94U2hhZG93OiBob3ZlcmVkXHJcbiAgICAgICAgICA/ICcwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4xNSknXHJcbiAgICAgICAgICA6IGlzVGVzdFJ1bm5pbmcgPyBgMCAxcHggM3B4ICR7dGhlbWUucnVubmluZ0JvcmRlcn02NmAgOiAnMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4wNiknLFxyXG4gICAgICAgIHRyYW5zZm9ybTogaG92ZXJlZCA/ICd0cmFuc2xhdGVZKC0ycHgpJyA6ICd0cmFuc2xhdGVZKDApJyxcclxuICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZSwgYm9yZGVyIDAuMTVzIGVhc2UnLFxyXG4gICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgIH19XHJcbiAgICA+XHJcbiAgICAgIHsvKiBTdGF0dXMgY2FwIGJhciAqL31cclxuICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNSwgbWluV2lkdGg6IDUsIGJhY2tncm91bmQ6IGNhcENvbG9yLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgcGFkZGluZzogJzRweCA4cHgnLCBtaW5XaWR0aDogMCwganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxyXG4gICAgICAgIHsvKiBUb3Agcm93OiBwcmlvcml0eSArIHN0YXR1cyAobGVhdmUgcm9vbSBmb3IgcGlsbCkgKi99XHJcbiAgICAgICAge3dpZHRoID4gNzAgJiYgKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206IDIsIHBhZGRpbmdSaWdodDogd2lkdGggPiA5MCA/IDIyIDogMCB9fT5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiB3aWR0aCA+IDEyMCA/IDExIDogOSwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogaXNUZXN0UnVubmluZyA/IHRoZW1lLnJ1bm5pbmdUZXh0IDogZ2V0UHJpb3JpdHlUZXh0Q29sb3IodGVzdC5wcmlvcml0eSkgfX0+XHJcbiAgICAgICAgICAgICAge2lzVGVzdFJ1bm5pbmcgPyAnXHUyNUI2IFJVTk5JTkcnIDogYFAke3Rlc3QucHJpb3JpdHl9YH1cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICB7d2lkdGggPiAxMTAgJiYgIWlzVGVzdFJ1bm5pbmcgJiYgKFxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogOSwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnMC4wNWVtJywgY29sb3I6IGdldFN0YXR1c1RleHRDb2xvcihkaXNwbGF5U3RhdHVzLCB0aGVtZSksIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIGFzIGNvbnN0IH19PlxyXG4gICAgICAgICAgICAgICAge2Rpc3BsYXlTdGF0dXMudG9VcHBlckNhc2UoKX1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIHsvKiBNYWluIHRleHQgKi99XHJcbiAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgIGZvbnRTaXplOiB3aWR0aCA+IDEyMCA/IDEyIDogd2lkdGggPiA4MCA/IDExIDogMTAsXHJcbiAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiBpc1Rlc3RSdW5uaW5nID8gdGhlbWUucnVubmluZ1RleHREYXJrIDogdGhlbWUudGV4dFByaW1hcnksXHJcbiAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCBtYXhXaWR0aDogJzEwMCUnLCBsaW5lSGVpZ2h0OiAxLjIsXHJcbiAgICAgICAgfX0+XHJcbiAgICAgICAgICB7cmVzb2x2ZWRNYWlufVxyXG4gICAgICAgIDwvc3Bhbj5cclxuXHJcbiAgICAgICAgey8qIEluZm8gcm93ICovfVxyXG4gICAgICAgIHtzaG93SW5mb09uQmFyICYmIChcclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogOSwgZm9udFdlaWdodDogNDAwLFxyXG4gICAgICAgICAgICBjb2xvcjogaXNUZXN0UnVubmluZyA/IHRoZW1lLnJ1bm5pbmdUZXh0IDogdGhlbWUudGV4dFRlcnRpYXJ5LFxyXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIG1heFdpZHRoOiAnMTAwJScsIG1hcmdpblRvcDogMixcclxuICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICB7cmVzb2x2ZWRJbmZvfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgey8qIE1lbnUgcGlsbCBcdTIwMTQgXHUwMEI3XHUwMEI3XHUwMEI3IG9uIHdpZGUgYmFycywgXHUyMkVFIG9uIG5hcnJvdyBiYXJzLCBhbHdheXMgdmlzaWJsZSAqL31cclxuICAgICAgPGRpdlxyXG4gICAgICAgIHJlZj17cGlsbFJlZn1cclxuICAgICAgICBkcmFnZ2FibGU9e2ZhbHNlfVxyXG4gICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cclxuICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIGlmIChwaWxsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgciA9IHBpbGxSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgb25NZW51T3Blbih7IHRvcDogci50b3AsIGJvdHRvbTogci5ib3R0b20sIGxlZnQ6IHIubGVmdCwgcmlnaHQ6IHIucmlnaHQgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfX1cclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICB0b3A6IDQsXHJcbiAgICAgICAgICByaWdodDogNCxcclxuICAgICAgICAgIGJhY2tncm91bmQ6IGhvdmVyZWQgPyAncmdiYSgwLDAsMCwwLjEyKScgOiAncmdiYSgwLDAsMCwwLjA0KScsXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IDEwLFxyXG4gICAgICAgICAgcGFkZGluZzogdXNlVmVydGljYWxEb3RzID8gJzNweCA0cHgnIDogJzJweCA2cHgnLFxyXG4gICAgICAgICAgZm9udFNpemU6IHVzZVZlcnRpY2FsRG90cyA/IDEwIDogMTIsXHJcbiAgICAgICAgICBjb2xvcjogaXNUZXN0UnVubmluZyA/IHRoZW1lLnJ1bm5pbmdUZXh0IDogdGhlbWUudGV4dE11dGVkLFxyXG4gICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiB1c2VWZXJ0aWNhbERvdHMgPyAwIDogJzAuMWVtJyxcclxuICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXHJcbiAgICAgICAgICBvcGFjaXR5OiBob3ZlcmVkID8gMSA6IDAuMzUsXHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjE1cywgYmFja2dyb3VuZCAwLjE1cycsXHJcbiAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXHJcbiAgICAgICAgICBmb250V2VpZ2h0OiA3MDAsXHJcbiAgICAgICAgfX1cclxuICAgICAgPnt1c2VWZXJ0aWNhbERvdHMgPyAnXHUyMkVFJyA6ICdcdTAwQjdcdTAwQjdcdTAwQjcnfTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDb250ZXh0IE1lbnVcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IE1lbnVJdGVtOiBGQzx7IGxhYmVsOiBzdHJpbmc7IGRldGFpbD86IHN0cmluZzsgaWNvbj86IHN0cmluZzsgdGhlbWU6IFRoZW1lVG9rZW5zOyBvbkNsaWNrOiAoKSA9PiB2b2lkIH0+ID0gKHsgbGFiZWwsIGRldGFpbCwgaWNvbiwgdGhlbWUsIG9uQ2xpY2sgfSkgPT4ge1xuICBjb25zdCBbaG92ZXJlZCwgc2V0SG92ZXJlZF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRIb3ZlcmVkKHRydWUpfVxyXG4gICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldEhvdmVyZWQoZmFsc2UpfVxyXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxyXG4gICAgICBzdHlsZT17e1xuICAgICAgICBwYWRkaW5nOiAnOHB4IDE0cHgnLFxuICAgICAgICBmb250U2l6ZTogMTIsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICAgICAgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LFxuICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgYmFja2dyb3VuZDogaG92ZXJlZCA/IHRoZW1lLnN1cmZhY2VIb3ZlciA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgIGdhcDogOCxcclxuICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXHJcbiAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcbiAgICAgIH19XG4gICAgPlxuICAgICAge2ljb24gJiYgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IDEzLCB3aWR0aDogMTgsIHRleHRBbGlnbjogJ2NlbnRlcicsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQgfX0+e2ljb259PC9zcGFuPn1cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWluV2lkdGg6IDAsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2Jhc2VsaW5lJywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZ2FwOiA4LCB3aWR0aDogJzEwMCUnIH19PlxuICAgICAgICA8c3BhbiBzdHlsZT17eyB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycgfX0+e2xhYmVsfTwvc3Bhbj5cbiAgICAgICAge2RldGFpbCAmJiAoXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZmxleFNocmluazogMCwgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMCwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCB9fT5cbiAgICAgICAgICAgIHtkZXRhaWx9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXHJcbmludGVyZmFjZSBBY3Rpb25Qb3BvdmVyUHJvcHMge1xuICBwb3BvdmVyOiBQb3BvdmVyU3RhdGU7XG4gIGFzc2lnbmVkUGFydHNUZW1wbGF0ZTogc3RyaW5nO1xuICBhc3NpZ25lZFBhcnRzTGlua0Jhc2VVcmw6IHN0cmluZztcbiAgc3RhdHVzT3B0aW9uc0xpc3Q6IHN0cmluZ1tdO1xuICBwcmlvcml0eUlucHV0VmFsdWU6IHN0cmluZztcbiAgc3RhcnREYXRlSW5wdXRWYWx1ZTogc3RyaW5nO1xuICBlbmREYXRlSW5wdXRWYWx1ZTogc3RyaW5nO1xuICB0aGVtZTogVGhlbWVUb2tlbnM7XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9uTW9kZUNoYW5nZTogKG1vZGU6ICdyb290JyB8ICdwcmlvcml0eScgfCAnc3RhdHVzJyB8ICdzdGFydF9kYXRlJyB8ICdlbmRfZGF0ZScpID0+IHZvaWQ7XHJcbiAgb25Qcmlvcml0eUlucHV0Q2hhbmdlOiAodmFsOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25Db25maXJtUHJpb3JpdHk6ICgpID0+IHZvaWQ7XHJcbiAgb25QaWNrU3RhdHVzOiAoc3RhdHVzOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25FZGl0VGVzdDogKCkgPT4gdm9pZDtcclxuICBvblN0YXJ0RGF0ZUlucHV0Q2hhbmdlOiAodmFsOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25Db25maXJtU3RhcnREYXRlOiAoKSA9PiB2b2lkO1xyXG4gIG9uRW5kRGF0ZUlucHV0Q2hhbmdlOiAodmFsOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25Db25maXJtRW5kRGF0ZTogKCkgPT4gdm9pZDtcclxuICBwYW5lbFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcclxufVxyXG5cclxuY29uc3QgQWN0aW9uUG9wb3ZlcjogRkM8QWN0aW9uUG9wb3ZlclByb3BzPiA9ICh7XG4gIHBvcG92ZXIsIGFzc2lnbmVkUGFydHNUZW1wbGF0ZSwgYXNzaWduZWRQYXJ0c0xpbmtCYXNlVXJsLCBzdGF0dXNPcHRpb25zTGlzdCwgcHJpb3JpdHlJbnB1dFZhbHVlLCBzdGFydERhdGVJbnB1dFZhbHVlLCBlbmREYXRlSW5wdXRWYWx1ZSwgdGhlbWUsXG4gIG9uQ2xvc2UsIG9uTW9kZUNoYW5nZSwgb25Qcmlvcml0eUlucHV0Q2hhbmdlLCBvbkNvbmZpcm1Qcmlvcml0eSwgb25QaWNrU3RhdHVzLCBvbkVkaXRUZXN0LFxuICBvblN0YXJ0RGF0ZUlucHV0Q2hhbmdlLCBvbkNvbmZpcm1TdGFydERhdGUsIG9uRW5kRGF0ZUlucHV0Q2hhbmdlLCBvbkNvbmZpcm1FbmREYXRlLCBwYW5lbFJlZixcbn0pID0+IHtcbiAgY29uc3QgW2ZsaXBwZWRWLCBzZXRGbGlwcGVkVl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHZpZXdwb3J0UGFkZGluZyA9IDg7XG4gIGNvbnN0IHBvcG92ZXJHYXAgPSA2O1xuICBjb25zdCBwb3BvdmVyV2lkdGggPSBNYXRoLm1pbig1MjAsIHdpbmRvdy5pbm5lcldpZHRoIC0gdmlld3BvcnRQYWRkaW5nICogMik7XG4gIGNvbnN0IHsgYW5jaG9yUmVjdCwgdGVzdCwgbW9kZSwgZGlzcGxheVN0YXR1cywgdG9vbHRpcExpbmVzLCBzY2hlZHVsZWQgfSA9IHBvcG92ZXI7XG4gIGNvbnN0IGNhcENvbG9yID0gZ2V0Q2FwQ29sb3IoZGlzcGxheVN0YXR1cywgdGhlbWUpO1xuICBjb25zdCBzdGFydERhdGVMYWJlbCA9IGZvcm1hdE1lbnVEYXRlTGFiZWwodGVzdC50ZXN0X3N0YXJ0ZWRfZGF0ZSk7XG4gIGNvbnN0IGVuZERhdGVMYWJlbCA9IGZvcm1hdE1lbnVEYXRlTGFiZWwodGVzdC50ZXN0X2VuZGVkX2RhdGUpO1xuICBjb25zdCBhc3NpZ25lZFBhcnRTZXJpYWxzID0gcGFyc2VBc3NpZ25lZFBhcnRTZXJpYWxzKHJlc29sdmVBc3NpZ25lZFBhcnRzVmFsdWUoYXNzaWduZWRQYXJ0c1RlbXBsYXRlLCB0ZXN0KSk7XG4gIGNvbnN0IGlzUm9vdFR3b0NvbHVtbiA9IHBvcG92ZXJXaWR0aCA+PSAzNDA7XG4gIGNvbnN0IHNwYWNlQmVsb3cgPSBNYXRoLm1heCgwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSBhbmNob3JSZWN0LmJvdHRvbSAtIHBvcG92ZXJHYXAgLSB2aWV3cG9ydFBhZGRpbmcpO1xuICBjb25zdCBzcGFjZUFib3ZlID0gTWF0aC5tYXgoMCwgYW5jaG9yUmVjdC50b3AgLSBwb3BvdmVyR2FwIC0gdmlld3BvcnRQYWRkaW5nKTtcblxuICAvLyBIb3Jpem9udGFsOiByaWdodC1hbGlnbiB0byBidXR0b24sIGNsYW1wIHRvIHZpZXdwb3J0IGVkZ2VzXG4gIGxldCBsZWZ0ID0gYW5jaG9yUmVjdC5yaWdodCAtIHBvcG92ZXJXaWR0aDtcbiAgbGVmdCA9IE1hdGgubWF4KHZpZXdwb3J0UGFkZGluZywgTWF0aC5taW4obGVmdCwgd2luZG93LmlubmVyV2lkdGggLSBwb3BvdmVyV2lkdGggLSB2aWV3cG9ydFBhZGRpbmcpKTtcblxuICAvLyBWZXJ0aWNhbDogYmVsb3cgYnV0dG9uIGJ5IGRlZmF1bHQ7IGZsaXAgYWJvdmUgaWYgbmVhciBib3R0b21cbiAgY29uc3QgdG9wQmVsb3cgPSBhbmNob3JSZWN0LmJvdHRvbSArIHBvcG92ZXJHYXA7XG4gIGNvbnN0IGJvdHRvbUFib3ZlID0gd2luZG93LmlubmVySGVpZ2h0IC0gYW5jaG9yUmVjdC50b3AgKyBwb3BvdmVyR2FwO1xuXG4gIC8vIE1lYXN1cmUgcGFuZWwgaGVpZ2h0IGFuZCBkZWNpZGUgZmxpcCBkaXJlY3Rpb24gb24gZXZlcnkgbW9kZS9hbmNob3IgY2hhbmdlXG4gIFJlYWN0LnVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHBhbmVsUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IHBhbmVsSGVpZ2h0ID0gTWF0aC5taW4ocGFuZWxSZWYuY3VycmVudC5zY3JvbGxIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCAtIHZpZXdwb3J0UGFkZGluZyAqIDIpO1xuICAgICAgLy8gRmxpcCBhYm92ZSBvbmx5IGlmIGl0IGRvZXNuJ3QgZml0IGJlbG93IEFORCB0aGVyZSdzIG1vcmUgc3BhY2UgYWJvdmVcbiAgICAgIHNldEZsaXBwZWRWKHBhbmVsSGVpZ2h0ID4gc3BhY2VCZWxvdyAmJiBzcGFjZUFib3ZlID4gc3BhY2VCZWxvdyk7XG4gICAgfVxuICB9LCBbbW9kZSwgYW5jaG9yUmVjdCwgc3BhY2VBYm92ZSwgc3BhY2VCZWxvd10pO1xuXG4gIGNvbnN0IGF2YWlsYWJsZUhlaWdodCA9IE1hdGgubWF4KDIyMCwgZmxpcHBlZFYgPyBzcGFjZUFib3ZlIDogc3BhY2VCZWxvdyk7XG5cbiAgY29uc3QgcG9zU3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSBmbGlwcGVkVlxuICAgID8geyBwb3NpdGlvbjogJ2ZpeGVkJywgbGVmdCwgYm90dG9tOiBib3R0b21BYm92ZSwgekluZGV4OiAzMDAwIH1cbiAgICA6IHsgcG9zaXRpb246ICdmaXhlZCcsIGxlZnQsIHRvcDogdG9wQmVsb3csIHpJbmRleDogMzAwMCB9O1xuXHJcbiAgY29uc3QgbGluZXMgPSB0b29sdGlwTGluZXMuc3BsaXQoJ1xcbicpLmZpbHRlcihsID0+IHtcclxuICAgIGNvbnN0IHBhcnRzID0gbC5zcGxpdCgnOicpO1xyXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA8IDIpIHJldHVybiBsLnRyaW0oKSAhPT0gJyc7XHJcbiAgICByZXR1cm4gcGFydHMuc2xpY2UoMSkuam9pbignOicpLnRyaW0oKSAhPT0gJyc7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XG4gICAgICByZWY9e3BhbmVsUmVmfVxuICAgICAgb25Db250ZXh0TWVudT17KGUpID0+IGUucHJldmVudERlZmF1bHQoKX1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIC4uLnBvc1N0eWxlLFxuICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLFxuICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNYbCxcbiAgICAgICAgYm94U2hhZG93OiAnMCA0cHggMTZweCByZ2JhKDAsMCwwLDAuMTIpLCAwIDFweCA0cHggcmdiYSgwLDAsMCwwLjA2KScsXG4gICAgICAgIHdpZHRoOiBwb3BvdmVyV2lkdGgsXG4gICAgICAgIG1heFdpZHRoOiBgY2FsYygxMDB2dyAtICR7dmlld3BvcnRQYWRkaW5nICogMn1weClgLFxuICAgICAgICBtYXhIZWlnaHQ6IGF2YWlsYWJsZUhlaWdodCxcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIHRvcDogOCxcbiAgICAgICAgICByaWdodDogOCxcbiAgICAgICAgICB3aWR0aDogMjQsXG4gICAgICAgICAgaGVpZ2h0OiAyNCxcbiAgICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c1NtLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgY29sb3I6IHRoZW1lLnRleHRNdXRlZCxcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICBmb250U2l6ZTogMTgsXG4gICAgICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgIH19XG4gICAgICAgIGFyaWEtbGFiZWw9XCJDbG9zZSBtZW51XCJcbiAgICAgID5cbiAgICAgICAgXHUwMEQ3XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIHttb2RlID09PSAncm9vdCcgPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZGlzcGxheTogJ2dyaWQnLFxuICAgICAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiBpc1Jvb3RUd29Db2x1bW4gPyAnbWlubWF4KDAsIDNmcikgbWlubWF4KDE1MHB4LCAxZnIpJyA6ICdtaW5tYXgoMCwgMWZyKScsXG4gICAgICAgICAgICAgIG1pbkhlaWdodDogMCxcbiAgICAgICAgICAgICAgZmxleDogMSxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAxNHB4IDEwcHgnLCBvdmVyZmxvd1k6ICdhdXRvJywgbWluSGVpZ2h0OiAwIH19PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksIGxpbmVIZWlnaHQ6IDEuMywgbWFyZ2luQm90dG9tOiA2LCB3b3JkQnJlYWs6ICdicmVhay13b3JkJyB9fT5cbiAgICAgICAgICAgICAgICB7dGVzdC5uYW1lfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogbGluZXMubGVuZ3RoID4gMCA/IDggOiAwLCBmbGV4V3JhcDogJ3dyYXAnIH19PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IGdldFByaW9yaXR5VGV4dENvbG9yKHRlc3QucHJpb3JpdHkpIH19PlxuICAgICAgICAgICAgICAgICAgUHt0ZXN0LnByaW9yaXR5fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IGdldFN0YXR1c1RleHRDb2xvcihkaXNwbGF5U3RhdHVzLCB0aGVtZSksXG4gICAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyBhcyBjb25zdCwgbGV0dGVyU3BhY2luZzogJzAuMDVlbScsXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMXB4IDZweCcsIGJhY2tncm91bmQ6IGAke2NhcENvbG9yfTE4YCxcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzU20sIGJvcmRlcjogYDFweCBzb2xpZCAke2NhcENvbG9yfTQwYCxcbiAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgIHtkaXNwbGF5U3RhdHVzfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHtsaW5lcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IDEsIGJhY2tncm91bmQ6IHRoZW1lLmJvcmRlciwgbWFyZ2luOiAnMCAtMnB4IDhweCcgfX0gLz5cbiAgICAgICAgICAgICAgICAgIHtsaW5lcy5tYXAoKGxpbmUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sb25JZHggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9uSWR4ID09PSAtMSkgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSwgbWFyZ2luQm90dG9tOiA0LCBsaW5lSGVpZ2h0OiAxLjQ1LCBvdmVyZmxvd1dyYXA6ICdhbnl3aGVyZScgfX0+e2xpbmV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gbGluZS5zbGljZSgwLCBjb2xvbklkeCkudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGxpbmUuc2xpY2UoY29sb25JZHggKyAxKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBmb250U2l6ZTogMTIsIG1hcmdpbkJvdHRvbTogNCwgbGluZUhlaWdodDogMS40NSwgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLCBtaW5XaWR0aDogMCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRXZWlnaHQ6IDUwMCwgZmxleFNocmluazogMCB9fT57bGFiZWx9Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSwgb3ZlcmZsb3dXcmFwOiAnYW55d2hlcmUnLCBtaW5XaWR0aDogMCB9fT57dmFsdWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiAxLCBiYWNrZ3JvdW5kOiB0aGVtZS5ib3JkZXIsIG1hcmdpbjogYCR7bGluZXMubGVuZ3RoID4gMCA/IDggOiAwfXB4IC0ycHggOHB4YCB9fSAvPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgbWFyZ2luQm90dG9tOiBhc3NpZ25lZFBhcnRTZXJpYWxzLmxlbmd0aCA+IDAgPyA2IDogMCwgbGluZUhlaWdodDogMS40IH19PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRXZWlnaHQ6IDYwMCB9fT5Bc3NpZ25lZCBQYXJ0czwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHthc3NpZ25lZFBhcnRTZXJpYWxzLmxlbmd0aCA+IDAgPyBhc3NpZ25lZFBhcnRTZXJpYWxzLm1hcCgoc2VyaWFsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaHJlZiA9IGJ1aWxkQXNzaWduZWRQYXJ0TGluayhhc3NpZ25lZFBhcnRzTGlua0Jhc2VVcmwsIHNlcmlhbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtzZXJpYWx9IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgbWFyZ2luQm90dG9tOiA0LCBsaW5lSGVpZ2h0OiAxLjQgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtocmVmID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmPXtocmVmfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IHRoZW1lLmFjY2VudCwgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnLCBvdmVyZmxvd1dyYXA6ICdhbnl3aGVyZScgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2VyaWFsfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksIG92ZXJmbG93V3JhcDogJ2FueXdoZXJlJyB9fT57c2VyaWFsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pIDogKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBsaW5lSGVpZ2h0OiAxLjQgfX0+Tm9uZTwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYm9yZGVyVG9wOiBpc1Jvb3RUd29Db2x1bW4gPyAnbm9uZScgOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXG4gICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogaXNSb290VHdvQ29sdW1uID8gYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiAwLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDE0cHggMTBweCcsIG92ZXJmbG93WTogJ2F1dG8nLCBtaW5IZWlnaHQ6IDAsIGZsZXg6IDEgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnksIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBsZXR0ZXJTcGFjaW5nOiAnMC4wNWVtJywgbWFyZ2luQm90dG9tOiA4IH19PlxuICAgICAgICAgICAgICAgICAgU2NoZWR1bGVcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7c2NoZWR1bGVkID8gKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgZm9udFNpemU6IDEyLCBtYXJnaW5Cb3R0b206IDYsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250V2VpZ2h0OiA1MDAsIGZsZXhTaHJpbms6IDAgfX0+U3RhcnRzOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWUudGV4dFByaW1hcnkgfX0+e3NjaGVkdWxlZC5zdGFydC50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLUdCJywgeyBkYXk6ICcyLWRpZ2l0JywgbW9udGg6ICdzaG9ydCcsIHllYXI6ICdudW1lcmljJyB9KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBmb250U2l6ZTogMTIsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250V2VpZ2h0OiA1MDAsIGZsZXhTaHJpbms6IDAgfX0+RW5kczo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5IH19PntzY2hlZHVsZWQuZW5kLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JywgeWVhcjogJ251bWVyaWMnIH0pfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGxpbmVIZWlnaHQ6IDEuNCB9fT5EYXRlcyB3aWxsIGFwcGVhciBvbmNlIHRoZSB0ZXN0IGlzIHNjaGVkdWxlZC48L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBib3JkZXJUb3A6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgcGFkZGluZzogJzRweCAwJyB9fT5cbiAgICAgICAgICAgICAgICA8TWVudUl0ZW0gbGFiZWw9XCJDaGFuZ2UgUHJpb3JpdHlcIiBpY29uPVwiXHUyQjA2XCIgdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ3ByaW9yaXR5Jyl9IC8+XG4gICAgICAgICAgICAgICAgPE1lbnVJdGVtIGxhYmVsPVwiQ2hhbmdlIFN0YXR1c1wiIGljb249XCJcdTI1QzlcIiB0aGVtZT17dGhlbWV9IG9uQ2xpY2s9eygpID0+IG9uTW9kZUNoYW5nZSgnc3RhdHVzJyl9IC8+XG4gICAgICAgICAgICAgICAge2Rpc3BsYXlTdGF0dXMgPT09ICdSdW5uaW5nJyAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gbGFiZWw9XCJDaGFuZ2UgU3RhcnQgRGF0ZVwiIGRldGFpbD17c3RhcnREYXRlTGFiZWwgfHwgdW5kZWZpbmVkfSBpY29uPVwiXHVEODNEXHVEQ0M1XCIgdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ3N0YXJ0X2RhdGUnKX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIGxhYmVsPVwiQ2hhbmdlIEVuZCBEYXRlXCIgZGV0YWlsPXtlbmREYXRlTGFiZWwgfHwgdW5kZWZpbmVkfSBpY29uPVwiXHVEODNEXHVEQ0M1XCIgdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ2VuZF9kYXRlJyl9IC8+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxNZW51SXRlbSBsYWJlbD1cIkVkaXQgVGVzdFwiIGljb249XCJcdTI3MEVcIiB0aGVtZT17dGhlbWV9IG9uQ2xpY2s9e29uRWRpdFRlc3R9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvPlxuICAgICAgKSA6IG1vZGUgPT09ICdwcmlvcml0eScgPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAzOHB4IDhweCAxNHB4JywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4IH19PlxuICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4gb25Nb2RlQ2hhbmdlKCdyb290Jyl9IHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250U2l6ZTogMTYsIGxpbmVIZWlnaHQ6IDEgfX0+XHUyMTkwPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5IH19PkNoYW5nZSBQcmlvcml0eTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDE0cHgnIH19PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgbWFyZ2luQm90dG9tOiA4IH19PkVudGVyIHByaW9yaXR5ICgwXHUyMDEzMTAwKTo8L2Rpdj5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgICAgICAgbWluPXswfVxyXG4gICAgICAgICAgICAgIG1heD17MTAwfVxyXG4gICAgICAgICAgICAgIGF1dG9Gb2N1c1xyXG4gICAgICAgICAgICAgIHZhbHVlPXtwcmlvcml0eUlucHV0VmFsdWV9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvblByaW9yaXR5SW5wdXRDaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgb25Db25maXJtUHJpb3JpdHkoKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIG9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLCBib3hTaXppbmc6ICdib3JkZXItYm94JyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggOHB4JywgZm9udFNpemU6IDEzLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlclN0cm9uZ31gLCBvdXRsaW5lOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IDgsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25Db25maXJtUHJpb3JpdHl9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICBmbGV4OiAxLCBwYWRkaW5nOiAnNnB4IDAnLCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCxcclxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LCBjb2xvcjogdGhlbWUuYWNjZW50RmcsIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cywgY3Vyc29yOiAncG9pbnRlcicsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5Db25maXJtPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17b25DbG9zZX0gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBjdXJzb3I6ICdwb2ludGVyJywgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnIH19PkNhbmNlbDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8Lz5cbiAgICAgICkgOiBtb2RlID09PSAnc3RhdHVzJyA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDM4cHggOHB4IDE0cHgnLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDggfX0+XG4gICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ3Jvb3QnKX0gc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRTaXplOiAxNiwgbGluZUhlaWdodDogMSB9fT5cdTIxOTA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnkgfX0+Q2hhbmdlIFN0YXR1czwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc0cHggMCcgfX0+XHJcbiAgICAgICAgICAgIHtzdGF0dXNPcHRpb25zTGlzdC5tYXAoKHMpID0+IChcclxuICAgICAgICAgICAgICA8TWVudUl0ZW0ga2V5PXtzfSBsYWJlbD17cyA9PT0gJ05VTEwnID8gJ0NsZWFyIFN0YXR1cyAoTlVMTCknIDogc30gdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXsoKSA9PiBvblBpY2tTdGF0dXMocyl9IC8+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XG4gICAgICApIDogbW9kZSA9PT0gJ3N0YXJ0X2RhdGUnID8gKFxuICAgICAgICA8PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMzhweCA4cHggMTRweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCB9fT5cbiAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IG9uTW9kZUNoYW5nZSgncm9vdCcpfSBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFNpemU6IDE2LCBsaW5lSGVpZ2h0OiAxIH19Plx1MjE5MDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSB9fT5DaGFuZ2UgU3RhcnQgRGF0ZTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDE0cHgnIH19PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIG1hcmdpbkJvdHRvbTogOCB9fT5FbnRlciBzdGFydCBkYXRlOjwvZGl2PlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgYXV0b0ZvY3VzXG4gICAgICAgICAgICAgIHZhbHVlPXtzdGFydERhdGVJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25TdGFydERhdGVJbnB1dENoYW5nZShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBvbkNvbmZpcm1TdGFydERhdGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIG9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLCBib3hTaXppbmc6ICdib3JkZXItYm94JyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggOHB4JywgZm9udFNpemU6IDEzLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlclN0cm9uZ31gLCBvdXRsaW5lOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IDgsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25Db25maXJtU3RhcnREYXRlfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFzdGFydERhdGVJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgZmxleDogMSwgcGFkZGluZzogJzZweCAwJywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHN0YXJ0RGF0ZUlucHV0VmFsdWUgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS5ib3JkZXIsXHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBzdGFydERhdGVJbnB1dFZhbHVlID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0TXV0ZWQsXHJcbiAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cywgY3Vyc29yOiBzdGFydERhdGVJbnB1dFZhbHVlID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+Q29uZmlybTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e29uQ2xvc2V9IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyB9fT5DYW5jZWw8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XG4gICAgICApIDogKFxuICAgICAgICA8PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMzhweCA4cHggMTRweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCB9fT5cbiAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IG9uTW9kZUNoYW5nZSgncm9vdCcpfSBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFNpemU6IDE2LCBsaW5lSGVpZ2h0OiAxIH19Plx1MjE5MDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSB9fT5DaGFuZ2UgRW5kIERhdGU8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNHB4JyB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Cb3R0b206IDggfX0+RW50ZXIgZW5kIGRhdGU6PC9kaXY+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgICAgICAgICBhdXRvRm9jdXNcbiAgICAgICAgICAgICAgdmFsdWU9e2VuZERhdGVJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25FbmREYXRlSW5wdXRDaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgb25Db25maXJtRW5kRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgb25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzZweCA4cHgnLCBmb250U2l6ZTogMTMsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyU3Ryb25nfWAsIG91dGxpbmU6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogOCwgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLnN1cmZhY2UsIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA4LCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNvbmZpcm1FbmREYXRlfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFlbmREYXRlSW5wdXRWYWx1ZX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIGZsZXg6IDEsIHBhZGRpbmc6ICc2cHggMCcsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBlbmREYXRlSW5wdXRWYWx1ZSA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLmJvcmRlcixcclxuICAgICAgICAgICAgICAgICAgY29sb3I6IGVuZERhdGVJbnB1dFZhbHVlID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0TXV0ZWQsXHJcbiAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cywgY3Vyc29yOiBlbmREYXRlSW5wdXRWYWx1ZSA/ICdwb2ludGVyJyA6ICdkZWZhdWx0JyxcclxuICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPkNvbmZpcm08L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXtvbkNsb3NlfSBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScgfX0+Q2FuY2VsPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvPlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBTYXZlIE92ZXJsYXlcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmludGVyZmFjZSBTYXZlT3ZlcmxheVByb3BzIHtcclxuICBpc0Vycm9yOiBib29sZWFuO1xyXG4gIHRoZW1lOiBUaGVtZVRva2VucztcclxuICBvblJldHJ5OiAoKSA9PiB2b2lkO1xyXG4gIG9uRGlzY2FyZDogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuY29uc3QgU2F2ZU92ZXJsYXk6IEZDPFNhdmVPdmVybGF5UHJvcHM+ID0gKHsgaXNFcnJvciwgdGhlbWUsIG9uUmV0cnksIG9uRGlzY2FyZCB9KSA9PiAoXHJcbiAgPGRpdiBzdHlsZT17e1xyXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGluc2V0OiAwLCB6SW5kZXg6IDIwMDAsXHJcbiAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyAncmdiYSgyOCwyOCw0NiwwLjgyKScgOiAncmdiYSgyNDksMjUwLDI1MSwwLjgyKScsXHJcbiAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gIH19PlxyXG4gICAgeyFpc0Vycm9yID8gKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDEyIH19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgIHdpZHRoOiAzMiwgaGVpZ2h0OiAzMiwgYm9yZGVyUmFkaXVzOiAnNTAlJyxcclxuICAgICAgICAgIGJvcmRlcjogYDNweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBib3JkZXJUb3BDb2xvcjogdGhlbWUuYWNjZW50LFxyXG4gICAgICAgICAgYW5pbWF0aW9uOiAnY2NsLXNwaW4gMC43cyBsaW5lYXIgaW5maW5pdGUnLFxyXG4gICAgICAgIH19IC8+XHJcbiAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IDEzLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5IH19PlNhdmluZ1x1MjAyNjwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApIDogKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzWGwsXHJcbiAgICAgICAgYm94U2hhZG93OiAnMCA0cHggMjBweCByZ2JhKDAsMCwwLDAuMTIpJywgcGFkZGluZzogJzI0cHggMjhweCcsXHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogMTIsXHJcbiAgICAgICAgbWF4V2lkdGg6IDMwMCxcclxuICAgICAgfX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgd2lkdGg6IDQwLCBoZWlnaHQ6IDQwLCBib3JkZXJSYWRpdXM6ICc1MCUnLFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuaXNEYXJrID8gJyMzQjAwMDAnIDogJyNGRUYyRjInLFxyXG4gICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuaXNEYXJrID8gJyM3RjFEMUQnIDogJyNGRUNBQ0EnfWAsXHJcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICBmb250U2l6ZTogMjAsIGNvbG9yOiAnI0VGNDQ0NCcsIGZvbnRXZWlnaHQ6IDcwMCxcclxuICAgICAgICB9fT4hPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTUsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5IH19PlNhdmUgZmFpbGVkPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIHRleHRBbGlnbjogJ2NlbnRlcicsIGxpbmVIZWlnaHQ6IDEuNSB9fT5cclxuICAgICAgICAgIFRoZSBhbGxvY2F0aW9uIGNvdWxkIG5vdCBiZSBzYXZlZC4gWW91IGNhbiByZXRyeSBvciBkaXNjYXJkIHlvdXIgY2hhbmdlcy5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA4LCBtYXJnaW5Ub3A6IDQgfX0+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uRGlzY2FyZH1cclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBwYWRkaW5nOiAnN3B4IDE2cHgnLCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyU3Ryb25nfWAsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLnN1cmZhY2UsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5LCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPkRpc2NhcmQ8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgb25DbGljaz17b25SZXRyeX1cclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBwYWRkaW5nOiAnN3B4IDE2cHgnLCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCwgY29sb3I6IHRoZW1lLmFjY2VudEZnLFxyXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMXB4IDNweCAke3RoZW1lLmFjY2VudH00RGAsXHJcbiAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5SZXRyeTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICl9XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFsbG9jYXRpb24gSGVscGVyc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgYnVpbGRBbGxvY2F0aW9ucyA9IChzdGFuZHM6IEludGVybmFsU3RhbmRbXSk6IEFsbG9jYXRpb25SZWNvcmRbXSA9PiB7XHJcbiAgY29uc3QgYWxsb2NhdGlvbnM6IEFsbG9jYXRpb25SZWNvcmRbXSA9IFtdO1xyXG4gIHN0YW5kcy5mb3JFYWNoKHN0YW5kID0+IHtcclxuICAgIHN0YW5kLnRlc3RzLmZvckVhY2goKHRlc3QsIGlkeCkgPT4ge1xyXG4gICAgICBhbGxvY2F0aW9ucy5wdXNoKHtcclxuICAgICAgICB0ZXN0X2lkOiB0ZXN0LmlkLFxyXG4gICAgICAgIHRlc3Rfc3RhbmRfaWQ6IHN0YW5kLmlkLFxyXG4gICAgICAgIHByaW9yaXR5X29yZGVyOiBpZHggKyAxLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiBhbGxvY2F0aW9ucztcclxufTtcclxuXHJcbmNvbnN0IGFsbG9jYXRpb25zS2V5ID0gKGFsbG9jczogQWxsb2NhdGlvblJlY29yZFtdKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYWxsb2NzLm1hcChhID0+IGAke2EudGVzdF9pZH06JHthLnRlc3Rfc3RhbmRfaWR9OiR7YS5wcmlvcml0eV9vcmRlcn1gKS5zb3J0KCkpO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VTdGFuZHMgPSAoXHJcbiAgdGVzdHNBcnI6IGFueVtdLFxyXG4gIHN0YW5kc0FycjogU3RhbmREZWZbXSxcclxuICBjaEhvdXJzOiBudW1iZXIsXHJcbiAgbm9uV29ya2luZ0FycjogYW55W10gPSBbXVxyXG4pOiB7IHN0YW5kczogSW50ZXJuYWxTdGFuZFtdOyB1bmFsbG9jYXRlZDogVGVzdERhdGFbXSB9ID0+IHtcclxuICAvLyBHcm91cCBub24td29ya2luZyByb3dzIGJ5IHRlc3Rfc3RhbmRfaWRcclxuICBjb25zdCBub25Xb3JraW5nQnlTdGFuZCA9IG5ldyBNYXA8c3RyaW5nIHwgbnVtYmVyLCBhbnlbXT4oKTtcclxuICBmb3IgKGNvbnN0IHJvdyBvZiBub25Xb3JraW5nQXJyKSB7XHJcbiAgICBpZiAoIXJvdyB8fCByb3cudGVzdF9zdGFuZF9pZCA9PSBudWxsKSBjb250aW51ZTtcclxuICAgIGNvbnN0IGtleSA9IHJvdy50ZXN0X3N0YW5kX2lkO1xyXG4gICAgaWYgKCFub25Xb3JraW5nQnlTdGFuZC5oYXMoa2V5KSkgbm9uV29ya2luZ0J5U3RhbmQuc2V0KGtleSwgW10pO1xyXG4gICAgbm9uV29ya2luZ0J5U3RhbmQuZ2V0KGtleSkhLnB1c2goeyBzdGFydDogcm93LnN0YXJ0X3RpbWUsIGVuZDogcm93LmVuZF90aW1lLCBub3Rlczogcm93Lm5vdGVzIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3RhbmRNYXAgPSBuZXcgTWFwPG51bWJlciB8IHN0cmluZywgSW50ZXJuYWxTdGFuZD4oKTtcclxuICBzdGFuZHNBcnIuZm9yRWFjaChzID0+IHN0YW5kTWFwLnNldChzLmlkLCB7XHJcbiAgICBpZDogcy5pZCxcclxuICAgIG5hbWU6IHMubmFtZSxcclxuICAgIHRlc3RzOiBbXSxcclxuICAgIGNoYW5nZW92ZXJfaG91cnM6IHMuY2hhbmdlb3Zlcl9ob3VycyA/PyBjaEhvdXJzLFxyXG4gICAgbm9uV29ya2luZ0Jsb2NrczogcGFyc2VOb25Xb3JraW5nQmxvY2tzKG5vbldvcmtpbmdCeVN0YW5kLmdldChzLmlkKSA/PyBbXSksXHJcbiAgfSkpO1xyXG5cclxuICBjb25zdCB1bmFsbG9jYXRlZDogVGVzdERhdGFbXSA9IFtdO1xyXG4gIHRlc3RzQXJyLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG4gICAgY29uc3QgdGVzdDogVGVzdERhdGEgPSB7XHJcbiAgICAgIGlkOiB0LmlkLFxyXG4gICAgICBuYW1lOiB0Lm5hbWUgfHwgJycsXHJcbiAgICAgIGR1cmF0aW9uOiB0LmR1cmF0aW9uIHx8IDcyLFxyXG4gICAgICBvd25lcjogdC5vd25lciB8fCAnJyxcclxuICAgICAgcHJpb3JpdHk6IHQucHJpb3JpdHkgPz8gNTAsXHJcbiAgICAgIG5vdGVzOiB0Lm5vdGVzIHx8ICcnLFxyXG4gICAgICBzdGF0dXM6IHQuc3RhdHVzIHx8ICcnLFxyXG4gICAgICB0ZXN0X3N0YW5kX2lkOiB0LnRlc3Rfc3RhbmRfaWQsXHJcbiAgICAgIHByaW9yaXR5X29yZGVyOiB0LnByaW9yaXR5X29yZGVyLFxyXG4gICAgICBhbGxvY2F0aW9uX2lkOiB0LmFsbG9jYXRpb25faWQsXHJcbiAgICAgIGFzc2lnbmVkX3BhcnRzOiB0LmFzc2lnbmVkX3BhcnRzIHx8IG51bGwsXHJcbiAgICAgIHBhcnRfcmVhZHlfZGF0ZTogdC5wYXJ0X3JlYWR5X2RhdGUgfHwgbnVsbCxcclxuICAgICAgcGFydF9zdGF0dXM6IHQucGFydF9zdGF0dXMgfHwgJycsXHJcbiAgICAgIHRlc3Rfc3RhcnRlZF9kYXRlOiB0LnRlc3Rfc3RhcnRlZF9kYXRlIHx8IG51bGwsXHJcbiAgICAgIC4uLnQsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0ZXN0LnRlc3Rfc3RhbmRfaWQgIT0gbnVsbCAmJiBzdGFuZE1hcC5oYXModGVzdC50ZXN0X3N0YW5kX2lkKSkge1xyXG4gICAgICBzdGFuZE1hcC5nZXQodGVzdC50ZXN0X3N0YW5kX2lkKSEudGVzdHMucHVzaCh0ZXN0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVuYWxsb2NhdGVkLnB1c2godGVzdCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHN0YW5kTWFwLmZvckVhY2gocyA9PiB7XHJcbiAgICBzLnRlc3RzLnNvcnQoKGEsIGIpID0+IChhLnByaW9yaXR5X29yZGVyIHx8IDk5OSkgLSAoYi5wcmlvcml0eV9vcmRlciB8fCA5OTkpKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YW5kczogc3RhbmRzQXJyLm1hcChzID0+IHN0YW5kTWFwLmdldChzLmlkKSEpLFxyXG4gICAgdW5hbGxvY2F0ZWQsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBNYWluIENvbXBvbmVudFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuZXhwb3J0IGNvbnN0IFRlc3RTdGFuZFNjaGVkdWxlcjogRkMgPSAoKSA9PiB7XHJcbiAgLy8gXHUyNTAwXHUyNTAwIElucHV0IGRhdGEgZnJvbSBSZXRvb2wgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW2lucHV0VGVzdHNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJ0ZXN0c1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJUZXN0cyBEYXRhXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiB0ZXN0IG9iamVjdHMgZnJvbSBnZXRTY2hlZHVsZXJEYXRhIHF1ZXJ5XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtpbnB1dFN0YW5kc10gPSBSZXRvb2wudXNlU3RhdGVBcnJheSh7XHJcbiAgICBuYW1lOiBcInRlc3RTdGFuZHNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiVGVzdCBTdGFuZHMgRGF0YVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2YgdGVzdCBzdGFuZCBvYmplY3RzIGZyb20gZ2V0VGVzdFN0YW5kcyBxdWVyeSAoaWQsIG5hbWUsIGNoYW5nZW92ZXJfaG91cnMpXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtpbnB1dE5vbldvcmtpbmddID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJub25Xb3JraW5nRGF0YVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJOb24tV29ya2luZyBCbG9ja3NcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIG5vbi13b3JraW5nIHBlcmlvZHMgZnJvbSBnZXROb25Xb3JraW5nIHF1ZXJ5IChpZCwgdGVzdF9zdGFuZF9pZCwgc3RhcnRfdGltZSwgZW5kX3RpbWUsIG5vdGVzKVwiLFxyXG4gIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQ29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFtzYXZlTW9kZSwgc2V0U2F2ZU1vZGVdID0gUmV0b29sLnVzZVN0YXRlRW51bWVyYXRpb24oe1xuICAgIG5hbWU6IFwic2F2ZU1vZGVcIixcbiAgICBpbml0aWFsVmFsdWU6IFwiYmF0Y2hcIixcbiAgICBlbnVtRGVmaW5pdGlvbjogW1wiYmF0Y2hcIiwgXCJsaXZlXCJdLFxuICAgIGluc3BlY3RvcjogXCJzZWdtZW50ZWRcIixcbiAgICBsYWJlbDogXCJTYXZlIE1vZGVcIixcbiAgICBkZXNjcmlwdGlvbjogXCJiYXRjaCA9IHNhdmUgYnV0dG9uLCBsaXZlID0gZW1pdCBvbiBldmVyeSBjaGFuZ2VcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2lzU2F2aW5nXSA9IFJldG9vbC51c2VTdGF0ZUJvb2xlYW4oe1xyXG4gICAgbmFtZTogXCJpc1NhdmluZ1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgIGluc3BlY3RvcjogXCJjaGVja2JveFwiLFxyXG4gICAgbGFiZWw6IFwiSXMgU2F2aW5nXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJCaW5kIHRvOiB7eyBzYXZlQWxsb2NhdGlvbnMuaXNGZXRjaGluZyB9fVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaGFzU2F2ZUVycm9yXSA9IFJldG9vbC51c2VTdGF0ZUJvb2xlYW4oe1xyXG4gICAgbmFtZTogXCJoYXNTYXZlRXJyb3JcIixcclxuICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICBpbnNwZWN0b3I6IFwiY2hlY2tib3hcIixcclxuICAgIGxhYmVsOiBcIkhhcyBTYXZlIEVycm9yXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJCaW5kIHRvOiB7eyAhIXNhdmVBbGxvY2F0aW9ucy5lcnJvciB9fVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbc2F2ZWRBdF0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJzYXZlZEF0XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiU2F2ZWQgQXRcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG86IHt7IHNhdmVBbGxvY2F0aW9ucy5sYXN0UnVuQXQgfX1cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2NoYW5nZW92ZXJIb3Vyc10gPSBSZXRvb2wudXNlU3RhdGVOdW1iZXIoe1xyXG4gICAgbmFtZTogXCJjaGFuZ2VvdmVySG91cnNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogMyxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDaGFuZ2VvdmVyIEhvdXJzXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJIb3VycyBmb3IgY2hhbmdlb3ZlciBiZXR3ZWVuIHRlc3RzICh3b3JrIGhvdXJzIG9ubHkpXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFt3b3JrU3RhcnRdID0gUmV0b29sLnVzZVN0YXRlTnVtYmVyKHtcclxuICAgIG5hbWU6IFwid29ya1N0YXJ0XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IDksXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiV29yayBTdGFydCBIb3VyXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFt3b3JrRW5kXSA9IFJldG9vbC51c2VTdGF0ZU51bWJlcih7XHJcbiAgICBuYW1lOiBcIndvcmtFbmRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogMTcsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiV29yayBFbmQgSG91clwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaW5pdGlhbFZpZXdXZWVrc1N0cl0gPSBSZXRvb2wudXNlU3RhdGVFbnVtZXJhdGlvbih7XHJcbiAgICBuYW1lOiBcImRlZmF1bHRWaWV3V2Vla3NcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCI0XCIsXHJcbiAgICBlbnVtRGVmaW5pdGlvbjogW1wiMlwiLCBcIjRcIiwgXCI4XCIsIFwiMTJcIiwgXCIyNFwiXSxcclxuICAgIGluc3BlY3RvcjogXCJzZWdtZW50ZWRcIixcclxuICAgIGxhYmVsOiBcIkRlZmF1bHQgVmlld1wiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGluaXRpYWxWaWV3V2Vla3MgPSBOdW1iZXIoaW5pdGlhbFZpZXdXZWVrc1N0cikgfHwgNDtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIENvbmZpZ3VyYWJsZSBkaXNwbGF5IHRlbXBsYXRlcyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbY2FyZE1haW5UZXh0XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNhcmRNYWluVGV4dFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIntuYW1lfVwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkNhcmQgVGl0bGVcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBsYXRlIGZvciBjYXJkIHRpdGxlLiBVc2Uge2ZpZWxkTmFtZX0gZm9yIGRhdGEgZmllbGRzLlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbY2FyZFN1YlRleHRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY2FyZFN1YlRleHRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJQYXJ0czoge3BhcnRfcmVhZHlfZGF0ZX1cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDYXJkIFN1YnRpdGxlXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3Igc3VidGl0bGUuIEhpZGRlbiB3aGVuIGFsbCBmaWVsZHMgYXJlIGVtcHR5LlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbY2FyZEluZm9Sb3ddID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY2FyZEluZm9Sb3dcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJ7b3duZXJ9IFxcdTAwYjcge2R1cmF0aW9ufWggXFx1MDBiNyBQe3ByaW9yaXR5fVwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkNhcmQgSW5mbyBSb3dcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBsYXRlIGZvciB0aGUgaW5mbyByb3cgc2hvd24gb24gY2FyZHMgYW5kIGJhcnMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFt0b29sdGlwVGVtcGxhdGVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcbiAgICBuYW1lOiBcInRvb2x0aXBUZW1wbGF0ZVwiLFxuICAgIGluaXRpYWxWYWx1ZTogXCJOb3Rlczoge25vdGVzfVxcbk93bmVyOiB7b3duZXJ9XFxuUHJpb3JpdHk6IHtwcmlvcml0eX1cXG5QYXJ0IFN0YXR1czoge3BhcnRfc3RhdHVzfVxcblBhcnRzIER1ZToge3BhcnRfcmVhZHlfZGF0ZX1cXG5UZXN0IFN0YXJ0ZWQ6IHt0ZXN0X3N0YXJ0ZWRfZGF0ZX1cIixcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxuICAgIGxhYmVsOiBcIlRvb2x0aXAgVGVtcGxhdGVcIixcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3IgaG92ZXIgdG9vbHRpcC4gVXNlIFxcXFxuIGZvciBuZXdsaW5lcy5cIixcbiAgfSk7XG5cbiAgY29uc3QgW2Fzc2lnbmVkUGFydHNMaW5rQmFzZVVybF0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xuICAgIG5hbWU6IFwiYXNzaWduZWRQYXJ0c0xpbmtCYXNlVXJsXCIsXG4gICAgaW5pdGlhbFZhbHVlOiBcImh0dHBzOi8vc3VwZXJjcml0aWNhbHNvbHV0aW9ucy5yZXRvb2wuY29tL2FwcC9tYXJ2aW4vcGFydC1tdWx0aS13byNzZXJpYWxObz1cIixcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxuICAgIGxhYmVsOiBcIkFzc2lnbmVkIFBhcnRzIExpbmsgQmFzZSBVUkxcIixcbiAgICBkZXNjcmlwdGlvbjogXCJBc3NpZ25lZCBwYXJ0cyByZW5kZXIgYmVsb3cgdGhlIHRvb2x0aXAgdGVtcGxhdGUgdXNpbmcgdGhpcyBVUkwgcHJlZml4IHBsdXMgdGhlIHNlcmlhbCBudW1iZXIuXCIsXG4gIH0pO1xuXG4gIGNvbnN0IFthc3NpZ25lZFBhcnRzVGVtcGxhdGVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcbiAgICBuYW1lOiBcImFzc2lnbmVkUGFydHNUZW1wbGF0ZVwiLFxuICAgIGluaXRpYWxWYWx1ZTogXCJ7YXNzaWduZWRfcGFydHN9XCIsXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcbiAgICBsYWJlbDogXCJBc3NpZ25lZCBQYXJ0cyBTb3VyY2VcIixcbiAgICBkZXNjcmlwdGlvbjogXCJGaWVsZCBvciB0ZW1wbGF0ZSB1c2VkIGZvciB0aGUgYXNzaWduZWQtcGFydHMgbGlua3Mgc2VjdGlvbi4gQWNjZXB0cyB7YXNzaWduZWRfcGFydHN9IG9yIGFzc2lnbmVkX3BhcnRzLlwiLFxuICB9KTtcblxyXG4gIGNvbnN0IFtzdGF0dXNPcHRpb25zXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcbiAgICBuYW1lOiBcInN0YXR1c09wdGlvbnNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW1wiTlVMTFwiLCBcIlJ1bm5pbmdcIiwgXCJDcmVhdGVkXCIsIFwiVGVzdGVkXCIsIFwiQ2FuY2VsbGVkXCJdLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIlN0YXR1cyBPcHRpb25zXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3RhdHVzIHN0cmluZ3Mgc2hvd24gaW4gdGhlIHJpZ2h0LWNsaWNrIENoYW5nZSBTdGF0dXMgbWVudS4gJ05VTEwnIGNsZWFycyB0aGUgc3RhdHVzLlwiLFxuICB9KTtcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBUaGVtZSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbYXBwVGhlbWVdID0gUmV0b29sLnVzZVN0YXRlT2JqZWN0KHtcclxuICAgIG5hbWU6IFwiYXBwVGhlbWVcIixcclxuICAgIGluaXRpYWxWYWx1ZToge30sXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiQXBwIFRoZW1lXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJCaW5kIHRvIHt7IHRoZW1lIH19IHRvIGluaGVyaXQgYXBwIGNvbG91cnMsIGZvbnRzLCBhbmQgYm9yZGVyIHJhZGl1c1wiLFxyXG4gIH0pO1xyXG5cclxuICAvLyBPcHRpb25hbCBzdGF0dXMgY29sb3VyIG92ZXJyaWRlcyAobGVhdmUgYmxhbmsgdG8gdXNlIGRlZmF1bHRzKVxyXG4gIGNvbnN0IFtjb2xvclJ1bm5pbmddID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JSdW5uaW5nXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiUnVubmluZyBDb2xvdXJcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIk92ZXJyaWRlIGNhcCBjb2xvdXIgZm9yIFJ1bm5pbmcgc3RhdHVzLiBMZWF2ZSBibGFuayB0byB1c2UgZGVmYXVsdCAoIzkzMzNFQSkuXCIsXHJcbiAgfSk7XHJcbiAgY29uc3QgW2NvbG9yUmVhZHldID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JSZWFkeVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIlJlYWR5IENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgUmVhZHkgc3RhdHVzLiBMZWF2ZSBibGFuayB0byB1c2UgZGVmYXVsdCAoIzIyQzU1RSkuXCIsXHJcbiAgfSk7XHJcbiAgY29uc3QgW2NvbG9yT25UaW1lXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNvbG9yT25UaW1lXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiT24gVGltZSBDb2xvdXJcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIk92ZXJyaWRlIGNhcCBjb2xvdXIgZm9yIE9uIFRpbWUgc3RhdHVzLiBMZWF2ZSBibGFuayB0byB1c2UgZGVmYXVsdCAoI0U1QTAwRCkuXCIsXHJcbiAgfSk7XHJcbiAgY29uc3QgW2NvbG9yRGVsYXllZF0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjb2xvckRlbGF5ZWRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJEZWxheWVkIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgRGVsYXllZCBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjRUY0NDQ0KS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JQYXJ0c05vdEFzc2lnbmVkXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNvbG9yUGFydHNOb3RBc3NpZ25lZFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIlBhcnRzIE5vdCBBc3NpZ25lZCBDb2xvdXJcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIk92ZXJyaWRlIGNhcCBjb2xvdXIgZm9yIFBhcnRzIE5vdCBBc3NpZ25lZCBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjOUNBM0FGKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JJblByb2dyZXNzXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNvbG9ySW5Qcm9ncmVzc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkluIFByb2dyZXNzIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgSW4gUHJvZ3Jlc3Mgc3RhdHVzLiBMZWF2ZSBibGFuayB0byB1c2UgZGVmYXVsdCAoI0U1QTAwRCkuXCIsXHJcbiAgfSk7XHJcbiAgY29uc3QgW21vbm9Gb250XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcIm1vbm9Gb250XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiTW9ub3NwYWNlIEZvbnRcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkZvbnQgdXNlZCBmb3IgbGFiZWxzLCBiYWRnZXMsIGFuZCBzdGF0cy4gTGVhdmUgYmxhbmsgdG8gaW5oZXJpdCB0aGUgYXBwIHRoZW1lIGZvbnQuXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBCdWlsZCB0aGVtZSB0b2tlbnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgdGhlbWUgPSB1c2VNZW1vKCgpOiBUaGVtZVRva2VucyA9PiB7XHJcbiAgICBjb25zdCBzdGF0dXNPdmVycmlkZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcclxuICAgIGlmIChjb2xvclJ1bm5pbmcpICAgICAgICAgICBzdGF0dXNPdmVycmlkZXNbJ1J1bm5pbmcnXSAgICAgICAgICAgID0gY29sb3JSdW5uaW5nIGFzIHN0cmluZztcclxuICAgIGlmIChjb2xvclJlYWR5KSAgICAgICAgICAgICBzdGF0dXNPdmVycmlkZXNbJ1JlYWR5J10gICAgICAgICAgICAgID0gY29sb3JSZWFkeSBhcyBzdHJpbmc7XHJcbiAgICBpZiAoY29sb3JPblRpbWUpICAgICAgICAgICAgc3RhdHVzT3ZlcnJpZGVzWydPbiBUaW1lJ10gICAgICAgICAgICA9IGNvbG9yT25UaW1lIGFzIHN0cmluZztcclxuICAgIGlmIChjb2xvckRlbGF5ZWQpICAgICAgICAgICBzdGF0dXNPdmVycmlkZXNbJ0RlbGF5ZWQnXSAgICAgICAgICAgID0gY29sb3JEZWxheWVkIGFzIHN0cmluZztcclxuICAgIGlmIChjb2xvclBhcnRzTm90QXNzaWduZWQpICBzdGF0dXNPdmVycmlkZXNbJ1BhcnRzIE5vdCBBc3NpZ25lZCddID0gY29sb3JQYXJ0c05vdEFzc2lnbmVkIGFzIHN0cmluZztcclxuICAgIGlmIChjb2xvckluUHJvZ3Jlc3MpICAgICAgICBzdGF0dXNPdmVycmlkZXNbJ0luIFByb2dyZXNzJ10gICAgICAgID0gY29sb3JJblByb2dyZXNzIGFzIHN0cmluZztcclxuICAgIHJldHVybiBidWlsZFRoZW1lKGFwcFRoZW1lLCBzdGF0dXNPdmVycmlkZXMsIG1vbm9Gb250IGFzIHN0cmluZyB8fCB1bmRlZmluZWQpO1xyXG4gIH0sIFthcHBUaGVtZSwgY29sb3JSdW5uaW5nLCBjb2xvclJlYWR5LCBjb2xvck9uVGltZSwgY29sb3JEZWxheWVkLCBjb2xvclBhcnRzTm90QXNzaWduZWQsIGNvbG9ySW5Qcm9ncmVzcywgbW9ub0ZvbnRdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIE91dHB1dCBzdGF0ZSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbLCBzZXRBbGxvY2F0aW9uc10gPSBSZXRvb2wudXNlU3RhdGVBcnJheSh7XHJcbiAgICBuYW1lOiBcImFsbG9jYXRpb25zXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQ3VycmVudCBhbGxvY2F0aW9uIHN0YXRlOiBbe3Rlc3RfaWQsIHRlc3Rfc3RhbmRfaWQsIHByaW9yaXR5X29yZGVyfV1cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0QWxsVGVzdElkc10gPSBSZXRvb2wudXNlU3RhdGVBcnJheSh7XHJcbiAgICBuYW1lOiBcImFsbFRlc3RJZHNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBbGwgdGVzdCBJRHMgbWFuYWdlZCBieSB0aGUgc2NoZWR1bGVyIChmb3IgdGhlIGRlbGV0ZSBzdGVwIGluIHNhdmUpXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzXSA9IFJldG9vbC51c2VTdGF0ZUJvb2xlYW4oe1xyXG4gICAgbmFtZTogXCJoYXNVbnNhdmVkQ2hhbmdlc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIldoZXRoZXIgdGhlcmUgYXJlIHVuc2F2ZWQgYWxsb2NhdGlvbiBjaGFuZ2VzXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldFNlbGVjdGVkVGVzdElkXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdElkXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJJRCBvZiB0ZXN0IGFjdGlvbmVkIHZpYSByaWdodC1jbGljayBtZW51IChzZXQgYmVmb3JlIGV2ZW50cyBmaXJlKVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRTZWxlY3RlZFRlc3RQcmlvcml0eV0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJzZWxlY3RlZFRlc3RQcmlvcml0eVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTmV3IHByaW9yaXR5IHZhbHVlIGZyb20gQ2hhbmdlIFByaW9yaXR5IGFjdGlvbiAobnVtZXJpYyBzdHJpbmcpXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldFNlbGVjdGVkVGVzdFN0YXJ0RGF0ZV0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJzZWxlY3RlZFRlc3RTdGFydERhdGVcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIk5ldyBzdGFydCBkYXRlIGZyb20gQ2hhbmdlIFN0YXJ0IERhdGUgYWN0aW9uIChJU08gZGF0ZSBzdHJpbmcgWVlZWS1NTS1ERCkuIE9ubHkgc2V0IGZvciBSdW5uaW5nIHRlc3RzLlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRTZWxlY3RlZFRlc3RFbmREYXRlXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdEVuZERhdGVcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIk5ldyBlbmQgZGF0ZSBmcm9tIENoYW5nZSBFbmQgRGF0ZSBhY3Rpb24gKElTTyBkYXRlIHN0cmluZyBZWVlZLU1NLUREKS4gT25seSBzZXQgZm9yIFJ1bm5pbmcgdGVzdHMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldFNlbGVjdGVkVGVzdFN0YXR1c10gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJzZWxlY3RlZFRlc3RTdGF0dXNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIk5ldyBzdGF0dXMgZnJvbSBDaGFuZ2UgU3RhdHVzIGFjdGlvbi4gRW1wdHkgc3RyaW5nID0gTlVMTCBpbiBEQi5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0UGxhbm5lZERhdGVzXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwicGxhbm5lZERhdGVzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2Yge3Rlc3RfaWQsIHBsYW5uZWRfZGF0ZX0gZm9yIGFsbCBzdGFuZC1zY2hlZHVsZWQgdGVzdHMuIFVzZSB3aXRoIHNhdmVQbGFubmVkRGF0ZXMgcXVlcnkuXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBFdmVudHMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3Qgb25TYXZlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uU2F2ZVwiIH0pO1xyXG4gIGNvbnN0IG9uQ2hhbmdlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlXCIgfSk7XHJcbiAgY29uc3Qgb25SZXRyeSA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvblJldHJ5XCIgfSk7XHJcbiAgY29uc3Qgb25DaGFuZ2VQcmlvcml0eSA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvbkNoYW5nZVByaW9yaXR5XCIgfSk7XHJcbiAgY29uc3Qgb25DaGFuZ2VTdGF0dXMgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25DaGFuZ2VTdGF0dXNcIiB9KTtcclxuICBjb25zdCBvbkNoYW5nZVN0YXJ0RGF0ZSA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvbkNoYW5nZVN0YXJ0RGF0ZVwiIH0pO1xyXG4gIGNvbnN0IG9uQ2hhbmdlRW5kRGF0ZSA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvbkNoYW5nZUVuZERhdGVcIiB9KTtcclxuICBjb25zdCBvbkVkaXRUZXN0ID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uRWRpdFRlc3RcIiB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIENvbXBvbmVudCBzZXR0aW5ncyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBSZXRvb2wudXNlQ29tcG9uZW50U2V0dGluZ3Moe1xyXG4gICAgZGVmYXVsdEhlaWdodDogNjAwLFxyXG4gICAgZGVmYXVsdFdpZHRoOiAxMixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEludGVybmFsIHN0YXRlIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFtzdGFuZHMsIHNldFN0YW5kc10gPSBSZWFjdC51c2VTdGF0ZTxJbnRlcm5hbFN0YW5kW10+KFtdKTtcclxuICBjb25zdCBbdW5hbGxvY2F0ZWQsIHNldFVuYWxsb2NhdGVkXSA9IFJlYWN0LnVzZVN0YXRlPFRlc3REYXRhW10+KFtdKTtcclxuICBjb25zdCBbdmlld3BvcnRXZWVrcywgc2V0Vmlld3BvcnRXZWVrc10gPSBSZWFjdC51c2VTdGF0ZTxudW1iZXI+KGluaXRpYWxWaWV3V2Vla3MgfHwgNCk7XHJcbiAgY29uc3QgdXNlckNoYW5nZWRWaWV3cG9ydCA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHdlZWtzID0gTnVtYmVyKGluaXRpYWxWaWV3V2Vla3NTdHIpO1xyXG4gICAgaWYgKHdlZWtzICYmICF1c2VyQ2hhbmdlZFZpZXdwb3J0LmN1cnJlbnQpIHNldFZpZXdwb3J0V2Vla3Mod2Vla3MpO1xyXG4gIH0sIFtpbml0aWFsVmlld1dlZWtzU3RyXSk7XHJcbiAgY29uc3QgW2RyYWdnZWRUZXN0SWQsIHNldERyYWdnZWRUZXN0SWRdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nIHwgbnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2luc2VydEluZGljYXRvciwgc2V0SW5zZXJ0SW5kaWNhdG9yXSA9IFJlYWN0LnVzZVN0YXRlPEluc2VydEluZGljYXRvciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtxdWV1ZUluc2VydEluZGV4LCBzZXRRdWV1ZUluc2VydEluZGV4XSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtpc0RpcnR5LCBzZXRJc0RpcnR5XSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcGVuZGluZ1NhdmUsIHNldFBlbmRpbmdTYXZlXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NhdmVFcnJvciwgc2V0U2F2ZUVycm9yXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BvcG92ZXIsIHNldFBvcG92ZXJdID0gUmVhY3QudXNlU3RhdGU8UG9wb3ZlclN0YXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtwcmlvcml0eUlucHV0VmFsdWUsIHNldFByaW9yaXR5SW5wdXRWYWx1ZV0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW3N0YXJ0RGF0ZUlucHV0VmFsdWUsIHNldFN0YXJ0RGF0ZUlucHV0VmFsdWVdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPignJyk7XG4gIGNvbnN0IFtlbmREYXRlSW5wdXRWYWx1ZSwgc2V0RW5kRGF0ZUlucHV0VmFsdWVdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPignJyk7XG4gIGNvbnN0IFtwZW5kaW5nU3RhdHVzQ2hhbmdlLCBzZXRQZW5kaW5nU3RhdHVzQ2hhbmdlXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwb3BvdmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgY3VycmVudFNhdmVNb2RlID0gKChzYXZlTW9kZSBhcyBzdHJpbmcpID09PSAnbGl2ZScgPyAnbGl2ZScgOiAnYmF0Y2gnKSBhcyAnYmF0Y2gnIHwgJ2xpdmUnO1xuICBjb25zdCBpc0xvY2tlZCA9IHBlbmRpbmdTYXZlIHx8IChpc1NhdmluZyBhcyBib29sZWFuKSB8fCBzYXZlRXJyb3I7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzU2F2aW5nIGFzIGJvb2xlYW4pIHtcclxuICAgICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpOyAvLyBSZXRvb2wgaGFzIHBpY2tlZCB1cCB0aGUgc2F2ZTsgZHJvcCBvdXIgbG9jYWwgcGVuZGluZyBmbGFnXHJcbiAgICB9XHJcbiAgICBpZiAoaGFzU2F2ZUVycm9yIGFzIGJvb2xlYW4pIHtcclxuICAgICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpO1xyXG4gICAgICBzZXRTYXZlRXJyb3IodHJ1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKCEoaXNTYXZpbmcgYXMgYm9vbGVhbikpIHtcclxuICAgICAgLy8gTm90IHNhdmluZyBhbmQgbm8gZXJyb3IgPSBpZGxlOyBjbGVhciBlcnJvciAoY292ZXJzIHJlY292ZXJ5IGFmdGVyIHJldHJ5KVxyXG4gICAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtpc1NhdmluZywgaGFzU2F2ZUVycm9yXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBvcG92ZXIpIHJldHVybjtcclxuICAgIGNvbnN0IG9uTW91c2VEb3duID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudCAmJiAhcG9wb3ZlclJlZi5jdXJyZW50LmNvbnRhaW5zKGUudGFyZ2V0IGFzIE5vZGUpKVxyXG4gICAgICAgIHNldFBvcG92ZXIobnVsbCk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25LZXlEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHsgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgc2V0UG9wb3ZlcihudWxsKTsgfTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcclxuICAgIH07XHJcbiAgfSwgW3BvcG92ZXJdKTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxBbGxvY2F0aW9uc1JlZiA9IHVzZVJlZjxzdHJpbmc+KCcnKTtcclxuICBjb25zdCBwcmV2U2F2ZWRBdFJlZiA9IFJlYWN0LnVzZVJlZjxzdHJpbmc+KFwiXCIpO1xyXG4gIGNvbnN0IHNjcm9sbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbCA9IHNjcm9sbFJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgY29uc3Qgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZW50cmllcyA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xyXG4gICAgICAgIHNldENvbnRhaW5lcldpZHRoKGVudHJ5LmNvbnRlbnRSZWN0LndpZHRoIHx8IDgwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcm8ub2JzZXJ2ZShlbCk7XHJcbiAgICByZXR1cm4gKCkgPT4gcm8uZGlzY29ubmVjdCgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gT3B0aW1pc3RpYyBzYXZlOiB3aGVuIHNhdmVkQXQgY2hhbmdlcyB0aGUgREIgd3JpdGUgc3VjY2VlZGVkIFx1MjAxNCBzbmFwc2hvdCB0aGVcclxuICAvLyBjdXJyZW50IHN0YXRlIGFzIHRoZSBuZXcgYmFzZWxpbmUgd2l0aG91dCB3YWl0aW5nIGZvciBhIGdldFNjaGVkdWxlckRhdGEgcmUtZmV0Y2guXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHRzID0gc2F2ZWRBdCBhcyBzdHJpbmc7XHJcbiAgICBpZiAoIXRzIHx8IHRzID09PSBwcmV2U2F2ZWRBdFJlZi5jdXJyZW50KSByZXR1cm47IC8vIHNraXAgaW5pdGlhbCBtb3VudCArIGR1cGxpY2F0ZXNcclxuICAgIHByZXZTYXZlZEF0UmVmLmN1cnJlbnQgPSB0cztcclxuICAgIC8vIFNuYXBzaG90IGN1cnJlbnQgYWxsb2NhdGlvbnMgYXMgdGhlIG5ldyBcIm9yaWdpbmFsXCIgc28gZGlydHktY2hlY2sgcmVzZXRzIGNvcnJlY3RseVxyXG4gICAgY29uc3QgY3VycmVudEFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMoc3RhbmRzKTtcclxuICAgIG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudCA9IGFsbG9jYXRpb25zS2V5KGN1cnJlbnRBbGxvY3MpO1xyXG4gICAgc2V0SXNEaXJ0eShmYWxzZSk7XHJcbiAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7XHJcbiAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gIH0sIFtzYXZlZEF0LCBzdGFuZHNdKTtcclxuICBjb25zdCBbY29udGFpbmVyV2lkdGgsIHNldENvbnRhaW5lcldpZHRoXSA9IFJlYWN0LnVzZVN0YXRlKDgwMCk7XHJcbiAgY29uc3QgW3F1ZXVlU29ydCwgc2V0UXVldWVTb3J0XSA9IFJlYWN0LnVzZVN0YXRlPCdheicgfCAncHJpb3JpdHknIHwgJ3N0YXR1cyc+KCdheicpO1xyXG4gIGNvbnN0IFtxdWV1ZUZpbHRlciwgc2V0UXVldWVGaWx0ZXJdID0gUmVhY3QudXNlU3RhdGUoJycpO1xyXG5cclxuICBjb25zdCBzdGF0dXNPcHRpb25zTGlzdCA9IHVzZU1lbW88c3RyaW5nW10+KCgpID0+IHtcclxuICAgIGNvbnN0IGFyciA9IEFycmF5LmlzQXJyYXkoc3RhdHVzT3B0aW9ucykgPyBzdGF0dXNPcHRpb25zIGFzIGFueVtdIDogW107XHJcbiAgICByZXR1cm4gYXJyLmxlbmd0aCA+IDAgPyBhcnIubWFwKFN0cmluZykgOiBbXCJOVUxMXCIsIFwiUnVubmluZ1wiLCBcIkNyZWF0ZWRcIiwgXCJUZXN0ZWRcIiwgXCJDYW5jZWxsZWRcIl07XHJcbiAgfSwgW3N0YXR1c09wdGlvbnNdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEluaXRpYWxpemUgZnJvbSBpbnB1dCBkYXRhIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGlucHV0S2V5ID0gdXNlTWVtbyhcclxuICAgICgpID0+IEpTT04uc3RyaW5naWZ5KGlucHV0VGVzdHMpICsgSlNPTi5zdHJpbmdpZnkoaW5wdXRTdGFuZHMpICsgSlNPTi5zdHJpbmdpZnkoaW5wdXROb25Xb3JraW5nKSxcclxuICAgIFtpbnB1dFRlc3RzLCBpbnB1dFN0YW5kcywgaW5wdXROb25Xb3JraW5nXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB0ZXN0c0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRUZXN0cykgPyBpbnB1dFRlc3RzIDogW107XHJcbiAgICBjb25zdCBzdGFuZHNBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0U3RhbmRzKSA/IChpbnB1dFN0YW5kcyBhcyBTdGFuZERlZltdKSA6IFtdO1xyXG4gICAgY29uc3Qgbm9uV29ya2luZ0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXROb25Xb3JraW5nKSA/IGlucHV0Tm9uV29ya2luZyA6IFtdO1xyXG5cclxuICAgIGlmIChzdGFuZHNBcnIubGVuZ3RoID09PSAwICYmIHRlc3RzQXJyLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgc3RhbmRzOiBuZXdTdGFuZHMsIHVuYWxsb2NhdGVkOiB1bmFsbG9jIH0gPSBwYXJzZVN0YW5kcyh0ZXN0c0Fyciwgc3RhbmRzQXJyLCBjaEhvdXJzLCBub25Xb3JraW5nQXJyKTtcclxuICAgIHNldFN0YW5kcyhuZXdTdGFuZHMpO1xyXG4gICAgc2V0VW5hbGxvY2F0ZWQodW5hbGxvYyk7XHJcbiAgICBzZXRJc0RpcnR5KGZhbHNlKTtcclxuXHJcbiAgICAvLyBTbmFwc2hvdCB0aGUgaW5pdGlhbCBhbGxvY2F0aW9uc1xyXG4gICAgY29uc3QgaW5pdGlhbEFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKTtcclxuICAgIG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudCA9IGFsbG9jYXRpb25zS2V5KGluaXRpYWxBbGxvY3MpO1xyXG5cclxuICAgIC8vIFNldCBvdXRwdXQgc3RhdGVcclxuICAgIHNldEFsbG9jYXRpb25zKGluaXRpYWxBbGxvY3MpO1xyXG4gICAgc2V0QWxsVGVzdElkcyh0ZXN0c0Fyci5tYXAoKHQ6IGFueSkgPT4gdC5pZCkpO1xyXG4gICAgc2V0SGFzVW5zYXZlZENoYW5nZXMoZmFsc2UpO1xyXG5cclxuICAgIC8vIENsZWFyIHNhdmUgbG9jayBcdTIwMTQgbmV3IGRhdGEgYXJyaXZpbmcgZnJvbSBSZXRvb2wgbWVhbnMgdGhlIHNhdmUgcm91bmQtdHJpcCBjb21wbGV0ZWQuXHJcbiAgICAvLyBUaGlzIGlzIG1vcmUgcmVsaWFibGUgdGhhbiB3YWl0aW5nIGZvciB0aGUgc2F2ZVN0YXRlIGJpbmRpbmcgdG8gdHJhbnNpdGlvbiB0aHJvdWdoXHJcbiAgICAvLyAnc2F2aW5nJyBcdTIxOTIgJ2lkbGUnLCB3aGljaCBSZXRvb2wgY2FuIGJhdGNoIGF3YXkgc28gdGhlIHVzZUVmZmVjdCBuZXZlciBmaXJlcy5cclxuICAgIHNldFBlbmRpbmdTYXZlKGZhbHNlKTtcclxuICAgIHNldFNhdmVFcnJvcihmYWxzZSk7XHJcbiAgfSwgW2lucHV0S2V5XSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBTY2hlZHVsaW5nIGNvbmZpZyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBjaEhvdXJzID0gKGNoYW5nZW92ZXJIb3VycyBhcyBudW1iZXIpIHx8IDM7XHJcbiAgY29uc3Qgd1N0YXJ0ID0gKHdvcmtTdGFydCBhcyBudW1iZXIpIHx8IDk7XHJcbiAgY29uc3Qgd0VuZCA9ICh3b3JrRW5kIGFzIG51bWJlcikgfHwgMTc7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBWaWV3IGNvbXB1dGF0aW9ucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB2aWV3U3RhcnQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZC5zZXRIb3VycygwLCAwLCAwLCAwKTtcclxuICAgIHdoaWxlIChkLmdldERheSgpICE9PSAxKSBkLnNldERhdGUoZC5nZXREYXRlKCkgLSAxKTtcclxuICAgIHJldHVybiBkO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFNjaGVkdWxlIGNvbXB1dGF0aW9uIChtdXN0IGJlIGRlZmluZWQgYmVmb3JlIHRpbWVsaW5lRW5kKSBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBjb21wdXRlU2NoZWR1bGUgPSB1c2VDYWxsYmFjaygodGVzdHM6IFRlc3REYXRhW10sIHN0YW5kQ2hhbmdlb3ZlcjogbnVtYmVyLCBub25Xb3JraW5nQmxvY2tzOiBOb25Xb3JraW5nQmxvY2tbXSk6IFNjaGVkdWxlZFRlc3RbXSA9PiB7XHJcbiAgICBjb25zdCBydW5uaW5nVGVzdHMgPSB0ZXN0cy5maWx0ZXIodCA9PiBpc1J1bm5pbmdUZXN0KHQpKTtcclxuICAgIGNvbnN0IHF1ZXVlZFRlc3RzID0gdGVzdHMuZmlsdGVyKHQgPT4gIWlzUnVubmluZ1Rlc3QodCkpO1xyXG5cclxuICAgIC8vIFNvcnQgUnVubmluZyB0ZXN0cyBieSBhY3R1YWwgc3RhcnQgZGF0ZSwgdGhlbiBwcmlvcml0eSBkZXNjIGZvciB0aWVzXHJcbiAgICBjb25zdCBzb3J0ZWRSdW5uaW5nID0gWy4uLnJ1bm5pbmdUZXN0c10uc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCBkYXRlQSA9IHBhcnNlTG9jYWxEYXRlKGEudGVzdF9zdGFydGVkX2RhdGUpIHx8IG5ldyBEYXRlKCk7XHJcbiAgICAgIGNvbnN0IGRhdGVCID0gcGFyc2VMb2NhbERhdGUoYi50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgbmV3IERhdGUoKTtcclxuICAgICAgaWYgKGRhdGVBLmdldFRpbWUoKSAhPT0gZGF0ZUIuZ2V0VGltZSgpKSByZXR1cm4gZGF0ZUEuZ2V0VGltZSgpIC0gZGF0ZUIuZ2V0VGltZSgpO1xyXG4gICAgICByZXR1cm4gKGIucHJpb3JpdHkgPz8gNTApIC0gKGEucHJpb3JpdHkgPz8gNTApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUnVubmluZyB0ZXN0cyB1c2UgdGhlaXIgYWN0dWFsIHRlc3Rfc3RhcnRlZF9kYXRlLiBPbmx5IGxhdGVyIFJ1bm5pbmcgdGVzdHMgYXJlXG4gICAgLy8gcHVzaGVkIGZvcndhcmQgdG8gYXZvaWQgb3ZlcmxhcDsgdGhlIGZpcnN0IG9uZSBzaG91bGQgbm90IGJlIGNsYW1wZWQgdG8gdmlld1N0YXJ0LlxuICAgIGxldCBsYXN0UnVubmluZ0VuZDogRGF0ZSB8IG51bGwgPSBudWxsO1xuICAgIGNvbnN0IHJ1bm5pbmdTY2hlZHVsZWQgPSBzb3J0ZWRSdW5uaW5nLm1hcCh0ZXN0ID0+IHtcbiAgICAgIGNvbnN0IHRlc3REYXRlID0gcGFyc2VMb2NhbERhdGUodGVzdC50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgbmV3IERhdGUodmlld1N0YXJ0KTtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gbGFzdFJ1bm5pbmdFbmQgJiYgdGVzdERhdGUgPCBsYXN0UnVubmluZ0VuZCA/IG5ldyBEYXRlKGxhc3RSdW5uaW5nRW5kKSA6IG5ldyBEYXRlKHRlc3REYXRlKTtcbiAgICAgIGNvbnN0IGR1cmF0aW9uRW5kID0gbmV3IERhdGUoc3RhcnQuZ2V0VGltZSgpICsgdGVzdC5kdXJhdGlvbiAqIE1TX1BFUl9IT1VSKTtcbiAgICAgIGNvbnN0IGVuZCA9IGR1cmF0aW9uRW5kIDwgbmV3IERhdGUoKSA/IG5ldyBEYXRlKCkgOiBkdXJhdGlvbkVuZDtcbiAgICAgIGxhc3RSdW5uaW5nRW5kID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChlbmQsIHN0YW5kQ2hhbmdlb3Zlciwgd1N0YXJ0LCB3RW5kKTtcbiAgICAgIHJldHVybiB7IC4uLnRlc3QsIHN0YXJ0LCBlbmQgfTtcbiAgICB9KTtcblxyXG4gICAgLy8gUXVldWVkIHRlc3RzIHN0YXJ0IGFmdGVyIGxhc3QgUnVubmluZyB0ZXN0J3MgY2hhbmdlb3ZlciAob3Igbm93K2NoYW5nZW92ZXIsIHdoaWNoZXZlciBpcyBsYXRlcikuXHJcbiAgICAvLyBXZSBuZXZlciBzY2hlZHVsZSBhIHBsYW5uZWQgdGVzdCB0byBzdGFydCBpbiB0aGUgcGFzdC5cclxuICAgIC8vIGZpbmRWYWxpZFN0YXJ0IHB1c2hlcyB0aGUgc3RhcnQgZm9yd2FyZCB1bnRpbCB0aGUgZnVsbCBbc3RhcnQsIHN0YXJ0K2R1cmF0aW9uKSB3aW5kb3dcclxuICAgIC8vIGRvZXNuJ3Qgb3ZlcmxhcCBhbnkgbm9uLXdvcmtpbmcgYmxvY2sgKGNvdmVycyBib3RoIHN0YXJ0LWluc2lkZSBhbmQgZW5kLWluc2lkZSBjYXNlcykuXHJcbiAgICBjb25zdCBub3dQbHVzQ2hhbmdlb3ZlciA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQobmV3IERhdGUoKSwgc3RhbmRDaGFuZ2VvdmVyLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgbGV0IGN1cnJlbnRFbmQgPSBuZXcgRGF0ZShNYXRoLm1heCgobGFzdFJ1bm5pbmdFbmQgPz8gdmlld1N0YXJ0KS5nZXRUaW1lKCksIG5vd1BsdXNDaGFuZ2VvdmVyLmdldFRpbWUoKSkpO1xuICAgIGNvbnN0IHF1ZXVlZFNjaGVkdWxlZCA9IHF1ZXVlZFRlc3RzLm1hcCh0ZXN0ID0+IHtcclxuICAgICAgY29uc3Qgc3RhcnQgPSBmaW5kVmFsaWRTdGFydChuZXcgRGF0ZShjdXJyZW50RW5kKSwgdGVzdC5kdXJhdGlvbiwgbm9uV29ya2luZ0Jsb2Nrcyk7XHJcbiAgICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHN0YXJ0LmdldFRpbWUoKSArIHRlc3QuZHVyYXRpb24gKiBNU19QRVJfSE9VUik7XHJcbiAgICAgIGN1cnJlbnRFbmQgPSBhZHZhbmNlUGFzdE5vbldvcmtpbmcoXHJcbiAgICAgICAgY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChlbmQsIHN0YW5kQ2hhbmdlb3Zlciwgd1N0YXJ0LCB3RW5kKSxcclxuICAgICAgICBub25Xb3JraW5nQmxvY2tzXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiB7IC4uLnRlc3QsIHN0YXJ0LCBlbmQgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBbLi4ucnVubmluZ1NjaGVkdWxlZCwgLi4ucXVldWVkU2NoZWR1bGVkXTtcclxuICB9LCBbdmlld1N0YXJ0LCB3U3RhcnQsIHdFbmRdKTtcclxuXHJcbiAgY29uc3Qgc3RhbmRTY2hlZHVsZXMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gbmV3IE1hcChzdGFuZHMubWFwKHMgPT4gW3MuaWQsIGNvbXB1dGVTY2hlZHVsZShzLnRlc3RzLCBzLmNoYW5nZW92ZXJfaG91cnMsIHMubm9uV29ya2luZ0Jsb2NrcyldKSksXHJcbiAgICBbc3RhbmRzLCBjb21wdXRlU2NoZWR1bGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdGltZWxpbmVFbmQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGxldCBsYXRlc3RFbmQgPSBuZXcgRGF0ZSh2aWV3U3RhcnQpO1xyXG4gICAgbGF0ZXN0RW5kLnNldERhdGUobGF0ZXN0RW5kLmdldERhdGUoKSArIHZpZXdwb3J0V2Vla3MgKiA3KTtcclxuXHJcbiAgICBzdGFuZHMuZm9yRWFjaChzdGFuZCA9PiB7XHJcbiAgICAgIGNvbnN0IHNjaGVkdWxlID0gc3RhbmRTY2hlZHVsZXMuZ2V0KHN0YW5kLmlkKSA/PyBbXTtcclxuICAgICAgaWYgKHNjaGVkdWxlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBsYXN0ID0gc2NoZWR1bGVbc2NoZWR1bGUubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgY29uc3QgY2hhbmdlb3ZlckVuZCA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQobGFzdC5lbmQsIHN0YW5kLmNoYW5nZW92ZXJfaG91cnMsIHdTdGFydCwgd0VuZCk7XHJcbiAgICAgICAgaWYgKGNoYW5nZW92ZXJFbmQgPiBsYXRlc3RFbmQpIGxhdGVzdEVuZCA9IGNoYW5nZW92ZXJFbmQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxhdGVzdEVuZC5zZXREYXRlKGxhdGVzdEVuZC5nZXREYXRlKCkgKyA3KTtcclxuICAgIHJldHVybiBsYXRlc3RFbmQ7XHJcbiAgfSwgW3N0YW5kU2NoZWR1bGVzLCBzdGFuZHMsIHZpZXdTdGFydCwgdmlld3BvcnRXZWVrcywgd1N0YXJ0LCB3RW5kXSk7XHJcblxyXG4gIGNvbnN0IHRvdGFsRGF5cyA9IHVzZU1lbW8oKCkgPT4gTWF0aC5jZWlsKGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIHRpbWVsaW5lRW5kKSAvIDI0KSwgW3ZpZXdTdGFydCwgdGltZWxpbmVFbmRdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFBsYW5uZWQgZGF0ZXMgZm9yIHNjaGVkdWxlZCB0ZXN0cyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBzY2hlZHVsZWRQbGFubmVkRGF0ZXMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdDogQXJyYXk8eyB0ZXN0X2lkOiBudW1iZXIgfCBzdHJpbmc7IHBsYW5uZWRfZGF0ZTogc3RyaW5nIH0+ID0gW107XHJcbiAgICBzdGFuZHMuZm9yRWFjaChzdGFuZCA9PiB7XHJcbiAgICAgIGNvbnN0IHNjaGVkdWxlID0gc3RhbmRTY2hlZHVsZXMuZ2V0KHN0YW5kLmlkKSA/PyBbXTtcclxuICAgICAgc2NoZWR1bGUuZm9yRWFjaChzdCA9PiB7XHJcbiAgICAgICAgY29uc3QgZCA9IHN0LnN0YXJ0O1xyXG4gICAgICAgIGNvbnN0IGRhdGVTdHIgPSBgJHtkLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyl9LSR7U3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpfWA7XHJcbiAgICAgICAgcmVzdWx0LnB1c2goeyB0ZXN0X2lkOiBzdC5pZCwgcGxhbm5lZF9kYXRlOiBkYXRlU3RyIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9LCBbc3RhbmRzLCBzdGFuZFNjaGVkdWxlc10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0UGxhbm5lZERhdGVzKHNjaGVkdWxlZFBsYW5uZWREYXRlcyk7XHJcbiAgfSwgW3NjaGVkdWxlZFBsYW5uZWREYXRlc10pO1xyXG5cclxuICBjb25zdCBweFBlckhvdXIgPSBjb250YWluZXJXaWR0aCAvICh2aWV3cG9ydFdlZWtzICogNyAqIDI0KTtcclxuICBjb25zdCBkYXlzID0gdXNlTWVtbygoKSA9PiBnZW5lcmF0ZURheXModmlld1N0YXJ0LCB0b3RhbERheXMpLCBbdmlld1N0YXJ0LCB0b3RhbERheXNdKTtcclxuICBjb25zdCB3ZWVrcyA9IHVzZU1lbW8oKCkgPT4gZ2VuZXJhdGVXZWVrcyh2aWV3U3RhcnQsIHRvdGFsRGF5cyksIFt2aWV3U3RhcnQsIHRvdGFsRGF5c10pO1xyXG4gIGNvbnN0IHRvdGFsV2lkdGggPSB0b3RhbERheXMgKiAyNCAqIHB4UGVySG91cjtcclxuICBjb25zdCBkYXlXaWR0aCA9IDI0ICogcHhQZXJIb3VyO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQWZ0ZXItY2hhbmdlIGhhbmRsZXIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgYWZ0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjaygobmV3U3RhbmRzOiBJbnRlcm5hbFN0YW5kW10pID0+IHtcclxuICAgIGNvbnN0IGFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKTtcclxuICAgIGNvbnN0IGRpcnR5ID0gYWxsb2NhdGlvbnNLZXkoYWxsb2NzKSAhPT0gb3JpZ2luYWxBbGxvY2F0aW9uc1JlZi5jdXJyZW50O1xyXG4gICAgc2V0SXNEaXJ0eShkaXJ0eSk7XHJcbiAgICBzZXRBbGxvY2F0aW9ucyhhbGxvY3MpO1xyXG4gICAgc2V0SGFzVW5zYXZlZENoYW5nZXMoZGlydHkpO1xyXG5cclxuICAgIGlmIChjdXJyZW50U2F2ZU1vZGUgPT09ICdsaXZlJykge1xuICAgICAgc2V0UGVuZGluZ1NhdmUodHJ1ZSk7XG4gICAgICBvbkNoYW5nZSgpO1xuICAgIH1cbiAgfSwgW2N1cnJlbnRTYXZlTW9kZSwgc2V0QWxsb2NhdGlvbnMsIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzLCBvbkNoYW5nZV0pO1xuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIERyYWcgYW5kIGRyb3AgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgZmluZFRlc3QgPSB1c2VDYWxsYmFjaygodGVzdElkOiBzdHJpbmcgfCBudW1iZXIpOiBUZXN0RGF0YSB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgcSA9IHVuYWxsb2NhdGVkLmZpbmQodCA9PiB0LmlkID09PSB0ZXN0SWQpO1xyXG4gICAgaWYgKHEpIHJldHVybiBxO1xyXG4gICAgZm9yIChjb25zdCBzIG9mIHN0YW5kcykge1xyXG4gICAgICBjb25zdCB0ID0gcy50ZXN0cy5maW5kKHQgPT4gdC5pZCA9PT0gdGVzdElkKTtcclxuICAgICAgaWYgKHQpIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSwgW3VuYWxsb2NhdGVkLCBzdGFuZHNdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJEcmFnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0RHJhZ2dlZFRlc3RJZChudWxsKTtcclxuICAgIHNldEluc2VydEluZGljYXRvcihudWxsKTtcclxuICAgIHNldFF1ZXVlSW5zZXJ0SW5kZXgobnVsbCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBkcm9wT25TdGFuZCA9IHVzZUNhbGxiYWNrKChzdGFuZElkOiBzdHJpbmcgfCBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIGlmICghZHJhZ2dlZFRlc3RJZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgdGVzdCA9IGZpbmRUZXN0KGRyYWdnZWRUZXN0SWQpO1xyXG4gICAgaWYgKCF0ZXN0KSByZXR1cm47XHJcblxyXG4gICAgLy8gUmVtb3ZlIGZyb20gdW5hbGxvY2F0ZWRcclxuICAgIHNldFVuYWxsb2NhdGVkKHByZXYgPT4gcHJldi5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGZyb20gYWxsIHN0YW5kcyBhbmQgaW5zZXJ0IGF0IHRhcmdldFxyXG4gICAgY29uc3QgbmV3U3RhbmRzID0gc3RhbmRzLm1hcChzID0+IHtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxJbmRleCA9IHMudGVzdHMuZmluZEluZGV4KHQgPT4gdC5pZCA9PT0gZHJhZ2dlZFRlc3RJZCk7XHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkID0gcy50ZXN0cy5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKTtcclxuICAgICAgaWYgKHMuaWQgPT09IHN0YW5kSWQpIHtcclxuICAgICAgICAvLyBBZGp1c3QgaW5kZXggaWYgdGhlIGRyYWdnZWQgdGVzdCB3YXMgb3JpZ2luYWxseSBpbiB0aGlzIHN0YW5kIGJlZm9yZSB0aGUgZHJvcCBwb3NpdGlvblxyXG4gICAgICAgIGNvbnN0IGFkanVzdGVkSW5kZXggPSAob3JpZ2luYWxJbmRleCAhPT0gLTEgJiYgb3JpZ2luYWxJbmRleCA8IGluZGV4KSA/IGluZGV4IC0gMSA6IGluZGV4O1xyXG4gICAgICAgIGNvbnN0IG5ld1Rlc3RzID0gWy4uLmZpbHRlcmVkXTtcclxuICAgICAgICBuZXdUZXN0cy5zcGxpY2UoYWRqdXN0ZWRJbmRleCwgMCwgdGVzdCk7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4ucywgdGVzdHM6IG5ld1Rlc3RzIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHsgLi4ucywgdGVzdHM6IGZpbHRlcmVkIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIGFmdGVyQ2hhbmdlKG5ld1N0YW5kcyk7XHJcbiAgICBjbGVhckRyYWcoKTtcclxuICB9LCBbZHJhZ2dlZFRlc3RJZCwgZmluZFRlc3QsIHN0YW5kcywgYWZ0ZXJDaGFuZ2UsIGNsZWFyRHJhZ10pO1xyXG5cclxuICBjb25zdCBkcm9wT25RdWV1ZSA9IHVzZUNhbGxiYWNrKChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICBpZiAoIWRyYWdnZWRUZXN0SWQpIHJldHVybjtcclxuICAgIGNvbnN0IHRlc3QgPSBmaW5kVGVzdChkcmFnZ2VkVGVzdElkKTtcclxuICAgIGlmICghdGVzdCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFJlbW92ZSBmcm9tIHN0YW5kc1xyXG4gICAgY29uc3QgbmV3U3RhbmRzID0gc3RhbmRzLm1hcChzID0+ICh7XHJcbiAgICAgIC4uLnMsXHJcbiAgICAgIHRlc3RzOiBzLnRlc3RzLmZpbHRlcih0ID0+IHQuaWQgIT09IGRyYWdnZWRUZXN0SWQpLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIEFkZCB0byB1bmFsbG9jYXRlZFxyXG4gICAgc2V0VW5hbGxvY2F0ZWQocHJldiA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkID0gcHJldi5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKTtcclxuICAgICAgY29uc3QgbmV4dCA9IFsuLi5maWx0ZXJlZF07XHJcbiAgICAgIG5leHQuc3BsaWNlKGluZGV4LCAwLCB0ZXN0KTtcclxuICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIGFmdGVyQ2hhbmdlKG5ld1N0YW5kcyk7XHJcbiAgICBjbGVhckRyYWcoKTtcclxuICB9LCBbZHJhZ2dlZFRlc3RJZCwgZmluZFRlc3QsIHN0YW5kcywgYWZ0ZXJDaGFuZ2UsIGNsZWFyRHJhZ10pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgU2F2ZSAvIERpc2NhcmQgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgaGFuZGxlU2F2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRQZW5kaW5nU2F2ZSh0cnVlKTtcbiAgICBvblNhdmUoKTtcbiAgfSwgW29uU2F2ZV0pO1xuXG4gIGNvbnN0IGhhbmRsZVNhdmVNb2RlQ2hhbmdlID0gdXNlQ2FsbGJhY2soKG5leHRNb2RlOiAnYmF0Y2gnIHwgJ2xpdmUnKSA9PiB7XG4gICAgaWYgKG5leHRNb2RlID09PSBjdXJyZW50U2F2ZU1vZGUgfHwgaXNMb2NrZWQpIHJldHVybjtcbiAgICBzZXRTYXZlTW9kZShuZXh0TW9kZSk7XG4gICAgaWYgKG5leHRNb2RlID09PSAnbGl2ZScgJiYgaXNEaXJ0eSkge1xuICAgICAgc2V0UGVuZGluZ1NhdmUodHJ1ZSk7XG4gICAgICBvbkNoYW5nZSgpO1xuICAgIH1cbiAgfSwgW2N1cnJlbnRTYXZlTW9kZSwgaXNEaXJ0eSwgaXNMb2NrZWQsIG9uQ2hhbmdlLCBzZXRTYXZlTW9kZV0pO1xuXG4gIGNvbnN0IGhhbmRsZURpc2NhcmQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0U2F2ZUVycm9yKGZhbHNlKTtcbiAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7XHJcbiAgICAvLyBSZS1wYXJzZSBmcm9tIGlucHV0IGRhdGFcclxuICAgIGNvbnN0IHRlc3RzQXJyID0gQXJyYXkuaXNBcnJheShpbnB1dFRlc3RzKSA/IGlucHV0VGVzdHMgOiBbXTtcclxuICAgIGNvbnN0IHN0YW5kc0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRTdGFuZHMpID8gKGlucHV0U3RhbmRzIGFzIFN0YW5kRGVmW10pIDogW107XHJcbiAgICBjb25zdCBub25Xb3JraW5nQXJyID0gQXJyYXkuaXNBcnJheShpbnB1dE5vbldvcmtpbmcpID8gaW5wdXROb25Xb3JraW5nIDogW107XHJcblxyXG4gICAgY29uc3QgeyBzdGFuZHM6IG5ld1N0YW5kcywgdW5hbGxvY2F0ZWQ6IHVuYWxsb2MgfSA9IHBhcnNlU3RhbmRzKHRlc3RzQXJyLCBzdGFuZHNBcnIsIGNoSG91cnMsIG5vbldvcmtpbmdBcnIpO1xyXG4gICAgc2V0U3RhbmRzKG5ld1N0YW5kcyk7XHJcbiAgICBzZXRVbmFsbG9jYXRlZCh1bmFsbG9jKTtcclxuICAgIHNldElzRGlydHkoZmFsc2UpO1xyXG4gICAgc2V0QWxsb2NhdGlvbnMoYnVpbGRBbGxvY2F0aW9ucyhuZXdTdGFuZHMpKTtcclxuICAgIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzKGZhbHNlKTtcclxuICB9LCBbaW5wdXRUZXN0cywgaW5wdXRTdGFuZHMsIGlucHV0Tm9uV29ya2luZywgY2hIb3Vycywgc2V0QWxsb2NhdGlvbnMsIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVJldHJ5ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U2F2ZUVycm9yKGZhbHNlKTtcclxuICAgIHNldFBlbmRpbmdTYXZlKHRydWUpO1xyXG4gICAgb25SZXRyeSgpO1xyXG4gIH0sIFtvblJldHJ5XSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBQb3BvdmVyIGFjdGlvbnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgY2xvc2VQb3BvdmVyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFBvcG92ZXIobnVsbCk7XG4gICAgc2V0UGVuZGluZ1N0YXR1c0NoYW5nZShudWxsKTtcbiAgICBzZXRTdGFydERhdGVJbnB1dFZhbHVlKCcnKTtcbiAgICBzZXRFbmREYXRlSW5wdXRWYWx1ZSgnJyk7XG4gIH0sIFtdKTtcblxyXG4gIGNvbnN0IGhhbmRsZVBvcG92ZXJNb2RlQ2hhbmdlID0gdXNlQ2FsbGJhY2soKG1vZGU6ICdyb290JyB8ICdwcmlvcml0eScgfCAnc3RhdHVzJyB8ICdzdGFydF9kYXRlJyB8ICdlbmRfZGF0ZScpID0+IHtcbiAgICBzZXRQb3BvdmVyKHByZXYgPT4gcHJldiA/IHsgLi4ucHJldiwgbW9kZSB9IDogbnVsbCk7XG4gIH0sIFtdKTtcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmZpcm1Qcmlvcml0eSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIXBvcG92ZXIpIHJldHVybjtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChwcmlvcml0eUlucHV0VmFsdWUsIDEwKTtcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSB8fCBwYXJzZWQgPCAwIHx8IHBhcnNlZCA+IDEwMCkgcmV0dXJuO1xuICAgIHNldFNlbGVjdGVkVGVzdElkKFN0cmluZyhwb3BvdmVyLnRlc3QuaWQpKTtcbiAgICBzZXRTZWxlY3RlZFRlc3RQcmlvcml0eShTdHJpbmcocGFyc2VkKSk7XG4gICAgb25DaGFuZ2VQcmlvcml0eSgpO1xuICAgIGNsb3NlUG9wb3ZlcigpO1xuICB9LCBbcG9wb3ZlciwgcHJpb3JpdHlJbnB1dFZhbHVlLCBzZXRTZWxlY3RlZFRlc3RJZCwgc2V0U2VsZWN0ZWRUZXN0UHJpb3JpdHksIG9uQ2hhbmdlUHJpb3JpdHksIGNsb3NlUG9wb3Zlcl0pO1xuXG4gIGNvbnN0IGhhbmRsZVBpY2tTdGF0dXMgPSB1c2VDYWxsYmFjaygoc3RhdHVzOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIXBvcG92ZXIpIHJldHVybjtcbiAgICBpZiAoc3RhdHVzID09PSAnUnVubmluZycpIHtcbiAgICAgIHNldFBlbmRpbmdTdGF0dXNDaGFuZ2Uoc3RhdHVzKTtcbiAgICAgIHNldFN0YXJ0RGF0ZUlucHV0VmFsdWUoZm9ybWF0RGF0ZUlucHV0VmFsdWUocG9wb3Zlci50ZXN0LnRlc3Rfc3RhcnRlZF9kYXRlKSB8fCBnZXRUb2RheURhdGVJbnB1dFZhbHVlKCkpO1xuICAgICAgc2V0RW5kRGF0ZUlucHV0VmFsdWUoJycpO1xuICAgICAgc2V0UG9wb3ZlcihwcmV2ID0+IHByZXYgPyB7IC4uLnByZXYsIG1vZGU6ICdzdGFydF9kYXRlJyB9IDogbnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdGF0dXMgPT09ICdUZXN0ZWQnKSB7XG4gICAgICBzZXRQZW5kaW5nU3RhdHVzQ2hhbmdlKHN0YXR1cyk7XG4gICAgICBzZXRFbmREYXRlSW5wdXRWYWx1ZShnZXRUb2RheURhdGVJbnB1dFZhbHVlKCkpO1xuICAgICAgc2V0U3RhcnREYXRlSW5wdXRWYWx1ZSgnJyk7XG4gICAgICBzZXRQb3BvdmVyKHByZXYgPT4gcHJldiA/IHsgLi4ucHJldiwgbW9kZTogJ2VuZF9kYXRlJyB9IDogbnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldFNlbGVjdGVkVGVzdElkKFN0cmluZyhwb3BvdmVyLnRlc3QuaWQpKTtcbiAgICBzZXRTZWxlY3RlZFRlc3RTdGF0dXMoc3RhdHVzID09PSAnTlVMTCcgPyAnJyA6IHN0YXR1cyk7XG4gICAgb25DaGFuZ2VTdGF0dXMoKTtcbiAgICBjbG9zZVBvcG92ZXIoKTtcbiAgfSwgW3BvcG92ZXIsIHNldFNlbGVjdGVkVGVzdElkLCBzZXRTZWxlY3RlZFRlc3RTdGF0dXMsIG9uQ2hhbmdlU3RhdHVzLCBjbG9zZVBvcG92ZXJdKTtcblxuICBjb25zdCBoYW5kbGVFZGl0VGVzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIXBvcG92ZXIpIHJldHVybjtcbiAgICBzZXRTZWxlY3RlZFRlc3RJZChTdHJpbmcocG9wb3Zlci50ZXN0LmlkKSk7XG4gICAgb25FZGl0VGVzdCgpO1xuICAgIGNsb3NlUG9wb3ZlcigpO1xuICB9LCBbcG9wb3Zlciwgc2V0U2VsZWN0ZWRUZXN0SWQsIG9uRWRpdFRlc3QsIGNsb3NlUG9wb3Zlcl0pO1xuXG4gIGNvbnN0IGhhbmRsZUNvbmZpcm1TdGFydERhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFwb3BvdmVyIHx8ICFzdGFydERhdGVJbnB1dFZhbHVlKSByZXR1cm47XG4gICAgc2V0U2VsZWN0ZWRUZXN0SWQoU3RyaW5nKHBvcG92ZXIudGVzdC5pZCkpO1xuICAgIGlmIChwZW5kaW5nU3RhdHVzQ2hhbmdlKSB7XG4gICAgICBzZXRTZWxlY3RlZFRlc3RTdGF0dXMocGVuZGluZ1N0YXR1c0NoYW5nZSA9PT0gJ05VTEwnID8gJycgOiBwZW5kaW5nU3RhdHVzQ2hhbmdlKTtcbiAgICAgIG9uQ2hhbmdlU3RhdHVzKCk7XG4gICAgfVxuICAgIHNldFNlbGVjdGVkVGVzdFN0YXJ0RGF0ZShzdGFydERhdGVJbnB1dFZhbHVlKTtcbiAgICBvbkNoYW5nZVN0YXJ0RGF0ZSgpO1xuICAgIGNsb3NlUG9wb3ZlcigpO1xuICB9LCBbcG9wb3Zlciwgc3RhcnREYXRlSW5wdXRWYWx1ZSwgcGVuZGluZ1N0YXR1c0NoYW5nZSwgc2V0U2VsZWN0ZWRUZXN0SWQsIHNldFNlbGVjdGVkVGVzdFN0YXR1cywgb25DaGFuZ2VTdGF0dXMsIHNldFNlbGVjdGVkVGVzdFN0YXJ0RGF0ZSwgb25DaGFuZ2VTdGFydERhdGUsIGNsb3NlUG9wb3Zlcl0pO1xuXG4gIGNvbnN0IGhhbmRsZUNvbmZpcm1FbmREYXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghcG9wb3ZlciB8fCAhZW5kRGF0ZUlucHV0VmFsdWUpIHJldHVybjtcbiAgICBzZXRTZWxlY3RlZFRlc3RJZChTdHJpbmcocG9wb3Zlci50ZXN0LmlkKSk7XG4gICAgaWYgKHBlbmRpbmdTdGF0dXNDaGFuZ2UpIHtcbiAgICAgIHNldFNlbGVjdGVkVGVzdFN0YXR1cyhwZW5kaW5nU3RhdHVzQ2hhbmdlID09PSAnTlVMTCcgPyAnJyA6IHBlbmRpbmdTdGF0dXNDaGFuZ2UpO1xuICAgICAgb25DaGFuZ2VTdGF0dXMoKTtcbiAgICB9XG4gICAgc2V0U2VsZWN0ZWRUZXN0RW5kRGF0ZShlbmREYXRlSW5wdXRWYWx1ZSk7XG4gICAgb25DaGFuZ2VFbmREYXRlKCk7XG4gICAgY2xvc2VQb3BvdmVyKCk7XG4gIH0sIFtwb3BvdmVyLCBlbmREYXRlSW5wdXRWYWx1ZSwgcGVuZGluZ1N0YXR1c0NoYW5nZSwgc2V0U2VsZWN0ZWRUZXN0SWQsIHNldFNlbGVjdGVkVGVzdFN0YXR1cywgb25DaGFuZ2VTdGF0dXMsIHNldFNlbGVjdGVkVGVzdEVuZERhdGUsIG9uQ2hhbmdlRW5kRGF0ZSwgY2xvc2VQb3BvdmVyXSk7XG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQmFyIHBvc2l0aW9uIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGdldEJhclBvcyA9IHVzZUNhbGxiYWNrKChzdGFydDogRGF0ZSwgZHVyYXRpb246IG51bWJlcikgPT4gKHtcclxuICAgIGxlZnQ6IE1hdGgubWF4KDAsIGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIHN0YXJ0KSkgKiBweFBlckhvdXIsXHJcbiAgICB3aWR0aDogTWF0aC5tYXgoZHVyYXRpb24gKiBweFBlckhvdXIsIDIpLFxyXG4gIH0pLCBbdmlld1N0YXJ0LCBweFBlckhvdXJdKTtcclxuXHJcbiAgLy8gRm9yIFJ1bm5pbmcgdGVzdHM6IGNsaXAgbGVmdCB0byB2aWV3U3RhcnQsIGFkanVzdCB3aWR0aCB0byBhY3R1YWwgZW5kIHRpbWUuXHJcbiAgLy8gUmV0dXJucyBudWxsIGlmIHRoZSB0ZXN0IGVuZGVkIGJlZm9yZSB0aGUgdGltZWxpbmUgc3RhcnRzLlxyXG4gIGNvbnN0IGdldFJ1bm5pbmdCYXJQb3MgPSB1c2VDYWxsYmFjaygoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IHsgbGVmdDogbnVtYmVyOyB3aWR0aDogbnVtYmVyIH0gfCBudWxsID0+IHtcclxuICAgIGNvbnN0IGVmZmVjdGl2ZVN0YXJ0TXMgPSBNYXRoLm1heChzdGFydC5nZXRUaW1lKCksIHZpZXdTdGFydC5nZXRUaW1lKCkpO1xyXG4gICAgY29uc3QgZW5kTXMgPSBlbmQuZ2V0VGltZSgpO1xyXG4gICAgaWYgKGVuZE1zIDw9IGVmZmVjdGl2ZVN0YXJ0TXMpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGVmdDogaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgbmV3IERhdGUoZWZmZWN0aXZlU3RhcnRNcykpICogcHhQZXJIb3VyLFxyXG4gICAgICB3aWR0aDogTWF0aC5tYXgoaG91cnNCZXR3ZWVuKG5ldyBEYXRlKGVmZmVjdGl2ZVN0YXJ0TXMpLCBuZXcgRGF0ZShlbmRNcykpICogcHhQZXJIb3VyLCAyKSxcclxuICAgIH07XHJcbiAgfSwgW3ZpZXdTdGFydCwgcHhQZXJIb3VyXSk7XHJcblxyXG4gIGNvbnN0IGRyYWdnZWRUZXN0ID0gZHJhZ2dlZFRlc3RJZCAhPSBudWxsID8gZmluZFRlc3QoZHJhZ2dlZFRlc3RJZCkgOiBudWxsO1xyXG4gIGNvbnN0IGRyYWdnZWRJc1J1bm5pbmcgPSBkcmFnZ2VkVGVzdCAhPSBudWxsID8gaXNSdW5uaW5nVGVzdChkcmFnZ2VkVGVzdCkgOiBmYWxzZTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFN0YXRzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IHRvdGFsQWxsb2NhdGVkID0gc3RhbmRzLnJlZHVjZSgoYSwgcykgPT4gYSArIHMudGVzdHMubGVuZ3RoLCAwKTtcclxuICBjb25zdCB0b3RhbEhvdXJzID0gc3RhbmRzLnJlZHVjZSgoYSwgcykgPT4gYSArIHMudGVzdHMucmVkdWNlKChiLCB0KSA9PiBiICsgdC5kdXJhdGlvbiwgMCksIDApO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgVGVtcGxhdGUgYWNjZXNzb3JzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IG1haW5UZXh0ID0gU3RyaW5nKGNhcmRNYWluVGV4dCB8fCAne25hbWV9Jyk7XHJcbiAgY29uc3Qgc3ViVGV4dCA9IFN0cmluZyhjYXJkU3ViVGV4dCB8fCAnJyk7XHJcbiAgY29uc3QgaW5mb1JvdyA9IFN0cmluZyhjYXJkSW5mb1JvdyB8fCAnJyk7XHJcbiAgY29uc3QgdGlwVGVtcGxhdGUgPSBTdHJpbmcodG9vbHRpcFRlbXBsYXRlIHx8ICcnKS5yZXBsYWNlKC9cXFxcbi9nLCAnXFxuJyk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBGaWx0ZXJlZCAmIHNvcnRlZCBxdWV1ZSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBTVEFUVVNfU09SVF9PUkRFUjogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHtcclxuICAgICdSdW5uaW5nJzogMCwgJ0RlbGF5ZWQnOiAxLCAnT24gVGltZSc6IDIsICdSZWFkeSc6IDMsICdJbiBQcm9ncmVzcyc6IDQsICdQYXJ0cyBOb3QgQXNzaWduZWQnOiA1LFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNvcnRlZFVuYWxsb2NhdGVkID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBsZXQgbGlzdCA9IFsuLi51bmFsbG9jYXRlZF07XHJcbiAgICBpZiAocXVldWVGaWx0ZXIudHJpbSgpKSB7XHJcbiAgICAgIGNvbnN0IHEgPSBxdWV1ZUZpbHRlci50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICAgICAgLy8gU2VhcmNoIGFjcm9zcyBhbGwgcmVhZGFibGUgc3RyaW5nL251bWJlciBmaWVsZHMgb2YgdGhlIHRlc3RcclxuICAgICAgbGlzdCA9IGxpc3QuZmlsdGVyKHQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaGFibGUgPSBbdC5uYW1lLCB0Lm93bmVyLCB0Lm5vdGVzLCB0LnN0YXR1cywgdC5wYXJ0X3N0YXR1cywgdC5hc3NpZ25lZF9wYXJ0cyxcclxuICAgICAgICAgIHQucHJpb3JpdHkgIT0gbnVsbCA/IFN0cmluZyh0LnByaW9yaXR5KSA6ICcnLCB0LmR1cmF0aW9uICE9IG51bGwgPyBTdHJpbmcodC5kdXJhdGlvbikgOiAnJ11cclxuICAgICAgICAgIC5qb2luKCcgJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gc2VhcmNoYWJsZS5pbmNsdWRlcyhxKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAocXVldWVTb3J0ID09PSAnYXonKSB7XHJcbiAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4gKGEubmFtZSB8fCAnJykubG9jYWxlQ29tcGFyZShiLm5hbWUgfHwgJycpKTtcclxuICAgIH0gZWxzZSBpZiAocXVldWVTb3J0ID09PSAncHJpb3JpdHknKSB7XHJcbiAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4gKGIucHJpb3JpdHkgPz8gNTApIC0gKGEucHJpb3JpdHkgPz8gNTApKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNvcnQgYnkgZGlzcGxheSBzdGF0dXMgdXNpbmcgYSBmaXhlZCB1cmdlbmN5IG9yZGVyXHJcbiAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNhID0gU1RBVFVTX1NPUlRfT1JERVJbZ2V0RGlzcGxheVN0YXR1cyhhKV0gPz8gOTk7XHJcbiAgICAgICAgY29uc3Qgc2IgPSBTVEFUVVNfU09SVF9PUkRFUltnZXREaXNwbGF5U3RhdHVzKGIpXSA/PyA5OTtcclxuICAgICAgICByZXR1cm4gc2EgIT09IHNiID8gc2EgLSBzYiA6IChiLnByaW9yaXR5ID8/IDUwKSAtIChhLnByaW9yaXR5ID8/IDUwKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGlzdDtcclxuICB9LCBbdW5hbGxvY2F0ZWQsIHF1ZXVlU29ydCwgcXVldWVGaWx0ZXJdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEJhciBoZWlnaHQgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgQkFSX0hFSUdIVCA9IDcyO1xyXG4gIGNvbnN0IExBTkVfSEVJR0hUID0gODQ7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBSZW5kZXIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgZGlzcGxheTogJ2ZsZXgnLCBoZWlnaHQ6ICcxMDAlJywgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLFxyXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgfX0+XHJcbiAgICAgIDxzdHlsZT57YEBrZXlmcmFtZXMgY2NsLXNwaW4geyB0byB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0gfWB9PC9zdHlsZT5cclxuICAgICAge2lzTG9ja2VkICYmIChcclxuICAgICAgICA8U2F2ZU92ZXJsYXlcclxuICAgICAgICAgIGlzRXJyb3I9e3NhdmVFcnJvcn1cclxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cclxuICAgICAgICAgIG9uUmV0cnk9e2hhbmRsZVJldHJ5fVxyXG4gICAgICAgICAgb25EaXNjYXJkPXtoYW5kbGVEaXNjYXJkfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICAgIHsvKiBcdTI1NTBcdTI1NTBcdTI1NTAgUXVldWUgU2lkZWJhciBcdTI1NTBcdTI1NTBcdTI1NTAgKi99XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDMyMCwgbWluV2lkdGg6IDMyMCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLCBib3JkZXJSaWdodDogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nIH19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTZweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBtYXJnaW5Cb3R0b206IDQgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4IH19PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDgsIGhlaWdodDogOCwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogdW5hbGxvY2F0ZWQubGVuZ3RoID4gMCA/ICcjRjU5RTBCJyA6ICcjMTBCOTgxJyB9fSAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDhlbScsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBjb2xvcjogdGhlbWUudGV4dFRlcnRpYXJ5IH19PlF1ZXVlPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogMiwgYmFja2dyb3VuZDogdGhlbWUuYmdTdWJ0bGUsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLCBwYWRkaW5nOiAyLCBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCB9fT5cclxuICAgICAgICAgICAgICB7KFtbJ2F6JywgJ0FcdTIxOTJaJ10sIFsncHJpb3JpdHknLCAnUHJpb3JpdHknXSwgWydzdGF0dXMnLCAnU3RhdHVzJ11dIGFzIGNvbnN0KS5tYXAoKFt2YWwsIGxhYmVsXSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3ZhbH1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UXVldWVTb3J0KHZhbCl9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHBhZGRpbmc6ICczcHggOHB4JywgZm9udFNpemU6IDksIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNTbSxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogcXVldWVTb3J0ID09PSB2YWwgPyB0aGVtZS5hY2NlbnQgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBxdWV1ZVNvcnQgPT09IHZhbCA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dE11dGVkLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPntsYWJlbH08L2J1dHRvbj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIG1hcmdpblRvcDogNiB9fT5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXtxdWV1ZUZpbHRlcn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFF1ZXVlRmlsdGVyKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkZpbHRlciB0ZXN0cy4uLlwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCB3aWR0aDogJzEwMCUnLCBib3hTaXppbmc6ICdib3JkZXItYm94JywgcGFkZGluZzogJzVweCAyOHB4IDVweCA4cHgnLCBmb250U2l6ZTogMTEsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSwgb3V0bGluZTogJ25vbmUnLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgb25Gb2N1cz17KGUpID0+IHsgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJvcmRlckNvbG9yID0gdGhlbWUuYWNjZW50OyBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9IHRoZW1lLnN1cmZhY2U7IH19XHJcbiAgICAgICAgICAgICAgb25CbHVyPXsoZSkgPT4geyBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYm9yZGVyQ29sb3IgPSB0aGVtZS5ib3JkZXI7IGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gdGhlbWUuY2FudmFzOyB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICB7cXVldWVGaWx0ZXIgJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFF1ZXVlRmlsdGVyKCcnKX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCByaWdodDogNiwgdG9wOiAnNTAlJywgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBjb2xvcjogdGhlbWUudGV4dERpc2FibGVkLFxyXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTQsIGxpbmVIZWlnaHQ6IDEsIHBhZGRpbmc6IDAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID4mdGltZXM7PC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgc3R5bGU9e3sgZmxleDogMSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6ICc4cHggMTBweCcgfX1cclxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQpIHNldFF1ZXVlSW5zZXJ0SW5kZXgodW5hbGxvY2F0ZWQubGVuZ3RoKTsgfX1cclxuICAgICAgICAgIG9uRHJhZ0xlYXZlPXsoZSkgPT4geyBpZiAoZS5jdXJyZW50VGFyZ2V0ID09PSBlLnRhcmdldCkgc2V0UXVldWVJbnNlcnRJbmRleChudWxsKTsgfX1cclxuICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBkcm9wT25RdWV1ZShxdWV1ZUluc2VydEluZGV4ID8/IHVuYWxsb2NhdGVkLmxlbmd0aCk7IH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3NvcnRlZFVuYWxsb2NhdGVkLm1hcCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IGdldERpc3BsYXlTdGF0dXModGVzdCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNob3dTdWIgPSAhaXNUZW1wbGF0ZUVtcHR5KHN1YlRleHQsIHRlc3QpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZE1haW4gPSByZXNvbHZlVGVtcGxhdGUobWFpblRleHQsIHRlc3QpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZFN1YiA9IHJlc29sdmVUZW1wbGF0ZShzdWJUZXh0LCB0ZXN0KTtcclxuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRJbmZvID0gcmVzb2x2ZVRlbXBsYXRlKGluZm9Sb3csIHRlc3QpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17dGVzdC5pZH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgc2V0UXVldWVJbnNlcnRJbmRleChpZHgpOyB9fVxyXG4gICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZHJvcE9uUXVldWUoaWR4KTsgfX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHF1ZXVlSW5zZXJ0SW5kZXggPT09IGlkeCAmJiBkcmFnZ2VkVGVzdElkICYmIGRyYWdnZWRUZXN0SWQgIT09IHRlc3QuaWQgPyA2IDogMCxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC4xMnMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFF1ZXVlQ2FyZFxyXG4gICAgICAgICAgICAgICAgICB0ZXN0PXt0ZXN0fVxyXG4gICAgICAgICAgICAgICAgICBkcmFnZ2VkVGVzdElkPXtkcmFnZ2VkVGVzdElkfVxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICAgICAgICAgICAgbWFpblRleHQ9e3Jlc29sdmVkTWFpbn1cclxuICAgICAgICAgICAgICAgICAgc3ViVGV4dD17cmVzb2x2ZWRTdWJ9XHJcbiAgICAgICAgICAgICAgICAgIGluZm9Sb3c9e3Jlc29sdmVkSW5mb31cclxuICAgICAgICAgICAgICAgICAgc2hvd1N1Yj17c2hvd1N1Yn1cclxuICAgICAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxyXG4gICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17KCkgPT4gc2V0RHJhZ2dlZFRlc3RJZCh0ZXN0LmlkKX1cclxuICAgICAgICAgICAgICAgICAgb25EcmFnRW5kPXtjbGVhckRyYWd9XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgY29uc3QgcmVjdCA9IGUuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgc2V0UXVldWVJbnNlcnRJbmRleChlLmNsaWVudFkgPCByZWN0LnRvcCArIHJlY3QuaGVpZ2h0IC8gMiA/IGlkeCA6IGlkeCArIDEpOyB9fVxyXG4gICAgICAgICAgICAgICAgICBvbk1lbnVPcGVuPXsocmVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHJhZ2dlZFRlc3RJZCB8fCBpc0xvY2tlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBzZXRQcmlvcml0eUlucHV0VmFsdWUoU3RyaW5nKHRlc3QucHJpb3JpdHkgPz8gNTApKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0U3RhcnREYXRlSW5wdXRWYWx1ZShmb3JtYXREYXRlSW5wdXRWYWx1ZSh0ZXN0LnRlc3Rfc3RhcnRlZF9kYXRlKSk7XG4gICAgICAgICAgICAgICAgICAgIHNldEVuZERhdGVJbnB1dFZhbHVlKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0UGVuZGluZ1N0YXR1c0NoYW5nZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0UG9wb3Zlcih7XG4gICAgICAgICAgICAgICAgICAgICAgYW5jaG9yUmVjdDogcmVjdCxcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgIG1vZGU6ICdyb290JyxcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5U3RhdHVzOiBzdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcExpbmVzOiByZXNvbHZlVGVtcGxhdGUodGlwVGVtcGxhdGUsIHRlc3QpLFxuICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgc2V0UXVldWVJbnNlcnRJbmRleCh1bmFsbG9jYXRlZC5sZW5ndGgpOyB9fVxyXG4gICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZHJvcE9uUXVldWUodW5hbGxvY2F0ZWQubGVuZ3RoKTsgfX1cclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBoZWlnaHQ6IChxdWV1ZUluc2VydEluZGV4ID09PSB1bmFsbG9jYXRlZC5sZW5ndGggJiYgZHJhZ2dlZFRlc3RJZCkgPyA2IDogMCxcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzLFxyXG4gICAgICAgICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC4xMnMgZWFzZScsXHJcbiAgICAgICAgICAgICAgbWFyZ2luOiAnMCA0cHgnLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHt1bmFsbG9jYXRlZC5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJywgcGFkZGluZzogJzMycHggMTZweCcsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRTaXplOiAxMixcclxuICAgICAgICAgICAgICBib3JkZXI6IGRyYWdnZWRUZXN0SWQgPyBgMnB4IGRhc2hlZCAke3RoZW1lLmFjY2VudH1gIDogYDJweCBkYXNoZWQgJHt0aGVtZS5ib3JkZXJTdHJvbmd9YCxcclxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLCBtYXJnaW5Ub3A6IDgsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogZHJhZ2dlZFRlc3RJZCA/IHRoZW1lLmFjY2VudFN1YnRsZSA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sXHJcbiAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgIHtkcmFnZ2VkVGVzdElkID8gJ0Ryb3AgdG8gcmV0dXJuIHRvIHF1ZXVlJyA6ICdBbGwgdGVzdHMgYWxsb2NhdGVkJ31cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8T3V0bGluZUtleSB0aGVtZT17dGhlbWV9IC8+XHJcblxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTZweCcsIGJvcmRlclRvcDogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGZvbnRTaXplOiAxMCwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCB9fT5cclxuICAgICAgICAgICAgPHNwYW4+e3RvdGFsQWxsb2NhdGVkfS97dG90YWxBbGxvY2F0ZWQgKyB1bmFsbG9jYXRlZC5sZW5ndGh9IGFsbG9jYXRlZDwvc3Bhbj48c3Bhbj57dG90YWxIb3Vyc31oPC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgey8qIFx1MjU1MFx1MjU1MFx1MjU1MCBNYWluIFRpbWVsaW5lIFx1MjU1MFx1MjU1MFx1MjU1MCAqL31cclxuICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBvdmVyZmxvdzogJ2hpZGRlbicgfX0+XHJcbiAgICAgICAgey8qIEhlYWRlciBiYXIgKi99XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAyNHB4JywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJhY2tncm91bmQ6IHRoZW1lLnN1cmZhY2UsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGdhcDogMTYsIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgICAgICA8aDEgc3R5bGU9e3sgZm9udFNpemU6IDE4LCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSwgbGV0dGVyU3BhY2luZzogJy0wLjAyZW0nLCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5IH19PlRlc3QgU3RhbmQgU2NoZWR1bGVyPC9oMT5cclxuICAgICAgICAgICAgICA8cCBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Ub3A6IDIgfX0+XG4gICAgICAgICAgICAgICAgQ29udGludW91cyB0ZXN0aW5nIFx1MDBCNyB7Y2hIb3Vyc31oIGNoYW5nZW92ZXIgKGRlZmF1bHQpIFx1MDBCNyB7d1N0YXJ0fTowMFx1MjAxM3t3RW5kfTowMCBNb25cdTIwMTNGcmlcbiAgICAgICAgICAgICAge2N1cnJlbnRTYXZlTW9kZSA9PT0gJ2xpdmUnICYmIDxzcGFuPiBcdTAwQjcgTGl2ZSBzeW5jPC9zcGFuPn1cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2ZsZXgtZW5kJywgZ2FwOiAxMiwgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgIHsvKiBTYXZlL0Rpc2NhcmQgYnV0dG9ucyAoYmF0Y2ggbW9kZSkgKi99XG4gICAgICAgICAgICB7Y3VycmVudFNhdmVNb2RlID09PSAnYmF0Y2gnICYmIChcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgYWxpZ25JdGVtczogJ2NlbnRlcicsIGFsaWduU2VsZjogJ3N0cmV0Y2gnIH19PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURpc2NhcmR9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRGlydHkgfHwgaXNMb2NrZWR9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25TZWxmOiAnZmxleC1lbmQnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLCBwYWRkaW5nOiAnNnB4IDAnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke2lzRGlydHkgJiYgIWlzTG9ja2VkID8gdGhlbWUuYWNjZW50IDogdGhlbWUuYm9yZGVyfWAsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/ICdwb2ludGVyJyA6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IHRoZW1lLmFjY2VudCA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0RGlzYWJsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gYDAgMXB4IDNweCAke3RoZW1lLmFjY2VudH00RGAgOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIERpc2NhcmQgQ2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTYXZlfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0RpcnR5IHx8IGlzTG9ja2VkfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sXG4gICAgICAgICAgICAgICAgICAgIGFsaWduU2VsZjogJ2ZsZXgtZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMCwgcGFkZGluZzogJzZweCAwJywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHtpc0RpcnR5ICYmICFpc0xvY2tlZCA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLmJvcmRlcn1gLFxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyAncG9pbnRlcicgOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyB0aGVtZS5hY2NlbnQgOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dERpc2FibGVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IGAwIDFweCAzcHggJHt0aGVtZS5hY2NlbnR9NERgIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgU2F2ZSBDaGFuZ2VzXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6IDQgfX0+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTAsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDZlbScsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBjb2xvcjogdGhlbWUudGV4dE11dGVkIH19PlxuICAgICAgICAgICAgICAgIFNhdmUgTW9kZVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMiwgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAyLCBtaW5XaWR0aDogMTIyLCBiYWNrZ3JvdW5kOiB0aGVtZS5iZ1N1YnRsZSwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZywgcGFkZGluZzogMiwgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgfX0+XG4gICAgICAgICAgICAgICAgICB7KFsnYmF0Y2gnLCAnbGl2ZSddIGFzIGNvbnN0KS5tYXAobW9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGN1cnJlbnRTYXZlTW9kZSA9PT0gbW9kZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzYWJsZWQgPSBpc0xvY2tlZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e21vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTYXZlTW9kZUNoYW5nZShtb2RlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IGRpc2FibGVkID8gJ2RlZmF1bHQnIDogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBhY3RpdmUgPyB0aGVtZS5hY2NlbnQgOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogYWN0aXZlID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0VGVydGlhcnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IGRpc2FibGVkID8gMC42NSA6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICdsb3dlcmNhc2UnIGFzIGNvbnN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bW9kZX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFZpZXdwb3J0IHNlbGVjdG9yICovfVxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDQsIGJhY2tncm91bmQ6IHRoZW1lLmJnU3VidGxlLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLCBwYWRkaW5nOiAzLCBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCB9fT5cbiAgICAgICAgICAgICAgICAgIHtbMiwgNCwgOCwgMTIsIDI0XS5tYXAoKHcpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17d31cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IHVzZXJDaGFuZ2VkVmlld3BvcnQuY3VycmVudCA9IHRydWU7IHNldFZpZXdwb3J0V2Vla3Modyk7IH19XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzZweCAxMnB4JywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdmlld3BvcnRXZWVrcyA9PT0gdyA/IHRoZW1lLmFjY2VudCA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdmlld3BvcnRXZWVrcyA9PT0gdyA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dFRlcnRpYXJ5LFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7d31XXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7LyogVGltZWxpbmUgc2Nyb2xsIGFyZWEgKi99XHJcbiAgICAgICAgPGRpdiByZWY9e3Njcm9sbFJlZn0gc3R5bGU9e3sgZmxleDogMSwgb3ZlcmZsb3c6ICdhdXRvJywgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtaW5XaWR0aDogdG90YWxXaWR0aCwgcGFkZGluZzogJzAgMTJweCAyNHB4JywgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XHJcbiAgICAgICAgICAgIHsvKiBUaW1lbGluZSBoZWFkZXIgKi99XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdzdGlja3knLCB0b3A6IDAsIHpJbmRleDogMjAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgfX0+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGhlaWdodDogMjgsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gIH19PlxyXG4gICAgICAgICAgICAgICAge2RheXMubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTW9uZGF5ID0gZC5nZXREYXkoKSA9PT0gMTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCB3aWR0aDogZGF5V2lkdGgsIG1pbldpZHRoOiBkYXlXaWR0aCwgaGVpZ2h0OiAyOCxcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRUZXJ0aWFyeSxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHtpc01vbmRheSAmJiBpID4gMCA/IHRoZW1lLmJvcmRlciA6ICd0cmFuc3BhcmVudCd9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBpc01vbmRheSA/IDcgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICd2aXNpYmxlJywgd2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7aXNNb25kYXkgPyBmb3JtYXRXZWVrKGQpIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgaGVpZ2h0OiAyNCB9fT5cclxuICAgICAgICAgICAgICAgIHtkYXlzLm1hcCgoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1RvZGF5ID0gZC50b0RhdGVTdHJpbmcoKSA9PT0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNXZWVrZW5kID0gZC5nZXREYXkoKSA9PT0gMCB8fCBkLmdldERheSgpID09PSA2O1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHdpZHRoOiBkYXlXaWR0aCwgbWluV2lkdGg6IGRheVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDksIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogaXNUb2RheSA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLnRleHRNdXRlZCxcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGlzVG9kYXkgPyA3MDAgOiA0MDAsIGxpbmVIZWlnaHQ6ICcyNHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGlzVG9kYXkgPyB0aGVtZS5hY2NlbnRTdWJ0bGUgOiAoaXNXZWVrZW5kID8gdGhlbWUuYmdTdWJ0bGUgOiAndHJhbnNwYXJlbnQnKSxcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIHt2aWV3cG9ydFdlZWtzIDw9IDggPyBkLmdldERhdGUoKSA6IChkLmdldERheSgpID09PSAxID8gZC5nZXREYXRlKCkgOiAnJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICB7LyogXHUyNTUwXHUyNTUwXHUyNTUwIFRlc3QgU3RhbmQgTGFuZXMgXHUyNTUwXHUyNTUwXHUyNTUwICovfVxyXG4gICAgICAgICAgICB7c3RhbmRzLm1hcCgoc3RhbmQpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBzY2hlZHVsZSA9IHN0YW5kU2NoZWR1bGVzLmdldChzdGFuZC5pZCkgPz8gW107XHJcbiAgICAgICAgICAgICAgY29uc3QgaW5kID0gaW5zZXJ0SW5kaWNhdG9yO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNob3dIZXJlID0gaW5kICYmIGluZC5zdGFuZElkID09PSBzdGFuZC5pZDtcclxuXHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtzdGFuZC5pZH0gc3R5bGU9e3sgbWFyZ2luVG9wOiAxNiB9fT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDgsIG1hcmdpbkJvdHRvbTogNiwgcGFkZGluZ0xlZnQ6IDIgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNiwgaGVpZ2h0OiA2LCBib3JkZXJSYWRpdXM6IDIsIGJhY2tncm91bmQ6IHN0YW5kLnRlc3RzLmxlbmd0aCA+IDAgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS50ZXh0RGlzYWJsZWQgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5IH19PntzdGFuZC5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDEwLCBjb2xvcjogdGhlbWUudGV4dE11dGVkIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAge3N0YW5kLnRlc3RzLmxlbmd0aH0gdGVzdHtzdGFuZC50ZXN0cy5sZW5ndGggIT09IDEgPyAncycgOiAnJ317c3RhbmQudGVzdHMubGVuZ3RoID4gMCAmJiBgIFxcdTAwYjcgJHtzdGFuZC50ZXN0cy5yZWR1Y2UoKGEsIHQpID0+IGEgKyB0LmR1cmF0aW9uLCAwKX1oYH1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgc2V0SW5zZXJ0SW5kaWNhdG9yKHsgc3RhbmRJZDogc3RhbmQuaWQsIGluZGV4OiBzdGFuZC50ZXN0cy5sZW5ndGggfSk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgb25EcmFnTGVhdmU9eyhlKSA9PiB7IGlmICghZS5jdXJyZW50VGFyZ2V0LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCBhcyBOb2RlKSkgc2V0SW5zZXJ0SW5kaWNhdG9yKG51bGwpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIFJ1bm5pbmcgdGVzdHMgYWx3YXlzIGFwcGVuZCB0byBlbmQgKHBvc2l0aW9uIGlzIGdvdmVybmVkIGJ5IHRlc3Rfc3RhcnRlZF9kYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGRyYWdnZWRJc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIHN0YW5kLnRlc3RzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wT25TdGFuZChzdGFuZC5pZCwgaW5kPy5zdGFuZElkID09PSBzdGFuZC5pZCA/IGluZC5pbmRleCA6IHN0YW5kLnRlc3RzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IExBTkVfSEVJR0hULFxyXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gc2hvd0hlcmUgfHwgKGRyYWdnZWRUZXN0SWQgJiYgc3RhbmQudGVzdHMubGVuZ3RoID09PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHJldHVybiB0aGVtZS5zdXJmYWNlU2Vjb25kYXJ5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJhZ2dlZElzUnVubmluZyA/IHRoZW1lLnJ1bm5pbmdCZyA6IHRoZW1lLmFjY2VudFN1YnRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHsoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBzaG93SGVyZSB8fCAoZHJhZ2dlZFRlc3RJZCAmJiBzdGFuZC50ZXN0cy5sZW5ndGggPT09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuIHRoZW1lLmJvcmRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyYWdnZWRJc1J1bm5pbmcgPyB0aGVtZS5ydW5uaW5nQm9yZGVyIDogdGhlbWUuYWNjZW50TXV0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRvdGFsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnYmFja2dyb3VuZCAwLjE1cyBlYXNlLCBib3JkZXItY29sb3IgMC4xNXMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBXZWVrZW5kIHNoYWRpbmcgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge2RheXMubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5nZXREYXkoKSAhPT0gMCAmJiBkLmdldERheSgpICE9PSA2KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgd2UtJHtpfWB9IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGkgKiBkYXlXaWR0aCwgdG9wOiAwLCBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGRheVdpZHRoLCBiYWNrZ3JvdW5kOiB0aGVtZS5ib3JkZXIsIG9wYWNpdHk6IDAuMzUsIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBEYXkgZ3JpZCAqL31cclxuICAgICAgICAgICAgICAgICAgICB7ZGF5cy5tYXAoKF8sIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogaSAqIGRheVdpZHRoLCB0b3A6IDAsIGJvdHRvbTogMCwgd2lkdGg6IDEsIGJhY2tncm91bmQ6IHRoZW1lLmJvcmRlciB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogTm93IGxpbmUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoID0gaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaCA8IDAgfHwgaCA+IHRvdGFsRGF5cyAqIDI0KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGggKiBweFBlckhvdXIsIHRvcDogMCwgYm90dG9tOiAwLCB3aWR0aDogMiwgYmFja2dyb3VuZDogJyNFRjQ0NDQnLCB6SW5kZXg6IDE4LCBwb2ludGVyRXZlbnRzOiAnbm9uZScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTMsIGxlZnQ6IC0zLCB3aWR0aDogOCwgaGVpZ2h0OiA4LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiAnI0VGNDQ0NCcgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBOb24td29ya2luZyBibG9ja3MgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3N0YW5kLm5vbldvcmtpbmdCbG9ja3MubWFwKChibG9jaywgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVmdCA9IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIGJsb2NrLnN0YXJ0KSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gaG91cnNCZXR3ZWVuKGJsb2NrLnN0YXJ0LCBibG9jay5lbmQpICogcHhQZXJIb3VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgKyB3aWR0aCA8IDAgfHwgbGVmdCA+IHRvdGFsV2lkdGgpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhbXBlZExlZnQgPSBNYXRoLm1heCgwLCBsZWZ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRXaWR0aCA9IE1hdGgubWluKHdpZHRoICsgTWF0aC5taW4oMCwgbGVmdCksIHRvdGFsV2lkdGggLSBjbGFtcGVkTGVmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YG53LSR7aX1gfSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBjbGFtcGVkTGVmdCwgdG9wOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjbGFtcGVkV2lkdGgsIGhlaWdodDogQkFSX0hFSUdIVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDYsIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCg0NWRlZywgJHt0aGVtZS5ib3JkZXJ9IDBweCwgJHt0aGVtZS5ib3JkZXJ9IDE1cHgsICR7dGhlbWUuc3VyZmFjZX0gMTVweCwgJHt0aGVtZS5zdXJmYWNlfSAzMHB4KWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZywgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyU3Ryb25nfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAncm93Jywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA1LCBtaW5XaWR0aDogNSwgYmFja2dyb3VuZDogdGhlbWUudGV4dERpc2FibGVkLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBwYWRkaW5nOiAnNHB4IDhweCcsIG1pbldpZHRoOiAwLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgbWF4V2lkdGg6ICcxMDAlJywgbGluZUhlaWdodDogMS4yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+e2Jsb2NrLm5vdGVzIHx8ICdNYWludGVuYW5jZSd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBUZXN0IGJhcnMgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3NjaGVkdWxlLm1hcCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1Rlc3RSdW5uaW5nID0gaXNSdW5uaW5nVGVzdCh0ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhclBvcyA9IGlzVGVzdFJ1bm5pbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBnZXRSdW5uaW5nQmFyUG9zKHRlc3Quc3RhcnQsIHRlc3QuZW5kKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGdldEJhclBvcyh0ZXN0LnN0YXJ0LCB0ZXN0LmR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIFJ1bm5pbmcgdGVzdHMgdGhhdCBlbmRlZCBiZWZvcmUgdGhlIHRpbWVsaW5lIHN0YXJ0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCFiYXJQb3MpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgd2lkdGggfSA9IGJhclBvcztcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKHRlc3QuZW5kLCBzdGFuZC5jaGFuZ2VvdmVyX2hvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlb3ZlcldpZHRoID0gaG91cnNCZXR3ZWVuKHRlc3QuZW5kLCBjRW5kKSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlTdGF0dXMgPSBnZXREaXNwbGF5U3RhdHVzKHRlc3QsIHRlc3Quc3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkTWFpbiA9IHJlc29sdmVUZW1wbGF0ZShtYWluVGV4dCwgdGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZEluZm8gPSByZXNvbHZlVGVtcGxhdGUoaW5mb1JvdywgdGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaG93SW5mb09uQmFyID0gcmVzb2x2ZWRJbmZvLnRyaW0oKSAhPT0gJycgJiYgd2lkdGggPiAxMjA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3Rlc3QuaWR9IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0LCB0b3A6IDAsIHdpZHRoOiB3aWR0aCArIGNoYW5nZW92ZXJXaWR0aCwgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIERyb3Agem9uZXMgXHUyMDE0IHN1cHByZXNzZWQgd2hlbiBkcmFnZ2luZyBhIFJ1bm5pbmcgdGVzdCAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZHJhZ2dlZFRlc3RJZCAmJiBkcmFnZ2VkVGVzdElkICE9PSB0ZXN0LmlkICYmICFkcmFnZ2VkSXNSdW5uaW5nICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldEluc2VydEluZGljYXRvcih7IHN0YW5kSWQ6IHN0YW5kLmlkLCBpbmRleDogaWR4IH0pOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBkcm9wT25TdGFuZChzdGFuZC5pZCwgaWR4KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogLTYsIHRvcDogMCwgd2lkdGg6ICc1MCUnLCBoZWlnaHQ6ICcxMDAlJywgekluZGV4OiAyMCwgbWluV2lkdGg6IDIwIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldEluc2VydEluZGljYXRvcih7IHN0YW5kSWQ6IHN0YW5kLmlkLCBpbmRleDogaWR4ICsgMSB9KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIGlkeCArIDEpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCByaWdodDogLTYsIHRvcDogMCwgd2lkdGg6ICc1MCUnLCBoZWlnaHQ6ICcxMDAlJywgekluZGV4OiAyMCwgbWluV2lkdGg6IDIwIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogSW5zZXJ0IGluZGljYXRvciBiZWZvcmUgdGhpcyB0ZXN0IFx1MjAxNCBzdXBwcmVzc2VkIGZvciBSdW5uaW5nIGRyYWdzICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93SGVyZSAmJiAhZHJhZ2dlZElzUnVubmluZyAmJiBpbmQhLmluZGV4ID09PSBpZHggJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogLTQsIHRvcDogMCwgYm90dG9tOiAwIH19PjxJbnNlcnRMaW5lIHRoZW1lPXt0aGVtZX0gLz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogVGVzdCBiYXIgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiAwLCB3aWR0aCwgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGVzdEJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0PXt0ZXN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Rlc3RSdW5uaW5nPXtpc1Rlc3RSdW5uaW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2VkVGVzdElkPXtkcmFnZ2VkVGVzdElkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17d2lkdGh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJBUl9IRUlHSFQ9e0JBUl9IRUlHSFR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlTdGF0dXM9e2Rpc3BsYXlTdGF0dXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVkTWFpbj17cmVzb2x2ZWRNYWlufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZEluZm89e3Jlc29sdmVkSW5mb31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0luZm9PbkJhcj17c2hvd0luZm9PbkJhcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17KGUpID0+IHsgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJzsgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyh0ZXN0LmlkKSk7IHNldERyYWdnZWRUZXN0SWQodGVzdC5pZCk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17Y2xlYXJEcmFnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1lbnVPcGVuPXsocmVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhZ2dlZFRlc3RJZCB8fCBpc0xvY2tlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQcmlvcml0eUlucHV0VmFsdWUoU3RyaW5nKHRlc3QucHJpb3JpdHkgPz8gNTApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RhcnREYXRlSW5wdXRWYWx1ZShmb3JtYXREYXRlSW5wdXRWYWx1ZSh0ZXN0LnRlc3Rfc3RhcnRlZF9kYXRlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEVuZERhdGVJbnB1dFZhbHVlKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGVuZGluZ1N0YXR1c0NoYW5nZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UG9wb3Zlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yUmVjdDogcmVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6ICdyb290JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5U3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBMaW5lczogcmVzb2x2ZVRlbXBsYXRlKHRpcFRlbXBsYXRlLCB0ZXN0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWQ6IHsgc3RhcnQ6IHRlc3Quc3RhcnQsIGVuZDogdGVzdC5lbmQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogQ2hhbmdlb3ZlciBpbmRpY2F0b3IgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge2lkeCA8IHNjaGVkdWxlLmxlbmd0aCAmJiBjaGFuZ2VvdmVyV2lkdGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IHdpZHRoLCB0b3A6IExBTkVfSEVJR0hUIC8gMiAtIDgsIHdpZHRoOiBjaGFuZ2VvdmVyV2lkdGgsIGhlaWdodDogMTYsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IDEsIHdpZHRoOiAnODAlJywgYmFja2dyb3VuZDogYHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoOTBkZWcsICR7dGhlbWUudGV4dERpc2FibGVkfSAwLCAke3RoZW1lLnRleHREaXNhYmxlZH0gNHB4LCB0cmFuc3BhcmVudCA0cHgsIHRyYW5zcGFyZW50IDhweClgIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBJbnNlcnQgaW5kaWNhdG9yIGF0IGVuZCBcdTIwMTQgc3VwcHJlc3NlZCB3aGVuIGRyYWdnaW5nIGEgUnVubmluZyB0ZXN0ICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzaG93SGVyZSAmJiAhZHJhZ2dlZElzUnVubmluZyAmJiBpbmQhLmluZGV4ID09PSBzdGFuZC50ZXN0cy5sZW5ndGggJiYgc2NoZWR1bGUubGVuZ3RoID4gMCAmJiAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdCA9IHNjaGVkdWxlW3NjaGVkdWxlLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBsZWZ0LCB3aWR0aCB9ID0gZ2V0QmFyUG9zKGxhc3Quc3RhcnQsIGxhc3QuZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY0VuZCA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQobGFzdC5lbmQsIHN0YW5kLmNoYW5nZW92ZXJfaG91cnMsIHdTdGFydCwgd0VuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGFuZ2VvdmVyV2lkdGggPSBob3Vyc0JldHdlZW4obGFzdC5lbmQsIGNFbmQpICogcHhQZXJIb3VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGxlZnQgKyB3aWR0aCArIGNoYW5nZW92ZXJXaWR0aCArIDgsIHRvcDogMCwgYm90dG9tOiAwIH19PjxJbnNlcnRMaW5lIHRoZW1lPXt0aGVtZX0gLz48L2Rpdj47XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIEVtcHR5IHN0YXRlICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzdGFuZC50ZXN0cy5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgcG9zaXRpb246ICdhYnNvbHV0ZScsIGluc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGRyYWdnZWRUZXN0SWQgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS50ZXh0RGlzYWJsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGRyYWdnZWRUZXN0SWQgPyA2MDAgOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2RyYWdnZWRUZXN0SWQgPyAnRHJvcCBoZXJlIHRvIHNjaGVkdWxlJyA6ICdEcm9wIHRlc3RzIGhlcmUgdG8gc2NoZWR1bGUnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KX1cclxuXHJcbiAgICAgICAgICAgIHsvKiBObyBzdGFuZHMgbWVzc2FnZSAqL31cclxuICAgICAgICAgICAge3N0YW5kcy5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBwYWRkaW5nOiAnNDhweCAyNHB4JyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRTaXplOiAxMixcclxuICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgIE5vIHRlc3Qgc3RhbmRzIGxvYWRlZC4gQmluZCB0aGUgdGVzdFN0YW5kcyBwcm9wZXJ0eSB0byB5b3VyIGdldFRlc3RTdGFuZHMgcXVlcnkuXHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7cG9wb3ZlciAmJiAoXHJcbiAgICAgICAgPEFjdGlvblBvcG92ZXJcbiAgICAgICAgICBwb3BvdmVyPXtwb3BvdmVyfVxuICAgICAgICAgIGFzc2lnbmVkUGFydHNUZW1wbGF0ZT17YXNzaWduZWRQYXJ0c1RlbXBsYXRlfVxuICAgICAgICAgIGFzc2lnbmVkUGFydHNMaW5rQmFzZVVybD17YXNzaWduZWRQYXJ0c0xpbmtCYXNlVXJsfVxuICAgICAgICAgIHN0YXR1c09wdGlvbnNMaXN0PXtzdGF0dXNPcHRpb25zTGlzdH1cbiAgICAgICAgICBwcmlvcml0eUlucHV0VmFsdWU9e3ByaW9yaXR5SW5wdXRWYWx1ZX1cbiAgICAgICAgICBzdGFydERhdGVJbnB1dFZhbHVlPXtzdGFydERhdGVJbnB1dFZhbHVlfVxuICAgICAgICAgIGVuZERhdGVJbnB1dFZhbHVlPXtlbmREYXRlSW5wdXRWYWx1ZX1cbiAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgb25DbG9zZT17Y2xvc2VQb3BvdmVyfVxuICAgICAgICAgIG9uTW9kZUNoYW5nZT17aGFuZGxlUG9wb3Zlck1vZGVDaGFuZ2V9XHJcbiAgICAgICAgICBvblByaW9yaXR5SW5wdXRDaGFuZ2U9e3NldFByaW9yaXR5SW5wdXRWYWx1ZX1cclxuICAgICAgICAgIG9uQ29uZmlybVByaW9yaXR5PXtoYW5kbGVDb25maXJtUHJpb3JpdHl9XHJcbiAgICAgICAgICBvblBpY2tTdGF0dXM9e2hhbmRsZVBpY2tTdGF0dXN9XHJcbiAgICAgICAgICBvbkVkaXRUZXN0PXtoYW5kbGVFZGl0VGVzdH1cclxuICAgICAgICAgIG9uU3RhcnREYXRlSW5wdXRDaGFuZ2U9e3NldFN0YXJ0RGF0ZUlucHV0VmFsdWV9XHJcbiAgICAgICAgICBvbkNvbmZpcm1TdGFydERhdGU9e2hhbmRsZUNvbmZpcm1TdGFydERhdGV9XHJcbiAgICAgICAgICBvbkVuZERhdGVJbnB1dENoYW5nZT17c2V0RW5kRGF0ZUlucHV0VmFsdWV9XHJcbiAgICAgICAgICBvbkNvbmZpcm1FbmREYXRlPXtoYW5kbGVDb25maXJtRW5kRGF0ZX1cclxuICAgICAgICAgIHBhbmVsUmVmPXtwb3BvdmVyUmVmfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG4iLCAiXG4gICAgICAgICAgZXhwb3J0IGNvbnN0IHsgUmV0b29sIH0gPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmV0b29sQ3VzdG9tQ29tcG9uZW5Db2xsZWN0aW9ucztcbiAgICAgICAgIiwgIlxuICAgICAgICAgIGV4cG9ydCBjb25zdCB7IEZyYWdtZW50LCBqc3hzLCBqc3gsIGRlZmF1bHQgfSA9IHdpbmRvdy5jY2Nfc3VwcG9ydF9SZWFjdEpTWFJ1bnRpbWU7XG4gICAgICAgICJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFDVSxXQUFPLFVBQVUsT0FBTztBQUFBO0FBQUE7OztBQ0RsQyxtQkFBbUU7OztBQ0NsRCxJQUFNLEVBQUUsT0FB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
