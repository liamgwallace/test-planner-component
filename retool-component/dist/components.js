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
  const popoverWidth = 248;
  const { anchorRect, test, mode, displayStatus, tooltipLines, scheduled } = popover;
  const capColor = getCapColor(displayStatus, theme);
  const startDateLabel = formatMenuDateLabel(test.test_started_date);
  const endDateLabel = formatMenuDateLabel(test.test_ended_date);
  let left = anchorRect.right - popoverWidth;
  left = Math.max(8, Math.min(left, window.innerWidth - popoverWidth - 8));
  const topBelow = anchorRect.bottom + 6;
  const bottomAbove = window.innerHeight - anchorRect.top + 6;
  import_react.default.useLayoutEffect(() => {
    if (panelRef.current) {
      const panelHeight = panelRef.current.scrollHeight;
      const spaceBelow = window.innerHeight - anchorRect.bottom - 6 - 8;
      const spaceAbove = anchorRect.top - 6 - 8;
      setFlippedV(panelHeight > spaceBelow && spaceAbove > spaceBelow);
    }
  }, [mode, anchorRect]);
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
        overflow: "hidden",
        fontFamily: theme.fontFamily
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
        mode === "root" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { style: { padding: "12px 38px 10px 14px", borderBottom: `1px solid ${theme.border}` }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: 14, fontWeight: 700, color: theme.textPrimary, lineHeight: 1.3, marginBottom: 6, wordBreak: "break-word" }, children: test.name }),
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: lines.length > 0 || scheduled ? 8 : 0 }, children: [
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
              /* @__PURE__ */ jsx("div", { style: { height: 1, background: theme.border, margin: "0 -2px 6px" } }),
              lines.map((line, i) => {
                const colonIdx = line.indexOf(":");
                if (colonIdx === -1)
                  return /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: theme.textSecondary, marginBottom: 2, lineHeight: 1.4 }, children: line }, i);
                const label = line.slice(0, colonIdx).trim();
                const value = line.slice(colonIdx + 1).trim();
                return /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, fontSize: 12, marginBottom: 2, lineHeight: 1.4 }, children: [
                  /* @__PURE__ */ jsxs("span", { style: { color: theme.textMuted, fontWeight: 500, flexShrink: 0 }, children: [
                    label,
                    ":"
                  ] }),
                  /* @__PURE__ */ jsx("span", { style: { color: theme.textPrimary }, children: value })
                ] }, i);
              })
            ] }),
            scheduled && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { style: { height: 1, background: theme.border, margin: `${lines.length > 0 ? 6 : 0}px -2px 6px` } }),
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, fontSize: 12, marginBottom: 2 }, children: [
                /* @__PURE__ */ jsx("span", { style: { color: theme.textMuted, fontWeight: 500 }, children: "Starts:" }),
                /* @__PURE__ */ jsx("span", { style: { color: theme.textPrimary }, children: scheduled.start.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, fontSize: 12 }, children: [
                /* @__PURE__ */ jsx("span", { style: { color: theme.textMuted, fontWeight: 500 }, children: "Ends:" }),
                /* @__PURE__ */ jsx("span", { style: { color: theme.textPrimary }, children: scheduled.end.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { padding: "4px 0" }, children: [
            /* @__PURE__ */ jsx(MenuItem, { label: "Change Priority", icon: "\u2B06", theme, onClick: () => onModeChange("priority") }),
            /* @__PURE__ */ jsx(MenuItem, { label: "Change Status", icon: "\u25C9", theme, onClick: () => onModeChange("status") }),
            displayStatus === "Running" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(MenuItem, { label: "Change Start Date", detail: startDateLabel || void 0, icon: "\u{1F4C5}", theme, onClick: () => onModeChange("start_date") }),
              /* @__PURE__ */ jsx(MenuItem, { label: "Change End Date", detail: endDateLabel || void 0, icon: "\u{1F4C5}", theme, onClick: () => onModeChange("end_date") })
            ] }),
            /* @__PURE__ */ jsx(MenuItem, { label: "Edit Test", icon: "\u270E", theme, onClick: onEditTest })
          ] })
        ] }) : mode === "priority" ? /* @__PURE__ */ jsxs(Fragment, { children: [
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
    initialValue: "Notes: {notes}\nOwner: {owner}\nPriority: {priority}\nPart Status: {part_status}\nParts Due: {part_ready_date}\nAssigned Parts: {assigned_parts}\nTest Started: {test_started_date}",
    inspector: "text",
    label: "Tooltip Template",
    description: "Template for hover tooltip. Use \\n for newlines."
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
                  fontFamily: theme.fontMono,
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
                    return /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: h * pxPerHour, top: 0, bottom: 0, width: 2, background: "#EF4444", zIndex: 40 }, children: /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: -3, left: -3, width: 8, height: 8, borderRadius: "50%", background: "#EF4444" } }) });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhY3QtZ2xvYmFsOnJlYWN0IiwgIi4uL3NyYy9pbmRleC50c3giLCAidHJ5cmV0b29sLWN1c3RvbS1jb21wb25lbnQtY29sbGVjdGlvbnMtZ2xvYmFsOkB0cnlyZXRvb2wvY3VzdG9tLWNvbXBvbmVudC1zdXBwb3J0IiwgInJlYWN0LWpzeC1ydW50aW1lLWdsb2JhbDpyZWFjdC9qc3gtcnVudGltZSJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmVhY3Q7XG4gICAgICAgICIsICJpbXBvcnQgUmVhY3QsIHsgRkMsIHVzZVJlZiwgdXNlTWVtbywgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSZXRvb2wgfSBmcm9tIFwiQHRyeXJldG9vbC9jdXN0b20tY29tcG9uZW50LXN1cHBvcnRcIjtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUeXBlc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFRlc3REYXRhIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkdXJhdGlvbjogbnVtYmVyO1xyXG4gIG93bmVyOiBzdHJpbmc7XHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuICBub3Rlczogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpb3JpdHlfb3JkZXI6IG51bWJlciB8IG51bGw7XHJcbiAgYWxsb2NhdGlvbl9pZDogbnVtYmVyIHwgbnVsbDtcclxuICBhc3NpZ25lZF9wYXJ0czogc3RyaW5nIHwgbnVsbDtcclxuICBwYXJ0X3JlYWR5X2RhdGU6IHN0cmluZyB8IG51bGw7XHJcbiAgcGFydF9zdGF0dXM6IHN0cmluZztcclxuICB0ZXN0X3N0YXJ0ZWRfZGF0ZTogc3RyaW5nIHwgbnVsbDtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7IC8vIGFsbG93IGFyYml0cmFyeSBmaWVsZHMgZm9yIHRlbXBsYXRlIHJlc29sdXRpb25cclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YW5kRGVmIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBjaGFuZ2VvdmVyX2hvdXJzPzogbnVtYmVyIHwgbnVsbDtcclxufVxyXG5cclxuaW50ZXJmYWNlIE5vbldvcmtpbmdCbG9jayB7XHJcbiAgc3RhcnQ6IERhdGU7XHJcbiAgZW5kOiBEYXRlO1xyXG4gIG5vdGVzPzogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSW50ZXJuYWxTdGFuZCB7XHJcbiAgaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgdGVzdHM6IFRlc3REYXRhW107XHJcbiAgY2hhbmdlb3Zlcl9ob3VyczogbnVtYmVyO1xyXG4gIG5vbldvcmtpbmdCbG9ja3M6IE5vbldvcmtpbmdCbG9ja1tdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgU2NoZWR1bGVkVGVzdCBleHRlbmRzIFRlc3REYXRhIHtcclxuICBzdGFydDogRGF0ZTtcclxuICBlbmQ6IERhdGU7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnNlcnRJbmRpY2F0b3Ige1xyXG4gIHN0YW5kSWQ6IG51bWJlciB8IHN0cmluZztcclxuICBpbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQWxsb2NhdGlvblJlY29yZCB7XHJcbiAgdGVzdF9pZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBwcmlvcml0eV9vcmRlcjogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQW5jaG9yUmVjdCB7XHJcbiAgdG9wOiBudW1iZXI7XHJcbiAgYm90dG9tOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG4gIHJpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBQb3BvdmVyU3RhdGUge1xuICBhbmNob3JSZWN0OiBBbmNob3JSZWN0O1xuICB0ZXN0OiBUZXN0RGF0YTtcbiAgbW9kZTogJ3Jvb3QnIHwgJ3ByaW9yaXR5JyB8ICdzdGF0dXMnIHwgJ3N0YXJ0X2RhdGUnIHwgJ2VuZF9kYXRlJztcbiAgZGlzcGxheVN0YXR1czogc3RyaW5nO1xuICB0b29sdGlwTGluZXM6IHN0cmluZztcbiAgc2NoZWR1bGVkOiB7IHN0YXJ0OiBEYXRlOyBlbmQ6IERhdGUgfSB8IG51bGw7XG59XG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFRoZW1lXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5pbnRlcmZhY2UgVGhlbWVUb2tlbnMge1xyXG4gIGlzRGFyazogYm9vbGVhbjtcclxuXHJcbiAgLy8gQmFja2dyb3VuZHNcclxuICBjYW52YXM6IHN0cmluZztcclxuICBzdXJmYWNlOiBzdHJpbmc7XHJcbiAgc3VyZmFjZVNlY29uZGFyeTogc3RyaW5nO1xyXG4gIGJnU3VidGxlOiBzdHJpbmc7XHJcbiAgc3VyZmFjZUhvdmVyOiBzdHJpbmc7XHJcbiAgYWNjZW50U3VidGxlOiBzdHJpbmc7XHJcblxyXG4gIC8vIFJ1bm5pbmcgKHB1cnBsZSkgdGludHNcclxuICBydW5uaW5nQmc6IHN0cmluZztcclxuICBydW5uaW5nQm9yZGVyOiBzdHJpbmc7XHJcbiAgcnVubmluZ1RleHQ6IHN0cmluZztcclxuICBydW5uaW5nVGV4dERhcms6IHN0cmluZztcclxuXHJcbiAgLy8gVGV4dFxyXG4gIHRleHRQcmltYXJ5OiBzdHJpbmc7XHJcbiAgdGV4dFNlY29uZGFyeTogc3RyaW5nO1xyXG4gIHRleHRUZXJ0aWFyeTogc3RyaW5nO1xyXG4gIHRleHRNdXRlZDogc3RyaW5nO1xyXG4gIHRleHREaXNhYmxlZDogc3RyaW5nO1xyXG5cclxuICAvLyBCb3JkZXJzXHJcbiAgYm9yZGVyOiBzdHJpbmc7XHJcbiAgYm9yZGVyU3Ryb25nOiBzdHJpbmc7XHJcblxyXG4gIC8vIEFjY2VudCAocHJpbWFyeSBhY3Rpb24pXHJcbiAgYWNjZW50OiBzdHJpbmc7XHJcbiAgYWNjZW50Rmc6IHN0cmluZztcclxuICBhY2NlbnRNdXRlZDogc3RyaW5nO1xyXG5cclxuICAvLyBUeXBvZ3JhcGh5XHJcbiAgZm9udEZhbWlseTogc3RyaW5nO1xyXG4gIGZvbnRNb25vOiBzdHJpbmc7XHJcblxyXG4gIC8vIFJhZGlpIChudW1lcmljIHB4KVxyXG4gIHJhZGl1c1NtOiBudW1iZXI7XHJcbiAgcmFkaXVzOiBudW1iZXI7XHJcbiAgcmFkaXVzTGc6IG51bWJlcjtcclxuICByYWRpdXNYbDogbnVtYmVyO1xyXG5cclxuICAvLyBTdGF0dXMgY29sb3VycyAoY2FwIGJhcnMgJiB0ZXh0KVxyXG4gIHN0YXR1c0NhcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuICBzdGF0dXNUZXh0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG59XHJcblxyXG5jb25zdCBidWlsZFRoZW1lID0gKFxyXG4gIHJhdzogYW55LFxyXG4gIHN0YXR1c092ZXJyaWRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9LFxyXG4gIG1vbm9Gb250T3ZlcnJpZGU/OiBzdHJpbmdcclxuKTogVGhlbWVUb2tlbnMgPT4ge1xyXG4gIGNvbnN0IGlzRGFyayA9IHJhdz8ubW9kZSA9PT0gJ2RhcmsnO1xyXG5cclxuICBjb25zdCBhY2NlbnQgPSByYXc/LnByaW1hcnkgfHwgJyMzQjgyRjYnO1xyXG4gIGNvbnN0IGNhbnZhcyA9IHJhdz8uY2FudmFzIHx8IChpc0RhcmsgPyAnIzFDMUMyRScgOiAnI0Y5RkFGQicpO1xyXG4gIGNvbnN0IHN1cmZhY2UgPSByYXc/LnN1cmZhY2VQcmltYXJ5IHx8IChpc0RhcmsgPyAnIzI1MjUzNScgOiAnI0ZGRkZGRicpO1xyXG4gIGNvbnN0IHN1cmZhY2VTZWNvbmRhcnkgPSByYXc/LnN1cmZhY2VTZWNvbmRhcnkgfHwgKGlzRGFyayA/ICcjMUUxRTMwJyA6ICcjRjNGNEY2Jyk7XHJcbiAgY29uc3QgZm9udEZhbWlseSA9IHJhdz8uZGVmYXVsdEZvbnQ/Lm5hbWVcclxuICAgID8gYCcke3Jhdy5kZWZhdWx0Rm9udC5uYW1lfScsIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBzYW5zLXNlcmlmYFxyXG4gICAgOiBcIidETSBTYW5zJywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCI7XHJcblxyXG4gIGNvbnN0IGJhc2VSYWRpdXMgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgciA9IHJhdz8uYm9yZGVyUmFkaXVzO1xyXG4gICAgaWYgKCFyKSByZXR1cm4gNjtcclxuICAgIGNvbnN0IG4gPSBwYXJzZUludChTdHJpbmcociksIDEwKTtcclxuICAgIHJldHVybiBpc05hTihuKSA/IDYgOiBuO1xyXG4gIH0pKCk7XHJcblxyXG4gIC8vIFRleHRcclxuICBjb25zdCB0ZXh0UHJpbWFyeSAgPSBpc0RhcmsgPyAnI0Y5RkFGQicgOiAnIzExMTgyNyc7XHJcbiAgY29uc3QgdGV4dFNlY29uZGFyeSA9IGlzRGFyayA/ICcjRDFENURCJyA6ICcjMzc0MTUxJztcclxuICBjb25zdCB0ZXh0VGVydGlhcnkgPSBpc0RhcmsgPyAnI0EwQUVDMCcgOiAnIzRCNTU2Myc7XHJcbiAgY29uc3QgdGV4dE11dGVkICAgID0gaXNEYXJrID8gJyM3MTgwOTYnIDogJyM2QjcyODAnO1xyXG4gIGNvbnN0IHRleHREaXNhYmxlZCA9IGlzRGFyayA/ICcjNEI1NTYzJyA6ICcjOUNBM0FGJztcclxuXHJcbiAgLy8gQm9yZGVyc1xyXG4gIGNvbnN0IGJvcmRlciAgICAgICA9IGlzRGFyayA/ICcjMzc0MTUxJyA6ICcjRTVFN0VCJztcclxuICBjb25zdCBib3JkZXJTdHJvbmcgPSBpc0RhcmsgPyAnIzRCNTU2MycgOiAnI0QxRDVEQic7XHJcblxyXG4gIC8vIEJhY2tncm91bmRzXHJcbiAgY29uc3QgYmdTdWJ0bGUgICAgID0gaXNEYXJrID8gJyMxQTFBMkUnIDogJyNGM0Y0RjYnO1xyXG4gIGNvbnN0IHN1cmZhY2VIb3ZlciA9IGlzRGFyayA/ICcjMkUyRTNFJyA6ICcjRjNGNEY2JztcclxuICBjb25zdCBhY2NlbnRTdWJ0bGUgPSBpc0RhcmsgPyBgJHthY2NlbnR9MzNgIDogJyNFRkY2RkYnO1xyXG4gIGNvbnN0IGFjY2VudE11dGVkICA9IGlzRGFyayA/IGAke2FjY2VudH04MGAgOiAnIzkzQzVGRCc7XHJcblxyXG4gIC8vIFJ1bm5pbmcgcHVycGxlXHJcbiAgY29uc3QgcnVubmluZ0JnICAgICAgID0gaXNEYXJrID8gJyMyRDFCNEUnIDogJyNGM0U4RkYnO1xyXG4gIGNvbnN0IHJ1bm5pbmdCb3JkZXIgICA9IGlzRGFyayA/ICcjN0UzREFBJyA6ICcjQzRCNUZEJztcclxuICBjb25zdCBydW5uaW5nVGV4dCAgICAgPSAnIzdFMjJDRSc7XHJcbiAgY29uc3QgcnVubmluZ1RleHREYXJrID0gJyMzQjA3NjQnO1xyXG5cclxuICAvLyBTdGF0dXMgY2FwIGNvbG91cnNcclxuICBjb25zdCBkZWZhdWx0Q2FwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgJ1J1bm5pbmcnOiAgICAgICAgICAgICcjOTMzM0VBJyxcclxuICAgICdSZWFkeSc6ICAgICAgICAgICAgICAnIzIyQzU1RScsXHJcbiAgICAnT24gVGltZSc6ICAgICAgICAgICAgJyNFNUEwMEQnLFxyXG4gICAgJ0RlbGF5ZWQnOiAgICAgICAgICAgICcjRUY0NDQ0JyxcclxuICAgICdQYXJ0cyBOb3QgQXNzaWduZWQnOiAnIzlDQTNBRicsXHJcbiAgICAnSW4gUHJvZ3Jlc3MnOiAgICAgICAgJyNFNUEwMEQnLFxyXG4gIH07XHJcbiAgY29uc3QgZGVmYXVsdFRleHQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAnUnVubmluZyc6ICAgICAgICAgICAgJyM3RTIyQ0UnLFxyXG4gICAgJ1JlYWR5JzogICAgICAgICAgICAgICcjMTZBMzRBJyxcclxuICAgICdPbiBUaW1lJzogICAgICAgICAgICAnI0I0NTMwOScsXHJcbiAgICAnRGVsYXllZCc6ICAgICAgICAgICAgJyNEQzI2MjYnLFxyXG4gICAgJ1BhcnRzIE5vdCBBc3NpZ25lZCc6ICcjNkI3MjgwJyxcclxuICAgICdJbiBQcm9ncmVzcyc6ICAgICAgICAnI0I0NTMwOScsXHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzQ2FwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcbiAgY29uc3Qgc3RhdHVzVGV4dDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGRlZmF1bHRDYXApKSB7XHJcbiAgICBzdGF0dXNDYXBba2V5XSAgPSBzdGF0dXNPdmVycmlkZXNba2V5XSB8fCBkZWZhdWx0Q2FwW2tleV07XHJcbiAgICAvLyBkZXJpdmUgdGV4dCBjb2xvdXI6IGlmIG92ZXJyaWRkZW4sIGRhcmtlbiB0aGUgY2FwIGNvbG91ciBzbGlnaHRseTsgb3RoZXJ3aXNlIHVzZSBkZWZhdWx0XHJcbiAgICBzdGF0dXNUZXh0W2tleV0gPSBzdGF0dXNPdmVycmlkZXNba2V5XVxyXG4gICAgICA/IHN0YXR1c092ZXJyaWRlc1trZXldXHJcbiAgICAgIDogZGVmYXVsdFRleHRba2V5XTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpc0RhcmssXHJcbiAgICBjYW52YXMsIHN1cmZhY2UsIHN1cmZhY2VTZWNvbmRhcnksIGJnU3VidGxlLCBzdXJmYWNlSG92ZXIsIGFjY2VudFN1YnRsZSxcclxuICAgIHJ1bm5pbmdCZywgcnVubmluZ0JvcmRlciwgcnVubmluZ1RleHQsIHJ1bm5pbmdUZXh0RGFyayxcclxuICAgIHRleHRQcmltYXJ5LCB0ZXh0U2Vjb25kYXJ5LCB0ZXh0VGVydGlhcnksIHRleHRNdXRlZCwgdGV4dERpc2FibGVkLFxyXG4gICAgYm9yZGVyLCBib3JkZXJTdHJvbmcsXHJcbiAgICBhY2NlbnQsIGFjY2VudEZnOiAnI0ZGRkZGRicsIGFjY2VudE11dGVkLFxyXG4gICAgZm9udEZhbWlseSxcclxuICAgIGZvbnRNb25vOiBtb25vRm9udE92ZXJyaWRlID8gYCcke21vbm9Gb250T3ZlcnJpZGV9JywgbW9ub3NwYWNlYCA6IGZvbnRGYW1pbHksXHJcbiAgICByYWRpdXNTbTogTWF0aC5tYXgoMiwgYmFzZVJhZGl1cyAtIDIpLFxyXG4gICAgcmFkaXVzOiAgIGJhc2VSYWRpdXMsXHJcbiAgICByYWRpdXNMZzogYmFzZVJhZGl1cyArIDIsXHJcbiAgICByYWRpdXNYbDogYmFzZVJhZGl1cyArIDQsXHJcbiAgICBzdGF0dXNDYXAsXHJcbiAgICBzdGF0dXNUZXh0LFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gVGVtcGxhdGUgUmVzb2x1dGlvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgZm9ybWF0RmllbGRWYWx1ZSA9ICh2YWw6IGFueSk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09ICcnIHx8IHZhbCA9PT0gJ25hbicpIHJldHVybiAnJztcclxuICBjb25zdCBzdHIgPSBTdHJpbmcodmFsKTtcclxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfS8udGVzdChzdHIpKSB7XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoc3RyKTtcclxuICAgIGlmICghaXNOYU4oZC5nZXRUaW1lKCkpKSB7XHJcbiAgICAgIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JyB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHN0cjtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVUZW1wbGF0ZSA9ICh0ZW1wbGF0ZTogYW55LCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogc3RyaW5nID0+IHtcclxuICBpZiAoIXRlbXBsYXRlKSByZXR1cm4gJyc7XHJcbiAgY29uc3Qgc3RyID0gdHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyA/IHRlbXBsYXRlIDogU3RyaW5nKHRlbXBsYXRlKTtcclxuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAoXywgZmllbGQpID0+IGZvcm1hdEZpZWxkVmFsdWUoZGF0YVtmaWVsZF0pKTtcclxufTtcclxuXHJcbmNvbnN0IGlzVGVtcGxhdGVFbXB0eSA9ICh0ZW1wbGF0ZTogYW55LCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgc3RyID0gdHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyA/IHRlbXBsYXRlIDogU3RyaW5nKHRlbXBsYXRlIHx8ICcnKTtcclxuICBjb25zdCByZXNvbHZlZCA9IHJlc29sdmVUZW1wbGF0ZShzdHIsIGRhdGEpO1xyXG4gIGNvbnN0IHN0YXRpY09ubHkgPSBzdHIucmVwbGFjZSgvXFx7KFxcdyspXFx9L2csICcnKTtcclxuICByZXR1cm4gcmVzb2x2ZWQudHJpbSgpID09PSBzdGF0aWNPbmx5LnRyaW0oKSB8fCByZXNvbHZlZC50cmltKCkgPT09ICcnO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIERhdGUgVXRpbGl0aWVzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBNU19QRVJfSE9VUiA9IDM2MDAwMDA7XHJcblxyXG5jb25zdCBwYXJzZUxvY2FsRGF0ZSA9IChkYXRlU3RyOiBzdHJpbmcgfCBudWxsKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghZGF0ZVN0cikgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgZGF0ZVBhcnQgPSBkYXRlU3RyLnNwbGl0KCdUJylbMF07IC8vIHN0cmlwIHRpbWUgY29tcG9uZW50IGlmIHByZXNlbnQgKGUuZy4gSVNPIHRpbWVzdGFtcHMpXHJcbiAgY29uc3QgcGFydHMgPSBkYXRlUGFydC5zcGxpdCgnLScpLm1hcChOdW1iZXIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMgfHwgcGFydHMuc29tZShpc05hTikpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGQgPSBuZXcgRGF0ZShwYXJ0c1swXSwgcGFydHNbMV0gLSAxLCBwYXJ0c1syXSwgMCwgMCwgMCwgMCk7XHJcbiAgcmV0dXJuIGlzTmFOKGQuZ2V0VGltZSgpKSA/IG51bGwgOiBkO1xyXG59O1xyXG5cclxuY29uc3QgdG9NaWRuaWdodCA9IChkYXRlOiBEYXRlKTogRGF0ZSA9PiB7XG4gIGNvbnN0IGQgPSBuZXcgRGF0ZShkYXRlKTtcbiAgZC5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIGQ7XG59O1xuXG5jb25zdCBmb3JtYXREYXRlSW5wdXRWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiAnJztcbiAgY29uc3QgZGF0ZVBhcnQgPSBTdHJpbmcodmFsdWUpLnNwbGl0KCdUJylbMF07XG4gIHJldHVybiAvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChkYXRlUGFydCkgPyBkYXRlUGFydCA6ICcnO1xufTtcblxuY29uc3QgZ2V0VG9kYXlEYXRlSW5wdXRWYWx1ZSA9ICgpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gIHJldHVybiBgJHt0b2RheS5nZXRGdWxsWWVhcigpfS0ke1N0cmluZyh0b2RheS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKX0tJHtTdHJpbmcodG9kYXkuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpfWA7XG59O1xuXG5jb25zdCBmb3JtYXRNZW51RGF0ZUxhYmVsID0gKHZhbHVlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VMb2NhbERhdGUodmFsdWUgPz8gbnVsbCk7XG4gIGlmICghcGFyc2VkKSByZXR1cm4gJyc7XG4gIHJldHVybiBwYXJzZWQudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1HQicsIHtcbiAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICBtb250aDogJzItZGlnaXQnLFxuICAgIHllYXI6ICcyLWRpZ2l0JyxcbiAgfSk7XG59O1xuXHJcbmNvbnN0IGlzV29ya0RheSA9IChkOiBEYXRlKTogYm9vbGVhbiA9PiBkLmdldERheSgpICE9PSAwICYmIGQuZ2V0RGF5KCkgIT09IDY7XHJcblxyXG5jb25zdCBnZXROZXh0V29ya2RheVN0YXJ0ID0gKGRhdGU6IERhdGUsIHdvcmtTdGFydDogbnVtYmVyKTogRGF0ZSA9PiB7XHJcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gIGQuc2V0SG91cnMod29ya1N0YXJ0LCAwLCAwLCAwKTtcclxuICB3aGlsZSAoZC5nZXREYXkoKSA9PT0gMCB8fCBkLmdldERheSgpID09PSA2KSB7XHJcbiAgICBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKTtcclxuICB9XHJcbiAgcmV0dXJuIGQ7XHJcbn07XHJcblxyXG5jb25zdCBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kID0gKFxyXG4gIHByZXZUZXN0RW5kOiBEYXRlLFxyXG4gIGNoYW5nZW92ZXJIb3VyczogbnVtYmVyLFxyXG4gIHdvcmtTdGFydDogbnVtYmVyLFxyXG4gIHdvcmtFbmQ6IG51bWJlclxyXG4pOiBEYXRlID0+IHtcclxuICBsZXQgY2hhbmdlb3ZlclN0YXJ0ID0gbmV3IERhdGUocHJldlRlc3RFbmQpO1xyXG5cclxuICBpZiAoIWlzV29ya0RheShjaGFuZ2VvdmVyU3RhcnQpIHx8IGNoYW5nZW92ZXJTdGFydC5nZXRIb3VycygpID49IHdvcmtFbmQpIHtcclxuICAgIGNoYW5nZW92ZXJTdGFydCA9IGdldE5leHRXb3JrZGF5U3RhcnQobmV3IERhdGUoY2hhbmdlb3ZlclN0YXJ0LmdldFRpbWUoKSArIE1TX1BFUl9IT1VSICogMTIpLCB3b3JrU3RhcnQpO1xyXG4gIH0gZWxzZSBpZiAoY2hhbmdlb3ZlclN0YXJ0LmdldEhvdXJzKCkgPCB3b3JrU3RhcnQpIHtcclxuICAgIGNoYW5nZW92ZXJTdGFydC5zZXRIb3Vycyh3b3JrU3RhcnQsIDAsIDAsIDApO1xyXG4gIH1cclxuXHJcbiAgbGV0IHJlbWFpbmluZyA9IGNoYW5nZW92ZXJIb3VycztcclxuICBsZXQgZW5kID0gbmV3IERhdGUoY2hhbmdlb3ZlclN0YXJ0KTtcclxuXHJcbiAgd2hpbGUgKHJlbWFpbmluZyA+IDApIHtcclxuICAgIGlmICghaXNXb3JrRGF5KGVuZCkpIHtcclxuICAgICAgZW5kID0gZ2V0TmV4dFdvcmtkYXlTdGFydChuZXcgRGF0ZShlbmQuZ2V0VGltZSgpICsgTVNfUEVSX0hPVVIgKiAxMiksIHdvcmtTdGFydCk7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYXZhaWxhYmxlID0gd29ya0VuZCAtIGVuZC5nZXRIb3VycygpO1xyXG4gICAgY29uc3QgYXBwbHkgPSBNYXRoLm1pbihyZW1haW5pbmcsIGF2YWlsYWJsZSk7XHJcbiAgICBlbmQuc2V0VGltZShlbmQuZ2V0VGltZSgpICsgYXBwbHkgKiBNU19QRVJfSE9VUik7XHJcbiAgICByZW1haW5pbmcgLT0gYXBwbHk7XHJcbiAgICBpZiAocmVtYWluaW5nID4gMCkge1xyXG4gICAgICBlbmQgPSBnZXROZXh0V29ya2RheVN0YXJ0KG5ldyBEYXRlKGVuZC5nZXRUaW1lKCkgKyBNU19QRVJfSE9VUiAqIDEyKSwgd29ya1N0YXJ0KTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGVuZDtcclxufTtcclxuXHJcbmNvbnN0IHBhcnNlTm9uV29ya2luZ0Jsb2NrcyA9IChyYXc6IGFueSk6IE5vbldvcmtpbmdCbG9ja1tdID0+IHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkocmF3KSkgcmV0dXJuIFtdO1xyXG4gIGNvbnN0IHJlc3VsdDogTm9uV29ya2luZ0Jsb2NrW10gPSBbXTtcclxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIHJhdykge1xyXG4gICAgaWYgKCFlbnRyeSB8fCB0eXBlb2YgZW50cnkgIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoZW50cnkuc3RhcnQpO1xyXG4gICAgY29uc3QgZW5kID0gbmV3IERhdGUoZW50cnkuZW5kKTtcclxuICAgIGlmIChpc05hTihzdGFydC5nZXRUaW1lKCkpIHx8IGlzTmFOKGVuZC5nZXRUaW1lKCkpIHx8IGVuZCA8PSBzdGFydCkgY29udGludWU7XHJcbiAgICByZXN1bHQucHVzaCh7IHN0YXJ0LCBlbmQsIG5vdGVzOiBlbnRyeS5ub3RlcyA/PyB1bmRlZmluZWQgfSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jb25zdCBhZHZhbmNlUGFzdE5vbldvcmtpbmcgPSAoZGF0ZTogRGF0ZSwgYmxvY2tzOiBOb25Xb3JraW5nQmxvY2tbXSk6IERhdGUgPT4ge1xyXG4gIGxldCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICBsZXQgY2hhbmdlZCA9IHRydWU7XHJcbiAgd2hpbGUgKGNoYW5nZWQpIHtcclxuICAgIGNoYW5nZWQgPSBmYWxzZTtcclxuICAgIGZvciAoY29uc3QgYiBvZiBibG9ja3MpIHtcclxuICAgICAgaWYgKHJlc3VsdCA+PSBiLnN0YXJ0ICYmIHJlc3VsdCA8IGIuZW5kKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gbmV3IERhdGUoYi5lbmQpO1xyXG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vLyBQdXNoIHN0YXJ0IGZvcndhcmQgdW50aWwgdGhlIGZ1bGwgd2luZG93IFtzdGFydCwgc3RhcnQrZHVyYXRpb24pIGRvZXNuJ3Qgb3ZlcmxhcCBhbnkgYmxvY2suXHJcbmNvbnN0IGZpbmRWYWxpZFN0YXJ0ID0gKHByb3Bvc2VkU3RhcnQ6IERhdGUsIGR1cmF0aW9uSG91cnM6IG51bWJlciwgYmxvY2tzOiBOb25Xb3JraW5nQmxvY2tbXSk6IERhdGUgPT4ge1xyXG4gIGxldCByZXN1bHQgPSBuZXcgRGF0ZShwcm9wb3NlZFN0YXJ0KTtcclxuICBsZXQgY2hhbmdlZCA9IHRydWU7XHJcbiAgd2hpbGUgKGNoYW5nZWQpIHtcclxuICAgIGNoYW5nZWQgPSBmYWxzZTtcclxuICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHJlc3VsdC5nZXRUaW1lKCkgKyBkdXJhdGlvbkhvdXJzICogTVNfUEVSX0hPVVIpO1xyXG4gICAgZm9yIChjb25zdCBiIG9mIGJsb2Nrcykge1xyXG4gICAgICBpZiAocmVzdWx0IDwgYi5lbmQgJiYgZW5kID4gYi5zdGFydCkge1xyXG4gICAgICAgIHJlc3VsdCA9IG5ldyBEYXRlKGIuZW5kKTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgZ2VuZXJhdGVEYXlzID0gKHN0YXJ0OiBEYXRlLCBudW1EYXlzOiBudW1iZXIpOiBEYXRlW10gPT4ge1xyXG4gIGNvbnN0IGRheXM6IERhdGVbXSA9IFtdO1xyXG4gIGxldCBjdXIgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1EYXlzOyBpKyspIHtcclxuICAgIGRheXMucHVzaChuZXcgRGF0ZShjdXIpKTtcclxuICAgIGN1ci5zZXREYXRlKGN1ci5nZXREYXRlKCkgKyAxKTtcclxuICB9XHJcbiAgcmV0dXJuIGRheXM7XHJcbn07XHJcblxyXG5jb25zdCBnZW5lcmF0ZVdlZWtzID0gKHN0YXJ0OiBEYXRlLCBudW1EYXlzOiBudW1iZXIpOiBEYXRlW10gPT4ge1xyXG4gIGNvbnN0IHJlc3VsdDogRGF0ZVtdID0gW107XHJcbiAgbGV0IGN1ciA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICB3aGlsZSAoY3VyLmdldERheSgpICE9PSAxKSBjdXIuc2V0RGF0ZShjdXIuZ2V0RGF0ZSgpIC0gMSk7XHJcbiAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICBlbmREYXRlLnNldERhdGUoZW5kRGF0ZS5nZXREYXRlKCkgKyBudW1EYXlzKTtcclxuICB3aGlsZSAoY3VyIDwgZW5kRGF0ZSkge1xyXG4gICAgcmVzdWx0LnB1c2gobmV3IERhdGUoY3VyKSk7XHJcbiAgICBjdXIuc2V0RGF0ZShjdXIuZ2V0RGF0ZSgpICsgNyk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jb25zdCBob3Vyc0JldHdlZW4gPSAoYTogRGF0ZSwgYjogRGF0ZSk6IG51bWJlciA9PiAoYi5nZXRUaW1lKCkgLSBhLmdldFRpbWUoKSkgLyBNU19QRVJfSE9VUjtcclxuY29uc3QgZm9ybWF0V2VlayA9IChkOiBEYXRlKTogc3RyaW5nID0+IGBXL0MgJHtkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JyB9KX1gO1xuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBQYXJ0IFN0YXR1cyBMb2dpY1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3Qgbm9ybWFsaXplUGFydFN0YXR1cyA9IChyYXdTdGF0dXM6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCFyYXdTdGF0dXMgfHwgcmF3U3RhdHVzID09PSAnbmFuJykgcmV0dXJuICdJbiBQcm9ncmVzcyc7XHJcbiAgY29uc3QgbG93ZXIgPSByYXdTdGF0dXMudG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgaWYgKGxvd2VyID09PSAncmVhZHknKSByZXR1cm4gJ1JlYWR5JztcclxuICBpZiAobG93ZXIgPT09ICdwYXJ0cyBub3QgYXNzaWduZWQnKSByZXR1cm4gJ1BhcnRzIE5vdCBBc3NpZ25lZCc7XHJcbiAgcmV0dXJuICdJbiBQcm9ncmVzcyc7XHJcbn07XHJcblxyXG5jb25zdCBnZXRDYWxjdWxhdGVkU3RhdHVzID0gKHRlc3Q6IFRlc3REYXRhLCB0ZXN0U3RhcnREYXRlOiBEYXRlIHwgbnVsbCA9IG51bGwpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGJhc2VTdGF0dXMgPSBub3JtYWxpemVQYXJ0U3RhdHVzKHRlc3QucGFydF9zdGF0dXMpO1xyXG4gIGlmIChiYXNlU3RhdHVzID09PSAnUmVhZHknKSByZXR1cm4gJ1JlYWR5JztcclxuICBpZiAoYmFzZVN0YXR1cyA9PT0gJ1BhcnRzIE5vdCBBc3NpZ25lZCcpIHJldHVybiAnUGFydHMgTm90IEFzc2lnbmVkJztcclxuXHJcbiAgaWYgKHRlc3RTdGFydERhdGUgJiYgdGVzdC5wYXJ0X3JlYWR5X2RhdGUpIHtcclxuICAgIGNvbnN0IHJlYWR5RGF0ZSA9IHBhcnNlTG9jYWxEYXRlKHRlc3QucGFydF9yZWFkeV9kYXRlKTtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRvTWlkbmlnaHQodGVzdFN0YXJ0RGF0ZSk7XHJcbiAgICBpZiAocmVhZHlEYXRlICYmIHN0YXJ0RGF0ZSkge1xyXG4gICAgICByZXR1cm4gcmVhZHlEYXRlLmdldFRpbWUoKSA+IHN0YXJ0RGF0ZS5nZXRUaW1lKCkgPyAnRGVsYXllZCcgOiAnT24gVGltZSc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiAnSW4gUHJvZ3Jlc3MnO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFN0YXR1cyAvIFByaW9yaXR5IGhlbHBlcnMgKHRoZW1lLWF3YXJlKVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgaXNSdW5uaW5nVGVzdCA9ICh0ZXN0OiBUZXN0RGF0YSk6IGJvb2xlYW4gPT4gdGVzdC5zdGF0dXMgPT09ICdSdW5uaW5nJztcclxuXHJcbmNvbnN0IGdldENhcENvbG9yID0gKHN0YXR1czogc3RyaW5nLCB0aGVtZTogVGhlbWVUb2tlbnMpOiBzdHJpbmcgPT5cclxuICB0aGVtZS5zdGF0dXNDYXBbc3RhdHVzXSB8fCB0aGVtZS5zdGF0dXNDYXBbJ0luIFByb2dyZXNzJ10gfHwgJyNFNUEwMEQnO1xyXG5cclxuY29uc3QgZ2V0U3RhdHVzVGV4dENvbG9yID0gKHN0YXR1czogc3RyaW5nLCB0aGVtZTogVGhlbWVUb2tlbnMpOiBzdHJpbmcgPT5cclxuICB0aGVtZS5zdGF0dXNUZXh0W3N0YXR1c10gfHwgdGhlbWUuc3RhdHVzVGV4dFsnSW4gUHJvZ3Jlc3MnXSB8fCAnI0I0NTMwOSc7XHJcblxyXG4vLyBSZXR1cm5zICdSdW5uaW5nJyBmb3IgUnVubmluZyB0ZXN0cyAob3ZlcnJpZGVzIHBhcnQgc3RhdHVzIGZvciBkaXNwbGF5IGNvbG91cnMpXHJcbmNvbnN0IGdldERpc3BsYXlTdGF0dXMgPSAodGVzdDogVGVzdERhdGEsIHRlc3RTdGFydERhdGU6IERhdGUgfCBudWxsID0gbnVsbCk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGlzUnVubmluZ1Rlc3QodGVzdCkpIHJldHVybiAnUnVubmluZyc7XHJcbiAgcmV0dXJuIGdldENhbGN1bGF0ZWRTdGF0dXModGVzdCwgdGVzdFN0YXJ0RGF0ZSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRQcmlvcml0eVRleHRDb2xvciA9IChwcmlvcml0eTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSB0eXBlb2YgcHJpb3JpdHkgPT09ICdudW1iZXInID8gcHJpb3JpdHkgOiA1MDtcclxuICBjb25zdCBjbGFtcGVkID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCB2YWx1ZSkpO1xyXG4gIGlmIChjbGFtcGVkIDw9IDMwKSByZXR1cm4gJyM2QjcyODAnO1xyXG4gIGlmIChjbGFtcGVkIDw9IDYwKSByZXR1cm4gJyNGNTlFMEInO1xyXG4gIGlmIChjbGFtcGVkIDw9IDgwKSByZXR1cm4gJyNFQTU4MEMnO1xyXG4gIHJldHVybiAnI0RDMjYyNic7XHJcbn07XHJcblxyXG5jb25zdCBnZXRQcmlvcml0eUNvbG9yID0gKHByaW9yaXR5OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBwcmlvcml0eSA9PT0gJ251bWJlcicgPyBwcmlvcml0eSA6IDUwO1xyXG4gIGNvbnN0IGNsYW1wZWQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHZhbHVlKSk7XHJcbiAgY29uc3QgcmF0aW8gPSBjbGFtcGVkIC8gMTAwO1xyXG4gIGNvbnN0IGcgPSBNYXRoLnJvdW5kKDI1NSAqICgxIC0gcmF0aW8pKTtcclxuICBjb25zdCBiID0gTWF0aC5yb3VuZCgyNTUgKiAoMSAtIHJhdGlvKSk7XHJcbiAgcmV0dXJuIGByZ2JhKDI1NSwgJHtnfSwgJHtifSwgMC42KWA7XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU3ViLWNvbXBvbmVudHNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IEluc2VydExpbmU6IEZDPHsgdGhlbWU6IFRoZW1lVG9rZW5zIH0+ID0gKHsgdGhlbWUgfSkgPT4gKFxyXG4gIDxkaXYgc3R5bGU9e3tcclxuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDIsIGJvdHRvbTogMiwgd2lkdGg6IDMsXHJcbiAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsIGJvcmRlclJhZGl1czogMiwgekluZGV4OiAzMCxcclxuICAgIGJveFNoYWRvdzogYDAgMCAxMnB4ICR7dGhlbWUuYWNjZW50fSwgMCAwIDRweCAke3RoZW1lLmFjY2VudH1gLFxyXG4gICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG4gIH19PlxyXG4gICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAtNCwgbGVmdDogLTQsIHdpZHRoOiAxMSwgaGVpZ2h0OiAxMSwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50IH19IC8+XHJcbiAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBib3R0b206IC00LCBsZWZ0OiAtNCwgd2lkdGg6IDExLCBoZWlnaHQ6IDExLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQgfX0gLz5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmNvbnN0IE91dGxpbmVLZXk6IEZDPHsgdGhlbWU6IFRoZW1lVG9rZW5zIH0+ID0gKHsgdGhlbWUgfSkgPT4gKFxyXG4gIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMTZweCcsIGJvcmRlclRvcDogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMgfX0+XHJcbiAgICA8aDMgc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnMC4wOGVtJywgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsIGNvbG9yOiB0aGVtZS50ZXh0VGVydGlhcnksIG1hcmdpbkJvdHRvbTogNiB9fT5TdGF0dXMgS2V5PC9oMz5cclxuICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4V3JhcDogJ3dyYXAnLCBnYXA6ICc0cHggMCcgfX0+XHJcbiAgICAgIHsoWydSdW5uaW5nJywgJ1JlYWR5JywgJ09uIFRpbWUnLCAnRGVsYXllZCcsICdQYXJ0cyBOb3QgQXNzaWduZWQnXSBhcyBjb25zdCkubWFwKChrZXkpID0+IChcclxuICAgICAgICA8ZGl2IGtleT17a2V5fSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDYsIHdpZHRoOiAnNTAlJywgbWluV2lkdGg6IDAgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA0LCBoZWlnaHQ6IDE0LCBiYWNrZ3JvdW5kOiB0aGVtZS5zdGF0dXNDYXBba2V5XSwgYm9yZGVyUmFkaXVzOiAyLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDksIGNvbG9yOiB0aGVtZS5zdGF0dXNUZXh0W2tleV0sIGZvbnRXZWlnaHQ6IDYwMCwgd2hpdGVTcGFjZTogJ25vd3JhcCcsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnIH19PntrZXkudG9VcHBlckNhc2UoKX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkpfVxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5pbnRlcmZhY2UgUXVldWVDYXJkUHJvcHMge1xyXG4gIHRlc3Q6IFRlc3REYXRhO1xyXG4gIGRyYWdnZWRUZXN0SWQ6IHN0cmluZyB8IG51bWJlciB8IG51bGw7XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgbWFpblRleHQ6IHN0cmluZztcclxuICBzdWJUZXh0OiBzdHJpbmc7XHJcbiAgaW5mb1Jvdzogc3RyaW5nO1xyXG4gIHNob3dTdWI6IGJvb2xlYW47XHJcbiAgdGhlbWU6IFRoZW1lVG9rZW5zO1xyXG4gIG9uRHJhZ1N0YXJ0OiAoKSA9PiB2b2lkO1xyXG4gIG9uRHJhZ0VuZDogKCkgPT4gdm9pZDtcclxuICBvbkRyYWdPdmVyOiAoZTogUmVhY3QuRHJhZ0V2ZW50KSA9PiB2b2lkO1xyXG4gIG9uTWVudU9wZW46IChyZWN0OiBBbmNob3JSZWN0KSA9PiB2b2lkO1xyXG59XHJcblxyXG5jb25zdCBRdWV1ZUNhcmQ6IEZDPFF1ZXVlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGVzdCwgZHJhZ2dlZFRlc3RJZCwgc3RhdHVzLCBtYWluVGV4dCwgc3ViVGV4dCwgaW5mb1Jvdywgc2hvd1N1YiwgdGhlbWUsXHJcbiAgb25EcmFnU3RhcnQsIG9uRHJhZ0VuZCwgb25EcmFnT3Zlciwgb25NZW51T3BlbixcclxufSkgPT4ge1xyXG4gIGNvbnN0IFtob3ZlcmVkLCBzZXRIb3ZlcmVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBwaWxsUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcclxuICBjb25zdCBjYXBDb2xvciA9IGdldENhcENvbG9yKHN0YXR1cywgdGhlbWUpO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGRyYWdnYWJsZVxyXG4gICAgICBvbkRyYWdTdGFydD17KGUpID0+IHsgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJzsgb25EcmFnU3RhcnQoKTsgfX1cclxuICAgICAgb25EcmFnRW5kPXtvbkRyYWdFbmR9XHJcbiAgICAgIG9uRHJhZ092ZXI9e29uRHJhZ092ZXJ9XHJcbiAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0SG92ZXJlZCh0cnVlKX1cclxuICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRIb3ZlcmVkKGZhbHNlKX1cclxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgbWFyZ2luQm90dG9tOiA2LFxyXG4gICAgICAgIGJhY2tncm91bmQ6IGRyYWdnZWRUZXN0SWQgPT09IHRlc3QuaWQgPyB0aGVtZS5iZ1N1YnRsZSA6IHRoZW1lLnN1cmZhY2UsXHJcbiAgICAgICAgYm9yZGVyOiBob3ZlcmVkID8gYDJweCBzb2xpZCAke2NhcENvbG9yfWAgOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZyxcclxuICAgICAgICBjdXJzb3I6ICdncmFiJyxcclxuICAgICAgICBvcGFjaXR5OiBkcmFnZ2VkVGVzdElkID09PSB0ZXN0LmlkID8gMC4zNSA6IDEsXHJcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgIGJveFNoYWRvdzogaG92ZXJlZCA/ICcwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4xNSknIDogJzAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMDYpJyxcclxuICAgICAgICB0cmFuc2Zvcm06IGhvdmVyZWQgPyAndHJhbnNsYXRlWSgtMnB4KScgOiAndHJhbnNsYXRlWSgwKScsXHJcbiAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjE1cyBlYXNlLCBib3gtc2hhZG93IDAuMTVzIGVhc2UsIGJvcmRlciAwLjE1cyBlYXNlJyxcclxuICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICB9fVxyXG4gICAgPlxyXG4gICAgICB7LyogU3RhdHVzIGNhcCBiYXIgKi99XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDUsIG1pbldpZHRoOiA1LCBiYWNrZ3JvdW5kOiBjYXBDb2xvciwgYm9yZGVyUmFkaXVzOiBgJHt0aGVtZS5yYWRpdXNMZ31weCAwIDAgJHt0aGVtZS5yYWRpdXNMZ31weGAsIGZsZXhTaHJpbms6IDAgfX0gLz5cclxuICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBwYWRkaW5nOiAnOHB4IDEycHgnLCBtaW5XaWR0aDogMCB9fT5cclxuICAgICAgICB7LyogVG9wIHJvdzogcHJpb3JpdHkgbGVmdCwgc3RhdHVzIHJpZ2h0ICovfVxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiA0LCBwYWRkaW5nUmlnaHQ6IDIwIH19PlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMywgZm9udFdlaWdodDogNzAwLCBjb2xvcjogZ2V0UHJpb3JpdHlUZXh0Q29sb3IodGVzdC5wcmlvcml0eSkgfX0+XHJcbiAgICAgICAgICAgIFB7dGVzdC5wcmlvcml0eX1cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDVlbScsIGNvbG9yOiBnZXRTdGF0dXNUZXh0Q29sb3Ioc3RhdHVzLCB0aGVtZSksIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIGFzIGNvbnN0IH19PlxyXG4gICAgICAgICAgICB7c3RhdHVzLnRvVXBwZXJDYXNlKCl9XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LCBtYXJnaW5Cb3R0b206IDIsIGxpbmVIZWlnaHQ6IDEuMyB9fT5cclxuICAgICAgICAgIHttYWluVGV4dH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7c2hvd1N1YiAmJiAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTEsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIG1hcmdpbkJvdHRvbTogNCwgZm9udFdlaWdodDogNDAwIH19PlxyXG4gICAgICAgICAgICB7c3ViVGV4dH1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGZvbnRTaXplOiAxMSwgY29sb3I6IHRoZW1lLnRleHRUZXJ0aWFyeSwgZmxleFdyYXA6ICd3cmFwJyB9fT5cclxuICAgICAgICAgIHtpbmZvUm93LnNwbGl0KCdcXHUwMGI3JykubWFwKChwYXJ0LCBpLCBhcnIpID0+IChcclxuICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17aX0+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e3BhcnQudHJpbSgpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICB7aSA8IGFyci5sZW5ndGggLSAxICYmIDxzcGFuPnsnXFx1MDBiNyd9PC9zcGFuPn1cclxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgey8qIFRocmVlLWRvdCBtZW51IHBpbGwgKi99XHJcbiAgICAgIDxkaXZcclxuICAgICAgICByZWY9e3BpbGxSZWZ9XHJcbiAgICAgICAgZHJhZ2dhYmxlPXtmYWxzZX1cclxuICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XHJcbiAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBpZiAocGlsbFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHIgPSBwaWxsUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIG9uTWVudU9wZW4oeyB0b3A6IHIudG9wLCBib3R0b206IHIuYm90dG9tLCBsZWZ0OiByLmxlZnQsIHJpZ2h0OiByLnJpZ2h0IH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH19XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgdG9wOiA2LFxyXG4gICAgICAgICAgcmlnaHQ6IDYsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBob3ZlcmVkID8gJ3JnYmEoMCwwLDAsMC4xKScgOiAncmdiYSgwLDAsMCwwLjA0KScsXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IDEwLFxyXG4gICAgICAgICAgcGFkZGluZzogJzJweCA3cHgnLFxyXG4gICAgICAgICAgZm9udFNpemU6IDEzLFxyXG4gICAgICAgICAgY29sb3I6IHRoZW1lLnRleHRNdXRlZCxcclxuICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgbGV0dGVyU3BhY2luZzogJzAuMWVtJyxcclxuICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXHJcbiAgICAgICAgICBvcGFjaXR5OiBob3ZlcmVkID8gMSA6IDAuNCxcclxuICAgICAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzJyxcclxuICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcclxuICAgICAgICB9fVxyXG4gICAgICA+XHUwMEI3XHUwMEI3XHUwMEI3PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuaW50ZXJmYWNlIFRlc3RCYXJQcm9wcyB7XHJcbiAgdGVzdDogU2NoZWR1bGVkVGVzdDtcclxuICBpc1Rlc3RSdW5uaW5nOiBib29sZWFuO1xyXG4gIGRyYWdnZWRUZXN0SWQ6IHN0cmluZyB8IG51bWJlciB8IG51bGw7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBCQVJfSEVJR0hUOiBudW1iZXI7XHJcbiAgZGlzcGxheVN0YXR1czogc3RyaW5nO1xyXG4gIHJlc29sdmVkTWFpbjogc3RyaW5nO1xyXG4gIHJlc29sdmVkSW5mbzogc3RyaW5nO1xyXG4gIHNob3dJbmZvT25CYXI6IGJvb2xlYW47XHJcbiAgdGhlbWU6IFRoZW1lVG9rZW5zO1xyXG4gIG9uRHJhZ1N0YXJ0OiAoZTogUmVhY3QuRHJhZ0V2ZW50KSA9PiB2b2lkO1xyXG4gIG9uRHJhZ0VuZDogKCkgPT4gdm9pZDtcclxuICBvbk1lbnVPcGVuOiAocmVjdDogQW5jaG9yUmVjdCkgPT4gdm9pZDtcclxufVxyXG5cclxuY29uc3QgVGVzdEJhcjogRkM8VGVzdEJhclByb3BzPiA9ICh7XHJcbiAgdGVzdCwgaXNUZXN0UnVubmluZywgZHJhZ2dlZFRlc3RJZCwgd2lkdGgsIEJBUl9IRUlHSFQsXHJcbiAgZGlzcGxheVN0YXR1cywgcmVzb2x2ZWRNYWluLCByZXNvbHZlZEluZm8sIHNob3dJbmZvT25CYXIsIHRoZW1lLFxyXG4gIG9uRHJhZ1N0YXJ0LCBvbkRyYWdFbmQsIG9uTWVudU9wZW4sXHJcbn0pID0+IHtcclxuICBjb25zdCBbaG92ZXJlZCwgc2V0SG92ZXJlZF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgcGlsbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcbiAgY29uc3QgY2FwQ29sb3IgPSBnZXRDYXBDb2xvcihkaXNwbGF5U3RhdHVzLCB0aGVtZSk7XHJcbiAgY29uc3QgdXNlVmVydGljYWxEb3RzID0gd2lkdGggPD0gNDA7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgZHJhZ2dhYmxlXHJcbiAgICAgIG9uRHJhZ1N0YXJ0PXtvbkRyYWdTdGFydH1cclxuICAgICAgb25EcmFnRW5kPXtvbkRyYWdFbmR9XHJcbiAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4geyBpZiAoIWRyYWdnZWRUZXN0SWQpIHNldEhvdmVyZWQodHJ1ZSk7IH19XHJcbiAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SG92ZXJlZChmYWxzZSl9XHJcbiAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAsIHRvcDogNixcclxuICAgICAgICB3aWR0aCwgaGVpZ2h0OiBCQVJfSEVJR0hULFxyXG4gICAgICAgIGJhY2tncm91bmQ6IGlzVGVzdFJ1bm5pbmcgPyB0aGVtZS5ydW5uaW5nQmcgOiB0aGVtZS5zdXJmYWNlLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzTGcsIGN1cnNvcjogJ2dyYWInLFxyXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ3JvdycsXHJcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgIG9wYWNpdHk6IGRyYWdnZWRUZXN0SWQgPT09IHRlc3QuaWQgPyAwLjI1IDogMSxcclxuICAgICAgICB6SW5kZXg6IGhvdmVyZWQgPyAyNSA6IDE1LFxyXG4gICAgICAgIGJvcmRlcjogaG92ZXJlZFxyXG4gICAgICAgICAgPyBgMnB4IHNvbGlkICR7Y2FwQ29sb3J9YFxyXG4gICAgICAgICAgOiBpc1Rlc3RSdW5uaW5nID8gYDFweCBzb2xpZCAke3RoZW1lLnJ1bm5pbmdCb3JkZXJ9YCA6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCxcclxuICAgICAgICBib3hTaGFkb3c6IGhvdmVyZWRcclxuICAgICAgICAgID8gJzAgNHB4IDEycHggcmdiYSgwLDAsMCwwLjE1KSdcclxuICAgICAgICAgIDogaXNUZXN0UnVubmluZyA/IGAwIDFweCAzcHggJHt0aGVtZS5ydW5uaW5nQm9yZGVyfTY2YCA6ICcwIDFweCAzcHggcmdiYSgwLDAsMCwwLjA2KScsXHJcbiAgICAgICAgdHJhbnNmb3JtOiBob3ZlcmVkID8gJ3RyYW5zbGF0ZVkoLTJweCknIDogJ3RyYW5zbGF0ZVkoMCknLFxyXG4gICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC4xNXMgZWFzZSwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLCBib3JkZXIgMC4xNXMgZWFzZScsXHJcbiAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAgey8qIFN0YXR1cyBjYXAgYmFyICovfVxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA1LCBtaW5XaWR0aDogNSwgYmFja2dyb3VuZDogY2FwQ29sb3IsIGZsZXhTaHJpbms6IDAgfX0gLz5cclxuICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBwYWRkaW5nOiAnNHB4IDhweCcsIG1pbldpZHRoOiAwLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgey8qIFRvcCByb3c6IHByaW9yaXR5ICsgc3RhdHVzIChsZWF2ZSByb29tIGZvciBwaWxsKSAqL31cclxuICAgICAgICB7d2lkdGggPiA3MCAmJiAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogMiwgcGFkZGluZ1JpZ2h0OiB3aWR0aCA+IDkwID8gMjIgOiAwIH19PlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IHdpZHRoID4gMTIwID8gMTEgOiA5LCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiBpc1Rlc3RSdW5uaW5nID8gdGhlbWUucnVubmluZ1RleHQgOiBnZXRQcmlvcml0eVRleHRDb2xvcih0ZXN0LnByaW9yaXR5KSB9fT5cclxuICAgICAgICAgICAgICB7aXNUZXN0UnVubmluZyA/ICdcdTI1QjYgUlVOTklORycgOiBgUCR7dGVzdC5wcmlvcml0eX1gfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIHt3aWR0aCA+IDExMCAmJiAhaXNUZXN0UnVubmluZyAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiA5LCBmb250V2VpZ2h0OiA3MDAsIGxldHRlclNwYWNpbmc6ICcwLjA1ZW0nLCBjb2xvcjogZ2V0U3RhdHVzVGV4dENvbG9yKGRpc3BsYXlTdGF0dXMsIHRoZW1lKSwgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgYXMgY29uc3QgfX0+XHJcbiAgICAgICAgICAgICAgICB7ZGlzcGxheVN0YXR1cy50b1VwcGVyQ2FzZSgpfVxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgey8qIE1haW4gdGV4dCAqL31cclxuICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgZm9udFNpemU6IHdpZHRoID4gMTIwID8gMTIgOiB3aWR0aCA+IDgwID8gMTEgOiAxMCxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IGlzVGVzdFJ1bm5pbmcgPyB0aGVtZS5ydW5uaW5nVGV4dERhcmsgOiB0aGVtZS50ZXh0UHJpbWFyeSxcclxuICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIG1heFdpZHRoOiAnMTAwJScsIGxpbmVIZWlnaHQ6IDEuMixcclxuICAgICAgICB9fT5cclxuICAgICAgICAgIHtyZXNvbHZlZE1haW59XHJcbiAgICAgICAgPC9zcGFuPlxyXG5cclxuICAgICAgICB7LyogSW5mbyByb3cgKi99XHJcbiAgICAgICAge3Nob3dJbmZvT25CYXIgJiYgKFxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiA5LCBmb250V2VpZ2h0OiA0MDAsXHJcbiAgICAgICAgICAgIGNvbG9yOiBpc1Rlc3RSdW5uaW5nID8gdGhlbWUucnVubmluZ1RleHQgOiB0aGVtZS50ZXh0VGVydGlhcnksXHJcbiAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgbWF4V2lkdGg6ICcxMDAlJywgbWFyZ2luVG9wOiAyLFxyXG4gICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgIHtyZXNvbHZlZEluZm99XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7LyogTWVudSBwaWxsIFx1MjAxNCBcdTAwQjdcdTAwQjdcdTAwQjcgb24gd2lkZSBiYXJzLCBcdTIyRUUgb24gbmFycm93IGJhcnMsIGFsd2F5cyB2aXNpYmxlICovfVxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXtwaWxsUmVmfVxyXG4gICAgICAgIGRyYWdnYWJsZT17ZmFsc2V9XHJcbiAgICAgICAgb25Nb3VzZURvd249eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxyXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgaWYgKHBpbGxSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCByID0gcGlsbFJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBvbk1lbnVPcGVuKHsgdG9wOiByLnRvcCwgYm90dG9tOiByLmJvdHRvbSwgbGVmdDogci5sZWZ0LCByaWdodDogci5yaWdodCB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9fVxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgIHRvcDogNCxcclxuICAgICAgICAgIHJpZ2h0OiA0LFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogaG92ZXJlZCA/ICdyZ2JhKDAsMCwwLDAuMTIpJyA6ICdyZ2JhKDAsMCwwLDAuMDQpJyxcclxuICAgICAgICAgIGJvcmRlclJhZGl1czogMTAsXHJcbiAgICAgICAgICBwYWRkaW5nOiB1c2VWZXJ0aWNhbERvdHMgPyAnM3B4IDRweCcgOiAnMnB4IDZweCcsXHJcbiAgICAgICAgICBmb250U2l6ZTogdXNlVmVydGljYWxEb3RzID8gMTAgOiAxMixcclxuICAgICAgICAgIGNvbG9yOiBpc1Rlc3RSdW5uaW5nID8gdGhlbWUucnVubmluZ1RleHQgOiB0aGVtZS50ZXh0TXV0ZWQsXHJcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgIGxldHRlclNwYWNpbmc6IHVzZVZlcnRpY2FsRG90cyA/IDAgOiAnMC4xZW0nLFxyXG4gICAgICAgICAgbGluZUhlaWdodDogMSxcclxuICAgICAgICAgIG9wYWNpdHk6IGhvdmVyZWQgPyAxIDogMC4zNSxcclxuICAgICAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzJyxcclxuICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcclxuICAgICAgICB9fVxyXG4gICAgICA+e3VzZVZlcnRpY2FsRG90cyA/ICdcdTIyRUUnIDogJ1x1MDBCN1x1MDBCN1x1MDBCNyd9PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENvbnRleHQgTWVudVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgTWVudUl0ZW06IEZDPHsgbGFiZWw6IHN0cmluZzsgZGV0YWlsPzogc3RyaW5nOyBpY29uPzogc3RyaW5nOyB0aGVtZTogVGhlbWVUb2tlbnM7IG9uQ2xpY2s6ICgpID0+IHZvaWQgfT4gPSAoeyBsYWJlbCwgZGV0YWlsLCBpY29uLCB0aGVtZSwgb25DbGljayB9KSA9PiB7XG4gIGNvbnN0IFtob3ZlcmVkLCBzZXRIb3ZlcmVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEhvdmVyZWQodHJ1ZSl9XHJcbiAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SG92ZXJlZChmYWxzZSl9XHJcbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XHJcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHBhZGRpbmc6ICc4cHggMTRweCcsXG4gICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgZm9udFdlaWdodDogNTAwLFxuICAgICAgICBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksXG4gICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICBiYWNrZ3JvdW5kOiBob3ZlcmVkID8gdGhlbWUuc3VyZmFjZUhvdmVyIDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgZ2FwOiA4LFxyXG4gICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcclxuICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7aWNvbiAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTMsIHdpZHRoOiAxOCwgdGV4dEFsaWduOiAnY2VudGVyJywgY29sb3I6IHRoZW1lLnRleHRNdXRlZCB9fT57aWNvbn08L3NwYW4+fVxuICAgICAgPGRpdiBzdHlsZT17eyBtaW5XaWR0aDogMCwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnYmFzZWxpbmUnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBnYXA6IDgsIHdpZHRoOiAnMTAwJScgfX0+XG4gICAgICAgIDxzcGFuIHN0eWxlPXt7IHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyB9fT57bGFiZWx9PC9zcGFuPlxuICAgICAgICB7ZGV0YWlsICYmIChcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4U2hyaW5rOiAwLCBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDEwLCBjb2xvcjogdGhlbWUudGV4dE11dGVkIH19PlxuICAgICAgICAgICAge2RldGFpbH1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cclxuaW50ZXJmYWNlIEFjdGlvblBvcG92ZXJQcm9wcyB7XG4gIHBvcG92ZXI6IFBvcG92ZXJTdGF0ZTtcbiAgc3RhdHVzT3B0aW9uc0xpc3Q6IHN0cmluZ1tdO1xuICBwcmlvcml0eUlucHV0VmFsdWU6IHN0cmluZztcbiAgc3RhcnREYXRlSW5wdXRWYWx1ZTogc3RyaW5nO1xuICBlbmREYXRlSW5wdXRWYWx1ZTogc3RyaW5nO1xuICB0aGVtZTogVGhlbWVUb2tlbnM7XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9uTW9kZUNoYW5nZTogKG1vZGU6ICdyb290JyB8ICdwcmlvcml0eScgfCAnc3RhdHVzJyB8ICdzdGFydF9kYXRlJyB8ICdlbmRfZGF0ZScpID0+IHZvaWQ7XHJcbiAgb25Qcmlvcml0eUlucHV0Q2hhbmdlOiAodmFsOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25Db25maXJtUHJpb3JpdHk6ICgpID0+IHZvaWQ7XHJcbiAgb25QaWNrU3RhdHVzOiAoc3RhdHVzOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25FZGl0VGVzdDogKCkgPT4gdm9pZDtcclxuICBvblN0YXJ0RGF0ZUlucHV0Q2hhbmdlOiAodmFsOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25Db25maXJtU3RhcnREYXRlOiAoKSA9PiB2b2lkO1xyXG4gIG9uRW5kRGF0ZUlucHV0Q2hhbmdlOiAodmFsOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25Db25maXJtRW5kRGF0ZTogKCkgPT4gdm9pZDtcclxuICBwYW5lbFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcclxufVxyXG5cclxuY29uc3QgQWN0aW9uUG9wb3ZlcjogRkM8QWN0aW9uUG9wb3ZlclByb3BzPiA9ICh7XG4gIHBvcG92ZXIsIHN0YXR1c09wdGlvbnNMaXN0LCBwcmlvcml0eUlucHV0VmFsdWUsIHN0YXJ0RGF0ZUlucHV0VmFsdWUsIGVuZERhdGVJbnB1dFZhbHVlLCB0aGVtZSxcbiAgb25DbG9zZSwgb25Nb2RlQ2hhbmdlLCBvblByaW9yaXR5SW5wdXRDaGFuZ2UsIG9uQ29uZmlybVByaW9yaXR5LCBvblBpY2tTdGF0dXMsIG9uRWRpdFRlc3QsXG4gIG9uU3RhcnREYXRlSW5wdXRDaGFuZ2UsIG9uQ29uZmlybVN0YXJ0RGF0ZSwgb25FbmREYXRlSW5wdXRDaGFuZ2UsIG9uQ29uZmlybUVuZERhdGUsIHBhbmVsUmVmLFxufSkgPT4ge1xuICBjb25zdCBbZmxpcHBlZFYsIHNldEZsaXBwZWRWXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgcG9wb3ZlcldpZHRoID0gMjQ4O1xuICBjb25zdCB7IGFuY2hvclJlY3QsIHRlc3QsIG1vZGUsIGRpc3BsYXlTdGF0dXMsIHRvb2x0aXBMaW5lcywgc2NoZWR1bGVkIH0gPSBwb3BvdmVyO1xuICBjb25zdCBjYXBDb2xvciA9IGdldENhcENvbG9yKGRpc3BsYXlTdGF0dXMsIHRoZW1lKTtcbiAgY29uc3Qgc3RhcnREYXRlTGFiZWwgPSBmb3JtYXRNZW51RGF0ZUxhYmVsKHRlc3QudGVzdF9zdGFydGVkX2RhdGUpO1xuICBjb25zdCBlbmREYXRlTGFiZWwgPSBmb3JtYXRNZW51RGF0ZUxhYmVsKHRlc3QudGVzdF9lbmRlZF9kYXRlKTtcblxyXG4gIC8vIEhvcml6b250YWw6IHJpZ2h0LWFsaWduIHRvIGJ1dHRvbiwgY2xhbXAgdG8gdmlld3BvcnQgZWRnZXNcclxuICBsZXQgbGVmdCA9IGFuY2hvclJlY3QucmlnaHQgLSBwb3BvdmVyV2lkdGg7XHJcbiAgbGVmdCA9IE1hdGgubWF4KDgsIE1hdGgubWluKGxlZnQsIHdpbmRvdy5pbm5lcldpZHRoIC0gcG9wb3ZlcldpZHRoIC0gOCkpO1xyXG5cclxuICAvLyBWZXJ0aWNhbDogYmVsb3cgYnV0dG9uIGJ5IGRlZmF1bHQ7IGZsaXAgYWJvdmUgaWYgbmVhciBib3R0b21cclxuICBjb25zdCB0b3BCZWxvdyA9IGFuY2hvclJlY3QuYm90dG9tICsgNjtcclxuICBjb25zdCBib3R0b21BYm92ZSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIGFuY2hvclJlY3QudG9wICsgNjtcclxuXHJcbiAgLy8gTWVhc3VyZSBwYW5lbCBoZWlnaHQgYW5kIGRlY2lkZSBmbGlwIGRpcmVjdGlvbiBvbiBldmVyeSBtb2RlL2FuY2hvciBjaGFuZ2VcclxuICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHBhbmVsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY29uc3QgcGFuZWxIZWlnaHQgPSBwYW5lbFJlZi5jdXJyZW50LnNjcm9sbEhlaWdodDtcclxuICAgICAgY29uc3Qgc3BhY2VCZWxvdyA9IHdpbmRvdy5pbm5lckhlaWdodCAtIGFuY2hvclJlY3QuYm90dG9tIC0gNiAtIDg7XHJcbiAgICAgIGNvbnN0IHNwYWNlQWJvdmUgPSBhbmNob3JSZWN0LnRvcCAtIDYgLSA4O1xyXG4gICAgICAvLyBGbGlwIGFib3ZlIG9ubHkgaWYgaXQgZG9lc24ndCBmaXQgYmVsb3cgQU5EIHRoZXJlJ3MgbW9yZSBzcGFjZSBhYm92ZVxyXG4gICAgICBzZXRGbGlwcGVkVihwYW5lbEhlaWdodCA+IHNwYWNlQmVsb3cgJiYgc3BhY2VBYm92ZSA+IHNwYWNlQmVsb3cpO1xyXG4gICAgfVxyXG4gIH0sIFttb2RlLCBhbmNob3JSZWN0XSk7XHJcblxyXG4gIGNvbnN0IHBvc1N0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0gZmxpcHBlZFZcclxuICAgID8geyBwb3NpdGlvbjogJ2ZpeGVkJywgbGVmdCwgYm90dG9tOiBib3R0b21BYm92ZSwgekluZGV4OiAzMDAwIH1cclxuICAgIDogeyBwb3NpdGlvbjogJ2ZpeGVkJywgbGVmdCwgdG9wOiB0b3BCZWxvdywgekluZGV4OiAzMDAwIH07XHJcblxyXG4gIGNvbnN0IGxpbmVzID0gdG9vbHRpcExpbmVzLnNwbGl0KCdcXG4nKS5maWx0ZXIobCA9PiB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IGwuc3BsaXQoJzonKTtcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPCAyKSByZXR1cm4gbC50cmltKCkgIT09ICcnO1xyXG4gICAgcmV0dXJuIHBhcnRzLnNsaWNlKDEpLmpvaW4oJzonKS50cmltKCkgIT09ICcnO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxuICAgICAgcmVmPXtwYW5lbFJlZn1cbiAgICAgIG9uQ29udGV4dE1lbnU9eyhlKSA9PiBlLnByZXZlbnREZWZhdWx0KCl9XG4gICAgICBzdHlsZT17e1xuICAgICAgICAuLi5wb3NTdHlsZSxcclxuICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLFxyXG4gICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzWGwsXHJcbiAgICAgICAgYm94U2hhZG93OiAnMCA0cHggMTZweCByZ2JhKDAsMCwwLDAuMTIpLCAwIDFweCA0cHggcmdiYSgwLDAsMCwwLjA2KScsXHJcbiAgICAgICAgd2lkdGg6IHBvcG92ZXJXaWR0aCxcclxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICB0b3A6IDgsXG4gICAgICAgICAgcmlnaHQ6IDgsXG4gICAgICAgICAgd2lkdGg6IDI0LFxuICAgICAgICAgIGhlaWdodDogMjQsXG4gICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNTbSxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsXG4gICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICB9fVxuICAgICAgICBhcmlhLWxhYmVsPVwiQ2xvc2UgbWVudVwiXG4gICAgICA+XG4gICAgICAgIFx1MDBEN1xuICAgICAgPC9idXR0b24+XG4gICAgICB7bW9kZSA9PT0gJ3Jvb3QnID8gKFxuICAgICAgICA8PlxuICAgICAgICAgIHsvKiBEZXRhaWxzIHNlY3Rpb24gKi99XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAzOHB4IDEwcHggMTRweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gIH19PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LCBsaW5lSGVpZ2h0OiAxLjMsIG1hcmdpbkJvdHRvbTogNiwgd29yZEJyZWFrOiAnYnJlYWstd29yZCcgfX0+XG4gICAgICAgICAgICAgIHt0ZXN0Lm5hbWV9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206IChsaW5lcy5sZW5ndGggPiAwIHx8IHNjaGVkdWxlZCkgPyA4IDogMCB9fT5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogZ2V0UHJpb3JpdHlUZXh0Q29sb3IodGVzdC5wcmlvcml0eSkgfX0+XG4gICAgICAgICAgICAgICAgUHt0ZXN0LnByaW9yaXR5fVxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDEwLCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiBnZXRTdGF0dXNUZXh0Q29sb3IoZGlzcGxheVN0YXR1cywgdGhlbWUpLFxyXG4gICAgICAgICAgICAgICAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgYXMgY29uc3QsIGxldHRlclNwYWNpbmc6ICcwLjA1ZW0nLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzFweCA2cHgnLCBiYWNrZ3JvdW5kOiBgJHtjYXBDb2xvcn0xOGAsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c1NtLCBib3JkZXI6IGAxcHggc29saWQgJHtjYXBDb2xvcn00MGAsXHJcbiAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICB7ZGlzcGxheVN0YXR1c31cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7bGluZXMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiAxLCBiYWNrZ3JvdW5kOiB0aGVtZS5ib3JkZXIsIG1hcmdpbjogJzAgLTJweCA2cHgnIH19IC8+XHJcbiAgICAgICAgICAgICAgICB7bGluZXMubWFwKChsaW5lLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9uSWR4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICAgICAgICBpZiAoY29sb25JZHggPT09IC0xKSByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSwgbWFyZ2luQm90dG9tOiAyLCBsaW5lSGVpZ2h0OiAxLjQgfX0+e2xpbmV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBsaW5lLnNsaWNlKDAsIGNvbG9uSWR4KS50cmltKCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGxpbmUuc2xpY2UoY29sb25JZHggKyAxKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIGZvbnRTaXplOiAxMiwgbWFyZ2luQm90dG9tOiAyLCBsaW5lSGVpZ2h0OiAxLjQgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFdlaWdodDogNTAwLCBmbGV4U2hyaW5rOiAwIH19PntsYWJlbH06PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSB9fT57dmFsdWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7c2NoZWR1bGVkICYmIChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogMSwgYmFja2dyb3VuZDogdGhlbWUuYm9yZGVyLCBtYXJnaW46IGAke2xpbmVzLmxlbmd0aCA+IDAgPyA2IDogMH1weCAtMnB4IDZweGAgfX0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBmb250U2l6ZTogMTIsIG1hcmdpbkJvdHRvbTogMiB9fT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRXZWlnaHQ6IDUwMCB9fT5TdGFydHM6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5IH19PntzY2hlZHVsZWQuc3RhcnQudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1HQicsIHsgZGF5OiAnMi1kaWdpdCcsIG1vbnRoOiAnc2hvcnQnLCB5ZWFyOiAnbnVtZXJpYycgfSl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIGZvbnRTaXplOiAxMiB9fT5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRXZWlnaHQ6IDUwMCB9fT5FbmRzOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSB9fT57c2NoZWR1bGVkLmVuZC50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLUdCJywgeyBkYXk6ICcyLWRpZ2l0JywgbW9udGg6ICdzaG9ydCcsIHllYXI6ICdudW1lcmljJyB9KX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7LyogQWN0aW9ucyAqL31cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc0cHggMCcgfX0+XHJcbiAgICAgICAgICAgIDxNZW51SXRlbSBsYWJlbD1cIkNoYW5nZSBQcmlvcml0eVwiIGljb249XCJcdTJCMDZcIiB0aGVtZT17dGhlbWV9IG9uQ2xpY2s9eygpID0+IG9uTW9kZUNoYW5nZSgncHJpb3JpdHknKX0gLz5cbiAgICAgICAgICAgIDxNZW51SXRlbSBsYWJlbD1cIkNoYW5nZSBTdGF0dXNcIiBpY29uPVwiXHUyNUM5XCIgdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ3N0YXR1cycpfSAvPlxuICAgICAgICAgICAge2Rpc3BsYXlTdGF0dXMgPT09ICdSdW5uaW5nJyAmJiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPE1lbnVJdGVtIGxhYmVsPVwiQ2hhbmdlIFN0YXJ0IERhdGVcIiBkZXRhaWw9e3N0YXJ0RGF0ZUxhYmVsIHx8IHVuZGVmaW5lZH0gaWNvbj1cIlx1RDgzRFx1RENDNVwiIHRoZW1lPXt0aGVtZX0gb25DbGljaz17KCkgPT4gb25Nb2RlQ2hhbmdlKCdzdGFydF9kYXRlJyl9IC8+XG4gICAgICAgICAgICAgICAgPE1lbnVJdGVtIGxhYmVsPVwiQ2hhbmdlIEVuZCBEYXRlXCIgZGV0YWlsPXtlbmREYXRlTGFiZWwgfHwgdW5kZWZpbmVkfSBpY29uPVwiXHVEODNEXHVEQ0M1XCIgdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ2VuZF9kYXRlJyl9IC8+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxNZW51SXRlbSBsYWJlbD1cIkVkaXQgVGVzdFwiIGljb249XCJcdTI3MEVcIiB0aGVtZT17dGhlbWV9IG9uQ2xpY2s9e29uRWRpdFRlc3R9IC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8Lz5cbiAgICAgICkgOiBtb2RlID09PSAncHJpb3JpdHknID8gKFxuICAgICAgICA8PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMzhweCA4cHggMTRweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCB9fT5cbiAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IG9uTW9kZUNoYW5nZSgncm9vdCcpfSBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFNpemU6IDE2LCBsaW5lSGVpZ2h0OiAxIH19Plx1MjE5MDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSB9fT5DaGFuZ2UgUHJpb3JpdHk8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNHB4JyB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIG1hcmdpbkJvdHRvbTogOCB9fT5FbnRlciBwcmlvcml0eSAoMFx1MjAxMzEwMCk6PC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgICAgICAgIG1pbj17MH1cclxuICAgICAgICAgICAgICBtYXg9ezEwMH1cclxuICAgICAgICAgICAgICBhdXRvRm9jdXNcclxuICAgICAgICAgICAgICB2YWx1ZT17cHJpb3JpdHlJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25Qcmlvcml0eUlucHV0Q2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICBvbktleURvd249eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIG9uQ29uZmlybVByaW9yaXR5KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBvbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDhweCcsIGZvbnRTaXplOiAxMywgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJTdHJvbmd9YCwgb3V0bGluZTogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiA4LCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29uZmlybVByaW9yaXR5fVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgZmxleDogMSwgcGFkZGluZzogJzZweCAwJywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCwgY29sb3I6IHRoZW1lLmFjY2VudEZnLCBib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+Q29uZmlybTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e29uQ2xvc2V9IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyB9fT5DYW5jZWw8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XG4gICAgICApIDogbW9kZSA9PT0gJ3N0YXR1cycgPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAzOHB4IDhweCAxNHB4JywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4IH19PlxuICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4gb25Nb2RlQ2hhbmdlKCdyb290Jyl9IHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250U2l6ZTogMTYsIGxpbmVIZWlnaHQ6IDEgfX0+XHUyMTkwPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5IH19PkNoYW5nZSBTdGF0dXM8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnNHB4IDAnIH19PlxyXG4gICAgICAgICAgICB7c3RhdHVzT3B0aW9uc0xpc3QubWFwKChzKSA9PiAoXHJcbiAgICAgICAgICAgICAgPE1lbnVJdGVtIGtleT17c30gbGFiZWw9e3MgPT09ICdOVUxMJyA/ICdDbGVhciBTdGF0dXMgKE5VTEwpJyA6IHN9IHRoZW1lPXt0aGVtZX0gb25DbGljaz17KCkgPT4gb25QaWNrU3RhdHVzKHMpfSAvPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvPlxuICAgICAgKSA6IG1vZGUgPT09ICdzdGFydF9kYXRlJyA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDM4cHggOHB4IDE0cHgnLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDggfX0+XG4gICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ3Jvb3QnKX0gc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRTaXplOiAxNiwgbGluZUhlaWdodDogMSB9fT5cdTIxOTA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnkgfX0+Q2hhbmdlIFN0YXJ0IERhdGU8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNHB4JyB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Cb3R0b206IDggfX0+RW50ZXIgc3RhcnQgZGF0ZTo8L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwiZGF0ZVwiXG4gICAgICAgICAgICAgIGF1dG9Gb2N1c1xuICAgICAgICAgICAgICB2YWx1ZT17c3RhcnREYXRlSW5wdXRWYWx1ZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uU3RhcnREYXRlSW5wdXRDaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgb25Db25maXJtU3RhcnREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBvbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDhweCcsIGZvbnRTaXplOiAxMywgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJTdHJvbmd9YCwgb3V0bGluZTogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiA4LCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29uZmlybVN0YXJ0RGF0ZX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshc3RhcnREYXRlSW5wdXRWYWx1ZX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIGZsZXg6IDEsIHBhZGRpbmc6ICc2cHggMCcsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBzdGFydERhdGVJbnB1dFZhbHVlID8gdGhlbWUuYWNjZW50IDogdGhlbWUuYm9yZGVyLFxyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogc3RhcnREYXRlSW5wdXRWYWx1ZSA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dE11dGVkLFxyXG4gICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsIGN1cnNvcjogc3RhcnREYXRlSW5wdXRWYWx1ZSA/ICdwb2ludGVyJyA6ICdkZWZhdWx0JyxcclxuICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPkNvbmZpcm08L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXtvbkNsb3NlfSBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScgfX0+Q2FuY2VsPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvPlxuICAgICAgKSA6IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDM4cHggOHB4IDE0cHgnLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDggfX0+XG4gICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ3Jvb3QnKX0gc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRTaXplOiAxNiwgbGluZUhlaWdodDogMSB9fT5cdTIxOTA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnkgfX0+Q2hhbmdlIEVuZCBEYXRlPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMTRweCcgfX0+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgbWFyZ2luQm90dG9tOiA4IH19PkVudGVyIGVuZCBkYXRlOjwvZGl2PlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgICAgICAgICAgYXV0b0ZvY3VzXG4gICAgICAgICAgICAgIHZhbHVlPXtlbmREYXRlSW5wdXRWYWx1ZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uRW5kRGF0ZUlucHV0Q2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICBvbktleURvd249eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIG9uQ29uZmlybUVuZERhdGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIG9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLCBib3hTaXppbmc6ICdib3JkZXItYm94JyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggOHB4JywgZm9udFNpemU6IDEzLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlclN0cm9uZ31gLCBvdXRsaW5lOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IDgsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25Db25maXJtRW5kRGF0ZX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshZW5kRGF0ZUlucHV0VmFsdWV9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICBmbGV4OiAxLCBwYWRkaW5nOiAnNnB4IDAnLCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCxcclxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogZW5kRGF0ZUlucHV0VmFsdWUgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS5ib3JkZXIsXHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBlbmREYXRlSW5wdXRWYWx1ZSA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dE11dGVkLFxyXG4gICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsIGN1cnNvcjogZW5kRGF0ZUlucHV0VmFsdWUgPyAncG9pbnRlcicgOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5Db25maXJtPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17b25DbG9zZX0gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBjdXJzb3I6ICdwb2ludGVyJywgdGV4dERlY29yYXRpb246ICd1bmRlcmxpbmUnIH19PkNhbmNlbDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8Lz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU2F2ZSBPdmVybGF5XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5pbnRlcmZhY2UgU2F2ZU92ZXJsYXlQcm9wcyB7XHJcbiAgaXNFcnJvcjogYm9vbGVhbjtcclxuICB0aGVtZTogVGhlbWVUb2tlbnM7XHJcbiAgb25SZXRyeTogKCkgPT4gdm9pZDtcclxuICBvbkRpc2NhcmQ6ICgpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmNvbnN0IFNhdmVPdmVybGF5OiBGQzxTYXZlT3ZlcmxheVByb3BzPiA9ICh7IGlzRXJyb3IsIHRoZW1lLCBvblJldHJ5LCBvbkRpc2NhcmQgfSkgPT4gKFxyXG4gIDxkaXYgc3R5bGU9e3tcclxuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBpbnNldDogMCwgekluZGV4OiAyMDAwLFxyXG4gICAgYmFja2dyb3VuZDogdGhlbWUuaXNEYXJrID8gJ3JnYmEoMjgsMjgsNDYsMC44MiknIDogJ3JnYmEoMjQ5LDI1MCwyNTEsMC44MiknLFxyXG4gICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG4gICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICB9fT5cclxuICAgIHshaXNFcnJvciA/IChcclxuICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMiB9fT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogMzIsIGhlaWdodDogMzIsIGJvcmRlclJhZGl1czogJzUwJScsXHJcbiAgICAgICAgICBib3JkZXI6IGAzcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYm9yZGVyVG9wQ29sb3I6IHRoZW1lLmFjY2VudCxcclxuICAgICAgICAgIGFuaW1hdGlvbjogJ2NjbC1zcGluIDAuN3MgbGluZWFyIGluZmluaXRlJyxcclxuICAgICAgICB9fSAvPlxyXG4gICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAxMywgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSB9fT5TYXZpbmdcdTIwMjY8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKSA6IChcclxuICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLnN1cmZhY2UsIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c1hsLFxyXG4gICAgICAgIGJveFNoYWRvdzogJzAgNHB4IDIwcHggcmdiYSgwLDAsMCwwLjEyKScsIHBhZGRpbmc6ICcyNHB4IDI4cHgnLFxyXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDEyLFxyXG4gICAgICAgIG1heFdpZHRoOiAzMDAsXHJcbiAgICAgIH19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgIHdpZHRoOiA0MCwgaGVpZ2h0OiA0MCwgYm9yZGVyUmFkaXVzOiAnNTAlJyxcclxuICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmlzRGFyayA/ICcjM0IwMDAwJyA6ICcjRkVGMkYyJyxcclxuICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmlzRGFyayA/ICcjN0YxRDFEJyA6ICcjRkVDQUNBJ31gLFxyXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG4gICAgICAgICAgZm9udFNpemU6IDIwLCBjb2xvcjogJyNFRjQ0NDQnLCBmb250V2VpZ2h0OiA3MDAsXHJcbiAgICAgICAgfX0+ITwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSB9fT5TYXZlIGZhaWxlZDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBsaW5lSGVpZ2h0OiAxLjUgfX0+XHJcbiAgICAgICAgICBUaGUgYWxsb2NhdGlvbiBjb3VsZCBub3QgYmUgc2F2ZWQuIFlvdSBjYW4gcmV0cnkgb3IgZGlzY2FyZCB5b3VyIGNoYW5nZXMuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgbWFyZ2luVG9wOiA0IH19PlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkRpc2NhcmR9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxNnB4JywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLFxyXG4gICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlclN0cm9uZ31gLCBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSwgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5EaXNjYXJkPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uUmV0cnl9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgcGFkZGluZzogJzdweCAxNnB4JywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLFxyXG4gICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsIGNvbG9yOiB0aGVtZS5hY2NlbnRGZyxcclxuICAgICAgICAgICAgICBib3hTaGFkb3c6IGAwIDFweCAzcHggJHt0aGVtZS5hY2NlbnR9NERgLFxyXG4gICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+UmV0cnk8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApfVxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBBbGxvY2F0aW9uIEhlbHBlcnNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IGJ1aWxkQWxsb2NhdGlvbnMgPSAoc3RhbmRzOiBJbnRlcm5hbFN0YW5kW10pOiBBbGxvY2F0aW9uUmVjb3JkW10gPT4ge1xyXG4gIGNvbnN0IGFsbG9jYXRpb25zOiBBbGxvY2F0aW9uUmVjb3JkW10gPSBbXTtcclxuICBzdGFuZHMuZm9yRWFjaChzdGFuZCA9PiB7XHJcbiAgICBzdGFuZC50ZXN0cy5mb3JFYWNoKCh0ZXN0LCBpZHgpID0+IHtcclxuICAgICAgYWxsb2NhdGlvbnMucHVzaCh7XHJcbiAgICAgICAgdGVzdF9pZDogdGVzdC5pZCxcclxuICAgICAgICB0ZXN0X3N0YW5kX2lkOiBzdGFuZC5pZCxcclxuICAgICAgICBwcmlvcml0eV9vcmRlcjogaWR4ICsgMSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICByZXR1cm4gYWxsb2NhdGlvbnM7XHJcbn07XHJcblxyXG5jb25zdCBhbGxvY2F0aW9uc0tleSA9IChhbGxvY3M6IEFsbG9jYXRpb25SZWNvcmRbXSk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFsbG9jcy5tYXAoYSA9PiBgJHthLnRlc3RfaWR9OiR7YS50ZXN0X3N0YW5kX2lkfToke2EucHJpb3JpdHlfb3JkZXJ9YCkuc29ydCgpKTtcclxufTtcclxuXHJcbmNvbnN0IHBhcnNlU3RhbmRzID0gKFxyXG4gIHRlc3RzQXJyOiBhbnlbXSxcclxuICBzdGFuZHNBcnI6IFN0YW5kRGVmW10sXHJcbiAgY2hIb3VyczogbnVtYmVyLFxyXG4gIG5vbldvcmtpbmdBcnI6IGFueVtdID0gW11cclxuKTogeyBzdGFuZHM6IEludGVybmFsU3RhbmRbXTsgdW5hbGxvY2F0ZWQ6IFRlc3REYXRhW10gfSA9PiB7XHJcbiAgLy8gR3JvdXAgbm9uLXdvcmtpbmcgcm93cyBieSB0ZXN0X3N0YW5kX2lkXHJcbiAgY29uc3Qgbm9uV29ya2luZ0J5U3RhbmQgPSBuZXcgTWFwPHN0cmluZyB8IG51bWJlciwgYW55W10+KCk7XHJcbiAgZm9yIChjb25zdCByb3cgb2Ygbm9uV29ya2luZ0Fycikge1xyXG4gICAgaWYgKCFyb3cgfHwgcm93LnRlc3Rfc3RhbmRfaWQgPT0gbnVsbCkgY29udGludWU7XHJcbiAgICBjb25zdCBrZXkgPSByb3cudGVzdF9zdGFuZF9pZDtcclxuICAgIGlmICghbm9uV29ya2luZ0J5U3RhbmQuaGFzKGtleSkpIG5vbldvcmtpbmdCeVN0YW5kLnNldChrZXksIFtdKTtcclxuICAgIG5vbldvcmtpbmdCeVN0YW5kLmdldChrZXkpIS5wdXNoKHsgc3RhcnQ6IHJvdy5zdGFydF90aW1lLCBlbmQ6IHJvdy5lbmRfdGltZSwgbm90ZXM6IHJvdy5ub3RlcyB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHN0YW5kTWFwID0gbmV3IE1hcDxudW1iZXIgfCBzdHJpbmcsIEludGVybmFsU3RhbmQ+KCk7XHJcbiAgc3RhbmRzQXJyLmZvckVhY2gocyA9PiBzdGFuZE1hcC5zZXQocy5pZCwge1xyXG4gICAgaWQ6IHMuaWQsXHJcbiAgICBuYW1lOiBzLm5hbWUsXHJcbiAgICB0ZXN0czogW10sXHJcbiAgICBjaGFuZ2VvdmVyX2hvdXJzOiBzLmNoYW5nZW92ZXJfaG91cnMgPz8gY2hIb3VycyxcclxuICAgIG5vbldvcmtpbmdCbG9ja3M6IHBhcnNlTm9uV29ya2luZ0Jsb2Nrcyhub25Xb3JraW5nQnlTdGFuZC5nZXQocy5pZCkgPz8gW10pLFxyXG4gIH0pKTtcclxuXHJcbiAgY29uc3QgdW5hbGxvY2F0ZWQ6IFRlc3REYXRhW10gPSBbXTtcclxuICB0ZXN0c0Fyci5mb3JFYWNoKCh0OiBhbnkpID0+IHtcclxuICAgIGNvbnN0IHRlc3Q6IFRlc3REYXRhID0ge1xyXG4gICAgICBpZDogdC5pZCxcclxuICAgICAgbmFtZTogdC5uYW1lIHx8ICcnLFxyXG4gICAgICBkdXJhdGlvbjogdC5kdXJhdGlvbiB8fCA3MixcclxuICAgICAgb3duZXI6IHQub3duZXIgfHwgJycsXHJcbiAgICAgIHByaW9yaXR5OiB0LnByaW9yaXR5ID8/IDUwLFxyXG4gICAgICBub3RlczogdC5ub3RlcyB8fCAnJyxcclxuICAgICAgc3RhdHVzOiB0LnN0YXR1cyB8fCAnJyxcclxuICAgICAgdGVzdF9zdGFuZF9pZDogdC50ZXN0X3N0YW5kX2lkLFxyXG4gICAgICBwcmlvcml0eV9vcmRlcjogdC5wcmlvcml0eV9vcmRlcixcclxuICAgICAgYWxsb2NhdGlvbl9pZDogdC5hbGxvY2F0aW9uX2lkLFxyXG4gICAgICBhc3NpZ25lZF9wYXJ0czogdC5hc3NpZ25lZF9wYXJ0cyB8fCBudWxsLFxyXG4gICAgICBwYXJ0X3JlYWR5X2RhdGU6IHQucGFydF9yZWFkeV9kYXRlIHx8IG51bGwsXHJcbiAgICAgIHBhcnRfc3RhdHVzOiB0LnBhcnRfc3RhdHVzIHx8ICcnLFxyXG4gICAgICB0ZXN0X3N0YXJ0ZWRfZGF0ZTogdC50ZXN0X3N0YXJ0ZWRfZGF0ZSB8fCBudWxsLFxyXG4gICAgICAuLi50LFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGVzdC50ZXN0X3N0YW5kX2lkICE9IG51bGwgJiYgc3RhbmRNYXAuaGFzKHRlc3QudGVzdF9zdGFuZF9pZCkpIHtcclxuICAgICAgc3RhbmRNYXAuZ2V0KHRlc3QudGVzdF9zdGFuZF9pZCkhLnRlc3RzLnB1c2godGVzdCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB1bmFsbG9jYXRlZC5wdXNoKHRlc3QpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBzdGFuZE1hcC5mb3JFYWNoKHMgPT4ge1xyXG4gICAgcy50ZXN0cy5zb3J0KChhLCBiKSA9PiAoYS5wcmlvcml0eV9vcmRlciB8fCA5OTkpIC0gKGIucHJpb3JpdHlfb3JkZXIgfHwgOTk5KSk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdGFuZHM6IHN0YW5kc0Fyci5tYXAocyA9PiBzdGFuZE1hcC5nZXQocy5pZCkhKSxcclxuICAgIHVuYWxsb2NhdGVkLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gTWFpbiBDb21wb25lbnRcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmV4cG9ydCBjb25zdCBUZXN0U3RhbmRTY2hlZHVsZXI6IEZDID0gKCkgPT4ge1xyXG4gIC8vIFx1MjUwMFx1MjUwMCBJbnB1dCBkYXRhIGZyb20gUmV0b29sIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFtpbnB1dFRlc3RzXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwidGVzdHNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiVGVzdHMgRGF0YVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2YgdGVzdCBvYmplY3RzIGZyb20gZ2V0U2NoZWR1bGVyRGF0YSBxdWVyeVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaW5wdXRTdGFuZHNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJ0ZXN0U3RhbmRzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIlRlc3QgU3RhbmRzIERhdGFcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIHRlc3Qgc3RhbmQgb2JqZWN0cyBmcm9tIGdldFRlc3RTdGFuZHMgcXVlcnkgKGlkLCBuYW1lLCBjaGFuZ2VvdmVyX2hvdXJzKVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaW5wdXROb25Xb3JraW5nXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwibm9uV29ya2luZ0RhdGFcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiTm9uLVdvcmtpbmcgQmxvY2tzXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiBub24td29ya2luZyBwZXJpb2RzIGZyb20gZ2V0Tm9uV29ya2luZyBxdWVyeSAoaWQsIHRlc3Rfc3RhbmRfaWQsIHN0YXJ0X3RpbWUsIGVuZF90aW1lLCBub3RlcylcIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIENvbmZpZ3VyYXRpb24gcHJvcGVydGllcyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbc2F2ZU1vZGVdID0gUmV0b29sLnVzZVN0YXRlRW51bWVyYXRpb24oe1xyXG4gICAgbmFtZTogXCJzYXZlTW9kZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcImJhdGNoXCIsXHJcbiAgICBlbnVtRGVmaW5pdGlvbjogW1wiYmF0Y2hcIiwgXCJsaXZlXCJdLFxyXG4gICAgaW5zcGVjdG9yOiBcInNlZ21lbnRlZFwiLFxyXG4gICAgbGFiZWw6IFwiU2F2ZSBNb2RlXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJiYXRjaCA9IHNhdmUgYnV0dG9uLCBsaXZlID0gZW1pdCBvbiBldmVyeSBjaGFuZ2VcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2lzU2F2aW5nXSA9IFJldG9vbC51c2VTdGF0ZUJvb2xlYW4oe1xyXG4gICAgbmFtZTogXCJpc1NhdmluZ1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgIGluc3BlY3RvcjogXCJjaGVja2JveFwiLFxyXG4gICAgbGFiZWw6IFwiSXMgU2F2aW5nXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJCaW5kIHRvOiB7eyBzYXZlQWxsb2NhdGlvbnMuaXNGZXRjaGluZyB9fVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaGFzU2F2ZUVycm9yXSA9IFJldG9vbC51c2VTdGF0ZUJvb2xlYW4oe1xyXG4gICAgbmFtZTogXCJoYXNTYXZlRXJyb3JcIixcclxuICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICBpbnNwZWN0b3I6IFwiY2hlY2tib3hcIixcclxuICAgIGxhYmVsOiBcIkhhcyBTYXZlIEVycm9yXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJCaW5kIHRvOiB7eyAhIXNhdmVBbGxvY2F0aW9ucy5lcnJvciB9fVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbc2F2ZWRBdF0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJzYXZlZEF0XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiU2F2ZWQgQXRcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG86IHt7IHNhdmVBbGxvY2F0aW9ucy5sYXN0UnVuQXQgfX1cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2NoYW5nZW92ZXJIb3Vyc10gPSBSZXRvb2wudXNlU3RhdGVOdW1iZXIoe1xyXG4gICAgbmFtZTogXCJjaGFuZ2VvdmVySG91cnNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogMyxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDaGFuZ2VvdmVyIEhvdXJzXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJIb3VycyBmb3IgY2hhbmdlb3ZlciBiZXR3ZWVuIHRlc3RzICh3b3JrIGhvdXJzIG9ubHkpXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFt3b3JrU3RhcnRdID0gUmV0b29sLnVzZVN0YXRlTnVtYmVyKHtcclxuICAgIG5hbWU6IFwid29ya1N0YXJ0XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IDksXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiV29yayBTdGFydCBIb3VyXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFt3b3JrRW5kXSA9IFJldG9vbC51c2VTdGF0ZU51bWJlcih7XHJcbiAgICBuYW1lOiBcIndvcmtFbmRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogMTcsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiV29yayBFbmQgSG91clwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaW5pdGlhbFZpZXdXZWVrc1N0cl0gPSBSZXRvb2wudXNlU3RhdGVFbnVtZXJhdGlvbih7XHJcbiAgICBuYW1lOiBcImRlZmF1bHRWaWV3V2Vla3NcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCI0XCIsXHJcbiAgICBlbnVtRGVmaW5pdGlvbjogW1wiMlwiLCBcIjRcIiwgXCI4XCIsIFwiMTJcIiwgXCIyNFwiXSxcclxuICAgIGluc3BlY3RvcjogXCJzZWdtZW50ZWRcIixcclxuICAgIGxhYmVsOiBcIkRlZmF1bHQgVmlld1wiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGluaXRpYWxWaWV3V2Vla3MgPSBOdW1iZXIoaW5pdGlhbFZpZXdXZWVrc1N0cikgfHwgNDtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIENvbmZpZ3VyYWJsZSBkaXNwbGF5IHRlbXBsYXRlcyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbY2FyZE1haW5UZXh0XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNhcmRNYWluVGV4dFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIntuYW1lfVwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkNhcmQgVGl0bGVcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBsYXRlIGZvciBjYXJkIHRpdGxlLiBVc2Uge2ZpZWxkTmFtZX0gZm9yIGRhdGEgZmllbGRzLlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbY2FyZFN1YlRleHRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY2FyZFN1YlRleHRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJQYXJ0czoge3BhcnRfcmVhZHlfZGF0ZX1cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDYXJkIFN1YnRpdGxlXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3Igc3VidGl0bGUuIEhpZGRlbiB3aGVuIGFsbCBmaWVsZHMgYXJlIGVtcHR5LlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbY2FyZEluZm9Sb3ddID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY2FyZEluZm9Sb3dcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJ7b3duZXJ9IFxcdTAwYjcge2R1cmF0aW9ufWggXFx1MDBiNyBQe3ByaW9yaXR5fVwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkNhcmQgSW5mbyBSb3dcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlRlbXBsYXRlIGZvciB0aGUgaW5mbyByb3cgc2hvd24gb24gY2FyZHMgYW5kIGJhcnMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFt0b29sdGlwVGVtcGxhdGVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwidG9vbHRpcFRlbXBsYXRlXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiTm90ZXM6IHtub3Rlc31cXG5Pd25lcjoge293bmVyfVxcblByaW9yaXR5OiB7cHJpb3JpdHl9XFxuUGFydCBTdGF0dXM6IHtwYXJ0X3N0YXR1c31cXG5QYXJ0cyBEdWU6IHtwYXJ0X3JlYWR5X2RhdGV9XFxuQXNzaWduZWQgUGFydHM6IHthc3NpZ25lZF9wYXJ0c31cXG5UZXN0IFN0YXJ0ZWQ6IHt0ZXN0X3N0YXJ0ZWRfZGF0ZX1cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJUb29sdGlwIFRlbXBsYXRlXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3IgaG92ZXIgdG9vbHRpcC4gVXNlIFxcXFxuIGZvciBuZXdsaW5lcy5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW3N0YXR1c09wdGlvbnNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xuICAgIG5hbWU6IFwic3RhdHVzT3B0aW9uc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXCJOVUxMXCIsIFwiUnVubmluZ1wiLCBcIkNyZWF0ZWRcIiwgXCJUZXN0ZWRcIiwgXCJDYW5jZWxsZWRcIl0sXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiU3RhdHVzIE9wdGlvbnNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJTdGF0dXMgc3RyaW5ncyBzaG93biBpbiB0aGUgcmlnaHQtY2xpY2sgQ2hhbmdlIFN0YXR1cyBtZW51LiAnTlVMTCcgY2xlYXJzIHRoZSBzdGF0dXMuXCIsXG4gIH0pO1xuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFRoZW1lIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFthcHBUaGVtZV0gPSBSZXRvb2wudXNlU3RhdGVPYmplY3Qoe1xyXG4gICAgbmFtZTogXCJhcHBUaGVtZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiB7fSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJBcHAgVGhlbWVcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG8ge3sgdGhlbWUgfX0gdG8gaW5oZXJpdCBhcHAgY29sb3VycywgZm9udHMsIGFuZCBib3JkZXIgcmFkaXVzXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIE9wdGlvbmFsIHN0YXR1cyBjb2xvdXIgb3ZlcnJpZGVzIChsZWF2ZSBibGFuayB0byB1c2UgZGVmYXVsdHMpXHJcbiAgY29uc3QgW2NvbG9yUnVubmluZ10gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjb2xvclJ1bm5pbmdcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJSdW5uaW5nIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgUnVubmluZyBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjOTMzM0VBKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JSZWFkeV0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjb2xvclJlYWR5XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiUmVhZHkgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBSZWFkeSBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjMjJDNTVFKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JPblRpbWVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JPblRpbWVcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJPbiBUaW1lIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgT24gVGltZSBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjRTVBMDBEKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JEZWxheWVkXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNvbG9yRGVsYXllZFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkRlbGF5ZWQgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBEZWxheWVkIHN0YXR1cy4gTGVhdmUgYmxhbmsgdG8gdXNlIGRlZmF1bHQgKCNFRjQ0NDQpLlwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IFtjb2xvclBhcnRzTm90QXNzaWduZWRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JQYXJ0c05vdEFzc2lnbmVkXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiUGFydHMgTm90IEFzc2lnbmVkIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgUGFydHMgTm90IEFzc2lnbmVkIHN0YXR1cy4gTGVhdmUgYmxhbmsgdG8gdXNlIGRlZmF1bHQgKCM5Q0EzQUYpLlwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IFtjb2xvckluUHJvZ3Jlc3NdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JJblByb2dyZXNzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiSW4gUHJvZ3Jlc3MgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBJbiBQcm9ncmVzcyBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjRTVBMDBEKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbbW9ub0ZvbnRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwibW9ub0ZvbnRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJNb25vc3BhY2UgRm9udFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiRm9udCB1c2VkIGZvciBsYWJlbHMsIGJhZGdlcywgYW5kIHN0YXRzLiBMZWF2ZSBibGFuayB0byBpbmhlcml0IHRoZSBhcHAgdGhlbWUgZm9udC5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEJ1aWxkIHRoZW1lIHRva2VucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB0aGVtZSA9IHVzZU1lbW8oKCk6IFRoZW1lVG9rZW5zID0+IHtcclxuICAgIGNvbnN0IHN0YXR1c092ZXJyaWRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gICAgaWYgKGNvbG9yUnVubmluZykgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snUnVubmluZyddICAgICAgICAgICAgPSBjb2xvclJ1bm5pbmcgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yUmVhZHkpICAgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snUmVhZHknXSAgICAgICAgICAgICAgPSBjb2xvclJlYWR5IGFzIHN0cmluZztcclxuICAgIGlmIChjb2xvck9uVGltZSkgICAgICAgICAgICBzdGF0dXNPdmVycmlkZXNbJ09uIFRpbWUnXSAgICAgICAgICAgID0gY29sb3JPblRpbWUgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yRGVsYXllZCkgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snRGVsYXllZCddICAgICAgICAgICAgPSBjb2xvckRlbGF5ZWQgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yUGFydHNOb3RBc3NpZ25lZCkgIHN0YXR1c092ZXJyaWRlc1snUGFydHMgTm90IEFzc2lnbmVkJ10gPSBjb2xvclBhcnRzTm90QXNzaWduZWQgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9ySW5Qcm9ncmVzcykgICAgICAgIHN0YXR1c092ZXJyaWRlc1snSW4gUHJvZ3Jlc3MnXSAgICAgICAgPSBjb2xvckluUHJvZ3Jlc3MgYXMgc3RyaW5nO1xyXG4gICAgcmV0dXJuIGJ1aWxkVGhlbWUoYXBwVGhlbWUsIHN0YXR1c092ZXJyaWRlcywgbW9ub0ZvbnQgYXMgc3RyaW5nIHx8IHVuZGVmaW5lZCk7XHJcbiAgfSwgW2FwcFRoZW1lLCBjb2xvclJ1bm5pbmcsIGNvbG9yUmVhZHksIGNvbG9yT25UaW1lLCBjb2xvckRlbGF5ZWQsIGNvbG9yUGFydHNOb3RBc3NpZ25lZCwgY29sb3JJblByb2dyZXNzLCBtb25vRm9udF0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgT3V0cHV0IHN0YXRlIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFssIHNldEFsbG9jYXRpb25zXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwiYWxsb2NhdGlvbnNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJDdXJyZW50IGFsbG9jYXRpb24gc3RhdGU6IFt7dGVzdF9pZCwgdGVzdF9zdGFuZF9pZCwgcHJpb3JpdHlfb3JkZXJ9XVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRBbGxUZXN0SWRzXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwiYWxsVGVzdElkc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0ZXN0IElEcyBtYW5hZ2VkIGJ5IHRoZSBzY2hlZHVsZXIgKGZvciB0aGUgZGVsZXRlIHN0ZXAgaW4gc2F2ZSlcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0SGFzVW5zYXZlZENoYW5nZXNdID0gUmV0b29sLnVzZVN0YXRlQm9vbGVhbih7XHJcbiAgICBuYW1lOiBcImhhc1Vuc2F2ZWRDaGFuZ2VzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiV2hldGhlciB0aGVyZSBhcmUgdW5zYXZlZCBhbGxvY2F0aW9uIGNoYW5nZXNcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0SWRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwic2VsZWN0ZWRUZXN0SWRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIklEIG9mIHRlc3QgYWN0aW9uZWQgdmlhIHJpZ2h0LWNsaWNrIG1lbnUgKHNldCBiZWZvcmUgZXZlbnRzIGZpcmUpXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldFNlbGVjdGVkVGVzdFByaW9yaXR5XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdFByaW9yaXR5XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJOZXcgcHJpb3JpdHkgdmFsdWUgZnJvbSBDaGFuZ2UgUHJpb3JpdHkgYWN0aW9uIChudW1lcmljIHN0cmluZylcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0U3RhcnREYXRlXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdFN0YXJ0RGF0ZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTmV3IHN0YXJ0IGRhdGUgZnJvbSBDaGFuZ2UgU3RhcnQgRGF0ZSBhY3Rpb24gKElTTyBkYXRlIHN0cmluZyBZWVlZLU1NLUREKS4gT25seSBzZXQgZm9yIFJ1bm5pbmcgdGVzdHMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldFNlbGVjdGVkVGVzdEVuZERhdGVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwic2VsZWN0ZWRUZXN0RW5kRGF0ZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTmV3IGVuZCBkYXRlIGZyb20gQ2hhbmdlIEVuZCBEYXRlIGFjdGlvbiAoSVNPIGRhdGUgc3RyaW5nIFlZWVktTU0tREQpLiBPbmx5IHNldCBmb3IgUnVubmluZyB0ZXN0cy5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0U3RhdHVzXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdFN0YXR1c1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTmV3IHN0YXR1cyBmcm9tIENoYW5nZSBTdGF0dXMgYWN0aW9uLiBFbXB0eSBzdHJpbmcgPSBOVUxMIGluIERCLlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRQbGFubmVkRGF0ZXNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJwbGFubmVkRGF0ZXNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiB7dGVzdF9pZCwgcGxhbm5lZF9kYXRlfSBmb3IgYWxsIHN0YW5kLXNjaGVkdWxlZCB0ZXN0cy4gVXNlIHdpdGggc2F2ZVBsYW5uZWREYXRlcyBxdWVyeS5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEV2ZW50cyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBvblNhdmUgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25TYXZlXCIgfSk7XHJcbiAgY29uc3Qgb25DaGFuZ2UgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25DaGFuZ2VcIiB9KTtcclxuICBjb25zdCBvblJldHJ5ID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uUmV0cnlcIiB9KTtcclxuICBjb25zdCBvbkNoYW5nZVByaW9yaXR5ID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlUHJpb3JpdHlcIiB9KTtcclxuICBjb25zdCBvbkNoYW5nZVN0YXR1cyA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvbkNoYW5nZVN0YXR1c1wiIH0pO1xyXG4gIGNvbnN0IG9uQ2hhbmdlU3RhcnREYXRlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlU3RhcnREYXRlXCIgfSk7XHJcbiAgY29uc3Qgb25DaGFuZ2VFbmREYXRlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlRW5kRGF0ZVwiIH0pO1xyXG4gIGNvbnN0IG9uRWRpdFRlc3QgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25FZGl0VGVzdFwiIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQ29tcG9uZW50IHNldHRpbmdzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIFJldG9vbC51c2VDb21wb25lbnRTZXR0aW5ncyh7XHJcbiAgICBkZWZhdWx0SGVpZ2h0OiA2MDAsXHJcbiAgICBkZWZhdWx0V2lkdGg6IDEyLFxyXG4gIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgSW50ZXJuYWwgc3RhdGUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW3N0YW5kcywgc2V0U3RhbmRzXSA9IFJlYWN0LnVzZVN0YXRlPEludGVybmFsU3RhbmRbXT4oW10pO1xyXG4gIGNvbnN0IFt1bmFsbG9jYXRlZCwgc2V0VW5hbGxvY2F0ZWRdID0gUmVhY3QudXNlU3RhdGU8VGVzdERhdGFbXT4oW10pO1xyXG4gIGNvbnN0IFt2aWV3cG9ydFdlZWtzLCBzZXRWaWV3cG9ydFdlZWtzXSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oaW5pdGlhbFZpZXdXZWVrcyB8fCA0KTtcclxuICBjb25zdCB1c2VyQ2hhbmdlZFZpZXdwb3J0ID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgd2Vla3MgPSBOdW1iZXIoaW5pdGlhbFZpZXdXZWVrc1N0cik7XHJcbiAgICBpZiAod2Vla3MgJiYgIXVzZXJDaGFuZ2VkVmlld3BvcnQuY3VycmVudCkgc2V0Vmlld3BvcnRXZWVrcyh3ZWVrcyk7XHJcbiAgfSwgW2luaXRpYWxWaWV3V2Vla3NTdHJdKTtcclxuICBjb25zdCBbZHJhZ2dlZFRlc3RJZCwgc2V0RHJhZ2dlZFRlc3RJZF0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmcgfCBudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaW5zZXJ0SW5kaWNhdG9yLCBzZXRJbnNlcnRJbmRpY2F0b3JdID0gUmVhY3QudXNlU3RhdGU8SW5zZXJ0SW5kaWNhdG9yIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3F1ZXVlSW5zZXJ0SW5kZXgsIHNldFF1ZXVlSW5zZXJ0SW5kZXhdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2lzRGlydHksIHNldElzRGlydHldID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwZW5kaW5nU2F2ZSwgc2V0UGVuZGluZ1NhdmVdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzYXZlRXJyb3IsIHNldFNhdmVFcnJvcl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3BvcG92ZXIsIHNldFBvcG92ZXJdID0gUmVhY3QudXNlU3RhdGU8UG9wb3ZlclN0YXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3ByaW9yaXR5SW5wdXRWYWx1ZSwgc2V0UHJpb3JpdHlJbnB1dFZhbHVlXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbc3RhcnREYXRlSW5wdXRWYWx1ZSwgc2V0U3RhcnREYXRlSW5wdXRWYWx1ZV0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW2VuZERhdGVJbnB1dFZhbHVlLCBzZXRFbmREYXRlSW5wdXRWYWx1ZV0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW3BlbmRpbmdTdGF0dXNDaGFuZ2UsIHNldFBlbmRpbmdTdGF0dXNDaGFuZ2VdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBvcG92ZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBpc0xvY2tlZCA9IHBlbmRpbmdTYXZlIHx8IChpc1NhdmluZyBhcyBib29sZWFuKSB8fCBzYXZlRXJyb3I7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzU2F2aW5nIGFzIGJvb2xlYW4pIHtcclxuICAgICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpOyAvLyBSZXRvb2wgaGFzIHBpY2tlZCB1cCB0aGUgc2F2ZTsgZHJvcCBvdXIgbG9jYWwgcGVuZGluZyBmbGFnXHJcbiAgICB9XHJcbiAgICBpZiAoaGFzU2F2ZUVycm9yIGFzIGJvb2xlYW4pIHtcclxuICAgICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpO1xyXG4gICAgICBzZXRTYXZlRXJyb3IodHJ1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKCEoaXNTYXZpbmcgYXMgYm9vbGVhbikpIHtcclxuICAgICAgLy8gTm90IHNhdmluZyBhbmQgbm8gZXJyb3IgPSBpZGxlOyBjbGVhciBlcnJvciAoY292ZXJzIHJlY292ZXJ5IGFmdGVyIHJldHJ5KVxyXG4gICAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtpc1NhdmluZywgaGFzU2F2ZUVycm9yXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBvcG92ZXIpIHJldHVybjtcclxuICAgIGNvbnN0IG9uTW91c2VEb3duID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudCAmJiAhcG9wb3ZlclJlZi5jdXJyZW50LmNvbnRhaW5zKGUudGFyZ2V0IGFzIE5vZGUpKVxyXG4gICAgICAgIHNldFBvcG92ZXIobnVsbCk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25LZXlEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHsgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgc2V0UG9wb3ZlcihudWxsKTsgfTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcclxuICAgIH07XHJcbiAgfSwgW3BvcG92ZXJdKTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxBbGxvY2F0aW9uc1JlZiA9IHVzZVJlZjxzdHJpbmc+KCcnKTtcclxuICBjb25zdCBwcmV2U2F2ZWRBdFJlZiA9IFJlYWN0LnVzZVJlZjxzdHJpbmc+KFwiXCIpO1xyXG4gIGNvbnN0IHNjcm9sbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbCA9IHNjcm9sbFJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgY29uc3Qgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZW50cmllcyA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xyXG4gICAgICAgIHNldENvbnRhaW5lcldpZHRoKGVudHJ5LmNvbnRlbnRSZWN0LndpZHRoIHx8IDgwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcm8ub2JzZXJ2ZShlbCk7XHJcbiAgICByZXR1cm4gKCkgPT4gcm8uZGlzY29ubmVjdCgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gT3B0aW1pc3RpYyBzYXZlOiB3aGVuIHNhdmVkQXQgY2hhbmdlcyB0aGUgREIgd3JpdGUgc3VjY2VlZGVkIFx1MjAxNCBzbmFwc2hvdCB0aGVcclxuICAvLyBjdXJyZW50IHN0YXRlIGFzIHRoZSBuZXcgYmFzZWxpbmUgd2l0aG91dCB3YWl0aW5nIGZvciBhIGdldFNjaGVkdWxlckRhdGEgcmUtZmV0Y2guXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHRzID0gc2F2ZWRBdCBhcyBzdHJpbmc7XHJcbiAgICBpZiAoIXRzIHx8IHRzID09PSBwcmV2U2F2ZWRBdFJlZi5jdXJyZW50KSByZXR1cm47IC8vIHNraXAgaW5pdGlhbCBtb3VudCArIGR1cGxpY2F0ZXNcclxuICAgIHByZXZTYXZlZEF0UmVmLmN1cnJlbnQgPSB0cztcclxuICAgIC8vIFNuYXBzaG90IGN1cnJlbnQgYWxsb2NhdGlvbnMgYXMgdGhlIG5ldyBcIm9yaWdpbmFsXCIgc28gZGlydHktY2hlY2sgcmVzZXRzIGNvcnJlY3RseVxyXG4gICAgY29uc3QgY3VycmVudEFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMoc3RhbmRzKTtcclxuICAgIG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudCA9IGFsbG9jYXRpb25zS2V5KGN1cnJlbnRBbGxvY3MpO1xyXG4gICAgc2V0SXNEaXJ0eShmYWxzZSk7XHJcbiAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7XHJcbiAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gIH0sIFtzYXZlZEF0LCBzdGFuZHNdKTtcclxuICBjb25zdCBbY29udGFpbmVyV2lkdGgsIHNldENvbnRhaW5lcldpZHRoXSA9IFJlYWN0LnVzZVN0YXRlKDgwMCk7XHJcbiAgY29uc3QgW3F1ZXVlU29ydCwgc2V0UXVldWVTb3J0XSA9IFJlYWN0LnVzZVN0YXRlPCdheicgfCAncHJpb3JpdHknIHwgJ3N0YXR1cyc+KCdheicpO1xyXG4gIGNvbnN0IFtxdWV1ZUZpbHRlciwgc2V0UXVldWVGaWx0ZXJdID0gUmVhY3QudXNlU3RhdGUoJycpO1xyXG5cclxuICBjb25zdCBzdGF0dXNPcHRpb25zTGlzdCA9IHVzZU1lbW88c3RyaW5nW10+KCgpID0+IHtcclxuICAgIGNvbnN0IGFyciA9IEFycmF5LmlzQXJyYXkoc3RhdHVzT3B0aW9ucykgPyBzdGF0dXNPcHRpb25zIGFzIGFueVtdIDogW107XHJcbiAgICByZXR1cm4gYXJyLmxlbmd0aCA+IDAgPyBhcnIubWFwKFN0cmluZykgOiBbXCJOVUxMXCIsIFwiUnVubmluZ1wiLCBcIkNyZWF0ZWRcIiwgXCJUZXN0ZWRcIiwgXCJDYW5jZWxsZWRcIl07XHJcbiAgfSwgW3N0YXR1c09wdGlvbnNdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEluaXRpYWxpemUgZnJvbSBpbnB1dCBkYXRhIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGlucHV0S2V5ID0gdXNlTWVtbyhcclxuICAgICgpID0+IEpTT04uc3RyaW5naWZ5KGlucHV0VGVzdHMpICsgSlNPTi5zdHJpbmdpZnkoaW5wdXRTdGFuZHMpICsgSlNPTi5zdHJpbmdpZnkoaW5wdXROb25Xb3JraW5nKSxcclxuICAgIFtpbnB1dFRlc3RzLCBpbnB1dFN0YW5kcywgaW5wdXROb25Xb3JraW5nXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB0ZXN0c0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRUZXN0cykgPyBpbnB1dFRlc3RzIDogW107XHJcbiAgICBjb25zdCBzdGFuZHNBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0U3RhbmRzKSA/IChpbnB1dFN0YW5kcyBhcyBTdGFuZERlZltdKSA6IFtdO1xyXG4gICAgY29uc3Qgbm9uV29ya2luZ0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXROb25Xb3JraW5nKSA/IGlucHV0Tm9uV29ya2luZyA6IFtdO1xyXG5cclxuICAgIGlmIChzdGFuZHNBcnIubGVuZ3RoID09PSAwICYmIHRlc3RzQXJyLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgc3RhbmRzOiBuZXdTdGFuZHMsIHVuYWxsb2NhdGVkOiB1bmFsbG9jIH0gPSBwYXJzZVN0YW5kcyh0ZXN0c0Fyciwgc3RhbmRzQXJyLCBjaEhvdXJzLCBub25Xb3JraW5nQXJyKTtcclxuICAgIHNldFN0YW5kcyhuZXdTdGFuZHMpO1xyXG4gICAgc2V0VW5hbGxvY2F0ZWQodW5hbGxvYyk7XHJcbiAgICBzZXRJc0RpcnR5KGZhbHNlKTtcclxuXHJcbiAgICAvLyBTbmFwc2hvdCB0aGUgaW5pdGlhbCBhbGxvY2F0aW9uc1xyXG4gICAgY29uc3QgaW5pdGlhbEFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKTtcclxuICAgIG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudCA9IGFsbG9jYXRpb25zS2V5KGluaXRpYWxBbGxvY3MpO1xyXG5cclxuICAgIC8vIFNldCBvdXRwdXQgc3RhdGVcclxuICAgIHNldEFsbG9jYXRpb25zKGluaXRpYWxBbGxvY3MpO1xyXG4gICAgc2V0QWxsVGVzdElkcyh0ZXN0c0Fyci5tYXAoKHQ6IGFueSkgPT4gdC5pZCkpO1xyXG4gICAgc2V0SGFzVW5zYXZlZENoYW5nZXMoZmFsc2UpO1xyXG5cclxuICAgIC8vIENsZWFyIHNhdmUgbG9jayBcdTIwMTQgbmV3IGRhdGEgYXJyaXZpbmcgZnJvbSBSZXRvb2wgbWVhbnMgdGhlIHNhdmUgcm91bmQtdHJpcCBjb21wbGV0ZWQuXHJcbiAgICAvLyBUaGlzIGlzIG1vcmUgcmVsaWFibGUgdGhhbiB3YWl0aW5nIGZvciB0aGUgc2F2ZVN0YXRlIGJpbmRpbmcgdG8gdHJhbnNpdGlvbiB0aHJvdWdoXHJcbiAgICAvLyAnc2F2aW5nJyBcdTIxOTIgJ2lkbGUnLCB3aGljaCBSZXRvb2wgY2FuIGJhdGNoIGF3YXkgc28gdGhlIHVzZUVmZmVjdCBuZXZlciBmaXJlcy5cclxuICAgIHNldFBlbmRpbmdTYXZlKGZhbHNlKTtcclxuICAgIHNldFNhdmVFcnJvcihmYWxzZSk7XHJcbiAgfSwgW2lucHV0S2V5XSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBTY2hlZHVsaW5nIGNvbmZpZyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBjaEhvdXJzID0gKGNoYW5nZW92ZXJIb3VycyBhcyBudW1iZXIpIHx8IDM7XHJcbiAgY29uc3Qgd1N0YXJ0ID0gKHdvcmtTdGFydCBhcyBudW1iZXIpIHx8IDk7XHJcbiAgY29uc3Qgd0VuZCA9ICh3b3JrRW5kIGFzIG51bWJlcikgfHwgMTc7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBWaWV3IGNvbXB1dGF0aW9ucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB2aWV3U3RhcnQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZC5zZXRIb3VycygwLCAwLCAwLCAwKTtcclxuICAgIHdoaWxlIChkLmdldERheSgpICE9PSAxKSBkLnNldERhdGUoZC5nZXREYXRlKCkgLSAxKTtcclxuICAgIHJldHVybiBkO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFNjaGVkdWxlIGNvbXB1dGF0aW9uIChtdXN0IGJlIGRlZmluZWQgYmVmb3JlIHRpbWVsaW5lRW5kKSBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBjb21wdXRlU2NoZWR1bGUgPSB1c2VDYWxsYmFjaygodGVzdHM6IFRlc3REYXRhW10sIHN0YW5kQ2hhbmdlb3ZlcjogbnVtYmVyLCBub25Xb3JraW5nQmxvY2tzOiBOb25Xb3JraW5nQmxvY2tbXSk6IFNjaGVkdWxlZFRlc3RbXSA9PiB7XHJcbiAgICBjb25zdCBydW5uaW5nVGVzdHMgPSB0ZXN0cy5maWx0ZXIodCA9PiBpc1J1bm5pbmdUZXN0KHQpKTtcclxuICAgIGNvbnN0IHF1ZXVlZFRlc3RzID0gdGVzdHMuZmlsdGVyKHQgPT4gIWlzUnVubmluZ1Rlc3QodCkpO1xyXG5cclxuICAgIC8vIFNvcnQgUnVubmluZyB0ZXN0cyBieSBhY3R1YWwgc3RhcnQgZGF0ZSwgdGhlbiBwcmlvcml0eSBkZXNjIGZvciB0aWVzXHJcbiAgICBjb25zdCBzb3J0ZWRSdW5uaW5nID0gWy4uLnJ1bm5pbmdUZXN0c10uc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCBkYXRlQSA9IHBhcnNlTG9jYWxEYXRlKGEudGVzdF9zdGFydGVkX2RhdGUpIHx8IG5ldyBEYXRlKCk7XHJcbiAgICAgIGNvbnN0IGRhdGVCID0gcGFyc2VMb2NhbERhdGUoYi50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgbmV3IERhdGUoKTtcclxuICAgICAgaWYgKGRhdGVBLmdldFRpbWUoKSAhPT0gZGF0ZUIuZ2V0VGltZSgpKSByZXR1cm4gZGF0ZUEuZ2V0VGltZSgpIC0gZGF0ZUIuZ2V0VGltZSgpO1xyXG4gICAgICByZXR1cm4gKGIucHJpb3JpdHkgPz8gNTApIC0gKGEucHJpb3JpdHkgPz8gNTApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUnVubmluZyB0ZXN0cyB1c2UgdGhlaXIgYWN0dWFsIHRlc3Rfc3RhcnRlZF9kYXRlLiBPbmx5IGxhdGVyIFJ1bm5pbmcgdGVzdHMgYXJlXG4gICAgLy8gcHVzaGVkIGZvcndhcmQgdG8gYXZvaWQgb3ZlcmxhcDsgdGhlIGZpcnN0IG9uZSBzaG91bGQgbm90IGJlIGNsYW1wZWQgdG8gdmlld1N0YXJ0LlxuICAgIGxldCBsYXN0UnVubmluZ0VuZDogRGF0ZSB8IG51bGwgPSBudWxsO1xuICAgIGNvbnN0IHJ1bm5pbmdTY2hlZHVsZWQgPSBzb3J0ZWRSdW5uaW5nLm1hcCh0ZXN0ID0+IHtcbiAgICAgIGNvbnN0IHRlc3REYXRlID0gcGFyc2VMb2NhbERhdGUodGVzdC50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgbmV3IERhdGUodmlld1N0YXJ0KTtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gbGFzdFJ1bm5pbmdFbmQgJiYgdGVzdERhdGUgPCBsYXN0UnVubmluZ0VuZCA/IG5ldyBEYXRlKGxhc3RSdW5uaW5nRW5kKSA6IG5ldyBEYXRlKHRlc3REYXRlKTtcbiAgICAgIGNvbnN0IGR1cmF0aW9uRW5kID0gbmV3IERhdGUoc3RhcnQuZ2V0VGltZSgpICsgdGVzdC5kdXJhdGlvbiAqIE1TX1BFUl9IT1VSKTtcbiAgICAgIGNvbnN0IGVuZCA9IGR1cmF0aW9uRW5kIDwgbmV3IERhdGUoKSA/IG5ldyBEYXRlKCkgOiBkdXJhdGlvbkVuZDtcbiAgICAgIGxhc3RSdW5uaW5nRW5kID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChlbmQsIHN0YW5kQ2hhbmdlb3Zlciwgd1N0YXJ0LCB3RW5kKTtcbiAgICAgIHJldHVybiB7IC4uLnRlc3QsIHN0YXJ0LCBlbmQgfTtcbiAgICB9KTtcblxyXG4gICAgLy8gUXVldWVkIHRlc3RzIHN0YXJ0IGFmdGVyIGxhc3QgUnVubmluZyB0ZXN0J3MgY2hhbmdlb3ZlciAob3Igbm93K2NoYW5nZW92ZXIsIHdoaWNoZXZlciBpcyBsYXRlcikuXHJcbiAgICAvLyBXZSBuZXZlciBzY2hlZHVsZSBhIHBsYW5uZWQgdGVzdCB0byBzdGFydCBpbiB0aGUgcGFzdC5cclxuICAgIC8vIGZpbmRWYWxpZFN0YXJ0IHB1c2hlcyB0aGUgc3RhcnQgZm9yd2FyZCB1bnRpbCB0aGUgZnVsbCBbc3RhcnQsIHN0YXJ0K2R1cmF0aW9uKSB3aW5kb3dcclxuICAgIC8vIGRvZXNuJ3Qgb3ZlcmxhcCBhbnkgbm9uLXdvcmtpbmcgYmxvY2sgKGNvdmVycyBib3RoIHN0YXJ0LWluc2lkZSBhbmQgZW5kLWluc2lkZSBjYXNlcykuXHJcbiAgICBjb25zdCBub3dQbHVzQ2hhbmdlb3ZlciA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQobmV3IERhdGUoKSwgc3RhbmRDaGFuZ2VvdmVyLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgbGV0IGN1cnJlbnRFbmQgPSBuZXcgRGF0ZShNYXRoLm1heCgobGFzdFJ1bm5pbmdFbmQgPz8gdmlld1N0YXJ0KS5nZXRUaW1lKCksIG5vd1BsdXNDaGFuZ2VvdmVyLmdldFRpbWUoKSkpO1xuICAgIGNvbnN0IHF1ZXVlZFNjaGVkdWxlZCA9IHF1ZXVlZFRlc3RzLm1hcCh0ZXN0ID0+IHtcclxuICAgICAgY29uc3Qgc3RhcnQgPSBmaW5kVmFsaWRTdGFydChuZXcgRGF0ZShjdXJyZW50RW5kKSwgdGVzdC5kdXJhdGlvbiwgbm9uV29ya2luZ0Jsb2Nrcyk7XHJcbiAgICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHN0YXJ0LmdldFRpbWUoKSArIHRlc3QuZHVyYXRpb24gKiBNU19QRVJfSE9VUik7XHJcbiAgICAgIGN1cnJlbnRFbmQgPSBhZHZhbmNlUGFzdE5vbldvcmtpbmcoXHJcbiAgICAgICAgY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChlbmQsIHN0YW5kQ2hhbmdlb3Zlciwgd1N0YXJ0LCB3RW5kKSxcclxuICAgICAgICBub25Xb3JraW5nQmxvY2tzXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiB7IC4uLnRlc3QsIHN0YXJ0LCBlbmQgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBbLi4ucnVubmluZ1NjaGVkdWxlZCwgLi4ucXVldWVkU2NoZWR1bGVkXTtcclxuICB9LCBbdmlld1N0YXJ0LCB3U3RhcnQsIHdFbmRdKTtcclxuXHJcbiAgY29uc3Qgc3RhbmRTY2hlZHVsZXMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gbmV3IE1hcChzdGFuZHMubWFwKHMgPT4gW3MuaWQsIGNvbXB1dGVTY2hlZHVsZShzLnRlc3RzLCBzLmNoYW5nZW92ZXJfaG91cnMsIHMubm9uV29ya2luZ0Jsb2NrcyldKSksXHJcbiAgICBbc3RhbmRzLCBjb21wdXRlU2NoZWR1bGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdGltZWxpbmVFbmQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGxldCBsYXRlc3RFbmQgPSBuZXcgRGF0ZSh2aWV3U3RhcnQpO1xyXG4gICAgbGF0ZXN0RW5kLnNldERhdGUobGF0ZXN0RW5kLmdldERhdGUoKSArIHZpZXdwb3J0V2Vla3MgKiA3KTtcclxuXHJcbiAgICBzdGFuZHMuZm9yRWFjaChzdGFuZCA9PiB7XHJcbiAgICAgIGNvbnN0IHNjaGVkdWxlID0gc3RhbmRTY2hlZHVsZXMuZ2V0KHN0YW5kLmlkKSA/PyBbXTtcclxuICAgICAgaWYgKHNjaGVkdWxlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBsYXN0ID0gc2NoZWR1bGVbc2NoZWR1bGUubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgY29uc3QgY2hhbmdlb3ZlckVuZCA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQobGFzdC5lbmQsIHN0YW5kLmNoYW5nZW92ZXJfaG91cnMsIHdTdGFydCwgd0VuZCk7XHJcbiAgICAgICAgaWYgKGNoYW5nZW92ZXJFbmQgPiBsYXRlc3RFbmQpIGxhdGVzdEVuZCA9IGNoYW5nZW92ZXJFbmQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxhdGVzdEVuZC5zZXREYXRlKGxhdGVzdEVuZC5nZXREYXRlKCkgKyA3KTtcclxuICAgIHJldHVybiBsYXRlc3RFbmQ7XHJcbiAgfSwgW3N0YW5kU2NoZWR1bGVzLCBzdGFuZHMsIHZpZXdTdGFydCwgdmlld3BvcnRXZWVrcywgd1N0YXJ0LCB3RW5kXSk7XHJcblxyXG4gIGNvbnN0IHRvdGFsRGF5cyA9IHVzZU1lbW8oKCkgPT4gTWF0aC5jZWlsKGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIHRpbWVsaW5lRW5kKSAvIDI0KSwgW3ZpZXdTdGFydCwgdGltZWxpbmVFbmRdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFBsYW5uZWQgZGF0ZXMgZm9yIHNjaGVkdWxlZCB0ZXN0cyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBzY2hlZHVsZWRQbGFubmVkRGF0ZXMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdDogQXJyYXk8eyB0ZXN0X2lkOiBudW1iZXIgfCBzdHJpbmc7IHBsYW5uZWRfZGF0ZTogc3RyaW5nIH0+ID0gW107XHJcbiAgICBzdGFuZHMuZm9yRWFjaChzdGFuZCA9PiB7XHJcbiAgICAgIGNvbnN0IHNjaGVkdWxlID0gc3RhbmRTY2hlZHVsZXMuZ2V0KHN0YW5kLmlkKSA/PyBbXTtcclxuICAgICAgc2NoZWR1bGUuZm9yRWFjaChzdCA9PiB7XHJcbiAgICAgICAgY29uc3QgZCA9IHN0LnN0YXJ0O1xyXG4gICAgICAgIGNvbnN0IGRhdGVTdHIgPSBgJHtkLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyl9LSR7U3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpfWA7XHJcbiAgICAgICAgcmVzdWx0LnB1c2goeyB0ZXN0X2lkOiBzdC5pZCwgcGxhbm5lZF9kYXRlOiBkYXRlU3RyIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9LCBbc3RhbmRzLCBzdGFuZFNjaGVkdWxlc10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0UGxhbm5lZERhdGVzKHNjaGVkdWxlZFBsYW5uZWREYXRlcyk7XHJcbiAgfSwgW3NjaGVkdWxlZFBsYW5uZWREYXRlc10pO1xyXG5cclxuICBjb25zdCBweFBlckhvdXIgPSBjb250YWluZXJXaWR0aCAvICh2aWV3cG9ydFdlZWtzICogNyAqIDI0KTtcclxuICBjb25zdCBkYXlzID0gdXNlTWVtbygoKSA9PiBnZW5lcmF0ZURheXModmlld1N0YXJ0LCB0b3RhbERheXMpLCBbdmlld1N0YXJ0LCB0b3RhbERheXNdKTtcclxuICBjb25zdCB3ZWVrcyA9IHVzZU1lbW8oKCkgPT4gZ2VuZXJhdGVXZWVrcyh2aWV3U3RhcnQsIHRvdGFsRGF5cyksIFt2aWV3U3RhcnQsIHRvdGFsRGF5c10pO1xyXG4gIGNvbnN0IHRvdGFsV2lkdGggPSB0b3RhbERheXMgKiAyNCAqIHB4UGVySG91cjtcclxuICBjb25zdCBkYXlXaWR0aCA9IDI0ICogcHhQZXJIb3VyO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQWZ0ZXItY2hhbmdlIGhhbmRsZXIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgYWZ0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjaygobmV3U3RhbmRzOiBJbnRlcm5hbFN0YW5kW10pID0+IHtcclxuICAgIGNvbnN0IGFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKTtcclxuICAgIGNvbnN0IGRpcnR5ID0gYWxsb2NhdGlvbnNLZXkoYWxsb2NzKSAhPT0gb3JpZ2luYWxBbGxvY2F0aW9uc1JlZi5jdXJyZW50O1xyXG4gICAgc2V0SXNEaXJ0eShkaXJ0eSk7XHJcbiAgICBzZXRBbGxvY2F0aW9ucyhhbGxvY3MpO1xyXG4gICAgc2V0SGFzVW5zYXZlZENoYW5nZXMoZGlydHkpO1xyXG5cclxuICAgIGlmICgoc2F2ZU1vZGUgYXMgc3RyaW5nKSA9PT0gJ2xpdmUnKSB7XHJcbiAgICAgIHNldFBlbmRpbmdTYXZlKHRydWUpO1xyXG4gICAgICBvbkNoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH0sIFtzYXZlTW9kZSwgc2V0QWxsb2NhdGlvbnMsIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzLCBvbkNoYW5nZV0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgRHJhZyBhbmQgZHJvcCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBmaW5kVGVzdCA9IHVzZUNhbGxiYWNrKCh0ZXN0SWQ6IHN0cmluZyB8IG51bWJlcik6IFRlc3REYXRhIHwgbnVsbCA9PiB7XHJcbiAgICBjb25zdCBxID0gdW5hbGxvY2F0ZWQuZmluZCh0ID0+IHQuaWQgPT09IHRlc3RJZCk7XHJcbiAgICBpZiAocSkgcmV0dXJuIHE7XHJcbiAgICBmb3IgKGNvbnN0IHMgb2Ygc3RhbmRzKSB7XHJcbiAgICAgIGNvbnN0IHQgPSBzLnRlc3RzLmZpbmQodCA9PiB0LmlkID09PSB0ZXN0SWQpO1xyXG4gICAgICBpZiAodCkgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9LCBbdW5hbGxvY2F0ZWQsIHN0YW5kc10pO1xyXG5cclxuICBjb25zdCBjbGVhckRyYWcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXREcmFnZ2VkVGVzdElkKG51bGwpO1xyXG4gICAgc2V0SW5zZXJ0SW5kaWNhdG9yKG51bGwpO1xyXG4gICAgc2V0UXVldWVJbnNlcnRJbmRleChudWxsKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGRyb3BPblN0YW5kID0gdXNlQ2FsbGJhY2soKHN0YW5kSWQ6IHN0cmluZyB8IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgaWYgKCFkcmFnZ2VkVGVzdElkKSByZXR1cm47XHJcbiAgICBjb25zdCB0ZXN0ID0gZmluZFRlc3QoZHJhZ2dlZFRlc3RJZCk7XHJcbiAgICBpZiAoIXRlc3QpIHJldHVybjtcclxuXHJcbiAgICAvLyBSZW1vdmUgZnJvbSB1bmFsbG9jYXRlZFxyXG4gICAgc2V0VW5hbGxvY2F0ZWQocHJldiA9PiBwcmV2LmZpbHRlcih0ID0+IHQuaWQgIT09IGRyYWdnZWRUZXN0SWQpKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgZnJvbSBhbGwgc3RhbmRzIGFuZCBpbnNlcnQgYXQgdGFyZ2V0XHJcbiAgICBjb25zdCBuZXdTdGFuZHMgPSBzdGFuZHMubWFwKHMgPT4ge1xyXG4gICAgICBjb25zdCBvcmlnaW5hbEluZGV4ID0gcy50ZXN0cy5maW5kSW5kZXgodCA9PiB0LmlkID09PSBkcmFnZ2VkVGVzdElkKTtcclxuICAgICAgY29uc3QgZmlsdGVyZWQgPSBzLnRlc3RzLmZpbHRlcih0ID0+IHQuaWQgIT09IGRyYWdnZWRUZXN0SWQpO1xyXG4gICAgICBpZiAocy5pZCA9PT0gc3RhbmRJZCkge1xyXG4gICAgICAgIC8vIEFkanVzdCBpbmRleCBpZiB0aGUgZHJhZ2dlZCB0ZXN0IHdhcyBvcmlnaW5hbGx5IGluIHRoaXMgc3RhbmQgYmVmb3JlIHRoZSBkcm9wIHBvc2l0aW9uXHJcbiAgICAgICAgY29uc3QgYWRqdXN0ZWRJbmRleCA9IChvcmlnaW5hbEluZGV4ICE9PSAtMSAmJiBvcmlnaW5hbEluZGV4IDwgaW5kZXgpID8gaW5kZXggLSAxIDogaW5kZXg7XHJcbiAgICAgICAgY29uc3QgbmV3VGVzdHMgPSBbLi4uZmlsdGVyZWRdO1xyXG4gICAgICAgIG5ld1Rlc3RzLnNwbGljZShhZGp1c3RlZEluZGV4LCAwLCB0ZXN0KTtcclxuICAgICAgICByZXR1cm4geyAuLi5zLCB0ZXN0czogbmV3VGVzdHMgfTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4geyAuLi5zLCB0ZXN0czogZmlsdGVyZWQgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFN0YW5kcyhuZXdTdGFuZHMpO1xyXG4gICAgYWZ0ZXJDaGFuZ2UobmV3U3RhbmRzKTtcclxuICAgIGNsZWFyRHJhZygpO1xyXG4gIH0sIFtkcmFnZ2VkVGVzdElkLCBmaW5kVGVzdCwgc3RhbmRzLCBhZnRlckNoYW5nZSwgY2xlYXJEcmFnXSk7XHJcblxyXG4gIGNvbnN0IGRyb3BPblF1ZXVlID0gdXNlQ2FsbGJhY2soKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIGlmICghZHJhZ2dlZFRlc3RJZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgdGVzdCA9IGZpbmRUZXN0KGRyYWdnZWRUZXN0SWQpO1xyXG4gICAgaWYgKCF0ZXN0KSByZXR1cm47XHJcblxyXG4gICAgLy8gUmVtb3ZlIGZyb20gc3RhbmRzXHJcbiAgICBjb25zdCBuZXdTdGFuZHMgPSBzdGFuZHMubWFwKHMgPT4gKHtcclxuICAgICAgLi4ucyxcclxuICAgICAgdGVzdHM6IHMudGVzdHMuZmlsdGVyKHQgPT4gdC5pZCAhPT0gZHJhZ2dlZFRlc3RJZCksXHJcbiAgICB9KSk7XHJcblxyXG4gICAgLy8gQWRkIHRvIHVuYWxsb2NhdGVkXHJcbiAgICBzZXRVbmFsbG9jYXRlZChwcmV2ID0+IHtcclxuICAgICAgY29uc3QgZmlsdGVyZWQgPSBwcmV2LmZpbHRlcih0ID0+IHQuaWQgIT09IGRyYWdnZWRUZXN0SWQpO1xyXG4gICAgICBjb25zdCBuZXh0ID0gWy4uLmZpbHRlcmVkXTtcclxuICAgICAgbmV4dC5zcGxpY2UoaW5kZXgsIDAsIHRlc3QpO1xyXG4gICAgICByZXR1cm4gbmV4dDtcclxuICAgIH0pO1xyXG5cclxuICAgIHNldFN0YW5kcyhuZXdTdGFuZHMpO1xyXG4gICAgYWZ0ZXJDaGFuZ2UobmV3U3RhbmRzKTtcclxuICAgIGNsZWFyRHJhZygpO1xyXG4gIH0sIFtkcmFnZ2VkVGVzdElkLCBmaW5kVGVzdCwgc3RhbmRzLCBhZnRlckNoYW5nZSwgY2xlYXJEcmFnXSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBTYXZlIC8gRGlzY2FyZCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBoYW5kbGVTYXZlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0UGVuZGluZ1NhdmUodHJ1ZSk7XHJcbiAgICBvblNhdmUoKTtcclxuICB9LCBbb25TYXZlXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURpc2NhcmQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpO1xyXG4gICAgLy8gUmUtcGFyc2UgZnJvbSBpbnB1dCBkYXRhXHJcbiAgICBjb25zdCB0ZXN0c0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRUZXN0cykgPyBpbnB1dFRlc3RzIDogW107XHJcbiAgICBjb25zdCBzdGFuZHNBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0U3RhbmRzKSA/IChpbnB1dFN0YW5kcyBhcyBTdGFuZERlZltdKSA6IFtdO1xyXG4gICAgY29uc3Qgbm9uV29ya2luZ0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXROb25Xb3JraW5nKSA/IGlucHV0Tm9uV29ya2luZyA6IFtdO1xyXG5cclxuICAgIGNvbnN0IHsgc3RhbmRzOiBuZXdTdGFuZHMsIHVuYWxsb2NhdGVkOiB1bmFsbG9jIH0gPSBwYXJzZVN0YW5kcyh0ZXN0c0Fyciwgc3RhbmRzQXJyLCBjaEhvdXJzLCBub25Xb3JraW5nQXJyKTtcclxuICAgIHNldFN0YW5kcyhuZXdTdGFuZHMpO1xyXG4gICAgc2V0VW5hbGxvY2F0ZWQodW5hbGxvYyk7XHJcbiAgICBzZXRJc0RpcnR5KGZhbHNlKTtcclxuICAgIHNldEFsbG9jYXRpb25zKGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKSk7XHJcbiAgICBzZXRIYXNVbnNhdmVkQ2hhbmdlcyhmYWxzZSk7XHJcbiAgfSwgW2lucHV0VGVzdHMsIGlucHV0U3RhbmRzLCBpbnB1dE5vbldvcmtpbmcsIGNoSG91cnMsIHNldEFsbG9jYXRpb25zLCBzZXRIYXNVbnNhdmVkQ2hhbmdlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVSZXRyeSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFNhdmVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRQZW5kaW5nU2F2ZSh0cnVlKTtcclxuICAgIG9uUmV0cnkoKTtcclxuICB9LCBbb25SZXRyeV0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgUG9wb3ZlciBhY3Rpb25zIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGNsb3NlUG9wb3ZlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRQb3BvdmVyKG51bGwpO1xuICAgIHNldFBlbmRpbmdTdGF0dXNDaGFuZ2UobnVsbCk7XG4gICAgc2V0U3RhcnREYXRlSW5wdXRWYWx1ZSgnJyk7XG4gICAgc2V0RW5kRGF0ZUlucHV0VmFsdWUoJycpO1xuICB9LCBbXSk7XG5cclxuICBjb25zdCBoYW5kbGVQb3BvdmVyTW9kZUNoYW5nZSA9IHVzZUNhbGxiYWNrKChtb2RlOiAncm9vdCcgfCAncHJpb3JpdHknIHwgJ3N0YXR1cycgfCAnc3RhcnRfZGF0ZScgfCAnZW5kX2RhdGUnKSA9PiB7XG4gICAgc2V0UG9wb3ZlcihwcmV2ID0+IHByZXYgPyB7IC4uLnByZXYsIG1vZGUgfSA6IG51bGwpO1xuICB9LCBbXSk7XG5cclxuICBjb25zdCBoYW5kbGVDb25maXJtUHJpb3JpdHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFwb3BvdmVyKSByZXR1cm47XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQocHJpb3JpdHlJbnB1dFZhbHVlLCAxMCk7XG4gICAgaWYgKGlzTmFOKHBhcnNlZCkgfHwgcGFyc2VkIDwgMCB8fCBwYXJzZWQgPiAxMDApIHJldHVybjtcbiAgICBzZXRTZWxlY3RlZFRlc3RJZChTdHJpbmcocG9wb3Zlci50ZXN0LmlkKSk7XG4gICAgc2V0U2VsZWN0ZWRUZXN0UHJpb3JpdHkoU3RyaW5nKHBhcnNlZCkpO1xuICAgIG9uQ2hhbmdlUHJpb3JpdHkoKTtcbiAgICBjbG9zZVBvcG92ZXIoKTtcbiAgfSwgW3BvcG92ZXIsIHByaW9yaXR5SW5wdXRWYWx1ZSwgc2V0U2VsZWN0ZWRUZXN0SWQsIHNldFNlbGVjdGVkVGVzdFByaW9yaXR5LCBvbkNoYW5nZVByaW9yaXR5LCBjbG9zZVBvcG92ZXJdKTtcblxuICBjb25zdCBoYW5kbGVQaWNrU3RhdHVzID0gdXNlQ2FsbGJhY2soKHN0YXR1czogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCFwb3BvdmVyKSByZXR1cm47XG4gICAgaWYgKHN0YXR1cyA9PT0gJ1J1bm5pbmcnKSB7XG4gICAgICBzZXRQZW5kaW5nU3RhdHVzQ2hhbmdlKHN0YXR1cyk7XG4gICAgICBzZXRTdGFydERhdGVJbnB1dFZhbHVlKGZvcm1hdERhdGVJbnB1dFZhbHVlKHBvcG92ZXIudGVzdC50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgZ2V0VG9kYXlEYXRlSW5wdXRWYWx1ZSgpKTtcbiAgICAgIHNldEVuZERhdGVJbnB1dFZhbHVlKCcnKTtcbiAgICAgIHNldFBvcG92ZXIocHJldiA9PiBwcmV2ID8geyAuLi5wcmV2LCBtb2RlOiAnc3RhcnRfZGF0ZScgfSA6IG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3RhdHVzID09PSAnVGVzdGVkJykge1xuICAgICAgc2V0UGVuZGluZ1N0YXR1c0NoYW5nZShzdGF0dXMpO1xuICAgICAgc2V0RW5kRGF0ZUlucHV0VmFsdWUoZ2V0VG9kYXlEYXRlSW5wdXRWYWx1ZSgpKTtcbiAgICAgIHNldFN0YXJ0RGF0ZUlucHV0VmFsdWUoJycpO1xuICAgICAgc2V0UG9wb3ZlcihwcmV2ID0+IHByZXYgPyB7IC4uLnByZXYsIG1vZGU6ICdlbmRfZGF0ZScgfSA6IG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRTZWxlY3RlZFRlc3RJZChTdHJpbmcocG9wb3Zlci50ZXN0LmlkKSk7XG4gICAgc2V0U2VsZWN0ZWRUZXN0U3RhdHVzKHN0YXR1cyA9PT0gJ05VTEwnID8gJycgOiBzdGF0dXMpO1xuICAgIG9uQ2hhbmdlU3RhdHVzKCk7XG4gICAgY2xvc2VQb3BvdmVyKCk7XG4gIH0sIFtwb3BvdmVyLCBzZXRTZWxlY3RlZFRlc3RJZCwgc2V0U2VsZWN0ZWRUZXN0U3RhdHVzLCBvbkNoYW5nZVN0YXR1cywgY2xvc2VQb3BvdmVyXSk7XG5cbiAgY29uc3QgaGFuZGxlRWRpdFRlc3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFwb3BvdmVyKSByZXR1cm47XG4gICAgc2V0U2VsZWN0ZWRUZXN0SWQoU3RyaW5nKHBvcG92ZXIudGVzdC5pZCkpO1xuICAgIG9uRWRpdFRlc3QoKTtcbiAgICBjbG9zZVBvcG92ZXIoKTtcbiAgfSwgW3BvcG92ZXIsIHNldFNlbGVjdGVkVGVzdElkLCBvbkVkaXRUZXN0LCBjbG9zZVBvcG92ZXJdKTtcblxuICBjb25zdCBoYW5kbGVDb25maXJtU3RhcnREYXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghcG9wb3ZlciB8fCAhc3RhcnREYXRlSW5wdXRWYWx1ZSkgcmV0dXJuO1xuICAgIHNldFNlbGVjdGVkVGVzdElkKFN0cmluZyhwb3BvdmVyLnRlc3QuaWQpKTtcbiAgICBpZiAocGVuZGluZ1N0YXR1c0NoYW5nZSkge1xuICAgICAgc2V0U2VsZWN0ZWRUZXN0U3RhdHVzKHBlbmRpbmdTdGF0dXNDaGFuZ2UgPT09ICdOVUxMJyA/ICcnIDogcGVuZGluZ1N0YXR1c0NoYW5nZSk7XG4gICAgICBvbkNoYW5nZVN0YXR1cygpO1xuICAgIH1cbiAgICBzZXRTZWxlY3RlZFRlc3RTdGFydERhdGUoc3RhcnREYXRlSW5wdXRWYWx1ZSk7XG4gICAgb25DaGFuZ2VTdGFydERhdGUoKTtcbiAgICBjbG9zZVBvcG92ZXIoKTtcbiAgfSwgW3BvcG92ZXIsIHN0YXJ0RGF0ZUlucHV0VmFsdWUsIHBlbmRpbmdTdGF0dXNDaGFuZ2UsIHNldFNlbGVjdGVkVGVzdElkLCBzZXRTZWxlY3RlZFRlc3RTdGF0dXMsIG9uQ2hhbmdlU3RhdHVzLCBzZXRTZWxlY3RlZFRlc3RTdGFydERhdGUsIG9uQ2hhbmdlU3RhcnREYXRlLCBjbG9zZVBvcG92ZXJdKTtcblxuICBjb25zdCBoYW5kbGVDb25maXJtRW5kRGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIXBvcG92ZXIgfHwgIWVuZERhdGVJbnB1dFZhbHVlKSByZXR1cm47XG4gICAgc2V0U2VsZWN0ZWRUZXN0SWQoU3RyaW5nKHBvcG92ZXIudGVzdC5pZCkpO1xuICAgIGlmIChwZW5kaW5nU3RhdHVzQ2hhbmdlKSB7XG4gICAgICBzZXRTZWxlY3RlZFRlc3RTdGF0dXMocGVuZGluZ1N0YXR1c0NoYW5nZSA9PT0gJ05VTEwnID8gJycgOiBwZW5kaW5nU3RhdHVzQ2hhbmdlKTtcbiAgICAgIG9uQ2hhbmdlU3RhdHVzKCk7XG4gICAgfVxuICAgIHNldFNlbGVjdGVkVGVzdEVuZERhdGUoZW5kRGF0ZUlucHV0VmFsdWUpO1xuICAgIG9uQ2hhbmdlRW5kRGF0ZSgpO1xuICAgIGNsb3NlUG9wb3ZlcigpO1xuICB9LCBbcG9wb3ZlciwgZW5kRGF0ZUlucHV0VmFsdWUsIHBlbmRpbmdTdGF0dXNDaGFuZ2UsIHNldFNlbGVjdGVkVGVzdElkLCBzZXRTZWxlY3RlZFRlc3RTdGF0dXMsIG9uQ2hhbmdlU3RhdHVzLCBzZXRTZWxlY3RlZFRlc3RFbmREYXRlLCBvbkNoYW5nZUVuZERhdGUsIGNsb3NlUG9wb3Zlcl0pO1xuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEJhciBwb3NpdGlvbiBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBnZXRCYXJQb3MgPSB1c2VDYWxsYmFjaygoc3RhcnQ6IERhdGUsIGR1cmF0aW9uOiBudW1iZXIpID0+ICh7XHJcbiAgICBsZWZ0OiBNYXRoLm1heCgwLCBob3Vyc0JldHdlZW4odmlld1N0YXJ0LCBzdGFydCkpICogcHhQZXJIb3VyLFxyXG4gICAgd2lkdGg6IE1hdGgubWF4KGR1cmF0aW9uICogcHhQZXJIb3VyLCAyKSxcclxuICB9KSwgW3ZpZXdTdGFydCwgcHhQZXJIb3VyXSk7XHJcblxyXG4gIC8vIEZvciBSdW5uaW5nIHRlc3RzOiBjbGlwIGxlZnQgdG8gdmlld1N0YXJ0LCBhZGp1c3Qgd2lkdGggdG8gYWN0dWFsIGVuZCB0aW1lLlxyXG4gIC8vIFJldHVybnMgbnVsbCBpZiB0aGUgdGVzdCBlbmRlZCBiZWZvcmUgdGhlIHRpbWVsaW5lIHN0YXJ0cy5cclxuICBjb25zdCBnZXRSdW5uaW5nQmFyUG9zID0gdXNlQ2FsbGJhY2soKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpOiB7IGxlZnQ6IG51bWJlcjsgd2lkdGg6IG51bWJlciB9IHwgbnVsbCA9PiB7XHJcbiAgICBjb25zdCBlZmZlY3RpdmVTdGFydE1zID0gTWF0aC5tYXgoc3RhcnQuZ2V0VGltZSgpLCB2aWV3U3RhcnQuZ2V0VGltZSgpKTtcclxuICAgIGNvbnN0IGVuZE1zID0gZW5kLmdldFRpbWUoKTtcclxuICAgIGlmIChlbmRNcyA8PSBlZmZlY3RpdmVTdGFydE1zKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxlZnQ6IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIG5ldyBEYXRlKGVmZmVjdGl2ZVN0YXJ0TXMpKSAqIHB4UGVySG91cixcclxuICAgICAgd2lkdGg6IE1hdGgubWF4KGhvdXJzQmV0d2VlbihuZXcgRGF0ZShlZmZlY3RpdmVTdGFydE1zKSwgbmV3IERhdGUoZW5kTXMpKSAqIHB4UGVySG91ciwgMiksXHJcbiAgICB9O1xyXG4gIH0sIFt2aWV3U3RhcnQsIHB4UGVySG91cl0pO1xyXG5cclxuICBjb25zdCBkcmFnZ2VkVGVzdCA9IGRyYWdnZWRUZXN0SWQgIT0gbnVsbCA/IGZpbmRUZXN0KGRyYWdnZWRUZXN0SWQpIDogbnVsbDtcclxuICBjb25zdCBkcmFnZ2VkSXNSdW5uaW5nID0gZHJhZ2dlZFRlc3QgIT0gbnVsbCA/IGlzUnVubmluZ1Rlc3QoZHJhZ2dlZFRlc3QpIDogZmFsc2U7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBTdGF0cyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB0b3RhbEFsbG9jYXRlZCA9IHN0YW5kcy5yZWR1Y2UoKGEsIHMpID0+IGEgKyBzLnRlc3RzLmxlbmd0aCwgMCk7XHJcbiAgY29uc3QgdG90YWxIb3VycyA9IHN0YW5kcy5yZWR1Y2UoKGEsIHMpID0+IGEgKyBzLnRlc3RzLnJlZHVjZSgoYiwgdCkgPT4gYiArIHQuZHVyYXRpb24sIDApLCAwKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFRlbXBsYXRlIGFjY2Vzc29ycyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBtYWluVGV4dCA9IFN0cmluZyhjYXJkTWFpblRleHQgfHwgJ3tuYW1lfScpO1xyXG4gIGNvbnN0IHN1YlRleHQgPSBTdHJpbmcoY2FyZFN1YlRleHQgfHwgJycpO1xyXG4gIGNvbnN0IGluZm9Sb3cgPSBTdHJpbmcoY2FyZEluZm9Sb3cgfHwgJycpO1xyXG4gIGNvbnN0IHRpcFRlbXBsYXRlID0gU3RyaW5nKHRvb2x0aXBUZW1wbGF0ZSB8fCAnJykucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgRmlsdGVyZWQgJiBzb3J0ZWQgcXVldWUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgU1RBVFVTX1NPUlRfT1JERVI6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7XHJcbiAgICAnUnVubmluZyc6IDAsICdEZWxheWVkJzogMSwgJ09uIFRpbWUnOiAyLCAnUmVhZHknOiAzLCAnSW4gUHJvZ3Jlc3MnOiA0LCAnUGFydHMgTm90IEFzc2lnbmVkJzogNSxcclxuICB9O1xyXG5cclxuICBjb25zdCBzb3J0ZWRVbmFsbG9jYXRlZCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgbGV0IGxpc3QgPSBbLi4udW5hbGxvY2F0ZWRdO1xyXG4gICAgaWYgKHF1ZXVlRmlsdGVyLnRyaW0oKSkge1xyXG4gICAgICBjb25zdCBxID0gcXVldWVGaWx0ZXIudG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgICAgIC8vIFNlYXJjaCBhY3Jvc3MgYWxsIHJlYWRhYmxlIHN0cmluZy9udW1iZXIgZmllbGRzIG9mIHRoZSB0ZXN0XHJcbiAgICAgIGxpc3QgPSBsaXN0LmZpbHRlcih0ID0+IHtcclxuICAgICAgICBjb25zdCBzZWFyY2hhYmxlID0gW3QubmFtZSwgdC5vd25lciwgdC5ub3RlcywgdC5zdGF0dXMsIHQucGFydF9zdGF0dXMsIHQuYXNzaWduZWRfcGFydHMsXHJcbiAgICAgICAgICB0LnByaW9yaXR5ICE9IG51bGwgPyBTdHJpbmcodC5wcmlvcml0eSkgOiAnJywgdC5kdXJhdGlvbiAhPSBudWxsID8gU3RyaW5nKHQuZHVyYXRpb24pIDogJyddXHJcbiAgICAgICAgICAuam9pbignICcpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHNlYXJjaGFibGUuaW5jbHVkZXMocSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHF1ZXVlU29ydCA9PT0gJ2F6Jykge1xyXG4gICAgICBsaXN0LnNvcnQoKGEsIGIpID0+IChhLm5hbWUgfHwgJycpLmxvY2FsZUNvbXBhcmUoYi5uYW1lIHx8ICcnKSk7XHJcbiAgICB9IGVsc2UgaWYgKHF1ZXVlU29ydCA9PT0gJ3ByaW9yaXR5Jykge1xyXG4gICAgICBsaXN0LnNvcnQoKGEsIGIpID0+IChiLnByaW9yaXR5ID8/IDUwKSAtIChhLnByaW9yaXR5ID8/IDUwKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTb3J0IGJ5IGRpc3BsYXkgc3RhdHVzIHVzaW5nIGEgZml4ZWQgdXJnZW5jeSBvcmRlclxyXG4gICAgICBsaXN0LnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICBjb25zdCBzYSA9IFNUQVRVU19TT1JUX09SREVSW2dldERpc3BsYXlTdGF0dXMoYSldID8/IDk5O1xyXG4gICAgICAgIGNvbnN0IHNiID0gU1RBVFVTX1NPUlRfT1JERVJbZ2V0RGlzcGxheVN0YXR1cyhiKV0gPz8gOTk7XHJcbiAgICAgICAgcmV0dXJuIHNhICE9PSBzYiA/IHNhIC0gc2IgOiAoYi5wcmlvcml0eSA/PyA1MCkgLSAoYS5wcmlvcml0eSA/PyA1MCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxpc3Q7XHJcbiAgfSwgW3VuYWxsb2NhdGVkLCBxdWV1ZVNvcnQsIHF1ZXVlRmlsdGVyXSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBCYXIgaGVpZ2h0IFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IEJBUl9IRUlHSFQgPSA3MjtcclxuICBjb25zdCBMQU5FX0hFSUdIVCA9IDg0O1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgUmVuZGVyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgIGRpc3BsYXk6ICdmbGV4JywgaGVpZ2h0OiAnMTAwJScsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcyxcclxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LCBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgIH19PlxyXG4gICAgICA8c3R5bGU+e2BAa2V5ZnJhbWVzIGNjbC1zcGluIHsgdG8geyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9IH1gfTwvc3R5bGU+XHJcbiAgICAgIHtpc0xvY2tlZCAmJiAoXHJcbiAgICAgICAgPFNhdmVPdmVybGF5XHJcbiAgICAgICAgICBpc0Vycm9yPXtzYXZlRXJyb3J9XHJcbiAgICAgICAgICB0aGVtZT17dGhlbWV9XHJcbiAgICAgICAgICBvblJldHJ5PXtoYW5kbGVSZXRyeX1cclxuICAgICAgICAgIG9uRGlzY2FyZD17aGFuZGxlRGlzY2FyZH1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgICB7LyogXHUyNTUwXHUyNTUwXHUyNTUwIFF1ZXVlIFNpZGViYXIgXHUyNTUwXHUyNTUwXHUyNTUwICovfVxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAzMjAsIG1pbldpZHRoOiAzMjAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcywgYm9yZGVyUmlnaHQ6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyB9fT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDE2cHgnLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSB9fT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgbWFyZ2luQm90dG9tOiA0IH19PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCB9fT5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA4LCBoZWlnaHQ6IDgsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6IHVuYWxsb2NhdGVkLmxlbmd0aCA+IDAgPyAnI0Y1OUUwQicgOiAnIzEwQjk4MScgfX0gLz5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDEzLCBmb250V2VpZ2h0OiA3MDAsIGxldHRlclNwYWNpbmc6ICcwLjA4ZW0nLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJywgY29sb3I6IHRoZW1lLnRleHRUZXJ0aWFyeSB9fT5RdWV1ZTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDIsIGJhY2tncm91bmQ6IHRoZW1lLmJnU3VidGxlLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cywgcGFkZGluZzogMiwgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgfX0+XHJcbiAgICAgICAgICAgICAgeyhbWydheicsICdBXHUyMTkyWiddLCBbJ3ByaW9yaXR5JywgJ1ByaW9yaXR5J10sIFsnc3RhdHVzJywgJ1N0YXR1cyddXSBhcyBjb25zdCkubWFwKChbdmFsLCBsYWJlbF0pID0+IChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAga2V5PXt2YWx9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFF1ZXVlU29ydCh2YWwpfVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBwYWRkaW5nOiAnM3B4IDhweCcsIGZvbnRTaXplOiA5LCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzU20sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHF1ZXVlU29ydCA9PT0gdmFsID8gdGhlbWUuYWNjZW50IDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogcXVldWVTb3J0ID09PSB2YWwgPyB0aGVtZS5hY2NlbnRGZyA6IHRoZW1lLnRleHRNdXRlZCxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID57bGFiZWx9PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCBtYXJnaW5Ub3A6IDYgfX0+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICB2YWx1ZT17cXVldWVGaWx0ZXJ9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRRdWV1ZUZpbHRlcihlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJGaWx0ZXIgdGVzdHMuLi5cIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgd2lkdGg6ICcxMDAlJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsIHBhZGRpbmc6ICc1cHggMjhweCA1cHggOHB4JywgZm9udFNpemU6IDExLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksIG91dGxpbmU6ICdub25lJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIG9uRm9jdXM9eyhlKSA9PiB7IGUuY3VycmVudFRhcmdldC5zdHlsZS5ib3JkZXJDb2xvciA9IHRoZW1lLmFjY2VudDsgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSB0aGVtZS5zdXJmYWNlOyB9fVxyXG4gICAgICAgICAgICAgIG9uQmx1cj17KGUpID0+IHsgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJvcmRlckNvbG9yID0gdGhlbWUuYm9yZGVyOyBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9IHRoZW1lLmNhbnZhczsgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAge3F1ZXVlRmlsdGVyICYmIChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRRdWV1ZUZpbHRlcignJyl9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgcmlnaHQ6IDYsIHRvcDogJzUwJScsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwJSknLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6IHRoZW1lLnRleHREaXNhYmxlZCxcclxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDE0LCBsaW5lSGVpZ2h0OiAxLCBwYWRkaW5nOiAwLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+JnRpbWVzOzwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIHN0eWxlPXt7IGZsZXg6IDEsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nOiAnOHB4IDEwcHgnIH19XHJcbiAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGlmIChlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0KSBzZXRRdWV1ZUluc2VydEluZGV4KHVuYWxsb2NhdGVkLmxlbmd0aCk7IH19XHJcbiAgICAgICAgICBvbkRyYWdMZWF2ZT17KGUpID0+IHsgaWYgKGUuY3VycmVudFRhcmdldCA9PT0gZS50YXJnZXQpIHNldFF1ZXVlSW5zZXJ0SW5kZXgobnVsbCk7IH19XHJcbiAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZHJvcE9uUXVldWUocXVldWVJbnNlcnRJbmRleCA/PyB1bmFsbG9jYXRlZC5sZW5ndGgpOyB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtzb3J0ZWRVbmFsbG9jYXRlZC5tYXAoKHRlc3QsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBnZXREaXNwbGF5U3RhdHVzKHRlc3QsIG51bGwpO1xyXG4gICAgICAgICAgICBjb25zdCBzaG93U3ViID0gIWlzVGVtcGxhdGVFbXB0eShzdWJUZXh0LCB0ZXN0KTtcclxuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRNYWluID0gcmVzb2x2ZVRlbXBsYXRlKG1haW5UZXh0LCB0ZXN0KTtcclxuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRTdWIgPSByZXNvbHZlVGVtcGxhdGUoc3ViVGV4dCwgdGVzdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkSW5mbyA9IHJlc29sdmVUZW1wbGF0ZShpbmZvUm93LCB0ZXN0KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e3Rlc3QuaWR9PlxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldFF1ZXVlSW5zZXJ0SW5kZXgoaWR4KTsgfX1cclxuICAgICAgICAgICAgICAgICAgb25Ecm9wPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGRyb3BPblF1ZXVlKGlkeCk7IH19XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBxdWV1ZUluc2VydEluZGV4ID09PSBpZHggJiYgZHJhZ2dlZFRlc3RJZCAmJiBkcmFnZ2VkVGVzdElkICE9PSB0ZXN0LmlkID8gNiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogMyxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuMTJzIGVhc2UnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxRdWV1ZUNhcmRcclxuICAgICAgICAgICAgICAgICAgdGVzdD17dGVzdH1cclxuICAgICAgICAgICAgICAgICAgZHJhZ2dlZFRlc3RJZD17ZHJhZ2dlZFRlc3RJZH1cclxuICAgICAgICAgICAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgICAgICAgICAgIG1haW5UZXh0PXtyZXNvbHZlZE1haW59XHJcbiAgICAgICAgICAgICAgICAgIHN1YlRleHQ9e3Jlc29sdmVkU3VifVxyXG4gICAgICAgICAgICAgICAgICBpbmZvUm93PXtyZXNvbHZlZEluZm99XHJcbiAgICAgICAgICAgICAgICAgIHNob3dTdWI9e3Nob3dTdWJ9XHJcbiAgICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cclxuICAgICAgICAgICAgICAgICAgb25EcmFnU3RhcnQ9eygpID0+IHNldERyYWdnZWRUZXN0SWQodGVzdC5pZCl9XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17Y2xlYXJEcmFnfVxyXG4gICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGNvbnN0IHJlY3QgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IHNldFF1ZXVlSW5zZXJ0SW5kZXgoZS5jbGllbnRZIDwgcmVjdC50b3AgKyByZWN0LmhlaWdodCAvIDIgPyBpZHggOiBpZHggKyAxKTsgfX1cclxuICAgICAgICAgICAgICAgICAgb25NZW51T3Blbj17KHJlY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRyYWdnZWRUZXN0SWQgfHwgaXNMb2NrZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgc2V0UHJpb3JpdHlJbnB1dFZhbHVlKFN0cmluZyh0ZXN0LnByaW9yaXR5ID8/IDUwKSk7XG4gICAgICAgICAgICAgICAgICAgIHNldFN0YXJ0RGF0ZUlucHV0VmFsdWUoZm9ybWF0RGF0ZUlucHV0VmFsdWUodGVzdC50ZXN0X3N0YXJ0ZWRfZGF0ZSkpO1xuICAgICAgICAgICAgICAgICAgICBzZXRFbmREYXRlSW5wdXRWYWx1ZSgnJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldFBlbmRpbmdTdGF0dXNDaGFuZ2UobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIHNldFBvcG92ZXIoe1xuICAgICAgICAgICAgICAgICAgICAgIGFuY2hvclJlY3Q6IHJlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdCxcbiAgICAgICAgICAgICAgICAgICAgICBtb2RlOiAncm9vdCcsXG4gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVN0YXR1czogc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBMaW5lczogcmVzb2x2ZVRlbXBsYXRlKHRpcFRlbXBsYXRlLCB0ZXN0KSxcbiAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IHNldFF1ZXVlSW5zZXJ0SW5kZXgodW5hbGxvY2F0ZWQubGVuZ3RoKTsgfX1cclxuICAgICAgICAgICAgb25Ecm9wPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGRyb3BPblF1ZXVlKHVuYWxsb2NhdGVkLmxlbmd0aCk7IH19XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiAocXVldWVJbnNlcnRJbmRleCA9PT0gdW5hbGxvY2F0ZWQubGVuZ3RoICYmIGRyYWdnZWRUZXN0SWQpID8gNiA6IDAsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LFxyXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogMyxcclxuICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuMTJzIGVhc2UnLFxyXG4gICAgICAgICAgICAgIG1hcmdpbjogJzAgNHB4JyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICB7dW5hbGxvY2F0ZWQubGVuZ3RoID09PSAwICYmIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsIHBhZGRpbmc6ICczMnB4IDE2cHgnLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250U2l6ZTogMTIsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiBkcmFnZ2VkVGVzdElkID8gYDJweCBkYXNoZWQgJHt0aGVtZS5hY2NlbnR9YCA6IGAycHggZGFzaGVkICR7dGhlbWUuYm9yZGVyU3Ryb25nfWAsXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZywgbWFyZ2luVG9wOiA4LFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IGRyYWdnZWRUZXN0SWQgPyB0aGVtZS5hY2NlbnRTdWJ0bGUgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLFxyXG4gICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICB7ZHJhZ2dlZFRlc3RJZCA/ICdEcm9wIHRvIHJldHVybiB0byBxdWV1ZScgOiAnQWxsIHRlc3RzIGFsbG9jYXRlZCd9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPE91dGxpbmVLZXkgdGhlbWU9e3RoZW1lfSAvPlxyXG5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDE2cHgnLCBib3JkZXJUb3A6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBmb250U2l6ZTogMTAsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQgfX0+XHJcbiAgICAgICAgICAgIDxzcGFuPnt0b3RhbEFsbG9jYXRlZH0ve3RvdGFsQWxsb2NhdGVkICsgdW5hbGxvY2F0ZWQubGVuZ3RofSBhbGxvY2F0ZWQ8L3NwYW4+PHNwYW4+e3RvdGFsSG91cnN9aDwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHsvKiBcdTI1NTBcdTI1NTBcdTI1NTAgTWFpbiBUaW1lbGluZSBcdTI1NTBcdTI1NTBcdTI1NTAgKi99XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxyXG4gICAgICAgIHsvKiBIZWFkZXIgYmFyICovfVxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEycHggMjRweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBnYXA6IDE2LCBmbGV4V3JhcDogJ3dyYXAnIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtaW5XaWR0aDogMCB9fT5cclxuICAgICAgICAgICAgPGgxIHN0eWxlPXt7IGZvbnRTaXplOiAxOCwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksIGxldHRlclNwYWNpbmc6ICctMC4wMmVtJywgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSB9fT5UZXN0IFN0YW5kIFNjaGVkdWxlcjwvaDE+XHJcbiAgICAgICAgICAgIDxwIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTEsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIG1hcmdpblRvcDogMiB9fT5cclxuICAgICAgICAgICAgICBDb250aW51b3VzIHRlc3RpbmcgXHUwMEI3IHtjaEhvdXJzfWggY2hhbmdlb3ZlciAoZGVmYXVsdCkgXHUwMEI3IHt3U3RhcnR9OjAwXHUyMDEze3dFbmR9OjAwIE1vblx1MjAxM0ZyaVxyXG4gICAgICAgICAgICAgIHsoc2F2ZU1vZGUgYXMgc3RyaW5nKSA9PT0gJ2xpdmUnICYmIDxzcGFuPiBcdTAwQjcgTGl2ZSBzeW5jPC9zcGFuPn1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDEyIH19PlxyXG4gICAgICAgICAgICB7LyogU2F2ZS9EaXNjYXJkIGJ1dHRvbnMgKGJhdGNoIG1vZGUpICovfVxyXG4gICAgICAgICAgICB7KHNhdmVNb2RlIGFzIHN0cmluZykgPT09ICdiYXRjaCcgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYgfX0+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURpc2NhcmR9XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNEaXJ0eSB8fCBpc0xvY2tlZH1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLCBwYWRkaW5nOiAnNnB4IDAnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7aXNEaXJ0eSAmJiAhaXNMb2NrZWQgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS5ib3JkZXJ9YCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyAncG9pbnRlcicgOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IHRoZW1lLmFjY2VudCA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyB0aGVtZS5hY2NlbnRGZyA6IHRoZW1lLnRleHREaXNhYmxlZCxcclxuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyBgMCAxcHggM3B4ICR7dGhlbWUuYWNjZW50fTREYCA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgRGlzY2FyZCBDaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2F2ZX1cclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0RpcnR5IHx8IGlzTG9ja2VkfVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsIHBhZGRpbmc6ICc2cHggMCcsIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHtpc0RpcnR5ICYmICFpc0xvY2tlZCA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLmJvcmRlcn1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/ICdwb2ludGVyJyA6ICdkZWZhdWx0JyxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gdGhlbWUuYWNjZW50IDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dERpc2FibGVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IGAwIDFweCAzcHggJHt0aGVtZS5hY2NlbnR9NERgIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICBTYXZlIENoYW5nZXNcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgey8qIFZpZXdwb3J0IHNlbGVjdG9yICovfVxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA0LCBiYWNrZ3JvdW5kOiB0aGVtZS5iZ1N1YnRsZSwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZywgcGFkZGluZzogMywgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgfX0+XHJcbiAgICAgICAgICAgICAge1syLCA0LCA4LCAxMiwgMjRdLm1hcCgodykgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3d9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdXNlckNoYW5nZWRWaWV3cG9ydC5jdXJyZW50ID0gdHJ1ZTsgc2V0Vmlld3BvcnRXZWVrcyh3KTsgfX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEycHgnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHZpZXdwb3J0V2Vla3MgPT09IHcgPyB0aGVtZS5hY2NlbnQgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB2aWV3cG9ydFdlZWtzID09PSB3ID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0VGVydGlhcnksXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHt3fVdcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7LyogVGltZWxpbmUgc2Nyb2xsIGFyZWEgKi99XHJcbiAgICAgICAgPGRpdiByZWY9e3Njcm9sbFJlZn0gc3R5bGU9e3sgZmxleDogMSwgb3ZlcmZsb3c6ICdhdXRvJywgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtaW5XaWR0aDogdG90YWxXaWR0aCwgcGFkZGluZzogJzAgMTJweCAyNHB4JywgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XHJcbiAgICAgICAgICAgIHsvKiBUaW1lbGluZSBoZWFkZXIgKi99XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdzdGlja3knLCB0b3A6IDAsIHpJbmRleDogMjAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgfX0+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGhlaWdodDogMjgsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gIH19PlxyXG4gICAgICAgICAgICAgICAge2RheXMubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTW9uZGF5ID0gZC5nZXREYXkoKSA9PT0gMTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCB3aWR0aDogZGF5V2lkdGgsIG1pbldpZHRoOiBkYXlXaWR0aCwgaGVpZ2h0OiAyOCxcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRUZXJ0aWFyeSxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHtpc01vbmRheSAmJiBpID4gMCA/IHRoZW1lLmJvcmRlciA6ICd0cmFuc3BhcmVudCd9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBpc01vbmRheSA/IDcgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICd2aXNpYmxlJywgd2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7aXNNb25kYXkgPyBmb3JtYXRXZWVrKGQpIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgaGVpZ2h0OiAyNCB9fT5cclxuICAgICAgICAgICAgICAgIHtkYXlzLm1hcCgoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1RvZGF5ID0gZC50b0RhdGVTdHJpbmcoKSA9PT0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNXZWVrZW5kID0gZC5nZXREYXkoKSA9PT0gMCB8fCBkLmdldERheSgpID09PSA2O1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHdpZHRoOiBkYXlXaWR0aCwgbWluV2lkdGg6IGRheVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDksIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogaXNUb2RheSA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLnRleHRNdXRlZCxcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGlzVG9kYXkgPyA3MDAgOiA0MDAsIGxpbmVIZWlnaHQ6ICcyNHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGlzVG9kYXkgPyB0aGVtZS5hY2NlbnRTdWJ0bGUgOiAoaXNXZWVrZW5kID8gdGhlbWUuYmdTdWJ0bGUgOiAndHJhbnNwYXJlbnQnKSxcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIHt2aWV3cG9ydFdlZWtzIDw9IDggPyBkLmdldERhdGUoKSA6IChkLmdldERheSgpID09PSAxID8gZC5nZXREYXRlKCkgOiAnJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICB7LyogXHUyNTUwXHUyNTUwXHUyNTUwIFRlc3QgU3RhbmQgTGFuZXMgXHUyNTUwXHUyNTUwXHUyNTUwICovfVxyXG4gICAgICAgICAgICB7c3RhbmRzLm1hcCgoc3RhbmQpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBzY2hlZHVsZSA9IHN0YW5kU2NoZWR1bGVzLmdldChzdGFuZC5pZCkgPz8gW107XHJcbiAgICAgICAgICAgICAgY29uc3QgaW5kID0gaW5zZXJ0SW5kaWNhdG9yO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNob3dIZXJlID0gaW5kICYmIGluZC5zdGFuZElkID09PSBzdGFuZC5pZDtcclxuXHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtzdGFuZC5pZH0gc3R5bGU9e3sgbWFyZ2luVG9wOiAxNiB9fT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDgsIG1hcmdpbkJvdHRvbTogNiwgcGFkZGluZ0xlZnQ6IDIgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNiwgaGVpZ2h0OiA2LCBib3JkZXJSYWRpdXM6IDIsIGJhY2tncm91bmQ6IHN0YW5kLnRlc3RzLmxlbmd0aCA+IDAgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS50ZXh0RGlzYWJsZWQgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5IH19PntzdGFuZC5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDEwLCBjb2xvcjogdGhlbWUudGV4dE11dGVkIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAge3N0YW5kLnRlc3RzLmxlbmd0aH0gdGVzdHtzdGFuZC50ZXN0cy5sZW5ndGggIT09IDEgPyAncycgOiAnJ317c3RhbmQudGVzdHMubGVuZ3RoID4gMCAmJiBgIFxcdTAwYjcgJHtzdGFuZC50ZXN0cy5yZWR1Y2UoKGEsIHQpID0+IGEgKyB0LmR1cmF0aW9uLCAwKX1oYH1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgc2V0SW5zZXJ0SW5kaWNhdG9yKHsgc3RhbmRJZDogc3RhbmQuaWQsIGluZGV4OiBzdGFuZC50ZXN0cy5sZW5ndGggfSk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgb25EcmFnTGVhdmU9eyhlKSA9PiB7IGlmICghZS5jdXJyZW50VGFyZ2V0LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCBhcyBOb2RlKSkgc2V0SW5zZXJ0SW5kaWNhdG9yKG51bGwpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIFJ1bm5pbmcgdGVzdHMgYWx3YXlzIGFwcGVuZCB0byBlbmQgKHBvc2l0aW9uIGlzIGdvdmVybmVkIGJ5IHRlc3Rfc3RhcnRlZF9kYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGRyYWdnZWRJc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIHN0YW5kLnRlc3RzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wT25TdGFuZChzdGFuZC5pZCwgaW5kPy5zdGFuZElkID09PSBzdGFuZC5pZCA/IGluZC5pbmRleCA6IHN0YW5kLnRlc3RzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IExBTkVfSEVJR0hULFxyXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gc2hvd0hlcmUgfHwgKGRyYWdnZWRUZXN0SWQgJiYgc3RhbmQudGVzdHMubGVuZ3RoID09PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHJldHVybiB0aGVtZS5zdXJmYWNlU2Vjb25kYXJ5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJhZ2dlZElzUnVubmluZyA/IHRoZW1lLnJ1bm5pbmdCZyA6IHRoZW1lLmFjY2VudFN1YnRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHsoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBzaG93SGVyZSB8fCAoZHJhZ2dlZFRlc3RJZCAmJiBzdGFuZC50ZXN0cy5sZW5ndGggPT09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuIHRoZW1lLmJvcmRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyYWdnZWRJc1J1bm5pbmcgPyB0aGVtZS5ydW5uaW5nQm9yZGVyIDogdGhlbWUuYWNjZW50TXV0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRvdGFsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnYmFja2dyb3VuZCAwLjE1cyBlYXNlLCBib3JkZXItY29sb3IgMC4xNXMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBXZWVrZW5kIHNoYWRpbmcgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge2RheXMubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5nZXREYXkoKSAhPT0gMCAmJiBkLmdldERheSgpICE9PSA2KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgd2UtJHtpfWB9IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGkgKiBkYXlXaWR0aCwgdG9wOiAwLCBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGRheVdpZHRoLCBiYWNrZ3JvdW5kOiB0aGVtZS5ib3JkZXIsIG9wYWNpdHk6IDAuMzUsIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBEYXkgZ3JpZCAqL31cclxuICAgICAgICAgICAgICAgICAgICB7ZGF5cy5tYXAoKF8sIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogaSAqIGRheVdpZHRoLCB0b3A6IDAsIGJvdHRvbTogMCwgd2lkdGg6IDEsIGJhY2tncm91bmQ6IHRoZW1lLmJvcmRlciB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogTm93IGxpbmUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoID0gaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaCA8IDAgfHwgaCA+IHRvdGFsRGF5cyAqIDI0KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGggKiBweFBlckhvdXIsIHRvcDogMCwgYm90dG9tOiAwLCB3aWR0aDogMiwgYmFja2dyb3VuZDogJyNFRjQ0NDQnLCB6SW5kZXg6IDQwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTMsIGxlZnQ6IC0zLCB3aWR0aDogOCwgaGVpZ2h0OiA4LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiAnI0VGNDQ0NCcgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBOb24td29ya2luZyBibG9ja3MgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3N0YW5kLm5vbldvcmtpbmdCbG9ja3MubWFwKChibG9jaywgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVmdCA9IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIGJsb2NrLnN0YXJ0KSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gaG91cnNCZXR3ZWVuKGJsb2NrLnN0YXJ0LCBibG9jay5lbmQpICogcHhQZXJIb3VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgKyB3aWR0aCA8IDAgfHwgbGVmdCA+IHRvdGFsV2lkdGgpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhbXBlZExlZnQgPSBNYXRoLm1heCgwLCBsZWZ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRXaWR0aCA9IE1hdGgubWluKHdpZHRoICsgTWF0aC5taW4oMCwgbGVmdCksIHRvdGFsV2lkdGggLSBjbGFtcGVkTGVmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YG53LSR7aX1gfSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBjbGFtcGVkTGVmdCwgdG9wOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjbGFtcGVkV2lkdGgsIGhlaWdodDogQkFSX0hFSUdIVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDYsIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCg0NWRlZywgJHt0aGVtZS5ib3JkZXJ9IDBweCwgJHt0aGVtZS5ib3JkZXJ9IDE1cHgsICR7dGhlbWUuc3VyZmFjZX0gMTVweCwgJHt0aGVtZS5zdXJmYWNlfSAzMHB4KWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZywgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyU3Ryb25nfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAncm93Jywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA1LCBtaW5XaWR0aDogNSwgYmFja2dyb3VuZDogdGhlbWUudGV4dERpc2FibGVkLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBwYWRkaW5nOiAnNHB4IDhweCcsIG1pbldpZHRoOiAwLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgbWF4V2lkdGg6ICcxMDAlJywgbGluZUhlaWdodDogMS4yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+e2Jsb2NrLm5vdGVzIHx8ICdNYWludGVuYW5jZSd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBUZXN0IGJhcnMgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3NjaGVkdWxlLm1hcCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1Rlc3RSdW5uaW5nID0gaXNSdW5uaW5nVGVzdCh0ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhclBvcyA9IGlzVGVzdFJ1bm5pbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBnZXRSdW5uaW5nQmFyUG9zKHRlc3Quc3RhcnQsIHRlc3QuZW5kKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGdldEJhclBvcyh0ZXN0LnN0YXJ0LCB0ZXN0LmR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIFJ1bm5pbmcgdGVzdHMgdGhhdCBlbmRlZCBiZWZvcmUgdGhlIHRpbWVsaW5lIHN0YXJ0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCFiYXJQb3MpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgd2lkdGggfSA9IGJhclBvcztcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKHRlc3QuZW5kLCBzdGFuZC5jaGFuZ2VvdmVyX2hvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlb3ZlcldpZHRoID0gaG91cnNCZXR3ZWVuKHRlc3QuZW5kLCBjRW5kKSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlTdGF0dXMgPSBnZXREaXNwbGF5U3RhdHVzKHRlc3QsIHRlc3Quc3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkTWFpbiA9IHJlc29sdmVUZW1wbGF0ZShtYWluVGV4dCwgdGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZEluZm8gPSByZXNvbHZlVGVtcGxhdGUoaW5mb1JvdywgdGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaG93SW5mb09uQmFyID0gcmVzb2x2ZWRJbmZvLnRyaW0oKSAhPT0gJycgJiYgd2lkdGggPiAxMjA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3Rlc3QuaWR9IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0LCB0b3A6IDAsIHdpZHRoOiB3aWR0aCArIGNoYW5nZW92ZXJXaWR0aCwgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIERyb3Agem9uZXMgXHUyMDE0IHN1cHByZXNzZWQgd2hlbiBkcmFnZ2luZyBhIFJ1bm5pbmcgdGVzdCAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZHJhZ2dlZFRlc3RJZCAmJiBkcmFnZ2VkVGVzdElkICE9PSB0ZXN0LmlkICYmICFkcmFnZ2VkSXNSdW5uaW5nICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldEluc2VydEluZGljYXRvcih7IHN0YW5kSWQ6IHN0YW5kLmlkLCBpbmRleDogaWR4IH0pOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBkcm9wT25TdGFuZChzdGFuZC5pZCwgaWR4KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogLTYsIHRvcDogMCwgd2lkdGg6ICc1MCUnLCBoZWlnaHQ6ICcxMDAlJywgekluZGV4OiAyMCwgbWluV2lkdGg6IDIwIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldEluc2VydEluZGljYXRvcih7IHN0YW5kSWQ6IHN0YW5kLmlkLCBpbmRleDogaWR4ICsgMSB9KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIGlkeCArIDEpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCByaWdodDogLTYsIHRvcDogMCwgd2lkdGg6ICc1MCUnLCBoZWlnaHQ6ICcxMDAlJywgekluZGV4OiAyMCwgbWluV2lkdGg6IDIwIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogSW5zZXJ0IGluZGljYXRvciBiZWZvcmUgdGhpcyB0ZXN0IFx1MjAxNCBzdXBwcmVzc2VkIGZvciBSdW5uaW5nIGRyYWdzICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93SGVyZSAmJiAhZHJhZ2dlZElzUnVubmluZyAmJiBpbmQhLmluZGV4ID09PSBpZHggJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogLTQsIHRvcDogMCwgYm90dG9tOiAwIH19PjxJbnNlcnRMaW5lIHRoZW1lPXt0aGVtZX0gLz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogVGVzdCBiYXIgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiAwLCB3aWR0aCwgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGVzdEJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0PXt0ZXN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Rlc3RSdW5uaW5nPXtpc1Rlc3RSdW5uaW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2VkVGVzdElkPXtkcmFnZ2VkVGVzdElkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17d2lkdGh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJBUl9IRUlHSFQ9e0JBUl9IRUlHSFR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlTdGF0dXM9e2Rpc3BsYXlTdGF0dXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVkTWFpbj17cmVzb2x2ZWRNYWlufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZEluZm89e3Jlc29sdmVkSW5mb31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0luZm9PbkJhcj17c2hvd0luZm9PbkJhcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17KGUpID0+IHsgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJzsgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyh0ZXN0LmlkKSk7IHNldERyYWdnZWRUZXN0SWQodGVzdC5pZCk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17Y2xlYXJEcmFnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1lbnVPcGVuPXsocmVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhZ2dlZFRlc3RJZCB8fCBpc0xvY2tlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQcmlvcml0eUlucHV0VmFsdWUoU3RyaW5nKHRlc3QucHJpb3JpdHkgPz8gNTApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RhcnREYXRlSW5wdXRWYWx1ZShmb3JtYXREYXRlSW5wdXRWYWx1ZSh0ZXN0LnRlc3Rfc3RhcnRlZF9kYXRlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEVuZERhdGVJbnB1dFZhbHVlKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGVuZGluZ1N0YXR1c0NoYW5nZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UG9wb3Zlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yUmVjdDogcmVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6ICdyb290JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5U3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBMaW5lczogcmVzb2x2ZVRlbXBsYXRlKHRpcFRlbXBsYXRlLCB0ZXN0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWQ6IHsgc3RhcnQ6IHRlc3Quc3RhcnQsIGVuZDogdGVzdC5lbmQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogQ2hhbmdlb3ZlciBpbmRpY2F0b3IgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge2lkeCA8IHNjaGVkdWxlLmxlbmd0aCAmJiBjaGFuZ2VvdmVyV2lkdGggPiAwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IHdpZHRoLCB0b3A6IExBTkVfSEVJR0hUIC8gMiAtIDgsIHdpZHRoOiBjaGFuZ2VvdmVyV2lkdGgsIGhlaWdodDogMTYsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IDEsIHdpZHRoOiAnODAlJywgYmFja2dyb3VuZDogYHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoOTBkZWcsICR7dGhlbWUudGV4dERpc2FibGVkfSAwLCAke3RoZW1lLnRleHREaXNhYmxlZH0gNHB4LCB0cmFuc3BhcmVudCA0cHgsIHRyYW5zcGFyZW50IDhweClgIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBJbnNlcnQgaW5kaWNhdG9yIGF0IGVuZCBcdTIwMTQgc3VwcHJlc3NlZCB3aGVuIGRyYWdnaW5nIGEgUnVubmluZyB0ZXN0ICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzaG93SGVyZSAmJiAhZHJhZ2dlZElzUnVubmluZyAmJiBpbmQhLmluZGV4ID09PSBzdGFuZC50ZXN0cy5sZW5ndGggJiYgc2NoZWR1bGUubGVuZ3RoID4gMCAmJiAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdCA9IHNjaGVkdWxlW3NjaGVkdWxlLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBsZWZ0LCB3aWR0aCB9ID0gZ2V0QmFyUG9zKGxhc3Quc3RhcnQsIGxhc3QuZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY0VuZCA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQobGFzdC5lbmQsIHN0YW5kLmNoYW5nZW92ZXJfaG91cnMsIHdTdGFydCwgd0VuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGFuZ2VvdmVyV2lkdGggPSBob3Vyc0JldHdlZW4obGFzdC5lbmQsIGNFbmQpICogcHhQZXJIb3VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGxlZnQgKyB3aWR0aCArIGNoYW5nZW92ZXJXaWR0aCArIDgsIHRvcDogMCwgYm90dG9tOiAwIH19PjxJbnNlcnRMaW5lIHRoZW1lPXt0aGVtZX0gLz48L2Rpdj47XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIEVtcHR5IHN0YXRlICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzdGFuZC50ZXN0cy5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgcG9zaXRpb246ICdhYnNvbHV0ZScsIGluc2V0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGRyYWdnZWRUZXN0SWQgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS50ZXh0RGlzYWJsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGRyYWdnZWRUZXN0SWQgPyA2MDAgOiA0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2RyYWdnZWRUZXN0SWQgPyAnRHJvcCBoZXJlIHRvIHNjaGVkdWxlJyA6ICdEcm9wIHRlc3RzIGhlcmUgdG8gc2NoZWR1bGUnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KX1cclxuXHJcbiAgICAgICAgICAgIHsvKiBObyBzdGFuZHMgbWVzc2FnZSAqL31cclxuICAgICAgICAgICAge3N0YW5kcy5sZW5ndGggPT09IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCB0ZXh0QWxpZ246ICdjZW50ZXInLCBwYWRkaW5nOiAnNDhweCAyNHB4JyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRTaXplOiAxMixcclxuICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgIE5vIHRlc3Qgc3RhbmRzIGxvYWRlZC4gQmluZCB0aGUgdGVzdFN0YW5kcyBwcm9wZXJ0eSB0byB5b3VyIGdldFRlc3RTdGFuZHMgcXVlcnkuXHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7cG9wb3ZlciAmJiAoXHJcbiAgICAgICAgPEFjdGlvblBvcG92ZXJcclxuICAgICAgICAgIHBvcG92ZXI9e3BvcG92ZXJ9XHJcbiAgICAgICAgICBzdGF0dXNPcHRpb25zTGlzdD17c3RhdHVzT3B0aW9uc0xpc3R9XG4gICAgICAgICAgcHJpb3JpdHlJbnB1dFZhbHVlPXtwcmlvcml0eUlucHV0VmFsdWV9XG4gICAgICAgICAgc3RhcnREYXRlSW5wdXRWYWx1ZT17c3RhcnREYXRlSW5wdXRWYWx1ZX1cbiAgICAgICAgICBlbmREYXRlSW5wdXRWYWx1ZT17ZW5kRGF0ZUlucHV0VmFsdWV9XG4gICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgIG9uQ2xvc2U9e2Nsb3NlUG9wb3Zlcn1cbiAgICAgICAgICBvbk1vZGVDaGFuZ2U9e2hhbmRsZVBvcG92ZXJNb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgb25Qcmlvcml0eUlucHV0Q2hhbmdlPXtzZXRQcmlvcml0eUlucHV0VmFsdWV9XHJcbiAgICAgICAgICBvbkNvbmZpcm1Qcmlvcml0eT17aGFuZGxlQ29uZmlybVByaW9yaXR5fVxyXG4gICAgICAgICAgb25QaWNrU3RhdHVzPXtoYW5kbGVQaWNrU3RhdHVzfVxyXG4gICAgICAgICAgb25FZGl0VGVzdD17aGFuZGxlRWRpdFRlc3R9XHJcbiAgICAgICAgICBvblN0YXJ0RGF0ZUlucHV0Q2hhbmdlPXtzZXRTdGFydERhdGVJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgb25Db25maXJtU3RhcnREYXRlPXtoYW5kbGVDb25maXJtU3RhcnREYXRlfVxyXG4gICAgICAgICAgb25FbmREYXRlSW5wdXRDaGFuZ2U9e3NldEVuZERhdGVJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgb25Db25maXJtRW5kRGF0ZT17aGFuZGxlQ29uZmlybUVuZERhdGV9XHJcbiAgICAgICAgICBwYW5lbFJlZj17cG9wb3ZlclJlZn1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuIiwgIlxuICAgICAgICAgIGV4cG9ydCBjb25zdCB7IFJldG9vbCB9ID0gd2luZG93LmNjY19zdXBwb3J0X1JldG9vbEN1c3RvbUNvbXBvbmVuQ29sbGVjdGlvbnM7XG4gICAgICAgICIsICJcbiAgICAgICAgICBleHBvcnQgY29uc3QgeyBGcmFnbWVudCwganN4cywganN4LCBkZWZhdWx0IH0gPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmVhY3RKU1hSdW50aW1lO1xuICAgICAgICAiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ1UsV0FBTyxVQUFVLE9BQU87QUFBQTtBQUFBOzs7QUNEbEMsbUJBQW1FOzs7QUNDbEQsSUFBTSxFQUFFLE9BQU8sSUFBSSxPQUFPOzs7QUNBMUIsSUFBTSxFQUFFLFVBQVUsTUFBTSxLQUFLLFNBQUFBLFNBQVEsSUFBSSxPQUFPOzs7QUY4SGpFLElBQU0sYUFBYSxDQUNqQixLQUNBLGtCQUEwQyxDQUFDLEdBQzNDLHFCQUNnQjtBQUNoQixRQUFNLFNBQVMsS0FBSyxTQUFTO0FBRTdCLFFBQU0sU0FBUyxLQUFLLFdBQVc7QUFDL0IsUUFBTSxTQUFTLEtBQUssV0FBVyxTQUFTLFlBQVk7QUFDcEQsUUFBTSxVQUFVLEtBQUssbUJBQW1CLFNBQVMsWUFBWTtBQUM3RCxRQUFNLG1CQUFtQixLQUFLLHFCQUFxQixTQUFTLFlBQVk7QUFDeEUsUUFBTSxhQUFhLEtBQUssYUFBYSxPQUNqQyxJQUFJLElBQUksWUFBWSxJQUFJLGlFQUN4QjtBQUVKLFFBQU0sY0FBYyxNQUFNO0FBQ3hCLFVBQU0sSUFBSSxLQUFLO0FBQ2YsUUFBSSxDQUFDO0FBQUcsYUFBTztBQUNmLFVBQU0sSUFBSSxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDaEMsV0FBTyxNQUFNLENBQUMsSUFBSSxJQUFJO0FBQUEsRUFDeEIsR0FBRztBQUdILFFB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
