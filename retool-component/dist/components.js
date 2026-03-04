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
var buildTheme = (raw, statusOverrides = {}) => {
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
    fontMono: "'JetBrains Mono', monospace",
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
        width > 40 && /* @__PURE__ */ jsx(
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
              background: hovered ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.04)",
              borderRadius: 10,
              padding: "2px 6px",
              fontSize: 12,
              color: isTestRunning ? theme.runningText : theme.textMuted,
              cursor: "pointer",
              letterSpacing: "0.1em",
              lineHeight: 1,
              opacity: hovered ? 1 : 0.35,
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
  theme,
  onClose,
  onModeChange,
  onPriorityInputChange,
  onConfirmPriority,
  onPickStatus,
  onEditTest,
  onStartDateInputChange,
  onConfirmStartDate,
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
      const r = panelRef.current.getBoundingClientRect();
      setFlippedV(r.bottom > window.innerHeight - 8);
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
          displayStatus === "Running" && /* @__PURE__ */ jsx(MenuItem, { label: "Change Start Date", icon: "\u{1F4C5}", theme, onClick: () => onModeChange("start_date") }),
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
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
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
var parseStands = (testsArr, standsArr, chHours) => {
  const standMap = /* @__PURE__ */ new Map();
  standsArr.forEach((s) => standMap.set(s.id, {
    id: s.id,
    name: s.name,
    tests: [],
    changeover_hours: s.changeover_hours ?? chHours,
    nonWorkingBlocks: parseNonWorkingBlocks(s.non_working)
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
  const [isSavingDates] = Retool.useStateBoolean({
    name: "isSavingDates",
    initialValue: false,
    inspector: "checkbox",
    label: "Is Saving Planned Dates",
    description: "Bind to: {{ savePlannedDates.isFetching }}"
  });
  const [hasSaveDatesError] = Retool.useStateBoolean({
    name: "hasSaveDatesError",
    initialValue: false,
    inspector: "checkbox",
    label: "Has Save Dates Error",
    description: "Bind to: {{ !!savePlannedDates.error }}"
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
    return buildTheme(appTheme, statusOverrides);
  }, [appTheme, colorRunning, colorReady, colorOnTime, colorDelayed, colorPartsNotAssigned, colorInProgress]);
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
  const onEditTest = Retool.useEventCallback({ name: "onEditTest" });
  const onSavePlannedDates = Retool.useEventCallback({ name: "onSavePlannedDates" });
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
  const [pendingSaveDates, setPendingSaveDates] = import_react.default.useState(false);
  const [saveDatesError, setSaveDatesError] = import_react.default.useState(false);
  const popoverRef = (0, import_react.useRef)(null);
  const isLocked = pendingSave || isSaving || saveError;
  const isDatesSaving = pendingSaveDates || isSavingDates || saveDatesError;
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
    if (isSavingDates) {
      setPendingSaveDates(false);
    }
    if (hasSaveDatesError) {
      setPendingSaveDates(false);
      setSaveDatesError(true);
    } else if (!isSavingDates) {
      setSaveDatesError(false);
    }
  }, [isSavingDates, hasSaveDatesError]);
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
    () => JSON.stringify(inputTests) + JSON.stringify(inputStands),
    [inputTests, inputStands]
  );
  (0, import_react.useEffect)(() => {
    const testsArr = Array.isArray(inputTests) ? inputTests : [];
    const standsArr = Array.isArray(inputStands) ? inputStands : [];
    if (standsArr.length === 0 && testsArr.length === 0)
      return;
    const { stands: newStands, unallocated: unalloc } = parseStands(testsArr, standsArr, chHours);
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
      const end = new Date(start.getTime() + test.duration * MS_PER_HOUR);
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
  const handleSavePlannedDates = (0, import_react.useCallback)(() => {
    setPendingSaveDates(true);
    setSaveDatesError(false);
    onSavePlannedDates();
  }, [onSavePlannedDates]);
  const handleDiscard = (0, import_react.useCallback)(() => {
    setSaveError(false);
    setPendingSave(false);
    const testsArr = Array.isArray(inputTests) ? inputTests : [];
    const standsArr = Array.isArray(inputStands) ? inputStands : [];
    const { stands: newStands, unallocated: unalloc } = parseStands(testsArr, standsArr, chHours);
    setStands(newStands);
    setUnallocated(unalloc);
    setIsDirty(false);
    setAllocations(buildAllocations(newStands));
    setHasUnsavedChanges(false);
  }, [inputTests, inputStands, chHours, setAllocations, setHasUnsavedChanges]);
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
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleSavePlannedDates,
              disabled: isDatesSaving || scheduledPlannedDates.length === 0,
              title: scheduledPlannedDates.length === 0 ? "No tests scheduled" : `Save planned start dates for ${scheduledPlannedDates.length} scheduled test${scheduledPlannedDates.length !== 1 ? "s" : ""}`,
              style: {
                fontFamily: theme.fontMono,
                width: 130,
                padding: "6px 0",
                fontSize: 11,
                fontWeight: 600,
                borderRadius: theme.radius,
                border: saveDatesError ? `1px solid #FECACA` : "1px solid transparent",
                cursor: !isDatesSaving && scheduledPlannedDates.length > 0 ? "pointer" : "default",
                background: saveDatesError ? theme.isDark ? "#3B0000" : "#FEF2F2" : theme.accent,
                color: saveDatesError ? "#EF4444" : theme.accentFg,
                opacity: !isDatesSaving && scheduledPlannedDates.length > 0 ? 1 : 0.5,
                transition: "background 0.15s, color 0.15s, border-color 0.15s"
              },
              children: saveDatesError ? "Error \u2014 Retry" : pendingSaveDates || isSavingDates ? "Saving\u2026" : "Save Planned Dates"
            }
          ),
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
          /* @__PURE__ */ jsx("div", { style: { display: "flex", height: 28, position: "relative", borderBottom: `1px solid ${theme.border}` }, children: weeks.map((wk, i) => /* @__PURE__ */ jsx("div", { style: {
            fontFamily: theme.fontMono,
            position: "absolute",
            left: hoursBetween(viewStart, wk) * pxPerHour,
            width: 7 * 24 * pxPerHour,
            height: 28,
            display: "flex",
            alignItems: "center",
            paddingLeft: 8,
            fontSize: 10,
            fontWeight: 600,
            color: theme.textTertiary,
            borderLeft: i > 0 ? `1px solid ${theme.border}` : "none"
          }, children: formatWeek(wk) }, i)) }),
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
                    return /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: h * pxPerHour, top: 0, bottom: 0, width: 2, background: "#EF4444", zIndex: 10 }, children: /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: -3, left: -3, width: 8, height: 8, borderRadius: "50%", background: "#EF4444" } }) });
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
        theme,
        onClose: closePopover,
        onModeChange: handlePopoverModeChange,
        onPriorityInputChange: setPriorityInputValue,
        onConfirmPriority: handleConfirmPriority,
        onPickStatus: handlePickStatus,
        onEditTest: handleEditTest,
        onStartDateInputChange: setStartDateInputValue,
        onConfirmStartDate: handleConfirmStartDate,
        panelRef: popoverRef
      }
    )
  ] });
};
export {
  TestStandScheduler
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhY3QtZ2xvYmFsOnJlYWN0IiwgIi4uL3NyYy9pbmRleC50c3giLCAidHJ5cmV0b29sLWN1c3RvbS1jb21wb25lbnQtY29sbGVjdGlvbnMtZ2xvYmFsOkB0cnlyZXRvb2wvY3VzdG9tLWNvbXBvbmVudC1zdXBwb3J0IiwgInJlYWN0LWpzeC1ydW50aW1lLWdsb2JhbDpyZWFjdC9qc3gtcnVudGltZSJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmVhY3Q7XG4gICAgICAgICIsICJpbXBvcnQgUmVhY3QsIHsgRkMsIHVzZVJlZiwgdXNlTWVtbywgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSZXRvb2wgfSBmcm9tIFwiQHRyeXJldG9vbC9jdXN0b20tY29tcG9uZW50LXN1cHBvcnRcIjtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUeXBlc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFRlc3REYXRhIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkdXJhdGlvbjogbnVtYmVyO1xyXG4gIG93bmVyOiBzdHJpbmc7XHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuICBub3Rlczogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpb3JpdHlfb3JkZXI6IG51bWJlciB8IG51bGw7XHJcbiAgYWxsb2NhdGlvbl9pZDogbnVtYmVyIHwgbnVsbDtcclxuICBhc3NpZ25lZF9wYXJ0czogc3RyaW5nIHwgbnVsbDtcclxuICBwYXJ0X3JlYWR5X2RhdGU6IHN0cmluZyB8IG51bGw7XHJcbiAgcGFydF9zdGF0dXM6IHN0cmluZztcclxuICB0ZXN0X3N0YXJ0ZWRfZGF0ZTogc3RyaW5nIHwgbnVsbDtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7IC8vIGFsbG93IGFyYml0cmFyeSBmaWVsZHMgZm9yIHRlbXBsYXRlIHJlc29sdXRpb25cclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YW5kRGVmIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBjaGFuZ2VvdmVyX2hvdXJzPzogbnVtYmVyIHwgbnVsbDtcclxuICBub25fd29ya2luZz86IGFueTtcclxufVxyXG5cclxuaW50ZXJmYWNlIE5vbldvcmtpbmdCbG9jayB7XHJcbiAgc3RhcnQ6IERhdGU7XHJcbiAgZW5kOiBEYXRlO1xyXG4gIG5vdGVzPzogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSW50ZXJuYWxTdGFuZCB7XHJcbiAgaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgdGVzdHM6IFRlc3REYXRhW107XHJcbiAgY2hhbmdlb3Zlcl9ob3VyczogbnVtYmVyO1xyXG4gIG5vbldvcmtpbmdCbG9ja3M6IE5vbldvcmtpbmdCbG9ja1tdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgU2NoZWR1bGVkVGVzdCBleHRlbmRzIFRlc3REYXRhIHtcclxuICBzdGFydDogRGF0ZTtcclxuICBlbmQ6IERhdGU7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnNlcnRJbmRpY2F0b3Ige1xyXG4gIHN0YW5kSWQ6IG51bWJlciB8IHN0cmluZztcclxuICBpbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQWxsb2NhdGlvblJlY29yZCB7XHJcbiAgdGVzdF9pZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBwcmlvcml0eV9vcmRlcjogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQW5jaG9yUmVjdCB7XHJcbiAgdG9wOiBudW1iZXI7XHJcbiAgYm90dG9tOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG4gIHJpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBQb3BvdmVyU3RhdGUge1xyXG4gIGFuY2hvclJlY3Q6IEFuY2hvclJlY3Q7XHJcbiAgdGVzdDogVGVzdERhdGE7XHJcbiAgbW9kZTogJ3Jvb3QnIHwgJ3ByaW9yaXR5JyB8ICdzdGF0dXMnIHwgJ3N0YXJ0X2RhdGUnO1xyXG4gIGRpc3BsYXlTdGF0dXM6IHN0cmluZztcclxuICB0b29sdGlwTGluZXM6IHN0cmluZztcclxuICBzY2hlZHVsZWQ6IHsgc3RhcnQ6IERhdGU7IGVuZDogRGF0ZSB9IHwgbnVsbDtcclxufVxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFRoZW1lXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5pbnRlcmZhY2UgVGhlbWVUb2tlbnMge1xyXG4gIGlzRGFyazogYm9vbGVhbjtcclxuXHJcbiAgLy8gQmFja2dyb3VuZHNcclxuICBjYW52YXM6IHN0cmluZztcclxuICBzdXJmYWNlOiBzdHJpbmc7XHJcbiAgc3VyZmFjZVNlY29uZGFyeTogc3RyaW5nO1xyXG4gIGJnU3VidGxlOiBzdHJpbmc7XHJcbiAgc3VyZmFjZUhvdmVyOiBzdHJpbmc7XHJcbiAgYWNjZW50U3VidGxlOiBzdHJpbmc7XHJcblxyXG4gIC8vIFJ1bm5pbmcgKHB1cnBsZSkgdGludHNcclxuICBydW5uaW5nQmc6IHN0cmluZztcclxuICBydW5uaW5nQm9yZGVyOiBzdHJpbmc7XHJcbiAgcnVubmluZ1RleHQ6IHN0cmluZztcclxuICBydW5uaW5nVGV4dERhcms6IHN0cmluZztcclxuXHJcbiAgLy8gVGV4dFxyXG4gIHRleHRQcmltYXJ5OiBzdHJpbmc7XHJcbiAgdGV4dFNlY29uZGFyeTogc3RyaW5nO1xyXG4gIHRleHRUZXJ0aWFyeTogc3RyaW5nO1xyXG4gIHRleHRNdXRlZDogc3RyaW5nO1xyXG4gIHRleHREaXNhYmxlZDogc3RyaW5nO1xyXG5cclxuICAvLyBCb3JkZXJzXHJcbiAgYm9yZGVyOiBzdHJpbmc7XHJcbiAgYm9yZGVyU3Ryb25nOiBzdHJpbmc7XHJcblxyXG4gIC8vIEFjY2VudCAocHJpbWFyeSBhY3Rpb24pXHJcbiAgYWNjZW50OiBzdHJpbmc7XHJcbiAgYWNjZW50Rmc6IHN0cmluZztcclxuICBhY2NlbnRNdXRlZDogc3RyaW5nO1xyXG5cclxuICAvLyBUeXBvZ3JhcGh5XHJcbiAgZm9udEZhbWlseTogc3RyaW5nO1xyXG4gIGZvbnRNb25vOiBzdHJpbmc7XHJcblxyXG4gIC8vIFJhZGlpIChudW1lcmljIHB4KVxyXG4gIHJhZGl1c1NtOiBudW1iZXI7XHJcbiAgcmFkaXVzOiBudW1iZXI7XHJcbiAgcmFkaXVzTGc6IG51bWJlcjtcclxuICByYWRpdXNYbDogbnVtYmVyO1xyXG5cclxuICAvLyBTdGF0dXMgY29sb3VycyAoY2FwIGJhcnMgJiB0ZXh0KVxyXG4gIHN0YXR1c0NhcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuICBzdGF0dXNUZXh0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG59XHJcblxyXG5jb25zdCBidWlsZFRoZW1lID0gKFxyXG4gIHJhdzogYW55LFxyXG4gIHN0YXR1c092ZXJyaWRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9XHJcbik6IFRoZW1lVG9rZW5zID0+IHtcclxuICBjb25zdCBpc0RhcmsgPSByYXc/Lm1vZGUgPT09ICdkYXJrJztcclxuXHJcbiAgY29uc3QgYWNjZW50ID0gcmF3Py5wcmltYXJ5IHx8ICcjM0I4MkY2JztcclxuICBjb25zdCBjYW52YXMgPSByYXc/LmNhbnZhcyB8fCAoaXNEYXJrID8gJyMxQzFDMkUnIDogJyNGOUZBRkInKTtcclxuICBjb25zdCBzdXJmYWNlID0gcmF3Py5zdXJmYWNlUHJpbWFyeSB8fCAoaXNEYXJrID8gJyMyNTI1MzUnIDogJyNGRkZGRkYnKTtcclxuICBjb25zdCBzdXJmYWNlU2Vjb25kYXJ5ID0gcmF3Py5zdXJmYWNlU2Vjb25kYXJ5IHx8IChpc0RhcmsgPyAnIzFFMUUzMCcgOiAnI0YzRjRGNicpO1xyXG4gIGNvbnN0IGZvbnRGYW1pbHkgPSByYXc/LmRlZmF1bHRGb250Py5uYW1lXHJcbiAgICA/IGAnJHtyYXcuZGVmYXVsdEZvbnQubmFtZX0nLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgc2Fucy1zZXJpZmBcclxuICAgIDogXCInRE0gU2FucycsIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZlwiO1xyXG5cclxuICBjb25zdCBiYXNlUmFkaXVzID0gKCgpID0+IHtcclxuICAgIGNvbnN0IHIgPSByYXc/LmJvcmRlclJhZGl1cztcclxuICAgIGlmICghcikgcmV0dXJuIDY7XHJcbiAgICBjb25zdCBuID0gcGFyc2VJbnQoU3RyaW5nKHIpLCAxMCk7XHJcbiAgICByZXR1cm4gaXNOYU4obikgPyA2IDogbjtcclxuICB9KSgpO1xyXG5cclxuICAvLyBUZXh0XHJcbiAgY29uc3QgdGV4dFByaW1hcnkgID0gaXNEYXJrID8gJyNGOUZBRkInIDogJyMxMTE4MjcnO1xyXG4gIGNvbnN0IHRleHRTZWNvbmRhcnkgPSBpc0RhcmsgPyAnI0QxRDVEQicgOiAnIzM3NDE1MSc7XHJcbiAgY29uc3QgdGV4dFRlcnRpYXJ5ID0gaXNEYXJrID8gJyNBMEFFQzAnIDogJyM0QjU1NjMnO1xyXG4gIGNvbnN0IHRleHRNdXRlZCAgICA9IGlzRGFyayA/ICcjNzE4MDk2JyA6ICcjNkI3MjgwJztcclxuICBjb25zdCB0ZXh0RGlzYWJsZWQgPSBpc0RhcmsgPyAnIzRCNTU2MycgOiAnIzlDQTNBRic7XHJcblxyXG4gIC8vIEJvcmRlcnNcclxuICBjb25zdCBib3JkZXIgICAgICAgPSBpc0RhcmsgPyAnIzM3NDE1MScgOiAnI0U1RTdFQic7XHJcbiAgY29uc3QgYm9yZGVyU3Ryb25nID0gaXNEYXJrID8gJyM0QjU1NjMnIDogJyNEMUQ1REInO1xyXG5cclxuICAvLyBCYWNrZ3JvdW5kc1xyXG4gIGNvbnN0IGJnU3VidGxlICAgICA9IGlzRGFyayA/ICcjMUExQTJFJyA6ICcjRjNGNEY2JztcclxuICBjb25zdCBzdXJmYWNlSG92ZXIgPSBpc0RhcmsgPyAnIzJFMkUzRScgOiAnI0YzRjRGNic7XHJcbiAgY29uc3QgYWNjZW50U3VidGxlID0gaXNEYXJrID8gYCR7YWNjZW50fTMzYCA6ICcjRUZGNkZGJztcclxuICBjb25zdCBhY2NlbnRNdXRlZCAgPSBpc0RhcmsgPyBgJHthY2NlbnR9ODBgIDogJyM5M0M1RkQnO1xyXG5cclxuICAvLyBSdW5uaW5nIHB1cnBsZVxyXG4gIGNvbnN0IHJ1bm5pbmdCZyAgICAgICA9IGlzRGFyayA/ICcjMkQxQjRFJyA6ICcjRjNFOEZGJztcclxuICBjb25zdCBydW5uaW5nQm9yZGVyICAgPSBpc0RhcmsgPyAnIzdFM0RBQScgOiAnI0M0QjVGRCc7XHJcbiAgY29uc3QgcnVubmluZ1RleHQgICAgID0gJyM3RTIyQ0UnO1xyXG4gIGNvbnN0IHJ1bm5pbmdUZXh0RGFyayA9ICcjM0IwNzY0JztcclxuXHJcbiAgLy8gU3RhdHVzIGNhcCBjb2xvdXJzXHJcbiAgY29uc3QgZGVmYXVsdENhcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICAgICdSdW5uaW5nJzogICAgICAgICAgICAnIzkzMzNFQScsXHJcbiAgICAnUmVhZHknOiAgICAgICAgICAgICAgJyMyMkM1NUUnLFxyXG4gICAgJ09uIFRpbWUnOiAgICAgICAgICAgICcjRTVBMDBEJyxcclxuICAgICdEZWxheWVkJzogICAgICAgICAgICAnI0VGNDQ0NCcsXHJcbiAgICAnUGFydHMgTm90IEFzc2lnbmVkJzogJyM5Q0EzQUYnLFxyXG4gICAgJ0luIFByb2dyZXNzJzogICAgICAgICcjRTVBMDBEJyxcclxuICB9O1xyXG4gIGNvbnN0IGRlZmF1bHRUZXh0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgJ1J1bm5pbmcnOiAgICAgICAgICAgICcjN0UyMkNFJyxcclxuICAgICdSZWFkeSc6ICAgICAgICAgICAgICAnIzE2QTM0QScsXHJcbiAgICAnT24gVGltZSc6ICAgICAgICAgICAgJyNCNDUzMDknLFxyXG4gICAgJ0RlbGF5ZWQnOiAgICAgICAgICAgICcjREMyNjI2JyxcclxuICAgICdQYXJ0cyBOb3QgQXNzaWduZWQnOiAnIzZCNzI4MCcsXHJcbiAgICAnSW4gUHJvZ3Jlc3MnOiAgICAgICAgJyNCNDUzMDknLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHN0YXR1c0NhcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gIGNvbnN0IHN0YXR1c1RleHQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcclxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhkZWZhdWx0Q2FwKSkge1xyXG4gICAgc3RhdHVzQ2FwW2tleV0gID0gc3RhdHVzT3ZlcnJpZGVzW2tleV0gfHwgZGVmYXVsdENhcFtrZXldO1xyXG4gICAgLy8gZGVyaXZlIHRleHQgY29sb3VyOiBpZiBvdmVycmlkZGVuLCBkYXJrZW4gdGhlIGNhcCBjb2xvdXIgc2xpZ2h0bHk7IG90aGVyd2lzZSB1c2UgZGVmYXVsdFxyXG4gICAgc3RhdHVzVGV4dFtrZXldID0gc3RhdHVzT3ZlcnJpZGVzW2tleV1cclxuICAgICAgPyBzdGF0dXNPdmVycmlkZXNba2V5XVxyXG4gICAgICA6IGRlZmF1bHRUZXh0W2tleV07XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXNEYXJrLFxyXG4gICAgY2FudmFzLCBzdXJmYWNlLCBzdXJmYWNlU2Vjb25kYXJ5LCBiZ1N1YnRsZSwgc3VyZmFjZUhvdmVyLCBhY2NlbnRTdWJ0bGUsXHJcbiAgICBydW5uaW5nQmcsIHJ1bm5pbmdCb3JkZXIsIHJ1bm5pbmdUZXh0LCBydW5uaW5nVGV4dERhcmssXHJcbiAgICB0ZXh0UHJpbWFyeSwgdGV4dFNlY29uZGFyeSwgdGV4dFRlcnRpYXJ5LCB0ZXh0TXV0ZWQsIHRleHREaXNhYmxlZCxcclxuICAgIGJvcmRlciwgYm9yZGVyU3Ryb25nLFxyXG4gICAgYWNjZW50LCBhY2NlbnRGZzogJyNGRkZGRkYnLCBhY2NlbnRNdXRlZCxcclxuICAgIGZvbnRGYW1pbHksXHJcbiAgICBmb250TW9ubzogXCInSmV0QnJhaW5zIE1vbm8nLCBtb25vc3BhY2VcIixcclxuICAgIHJhZGl1c1NtOiBNYXRoLm1heCgyLCBiYXNlUmFkaXVzIC0gMiksXHJcbiAgICByYWRpdXM6ICAgYmFzZVJhZGl1cyxcclxuICAgIHJhZGl1c0xnOiBiYXNlUmFkaXVzICsgMixcclxuICAgIHJhZGl1c1hsOiBiYXNlUmFkaXVzICsgNCxcclxuICAgIHN0YXR1c0NhcCxcclxuICAgIHN0YXR1c1RleHQsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUZW1wbGF0ZSBSZXNvbHV0aW9uXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBmb3JtYXRGaWVsZFZhbHVlID0gKHZhbDogYW55KTogc3RyaW5nID0+IHtcclxuICBpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbCA9PT0gJycgfHwgdmFsID09PSAnbmFuJykgcmV0dXJuICcnO1xyXG4gIGNvbnN0IHN0ciA9IFN0cmluZyh2YWwpO1xyXG4gIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9Ly50ZXN0KHN0cikpIHtcclxuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZShzdHIpO1xyXG4gICAgaWYgKCFpc05hTihkLmdldFRpbWUoKSkpIHtcclxuICAgICAgcmV0dXJuIGQudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1HQicsIHsgZGF5OiAnMi1kaWdpdCcsIG1vbnRoOiAnc2hvcnQnIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gc3RyO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVRlbXBsYXRlID0gKHRlbXBsYXRlOiBhbnksIGRhdGE6IFJlY29yZDxzdHJpbmcsIGFueT4pOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghdGVtcGxhdGUpIHJldHVybiAnJztcclxuICBjb25zdCBzdHIgPSB0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnID8gdGVtcGxhdGUgOiBTdHJpbmcodGVtcGxhdGUpO1xyXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXFx7KFxcdyspXFx9L2csIChfLCBmaWVsZCkgPT4gZm9ybWF0RmllbGRWYWx1ZShkYXRhW2ZpZWxkXSkpO1xyXG59O1xyXG5cclxuY29uc3QgaXNUZW1wbGF0ZUVtcHR5ID0gKHRlbXBsYXRlOiBhbnksIGRhdGE6IFJlY29yZDxzdHJpbmcsIGFueT4pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBzdHIgPSB0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnID8gdGVtcGxhdGUgOiBTdHJpbmcodGVtcGxhdGUgfHwgJycpO1xyXG4gIGNvbnN0IHJlc29sdmVkID0gcmVzb2x2ZVRlbXBsYXRlKHN0ciwgZGF0YSk7XHJcbiAgY29uc3Qgc3RhdGljT25seSA9IHN0ci5yZXBsYWNlKC9cXHsoXFx3KylcXH0vZywgJycpO1xyXG4gIHJldHVybiByZXNvbHZlZC50cmltKCkgPT09IHN0YXRpY09ubHkudHJpbSgpIHx8IHJlc29sdmVkLnRyaW0oKSA9PT0gJyc7XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRGF0ZSBVdGlsaXRpZXNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IE1TX1BFUl9IT1VSID0gMzYwMDAwMDtcclxuXHJcbmNvbnN0IHBhcnNlTG9jYWxEYXRlID0gKGRhdGVTdHI6IHN0cmluZyB8IG51bGwpOiBEYXRlIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFkYXRlU3RyKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBkYXRlUGFydCA9IGRhdGVTdHIuc3BsaXQoJ1QnKVswXTsgLy8gc3RyaXAgdGltZSBjb21wb25lbnQgaWYgcHJlc2VudCAoZS5nLiBJU08gdGltZXN0YW1wcylcclxuICBjb25zdCBwYXJ0cyA9IGRhdGVQYXJ0LnNwbGl0KCctJykubWFwKE51bWJlcik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMyB8fCBwYXJ0cy5zb21lKGlzTmFOKSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgZCA9IG5ldyBEYXRlKHBhcnRzWzBdLCBwYXJ0c1sxXSAtIDEsIHBhcnRzWzJdLCAwLCAwLCAwLCAwKTtcclxuICByZXR1cm4gaXNOYU4oZC5nZXRUaW1lKCkpID8gbnVsbCA6IGQ7XHJcbn07XHJcblxyXG5jb25zdCB0b01pZG5pZ2h0ID0gKGRhdGU6IERhdGUpOiBEYXRlID0+IHtcclxuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgZC5zZXRIb3VycygwLCAwLCAwLCAwKTtcclxuICByZXR1cm4gZDtcclxufTtcclxuXHJcbmNvbnN0IGlzV29ya0RheSA9IChkOiBEYXRlKTogYm9vbGVhbiA9PiBkLmdldERheSgpICE9PSAwICYmIGQuZ2V0RGF5KCkgIT09IDY7XHJcblxyXG5jb25zdCBnZXROZXh0V29ya2RheVN0YXJ0ID0gKGRhdGU6IERhdGUsIHdvcmtTdGFydDogbnVtYmVyKTogRGF0ZSA9PiB7XHJcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gIGQuc2V0SG91cnMod29ya1N0YXJ0LCAwLCAwLCAwKTtcclxuICB3aGlsZSAoZC5nZXREYXkoKSA9PT0gMCB8fCBkLmdldERheSgpID09PSA2KSB7XHJcbiAgICBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKTtcclxuICB9XHJcbiAgcmV0dXJuIGQ7XHJcbn07XHJcblxyXG5jb25zdCBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kID0gKFxyXG4gIHByZXZUZXN0RW5kOiBEYXRlLFxyXG4gIGNoYW5nZW92ZXJIb3VyczogbnVtYmVyLFxyXG4gIHdvcmtTdGFydDogbnVtYmVyLFxyXG4gIHdvcmtFbmQ6IG51bWJlclxyXG4pOiBEYXRlID0+IHtcclxuICBsZXQgY2hhbmdlb3ZlclN0YXJ0ID0gbmV3IERhdGUocHJldlRlc3RFbmQpO1xyXG5cclxuICBpZiAoIWlzV29ya0RheShjaGFuZ2VvdmVyU3RhcnQpIHx8IGNoYW5nZW92ZXJTdGFydC5nZXRIb3VycygpID49IHdvcmtFbmQpIHtcclxuICAgIGNoYW5nZW92ZXJTdGFydCA9IGdldE5leHRXb3JrZGF5U3RhcnQobmV3IERhdGUoY2hhbmdlb3ZlclN0YXJ0LmdldFRpbWUoKSArIE1TX1BFUl9IT1VSICogMTIpLCB3b3JrU3RhcnQpO1xyXG4gIH0gZWxzZSBpZiAoY2hhbmdlb3ZlclN0YXJ0LmdldEhvdXJzKCkgPCB3b3JrU3RhcnQpIHtcclxuICAgIGNoYW5nZW92ZXJTdGFydC5zZXRIb3Vycyh3b3JrU3RhcnQsIDAsIDAsIDApO1xyXG4gIH1cclxuXHJcbiAgbGV0IHJlbWFpbmluZyA9IGNoYW5nZW92ZXJIb3VycztcclxuICBsZXQgZW5kID0gbmV3IERhdGUoY2hhbmdlb3ZlclN0YXJ0KTtcclxuXHJcbiAgd2hpbGUgKHJlbWFpbmluZyA+IDApIHtcclxuICAgIGlmICghaXNXb3JrRGF5KGVuZCkpIHtcclxuICAgICAgZW5kID0gZ2V0TmV4dFdvcmtkYXlTdGFydChuZXcgRGF0ZShlbmQuZ2V0VGltZSgpICsgTVNfUEVSX0hPVVIgKiAxMiksIHdvcmtTdGFydCk7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYXZhaWxhYmxlID0gd29ya0VuZCAtIGVuZC5nZXRIb3VycygpO1xyXG4gICAgY29uc3QgYXBwbHkgPSBNYXRoLm1pbihyZW1haW5pbmcsIGF2YWlsYWJsZSk7XHJcbiAgICBlbmQuc2V0VGltZShlbmQuZ2V0VGltZSgpICsgYXBwbHkgKiBNU19QRVJfSE9VUik7XHJcbiAgICByZW1haW5pbmcgLT0gYXBwbHk7XHJcbiAgICBpZiAocmVtYWluaW5nID4gMCkge1xyXG4gICAgICBlbmQgPSBnZXROZXh0V29ya2RheVN0YXJ0KG5ldyBEYXRlKGVuZC5nZXRUaW1lKCkgKyBNU19QRVJfSE9VUiAqIDEyKSwgd29ya1N0YXJ0KTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGVuZDtcclxufTtcclxuXHJcbmNvbnN0IHBhcnNlTm9uV29ya2luZ0Jsb2NrcyA9IChyYXc6IGFueSk6IE5vbldvcmtpbmdCbG9ja1tdID0+IHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkocmF3KSkgcmV0dXJuIFtdO1xyXG4gIGNvbnN0IHJlc3VsdDogTm9uV29ya2luZ0Jsb2NrW10gPSBbXTtcclxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIHJhdykge1xyXG4gICAgaWYgKCFlbnRyeSB8fCB0eXBlb2YgZW50cnkgIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoZW50cnkuc3RhcnQpO1xyXG4gICAgY29uc3QgZW5kID0gbmV3IERhdGUoZW50cnkuZW5kKTtcclxuICAgIGlmIChpc05hTihzdGFydC5nZXRUaW1lKCkpIHx8IGlzTmFOKGVuZC5nZXRUaW1lKCkpIHx8IGVuZCA8PSBzdGFydCkgY29udGludWU7XHJcbiAgICByZXN1bHQucHVzaCh7IHN0YXJ0LCBlbmQsIG5vdGVzOiBlbnRyeS5ub3RlcyA/PyB1bmRlZmluZWQgfSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jb25zdCBhZHZhbmNlUGFzdE5vbldvcmtpbmcgPSAoZGF0ZTogRGF0ZSwgYmxvY2tzOiBOb25Xb3JraW5nQmxvY2tbXSk6IERhdGUgPT4ge1xyXG4gIGxldCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICBsZXQgY2hhbmdlZCA9IHRydWU7XHJcbiAgd2hpbGUgKGNoYW5nZWQpIHtcclxuICAgIGNoYW5nZWQgPSBmYWxzZTtcclxuICAgIGZvciAoY29uc3QgYiBvZiBibG9ja3MpIHtcclxuICAgICAgaWYgKHJlc3VsdCA+PSBiLnN0YXJ0ICYmIHJlc3VsdCA8IGIuZW5kKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gbmV3IERhdGUoYi5lbmQpO1xyXG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG4vLyBQdXNoIHN0YXJ0IGZvcndhcmQgdW50aWwgdGhlIGZ1bGwgd2luZG93IFtzdGFydCwgc3RhcnQrZHVyYXRpb24pIGRvZXNuJ3Qgb3ZlcmxhcCBhbnkgYmxvY2suXHJcbmNvbnN0IGZpbmRWYWxpZFN0YXJ0ID0gKHByb3Bvc2VkU3RhcnQ6IERhdGUsIGR1cmF0aW9uSG91cnM6IG51bWJlciwgYmxvY2tzOiBOb25Xb3JraW5nQmxvY2tbXSk6IERhdGUgPT4ge1xyXG4gIGxldCByZXN1bHQgPSBuZXcgRGF0ZShwcm9wb3NlZFN0YXJ0KTtcclxuICBsZXQgY2hhbmdlZCA9IHRydWU7XHJcbiAgd2hpbGUgKGNoYW5nZWQpIHtcclxuICAgIGNoYW5nZWQgPSBmYWxzZTtcclxuICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHJlc3VsdC5nZXRUaW1lKCkgKyBkdXJhdGlvbkhvdXJzICogTVNfUEVSX0hPVVIpO1xyXG4gICAgZm9yIChjb25zdCBiIG9mIGJsb2Nrcykge1xyXG4gICAgICBpZiAocmVzdWx0IDwgYi5lbmQgJiYgZW5kID4gYi5zdGFydCkge1xyXG4gICAgICAgIHJlc3VsdCA9IG5ldyBEYXRlKGIuZW5kKTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgZ2VuZXJhdGVEYXlzID0gKHN0YXJ0OiBEYXRlLCBudW1EYXlzOiBudW1iZXIpOiBEYXRlW10gPT4ge1xyXG4gIGNvbnN0IGRheXM6IERhdGVbXSA9IFtdO1xyXG4gIGxldCBjdXIgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1EYXlzOyBpKyspIHtcclxuICAgIGRheXMucHVzaChuZXcgRGF0ZShjdXIpKTtcclxuICAgIGN1ci5zZXREYXRlKGN1ci5nZXREYXRlKCkgKyAxKTtcclxuICB9XHJcbiAgcmV0dXJuIGRheXM7XHJcbn07XHJcblxyXG5jb25zdCBnZW5lcmF0ZVdlZWtzID0gKHN0YXJ0OiBEYXRlLCBudW1EYXlzOiBudW1iZXIpOiBEYXRlW10gPT4ge1xyXG4gIGNvbnN0IHJlc3VsdDogRGF0ZVtdID0gW107XHJcbiAgbGV0IGN1ciA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICB3aGlsZSAoY3VyLmdldERheSgpICE9PSAxKSBjdXIuc2V0RGF0ZShjdXIuZ2V0RGF0ZSgpIC0gMSk7XHJcbiAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKHN0YXJ0KTtcclxuICBlbmREYXRlLnNldERhdGUoZW5kRGF0ZS5nZXREYXRlKCkgKyBudW1EYXlzKTtcclxuICB3aGlsZSAoY3VyIDwgZW5kRGF0ZSkge1xyXG4gICAgcmVzdWx0LnB1c2gobmV3IERhdGUoY3VyKSk7XHJcbiAgICBjdXIuc2V0RGF0ZShjdXIuZ2V0RGF0ZSgpICsgNyk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jb25zdCBob3Vyc0JldHdlZW4gPSAoYTogRGF0ZSwgYjogRGF0ZSk6IG51bWJlciA9PiAoYi5nZXRUaW1lKCkgLSBhLmdldFRpbWUoKSkgLyBNU19QRVJfSE9VUjtcclxuY29uc3QgZm9ybWF0V2VlayA9IChkOiBEYXRlKTogc3RyaW5nID0+IGBXL0MgJHtkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JyB9KX1gO1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFBhcnQgU3RhdHVzIExvZ2ljXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBub3JtYWxpemVQYXJ0U3RhdHVzID0gKHJhd1N0YXR1czogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBpZiAoIXJhd1N0YXR1cyB8fCByYXdTdGF0dXMgPT09ICduYW4nKSByZXR1cm4gJ0luIFByb2dyZXNzJztcclxuICBjb25zdCBsb3dlciA9IHJhd1N0YXR1cy50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICBpZiAobG93ZXIgPT09ICdyZWFkeScpIHJldHVybiAnUmVhZHknO1xyXG4gIGlmIChsb3dlciA9PT0gJ3BhcnRzIG5vdCBhc3NpZ25lZCcpIHJldHVybiAnUGFydHMgTm90IEFzc2lnbmVkJztcclxuICByZXR1cm4gJ0luIFByb2dyZXNzJztcclxufTtcclxuXHJcbmNvbnN0IGdldENhbGN1bGF0ZWRTdGF0dXMgPSAodGVzdDogVGVzdERhdGEsIHRlc3RTdGFydERhdGU6IERhdGUgfCBudWxsID0gbnVsbCk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgYmFzZVN0YXR1cyA9IG5vcm1hbGl6ZVBhcnRTdGF0dXModGVzdC5wYXJ0X3N0YXR1cyk7XHJcbiAgaWYgKGJhc2VTdGF0dXMgPT09ICdSZWFkeScpIHJldHVybiAnUmVhZHknO1xyXG4gIGlmIChiYXNlU3RhdHVzID09PSAnUGFydHMgTm90IEFzc2lnbmVkJykgcmV0dXJuICdQYXJ0cyBOb3QgQXNzaWduZWQnO1xyXG5cclxuICBpZiAodGVzdFN0YXJ0RGF0ZSAmJiB0ZXN0LnBhcnRfcmVhZHlfZGF0ZSkge1xyXG4gICAgY29uc3QgcmVhZHlEYXRlID0gcGFyc2VMb2NhbERhdGUodGVzdC5wYXJ0X3JlYWR5X2RhdGUpO1xyXG4gICAgY29uc3Qgc3RhcnREYXRlID0gdG9NaWRuaWdodCh0ZXN0U3RhcnREYXRlKTtcclxuICAgIGlmIChyZWFkeURhdGUgJiYgc3RhcnREYXRlKSB7XHJcbiAgICAgIHJldHVybiByZWFkeURhdGUuZ2V0VGltZSgpID4gc3RhcnREYXRlLmdldFRpbWUoKSA/ICdEZWxheWVkJyA6ICdPbiBUaW1lJztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuICdJbiBQcm9ncmVzcyc7XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU3RhdHVzIC8gUHJpb3JpdHkgaGVscGVycyAodGhlbWUtYXdhcmUpXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBpc1J1bm5pbmdUZXN0ID0gKHRlc3Q6IFRlc3REYXRhKTogYm9vbGVhbiA9PiB0ZXN0LnN0YXR1cyA9PT0gJ1J1bm5pbmcnO1xyXG5cclxuY29uc3QgZ2V0Q2FwQ29sb3IgPSAoc3RhdHVzOiBzdHJpbmcsIHRoZW1lOiBUaGVtZVRva2Vucyk6IHN0cmluZyA9PlxyXG4gIHRoZW1lLnN0YXR1c0NhcFtzdGF0dXNdIHx8IHRoZW1lLnN0YXR1c0NhcFsnSW4gUHJvZ3Jlc3MnXSB8fCAnI0U1QTAwRCc7XHJcblxyXG5jb25zdCBnZXRTdGF0dXNUZXh0Q29sb3IgPSAoc3RhdHVzOiBzdHJpbmcsIHRoZW1lOiBUaGVtZVRva2Vucyk6IHN0cmluZyA9PlxyXG4gIHRoZW1lLnN0YXR1c1RleHRbc3RhdHVzXSB8fCB0aGVtZS5zdGF0dXNUZXh0WydJbiBQcm9ncmVzcyddIHx8ICcjQjQ1MzA5JztcclxuXHJcbi8vIFJldHVybnMgJ1J1bm5pbmcnIGZvciBSdW5uaW5nIHRlc3RzIChvdmVycmlkZXMgcGFydCBzdGF0dXMgZm9yIGRpc3BsYXkgY29sb3VycylcclxuY29uc3QgZ2V0RGlzcGxheVN0YXR1cyA9ICh0ZXN0OiBUZXN0RGF0YSwgdGVzdFN0YXJ0RGF0ZTogRGF0ZSB8IG51bGwgPSBudWxsKTogc3RyaW5nID0+IHtcclxuICBpZiAoaXNSdW5uaW5nVGVzdCh0ZXN0KSkgcmV0dXJuICdSdW5uaW5nJztcclxuICByZXR1cm4gZ2V0Q2FsY3VsYXRlZFN0YXR1cyh0ZXN0LCB0ZXN0U3RhcnREYXRlKTtcclxufTtcclxuXHJcbmNvbnN0IGdldFByaW9yaXR5VGV4dENvbG9yID0gKHByaW9yaXR5OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBwcmlvcml0eSA9PT0gJ251bWJlcicgPyBwcmlvcml0eSA6IDUwO1xyXG4gIGNvbnN0IGNsYW1wZWQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHZhbHVlKSk7XHJcbiAgaWYgKGNsYW1wZWQgPD0gMzApIHJldHVybiAnIzZCNzI4MCc7XHJcbiAgaWYgKGNsYW1wZWQgPD0gNjApIHJldHVybiAnI0Y1OUUwQic7XHJcbiAgaWYgKGNsYW1wZWQgPD0gODApIHJldHVybiAnI0VBNTgwQyc7XHJcbiAgcmV0dXJuICcjREMyNjI2JztcclxufTtcclxuXHJcbmNvbnN0IGdldFByaW9yaXR5Q29sb3IgPSAocHJpb3JpdHk6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gdHlwZW9mIHByaW9yaXR5ID09PSAnbnVtYmVyJyA/IHByaW9yaXR5IDogNTA7XHJcbiAgY29uc3QgY2xhbXBlZCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgdmFsdWUpKTtcclxuICBjb25zdCByYXRpbyA9IGNsYW1wZWQgLyAxMDA7XHJcbiAgY29uc3QgZyA9IE1hdGgucm91bmQoMjU1ICogKDEgLSByYXRpbykpO1xyXG4gIGNvbnN0IGIgPSBNYXRoLnJvdW5kKDI1NSAqICgxIC0gcmF0aW8pKTtcclxuICByZXR1cm4gYHJnYmEoMjU1LCAke2d9LCAke2J9LCAwLjYpYDtcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBTdWItY29tcG9uZW50c1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgSW5zZXJ0TGluZTogRkM8eyB0aGVtZTogVGhlbWVUb2tlbnMgfT4gPSAoeyB0aGVtZSB9KSA9PiAoXHJcbiAgPGRpdiBzdHlsZT17e1xyXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMiwgYm90dG9tOiAyLCB3aWR0aDogMyxcclxuICAgIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCwgYm9yZGVyUmFkaXVzOiAyLCB6SW5kZXg6IDMwLFxyXG4gICAgYm94U2hhZG93OiBgMCAwIDEycHggJHt0aGVtZS5hY2NlbnR9LCAwIDAgNHB4ICR7dGhlbWUuYWNjZW50fWAsXHJcbiAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcbiAgfX0+XHJcbiAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IC00LCBsZWZ0OiAtNCwgd2lkdGg6IDExLCBoZWlnaHQ6IDExLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQgfX0gLz5cclxuICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGJvdHRvbTogLTQsIGxlZnQ6IC00LCB3aWR0aDogMTEsIGhlaWdodDogMTEsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCB9fSAvPlxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuY29uc3QgT3V0bGluZUtleTogRkM8eyB0aGVtZTogVGhlbWVUb2tlbnMgfT4gPSAoeyB0aGVtZSB9KSA9PiAoXHJcbiAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNnB4JywgYm9yZGVyVG9wOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcyB9fT5cclxuICAgIDxoMyBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA3MDAsIGxldHRlclNwYWNpbmc6ICcwLjA4ZW0nLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJywgY29sb3I6IHRoZW1lLnRleHRUZXJ0aWFyeSwgbWFyZ2luQm90dG9tOiA2IH19PlN0YXR1cyBLZXk8L2gzPlxyXG4gICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhXcmFwOiAnd3JhcCcsIGdhcDogJzRweCAwJyB9fT5cclxuICAgICAgeyhbJ1J1bm5pbmcnLCAnUmVhZHknLCAnT24gVGltZScsICdEZWxheWVkJywgJ1BhcnRzIE5vdCBBc3NpZ25lZCddIGFzIGNvbnN0KS5tYXAoKGtleSkgPT4gKFxyXG4gICAgICAgIDxkaXYga2V5PXtrZXl9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogNiwgd2lkdGg6ICc1MCUnLCBtaW5XaWR0aDogMCB9fT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDQsIGhlaWdodDogMTQsIGJhY2tncm91bmQ6IHRoZW1lLnN0YXR1c0NhcFtrZXldLCBib3JkZXJSYWRpdXM6IDIsIGZsZXhTaHJpbms6IDAgfX0gLz5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogOSwgY29sb3I6IHRoZW1lLnN0YXR1c1RleHRba2V5XSwgZm9udFdlaWdodDogNjAwLCB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycgfX0+e2tleS50b1VwcGVyQ2FzZSgpfTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSl9XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmludGVyZmFjZSBRdWV1ZUNhcmRQcm9wcyB7XHJcbiAgdGVzdDogVGVzdERhdGE7XHJcbiAgZHJhZ2dlZFRlc3RJZDogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbDtcclxuICBzdGF0dXM6IHN0cmluZztcclxuICBtYWluVGV4dDogc3RyaW5nO1xyXG4gIHN1YlRleHQ6IHN0cmluZztcclxuICBpbmZvUm93OiBzdHJpbmc7XHJcbiAgc2hvd1N1YjogYm9vbGVhbjtcclxuICB0aGVtZTogVGhlbWVUb2tlbnM7XHJcbiAgb25EcmFnU3RhcnQ6ICgpID0+IHZvaWQ7XHJcbiAgb25EcmFnRW5kOiAoKSA9PiB2b2lkO1xyXG4gIG9uRHJhZ092ZXI6IChlOiBSZWFjdC5EcmFnRXZlbnQpID0+IHZvaWQ7XHJcbiAgb25NZW51T3BlbjogKHJlY3Q6IEFuY2hvclJlY3QpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmNvbnN0IFF1ZXVlQ2FyZDogRkM8UXVldWVDYXJkUHJvcHM+ID0gKHtcclxuICB0ZXN0LCBkcmFnZ2VkVGVzdElkLCBzdGF0dXMsIG1haW5UZXh0LCBzdWJUZXh0LCBpbmZvUm93LCBzaG93U3ViLCB0aGVtZSxcclxuICBvbkRyYWdTdGFydCwgb25EcmFnRW5kLCBvbkRyYWdPdmVyLCBvbk1lbnVPcGVuLFxyXG59KSA9PiB7XHJcbiAgY29uc3QgW2hvdmVyZWQsIHNldEhvdmVyZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHBpbGxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xyXG4gIGNvbnN0IGNhcENvbG9yID0gZ2V0Q2FwQ29sb3Ioc3RhdHVzLCB0aGVtZSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgZHJhZ2dhYmxlXHJcbiAgICAgIG9uRHJhZ1N0YXJ0PXsoZSkgPT4geyBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnOyBvbkRyYWdTdGFydCgpOyB9fVxyXG4gICAgICBvbkRyYWdFbmQ9e29uRHJhZ0VuZH1cclxuICAgICAgb25EcmFnT3Zlcj17b25EcmFnT3Zlcn1cclxuICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRIb3ZlcmVkKHRydWUpfVxyXG4gICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldEhvdmVyZWQoZmFsc2UpfVxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICBtYXJnaW5Cb3R0b206IDYsXHJcbiAgICAgICAgYmFja2dyb3VuZDogZHJhZ2dlZFRlc3RJZCA9PT0gdGVzdC5pZCA/IHRoZW1lLmJnU3VidGxlIDogdGhlbWUuc3VyZmFjZSxcclxuICAgICAgICBib3JkZXI6IGhvdmVyZWQgPyBgMnB4IHNvbGlkICR7Y2FwQ29sb3J9YCA6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCxcclxuICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLFxyXG4gICAgICAgIGN1cnNvcjogJ2dyYWInLFxyXG4gICAgICAgIG9wYWNpdHk6IGRyYWdnZWRUZXN0SWQgPT09IHRlc3QuaWQgPyAwLjM1IDogMSxcclxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgYm94U2hhZG93OiBob3ZlcmVkID8gJzAgNHB4IDEycHggcmdiYSgwLDAsMCwwLjE1KScgOiAnMCAxcHggM3B4IHJnYmEoMCwwLDAsMC4wNiknLFxyXG4gICAgICAgIHRyYW5zZm9ybTogaG92ZXJlZCA/ICd0cmFuc2xhdGVZKC0ycHgpJyA6ICd0cmFuc2xhdGVZKDApJyxcclxuICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuMTVzIGVhc2UsIGJveC1zaGFkb3cgMC4xNXMgZWFzZSwgYm9yZGVyIDAuMTVzIGVhc2UnLFxyXG4gICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgIH19XHJcbiAgICA+XHJcbiAgICAgIHsvKiBTdGF0dXMgY2FwIGJhciAqL31cclxuICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNSwgbWluV2lkdGg6IDUsIGJhY2tncm91bmQ6IGNhcENvbG9yLCBib3JkZXJSYWRpdXM6IGAke3RoZW1lLnJhZGl1c0xnfXB4IDAgMCAke3RoZW1lLnJhZGl1c0xnfXB4YCwgZmxleFNocmluazogMCB9fSAvPlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIHBhZGRpbmc6ICc4cHggMTJweCcsIG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgIHsvKiBUb3Agcm93OiBwcmlvcml0eSBsZWZ0LCBzdGF0dXMgcmlnaHQgKi99XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBtYXJnaW5Cb3R0b206IDQsIHBhZGRpbmdSaWdodDogMjAgfX0+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDEzLCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiBnZXRQcmlvcml0eVRleHRDb2xvcih0ZXN0LnByaW9yaXR5KSB9fT5cclxuICAgICAgICAgICAgUHt0ZXN0LnByaW9yaXR5fVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnMC4wNWVtJywgY29sb3I6IGdldFN0YXR1c1RleHRDb2xvcihzdGF0dXMsIHRoZW1lKSwgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgYXMgY29uc3QgfX0+XHJcbiAgICAgICAgICAgIHtzdGF0dXMudG9VcHBlckNhc2UoKX1cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksIG1hcmdpbkJvdHRvbTogMiwgbGluZUhlaWdodDogMS4zIH19PlxyXG4gICAgICAgICAge21haW5UZXh0fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtzaG93U3ViICYmIChcclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMSwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgbWFyZ2luQm90dG9tOiA0LCBmb250V2VpZ2h0OiA0MDAgfX0+XHJcbiAgICAgICAgICAgIHtzdWJUZXh0fVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgZm9udFNpemU6IDExLCBjb2xvcjogdGhlbWUudGV4dFRlcnRpYXJ5LCBmbGV4V3JhcDogJ3dyYXAnIH19PlxyXG4gICAgICAgICAge2luZm9Sb3cuc3BsaXQoJ1xcdTAwYjcnKS5tYXAoKHBhcnQsIGksIGFycikgPT4gKFxyXG4gICAgICAgICAgICA8UmVhY3QuRnJhZ21lbnQga2V5PXtpfT5cclxuICAgICAgICAgICAgICA8c3Bhbj57cGFydC50cmltKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIHtpIDwgYXJyLmxlbmd0aCAtIDEgJiYgPHNwYW4+eydcXHUwMGI3J308L3NwYW4+fVxyXG4gICAgICAgICAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7LyogVGhyZWUtZG90IG1lbnUgcGlsbCAqL31cclxuICAgICAgPGRpdlxyXG4gICAgICAgIHJlZj17cGlsbFJlZn1cclxuICAgICAgICBkcmFnZ2FibGU9e2ZhbHNlfVxyXG4gICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cclxuICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIGlmIChwaWxsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgciA9IHBpbGxSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgb25NZW51T3Blbih7IHRvcDogci50b3AsIGJvdHRvbTogci5ib3R0b20sIGxlZnQ6IHIubGVmdCwgcmlnaHQ6IHIucmlnaHQgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfX1cclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICB0b3A6IDYsXHJcbiAgICAgICAgICByaWdodDogNixcclxuICAgICAgICAgIGJhY2tncm91bmQ6IGhvdmVyZWQgPyAncmdiYSgwLDAsMCwwLjEpJyA6ICdyZ2JhKDAsMCwwLDAuMDQpJyxcclxuICAgICAgICAgIGJvcmRlclJhZGl1czogMTAsXHJcbiAgICAgICAgICBwYWRkaW5nOiAnMnB4IDdweCcsXHJcbiAgICAgICAgICBmb250U2l6ZTogMTMsXHJcbiAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dE11dGVkLFxyXG4gICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnMC4xZW0nLFxyXG4gICAgICAgICAgbGluZUhlaWdodDogMSxcclxuICAgICAgICAgIG9wYWNpdHk6IGhvdmVyZWQgPyAxIDogMC40LFxyXG4gICAgICAgICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC4xNXMsIGJhY2tncm91bmQgMC4xNXMnLFxyXG4gICAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxyXG4gICAgICAgICAgZm9udFdlaWdodDogNzAwLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cdTAwQjdcdTAwQjdcdTAwQjc8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5pbnRlcmZhY2UgVGVzdEJhclByb3BzIHtcclxuICB0ZXN0OiBTY2hlZHVsZWRUZXN0O1xyXG4gIGlzVGVzdFJ1bm5pbmc6IGJvb2xlYW47XHJcbiAgZHJhZ2dlZFRlc3RJZDogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbDtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIEJBUl9IRUlHSFQ6IG51bWJlcjtcclxuICBkaXNwbGF5U3RhdHVzOiBzdHJpbmc7XHJcbiAgcmVzb2x2ZWRNYWluOiBzdHJpbmc7XHJcbiAgcmVzb2x2ZWRJbmZvOiBzdHJpbmc7XHJcbiAgc2hvd0luZm9PbkJhcjogYm9vbGVhbjtcclxuICB0aGVtZTogVGhlbWVUb2tlbnM7XHJcbiAgb25EcmFnU3RhcnQ6IChlOiBSZWFjdC5EcmFnRXZlbnQpID0+IHZvaWQ7XHJcbiAgb25EcmFnRW5kOiAoKSA9PiB2b2lkO1xyXG4gIG9uTWVudU9wZW46IChyZWN0OiBBbmNob3JSZWN0KSA9PiB2b2lkO1xyXG59XHJcblxyXG5jb25zdCBUZXN0QmFyOiBGQzxUZXN0QmFyUHJvcHM+ID0gKHtcclxuICB0ZXN0LCBpc1Rlc3RSdW5uaW5nLCBkcmFnZ2VkVGVzdElkLCB3aWR0aCwgQkFSX0hFSUdIVCxcclxuICBkaXNwbGF5U3RhdHVzLCByZXNvbHZlZE1haW4sIHJlc29sdmVkSW5mbywgc2hvd0luZm9PbkJhciwgdGhlbWUsXHJcbiAgb25EcmFnU3RhcnQsIG9uRHJhZ0VuZCwgb25NZW51T3BlbixcclxufSkgPT4ge1xyXG4gIGNvbnN0IFtob3ZlcmVkLCBzZXRIb3ZlcmVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBwaWxsUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcclxuICBjb25zdCBjYXBDb2xvciA9IGdldENhcENvbG9yKGRpc3BsYXlTdGF0dXMsIHRoZW1lKTtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBkcmFnZ2FibGVcclxuICAgICAgb25EcmFnU3RhcnQ9e29uRHJhZ1N0YXJ0fVxyXG4gICAgICBvbkRyYWdFbmQ9e29uRHJhZ0VuZH1cclxuICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiB7IGlmICghZHJhZ2dlZFRlc3RJZCkgc2V0SG92ZXJlZCh0cnVlKTsgfX1cclxuICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRIb3ZlcmVkKGZhbHNlKX1cclxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiA2LFxyXG4gICAgICAgIHdpZHRoLCBoZWlnaHQ6IEJBUl9IRUlHSFQsXHJcbiAgICAgICAgYmFja2dyb3VuZDogaXNUZXN0UnVubmluZyA/IHRoZW1lLnJ1bm5pbmdCZyA6IHRoZW1lLnN1cmZhY2UsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZywgY3Vyc29yOiAnZ3JhYicsXHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAncm93JyxcclxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgb3BhY2l0eTogZHJhZ2dlZFRlc3RJZCA9PT0gdGVzdC5pZCA/IDAuMjUgOiAxLFxyXG4gICAgICAgIHpJbmRleDogaG92ZXJlZCA/IDI1IDogMTUsXHJcbiAgICAgICAgYm9yZGVyOiBob3ZlcmVkXHJcbiAgICAgICAgICA/IGAycHggc29saWQgJHtjYXBDb2xvcn1gXHJcbiAgICAgICAgICA6IGlzVGVzdFJ1bm5pbmcgPyBgMXB4IHNvbGlkICR7dGhlbWUucnVubmluZ0JvcmRlcn1gIDogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLFxyXG4gICAgICAgIGJveFNoYWRvdzogaG92ZXJlZFxyXG4gICAgICAgICAgPyAnMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMTUpJ1xyXG4gICAgICAgICAgOiBpc1Rlc3RSdW5uaW5nID8gYDAgMXB4IDNweCAke3RoZW1lLnJ1bm5pbmdCb3JkZXJ9NjZgIDogJzAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMDYpJyxcclxuICAgICAgICB0cmFuc2Zvcm06IGhvdmVyZWQgPyAndHJhbnNsYXRlWSgtMnB4KScgOiAndHJhbnNsYXRlWSgwKScsXHJcbiAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjE1cyBlYXNlLCBib3gtc2hhZG93IDAuMTVzIGVhc2UsIGJvcmRlciAwLjE1cyBlYXNlJyxcclxuICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICB9fVxyXG4gICAgPlxyXG4gICAgICB7LyogU3RhdHVzIGNhcCBiYXIgKi99XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDUsIG1pbldpZHRoOiA1LCBiYWNrZ3JvdW5kOiBjYXBDb2xvciwgZmxleFNocmluazogMCB9fSAvPlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIHBhZGRpbmc6ICc0cHggOHB4JywgbWluV2lkdGg6IDAsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fT5cclxuICAgICAgICB7LyogVG9wIHJvdzogcHJpb3JpdHkgKyBzdGF0dXMgKGxlYXZlIHJvb20gZm9yIHBpbGwpICovfVxyXG4gICAgICAgIHt3aWR0aCA+IDcwICYmIChcclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAyLCBwYWRkaW5nUmlnaHQ6IHdpZHRoID4gOTAgPyAyMiA6IDAgfX0+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogd2lkdGggPiAxMjAgPyAxMSA6IDksIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IGlzVGVzdFJ1bm5pbmcgPyB0aGVtZS5ydW5uaW5nVGV4dCA6IGdldFByaW9yaXR5VGV4dENvbG9yKHRlc3QucHJpb3JpdHkpIH19PlxyXG4gICAgICAgICAgICAgIHtpc1Rlc3RSdW5uaW5nID8gJ1x1MjVCNiBSVU5OSU5HJyA6IGBQJHt0ZXN0LnByaW9yaXR5fWB9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAge3dpZHRoID4gMTEwICYmICFpc1Rlc3RSdW5uaW5nICYmIChcclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDksIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDVlbScsIGNvbG9yOiBnZXRTdGF0dXNUZXh0Q29sb3IoZGlzcGxheVN0YXR1cywgdGhlbWUpLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyBhcyBjb25zdCB9fT5cclxuICAgICAgICAgICAgICAgIHtkaXNwbGF5U3RhdHVzLnRvVXBwZXJDYXNlKCl9XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKX1cclxuICAgICAgICB7LyogTWFpbiB0ZXh0ICovfVxyXG4gICAgICAgIDxzcGFuIHN0eWxlPXt7XHJcbiAgICAgICAgICBmb250U2l6ZTogd2lkdGggPiAxMjAgPyAxMiA6IHdpZHRoID4gODAgPyAxMSA6IDEwLFxyXG4gICAgICAgICAgZm9udFdlaWdodDogNjAwLCBjb2xvcjogaXNUZXN0UnVubmluZyA/IHRoZW1lLnJ1bm5pbmdUZXh0RGFyayA6IHRoZW1lLnRleHRQcmltYXJ5LFxyXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgbWF4V2lkdGg6ICcxMDAlJywgbGluZUhlaWdodDogMS4yLFxyXG4gICAgICAgIH19PlxyXG4gICAgICAgICAge3Jlc29sdmVkTWFpbn1cclxuICAgICAgICA8L3NwYW4+XHJcblxyXG4gICAgICAgIHsvKiBJbmZvIHJvdyAqL31cclxuICAgICAgICB7c2hvd0luZm9PbkJhciAmJiAoXHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDksIGZvbnRXZWlnaHQ6IDQwMCxcclxuICAgICAgICAgICAgY29sb3I6IGlzVGVzdFJ1bm5pbmcgPyB0aGVtZS5ydW5uaW5nVGV4dCA6IHRoZW1lLnRleHRUZXJ0aWFyeSxcclxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLCBtYXhXaWR0aDogJzEwMCUnLCBtYXJnaW5Ub3A6IDIsXHJcbiAgICAgICAgICB9fT5cclxuICAgICAgICAgICAge3Jlc29sdmVkSW5mb31cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHsvKiBUaHJlZS1kb3QgbWVudSBwaWxsICovfVxyXG4gICAgICB7d2lkdGggPiA0MCAmJiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgcmVmPXtwaWxsUmVmfVxyXG4gICAgICAgICAgZHJhZ2dhYmxlPXtmYWxzZX1cclxuICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cclxuICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChwaWxsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICBjb25zdCByID0gcGlsbFJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgIG9uTWVudU9wZW4oeyB0b3A6IHIudG9wLCBib3R0b206IHIuYm90dG9tLCBsZWZ0OiByLmxlZnQsIHJpZ2h0OiByLnJpZ2h0IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgIHRvcDogNCxcclxuICAgICAgICAgICAgcmlnaHQ6IDQsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGhvdmVyZWQgPyAncmdiYSgwLDAsMCwwLjEpJyA6ICdyZ2JhKDAsMCwwLDAuMDQpJyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAxMCxcclxuICAgICAgICAgICAgcGFkZGluZzogJzJweCA2cHgnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogMTIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBpc1Rlc3RSdW5uaW5nID8gdGhlbWUucnVubmluZ1RleHQgOiB0aGVtZS50ZXh0TXV0ZWQsXHJcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnMC4xZW0nLFxyXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiBob3ZlcmVkID8gMSA6IDAuMzUsXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzJyxcclxuICAgICAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA3MDAsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cdTAwQjdcdTAwQjdcdTAwQjc8L2Rpdj5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQ29udGV4dCBNZW51XHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBNZW51SXRlbTogRkM8eyBsYWJlbDogc3RyaW5nOyBpY29uPzogc3RyaW5nOyB0aGVtZTogVGhlbWVUb2tlbnM7IG9uQ2xpY2s6ICgpID0+IHZvaWQgfT4gPSAoeyBsYWJlbCwgaWNvbiwgdGhlbWUsIG9uQ2xpY2sgfSkgPT4ge1xyXG4gIGNvbnN0IFtob3ZlcmVkLCBzZXRIb3ZlcmVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEhvdmVyZWQodHJ1ZSl9XHJcbiAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SG92ZXJlZChmYWxzZSl9XHJcbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XHJcbiAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgcGFkZGluZzogJzhweCAxNHB4JyxcclxuICAgICAgICBmb250U2l6ZTogMTMsXHJcbiAgICAgICAgZm9udFdlaWdodDogNTAwLFxyXG4gICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSxcclxuICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICBiYWNrZ3JvdW5kOiBob3ZlcmVkID8gdGhlbWUuc3VyZmFjZUhvdmVyIDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgZ2FwOiA4LFxyXG4gICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcclxuICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICB9fVxyXG4gICAgPlxyXG4gICAgICB7aWNvbiAmJiA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTQsIHdpZHRoOiAxOCwgdGV4dEFsaWduOiAnY2VudGVyJywgY29sb3I6IHRoZW1lLnRleHRNdXRlZCB9fT57aWNvbn08L3NwYW4+fVxyXG4gICAgICB7bGFiZWx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuaW50ZXJmYWNlIEFjdGlvblBvcG92ZXJQcm9wcyB7XHJcbiAgcG9wb3ZlcjogUG9wb3ZlclN0YXRlO1xyXG4gIHN0YXR1c09wdGlvbnNMaXN0OiBzdHJpbmdbXTtcclxuICBwcmlvcml0eUlucHV0VmFsdWU6IHN0cmluZztcclxuICBzdGFydERhdGVJbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgdGhlbWU6IFRoZW1lVG9rZW5zO1xyXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XHJcbiAgb25Nb2RlQ2hhbmdlOiAobW9kZTogJ3Jvb3QnIHwgJ3ByaW9yaXR5JyB8ICdzdGF0dXMnIHwgJ3N0YXJ0X2RhdGUnKSA9PiB2b2lkO1xyXG4gIG9uUHJpb3JpdHlJbnB1dENoYW5nZTogKHZhbDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uQ29uZmlybVByaW9yaXR5OiAoKSA9PiB2b2lkO1xyXG4gIG9uUGlja1N0YXR1czogKHN0YXR1czogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRWRpdFRlc3Q6ICgpID0+IHZvaWQ7XHJcbiAgb25TdGFydERhdGVJbnB1dENoYW5nZTogKHZhbDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uQ29uZmlybVN0YXJ0RGF0ZTogKCkgPT4gdm9pZDtcclxuICBwYW5lbFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcclxufVxyXG5cclxuY29uc3QgQWN0aW9uUG9wb3ZlcjogRkM8QWN0aW9uUG9wb3ZlclByb3BzPiA9ICh7XHJcbiAgcG9wb3Zlciwgc3RhdHVzT3B0aW9uc0xpc3QsIHByaW9yaXR5SW5wdXRWYWx1ZSwgc3RhcnREYXRlSW5wdXRWYWx1ZSwgdGhlbWUsXHJcbiAgb25DbG9zZSwgb25Nb2RlQ2hhbmdlLCBvblByaW9yaXR5SW5wdXRDaGFuZ2UsIG9uQ29uZmlybVByaW9yaXR5LCBvblBpY2tTdGF0dXMsIG9uRWRpdFRlc3QsXHJcbiAgb25TdGFydERhdGVJbnB1dENoYW5nZSwgb25Db25maXJtU3RhcnREYXRlLCBwYW5lbFJlZixcclxufSkgPT4ge1xyXG4gIGNvbnN0IFtmbGlwcGVkViwgc2V0RmxpcHBlZFZdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHBvcG92ZXJXaWR0aCA9IDI0ODtcclxuICBjb25zdCB7IGFuY2hvclJlY3QsIHRlc3QsIG1vZGUsIGRpc3BsYXlTdGF0dXMsIHRvb2x0aXBMaW5lcywgc2NoZWR1bGVkIH0gPSBwb3BvdmVyO1xyXG4gIGNvbnN0IGNhcENvbG9yID0gZ2V0Q2FwQ29sb3IoZGlzcGxheVN0YXR1cywgdGhlbWUpO1xyXG5cclxuICAvLyBIb3Jpem9udGFsOiByaWdodC1hbGlnbiB0byBidXR0b24sIGNsYW1wIHRvIHZpZXdwb3J0IGVkZ2VzXHJcbiAgbGV0IGxlZnQgPSBhbmNob3JSZWN0LnJpZ2h0IC0gcG9wb3ZlcldpZHRoO1xyXG4gIGxlZnQgPSBNYXRoLm1heCg4LCBNYXRoLm1pbihsZWZ0LCB3aW5kb3cuaW5uZXJXaWR0aCAtIHBvcG92ZXJXaWR0aCAtIDgpKTtcclxuXHJcbiAgLy8gVmVydGljYWw6IGJlbG93IGJ1dHRvbiBieSBkZWZhdWx0OyBmbGlwIGFib3ZlIGlmIG5lYXIgYm90dG9tXHJcbiAgY29uc3QgdG9wQmVsb3cgPSBhbmNob3JSZWN0LmJvdHRvbSArIDY7XHJcbiAgY29uc3QgYm90dG9tQWJvdmUgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBhbmNob3JSZWN0LnRvcCArIDY7XHJcblxyXG4gIFJlYWN0LnVzZUxheW91dEVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAocGFuZWxSZWYuY3VycmVudCkge1xyXG4gICAgICBjb25zdCByID0gcGFuZWxSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgc2V0RmxpcHBlZFYoci5ib3R0b20gPiB3aW5kb3cuaW5uZXJIZWlnaHQgLSA4KTtcclxuICAgIH1cclxuICB9LCBbbW9kZSwgYW5jaG9yUmVjdF0pO1xyXG5cclxuICBjb25zdCBwb3NTdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyA9IGZsaXBwZWRWXHJcbiAgICA/IHsgcG9zaXRpb246ICdmaXhlZCcsIGxlZnQsIGJvdHRvbTogYm90dG9tQWJvdmUsIHpJbmRleDogMzAwMCB9XHJcbiAgICA6IHsgcG9zaXRpb246ICdmaXhlZCcsIGxlZnQsIHRvcDogdG9wQmVsb3csIHpJbmRleDogMzAwMCB9O1xyXG5cclxuICBjb25zdCBsaW5lcyA9IHRvb2x0aXBMaW5lcy5zcGxpdCgnXFxuJykuZmlsdGVyKGwgPT4ge1xyXG4gICAgY29uc3QgcGFydHMgPSBsLnNwbGl0KCc6Jyk7XHJcbiAgICBpZiAocGFydHMubGVuZ3RoIDwgMikgcmV0dXJuIGwudHJpbSgpICE9PSAnJztcclxuICAgIHJldHVybiBwYXJ0cy5zbGljZSgxKS5qb2luKCc6JykudHJpbSgpICE9PSAnJztcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgcmVmPXtwYW5lbFJlZn1cclxuICAgICAgb25Db250ZXh0TWVudT17KGUpID0+IGUucHJldmVudERlZmF1bHQoKX1cclxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICAuLi5wb3NTdHlsZSxcclxuICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLFxyXG4gICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzWGwsXHJcbiAgICAgICAgYm94U2hhZG93OiAnMCA0cHggMTZweCByZ2JhKDAsMCwwLDAuMTIpLCAwIDFweCA0cHggcmdiYSgwLDAsMCwwLjA2KScsXHJcbiAgICAgICAgd2lkdGg6IHBvcG92ZXJXaWR0aCxcclxuICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAge21vZGUgPT09ICdyb290JyA/IChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgey8qIERldGFpbHMgc2VjdGlvbiAqL31cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTRweCAxMHB4JywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDEzLCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSwgbGluZUhlaWdodDogMS4zLCBtYXJnaW5Cb3R0b206IDYsIHdvcmRCcmVhazogJ2JyZWFrLXdvcmQnIH19PlxyXG4gICAgICAgICAgICAgIHt0ZXN0Lm5hbWV9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA4LCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiAobGluZXMubGVuZ3RoID4gMCB8fCBzY2hlZHVsZWQpID8gOCA6IDAgfX0+XHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogZ2V0UHJpb3JpdHlUZXh0Q29sb3IodGVzdC5wcmlvcml0eSkgfX0+XHJcbiAgICAgICAgICAgICAgICBQe3Rlc3QucHJpb3JpdHl9XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubyxcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMCwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogZ2V0U3RhdHVzVGV4dENvbG9yKGRpc3BsYXlTdGF0dXMsIHRoZW1lKSxcclxuICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIGFzIGNvbnN0LCBsZXR0ZXJTcGFjaW5nOiAnMC4wNWVtJyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxcHggNnB4JywgYmFja2dyb3VuZDogYCR7Y2FwQ29sb3J9MThgLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNTbSwgYm9yZGVyOiBgMXB4IHNvbGlkICR7Y2FwQ29sb3J9NDBgLFxyXG4gICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAge2Rpc3BsYXlTdGF0dXN9XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAge2xpbmVzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogMSwgYmFja2dyb3VuZDogdGhlbWUuYm9yZGVyLCBtYXJnaW46ICcwIC0ycHggNnB4JyB9fSAvPlxyXG4gICAgICAgICAgICAgICAge2xpbmVzLm1hcCgobGluZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBjb2xvbklkeCA9IGxpbmUuaW5kZXhPZignOicpO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoY29sb25JZHggPT09IC0xKSByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17eyBmb250U2l6ZTogMTEsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5LCBtYXJnaW5Cb3R0b206IDIsIGxpbmVIZWlnaHQ6IDEuNCB9fT57bGluZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBsaW5lLnNsaWNlKDAsIGNvbG9uSWR4KS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbGluZS5zbGljZShjb2xvbklkeCArIDEpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIGZvbnRTaXplOiAxMSwgbWFyZ2luQm90dG9tOiAyLCBsaW5lSGVpZ2h0OiAxLjQgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250V2VpZ2h0OiA1MDAsIGZsZXhTaHJpbms6IDAgfX0+e2xhYmVsfTo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWUudGV4dFByaW1hcnkgfX0+e3ZhbHVlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7c2NoZWR1bGVkICYmIChcclxuICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IDEsIGJhY2tncm91bmQ6IHRoZW1lLmJvcmRlciwgbWFyZ2luOiBgJHtsaW5lcy5sZW5ndGggPiAwID8gNiA6IDB9cHggLTJweCA2cHhgIH19IC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBmb250U2l6ZTogMTEsIG1hcmdpbkJvdHRvbTogMiB9fT5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFdlaWdodDogNTAwIH19PlN0YXJ0czo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSB9fT57c2NoZWR1bGVkLnN0YXJ0LnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JywgeWVhcjogJ251bWVyaWMnIH0pfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgZm9udFNpemU6IDExIH19PlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250V2VpZ2h0OiA1MDAgfX0+RW5kczo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSB9fT57c2NoZWR1bGVkLmVuZC50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLUdCJywgeyBkYXk6ICcyLWRpZ2l0JywgbW9udGg6ICdzaG9ydCcsIHllYXI6ICdudW1lcmljJyB9KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgey8qIEFjdGlvbnMgKi99XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICc0cHggMCcgfX0+XHJcbiAgICAgICAgICAgIDxNZW51SXRlbSBsYWJlbD1cIkNoYW5nZSBQcmlvcml0eVwiIGljb249XCJcdTJCMDZcIiB0aGVtZT17dGhlbWV9IG9uQ2xpY2s9eygpID0+IG9uTW9kZUNoYW5nZSgncHJpb3JpdHknKX0gLz5cclxuICAgICAgICAgICAgPE1lbnVJdGVtIGxhYmVsPVwiQ2hhbmdlIFN0YXR1c1wiIGljb249XCJcdTI1QzlcIiB0aGVtZT17dGhlbWV9IG9uQ2xpY2s9eygpID0+IG9uTW9kZUNoYW5nZSgnc3RhdHVzJyl9IC8+XHJcbiAgICAgICAgICAgIHtkaXNwbGF5U3RhdHVzID09PSAnUnVubmluZycgJiYgKFxyXG4gICAgICAgICAgICAgIDxNZW51SXRlbSBsYWJlbD1cIkNoYW5nZSBTdGFydCBEYXRlXCIgaWNvbj1cIlx1RDgzRFx1RENDNVwiIHRoZW1lPXt0aGVtZX0gb25DbGljaz17KCkgPT4gb25Nb2RlQ2hhbmdlKCdzdGFydF9kYXRlJyl9IC8+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDxNZW51SXRlbSBsYWJlbD1cIkVkaXQgVGVzdFwiIGljb249XCJcdTI3MEVcIiB0aGVtZT17dGhlbWV9IG9uQ2xpY2s9e29uRWRpdFRlc3R9IC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8Lz5cclxuICAgICAgKSA6IG1vZGUgPT09ICdwcmlvcml0eScgPyAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMTRweCA4cHgnLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDggfX0+XHJcbiAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IG9uTW9kZUNoYW5nZSgncm9vdCcpfSBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFNpemU6IDE2LCBsaW5lSGVpZ2h0OiAxIH19Plx1MjE5MDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5IH19PkNoYW5nZSBQcmlvcml0eTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNHB4JyB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIG1hcmdpbkJvdHRvbTogOCB9fT5FbnRlciBwcmlvcml0eSAoMFx1MjAxMzEwMCk6PC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgICAgICAgIG1pbj17MH1cclxuICAgICAgICAgICAgICBtYXg9ezEwMH1cclxuICAgICAgICAgICAgICBhdXRvRm9jdXNcclxuICAgICAgICAgICAgICB2YWx1ZT17cHJpb3JpdHlJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25Qcmlvcml0eUlucHV0Q2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICBvbktleURvd249eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIG9uQ29uZmlybVByaW9yaXR5KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBvbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDhweCcsIGZvbnRTaXplOiAxMywgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJTdHJvbmd9YCwgb3V0bGluZTogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiA4LCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29uZmlybVByaW9yaXR5fVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgZmxleDogMSwgcGFkZGluZzogJzZweCAwJywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCwgY29sb3I6IHRoZW1lLmFjY2VudEZnLCBib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsIGN1cnNvcjogJ3BvaW50ZXInLCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+Q29uZmlybTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e29uQ2xvc2V9IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyB9fT5DYW5jZWw8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICkgOiBtb2RlID09PSAnc3RhdHVzJyA/IChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNHB4IDhweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCB9fT5cclxuICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4gb25Nb2RlQ2hhbmdlKCdyb290Jyl9IHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250U2l6ZTogMTYsIGxpbmVIZWlnaHQ6IDEgfX0+XHUyMTkwPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnkgfX0+Q2hhbmdlIFN0YXR1czwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnNHB4IDAnIH19PlxyXG4gICAgICAgICAgICB7c3RhdHVzT3B0aW9uc0xpc3QubWFwKChzKSA9PiAoXHJcbiAgICAgICAgICAgICAgPE1lbnVJdGVtIGtleT17c30gbGFiZWw9e3MgPT09ICdOVUxMJyA/ICdDbGVhciBTdGF0dXMgKE5VTEwpJyA6IHN9IHRoZW1lPXt0aGVtZX0gb25DbGljaz17KCkgPT4gb25QaWNrU3RhdHVzKHMpfSAvPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDE0cHggOHB4JywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4IH19PlxyXG4gICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ3Jvb3QnKX0gc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRTaXplOiAxNiwgbGluZUhlaWdodDogMSB9fT5cdTIxOTA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSB9fT5DaGFuZ2UgU3RhcnQgRGF0ZTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNHB4JyB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIG1hcmdpbkJvdHRvbTogOCB9fT5FbnRlciBuZXcgc3RhcnQgZGF0ZTo8L2Rpdj5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxyXG4gICAgICAgICAgICAgIGF1dG9Gb2N1c1xyXG4gICAgICAgICAgICAgIHZhbHVlPXtzdGFydERhdGVJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25TdGFydERhdGVJbnB1dENoYW5nZShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBvbkNvbmZpcm1TdGFydERhdGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIG9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLCBib3hTaXppbmc6ICdib3JkZXItYm94JyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggOHB4JywgZm9udFNpemU6IDEzLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlclN0cm9uZ31gLCBvdXRsaW5lOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IDgsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25Db25maXJtU3RhcnREYXRlfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFzdGFydERhdGVJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgZmxleDogMSwgcGFkZGluZzogJzZweCAwJywgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHN0YXJ0RGF0ZUlucHV0VmFsdWUgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS5ib3JkZXIsXHJcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBzdGFydERhdGVJbnB1dFZhbHVlID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0TXV0ZWQsXHJcbiAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cywgY3Vyc29yOiBzdGFydERhdGVJbnB1dFZhbHVlID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+Q29uZmlybTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e29uQ2xvc2V9IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgY3Vyc29yOiAncG9pbnRlcicsIHRleHREZWNvcmF0aW9uOiAndW5kZXJsaW5lJyB9fT5DYW5jZWw8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFNhdmUgT3ZlcmxheVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFNhdmVPdmVybGF5UHJvcHMge1xyXG4gIGlzRXJyb3I6IGJvb2xlYW47XHJcbiAgdGhlbWU6IFRoZW1lVG9rZW5zO1xyXG4gIG9uUmV0cnk6ICgpID0+IHZvaWQ7XHJcbiAgb25EaXNjYXJkOiAoKSA9PiB2b2lkO1xyXG59XHJcblxyXG5jb25zdCBTYXZlT3ZlcmxheTogRkM8U2F2ZU92ZXJsYXlQcm9wcz4gPSAoeyBpc0Vycm9yLCB0aGVtZSwgb25SZXRyeSwgb25EaXNjYXJkIH0pID0+IChcclxuICA8ZGl2IHN0eWxlPXt7XHJcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgaW5zZXQ6IDAsIHpJbmRleDogMjAwMCxcclxuICAgIGJhY2tncm91bmQ6IHRoZW1lLmlzRGFyayA/ICdyZ2JhKDI4LDI4LDQ2LDAuODIpJyA6ICdyZ2JhKDI0OSwyNTAsMjUxLDAuODIpJyxcclxuICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgfX0+XHJcbiAgICB7IWlzRXJyb3IgPyAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogMTIgfX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgd2lkdGg6IDMyLCBoZWlnaHQ6IDMyLCBib3JkZXJSYWRpdXM6ICc1MCUnLFxyXG4gICAgICAgICAgYm9yZGVyOiBgM3B4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJvcmRlclRvcENvbG9yOiB0aGVtZS5hY2NlbnQsXHJcbiAgICAgICAgICBhbmltYXRpb246ICdjY2wtc3BpbiAwLjdzIGxpbmVhciBpbmZpbml0ZScsXHJcbiAgICAgICAgfX0gLz5cclxuICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnkgfX0+U2F2aW5nXHUyMDI2PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICkgOiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlLCBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNYbCxcclxuICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAyMHB4IHJnYmEoMCwwLDAsMC4xMiknLCBwYWRkaW5nOiAnMjRweCAyOHB4JyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMixcclxuICAgICAgICBtYXhXaWR0aDogMzAwLFxyXG4gICAgICB9fT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogNDAsIGhlaWdodDogNDAsIGJvcmRlclJhZGl1czogJzUwJScsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyAnIzNCMDAwMCcgOiAnI0ZFRjJGMicsXHJcbiAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5pc0RhcmsgPyAnIzdGMUQxRCcgOiAnI0ZFQ0FDQSd9YCxcclxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICAgIGZvbnRTaXplOiAyMCwgY29sb3I6ICcjRUY0NDQ0JywgZm9udFdlaWdodDogNzAwLFxyXG4gICAgICAgIH19PiE8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNzAwLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnkgfX0+U2F2ZSBmYWlsZWQ8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgdGV4dEFsaWduOiAnY2VudGVyJywgbGluZUhlaWdodDogMS41IH19PlxyXG4gICAgICAgICAgVGhlIGFsbG9jYXRpb24gY291bGQgbm90IGJlIHNhdmVkLiBZb3UgY2FuIHJldHJ5IG9yIGRpc2NhcmQgeW91ciBjaGFuZ2VzLlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIG1hcmdpblRvcDogNCB9fT5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgb25DbGljaz17b25EaXNjYXJkfVxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTZweCcsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJTdHJvbmd9YCwgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnksIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+RGlzY2FyZDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICBvbkNsaWNrPXtvblJldHJ5fVxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICc3cHggMTZweCcsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LCBjb2xvcjogdGhlbWUuYWNjZW50RmcsXHJcbiAgICAgICAgICAgICAgYm94U2hhZG93OiBgMCAxcHggM3B4ICR7dGhlbWUuYWNjZW50fTREYCxcclxuICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlJldHJ5PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKX1cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gQWxsb2NhdGlvbiBIZWxwZXJzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBidWlsZEFsbG9jYXRpb25zID0gKHN0YW5kczogSW50ZXJuYWxTdGFuZFtdKTogQWxsb2NhdGlvblJlY29yZFtdID0+IHtcclxuICBjb25zdCBhbGxvY2F0aW9uczogQWxsb2NhdGlvblJlY29yZFtdID0gW107XHJcbiAgc3RhbmRzLmZvckVhY2goc3RhbmQgPT4ge1xyXG4gICAgc3RhbmQudGVzdHMuZm9yRWFjaCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgIGFsbG9jYXRpb25zLnB1c2goe1xyXG4gICAgICAgIHRlc3RfaWQ6IHRlc3QuaWQsXHJcbiAgICAgICAgdGVzdF9zdGFuZF9pZDogc3RhbmQuaWQsXHJcbiAgICAgICAgcHJpb3JpdHlfb3JkZXI6IGlkeCArIDEsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGFsbG9jYXRpb25zO1xyXG59O1xyXG5cclxuY29uc3QgYWxsb2NhdGlvbnNLZXkgPSAoYWxsb2NzOiBBbGxvY2F0aW9uUmVjb3JkW10pOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShhbGxvY3MubWFwKGEgPT4gYCR7YS50ZXN0X2lkfToke2EudGVzdF9zdGFuZF9pZH06JHthLnByaW9yaXR5X29yZGVyfWApLnNvcnQoKSk7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZVN0YW5kcyA9IChcclxuICB0ZXN0c0FycjogYW55W10sXHJcbiAgc3RhbmRzQXJyOiBTdGFuZERlZltdLFxyXG4gIGNoSG91cnM6IG51bWJlclxyXG4pOiB7IHN0YW5kczogSW50ZXJuYWxTdGFuZFtdOyB1bmFsbG9jYXRlZDogVGVzdERhdGFbXSB9ID0+IHtcclxuICBjb25zdCBzdGFuZE1hcCA9IG5ldyBNYXA8bnVtYmVyIHwgc3RyaW5nLCBJbnRlcm5hbFN0YW5kPigpO1xyXG4gIHN0YW5kc0Fyci5mb3JFYWNoKHMgPT4gc3RhbmRNYXAuc2V0KHMuaWQsIHtcclxuICAgIGlkOiBzLmlkLFxyXG4gICAgbmFtZTogcy5uYW1lLFxyXG4gICAgdGVzdHM6IFtdLFxyXG4gICAgY2hhbmdlb3Zlcl9ob3Vyczogcy5jaGFuZ2VvdmVyX2hvdXJzID8/IGNoSG91cnMsXHJcbiAgICBub25Xb3JraW5nQmxvY2tzOiBwYXJzZU5vbldvcmtpbmdCbG9ja3Mocy5ub25fd29ya2luZyksXHJcbiAgfSkpO1xyXG5cclxuICBjb25zdCB1bmFsbG9jYXRlZDogVGVzdERhdGFbXSA9IFtdO1xyXG4gIHRlc3RzQXJyLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG4gICAgY29uc3QgdGVzdDogVGVzdERhdGEgPSB7XHJcbiAgICAgIGlkOiB0LmlkLFxyXG4gICAgICBuYW1lOiB0Lm5hbWUgfHwgJycsXHJcbiAgICAgIGR1cmF0aW9uOiB0LmR1cmF0aW9uIHx8IDcyLFxyXG4gICAgICBvd25lcjogdC5vd25lciB8fCAnJyxcclxuICAgICAgcHJpb3JpdHk6IHQucHJpb3JpdHkgPz8gNTAsXHJcbiAgICAgIG5vdGVzOiB0Lm5vdGVzIHx8ICcnLFxyXG4gICAgICBzdGF0dXM6IHQuc3RhdHVzIHx8ICcnLFxyXG4gICAgICB0ZXN0X3N0YW5kX2lkOiB0LnRlc3Rfc3RhbmRfaWQsXHJcbiAgICAgIHByaW9yaXR5X29yZGVyOiB0LnByaW9yaXR5X29yZGVyLFxyXG4gICAgICBhbGxvY2F0aW9uX2lkOiB0LmFsbG9jYXRpb25faWQsXHJcbiAgICAgIGFzc2lnbmVkX3BhcnRzOiB0LmFzc2lnbmVkX3BhcnRzIHx8IG51bGwsXHJcbiAgICAgIHBhcnRfcmVhZHlfZGF0ZTogdC5wYXJ0X3JlYWR5X2RhdGUgfHwgbnVsbCxcclxuICAgICAgcGFydF9zdGF0dXM6IHQucGFydF9zdGF0dXMgfHwgJycsXHJcbiAgICAgIHRlc3Rfc3RhcnRlZF9kYXRlOiB0LnRlc3Rfc3RhcnRlZF9kYXRlIHx8IG51bGwsXHJcbiAgICAgIC4uLnQsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0ZXN0LnRlc3Rfc3RhbmRfaWQgIT0gbnVsbCAmJiBzdGFuZE1hcC5oYXModGVzdC50ZXN0X3N0YW5kX2lkKSkge1xyXG4gICAgICBzdGFuZE1hcC5nZXQodGVzdC50ZXN0X3N0YW5kX2lkKSEudGVzdHMucHVzaCh0ZXN0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVuYWxsb2NhdGVkLnB1c2godGVzdCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHN0YW5kTWFwLmZvckVhY2gocyA9PiB7XHJcbiAgICBzLnRlc3RzLnNvcnQoKGEsIGIpID0+IChhLnByaW9yaXR5X29yZGVyIHx8IDk5OSkgLSAoYi5wcmlvcml0eV9vcmRlciB8fCA5OTkpKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YW5kczogc3RhbmRzQXJyLm1hcChzID0+IHN0YW5kTWFwLmdldChzLmlkKSEpLFxyXG4gICAgdW5hbGxvY2F0ZWQsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBNYWluIENvbXBvbmVudFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuZXhwb3J0IGNvbnN0IFRlc3RTdGFuZFNjaGVkdWxlcjogRkMgPSAoKSA9PiB7XHJcbiAgLy8gXHUyNTAwXHUyNTAwIElucHV0IGRhdGEgZnJvbSBSZXRvb2wgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW2lucHV0VGVzdHNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJ0ZXN0c1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJUZXN0cyBEYXRhXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiB0ZXN0IG9iamVjdHMgZnJvbSBnZXRTY2hlZHVsZXJEYXRhIHF1ZXJ5XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtpbnB1dFN0YW5kc10gPSBSZXRvb2wudXNlU3RhdGVBcnJheSh7XHJcbiAgICBuYW1lOiBcInRlc3RTdGFuZHNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiVGVzdCBTdGFuZHMgRGF0YVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2YgdGVzdCBzdGFuZCBvYmplY3RzIGZyb20gZ2V0VGVzdFN0YW5kcyBxdWVyeVwiLFxyXG4gIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQ29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFtzYXZlTW9kZV0gPSBSZXRvb2wudXNlU3RhdGVFbnVtZXJhdGlvbih7XHJcbiAgICBuYW1lOiBcInNhdmVNb2RlXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiYmF0Y2hcIixcclxuICAgIGVudW1EZWZpbml0aW9uOiBbXCJiYXRjaFwiLCBcImxpdmVcIl0sXHJcbiAgICBpbnNwZWN0b3I6IFwic2VnbWVudGVkXCIsXHJcbiAgICBsYWJlbDogXCJTYXZlIE1vZGVcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcImJhdGNoID0gc2F2ZSBidXR0b24sIGxpdmUgPSBlbWl0IG9uIGV2ZXJ5IGNoYW5nZVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaXNTYXZpbmddID0gUmV0b29sLnVzZVN0YXRlQm9vbGVhbih7XHJcbiAgICBuYW1lOiBcImlzU2F2aW5nXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgaW5zcGVjdG9yOiBcImNoZWNrYm94XCIsXHJcbiAgICBsYWJlbDogXCJJcyBTYXZpbmdcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG86IHt7IHNhdmVBbGxvY2F0aW9ucy5pc0ZldGNoaW5nIH19XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtoYXNTYXZlRXJyb3JdID0gUmV0b29sLnVzZVN0YXRlQm9vbGVhbih7XHJcbiAgICBuYW1lOiBcImhhc1NhdmVFcnJvclwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgIGluc3BlY3RvcjogXCJjaGVja2JveFwiLFxyXG4gICAgbGFiZWw6IFwiSGFzIFNhdmUgRXJyb3JcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG86IHt7ICEhc2F2ZUFsbG9jYXRpb25zLmVycm9yIH19XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtzYXZlZEF0XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNhdmVkQXRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJTYXZlZCBBdFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQmluZCB0bzoge3sgc2F2ZUFsbG9jYXRpb25zLmxhc3RSdW5BdCB9fVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaXNTYXZpbmdEYXRlc10gPSBSZXRvb2wudXNlU3RhdGVCb29sZWFuKHtcclxuICAgIG5hbWU6IFwiaXNTYXZpbmdEYXRlc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgIGluc3BlY3RvcjogXCJjaGVja2JveFwiLFxyXG4gICAgbGFiZWw6IFwiSXMgU2F2aW5nIFBsYW5uZWQgRGF0ZXNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG86IHt7IHNhdmVQbGFubmVkRGF0ZXMuaXNGZXRjaGluZyB9fVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaGFzU2F2ZURhdGVzRXJyb3JdID0gUmV0b29sLnVzZVN0YXRlQm9vbGVhbih7XHJcbiAgICBuYW1lOiBcImhhc1NhdmVEYXRlc0Vycm9yXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgaW5zcGVjdG9yOiBcImNoZWNrYm94XCIsXHJcbiAgICBsYWJlbDogXCJIYXMgU2F2ZSBEYXRlcyBFcnJvclwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQmluZCB0bzoge3sgISFzYXZlUGxhbm5lZERhdGVzLmVycm9yIH19XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtjaGFuZ2VvdmVySG91cnNdID0gUmV0b29sLnVzZVN0YXRlTnVtYmVyKHtcclxuICAgIG5hbWU6IFwiY2hhbmdlb3ZlckhvdXJzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IDMsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiQ2hhbmdlb3ZlciBIb3Vyc1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiSG91cnMgZm9yIGNoYW5nZW92ZXIgYmV0d2VlbiB0ZXN0cyAod29yayBob3VycyBvbmx5KVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbd29ya1N0YXJ0XSA9IFJldG9vbC51c2VTdGF0ZU51bWJlcih7XHJcbiAgICBuYW1lOiBcIndvcmtTdGFydFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiA5LFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIldvcmsgU3RhcnQgSG91clwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbd29ya0VuZF0gPSBSZXRvb2wudXNlU3RhdGVOdW1iZXIoe1xyXG4gICAgbmFtZTogXCJ3b3JrRW5kXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IDE3LFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIldvcmsgRW5kIEhvdXJcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2luaXRpYWxWaWV3V2Vla3NTdHJdID0gUmV0b29sLnVzZVN0YXRlRW51bWVyYXRpb24oe1xyXG4gICAgbmFtZTogXCJkZWZhdWx0Vmlld1dlZWtzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiNFwiLFxyXG4gICAgZW51bURlZmluaXRpb246IFtcIjJcIiwgXCI0XCIsIFwiOFwiLCBcIjEyXCIsIFwiMjRcIl0sXHJcbiAgICBpbnNwZWN0b3I6IFwic2VnbWVudGVkXCIsXHJcbiAgICBsYWJlbDogXCJEZWZhdWx0IFZpZXdcIixcclxuICB9KTtcclxuICBjb25zdCBpbml0aWFsVmlld1dlZWtzID0gTnVtYmVyKGluaXRpYWxWaWV3V2Vla3NTdHIpIHx8IDQ7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBDb25maWd1cmFibGUgZGlzcGxheSB0ZW1wbGF0ZXMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW2NhcmRNYWluVGV4dF0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjYXJkTWFpblRleHRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJ7bmFtZX1cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDYXJkIFRpdGxlXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3IgY2FyZCB0aXRsZS4gVXNlIHtmaWVsZE5hbWV9IGZvciBkYXRhIGZpZWxkcy5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2NhcmRTdWJUZXh0XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNhcmRTdWJUZXh0XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiUGFydHM6IHtwYXJ0X3JlYWR5X2RhdGV9XCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiQ2FyZCBTdWJ0aXRsZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiVGVtcGxhdGUgZm9yIHN1YnRpdGxlLiBIaWRkZW4gd2hlbiBhbGwgZmllbGRzIGFyZSBlbXB0eS5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2NhcmRJbmZvUm93XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNhcmRJbmZvUm93XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwie293bmVyfSBcXHUwMGI3IHtkdXJhdGlvbn1oIFxcdTAwYjcgUHtwcmlvcml0eX1cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDYXJkIEluZm8gUm93XCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3IgdGhlIGluZm8gcm93IHNob3duIG9uIGNhcmRzIGFuZCBiYXJzLlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbdG9vbHRpcFRlbXBsYXRlXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInRvb2x0aXBUZW1wbGF0ZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIk5vdGVzOiB7bm90ZXN9XFxuT3duZXI6IHtvd25lcn1cXG5Qcmlvcml0eToge3ByaW9yaXR5fVxcblBhcnQgU3RhdHVzOiB7cGFydF9zdGF0dXN9XFxuUGFydHMgRHVlOiB7cGFydF9yZWFkeV9kYXRlfVxcbkFzc2lnbmVkIFBhcnRzOiB7YXNzaWduZWRfcGFydHN9XCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiVG9vbHRpcCBUZW1wbGF0ZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiVGVtcGxhdGUgZm9yIGhvdmVyIHRvb2x0aXAuIFVzZSBcXFxcbiBmb3IgbmV3bGluZXMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtzdGF0dXNPcHRpb25zXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwic3RhdHVzT3B0aW9uc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXCJOVUxMXCIsIFwiUnVubmluZ1wiLCBcIkNyZWF0ZWRcIiwgXCJUZXN0ZWRcIiwgXCJDYW5jZWxsZWRcIl0sXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiU3RhdHVzIE9wdGlvbnNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlN0YXR1cyBzdHJpbmdzIHNob3duIGluIHRoZSByaWdodC1jbGljayBDaGFuZ2UgU3RhdHVzIG1lbnUuICdOVUxMJyBjbGVhcnMgdGhlIHN0YXR1cy5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFRoZW1lIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFthcHBUaGVtZV0gPSBSZXRvb2wudXNlU3RhdGVPYmplY3Qoe1xyXG4gICAgbmFtZTogXCJhcHBUaGVtZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiB7fSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJBcHAgVGhlbWVcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG8ge3sgdGhlbWUgfX0gdG8gaW5oZXJpdCBhcHAgY29sb3VycywgZm9udHMsIGFuZCBib3JkZXIgcmFkaXVzXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIE9wdGlvbmFsIHN0YXR1cyBjb2xvdXIgb3ZlcnJpZGVzIChsZWF2ZSBibGFuayB0byB1c2UgZGVmYXVsdHMpXHJcbiAgY29uc3QgW2NvbG9yUnVubmluZ10gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjb2xvclJ1bm5pbmdcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJSdW5uaW5nIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgUnVubmluZyBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjOTMzM0VBKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JSZWFkeV0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjb2xvclJlYWR5XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiUmVhZHkgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBSZWFkeSBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjMjJDNTVFKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JPblRpbWVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JPblRpbWVcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJPbiBUaW1lIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgT24gVGltZSBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjRTVBMDBEKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JEZWxheWVkXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNvbG9yRGVsYXllZFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkRlbGF5ZWQgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBEZWxheWVkIHN0YXR1cy4gTGVhdmUgYmxhbmsgdG8gdXNlIGRlZmF1bHQgKCNFRjQ0NDQpLlwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IFtjb2xvclBhcnRzTm90QXNzaWduZWRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JQYXJ0c05vdEFzc2lnbmVkXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiUGFydHMgTm90IEFzc2lnbmVkIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgUGFydHMgTm90IEFzc2lnbmVkIHN0YXR1cy4gTGVhdmUgYmxhbmsgdG8gdXNlIGRlZmF1bHQgKCM5Q0EzQUYpLlwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IFtjb2xvckluUHJvZ3Jlc3NdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JJblByb2dyZXNzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiSW4gUHJvZ3Jlc3MgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBJbiBQcm9ncmVzcyBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjRTVBMDBEKS5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEJ1aWxkIHRoZW1lIHRva2VucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB0aGVtZSA9IHVzZU1lbW8oKCk6IFRoZW1lVG9rZW5zID0+IHtcclxuICAgIGNvbnN0IHN0YXR1c092ZXJyaWRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gICAgaWYgKGNvbG9yUnVubmluZykgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snUnVubmluZyddICAgICAgICAgICAgPSBjb2xvclJ1bm5pbmcgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yUmVhZHkpICAgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snUmVhZHknXSAgICAgICAgICAgICAgPSBjb2xvclJlYWR5IGFzIHN0cmluZztcclxuICAgIGlmIChjb2xvck9uVGltZSkgICAgICAgICAgICBzdGF0dXNPdmVycmlkZXNbJ09uIFRpbWUnXSAgICAgICAgICAgID0gY29sb3JPblRpbWUgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yRGVsYXllZCkgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snRGVsYXllZCddICAgICAgICAgICAgPSBjb2xvckRlbGF5ZWQgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yUGFydHNOb3RBc3NpZ25lZCkgIHN0YXR1c092ZXJyaWRlc1snUGFydHMgTm90IEFzc2lnbmVkJ10gPSBjb2xvclBhcnRzTm90QXNzaWduZWQgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9ySW5Qcm9ncmVzcykgICAgICAgIHN0YXR1c092ZXJyaWRlc1snSW4gUHJvZ3Jlc3MnXSAgICAgICAgPSBjb2xvckluUHJvZ3Jlc3MgYXMgc3RyaW5nO1xyXG4gICAgcmV0dXJuIGJ1aWxkVGhlbWUoYXBwVGhlbWUsIHN0YXR1c092ZXJyaWRlcyk7XHJcbiAgfSwgW2FwcFRoZW1lLCBjb2xvclJ1bm5pbmcsIGNvbG9yUmVhZHksIGNvbG9yT25UaW1lLCBjb2xvckRlbGF5ZWQsIGNvbG9yUGFydHNOb3RBc3NpZ25lZCwgY29sb3JJblByb2dyZXNzXSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBPdXRwdXQgc3RhdGUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgWywgc2V0QWxsb2NhdGlvbnNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJhbGxvY2F0aW9uc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkN1cnJlbnQgYWxsb2NhdGlvbiBzdGF0ZTogW3t0ZXN0X2lkLCB0ZXN0X3N0YW5kX2lkLCBwcmlvcml0eV9vcmRlcn1dXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldEFsbFRlc3RJZHNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJhbGxUZXN0SWRzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQWxsIHRlc3QgSURzIG1hbmFnZWQgYnkgdGhlIHNjaGVkdWxlciAoZm9yIHRoZSBkZWxldGUgc3RlcCBpbiBzYXZlKVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRIYXNVbnNhdmVkQ2hhbmdlc10gPSBSZXRvb2wudXNlU3RhdGVCb29sZWFuKHtcclxuICAgIG5hbWU6IFwiaGFzVW5zYXZlZENoYW5nZXNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJXaGV0aGVyIHRoZXJlIGFyZSB1bnNhdmVkIGFsbG9jYXRpb24gY2hhbmdlc1wiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRTZWxlY3RlZFRlc3RJZF0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJzZWxlY3RlZFRlc3RJZFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiSUQgb2YgdGVzdCBhY3Rpb25lZCB2aWEgcmlnaHQtY2xpY2sgbWVudSAoc2V0IGJlZm9yZSBldmVudHMgZmlyZSlcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0UHJpb3JpdHldID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwic2VsZWN0ZWRUZXN0UHJpb3JpdHlcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIk5ldyBwcmlvcml0eSB2YWx1ZSBmcm9tIENoYW5nZSBQcmlvcml0eSBhY3Rpb24gKG51bWVyaWMgc3RyaW5nKVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRTZWxlY3RlZFRlc3RTdGFydERhdGVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwic2VsZWN0ZWRUZXN0U3RhcnREYXRlXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJOZXcgc3RhcnQgZGF0ZSBmcm9tIENoYW5nZSBTdGFydCBEYXRlIGFjdGlvbiAoSVNPIGRhdGUgc3RyaW5nIFlZWVktTU0tREQpLiBPbmx5IHNldCBmb3IgUnVubmluZyB0ZXN0cy5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0U3RhdHVzXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdFN0YXR1c1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTmV3IHN0YXR1cyBmcm9tIENoYW5nZSBTdGF0dXMgYWN0aW9uLiBFbXB0eSBzdHJpbmcgPSBOVUxMIGluIERCLlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRQbGFubmVkRGF0ZXNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJwbGFubmVkRGF0ZXNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiB7dGVzdF9pZCwgcGxhbm5lZF9kYXRlfSBmb3IgYWxsIHN0YW5kLXNjaGVkdWxlZCB0ZXN0cy4gVXNlIHdpdGggc2F2ZVBsYW5uZWREYXRlcyBxdWVyeS5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEV2ZW50cyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBvblNhdmUgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25TYXZlXCIgfSk7XHJcbiAgY29uc3Qgb25DaGFuZ2UgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25DaGFuZ2VcIiB9KTtcclxuICBjb25zdCBvblJldHJ5ID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uUmV0cnlcIiB9KTtcclxuICBjb25zdCBvbkNoYW5nZVByaW9yaXR5ID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlUHJpb3JpdHlcIiB9KTtcclxuICBjb25zdCBvbkNoYW5nZVN0YXR1cyA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvbkNoYW5nZVN0YXR1c1wiIH0pO1xyXG4gIGNvbnN0IG9uQ2hhbmdlU3RhcnREYXRlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlU3RhcnREYXRlXCIgfSk7XHJcbiAgY29uc3Qgb25FZGl0VGVzdCA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvbkVkaXRUZXN0XCIgfSk7XHJcbiAgY29uc3Qgb25TYXZlUGxhbm5lZERhdGVzID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uU2F2ZVBsYW5uZWREYXRlc1wiIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQ29tcG9uZW50IHNldHRpbmdzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIFJldG9vbC51c2VDb21wb25lbnRTZXR0aW5ncyh7XHJcbiAgICBkZWZhdWx0SGVpZ2h0OiA2MDAsXHJcbiAgICBkZWZhdWx0V2lkdGg6IDEyLFxyXG4gIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgSW50ZXJuYWwgc3RhdGUgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW3N0YW5kcywgc2V0U3RhbmRzXSA9IFJlYWN0LnVzZVN0YXRlPEludGVybmFsU3RhbmRbXT4oW10pO1xyXG4gIGNvbnN0IFt1bmFsbG9jYXRlZCwgc2V0VW5hbGxvY2F0ZWRdID0gUmVhY3QudXNlU3RhdGU8VGVzdERhdGFbXT4oW10pO1xyXG4gIGNvbnN0IFt2aWV3cG9ydFdlZWtzLCBzZXRWaWV3cG9ydFdlZWtzXSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oaW5pdGlhbFZpZXdXZWVrcyB8fCA0KTtcclxuICBjb25zdCB1c2VyQ2hhbmdlZFZpZXdwb3J0ID0gUmVhY3QudXNlUmVmKGZhbHNlKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgd2Vla3MgPSBOdW1iZXIoaW5pdGlhbFZpZXdXZWVrc1N0cik7XHJcbiAgICBpZiAod2Vla3MgJiYgIXVzZXJDaGFuZ2VkVmlld3BvcnQuY3VycmVudCkgc2V0Vmlld3BvcnRXZWVrcyh3ZWVrcyk7XHJcbiAgfSwgW2luaXRpYWxWaWV3V2Vla3NTdHJdKTtcclxuICBjb25zdCBbZHJhZ2dlZFRlc3RJZCwgc2V0RHJhZ2dlZFRlc3RJZF0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmcgfCBudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaW5zZXJ0SW5kaWNhdG9yLCBzZXRJbnNlcnRJbmRpY2F0b3JdID0gUmVhY3QudXNlU3RhdGU8SW5zZXJ0SW5kaWNhdG9yIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3F1ZXVlSW5zZXJ0SW5kZXgsIHNldFF1ZXVlSW5zZXJ0SW5kZXhdID0gUmVhY3QudXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2lzRGlydHksIHNldElzRGlydHldID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwZW5kaW5nU2F2ZSwgc2V0UGVuZGluZ1NhdmVdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzYXZlRXJyb3IsIHNldFNhdmVFcnJvcl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3BvcG92ZXIsIHNldFBvcG92ZXJdID0gUmVhY3QudXNlU3RhdGU8UG9wb3ZlclN0YXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3ByaW9yaXR5SW5wdXRWYWx1ZSwgc2V0UHJpb3JpdHlJbnB1dFZhbHVlXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJycpO1xyXG4gIGNvbnN0IFtzdGFydERhdGVJbnB1dFZhbHVlLCBzZXRTdGFydERhdGVJbnB1dFZhbHVlXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZz4oJycpO1xyXG4gIGNvbnN0IFtwZW5kaW5nU2F2ZURhdGVzLCBzZXRQZW5kaW5nU2F2ZURhdGVzXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2F2ZURhdGVzRXJyb3IsIHNldFNhdmVEYXRlc0Vycm9yXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBwb3BvdmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcclxuICBjb25zdCBpc0xvY2tlZCA9IHBlbmRpbmdTYXZlIHx8IChpc1NhdmluZyBhcyBib29sZWFuKSB8fCBzYXZlRXJyb3I7XHJcbiAgY29uc3QgaXNEYXRlc1NhdmluZyA9IHBlbmRpbmdTYXZlRGF0ZXMgfHwgKGlzU2F2aW5nRGF0ZXMgYXMgYm9vbGVhbikgfHwgc2F2ZURhdGVzRXJyb3I7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoaXNTYXZpbmcgYXMgYm9vbGVhbikge1xyXG4gICAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7IC8vIFJldG9vbCBoYXMgcGlja2VkIHVwIHRoZSBzYXZlOyBkcm9wIG91ciBsb2NhbCBwZW5kaW5nIGZsYWdcclxuICAgIH1cclxuICAgIGlmIChoYXNTYXZlRXJyb3IgYXMgYm9vbGVhbikge1xyXG4gICAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7XHJcbiAgICAgIHNldFNhdmVFcnJvcih0cnVlKTtcclxuICAgIH0gZWxzZSBpZiAoIShpc1NhdmluZyBhcyBib29sZWFuKSkge1xyXG4gICAgICAvLyBOb3Qgc2F2aW5nIGFuZCBubyBlcnJvciA9IGlkbGU7IGNsZWFyIGVycm9yIChjb3ZlcnMgcmVjb3ZlcnkgYWZ0ZXIgcmV0cnkpXHJcbiAgICAgIHNldFNhdmVFcnJvcihmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2lzU2F2aW5nLCBoYXNTYXZlRXJyb3JdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChpc1NhdmluZ0RhdGVzIGFzIGJvb2xlYW4pIHtcclxuICAgICAgc2V0UGVuZGluZ1NhdmVEYXRlcyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoaGFzU2F2ZURhdGVzRXJyb3IgYXMgYm9vbGVhbikge1xyXG4gICAgICBzZXRQZW5kaW5nU2F2ZURhdGVzKGZhbHNlKTtcclxuICAgICAgc2V0U2F2ZURhdGVzRXJyb3IodHJ1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKCEoaXNTYXZpbmdEYXRlcyBhcyBib29sZWFuKSkge1xyXG4gICAgICBzZXRTYXZlRGF0ZXNFcnJvcihmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2lzU2F2aW5nRGF0ZXMsIGhhc1NhdmVEYXRlc0Vycm9yXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBvcG92ZXIpIHJldHVybjtcclxuICAgIGNvbnN0IG9uTW91c2VEb3duID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudCAmJiAhcG9wb3ZlclJlZi5jdXJyZW50LmNvbnRhaW5zKGUudGFyZ2V0IGFzIE5vZGUpKVxyXG4gICAgICAgIHNldFBvcG92ZXIobnVsbCk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25LZXlEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHsgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgc2V0UG9wb3ZlcihudWxsKTsgfTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcclxuICAgIH07XHJcbiAgfSwgW3BvcG92ZXJdKTtcclxuXHJcbiAgY29uc3Qgb3JpZ2luYWxBbGxvY2F0aW9uc1JlZiA9IHVzZVJlZjxzdHJpbmc+KCcnKTtcclxuICBjb25zdCBwcmV2U2F2ZWRBdFJlZiA9IFJlYWN0LnVzZVJlZjxzdHJpbmc+KFwiXCIpO1xyXG4gIGNvbnN0IHNjcm9sbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBlbCA9IHNjcm9sbFJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgY29uc3Qgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZW50cmllcyA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xyXG4gICAgICAgIHNldENvbnRhaW5lcldpZHRoKGVudHJ5LmNvbnRlbnRSZWN0LndpZHRoIHx8IDgwMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcm8ub2JzZXJ2ZShlbCk7XHJcbiAgICByZXR1cm4gKCkgPT4gcm8uZGlzY29ubmVjdCgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gT3B0aW1pc3RpYyBzYXZlOiB3aGVuIHNhdmVkQXQgY2hhbmdlcyB0aGUgREIgd3JpdGUgc3VjY2VlZGVkIFx1MjAxNCBzbmFwc2hvdCB0aGVcclxuICAvLyBjdXJyZW50IHN0YXRlIGFzIHRoZSBuZXcgYmFzZWxpbmUgd2l0aG91dCB3YWl0aW5nIGZvciBhIGdldFNjaGVkdWxlckRhdGEgcmUtZmV0Y2guXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHRzID0gc2F2ZWRBdCBhcyBzdHJpbmc7XHJcbiAgICBpZiAoIXRzIHx8IHRzID09PSBwcmV2U2F2ZWRBdFJlZi5jdXJyZW50KSByZXR1cm47IC8vIHNraXAgaW5pdGlhbCBtb3VudCArIGR1cGxpY2F0ZXNcclxuICAgIHByZXZTYXZlZEF0UmVmLmN1cnJlbnQgPSB0cztcclxuICAgIC8vIFNuYXBzaG90IGN1cnJlbnQgYWxsb2NhdGlvbnMgYXMgdGhlIG5ldyBcIm9yaWdpbmFsXCIgc28gZGlydHktY2hlY2sgcmVzZXRzIGNvcnJlY3RseVxyXG4gICAgY29uc3QgY3VycmVudEFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMoc3RhbmRzKTtcclxuICAgIG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudCA9IGFsbG9jYXRpb25zS2V5KGN1cnJlbnRBbGxvY3MpO1xyXG4gICAgc2V0SXNEaXJ0eShmYWxzZSk7XHJcbiAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7XHJcbiAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gIH0sIFtzYXZlZEF0LCBzdGFuZHNdKTtcclxuICBjb25zdCBbY29udGFpbmVyV2lkdGgsIHNldENvbnRhaW5lcldpZHRoXSA9IFJlYWN0LnVzZVN0YXRlKDgwMCk7XHJcbiAgY29uc3QgW3F1ZXVlU29ydCwgc2V0UXVldWVTb3J0XSA9IFJlYWN0LnVzZVN0YXRlPCdheicgfCAncHJpb3JpdHknIHwgJ3N0YXR1cyc+KCdheicpO1xyXG4gIGNvbnN0IFtxdWV1ZUZpbHRlciwgc2V0UXVldWVGaWx0ZXJdID0gUmVhY3QudXNlU3RhdGUoJycpO1xyXG5cclxuICBjb25zdCBzdGF0dXNPcHRpb25zTGlzdCA9IHVzZU1lbW88c3RyaW5nW10+KCgpID0+IHtcclxuICAgIGNvbnN0IGFyciA9IEFycmF5LmlzQXJyYXkoc3RhdHVzT3B0aW9ucykgPyBzdGF0dXNPcHRpb25zIGFzIGFueVtdIDogW107XHJcbiAgICByZXR1cm4gYXJyLmxlbmd0aCA+IDAgPyBhcnIubWFwKFN0cmluZykgOiBbXCJOVUxMXCIsIFwiUnVubmluZ1wiLCBcIkNyZWF0ZWRcIiwgXCJUZXN0ZWRcIiwgXCJDYW5jZWxsZWRcIl07XHJcbiAgfSwgW3N0YXR1c09wdGlvbnNdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEluaXRpYWxpemUgZnJvbSBpbnB1dCBkYXRhIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGlucHV0S2V5ID0gdXNlTWVtbyhcclxuICAgICgpID0+IEpTT04uc3RyaW5naWZ5KGlucHV0VGVzdHMpICsgSlNPTi5zdHJpbmdpZnkoaW5wdXRTdGFuZHMpLFxyXG4gICAgW2lucHV0VGVzdHMsIGlucHV0U3RhbmRzXVxyXG4gICk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB0ZXN0c0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRUZXN0cykgPyBpbnB1dFRlc3RzIDogW107XHJcbiAgICBjb25zdCBzdGFuZHNBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0U3RhbmRzKSA/IChpbnB1dFN0YW5kcyBhcyBTdGFuZERlZltdKSA6IFtdO1xyXG5cclxuICAgIGlmIChzdGFuZHNBcnIubGVuZ3RoID09PSAwICYmIHRlc3RzQXJyLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgc3RhbmRzOiBuZXdTdGFuZHMsIHVuYWxsb2NhdGVkOiB1bmFsbG9jIH0gPSBwYXJzZVN0YW5kcyh0ZXN0c0Fyciwgc3RhbmRzQXJyLCBjaEhvdXJzKTtcclxuICAgIHNldFN0YW5kcyhuZXdTdGFuZHMpO1xyXG4gICAgc2V0VW5hbGxvY2F0ZWQodW5hbGxvYyk7XHJcbiAgICBzZXRJc0RpcnR5KGZhbHNlKTtcclxuXHJcbiAgICAvLyBTbmFwc2hvdCB0aGUgaW5pdGlhbCBhbGxvY2F0aW9uc1xyXG4gICAgY29uc3QgaW5pdGlhbEFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKTtcclxuICAgIG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudCA9IGFsbG9jYXRpb25zS2V5KGluaXRpYWxBbGxvY3MpO1xyXG5cclxuICAgIC8vIFNldCBvdXRwdXQgc3RhdGVcclxuICAgIHNldEFsbG9jYXRpb25zKGluaXRpYWxBbGxvY3MpO1xyXG4gICAgc2V0QWxsVGVzdElkcyh0ZXN0c0Fyci5tYXAoKHQ6IGFueSkgPT4gdC5pZCkpO1xyXG4gICAgc2V0SGFzVW5zYXZlZENoYW5nZXMoZmFsc2UpO1xyXG5cclxuICAgIC8vIENsZWFyIHNhdmUgbG9jayBcdTIwMTQgbmV3IGRhdGEgYXJyaXZpbmcgZnJvbSBSZXRvb2wgbWVhbnMgdGhlIHNhdmUgcm91bmQtdHJpcCBjb21wbGV0ZWQuXHJcbiAgICAvLyBUaGlzIGlzIG1vcmUgcmVsaWFibGUgdGhhbiB3YWl0aW5nIGZvciB0aGUgc2F2ZVN0YXRlIGJpbmRpbmcgdG8gdHJhbnNpdGlvbiB0aHJvdWdoXHJcbiAgICAvLyAnc2F2aW5nJyBcdTIxOTIgJ2lkbGUnLCB3aGljaCBSZXRvb2wgY2FuIGJhdGNoIGF3YXkgc28gdGhlIHVzZUVmZmVjdCBuZXZlciBmaXJlcy5cclxuICAgIHNldFBlbmRpbmdTYXZlKGZhbHNlKTtcclxuICAgIHNldFNhdmVFcnJvcihmYWxzZSk7XHJcbiAgfSwgW2lucHV0S2V5XSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBTY2hlZHVsaW5nIGNvbmZpZyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBjaEhvdXJzID0gKGNoYW5nZW92ZXJIb3VycyBhcyBudW1iZXIpIHx8IDM7XHJcbiAgY29uc3Qgd1N0YXJ0ID0gKHdvcmtTdGFydCBhcyBudW1iZXIpIHx8IDk7XHJcbiAgY29uc3Qgd0VuZCA9ICh3b3JrRW5kIGFzIG51bWJlcikgfHwgMTc7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBWaWV3IGNvbXB1dGF0aW9ucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB2aWV3U3RhcnQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZC5zZXRIb3VycygwLCAwLCAwLCAwKTtcclxuICAgIHdoaWxlIChkLmdldERheSgpICE9PSAxKSBkLnNldERhdGUoZC5nZXREYXRlKCkgLSAxKTtcclxuICAgIHJldHVybiBkO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFNjaGVkdWxlIGNvbXB1dGF0aW9uIChtdXN0IGJlIGRlZmluZWQgYmVmb3JlIHRpbWVsaW5lRW5kKSBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBjb21wdXRlU2NoZWR1bGUgPSB1c2VDYWxsYmFjaygodGVzdHM6IFRlc3REYXRhW10sIHN0YW5kQ2hhbmdlb3ZlcjogbnVtYmVyLCBub25Xb3JraW5nQmxvY2tzOiBOb25Xb3JraW5nQmxvY2tbXSk6IFNjaGVkdWxlZFRlc3RbXSA9PiB7XHJcbiAgICBjb25zdCBydW5uaW5nVGVzdHMgPSB0ZXN0cy5maWx0ZXIodCA9PiBpc1J1bm5pbmdUZXN0KHQpKTtcclxuICAgIGNvbnN0IHF1ZXVlZFRlc3RzID0gdGVzdHMuZmlsdGVyKHQgPT4gIWlzUnVubmluZ1Rlc3QodCkpO1xyXG5cclxuICAgIC8vIFNvcnQgUnVubmluZyB0ZXN0cyBieSBhY3R1YWwgc3RhcnQgZGF0ZSwgdGhlbiBwcmlvcml0eSBkZXNjIGZvciB0aWVzXHJcbiAgICBjb25zdCBzb3J0ZWRSdW5uaW5nID0gWy4uLnJ1bm5pbmdUZXN0c10uc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBjb25zdCBkYXRlQSA9IHBhcnNlTG9jYWxEYXRlKGEudGVzdF9zdGFydGVkX2RhdGUpIHx8IG5ldyBEYXRlKCk7XHJcbiAgICAgIGNvbnN0IGRhdGVCID0gcGFyc2VMb2NhbERhdGUoYi50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgbmV3IERhdGUoKTtcclxuICAgICAgaWYgKGRhdGVBLmdldFRpbWUoKSAhPT0gZGF0ZUIuZ2V0VGltZSgpKSByZXR1cm4gZGF0ZUEuZ2V0VGltZSgpIC0gZGF0ZUIuZ2V0VGltZSgpO1xyXG4gICAgICByZXR1cm4gKGIucHJpb3JpdHkgPz8gNTApIC0gKGEucHJpb3JpdHkgPz8gNTApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUnVubmluZyB0ZXN0cyB1c2UgdGhlaXIgYWN0dWFsIHRlc3Rfc3RhcnRlZF9kYXRlOyBvdmVybGFwcGluZyBvbmVzIGFyZSBtYWRlIHNlcXVlbnRpYWxcclxuICAgIGxldCBsYXN0UnVubmluZ0VuZCA9IG5ldyBEYXRlKHZpZXdTdGFydCk7XHJcbiAgICBjb25zdCBydW5uaW5nU2NoZWR1bGVkID0gc29ydGVkUnVubmluZy5tYXAodGVzdCA9PiB7XHJcbiAgICAgIGNvbnN0IHRlc3REYXRlID0gcGFyc2VMb2NhbERhdGUodGVzdC50ZXN0X3N0YXJ0ZWRfZGF0ZSkgfHwgbmV3IERhdGUodmlld1N0YXJ0KTtcclxuICAgICAgY29uc3Qgc3RhcnQgPSB0ZXN0RGF0ZSA8IGxhc3RSdW5uaW5nRW5kID8gbmV3IERhdGUobGFzdFJ1bm5pbmdFbmQpIDogbmV3IERhdGUodGVzdERhdGUpO1xyXG4gICAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShzdGFydC5nZXRUaW1lKCkgKyB0ZXN0LmR1cmF0aW9uICogTVNfUEVSX0hPVVIpO1xyXG4gICAgICBsYXN0UnVubmluZ0VuZCA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQoZW5kLCBzdGFuZENoYW5nZW92ZXIsIHdTdGFydCwgd0VuZCk7XHJcbiAgICAgIHJldHVybiB7IC4uLnRlc3QsIHN0YXJ0LCBlbmQgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFF1ZXVlZCB0ZXN0cyBzdGFydCBhZnRlciBsYXN0IFJ1bm5pbmcgdGVzdCdzIGNoYW5nZW92ZXIgKG9yIG5vdytjaGFuZ2VvdmVyLCB3aGljaGV2ZXIgaXMgbGF0ZXIpLlxyXG4gICAgLy8gV2UgbmV2ZXIgc2NoZWR1bGUgYSBwbGFubmVkIHRlc3QgdG8gc3RhcnQgaW4gdGhlIHBhc3QuXHJcbiAgICAvLyBmaW5kVmFsaWRTdGFydCBwdXNoZXMgdGhlIHN0YXJ0IGZvcndhcmQgdW50aWwgdGhlIGZ1bGwgW3N0YXJ0LCBzdGFydCtkdXJhdGlvbikgd2luZG93XHJcbiAgICAvLyBkb2Vzbid0IG92ZXJsYXAgYW55IG5vbi13b3JraW5nIGJsb2NrIChjb3ZlcnMgYm90aCBzdGFydC1pbnNpZGUgYW5kIGVuZC1pbnNpZGUgY2FzZXMpLlxyXG4gICAgY29uc3Qgbm93UGx1c0NoYW5nZW92ZXIgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKG5ldyBEYXRlKCksIHN0YW5kQ2hhbmdlb3Zlciwgd1N0YXJ0LCB3RW5kKTtcclxuICAgIGxldCBjdXJyZW50RW5kID0gbmV3IERhdGUoTWF0aC5tYXgobGFzdFJ1bm5pbmdFbmQuZ2V0VGltZSgpLCBub3dQbHVzQ2hhbmdlb3Zlci5nZXRUaW1lKCkpKTtcclxuICAgIGNvbnN0IHF1ZXVlZFNjaGVkdWxlZCA9IHF1ZXVlZFRlc3RzLm1hcCh0ZXN0ID0+IHtcclxuICAgICAgY29uc3Qgc3RhcnQgPSBmaW5kVmFsaWRTdGFydChuZXcgRGF0ZShjdXJyZW50RW5kKSwgdGVzdC5kdXJhdGlvbiwgbm9uV29ya2luZ0Jsb2Nrcyk7XHJcbiAgICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKHN0YXJ0LmdldFRpbWUoKSArIHRlc3QuZHVyYXRpb24gKiBNU19QRVJfSE9VUik7XHJcbiAgICAgIGN1cnJlbnRFbmQgPSBhZHZhbmNlUGFzdE5vbldvcmtpbmcoXHJcbiAgICAgICAgY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChlbmQsIHN0YW5kQ2hhbmdlb3Zlciwgd1N0YXJ0LCB3RW5kKSxcclxuICAgICAgICBub25Xb3JraW5nQmxvY2tzXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiB7IC4uLnRlc3QsIHN0YXJ0LCBlbmQgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBbLi4ucnVubmluZ1NjaGVkdWxlZCwgLi4ucXVldWVkU2NoZWR1bGVkXTtcclxuICB9LCBbdmlld1N0YXJ0LCB3U3RhcnQsIHdFbmRdKTtcclxuXHJcbiAgY29uc3Qgc3RhbmRTY2hlZHVsZXMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gbmV3IE1hcChzdGFuZHMubWFwKHMgPT4gW3MuaWQsIGNvbXB1dGVTY2hlZHVsZShzLnRlc3RzLCBzLmNoYW5nZW92ZXJfaG91cnMsIHMubm9uV29ya2luZ0Jsb2NrcyldKSksXHJcbiAgICBbc3RhbmRzLCBjb21wdXRlU2NoZWR1bGVdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgdGltZWxpbmVFbmQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGxldCBsYXRlc3RFbmQgPSBuZXcgRGF0ZSh2aWV3U3RhcnQpO1xyXG4gICAgbGF0ZXN0RW5kLnNldERhdGUobGF0ZXN0RW5kLmdldERhdGUoKSArIHZpZXdwb3J0V2Vla3MgKiA3KTtcclxuXHJcbiAgICBzdGFuZHMuZm9yRWFjaChzdGFuZCA9PiB7XHJcbiAgICAgIGNvbnN0IHNjaGVkdWxlID0gc3RhbmRTY2hlZHVsZXMuZ2V0KHN0YW5kLmlkKSA/PyBbXTtcclxuICAgICAgaWYgKHNjaGVkdWxlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBsYXN0ID0gc2NoZWR1bGVbc2NoZWR1bGUubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgY29uc3QgY2hhbmdlb3ZlckVuZCA9IGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQobGFzdC5lbmQsIHN0YW5kLmNoYW5nZW92ZXJfaG91cnMsIHdTdGFydCwgd0VuZCk7XHJcbiAgICAgICAgaWYgKGNoYW5nZW92ZXJFbmQgPiBsYXRlc3RFbmQpIGxhdGVzdEVuZCA9IGNoYW5nZW92ZXJFbmQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxhdGVzdEVuZC5zZXREYXRlKGxhdGVzdEVuZC5nZXREYXRlKCkgKyA3KTtcclxuICAgIHJldHVybiBsYXRlc3RFbmQ7XHJcbiAgfSwgW3N0YW5kU2NoZWR1bGVzLCBzdGFuZHMsIHZpZXdTdGFydCwgdmlld3BvcnRXZWVrcywgd1N0YXJ0LCB3RW5kXSk7XHJcblxyXG4gIGNvbnN0IHRvdGFsRGF5cyA9IHVzZU1lbW8oKCkgPT4gTWF0aC5jZWlsKGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIHRpbWVsaW5lRW5kKSAvIDI0KSwgW3ZpZXdTdGFydCwgdGltZWxpbmVFbmRdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFBsYW5uZWQgZGF0ZXMgZm9yIHNjaGVkdWxlZCB0ZXN0cyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBzY2hlZHVsZWRQbGFubmVkRGF0ZXMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdDogQXJyYXk8eyB0ZXN0X2lkOiBudW1iZXIgfCBzdHJpbmc7IHBsYW5uZWRfZGF0ZTogc3RyaW5nIH0+ID0gW107XHJcbiAgICBzdGFuZHMuZm9yRWFjaChzdGFuZCA9PiB7XHJcbiAgICAgIGNvbnN0IHNjaGVkdWxlID0gc3RhbmRTY2hlZHVsZXMuZ2V0KHN0YW5kLmlkKSA/PyBbXTtcclxuICAgICAgc2NoZWR1bGUuZm9yRWFjaChzdCA9PiB7XHJcbiAgICAgICAgY29uc3QgZCA9IHN0LnN0YXJ0O1xyXG4gICAgICAgIGNvbnN0IGRhdGVTdHIgPSBgJHtkLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyl9LSR7U3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpfWA7XHJcbiAgICAgICAgcmVzdWx0LnB1c2goeyB0ZXN0X2lkOiBzdC5pZCwgcGxhbm5lZF9kYXRlOiBkYXRlU3RyIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9LCBbc3RhbmRzLCBzdGFuZFNjaGVkdWxlc10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0UGxhbm5lZERhdGVzKHNjaGVkdWxlZFBsYW5uZWREYXRlcyk7XHJcbiAgfSwgW3NjaGVkdWxlZFBsYW5uZWREYXRlc10pO1xyXG5cclxuICBjb25zdCBweFBlckhvdXIgPSBjb250YWluZXJXaWR0aCAvICh2aWV3cG9ydFdlZWtzICogNyAqIDI0KTtcclxuICBjb25zdCBkYXlzID0gdXNlTWVtbygoKSA9PiBnZW5lcmF0ZURheXModmlld1N0YXJ0LCB0b3RhbERheXMpLCBbdmlld1N0YXJ0LCB0b3RhbERheXNdKTtcclxuICBjb25zdCB3ZWVrcyA9IHVzZU1lbW8oKCkgPT4gZ2VuZXJhdGVXZWVrcyh2aWV3U3RhcnQsIHRvdGFsRGF5cyksIFt2aWV3U3RhcnQsIHRvdGFsRGF5c10pO1xyXG4gIGNvbnN0IHRvdGFsV2lkdGggPSB0b3RhbERheXMgKiAyNCAqIHB4UGVySG91cjtcclxuICBjb25zdCBkYXlXaWR0aCA9IDI0ICogcHhQZXJIb3VyO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQWZ0ZXItY2hhbmdlIGhhbmRsZXIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgYWZ0ZXJDaGFuZ2UgPSB1c2VDYWxsYmFjaygobmV3U3RhbmRzOiBJbnRlcm5hbFN0YW5kW10pID0+IHtcclxuICAgIGNvbnN0IGFsbG9jcyA9IGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKTtcclxuICAgIGNvbnN0IGRpcnR5ID0gYWxsb2NhdGlvbnNLZXkoYWxsb2NzKSAhPT0gb3JpZ2luYWxBbGxvY2F0aW9uc1JlZi5jdXJyZW50O1xyXG4gICAgc2V0SXNEaXJ0eShkaXJ0eSk7XHJcbiAgICBzZXRBbGxvY2F0aW9ucyhhbGxvY3MpO1xyXG4gICAgc2V0SGFzVW5zYXZlZENoYW5nZXMoZGlydHkpO1xyXG5cclxuICAgIGlmICgoc2F2ZU1vZGUgYXMgc3RyaW5nKSA9PT0gJ2xpdmUnKSB7XHJcbiAgICAgIHNldFBlbmRpbmdTYXZlKHRydWUpO1xyXG4gICAgICBvbkNoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH0sIFtzYXZlTW9kZSwgc2V0QWxsb2NhdGlvbnMsIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzLCBvbkNoYW5nZV0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgRHJhZyBhbmQgZHJvcCBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBmaW5kVGVzdCA9IHVzZUNhbGxiYWNrKCh0ZXN0SWQ6IHN0cmluZyB8IG51bWJlcik6IFRlc3REYXRhIHwgbnVsbCA9PiB7XHJcbiAgICBjb25zdCBxID0gdW5hbGxvY2F0ZWQuZmluZCh0ID0+IHQuaWQgPT09IHRlc3RJZCk7XHJcbiAgICBpZiAocSkgcmV0dXJuIHE7XHJcbiAgICBmb3IgKGNvbnN0IHMgb2Ygc3RhbmRzKSB7XHJcbiAgICAgIGNvbnN0IHQgPSBzLnRlc3RzLmZpbmQodCA9PiB0LmlkID09PSB0ZXN0SWQpO1xyXG4gICAgICBpZiAodCkgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9LCBbdW5hbGxvY2F0ZWQsIHN0YW5kc10pO1xyXG5cclxuICBjb25zdCBjbGVhckRyYWcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXREcmFnZ2VkVGVzdElkKG51bGwpO1xyXG4gICAgc2V0SW5zZXJ0SW5kaWNhdG9yKG51bGwpO1xyXG4gICAgc2V0UXVldWVJbnNlcnRJbmRleChudWxsKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGRyb3BPblN0YW5kID0gdXNlQ2FsbGJhY2soKHN0YW5kSWQ6IHN0cmluZyB8IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgaWYgKCFkcmFnZ2VkVGVzdElkKSByZXR1cm47XHJcbiAgICBjb25zdCB0ZXN0ID0gZmluZFRlc3QoZHJhZ2dlZFRlc3RJZCk7XHJcbiAgICBpZiAoIXRlc3QpIHJldHVybjtcclxuXHJcbiAgICAvLyBSZW1vdmUgZnJvbSB1bmFsbG9jYXRlZFxyXG4gICAgc2V0VW5hbGxvY2F0ZWQocHJldiA9PiBwcmV2LmZpbHRlcih0ID0+IHQuaWQgIT09IGRyYWdnZWRUZXN0SWQpKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgZnJvbSBhbGwgc3RhbmRzIGFuZCBpbnNlcnQgYXQgdGFyZ2V0XHJcbiAgICBjb25zdCBuZXdTdGFuZHMgPSBzdGFuZHMubWFwKHMgPT4ge1xyXG4gICAgICBjb25zdCBmaWx0ZXJlZCA9IHMudGVzdHMuZmlsdGVyKHQgPT4gdC5pZCAhPT0gZHJhZ2dlZFRlc3RJZCk7XHJcbiAgICAgIGlmIChzLmlkID09PSBzdGFuZElkKSB7XHJcbiAgICAgICAgY29uc3QgbmV3VGVzdHMgPSBbLi4uZmlsdGVyZWRdO1xyXG4gICAgICAgIG5ld1Rlc3RzLnNwbGljZShpbmRleCwgMCwgdGVzdCk7XHJcbiAgICAgICAgcmV0dXJuIHsgLi4ucywgdGVzdHM6IG5ld1Rlc3RzIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHsgLi4ucywgdGVzdHM6IGZpbHRlcmVkIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIGFmdGVyQ2hhbmdlKG5ld1N0YW5kcyk7XHJcbiAgICBjbGVhckRyYWcoKTtcclxuICB9LCBbZHJhZ2dlZFRlc3RJZCwgZmluZFRlc3QsIHN0YW5kcywgYWZ0ZXJDaGFuZ2UsIGNsZWFyRHJhZ10pO1xyXG5cclxuICBjb25zdCBkcm9wT25RdWV1ZSA9IHVzZUNhbGxiYWNrKChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICBpZiAoIWRyYWdnZWRUZXN0SWQpIHJldHVybjtcclxuICAgIGNvbnN0IHRlc3QgPSBmaW5kVGVzdChkcmFnZ2VkVGVzdElkKTtcclxuICAgIGlmICghdGVzdCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFJlbW92ZSBmcm9tIHN0YW5kc1xyXG4gICAgY29uc3QgbmV3U3RhbmRzID0gc3RhbmRzLm1hcChzID0+ICh7XHJcbiAgICAgIC4uLnMsXHJcbiAgICAgIHRlc3RzOiBzLnRlc3RzLmZpbHRlcih0ID0+IHQuaWQgIT09IGRyYWdnZWRUZXN0SWQpLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIC8vIEFkZCB0byB1bmFsbG9jYXRlZFxyXG4gICAgc2V0VW5hbGxvY2F0ZWQocHJldiA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbHRlcmVkID0gcHJldi5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKTtcclxuICAgICAgY29uc3QgbmV4dCA9IFsuLi5maWx0ZXJlZF07XHJcbiAgICAgIG5leHQuc3BsaWNlKGluZGV4LCAwLCB0ZXN0KTtcclxuICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIGFmdGVyQ2hhbmdlKG5ld1N0YW5kcyk7XHJcbiAgICBjbGVhckRyYWcoKTtcclxuICB9LCBbZHJhZ2dlZFRlc3RJZCwgZmluZFRlc3QsIHN0YW5kcywgYWZ0ZXJDaGFuZ2UsIGNsZWFyRHJhZ10pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgU2F2ZSAvIERpc2NhcmQgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgaGFuZGxlU2F2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFBlbmRpbmdTYXZlKHRydWUpO1xyXG4gICAgb25TYXZlKCk7XHJcbiAgfSwgW29uU2F2ZV0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTYXZlUGxhbm5lZERhdGVzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0UGVuZGluZ1NhdmVEYXRlcyh0cnVlKTtcclxuICAgIHNldFNhdmVEYXRlc0Vycm9yKGZhbHNlKTtcclxuICAgIG9uU2F2ZVBsYW5uZWREYXRlcygpO1xyXG4gIH0sIFtvblNhdmVQbGFubmVkRGF0ZXNdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGlzY2FyZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFNhdmVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7XHJcbiAgICAvLyBSZS1wYXJzZSBmcm9tIGlucHV0IGRhdGFcclxuICAgIGNvbnN0IHRlc3RzQXJyID0gQXJyYXkuaXNBcnJheShpbnB1dFRlc3RzKSA/IGlucHV0VGVzdHMgOiBbXTtcclxuICAgIGNvbnN0IHN0YW5kc0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRTdGFuZHMpID8gKGlucHV0U3RhbmRzIGFzIFN0YW5kRGVmW10pIDogW107XHJcblxyXG4gICAgY29uc3QgeyBzdGFuZHM6IG5ld1N0YW5kcywgdW5hbGxvY2F0ZWQ6IHVuYWxsb2MgfSA9IHBhcnNlU3RhbmRzKHRlc3RzQXJyLCBzdGFuZHNBcnIsIGNoSG91cnMpO1xyXG4gICAgc2V0U3RhbmRzKG5ld1N0YW5kcyk7XHJcbiAgICBzZXRVbmFsbG9jYXRlZCh1bmFsbG9jKTtcclxuICAgIHNldElzRGlydHkoZmFsc2UpO1xyXG4gICAgc2V0QWxsb2NhdGlvbnMoYnVpbGRBbGxvY2F0aW9ucyhuZXdTdGFuZHMpKTtcclxuICAgIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzKGZhbHNlKTtcclxuICB9LCBbaW5wdXRUZXN0cywgaW5wdXRTdGFuZHMsIGNoSG91cnMsIHNldEFsbG9jYXRpb25zLCBzZXRIYXNVbnNhdmVkQ2hhbmdlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVSZXRyeSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFNhdmVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRQZW5kaW5nU2F2ZSh0cnVlKTtcclxuICAgIG9uUmV0cnkoKTtcclxuICB9LCBbb25SZXRyeV0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgUG9wb3ZlciBhY3Rpb25zIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGNsb3NlUG9wb3ZlciA9IHVzZUNhbGxiYWNrKCgpID0+IHNldFBvcG92ZXIobnVsbCksIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUG9wb3Zlck1vZGVDaGFuZ2UgPSB1c2VDYWxsYmFjaygobW9kZTogJ3Jvb3QnIHwgJ3ByaW9yaXR5JyB8ICdzdGF0dXMnIHwgJ3N0YXJ0X2RhdGUnKSA9PiB7XHJcbiAgICBzZXRQb3BvdmVyKHByZXYgPT4gcHJldiA/IHsgLi4ucHJldiwgbW9kZSB9IDogbnVsbCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25maXJtUHJpb3JpdHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIXBvcG92ZXIpIHJldHVybjtcclxuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHByaW9yaXR5SW5wdXRWYWx1ZSwgMTApO1xyXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkgfHwgcGFyc2VkIDwgMCB8fCBwYXJzZWQgPiAxMDApIHJldHVybjtcclxuICAgIHNldFNlbGVjdGVkVGVzdElkKFN0cmluZyhwb3BvdmVyLnRlc3QuaWQpKTtcclxuICAgIHNldFNlbGVjdGVkVGVzdFByaW9yaXR5KFN0cmluZyhwYXJzZWQpKTtcclxuICAgIG9uQ2hhbmdlUHJpb3JpdHkoKTtcclxuICAgIHNldFBvcG92ZXIobnVsbCk7XHJcbiAgfSwgW3BvcG92ZXIsIHByaW9yaXR5SW5wdXRWYWx1ZSwgc2V0U2VsZWN0ZWRUZXN0SWQsIHNldFNlbGVjdGVkVGVzdFByaW9yaXR5LCBvbkNoYW5nZVByaW9yaXR5XSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVBpY2tTdGF0dXMgPSB1c2VDYWxsYmFjaygoc3RhdHVzOiBzdHJpbmcpID0+IHtcclxuICAgIGlmICghcG9wb3ZlcikgcmV0dXJuO1xyXG4gICAgc2V0U2VsZWN0ZWRUZXN0SWQoU3RyaW5nKHBvcG92ZXIudGVzdC5pZCkpO1xyXG4gICAgc2V0U2VsZWN0ZWRUZXN0U3RhdHVzKHN0YXR1cyA9PT0gJ05VTEwnID8gJycgOiBzdGF0dXMpO1xyXG4gICAgb25DaGFuZ2VTdGF0dXMoKTtcclxuICAgIHNldFBvcG92ZXIobnVsbCk7XHJcbiAgfSwgW3BvcG92ZXIsIHNldFNlbGVjdGVkVGVzdElkLCBzZXRTZWxlY3RlZFRlc3RTdGF0dXMsIG9uQ2hhbmdlU3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVkaXRUZXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFwb3BvdmVyKSByZXR1cm47XHJcbiAgICBzZXRTZWxlY3RlZFRlc3RJZChTdHJpbmcocG9wb3Zlci50ZXN0LmlkKSk7XHJcbiAgICBvbkVkaXRUZXN0KCk7XHJcbiAgICBzZXRQb3BvdmVyKG51bGwpO1xyXG4gIH0sIFtwb3BvdmVyLCBzZXRTZWxlY3RlZFRlc3RJZCwgb25FZGl0VGVzdF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25maXJtU3RhcnREYXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFwb3BvdmVyIHx8ICFzdGFydERhdGVJbnB1dFZhbHVlKSByZXR1cm47XHJcbiAgICBzZXRTZWxlY3RlZFRlc3RJZChTdHJpbmcocG9wb3Zlci50ZXN0LmlkKSk7XHJcbiAgICBzZXRTZWxlY3RlZFRlc3RTdGFydERhdGUoc3RhcnREYXRlSW5wdXRWYWx1ZSk7XHJcbiAgICBvbkNoYW5nZVN0YXJ0RGF0ZSgpO1xyXG4gICAgc2V0UG9wb3ZlcihudWxsKTtcclxuICAgIHNldFN0YXJ0RGF0ZUlucHV0VmFsdWUoJycpO1xyXG4gIH0sIFtwb3BvdmVyLCBzdGFydERhdGVJbnB1dFZhbHVlLCBzZXRTZWxlY3RlZFRlc3RJZCwgc2V0U2VsZWN0ZWRUZXN0U3RhcnREYXRlLCBvbkNoYW5nZVN0YXJ0RGF0ZV0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQmFyIHBvc2l0aW9uIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGdldEJhclBvcyA9IHVzZUNhbGxiYWNrKChzdGFydDogRGF0ZSwgZHVyYXRpb246IG51bWJlcikgPT4gKHtcclxuICAgIGxlZnQ6IE1hdGgubWF4KDAsIGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIHN0YXJ0KSkgKiBweFBlckhvdXIsXHJcbiAgICB3aWR0aDogTWF0aC5tYXgoZHVyYXRpb24gKiBweFBlckhvdXIsIDIpLFxyXG4gIH0pLCBbdmlld1N0YXJ0LCBweFBlckhvdXJdKTtcclxuXHJcbiAgLy8gRm9yIFJ1bm5pbmcgdGVzdHM6IGNsaXAgbGVmdCB0byB2aWV3U3RhcnQsIGFkanVzdCB3aWR0aCB0byBhY3R1YWwgZW5kIHRpbWUuXHJcbiAgLy8gUmV0dXJucyBudWxsIGlmIHRoZSB0ZXN0IGVuZGVkIGJlZm9yZSB0aGUgdGltZWxpbmUgc3RhcnRzLlxyXG4gIGNvbnN0IGdldFJ1bm5pbmdCYXJQb3MgPSB1c2VDYWxsYmFjaygoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IHsgbGVmdDogbnVtYmVyOyB3aWR0aDogbnVtYmVyIH0gfCBudWxsID0+IHtcclxuICAgIGNvbnN0IGVmZmVjdGl2ZVN0YXJ0TXMgPSBNYXRoLm1heChzdGFydC5nZXRUaW1lKCksIHZpZXdTdGFydC5nZXRUaW1lKCkpO1xyXG4gICAgY29uc3QgZW5kTXMgPSBlbmQuZ2V0VGltZSgpO1xyXG4gICAgaWYgKGVuZE1zIDw9IGVmZmVjdGl2ZVN0YXJ0TXMpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGVmdDogaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgbmV3IERhdGUoZWZmZWN0aXZlU3RhcnRNcykpICogcHhQZXJIb3VyLFxyXG4gICAgICB3aWR0aDogTWF0aC5tYXgoaG91cnNCZXR3ZWVuKG5ldyBEYXRlKGVmZmVjdGl2ZVN0YXJ0TXMpLCBuZXcgRGF0ZShlbmRNcykpICogcHhQZXJIb3VyLCAyKSxcclxuICAgIH07XHJcbiAgfSwgW3ZpZXdTdGFydCwgcHhQZXJIb3VyXSk7XHJcblxyXG4gIGNvbnN0IGRyYWdnZWRUZXN0ID0gZHJhZ2dlZFRlc3RJZCAhPSBudWxsID8gZmluZFRlc3QoZHJhZ2dlZFRlc3RJZCkgOiBudWxsO1xyXG4gIGNvbnN0IGRyYWdnZWRJc1J1bm5pbmcgPSBkcmFnZ2VkVGVzdCAhPSBudWxsID8gaXNSdW5uaW5nVGVzdChkcmFnZ2VkVGVzdCkgOiBmYWxzZTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFN0YXRzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IHRvdGFsQWxsb2NhdGVkID0gc3RhbmRzLnJlZHVjZSgoYSwgcykgPT4gYSArIHMudGVzdHMubGVuZ3RoLCAwKTtcclxuICBjb25zdCB0b3RhbEhvdXJzID0gc3RhbmRzLnJlZHVjZSgoYSwgcykgPT4gYSArIHMudGVzdHMucmVkdWNlKChiLCB0KSA9PiBiICsgdC5kdXJhdGlvbiwgMCksIDApO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgVGVtcGxhdGUgYWNjZXNzb3JzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IG1haW5UZXh0ID0gU3RyaW5nKGNhcmRNYWluVGV4dCB8fCAne25hbWV9Jyk7XHJcbiAgY29uc3Qgc3ViVGV4dCA9IFN0cmluZyhjYXJkU3ViVGV4dCB8fCAnJyk7XHJcbiAgY29uc3QgaW5mb1JvdyA9IFN0cmluZyhjYXJkSW5mb1JvdyB8fCAnJyk7XHJcbiAgY29uc3QgdGlwVGVtcGxhdGUgPSBTdHJpbmcodG9vbHRpcFRlbXBsYXRlIHx8ICcnKS5yZXBsYWNlKC9cXFxcbi9nLCAnXFxuJyk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBGaWx0ZXJlZCAmIHNvcnRlZCBxdWV1ZSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBTVEFUVVNfU09SVF9PUkRFUjogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHtcclxuICAgICdSdW5uaW5nJzogMCwgJ0RlbGF5ZWQnOiAxLCAnT24gVGltZSc6IDIsICdSZWFkeSc6IDMsICdJbiBQcm9ncmVzcyc6IDQsICdQYXJ0cyBOb3QgQXNzaWduZWQnOiA1LFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNvcnRlZFVuYWxsb2NhdGVkID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBsZXQgbGlzdCA9IFsuLi51bmFsbG9jYXRlZF07XHJcbiAgICBpZiAocXVldWVGaWx0ZXIudHJpbSgpKSB7XHJcbiAgICAgIGNvbnN0IHEgPSBxdWV1ZUZpbHRlci50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICAgICAgLy8gU2VhcmNoIGFjcm9zcyBhbGwgcmVhZGFibGUgc3RyaW5nL251bWJlciBmaWVsZHMgb2YgdGhlIHRlc3RcclxuICAgICAgbGlzdCA9IGxpc3QuZmlsdGVyKHQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaGFibGUgPSBbdC5uYW1lLCB0Lm93bmVyLCB0Lm5vdGVzLCB0LnN0YXR1cywgdC5wYXJ0X3N0YXR1cywgdC5hc3NpZ25lZF9wYXJ0cyxcclxuICAgICAgICAgIHQucHJpb3JpdHkgIT0gbnVsbCA/IFN0cmluZyh0LnByaW9yaXR5KSA6ICcnLCB0LmR1cmF0aW9uICE9IG51bGwgPyBTdHJpbmcodC5kdXJhdGlvbikgOiAnJ11cclxuICAgICAgICAgIC5qb2luKCcgJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gc2VhcmNoYWJsZS5pbmNsdWRlcyhxKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAocXVldWVTb3J0ID09PSAnYXonKSB7XHJcbiAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4gKGEubmFtZSB8fCAnJykubG9jYWxlQ29tcGFyZShiLm5hbWUgfHwgJycpKTtcclxuICAgIH0gZWxzZSBpZiAocXVldWVTb3J0ID09PSAncHJpb3JpdHknKSB7XHJcbiAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4gKGIucHJpb3JpdHkgPz8gNTApIC0gKGEucHJpb3JpdHkgPz8gNTApKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNvcnQgYnkgZGlzcGxheSBzdGF0dXMgdXNpbmcgYSBmaXhlZCB1cmdlbmN5IG9yZGVyXHJcbiAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNhID0gU1RBVFVTX1NPUlRfT1JERVJbZ2V0RGlzcGxheVN0YXR1cyhhKV0gPz8gOTk7XHJcbiAgICAgICAgY29uc3Qgc2IgPSBTVEFUVVNfU09SVF9PUkRFUltnZXREaXNwbGF5U3RhdHVzKGIpXSA/PyA5OTtcclxuICAgICAgICByZXR1cm4gc2EgIT09IHNiID8gc2EgLSBzYiA6IChiLnByaW9yaXR5ID8/IDUwKSAtIChhLnByaW9yaXR5ID8/IDUwKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGlzdDtcclxuICB9LCBbdW5hbGxvY2F0ZWQsIHF1ZXVlU29ydCwgcXVldWVGaWx0ZXJdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEJhciBoZWlnaHQgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgQkFSX0hFSUdIVCA9IDcyO1xyXG4gIGNvbnN0IExBTkVfSEVJR0hUID0gODQ7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBSZW5kZXIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgZGlzcGxheTogJ2ZsZXgnLCBoZWlnaHQ6ICcxMDAlJywgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLFxyXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgfX0+XHJcbiAgICAgIDxzdHlsZT57YEBrZXlmcmFtZXMgY2NsLXNwaW4geyB0byB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0gfWB9PC9zdHlsZT5cclxuICAgICAge2lzTG9ja2VkICYmIChcclxuICAgICAgICA8U2F2ZU92ZXJsYXlcclxuICAgICAgICAgIGlzRXJyb3I9e3NhdmVFcnJvcn1cclxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cclxuICAgICAgICAgIG9uUmV0cnk9e2hhbmRsZVJldHJ5fVxyXG4gICAgICAgICAgb25EaXNjYXJkPXtoYW5kbGVEaXNjYXJkfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICAgIHsvKiBcdTI1NTBcdTI1NTBcdTI1NTAgUXVldWUgU2lkZWJhciBcdTI1NTBcdTI1NTBcdTI1NTAgKi99XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDMyMCwgbWluV2lkdGg6IDMyMCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLCBib3JkZXJSaWdodDogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nIH19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTZweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBtYXJnaW5Cb3R0b206IDQgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4IH19PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDgsIGhlaWdodDogOCwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogdW5hbGxvY2F0ZWQubGVuZ3RoID4gMCA/ICcjRjU5RTBCJyA6ICcjMTBCOTgxJyB9fSAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDhlbScsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBjb2xvcjogdGhlbWUudGV4dFRlcnRpYXJ5IH19PlF1ZXVlPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogMiwgYmFja2dyb3VuZDogdGhlbWUuYmdTdWJ0bGUsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLCBwYWRkaW5nOiAyLCBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCB9fT5cclxuICAgICAgICAgICAgICB7KFtbJ2F6JywgJ0FcdTIxOTJaJ10sIFsncHJpb3JpdHknLCAnUHJpb3JpdHknXSwgWydzdGF0dXMnLCAnU3RhdHVzJ11dIGFzIGNvbnN0KS5tYXAoKFt2YWwsIGxhYmVsXSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3ZhbH1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UXVldWVTb3J0KHZhbCl9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHBhZGRpbmc6ICczcHggOHB4JywgZm9udFNpemU6IDksIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNTbSxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogcXVldWVTb3J0ID09PSB2YWwgPyB0aGVtZS5hY2NlbnQgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBxdWV1ZVNvcnQgPT09IHZhbCA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dE11dGVkLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPntsYWJlbH08L2J1dHRvbj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIG1hcmdpblRvcDogNiB9fT5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXtxdWV1ZUZpbHRlcn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFF1ZXVlRmlsdGVyKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkZpbHRlciB0ZXN0cy4uLlwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCB3aWR0aDogJzEwMCUnLCBib3hTaXppbmc6ICdib3JkZXItYm94JywgcGFkZGluZzogJzVweCAyOHB4IDVweCA4cHgnLCBmb250U2l6ZTogMTEsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSwgb3V0bGluZTogJ25vbmUnLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgb25Gb2N1cz17KGUpID0+IHsgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJvcmRlckNvbG9yID0gdGhlbWUuYWNjZW50OyBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9IHRoZW1lLnN1cmZhY2U7IH19XHJcbiAgICAgICAgICAgICAgb25CbHVyPXsoZSkgPT4geyBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYm9yZGVyQ29sb3IgPSB0aGVtZS5ib3JkZXI7IGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gdGhlbWUuY2FudmFzOyB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICB7cXVldWVGaWx0ZXIgJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFF1ZXVlRmlsdGVyKCcnKX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCByaWdodDogNiwgdG9wOiAnNTAlJywgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBjb2xvcjogdGhlbWUudGV4dERpc2FibGVkLFxyXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTQsIGxpbmVIZWlnaHQ6IDEsIHBhZGRpbmc6IDAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID4mdGltZXM7PC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgc3R5bGU9e3sgZmxleDogMSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6ICc4cHggMTBweCcgfX1cclxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQpIHNldFF1ZXVlSW5zZXJ0SW5kZXgodW5hbGxvY2F0ZWQubGVuZ3RoKTsgfX1cclxuICAgICAgICAgIG9uRHJhZ0xlYXZlPXsoZSkgPT4geyBpZiAoZS5jdXJyZW50VGFyZ2V0ID09PSBlLnRhcmdldCkgc2V0UXVldWVJbnNlcnRJbmRleChudWxsKTsgfX1cclxuICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBkcm9wT25RdWV1ZShxdWV1ZUluc2VydEluZGV4ID8/IHVuYWxsb2NhdGVkLmxlbmd0aCk7IH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3NvcnRlZFVuYWxsb2NhdGVkLm1hcCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IGdldERpc3BsYXlTdGF0dXModGVzdCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNob3dTdWIgPSAhaXNUZW1wbGF0ZUVtcHR5KHN1YlRleHQsIHRlc3QpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZE1haW4gPSByZXNvbHZlVGVtcGxhdGUobWFpblRleHQsIHRlc3QpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZFN1YiA9IHJlc29sdmVUZW1wbGF0ZShzdWJUZXh0LCB0ZXN0KTtcclxuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRJbmZvID0gcmVzb2x2ZVRlbXBsYXRlKGluZm9Sb3csIHRlc3QpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17dGVzdC5pZH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgc2V0UXVldWVJbnNlcnRJbmRleChpZHgpOyB9fVxyXG4gICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZHJvcE9uUXVldWUoaWR4KTsgfX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHF1ZXVlSW5zZXJ0SW5kZXggPT09IGlkeCAmJiBkcmFnZ2VkVGVzdElkICYmIGRyYWdnZWRUZXN0SWQgIT09IHRlc3QuaWQgPyA2IDogMCxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC4xMnMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFF1ZXVlQ2FyZFxyXG4gICAgICAgICAgICAgICAgICB0ZXN0PXt0ZXN0fVxyXG4gICAgICAgICAgICAgICAgICBkcmFnZ2VkVGVzdElkPXtkcmFnZ2VkVGVzdElkfVxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICAgICAgICAgICAgbWFpblRleHQ9e3Jlc29sdmVkTWFpbn1cclxuICAgICAgICAgICAgICAgICAgc3ViVGV4dD17cmVzb2x2ZWRTdWJ9XHJcbiAgICAgICAgICAgICAgICAgIGluZm9Sb3c9e3Jlc29sdmVkSW5mb31cclxuICAgICAgICAgICAgICAgICAgc2hvd1N1Yj17c2hvd1N1Yn1cclxuICAgICAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxyXG4gICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17KCkgPT4gc2V0RHJhZ2dlZFRlc3RJZCh0ZXN0LmlkKX1cclxuICAgICAgICAgICAgICAgICAgb25EcmFnRW5kPXtjbGVhckRyYWd9XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgY29uc3QgcmVjdCA9IGUuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgc2V0UXVldWVJbnNlcnRJbmRleChlLmNsaWVudFkgPCByZWN0LnRvcCArIHJlY3QuaGVpZ2h0IC8gMiA/IGlkeCA6IGlkeCArIDEpOyB9fVxyXG4gICAgICAgICAgICAgICAgICBvbk1lbnVPcGVuPXsocmVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkcmFnZ2VkVGVzdElkIHx8IGlzTG9ja2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UHJpb3JpdHlJbnB1dFZhbHVlKFN0cmluZyh0ZXN0LnByaW9yaXR5ID8/IDUwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UG9wb3Zlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICBhbmNob3JSZWN0OiByZWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdCxcclxuICAgICAgICAgICAgICAgICAgICAgIG1vZGU6ICdyb290JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlTdGF0dXM6IHN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBMaW5lczogcmVzb2x2ZVRlbXBsYXRlKHRpcFRlbXBsYXRlLCB0ZXN0KSxcclxuICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBzZXRRdWV1ZUluc2VydEluZGV4KHVuYWxsb2NhdGVkLmxlbmd0aCk7IH19XHJcbiAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBkcm9wT25RdWV1ZSh1bmFsbG9jYXRlZC5sZW5ndGgpOyB9fVxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGhlaWdodDogKHF1ZXVlSW5zZXJ0SW5kZXggPT09IHVuYWxsb2NhdGVkLmxlbmd0aCAmJiBkcmFnZ2VkVGVzdElkKSA/IDYgOiAwLFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCxcclxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDMsXHJcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2hlaWdodCAwLjEycyBlYXNlJyxcclxuICAgICAgICAgICAgICBtYXJnaW46ICcwIDRweCcsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAge3VuYWxsb2NhdGVkLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLCBwYWRkaW5nOiAnMzJweCAxNnB4JywgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgIGJvcmRlcjogZHJhZ2dlZFRlc3RJZCA/IGAycHggZGFzaGVkICR7dGhlbWUuYWNjZW50fWAgOiBgMnB4IGRhc2hlZCAke3RoZW1lLmJvcmRlclN0cm9uZ31gLFxyXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzTGcsIG1hcmdpblRvcDogOCxcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBkcmFnZ2VkVGVzdElkID8gdGhlbWUuYWNjZW50U3VidGxlIDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubyxcclxuICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAge2RyYWdnZWRUZXN0SWQgPyAnRHJvcCB0byByZXR1cm4gdG8gcXVldWUnIDogJ0FsbCB0ZXN0cyBhbGxvY2F0ZWQnfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxPdXRsaW5lS2V5IHRoZW1lPXt0aGVtZX0gLz5cclxuXHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAxNnB4JywgYm9yZGVyVG9wOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcyB9fT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZm9udFNpemU6IDEwLCBjb2xvcjogdGhlbWUudGV4dE11dGVkIH19PlxyXG4gICAgICAgICAgICA8c3Bhbj57dG90YWxBbGxvY2F0ZWR9L3t0b3RhbEFsbG9jYXRlZCArIHVuYWxsb2NhdGVkLmxlbmd0aH0gYWxsb2NhdGVkPC9zcGFuPjxzcGFuPnt0b3RhbEhvdXJzfWg8L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7LyogXHUyNTUwXHUyNTUwXHUyNTUwIE1haW4gVGltZWxpbmUgXHUyNTUwXHUyNTUwXHUyNTUwICovfVxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICB7LyogSGVhZGVyIGJhciAqL31cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDI0cHgnLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZ2FwOiAxNiwgZmxleFdyYXA6ICd3cmFwJyB9fT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWluV2lkdGg6IDAgfX0+XHJcbiAgICAgICAgICAgIDxoMSBzdHlsZT17eyBmb250U2l6ZTogMTgsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LCBsZXR0ZXJTcGFjaW5nOiAnLTAuMDJlbScsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHkgfX0+VGVzdCBTdGFuZCBTY2hlZHVsZXI8L2gxPlxyXG4gICAgICAgICAgICA8cCBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Ub3A6IDIgfX0+XHJcbiAgICAgICAgICAgICAgQ29udGludW91cyB0ZXN0aW5nIFx1MDBCNyB7Y2hIb3Vyc31oIGNoYW5nZW92ZXIgKGRlZmF1bHQpIFx1MDBCNyB7d1N0YXJ0fTowMFx1MjAxM3t3RW5kfTowMCBNb25cdTIwMTNGcmlcclxuICAgICAgICAgICAgICB7KHNhdmVNb2RlIGFzIHN0cmluZykgPT09ICdsaXZlJyAmJiA8c3Bhbj4gXHUwMEI3IExpdmUgc3luYzwvc3Bhbj59XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMiB9fT5cclxuICAgICAgICAgICAgey8qIFNhdmUvRGlzY2FyZCBidXR0b25zIChiYXRjaCBtb2RlKSAqL31cclxuICAgICAgICAgICAgeyhzYXZlTW9kZSBhcyBzdHJpbmcpID09PSAnYmF0Y2gnICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2IH19PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEaXNjYXJkfVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRGlydHkgfHwgaXNMb2NrZWR9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMCwgcGFkZGluZzogJzZweCAwJywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke2lzRGlydHkgJiYgIWlzTG9ja2VkID8gdGhlbWUuYWNjZW50IDogdGhlbWUuYm9yZGVyfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyB0aGVtZS5hY2NlbnQgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0RGlzYWJsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gYDAgMXB4IDNweCAke3RoZW1lLmFjY2VudH00RGAgOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIERpc2NhcmQgQ2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNhdmV9XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNEaXJ0eSB8fCBpc0xvY2tlZH1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLCBwYWRkaW5nOiAnNnB4IDAnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7aXNEaXJ0eSAmJiAhaXNMb2NrZWQgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS5ib3JkZXJ9YCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyAncG9pbnRlcicgOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IHRoZW1lLmFjY2VudCA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyB0aGVtZS5hY2NlbnRGZyA6IHRoZW1lLnRleHREaXNhYmxlZCxcclxuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyBgMCAxcHggM3B4ICR7dGhlbWUuYWNjZW50fTREYCA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgU2F2ZSBDaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIHsvKiBTYXZlIFBsYW5uZWQgRGF0ZXMgYnV0dG9uICovfVxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2F2ZVBsYW5uZWREYXRlc31cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNEYXRlc1NhdmluZyB8fCBzY2hlZHVsZWRQbGFubmVkRGF0ZXMubGVuZ3RoID09PSAwfVxyXG4gICAgICAgICAgICAgIHRpdGxlPXtzY2hlZHVsZWRQbGFubmVkRGF0ZXMubGVuZ3RoID09PSAwID8gJ05vIHRlc3RzIHNjaGVkdWxlZCcgOiBgU2F2ZSBwbGFubmVkIHN0YXJ0IGRhdGVzIGZvciAke3NjaGVkdWxlZFBsYW5uZWREYXRlcy5sZW5ndGh9IHNjaGVkdWxlZCB0ZXN0JHtzY2hlZHVsZWRQbGFubmVkRGF0ZXMubGVuZ3RoICE9PSAxID8gJ3MnIDogJyd9YH1cclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTMwLCBwYWRkaW5nOiAnNnB4IDAnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IHNhdmVEYXRlc0Vycm9yID8gYDFweCBzb2xpZCAjRkVDQUNBYCA6ICcxcHggc29saWQgdHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAoIWlzRGF0ZXNTYXZpbmcgJiYgc2NoZWR1bGVkUGxhbm5lZERhdGVzLmxlbmd0aCA+IDApID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogc2F2ZURhdGVzRXJyb3IgPyAodGhlbWUuaXNEYXJrID8gJyMzQjAwMDAnIDogJyNGRUYyRjInKSA6IHRoZW1lLmFjY2VudCxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBzYXZlRGF0ZXNFcnJvciA/ICcjRUY0NDQ0JyA6IHRoZW1lLmFjY2VudEZnLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogKCFpc0RhdGVzU2F2aW5nICYmIHNjaGVkdWxlZFBsYW5uZWREYXRlcy5sZW5ndGggPiAwKSA/IDEgOiAwLjUsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnYmFja2dyb3VuZCAwLjE1cywgY29sb3IgMC4xNXMsIGJvcmRlci1jb2xvciAwLjE1cycsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtzYXZlRGF0ZXNFcnJvciA/ICdFcnJvciBcdTIwMTQgUmV0cnknIDogKHBlbmRpbmdTYXZlRGF0ZXMgfHwgKGlzU2F2aW5nRGF0ZXMgYXMgYm9vbGVhbikpID8gJ1NhdmluZ1x1MjAyNicgOiAnU2F2ZSBQbGFubmVkIERhdGVzJ31cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICB7LyogVmlld3BvcnQgc2VsZWN0b3IgKi99XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDQsIGJhY2tncm91bmQ6IHRoZW1lLmJnU3VidGxlLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLCBwYWRkaW5nOiAzLCBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCB9fT5cclxuICAgICAgICAgICAgICB7WzIsIDQsIDgsIDEyLCAyNF0ubWFwKCh3KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIGtleT17d31cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB1c2VyQ2hhbmdlZFZpZXdwb3J0LmN1cnJlbnQgPSB0cnVlOyBzZXRWaWV3cG9ydFdlZWtzKHcpOyB9fVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggMTJweCcsIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdmlld3BvcnRXZWVrcyA9PT0gdyA/IHRoZW1lLmFjY2VudCA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHZpZXdwb3J0V2Vla3MgPT09IHcgPyB0aGVtZS5hY2NlbnRGZyA6IHRoZW1lLnRleHRUZXJ0aWFyeSxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge3d9V1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHsvKiBUaW1lbGluZSBzY3JvbGwgYXJlYSAqL31cclxuICAgICAgICA8ZGl2IHJlZj17c2Nyb2xsUmVmfSBzdHlsZT17eyBmbGV4OiAxLCBvdmVyZmxvdzogJ2F1dG8nLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1pbldpZHRoOiB0b3RhbFdpZHRoLCBwYWRkaW5nOiAnMCAxMnB4IDI0cHgnLCBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuICAgICAgICAgICAgey8qIFRpbWVsaW5lIGhlYWRlciAqL31cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3N0aWNreScsIHRvcDogMCwgekluZGV4OiAyMCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCB9fT5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgaGVpZ2h0OiAyOCwgcG9zaXRpb246ICdyZWxhdGl2ZScsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gIH19PlxyXG4gICAgICAgICAgICAgICAge3dlZWtzLm1hcCgod2ssIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIHdrKSAqIHB4UGVySG91cixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNyAqIDI0ICogcHhQZXJIb3VyLCBoZWlnaHQ6IDI4LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIHBhZGRpbmdMZWZ0OiA4LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMCwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dFRlcnRpYXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IGkgPiAwID8gYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0V2Vlayh3ayl9XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGhlaWdodDogMjQgfX0+XHJcbiAgICAgICAgICAgICAgICB7ZGF5cy5tYXAoKGQsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNUb2RheSA9IGQudG9EYXRlU3RyaW5nKCkgPT09IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzV2Vla2VuZCA9IGQuZ2V0RGF5KCkgPT09IDAgfHwgZC5nZXREYXkoKSA9PT0gNjtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCB3aWR0aDogZGF5V2lkdGgsIG1pbldpZHRoOiBkYXlXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiA5LCB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGlzVG9kYXkgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS50ZXh0TXV0ZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiBpc1RvZGF5ID8gNzAwIDogNDAwLCBsaW5lSGVpZ2h0OiAnMjRweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBpc1RvZGF5ID8gdGhlbWUuYWNjZW50U3VidGxlIDogKGlzV2Vla2VuZCA/IHRoZW1lLmJnU3VidGxlIDogJ3RyYW5zcGFyZW50JyksXHJcbiAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7dmlld3BvcnRXZWVrcyA8PSA4ID8gZC5nZXREYXRlKCkgOiAoZC5nZXREYXkoKSA9PT0gMSA/IGQuZ2V0RGF0ZSgpIDogJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgey8qIFx1MjU1MFx1MjU1MFx1MjU1MCBUZXN0IFN0YW5kIExhbmVzIFx1MjU1MFx1MjU1MFx1MjU1MCAqL31cclxuICAgICAgICAgICAge3N0YW5kcy5tYXAoKHN0YW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2NoZWR1bGUgPSBzdGFuZFNjaGVkdWxlcy5nZXQoc3RhbmQuaWQpID8/IFtdO1xyXG4gICAgICAgICAgICAgIGNvbnN0IGluZCA9IGluc2VydEluZGljYXRvcjtcclxuICAgICAgICAgICAgICBjb25zdCBzaG93SGVyZSA9IGluZCAmJiBpbmQuc3RhbmRJZCA9PT0gc3RhbmQuaWQ7XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17c3RhbmQuaWR9IHN0eWxlPXt7IG1hcmdpblRvcDogMTYgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4LCBtYXJnaW5Cb3R0b206IDYsIHBhZGRpbmdMZWZ0OiAyIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDYsIGhlaWdodDogNiwgYm9yZGVyUmFkaXVzOiAyLCBiYWNrZ3JvdW5kOiBzdGFuZC50ZXN0cy5sZW5ndGggPiAwID8gdGhlbWUuYWNjZW50IDogdGhlbWUudGV4dERpc2FibGVkIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSB9fT57c3RhbmQubmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMCwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIHtzdGFuZC50ZXN0cy5sZW5ndGh9IHRlc3R7c3RhbmQudGVzdHMubGVuZ3RoICE9PSAxID8gJ3MnIDogJyd9e3N0YW5kLnRlc3RzLmxlbmd0aCA+IDAgJiYgYCBcXHUwMGI3ICR7c3RhbmQudGVzdHMucmVkdWNlKChhLCB0KSA9PiBhICsgdC5kdXJhdGlvbiwgMCl9aGB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IHNldEluc2VydEluZGljYXRvcih7IHN0YW5kSWQ6IHN0YW5kLmlkLCBpbmRleDogc3RhbmQudGVzdHMubGVuZ3RoIH0pOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJhZ0xlYXZlPXsoZSkgPT4geyBpZiAoIWUuY3VycmVudFRhcmdldC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQgYXMgTm9kZSkpIHNldEluc2VydEluZGljYXRvcihudWxsKTsgfX1cclxuICAgICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBSdW5uaW5nIHRlc3RzIGFsd2F5cyBhcHBlbmQgdG8gZW5kIChwb3NpdGlvbiBpcyBnb3Zlcm5lZCBieSB0ZXN0X3N0YXJ0ZWRfZGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChkcmFnZ2VkSXNSdW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BPblN0YW5kKHN0YW5kLmlkLCBzdGFuZC50ZXN0cy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIGluZD8uc3RhbmRJZCA9PT0gc3RhbmQuaWQgPyBpbmQuaW5kZXggOiBzdGFuZC50ZXN0cy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBMQU5FX0hFSUdIVCxcclxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHNob3dIZXJlIHx8IChkcmFnZ2VkVGVzdElkICYmIHN0YW5kLnRlc3RzLmxlbmd0aCA9PT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWN0aXZlKSByZXR1cm4gdGhlbWUuc3VyZmFjZVNlY29uZGFyeTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyYWdnZWRJc1J1bm5pbmcgPyB0aGVtZS5ydW5uaW5nQmcgOiB0aGVtZS5hY2NlbnRTdWJ0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gc2hvd0hlcmUgfHwgKGRyYWdnZWRUZXN0SWQgJiYgc3RhbmQudGVzdHMubGVuZ3RoID09PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHJldHVybiB0aGVtZS5ib3JkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkcmFnZ2VkSXNSdW5uaW5nID8gdGhlbWUucnVubmluZ0JvcmRlciA6IHRoZW1lLmFjY2VudE11dGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSkoKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZyxcclxuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0b3RhbFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2JhY2tncm91bmQgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7LyogV2Vla2VuZCBzaGFkaW5nICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtkYXlzLm1hcCgoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGQuZ2V0RGF5KCkgIT09IDAgJiYgZC5nZXREYXkoKSAhPT0gNikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YHdlLSR7aX1gfSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBpICogZGF5V2lkdGgsIHRvcDogMCwgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBkYXlXaWR0aCwgYmFja2dyb3VuZDogdGhlbWUuYm9yZGVyLCBvcGFjaXR5OiAwLjM1LCBwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogRGF5IGdyaWQgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge2RheXMubWFwKChfLCBpKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGkgKiBkYXlXaWR0aCwgdG9wOiAwLCBib3R0b206IDAsIHdpZHRoOiAxLCBiYWNrZ3JvdW5kOiB0aGVtZS5ib3JkZXIgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIE5vdyBsaW5lICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaCA9IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGggPCAwIHx8IGggPiB0b3RhbERheXMgKiAyNCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBoICogcHhQZXJIb3VyLCB0b3A6IDAsIGJvdHRvbTogMCwgd2lkdGg6IDIsIGJhY2tncm91bmQ6ICcjRUY0NDQ0JywgekluZGV4OiAxMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IC0zLCBsZWZ0OiAtMywgd2lkdGg6IDgsIGhlaWdodDogOCwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogJyNFRjQ0NDQnIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSgpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogTm9uLXdvcmtpbmcgYmxvY2tzICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzdGFuZC5ub25Xb3JraW5nQmxvY2tzLm1hcCgoYmxvY2ssIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZnQgPSBob3Vyc0JldHdlZW4odmlld1N0YXJ0LCBibG9jay5zdGFydCkgKiBweFBlckhvdXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IGhvdXJzQmV0d2VlbihibG9jay5zdGFydCwgYmxvY2suZW5kKSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0ICsgd2lkdGggPCAwIHx8IGxlZnQgPiB0b3RhbFdpZHRoKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRMZWZ0ID0gTWF0aC5tYXgoMCwgbGVmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFtcGVkV2lkdGggPSBNYXRoLm1pbih3aWR0aCArIE1hdGgubWluKDAsIGxlZnQpLCB0b3RhbFdpZHRoIC0gY2xhbXBlZExlZnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2Budy0ke2l9YH0gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogY2xhbXBlZExlZnQsIHRvcDogNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogY2xhbXBlZFdpZHRoLCBoZWlnaHQ6IEJBUl9IRUlHSFQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiA2LCBwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogYHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoNDVkZWcsICR7dGhlbWUuYm9yZGVyfSAwcHgsICR7dGhlbWUuYm9yZGVyfSAxNXB4LCAke3RoZW1lLnN1cmZhY2V9IDE1cHgsICR7dGhlbWUuc3VyZmFjZX0gMzBweClgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzTGcsIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlclN0cm9uZ31gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ3JvdycsIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNSwgbWluV2lkdGg6IDUsIGJhY2tncm91bmQ6IHRoZW1lLnRleHREaXNhYmxlZCwgZmxleFNocmluazogMCB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgcGFkZGluZzogJzRweCA4cHgnLCBtaW5XaWR0aDogMCwganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIG1heFdpZHRoOiAnMTAwJScsIGxpbmVIZWlnaHQ6IDEuMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PntibG9jay5ub3RlcyB8fCAnTWFpbnRlbmFuY2UnfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogVGVzdCBiYXJzICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzY2hlZHVsZS5tYXAoKHRlc3QsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNUZXN0UnVubmluZyA9IGlzUnVubmluZ1Rlc3QodGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXJQb3MgPSBpc1Rlc3RSdW5uaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZ2V0UnVubmluZ0JhclBvcyh0ZXN0LnN0YXJ0LCB0ZXN0LmVuZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBnZXRCYXJQb3ModGVzdC5zdGFydCwgdGVzdC5kdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBSdW5uaW5nIHRlc3RzIHRoYXQgZW5kZWQgYmVmb3JlIHRoZSB0aW1lbGluZSBzdGFydHNcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICghYmFyUG9zKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxlZnQsIHdpZHRoIH0gPSBiYXJQb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjRW5kID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZCh0ZXN0LmVuZCwgc3RhbmQuY2hhbmdlb3Zlcl9ob3Vycywgd1N0YXJ0LCB3RW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZW92ZXJXaWR0aCA9IGhvdXJzQmV0d2Vlbih0ZXN0LmVuZCwgY0VuZCkgKiBweFBlckhvdXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5U3RhdHVzID0gZ2V0RGlzcGxheVN0YXR1cyh0ZXN0LCB0ZXN0LnN0YXJ0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZE1haW4gPSByZXNvbHZlVGVtcGxhdGUobWFpblRleHQsIHRlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRJbmZvID0gcmVzb2x2ZVRlbXBsYXRlKGluZm9Sb3csIHRlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hvd0luZm9PbkJhciA9IHJlc29sdmVkSW5mby50cmltKCkgIT09ICcnICYmIHdpZHRoID4gMTIwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXt0ZXN0LmlkfSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdCwgdG9wOiAwLCB3aWR0aDogd2lkdGggKyBjaGFuZ2VvdmVyV2lkdGgsIGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBEcm9wIHpvbmVzIFx1MjAxNCBzdXBwcmVzc2VkIHdoZW4gZHJhZ2dpbmcgYSBSdW5uaW5nIHRlc3QgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge2RyYWdnZWRUZXN0SWQgJiYgZHJhZ2dlZFRlc3RJZCAhPT0gdGVzdC5pZCAmJiAhZHJhZ2dlZElzUnVubmluZyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBzZXRJbnNlcnRJbmRpY2F0b3IoeyBzdGFuZElkOiBzdGFuZC5pZCwgaW5kZXg6IGlkeCB9KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIGlkeCk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IC02LCB0b3A6IDAsIHdpZHRoOiAnNTAlJywgaGVpZ2h0OiAnMTAwJScsIHpJbmRleDogMjAsIG1pbldpZHRoOiAyMCB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBzZXRJbnNlcnRJbmRpY2F0b3IoeyBzdGFuZElkOiBzdGFuZC5pZCwgaW5kZXg6IGlkeCArIDEgfSk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Ecm9wPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGRyb3BPblN0YW5kKHN0YW5kLmlkLCBpZHggKyAxKTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgcmlnaHQ6IC02LCB0b3A6IDAsIHdpZHRoOiAnNTAlJywgaGVpZ2h0OiAnMTAwJScsIHpJbmRleDogMjAsIG1pbldpZHRoOiAyMCB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIEluc2VydCBpbmRpY2F0b3IgYmVmb3JlIHRoaXMgdGVzdCBcdTIwMTQgc3VwcHJlc3NlZCBmb3IgUnVubmluZyBkcmFncyAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd0hlcmUgJiYgIWRyYWdnZWRJc1J1bm5pbmcgJiYgaW5kIS5pbmRleCA9PT0gaWR4ICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IC00LCB0b3A6IDAsIGJvdHRvbTogMCB9fT48SW5zZXJ0TGluZSB0aGVtZT17dGhlbWV9IC8+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFRlc3QgYmFyICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAsIHRvcDogMCwgd2lkdGgsIGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRlc3RCYXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdD17dGVzdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNUZXN0UnVubmluZz17aXNUZXN0UnVubmluZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dlZFRlc3RJZD17ZHJhZ2dlZFRlc3RJZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCQVJfSEVJR0hUPXtCQVJfSEVJR0hUfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5U3RhdHVzPXtkaXNwbGF5U3RhdHVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZE1haW49e3Jlc29sdmVkTWFpbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRJbmZvPXtyZXNvbHZlZEluZm99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dJbmZvT25CYXI9e3Nob3dJbmZvT25CYXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EcmFnU3RhcnQ9eyhlKSA9PiB7IGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7IGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBTdHJpbmcodGVzdC5pZCkpOyBzZXREcmFnZ2VkVGVzdElkKHRlc3QuaWQpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9e2NsZWFyRHJhZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25NZW51T3Blbj17KHJlY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhZ2dlZFRlc3RJZCB8fCBpc0xvY2tlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFByaW9yaXR5SW5wdXRWYWx1ZShTdHJpbmcodGVzdC5wcmlvcml0eSA/PyA1MCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFBvcG92ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yUmVjdDogcmVjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiAncm9vdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5U3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcExpbmVzOiByZXNvbHZlVGVtcGxhdGUodGlwVGVtcGxhdGUsIHRlc3QpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkOiBpc1Rlc3RSdW5uaW5nID8gbnVsbCA6IHsgc3RhcnQ6IHRlc3Quc3RhcnQsIGVuZDogdGVzdC5lbmQgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDaGFuZ2VvdmVyIGluZGljYXRvciAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aWR4IDwgc2NoZWR1bGUubGVuZ3RoICYmIGNoYW5nZW92ZXJXaWR0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogd2lkdGgsIHRvcDogTEFORV9IRUlHSFQgLyAyIC0gOCwgd2lkdGg6IGNoYW5nZW92ZXJXaWR0aCwgaGVpZ2h0OiAxNiwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogMSwgd2lkdGg6ICc4MCUnLCBiYWNrZ3JvdW5kOiBgcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCg5MGRlZywgJHt0aGVtZS50ZXh0RGlzYWJsZWR9IDAsICR7dGhlbWUudGV4dERpc2FibGVkfSA0cHgsIHRyYW5zcGFyZW50IDRweCwgdHJhbnNwYXJlbnQgOHB4KWAgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIEluc2VydCBpbmRpY2F0b3IgYXQgZW5kIFx1MjAxNCBzdXBwcmVzc2VkIHdoZW4gZHJhZ2dpbmcgYSBSdW5uaW5nIHRlc3QgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3Nob3dIZXJlICYmICFkcmFnZ2VkSXNSdW5uaW5nICYmIGluZCEuaW5kZXggPT09IHN0YW5kLnRlc3RzLmxlbmd0aCAmJiBzY2hlZHVsZS5sZW5ndGggPiAwICYmICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0ID0gc2NoZWR1bGVbc2NoZWR1bGUubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxlZnQsIHdpZHRoIH0gPSBnZXRCYXJQb3MobGFzdC5zdGFydCwgbGFzdC5kdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjRW5kID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChsYXN0LmVuZCwgc3RhbmQuY2hhbmdlb3Zlcl9ob3Vycywgd1N0YXJ0LCB3RW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZW92ZXJXaWR0aCA9IGhvdXJzQmV0d2VlbihsYXN0LmVuZCwgY0VuZCkgKiBweFBlckhvdXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogbGVmdCArIHdpZHRoICsgY2hhbmdlb3ZlcldpZHRoICsgOCwgdG9wOiAwLCBib3R0b206IDAgfX0+PEluc2VydExpbmUgdGhlbWU9e3RoZW1lfSAvPjwvZGl2PjtcclxuICAgICAgICAgICAgICAgICAgICB9KSgpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogRW1wdHkgc3RhdGUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3N0YW5kLnRlc3RzLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgaW5zZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDExLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogZHJhZ2dlZFRlc3RJZCA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLnRleHREaXNhYmxlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogZHJhZ2dlZFRlc3RJZCA/IDYwMCA6IDQwMCxcclxuICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZHJhZ2dlZFRlc3RJZCA/ICdEcm9wIGhlcmUgdG8gc2NoZWR1bGUnIDogJ0Ryb3AgdGVzdHMgaGVyZSB0byBzY2hlZHVsZSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgey8qIE5vIHN0YW5kcyBtZXNzYWdlICovfVxyXG4gICAgICAgICAgICB7c3RhbmRzLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHRleHRBbGlnbjogJ2NlbnRlcicsIHBhZGRpbmc6ICc0OHB4IDI0cHgnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgTm8gdGVzdCBzdGFuZHMgbG9hZGVkLiBCaW5kIHRoZSB0ZXN0U3RhbmRzIHByb3BlcnR5IHRvIHlvdXIgZ2V0VGVzdFN0YW5kcyBxdWVyeS5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtwb3BvdmVyICYmIChcclxuICAgICAgICA8QWN0aW9uUG9wb3ZlclxyXG4gICAgICAgICAgcG9wb3Zlcj17cG9wb3Zlcn1cclxuICAgICAgICAgIHN0YXR1c09wdGlvbnNMaXN0PXtzdGF0dXNPcHRpb25zTGlzdH1cclxuICAgICAgICAgIHByaW9yaXR5SW5wdXRWYWx1ZT17cHJpb3JpdHlJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgc3RhcnREYXRlSW5wdXRWYWx1ZT17c3RhcnREYXRlSW5wdXRWYWx1ZX1cclxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cclxuICAgICAgICAgIG9uQ2xvc2U9e2Nsb3NlUG9wb3Zlcn1cclxuICAgICAgICAgIG9uTW9kZUNoYW5nZT17aGFuZGxlUG9wb3Zlck1vZGVDaGFuZ2V9XHJcbiAgICAgICAgICBvblByaW9yaXR5SW5wdXRDaGFuZ2U9e3NldFByaW9yaXR5SW5wdXRWYWx1ZX1cclxuICAgICAgICAgIG9uQ29uZmlybVByaW9yaXR5PXtoYW5kbGVDb25maXJtUHJpb3JpdHl9XHJcbiAgICAgICAgICBvblBpY2tTdGF0dXM9e2hhbmRsZVBpY2tTdGF0dXN9XHJcbiAgICAgICAgICBvbkVkaXRUZXN0PXtoYW5kbGVFZGl0VGVzdH1cclxuICAgICAgICAgIG9uU3RhcnREYXRlSW5wdXRDaGFuZ2U9e3NldFN0YXJ0RGF0ZUlucHV0VmFsdWV9XHJcbiAgICAgICAgICBvbkNvbmZpcm1TdGFydERhdGU9e2hhbmRsZUNvbmZpcm1TdGFydERhdGV9XHJcbiAgICAgICAgICBwYW5lbFJlZj17cG9wb3ZlclJlZn1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuIiwgIlxuICAgICAgICAgIGV4cG9ydCBjb25zdCB7IFJldG9vbCB9ID0gd2luZG93LmNjY19zdXBwb3J0X1JldG9vbEN1c3RvbUNvbXBvbmVuQ29sbGVjdGlvbnM7XG4gICAgICAgICIsICJcbiAgICAgICAgICBleHBvcnQgY29uc3QgeyBGcmFnbWVudCwganN4cywganN4LCBkZWZhdWx0IH0gPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmVhY3RKU1hSdW50aW1lO1xuICAgICAgICAiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ1UsV0FBTyxVQUFVLE9BQU87QUFBQTtBQUFBOzs7QUNEbEMsbUJBQW1FOzs7QUNDbEQsSUFBTSxFQUFFLE9BQU8sSUFBSSxPQUFPOzs7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
