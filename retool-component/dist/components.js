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
var MenuItem = ({ label, icon, theme, onClick }) => {
  const [hovered, setHovered] = import_react.default.useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onClick,
      style: {
        padding: "8px 14px",
        fontSize: 13,
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
        icon && /* @__PURE__ */ jsx("span", { style: { fontSize: 14, width: 18, textAlign: "center", color: theme.textMuted }, children: icon }),
        label
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
  return /* @__PURE__ */ jsx(
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
      children: mode === "root" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { style: { padding: "12px 14px 10px", borderBottom: `1px solid ${theme.border}` }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: 13, fontWeight: 700, color: theme.textPrimary, lineHeight: 1.3, marginBottom: 6, wordBreak: "break-word" }, children: test.name }),
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
                return /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: theme.textSecondary, marginBottom: 2, lineHeight: 1.4 }, children: line }, i);
              const label = line.slice(0, colonIdx).trim();
              const value = line.slice(colonIdx + 1).trim();
              return /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, fontSize: 11, marginBottom: 2, lineHeight: 1.4 }, children: [
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
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, fontSize: 11, marginBottom: 2 }, children: [
              /* @__PURE__ */ jsx("span", { style: { color: theme.textMuted, fontWeight: 500 }, children: "Starts:" }),
              /* @__PURE__ */ jsx("span", { style: { color: theme.textPrimary }, children: scheduled.start.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, fontSize: 11 }, children: [
              /* @__PURE__ */ jsx("span", { style: { color: theme.textMuted, fontWeight: 500 }, children: "Ends:" }),
              /* @__PURE__ */ jsx("span", { style: { color: theme.textPrimary }, children: scheduled.end.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { padding: "4px 0" }, children: [
          /* @__PURE__ */ jsx(MenuItem, { label: "Change Priority", icon: "\u2B06", theme, onClick: () => onModeChange("priority") }),
          /* @__PURE__ */ jsx(MenuItem, { label: "Change Status", icon: "\u25C9", theme, onClick: () => onModeChange("status") }),
          displayStatus === "Running" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(MenuItem, { label: "Change Start Date", icon: "\u{1F4C5}", theme, onClick: () => onModeChange("start_date") }),
            /* @__PURE__ */ jsx(MenuItem, { label: "Change End Date", icon: "\u{1F4C5}", theme, onClick: () => onModeChange("end_date") })
          ] }),
          /* @__PURE__ */ jsx(MenuItem, { label: "Edit Test", icon: "\u270E", theme, onClick: onEditTest })
        ] })
      ] }) : mode === "priority" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { style: { padding: "10px 14px 8px", borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: "flex", alignItems: "center", gap: 8 }, children: [
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
        /* @__PURE__ */ jsxs("div", { style: { padding: "10px 14px 8px", borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsx("span", { onClick: () => onModeChange("root"), style: { cursor: "pointer", color: theme.textMuted, fontSize: 16, lineHeight: 1 }, children: "\u2190" }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontWeight: 600, color: theme.textSecondary }, children: "Change Status" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: { padding: "4px 0" }, children: statusOptionsList.map((s) => /* @__PURE__ */ jsx(MenuItem, { label: s === "NULL" ? "Clear Status (NULL)" : s, theme, onClick: () => onPickStatus(s) }, s)) })
      ] }) : mode === "start_date" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { style: { padding: "10px 14px 8px", borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsx("span", { onClick: () => onModeChange("root"), style: { cursor: "pointer", color: theme.textMuted, fontSize: 16, lineHeight: 1 }, children: "\u2190" }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontWeight: 600, color: theme.textSecondary }, children: "Change Start Date" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { padding: "10px 14px" }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: theme.textMuted, marginBottom: 8 }, children: "Enter new start date:" }),
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
        /* @__PURE__ */ jsxs("div", { style: { padding: "10px 14px 8px", borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsx("span", { onClick: () => onModeChange("root"), style: { cursor: "pointer", color: theme.textMuted, fontSize: 16, lineHeight: 1 }, children: "\u2190" }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontWeight: 600, color: theme.textSecondary }, children: "Change End Date" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { padding: "10px 14px" }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: theme.textMuted, marginBottom: 8 }, children: "Enter new end date:" }),
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
    let lastRunningEnd = new Date(viewStart);
    const runningScheduled = sortedRunning.map((test) => {
      const testDate = parseLocalDate(test.test_started_date) || new Date(viewStart);
      const start = testDate < lastRunningEnd ? new Date(lastRunningEnd) : new Date(testDate);
      const durationEnd = new Date(start.getTime() + test.duration * MS_PER_HOUR);
      const end = durationEnd < /* @__PURE__ */ new Date() ? /* @__PURE__ */ new Date() : durationEnd;
      lastRunningEnd = calculateChangeoverEnd(end, standChangeover, wStart, wEnd);
      return { ...test, start, end };
    });
    const nowPlusChangeover = calculateChangeoverEnd(/* @__PURE__ */ new Date(), standChangeover, wStart, wEnd);
    let currentEnd = new Date(Math.max(lastRunningEnd.getTime(), nowPlusChangeover.getTime()));
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
  const closePopover = (0, import_react.useCallback)(() => setPopover(null), []);
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
    setPopover(null);
  }, [popover, priorityInputValue, setSelectedTestId, setSelectedTestPriority, onChangePriority]);
  const handlePickStatus = (0, import_react.useCallback)((status) => {
    if (!popover)
      return;
    setSelectedTestId(String(popover.test.id));
    setSelectedTestStatus(status === "NULL" ? "" : status);
    onChangeStatus();
    setPopover(null);
  }, [popover, setSelectedTestId, setSelectedTestStatus, onChangeStatus]);
  const handleEditTest = (0, import_react.useCallback)(() => {
    if (!popover)
      return;
    setSelectedTestId(String(popover.test.id));
    onEditTest();
    setPopover(null);
  }, [popover, setSelectedTestId, onEditTest]);
  const handleConfirmStartDate = (0, import_react.useCallback)(() => {
    if (!popover || !startDateInputValue)
      return;
    setSelectedTestId(String(popover.test.id));
    setSelectedTestStartDate(startDateInputValue);
    onChangeStartDate();
    setPopover(null);
    setStartDateInputValue("");
  }, [popover, startDateInputValue, setSelectedTestId, setSelectedTestStartDate, onChangeStartDate]);
  const handleConfirmEndDate = (0, import_react.useCallback)(() => {
    if (!popover || !endDateInputValue)
      return;
    setSelectedTestId(String(popover.test.id));
    setSelectedTestEndDate(endDateInputValue);
    onChangeEndDate();
    setPopover(null);
    setEndDateInputValue("");
  }, [popover, endDateInputValue, setSelectedTestId, setSelectedTestEndDate, onChangeEndDate]);
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
                            setPopover({
                              anchorRect: rect,
                              test,
                              mode: "root",
                              displayStatus,
                              tooltipLines: resolveTemplate(tipTemplate, test),
                              scheduled: isTestRunning ? null : { start: test.start, end: test.end }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhY3QtZ2xvYmFsOnJlYWN0IiwgIi4uL3NyYy9pbmRleC50c3giLCAidHJ5cmV0b29sLWN1c3RvbS1jb21wb25lbnQtY29sbGVjdGlvbnMtZ2xvYmFsOkB0cnlyZXRvb2wvY3VzdG9tLWNvbXBvbmVudC1zdXBwb3J0IiwgInJlYWN0LWpzeC1ydW50aW1lLWdsb2JhbDpyZWFjdC9qc3gtcnVudGltZSJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmVhY3Q7XG4gICAgICAgICIsICJpbXBvcnQgUmVhY3QsIHsgRkMsIHVzZVJlZiwgdXNlTWVtbywgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSZXRvb2wgfSBmcm9tIFwiQHRyeXJldG9vbC9jdXN0b20tY29tcG9uZW50LXN1cHBvcnRcIjtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUeXBlc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFRlc3REYXRhIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkdXJhdGlvbjogbnVtYmVyO1xyXG4gIG93bmVyOiBzdHJpbmc7XHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuICBub3Rlczogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpb3JpdHlfb3JkZXI6IG51bWJlciB8IG51bGw7XHJcbiAgYWxsb2NhdGlvbl9pZDogbnVtYmVyIHwgbnVsbDtcclxuICBhc3NpZ25lZF9wYXJ0czogc3RyaW5nIHwgbnVsbDtcclxuICBwYXJ0X3JlYWR5X2RhdGU6IHN0cmluZyB8IG51bGw7XHJcbiAgcGFydF9zdGF0dXM6IHN0cmluZztcclxuICB0ZXN0X3N0YXJ0ZWRfZGF0ZTogc3RyaW5nIHwgbnVsbDtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7IC8vIGFsbG93IGFyYml0cmFyeSBmaWVsZHMgZm9yIHRlbXBsYXRlIHJlc29sdXRpb25cclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YW5kRGVmIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBjaGFuZ2VvdmVyX2hvdXJzPzogbnVtYmVyIHwgbnVsbDtcclxufVxyXG5cclxuaW50ZXJmYWNlIE5vbldvcmtpbmdCbG9jayB7XHJcbiAgc3RhcnQ6IERhdGU7XHJcbiAgZW5kOiBEYXRlO1xyXG4gIG5vdGVzPzogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSW50ZXJuYWxTdGFuZCB7XHJcbiAgaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgdGVzdHM6IFRlc3REYXRhW107XHJcbiAgY2hhbmdlb3Zlcl9ob3VyczogbnVtYmVyO1xyXG4gIG5vbldvcmtpbmdCbG9ja3M6IE5vbldvcmtpbmdCbG9ja1tdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgU2NoZWR1bGVkVGVzdCBleHRlbmRzIFRlc3REYXRhIHtcclxuICBzdGFydDogRGF0ZTtcclxuICBlbmQ6IERhdGU7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnNlcnRJbmRpY2F0b3Ige1xyXG4gIHN0YW5kSWQ6IG51bWJlciB8IHN0cmluZztcclxuICBpbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQWxsb2NhdGlvblJlY29yZCB7XHJcbiAgdGVzdF9pZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBwcmlvcml0eV9vcmRlcjogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQW5jaG9yUmVjdCB7XHJcbiAgdG9wOiBudW1iZXI7XHJcbiAgYm90dG9tOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG4gIHJpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBQb3BvdmVyU3RhdGUge1xyXG4gIGFuY2hvclJlY3Q6IEFuY2hvclJlY3Q7XHJcbiAgdGVzdDogVGVzdERhdGE7XHJcbiAgbW9kZTogJ3Jvb3QnIHwgJ3ByaW9yaXR5JyB8ICdzdGF0dXMnIHwgJ3N0YXJ0X2RhdGUnIHwgJ2VuZF9kYXRlJztcclxuICBkaXNwbGF5U3RhdHVzOiBzdHJpbmc7XHJcbiAgdG9vbHRpcExpbmVzOiBzdHJpbmc7XHJcbiAgc2NoZWR1bGVkOiB7IHN0YXJ0OiBEYXRlOyBlbmQ6IERhdGUgfSB8IG51bGw7XHJcbn1cclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUaGVtZVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFRoZW1lVG9rZW5zIHtcclxuICBpc0Rhcms6IGJvb2xlYW47XHJcblxyXG4gIC8vIEJhY2tncm91bmRzXHJcbiAgY2FudmFzOiBzdHJpbmc7XHJcbiAgc3VyZmFjZTogc3RyaW5nO1xyXG4gIHN1cmZhY2VTZWNvbmRhcnk6IHN0cmluZztcclxuICBiZ1N1YnRsZTogc3RyaW5nO1xyXG4gIHN1cmZhY2VIb3Zlcjogc3RyaW5nO1xyXG4gIGFjY2VudFN1YnRsZTogc3RyaW5nO1xyXG5cclxuICAvLyBSdW5uaW5nIChwdXJwbGUpIHRpbnRzXHJcbiAgcnVubmluZ0JnOiBzdHJpbmc7XHJcbiAgcnVubmluZ0JvcmRlcjogc3RyaW5nO1xyXG4gIHJ1bm5pbmdUZXh0OiBzdHJpbmc7XHJcbiAgcnVubmluZ1RleHREYXJrOiBzdHJpbmc7XHJcblxyXG4gIC8vIFRleHRcclxuICB0ZXh0UHJpbWFyeTogc3RyaW5nO1xyXG4gIHRleHRTZWNvbmRhcnk6IHN0cmluZztcclxuICB0ZXh0VGVydGlhcnk6IHN0cmluZztcclxuICB0ZXh0TXV0ZWQ6IHN0cmluZztcclxuICB0ZXh0RGlzYWJsZWQ6IHN0cmluZztcclxuXHJcbiAgLy8gQm9yZGVyc1xyXG4gIGJvcmRlcjogc3RyaW5nO1xyXG4gIGJvcmRlclN0cm9uZzogc3RyaW5nO1xyXG5cclxuICAvLyBBY2NlbnQgKHByaW1hcnkgYWN0aW9uKVxyXG4gIGFjY2VudDogc3RyaW5nO1xyXG4gIGFjY2VudEZnOiBzdHJpbmc7XHJcbiAgYWNjZW50TXV0ZWQ6IHN0cmluZztcclxuXHJcbiAgLy8gVHlwb2dyYXBoeVxyXG4gIGZvbnRGYW1pbHk6IHN0cmluZztcclxuICBmb250TW9ubzogc3RyaW5nO1xyXG5cclxuICAvLyBSYWRpaSAobnVtZXJpYyBweClcclxuICByYWRpdXNTbTogbnVtYmVyO1xyXG4gIHJhZGl1czogbnVtYmVyO1xyXG4gIHJhZGl1c0xnOiBudW1iZXI7XHJcbiAgcmFkaXVzWGw6IG51bWJlcjtcclxuXHJcbiAgLy8gU3RhdHVzIGNvbG91cnMgKGNhcCBiYXJzICYgdGV4dClcclxuICBzdGF0dXNDYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XHJcbiAgc3RhdHVzVGV4dDogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxufVxyXG5cclxuY29uc3QgYnVpbGRUaGVtZSA9IChcclxuICByYXc6IGFueSxcclxuICBzdGF0dXNPdmVycmlkZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fSxcclxuICBtb25vRm9udE92ZXJyaWRlPzogc3RyaW5nXHJcbik6IFRoZW1lVG9rZW5zID0+IHtcclxuICBjb25zdCBpc0RhcmsgPSByYXc/Lm1vZGUgPT09ICdkYXJrJztcclxuXHJcbiAgY29uc3QgYWNjZW50ID0gcmF3Py5wcmltYXJ5IHx8ICcjM0I4MkY2JztcclxuICBjb25zdCBjYW52YXMgPSByYXc/LmNhbnZhcyB8fCAoaXNEYXJrID8gJyMxQzFDMkUnIDogJyNGOUZBRkInKTtcclxuICBjb25zdCBzdXJmYWNlID0gcmF3Py5zdXJmYWNlUHJpbWFyeSB8fCAoaXNEYXJrID8gJyMyNTI1MzUnIDogJyNGRkZGRkYnKTtcclxuICBjb25zdCBzdXJmYWNlU2Vjb25kYXJ5ID0gcmF3Py5zdXJmYWNlU2Vjb25kYXJ5IHx8IChpc0RhcmsgPyAnIzFFMUUzMCcgOiAnI0YzRjRGNicpO1xyXG4gIGNvbnN0IGZvbnRGYW1pbHkgPSByYXc/LmRlZmF1bHRGb250Py5uYW1lXHJcbiAgICA/IGAnJHtyYXcuZGVmYXVsdEZvbnQubmFtZX0nLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgc2Fucy1zZXJpZmBcclxuICAgIDogXCInRE0gU2FucycsIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZlwiO1xyXG5cclxuICBjb25zdCBiYXNlUmFkaXVzID0gKCgpID0+IHtcclxuICAgIGNvbnN0IHIgPSByYXc/LmJvcmRlclJhZGl1cztcclxuICAgIGlmICghcikgcmV0dXJuIDY7XHJcbiAgICBjb25zdCBuID0gcGFyc2VJbnQoU3RyaW5nKHIpLCAxMCk7XHJcbiAgICByZXR1cm4gaXNOYU4obikgPyA2IDogbjtcclxuICB9KSgpO1xyXG5cclxuICAvLyBUZXh0XHJcbiAgY29uc3QgdGV4dFByaW1hcnkgID0gaXNEYXJrID8gJyNGOUZBRkInIDogJyMxMTE4MjcnO1xyXG4gIGNvbnN0IHRleHRTZWNvbmRhcnkgPSBpc0RhcmsgPyAnI0QxRDVEQicgOiAnIzM3NDE1MSc7XHJcbiAgY29uc3QgdGV4dFRlcnRpYXJ5ID0gaXNEYXJrID8gJyNBMEFFQzAnIDogJyM0QjU1NjMnO1xyXG4gIGNvbnN0IHRleHRNdXRlZCAgICA9IGlzRGFyayA/ICcjNzE4MDk2JyA6ICcjNkI3MjgwJztcclxuICBjb25zdCB0ZXh0RGlzYWJsZWQgPSBpc0RhcmsgPyAnIzRCNTU2MycgOiAnIzlDQTNBRic7XHJcblxyXG4gIC8vIEJvcmRlcnNcclxuICBjb25zdCBib3JkZXIgICAgICAgPSBpc0RhcmsgPyAnIzM3NDE1MScgOiAnI0U1RTdFQic7XHJcbiAgY29uc3QgYm9yZGVyU3Ryb25nID0gaXNEYXJrID8gJyM0QjU1NjMnIDogJyNEMUQ1REInO1xyXG5cclxuICAvLyBCYWNrZ3JvdW5kc1xyXG4gIGNvbnN0IGJnU3VidGxlICAgICA9IGlzRGFyayA/ICcjMUExQTJFJyA6ICcjRjNGNEY2JztcclxuICBjb25zdCBzdXJmYWNlSG92ZXIgPSBpc0RhcmsgPyAnIzJFMkUzRScgOiAnI0YzRjRGNic7XHJcbiAgY29uc3QgYWNjZW50U3VidGxlID0gaXNEYXJrID8gYCR7YWNjZW50fTMzYCA6ICcjRUZGNkZGJztcclxuICBjb25zdCBhY2NlbnRNdXRlZCAgPSBpc0RhcmsgPyBgJHthY2NlbnR9ODBgIDogJyM5M0M1RkQnO1xyXG5cclxuICAvLyBSdW5uaW5nIHB1cnBsZVxyXG4gIGNvbnN0IHJ1bm5pbmdCZyAgICAgICA9IGlzRGFyayA/ICcjMkQxQjRFJyA6ICcjRjNFOEZGJztcclxuICBjb25zdCBydW5uaW5nQm9yZGVyICAgPSBpc0RhcmsgPyAnIzdFM0RBQScgOiAnI0M0QjVGRCc7XHJcbiAgY29uc3QgcnVubmluZ1RleHQgICAgID0gJyM3RTIyQ0UnO1xyXG4gIGNvbnN0IHJ1bm5pbmdUZXh0RGFyayA9ICcjM0IwNzY0JztcclxuXHJcbiAgLy8gU3RhdHVzIGNhcCBjb2xvdXJzXHJcbiAgY29uc3QgZGVmYXVsdENhcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICAgICdSdW5uaW5nJzogICAgICAgICAgICAnIzkzMzNFQScsXHJcbiAgICAnUmVhZHknOiAgICAgICAgICAgICAgJyMyMkM1NUUnLFxyXG4gICAgJ09uIFRpbWUnOiAgICAgICAgICAgICcjRTVBMDBEJyxcclxuICAgICdEZWxheWVkJzogICAgICAgICAgICAnI0VGNDQ0NCcsXHJcbiAgICAnUGFydHMgTm90IEFzc2lnbmVkJzogJyM5Q0EzQUYnLFxyXG4gICAgJ0luIFByb2dyZXNzJzogICAgICAgICcjRTVBMDBEJyxcclxuICB9O1xyXG4gIGNvbnN0IGRlZmF1bHRUZXh0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgJ1J1bm5pbmcnOiAgICAgICAgICAgICcjN0UyMkNFJyxcclxuICAgICdSZWFkeSc6ICAgICAgICAgICAgICAnIzE2QTM0QScsXHJcbiAgICAnT24gVGltZSc6ICAgICAgICAgICAgJyNCNDUzMDknLFxyXG4gICAgJ0RlbGF5ZWQnOiAgICAgICAgICAgICcjREMyNjI2JyxcclxuICAgICdQYXJ0cyBOb3QgQXNzaWduZWQnOiAnIzZCNzI4MCcsXHJcbiAgICAnSW4gUHJvZ3Jlc3MnOiAgICAgICAgJyNCNDUzMDknLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHN0YXR1c0NhcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gIGNvbnN0IHN0YXR1c1RleHQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcclxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhkZWZhdWx0Q2FwKSkge1xyXG4gICAgc3RhdHVzQ2FwW2tleV0gID0gc3RhdHVzT3ZlcnJpZGVzW2tleV0gfHwgZGVmYXVsdENhcFtrZXldO1xyXG4gICAgLy8gZGVyaXZlIHRleHQgY29sb3VyOiBpZiBvdmVycmlkZGVuLCBkYXJrZW4gdGhlIGNhcCBjb2xvdXIgc2xpZ2h0bHk7IG90aGVyd2lzZSB1c2UgZGVmYXVsdFxyXG4gICAgc3RhdHVzVGV4dFtrZXldID0gc3RhdHVzT3ZlcnJpZGVzW2tleV1cclxuICAgICAgPyBzdGF0dXNPdmVycmlkZXNba2V5XVxyXG4gICAgICA6IGRlZmF1bHRUZXh0W2tleV07XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXNEYXJrLFxyXG4gICAgY2FudmFzLCBzdXJmYWNlLCBzdXJmYWNlU2Vjb25kYXJ5LCBiZ1N1YnRsZSwgc3VyZmFjZUhvdmVyLCBhY2NlbnRTdWJ0bGUsXHJcbiAgICBydW5uaW5nQmcsIHJ1bm5pbmdCb3JkZXIsIHJ1bm5pbmdUZXh0LCBydW5uaW5nVGV4dERhcmssXHJcbiAgICB0ZXh0UHJpbWFyeSwgdGV4dFNlY29uZGFyeSwgdGV4dFRlcnRpYXJ5LCB0ZXh0TXV0ZWQsIHRleHREaXNhYmxlZCxcclxuICAgIGJvcmRlciwgYm9yZGVyU3Ryb25nLFxyXG4gICAgYWNjZW50LCBhY2NlbnRGZzogJyNGRkZGRkYnLCBhY2NlbnRNdXRlZCxcclxuICAgIGZvbnRGYW1pbHksXHJcbiAgICBmb250TW9ubzogbW9ub0ZvbnRPdmVycmlkZSA/IGAnJHttb25vRm9udE92ZXJyaWRlfScsIG1vbm9zcGFjZWAgOiBmb250RmFtaWx5LFxyXG4gICAgcmFkaXVzU206IE1hdGgubWF4KDIsIGJhc2VSYWRpdXMgLSAyKSxcclxuICAgIHJhZGl1czogICBiYXNlUmFkaXVzLFxyXG4gICAgcmFkaXVzTGc6IGJhc2VSYWRpdXMgKyAyLFxyXG4gICAgcmFkaXVzWGw6IGJhc2VSYWRpdXMgKyA0LFxyXG4gICAgc3RhdHVzQ2FwLFxyXG4gICAgc3RhdHVzVGV4dCxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFRlbXBsYXRlIFJlc29sdXRpb25cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IGZvcm1hdEZpZWxkVmFsdWUgPSAodmFsOiBhbnkpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQgfHwgdmFsID09PSAnJyB8fCB2YWwgPT09ICduYW4nKSByZXR1cm4gJyc7XHJcbiAgY29uc3Qgc3RyID0gU3RyaW5nKHZhbCk7XHJcbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0vLnRlc3Qoc3RyKSkge1xyXG4gICAgY29uc3QgZCA9IG5ldyBEYXRlKHN0cik7XHJcbiAgICBpZiAoIWlzTmFOKGQuZ2V0VGltZSgpKSkge1xyXG4gICAgICByZXR1cm4gZC50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLUdCJywgeyBkYXk6ICcyLWRpZ2l0JywgbW9udGg6ICdzaG9ydCcgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBzdHI7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlVGVtcGxhdGUgPSAodGVtcGxhdGU6IGFueSwgZGF0YTogUmVjb3JkPHN0cmluZywgYW55Pik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCF0ZW1wbGF0ZSkgcmV0dXJuICcnO1xyXG4gIGNvbnN0IHN0ciA9IHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycgPyB0ZW1wbGF0ZSA6IFN0cmluZyh0ZW1wbGF0ZSk7XHJcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHsoXFx3KylcXH0vZywgKF8sIGZpZWxkKSA9PiBmb3JtYXRGaWVsZFZhbHVlKGRhdGFbZmllbGRdKSk7XHJcbn07XHJcblxyXG5jb25zdCBpc1RlbXBsYXRlRW1wdHkgPSAodGVtcGxhdGU6IGFueSwgZGF0YTogUmVjb3JkPHN0cmluZywgYW55Pik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IHN0ciA9IHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycgPyB0ZW1wbGF0ZSA6IFN0cmluZyh0ZW1wbGF0ZSB8fCAnJyk7XHJcbiAgY29uc3QgcmVzb2x2ZWQgPSByZXNvbHZlVGVtcGxhdGUoc3RyLCBkYXRhKTtcclxuICBjb25zdCBzdGF0aWNPbmx5ID0gc3RyLnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAnJyk7XHJcbiAgcmV0dXJuIHJlc29sdmVkLnRyaW0oKSA9PT0gc3RhdGljT25seS50cmltKCkgfHwgcmVzb2x2ZWQudHJpbSgpID09PSAnJztcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBEYXRlIFV0aWxpdGllc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgTVNfUEVSX0hPVVIgPSAzNjAwMDAwO1xyXG5cclxuY29uc3QgcGFyc2VMb2NhbERhdGUgPSAoZGF0ZVN0cjogc3RyaW5nIHwgbnVsbCk6IERhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIWRhdGVTdHIpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGRhdGVQYXJ0ID0gZGF0ZVN0ci5zcGxpdCgnVCcpWzBdOyAvLyBzdHJpcCB0aW1lIGNvbXBvbmVudCBpZiBwcmVzZW50IChlLmcuIElTTyB0aW1lc3RhbXBzKVxyXG4gIGNvbnN0IHBhcnRzID0gZGF0ZVBhcnQuc3BsaXQoJy0nKS5tYXAoTnVtYmVyKTtcclxuICBpZiAocGFydHMubGVuZ3RoICE9PSAzIHx8IHBhcnRzLnNvbWUoaXNOYU4pKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBkID0gbmV3IERhdGUocGFydHNbMF0sIHBhcnRzWzFdIC0gMSwgcGFydHNbMl0sIDAsIDAsIDAsIDApO1xyXG4gIHJldHVybiBpc05hTihkLmdldFRpbWUoKSkgPyBudWxsIDogZDtcclxufTtcclxuXHJcbmNvbnN0IHRvTWlkbmlnaHQgPSAoZGF0ZTogRGF0ZSk6IERhdGUgPT4ge1xyXG4gIGNvbnN0IGQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICBkLnNldEhvdXJzKDAsIDAsIDAsIDApO1xyXG4gIHJldHVybiBkO1xyXG59O1xyXG5cclxuY29uc3QgaXNXb3JrRGF5ID0gKGQ6IERhdGUpOiBib29sZWFuID0+IGQuZ2V0RGF5KCkgIT09IDAgJiYgZC5nZXREYXkoKSAhPT0gNjtcclxuXHJcbmNvbnN0IGdldE5leHRXb3JrZGF5U3RhcnQgPSAoZGF0ZTogRGF0ZSwgd29ya1N0YXJ0OiBudW1iZXIpOiBEYXRlID0+IHtcclxuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgZC5zZXRIb3Vycyh3b3JrU3RhcnQsIDAsIDAsIDApO1xyXG4gIHdoaWxlIChkLmdldERheSgpID09PSAwIHx8IGQuZ2V0RGF5KCkgPT09IDYpIHtcclxuICAgIGQuc2V0RGF0ZShkLmdldERhdGUoKSArIDEpO1xyXG4gIH1cclxuICByZXR1cm4gZDtcclxufTtcclxuXHJcbmNvbnN0IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQgPSAoXHJcbiAgcHJldlRlc3RFbmQ6IERhdGUsXHJcbiAgY2hhbmdlb3ZlckhvdXJzOiBudW1iZXIsXHJcbiAgd29ya1N0YXJ0OiBudW1iZXIsXHJcbiAgd29ya0VuZDogbnVtYmVyXHJcbik6IERhdGUgPT4ge1xyXG4gIGxldCBjaGFuZ2VvdmVyU3RhcnQgPSBuZXcgRGF0ZShwcmV2VGVzdEVuZCk7XHJcblxyXG4gIGlmICghaXNXb3JrRGF5KGNoYW5nZW92ZXJTdGFydCkgfHwgY2hhbmdlb3ZlclN0YXJ0LmdldEhvdXJzKCkgPj0gd29ya0VuZCkge1xyXG4gICAgY2hhbmdlb3ZlclN0YXJ0ID0gZ2V0TmV4dFdvcmtkYXlTdGFydChuZXcgRGF0ZShjaGFuZ2VvdmVyU3RhcnQuZ2V0VGltZSgpICsgTVNfUEVSX0hPVVIgKiAxMiksIHdvcmtTdGFydCk7XHJcbiAgfSBlbHNlIGlmIChjaGFuZ2VvdmVyU3RhcnQuZ2V0SG91cnMoKSA8IHdvcmtTdGFydCkge1xyXG4gICAgY2hhbmdlb3ZlclN0YXJ0LnNldEhvdXJzKHdvcmtTdGFydCwgMCwgMCwgMCk7XHJcbiAgfVxyXG5cclxuICBsZXQgcmVtYWluaW5nID0gY2hhbmdlb3ZlckhvdXJzO1xyXG4gIGxldCBlbmQgPSBuZXcgRGF0ZShjaGFuZ2VvdmVyU3RhcnQpO1xyXG5cclxuICB3aGlsZSAocmVtYWluaW5nID4gMCkge1xyXG4gICAgaWYgKCFpc1dvcmtEYXkoZW5kKSkge1xyXG4gICAgICBlbmQgPSBnZXROZXh0V29ya2RheVN0YXJ0KG5ldyBEYXRlKGVuZC5nZXRUaW1lKCkgKyBNU19QRVJfSE9VUiAqIDEyKSwgd29ya1N0YXJ0KTtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBhdmFpbGFibGUgPSB3b3JrRW5kIC0gZW5kLmdldEhvdXJzKCk7XHJcbiAgICBjb25zdCBhcHBseSA9IE1hdGgubWluKHJlbWFpbmluZywgYXZhaWxhYmxlKTtcclxuICAgIGVuZC5zZXRUaW1lKGVuZC5nZXRUaW1lKCkgKyBhcHBseSAqIE1TX1BFUl9IT1VSKTtcclxuICAgIHJlbWFpbmluZyAtPSBhcHBseTtcclxuICAgIGlmIChyZW1haW5pbmcgPiAwKSB7XHJcbiAgICAgIGVuZCA9IGdldE5leHRXb3JrZGF5U3RhcnQobmV3IERhdGUoZW5kLmdldFRpbWUoKSArIE1TX1BFUl9IT1VSICogMTIpLCB3b3JrU3RhcnQpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZW5kO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VOb25Xb3JraW5nQmxvY2tzID0gKHJhdzogYW55KTogTm9uV29ya2luZ0Jsb2NrW10gPT4ge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheShyYXcpKSByZXR1cm4gW107XHJcbiAgY29uc3QgcmVzdWx0OiBOb25Xb3JraW5nQmxvY2tbXSA9IFtdO1xyXG4gIGZvciAoY29uc3QgZW50cnkgb2YgcmF3KSB7XHJcbiAgICBpZiAoIWVudHJ5IHx8IHR5cGVvZiBlbnRyeSAhPT0gJ29iamVjdCcpIGNvbnRpbnVlO1xyXG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZShlbnRyeS5zdGFydCk7XHJcbiAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShlbnRyeS5lbmQpO1xyXG4gICAgaWYgKGlzTmFOKHN0YXJ0LmdldFRpbWUoKSkgfHwgaXNOYU4oZW5kLmdldFRpbWUoKSkgfHwgZW5kIDw9IHN0YXJ0KSBjb250aW51ZTtcclxuICAgIHJlc3VsdC5wdXNoKHsgc3RhcnQsIGVuZCwgbm90ZXM6IGVudHJ5Lm5vdGVzID8/IHVuZGVmaW5lZCB9KTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmNvbnN0IGFkdmFuY2VQYXN0Tm9uV29ya2luZyA9IChkYXRlOiBEYXRlLCBibG9ja3M6IE5vbldvcmtpbmdCbG9ja1tdKTogRGF0ZSA9PiB7XHJcbiAgbGV0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gIGxldCBjaGFuZ2VkID0gdHJ1ZTtcclxuICB3aGlsZSAoY2hhbmdlZCkge1xyXG4gICAgY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgZm9yIChjb25zdCBiIG9mIGJsb2Nrcykge1xyXG4gICAgICBpZiAocmVzdWx0ID49IGIuc3RhcnQgJiYgcmVzdWx0IDwgYi5lbmQpIHtcclxuICAgICAgICByZXN1bHQgPSBuZXcgRGF0ZShiLmVuZCk7XHJcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbi8vIFB1c2ggc3RhcnQgZm9yd2FyZCB1bnRpbCB0aGUgZnVsbCB3aW5kb3cgW3N0YXJ0LCBzdGFydCtkdXJhdGlvbikgZG9lc24ndCBvdmVybGFwIGFueSBibG9jay5cclxuY29uc3QgZmluZFZhbGlkU3RhcnQgPSAocHJvcG9zZWRTdGFydDogRGF0ZSwgZHVyYXRpb25Ib3VyczogbnVtYmVyLCBibG9ja3M6IE5vbldvcmtpbmdCbG9ja1tdKTogRGF0ZSA9PiB7XHJcbiAgbGV0IHJlc3VsdCA9IG5ldyBEYXRlKHByb3Bvc2VkU3RhcnQpO1xyXG4gIGxldCBjaGFuZ2VkID0gdHJ1ZTtcclxuICB3aGlsZSAoY2hhbmdlZCkge1xyXG4gICAgY2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgY29uc3QgZW5kID0gbmV3IERhdGUocmVzdWx0LmdldFRpbWUoKSArIGR1cmF0aW9uSG91cnMgKiBNU19QRVJfSE9VUik7XHJcbiAgICBmb3IgKGNvbnN0IGIgb2YgYmxvY2tzKSB7XHJcbiAgICAgIGlmIChyZXN1bHQgPCBiLmVuZCAmJiBlbmQgPiBiLnN0YXJ0KSB7XHJcbiAgICAgICAgcmVzdWx0ID0gbmV3IERhdGUoYi5lbmQpO1xyXG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jb25zdCBnZW5lcmF0ZURheXMgPSAoc3RhcnQ6IERhdGUsIG51bURheXM6IG51bWJlcik6IERhdGVbXSA9PiB7XHJcbiAgY29uc3QgZGF5czogRGF0ZVtdID0gW107XHJcbiAgbGV0IGN1ciA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51bURheXM7IGkrKykge1xyXG4gICAgZGF5cy5wdXNoKG5ldyBEYXRlKGN1cikpO1xyXG4gICAgY3VyLnNldERhdGUoY3VyLmdldERhdGUoKSArIDEpO1xyXG4gIH1cclxuICByZXR1cm4gZGF5cztcclxufTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlV2Vla3MgPSAoc3RhcnQ6IERhdGUsIG51bURheXM6IG51bWJlcik6IERhdGVbXSA9PiB7XHJcbiAgY29uc3QgcmVzdWx0OiBEYXRlW10gPSBbXTtcclxuICBsZXQgY3VyID0gbmV3IERhdGUoc3RhcnQpO1xyXG4gIHdoaWxlIChjdXIuZ2V0RGF5KCkgIT09IDEpIGN1ci5zZXREYXRlKGN1ci5nZXREYXRlKCkgLSAxKTtcclxuICBjb25zdCBlbmREYXRlID0gbmV3IERhdGUoc3RhcnQpO1xyXG4gIGVuZERhdGUuc2V0RGF0ZShlbmREYXRlLmdldERhdGUoKSArIG51bURheXMpO1xyXG4gIHdoaWxlIChjdXIgPCBlbmREYXRlKSB7XHJcbiAgICByZXN1bHQucHVzaChuZXcgRGF0ZShjdXIpKTtcclxuICAgIGN1ci5zZXREYXRlKGN1ci5nZXREYXRlKCkgKyA3KTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmNvbnN0IGhvdXJzQmV0d2VlbiA9IChhOiBEYXRlLCBiOiBEYXRlKTogbnVtYmVyID0+IChiLmdldFRpbWUoKSAtIGEuZ2V0VGltZSgpKSAvIE1TX1BFUl9IT1VSO1xyXG5jb25zdCBmb3JtYXRXZWVrID0gKGQ6IERhdGUpOiBzdHJpbmcgPT4gYFcvQyAke2QudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1HQicsIHsgZGF5OiAnMi1kaWdpdCcsIG1vbnRoOiAnc2hvcnQnIH0pfWA7XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gUGFydCBTdGF0dXMgTG9naWNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IG5vcm1hbGl6ZVBhcnRTdGF0dXMgPSAocmF3U3RhdHVzOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghcmF3U3RhdHVzIHx8IHJhd1N0YXR1cyA9PT0gJ25hbicpIHJldHVybiAnSW4gUHJvZ3Jlc3MnO1xyXG4gIGNvbnN0IGxvd2VyID0gcmF3U3RhdHVzLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xyXG4gIGlmIChsb3dlciA9PT0gJ3JlYWR5JykgcmV0dXJuICdSZWFkeSc7XHJcbiAgaWYgKGxvd2VyID09PSAncGFydHMgbm90IGFzc2lnbmVkJykgcmV0dXJuICdQYXJ0cyBOb3QgQXNzaWduZWQnO1xyXG4gIHJldHVybiAnSW4gUHJvZ3Jlc3MnO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Q2FsY3VsYXRlZFN0YXR1cyA9ICh0ZXN0OiBUZXN0RGF0YSwgdGVzdFN0YXJ0RGF0ZTogRGF0ZSB8IG51bGwgPSBudWxsKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBiYXNlU3RhdHVzID0gbm9ybWFsaXplUGFydFN0YXR1cyh0ZXN0LnBhcnRfc3RhdHVzKTtcclxuICBpZiAoYmFzZVN0YXR1cyA9PT0gJ1JlYWR5JykgcmV0dXJuICdSZWFkeSc7XHJcbiAgaWYgKGJhc2VTdGF0dXMgPT09ICdQYXJ0cyBOb3QgQXNzaWduZWQnKSByZXR1cm4gJ1BhcnRzIE5vdCBBc3NpZ25lZCc7XHJcblxyXG4gIGlmICh0ZXN0U3RhcnREYXRlICYmIHRlc3QucGFydF9yZWFkeV9kYXRlKSB7XHJcbiAgICBjb25zdCByZWFkeURhdGUgPSBwYXJzZUxvY2FsRGF0ZSh0ZXN0LnBhcnRfcmVhZHlfZGF0ZSk7XHJcbiAgICBjb25zdCBzdGFydERhdGUgPSB0b01pZG5pZ2h0KHRlc3RTdGFydERhdGUpO1xyXG4gICAgaWYgKHJlYWR5RGF0ZSAmJiBzdGFydERhdGUpIHtcclxuICAgICAgcmV0dXJuIHJlYWR5RGF0ZS5nZXRUaW1lKCkgPiBzdGFydERhdGUuZ2V0VGltZSgpID8gJ0RlbGF5ZWQnIDogJ09uIFRpbWUnO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gJ0luIFByb2dyZXNzJztcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBTdGF0dXMgLyBQcmlvcml0eSBoZWxwZXJzICh0aGVtZS1hd2FyZSlcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IGlzUnVubmluZ1Rlc3QgPSAodGVzdDogVGVzdERhdGEpOiBib29sZWFuID0+IHRlc3Quc3RhdHVzID09PSAnUnVubmluZyc7XHJcblxyXG5jb25zdCBnZXRDYXBDb2xvciA9IChzdGF0dXM6IHN0cmluZywgdGhlbWU6IFRoZW1lVG9rZW5zKTogc3RyaW5nID0+XHJcbiAgdGhlbWUuc3RhdHVzQ2FwW3N0YXR1c10gfHwgdGhlbWUuc3RhdHVzQ2FwWydJbiBQcm9ncmVzcyddIHx8ICcjRTVBMDBEJztcclxuXHJcbmNvbnN0IGdldFN0YXR1c1RleHRDb2xvciA9IChzdGF0dXM6IHN0cmluZywgdGhlbWU6IFRoZW1lVG9rZW5zKTogc3RyaW5nID0+XHJcbiAgdGhlbWUuc3RhdHVzVGV4dFtzdGF0dXNdIHx8IHRoZW1lLnN0YXR1c1RleHRbJ0luIFByb2dyZXNzJ10gfHwgJyNCNDUzMDknO1xyXG5cclxuLy8gUmV0dXJucyAnUnVubmluZycgZm9yIFJ1bm5pbmcgdGVzdHMgKG92ZXJyaWRlcyBwYXJ0IHN0YXR1cyBmb3IgZGlzcGxheSBjb2xvdXJzKVxyXG5jb25zdCBnZXREaXNwbGF5U3RhdHVzID0gKHRlc3Q6IFRlc3REYXRhLCB0ZXN0U3RhcnREYXRlOiBEYXRlIHwgbnVsbCA9IG51bGwpOiBzdHJpbmcgPT4ge1xyXG4gIGlmIChpc1J1bm5pbmdUZXN0KHRlc3QpKSByZXR1cm4gJ1J1bm5pbmcnO1xyXG4gIHJldHVybiBnZXRDYWxjdWxhdGVkU3RhdHVzKHRlc3QsIHRlc3RTdGFydERhdGUpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UHJpb3JpdHlUZXh0Q29sb3IgPSAocHJpb3JpdHk6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gdHlwZW9mIHByaW9yaXR5ID09PSAnbnVtYmVyJyA/IHByaW9yaXR5IDogNTA7XHJcbiAgY29uc3QgY2xhbXBlZCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgdmFsdWUpKTtcclxuICBpZiAoY2xhbXBlZCA8PSAzMCkgcmV0dXJuICcjNkI3MjgwJztcclxuICBpZiAoY2xhbXBlZCA8PSA2MCkgcmV0dXJuICcjRjU5RTBCJztcclxuICBpZiAoY2xhbXBlZCA8PSA4MCkgcmV0dXJuICcjRUE1ODBDJztcclxuICByZXR1cm4gJyNEQzI2MjYnO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UHJpb3JpdHlDb2xvciA9IChwcmlvcml0eTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSB0eXBlb2YgcHJpb3JpdHkgPT09ICdudW1iZXInID8gcHJpb3JpdHkgOiA1MDtcclxuICBjb25zdCBjbGFtcGVkID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCB2YWx1ZSkpO1xyXG4gIGNvbnN0IHJhdGlvID0gY2xhbXBlZCAvIDEwMDtcclxuICBjb25zdCBnID0gTWF0aC5yb3VuZCgyNTUgKiAoMSAtIHJhdGlvKSk7XHJcbiAgY29uc3QgYiA9IE1hdGgucm91bmQoMjU1ICogKDEgLSByYXRpbykpO1xyXG4gIHJldHVybiBgcmdiYSgyNTUsICR7Z30sICR7Yn0sIDAuNilgO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFN1Yi1jb21wb25lbnRzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBJbnNlcnRMaW5lOiBGQzx7IHRoZW1lOiBUaGVtZVRva2VucyB9PiA9ICh7IHRoZW1lIH0pID0+IChcclxuICA8ZGl2IHN0eWxlPXt7XHJcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAyLCBib3R0b206IDIsIHdpZHRoOiAzLFxyXG4gICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LCBib3JkZXJSYWRpdXM6IDIsIHpJbmRleDogMzAsXHJcbiAgICBib3hTaGFkb3c6IGAwIDAgMTJweCAke3RoZW1lLmFjY2VudH0sIDAgMCA0cHggJHt0aGVtZS5hY2NlbnR9YCxcclxuICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICB9fT5cclxuICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTQsIGxlZnQ6IC00LCB3aWR0aDogMTEsIGhlaWdodDogMTEsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCB9fSAvPlxyXG4gICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgYm90dG9tOiAtNCwgbGVmdDogLTQsIHdpZHRoOiAxMSwgaGVpZ2h0OiAxMSwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50IH19IC8+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5jb25zdCBPdXRsaW5lS2V5OiBGQzx7IHRoZW1lOiBUaGVtZVRva2VucyB9PiA9ICh7IHRoZW1lIH0pID0+IChcclxuICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDE2cHgnLCBib3JkZXJUb3A6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzIH19PlxyXG4gICAgPGgzIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDhlbScsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBjb2xvcjogdGhlbWUudGV4dFRlcnRpYXJ5LCBtYXJnaW5Cb3R0b206IDYgfX0+U3RhdHVzIEtleTwvaDM+XHJcbiAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleFdyYXA6ICd3cmFwJywgZ2FwOiAnNHB4IDAnIH19PlxyXG4gICAgICB7KFsnUnVubmluZycsICdSZWFkeScsICdPbiBUaW1lJywgJ0RlbGF5ZWQnLCAnUGFydHMgTm90IEFzc2lnbmVkJ10gYXMgY29uc3QpLm1hcCgoa2V5KSA9PiAoXHJcbiAgICAgICAgPGRpdiBrZXk9e2tleX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA2LCB3aWR0aDogJzUwJScsIG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNCwgaGVpZ2h0OiAxNCwgYmFja2dyb3VuZDogdGhlbWUuc3RhdHVzQ2FwW2tleV0sIGJvcmRlclJhZGl1czogMiwgZmxleFNocmluazogMCB9fSAvPlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiA5LCBjb2xvcjogdGhlbWUuc3RhdHVzVGV4dFtrZXldLCBmb250V2VpZ2h0OiA2MDAsIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyB9fT57a2V5LnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApKX1cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuaW50ZXJmYWNlIFF1ZXVlQ2FyZFByb3BzIHtcclxuICB0ZXN0OiBUZXN0RGF0YTtcclxuICBkcmFnZ2VkVGVzdElkOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIG1haW5UZXh0OiBzdHJpbmc7XHJcbiAgc3ViVGV4dDogc3RyaW5nO1xyXG4gIGluZm9Sb3c6IHN0cmluZztcclxuICBzaG93U3ViOiBib29sZWFuO1xyXG4gIHRoZW1lOiBUaGVtZVRva2VucztcclxuICBvbkRyYWdTdGFydDogKCkgPT4gdm9pZDtcclxuICBvbkRyYWdFbmQ6ICgpID0+IHZvaWQ7XHJcbiAgb25EcmFnT3ZlcjogKGU6IFJlYWN0LkRyYWdFdmVudCkgPT4gdm9pZDtcclxuICBvbk1lbnVPcGVuOiAocmVjdDogQW5jaG9yUmVjdCkgPT4gdm9pZDtcclxufVxyXG5cclxuY29uc3QgUXVldWVDYXJkOiBGQzxRdWV1ZUNhcmRQcm9wcz4gPSAoe1xyXG4gIHRlc3QsIGRyYWdnZWRUZXN0SWQsIHN0YXR1cywgbWFpblRleHQsIHN1YlRleHQsIGluZm9Sb3csIHNob3dTdWIsIHRoZW1lLFxyXG4gIG9uRHJhZ1N0YXJ0LCBvbkRyYWdFbmQsIG9uRHJhZ092ZXIsIG9uTWVudU9wZW4sXHJcbn0pID0+IHtcclxuICBjb25zdCBbaG92ZXJlZCwgc2V0SG92ZXJlZF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgcGlsbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcbiAgY29uc3QgY2FwQ29sb3IgPSBnZXRDYXBDb2xvcihzdGF0dXMsIHRoZW1lKTtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBkcmFnZ2FibGVcclxuICAgICAgb25EcmFnU3RhcnQ9eyhlKSA9PiB7IGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7IG9uRHJhZ1N0YXJ0KCk7IH19XHJcbiAgICAgIG9uRHJhZ0VuZD17b25EcmFnRW5kfVxyXG4gICAgICBvbkRyYWdPdmVyPXtvbkRyYWdPdmVyfVxyXG4gICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEhvdmVyZWQodHJ1ZSl9XHJcbiAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SG92ZXJlZChmYWxzZSl9XHJcbiAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIG1hcmdpbkJvdHRvbTogNixcclxuICAgICAgICBiYWNrZ3JvdW5kOiBkcmFnZ2VkVGVzdElkID09PSB0ZXN0LmlkID8gdGhlbWUuYmdTdWJ0bGUgOiB0aGVtZS5zdXJmYWNlLFxyXG4gICAgICAgIGJvcmRlcjogaG92ZXJlZCA/IGAycHggc29saWQgJHtjYXBDb2xvcn1gIDogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzTGcsXHJcbiAgICAgICAgY3Vyc29yOiAnZ3JhYicsXHJcbiAgICAgICAgb3BhY2l0eTogZHJhZ2dlZFRlc3RJZCA9PT0gdGVzdC5pZCA/IDAuMzUgOiAxLFxyXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICBib3hTaGFkb3c6IGhvdmVyZWQgPyAnMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMTUpJyA6ICcwIDFweCAzcHggcmdiYSgwLDAsMCwwLjA2KScsXHJcbiAgICAgICAgdHJhbnNmb3JtOiBob3ZlcmVkID8gJ3RyYW5zbGF0ZVkoLTJweCknIDogJ3RyYW5zbGF0ZVkoMCknLFxyXG4gICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC4xNXMgZWFzZSwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLCBib3JkZXIgMC4xNXMgZWFzZScsXHJcbiAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAgey8qIFN0YXR1cyBjYXAgYmFyICovfVxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA1LCBtaW5XaWR0aDogNSwgYmFja2dyb3VuZDogY2FwQ29sb3IsIGJvcmRlclJhZGl1czogYCR7dGhlbWUucmFkaXVzTGd9cHggMCAwICR7dGhlbWUucmFkaXVzTGd9cHhgLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgcGFkZGluZzogJzhweCAxMnB4JywgbWluV2lkdGg6IDAgfX0+XHJcbiAgICAgICAgey8qIFRvcCByb3c6IHByaW9yaXR5IGxlZnQsIHN0YXR1cyByaWdodCAqL31cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogNCwgcGFkZGluZ1JpZ2h0OiAyMCB9fT5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IGdldFByaW9yaXR5VGV4dENvbG9yKHRlc3QucHJpb3JpdHkpIH19PlxyXG4gICAgICAgICAgICBQe3Rlc3QucHJpb3JpdHl9XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA3MDAsIGxldHRlclNwYWNpbmc6ICcwLjA1ZW0nLCBjb2xvcjogZ2V0U3RhdHVzVGV4dENvbG9yKHN0YXR1cywgdGhlbWUpLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyBhcyBjb25zdCB9fT5cclxuICAgICAgICAgICAge3N0YXR1cy50b1VwcGVyQ2FzZSgpfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSwgbWFyZ2luQm90dG9tOiAyLCBsaW5lSGVpZ2h0OiAxLjMgfX0+XHJcbiAgICAgICAgICB7bWFpblRleHR9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge3Nob3dTdWIgJiYgKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Cb3R0b206IDQsIGZvbnRXZWlnaHQ6IDQwMCB9fT5cclxuICAgICAgICAgICAge3N1YlRleHR9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA4LCBmb250U2l6ZTogMTEsIGNvbG9yOiB0aGVtZS50ZXh0VGVydGlhcnksIGZsZXhXcmFwOiAnd3JhcCcgfX0+XHJcbiAgICAgICAgICB7aW5mb1Jvdy5zcGxpdCgnXFx1MDBiNycpLm1hcCgocGFydCwgaSwgYXJyKSA9PiAoXHJcbiAgICAgICAgICAgIDxSZWFjdC5GcmFnbWVudCBrZXk9e2l9PlxyXG4gICAgICAgICAgICAgIDxzcGFuPntwYXJ0LnRyaW0oKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAge2kgPCBhcnIubGVuZ3RoIC0gMSAmJiA8c3Bhbj57J1xcdTAwYjcnfTwvc3Bhbj59XHJcbiAgICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHsvKiBUaHJlZS1kb3QgbWVudSBwaWxsICovfVxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcmVmPXtwaWxsUmVmfVxyXG4gICAgICAgIGRyYWdnYWJsZT17ZmFsc2V9XHJcbiAgICAgICAgb25Nb3VzZURvd249eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxyXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgaWYgKHBpbGxSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgICBjb25zdCByID0gcGlsbFJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBvbk1lbnVPcGVuKHsgdG9wOiByLnRvcCwgYm90dG9tOiByLmJvdHRvbSwgbGVmdDogci5sZWZ0LCByaWdodDogci5yaWdodCB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9fVxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgIHRvcDogNixcclxuICAgICAgICAgIHJpZ2h0OiA2LFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogaG92ZXJlZCA/ICdyZ2JhKDAsMCwwLDAuMSknIDogJ3JnYmEoMCwwLDAsMC4wNCknLFxyXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiAxMCxcclxuICAgICAgICAgIHBhZGRpbmc6ICcycHggN3B4JyxcclxuICAgICAgICAgIGZvbnRTaXplOiAxMyxcclxuICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsXHJcbiAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgIGxldHRlclNwYWNpbmc6ICcwLjFlbScsXHJcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxyXG4gICAgICAgICAgb3BhY2l0eTogaG92ZXJlZCA/IDEgOiAwLjQsXHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjE1cywgYmFja2dyb3VuZCAwLjE1cycsXHJcbiAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXHJcbiAgICAgICAgICBmb250V2VpZ2h0OiA3MDAsXHJcbiAgICAgICAgfX1cclxuICAgICAgPlx1MDBCN1x1MDBCN1x1MDBCNzwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmludGVyZmFjZSBUZXN0QmFyUHJvcHMge1xyXG4gIHRlc3Q6IFNjaGVkdWxlZFRlc3Q7XHJcbiAgaXNUZXN0UnVubmluZzogYm9vbGVhbjtcclxuICBkcmFnZ2VkVGVzdElkOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgQkFSX0hFSUdIVDogbnVtYmVyO1xyXG4gIGRpc3BsYXlTdGF0dXM6IHN0cmluZztcclxuICByZXNvbHZlZE1haW46IHN0cmluZztcclxuICByZXNvbHZlZEluZm86IHN0cmluZztcclxuICBzaG93SW5mb09uQmFyOiBib29sZWFuO1xyXG4gIHRoZW1lOiBUaGVtZVRva2VucztcclxuICBvbkRyYWdTdGFydDogKGU6IFJlYWN0LkRyYWdFdmVudCkgPT4gdm9pZDtcclxuICBvbkRyYWdFbmQ6ICgpID0+IHZvaWQ7XHJcbiAgb25NZW51T3BlbjogKHJlY3Q6IEFuY2hvclJlY3QpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmNvbnN0IFRlc3RCYXI6IEZDPFRlc3RCYXJQcm9wcz4gPSAoe1xyXG4gIHRlc3QsIGlzVGVzdFJ1bm5pbmcsIGRyYWdnZWRUZXN0SWQsIHdpZHRoLCBCQVJfSEVJR0hULFxyXG4gIGRpc3BsYXlTdGF0dXMsIHJlc29sdmVkTWFpbiwgcmVzb2x2ZWRJbmZvLCBzaG93SW5mb09uQmFyLCB0aGVtZSxcclxuICBvbkRyYWdTdGFydCwgb25EcmFnRW5kLCBvbk1lbnVPcGVuLFxyXG59KSA9PiB7XHJcbiAgY29uc3QgW2hvdmVyZWQsIHNldEhvdmVyZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHBpbGxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xyXG4gIGNvbnN0IGNhcENvbG9yID0gZ2V0Q2FwQ29sb3IoZGlzcGxheVN0YXR1cywgdGhlbWUpO1xyXG4gIGNvbnN0IHVzZVZlcnRpY2FsRG90cyA9IHdpZHRoIDw9IDQwO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGRyYWdnYWJsZVxyXG4gICAgICBvbkRyYWdTdGFydD17b25EcmFnU3RhcnR9XHJcbiAgICAgIG9uRHJhZ0VuZD17b25EcmFnRW5kfVxyXG4gICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHsgaWYgKCFkcmFnZ2VkVGVzdElkKSBzZXRIb3ZlcmVkKHRydWUpOyB9fVxyXG4gICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldEhvdmVyZWQoZmFsc2UpfVxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDYsXHJcbiAgICAgICAgd2lkdGgsIGhlaWdodDogQkFSX0hFSUdIVCxcclxuICAgICAgICBiYWNrZ3JvdW5kOiBpc1Rlc3RSdW5uaW5nID8gdGhlbWUucnVubmluZ0JnIDogdGhlbWUuc3VyZmFjZSxcclxuICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLCBjdXJzb3I6ICdncmFiJyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxyXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICBvcGFjaXR5OiBkcmFnZ2VkVGVzdElkID09PSB0ZXN0LmlkID8gMC4yNSA6IDEsXHJcbiAgICAgICAgekluZGV4OiBob3ZlcmVkID8gMjUgOiAxNSxcclxuICAgICAgICBib3JkZXI6IGhvdmVyZWRcclxuICAgICAgICAgID8gYDJweCBzb2xpZCAke2NhcENvbG9yfWBcclxuICAgICAgICAgIDogaXNUZXN0UnVubmluZyA/IGAxcHggc29saWQgJHt0aGVtZS5ydW5uaW5nQm9yZGVyfWAgOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXHJcbiAgICAgICAgYm94U2hhZG93OiBob3ZlcmVkXHJcbiAgICAgICAgICA/ICcwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4xNSknXHJcbiAgICAgICAgICA6IGlzVGVzdFJ1bm5pbmcgPyBgMCAxcHggM3B4ICR7dGhlbWUucnVubmluZ0JvcmRlcn02NmAgOiAnMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4wNiknLFxyXG4gICAgICAgIHRyYW5zZm9ybTogaG92ZXJlZCA/ICd0cmFuc2xhdGVZKC0ycHgpJyA6ICd0cmFuc2xhdGVZKDApJyxcclxuICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZSwgYm9yZGVyIDAuMTVzIGVhc2UnLFxyXG4gICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgIH19XHJcbiAgICA+XHJcbiAgICAgIHsvKiBTdGF0dXMgY2FwIGJhciAqL31cclxuICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNSwgbWluV2lkdGg6IDUsIGJhY2tncm91bmQ6IGNhcENvbG9yLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgcGFkZGluZzogJzRweCA4cHgnLCBtaW5XaWR0aDogMCwganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxyXG4gICAgICAgIHsvKiBUb3Agcm93OiBwcmlvcml0eSArIHN0YXR1cyAobGVhdmUgcm9vbSBmb3IgcGlsbCkgKi99XHJcbiAgICAgICAge3dpZHRoID4gNzAgJiYgKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206IDIsIHBhZGRpbmdSaWdodDogd2lkdGggPiA5MCA/IDIyIDogMCB9fT5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiB3aWR0aCA+IDEyMCA/IDExIDogOSwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogaXNUZXN0UnVubmluZyA/IHRoZW1lLnJ1bm5pbmdUZXh0IDogZ2V0UHJpb3JpdHlUZXh0Q29sb3IodGVzdC5wcmlvcml0eSkgfX0+XHJcbiAgICAgICAgICAgICAge2lzVGVzdFJ1bm5pbmcgPyAnXHUyNUI2IFJVTk5JTkcnIDogYFAke3Rlc3QucHJpb3JpdHl9YH1cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICB7d2lkdGggPiAxMTAgJiYgIWlzVGVzdFJ1bm5pbmcgJiYgKFxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogOSwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnMC4wNWVtJywgY29sb3I6IGdldFN0YXR1c1RleHRDb2xvcihkaXNwbGF5U3RhdHVzLCB0aGVtZSksIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIGFzIGNvbnN0IH19PlxyXG4gICAgICAgICAgICAgICAge2Rpc3BsYXlTdGF0dXMudG9VcHBlckNhc2UoKX1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgIHsvKiBNYWluIHRleHQgKi99XHJcbiAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgIGZvbnRTaXplOiB3aWR0aCA+IDEyMCA/IDEyIDogd2lkdGggPiA4MCA/IDExIDogMTAsXHJcbiAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiBpc1Rlc3RSdW5uaW5nID8gdGhlbWUucnVubmluZ1RleHREYXJrIDogdGhlbWUudGV4dFByaW1hcnksXHJcbiAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCBtYXhXaWR0aDogJzEwMCUnLCBsaW5lSGVpZ2h0OiAxLjIsXHJcbiAgICAgICAgfX0+XHJcbiAgICAgICAgICB7cmVzb2x2ZWRNYWlufVxyXG4gICAgICAgIDwvc3Bhbj5cclxuXHJcbiAgICAgICAgey8qIEluZm8gcm93ICovfVxyXG4gICAgICAgIHtzaG93SW5mb09uQmFyICYmIChcclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogOSwgZm9udFdlaWdodDogNDAwLFxyXG4gICAgICAgICAgICBjb2xvcjogaXNUZXN0UnVubmluZyA/IHRoZW1lLnJ1bm5pbmdUZXh0IDogdGhlbWUudGV4dFRlcnRpYXJ5LFxyXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIG1heFdpZHRoOiAnMTAwJScsIG1hcmdpblRvcDogMixcclxuICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICB7cmVzb2x2ZWRJbmZvfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgey8qIE1lbnUgcGlsbCBcdTIwMTQgXHUwMEI3XHUwMEI3XHUwMEI3IG9uIHdpZGUgYmFycywgXHUyMkVFIG9uIG5hcnJvdyBiYXJzLCBhbHdheXMgdmlzaWJsZSAqL31cclxuICAgICAgPGRpdlxyXG4gICAgICAgIHJlZj17cGlsbFJlZn1cclxuICAgICAgICBkcmFnZ2FibGU9e2ZhbHNlfVxyXG4gICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cclxuICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIGlmIChwaWxsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgciA9IHBpbGxSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgb25NZW51T3Blbih7IHRvcDogci50b3AsIGJvdHRvbTogci5ib3R0b20sIGxlZnQ6IHIubGVmdCwgcmlnaHQ6IHIucmlnaHQgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfX1cclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICB0b3A6IDQsXHJcbiAgICAgICAgICByaWdodDogNCxcclxuICAgICAgICAgIGJhY2tncm91bmQ6IGhvdmVyZWQgPyAncmdiYSgwLDAsMCwwLjEyKScgOiAncmdiYSgwLDAsMCwwLjA0KScsXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IDEwLFxyXG4gICAgICAgICAgcGFkZGluZzogdXNlVmVydGljYWxEb3RzID8gJzNweCA0cHgnIDogJzJweCA2cHgnLFxyXG4gICAgICAgICAgZm9udFNpemU6IHVzZVZlcnRpY2FsRG90cyA/IDEwIDogMTIsXHJcbiAgICAgICAgICBjb2xvcjogaXNUZXN0UnVubmluZyA/IHRoZW1lLnJ1bm5pbmdUZXh0IDogdGhlbWUudGV4dE11dGVkLFxyXG4gICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiB1c2VWZXJ0aWNhbERvdHMgPyAwIDogJzAuMWVtJyxcclxuICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXHJcbiAgICAgICAgICBvcGFjaXR5OiBob3ZlcmVkID8gMSA6IDAuMzUsXHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjE1cywgYmFja2dyb3VuZCAwLjE1cycsXHJcbiAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXHJcbiAgICAgICAgICBmb250V2VpZ2h0OiA3MDAsXHJcbiAgICAgICAgfX1cclxuICAgICAgPnt1c2VWZXJ0aWNhbERvdHMgPyAnXHUyMkVFJyA6ICdcdTAwQjdcdTAwQjdcdTAwQjcnfTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBDb250ZXh0IE1lbnVcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IE1lbnVJdGVtOiBGQzx7IGxhYmVsOiBzdHJpbmc7IGljb24/OiBzdHJpbmc7IHRoZW1lOiBUaGVtZVRva2Vuczsgb25DbGljazogKCkgPT4gdm9pZCB9PiA9ICh7IGxhYmVsLCBpY29uLCB0aGVtZSwgb25DbGljayB9KSA9PiB7XHJcbiAgY29uc3QgW2hvdmVyZWQsIHNldEhvdmVyZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0SG92ZXJlZCh0cnVlKX1cclxuICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRIb3ZlcmVkKGZhbHNlKX1cclxuICAgICAgb25DbGljaz17b25DbGlja31cclxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICBwYWRkaW5nOiAnOHB4IDE0cHgnLFxyXG4gICAgICAgIGZvbnRTaXplOiAxMyxcclxuICAgICAgICBmb250V2VpZ2h0OiA1MDAsXHJcbiAgICAgICAgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LFxyXG4gICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgIGJhY2tncm91bmQ6IGhvdmVyZWQgPyB0aGVtZS5zdXJmYWNlSG92ZXIgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICBnYXA6IDgsXHJcbiAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxyXG4gICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgIH19XHJcbiAgICA+XHJcbiAgICAgIHtpY29uICYmIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAxNCwgd2lkdGg6IDE4LCB0ZXh0QWxpZ246ICdjZW50ZXInLCBjb2xvcjogdGhlbWUudGV4dE11dGVkIH19PntpY29ufTwvc3Bhbj59XHJcbiAgICAgIHtsYWJlbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgQWN0aW9uUG9wb3ZlclByb3BzIHtcclxuICBwb3BvdmVyOiBQb3BvdmVyU3RhdGU7XHJcbiAgc3RhdHVzT3B0aW9uc0xpc3Q6IHN0cmluZ1tdO1xyXG4gIHByaW9yaXR5SW5wdXRWYWx1ZTogc3RyaW5nO1xyXG4gIHN0YXJ0RGF0ZUlucHV0VmFsdWU6IHN0cmluZztcclxuICBlbmREYXRlSW5wdXRWYWx1ZTogc3RyaW5nO1xyXG4gIHRoZW1lOiBUaGVtZVRva2VucztcclxuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xyXG4gIG9uTW9kZUNoYW5nZTogKG1vZGU6ICdyb290JyB8ICdwcmlvcml0eScgfCAnc3RhdHVzJyB8ICdzdGFydF9kYXRlJyB8ICdlbmRfZGF0ZScpID0+IHZvaWQ7XHJcbiAgb25Qcmlvcml0eUlucHV0Q2hhbmdlOiAodmFsOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25Db25maXJtUHJpb3JpdHk6ICgpID0+IHZvaWQ7XHJcbiAgb25QaWNrU3RhdHVzOiAoc3RhdHVzOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25FZGl0VGVzdDogKCkgPT4gdm9pZDtcclxuICBvblN0YXJ0RGF0ZUlucHV0Q2hhbmdlOiAodmFsOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25Db25maXJtU3RhcnREYXRlOiAoKSA9PiB2b2lkO1xyXG4gIG9uRW5kRGF0ZUlucHV0Q2hhbmdlOiAodmFsOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25Db25maXJtRW5kRGF0ZTogKCkgPT4gdm9pZDtcclxuICBwYW5lbFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcclxufVxyXG5cclxuY29uc3QgQWN0aW9uUG9wb3ZlcjogRkM8QWN0aW9uUG9wb3ZlclByb3BzPiA9ICh7XHJcbiAgcG9wb3Zlciwgc3RhdHVzT3B0aW9uc0xpc3QsIHByaW9yaXR5SW5wdXRWYWx1ZSwgc3RhcnREYXRlSW5wdXRWYWx1ZSwgZW5kRGF0ZUlucHV0VmFsdWUsIHRoZW1lLFxyXG4gIG9uQ2xvc2UsIG9uTW9kZUNoYW5nZSwgb25Qcmlvcml0eUlucHV0Q2hhbmdlLCBvbkNvbmZpcm1Qcmlvcml0eSwgb25QaWNrU3RhdHVzLCBvbkVkaXRUZXN0LFxyXG4gIG9uU3RhcnREYXRlSW5wdXRDaGFuZ2UsIG9uQ29uZmlybVN0YXJ0RGF0ZSwgb25FbmREYXRlSW5wdXRDaGFuZ2UsIG9uQ29uZmlybUVuZERhdGUsIHBhbmVsUmVmLFxyXG59KSA9PiB7XHJcbiAgY29uc3QgW2ZsaXBwZWRWLCBzZXRGbGlwcGVkVl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgcG9wb3ZlcldpZHRoID0gMjQ4O1xyXG4gIGNvbnN0IHsgYW5jaG9yUmVjdCwgdGVzdCwgbW9kZSwgZGlzcGxheVN0YXR1cywgdG9vbHRpcExpbmVzLCBzY2hlZHVsZWQgfSA9IHBvcG92ZXI7XHJcbiAgY29uc3QgY2FwQ29sb3IgPSBnZXRDYXBDb2xvcihkaXNwbGF5U3RhdHVzLCB0aGVtZSk7XHJcblxyXG4gIC8vIEhvcml6b250YWw6IHJpZ2h0LWFsaWduIHRvIGJ1dHRvbiwgY2xhbXAgdG8gdmlld3BvcnQgZWRnZXNcclxuICBsZXQgbGVmdCA9IGFuY2hvclJlY3QucmlnaHQgLSBwb3BvdmVyV2lkdGg7XHJcbiAgbGVmdCA9IE1hdGgubWF4KDgsIE1hdGgubWluKGxlZnQsIHdpbmRvdy5pbm5lcldpZHRoIC0gcG9wb3ZlcldpZHRoIC0gOCkpO1xyXG5cclxuICAvLyBWZXJ0aWNhbDogYmVsb3cgYnV0dG9uIGJ5IGRlZmF1bHQ7IGZsaXAgYWJvdmUgaWYgbmVhciBib3R0b21cclxuICBjb25zdCB0b3BCZWxvdyA9IGFuY2hvclJlY3QuYm90dG9tICsgNjtcclxuICBjb25zdCBib3R0b21BYm92ZSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIGFuY2hvclJlY3QudG9wICsgNjtcclxuXHJcbiAgLy8gTWVhc3VyZSBwYW5lbCBoZWlnaHQgYW5kIGRlY2lkZSBmbGlwIGRpcmVjdGlvbiBvbiBldmVyeSBtb2RlL2FuY2hvciBjaGFuZ2VcclxuICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHBhbmVsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY29uc3QgcGFuZWxIZWlnaHQgPSBwYW5lbFJlZi5jdXJyZW50LnNjcm9sbEhlaWdodDtcclxuICAgICAgY29uc3Qgc3BhY2VCZWxvdyA9IHdpbmRvdy5pbm5lckhlaWdodCAtIGFuY2hvclJlY3QuYm90dG9tIC0gNiAtIDg7XHJcbiAgICAgIGNvbnN0IHNwYWNlQWJvdmUgPSBhbmNob3JSZWN0LnRvcCAtIDYgLSA4O1xyXG4gICAgICAvLyBGbGlwIGFib3ZlIG9ubHkgaWYgaXQgZG9lc24ndCBmaXQgYmVsb3cgQU5EIHRoZXJlJ3MgbW9yZSBzcGFjZSBhYm92ZVxyXG4gICAgICBzZXRGbGlwcGVkVihwYW5lbEhlaWdodCA+IHNwYWNlQmVsb3cgJiYgc3BhY2VBYm92ZSA+IHNwYWNlQmVsb3cpO1xyXG4gICAgfVxyXG4gIH0sIFttb2RlLCBhbmNob3JSZWN0XSk7XHJcblxyXG4gIGNvbnN0IHBvc1N0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0gZmxpcHBlZFZcclxuICAgID8geyBwb3NpdGlvbjogJ2ZpeGVkJywgbGVmdCwgYm90dG9tOiBib3R0b21BYm92ZSwgekluZGV4OiAzMDAwIH1cclxuICAgIDogeyBwb3NpdGlvbjogJ2ZpeGVkJywgbGVmdCwgdG9wOiB0b3BCZWxvdywgekluZGV4OiAzMDAwIH07XHJcblxyXG4gIGNvbnN0IGxpbmVzID0gdG9vbHRpcExpbmVzLnNwbGl0KCdcXG4nKS5maWx0ZXIobCA9PiB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IGwuc3BsaXQoJzonKTtcclxuICAgIGlmIChwYXJ0cy5sZW5ndGggPCAyKSByZXR1cm4gbC50cmltKCkgIT09ICcnO1xyXG4gICAgcmV0dXJuIHBhcnRzLnNsaWNlKDEpLmpvaW4oJzonKS50cmltKCkgIT09ICcnO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICByZWY9e3BhbmVsUmVmfVxyXG4gICAgICBvbkNvbnRleHRNZW51PXsoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpfVxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIC4uLnBvc1N0eWxlLFxyXG4gICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLnN1cmZhY2UsXHJcbiAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNYbCxcclxuICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxNnB4IHJnYmEoMCwwLDAsMC4xMiksIDAgMXB4IDRweCByZ2JhKDAsMCwwLDAuMDYpJyxcclxuICAgICAgICB3aWR0aDogcG9wb3ZlcldpZHRoLFxyXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICB9fVxyXG4gICAgPlxyXG4gICAgICB7bW9kZSA9PT0gJ3Jvb3QnID8gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICB7LyogRGV0YWlscyBzZWN0aW9uICovfVxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAxNHB4IDEwcHgnLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LCBsaW5lSGVpZ2h0OiAxLjMsIG1hcmdpbkJvdHRvbTogNiwgd29yZEJyZWFrOiAnYnJlYWstd29yZCcgfX0+XHJcbiAgICAgICAgICAgICAge3Rlc3QubmFtZX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206IChsaW5lcy5sZW5ndGggPiAwIHx8IHNjaGVkdWxlZCkgPyA4IDogMCB9fT5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiBnZXRQcmlvcml0eVRleHRDb2xvcih0ZXN0LnByaW9yaXR5KSB9fT5cclxuICAgICAgICAgICAgICAgIFB7dGVzdC5wcmlvcml0eX1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDEwLCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiBnZXRTdGF0dXNUZXh0Q29sb3IoZGlzcGxheVN0YXR1cywgdGhlbWUpLFxyXG4gICAgICAgICAgICAgICAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgYXMgY29uc3QsIGxldHRlclNwYWNpbmc6ICcwLjA1ZW0nLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzFweCA2cHgnLCBiYWNrZ3JvdW5kOiBgJHtjYXBDb2xvcn0xOGAsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c1NtLCBib3JkZXI6IGAxcHggc29saWQgJHtjYXBDb2xvcn00MGAsXHJcbiAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICB7ZGlzcGxheVN0YXR1c31cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7bGluZXMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiAxLCBiYWNrZ3JvdW5kOiB0aGVtZS5ib3JkZXIsIG1hcmdpbjogJzAgLTJweCA2cHgnIH19IC8+XHJcbiAgICAgICAgICAgICAgICB7bGluZXMubWFwKChsaW5lLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9uSWR4ID0gbGluZS5pbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChjb2xvbklkeCA9PT0gLTEpIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IGZvbnRTaXplOiAxMSwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnksIG1hcmdpbkJvdHRvbTogMiwgbGluZUhlaWdodDogMS40IH19PntsaW5lfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGxpbmUuc2xpY2UoMCwgY29sb25JZHgpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBsaW5lLnNsaWNlKGNvbG9uSWR4ICsgMSkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgZm9udFNpemU6IDExLCBtYXJnaW5Cb3R0b206IDIsIGxpbmVIZWlnaHQ6IDEuNCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRXZWlnaHQ6IDUwMCwgZmxleFNocmluazogMCB9fT57bGFiZWx9Ojwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSB9fT57dmFsdWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHtzY2hlZHVsZWQgJiYgKFxyXG4gICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogMSwgYmFja2dyb3VuZDogdGhlbWUuYm9yZGVyLCBtYXJnaW46IGAke2xpbmVzLmxlbmd0aCA+IDAgPyA2IDogMH1weCAtMnB4IDZweGAgfX0gLz5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIGZvbnRTaXplOiAxMSwgbWFyZ2luQm90dG9tOiAyIH19PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250V2VpZ2h0OiA1MDAgfX0+U3RhcnRzOjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5IH19PntzY2hlZHVsZWQuc3RhcnQudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1HQicsIHsgZGF5OiAnMi1kaWdpdCcsIG1vbnRoOiAnc2hvcnQnLCB5ZWFyOiAnbnVtZXJpYycgfSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBmb250U2l6ZTogMTEgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRXZWlnaHQ6IDUwMCB9fT5FbmRzOjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5IH19PntzY2hlZHVsZWQuZW5kLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JywgeWVhcjogJ251bWVyaWMnIH0pfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICB7LyogQWN0aW9ucyAqL31cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzRweCAwJyB9fT5cclxuICAgICAgICAgICAgPE1lbnVJdGVtIGxhYmVsPVwiQ2hhbmdlIFByaW9yaXR5XCIgaWNvbj1cIlx1MkIwNlwiIHRoZW1lPXt0aGVtZX0gb25DbGljaz17KCkgPT4gb25Nb2RlQ2hhbmdlKCdwcmlvcml0eScpfSAvPlxyXG4gICAgICAgICAgICA8TWVudUl0ZW0gbGFiZWw9XCJDaGFuZ2UgU3RhdHVzXCIgaWNvbj1cIlx1MjVDOVwiIHRoZW1lPXt0aGVtZX0gb25DbGljaz17KCkgPT4gb25Nb2RlQ2hhbmdlKCdzdGF0dXMnKX0gLz5cclxuICAgICAgICAgICAge2Rpc3BsYXlTdGF0dXMgPT09ICdSdW5uaW5nJyAmJiAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxNZW51SXRlbSBsYWJlbD1cIkNoYW5nZSBTdGFydCBEYXRlXCIgaWNvbj1cIlx1RDgzRFx1RENDNVwiIHRoZW1lPXt0aGVtZX0gb25DbGljaz17KCkgPT4gb25Nb2RlQ2hhbmdlKCdzdGFydF9kYXRlJyl9IC8+XHJcbiAgICAgICAgICAgICAgICA8TWVudUl0ZW0gbGFiZWw9XCJDaGFuZ2UgRW5kIERhdGVcIiBpY29uPVwiXHVEODNEXHVEQ0M1XCIgdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ2VuZF9kYXRlJyl9IC8+XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDxNZW51SXRlbSBsYWJlbD1cIkVkaXQgVGVzdFwiIGljb249XCJcdTI3MEVcIiB0aGVtZT17dGhlbWV9IG9uQ2xpY2s9e29uRWRpdFRlc3R9IC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8Lz5cclxuICAgICAgKSA6IG1vZGUgPT09ICdwcmlvcml0eScgPyAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMTRweCA4cHgnLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDggfX0+XHJcbiAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IG9uTW9kZUNoYW5nZSgncm9vdCcpfSBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFNpemU6IDE2LCBsaW5lSGVpZ2h0OiAxIH19Plx1MjE5MDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5IH19PkNoYW5nZSBQcmlvcml0eTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNHB4JyB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIG1hcmdpbkJvdHRvbTogOCB9fT5FbnRlciBwcmlvcml0eSAoMFx1MjAxMzEwMCk6PC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgICAgICAgIG1pbj17MH1cclxuICAgICAgICAgICAgICBtYXg9ezEwMH1cclxuICAgICAgICAgICAgICBhdXRvRm9jdXNcclxuICAgICAgICAgICAgICB2YWx1ZT17cHJpb3JpdHlJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25Qcmlvcml0eUlucHV0Q2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICBvbktleURvd249eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIG9uQ29uZmlybVByaW9yaXR5KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBvbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDhweCcsIGZvbnRTaXplOiAxMywgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJTdHJvbmd9YCwgb3V0bGluZTogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiA4LCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29uZmlybVByaW9yaXR5fVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgZmxleDogMSwgcGFkZGluZzogJzZweCAwJywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCwgY29sb3I6IHRoZW1lLmFjY2VudEZnLCBib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+Q29uZmlybTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e29uQ2xvc2V9IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyB9fT5DYW5jZWw8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICkgOiBtb2RlID09PSAnc3RhdHVzJyA/IChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNHB4IDhweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCB9fT5cclxuICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4gb25Nb2RlQ2hhbmdlKCdyb290Jyl9IHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250U2l6ZTogMTYsIGxpbmVIZWlnaHQ6IDEgfX0+XHUyMTkwPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnkgfX0+Q2hhbmdlIFN0YXR1czwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnNHB4IDAnIH19PlxyXG4gICAgICAgICAgICB7c3RhdHVzT3B0aW9uc0xpc3QubWFwKChzKSA9PiAoXHJcbiAgICAgICAgICAgICAgPE1lbnVJdGVtIGtleT17c30gbGFiZWw9e3MgPT09ICdOVUxMJyA/ICdDbGVhciBTdGF0dXMgKE5VTEwpJyA6IHN9IHRoZW1lPXt0aGVtZX0gb25DbGljaz17KCkgPT4gb25QaWNrU3RhdHVzKHMpfSAvPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvPlxyXG4gICAgICApIDogbW9kZSA9PT0gJ3N0YXJ0X2RhdGUnID8gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDE0cHggOHB4JywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4IH19PlxyXG4gICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ3Jvb3QnKX0gc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRTaXplOiAxNiwgbGluZUhlaWdodDogMSB9fT5cdTIxOTA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSB9fT5DaGFuZ2UgU3RhcnQgRGF0ZTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNHB4JyB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIG1hcmdpbkJvdHRvbTogOCB9fT5FbnRlciBuZXcgc3RhcnQgZGF0ZTo8L2Rpdj5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxyXG4gICAgICAgICAgICAgIGF1dG9Gb2N1c1xyXG4gICAgICAgICAgICAgIHZhbHVlPXtzdGFydERhdGVJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25TdGFydERhdGVJbnB1dENoYW5nZShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBvbkNvbmZpcm1TdGFydERhdGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIG9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLCBib3hTaXppbmc6ICdib3JkZXItYm94JyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggOHB4JywgZm9udFNpemU6IDEzLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlclN0cm9uZ31gLCBvdXRsaW5lOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IDgsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25Db25maXJtU3RhcnREYXRlfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFzdGFydERhdGVJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgZmxleDogMSwgcGFkZGluZzogJzZweCAwJywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHN0YXJ0RGF0ZUlucHV0VmFsdWUgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS5ib3JkZXIsXHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBzdGFydERhdGVJbnB1dFZhbHVlID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0TXV0ZWQsXHJcbiAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cywgY3Vyc29yOiBzdGFydERhdGVJbnB1dFZhbHVlID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+Q29uZmlybTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e29uQ2xvc2V9IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyB9fT5DYW5jZWw8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMTRweCA4cHgnLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDggfX0+XHJcbiAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IG9uTW9kZUNoYW5nZSgncm9vdCcpfSBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFNpemU6IDE2LCBsaW5lSGVpZ2h0OiAxIH19Plx1MjE5MDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5IH19PkNoYW5nZSBFbmQgRGF0ZTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNHB4JyB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIG1hcmdpbkJvdHRvbTogOCB9fT5FbnRlciBuZXcgZW5kIGRhdGU6PC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcclxuICAgICAgICAgICAgICBhdXRvRm9jdXNcclxuICAgICAgICAgICAgICB2YWx1ZT17ZW5kRGF0ZUlucHV0VmFsdWV9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkVuZERhdGVJbnB1dENoYW5nZShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBvbkNvbmZpcm1FbmREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBvbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDhweCcsIGZvbnRTaXplOiAxMywgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJTdHJvbmd9YCwgb3V0bGluZTogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiA4LCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29uZmlybUVuZERhdGV9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWVuZERhdGVJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgZmxleDogMSwgcGFkZGluZzogJzZweCAwJywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGVuZERhdGVJbnB1dFZhbHVlID8gdGhlbWUuYWNjZW50IDogdGhlbWUuYm9yZGVyLFxyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogZW5kRGF0ZUlucHV0VmFsdWUgPyB0aGVtZS5hY2NlbnRGZyA6IHRoZW1lLnRleHRNdXRlZCxcclxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLCBjdXJzb3I6IGVuZERhdGVJbnB1dFZhbHVlID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+Q29uZmlybTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e29uQ2xvc2V9IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyB9fT5DYW5jZWw8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFNhdmUgT3ZlcmxheVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFNhdmVPdmVybGF5UHJvcHMge1xyXG4gIGlzRXJyb3I6IGJvb2xlYW47XHJcbiAgdGhlbWU6IFRoZW1lVG9rZW5zO1xyXG4gIG9uUmV0cnk6ICgpID0+IHZvaWQ7XHJcbiAgb25EaXNjYXJkOiAoKSA9PiB2b2lkO1xyXG59XHJcblxyXG5jb25zdCBTYXZlT3ZlcmxheTogRkM8U2F2ZU92ZXJsYXlQcm9wcz4gPSAoeyBpc0Vycm9yLCB0aGVtZSwgb25SZXRyeSwgb25EaXNjYXJkIH0pID0+IChcclxuICA8ZGl2IHN0eWxlPXt7XHJcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgaW5zZXQ6IDAsIHpJbmRleDogMjAwMCxcclxuICAgIGJhY2tncm91bmQ6IHRoZW1lLmlzRGFyayA/ICdyZ2JhKDI4LDI4LDQ2LDAuODIpJyA6ICdyZ2JhKDI0OSwyNTAsMjUxLDAuODIpJyxcclxuICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgfX0+XHJcbiAgICB7IWlzRXJyb3IgPyAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogMTIgfX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgd2lkdGg6IDMyLCBoZWlnaHQ6IDMyLCBib3JkZXJSYWRpdXM6ICc1MCUnLFxyXG4gICAgICAgICAgYm9yZGVyOiBgM3B4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJvcmRlclRvcENvbG9yOiB0aGVtZS5hY2NlbnQsXHJcbiAgICAgICAgICBhbmltYXRpb246ICdjY2wtc3BpbiAwLjdzIGxpbmVhciBpbmZpbml0ZScsXHJcbiAgICAgICAgfX0gLz5cclxuICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnkgfX0+U2F2aW5nXHUyMDI2PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICkgOiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLCBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNYbCxcclxuICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAyMHB4IHJnYmEoMCwwLDAsMC4xMiknLCBwYWRkaW5nOiAnMjRweCAyOHB4JyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMixcclxuICAgICAgICBtYXhXaWR0aDogMzAwLFxyXG4gICAgICB9fT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogNDAsIGhlaWdodDogNDAsIGJvcmRlclJhZGl1czogJzUwJScsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyAnIzNCMDAwMCcgOiAnI0ZFRjJGMicsXHJcbiAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5pc0RhcmsgPyAnIzdGMUQxRCcgOiAnI0ZFQ0FDQSd9YCxcclxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICAgIGZvbnRTaXplOiAyMCwgY29sb3I6ICcjRUY0NDQ0JywgZm9udFdlaWdodDogNzAwLFxyXG4gICAgICAgIH19PiE8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnkgfX0+U2F2ZSBmYWlsZWQ8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgdGV4dEFsaWduOiAnY2VudGVyJywgbGluZUhlaWdodDogMS41IH19PlxyXG4gICAgICAgICAgVGhlIGFsbG9jYXRpb24gY291bGQgbm90IGJlIHNhdmVkLiBZb3UgY2FuIHJldHJ5IG9yIGRpc2NhcmQgeW91ciBjaGFuZ2VzLlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIG1hcmdpblRvcDogNCB9fT5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgb25DbGljaz17b25EaXNjYXJkfVxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTZweCcsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJTdHJvbmd9YCwgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnksIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+RGlzY2FyZDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvblJldHJ5fVxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTZweCcsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LCBjb2xvcjogdGhlbWUuYWNjZW50RmcsXHJcbiAgICAgICAgICAgICAgYm94U2hhZG93OiBgMCAxcHggM3B4ICR7dGhlbWUuYWNjZW50fTREYCxcclxuICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlJldHJ5PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKX1cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQWxsb2NhdGlvbiBIZWxwZXJzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBidWlsZEFsbG9jYXRpb25zID0gKHN0YW5kczogSW50ZXJuYWxTdGFuZFtdKTogQWxsb2NhdGlvblJlY29yZFtdID0+IHtcclxuICBjb25zdCBhbGxvY2F0aW9uczogQWxsb2NhdGlvblJlY29yZFtdID0gW107XHJcbiAgc3RhbmRzLmZvckVhY2goc3RhbmQgPT4ge1xyXG4gICAgc3RhbmQudGVzdHMuZm9yRWFjaCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgIGFsbG9jYXRpb25zLnB1c2goe1xyXG4gICAgICAgIHRlc3RfaWQ6IHRlc3QuaWQsXHJcbiAgICAgICAgdGVzdF9zdGFuZF9pZDogc3RhbmQuaWQsXHJcbiAgICAgICAgcHJpb3JpdHlfb3JkZXI6IGlkeCArIDEsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGFsbG9jYXRpb25zO1xyXG59O1xyXG5cclxuY29uc3QgYWxsb2NhdGlvbnNLZXkgPSAoYWxsb2NzOiBBbGxvY2F0aW9uUmVjb3JkW10pOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShhbGxvY3MubWFwKGEgPT4gYCR7YS50ZXN0X2lkfToke2EudGVzdF9zdGFuZF9pZH06JHthLnByaW9yaXR5X29yZGVyfWApLnNvcnQoKSk7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZVN0YW5kcyA9IChcclxuICB0ZXN0c0FycjogYW55W10sXHJcbiAgc3RhbmRzQXJyOiBTdGFuZERlZltdLFxyXG4gIGNoSG91cnM6IG51bWJlcixcclxuICBub25Xb3JraW5nQXJyOiBhbnlbXSA9IFtdXHJcbik6IHsgc3RhbmRzOiBJbnRlcm5hbFN0YW5kW107IHVuYWxsb2NhdGVkOiBUZXN0RGF0YVtdIH0gPT4ge1xyXG4gIC8vIEdyb3VwIG5vbi13b3JraW5nIHJvd3MgYnkgdGVzdF9zdGFuZF9pZFxyXG4gIGNvbnN0IG5vbldvcmtpbmdCeVN0YW5kID0gbmV3IE1hcDxzdHJpbmcgfCBudW1iZXIsIGFueVtdPigpO1xyXG4gIGZvciAoY29uc3Qgcm93IG9mIG5vbldvcmtpbmdBcnIpIHtcclxuICAgIGlmICghcm93IHx8IHJvdy50ZXN0X3N0YW5kX2lkID09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgY29uc3Qga2V5ID0gcm93LnRlc3Rfc3RhbmRfaWQ7XHJcbiAgICBpZiAoIW5vbldvcmtpbmdCeVN0YW5kLmhhcyhrZXkpKSBub25Xb3JraW5nQnlTdGFuZC5zZXQoa2V5LCBbXSk7XHJcbiAgICBub25Xb3JraW5nQnlTdGFuZC5nZXQoa2V5KSEucHVzaCh7IHN0YXJ0OiByb3cuc3RhcnRfdGltZSwgZW5kOiByb3cuZW5kX3RpbWUsIG5vdGVzOiByb3cubm90ZXMgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdGFuZE1hcCA9IG5ldyBNYXA8bnVtYmVyIHwgc3RyaW5nLCBJbnRlcm5hbFN0YW5kPigpO1xyXG4gIHN0YW5kc0Fyci5mb3JFYWNoKHMgPT4gc3RhbmRNYXAuc2V0KHMuaWQsIHtcclxuICAgIGlkOiBzLmlkLFxyXG4gICAgbmFtZTogcy5uYW1lLFxyXG4gICAgdGVzdHM6IFtdLFxyXG4gICAgY2hhbmdlb3Zlcl9ob3Vyczogcy5jaGFuZ2VvdmVyX2hvdXJzID8/IGNoSG91cnMsXHJcbiAgICBub25Xb3JraW5nQmxvY2tzOiBwYXJzZU5vbldvcmtpbmdCbG9ja3Mobm9uV29ya2luZ0J5U3RhbmQuZ2V0KHMuaWQpID8/IFtdKSxcclxuICB9KSk7XHJcblxyXG4gIGNvbnN0IHVuYWxsb2NhdGVkOiBUZXN0RGF0YVtdID0gW107XHJcbiAgdGVzdHNBcnIuZm9yRWFjaCgodDogYW55KSA9PiB7XHJcbiAgICBjb25zdCB0ZXN0OiBUZXN0RGF0YSA9IHtcclxuICAgICAgaWQ6IHQuaWQsXHJcbiAgICAgIG5hbWU6IHQubmFtZSB8fCAnJyxcclxuICAgICAgZHVyYXRpb246IHQuZHVyYXRpb24gfHwgNzIsXHJcbiAgICAgIG93bmVyOiB0Lm93bmVyIHx8ICcnLFxyXG4gICAgICBwcmlvcml0eTogdC5wcmlvcml0eSA/PyA1MCxcclxuICAgICAgbm90ZXM6IHQubm90ZXMgfHwgJycsXHJcbiAgICAgIHN0YXR1czogdC5zdGF0dXMgfHwgJycsXHJcbiAgICAgIHRlc3Rfc3RhbmRfaWQ6IHQudGVzdF9zdGFuZF9pZCxcclxuICAgICAgcHJpb3JpdHlfb3JkZXI6IHQucHJpb3JpdHlfb3JkZXIsXHJcbiAgICAgIGFsbG9jYXRpb25faWQ6IHQuYWxsb2NhdGlvbl9pZCxcclxuICAgICAgYXNzaWduZWRfcGFydHM6IHQuYXNzaWduZWRfcGFydHMgfHwgbnVsbCxcclxuICAgICAgcGFydF9yZWFkeV9kYXRlOiB0LnBhcnRfcmVhZHlfZGF0ZSB8fCBudWxsLFxyXG4gICAgICBwYXJ0X3N0YXR1czogdC5wYXJ0X3N0YXR1cyB8fCAnJyxcclxuICAgICAgdGVzdF9zdGFydGVkX2RhdGU6IHQudGVzdF9zdGFydGVkX2RhdGUgfHwgbnVsbCxcclxuICAgICAgLi4udCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRlc3QudGVzdF9zdGFuZF9pZCAhPSBudWxsICYmIHN0YW5kTWFwLmhhcyh0ZXN0LnRlc3Rfc3RhbmRfaWQpKSB7XHJcbiAgICAgIHN0YW5kTWFwLmdldCh0ZXN0LnRlc3Rfc3RhbmRfaWQpIS50ZXN0cy5wdXNoKHRlc3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdW5hbGxvY2F0ZWQucHVzaCh0ZXN0KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgc3RhbmRNYXAuZm9yRWFjaChzID0+IHtcclxuICAgIHMudGVzdHMuc29ydCgoYSwgYikgPT4gKGEucHJpb3JpdHlfb3JkZXIgfHwgOTk5KSAtIChiLnByaW9yaXR5X29yZGVyIHx8IDk5OSkpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc3RhbmRzOiBzdGFuZHNBcnIubWFwKHMgPT4gc3RhbmRNYXAuZ2V0KHMuaWQpISksXHJcbiAgICB1bmFsbG9jYXRlZCxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIE1haW4gQ29tcG9uZW50XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5leHBvcnQgY29uc3QgVGVzdFN0YW5kU2NoZWR1bGVyOiBGQyA9ICgpID0+IHtcclxuICAvLyBcdTI1MDBcdTI1MDAgSW5wdXQgZGF0YSBmcm9tIFJldG9vbCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBbaW5wdXRUZXN0c10gPSBSZXRvb2wudXNlU3RhdGVBcnJheSh7XHJcbiAgICBuYW1lOiBcInRlc3RzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIlRlc3RzIERhdGFcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIHRlc3Qgb2JqZWN0cyBmcm9tIGdldFNjaGVkdWxlckRhdGEgcXVlcnlcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2lucHV0U3RhbmRzXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwidGVzdFN0YW5kc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJUZXN0IFN0YW5kcyBEYXRhXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiB0ZXN0IHN0YW5kIG9iamVjdHMgZnJvbSBnZXRUZXN0U3RhbmRzIHF1ZXJ5IChpZCwgbmFtZSwgY2hhbmdlb3Zlcl9ob3VycylcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2lucHV0Tm9uV29ya2luZ10gPSBSZXRvb2wudXNlU3RhdGVBcnJheSh7XHJcbiAgICBuYW1lOiBcIm5vbldvcmtpbmdEYXRhXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIk5vbi1Xb3JraW5nIEJsb2Nrc1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2Ygbm9uLXdvcmtpbmcgcGVyaW9kcyBmcm9tIGdldE5vbldvcmtpbmcgcXVlcnkgKGlkLCB0ZXN0X3N0YW5kX2lkLCBzdGFydF90aW1lLCBlbmRfdGltZSwgbm90ZXMpXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBDb25maWd1cmF0aW9uIHByb3BlcnRpZXMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW3NhdmVNb2RlXSA9IFJldG9vbC51c2VTdGF0ZUVudW1lcmF0aW9uKHtcclxuICAgIG5hbWU6IFwic2F2ZU1vZGVcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJiYXRjaFwiLFxyXG4gICAgZW51bURlZmluaXRpb246IFtcImJhdGNoXCIsIFwibGl2ZVwiXSxcclxuICAgIGluc3BlY3RvcjogXCJzZWdtZW50ZWRcIixcclxuICAgIGxhYmVsOiBcIlNhdmUgTW9kZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiYmF0Y2ggPSBzYXZlIGJ1dHRvbiwgbGl2ZSA9IGVtaXQgb24gZXZlcnkgY2hhbmdlXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtpc1NhdmluZ10gPSBSZXRvb2wudXNlU3RhdGVCb29sZWFuKHtcclxuICAgIG5hbWU6IFwiaXNTYXZpbmdcIixcclxuICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICBpbnNwZWN0b3I6IFwiY2hlY2tib3hcIixcclxuICAgIGxhYmVsOiBcIklzIFNhdmluZ1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQmluZCB0bzoge3sgc2F2ZUFsbG9jYXRpb25zLmlzRmV0Y2hpbmcgfX1cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2hhc1NhdmVFcnJvcl0gPSBSZXRvb2wudXNlU3RhdGVCb29sZWFuKHtcclxuICAgIG5hbWU6IFwiaGFzU2F2ZUVycm9yXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgaW5zcGVjdG9yOiBcImNoZWNrYm94XCIsXHJcbiAgICBsYWJlbDogXCJIYXMgU2F2ZSBFcnJvclwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQmluZCB0bzoge3sgISFzYXZlQWxsb2NhdGlvbnMuZXJyb3IgfX1cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW3NhdmVkQXRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwic2F2ZWRBdFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIlNhdmVkIEF0XCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJCaW5kIHRvOiB7eyBzYXZlQWxsb2NhdGlvbnMubGFzdFJ1bkF0IH19XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtjaGFuZ2VvdmVySG91cnNdID0gUmV0b29sLnVzZVN0YXRlTnVtYmVyKHtcclxuICAgIG5hbWU6IFwiY2hhbmdlb3ZlckhvdXJzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IDMsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiQ2hhbmdlb3ZlciBIb3Vyc1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiSG91cnMgZm9yIGNoYW5nZW92ZXIgYmV0d2VlbiB0ZXN0cyAod29yayBob3VycyBvbmx5KVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbd29ya1N0YXJ0XSA9IFJldG9vbC51c2VTdGF0ZU51bWJlcih7XHJcbiAgICBuYW1lOiBcIndvcmtTdGFydFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiA5LFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIldvcmsgU3RhcnQgSG91clwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbd29ya0VuZF0gPSBSZXRvb2wudXNlU3RhdGVOdW1iZXIoe1xyXG4gICAgbmFtZTogXCJ3b3JrRW5kXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IDE3LFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIldvcmsgRW5kIEhvdXJcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2luaXRpYWxWaWV3V2Vla3NTdHJdID0gUmV0b29sLnVzZVN0YXRlRW51bWVyYXRpb24oe1xyXG4gICAgbmFtZTogXCJkZWZhdWx0Vmlld1dlZWtzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiNFwiLFxyXG4gICAgZW51bURlZmluaXRpb246IFtcIjJcIiwgXCI0XCIsIFwiOFwiLCBcIjEyXCIsIFwiMjRcIl0sXHJcbiAgICBpbnNwZWN0b3I6IFwic2VnbWVudGVkXCIsXHJcbiAgICBsYWJlbDogXCJEZWZhdWx0IFZpZXdcIixcclxuICB9KTtcclxuICBjb25zdCBpbml0aWFsVmlld1dlZWtzID0gTnVtYmVyKGluaXRpYWxWaWV3V2Vla3NTdHIpIHx8IDQ7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBDb25maWd1cmFibGUgZGlzcGxheSB0ZW1wbGF0ZXMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW2NhcmRNYWluVGV4dF0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjYXJkTWFpblRleHRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJ7bmFtZX1cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDYXJkIFRpdGxlXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3IgY2FyZCB0aXRsZS4gVXNlIHtmaWVsZE5hbWV9IGZvciBkYXRhIGZpZWxkcy5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2NhcmRTdWJUZXh0XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNhcmRTdWJUZXh0XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiUGFydHM6IHtwYXJ0X3JlYWR5X2RhdGV9XCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiQ2FyZCBTdWJ0aXRsZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiVGVtcGxhdGUgZm9yIHN1YnRpdGxlLiBIaWRkZW4gd2hlbiBhbGwgZmllbGRzIGFyZSBlbXB0eS5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2NhcmRJbmZvUm93XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNhcmRJbmZvUm93XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwie293bmVyfSBcXHUwMGI3IHtkdXJhdGlvbn1oIFxcdTAwYjcgUHtwcmlvcml0eX1cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDYXJkIEluZm8gUm93XCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3IgdGhlIGluZm8gcm93IHNob3duIG9uIGNhcmRzIGFuZCBiYXJzLlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbdG9vbHRpcFRlbXBsYXRlXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInRvb2x0aXBUZW1wbGF0ZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIk5vdGVzOiB7bm90ZXN9XFxuT3duZXI6IHtvd25lcn1cXG5Qcmlvcml0eToge3ByaW9yaXR5fVxcblBhcnQgU3RhdHVzOiB7cGFydF9zdGF0dXN9XFxuUGFydHMgRHVlOiB7cGFydF9yZWFkeV9kYXRlfVxcbkFzc2lnbmVkIFBhcnRzOiB7YXNzaWduZWRfcGFydHN9XFxuVGVzdCBTdGFydGVkOiB7dGVzdF9zdGFydGVkX2RhdGV9XCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiVG9vbHRpcCBUZW1wbGF0ZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiVGVtcGxhdGUgZm9yIGhvdmVyIHRvb2x0aXAuIFVzZSBcXFxcbiBmb3IgbmV3bGluZXMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtzdGF0dXNPcHRpb25zXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwic3RhdHVzT3B0aW9uc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXCJOVUxMXCIsIFwiUnVubmluZ1wiLCBcIkNyZWF0ZWRcIiwgXCJUZXN0ZWRcIiwgXCJDYW5jZWxsZWRcIl0sXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiU3RhdHVzIE9wdGlvbnNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlN0YXR1cyBzdHJpbmdzIHNob3duIGluIHRoZSByaWdodC1jbGljayBDaGFuZ2UgU3RhdHVzIG1lbnUuICdOVUxMJyBjbGVhcnMgdGhlIHN0YXR1cy5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFRoZW1lIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFthcHBUaGVtZV0gPSBSZXRvb2wudXNlU3RhdGVPYmplY3Qoe1xyXG4gICAgbmFtZTogXCJhcHBUaGVtZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiB7fSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJBcHAgVGhlbWVcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG8ge3sgdGhlbWUgfX0gdG8gaW5oZXJpdCBhcHAgY29sb3VycywgZm9udHMsIGFuZCBib3JkZXIgcmFkaXVzXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIE9wdGlvbmFsIHN0YXR1cyBjb2xvdXIgb3ZlcnJpZGVzIChsZWF2ZSBibGFuayB0byB1c2UgZGVmYXVsdHMpXHJcbiAgY29uc3QgW2NvbG9yUnVubmluZ10gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjb2xvclJ1bm5pbmdcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJSdW5uaW5nIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgUnVubmluZyBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjOTMzM0VBKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JSZWFkeV0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjb2xvclJlYWR5XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiUmVhZHkgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBSZWFkeSBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjMjJDNTVFKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JPblRpbWVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JPblRpbWVcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJPbiBUaW1lIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgT24gVGltZSBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjRTVBMDBEKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JEZWxheWVkXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNvbG9yRGVsYXllZFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkRlbGF5ZWQgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBEZWxheWVkIHN0YXR1cy4gTGVhdmUgYmxhbmsgdG8gdXNlIGRlZmF1bHQgKCNFRjQ0NDQpLlwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IFtjb2xvclBhcnRzTm90QXNzaWduZWRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JQYXJ0c05vdEFzc2lnbmVkXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiUGFydHMgTm90IEFzc2lnbmVkIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgUGFydHMgTm90IEFzc2lnbmVkIHN0YXR1cy4gTGVhdmUgYmxhbmsgdG8gdXNlIGRlZmF1bHQgKCM5Q0EzQUYpLlwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IFtjb2xvckluUHJvZ3Jlc3NdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JJblByb2dyZXNzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiSW4gUHJvZ3Jlc3MgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBJbiBQcm9ncmVzcyBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjRTVBMDBEKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbbW9ub0ZvbnRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwibW9ub0ZvbnRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJNb25vc3BhY2UgRm9udFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiRm9udCB1c2VkIGZvciBsYWJlbHMsIGJhZGdlcywgYW5kIHN0YXRzLiBMZWF2ZSBibGFuayB0byBpbmhlcml0IHRoZSBhcHAgdGhlbWUgZm9udC5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEJ1aWxkIHRoZW1lIHRva2VucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB0aGVtZSA9IHVzZU1lbW8oKCk6IFRoZW1lVG9rZW5zID0+IHtcclxuICAgIGNvbnN0IHN0YXR1c092ZXJyaWRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gICAgaWYgKGNvbG9yUnVubmluZykgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snUnVubmluZyddICAgICAgICAgICAgPSBjb2xvclJ1bm5pbmcgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yUmVhZHkpICAgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snUmVhZHknXSAgICAgICAgICAgICAgPSBjb2xvclJlYWR5IGFzIHN0cmluZztcclxuICAgIGlmIChjb2xvck9uVGltZSkgICAgICAgICAgICBzdGF0dXNPdmVycmlkZXNbJ09uIFRpbWUnXSAgICAgICAgICAgID0gY29sb3JPblRpbWUgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yRGVsYXllZCkgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snRGVsYXllZCddICAgICAgICAgICAgPSBjb2xvckRlbGF5ZWQgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yUGFydHNOb3RBc3NpZ25lZCkgIHN0YXR1c092ZXJyaWRlc1snUGFydHMgTm90IEFzc2lnbmVkJ10gPSBjb2xvclBhcnRzTm90QXNzaWduZWQgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9ySW5Qcm9ncmVzcykgICAgICAgIHN0YXR1c092ZXJyaWRlc1snSW4gUHJvZ3Jlc3MnXSAgICAgICAgPSBjb2xvckluUHJvZ3Jlc3MgYXMgc3RyaW5nO1xyXG4gICAgcmV0dXJuIGJ1aWxkVGhlbWUoYXBwVGhlbWUsIHN0YXR1c092ZXJyaWRlcywgbW9ub0ZvbnQgYXMgc3RyaW5nIHx8IHVuZGVmaW5lZCk7XHJcbiAgfSwgW2FwcFRoZW1lLCBjb2xvclJ1bm5pbmcsIGNvbG9yUmVhZHksIGNvbG9yT25UaW1lLCBjb2xvckRlbGF5ZWQsIGNvbG9yUGFydHNOb3RBc3NpZ25lZCwgY29sb3JJblByb2dyZXNzLCBtb25vRm9udF0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgT3V0cHV0IHN0YXRlIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFssIHNldEFsbG9jYXRpb25zXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwiYWxsb2NhdGlvbnNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJDdXJyZW50IGFsbG9jYXRpb24gc3RhdGU6IFt7dGVzdF9pZCwgdGVzdF9zdGFuZF9pZCwgcHJpb3JpdHlfb3JkZXJ9XVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRBbGxUZXN0SWRzXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwiYWxsVGVzdElkc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0ZXN0IElEcyBtYW5hZ2VkIGJ5IHRoZSBzY2hlZHVsZXIgKGZvciB0aGUgZGVsZXRlIHN0ZXAgaW4gc2F2ZSlcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0SGFzVW5zYXZlZENoYW5nZXNdID0gUmV0b29sLnVzZVN0YXRlQm9vbGVhbih7XHJcbiAgICBuYW1lOiBcImhhc1Vuc2F2ZWRDaGFuZ2VzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiV2hldGhlciB0aGVyZSBhcmUgdW5zYXZlZCBhbGxvY2F0aW9uIGNoYW5nZXNcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0SWRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwic2VsZWN0ZWRUZXN0SWRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIklEIG9mIHRlc3QgYWN0aW9uZWQgdmlhIHJpZ2h0LWNsaWNrIG1lbnUgKHNldCBiZWZvcmUgZXZlbnRzIGZpcmUpXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldFNlbGVjdGVkVGVzdFByaW9yaXR5XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdFByaW9yaXR5XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJOZXcgcHJpb3JpdHkgdmFsdWUgZnJvbSBDaGFuZ2UgUHJpb3JpdHkgYWN0aW9uIChudW1lcmljIHN0cmluZylcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0U3RhcnREYXRlXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdFN0YXJ0RGF0ZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTmV3IHN0YXJ0IGRhdGUgZnJvbSBDaGFuZ2UgU3RhcnQgRGF0ZSBhY3Rpb24gKElTTyBkYXRlIHN0cmluZyBZWVlZLU1NLUREKS4gT25seSBzZXQgZm9yIFJ1bm5pbmcgdGVzdHMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldFNlbGVjdGVkVGVzdEVuZERhdGVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwic2VsZWN0ZWRUZXN0RW5kRGF0ZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTmV3IGVuZCBkYXRlIGZyb20gQ2hhbmdlIEVuZCBEYXRlIGFjdGlvbiAoSVNPIGRhdGUgc3RyaW5nIFlZWVktTU0tREQpLiBPbmx5IHNldCBmb3IgUnVubmluZyB0ZXN0cy5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0U3RhdHVzXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdFN0YXR1c1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTmV3IHN0YXR1cyBmcm9tIENoYW5nZSBTdGF0dXMgYWN0aW9uLiBFbXB0eSBzdHJpbmcgPSBOVUxMIGluIERCLlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRQbGFubmVkRGF0ZXNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJwbGFubmVkRGF0ZXNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiB7dGVzdF9pZCwgcGxhbm5lZF9kYXRlfSBmb3IgYWxsIHN0YW5kLXNjaGVkdWxlZCB0ZXN0cy4gVXNlIHdpdGggc2F2ZVBsYW5uZWREYXRlcyBxdWVyeS5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEV2ZW50cyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBvblNhdmUgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25TYXZlXCIgfSk7XHJcbiAgY29uc3Qgb25DaGFuZ2UgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25DaGFuZ2VcIiB9KTtcclxuICBjb25zdCBvblJldHJ5ID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uUmV0cnlcIiB9KTtcclxuICBjb25zdCBvbkNoYW5nZVByaW9yaXR5ID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlUHJpb3JpdHlcIiB9KTtcclxuICBjb25zdCBvbkNoYW5nZVN0YXR1cyA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvbkNoYW5nZVN0YXR1c1wiIH0pO1xyXG4gIGNvbnN0IG9uQ2hhbmdlU3RhcnREYXRlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlU3RhcnREYXRlXCIgfSk7XHJcbiAgY29uc3Qgb25DaGFuZ2VFbmREYXRlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlRW5kRGF0ZVwiIH0pO1xyXG4gIGNvbnN0IG9uRWRpdFRlc3QgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25FZGl0VGVzdFwiIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQ29tcG9uZW50IHNldHRpbmdzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIFJldG9vbC51c2VDb21wb25lbnRTZXR0aW5ncyh7XHJcbiAgICBkZWZhdWx0SGVpZ2h0OiA2MDAsXHJcbiAgICBkZWZhdWx0V2lkdGg6IDEyLFxyXG4gIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgSW50ZXJuYWwgc3RhdGUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW3N0YW5kcywgc2V0U3RhbmRzXSA9IFJlYWN0LnVzZVN0YXRlPEludGVybmFsU3RhbmRbXT4oW10pO1xyXG4gIGNvbnN0IFt1bmFsbG9jYXRlZCwgc2V0VW5hbGxvY2F0ZWRdID0gUmVhY3QudXNlU3RhdGU8VGVzdERhdGFbXT4oW10pO1xyXG4gIGNvbnN0IFt2aWV3cG9ydFdlZWtzLCBzZXRWaWV3cG9ydFdlZWtzXSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oaW5pdGlhbFZpZXdXZWVrcyB8fCA0KTtcclxuICBjb25zdCB1c2VyQ2hhbmdlZFZpZXdwb3J0ID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgd2Vla3MgPSBOdW1iZXIoaW5pdGlhbFZpZXdXZWVrc1N0cik7XHJcbiAgICBpZiAod2Vla3MgJiYgIXVzZXJDaGFuZ2VkVmlld3BvcnQuY3VycmVudCkgc2V0Vmlld3BvcnRXZWVrcyh3ZWVrcyk7XHJcbiAgfSwgW2luaXRpYWxWaWV3V2Vla3NTdHJdKTtcclxuICBjb25zdCBbZHJhZ2dlZFRlc3RJZCwgc2V0RHJhZ2dlZFRlc3RJZF0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmcgfCBudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaW5zZXJ0SW5kaWNhdG9yLCBzZXRJbnNlcnRJbmRpY2F0b3JdID0gUmVhY3QudXNlU3RhdGU8SW5zZXJ0SW5kaWNhdG9yIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3F1ZXVlSW5zZXJ0SW5kZXgsIHNldFF1ZXVlSW5zZXJ0SW5kZXhdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2lzRGlydHksIHNldElzRGlydHldID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwZW5kaW5nU2F2ZSwgc2V0UGVuZGluZ1NhdmVdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzYXZlRXJyb3IsIHNldFNhdmVFcnJvcl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3BvcG92ZXIsIHNldFBvcG92ZXJdID0gUmVhY3QudXNlU3RhdGU8UG9wb3ZlclN0YXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3ByaW9yaXR5SW5wdXRWYWx1ZSwgc2V0UHJpb3JpdHlJbnB1dFZhbHVlXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJycpO1xyXG4gIGNvbnN0IFtzdGFydERhdGVJbnB1dFZhbHVlLCBzZXRTdGFydERhdGVJbnB1dFZhbHVlXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJycpO1xyXG4gIGNvbnN0IFtlbmREYXRlSW5wdXRWYWx1ZSwgc2V0RW5kRGF0ZUlucHV0VmFsdWVdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPignJyk7XHJcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcbiAgY29uc3QgaXNMb2NrZWQgPSBwZW5kaW5nU2F2ZSB8fCAoaXNTYXZpbmcgYXMgYm9vbGVhbikgfHwgc2F2ZUVycm9yO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzU2F2aW5nIGFzIGJvb2xlYW4pIHtcclxuICAgICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpOyAvLyBSZXRvb2wgaGFzIHBpY2tlZCB1cCB0aGUgc2F2ZTsgZHJvcCBvdXIgbG9jYWwgcGVuZGluZyBmbGFnXHJcbiAgICB9XHJcbiAgICBpZiAoaGFzU2F2ZUVycm9yIGFzIGJvb2xlYW4pIHtcclxuICAgICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpO1xyXG4gICAgICBzZXRTYXZlRXJyb3IodHJ1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKCEoaXNTYXZpbmcgYXMgYm9vbGVhbikpIHtcclxuICAgICAgLy8gTm90IHNhdmluZyBhbmQgbm8gZXJyb3IgPSBpZGxlOyBjbGVhciBlcnJvciAoY292ZXJzIHJlY292ZXJ5IGFmdGVyIHJldHJ5KVxyXG4gICAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtpc1NhdmluZywgaGFzU2F2ZUVycm9yXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBvcG92ZXIpIHJldHVybjtcclxuICAgIGNvbnN0IG9uTW91c2VEb3duID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudCAmJiAhcG9wb3ZlclJlZi5jdXJyZW50LmNvbnRhaW5zKGUudGFyZ2V0IGFzIE5vZGUpKVxyXG4gICAgICAgIHNldFBvcG92ZXIobnVsbCk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25LZXlEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHsgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgc2V0UG9wb3ZlcihudWxsKTsgfTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcclxuICAgIH07XHJcbiAgfSwgW3BvcG92ZXJdKTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxBbGxvY2F0aW9uc1JlZiA9IHVzZVJlZjxzdHJpbmc+KCcnKTtcclxuICBjb25zdCBwcmV2U2F2ZWRBdFJlZiA9IFJlYWN0LnVzZVJlZjxzdHJpbmc+KFwiXCIpO1xyXG4gIGNvbnN0IHNjcm9sbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbCA9IHNjcm9sbFJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgY29uc3Qgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZW50cmllcyA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xyXG4gICAgICAgIHNldENvbnRhaW5lcldpZHRoKGVudHJ5LmNvbnRlbnRSZWN0LndpZHRoIHx8IDgwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcm8ub2JzZXJ2ZShlbCk7XHJcbiAgICByZXR1cm4gKCkgPT4gcm8uZGlzY29ubmVjdCgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gT3B0aW1pc3RpYyBzYXZlOiB3aGVuIHNhdmVkQXQgY2hhbmdlcyB0aGUgREIgd3JpdGUgc3VjY2VlZGVkIFx1MjAxNCBzbmFwc2hvdCB0aGVcclxuICAvLyBjdXJyZW50IHN0YXRlIGFzIHRoZSBuZXcgYmFzZWxpbmUgd2l0aG91dCB3YWl0aW5nIGZvciBhIGdldFNjaGVkdWxlckRhdGEgcmUtZmV0Y2guXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHRzID0gc2F2ZWRBdCBhcyBzdHJpbmc7XHJcbiAgICBpZiAoIXRzIHx8IHRzID09PSBwcmV2U2F2ZWRBdFJlZi5jdXJyZW50KSByZXR1cm47IC8vIHNraXAgaW5pdGlhbCBtb3VudCArIGR1cGxpY2F0ZXNcclxuICAgIHByZXZTYXZlZEF0UmVmLmN1cnJlbnQgPSB0cztcclxuICAgIC8vIFNuYXBzaG90IGN1cnJlbnQgYWxsb2NhdGlvbnMgYXMgdGhlIG5ldyBcIm9yaWdpbmFsXCIgc28gZGlydHktY2hlY2sgcmVzZXRzIGNvcnJlY3RseVxyXG4gICAgY29uc3QgY3VycmVudEFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMoc3RhbmRzKTtcclxuICAgIG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudCA9IGFsbG9jYXRpb25zS2V5KGN1cnJlbnRBbGxvY3MpO1xyXG4gICAgc2V0SXNEaXJ0eShmYWxzZSk7XHJcbiAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7XHJcbiAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gIH0sIFtzYXZlZEF0LCBzdGFuZHNdKTtcclxuICBjb25zdCBbY29udGFpbmVyV2lkdGgsIHNldENvbnRhaW5lcldpZHRoXSA9IFJlYWN0LnVzZVN0YXRlKDgwMCk7XHJcbiAgY29uc3QgW3F1ZXVlU29ydCwgc2V0UXVldWVTb3J0XSA9IFJlYWN0LnVzZVN0YXRlPCdheicgfCAncHJpb3JpdHknIHwgJ3N0YXR1cyc+KCdheicpO1xyXG4gIGNvbnN0IFtxdWV1ZUZpbHRlciwgc2V0UXVldWVGaWx0ZXJdID0gUmVhY3QudXNlU3RhdGUoJycpO1xyXG5cclxuICBjb25zdCBzdGF0dXNPcHRpb25zTGlzdCA9IHVzZU1lbW88c3RyaW5nW10+KCgpID0+IHtcclxuICAgIGNvbnN0IGFyciA9IEFycmF5LmlzQXJyYXkoc3RhdHVzT3B0aW9ucykgPyBzdGF0dXNPcHRpb25zIGFzIGFueVtdIDogW107XHJcbiAgICByZXR1cm4gYXJyLmxlbmd0aCA+IDAgPyBhcnIubWFwKFN0cmluZykgOiBbXCJOVUxMXCIsIFwiUnVubmluZ1wiLCBcIkNyZWF0ZWRcIiwgXCJUZXN0ZWRcIiwgXCJDYW5jZWxsZWRcIl07XHJcbiAgfSwgW3N0YXR1c09wdGlvbnNdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEluaXRpYWxpemUgZnJvbSBpbnB1dCBkYXRhIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGlucHV0S2V5ID0gdXNlTWVtbyhcclxuICAgICgpID0+IEpTT04uc3RyaW5naWZ5KGlucHV0VGVzdHMpICsgSlNPTi5zdHJpbmdpZnkoaW5wdXRTdGFuZHMpICsgSlNPTi5zdHJpbmdpZnkoaW5wdXROb25Xb3JraW5nKSxcclxuICAgIFtpbnB1dFRlc3RzLCBpbnB1dFN0YW5kcywgaW5wdXROb25Xb3JraW5nXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB0ZXN0c0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRUZXN0cykgPyBpbnB1dFRlc3RzIDogW107XHJcbiAgICBjb25zdCBzdGFuZHNBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0U3RhbmRzKSA/IChpbnB1dFN0YW5kcyBhcyBTdGFuZERlZltdKSA6IFtdO1xyXG4gICAgY29uc3Qgbm9uV29ya2luZ0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXROb25Xb3JraW5nKSA/IGlucHV0Tm9uV29ya2luZyA6IFtdO1xyXG5cclxuICAgIGlmIChzdGFuZHNBcnIubGVuZ3RoID09PSAwICYmIHRlc3RzQXJyLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgc3RhbmRzOiBuZXdTdGFuZHMsIHVuYWxsb2NhdGVkOiB1bmFsbG9jIH0gPSBwYXJzZVN0YW5kcyh0ZXN0c0Fyciwgc3RhbmRzQXJyLCBjaEhvdXJzLCBub25Xb3JraW5nQXJyKTtcclxuICAgIHNldFN0YW5kcyhuZXdTdGFuZHMpO1xyXG4gICAgc2V0VW5hbGxvY2F0ZWQodW5hbGxvYyk7XHJcbiAgICBzZXRJc0RpcnR5KGZhbHNlKTtcclxuXHJcbiAgICAvLyBTbmFwc2hvdCB0aGUgaW5pdGlhbCBhbGxvY2F0aW9uc1xyXG4gICAgY29uc3QgaW5pdGlhbEFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKTtcclxuICAgIG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudCA9IGFsbG9jYXRpb25zS2V5KGluaXRpYWxBbGxvY3MpO1xyXG5cclxuICAgIC8vIFNldCBvdXRwdXQgc3RhdGVcclxuICAgIHNldEFsbG9jYXRpb25zKGluaXRpYWxBbGxvY3MpO1xyXG4gICAgc2V0QWxsVGVzdElkcyh0ZXN0c0Fyci5tYXAoKHQ6IGFueSkgPT4gdC5pZCkpO1xyXG4gICAgc2V0SGFzVW5zYXZlZENoYW5nZXMoZmFsc2UpO1xyXG5cclxuICAgIC8vIENsZWFyIHNhdmUgbG9jayBcdTIwMTQgbmV3IGRhdGEgYXJyaXZpbmcgZnJvbSBSZXRvb2wgbWVhbnMgdGhlIHNhdmUgcm91bmQtdHJpcCBjb21wbGV0ZWQuXHJcbiAgICAvLyBUaGlzIGlzIG1vcmUgcmVsaWFibGUgdGhhbiB3YWl0aW5nIGZvciB0aGUgc2F2ZVN0YXRlIGJpbmRpbmcgdG8gdHJhbnNpdGlvbiB0aHJvdWdoXHJcbiAgICAvLyAnc2F2aW5nJyBcdTIxOTIgJ2lkbGUnLCB3aGljaCBSZXRvb2wgY2FuIGJhdGNoIGF3YXkgc28gdGhlIHVzZUVmZmVjdCBuZXZlciBmaXJlcy5cclxuICAgIHNldFBlbmRpbmdTYXZlKGZhbHNlKTtcclxuICAgIHNldFNhdmVFcnJvcihmYWxzZSk7XHJcbiAgfSwgW2lucHV0S2V5XSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBTY2hlZHVsaW5nIGNvbmZpZyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBjaEhvdXJzID0gKGNoYW5nZW92ZXJIb3VycyBhcyBudW1iZXIpIHx8IDM7XHJcbiAgY29uc3Qgd1N0YXJ0ID0gKHdvcmtTdGFydCBhcyBudW1iZXIpIHx8IDk7XHJcbiAgY29uc3Qgd0VuZCA9ICh3b3JrRW5kIGFzIG51bWJlcikgfHwgMTc7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBWaWV3IGNvbXB1dGF0aW9ucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB2aWV3U3RhcnQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZC5zZXRIb3VycygwLCAwLCAwLCAwKTtcclxuICAgIHdoaWxlIChkLmdldERheSgpICE9PSAxKSBkLnNldERhdGUoZC5nZXREYXRlKCkgLSAxKTtcclxuICAgIHJldHVybiBkO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFNjaGVkdWxlIGNvbXB1dGF0aW9uIChtdXN0IGJlIGRlZmluZWQgYmVmb3JlIHRpbWVsaW5lRW5kKSBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBjb21wdXRlU2NoZWR1bGUgPSB1c2VDYWxsYmFjaygodGVzdHM6IFRlc3REYXRhW10sIHN0YW5kQ2hhbmdlb3ZlcjogbnVtYmVyLCBub25Xb3JraW5nQmxvY2tzOiBOb25Xb3JraW5nQmxvY2tbXSk6IFNjaGVkdWxlZFRlc3RbXSA9PiB7XHJcbiAgICBjb25zdCBydW5uaW5nVGVzdHMgPSB0ZXN0cy5maWx0ZXIodCA9PiBpc1J1bm5pbmdUZXN0KHQpKTtcclxuICAgIGNvbnN0IHF1ZXVlZFRlc3RzID0gdGVzdHMuZmlsdGVyKHQgPT4gIWlzUnVubmluZ1Rlc3QodCkpO1xyXG5cclxuICAgIC8vIFNvcnQgUnVubmluZyB0ZXN0cyBieSBhY3R1YWwgc3RhcnQgZGF0ZSwgdGhlbiBwcmlvcml0eSBkZXNjIGZvciB0aWVzXHJcbiAgICBjb25zdCBzb3J0ZWRSdW5uaW5nID0gWy4uLnJ1bm5pbmdUZXN0c10uc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCBkYXRlQSA9IHBhcnNlTG9jYWxEYXRlKGEudGVzdF9zdGFydGVkX2RhdGUpIHx8IG5ldyBEYXRlKCk7XHJcbiAgICAgIGNvbnN0IGRhdGVCID0gcGFyc2VMb2NhbERhdGUoYi50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgbmV3IERhdGUoKTtcclxuICAgICAgaWYgKGRhdGVBLmdldFRpbWUoKSAhPT0gZGF0ZUIuZ2V0VGltZSgpKSByZXR1cm4gZGF0ZUEuZ2V0VGltZSgpIC0gZGF0ZUIuZ2V0VGltZSgpO1xyXG4gICAgICByZXR1cm4gKGIucHJpb3JpdHkgPz8gNTApIC0gKGEucHJpb3JpdHkgPz8gNTApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUnVubmluZyB0ZXN0cyB1c2UgdGhlaXIgYWN0dWFsIHRlc3Rfc3RhcnRlZF9kYXRlOyBvdmVybGFwcGluZyBvbmVzIGFyZSBtYWRlIHNlcXVlbnRpYWxcclxuICAgIGxldCBsYXN0UnVubmluZ0VuZCA9IG5ldyBEYXRlKHZpZXdTdGFydCk7XHJcbiAgICBjb25zdCBydW5uaW5nU2NoZWR1bGVkID0gc29ydGVkUnVubmluZy5tYXAodGVzdCA9PiB7XHJcbiAgICAgIGNvbnN0IHRlc3REYXRlID0gcGFyc2VMb2NhbERhdGUodGVzdC50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgbmV3IERhdGUodmlld1N0YXJ0KTtcclxuICAgICAgY29uc3Qgc3RhcnQgPSB0ZXN0RGF0ZSA8IGxhc3RSdW5uaW5nRW5kID8gbmV3IERhdGUobGFzdFJ1bm5pbmdFbmQpIDogbmV3IERhdGUodGVzdERhdGUpO1xyXG4gICAgICBjb25zdCBkdXJhdGlvbkVuZCA9IG5ldyBEYXRlKHN0YXJ0LmdldFRpbWUoKSArIHRlc3QuZHVyYXRpb24gKiBNU19QRVJfSE9VUik7XHJcbiAgICAgIGNvbnN0IGVuZCA9IGR1cmF0aW9uRW5kIDwgbmV3IERhdGUoKSA/IG5ldyBEYXRlKCkgOiBkdXJhdGlvbkVuZDtcclxuICAgICAgbGFzdFJ1bm5pbmdFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKGVuZCwgc3RhbmRDaGFuZ2VvdmVyLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICByZXR1cm4geyAuLi50ZXN0LCBzdGFydCwgZW5kIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBRdWV1ZWQgdGVzdHMgc3RhcnQgYWZ0ZXIgbGFzdCBSdW5uaW5nIHRlc3QncyBjaGFuZ2VvdmVyIChvciBub3crY2hhbmdlb3Zlciwgd2hpY2hldmVyIGlzIGxhdGVyKS5cclxuICAgIC8vIFdlIG5ldmVyIHNjaGVkdWxlIGEgcGxhbm5lZCB0ZXN0IHRvIHN0YXJ0IGluIHRoZSBwYXN0LlxyXG4gICAgLy8gZmluZFZhbGlkU3RhcnQgcHVzaGVzIHRoZSBzdGFydCBmb3J3YXJkIHVudGlsIHRoZSBmdWxsIFtzdGFydCwgc3RhcnQrZHVyYXRpb24pIHdpbmRvd1xyXG4gICAgLy8gZG9lc24ndCBvdmVybGFwIGFueSBub24td29ya2luZyBibG9jayAoY292ZXJzIGJvdGggc3RhcnQtaW5zaWRlIGFuZCBlbmQtaW5zaWRlIGNhc2VzKS5cclxuICAgIGNvbnN0IG5vd1BsdXNDaGFuZ2VvdmVyID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChuZXcgRGF0ZSgpLCBzdGFuZENoYW5nZW92ZXIsIHdTdGFydCwgd0VuZCk7XHJcbiAgICBsZXQgY3VycmVudEVuZCA9IG5ldyBEYXRlKE1hdGgubWF4KGxhc3RSdW5uaW5nRW5kLmdldFRpbWUoKSwgbm93UGx1c0NoYW5nZW92ZXIuZ2V0VGltZSgpKSk7XHJcbiAgICBjb25zdCBxdWV1ZWRTY2hlZHVsZWQgPSBxdWV1ZWRUZXN0cy5tYXAodGVzdCA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0ID0gZmluZFZhbGlkU3RhcnQobmV3IERhdGUoY3VycmVudEVuZCksIHRlc3QuZHVyYXRpb24sIG5vbldvcmtpbmdCbG9ja3MpO1xyXG4gICAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShzdGFydC5nZXRUaW1lKCkgKyB0ZXN0LmR1cmF0aW9uICogTVNfUEVSX0hPVVIpO1xyXG4gICAgICBjdXJyZW50RW5kID0gYWR2YW5jZVBhc3ROb25Xb3JraW5nKFxyXG4gICAgICAgIGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQoZW5kLCBzdGFuZENoYW5nZW92ZXIsIHdTdGFydCwgd0VuZCksXHJcbiAgICAgICAgbm9uV29ya2luZ0Jsb2Nrc1xyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4geyAuLi50ZXN0LCBzdGFydCwgZW5kIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gWy4uLnJ1bm5pbmdTY2hlZHVsZWQsIC4uLnF1ZXVlZFNjaGVkdWxlZF07XHJcbiAgfSwgW3ZpZXdTdGFydCwgd1N0YXJ0LCB3RW5kXSk7XHJcblxyXG4gIGNvbnN0IHN0YW5kU2NoZWR1bGVzID0gdXNlTWVtbyhcclxuICAgICgpID0+IG5ldyBNYXAoc3RhbmRzLm1hcChzID0+IFtzLmlkLCBjb21wdXRlU2NoZWR1bGUocy50ZXN0cywgcy5jaGFuZ2VvdmVyX2hvdXJzLCBzLm5vbldvcmtpbmdCbG9ja3MpXSkpLFxyXG4gICAgW3N0YW5kcywgY29tcHV0ZVNjaGVkdWxlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRpbWVsaW5lRW5kID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBsZXQgbGF0ZXN0RW5kID0gbmV3IERhdGUodmlld1N0YXJ0KTtcclxuICAgIGxhdGVzdEVuZC5zZXREYXRlKGxhdGVzdEVuZC5nZXREYXRlKCkgKyB2aWV3cG9ydFdlZWtzICogNyk7XHJcblxyXG4gICAgc3RhbmRzLmZvckVhY2goc3RhbmQgPT4ge1xyXG4gICAgICBjb25zdCBzY2hlZHVsZSA9IHN0YW5kU2NoZWR1bGVzLmdldChzdGFuZC5pZCkgPz8gW107XHJcbiAgICAgIGlmIChzY2hlZHVsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgbGFzdCA9IHNjaGVkdWxlW3NjaGVkdWxlLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZW92ZXJFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKGxhc3QuZW5kLCBzdGFuZC5jaGFuZ2VvdmVyX2hvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICAgIGlmIChjaGFuZ2VvdmVyRW5kID4gbGF0ZXN0RW5kKSBsYXRlc3RFbmQgPSBjaGFuZ2VvdmVyRW5kO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsYXRlc3RFbmQuc2V0RGF0ZShsYXRlc3RFbmQuZ2V0RGF0ZSgpICsgNyk7XHJcbiAgICByZXR1cm4gbGF0ZXN0RW5kO1xyXG4gIH0sIFtzdGFuZFNjaGVkdWxlcywgc3RhbmRzLCB2aWV3U3RhcnQsIHZpZXdwb3J0V2Vla3MsIHdTdGFydCwgd0VuZF0pO1xyXG5cclxuICBjb25zdCB0b3RhbERheXMgPSB1c2VNZW1vKCgpID0+IE1hdGguY2VpbChob3Vyc0JldHdlZW4odmlld1N0YXJ0LCB0aW1lbGluZUVuZCkgLyAyNCksIFt2aWV3U3RhcnQsIHRpbWVsaW5lRW5kXSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBQbGFubmVkIGRhdGVzIGZvciBzY2hlZHVsZWQgdGVzdHMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3Qgc2NoZWR1bGVkUGxhbm5lZERhdGVzID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCByZXN1bHQ6IEFycmF5PHsgdGVzdF9pZDogbnVtYmVyIHwgc3RyaW5nOyBwbGFubmVkX2RhdGU6IHN0cmluZyB9PiA9IFtdO1xyXG4gICAgc3RhbmRzLmZvckVhY2goc3RhbmQgPT4ge1xyXG4gICAgICBjb25zdCBzY2hlZHVsZSA9IHN0YW5kU2NoZWR1bGVzLmdldChzdGFuZC5pZCkgPz8gW107XHJcbiAgICAgIHNjaGVkdWxlLmZvckVhY2goc3QgPT4ge1xyXG4gICAgICAgIGNvbnN0IGQgPSBzdC5zdGFydDtcclxuICAgICAgICBjb25zdCBkYXRlU3RyID0gYCR7ZC5nZXRGdWxsWWVhcigpfS0ke1N0cmluZyhkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpfS0ke1N0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKX1gO1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKHsgdGVzdF9pZDogc3QuaWQsIHBsYW5uZWRfZGF0ZTogZGF0ZVN0ciB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSwgW3N0YW5kcywgc3RhbmRTY2hlZHVsZXNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldFBsYW5uZWREYXRlcyhzY2hlZHVsZWRQbGFubmVkRGF0ZXMpO1xyXG4gIH0sIFtzY2hlZHVsZWRQbGFubmVkRGF0ZXNdKTtcclxuXHJcbiAgY29uc3QgcHhQZXJIb3VyID0gY29udGFpbmVyV2lkdGggLyAodmlld3BvcnRXZWVrcyAqIDcgKiAyNCk7XHJcbiAgY29uc3QgZGF5cyA9IHVzZU1lbW8oKCkgPT4gZ2VuZXJhdGVEYXlzKHZpZXdTdGFydCwgdG90YWxEYXlzKSwgW3ZpZXdTdGFydCwgdG90YWxEYXlzXSk7XHJcbiAgY29uc3Qgd2Vla3MgPSB1c2VNZW1vKCgpID0+IGdlbmVyYXRlV2Vla3Modmlld1N0YXJ0LCB0b3RhbERheXMpLCBbdmlld1N0YXJ0LCB0b3RhbERheXNdKTtcclxuICBjb25zdCB0b3RhbFdpZHRoID0gdG90YWxEYXlzICogMjQgKiBweFBlckhvdXI7XHJcbiAgY29uc3QgZGF5V2lkdGggPSAyNCAqIHB4UGVySG91cjtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEFmdGVyLWNoYW5nZSBoYW5kbGVyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGFmdGVyQ2hhbmdlID0gdXNlQ2FsbGJhY2soKG5ld1N0YW5kczogSW50ZXJuYWxTdGFuZFtdKSA9PiB7XHJcbiAgICBjb25zdCBhbGxvY3MgPSBidWlsZEFsbG9jYXRpb25zKG5ld1N0YW5kcyk7XHJcbiAgICBjb25zdCBkaXJ0eSA9IGFsbG9jYXRpb25zS2V5KGFsbG9jcykgIT09IG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudDtcclxuICAgIHNldElzRGlydHkoZGlydHkpO1xyXG4gICAgc2V0QWxsb2NhdGlvbnMoYWxsb2NzKTtcclxuICAgIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzKGRpcnR5KTtcclxuXHJcbiAgICBpZiAoKHNhdmVNb2RlIGFzIHN0cmluZykgPT09ICdsaXZlJykge1xyXG4gICAgICBzZXRQZW5kaW5nU2F2ZSh0cnVlKTtcclxuICAgICAgb25DaGFuZ2UoKTtcclxuICAgIH1cclxuICB9LCBbc2F2ZU1vZGUsIHNldEFsbG9jYXRpb25zLCBzZXRIYXNVbnNhdmVkQ2hhbmdlcywgb25DaGFuZ2VdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIERyYWcgYW5kIGRyb3AgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgZmluZFRlc3QgPSB1c2VDYWxsYmFjaygodGVzdElkOiBzdHJpbmcgfCBudW1iZXIpOiBUZXN0RGF0YSB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgcSA9IHVuYWxsb2NhdGVkLmZpbmQodCA9PiB0LmlkID09PSB0ZXN0SWQpO1xyXG4gICAgaWYgKHEpIHJldHVybiBxO1xyXG4gICAgZm9yIChjb25zdCBzIG9mIHN0YW5kcykge1xyXG4gICAgICBjb25zdCB0ID0gcy50ZXN0cy5maW5kKHQgPT4gdC5pZCA9PT0gdGVzdElkKTtcclxuICAgICAgaWYgKHQpIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSwgW3VuYWxsb2NhdGVkLCBzdGFuZHNdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJEcmFnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0RHJhZ2dlZFRlc3RJZChudWxsKTtcclxuICAgIHNldEluc2VydEluZGljYXRvcihudWxsKTtcclxuICAgIHNldFF1ZXVlSW5zZXJ0SW5kZXgobnVsbCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBkcm9wT25TdGFuZCA9IHVzZUNhbGxiYWNrKChzdGFuZElkOiBzdHJpbmcgfCBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIGlmICghZHJhZ2dlZFRlc3RJZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgdGVzdCA9IGZpbmRUZXN0KGRyYWdnZWRUZXN0SWQpO1xyXG4gICAgaWYgKCF0ZXN0KSByZXR1cm47XHJcblxyXG4gICAgLy8gUmVtb3ZlIGZyb20gdW5hbGxvY2F0ZWRcclxuICAgIHNldFVuYWxsb2NhdGVkKHByZXYgPT4gcHJldi5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGZyb20gYWxsIHN0YW5kcyBhbmQgaW5zZXJ0IGF0IHRhcmdldFxyXG4gICAgY29uc3QgbmV3U3RhbmRzID0gc3RhbmRzLm1hcChzID0+IHtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxJbmRleCA9IHMudGVzdHMuZmluZEluZGV4KHQgPT4gdC5pZCA9PT0gZHJhZ2dlZFRlc3RJZCk7XHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkID0gcy50ZXN0cy5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKTtcclxuICAgICAgaWYgKHMuaWQgPT09IHN0YW5kSWQpIHtcclxuICAgICAgICAvLyBBZGp1c3QgaW5kZXggaWYgdGhlIGRyYWdnZWQgdGVzdCB3YXMgb3JpZ2luYWxseSBpbiB0aGlzIHN0YW5kIGJlZm9yZSB0aGUgZHJvcCBwb3NpdGlvblxyXG4gICAgICAgIGNvbnN0IGFkanVzdGVkSW5kZXggPSAob3JpZ2luYWxJbmRleCAhPT0gLTEgJiYgb3JpZ2luYWxJbmRleCA8IGluZGV4KSA/IGluZGV4IC0gMSA6IGluZGV4O1xyXG4gICAgICAgIGNvbnN0IG5ld1Rlc3RzID0gWy4uLmZpbHRlcmVkXTtcclxuICAgICAgICBuZXdUZXN0cy5zcGxpY2UoYWRqdXN0ZWRJbmRleCwgMCwgdGVzdCk7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4ucywgdGVzdHM6IG5ld1Rlc3RzIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHsgLi4ucywgdGVzdHM6IGZpbHRlcmVkIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIGFmdGVyQ2hhbmdlKG5ld1N0YW5kcyk7XHJcbiAgICBjbGVhckRyYWcoKTtcclxuICB9LCBbZHJhZ2dlZFRlc3RJZCwgZmluZFRlc3QsIHN0YW5kcywgYWZ0ZXJDaGFuZ2UsIGNsZWFyRHJhZ10pO1xyXG5cclxuICBjb25zdCBkcm9wT25RdWV1ZSA9IHVzZUNhbGxiYWNrKChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICBpZiAoIWRyYWdnZWRUZXN0SWQpIHJldHVybjtcclxuICAgIGNvbnN0IHRlc3QgPSBmaW5kVGVzdChkcmFnZ2VkVGVzdElkKTtcclxuICAgIGlmICghdGVzdCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFJlbW92ZSBmcm9tIHN0YW5kc1xyXG4gICAgY29uc3QgbmV3U3RhbmRzID0gc3RhbmRzLm1hcChzID0+ICh7XHJcbiAgICAgIC4uLnMsXHJcbiAgICAgIHRlc3RzOiBzLnRlc3RzLmZpbHRlcih0ID0+IHQuaWQgIT09IGRyYWdnZWRUZXN0SWQpLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIEFkZCB0byB1bmFsbG9jYXRlZFxyXG4gICAgc2V0VW5hbGxvY2F0ZWQocHJldiA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkID0gcHJldi5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKTtcclxuICAgICAgY29uc3QgbmV4dCA9IFsuLi5maWx0ZXJlZF07XHJcbiAgICAgIG5leHQuc3BsaWNlKGluZGV4LCAwLCB0ZXN0KTtcclxuICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIGFmdGVyQ2hhbmdlKG5ld1N0YW5kcyk7XHJcbiAgICBjbGVhckRyYWcoKTtcclxuICB9LCBbZHJhZ2dlZFRlc3RJZCwgZmluZFRlc3QsIHN0YW5kcywgYWZ0ZXJDaGFuZ2UsIGNsZWFyRHJhZ10pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgU2F2ZSAvIERpc2NhcmQgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgaGFuZGxlU2F2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFBlbmRpbmdTYXZlKHRydWUpO1xyXG4gICAgb25TYXZlKCk7XHJcbiAgfSwgW29uU2F2ZV0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEaXNjYXJkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0U2F2ZUVycm9yKGZhbHNlKTtcclxuICAgIHNldFBlbmRpbmdTYXZlKGZhbHNlKTtcclxuICAgIC8vIFJlLXBhcnNlIGZyb20gaW5wdXQgZGF0YVxyXG4gICAgY29uc3QgdGVzdHNBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0VGVzdHMpID8gaW5wdXRUZXN0cyA6IFtdO1xyXG4gICAgY29uc3Qgc3RhbmRzQXJyID0gQXJyYXkuaXNBcnJheShpbnB1dFN0YW5kcykgPyAoaW5wdXRTdGFuZHMgYXMgU3RhbmREZWZbXSkgOiBbXTtcclxuICAgIGNvbnN0IG5vbldvcmtpbmdBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0Tm9uV29ya2luZykgPyBpbnB1dE5vbldvcmtpbmcgOiBbXTtcclxuXHJcbiAgICBjb25zdCB7IHN0YW5kczogbmV3U3RhbmRzLCB1bmFsbG9jYXRlZDogdW5hbGxvYyB9ID0gcGFyc2VTdGFuZHModGVzdHNBcnIsIHN0YW5kc0FyciwgY2hIb3Vycywgbm9uV29ya2luZ0Fycik7XHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIHNldFVuYWxsb2NhdGVkKHVuYWxsb2MpO1xyXG4gICAgc2V0SXNEaXJ0eShmYWxzZSk7XHJcbiAgICBzZXRBbGxvY2F0aW9ucyhidWlsZEFsbG9jYXRpb25zKG5ld1N0YW5kcykpO1xyXG4gICAgc2V0SGFzVW5zYXZlZENoYW5nZXMoZmFsc2UpO1xyXG4gIH0sIFtpbnB1dFRlc3RzLCBpbnB1dFN0YW5kcywgaW5wdXROb25Xb3JraW5nLCBjaEhvdXJzLCBzZXRBbGxvY2F0aW9ucywgc2V0SGFzVW5zYXZlZENoYW5nZXNdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUmV0cnkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gICAgc2V0UGVuZGluZ1NhdmUodHJ1ZSk7XHJcbiAgICBvblJldHJ5KCk7XHJcbiAgfSwgW29uUmV0cnldKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFBvcG92ZXIgYWN0aW9ucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBjbG9zZVBvcG92ZXIgPSB1c2VDYWxsYmFjaygoKSA9PiBzZXRQb3BvdmVyKG51bGwpLCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVBvcG92ZXJNb2RlQ2hhbmdlID0gdXNlQ2FsbGJhY2soKG1vZGU6ICdyb290JyB8ICdwcmlvcml0eScgfCAnc3RhdHVzJyB8ICdzdGFydF9kYXRlJyB8ICdlbmRfZGF0ZScpID0+IHtcclxuICAgIHNldFBvcG92ZXIocHJldiA9PiBwcmV2ID8geyAuLi5wcmV2LCBtb2RlIH0gOiBudWxsKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmZpcm1Qcmlvcml0eSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghcG9wb3ZlcikgcmV0dXJuO1xyXG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQocHJpb3JpdHlJbnB1dFZhbHVlLCAxMCk7XHJcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSB8fCBwYXJzZWQgPCAwIHx8IHBhcnNlZCA+IDEwMCkgcmV0dXJuO1xyXG4gICAgc2V0U2VsZWN0ZWRUZXN0SWQoU3RyaW5nKHBvcG92ZXIudGVzdC5pZCkpO1xyXG4gICAgc2V0U2VsZWN0ZWRUZXN0UHJpb3JpdHkoU3RyaW5nKHBhcnNlZCkpO1xyXG4gICAgb25DaGFuZ2VQcmlvcml0eSgpO1xyXG4gICAgc2V0UG9wb3ZlcihudWxsKTtcclxuICB9LCBbcG9wb3ZlciwgcHJpb3JpdHlJbnB1dFZhbHVlLCBzZXRTZWxlY3RlZFRlc3RJZCwgc2V0U2VsZWN0ZWRUZXN0UHJpb3JpdHksIG9uQ2hhbmdlUHJpb3JpdHldKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUGlja1N0YXR1cyA9IHVzZUNhbGxiYWNrKChzdGF0dXM6IHN0cmluZykgPT4ge1xyXG4gICAgaWYgKCFwb3BvdmVyKSByZXR1cm47XHJcbiAgICBzZXRTZWxlY3RlZFRlc3RJZChTdHJpbmcocG9wb3Zlci50ZXN0LmlkKSk7XHJcbiAgICBzZXRTZWxlY3RlZFRlc3RTdGF0dXMoc3RhdHVzID09PSAnTlVMTCcgPyAnJyA6IHN0YXR1cyk7XHJcbiAgICBvbkNoYW5nZVN0YXR1cygpO1xyXG4gICAgc2V0UG9wb3ZlcihudWxsKTtcclxuICB9LCBbcG9wb3Zlciwgc2V0U2VsZWN0ZWRUZXN0SWQsIHNldFNlbGVjdGVkVGVzdFN0YXR1cywgb25DaGFuZ2VTdGF0dXNdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRWRpdFRlc3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIXBvcG92ZXIpIHJldHVybjtcclxuICAgIHNldFNlbGVjdGVkVGVzdElkKFN0cmluZyhwb3BvdmVyLnRlc3QuaWQpKTtcclxuICAgIG9uRWRpdFRlc3QoKTtcclxuICAgIHNldFBvcG92ZXIobnVsbCk7XHJcbiAgfSwgW3BvcG92ZXIsIHNldFNlbGVjdGVkVGVzdElkLCBvbkVkaXRUZXN0XSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmZpcm1TdGFydERhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIXBvcG92ZXIgfHwgIXN0YXJ0RGF0ZUlucHV0VmFsdWUpIHJldHVybjtcclxuICAgIHNldFNlbGVjdGVkVGVzdElkKFN0cmluZyhwb3BvdmVyLnRlc3QuaWQpKTtcclxuICAgIHNldFNlbGVjdGVkVGVzdFN0YXJ0RGF0ZShzdGFydERhdGVJbnB1dFZhbHVlKTtcclxuICAgIG9uQ2hhbmdlU3RhcnREYXRlKCk7XHJcbiAgICBzZXRQb3BvdmVyKG51bGwpO1xyXG4gICAgc2V0U3RhcnREYXRlSW5wdXRWYWx1ZSgnJyk7XHJcbiAgfSwgW3BvcG92ZXIsIHN0YXJ0RGF0ZUlucHV0VmFsdWUsIHNldFNlbGVjdGVkVGVzdElkLCBzZXRTZWxlY3RlZFRlc3RTdGFydERhdGUsIG9uQ2hhbmdlU3RhcnREYXRlXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmZpcm1FbmREYXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFwb3BvdmVyIHx8ICFlbmREYXRlSW5wdXRWYWx1ZSkgcmV0dXJuO1xyXG4gICAgc2V0U2VsZWN0ZWRUZXN0SWQoU3RyaW5nKHBvcG92ZXIudGVzdC5pZCkpO1xyXG4gICAgc2V0U2VsZWN0ZWRUZXN0RW5kRGF0ZShlbmREYXRlSW5wdXRWYWx1ZSk7XHJcbiAgICBvbkNoYW5nZUVuZERhdGUoKTtcclxuICAgIHNldFBvcG92ZXIobnVsbCk7XHJcbiAgICBzZXRFbmREYXRlSW5wdXRWYWx1ZSgnJyk7XHJcbiAgfSwgW3BvcG92ZXIsIGVuZERhdGVJbnB1dFZhbHVlLCBzZXRTZWxlY3RlZFRlc3RJZCwgc2V0U2VsZWN0ZWRUZXN0RW5kRGF0ZSwgb25DaGFuZ2VFbmREYXRlXSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBCYXIgcG9zaXRpb24gXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgZ2V0QmFyUG9zID0gdXNlQ2FsbGJhY2soKHN0YXJ0OiBEYXRlLCBkdXJhdGlvbjogbnVtYmVyKSA9PiAoe1xyXG4gICAgbGVmdDogTWF0aC5tYXgoMCwgaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgc3RhcnQpKSAqIHB4UGVySG91cixcclxuICAgIHdpZHRoOiBNYXRoLm1heChkdXJhdGlvbiAqIHB4UGVySG91ciwgMiksXHJcbiAgfSksIFt2aWV3U3RhcnQsIHB4UGVySG91cl0pO1xyXG5cclxuICAvLyBGb3IgUnVubmluZyB0ZXN0czogY2xpcCBsZWZ0IHRvIHZpZXdTdGFydCwgYWRqdXN0IHdpZHRoIHRvIGFjdHVhbCBlbmQgdGltZS5cclxuICAvLyBSZXR1cm5zIG51bGwgaWYgdGhlIHRlc3QgZW5kZWQgYmVmb3JlIHRoZSB0aW1lbGluZSBzdGFydHMuXHJcbiAgY29uc3QgZ2V0UnVubmluZ0JhclBvcyA9IHVzZUNhbGxiYWNrKChzdGFydDogRGF0ZSwgZW5kOiBEYXRlKTogeyBsZWZ0OiBudW1iZXI7IHdpZHRoOiBudW1iZXIgfSB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgZWZmZWN0aXZlU3RhcnRNcyA9IE1hdGgubWF4KHN0YXJ0LmdldFRpbWUoKSwgdmlld1N0YXJ0LmdldFRpbWUoKSk7XHJcbiAgICBjb25zdCBlbmRNcyA9IGVuZC5nZXRUaW1lKCk7XHJcbiAgICBpZiAoZW5kTXMgPD0gZWZmZWN0aXZlU3RhcnRNcykgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsZWZ0OiBob3Vyc0JldHdlZW4odmlld1N0YXJ0LCBuZXcgRGF0ZShlZmZlY3RpdmVTdGFydE1zKSkgKiBweFBlckhvdXIsXHJcbiAgICAgIHdpZHRoOiBNYXRoLm1heChob3Vyc0JldHdlZW4obmV3IERhdGUoZWZmZWN0aXZlU3RhcnRNcyksIG5ldyBEYXRlKGVuZE1zKSkgKiBweFBlckhvdXIsIDIpLFxyXG4gICAgfTtcclxuICB9LCBbdmlld1N0YXJ0LCBweFBlckhvdXJdKTtcclxuXHJcbiAgY29uc3QgZHJhZ2dlZFRlc3QgPSBkcmFnZ2VkVGVzdElkICE9IG51bGwgPyBmaW5kVGVzdChkcmFnZ2VkVGVzdElkKSA6IG51bGw7XHJcbiAgY29uc3QgZHJhZ2dlZElzUnVubmluZyA9IGRyYWdnZWRUZXN0ICE9IG51bGwgPyBpc1J1bm5pbmdUZXN0KGRyYWdnZWRUZXN0KSA6IGZhbHNlO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgU3RhdHMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgdG90YWxBbGxvY2F0ZWQgPSBzdGFuZHMucmVkdWNlKChhLCBzKSA9PiBhICsgcy50ZXN0cy5sZW5ndGgsIDApO1xyXG4gIGNvbnN0IHRvdGFsSG91cnMgPSBzdGFuZHMucmVkdWNlKChhLCBzKSA9PiBhICsgcy50ZXN0cy5yZWR1Y2UoKGIsIHQpID0+IGIgKyB0LmR1cmF0aW9uLCAwKSwgMCk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBUZW1wbGF0ZSBhY2Nlc3NvcnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgbWFpblRleHQgPSBTdHJpbmcoY2FyZE1haW5UZXh0IHx8ICd7bmFtZX0nKTtcclxuICBjb25zdCBzdWJUZXh0ID0gU3RyaW5nKGNhcmRTdWJUZXh0IHx8ICcnKTtcclxuICBjb25zdCBpbmZvUm93ID0gU3RyaW5nKGNhcmRJbmZvUm93IHx8ICcnKTtcclxuICBjb25zdCB0aXBUZW1wbGF0ZSA9IFN0cmluZyh0b29sdGlwVGVtcGxhdGUgfHwgJycpLnJlcGxhY2UoL1xcXFxuL2csICdcXG4nKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEZpbHRlcmVkICYgc29ydGVkIHF1ZXVlIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFNUQVRVU19TT1JUX09SREVSOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge1xyXG4gICAgJ1J1bm5pbmcnOiAwLCAnRGVsYXllZCc6IDEsICdPbiBUaW1lJzogMiwgJ1JlYWR5JzogMywgJ0luIFByb2dyZXNzJzogNCwgJ1BhcnRzIE5vdCBBc3NpZ25lZCc6IDUsXHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc29ydGVkVW5hbGxvY2F0ZWQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGxldCBsaXN0ID0gWy4uLnVuYWxsb2NhdGVkXTtcclxuICAgIGlmIChxdWV1ZUZpbHRlci50cmltKCkpIHtcclxuICAgICAgY29uc3QgcSA9IHF1ZXVlRmlsdGVyLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xyXG4gICAgICAvLyBTZWFyY2ggYWNyb3NzIGFsbCByZWFkYWJsZSBzdHJpbmcvbnVtYmVyIGZpZWxkcyBvZiB0aGUgdGVzdFxyXG4gICAgICBsaXN0ID0gbGlzdC5maWx0ZXIodCA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoYWJsZSA9IFt0Lm5hbWUsIHQub3duZXIsIHQubm90ZXMsIHQuc3RhdHVzLCB0LnBhcnRfc3RhdHVzLCB0LmFzc2lnbmVkX3BhcnRzLFxyXG4gICAgICAgICAgdC5wcmlvcml0eSAhPSBudWxsID8gU3RyaW5nKHQucHJpb3JpdHkpIDogJycsIHQuZHVyYXRpb24gIT0gbnVsbCA/IFN0cmluZyh0LmR1cmF0aW9uKSA6ICcnXVxyXG4gICAgICAgICAgLmpvaW4oJyAnKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHJldHVybiBzZWFyY2hhYmxlLmluY2x1ZGVzKHEpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChxdWV1ZVNvcnQgPT09ICdheicpIHtcclxuICAgICAgbGlzdC5zb3J0KChhLCBiKSA9PiAoYS5uYW1lIHx8ICcnKS5sb2NhbGVDb21wYXJlKGIubmFtZSB8fCAnJykpO1xyXG4gICAgfSBlbHNlIGlmIChxdWV1ZVNvcnQgPT09ICdwcmlvcml0eScpIHtcclxuICAgICAgbGlzdC5zb3J0KChhLCBiKSA9PiAoYi5wcmlvcml0eSA/PyA1MCkgLSAoYS5wcmlvcml0eSA/PyA1MCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU29ydCBieSBkaXNwbGF5IHN0YXR1cyB1c2luZyBhIGZpeGVkIHVyZ2VuY3kgb3JkZXJcclxuICAgICAgbGlzdC5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2EgPSBTVEFUVVNfU09SVF9PUkRFUltnZXREaXNwbGF5U3RhdHVzKGEpXSA/PyA5OTtcclxuICAgICAgICBjb25zdCBzYiA9IFNUQVRVU19TT1JUX09SREVSW2dldERpc3BsYXlTdGF0dXMoYildID8/IDk5O1xyXG4gICAgICAgIHJldHVybiBzYSAhPT0gc2IgPyBzYSAtIHNiIDogKGIucHJpb3JpdHkgPz8gNTApIC0gKGEucHJpb3JpdHkgPz8gNTApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0O1xyXG4gIH0sIFt1bmFsbG9jYXRlZCwgcXVldWVTb3J0LCBxdWV1ZUZpbHRlcl0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQmFyIGhlaWdodCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBCQVJfSEVJR0hUID0gNzI7XHJcbiAgY29uc3QgTEFORV9IRUlHSFQgPSA4NDtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFJlbmRlciBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICBkaXNwbGF5OiAnZmxleCcsIGhlaWdodDogJzEwMCUnLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMsXHJcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJywgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSwgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICB9fT5cclxuICAgICAgPHN0eWxlPntgQGtleWZyYW1lcyBjY2wtc3BpbiB7IHRvIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfSB9YH08L3N0eWxlPlxyXG4gICAgICB7aXNMb2NrZWQgJiYgKFxyXG4gICAgICAgIDxTYXZlT3ZlcmxheVxyXG4gICAgICAgICAgaXNFcnJvcj17c2F2ZUVycm9yfVxyXG4gICAgICAgICAgdGhlbWU9e3RoZW1lfVxyXG4gICAgICAgICAgb25SZXRyeT17aGFuZGxlUmV0cnl9XHJcbiAgICAgICAgICBvbkRpc2NhcmQ9e2hhbmRsZURpc2NhcmR9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgICAgey8qIFx1MjU1MFx1MjU1MFx1MjU1MCBRdWV1ZSBTaWRlYmFyIFx1MjU1MFx1MjU1MFx1MjU1MCAqL31cclxuICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogMzIwLCBtaW5XaWR0aDogMzIwLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMsIGJvcmRlclJpZ2h0OiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAxNnB4JywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJhY2tncm91bmQ6IHRoZW1lLnN1cmZhY2UgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIG1hcmdpbkJvdHRvbTogNCB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDggfX0+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogOCwgaGVpZ2h0OiA4LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiB1bmFsbG9jYXRlZC5sZW5ndGggPiAwID8gJyNGNTlFMEInIDogJyMxMEI5ODEnIH19IC8+XHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMywgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnMC4wOGVtJywgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsIGNvbG9yOiB0aGVtZS50ZXh0VGVydGlhcnkgfX0+UXVldWU8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAyLCBiYWNrZ3JvdW5kOiB0aGVtZS5iZ1N1YnRsZSwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsIHBhZGRpbmc6IDIsIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gIH19PlxyXG4gICAgICAgICAgICAgIHsoW1snYXonLCAnQVx1MjE5MlonXSwgWydwcmlvcml0eScsICdQcmlvcml0eSddLCBbJ3N0YXR1cycsICdTdGF0dXMnXV0gYXMgY29uc3QpLm1hcCgoW3ZhbCwgbGFiZWxdKSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIGtleT17dmFsfVxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRRdWV1ZVNvcnQodmFsKX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgcGFkZGluZzogJzNweCA4cHgnLCBmb250U2l6ZTogOSwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c1NtLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLCBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBxdWV1ZVNvcnQgPT09IHZhbCA/IHRoZW1lLmFjY2VudCA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHF1ZXVlU29ydCA9PT0gdmFsID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0TXV0ZWQsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+e2xhYmVsfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJywgbWFyZ2luVG9wOiA2IH19PlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgdmFsdWU9e3F1ZXVlRmlsdGVyfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UXVldWVGaWx0ZXIoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRmlsdGVyIHRlc3RzLi4uXCJcclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHdpZHRoOiAnMTAwJScsIGJveFNpemluZzogJ2JvcmRlci1ib3gnLCBwYWRkaW5nOiAnNXB4IDI4cHggNXB4IDhweCcsIGZvbnRTaXplOiAxMSxcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cywgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LCBvdXRsaW5lOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBvbkZvY3VzPXsoZSkgPT4geyBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYm9yZGVyQ29sb3IgPSB0aGVtZS5hY2NlbnQ7IGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gdGhlbWUuc3VyZmFjZTsgfX1cclxuICAgICAgICAgICAgICBvbkJsdXI9eyhlKSA9PiB7IGUuY3VycmVudFRhcmdldC5zdHlsZS5ib3JkZXJDb2xvciA9IHRoZW1lLmJvcmRlcjsgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSB0aGVtZS5jYW52YXM7IH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIHtxdWV1ZUZpbHRlciAmJiAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UXVldWVGaWx0ZXIoJycpfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHJpZ2h0OiA2LCB0b3A6ICc1MCUnLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJyxcclxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLCBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsIGNvbG9yOiB0aGVtZS50ZXh0RGlzYWJsZWQsXHJcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxNCwgbGluZUhlaWdodDogMSwgcGFkZGluZzogMCxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPiZ0aW1lczs8L2J1dHRvbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBzdHlsZT17eyBmbGV4OiAxLCBvdmVyZmxvd1k6ICdhdXRvJywgcGFkZGluZzogJzhweCAxMHB4JyB9fVxyXG4gICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCkgc2V0UXVldWVJbnNlcnRJbmRleCh1bmFsbG9jYXRlZC5sZW5ndGgpOyB9fVxyXG4gICAgICAgICAgb25EcmFnTGVhdmU9eyhlKSA9PiB7IGlmIChlLmN1cnJlbnRUYXJnZXQgPT09IGUudGFyZ2V0KSBzZXRRdWV1ZUluc2VydEluZGV4KG51bGwpOyB9fVxyXG4gICAgICAgICAgb25Ecm9wPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGRyb3BPblF1ZXVlKHF1ZXVlSW5zZXJ0SW5kZXggPz8gdW5hbGxvY2F0ZWQubGVuZ3RoKTsgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7c29ydGVkVW5hbGxvY2F0ZWQubWFwKCh0ZXN0LCBpZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gZ2V0RGlzcGxheVN0YXR1cyh0ZXN0LCBudWxsKTtcclxuICAgICAgICAgICAgY29uc3Qgc2hvd1N1YiA9ICFpc1RlbXBsYXRlRW1wdHkoc3ViVGV4dCwgdGVzdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkTWFpbiA9IHJlc29sdmVUZW1wbGF0ZShtYWluVGV4dCwgdGVzdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkU3ViID0gcmVzb2x2ZVRlbXBsYXRlKHN1YlRleHQsIHRlc3QpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZEluZm8gPSByZXNvbHZlVGVtcGxhdGUoaW5mb1JvdywgdGVzdCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXt0ZXN0LmlkfT5cclxuICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBzZXRRdWV1ZUluc2VydEluZGV4KGlkeCk7IH19XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBkcm9wT25RdWV1ZShpZHgpOyB9fVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogcXVldWVJbnNlcnRJbmRleCA9PT0gaWR4ICYmIGRyYWdnZWRUZXN0SWQgJiYgZHJhZ2dlZFRlc3RJZCAhPT0gdGVzdC5pZCA/IDYgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2hlaWdodCAwLjEycyBlYXNlJyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8UXVldWVDYXJkXHJcbiAgICAgICAgICAgICAgICAgIHRlc3Q9e3Rlc3R9XHJcbiAgICAgICAgICAgICAgICAgIGRyYWdnZWRUZXN0SWQ9e2RyYWdnZWRUZXN0SWR9XHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgICAgICAgICAgICBtYWluVGV4dD17cmVzb2x2ZWRNYWlufVxyXG4gICAgICAgICAgICAgICAgICBzdWJUZXh0PXtyZXNvbHZlZFN1Yn1cclxuICAgICAgICAgICAgICAgICAgaW5mb1Jvdz17cmVzb2x2ZWRJbmZvfVxyXG4gICAgICAgICAgICAgICAgICBzaG93U3ViPXtzaG93U3VifVxyXG4gICAgICAgICAgICAgICAgICB0aGVtZT17dGhlbWV9XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoKSA9PiBzZXREcmFnZ2VkVGVzdElkKHRlc3QuaWQpfVxyXG4gICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9e2NsZWFyRHJhZ31cclxuICAgICAgICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBjb25zdCByZWN0ID0gZS5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOyBzZXRRdWV1ZUluc2VydEluZGV4KGUuY2xpZW50WSA8IHJlY3QudG9wICsgcmVjdC5oZWlnaHQgLyAyID8gaWR4IDogaWR4ICsgMSk7IH19XHJcbiAgICAgICAgICAgICAgICAgIG9uTWVudU9wZW49eyhyZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRyYWdnZWRUZXN0SWQgfHwgaXNMb2NrZWQpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICBzZXRQcmlvcml0eUlucHV0VmFsdWUoU3RyaW5nKHRlc3QucHJpb3JpdHkgPz8gNTApKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRQb3BvdmVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgIGFuY2hvclJlY3Q6IHJlY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0ZXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgbW9kZTogJ3Jvb3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVN0YXR1czogc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcExpbmVzOiByZXNvbHZlVGVtcGxhdGUodGlwVGVtcGxhdGUsIHRlc3QpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IHNldFF1ZXVlSW5zZXJ0SW5kZXgodW5hbGxvY2F0ZWQubGVuZ3RoKTsgfX1cclxuICAgICAgICAgICAgb25Ecm9wPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGRyb3BPblF1ZXVlKHVuYWxsb2NhdGVkLmxlbmd0aCk7IH19XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgaGVpZ2h0OiAocXVldWVJbnNlcnRJbmRleCA9PT0gdW5hbGxvY2F0ZWQubGVuZ3RoICYmIGRyYWdnZWRUZXN0SWQpID8gNiA6IDAsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LFxyXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogMyxcclxuICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuMTJzIGVhc2UnLFxyXG4gICAgICAgICAgICAgIG1hcmdpbjogJzAgNHB4JyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICB7dW5hbGxvY2F0ZWQubGVuZ3RoID09PSAwICYmIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsIHBhZGRpbmc6ICczMnB4IDE2cHgnLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250U2l6ZTogMTIsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiBkcmFnZ2VkVGVzdElkID8gYDJweCBkYXNoZWQgJHt0aGVtZS5hY2NlbnR9YCA6IGAycHggZGFzaGVkICR7dGhlbWUuYm9yZGVyU3Ryb25nfWAsXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZywgbWFyZ2luVG9wOiA4LFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IGRyYWdnZWRUZXN0SWQgPyB0aGVtZS5hY2NlbnRTdWJ0bGUgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLFxyXG4gICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICB7ZHJhZ2dlZFRlc3RJZCA/ICdEcm9wIHRvIHJldHVybiB0byBxdWV1ZScgOiAnQWxsIHRlc3RzIGFsbG9jYXRlZCd9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPE91dGxpbmVLZXkgdGhlbWU9e3RoZW1lfSAvPlxyXG5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDE2cHgnLCBib3JkZXJUb3A6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBmb250U2l6ZTogMTAsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQgfX0+XHJcbiAgICAgICAgICAgIDxzcGFuPnt0b3RhbEFsbG9jYXRlZH0ve3RvdGFsQWxsb2NhdGVkICsgdW5hbGxvY2F0ZWQubGVuZ3RofSBhbGxvY2F0ZWQ8L3NwYW4+PHNwYW4+e3RvdGFsSG91cnN9aDwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHsvKiBcdTI1NTBcdTI1NTBcdTI1NTAgTWFpbiBUaW1lbGluZSBcdTI1NTBcdTI1NTBcdTI1NTAgKi99XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxyXG4gICAgICAgIHsvKiBIZWFkZXIgYmFyICovfVxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEycHggMjRweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBnYXA6IDE2LCBmbGV4V3JhcDogJ3dyYXAnIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtaW5XaWR0aDogMCB9fT5cclxuICAgICAgICAgICAgPGgxIHN0eWxlPXt7IGZvbnRTaXplOiAxOCwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksIGxldHRlclNwYWNpbmc6ICctMC4wMmVtJywgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSB9fT5UZXN0IFN0YW5kIFNjaGVkdWxlcjwvaDE+XHJcbiAgICAgICAgICAgIDxwIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTEsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIG1hcmdpblRvcDogMiB9fT5cclxuICAgICAgICAgICAgICBDb250aW51b3VzIHRlc3RpbmcgXHUwMEI3IHtjaEhvdXJzfWggY2hhbmdlb3ZlciAoZGVmYXVsdCkgXHUwMEI3IHt3U3RhcnR9OjAwXHUyMDEze3dFbmR9OjAwIE1vblx1MjAxM0ZyaVxyXG4gICAgICAgICAgICAgIHsoc2F2ZU1vZGUgYXMgc3RyaW5nKSA9PT0gJ2xpdmUnICYmIDxzcGFuPiBcdTAwQjcgTGl2ZSBzeW5jPC9zcGFuPn1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDEyIH19PlxyXG4gICAgICAgICAgICB7LyogU2F2ZS9EaXNjYXJkIGJ1dHRvbnMgKGJhdGNoIG1vZGUpICovfVxyXG4gICAgICAgICAgICB7KHNhdmVNb2RlIGFzIHN0cmluZykgPT09ICdiYXRjaCcgJiYgKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYgfX0+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURpc2NhcmR9XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNEaXJ0eSB8fCBpc0xvY2tlZH1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLCBwYWRkaW5nOiAnNnB4IDAnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7aXNEaXJ0eSAmJiAhaXNMb2NrZWQgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS5ib3JkZXJ9YCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyAncG9pbnRlcicgOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IHRoZW1lLmFjY2VudCA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyB0aGVtZS5hY2NlbnRGZyA6IHRoZW1lLnRleHREaXNhYmxlZCxcclxuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyBgMCAxcHggM3B4ICR7dGhlbWUuYWNjZW50fTREYCA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgRGlzY2FyZCBDaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2F2ZX1cclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0RpcnR5IHx8IGlzTG9ja2VkfVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsIHBhZGRpbmc6ICc2cHggMCcsIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHtpc0RpcnR5ICYmICFpc0xvY2tlZCA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLmJvcmRlcn1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/ICdwb2ludGVyJyA6ICdkZWZhdWx0JyxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gdGhlbWUuYWNjZW50IDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dERpc2FibGVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IGAwIDFweCAzcHggJHt0aGVtZS5hY2NlbnR9NERgIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICBTYXZlIENoYW5nZXNcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgey8qIFZpZXdwb3J0IHNlbGVjdG9yICovfVxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA0LCBiYWNrZ3JvdW5kOiB0aGVtZS5iZ1N1YnRsZSwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZywgcGFkZGluZzogMywgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgfX0+XHJcbiAgICAgICAgICAgICAge1syLCA0LCA4LCAxMiwgMjRdLm1hcCgodykgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3d9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdXNlckNoYW5nZWRWaWV3cG9ydC5jdXJyZW50ID0gdHJ1ZTsgc2V0Vmlld3BvcnRXZWVrcyh3KTsgfX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEycHgnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHZpZXdwb3J0V2Vla3MgPT09IHcgPyB0aGVtZS5hY2NlbnQgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB2aWV3cG9ydFdlZWtzID09PSB3ID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0VGVydGlhcnksXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHt3fVdcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7LyogVGltZWxpbmUgc2Nyb2xsIGFyZWEgKi99XHJcbiAgICAgICAgPGRpdiByZWY9e3Njcm9sbFJlZn0gc3R5bGU9e3sgZmxleDogMSwgb3ZlcmZsb3c6ICdhdXRvJywgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBtaW5XaWR0aDogdG90YWxXaWR0aCwgcGFkZGluZzogJzAgMTJweCAyNHB4JywgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XHJcbiAgICAgICAgICAgIHsvKiBUaW1lbGluZSBoZWFkZXIgKi99XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdzdGlja3knLCB0b3A6IDAsIHpJbmRleDogMjAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgfX0+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGhlaWdodDogMjgsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gIH19PlxyXG4gICAgICAgICAgICAgICAge2RheXMubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTW9uZGF5ID0gZC5nZXREYXkoKSA9PT0gMTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCB3aWR0aDogZGF5V2lkdGgsIG1pbldpZHRoOiBkYXlXaWR0aCwgaGVpZ2h0OiAyOCxcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRUZXJ0aWFyeSxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHtpc01vbmRheSAmJiBpID4gMCA/IHRoZW1lLmJvcmRlciA6ICd0cmFuc3BhcmVudCd9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBpc01vbmRheSA/IDcgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICd2aXNpYmxlJywgd2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7aXNNb25kYXkgPyBmb3JtYXRXZWVrKGQpIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgaGVpZ2h0OiAyNCB9fT5cclxuICAgICAgICAgICAgICAgIHtkYXlzLm1hcCgoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1RvZGF5ID0gZC50b0RhdGVTdHJpbmcoKSA9PT0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNXZWVrZW5kID0gZC5nZXREYXkoKSA9PT0gMCB8fCBkLmdldERheSgpID09PSA2O1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHdpZHRoOiBkYXlXaWR0aCwgbWluV2lkdGg6IGRheVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDksIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogaXNUb2RheSA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLnRleHRNdXRlZCxcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGlzVG9kYXkgPyA3MDAgOiA0MDAsIGxpbmVIZWlnaHQ6ICcyNHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGlzVG9kYXkgPyB0aGVtZS5hY2NlbnRTdWJ0bGUgOiAoaXNXZWVrZW5kID8gdGhlbWUuYmdTdWJ0bGUgOiAndHJhbnNwYXJlbnQnKSxcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIHt2aWV3cG9ydFdlZWtzIDw9IDggPyBkLmdldERhdGUoKSA6IChkLmdldERheSgpID09PSAxID8gZC5nZXREYXRlKCkgOiAnJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICB7LyogXHUyNTUwXHUyNTUwXHUyNTUwIFRlc3QgU3RhbmQgTGFuZXMgXHUyNTUwXHUyNTUwXHUyNTUwICovfVxyXG4gICAgICAgICAgICB7c3RhbmRzLm1hcCgoc3RhbmQpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBzY2hlZHVsZSA9IHN0YW5kU2NoZWR1bGVzLmdldChzdGFuZC5pZCkgPz8gW107XHJcbiAgICAgICAgICAgICAgY29uc3QgaW5kID0gaW5zZXJ0SW5kaWNhdG9yO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNob3dIZXJlID0gaW5kICYmIGluZC5zdGFuZElkID09PSBzdGFuZC5pZDtcclxuXHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtzdGFuZC5pZH0gc3R5bGU9e3sgbWFyZ2luVG9wOiAxNiB9fT5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDgsIG1hcmdpbkJvdHRvbTogNiwgcGFkZGluZ0xlZnQ6IDIgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNiwgaGVpZ2h0OiA2LCBib3JkZXJSYWRpdXM6IDIsIGJhY2tncm91bmQ6IHN0YW5kLnRlc3RzLmxlbmd0aCA+IDAgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS50ZXh0RGlzYWJsZWQgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5IH19PntzdGFuZC5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDEwLCBjb2xvcjogdGhlbWUudGV4dE11dGVkIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAge3N0YW5kLnRlc3RzLmxlbmd0aH0gdGVzdHtzdGFuZC50ZXN0cy5sZW5ndGggIT09IDEgPyAncycgOiAnJ317c3RhbmQudGVzdHMubGVuZ3RoID4gMCAmJiBgIFxcdTAwYjcgJHtzdGFuZC50ZXN0cy5yZWR1Y2UoKGEsIHQpID0+IGEgKyB0LmR1cmF0aW9uLCAwKX1oYH1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgc2V0SW5zZXJ0SW5kaWNhdG9yKHsgc3RhbmRJZDogc3RhbmQuaWQsIGluZGV4OiBzdGFuZC50ZXN0cy5sZW5ndGggfSk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgb25EcmFnTGVhdmU9eyhlKSA9PiB7IGlmICghZS5jdXJyZW50VGFyZ2V0LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCBhcyBOb2RlKSkgc2V0SW5zZXJ0SW5kaWNhdG9yKG51bGwpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIFJ1bm5pbmcgdGVzdHMgYWx3YXlzIGFwcGVuZCB0byBlbmQgKHBvc2l0aW9uIGlzIGdvdmVybmVkIGJ5IHRlc3Rfc3RhcnRlZF9kYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGRyYWdnZWRJc1J1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIHN0YW5kLnRlc3RzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wT25TdGFuZChzdGFuZC5pZCwgaW5kPy5zdGFuZElkID09PSBzdGFuZC5pZCA/IGluZC5pbmRleCA6IHN0YW5kLnRlc3RzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IExBTkVfSEVJR0hULFxyXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gc2hvd0hlcmUgfHwgKGRyYWdnZWRUZXN0SWQgJiYgc3RhbmQudGVzdHMubGVuZ3RoID09PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHJldHVybiB0aGVtZS5zdXJmYWNlU2Vjb25kYXJ5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJhZ2dlZElzUnVubmluZyA/IHRoZW1lLnJ1bm5pbmdCZyA6IHRoZW1lLmFjY2VudFN1YnRsZTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHsoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBzaG93SGVyZSB8fCAoZHJhZ2dlZFRlc3RJZCAmJiBzdGFuZC50ZXN0cy5sZW5ndGggPT09IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZSkgcmV0dXJuIHRoZW1lLmJvcmRlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyYWdnZWRJc1J1bm5pbmcgPyB0aGVtZS5ydW5uaW5nQm9yZGVyIDogdGhlbWUuYWNjZW50TXV0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSgpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRvdGFsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnYmFja2dyb3VuZCAwLjE1cyBlYXNlLCBib3JkZXItY29sb3IgMC4xNXMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBXZWVrZW5kIHNoYWRpbmcgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge2RheXMubWFwKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZC5nZXREYXkoKSAhPT0gMCAmJiBkLmdldERheSgpICE9PSA2KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtgd2UtJHtpfWB9IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGkgKiBkYXlXaWR0aCwgdG9wOiAwLCBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGRheVdpZHRoLCBiYWNrZ3JvdW5kOiB0aGVtZS5ib3JkZXIsIG9wYWNpdHk6IDAuMzUsIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBEYXkgZ3JpZCAqL31cclxuICAgICAgICAgICAgICAgICAgICB7ZGF5cy5tYXAoKF8sIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogaSAqIGRheVdpZHRoLCB0b3A6IDAsIGJvdHRvbTogMCwgd2lkdGg6IDEsIGJhY2tncm91bmQ6IHRoZW1lLmJvcmRlciB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogTm93IGxpbmUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoID0gaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaCA8IDAgfHwgaCA+IHRvdGFsRGF5cyAqIDI0KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGggKiBweFBlckhvdXIsIHRvcDogMCwgYm90dG9tOiAwLCB3aWR0aDogMiwgYmFja2dyb3VuZDogJyNFRjQ0NDQnLCB6SW5kZXg6IDQwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTMsIGxlZnQ6IC0zLCB3aWR0aDogOCwgaGVpZ2h0OiA4LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiAnI0VGNDQ0NCcgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBOb24td29ya2luZyBibG9ja3MgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3N0YW5kLm5vbldvcmtpbmdCbG9ja3MubWFwKChibG9jaywgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVmdCA9IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIGJsb2NrLnN0YXJ0KSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gaG91cnNCZXR3ZWVuKGJsb2NrLnN0YXJ0LCBibG9jay5lbmQpICogcHhQZXJIb3VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgKyB3aWR0aCA8IDAgfHwgbGVmdCA+IHRvdGFsV2lkdGgpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhbXBlZExlZnQgPSBNYXRoLm1heCgwLCBsZWZ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRXaWR0aCA9IE1hdGgubWluKHdpZHRoICsgTWF0aC5taW4oMCwgbGVmdCksIHRvdGFsV2lkdGggLSBjbGFtcGVkTGVmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YG53LSR7aX1gfSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBjbGFtcGVkTGVmdCwgdG9wOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjbGFtcGVkV2lkdGgsIGhlaWdodDogQkFSX0hFSUdIVCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDYsIHBvaW50ZXJFdmVudHM6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBgcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCg0NWRlZywgJHt0aGVtZS5ib3JkZXJ9IDBweCwgJHt0aGVtZS5ib3JkZXJ9IDE1cHgsICR7dGhlbWUuc3VyZmFjZX0gMTVweCwgJHt0aGVtZS5zdXJmYWNlfSAzMHB4KWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZywgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyU3Ryb25nfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAncm93Jywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA1LCBtaW5XaWR0aDogNSwgYmFja2dyb3VuZDogdGhlbWUudGV4dERpc2FibGVkLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBwYWRkaW5nOiAnNHB4IDhweCcsIG1pbldpZHRoOiAwLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgbWF4V2lkdGg6ICcxMDAlJywgbGluZUhlaWdodDogMS4yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+e2Jsb2NrLm5vdGVzIHx8ICdNYWludGVuYW5jZSd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBUZXN0IGJhcnMgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3NjaGVkdWxlLm1hcCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1Rlc3RSdW5uaW5nID0gaXNSdW5uaW5nVGVzdCh0ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhclBvcyA9IGlzVGVzdFJ1bm5pbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBnZXRSdW5uaW5nQmFyUG9zKHRlc3Quc3RhcnQsIHRlc3QuZW5kKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGdldEJhclBvcyh0ZXN0LnN0YXJ0LCB0ZXN0LmR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIFJ1bm5pbmcgdGVzdHMgdGhhdCBlbmRlZCBiZWZvcmUgdGhlIHRpbWVsaW5lIHN0YXJ0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCFiYXJQb3MpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgd2lkdGggfSA9IGJhclBvcztcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKHRlc3QuZW5kLCBzdGFuZC5jaGFuZ2VvdmVyX2hvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlb3ZlcldpZHRoID0gaG91cnNCZXR3ZWVuKHRlc3QuZW5kLCBjRW5kKSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlTdGF0dXMgPSBnZXREaXNwbGF5U3RhdHVzKHRlc3QsIHRlc3Quc3RhcnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkTWFpbiA9IHJlc29sdmVUZW1wbGF0ZShtYWluVGV4dCwgdGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZEluZm8gPSByZXNvbHZlVGVtcGxhdGUoaW5mb1JvdywgdGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaG93SW5mb09uQmFyID0gcmVzb2x2ZWRJbmZvLnRyaW0oKSAhPT0gJycgJiYgd2lkdGggPiAxMjA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3Rlc3QuaWR9IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0LCB0b3A6IDAsIHdpZHRoOiB3aWR0aCArIGNoYW5nZW92ZXJXaWR0aCwgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIERyb3Agem9uZXMgXHUyMDE0IHN1cHByZXNzZWQgd2hlbiBkcmFnZ2luZyBhIFJ1bm5pbmcgdGVzdCAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZHJhZ2dlZFRlc3RJZCAmJiBkcmFnZ2VkVGVzdElkICE9PSB0ZXN0LmlkICYmICFkcmFnZ2VkSXNSdW5uaW5nICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldEluc2VydEluZGljYXRvcih7IHN0YW5kSWQ6IHN0YW5kLmlkLCBpbmRleDogaWR4IH0pOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBkcm9wT25TdGFuZChzdGFuZC5pZCwgaWR4KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogLTYsIHRvcDogMCwgd2lkdGg6ICc1MCUnLCBoZWlnaHQ6ICcxMDAlJywgekluZGV4OiAyMCwgbWluV2lkdGg6IDIwIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IHNldEluc2VydEluZGljYXRvcih7IHN0YW5kSWQ6IHN0YW5kLmlkLCBpbmRleDogaWR4ICsgMSB9KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIGlkeCArIDEpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCByaWdodDogLTYsIHRvcDogMCwgd2lkdGg6ICc1MCUnLCBoZWlnaHQ6ICcxMDAlJywgekluZGV4OiAyMCwgbWluV2lkdGg6IDIwIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogSW5zZXJ0IGluZGljYXRvciBiZWZvcmUgdGhpcyB0ZXN0IFx1MjAxNCBzdXBwcmVzc2VkIGZvciBSdW5uaW5nIGRyYWdzICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93SGVyZSAmJiAhZHJhZ2dlZElzUnVubmluZyAmJiBpbmQhLmluZGV4ID09PSBpZHggJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogLTQsIHRvcDogMCwgYm90dG9tOiAwIH19PjxJbnNlcnRMaW5lIHRoZW1lPXt0aGVtZX0gLz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogVGVzdCBiYXIgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiAwLCB3aWR0aCwgaGVpZ2h0OiAnMTAwJScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGVzdEJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0PXt0ZXN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Rlc3RSdW5uaW5nPXtpc1Rlc3RSdW5uaW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFnZ2VkVGVzdElkPXtkcmFnZ2VkVGVzdElkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD17d2lkdGh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJBUl9IRUlHSFQ9e0JBUl9IRUlHSFR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlTdGF0dXM9e2Rpc3BsYXlTdGF0dXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVkTWFpbj17cmVzb2x2ZWRNYWlufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZEluZm89e3Jlc29sdmVkSW5mb31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0luZm9PbkJhcj17c2hvd0luZm9PbkJhcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17KGUpID0+IHsgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJzsgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIFN0cmluZyh0ZXN0LmlkKSk7IHNldERyYWdnZWRUZXN0SWQodGVzdC5pZCk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJhZ0VuZD17Y2xlYXJEcmFnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1lbnVPcGVuPXsocmVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkcmFnZ2VkVGVzdElkIHx8IGlzTG9ja2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UHJpb3JpdHlJbnB1dFZhbHVlKFN0cmluZyh0ZXN0LnByaW9yaXR5ID8/IDUwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UG9wb3Zlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmNob3JSZWN0OiByZWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6ICdyb290JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlTdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwTGluZXM6IHJlc29sdmVUZW1wbGF0ZSh0aXBUZW1wbGF0ZSwgdGVzdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWQ6IGlzVGVzdFJ1bm5pbmcgPyBudWxsIDogeyBzdGFydDogdGVzdC5zdGFydCwgZW5kOiB0ZXN0LmVuZCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIENoYW5nZW92ZXIgaW5kaWNhdG9yICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpZHggPCBzY2hlZHVsZS5sZW5ndGggJiYgY2hhbmdlb3ZlcldpZHRoID4gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiB3aWR0aCwgdG9wOiBMQU5FX0hFSUdIVCAvIDIgLSA4LCB3aWR0aDogY2hhbmdlb3ZlcldpZHRoLCBoZWlnaHQ6IDE2LCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiAxLCB3aWR0aDogJzgwJScsIGJhY2tncm91bmQ6IGByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDkwZGVnLCAke3RoZW1lLnRleHREaXNhYmxlZH0gMCwgJHt0aGVtZS50ZXh0RGlzYWJsZWR9IDRweCwgdHJhbnNwYXJlbnQgNHB4LCB0cmFuc3BhcmVudCA4cHgpYCB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogSW5zZXJ0IGluZGljYXRvciBhdCBlbmQgXHUyMDE0IHN1cHByZXNzZWQgd2hlbiBkcmFnZ2luZyBhIFJ1bm5pbmcgdGVzdCAqL31cclxuICAgICAgICAgICAgICAgICAgICB7c2hvd0hlcmUgJiYgIWRyYWdnZWRJc1J1bm5pbmcgJiYgaW5kIS5pbmRleCA9PT0gc3RhbmQudGVzdHMubGVuZ3RoICYmIHNjaGVkdWxlLmxlbmd0aCA+IDAgJiYgKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3QgPSBzY2hlZHVsZVtzY2hlZHVsZS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgd2lkdGggfSA9IGdldEJhclBvcyhsYXN0LnN0YXJ0LCBsYXN0LmR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKGxhc3QuZW5kLCBzdGFuZC5jaGFuZ2VvdmVyX2hvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlb3ZlcldpZHRoID0gaG91cnNCZXR3ZWVuKGxhc3QuZW5kLCBjRW5kKSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBsZWZ0ICsgd2lkdGggKyBjaGFuZ2VvdmVyV2lkdGggKyA4LCB0b3A6IDAsIGJvdHRvbTogMCB9fT48SW5zZXJ0TGluZSB0aGVtZT17dGhlbWV9IC8+PC9kaXY+O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBFbXB0eSBzdGF0ZSAqL31cclxuICAgICAgICAgICAgICAgICAgICB7c3RhbmQudGVzdHMubGVuZ3RoID09PSAwICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBpbnNldDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBkcmFnZ2VkVGVzdElkID8gdGhlbWUuYWNjZW50IDogdGhlbWUudGV4dERpc2FibGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiBkcmFnZ2VkVGVzdElkID8gNjAwIDogNDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkcmFnZ2VkVGVzdElkID8gJ0Ryb3AgaGVyZSB0byBzY2hlZHVsZScgOiAnRHJvcCB0ZXN0cyBoZXJlIHRvIHNjaGVkdWxlJ31cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICB7LyogTm8gc3RhbmRzIG1lc3NhZ2UgKi99XHJcbiAgICAgICAgICAgIHtzdGFuZHMubGVuZ3RoID09PSAwICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgdGV4dEFsaWduOiAnY2VudGVyJywgcGFkZGluZzogJzQ4cHggMjRweCcsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250U2l6ZTogMTIsXHJcbiAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICBObyB0ZXN0IHN0YW5kcyBsb2FkZWQuIEJpbmQgdGhlIHRlc3RTdGFuZHMgcHJvcGVydHkgdG8geW91ciBnZXRUZXN0U3RhbmRzIHF1ZXJ5LlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge3BvcG92ZXIgJiYgKFxyXG4gICAgICAgIDxBY3Rpb25Qb3BvdmVyXHJcbiAgICAgICAgICBwb3BvdmVyPXtwb3BvdmVyfVxyXG4gICAgICAgICAgc3RhdHVzT3B0aW9uc0xpc3Q9e3N0YXR1c09wdGlvbnNMaXN0fVxyXG4gICAgICAgICAgcHJpb3JpdHlJbnB1dFZhbHVlPXtwcmlvcml0eUlucHV0VmFsdWV9XHJcbiAgICAgICAgICBzdGFydERhdGVJbnB1dFZhbHVlPXtzdGFydERhdGVJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgZW5kRGF0ZUlucHV0VmFsdWU9e2VuZERhdGVJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgdGhlbWU9e3RoZW1lfVxyXG4gICAgICAgICAgb25DbG9zZT17Y2xvc2VQb3BvdmVyfVxyXG4gICAgICAgICAgb25Nb2RlQ2hhbmdlPXtoYW5kbGVQb3BvdmVyTW9kZUNoYW5nZX1cclxuICAgICAgICAgIG9uUHJpb3JpdHlJbnB1dENoYW5nZT17c2V0UHJpb3JpdHlJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgb25Db25maXJtUHJpb3JpdHk9e2hhbmRsZUNvbmZpcm1Qcmlvcml0eX1cclxuICAgICAgICAgIG9uUGlja1N0YXR1cz17aGFuZGxlUGlja1N0YXR1c31cclxuICAgICAgICAgIG9uRWRpdFRlc3Q9e2hhbmRsZUVkaXRUZXN0fVxyXG4gICAgICAgICAgb25TdGFydERhdGVJbnB1dENoYW5nZT17c2V0U3RhcnREYXRlSW5wdXRWYWx1ZX1cclxuICAgICAgICAgIG9uQ29uZmlybVN0YXJ0RGF0ZT17aGFuZGxlQ29uZmlybVN0YXJ0RGF0ZX1cclxuICAgICAgICAgIG9uRW5kRGF0ZUlucHV0Q2hhbmdlPXtzZXRFbmREYXRlSW5wdXRWYWx1ZX1cclxuICAgICAgICAgIG9uQ29uZmlybUVuZERhdGU9e2hhbmRsZUNvbmZpcm1FbmREYXRlfVxyXG4gICAgICAgICAgcGFuZWxSZWY9e3BvcG92ZXJSZWZ9XHJcbiAgICAgICAgLz5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcbiIsICJcbiAgICAgICAgICBleHBvcnQgY29uc3QgeyBSZXRvb2wgfSA9IHdpbmRvdy5jY2Nfc3VwcG9ydF9SZXRvb2xDdXN0b21Db21wb25lbkNvbGxlY3Rpb25zO1xuICAgICAgICAiLCAiXG4gICAgICAgICAgZXhwb3J0IGNvbnN0IHsgRnJhZ21lbnQsIGpzeHMsIGpzeCwgZGVmYXVsdCB9ID0gd2luZG93LmNjY19zdXBwb3J0X1JlYWN0SlNYUnVudGltZTtcbiAgICAgICAgIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNVLFdBQU8sVUFBVSxPQUFPO0FBQUE7QUFBQTs7O0FDRGxDLG1CQUFtRTs7O0FDQ2xELElBQU0sRUFBRSxPQUFPLElBQUksT0FBTzs7O0FDQTFCLElBQU0sRUFBRSxVQUFVLE1BQU0sS0FBSyxTQUFBQSxTQUFRLElBQUksT0FBTzs7O0FGOEhqRSxJQUFNLGFBQWEsQ0FDakIsS0FDQSxrQkFBMEMsQ0FBQyxHQUMzQyxxQkFDZ0I7QUFDaEIsUUFBTSxTQUFTLEtBQUssU0FBUztBQUU3QixRQUFNLFNBQVMs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
