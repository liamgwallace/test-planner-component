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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVhY3QtZ2xvYmFsOnJlYWN0IiwgIi4uL3NyYy9pbmRleC50c3giLCAidHJ5cmV0b29sLWN1c3RvbS1jb21wb25lbnQtY29sbGVjdGlvbnMtZ2xvYmFsOkB0cnlyZXRvb2wvY3VzdG9tLWNvbXBvbmVudC1zdXBwb3J0IiwgInJlYWN0LWpzeC1ydW50aW1lLWdsb2JhbDpyZWFjdC9qc3gtcnVudGltZSJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmVhY3Q7XG4gICAgICAgICIsICJpbXBvcnQgUmVhY3QsIHsgRkMsIHVzZVJlZiwgdXNlTWVtbywgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBSZXRvb2wgfSBmcm9tIFwiQHRyeXJldG9vbC9jdXN0b20tY29tcG9uZW50LXN1cHBvcnRcIjtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBUeXBlc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuaW50ZXJmYWNlIFRlc3REYXRhIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkdXJhdGlvbjogbnVtYmVyO1xyXG4gIG93bmVyOiBzdHJpbmc7XHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuICBub3Rlczogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpb3JpdHlfb3JkZXI6IG51bWJlciB8IG51bGw7XHJcbiAgYWxsb2NhdGlvbl9pZDogbnVtYmVyIHwgbnVsbDtcclxuICBhc3NpZ25lZF9wYXJ0czogc3RyaW5nIHwgbnVsbDtcclxuICBwYXJ0X3JlYWR5X2RhdGU6IHN0cmluZyB8IG51bGw7XHJcbiAgcGFydF9zdGF0dXM6IHN0cmluZztcclxuICB0ZXN0X3N0YXJ0ZWRfZGF0ZTogc3RyaW5nIHwgbnVsbDtcclxuICBba2V5OiBzdHJpbmddOiBhbnk7IC8vIGFsbG93IGFyYml0cmFyeSBmaWVsZHMgZm9yIHRlbXBsYXRlIHJlc29sdXRpb25cclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YW5kRGVmIHtcclxuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBjaGFuZ2VvdmVyX2hvdXJzPzogbnVtYmVyIHwgbnVsbDtcclxufVxyXG5cclxuaW50ZXJmYWNlIE5vbldvcmtpbmdCbG9jayB7XHJcbiAgc3RhcnQ6IERhdGU7XHJcbiAgZW5kOiBEYXRlO1xyXG4gIG5vdGVzPzogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSW50ZXJuYWxTdGFuZCB7XHJcbiAgaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgdGVzdHM6IFRlc3REYXRhW107XHJcbiAgY2hhbmdlb3Zlcl9ob3VyczogbnVtYmVyO1xyXG4gIG5vbldvcmtpbmdCbG9ja3M6IE5vbldvcmtpbmdCbG9ja1tdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgU2NoZWR1bGVkVGVzdCBleHRlbmRzIFRlc3REYXRhIHtcclxuICBzdGFydDogRGF0ZTtcclxuICBlbmQ6IERhdGU7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnNlcnRJbmRpY2F0b3Ige1xyXG4gIHN0YW5kSWQ6IG51bWJlciB8IHN0cmluZztcclxuICBpbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQWxsb2NhdGlvblJlY29yZCB7XHJcbiAgdGVzdF9pZDogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHRlc3Rfc3RhbmRfaWQ6IG51bWJlciB8IHN0cmluZztcclxuICBwcmlvcml0eV9vcmRlcjogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQW5jaG9yUmVjdCB7XHJcbiAgdG9wOiBudW1iZXI7XHJcbiAgYm90dG9tOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG4gIHJpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBQb3BvdmVyU3RhdGUge1xyXG4gIGFuY2hvclJlY3Q6IEFuY2hvclJlY3Q7XHJcbiAgdGVzdDogVGVzdERhdGE7XHJcbiAgbW9kZTogJ3Jvb3QnIHwgJ3ByaW9yaXR5JyB8ICdzdGF0dXMnIHwgJ3N0YXJ0X2RhdGUnO1xyXG4gIGRpc3BsYXlTdGF0dXM6IHN0cmluZztcclxuICB0b29sdGlwTGluZXM6IHN0cmluZztcclxuICBzY2hlZHVsZWQ6IHsgc3RhcnQ6IERhdGU7IGVuZDogRGF0ZSB9IHwgbnVsbDtcclxufVxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFRoZW1lXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5pbnRlcmZhY2UgVGhlbWVUb2tlbnMge1xyXG4gIGlzRGFyazogYm9vbGVhbjtcclxuXHJcbiAgLy8gQmFja2dyb3VuZHNcclxuICBjYW52YXM6IHN0cmluZztcclxuICBzdXJmYWNlOiBzdHJpbmc7XHJcbiAgc3VyZmFjZVNlY29uZGFyeTogc3RyaW5nO1xyXG4gIGJnU3VidGxlOiBzdHJpbmc7XHJcbiAgc3VyZmFjZUhvdmVyOiBzdHJpbmc7XHJcbiAgYWNjZW50U3VidGxlOiBzdHJpbmc7XHJcblxyXG4gIC8vIFJ1bm5pbmcgKHB1cnBsZSkgdGludHNcclxuICBydW5uaW5nQmc6IHN0cmluZztcclxuICBydW5uaW5nQm9yZGVyOiBzdHJpbmc7XHJcbiAgcnVubmluZ1RleHQ6IHN0cmluZztcclxuICBydW5uaW5nVGV4dERhcms6IHN0cmluZztcclxuXHJcbiAgLy8gVGV4dFxyXG4gIHRleHRQcmltYXJ5OiBzdHJpbmc7XHJcbiAgdGV4dFNlY29uZGFyeTogc3RyaW5nO1xyXG4gIHRleHRUZXJ0aWFyeTogc3RyaW5nO1xyXG4gIHRleHRNdXRlZDogc3RyaW5nO1xyXG4gIHRleHREaXNhYmxlZDogc3RyaW5nO1xyXG5cclxuICAvLyBCb3JkZXJzXHJcbiAgYm9yZGVyOiBzdHJpbmc7XHJcbiAgYm9yZGVyU3Ryb25nOiBzdHJpbmc7XHJcblxyXG4gIC8vIEFjY2VudCAocHJpbWFyeSBhY3Rpb24pXHJcbiAgYWNjZW50OiBzdHJpbmc7XHJcbiAgYWNjZW50Rmc6IHN0cmluZztcclxuICBhY2NlbnRNdXRlZDogc3RyaW5nO1xyXG5cclxuICAvLyBUeXBvZ3JhcGh5XHJcbiAgZm9udEZhbWlseTogc3RyaW5nO1xyXG4gIGZvbnRNb25vOiBzdHJpbmc7XHJcblxyXG4gIC8vIFJhZGlpIChudW1lcmljIHB4KVxyXG4gIHJhZGl1c1NtOiBudW1iZXI7XHJcbiAgcmFkaXVzOiBudW1iZXI7XHJcbiAgcmFkaXVzTGc6IG51bWJlcjtcclxuICByYWRpdXNYbDogbnVtYmVyO1xyXG5cclxuICAvLyBTdGF0dXMgY29sb3VycyAoY2FwIGJhcnMgJiB0ZXh0KVxyXG4gIHN0YXR1c0NhcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuICBzdGF0dXNUZXh0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG59XHJcblxyXG5jb25zdCBidWlsZFRoZW1lID0gKFxyXG4gIHJhdzogYW55LFxyXG4gIHN0YXR1c092ZXJyaWRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9LFxyXG4gIG1vbm9Gb250T3ZlcnJpZGU/OiBzdHJpbmdcclxuKTogVGhlbWVUb2tlbnMgPT4ge1xyXG4gIGNvbnN0IGlzRGFyayA9IHJhdz8ubW9kZSA9PT0gJ2RhcmsnO1xyXG5cclxuICBjb25zdCBhY2NlbnQgPSByYXc/LnByaW1hcnkgfHwgJyMzQjgyRjYnO1xyXG4gIGNvbnN0IGNhbnZhcyA9IHJhdz8uY2FudmFzIHx8IChpc0RhcmsgPyAnIzFDMUMyRScgOiAnI0Y5RkFGQicpO1xyXG4gIGNvbnN0IHN1cmZhY2UgPSByYXc/LnN1cmZhY2VQcmltYXJ5IHx8IChpc0RhcmsgPyAnIzI1MjUzNScgOiAnI0ZGRkZGRicpO1xyXG4gIGNvbnN0IHN1cmZhY2VTZWNvbmRhcnkgPSByYXc/LnN1cmZhY2VTZWNvbmRhcnkgfHwgKGlzRGFyayA/ICcjMUUxRTMwJyA6ICcjRjNGNEY2Jyk7XHJcbiAgY29uc3QgZm9udEZhbWlseSA9IHJhdz8uZGVmYXVsdEZvbnQ/Lm5hbWVcclxuICAgID8gYCcke3Jhdy5kZWZhdWx0Rm9udC5uYW1lfScsIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBzYW5zLXNlcmlmYFxyXG4gICAgOiBcIidETSBTYW5zJywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCI7XHJcblxyXG4gIGNvbnN0IGJhc2VSYWRpdXMgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgciA9IHJhdz8uYm9yZGVyUmFkaXVzO1xyXG4gICAgaWYgKCFyKSByZXR1cm4gNjtcclxuICAgIGNvbnN0IG4gPSBwYXJzZUludChTdHJpbmcociksIDEwKTtcclxuICAgIHJldHVybiBpc05hTihuKSA/IDYgOiBuO1xyXG4gIH0pKCk7XHJcblxyXG4gIC8vIFRleHRcclxuICBjb25zdCB0ZXh0UHJpbWFyeSAgPSBpc0RhcmsgPyAnI0Y5RkFGQicgOiAnIzExMTgyNyc7XHJcbiAgY29uc3QgdGV4dFNlY29uZGFyeSA9IGlzRGFyayA/ICcjRDFENURCJyA6ICcjMzc0MTUxJztcclxuICBjb25zdCB0ZXh0VGVydGlhcnkgPSBpc0RhcmsgPyAnI0EwQUVDMCcgOiAnIzRCNTU2Myc7XHJcbiAgY29uc3QgdGV4dE11dGVkICAgID0gaXNEYXJrID8gJyM3MTgwOTYnIDogJyM2QjcyODAnO1xyXG4gIGNvbnN0IHRleHREaXNhYmxlZCA9IGlzRGFyayA/ICcjNEI1NTYzJyA6ICcjOUNBM0FGJztcclxuXHJcbiAgLy8gQm9yZGVyc1xyXG4gIGNvbnN0IGJvcmRlciAgICAgICA9IGlzRGFyayA/ICcjMzc0MTUxJyA6ICcjRTVFN0VCJztcclxuICBjb25zdCBib3JkZXJTdHJvbmcgPSBpc0RhcmsgPyAnIzRCNTU2MycgOiAnI0QxRDVEQic7XHJcblxyXG4gIC8vIEJhY2tncm91bmRzXHJcbiAgY29uc3QgYmdTdWJ0bGUgICAgID0gaXNEYXJrID8gJyMxQTFBMkUnIDogJyNGM0Y0RjYnO1xyXG4gIGNvbnN0IHN1cmZhY2VIb3ZlciA9IGlzRGFyayA/ICcjMkUyRTNFJyA6ICcjRjNGNEY2JztcclxuICBjb25zdCBhY2NlbnRTdWJ0bGUgPSBpc0RhcmsgPyBgJHthY2NlbnR9MzNgIDogJyNFRkY2RkYnO1xyXG4gIGNvbnN0IGFjY2VudE11dGVkICA9IGlzRGFyayA/IGAke2FjY2VudH04MGAgOiAnIzkzQzVGRCc7XHJcblxyXG4gIC8vIFJ1bm5pbmcgcHVycGxlXHJcbiAgY29uc3QgcnVubmluZ0JnICAgICAgID0gaXNEYXJrID8gJyMyRDFCNEUnIDogJyNGM0U4RkYnO1xyXG4gIGNvbnN0IHJ1bm5pbmdCb3JkZXIgICA9IGlzRGFyayA/ICcjN0UzREFBJyA6ICcjQzRCNUZEJztcclxuICBjb25zdCBydW5uaW5nVGV4dCAgICAgPSAnIzdFMjJDRSc7XHJcbiAgY29uc3QgcnVubmluZ1RleHREYXJrID0gJyMzQjA3NjQnO1xyXG5cclxuICAvLyBTdGF0dXMgY2FwIGNvbG91cnNcclxuICBjb25zdCBkZWZhdWx0Q2FwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgJ1J1bm5pbmcnOiAgICAgICAgICAgICcjOTMzM0VBJyxcclxuICAgICdSZWFkeSc6ICAgICAgICAgICAgICAnIzIyQzU1RScsXHJcbiAgICAnT24gVGltZSc6ICAgICAgICAgICAgJyNFNUEwMEQnLFxyXG4gICAgJ0RlbGF5ZWQnOiAgICAgICAgICAgICcjRUY0NDQ0JyxcclxuICAgICdQYXJ0cyBOb3QgQXNzaWduZWQnOiAnIzlDQTNBRicsXHJcbiAgICAnSW4gUHJvZ3Jlc3MnOiAgICAgICAgJyNFNUEwMEQnLFxyXG4gIH07XHJcbiAgY29uc3QgZGVmYXVsdFRleHQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAnUnVubmluZyc6ICAgICAgICAgICAgJyM3RTIyQ0UnLFxyXG4gICAgJ1JlYWR5JzogICAgICAgICAgICAgICcjMTZBMzRBJyxcclxuICAgICdPbiBUaW1lJzogICAgICAgICAgICAnI0I0NTMwOScsXHJcbiAgICAnRGVsYXllZCc6ICAgICAgICAgICAgJyNEQzI2MjYnLFxyXG4gICAgJ1BhcnRzIE5vdCBBc3NpZ25lZCc6ICcjNkI3MjgwJyxcclxuICAgICdJbiBQcm9ncmVzcyc6ICAgICAgICAnI0I0NTMwOScsXHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzQ2FwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcbiAgY29uc3Qgc3RhdHVzVGV4dDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGRlZmF1bHRDYXApKSB7XHJcbiAgICBzdGF0dXNDYXBba2V5XSAgPSBzdGF0dXNPdmVycmlkZXNba2V5XSB8fCBkZWZhdWx0Q2FwW2tleV07XHJcbiAgICAvLyBkZXJpdmUgdGV4dCBjb2xvdXI6IGlmIG92ZXJyaWRkZW4sIGRhcmtlbiB0aGUgY2FwIGNvbG91ciBzbGlnaHRseTsgb3RoZXJ3aXNlIHVzZSBkZWZhdWx0XHJcbiAgICBzdGF0dXNUZXh0W2tleV0gPSBzdGF0dXNPdmVycmlkZXNba2V5XVxyXG4gICAgICA/IHN0YXR1c092ZXJyaWRlc1trZXldXHJcbiAgICAgIDogZGVmYXVsdFRleHRba2V5XTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpc0RhcmssXHJcbiAgICBjYW52YXMsIHN1cmZhY2UsIHN1cmZhY2VTZWNvbmRhcnksIGJnU3VidGxlLCBzdXJmYWNlSG92ZXIsIGFjY2VudFN1YnRsZSxcclxuICAgIHJ1bm5pbmdCZywgcnVubmluZ0JvcmRlciwgcnVubmluZ1RleHQsIHJ1bm5pbmdUZXh0RGFyayxcclxuICAgIHRleHRQcmltYXJ5LCB0ZXh0U2Vjb25kYXJ5LCB0ZXh0VGVydGlhcnksIHRleHRNdXRlZCwgdGV4dERpc2FibGVkLFxyXG4gICAgYm9yZGVyLCBib3JkZXJTdHJvbmcsXHJcbiAgICBhY2NlbnQsIGFjY2VudEZnOiAnI0ZGRkZGRicsIGFjY2VudE11dGVkLFxyXG4gICAgZm9udEZhbWlseSxcclxuICAgIGZvbnRNb25vOiBtb25vRm9udE92ZXJyaWRlID8gYCcke21vbm9Gb250T3ZlcnJpZGV9JywgbW9ub3NwYWNlYCA6IGZvbnRGYW1pbHksXHJcbiAgICByYWRpdXNTbTogTWF0aC5tYXgoMiwgYmFzZVJhZGl1cyAtIDIpLFxyXG4gICAgcmFkaXVzOiAgIGJhc2VSYWRpdXMsXHJcbiAgICByYWRpdXNMZzogYmFzZVJhZGl1cyArIDIsXHJcbiAgICByYWRpdXNYbDogYmFzZVJhZGl1cyArIDQsXHJcbiAgICBzdGF0dXNDYXAsXHJcbiAgICBzdGF0dXNUZXh0LFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gVGVtcGxhdGUgUmVzb2x1dGlvblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgZm9ybWF0RmllbGRWYWx1ZSA9ICh2YWw6IGFueSk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09ICcnIHx8IHZhbCA9PT0gJ25hbicpIHJldHVybiAnJztcclxuICBjb25zdCBzdHIgPSBTdHJpbmcodmFsKTtcclxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfS8udGVzdChzdHIpKSB7XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoc3RyKTtcclxuICAgIGlmICghaXNOYU4oZC5nZXRUaW1lKCkpKSB7XHJcbiAgICAgIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tR0InLCB7IGRheTogJzItZGlnaXQnLCBtb250aDogJ3Nob3J0JyB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHN0cjtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVUZW1wbGF0ZSA9ICh0ZW1wbGF0ZTogYW55LCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogc3RyaW5nID0+IHtcclxuICBpZiAoIXRlbXBsYXRlKSByZXR1cm4gJyc7XHJcbiAgY29uc3Qgc3RyID0gdHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyA/IHRlbXBsYXRlIDogU3RyaW5nKHRlbXBsYXRlKTtcclxuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCAoXywgZmllbGQpID0+IGZvcm1hdEZpZWxkVmFsdWUoZGF0YVtmaWVsZF0pKTtcclxufTtcclxuXHJcbmNvbnN0IGlzVGVtcGxhdGVFbXB0eSA9ICh0ZW1wbGF0ZTogYW55LCBkYXRhOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgc3RyID0gdHlwZW9mIHRlbXBsYXRlID09PSAnc3RyaW5nJyA/IHRlbXBsYXRlIDogU3RyaW5nKHRlbXBsYXRlIHx8ICcnKTtcclxuICBjb25zdCByZXNvbHZlZCA9IHJlc29sdmVUZW1wbGF0ZShzdHIsIGRhdGEpO1xyXG4gIGNvbnN0IHN0YXRpY09ubHkgPSBzdHIucmVwbGFjZSgvXFx7KFxcdyspXFx9L2csICcnKTtcclxuICByZXR1cm4gcmVzb2x2ZWQudHJpbSgpID09PSBzdGF0aWNPbmx5LnRyaW0oKSB8fCByZXNvbHZlZC50cmltKCkgPT09ICcnO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIERhdGUgVXRpbGl0aWVzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5jb25zdCBNU19QRVJfSE9VUiA9IDM2MDAwMDA7XHJcblxyXG5jb25zdCBwYXJzZUxvY2FsRGF0ZSA9IChkYXRlU3RyOiBzdHJpbmcgfCBudWxsKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghZGF0ZVN0cikgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgZGF0ZVBhcnQgPSBkYXRlU3RyLnNwbGl0KCdUJylbMF07IC8vIHN0cmlwIHRpbWUgY29tcG9uZW50IGlmIHByZXNlbnQgKGUuZy4gSVNPIHRpbWVzdGFtcHMpXHJcbiAgY29uc3QgcGFydHMgPSBkYXRlUGFydC5zcGxpdCgnLScpLm1hcChOdW1iZXIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMgfHwgcGFydHMuc29tZShpc05hTikpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGQgPSBuZXcgRGF0ZShwYXJ0c1swXSwgcGFydHNbMV0gLSAxLCBwYXJ0c1syXSwgMCwgMCwgMCwgMCk7XHJcbiAgcmV0dXJuIGlzTmFOKGQuZ2V0VGltZSgpKSA/IG51bGwgOiBkO1xyXG59O1xyXG5cclxuY29uc3QgdG9NaWRuaWdodCA9IChkYXRlOiBEYXRlKTogRGF0ZSA9PiB7XHJcbiAgY29uc3QgZCA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gIGQuc2V0SG91cnMoMCwgMCwgMCwgMCk7XHJcbiAgcmV0dXJuIGQ7XHJcbn07XHJcblxyXG5jb25zdCBpc1dvcmtEYXkgPSAoZDogRGF0ZSk6IGJvb2xlYW4gPT4gZC5nZXREYXkoKSAhPT0gMCAmJiBkLmdldERheSgpICE9PSA2O1xyXG5cclxuY29uc3QgZ2V0TmV4dFdvcmtkYXlTdGFydCA9IChkYXRlOiBEYXRlLCB3b3JrU3RhcnQ6IG51bWJlcik6IERhdGUgPT4ge1xyXG4gIGNvbnN0IGQgPSBuZXcgRGF0ZShkYXRlKTtcclxuICBkLnNldEhvdXJzKHdvcmtTdGFydCwgMCwgMCwgMCk7XHJcbiAgd2hpbGUgKGQuZ2V0RGF5KCkgPT09IDAgfHwgZC5nZXREYXkoKSA9PT0gNikge1xyXG4gICAgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgfVxyXG4gIHJldHVybiBkO1xyXG59O1xyXG5cclxuY29uc3QgY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZCA9IChcclxuICBwcmV2VGVzdEVuZDogRGF0ZSxcclxuICBjaGFuZ2VvdmVySG91cnM6IG51bWJlcixcclxuICB3b3JrU3RhcnQ6IG51bWJlcixcclxuICB3b3JrRW5kOiBudW1iZXJcclxuKTogRGF0ZSA9PiB7XHJcbiAgbGV0IGNoYW5nZW92ZXJTdGFydCA9IG5ldyBEYXRlKHByZXZUZXN0RW5kKTtcclxuXHJcbiAgaWYgKCFpc1dvcmtEYXkoY2hhbmdlb3ZlclN0YXJ0KSB8fCBjaGFuZ2VvdmVyU3RhcnQuZ2V0SG91cnMoKSA+PSB3b3JrRW5kKSB7XHJcbiAgICBjaGFuZ2VvdmVyU3RhcnQgPSBnZXROZXh0V29ya2RheVN0YXJ0KG5ldyBEYXRlKGNoYW5nZW92ZXJTdGFydC5nZXRUaW1lKCkgKyBNU19QRVJfSE9VUiAqIDEyKSwgd29ya1N0YXJ0KTtcclxuICB9IGVsc2UgaWYgKGNoYW5nZW92ZXJTdGFydC5nZXRIb3VycygpIDwgd29ya1N0YXJ0KSB7XHJcbiAgICBjaGFuZ2VvdmVyU3RhcnQuc2V0SG91cnMod29ya1N0YXJ0LCAwLCAwLCAwKTtcclxuICB9XHJcblxyXG4gIGxldCByZW1haW5pbmcgPSBjaGFuZ2VvdmVySG91cnM7XHJcbiAgbGV0IGVuZCA9IG5ldyBEYXRlKGNoYW5nZW92ZXJTdGFydCk7XHJcblxyXG4gIHdoaWxlIChyZW1haW5pbmcgPiAwKSB7XHJcbiAgICBpZiAoIWlzV29ya0RheShlbmQpKSB7XHJcbiAgICAgIGVuZCA9IGdldE5leHRXb3JrZGF5U3RhcnQobmV3IERhdGUoZW5kLmdldFRpbWUoKSArIE1TX1BFUl9IT1VSICogMTIpLCB3b3JrU3RhcnQpO1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuICAgIGNvbnN0IGF2YWlsYWJsZSA9IHdvcmtFbmQgLSBlbmQuZ2V0SG91cnMoKTtcclxuICAgIGNvbnN0IGFwcGx5ID0gTWF0aC5taW4ocmVtYWluaW5nLCBhdmFpbGFibGUpO1xyXG4gICAgZW5kLnNldFRpbWUoZW5kLmdldFRpbWUoKSArIGFwcGx5ICogTVNfUEVSX0hPVVIpO1xyXG4gICAgcmVtYWluaW5nIC09IGFwcGx5O1xyXG4gICAgaWYgKHJlbWFpbmluZyA+IDApIHtcclxuICAgICAgZW5kID0gZ2V0TmV4dFdvcmtkYXlTdGFydChuZXcgRGF0ZShlbmQuZ2V0VGltZSgpICsgTVNfUEVSX0hPVVIgKiAxMiksIHdvcmtTdGFydCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBlbmQ7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZU5vbldvcmtpbmdCbG9ja3MgPSAocmF3OiBhbnkpOiBOb25Xb3JraW5nQmxvY2tbXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHJhdykpIHJldHVybiBbXTtcclxuICBjb25zdCByZXN1bHQ6IE5vbldvcmtpbmdCbG9ja1tdID0gW107XHJcbiAgZm9yIChjb25zdCBlbnRyeSBvZiByYXcpIHtcclxuICAgIGlmICghZW50cnkgfHwgdHlwZW9mIGVudHJ5ICE9PSAnb2JqZWN0JykgY29udGludWU7XHJcbiAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKGVudHJ5LnN0YXJ0KTtcclxuICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKGVudHJ5LmVuZCk7XHJcbiAgICBpZiAoaXNOYU4oc3RhcnQuZ2V0VGltZSgpKSB8fCBpc05hTihlbmQuZ2V0VGltZSgpKSB8fCBlbmQgPD0gc3RhcnQpIGNvbnRpbnVlO1xyXG4gICAgcmVzdWx0LnB1c2goeyBzdGFydCwgZW5kLCBub3RlczogZW50cnkubm90ZXMgPz8gdW5kZWZpbmVkIH0pO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgYWR2YW5jZVBhc3ROb25Xb3JraW5nID0gKGRhdGU6IERhdGUsIGJsb2NrczogTm9uV29ya2luZ0Jsb2NrW10pOiBEYXRlID0+IHtcclxuICBsZXQgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgbGV0IGNoYW5nZWQgPSB0cnVlO1xyXG4gIHdoaWxlIChjaGFuZ2VkKSB7XHJcbiAgICBjaGFuZ2VkID0gZmFsc2U7XHJcbiAgICBmb3IgKGNvbnN0IGIgb2YgYmxvY2tzKSB7XHJcbiAgICAgIGlmIChyZXN1bHQgPj0gYi5zdGFydCAmJiByZXN1bHQgPCBiLmVuZCkge1xyXG4gICAgICAgIHJlc3VsdCA9IG5ldyBEYXRlKGIuZW5kKTtcclxuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuLy8gUHVzaCBzdGFydCBmb3J3YXJkIHVudGlsIHRoZSBmdWxsIHdpbmRvdyBbc3RhcnQsIHN0YXJ0K2R1cmF0aW9uKSBkb2Vzbid0IG92ZXJsYXAgYW55IGJsb2NrLlxyXG5jb25zdCBmaW5kVmFsaWRTdGFydCA9IChwcm9wb3NlZFN0YXJ0OiBEYXRlLCBkdXJhdGlvbkhvdXJzOiBudW1iZXIsIGJsb2NrczogTm9uV29ya2luZ0Jsb2NrW10pOiBEYXRlID0+IHtcclxuICBsZXQgcmVzdWx0ID0gbmV3IERhdGUocHJvcG9zZWRTdGFydCk7XHJcbiAgbGV0IGNoYW5nZWQgPSB0cnVlO1xyXG4gIHdoaWxlIChjaGFuZ2VkKSB7XHJcbiAgICBjaGFuZ2VkID0gZmFsc2U7XHJcbiAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShyZXN1bHQuZ2V0VGltZSgpICsgZHVyYXRpb25Ib3VycyAqIE1TX1BFUl9IT1VSKTtcclxuICAgIGZvciAoY29uc3QgYiBvZiBibG9ja3MpIHtcclxuICAgICAgaWYgKHJlc3VsdCA8IGIuZW5kICYmIGVuZCA+IGIuc3RhcnQpIHtcclxuICAgICAgICByZXN1bHQgPSBuZXcgRGF0ZShiLmVuZCk7XHJcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlRGF5cyA9IChzdGFydDogRGF0ZSwgbnVtRGF5czogbnVtYmVyKTogRGF0ZVtdID0+IHtcclxuICBjb25zdCBkYXlzOiBEYXRlW10gPSBbXTtcclxuICBsZXQgY3VyID0gbmV3IERhdGUoc3RhcnQpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtRGF5czsgaSsrKSB7XHJcbiAgICBkYXlzLnB1c2gobmV3IERhdGUoY3VyKSk7XHJcbiAgICBjdXIuc2V0RGF0ZShjdXIuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgfVxyXG4gIHJldHVybiBkYXlzO1xyXG59O1xyXG5cclxuY29uc3QgZ2VuZXJhdGVXZWVrcyA9IChzdGFydDogRGF0ZSwgbnVtRGF5czogbnVtYmVyKTogRGF0ZVtdID0+IHtcclxuICBjb25zdCByZXN1bHQ6IERhdGVbXSA9IFtdO1xyXG4gIGxldCBjdXIgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgd2hpbGUgKGN1ci5nZXREYXkoKSAhPT0gMSkgY3VyLnNldERhdGUoY3VyLmdldERhdGUoKSAtIDEpO1xyXG4gIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZShzdGFydCk7XHJcbiAgZW5kRGF0ZS5zZXREYXRlKGVuZERhdGUuZ2V0RGF0ZSgpICsgbnVtRGF5cyk7XHJcbiAgd2hpbGUgKGN1ciA8IGVuZERhdGUpIHtcclxuICAgIHJlc3VsdC5wdXNoKG5ldyBEYXRlKGN1cikpO1xyXG4gICAgY3VyLnNldERhdGUoY3VyLmdldERhdGUoKSArIDcpO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5cclxuY29uc3QgaG91cnNCZXR3ZWVuID0gKGE6IERhdGUsIGI6IERhdGUpOiBudW1iZXIgPT4gKGIuZ2V0VGltZSgpIC0gYS5nZXRUaW1lKCkpIC8gTVNfUEVSX0hPVVI7XHJcbmNvbnN0IGZvcm1hdFdlZWsgPSAoZDogRGF0ZSk6IHN0cmluZyA9PiBgVy9DICR7ZC50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLUdCJywgeyBkYXk6ICcyLWRpZ2l0JywgbW9udGg6ICdzaG9ydCcgfSl9YDtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBQYXJ0IFN0YXR1cyBMb2dpY1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3Qgbm9ybWFsaXplUGFydFN0YXR1cyA9IChyYXdTdGF0dXM6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCFyYXdTdGF0dXMgfHwgcmF3U3RhdHVzID09PSAnbmFuJykgcmV0dXJuICdJbiBQcm9ncmVzcyc7XHJcbiAgY29uc3QgbG93ZXIgPSByYXdTdGF0dXMudG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgaWYgKGxvd2VyID09PSAncmVhZHknKSByZXR1cm4gJ1JlYWR5JztcclxuICBpZiAobG93ZXIgPT09ICdwYXJ0cyBub3QgYXNzaWduZWQnKSByZXR1cm4gJ1BhcnRzIE5vdCBBc3NpZ25lZCc7XHJcbiAgcmV0dXJuICdJbiBQcm9ncmVzcyc7XHJcbn07XHJcblxyXG5jb25zdCBnZXRDYWxjdWxhdGVkU3RhdHVzID0gKHRlc3Q6IFRlc3REYXRhLCB0ZXN0U3RhcnREYXRlOiBEYXRlIHwgbnVsbCA9IG51bGwpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGJhc2VTdGF0dXMgPSBub3JtYWxpemVQYXJ0U3RhdHVzKHRlc3QucGFydF9zdGF0dXMpO1xyXG4gIGlmIChiYXNlU3RhdHVzID09PSAnUmVhZHknKSByZXR1cm4gJ1JlYWR5JztcclxuICBpZiAoYmFzZVN0YXR1cyA9PT0gJ1BhcnRzIE5vdCBBc3NpZ25lZCcpIHJldHVybiAnUGFydHMgTm90IEFzc2lnbmVkJztcclxuXHJcbiAgaWYgKHRlc3RTdGFydERhdGUgJiYgdGVzdC5wYXJ0X3JlYWR5X2RhdGUpIHtcclxuICAgIGNvbnN0IHJlYWR5RGF0ZSA9IHBhcnNlTG9jYWxEYXRlKHRlc3QucGFydF9yZWFkeV9kYXRlKTtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IHRvTWlkbmlnaHQodGVzdFN0YXJ0RGF0ZSk7XHJcbiAgICBpZiAocmVhZHlEYXRlICYmIHN0YXJ0RGF0ZSkge1xyXG4gICAgICByZXR1cm4gcmVhZHlEYXRlLmdldFRpbWUoKSA+IHN0YXJ0RGF0ZS5nZXRUaW1lKCkgPyAnRGVsYXllZCcgOiAnT24gVGltZSc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiAnSW4gUHJvZ3Jlc3MnO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIFN0YXR1cyAvIFByaW9yaXR5IGhlbHBlcnMgKHRoZW1lLWF3YXJlKVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgaXNSdW5uaW5nVGVzdCA9ICh0ZXN0OiBUZXN0RGF0YSk6IGJvb2xlYW4gPT4gdGVzdC5zdGF0dXMgPT09ICdSdW5uaW5nJztcclxuXHJcbmNvbnN0IGdldENhcENvbG9yID0gKHN0YXR1czogc3RyaW5nLCB0aGVtZTogVGhlbWVUb2tlbnMpOiBzdHJpbmcgPT5cclxuICB0aGVtZS5zdGF0dXNDYXBbc3RhdHVzXSB8fCB0aGVtZS5zdGF0dXNDYXBbJ0luIFByb2dyZXNzJ10gfHwgJyNFNUEwMEQnO1xyXG5cclxuY29uc3QgZ2V0U3RhdHVzVGV4dENvbG9yID0gKHN0YXR1czogc3RyaW5nLCB0aGVtZTogVGhlbWVUb2tlbnMpOiBzdHJpbmcgPT5cclxuICB0aGVtZS5zdGF0dXNUZXh0W3N0YXR1c10gfHwgdGhlbWUuc3RhdHVzVGV4dFsnSW4gUHJvZ3Jlc3MnXSB8fCAnI0I0NTMwOSc7XHJcblxyXG4vLyBSZXR1cm5zICdSdW5uaW5nJyBmb3IgUnVubmluZyB0ZXN0cyAob3ZlcnJpZGVzIHBhcnQgc3RhdHVzIGZvciBkaXNwbGF5IGNvbG91cnMpXHJcbmNvbnN0IGdldERpc3BsYXlTdGF0dXMgPSAodGVzdDogVGVzdERhdGEsIHRlc3RTdGFydERhdGU6IERhdGUgfCBudWxsID0gbnVsbCk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKGlzUnVubmluZ1Rlc3QodGVzdCkpIHJldHVybiAnUnVubmluZyc7XHJcbiAgcmV0dXJuIGdldENhbGN1bGF0ZWRTdGF0dXModGVzdCwgdGVzdFN0YXJ0RGF0ZSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRQcmlvcml0eVRleHRDb2xvciA9IChwcmlvcml0eTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSB0eXBlb2YgcHJpb3JpdHkgPT09ICdudW1iZXInID8gcHJpb3JpdHkgOiA1MDtcclxuICBjb25zdCBjbGFtcGVkID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCB2YWx1ZSkpO1xyXG4gIGlmIChjbGFtcGVkIDw9IDMwKSByZXR1cm4gJyM2QjcyODAnO1xyXG4gIGlmIChjbGFtcGVkIDw9IDYwKSByZXR1cm4gJyNGNTlFMEInO1xyXG4gIGlmIChjbGFtcGVkIDw9IDgwKSByZXR1cm4gJyNFQTU4MEMnO1xyXG4gIHJldHVybiAnI0RDMjYyNic7XHJcbn07XHJcblxyXG5jb25zdCBnZXRQcmlvcml0eUNvbG9yID0gKHByaW9yaXR5OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBwcmlvcml0eSA9PT0gJ251bWJlcicgPyBwcmlvcml0eSA6IDUwO1xyXG4gIGNvbnN0IGNsYW1wZWQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHZhbHVlKSk7XHJcbiAgY29uc3QgcmF0aW8gPSBjbGFtcGVkIC8gMTAwO1xyXG4gIGNvbnN0IGcgPSBNYXRoLnJvdW5kKDI1NSAqICgxIC0gcmF0aW8pKTtcclxuICBjb25zdCBiID0gTWF0aC5yb3VuZCgyNTUgKiAoMSAtIHJhdGlvKSk7XHJcbiAgcmV0dXJuIGByZ2JhKDI1NSwgJHtnfSwgJHtifSwgMC42KWA7XHJcbn07XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gU3ViLWNvbXBvbmVudHNcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IEluc2VydExpbmU6IEZDPHsgdGhlbWU6IFRoZW1lVG9rZW5zIH0+ID0gKHsgdGhlbWUgfSkgPT4gKFxyXG4gIDxkaXYgc3R5bGU9e3tcclxuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDIsIGJvdHRvbTogMiwgd2lkdGg6IDMsXHJcbiAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsIGJvcmRlclJhZGl1czogMiwgekluZGV4OiAzMCxcclxuICAgIGJveFNoYWRvdzogYDAgMCAxMnB4ICR7dGhlbWUuYWNjZW50fSwgMCAwIDRweCAke3RoZW1lLmFjY2VudH1gLFxyXG4gICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxyXG4gIH19PlxyXG4gICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAtNCwgbGVmdDogLTQsIHdpZHRoOiAxMSwgaGVpZ2h0OiAxMSwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50IH19IC8+XHJcbiAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBib3R0b206IC00LCBsZWZ0OiAtNCwgd2lkdGg6IDExLCBoZWlnaHQ6IDExLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQgfX0gLz5cclxuICA8L2Rpdj5cclxuKTtcclxuXHJcbmNvbnN0IE91dGxpbmVLZXk6IEZDPHsgdGhlbWU6IFRoZW1lVG9rZW5zIH0+ID0gKHsgdGhlbWUgfSkgPT4gKFxyXG4gIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMTZweCcsIGJvcmRlclRvcDogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMgfX0+XHJcbiAgICA8aDMgc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNzAwLCBsZXR0ZXJTcGFjaW5nOiAnMC4wOGVtJywgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsIGNvbG9yOiB0aGVtZS50ZXh0VGVydGlhcnksIG1hcmdpbkJvdHRvbTogNiB9fT5TdGF0dXMgS2V5PC9oMz5cclxuICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4V3JhcDogJ3dyYXAnLCBnYXA6ICc0cHggMCcgfX0+XHJcbiAgICAgIHsoWydSdW5uaW5nJywgJ1JlYWR5JywgJ09uIFRpbWUnLCAnRGVsYXllZCcsICdQYXJ0cyBOb3QgQXNzaWduZWQnXSBhcyBjb25zdCkubWFwKChrZXkpID0+IChcclxuICAgICAgICA8ZGl2IGtleT17a2V5fSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDYsIHdpZHRoOiAnNTAlJywgbWluV2lkdGg6IDAgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA0LCBoZWlnaHQ6IDE0LCBiYWNrZ3JvdW5kOiB0aGVtZS5zdGF0dXNDYXBba2V5XSwgYm9yZGVyUmFkaXVzOiAyLCBmbGV4U2hyaW5rOiAwIH19IC8+XHJcbiAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDksIGNvbG9yOiB0aGVtZS5zdGF0dXNUZXh0W2tleV0sIGZvbnRXZWlnaHQ6IDYwMCwgd2hpdGVTcGFjZTogJ25vd3JhcCcsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnIH19PntrZXkudG9VcHBlckNhc2UoKX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkpfVxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5pbnRlcmZhY2UgUXVldWVDYXJkUHJvcHMge1xyXG4gIHRlc3Q6IFRlc3REYXRhO1xyXG4gIGRyYWdnZWRUZXN0SWQ6IHN0cmluZyB8IG51bWJlciB8IG51bGw7XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgbWFpblRleHQ6IHN0cmluZztcclxuICBzdWJUZXh0OiBzdHJpbmc7XHJcbiAgaW5mb1Jvdzogc3RyaW5nO1xyXG4gIHNob3dTdWI6IGJvb2xlYW47XHJcbiAgdGhlbWU6IFRoZW1lVG9rZW5zO1xyXG4gIG9uRHJhZ1N0YXJ0OiAoKSA9PiB2b2lkO1xyXG4gIG9uRHJhZ0VuZDogKCkgPT4gdm9pZDtcclxuICBvbkRyYWdPdmVyOiAoZTogUmVhY3QuRHJhZ0V2ZW50KSA9PiB2b2lkO1xyXG4gIG9uTWVudU9wZW46IChyZWN0OiBBbmNob3JSZWN0KSA9PiB2b2lkO1xyXG59XHJcblxyXG5jb25zdCBRdWV1ZUNhcmQ6IEZDPFF1ZXVlQ2FyZFByb3BzPiA9ICh7XHJcbiAgdGVzdCwgZHJhZ2dlZFRlc3RJZCwgc3RhdHVzLCBtYWluVGV4dCwgc3ViVGV4dCwgaW5mb1Jvdywgc2hvd1N1YiwgdGhlbWUsXHJcbiAgb25EcmFnU3RhcnQsIG9uRHJhZ0VuZCwgb25EcmFnT3Zlciwgb25NZW51T3BlbixcclxufSkgPT4ge1xyXG4gIGNvbnN0IFtob3ZlcmVkLCBzZXRIb3ZlcmVkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBwaWxsUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcclxuICBjb25zdCBjYXBDb2xvciA9IGdldENhcENvbG9yKHN0YXR1cywgdGhlbWUpO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGRyYWdnYWJsZVxyXG4gICAgICBvbkRyYWdTdGFydD17KGUpID0+IHsgZS5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJzsgb25EcmFnU3RhcnQoKTsgfX1cclxuICAgICAgb25EcmFnRW5kPXtvbkRyYWdFbmR9XHJcbiAgICAgIG9uRHJhZ092ZXI9e29uRHJhZ092ZXJ9XHJcbiAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0SG92ZXJlZCh0cnVlKX1cclxuICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRIb3ZlcmVkKGZhbHNlKX1cclxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgbWFyZ2luQm90dG9tOiA2LFxyXG4gICAgICAgIGJhY2tncm91bmQ6IGRyYWdnZWRUZXN0SWQgPT09IHRlc3QuaWQgPyB0aGVtZS5iZ1N1YnRsZSA6IHRoZW1lLnN1cmZhY2UsXHJcbiAgICAgICAgYm9yZGVyOiBob3ZlcmVkID8gYDJweCBzb2xpZCAke2NhcENvbG9yfWAgOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZyxcclxuICAgICAgICBjdXJzb3I6ICdncmFiJyxcclxuICAgICAgICBvcGFjaXR5OiBkcmFnZ2VkVGVzdElkID09PSB0ZXN0LmlkID8gMC4zNSA6IDEsXHJcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgIGJveFNoYWRvdzogaG92ZXJlZCA/ICcwIDRweCAxMnB4IHJnYmEoMCwwLDAsMC4xNSknIDogJzAgMXB4IDNweCByZ2JhKDAsMCwwLDAuMDYpJyxcclxuICAgICAgICB0cmFuc2Zvcm06IGhvdmVyZWQgPyAndHJhbnNsYXRlWSgtMnB4KScgOiAndHJhbnNsYXRlWSgwKScsXHJcbiAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjE1cyBlYXNlLCBib3gtc2hhZG93IDAuMTVzIGVhc2UsIGJvcmRlciAwLjE1cyBlYXNlJyxcclxuICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICB9fVxyXG4gICAgPlxyXG4gICAgICB7LyogU3RhdHVzIGNhcCBiYXIgKi99XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDUsIG1pbldpZHRoOiA1LCBiYWNrZ3JvdW5kOiBjYXBDb2xvciwgYm9yZGVyUmFkaXVzOiBgJHt0aGVtZS5yYWRpdXNMZ31weCAwIDAgJHt0aGVtZS5yYWRpdXNMZ31weGAsIGZsZXhTaHJpbms6IDAgfX0gLz5cclxuICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBwYWRkaW5nOiAnOHB4IDEycHgnLCBtaW5XaWR0aDogMCB9fT5cclxuICAgICAgICB7LyogVG9wIHJvdzogcHJpb3JpdHkgbGVmdCwgc3RhdHVzIHJpZ2h0ICovfVxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgbWFyZ2luQm90dG9tOiA0LCBwYWRkaW5nUmlnaHQ6IDIwIH19PlxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMywgZm9udFdlaWdodDogNzAwLCBjb2xvcjogZ2V0UHJpb3JpdHlUZXh0Q29sb3IodGVzdC5wcmlvcml0eSkgfX0+XHJcbiAgICAgICAgICAgIFB7dGVzdC5wcmlvcml0eX1cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDVlbScsIGNvbG9yOiBnZXRTdGF0dXNUZXh0Q29sb3Ioc3RhdHVzLCB0aGVtZSksIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIGFzIGNvbnN0IH19PlxyXG4gICAgICAgICAgICB7c3RhdHVzLnRvVXBwZXJDYXNlKCl9XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LCBtYXJnaW5Cb3R0b206IDIsIGxpbmVIZWlnaHQ6IDEuMyB9fT5cclxuICAgICAgICAgIHttYWluVGV4dH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7c2hvd1N1YiAmJiAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTEsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIG1hcmdpbkJvdHRvbTogNCwgZm9udFdlaWdodDogNDAwIH19PlxyXG4gICAgICAgICAgICB7c3ViVGV4dH1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGZvbnRTaXplOiAxMSwgY29sb3I6IHRoZW1lLnRleHRUZXJ0aWFyeSwgZmxleFdyYXA6ICd3cmFwJyB9fT5cclxuICAgICAgICAgIHtpbmZvUm93LnNwbGl0KCdcXHUwMGI3JykubWFwKChwYXJ0LCBpLCBhcnIpID0+IChcclxuICAgICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17aX0+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e3BhcnQudHJpbSgpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICB7aSA8IGFyci5sZW5ndGggLSAxICYmIDxzcGFuPnsnXFx1MDBiNyd9PC9zcGFuPn1cclxuICAgICAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgey8qIFRocmVlLWRvdCBtZW51IHBpbGwgKi99XHJcbiAgICAgIDxkaXZcclxuICAgICAgICByZWY9e3BpbGxSZWZ9XHJcbiAgICAgICAgZHJhZ2dhYmxlPXtmYWxzZX1cclxuICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XHJcbiAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBpZiAocGlsbFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHIgPSBwaWxsUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIG9uTWVudU9wZW4oeyB0b3A6IHIudG9wLCBib3R0b206IHIuYm90dG9tLCBsZWZ0OiByLmxlZnQsIHJpZ2h0OiByLnJpZ2h0IH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH19XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgdG9wOiA2LFxyXG4gICAgICAgICAgcmlnaHQ6IDYsXHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBob3ZlcmVkID8gJ3JnYmEoMCwwLDAsMC4xKScgOiAncmdiYSgwLDAsMCwwLjA0KScsXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IDEwLFxyXG4gICAgICAgICAgcGFkZGluZzogJzJweCA3cHgnLFxyXG4gICAgICAgICAgZm9udFNpemU6IDEzLFxyXG4gICAgICAgICAgY29sb3I6IHRoZW1lLnRleHRNdXRlZCxcclxuICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgbGV0dGVyU3BhY2luZzogJzAuMWVtJyxcclxuICAgICAgICAgIGxpbmVIZWlnaHQ6IDEsXHJcbiAgICAgICAgICBvcGFjaXR5OiBob3ZlcmVkID8gMSA6IDAuNCxcclxuICAgICAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMTVzLCBiYWNrZ3JvdW5kIDAuMTVzJyxcclxuICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDcwMCxcclxuICAgICAgICB9fVxyXG4gICAgICA+XHUwMEI3XHUwMEI3XHUwMEI3PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuaW50ZXJmYWNlIFRlc3RCYXJQcm9wcyB7XHJcbiAgdGVzdDogU2NoZWR1bGVkVGVzdDtcclxuICBpc1Rlc3RSdW5uaW5nOiBib29sZWFuO1xyXG4gIGRyYWdnZWRUZXN0SWQ6IHN0cmluZyB8IG51bWJlciB8IG51bGw7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBCQVJfSEVJR0hUOiBudW1iZXI7XHJcbiAgZGlzcGxheVN0YXR1czogc3RyaW5nO1xyXG4gIHJlc29sdmVkTWFpbjogc3RyaW5nO1xyXG4gIHJlc29sdmVkSW5mbzogc3RyaW5nO1xyXG4gIHNob3dJbmZvT25CYXI6IGJvb2xlYW47XHJcbiAgdGhlbWU6IFRoZW1lVG9rZW5zO1xyXG4gIG9uRHJhZ1N0YXJ0OiAoZTogUmVhY3QuRHJhZ0V2ZW50KSA9PiB2b2lkO1xyXG4gIG9uRHJhZ0VuZDogKCkgPT4gdm9pZDtcclxuICBvbk1lbnVPcGVuOiAocmVjdDogQW5jaG9yUmVjdCkgPT4gdm9pZDtcclxufVxyXG5cclxuY29uc3QgVGVzdEJhcjogRkM8VGVzdEJhclByb3BzPiA9ICh7XHJcbiAgdGVzdCwgaXNUZXN0UnVubmluZywgZHJhZ2dlZFRlc3RJZCwgd2lkdGgsIEJBUl9IRUlHSFQsXHJcbiAgZGlzcGxheVN0YXR1cywgcmVzb2x2ZWRNYWluLCByZXNvbHZlZEluZm8sIHNob3dJbmZvT25CYXIsIHRoZW1lLFxyXG4gIG9uRHJhZ1N0YXJ0LCBvbkRyYWdFbmQsIG9uTWVudU9wZW4sXHJcbn0pID0+IHtcclxuICBjb25zdCBbaG92ZXJlZCwgc2V0SG92ZXJlZF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgcGlsbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcbiAgY29uc3QgY2FwQ29sb3IgPSBnZXRDYXBDb2xvcihkaXNwbGF5U3RhdHVzLCB0aGVtZSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgZHJhZ2dhYmxlXHJcbiAgICAgIG9uRHJhZ1N0YXJ0PXtvbkRyYWdTdGFydH1cclxuICAgICAgb25EcmFnRW5kPXtvbkRyYWdFbmR9XHJcbiAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4geyBpZiAoIWRyYWdnZWRUZXN0SWQpIHNldEhvdmVyZWQodHJ1ZSk7IH19XHJcbiAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4gc2V0SG92ZXJlZChmYWxzZSl9XHJcbiAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAsIHRvcDogNixcclxuICAgICAgICB3aWR0aCwgaGVpZ2h0OiBCQVJfSEVJR0hULFxyXG4gICAgICAgIGJhY2tncm91bmQ6IGlzVGVzdFJ1bm5pbmcgPyB0aGVtZS5ydW5uaW5nQmcgOiB0aGVtZS5zdXJmYWNlLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzTGcsIGN1cnNvcjogJ2dyYWInLFxyXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ3JvdycsXHJcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgIG9wYWNpdHk6IGRyYWdnZWRUZXN0SWQgPT09IHRlc3QuaWQgPyAwLjI1IDogMSxcclxuICAgICAgICB6SW5kZXg6IGhvdmVyZWQgPyAyNSA6IDE1LFxyXG4gICAgICAgIGJvcmRlcjogaG92ZXJlZFxyXG4gICAgICAgICAgPyBgMnB4IHNvbGlkICR7Y2FwQ29sb3J9YFxyXG4gICAgICAgICAgOiBpc1Rlc3RSdW5uaW5nID8gYDFweCBzb2xpZCAke3RoZW1lLnJ1bm5pbmdCb3JkZXJ9YCA6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCxcclxuICAgICAgICBib3hTaGFkb3c6IGhvdmVyZWRcclxuICAgICAgICAgID8gJzAgNHB4IDEycHggcmdiYSgwLDAsMCwwLjE1KSdcclxuICAgICAgICAgIDogaXNUZXN0UnVubmluZyA/IGAwIDFweCAzcHggJHt0aGVtZS5ydW5uaW5nQm9yZGVyfTY2YCA6ICcwIDFweCAzcHggcmdiYSgwLDAsMCwwLjA2KScsXHJcbiAgICAgICAgdHJhbnNmb3JtOiBob3ZlcmVkID8gJ3RyYW5zbGF0ZVkoLTJweCknIDogJ3RyYW5zbGF0ZVkoMCknLFxyXG4gICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC4xNXMgZWFzZSwgYm94LXNoYWRvdyAwLjE1cyBlYXNlLCBib3JkZXIgMC4xNXMgZWFzZScsXHJcbiAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAgey8qIFN0YXR1cyBjYXAgYmFyICovfVxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiA1LCBtaW5XaWR0aDogNSwgYmFja2dyb3VuZDogY2FwQ29sb3IsIGZsZXhTaHJpbms6IDAgfX0gLz5cclxuICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBwYWRkaW5nOiAnNHB4IDhweCcsIG1pbldpZHRoOiAwLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XHJcbiAgICAgICAgey8qIFRvcCByb3c6IHByaW9yaXR5ICsgc3RhdHVzIChsZWF2ZSByb29tIGZvciBwaWxsKSAqL31cclxuICAgICAgICB7d2lkdGggPiA3MCAmJiAoXHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogMiwgcGFkZGluZ1JpZ2h0OiB3aWR0aCA+IDkwID8gMjIgOiAwIH19PlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IHdpZHRoID4gMTIwID8gMTEgOiA5LCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiBpc1Rlc3RSdW5uaW5nID8gdGhlbWUucnVubmluZ1RleHQgOiBnZXRQcmlvcml0eVRleHRDb2xvcih0ZXN0LnByaW9yaXR5KSB9fT5cclxuICAgICAgICAgICAgICB7aXNUZXN0UnVubmluZyA/ICdcdTI1QjYgUlVOTklORycgOiBgUCR7dGVzdC5wcmlvcml0eX1gfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIHt3aWR0aCA+IDExMCAmJiAhaXNUZXN0UnVubmluZyAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiA5LCBmb250V2VpZ2h0OiA3MDAsIGxldHRlclNwYWNpbmc6ICcwLjA1ZW0nLCBjb2xvcjogZ2V0U3RhdHVzVGV4dENvbG9yKGRpc3BsYXlTdGF0dXMsIHRoZW1lKSwgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgYXMgY29uc3QgfX0+XHJcbiAgICAgICAgICAgICAgICB7ZGlzcGxheVN0YXR1cy50b1VwcGVyQ2FzZSgpfVxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICl9XHJcbiAgICAgICAgey8qIE1haW4gdGV4dCAqL31cclxuICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgZm9udFNpemU6IHdpZHRoID4gMTIwID8gMTIgOiB3aWR0aCA+IDgwID8gMTEgOiAxMCxcclxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IGlzVGVzdFJ1bm5pbmcgPyB0aGVtZS5ydW5uaW5nVGV4dERhcmsgOiB0aGVtZS50ZXh0UHJpbWFyeSxcclxuICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIG1heFdpZHRoOiAnMTAwJScsIGxpbmVIZWlnaHQ6IDEuMixcclxuICAgICAgICB9fT5cclxuICAgICAgICAgIHtyZXNvbHZlZE1haW59XHJcbiAgICAgICAgPC9zcGFuPlxyXG5cclxuICAgICAgICB7LyogSW5mbyByb3cgKi99XHJcbiAgICAgICAge3Nob3dJbmZvT25CYXIgJiYgKFxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiA5LCBmb250V2VpZ2h0OiA0MDAsXHJcbiAgICAgICAgICAgIGNvbG9yOiBpc1Rlc3RSdW5uaW5nID8gdGhlbWUucnVubmluZ1RleHQgOiB0aGVtZS50ZXh0VGVydGlhcnksXHJcbiAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLCBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJywgbWF4V2lkdGg6ICcxMDAlJywgbWFyZ2luVG9wOiAyLFxyXG4gICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgIHtyZXNvbHZlZEluZm99XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7LyogVGhyZWUtZG90IG1lbnUgcGlsbCAqL31cclxuICAgICAge3dpZHRoID4gNDAgJiYgKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIHJlZj17cGlsbFJlZn1cclxuICAgICAgICAgIGRyYWdnYWJsZT17ZmFsc2V9XHJcbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XHJcbiAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAocGlsbFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgciA9IHBpbGxSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICBvbk1lbnVPcGVuKHsgdG9wOiByLnRvcCwgYm90dG9tOiByLmJvdHRvbSwgbGVmdDogci5sZWZ0LCByaWdodDogci5yaWdodCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICB0b3A6IDQsXHJcbiAgICAgICAgICAgIHJpZ2h0OiA0LFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBob3ZlcmVkID8gJ3JnYmEoMCwwLDAsMC4xKScgOiAncmdiYSgwLDAsMCwwLjA0KScsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogMTAsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggNnB4JyxcclxuICAgICAgICAgICAgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICBjb2xvcjogaXNUZXN0UnVubmluZyA/IHRoZW1lLnJ1bm5pbmdUZXh0IDogdGhlbWUudGV4dE11dGVkLFxyXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJzAuMWVtJyxcclxuICAgICAgICAgICAgbGluZUhlaWdodDogMSxcclxuICAgICAgICAgICAgb3BhY2l0eTogaG92ZXJlZCA/IDEgOiAwLjM1LFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjE1cywgYmFja2dyb3VuZCAwLjE1cycsXHJcbiAgICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogNzAwLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHUwMEI3XHUwMEI3XHUwMEI3PC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIENvbnRleHQgTWVudVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgTWVudUl0ZW06IEZDPHsgbGFiZWw6IHN0cmluZzsgaWNvbj86IHN0cmluZzsgdGhlbWU6IFRoZW1lVG9rZW5zOyBvbkNsaWNrOiAoKSA9PiB2b2lkIH0+ID0gKHsgbGFiZWwsIGljb24sIHRoZW1lLCBvbkNsaWNrIH0pID0+IHtcclxuICBjb25zdCBbaG92ZXJlZCwgc2V0SG92ZXJlZF0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRIb3ZlcmVkKHRydWUpfVxyXG4gICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldEhvdmVyZWQoZmFsc2UpfVxyXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHBhZGRpbmc6ICc4cHggMTRweCcsXHJcbiAgICAgICAgZm9udFNpemU6IDEzLFxyXG4gICAgICAgIGZvbnRXZWlnaHQ6IDUwMCxcclxuICAgICAgICBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksXHJcbiAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgYmFja2dyb3VuZDogaG92ZXJlZCA/IHRoZW1lLnN1cmZhY2VIb3ZlciA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgIGdhcDogOCxcclxuICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXHJcbiAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAge2ljb24gJiYgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IDE0LCB3aWR0aDogMTgsIHRleHRBbGlnbjogJ2NlbnRlcicsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQgfX0+e2ljb259PC9zcGFuPn1cclxuICAgICAge2xhYmVsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmludGVyZmFjZSBBY3Rpb25Qb3BvdmVyUHJvcHMge1xyXG4gIHBvcG92ZXI6IFBvcG92ZXJTdGF0ZTtcclxuICBzdGF0dXNPcHRpb25zTGlzdDogc3RyaW5nW107XHJcbiAgcHJpb3JpdHlJbnB1dFZhbHVlOiBzdHJpbmc7XHJcbiAgc3RhcnREYXRlSW5wdXRWYWx1ZTogc3RyaW5nO1xyXG4gIHRoZW1lOiBUaGVtZVRva2VucztcclxuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xyXG4gIG9uTW9kZUNoYW5nZTogKG1vZGU6ICdyb290JyB8ICdwcmlvcml0eScgfCAnc3RhdHVzJyB8ICdzdGFydF9kYXRlJykgPT4gdm9pZDtcclxuICBvblByaW9yaXR5SW5wdXRDaGFuZ2U6ICh2YWw6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkNvbmZpcm1Qcmlvcml0eTogKCkgPT4gdm9pZDtcclxuICBvblBpY2tTdGF0dXM6IChzdGF0dXM6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkVkaXRUZXN0OiAoKSA9PiB2b2lkO1xyXG4gIG9uU3RhcnREYXRlSW5wdXRDaGFuZ2U6ICh2YWw6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkNvbmZpcm1TdGFydERhdGU6ICgpID0+IHZvaWQ7XHJcbiAgcGFuZWxSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudD47XHJcbn1cclxuXHJcbmNvbnN0IEFjdGlvblBvcG92ZXI6IEZDPEFjdGlvblBvcG92ZXJQcm9wcz4gPSAoe1xyXG4gIHBvcG92ZXIsIHN0YXR1c09wdGlvbnNMaXN0LCBwcmlvcml0eUlucHV0VmFsdWUsIHN0YXJ0RGF0ZUlucHV0VmFsdWUsIHRoZW1lLFxyXG4gIG9uQ2xvc2UsIG9uTW9kZUNoYW5nZSwgb25Qcmlvcml0eUlucHV0Q2hhbmdlLCBvbkNvbmZpcm1Qcmlvcml0eSwgb25QaWNrU3RhdHVzLCBvbkVkaXRUZXN0LFxyXG4gIG9uU3RhcnREYXRlSW5wdXRDaGFuZ2UsIG9uQ29uZmlybVN0YXJ0RGF0ZSwgcGFuZWxSZWYsXHJcbn0pID0+IHtcclxuICBjb25zdCBbZmxpcHBlZFYsIHNldEZsaXBwZWRWXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBwb3BvdmVyV2lkdGggPSAyNDg7XHJcbiAgY29uc3QgeyBhbmNob3JSZWN0LCB0ZXN0LCBtb2RlLCBkaXNwbGF5U3RhdHVzLCB0b29sdGlwTGluZXMsIHNjaGVkdWxlZCB9ID0gcG9wb3ZlcjtcclxuICBjb25zdCBjYXBDb2xvciA9IGdldENhcENvbG9yKGRpc3BsYXlTdGF0dXMsIHRoZW1lKTtcclxuXHJcbiAgLy8gSG9yaXpvbnRhbDogcmlnaHQtYWxpZ24gdG8gYnV0dG9uLCBjbGFtcCB0byB2aWV3cG9ydCBlZGdlc1xyXG4gIGxldCBsZWZ0ID0gYW5jaG9yUmVjdC5yaWdodCAtIHBvcG92ZXJXaWR0aDtcclxuICBsZWZ0ID0gTWF0aC5tYXgoOCwgTWF0aC5taW4obGVmdCwgd2luZG93LmlubmVyV2lkdGggLSBwb3BvdmVyV2lkdGggLSA4KSk7XHJcblxyXG4gIC8vIFZlcnRpY2FsOiBiZWxvdyBidXR0b24gYnkgZGVmYXVsdDsgZmxpcCBhYm92ZSBpZiBuZWFyIGJvdHRvbVxyXG4gIGNvbnN0IHRvcEJlbG93ID0gYW5jaG9yUmVjdC5ib3R0b20gKyA2O1xyXG4gIGNvbnN0IGJvdHRvbUFib3ZlID0gd2luZG93LmlubmVySGVpZ2h0IC0gYW5jaG9yUmVjdC50b3AgKyA2O1xyXG5cclxuICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHBhbmVsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgY29uc3QgciA9IHBhbmVsUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIHNldEZsaXBwZWRWKHIuYm90dG9tID4gd2luZG93LmlubmVySGVpZ2h0IC0gOCk7XHJcbiAgICB9XHJcbiAgfSwgW21vZGUsIGFuY2hvclJlY3RdKTtcclxuXHJcbiAgY29uc3QgcG9zU3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSBmbGlwcGVkVlxyXG4gICAgPyB7IHBvc2l0aW9uOiAnZml4ZWQnLCBsZWZ0LCBib3R0b206IGJvdHRvbUFib3ZlLCB6SW5kZXg6IDMwMDAgfVxyXG4gICAgOiB7IHBvc2l0aW9uOiAnZml4ZWQnLCBsZWZ0LCB0b3A6IHRvcEJlbG93LCB6SW5kZXg6IDMwMDAgfTtcclxuXHJcbiAgY29uc3QgbGluZXMgPSB0b29sdGlwTGluZXMuc3BsaXQoJ1xcbicpLmZpbHRlcihsID0+IHtcclxuICAgIGNvbnN0IHBhcnRzID0gbC5zcGxpdCgnOicpO1xyXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA8IDIpIHJldHVybiBsLnRyaW0oKSAhPT0gJyc7XHJcbiAgICByZXR1cm4gcGFydHMuc2xpY2UoMSkuam9pbignOicpLnRyaW0oKSAhPT0gJyc7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIHJlZj17cGFuZWxSZWZ9XHJcbiAgICAgIG9uQ29udGV4dE1lbnU9eyhlKSA9PiBlLnByZXZlbnREZWZhdWx0KCl9XHJcbiAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgLi4ucG9zU3R5bGUsXHJcbiAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSxcclxuICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCxcclxuICAgICAgICBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c1hsLFxyXG4gICAgICAgIGJveFNoYWRvdzogJzAgNHB4IDE2cHggcmdiYSgwLDAsMCwwLjEyKSwgMCAxcHggNHB4IHJnYmEoMCwwLDAsMC4wNiknLFxyXG4gICAgICAgIHdpZHRoOiBwb3BvdmVyV2lkdGgsXHJcbiAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksXHJcbiAgICAgIH19XHJcbiAgICA+XHJcbiAgICAgIHttb2RlID09PSAncm9vdCcgPyAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIHsvKiBEZXRhaWxzIHNlY3Rpb24gKi99XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDE0cHggMTBweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gIH19PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAxMywgZm9udFdlaWdodDogNzAwLCBjb2xvcjogdGhlbWUudGV4dFByaW1hcnksIGxpbmVIZWlnaHQ6IDEuMywgbWFyZ2luQm90dG9tOiA2LCB3b3JkQnJlYWs6ICdicmVhay13b3JkJyB9fT5cclxuICAgICAgICAgICAgICB7dGVzdC5uYW1lfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogKGxpbmVzLmxlbmd0aCA+IDAgfHwgc2NoZWR1bGVkKSA/IDggOiAwIH19PlxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IGdldFByaW9yaXR5VGV4dENvbG9yKHRlc3QucHJpb3JpdHkpIH19PlxyXG4gICAgICAgICAgICAgICAgUHt0ZXN0LnByaW9yaXR5fVxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogMTAsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IGdldFN0YXR1c1RleHRDb2xvcihkaXNwbGF5U3RhdHVzLCB0aGVtZSksXHJcbiAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyBhcyBjb25zdCwgbGV0dGVyU3BhY2luZzogJzAuMDVlbScsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMXB4IDZweCcsIGJhY2tncm91bmQ6IGAke2NhcENvbG9yfTE4YCxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzU20sIGJvcmRlcjogYDFweCBzb2xpZCAke2NhcENvbG9yfTQwYCxcclxuICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgIHtkaXNwbGF5U3RhdHVzfVxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHtsaW5lcy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IDEsIGJhY2tncm91bmQ6IHRoZW1lLmJvcmRlciwgbWFyZ2luOiAnMCAtMnB4IDZweCcgfX0gLz5cclxuICAgICAgICAgICAgICAgIHtsaW5lcy5tYXAoKGxpbmUsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgY29sb25JZHggPSBsaW5lLmluZGV4T2YoJzonKTtcclxuICAgICAgICAgICAgICAgICAgaWYgKGNvbG9uSWR4ID09PSAtMSkgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgZm9udFNpemU6IDExLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSwgbWFyZ2luQm90dG9tOiAyLCBsaW5lSGVpZ2h0OiAxLjQgfX0+e2xpbmV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gbGluZS5zbGljZSgwLCBjb2xvbklkeCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGxpbmUuc2xpY2UoY29sb25JZHggKyAxKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBmb250U2l6ZTogMTEsIG1hcmdpbkJvdHRvbTogMiwgbGluZUhlaWdodDogMS40IH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFdlaWdodDogNTAwLCBmbGV4U2hyaW5rOiAwIH19PntsYWJlbH06PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5IH19Pnt2YWx1ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge3NjaGVkdWxlZCAmJiAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiAxLCBiYWNrZ3JvdW5kOiB0aGVtZS5ib3JkZXIsIG1hcmdpbjogYCR7bGluZXMubGVuZ3RoID4gMCA/IDYgOiAwfXB4IC0ycHggNnB4YCB9fSAvPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgZm9udFNpemU6IDExLCBtYXJnaW5Cb3R0b206IDIgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRXZWlnaHQ6IDUwMCB9fT5TdGFydHM6PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWUudGV4dFByaW1hcnkgfX0+e3NjaGVkdWxlZC5zdGFydC50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLUdCJywgeyBkYXk6ICcyLWRpZ2l0JywgbW9udGg6ICdzaG9ydCcsIHllYXI6ICdudW1lcmljJyB9KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIGZvbnRTaXplOiAxMSB9fT5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFdlaWdodDogNTAwIH19PkVuZHM6PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogdGhlbWUudGV4dFByaW1hcnkgfX0+e3NjaGVkdWxlZC5lbmQudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1HQicsIHsgZGF5OiAnMi1kaWdpdCcsIG1vbnRoOiAnc2hvcnQnLCB5ZWFyOiAnbnVtZXJpYycgfSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIHsvKiBBY3Rpb25zICovfVxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnNHB4IDAnIH19PlxyXG4gICAgICAgICAgICA8TWVudUl0ZW0gbGFiZWw9XCJDaGFuZ2UgUHJpb3JpdHlcIiBpY29uPVwiXHUyQjA2XCIgdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ3ByaW9yaXR5Jyl9IC8+XHJcbiAgICAgICAgICAgIDxNZW51SXRlbSBsYWJlbD1cIkNoYW5nZSBTdGF0dXNcIiBpY29uPVwiXHUyNUM5XCIgdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ3N0YXR1cycpfSAvPlxyXG4gICAgICAgICAgICB7ZGlzcGxheVN0YXR1cyA9PT0gJ1J1bm5pbmcnICYmIChcclxuICAgICAgICAgICAgICA8TWVudUl0ZW0gbGFiZWw9XCJDaGFuZ2UgU3RhcnQgRGF0ZVwiIGljb249XCJcdUQ4M0RcdURDQzVcIiB0aGVtZT17dGhlbWV9IG9uQ2xpY2s9eygpID0+IG9uTW9kZUNoYW5nZSgnc3RhcnRfZGF0ZScpfSAvPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8TWVudUl0ZW0gbGFiZWw9XCJFZGl0IFRlc3RcIiBpY29uPVwiXHUyNzBFXCIgdGhlbWU9e3RoZW1lfSBvbkNsaWNrPXtvbkVkaXRUZXN0fSAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICkgOiBtb2RlID09PSAncHJpb3JpdHknID8gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMHB4IDE0cHggOHB4JywgYm9yZGVyQm90dG9tOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4IH19PlxyXG4gICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXsoKSA9PiBvbk1vZGVDaGFuZ2UoJ3Jvb3QnKX0gc3R5bGU9e3sgY3Vyc29yOiAncG9pbnRlcicsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGZvbnRTaXplOiAxNiwgbGluZUhlaWdodDogMSB9fT5cdTIxOTA8L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSB9fT5DaGFuZ2UgUHJpb3JpdHk8L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMTRweCcgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Cb3R0b206IDggfX0+RW50ZXIgcHJpb3JpdHkgKDBcdTIwMTMxMDApOjwvZGl2PlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgICAgICAgICBtaW49ezB9XHJcbiAgICAgICAgICAgICAgbWF4PXsxMDB9XHJcbiAgICAgICAgICAgICAgYXV0b0ZvY3VzXHJcbiAgICAgICAgICAgICAgdmFsdWU9e3ByaW9yaXR5SW5wdXRWYWx1ZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uUHJpb3JpdHlJbnB1dENoYW5nZShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBvbkNvbmZpcm1Qcmlvcml0eSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgb25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzZweCA4cHgnLCBmb250U2l6ZTogMTMsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyU3Ryb25nfWAsIG91dGxpbmU6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogOCwgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLnN1cmZhY2UsIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA4LCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNvbmZpcm1Qcmlvcml0eX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIGZsZXg6IDEsIHBhZGRpbmc6ICc2cHggMCcsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsIGNvbG9yOiB0aGVtZS5hY2NlbnRGZywgYm9yZGVyOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLCBjdXJzb3I6ICdwb2ludGVyJywgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPkNvbmZpcm08L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXtvbkNsb3NlfSBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScgfX0+Q2FuY2VsPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvPlxyXG4gICAgICApIDogbW9kZSA9PT0gJ3N0YXR1cycgPyAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMTRweCA4cHgnLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDggfX0+XHJcbiAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9eygpID0+IG9uTW9kZUNoYW5nZSgncm9vdCcpfSBzdHlsZT17eyBjdXJzb3I6ICdwb2ludGVyJywgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFNpemU6IDE2LCBsaW5lSGVpZ2h0OiAxIH19Plx1MjE5MDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5IH19PkNoYW5nZSBTdGF0dXM8L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzRweCAwJyB9fT5cclxuICAgICAgICAgICAge3N0YXR1c09wdGlvbnNMaXN0Lm1hcCgocykgPT4gKFxyXG4gICAgICAgICAgICAgIDxNZW51SXRlbSBrZXk9e3N9IGxhYmVsPXtzID09PSAnTlVMTCcgPyAnQ2xlYXIgU3RhdHVzIChOVUxMKScgOiBzfSB0aGVtZT17dGhlbWV9IG9uQ2xpY2s9eygpID0+IG9uUGlja1N0YXR1cyhzKX0gLz5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8Lz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTBweCAxNHB4IDhweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogOCB9fT5cclxuICAgICAgICAgICAgPHNwYW4gb25DbGljaz17KCkgPT4gb25Nb2RlQ2hhbmdlKCdyb290Jyl9IHN0eWxlPXt7IGN1cnNvcjogJ3BvaW50ZXInLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBmb250U2l6ZTogMTYsIGxpbmVIZWlnaHQ6IDEgfX0+XHUyMTkwPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6IHRoZW1lLnRleHRTZWNvbmRhcnkgfX0+Q2hhbmdlIFN0YXJ0IERhdGU8L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEwcHggMTRweCcgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDEyLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Cb3R0b206IDggfX0+RW50ZXIgbmV3IHN0YXJ0IGRhdGU6PC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJkYXRlXCJcclxuICAgICAgICAgICAgICBhdXRvRm9jdXNcclxuICAgICAgICAgICAgICB2YWx1ZT17c3RhcnREYXRlSW5wdXRWYWx1ZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uU3RhcnREYXRlSW5wdXRDaGFuZ2UoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIG9uS2V5RG93bj17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgb25Db25maXJtU3RhcnREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBvbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDhweCcsIGZvbnRTaXplOiAxMywgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJTdHJvbmd9YCwgb3V0bGluZTogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiA4LCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDgsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ29uZmlybVN0YXJ0RGF0ZX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshc3RhcnREYXRlSW5wdXRWYWx1ZX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIGZsZXg6IDEsIHBhZGRpbmc6ICc2cHggMCcsIGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBzdGFydERhdGVJbnB1dFZhbHVlID8gdGhlbWUuYWNjZW50IDogdGhlbWUuYm9yZGVyLFxyXG4gICAgICAgICAgICAgICAgICBjb2xvcjogc3RhcnREYXRlSW5wdXRWYWx1ZSA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dE11dGVkLFxyXG4gICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsIGN1cnNvcjogc3RhcnREYXRlSW5wdXRWYWx1ZSA/ICdwb2ludGVyJyA6ICdkZWZhdWx0JyxcclxuICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPkNvbmZpcm08L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXtvbkNsb3NlfSBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIGN1cnNvcjogJ3BvaW50ZXInLCB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScgfX0+Q2FuY2VsPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvPlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBTYXZlIE92ZXJsYXlcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmludGVyZmFjZSBTYXZlT3ZlcmxheVByb3BzIHtcclxuICBpc0Vycm9yOiBib29sZWFuO1xyXG4gIHRoZW1lOiBUaGVtZVRva2VucztcclxuICBvblJldHJ5OiAoKSA9PiB2b2lkO1xyXG4gIG9uRGlzY2FyZDogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuY29uc3QgU2F2ZU92ZXJsYXk6IEZDPFNhdmVPdmVybGF5UHJvcHM+ID0gKHsgaXNFcnJvciwgdGhlbWUsIG9uUmV0cnksIG9uRGlzY2FyZCB9KSA9PiAoXHJcbiAgPGRpdiBzdHlsZT17e1xyXG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGluc2V0OiAwLCB6SW5kZXg6IDIwMDAsXHJcbiAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyAncmdiYSgyOCwyOCw0NiwwLjgyKScgOiAncmdiYSgyNDksMjUwLDI1MSwwLjgyKScsXHJcbiAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gIH19PlxyXG4gICAgeyFpc0Vycm9yID8gKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDEyIH19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgIHdpZHRoOiAzMiwgaGVpZ2h0OiAzMiwgYm9yZGVyUmFkaXVzOiAnNTAlJyxcclxuICAgICAgICAgIGJvcmRlcjogYDNweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBib3JkZXJUb3BDb2xvcjogdGhlbWUuYWNjZW50LFxyXG4gICAgICAgICAgYW5pbWF0aW9uOiAnY2NsLXNwaW4gMC43cyBsaW5lYXIgaW5maW5pdGUnLFxyXG4gICAgICAgIH19IC8+XHJcbiAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6IDEzLCBmb250V2VpZ2h0OiA2MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5IH19PlNhdmluZ1x1MjAyNjwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApIDogKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzWGwsXHJcbiAgICAgICAgYm94U2hhZG93OiAnMCA0cHggMjBweCByZ2JhKDAsMCwwLDAuMTIpJywgcGFkZGluZzogJzI0cHggMjhweCcsXHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogMTIsXHJcbiAgICAgICAgbWF4V2lkdGg6IDMwMCxcclxuICAgICAgfX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgd2lkdGg6IDQwLCBoZWlnaHQ6IDQwLCBib3JkZXJSYWRpdXM6ICc1MCUnLFxyXG4gICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuaXNEYXJrID8gJyMzQjAwMDAnIDogJyNGRUYyRjInLFxyXG4gICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuaXNEYXJrID8gJyM3RjFEMUQnIDogJyNGRUNBQ0EnfWAsXHJcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICBmb250U2l6ZTogMjAsIGNvbG9yOiAnI0VGNDQ0NCcsIGZvbnRXZWlnaHQ6IDcwMCxcclxuICAgICAgICB9fT4hPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTUsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5IH19PlNhdmUgZmFpbGVkPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGNvbG9yOiB0aGVtZS50ZXh0TXV0ZWQsIHRleHRBbGlnbjogJ2NlbnRlcicsIGxpbmVIZWlnaHQ6IDEuNSB9fT5cclxuICAgICAgICAgIFRoZSBhbGxvY2F0aW9uIGNvdWxkIG5vdCBiZSBzYXZlZC4gWW91IGNhbiByZXRyeSBvciBkaXNjYXJkIHlvdXIgY2hhbmdlcy5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA4LCBtYXJnaW5Ub3A6IDQgfX0+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uRGlzY2FyZH1cclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBwYWRkaW5nOiAnN3B4IDE2cHgnLCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyU3Ryb25nfWAsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLnN1cmZhY2UsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5LCBmb250RmFtaWx5OiB0aGVtZS5mb250RmFtaWx5LFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPkRpc2NhcmQ8L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgb25DbGljaz17b25SZXRyeX1cclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBwYWRkaW5nOiAnN3B4IDE2cHgnLCBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCwgY29sb3I6IHRoZW1lLmFjY2VudEZnLFxyXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMXB4IDNweCAke3RoZW1lLmFjY2VudH00RGAsXHJcbiAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5SZXRyeTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICl9XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vIEFsbG9jYXRpb24gSGVscGVyc1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuY29uc3QgYnVpbGRBbGxvY2F0aW9ucyA9IChzdGFuZHM6IEludGVybmFsU3RhbmRbXSk6IEFsbG9jYXRpb25SZWNvcmRbXSA9PiB7XHJcbiAgY29uc3QgYWxsb2NhdGlvbnM6IEFsbG9jYXRpb25SZWNvcmRbXSA9IFtdO1xyXG4gIHN0YW5kcy5mb3JFYWNoKHN0YW5kID0+IHtcclxuICAgIHN0YW5kLnRlc3RzLmZvckVhY2goKHRlc3QsIGlkeCkgPT4ge1xyXG4gICAgICBhbGxvY2F0aW9ucy5wdXNoKHtcclxuICAgICAgICB0ZXN0X2lkOiB0ZXN0LmlkLFxyXG4gICAgICAgIHRlc3Rfc3RhbmRfaWQ6IHN0YW5kLmlkLFxyXG4gICAgICAgIHByaW9yaXR5X29yZGVyOiBpZHggKyAxLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiBhbGxvY2F0aW9ucztcclxufTtcclxuXHJcbmNvbnN0IGFsbG9jYXRpb25zS2V5ID0gKGFsbG9jczogQWxsb2NhdGlvblJlY29yZFtdKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYWxsb2NzLm1hcChhID0+IGAke2EudGVzdF9pZH06JHthLnRlc3Rfc3RhbmRfaWR9OiR7YS5wcmlvcml0eV9vcmRlcn1gKS5zb3J0KCkpO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VTdGFuZHMgPSAoXHJcbiAgdGVzdHNBcnI6IGFueVtdLFxyXG4gIHN0YW5kc0FycjogU3RhbmREZWZbXSxcclxuICBjaEhvdXJzOiBudW1iZXIsXHJcbiAgbm9uV29ya2luZ0FycjogYW55W10gPSBbXVxyXG4pOiB7IHN0YW5kczogSW50ZXJuYWxTdGFuZFtdOyB1bmFsbG9jYXRlZDogVGVzdERhdGFbXSB9ID0+IHtcclxuICAvLyBHcm91cCBub24td29ya2luZyByb3dzIGJ5IHRlc3Rfc3RhbmRfaWRcclxuICBjb25zdCBub25Xb3JraW5nQnlTdGFuZCA9IG5ldyBNYXA8c3RyaW5nIHwgbnVtYmVyLCBhbnlbXT4oKTtcclxuICBmb3IgKGNvbnN0IHJvdyBvZiBub25Xb3JraW5nQXJyKSB7XHJcbiAgICBpZiAoIXJvdyB8fCByb3cudGVzdF9zdGFuZF9pZCA9PSBudWxsKSBjb250aW51ZTtcclxuICAgIGNvbnN0IGtleSA9IHJvdy50ZXN0X3N0YW5kX2lkO1xyXG4gICAgaWYgKCFub25Xb3JraW5nQnlTdGFuZC5oYXMoa2V5KSkgbm9uV29ya2luZ0J5U3RhbmQuc2V0KGtleSwgW10pO1xyXG4gICAgbm9uV29ya2luZ0J5U3RhbmQuZ2V0KGtleSkhLnB1c2goeyBzdGFydDogcm93LnN0YXJ0X3RpbWUsIGVuZDogcm93LmVuZF90aW1lLCBub3Rlczogcm93Lm5vdGVzIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3RhbmRNYXAgPSBuZXcgTWFwPG51bWJlciB8IHN0cmluZywgSW50ZXJuYWxTdGFuZD4oKTtcclxuICBzdGFuZHNBcnIuZm9yRWFjaChzID0+IHN0YW5kTWFwLnNldChzLmlkLCB7XHJcbiAgICBpZDogcy5pZCxcclxuICAgIG5hbWU6IHMubmFtZSxcclxuICAgIHRlc3RzOiBbXSxcclxuICAgIGNoYW5nZW92ZXJfaG91cnM6IHMuY2hhbmdlb3Zlcl9ob3VycyA/PyBjaEhvdXJzLFxyXG4gICAgbm9uV29ya2luZ0Jsb2NrczogcGFyc2VOb25Xb3JraW5nQmxvY2tzKG5vbldvcmtpbmdCeVN0YW5kLmdldChzLmlkKSA/PyBbXSksXHJcbiAgfSkpO1xyXG5cclxuICBjb25zdCB1bmFsbG9jYXRlZDogVGVzdERhdGFbXSA9IFtdO1xyXG4gIHRlc3RzQXJyLmZvckVhY2goKHQ6IGFueSkgPT4ge1xyXG4gICAgY29uc3QgdGVzdDogVGVzdERhdGEgPSB7XHJcbiAgICAgIGlkOiB0LmlkLFxyXG4gICAgICBuYW1lOiB0Lm5hbWUgfHwgJycsXHJcbiAgICAgIGR1cmF0aW9uOiB0LmR1cmF0aW9uIHx8IDcyLFxyXG4gICAgICBvd25lcjogdC5vd25lciB8fCAnJyxcclxuICAgICAgcHJpb3JpdHk6IHQucHJpb3JpdHkgPz8gNTAsXHJcbiAgICAgIG5vdGVzOiB0Lm5vdGVzIHx8ICcnLFxyXG4gICAgICBzdGF0dXM6IHQuc3RhdHVzIHx8ICcnLFxyXG4gICAgICB0ZXN0X3N0YW5kX2lkOiB0LnRlc3Rfc3RhbmRfaWQsXHJcbiAgICAgIHByaW9yaXR5X29yZGVyOiB0LnByaW9yaXR5X29yZGVyLFxyXG4gICAgICBhbGxvY2F0aW9uX2lkOiB0LmFsbG9jYXRpb25faWQsXHJcbiAgICAgIGFzc2lnbmVkX3BhcnRzOiB0LmFzc2lnbmVkX3BhcnRzIHx8IG51bGwsXHJcbiAgICAgIHBhcnRfcmVhZHlfZGF0ZTogdC5wYXJ0X3JlYWR5X2RhdGUgfHwgbnVsbCxcclxuICAgICAgcGFydF9zdGF0dXM6IHQucGFydF9zdGF0dXMgfHwgJycsXHJcbiAgICAgIHRlc3Rfc3RhcnRlZF9kYXRlOiB0LnRlc3Rfc3RhcnRlZF9kYXRlIHx8IG51bGwsXHJcbiAgICAgIC4uLnQsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0ZXN0LnRlc3Rfc3RhbmRfaWQgIT0gbnVsbCAmJiBzdGFuZE1hcC5oYXModGVzdC50ZXN0X3N0YW5kX2lkKSkge1xyXG4gICAgICBzdGFuZE1hcC5nZXQodGVzdC50ZXN0X3N0YW5kX2lkKSEudGVzdHMucHVzaCh0ZXN0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVuYWxsb2NhdGVkLnB1c2godGVzdCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHN0YW5kTWFwLmZvckVhY2gocyA9PiB7XHJcbiAgICBzLnRlc3RzLnNvcnQoKGEsIGIpID0+IChhLnByaW9yaXR5X29yZGVyIHx8IDk5OSkgLSAoYi5wcmlvcml0eV9vcmRlciB8fCA5OTkpKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHN0YW5kczogc3RhbmRzQXJyLm1hcChzID0+IHN0YW5kTWFwLmdldChzLmlkKSEpLFxyXG4gICAgdW5hbGxvY2F0ZWQsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBNYWluIENvbXBvbmVudFxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuZXhwb3J0IGNvbnN0IFRlc3RTdGFuZFNjaGVkdWxlcjogRkMgPSAoKSA9PiB7XHJcbiAgLy8gXHUyNTAwXHUyNTAwIElucHV0IGRhdGEgZnJvbSBSZXRvb2wgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW2lucHV0VGVzdHNdID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJ0ZXN0c1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJUZXN0cyBEYXRhXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJBcnJheSBvZiB0ZXN0IG9iamVjdHMgZnJvbSBnZXRTY2hlZHVsZXJEYXRhIHF1ZXJ5XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtpbnB1dFN0YW5kc10gPSBSZXRvb2wudXNlU3RhdGVBcnJheSh7XHJcbiAgICBuYW1lOiBcInRlc3RTdGFuZHNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiVGVzdCBTdGFuZHMgRGF0YVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2YgdGVzdCBzdGFuZCBvYmplY3RzIGZyb20gZ2V0VGVzdFN0YW5kcyBxdWVyeSAoaWQsIG5hbWUsIGNoYW5nZW92ZXJfaG91cnMpXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtpbnB1dE5vbldvcmtpbmddID0gUmV0b29sLnVzZVN0YXRlQXJyYXkoe1xyXG4gICAgbmFtZTogXCJub25Xb3JraW5nRGF0YVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJOb24tV29ya2luZyBCbG9ja3NcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkFycmF5IG9mIG5vbi13b3JraW5nIHBlcmlvZHMgZnJvbSBnZXROb25Xb3JraW5nIHF1ZXJ5IChpZCwgdGVzdF9zdGFuZF9pZCwgc3RhcnRfdGltZSwgZW5kX3RpbWUsIG5vdGVzKVwiLFxyXG4gIH0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQ29uZmlndXJhdGlvbiBwcm9wZXJ0aWVzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFtzYXZlTW9kZV0gPSBSZXRvb2wudXNlU3RhdGVFbnVtZXJhdGlvbih7XHJcbiAgICBuYW1lOiBcInNhdmVNb2RlXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiYmF0Y2hcIixcclxuICAgIGVudW1EZWZpbml0aW9uOiBbXCJiYXRjaFwiLCBcImxpdmVcIl0sXHJcbiAgICBpbnNwZWN0b3I6IFwic2VnbWVudGVkXCIsXHJcbiAgICBsYWJlbDogXCJTYXZlIE1vZGVcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcImJhdGNoID0gc2F2ZSBidXR0b24sIGxpdmUgPSBlbWl0IG9uIGV2ZXJ5IGNoYW5nZVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaXNTYXZpbmddID0gUmV0b29sLnVzZVN0YXRlQm9vbGVhbih7XHJcbiAgICBuYW1lOiBcImlzU2F2aW5nXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgaW5zcGVjdG9yOiBcImNoZWNrYm94XCIsXHJcbiAgICBsYWJlbDogXCJJcyBTYXZpbmdcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG86IHt7IHNhdmVBbGxvY2F0aW9ucy5pc0ZldGNoaW5nIH19XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtoYXNTYXZlRXJyb3JdID0gUmV0b29sLnVzZVN0YXRlQm9vbGVhbih7XHJcbiAgICBuYW1lOiBcImhhc1NhdmVFcnJvclwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgIGluc3BlY3RvcjogXCJjaGVja2JveFwiLFxyXG4gICAgbGFiZWw6IFwiSGFzIFNhdmUgRXJyb3JcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG86IHt7ICEhc2F2ZUFsbG9jYXRpb25zLmVycm9yIH19XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtzYXZlZEF0XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNhdmVkQXRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJTYXZlZCBBdFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQmluZCB0bzoge3sgc2F2ZUFsbG9jYXRpb25zLmxhc3RSdW5BdCB9fVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaXNTYXZpbmdEYXRlc10gPSBSZXRvb2wudXNlU3RhdGVCb29sZWFuKHtcclxuICAgIG5hbWU6IFwiaXNTYXZpbmdEYXRlc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBmYWxzZSxcclxuICAgIGluc3BlY3RvcjogXCJjaGVja2JveFwiLFxyXG4gICAgbGFiZWw6IFwiSXMgU2F2aW5nIFBsYW5uZWQgRGF0ZXNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG86IHt7IHNhdmVQbGFubmVkRGF0ZXMuaXNGZXRjaGluZyB9fVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbaGFzU2F2ZURhdGVzRXJyb3JdID0gUmV0b29sLnVzZVN0YXRlQm9vbGVhbih7XHJcbiAgICBuYW1lOiBcImhhc1NhdmVEYXRlc0Vycm9yXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgaW5zcGVjdG9yOiBcImNoZWNrYm94XCIsXHJcbiAgICBsYWJlbDogXCJIYXMgU2F2ZSBEYXRlcyBFcnJvclwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQmluZCB0bzoge3sgISFzYXZlUGxhbm5lZERhdGVzLmVycm9yIH19XCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtjaGFuZ2VvdmVySG91cnNdID0gUmV0b29sLnVzZVN0YXRlTnVtYmVyKHtcclxuICAgIG5hbWU6IFwiY2hhbmdlb3ZlckhvdXJzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IDMsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiQ2hhbmdlb3ZlciBIb3Vyc1wiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiSG91cnMgZm9yIGNoYW5nZW92ZXIgYmV0d2VlbiB0ZXN0cyAod29yayBob3VycyBvbmx5KVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbd29ya1N0YXJ0XSA9IFJldG9vbC51c2VTdGF0ZU51bWJlcih7XHJcbiAgICBuYW1lOiBcIndvcmtTdGFydFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiA5LFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIldvcmsgU3RhcnQgSG91clwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbd29ya0VuZF0gPSBSZXRvb2wudXNlU3RhdGVOdW1iZXIoe1xyXG4gICAgbmFtZTogXCJ3b3JrRW5kXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IDE3LFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIldvcmsgRW5kIEhvdXJcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2luaXRpYWxWaWV3V2Vla3NTdHJdID0gUmV0b29sLnVzZVN0YXRlRW51bWVyYXRpb24oe1xyXG4gICAgbmFtZTogXCJkZWZhdWx0Vmlld1dlZWtzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiNFwiLFxyXG4gICAgZW51bURlZmluaXRpb246IFtcIjJcIiwgXCI0XCIsIFwiOFwiLCBcIjEyXCIsIFwiMjRcIl0sXHJcbiAgICBpbnNwZWN0b3I6IFwic2VnbWVudGVkXCIsXHJcbiAgICBsYWJlbDogXCJEZWZhdWx0IFZpZXdcIixcclxuICB9KTtcclxuICBjb25zdCBpbml0aWFsVmlld1dlZWtzID0gTnVtYmVyKGluaXRpYWxWaWV3V2Vla3NTdHIpIHx8IDQ7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBDb25maWd1cmFibGUgZGlzcGxheSB0ZW1wbGF0ZXMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgW2NhcmRNYWluVGV4dF0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjYXJkTWFpblRleHRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJ7bmFtZX1cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDYXJkIFRpdGxlXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3IgY2FyZCB0aXRsZS4gVXNlIHtmaWVsZE5hbWV9IGZvciBkYXRhIGZpZWxkcy5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2NhcmRTdWJUZXh0XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNhcmRTdWJUZXh0XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiUGFydHM6IHtwYXJ0X3JlYWR5X2RhdGV9XCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiQ2FyZCBTdWJ0aXRsZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiVGVtcGxhdGUgZm9yIHN1YnRpdGxlLiBIaWRkZW4gd2hlbiBhbGwgZmllbGRzIGFyZSBlbXB0eS5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgW2NhcmRJbmZvUm93XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNhcmRJbmZvUm93XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwie293bmVyfSBcXHUwMGI3IHtkdXJhdGlvbn1oIFxcdTAwYjcgUHtwcmlvcml0eX1cIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJDYXJkIEluZm8gUm93XCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJUZW1wbGF0ZSBmb3IgdGhlIGluZm8gcm93IHNob3duIG9uIGNhcmRzIGFuZCBiYXJzLlwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbdG9vbHRpcFRlbXBsYXRlXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInRvb2x0aXBUZW1wbGF0ZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIk5vdGVzOiB7bm90ZXN9XFxuT3duZXI6IHtvd25lcn1cXG5Qcmlvcml0eToge3ByaW9yaXR5fVxcblBhcnQgU3RhdHVzOiB7cGFydF9zdGF0dXN9XFxuUGFydHMgRHVlOiB7cGFydF9yZWFkeV9kYXRlfVxcbkFzc2lnbmVkIFBhcnRzOiB7YXNzaWduZWRfcGFydHN9XCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiVG9vbHRpcCBUZW1wbGF0ZVwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiVGVtcGxhdGUgZm9yIGhvdmVyIHRvb2x0aXAuIFVzZSBcXFxcbiBmb3IgbmV3bGluZXMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFtzdGF0dXNPcHRpb25zXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwic3RhdHVzT3B0aW9uc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXCJOVUxMXCIsIFwiUnVubmluZ1wiLCBcIkNyZWF0ZWRcIiwgXCJUZXN0ZWRcIiwgXCJDYW5jZWxsZWRcIl0sXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiU3RhdHVzIE9wdGlvbnNcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlN0YXR1cyBzdHJpbmdzIHNob3duIGluIHRoZSByaWdodC1jbGljayBDaGFuZ2UgU3RhdHVzIG1lbnUuICdOVUxMJyBjbGVhcnMgdGhlIHN0YXR1cy5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFRoZW1lIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFthcHBUaGVtZV0gPSBSZXRvb2wudXNlU3RhdGVPYmplY3Qoe1xyXG4gICAgbmFtZTogXCJhcHBUaGVtZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiB7fSxcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJBcHAgVGhlbWVcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkJpbmQgdG8ge3sgdGhlbWUgfX0gdG8gaW5oZXJpdCBhcHAgY29sb3VycywgZm9udHMsIGFuZCBib3JkZXIgcmFkaXVzXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIE9wdGlvbmFsIHN0YXR1cyBjb2xvdXIgb3ZlcnJpZGVzIChsZWF2ZSBibGFuayB0byB1c2UgZGVmYXVsdHMpXHJcbiAgY29uc3QgW2NvbG9yUnVubmluZ10gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjb2xvclJ1bm5pbmdcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJSdW5uaW5nIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgUnVubmluZyBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjOTMzM0VBKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JSZWFkeV0gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJjb2xvclJlYWR5XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiUmVhZHkgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBSZWFkeSBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjMjJDNTVFKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JPblRpbWVdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JPblRpbWVcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJPbiBUaW1lIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgT24gVGltZSBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjRTVBMDBEKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbY29sb3JEZWxheWVkXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcImNvbG9yRGVsYXllZFwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcInRleHRcIixcclxuICAgIGxhYmVsOiBcIkRlbGF5ZWQgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBEZWxheWVkIHN0YXR1cy4gTGVhdmUgYmxhbmsgdG8gdXNlIGRlZmF1bHQgKCNFRjQ0NDQpLlwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IFtjb2xvclBhcnRzTm90QXNzaWduZWRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JQYXJ0c05vdEFzc2lnbmVkXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiUGFydHMgTm90IEFzc2lnbmVkIENvbG91clwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiT3ZlcnJpZGUgY2FwIGNvbG91ciBmb3IgUGFydHMgTm90IEFzc2lnbmVkIHN0YXR1cy4gTGVhdmUgYmxhbmsgdG8gdXNlIGRlZmF1bHQgKCM5Q0EzQUYpLlwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IFtjb2xvckluUHJvZ3Jlc3NdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwiY29sb3JJblByb2dyZXNzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwidGV4dFwiLFxyXG4gICAgbGFiZWw6IFwiSW4gUHJvZ3Jlc3MgQ29sb3VyXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJPdmVycmlkZSBjYXAgY29sb3VyIGZvciBJbiBQcm9ncmVzcyBzdGF0dXMuIExlYXZlIGJsYW5rIHRvIHVzZSBkZWZhdWx0ICgjRTVBMDBEKS5cIixcclxuICB9KTtcclxuICBjb25zdCBbbW9ub0ZvbnRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwibW9ub0ZvbnRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJ0ZXh0XCIsXHJcbiAgICBsYWJlbDogXCJNb25vc3BhY2UgRm9udFwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiRm9udCB1c2VkIGZvciBsYWJlbHMsIGJhZGdlcywgYW5kIHN0YXRzLiBMZWF2ZSBibGFuayB0byBpbmhlcml0IHRoZSBhcHAgdGhlbWUgZm9udC5cIixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEJ1aWxkIHRoZW1lIHRva2VucyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCB0aGVtZSA9IHVzZU1lbW8oKCk6IFRoZW1lVG9rZW5zID0+IHtcclxuICAgIGNvbnN0IHN0YXR1c092ZXJyaWRlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gICAgaWYgKGNvbG9yUnVubmluZykgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snUnVubmluZyddICAgICAgICAgICAgPSBjb2xvclJ1bm5pbmcgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yUmVhZHkpICAgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snUmVhZHknXSAgICAgICAgICAgICAgPSBjb2xvclJlYWR5IGFzIHN0cmluZztcclxuICAgIGlmIChjb2xvck9uVGltZSkgICAgICAgICAgICBzdGF0dXNPdmVycmlkZXNbJ09uIFRpbWUnXSAgICAgICAgICAgID0gY29sb3JPblRpbWUgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yRGVsYXllZCkgICAgICAgICAgIHN0YXR1c092ZXJyaWRlc1snRGVsYXllZCddICAgICAgICAgICAgPSBjb2xvckRlbGF5ZWQgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9yUGFydHNOb3RBc3NpZ25lZCkgIHN0YXR1c092ZXJyaWRlc1snUGFydHMgTm90IEFzc2lnbmVkJ10gPSBjb2xvclBhcnRzTm90QXNzaWduZWQgYXMgc3RyaW5nO1xyXG4gICAgaWYgKGNvbG9ySW5Qcm9ncmVzcykgICAgICAgIHN0YXR1c092ZXJyaWRlc1snSW4gUHJvZ3Jlc3MnXSAgICAgICAgPSBjb2xvckluUHJvZ3Jlc3MgYXMgc3RyaW5nO1xyXG4gICAgcmV0dXJuIGJ1aWxkVGhlbWUoYXBwVGhlbWUsIHN0YXR1c092ZXJyaWRlcywgbW9ub0ZvbnQgYXMgc3RyaW5nIHx8IHVuZGVmaW5lZCk7XHJcbiAgfSwgW2FwcFRoZW1lLCBjb2xvclJ1bm5pbmcsIGNvbG9yUmVhZHksIGNvbG9yT25UaW1lLCBjb2xvckRlbGF5ZWQsIGNvbG9yUGFydHNOb3RBc3NpZ25lZCwgY29sb3JJblByb2dyZXNzLCBtb25vRm9udF0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgT3V0cHV0IHN0YXRlIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFssIHNldEFsbG9jYXRpb25zXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwiYWxsb2NhdGlvbnNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogW10sXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJDdXJyZW50IGFsbG9jYXRpb24gc3RhdGU6IFt7dGVzdF9pZCwgdGVzdF9zdGFuZF9pZCwgcHJpb3JpdHlfb3JkZXJ9XVwiLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBbLCBzZXRBbGxUZXN0SWRzXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwiYWxsVGVzdElkc1wiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBbXSxcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIkFsbCB0ZXN0IElEcyBtYW5hZ2VkIGJ5IHRoZSBzY2hlZHVsZXIgKGZvciB0aGUgZGVsZXRlIHN0ZXAgaW4gc2F2ZSlcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0SGFzVW5zYXZlZENoYW5nZXNdID0gUmV0b29sLnVzZVN0YXRlQm9vbGVhbih7XHJcbiAgICBuYW1lOiBcImhhc1Vuc2F2ZWRDaGFuZ2VzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IGZhbHNlLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiV2hldGhlciB0aGVyZSBhcmUgdW5zYXZlZCBhbGxvY2F0aW9uIGNoYW5nZXNcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0SWRdID0gUmV0b29sLnVzZVN0YXRlU3RyaW5nKHtcclxuICAgIG5hbWU6IFwic2VsZWN0ZWRUZXN0SWRcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIklEIG9mIHRlc3QgYWN0aW9uZWQgdmlhIHJpZ2h0LWNsaWNrIG1lbnUgKHNldCBiZWZvcmUgZXZlbnRzIGZpcmUpXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldFNlbGVjdGVkVGVzdFByaW9yaXR5XSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdFByaW9yaXR5XCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFwiXCIsXHJcbiAgICBpbnNwZWN0b3I6IFwiaGlkZGVuXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJOZXcgcHJpb3JpdHkgdmFsdWUgZnJvbSBDaGFuZ2UgUHJpb3JpdHkgYWN0aW9uIChudW1lcmljIHN0cmluZylcIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0U2VsZWN0ZWRUZXN0U3RhcnREYXRlXSA9IFJldG9vbC51c2VTdGF0ZVN0cmluZyh7XHJcbiAgICBuYW1lOiBcInNlbGVjdGVkVGVzdFN0YXJ0RGF0ZVwiLFxyXG4gICAgaW5pdGlhbFZhbHVlOiBcIlwiLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiTmV3IHN0YXJ0IGRhdGUgZnJvbSBDaGFuZ2UgU3RhcnQgRGF0ZSBhY3Rpb24gKElTTyBkYXRlIHN0cmluZyBZWVlZLU1NLUREKS4gT25seSBzZXQgZm9yIFJ1bm5pbmcgdGVzdHMuXCIsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IFssIHNldFNlbGVjdGVkVGVzdFN0YXR1c10gPSBSZXRvb2wudXNlU3RhdGVTdHJpbmcoe1xyXG4gICAgbmFtZTogXCJzZWxlY3RlZFRlc3RTdGF0dXNcIixcclxuICAgIGluaXRpYWxWYWx1ZTogXCJcIixcclxuICAgIGluc3BlY3RvcjogXCJoaWRkZW5cIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIk5ldyBzdGF0dXMgZnJvbSBDaGFuZ2UgU3RhdHVzIGFjdGlvbi4gRW1wdHkgc3RyaW5nID0gTlVMTCBpbiBEQi5cIixcclxuICB9KTtcclxuXHJcbiAgY29uc3QgWywgc2V0UGxhbm5lZERhdGVzXSA9IFJldG9vbC51c2VTdGF0ZUFycmF5KHtcclxuICAgIG5hbWU6IFwicGxhbm5lZERhdGVzXCIsXHJcbiAgICBpbml0aWFsVmFsdWU6IFtdLFxyXG4gICAgaW5zcGVjdG9yOiBcImhpZGRlblwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiQXJyYXkgb2Yge3Rlc3RfaWQsIHBsYW5uZWRfZGF0ZX0gZm9yIGFsbCBzdGFuZC1zY2hlZHVsZWQgdGVzdHMuIFVzZSB3aXRoIHNhdmVQbGFubmVkRGF0ZXMgcXVlcnkuXCIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBFdmVudHMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3Qgb25TYXZlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uU2F2ZVwiIH0pO1xyXG4gIGNvbnN0IG9uQ2hhbmdlID0gUmV0b29sLnVzZUV2ZW50Q2FsbGJhY2soeyBuYW1lOiBcIm9uQ2hhbmdlXCIgfSk7XHJcbiAgY29uc3Qgb25SZXRyeSA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvblJldHJ5XCIgfSk7XHJcbiAgY29uc3Qgb25DaGFuZ2VQcmlvcml0eSA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvbkNoYW5nZVByaW9yaXR5XCIgfSk7XHJcbiAgY29uc3Qgb25DaGFuZ2VTdGF0dXMgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25DaGFuZ2VTdGF0dXNcIiB9KTtcclxuICBjb25zdCBvbkNoYW5nZVN0YXJ0RGF0ZSA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvbkNoYW5nZVN0YXJ0RGF0ZVwiIH0pO1xyXG4gIGNvbnN0IG9uRWRpdFRlc3QgPSBSZXRvb2wudXNlRXZlbnRDYWxsYmFjayh7IG5hbWU6IFwib25FZGl0VGVzdFwiIH0pO1xyXG4gIGNvbnN0IG9uU2F2ZVBsYW5uZWREYXRlcyA9IFJldG9vbC51c2VFdmVudENhbGxiYWNrKHsgbmFtZTogXCJvblNhdmVQbGFubmVkRGF0ZXNcIiB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIENvbXBvbmVudCBzZXR0aW5ncyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBSZXRvb2wudXNlQ29tcG9uZW50U2V0dGluZ3Moe1xyXG4gICAgZGVmYXVsdEhlaWdodDogNjAwLFxyXG4gICAgZGVmYXVsdFdpZHRoOiAxMixcclxuICB9KTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEludGVybmFsIHN0YXRlIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IFtzdGFuZHMsIHNldFN0YW5kc10gPSBSZWFjdC51c2VTdGF0ZTxJbnRlcm5hbFN0YW5kW10+KFtdKTtcclxuICBjb25zdCBbdW5hbGxvY2F0ZWQsIHNldFVuYWxsb2NhdGVkXSA9IFJlYWN0LnVzZVN0YXRlPFRlc3REYXRhW10+KFtdKTtcclxuICBjb25zdCBbdmlld3BvcnRXZWVrcywgc2V0Vmlld3BvcnRXZWVrc10gPSBSZWFjdC51c2VTdGF0ZTxudW1iZXI+KGluaXRpYWxWaWV3V2Vla3MgfHwgNCk7XHJcbiAgY29uc3QgdXNlckNoYW5nZWRWaWV3cG9ydCA9IFJlYWN0LnVzZVJlZihmYWxzZSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHdlZWtzID0gTnVtYmVyKGluaXRpYWxWaWV3V2Vla3NTdHIpO1xyXG4gICAgaWYgKHdlZWtzICYmICF1c2VyQ2hhbmdlZFZpZXdwb3J0LmN1cnJlbnQpIHNldFZpZXdwb3J0V2Vla3Mod2Vla3MpO1xyXG4gIH0sIFtpbml0aWFsVmlld1dlZWtzU3RyXSk7XHJcbiAgY29uc3QgW2RyYWdnZWRUZXN0SWQsIHNldERyYWdnZWRUZXN0SWRdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nIHwgbnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2luc2VydEluZGljYXRvciwgc2V0SW5zZXJ0SW5kaWNhdG9yXSA9IFJlYWN0LnVzZVN0YXRlPEluc2VydEluZGljYXRvciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtxdWV1ZUluc2VydEluZGV4LCBzZXRRdWV1ZUluc2VydEluZGV4XSA9IFJlYWN0LnVzZVN0YXRlPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtpc0RpcnR5LCBzZXRJc0RpcnR5XSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcGVuZGluZ1NhdmUsIHNldFBlbmRpbmdTYXZlXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2F2ZUVycm9yLCBzZXRTYXZlRXJyb3JdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwb3BvdmVyLCBzZXRQb3BvdmVyXSA9IFJlYWN0LnVzZVN0YXRlPFBvcG92ZXJTdGF0ZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtwcmlvcml0eUlucHV0VmFsdWUsIHNldFByaW9yaXR5SW5wdXRWYWx1ZV0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCcnKTtcclxuICBjb25zdCBbc3RhcnREYXRlSW5wdXRWYWx1ZSwgc2V0U3RhcnREYXRlSW5wdXRWYWx1ZV0gPSBSZWFjdC51c2VTdGF0ZTxzdHJpbmc+KCcnKTtcclxuICBjb25zdCBbcGVuZGluZ1NhdmVEYXRlcywgc2V0UGVuZGluZ1NhdmVEYXRlc10gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3NhdmVEYXRlc0Vycm9yLCBzZXRTYXZlRGF0ZXNFcnJvcl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XHJcbiAgY29uc3QgaXNMb2NrZWQgPSBwZW5kaW5nU2F2ZSB8fCAoaXNTYXZpbmcgYXMgYm9vbGVhbikgfHwgc2F2ZUVycm9yO1xyXG4gIGNvbnN0IGlzRGF0ZXNTYXZpbmcgPSBwZW5kaW5nU2F2ZURhdGVzIHx8IChpc1NhdmluZ0RhdGVzIGFzIGJvb2xlYW4pIHx8IHNhdmVEYXRlc0Vycm9yO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzU2F2aW5nIGFzIGJvb2xlYW4pIHtcclxuICAgICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpOyAvLyBSZXRvb2wgaGFzIHBpY2tlZCB1cCB0aGUgc2F2ZTsgZHJvcCBvdXIgbG9jYWwgcGVuZGluZyBmbGFnXHJcbiAgICB9XHJcbiAgICBpZiAoaGFzU2F2ZUVycm9yIGFzIGJvb2xlYW4pIHtcclxuICAgICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpO1xyXG4gICAgICBzZXRTYXZlRXJyb3IodHJ1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKCEoaXNTYXZpbmcgYXMgYm9vbGVhbikpIHtcclxuICAgICAgLy8gTm90IHNhdmluZyBhbmQgbm8gZXJyb3IgPSBpZGxlOyBjbGVhciBlcnJvciAoY292ZXJzIHJlY292ZXJ5IGFmdGVyIHJldHJ5KVxyXG4gICAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtpc1NhdmluZywgaGFzU2F2ZUVycm9yXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoaXNTYXZpbmdEYXRlcyBhcyBib29sZWFuKSB7XHJcbiAgICAgIHNldFBlbmRpbmdTYXZlRGF0ZXMoZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgaWYgKGhhc1NhdmVEYXRlc0Vycm9yIGFzIGJvb2xlYW4pIHtcclxuICAgICAgc2V0UGVuZGluZ1NhdmVEYXRlcyhmYWxzZSk7XHJcbiAgICAgIHNldFNhdmVEYXRlc0Vycm9yKHRydWUpO1xyXG4gICAgfSBlbHNlIGlmICghKGlzU2F2aW5nRGF0ZXMgYXMgYm9vbGVhbikpIHtcclxuICAgICAgc2V0U2F2ZURhdGVzRXJyb3IoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtpc1NhdmluZ0RhdGVzLCBoYXNTYXZlRGF0ZXNFcnJvcl0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwb3BvdmVyKSByZXR1cm47XHJcbiAgICBjb25zdCBvbk1vdXNlRG93biA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChwb3BvdmVyUmVmLmN1cnJlbnQgJiYgIXBvcG92ZXJSZWYuY3VycmVudC5jb250YWlucyhlLnRhcmdldCBhcyBOb2RlKSlcclxuICAgICAgICBzZXRQb3BvdmVyKG51bGwpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uS2V5RG93biA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7IGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHNldFBvcG92ZXIobnVsbCk7IH07XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7XHJcbiAgICB9O1xyXG4gIH0sIFtwb3BvdmVyXSk7XHJcblxyXG4gIGNvbnN0IG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYgPSB1c2VSZWY8c3RyaW5nPignJyk7XHJcbiAgY29uc3QgcHJldlNhdmVkQXRSZWYgPSBSZWFjdC51c2VSZWY8c3RyaW5nPihcIlwiKTtcclxuICBjb25zdCBzY3JvbGxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZWwgPSBzY3JvbGxSZWYuY3VycmVudDtcclxuICAgIGlmICghZWwpIHJldHVybjtcclxuICAgIGNvbnN0IHJvID0gbmV3IFJlc2l6ZU9ic2VydmVyKGVudHJpZXMgPT4ge1xyXG4gICAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcclxuICAgICAgICBzZXRDb250YWluZXJXaWR0aChlbnRyeS5jb250ZW50UmVjdC53aWR0aCB8fCA4MDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJvLm9ic2VydmUoZWwpO1xyXG4gICAgcmV0dXJuICgpID0+IHJvLmRpc2Nvbm5lY3QoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIC8vIE9wdGltaXN0aWMgc2F2ZTogd2hlbiBzYXZlZEF0IGNoYW5nZXMgdGhlIERCIHdyaXRlIHN1Y2NlZWRlZCBcdTIwMTQgc25hcHNob3QgdGhlXHJcbiAgLy8gY3VycmVudCBzdGF0ZSBhcyB0aGUgbmV3IGJhc2VsaW5lIHdpdGhvdXQgd2FpdGluZyBmb3IgYSBnZXRTY2hlZHVsZXJEYXRhIHJlLWZldGNoLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB0cyA9IHNhdmVkQXQgYXMgc3RyaW5nO1xyXG4gICAgaWYgKCF0cyB8fCB0cyA9PT0gcHJldlNhdmVkQXRSZWYuY3VycmVudCkgcmV0dXJuOyAvLyBza2lwIGluaXRpYWwgbW91bnQgKyBkdXBsaWNhdGVzXHJcbiAgICBwcmV2U2F2ZWRBdFJlZi5jdXJyZW50ID0gdHM7XHJcbiAgICAvLyBTbmFwc2hvdCBjdXJyZW50IGFsbG9jYXRpb25zIGFzIHRoZSBuZXcgXCJvcmlnaW5hbFwiIHNvIGRpcnR5LWNoZWNrIHJlc2V0cyBjb3JyZWN0bHlcclxuICAgIGNvbnN0IGN1cnJlbnRBbGxvY3MgPSBidWlsZEFsbG9jYXRpb25zKHN0YW5kcyk7XHJcbiAgICBvcmlnaW5hbEFsbG9jYXRpb25zUmVmLmN1cnJlbnQgPSBhbGxvY2F0aW9uc0tleShjdXJyZW50QWxsb2NzKTtcclxuICAgIHNldElzRGlydHkoZmFsc2UpO1xyXG4gICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpO1xyXG4gICAgc2V0U2F2ZUVycm9yKGZhbHNlKTtcclxuICB9LCBbc2F2ZWRBdCwgc3RhbmRzXSk7XHJcbiAgY29uc3QgW2NvbnRhaW5lcldpZHRoLCBzZXRDb250YWluZXJXaWR0aF0gPSBSZWFjdC51c2VTdGF0ZSg4MDApO1xyXG4gIGNvbnN0IFtxdWV1ZVNvcnQsIHNldFF1ZXVlU29ydF0gPSBSZWFjdC51c2VTdGF0ZTwnYXonIHwgJ3ByaW9yaXR5JyB8ICdzdGF0dXMnPignYXonKTtcclxuICBjb25zdCBbcXVldWVGaWx0ZXIsIHNldFF1ZXVlRmlsdGVyXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcclxuXHJcbiAgY29uc3Qgc3RhdHVzT3B0aW9uc0xpc3QgPSB1c2VNZW1vPHN0cmluZ1tdPigoKSA9PiB7XHJcbiAgICBjb25zdCBhcnIgPSBBcnJheS5pc0FycmF5KHN0YXR1c09wdGlvbnMpID8gc3RhdHVzT3B0aW9ucyBhcyBhbnlbXSA6IFtdO1xyXG4gICAgcmV0dXJuIGFyci5sZW5ndGggPiAwID8gYXJyLm1hcChTdHJpbmcpIDogW1wiTlVMTFwiLCBcIlJ1bm5pbmdcIiwgXCJDcmVhdGVkXCIsIFwiVGVzdGVkXCIsIFwiQ2FuY2VsbGVkXCJdO1xyXG4gIH0sIFtzdGF0dXNPcHRpb25zXSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBJbml0aWFsaXplIGZyb20gaW5wdXQgZGF0YSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBpbnB1dEtleSA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBKU09OLnN0cmluZ2lmeShpbnB1dFRlc3RzKSArIEpTT04uc3RyaW5naWZ5KGlucHV0U3RhbmRzKSArIEpTT04uc3RyaW5naWZ5KGlucHV0Tm9uV29ya2luZyksXHJcbiAgICBbaW5wdXRUZXN0cywgaW5wdXRTdGFuZHMsIGlucHV0Tm9uV29ya2luZ11cclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgdGVzdHNBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0VGVzdHMpID8gaW5wdXRUZXN0cyA6IFtdO1xyXG4gICAgY29uc3Qgc3RhbmRzQXJyID0gQXJyYXkuaXNBcnJheShpbnB1dFN0YW5kcykgPyAoaW5wdXRTdGFuZHMgYXMgU3RhbmREZWZbXSkgOiBbXTtcclxuICAgIGNvbnN0IG5vbldvcmtpbmdBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0Tm9uV29ya2luZykgPyBpbnB1dE5vbldvcmtpbmcgOiBbXTtcclxuXHJcbiAgICBpZiAoc3RhbmRzQXJyLmxlbmd0aCA9PT0gMCAmJiB0ZXN0c0Fyci5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB7IHN0YW5kczogbmV3U3RhbmRzLCB1bmFsbG9jYXRlZDogdW5hbGxvYyB9ID0gcGFyc2VTdGFuZHModGVzdHNBcnIsIHN0YW5kc0FyciwgY2hIb3Vycywgbm9uV29ya2luZ0Fycik7XHJcbiAgICBzZXRTdGFuZHMobmV3U3RhbmRzKTtcclxuICAgIHNldFVuYWxsb2NhdGVkKHVuYWxsb2MpO1xyXG4gICAgc2V0SXNEaXJ0eShmYWxzZSk7XHJcblxyXG4gICAgLy8gU25hcHNob3QgdGhlIGluaXRpYWwgYWxsb2NhdGlvbnNcclxuICAgIGNvbnN0IGluaXRpYWxBbGxvY3MgPSBidWlsZEFsbG9jYXRpb25zKG5ld1N0YW5kcyk7XHJcbiAgICBvcmlnaW5hbEFsbG9jYXRpb25zUmVmLmN1cnJlbnQgPSBhbGxvY2F0aW9uc0tleShpbml0aWFsQWxsb2NzKTtcclxuXHJcbiAgICAvLyBTZXQgb3V0cHV0IHN0YXRlXHJcbiAgICBzZXRBbGxvY2F0aW9ucyhpbml0aWFsQWxsb2NzKTtcclxuICAgIHNldEFsbFRlc3RJZHModGVzdHNBcnIubWFwKCh0OiBhbnkpID0+IHQuaWQpKTtcclxuICAgIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzKGZhbHNlKTtcclxuXHJcbiAgICAvLyBDbGVhciBzYXZlIGxvY2sgXHUyMDE0IG5ldyBkYXRhIGFycml2aW5nIGZyb20gUmV0b29sIG1lYW5zIHRoZSBzYXZlIHJvdW5kLXRyaXAgY29tcGxldGVkLlxyXG4gICAgLy8gVGhpcyBpcyBtb3JlIHJlbGlhYmxlIHRoYW4gd2FpdGluZyBmb3IgdGhlIHNhdmVTdGF0ZSBiaW5kaW5nIHRvIHRyYW5zaXRpb24gdGhyb3VnaFxyXG4gICAgLy8gJ3NhdmluZycgXHUyMTkyICdpZGxlJywgd2hpY2ggUmV0b29sIGNhbiBiYXRjaCBhd2F5IHNvIHRoZSB1c2VFZmZlY3QgbmV2ZXIgZmlyZXMuXHJcbiAgICBzZXRQZW5kaW5nU2F2ZShmYWxzZSk7XHJcbiAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gIH0sIFtpbnB1dEtleV0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgU2NoZWR1bGluZyBjb25maWcgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgY2hIb3VycyA9IChjaGFuZ2VvdmVySG91cnMgYXMgbnVtYmVyKSB8fCAzO1xyXG4gIGNvbnN0IHdTdGFydCA9ICh3b3JrU3RhcnQgYXMgbnVtYmVyKSB8fCA5O1xyXG4gIGNvbnN0IHdFbmQgPSAod29ya0VuZCBhcyBudW1iZXIpIHx8IDE3O1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgVmlldyBjb21wdXRhdGlvbnMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3Qgdmlld1N0YXJ0ID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcclxuICAgIGQuc2V0SG91cnMoMCwgMCwgMCwgMCk7XHJcbiAgICB3aGlsZSAoZC5nZXREYXkoKSAhPT0gMSkgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpIC0gMSk7XHJcbiAgICByZXR1cm4gZDtcclxuICB9LCBbXSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBTY2hlZHVsZSBjb21wdXRhdGlvbiAobXVzdCBiZSBkZWZpbmVkIGJlZm9yZSB0aW1lbGluZUVuZCkgXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgY29tcHV0ZVNjaGVkdWxlID0gdXNlQ2FsbGJhY2soKHRlc3RzOiBUZXN0RGF0YVtdLCBzdGFuZENoYW5nZW92ZXI6IG51bWJlciwgbm9uV29ya2luZ0Jsb2NrczogTm9uV29ya2luZ0Jsb2NrW10pOiBTY2hlZHVsZWRUZXN0W10gPT4ge1xyXG4gICAgY29uc3QgcnVubmluZ1Rlc3RzID0gdGVzdHMuZmlsdGVyKHQgPT4gaXNSdW5uaW5nVGVzdCh0KSk7XHJcbiAgICBjb25zdCBxdWV1ZWRUZXN0cyA9IHRlc3RzLmZpbHRlcih0ID0+ICFpc1J1bm5pbmdUZXN0KHQpKTtcclxuXHJcbiAgICAvLyBTb3J0IFJ1bm5pbmcgdGVzdHMgYnkgYWN0dWFsIHN0YXJ0IGRhdGUsIHRoZW4gcHJpb3JpdHkgZGVzYyBmb3IgdGllc1xyXG4gICAgY29uc3Qgc29ydGVkUnVubmluZyA9IFsuLi5ydW5uaW5nVGVzdHNdLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgY29uc3QgZGF0ZUEgPSBwYXJzZUxvY2FsRGF0ZShhLnRlc3Rfc3RhcnRlZF9kYXRlKSB8fCBuZXcgRGF0ZSgpO1xyXG4gICAgICBjb25zdCBkYXRlQiA9IHBhcnNlTG9jYWxEYXRlKGIudGVzdF9zdGFydGVkX2RhdGUpIHx8IG5ldyBEYXRlKCk7XHJcbiAgICAgIGlmIChkYXRlQS5nZXRUaW1lKCkgIT09IGRhdGVCLmdldFRpbWUoKSkgcmV0dXJuIGRhdGVBLmdldFRpbWUoKSAtIGRhdGVCLmdldFRpbWUoKTtcclxuICAgICAgcmV0dXJuIChiLnByaW9yaXR5ID8/IDUwKSAtIChhLnByaW9yaXR5ID8/IDUwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJ1bm5pbmcgdGVzdHMgdXNlIHRoZWlyIGFjdHVhbCB0ZXN0X3N0YXJ0ZWRfZGF0ZTsgb3ZlcmxhcHBpbmcgb25lcyBhcmUgbWFkZSBzZXF1ZW50aWFsXHJcbiAgICBsZXQgbGFzdFJ1bm5pbmdFbmQgPSBuZXcgRGF0ZSh2aWV3U3RhcnQpO1xyXG4gICAgY29uc3QgcnVubmluZ1NjaGVkdWxlZCA9IHNvcnRlZFJ1bm5pbmcubWFwKHRlc3QgPT4ge1xyXG4gICAgICBjb25zdCB0ZXN0RGF0ZSA9IHBhcnNlTG9jYWxEYXRlKHRlc3QudGVzdF9zdGFydGVkX2RhdGUpIHx8IG5ldyBEYXRlKHZpZXdTdGFydCk7XHJcbiAgICAgIGNvbnN0IHN0YXJ0ID0gdGVzdERhdGUgPCBsYXN0UnVubmluZ0VuZCA/IG5ldyBEYXRlKGxhc3RSdW5uaW5nRW5kKSA6IG5ldyBEYXRlKHRlc3REYXRlKTtcclxuICAgICAgY29uc3QgZW5kID0gbmV3IERhdGUoc3RhcnQuZ2V0VGltZSgpICsgdGVzdC5kdXJhdGlvbiAqIE1TX1BFUl9IT1VSKTtcclxuICAgICAgbGFzdFJ1bm5pbmdFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKGVuZCwgc3RhbmRDaGFuZ2VvdmVyLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICByZXR1cm4geyAuLi50ZXN0LCBzdGFydCwgZW5kIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBRdWV1ZWQgdGVzdHMgc3RhcnQgYWZ0ZXIgbGFzdCBSdW5uaW5nIHRlc3QncyBjaGFuZ2VvdmVyIChvciBub3crY2hhbmdlb3Zlciwgd2hpY2hldmVyIGlzIGxhdGVyKS5cclxuICAgIC8vIFdlIG5ldmVyIHNjaGVkdWxlIGEgcGxhbm5lZCB0ZXN0IHRvIHN0YXJ0IGluIHRoZSBwYXN0LlxyXG4gICAgLy8gZmluZFZhbGlkU3RhcnQgcHVzaGVzIHRoZSBzdGFydCBmb3J3YXJkIHVudGlsIHRoZSBmdWxsIFtzdGFydCwgc3RhcnQrZHVyYXRpb24pIHdpbmRvd1xyXG4gICAgLy8gZG9lc24ndCBvdmVybGFwIGFueSBub24td29ya2luZyBibG9jayAoY292ZXJzIGJvdGggc3RhcnQtaW5zaWRlIGFuZCBlbmQtaW5zaWRlIGNhc2VzKS5cclxuICAgIGNvbnN0IG5vd1BsdXNDaGFuZ2VvdmVyID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChuZXcgRGF0ZSgpLCBzdGFuZENoYW5nZW92ZXIsIHdTdGFydCwgd0VuZCk7XHJcbiAgICBsZXQgY3VycmVudEVuZCA9IG5ldyBEYXRlKE1hdGgubWF4KGxhc3RSdW5uaW5nRW5kLmdldFRpbWUoKSwgbm93UGx1c0NoYW5nZW92ZXIuZ2V0VGltZSgpKSk7XHJcbiAgICBjb25zdCBxdWV1ZWRTY2hlZHVsZWQgPSBxdWV1ZWRUZXN0cy5tYXAodGVzdCA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0ID0gZmluZFZhbGlkU3RhcnQobmV3IERhdGUoY3VycmVudEVuZCksIHRlc3QuZHVyYXRpb24sIG5vbldvcmtpbmdCbG9ja3MpO1xyXG4gICAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShzdGFydC5nZXRUaW1lKCkgKyB0ZXN0LmR1cmF0aW9uICogTVNfUEVSX0hPVVIpO1xyXG4gICAgICBjdXJyZW50RW5kID0gYWR2YW5jZVBhc3ROb25Xb3JraW5nKFxyXG4gICAgICAgIGNhbGN1bGF0ZUNoYW5nZW92ZXJFbmQoZW5kLCBzdGFuZENoYW5nZW92ZXIsIHdTdGFydCwgd0VuZCksXHJcbiAgICAgICAgbm9uV29ya2luZ0Jsb2Nrc1xyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4geyAuLi50ZXN0LCBzdGFydCwgZW5kIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gWy4uLnJ1bm5pbmdTY2hlZHVsZWQsIC4uLnF1ZXVlZFNjaGVkdWxlZF07XHJcbiAgfSwgW3ZpZXdTdGFydCwgd1N0YXJ0LCB3RW5kXSk7XHJcblxyXG4gIGNvbnN0IHN0YW5kU2NoZWR1bGVzID0gdXNlTWVtbyhcclxuICAgICgpID0+IG5ldyBNYXAoc3RhbmRzLm1hcChzID0+IFtzLmlkLCBjb21wdXRlU2NoZWR1bGUocy50ZXN0cywgcy5jaGFuZ2VvdmVyX2hvdXJzLCBzLm5vbldvcmtpbmdCbG9ja3MpXSkpLFxyXG4gICAgW3N0YW5kcywgY29tcHV0ZVNjaGVkdWxlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRpbWVsaW5lRW5kID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBsZXQgbGF0ZXN0RW5kID0gbmV3IERhdGUodmlld1N0YXJ0KTtcclxuICAgIGxhdGVzdEVuZC5zZXREYXRlKGxhdGVzdEVuZC5nZXREYXRlKCkgKyB2aWV3cG9ydFdlZWtzICogNyk7XHJcblxyXG4gICAgc3RhbmRzLmZvckVhY2goc3RhbmQgPT4ge1xyXG4gICAgICBjb25zdCBzY2hlZHVsZSA9IHN0YW5kU2NoZWR1bGVzLmdldChzdGFuZC5pZCkgPz8gW107XHJcbiAgICAgIGlmIChzY2hlZHVsZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgbGFzdCA9IHNjaGVkdWxlW3NjaGVkdWxlLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZW92ZXJFbmQgPSBjYWxjdWxhdGVDaGFuZ2VvdmVyRW5kKGxhc3QuZW5kLCBzdGFuZC5jaGFuZ2VvdmVyX2hvdXJzLCB3U3RhcnQsIHdFbmQpO1xyXG4gICAgICAgIGlmIChjaGFuZ2VvdmVyRW5kID4gbGF0ZXN0RW5kKSBsYXRlc3RFbmQgPSBjaGFuZ2VvdmVyRW5kO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsYXRlc3RFbmQuc2V0RGF0ZShsYXRlc3RFbmQuZ2V0RGF0ZSgpICsgNyk7XHJcbiAgICByZXR1cm4gbGF0ZXN0RW5kO1xyXG4gIH0sIFtzdGFuZFNjaGVkdWxlcywgc3RhbmRzLCB2aWV3U3RhcnQsIHZpZXdwb3J0V2Vla3MsIHdTdGFydCwgd0VuZF0pO1xyXG5cclxuICBjb25zdCB0b3RhbERheXMgPSB1c2VNZW1vKCgpID0+IE1hdGguY2VpbChob3Vyc0JldHdlZW4odmlld1N0YXJ0LCB0aW1lbGluZUVuZCkgLyAyNCksIFt2aWV3U3RhcnQsIHRpbWVsaW5lRW5kXSk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBQbGFubmVkIGRhdGVzIGZvciBzY2hlZHVsZWQgdGVzdHMgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3Qgc2NoZWR1bGVkUGxhbm5lZERhdGVzID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCByZXN1bHQ6IEFycmF5PHsgdGVzdF9pZDogbnVtYmVyIHwgc3RyaW5nOyBwbGFubmVkX2RhdGU6IHN0cmluZyB9PiA9IFtdO1xyXG4gICAgc3RhbmRzLmZvckVhY2goc3RhbmQgPT4ge1xyXG4gICAgICBjb25zdCBzY2hlZHVsZSA9IHN0YW5kU2NoZWR1bGVzLmdldChzdGFuZC5pZCkgPz8gW107XHJcbiAgICAgIHNjaGVkdWxlLmZvckVhY2goc3QgPT4ge1xyXG4gICAgICAgIGNvbnN0IGQgPSBzdC5zdGFydDtcclxuICAgICAgICBjb25zdCBkYXRlU3RyID0gYCR7ZC5nZXRGdWxsWWVhcigpfS0ke1N0cmluZyhkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpfS0ke1N0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKX1gO1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKHsgdGVzdF9pZDogc3QuaWQsIHBsYW5uZWRfZGF0ZTogZGF0ZVN0ciB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSwgW3N0YW5kcywgc3RhbmRTY2hlZHVsZXNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldFBsYW5uZWREYXRlcyhzY2hlZHVsZWRQbGFubmVkRGF0ZXMpO1xyXG4gIH0sIFtzY2hlZHVsZWRQbGFubmVkRGF0ZXNdKTtcclxuXHJcbiAgY29uc3QgcHhQZXJIb3VyID0gY29udGFpbmVyV2lkdGggLyAodmlld3BvcnRXZWVrcyAqIDcgKiAyNCk7XHJcbiAgY29uc3QgZGF5cyA9IHVzZU1lbW8oKCkgPT4gZ2VuZXJhdGVEYXlzKHZpZXdTdGFydCwgdG90YWxEYXlzKSwgW3ZpZXdTdGFydCwgdG90YWxEYXlzXSk7XHJcbiAgY29uc3Qgd2Vla3MgPSB1c2VNZW1vKCgpID0+IGdlbmVyYXRlV2Vla3Modmlld1N0YXJ0LCB0b3RhbERheXMpLCBbdmlld1N0YXJ0LCB0b3RhbERheXNdKTtcclxuICBjb25zdCB0b3RhbFdpZHRoID0gdG90YWxEYXlzICogMjQgKiBweFBlckhvdXI7XHJcbiAgY29uc3QgZGF5V2lkdGggPSAyNCAqIHB4UGVySG91cjtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEFmdGVyLWNoYW5nZSBoYW5kbGVyIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGFmdGVyQ2hhbmdlID0gdXNlQ2FsbGJhY2soKG5ld1N0YW5kczogSW50ZXJuYWxTdGFuZFtdKSA9PiB7XHJcbiAgICBjb25zdCBhbGxvY3MgPSBidWlsZEFsbG9jYXRpb25zKG5ld1N0YW5kcyk7XHJcbiAgICBjb25zdCBkaXJ0eSA9IGFsbG9jYXRpb25zS2V5KGFsbG9jcykgIT09IG9yaWdpbmFsQWxsb2NhdGlvbnNSZWYuY3VycmVudDtcclxuICAgIHNldElzRGlydHkoZGlydHkpO1xyXG4gICAgc2V0QWxsb2NhdGlvbnMoYWxsb2NzKTtcclxuICAgIHNldEhhc1Vuc2F2ZWRDaGFuZ2VzKGRpcnR5KTtcclxuXHJcbiAgICBpZiAoKHNhdmVNb2RlIGFzIHN0cmluZykgPT09ICdsaXZlJykge1xyXG4gICAgICBzZXRQZW5kaW5nU2F2ZSh0cnVlKTtcclxuICAgICAgb25DaGFuZ2UoKTtcclxuICAgIH1cclxuICB9LCBbc2F2ZU1vZGUsIHNldEFsbG9jYXRpb25zLCBzZXRIYXNVbnNhdmVkQ2hhbmdlcywgb25DaGFuZ2VdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIERyYWcgYW5kIGRyb3AgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgZmluZFRlc3QgPSB1c2VDYWxsYmFjaygodGVzdElkOiBzdHJpbmcgfCBudW1iZXIpOiBUZXN0RGF0YSB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgcSA9IHVuYWxsb2NhdGVkLmZpbmQodCA9PiB0LmlkID09PSB0ZXN0SWQpO1xyXG4gICAgaWYgKHEpIHJldHVybiBxO1xyXG4gICAgZm9yIChjb25zdCBzIG9mIHN0YW5kcykge1xyXG4gICAgICBjb25zdCB0ID0gcy50ZXN0cy5maW5kKHQgPT4gdC5pZCA9PT0gdGVzdElkKTtcclxuICAgICAgaWYgKHQpIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSwgW3VuYWxsb2NhdGVkLCBzdGFuZHNdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJEcmFnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0RHJhZ2dlZFRlc3RJZChudWxsKTtcclxuICAgIHNldEluc2VydEluZGljYXRvcihudWxsKTtcclxuICAgIHNldFF1ZXVlSW5zZXJ0SW5kZXgobnVsbCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBkcm9wT25TdGFuZCA9IHVzZUNhbGxiYWNrKChzdGFuZElkOiBzdHJpbmcgfCBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIGlmICghZHJhZ2dlZFRlc3RJZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgdGVzdCA9IGZpbmRUZXN0KGRyYWdnZWRUZXN0SWQpO1xyXG4gICAgaWYgKCF0ZXN0KSByZXR1cm47XHJcblxyXG4gICAgLy8gUmVtb3ZlIGZyb20gdW5hbGxvY2F0ZWRcclxuICAgIHNldFVuYWxsb2NhdGVkKHByZXYgPT4gcHJldi5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGZyb20gYWxsIHN0YW5kcyBhbmQgaW5zZXJ0IGF0IHRhcmdldFxyXG4gICAgY29uc3QgbmV3U3RhbmRzID0gc3RhbmRzLm1hcChzID0+IHtcclxuICAgICAgY29uc3QgZmlsdGVyZWQgPSBzLnRlc3RzLmZpbHRlcih0ID0+IHQuaWQgIT09IGRyYWdnZWRUZXN0SWQpO1xyXG4gICAgICBpZiAocy5pZCA9PT0gc3RhbmRJZCkge1xyXG4gICAgICAgIGNvbnN0IG5ld1Rlc3RzID0gWy4uLmZpbHRlcmVkXTtcclxuICAgICAgICBuZXdUZXN0cy5zcGxpY2UoaW5kZXgsIDAsIHRlc3QpO1xyXG4gICAgICAgIHJldHVybiB7IC4uLnMsIHRlc3RzOiBuZXdUZXN0cyB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7IC4uLnMsIHRlc3RzOiBmaWx0ZXJlZCB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0U3RhbmRzKG5ld1N0YW5kcyk7XHJcbiAgICBhZnRlckNoYW5nZShuZXdTdGFuZHMpO1xyXG4gICAgY2xlYXJEcmFnKCk7XHJcbiAgfSwgW2RyYWdnZWRUZXN0SWQsIGZpbmRUZXN0LCBzdGFuZHMsIGFmdGVyQ2hhbmdlLCBjbGVhckRyYWddKTtcclxuXHJcbiAgY29uc3QgZHJvcE9uUXVldWUgPSB1c2VDYWxsYmFjaygoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgaWYgKCFkcmFnZ2VkVGVzdElkKSByZXR1cm47XHJcbiAgICBjb25zdCB0ZXN0ID0gZmluZFRlc3QoZHJhZ2dlZFRlc3RJZCk7XHJcbiAgICBpZiAoIXRlc3QpIHJldHVybjtcclxuXHJcbiAgICAvLyBSZW1vdmUgZnJvbSBzdGFuZHNcclxuICAgIGNvbnN0IG5ld1N0YW5kcyA9IHN0YW5kcy5tYXAocyA9PiAoe1xyXG4gICAgICAuLi5zLFxyXG4gICAgICB0ZXN0czogcy50ZXN0cy5maWx0ZXIodCA9PiB0LmlkICE9PSBkcmFnZ2VkVGVzdElkKSxcclxuICAgIH0pKTtcclxuXHJcbiAgICAvLyBBZGQgdG8gdW5hbGxvY2F0ZWRcclxuICAgIHNldFVuYWxsb2NhdGVkKHByZXYgPT4ge1xyXG4gICAgICBjb25zdCBmaWx0ZXJlZCA9IHByZXYuZmlsdGVyKHQgPT4gdC5pZCAhPT0gZHJhZ2dlZFRlc3RJZCk7XHJcbiAgICAgIGNvbnN0IG5leHQgPSBbLi4uZmlsdGVyZWRdO1xyXG4gICAgICBuZXh0LnNwbGljZShpbmRleCwgMCwgdGVzdCk7XHJcbiAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0U3RhbmRzKG5ld1N0YW5kcyk7XHJcbiAgICBhZnRlckNoYW5nZShuZXdTdGFuZHMpO1xyXG4gICAgY2xlYXJEcmFnKCk7XHJcbiAgfSwgW2RyYWdnZWRUZXN0SWQsIGZpbmRUZXN0LCBzdGFuZHMsIGFmdGVyQ2hhbmdlLCBjbGVhckRyYWddKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFNhdmUgLyBEaXNjYXJkIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGhhbmRsZVNhdmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRQZW5kaW5nU2F2ZSh0cnVlKTtcclxuICAgIG9uU2F2ZSgpO1xyXG4gIH0sIFtvblNhdmVdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2F2ZVBsYW5uZWREYXRlcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFBlbmRpbmdTYXZlRGF0ZXModHJ1ZSk7XHJcbiAgICBzZXRTYXZlRGF0ZXNFcnJvcihmYWxzZSk7XHJcbiAgICBvblNhdmVQbGFubmVkRGF0ZXMoKTtcclxuICB9LCBbb25TYXZlUGxhbm5lZERhdGVzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURpc2NhcmQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRTYXZlRXJyb3IoZmFsc2UpO1xyXG4gICAgc2V0UGVuZGluZ1NhdmUoZmFsc2UpO1xyXG4gICAgLy8gUmUtcGFyc2UgZnJvbSBpbnB1dCBkYXRhXHJcbiAgICBjb25zdCB0ZXN0c0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXRUZXN0cykgPyBpbnB1dFRlc3RzIDogW107XHJcbiAgICBjb25zdCBzdGFuZHNBcnIgPSBBcnJheS5pc0FycmF5KGlucHV0U3RhbmRzKSA/IChpbnB1dFN0YW5kcyBhcyBTdGFuZERlZltdKSA6IFtdO1xyXG4gICAgY29uc3Qgbm9uV29ya2luZ0FyciA9IEFycmF5LmlzQXJyYXkoaW5wdXROb25Xb3JraW5nKSA/IGlucHV0Tm9uV29ya2luZyA6IFtdO1xyXG5cclxuICAgIGNvbnN0IHsgc3RhbmRzOiBuZXdTdGFuZHMsIHVuYWxsb2NhdGVkOiB1bmFsbG9jIH0gPSBwYXJzZVN0YW5kcyh0ZXN0c0Fyciwgc3RhbmRzQXJyLCBjaEhvdXJzLCBub25Xb3JraW5nQXJyKTtcclxuICAgIHNldFN0YW5kcyhuZXdTdGFuZHMpO1xyXG4gICAgc2V0VW5hbGxvY2F0ZWQodW5hbGxvYyk7XHJcbiAgICBzZXRJc0RpcnR5KGZhbHNlKTtcclxuICAgIHNldEFsbG9jYXRpb25zKGJ1aWxkQWxsb2NhdGlvbnMobmV3U3RhbmRzKSk7XHJcbiAgICBzZXRIYXNVbnNhdmVkQ2hhbmdlcyhmYWxzZSk7XHJcbiAgfSwgW2lucHV0VGVzdHMsIGlucHV0U3RhbmRzLCBpbnB1dE5vbldvcmtpbmcsIGNoSG91cnMsIHNldEFsbG9jYXRpb25zLCBzZXRIYXNVbnNhdmVkQ2hhbmdlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVSZXRyeSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFNhdmVFcnJvcihmYWxzZSk7XHJcbiAgICBzZXRQZW5kaW5nU2F2ZSh0cnVlKTtcclxuICAgIG9uUmV0cnkoKTtcclxuICB9LCBbb25SZXRyeV0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgUG9wb3ZlciBhY3Rpb25zIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGNsb3NlUG9wb3ZlciA9IHVzZUNhbGxiYWNrKCgpID0+IHNldFBvcG92ZXIobnVsbCksIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUG9wb3Zlck1vZGVDaGFuZ2UgPSB1c2VDYWxsYmFjaygobW9kZTogJ3Jvb3QnIHwgJ3ByaW9yaXR5JyB8ICdzdGF0dXMnIHwgJ3N0YXJ0X2RhdGUnKSA9PiB7XHJcbiAgICBzZXRQb3BvdmVyKHByZXYgPT4gcHJldiA/IHsgLi4ucHJldiwgbW9kZSB9IDogbnVsbCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25maXJtUHJpb3JpdHkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIXBvcG92ZXIpIHJldHVybjtcclxuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHByaW9yaXR5SW5wdXRWYWx1ZSwgMTApO1xyXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkgfHwgcGFyc2VkIDwgMCB8fCBwYXJzZWQgPiAxMDApIHJldHVybjtcclxuICAgIHNldFNlbGVjdGVkVGVzdElkKFN0cmluZyhwb3BvdmVyLnRlc3QuaWQpKTtcclxuICAgIHNldFNlbGVjdGVkVGVzdFByaW9yaXR5KFN0cmluZyhwYXJzZWQpKTtcclxuICAgIG9uQ2hhbmdlUHJpb3JpdHkoKTtcclxuICAgIHNldFBvcG92ZXIobnVsbCk7XHJcbiAgfSwgW3BvcG92ZXIsIHByaW9yaXR5SW5wdXRWYWx1ZSwgc2V0U2VsZWN0ZWRUZXN0SWQsIHNldFNlbGVjdGVkVGVzdFByaW9yaXR5LCBvbkNoYW5nZVByaW9yaXR5XSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVBpY2tTdGF0dXMgPSB1c2VDYWxsYmFjaygoc3RhdHVzOiBzdHJpbmcpID0+IHtcclxuICAgIGlmICghcG9wb3ZlcikgcmV0dXJuO1xyXG4gICAgc2V0U2VsZWN0ZWRUZXN0SWQoU3RyaW5nKHBvcG92ZXIudGVzdC5pZCkpO1xyXG4gICAgc2V0U2VsZWN0ZWRUZXN0U3RhdHVzKHN0YXR1cyA9PT0gJ05VTEwnID8gJycgOiBzdGF0dXMpO1xyXG4gICAgb25DaGFuZ2VTdGF0dXMoKTtcclxuICAgIHNldFBvcG92ZXIobnVsbCk7XHJcbiAgfSwgW3BvcG92ZXIsIHNldFNlbGVjdGVkVGVzdElkLCBzZXRTZWxlY3RlZFRlc3RTdGF0dXMsIG9uQ2hhbmdlU3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVkaXRUZXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFwb3BvdmVyKSByZXR1cm47XHJcbiAgICBzZXRTZWxlY3RlZFRlc3RJZChTdHJpbmcocG9wb3Zlci50ZXN0LmlkKSk7XHJcbiAgICBvbkVkaXRUZXN0KCk7XHJcbiAgICBzZXRQb3BvdmVyKG51bGwpO1xyXG4gIH0sIFtwb3BvdmVyLCBzZXRTZWxlY3RlZFRlc3RJZCwgb25FZGl0VGVzdF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25maXJtU3RhcnREYXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFwb3BvdmVyIHx8ICFzdGFydERhdGVJbnB1dFZhbHVlKSByZXR1cm47XHJcbiAgICBzZXRTZWxlY3RlZFRlc3RJZChTdHJpbmcocG9wb3Zlci50ZXN0LmlkKSk7XHJcbiAgICBzZXRTZWxlY3RlZFRlc3RTdGFydERhdGUoc3RhcnREYXRlSW5wdXRWYWx1ZSk7XHJcbiAgICBvbkNoYW5nZVN0YXJ0RGF0ZSgpO1xyXG4gICAgc2V0UG9wb3ZlcihudWxsKTtcclxuICAgIHNldFN0YXJ0RGF0ZUlucHV0VmFsdWUoJycpO1xyXG4gIH0sIFtwb3BvdmVyLCBzdGFydERhdGVJbnB1dFZhbHVlLCBzZXRTZWxlY3RlZFRlc3RJZCwgc2V0U2VsZWN0ZWRUZXN0U3RhcnREYXRlLCBvbkNoYW5nZVN0YXJ0RGF0ZV0pO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgQmFyIHBvc2l0aW9uIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IGdldEJhclBvcyA9IHVzZUNhbGxiYWNrKChzdGFydDogRGF0ZSwgZHVyYXRpb246IG51bWJlcikgPT4gKHtcclxuICAgIGxlZnQ6IE1hdGgubWF4KDAsIGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIHN0YXJ0KSkgKiBweFBlckhvdXIsXHJcbiAgICB3aWR0aDogTWF0aC5tYXgoZHVyYXRpb24gKiBweFBlckhvdXIsIDIpLFxyXG4gIH0pLCBbdmlld1N0YXJ0LCBweFBlckhvdXJdKTtcclxuXHJcbiAgLy8gRm9yIFJ1bm5pbmcgdGVzdHM6IGNsaXAgbGVmdCB0byB2aWV3U3RhcnQsIGFkanVzdCB3aWR0aCB0byBhY3R1YWwgZW5kIHRpbWUuXHJcbiAgLy8gUmV0dXJucyBudWxsIGlmIHRoZSB0ZXN0IGVuZGVkIGJlZm9yZSB0aGUgdGltZWxpbmUgc3RhcnRzLlxyXG4gIGNvbnN0IGdldFJ1bm5pbmdCYXJQb3MgPSB1c2VDYWxsYmFjaygoc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSk6IHsgbGVmdDogbnVtYmVyOyB3aWR0aDogbnVtYmVyIH0gfCBudWxsID0+IHtcclxuICAgIGNvbnN0IGVmZmVjdGl2ZVN0YXJ0TXMgPSBNYXRoLm1heChzdGFydC5nZXRUaW1lKCksIHZpZXdTdGFydC5nZXRUaW1lKCkpO1xyXG4gICAgY29uc3QgZW5kTXMgPSBlbmQuZ2V0VGltZSgpO1xyXG4gICAgaWYgKGVuZE1zIDw9IGVmZmVjdGl2ZVN0YXJ0TXMpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGVmdDogaG91cnNCZXR3ZWVuKHZpZXdTdGFydCwgbmV3IERhdGUoZWZmZWN0aXZlU3RhcnRNcykpICogcHhQZXJIb3VyLFxyXG4gICAgICB3aWR0aDogTWF0aC5tYXgoaG91cnNCZXR3ZWVuKG5ldyBEYXRlKGVmZmVjdGl2ZVN0YXJ0TXMpLCBuZXcgRGF0ZShlbmRNcykpICogcHhQZXJIb3VyLCAyKSxcclxuICAgIH07XHJcbiAgfSwgW3ZpZXdTdGFydCwgcHhQZXJIb3VyXSk7XHJcblxyXG4gIGNvbnN0IGRyYWdnZWRUZXN0ID0gZHJhZ2dlZFRlc3RJZCAhPSBudWxsID8gZmluZFRlc3QoZHJhZ2dlZFRlc3RJZCkgOiBudWxsO1xyXG4gIGNvbnN0IGRyYWdnZWRJc1J1bm5pbmcgPSBkcmFnZ2VkVGVzdCAhPSBudWxsID8gaXNSdW5uaW5nVGVzdChkcmFnZ2VkVGVzdCkgOiBmYWxzZTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIFN0YXRzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IHRvdGFsQWxsb2NhdGVkID0gc3RhbmRzLnJlZHVjZSgoYSwgcykgPT4gYSArIHMudGVzdHMubGVuZ3RoLCAwKTtcclxuICBjb25zdCB0b3RhbEhvdXJzID0gc3RhbmRzLnJlZHVjZSgoYSwgcykgPT4gYSArIHMudGVzdHMucmVkdWNlKChiLCB0KSA9PiBiICsgdC5kdXJhdGlvbiwgMCksIDApO1xyXG5cclxuICAvLyBcdTI1MDBcdTI1MDAgVGVtcGxhdGUgYWNjZXNzb3JzIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxyXG4gIGNvbnN0IG1haW5UZXh0ID0gU3RyaW5nKGNhcmRNYWluVGV4dCB8fCAne25hbWV9Jyk7XHJcbiAgY29uc3Qgc3ViVGV4dCA9IFN0cmluZyhjYXJkU3ViVGV4dCB8fCAnJyk7XHJcbiAgY29uc3QgaW5mb1JvdyA9IFN0cmluZyhjYXJkSW5mb1JvdyB8fCAnJyk7XHJcbiAgY29uc3QgdGlwVGVtcGxhdGUgPSBTdHJpbmcodG9vbHRpcFRlbXBsYXRlIHx8ICcnKS5yZXBsYWNlKC9cXFxcbi9nLCAnXFxuJyk7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBGaWx0ZXJlZCAmIHNvcnRlZCBxdWV1ZSBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcclxuICBjb25zdCBTVEFUVVNfU09SVF9PUkRFUjogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHtcclxuICAgICdSdW5uaW5nJzogMCwgJ0RlbGF5ZWQnOiAxLCAnT24gVGltZSc6IDIsICdSZWFkeSc6IDMsICdJbiBQcm9ncmVzcyc6IDQsICdQYXJ0cyBOb3QgQXNzaWduZWQnOiA1LFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNvcnRlZFVuYWxsb2NhdGVkID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBsZXQgbGlzdCA9IFsuLi51bmFsbG9jYXRlZF07XHJcbiAgICBpZiAocXVldWVGaWx0ZXIudHJpbSgpKSB7XHJcbiAgICAgIGNvbnN0IHEgPSBxdWV1ZUZpbHRlci50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICAgICAgLy8gU2VhcmNoIGFjcm9zcyBhbGwgcmVhZGFibGUgc3RyaW5nL251bWJlciBmaWVsZHMgb2YgdGhlIHRlc3RcclxuICAgICAgbGlzdCA9IGxpc3QuZmlsdGVyKHQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaGFibGUgPSBbdC5uYW1lLCB0Lm93bmVyLCB0Lm5vdGVzLCB0LnN0YXR1cywgdC5wYXJ0X3N0YXR1cywgdC5hc3NpZ25lZF9wYXJ0cyxcclxuICAgICAgICAgIHQucHJpb3JpdHkgIT0gbnVsbCA/IFN0cmluZyh0LnByaW9yaXR5KSA6ICcnLCB0LmR1cmF0aW9uICE9IG51bGwgPyBTdHJpbmcodC5kdXJhdGlvbikgOiAnJ11cclxuICAgICAgICAgIC5qb2luKCcgJykudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gc2VhcmNoYWJsZS5pbmNsdWRlcyhxKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAocXVldWVTb3J0ID09PSAnYXonKSB7XHJcbiAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4gKGEubmFtZSB8fCAnJykubG9jYWxlQ29tcGFyZShiLm5hbWUgfHwgJycpKTtcclxuICAgIH0gZWxzZSBpZiAocXVldWVTb3J0ID09PSAncHJpb3JpdHknKSB7XHJcbiAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4gKGIucHJpb3JpdHkgPz8gNTApIC0gKGEucHJpb3JpdHkgPz8gNTApKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNvcnQgYnkgZGlzcGxheSBzdGF0dXMgdXNpbmcgYSBmaXhlZCB1cmdlbmN5IG9yZGVyXHJcbiAgICAgIGxpc3Quc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNhID0gU1RBVFVTX1NPUlRfT1JERVJbZ2V0RGlzcGxheVN0YXR1cyhhKV0gPz8gOTk7XHJcbiAgICAgICAgY29uc3Qgc2IgPSBTVEFUVVNfU09SVF9PUkRFUltnZXREaXNwbGF5U3RhdHVzKGIpXSA/PyA5OTtcclxuICAgICAgICByZXR1cm4gc2EgIT09IHNiID8gc2EgLSBzYiA6IChiLnByaW9yaXR5ID8/IDUwKSAtIChhLnByaW9yaXR5ID8/IDUwKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGlzdDtcclxuICB9LCBbdW5hbGxvY2F0ZWQsIHF1ZXVlU29ydCwgcXVldWVGaWx0ZXJdKTtcclxuXHJcbiAgLy8gXHUyNTAwXHUyNTAwIEJhciBoZWlnaHQgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgY29uc3QgQkFSX0hFSUdIVCA9IDcyO1xyXG4gIGNvbnN0IExBTkVfSEVJR0hUID0gODQ7XHJcblxyXG4gIC8vIFx1MjUwMFx1MjUwMCBSZW5kZXIgXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHUyNTAwXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgZGlzcGxheTogJ2ZsZXgnLCBoZWlnaHQ6ICcxMDAlJywgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLFxyXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHksIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgfX0+XHJcbiAgICAgIDxzdHlsZT57YEBrZXlmcmFtZXMgY2NsLXNwaW4geyB0byB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH0gfWB9PC9zdHlsZT5cclxuICAgICAge2lzTG9ja2VkICYmIChcclxuICAgICAgICA8U2F2ZU92ZXJsYXlcclxuICAgICAgICAgIGlzRXJyb3I9e3NhdmVFcnJvcn1cclxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cclxuICAgICAgICAgIG9uUmV0cnk9e2hhbmRsZVJldHJ5fVxyXG4gICAgICAgICAgb25EaXNjYXJkPXtoYW5kbGVEaXNjYXJkfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICl9XHJcbiAgICAgIHsvKiBcdTI1NTBcdTI1NTBcdTI1NTAgUXVldWUgU2lkZWJhciBcdTI1NTBcdTI1NTBcdTI1NTAgKi99XHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDMyMCwgbWluV2lkdGg6IDMyMCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLCBib3JkZXJSaWdodDogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nIH19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzEycHggMTZweCcsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLCBiYWNrZ3JvdW5kOiB0aGVtZS5zdXJmYWNlIH19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBtYXJnaW5Cb3R0b206IDQgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4IH19PlxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDgsIGhlaWdodDogOCwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogdW5hbGxvY2F0ZWQubGVuZ3RoID4gMCA/ICcjRjU5RTBCJyA6ICcjMTBCOTgxJyB9fSAvPlxyXG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBmb250U2l6ZTogMTMsIGZvbnRXZWlnaHQ6IDcwMCwgbGV0dGVyU3BhY2luZzogJzAuMDhlbScsIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLCBjb2xvcjogdGhlbWUudGV4dFRlcnRpYXJ5IH19PlF1ZXVlPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogMiwgYmFja2dyb3VuZDogdGhlbWUuYmdTdWJ0bGUsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLCBwYWRkaW5nOiAyLCBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCB9fT5cclxuICAgICAgICAgICAgICB7KFtbJ2F6JywgJ0FcdTIxOTJaJ10sIFsncHJpb3JpdHknLCAnUHJpb3JpdHknXSwgWydzdGF0dXMnLCAnU3RhdHVzJ11dIGFzIGNvbnN0KS5tYXAoKFt2YWwsIGxhYmVsXSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3ZhbH1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UXVldWVTb3J0KHZhbCl9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHBhZGRpbmc6ICczcHggOHB4JywgZm9udFNpemU6IDksIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNTbSxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogcXVldWVTb3J0ID09PSB2YWwgPyB0aGVtZS5hY2NlbnQgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBxdWV1ZVNvcnQgPT09IHZhbCA/IHRoZW1lLmFjY2VudEZnIDogdGhlbWUudGV4dE11dGVkLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPntsYWJlbH08L2J1dHRvbj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIG1hcmdpblRvcDogNiB9fT5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXtxdWV1ZUZpbHRlcn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFF1ZXVlRmlsdGVyKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkZpbHRlciB0ZXN0cy4uLlwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCB3aWR0aDogJzEwMCUnLCBib3hTaXppbmc6ICdib3JkZXItYm94JywgcGFkZGluZzogJzVweCAyOHB4IDVweCA4cHgnLCBmb250U2l6ZTogMTEsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0UHJpbWFyeSwgb3V0bGluZTogJ25vbmUnLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgb25Gb2N1cz17KGUpID0+IHsgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJvcmRlckNvbG9yID0gdGhlbWUuYWNjZW50OyBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYmFja2dyb3VuZCA9IHRoZW1lLnN1cmZhY2U7IH19XHJcbiAgICAgICAgICAgICAgb25CbHVyPXsoZSkgPT4geyBlLmN1cnJlbnRUYXJnZXQuc3R5bGUuYm9yZGVyQ29sb3IgPSB0aGVtZS5ib3JkZXI7IGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gdGhlbWUuY2FudmFzOyB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICB7cXVldWVGaWx0ZXIgJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFF1ZXVlRmlsdGVyKCcnKX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCByaWdodDogNiwgdG9wOiAnNTAlJywgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJywgYm9yZGVyOiAnbm9uZScsIGN1cnNvcjogJ3BvaW50ZXInLCBjb2xvcjogdGhlbWUudGV4dERpc2FibGVkLFxyXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTQsIGxpbmVIZWlnaHQ6IDEsIHBhZGRpbmc6IDAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID4mdGltZXM7PC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgc3R5bGU9e3sgZmxleDogMSwgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6ICc4cHggMTBweCcgfX1cclxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQpIHNldFF1ZXVlSW5zZXJ0SW5kZXgodW5hbGxvY2F0ZWQubGVuZ3RoKTsgfX1cclxuICAgICAgICAgIG9uRHJhZ0xlYXZlPXsoZSkgPT4geyBpZiAoZS5jdXJyZW50VGFyZ2V0ID09PSBlLnRhcmdldCkgc2V0UXVldWVJbnNlcnRJbmRleChudWxsKTsgfX1cclxuICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBkcm9wT25RdWV1ZShxdWV1ZUluc2VydEluZGV4ID8/IHVuYWxsb2NhdGVkLmxlbmd0aCk7IH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3NvcnRlZFVuYWxsb2NhdGVkLm1hcCgodGVzdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IGdldERpc3BsYXlTdGF0dXModGVzdCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNob3dTdWIgPSAhaXNUZW1wbGF0ZUVtcHR5KHN1YlRleHQsIHRlc3QpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZE1haW4gPSByZXNvbHZlVGVtcGxhdGUobWFpblRleHQsIHRlc3QpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZFN1YiA9IHJlc29sdmVUZW1wbGF0ZShzdWJUZXh0LCB0ZXN0KTtcclxuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRJbmZvID0gcmVzb2x2ZVRlbXBsYXRlKGluZm9Sb3csIHRlc3QpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17dGVzdC5pZH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgc2V0UXVldWVJbnNlcnRJbmRleChpZHgpOyB9fVxyXG4gICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZHJvcE9uUXVldWUoaWR4KTsgfX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHF1ZXVlSW5zZXJ0SW5kZXggPT09IGlkeCAmJiBkcmFnZ2VkVGVzdElkICYmIGRyYWdnZWRUZXN0SWQgIT09IHRlc3QuaWQgPyA2IDogMCxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC4xMnMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPFF1ZXVlQ2FyZFxyXG4gICAgICAgICAgICAgICAgICB0ZXN0PXt0ZXN0fVxyXG4gICAgICAgICAgICAgICAgICBkcmFnZ2VkVGVzdElkPXtkcmFnZ2VkVGVzdElkfVxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICAgICAgICAgICAgbWFpblRleHQ9e3Jlc29sdmVkTWFpbn1cclxuICAgICAgICAgICAgICAgICAgc3ViVGV4dD17cmVzb2x2ZWRTdWJ9XHJcbiAgICAgICAgICAgICAgICAgIGluZm9Sb3c9e3Jlc29sdmVkSW5mb31cclxuICAgICAgICAgICAgICAgICAgc2hvd1N1Yj17c2hvd1N1Yn1cclxuICAgICAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxyXG4gICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydD17KCkgPT4gc2V0RHJhZ2dlZFRlc3RJZCh0ZXN0LmlkKX1cclxuICAgICAgICAgICAgICAgICAgb25EcmFnRW5kPXtjbGVhckRyYWd9XHJcbiAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgY29uc3QgcmVjdCA9IGUuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgc2V0UXVldWVJbnNlcnRJbmRleChlLmNsaWVudFkgPCByZWN0LnRvcCArIHJlY3QuaGVpZ2h0IC8gMiA/IGlkeCA6IGlkeCArIDEpOyB9fVxyXG4gICAgICAgICAgICAgICAgICBvbk1lbnVPcGVuPXsocmVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkcmFnZ2VkVGVzdElkIHx8IGlzTG9ja2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UHJpb3JpdHlJbnB1dFZhbHVlKFN0cmluZyh0ZXN0LnByaW9yaXR5ID8/IDUwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UG9wb3Zlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICBhbmNob3JSZWN0OiByZWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGVzdCxcclxuICAgICAgICAgICAgICAgICAgICAgIG1vZGU6ICdyb290JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlTdGF0dXM6IHN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBMaW5lczogcmVzb2x2ZVRlbXBsYXRlKHRpcFRlbXBsYXRlLCB0ZXN0KSxcclxuICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBzZXRRdWV1ZUluc2VydEluZGV4KHVuYWxsb2NhdGVkLmxlbmd0aCk7IH19XHJcbiAgICAgICAgICAgIG9uRHJvcD17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBkcm9wT25RdWV1ZSh1bmFsbG9jYXRlZC5sZW5ndGgpOyB9fVxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGhlaWdodDogKHF1ZXVlSW5zZXJ0SW5kZXggPT09IHVuYWxsb2NhdGVkLmxlbmd0aCAmJiBkcmFnZ2VkVGVzdElkKSA/IDYgOiAwLFxyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmFjY2VudCxcclxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IDMsXHJcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2hlaWdodCAwLjEycyBlYXNlJyxcclxuICAgICAgICAgICAgICBtYXJnaW46ICcwIDRweCcsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAge3VuYWxsb2NhdGVkLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLCBwYWRkaW5nOiAnMzJweCAxNnB4JywgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgIGJvcmRlcjogZHJhZ2dlZFRlc3RJZCA/IGAycHggZGFzaGVkICR7dGhlbWUuYWNjZW50fWAgOiBgMnB4IGRhc2hlZCAke3RoZW1lLmJvcmRlclN0cm9uZ31gLFxyXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzTGcsIG1hcmdpblRvcDogOCxcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBkcmFnZ2VkVGVzdElkID8gdGhlbWUuYWNjZW50U3VidGxlIDogJ3RyYW5zcGFyZW50JyxcclxuICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubyxcclxuICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAge2RyYWdnZWRUZXN0SWQgPyAnRHJvcCB0byByZXR1cm4gdG8gcXVldWUnIDogJ0FsbCB0ZXN0cyBhbGxvY2F0ZWQnfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxPdXRsaW5lS2V5IHRoZW1lPXt0aGVtZX0gLz5cclxuXHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCAxNnB4JywgYm9yZGVyVG9wOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsIGJhY2tncm91bmQ6IHRoZW1lLmNhbnZhcyB9fT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGRpc3BsYXk6ICdmbGV4JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZm9udFNpemU6IDEwLCBjb2xvcjogdGhlbWUudGV4dE11dGVkIH19PlxyXG4gICAgICAgICAgICA8c3Bhbj57dG90YWxBbGxvY2F0ZWR9L3t0b3RhbEFsbG9jYXRlZCArIHVuYWxsb2NhdGVkLmxlbmd0aH0gYWxsb2NhdGVkPC9zcGFuPjxzcGFuPnt0b3RhbEhvdXJzfWg8L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7LyogXHUyNTUwXHUyNTUwXHUyNTUwIE1haW4gVGltZWxpbmUgXHUyNTUwXHUyNTUwXHUyNTUwICovfVxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICB7LyogSGVhZGVyIGJhciAqL31cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4IDI0cHgnLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCwgYmFja2dyb3VuZDogdGhlbWUuc3VyZmFjZSwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgZ2FwOiAxNiwgZmxleFdyYXA6ICd3cmFwJyB9fT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWluV2lkdGg6IDAgfX0+XHJcbiAgICAgICAgICAgIDxoMSBzdHlsZT17eyBmb250U2l6ZTogMTgsIGZvbnRXZWlnaHQ6IDcwMCwgY29sb3I6IHRoZW1lLnRleHRQcmltYXJ5LCBsZXR0ZXJTcGFjaW5nOiAnLTAuMDJlbScsIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRGYW1pbHkgfX0+VGVzdCBTdGFuZCBTY2hlZHVsZXI8L2gxPlxyXG4gICAgICAgICAgICA8cCBzdHlsZT17eyBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubywgZm9udFNpemU6IDExLCBjb2xvcjogdGhlbWUudGV4dE11dGVkLCBtYXJnaW5Ub3A6IDIgfX0+XHJcbiAgICAgICAgICAgICAgQ29udGludW91cyB0ZXN0aW5nIFx1MDBCNyB7Y2hIb3Vyc31oIGNoYW5nZW92ZXIgKGRlZmF1bHQpIFx1MDBCNyB7d1N0YXJ0fTowMFx1MjAxM3t3RW5kfTowMCBNb25cdTIwMTNGcmlcclxuICAgICAgICAgICAgICB7KHNhdmVNb2RlIGFzIHN0cmluZykgPT09ICdsaXZlJyAmJiA8c3Bhbj4gXHUwMEI3IExpdmUgc3luYzwvc3Bhbj59XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMiB9fT5cclxuICAgICAgICAgICAgey8qIFNhdmUvRGlzY2FyZCBidXR0b25zIChiYXRjaCBtb2RlKSAqL31cclxuICAgICAgICAgICAgeyhzYXZlTW9kZSBhcyBzdHJpbmcpID09PSAnYmF0Y2gnICYmIChcclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2IH19PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEaXNjYXJkfVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRGlydHkgfHwgaXNMb2NrZWR9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMCwgcGFkZGluZzogJzZweCAwJywgZm9udFNpemU6IDExLCBmb250V2VpZ2h0OiA2MDAsIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke2lzRGlydHkgJiYgIWlzTG9ja2VkID8gdGhlbWUuYWNjZW50IDogdGhlbWUuYm9yZGVyfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyB0aGVtZS5hY2NlbnQgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gdGhlbWUuYWNjZW50RmcgOiB0aGVtZS50ZXh0RGlzYWJsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAoaXNEaXJ0eSAmJiAhaXNMb2NrZWQpID8gYDAgMXB4IDNweCAke3RoZW1lLmFjY2VudH00RGAgOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIERpc2NhcmQgQ2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNhdmV9XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNEaXJ0eSB8fCBpc0xvY2tlZH1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiB0aGVtZS5mb250TW9ubyxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLCBwYWRkaW5nOiAnNnB4IDAnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7aXNEaXJ0eSAmJiAhaXNMb2NrZWQgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS5ib3JkZXJ9YCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyAncG9pbnRlcicgOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogKGlzRGlydHkgJiYgIWlzTG9ja2VkKSA/IHRoZW1lLmFjY2VudCA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyB0aGVtZS5hY2NlbnRGZyA6IHRoZW1lLnRleHREaXNhYmxlZCxcclxuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IChpc0RpcnR5ICYmICFpc0xvY2tlZCkgPyBgMCAxcHggM3B4ICR7dGhlbWUuYWNjZW50fTREYCA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgU2F2ZSBDaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIHsvKiBTYXZlIFBsYW5uZWQgRGF0ZXMgYnV0dG9uICovfVxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2F2ZVBsYW5uZWREYXRlc31cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNEYXRlc1NhdmluZyB8fCBzY2hlZHVsZWRQbGFubmVkRGF0ZXMubGVuZ3RoID09PSAwfVxyXG4gICAgICAgICAgICAgIHRpdGxlPXtzY2hlZHVsZWRQbGFubmVkRGF0ZXMubGVuZ3RoID09PSAwID8gJ05vIHRlc3RzIHNjaGVkdWxlZCcgOiBgU2F2ZSBwbGFubmVkIHN0YXJ0IGRhdGVzIGZvciAke3NjaGVkdWxlZFBsYW5uZWREYXRlcy5sZW5ndGh9IHNjaGVkdWxlZCB0ZXN0JHtzY2hlZHVsZWRQbGFubmVkRGF0ZXMubGVuZ3RoICE9PSAxID8gJ3MnIDogJyd9YH1cclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTMwLCBwYWRkaW5nOiAnNnB4IDAnLCBmb250U2l6ZTogMTEsIGZvbnRXZWlnaHQ6IDYwMCwgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IHNhdmVEYXRlc0Vycm9yID8gYDFweCBzb2xpZCAjRkVDQUNBYCA6ICcxcHggc29saWQgdHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAoIWlzRGF0ZXNTYXZpbmcgJiYgc2NoZWR1bGVkUGxhbm5lZERhdGVzLmxlbmd0aCA+IDApID8gJ3BvaW50ZXInIDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogc2F2ZURhdGVzRXJyb3IgPyAodGhlbWUuaXNEYXJrID8gJyMzQjAwMDAnIDogJyNGRUYyRjInKSA6IHRoZW1lLmFjY2VudCxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBzYXZlRGF0ZXNFcnJvciA/ICcjRUY0NDQ0JyA6IHRoZW1lLmFjY2VudEZnLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogKCFpc0RhdGVzU2F2aW5nICYmIHNjaGVkdWxlZFBsYW5uZWREYXRlcy5sZW5ndGggPiAwKSA/IDEgOiAwLjUsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnYmFja2dyb3VuZCAwLjE1cywgY29sb3IgMC4xNXMsIGJvcmRlci1jb2xvciAwLjE1cycsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtzYXZlRGF0ZXNFcnJvciA/ICdFcnJvciBcdTIwMTQgUmV0cnknIDogKHBlbmRpbmdTYXZlRGF0ZXMgfHwgKGlzU2F2aW5nRGF0ZXMgYXMgYm9vbGVhbikpID8gJ1NhdmluZ1x1MjAyNicgOiAnU2F2ZSBQbGFubmVkIERhdGVzJ31cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICB7LyogVmlld3BvcnQgc2VsZWN0b3IgKi99XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDQsIGJhY2tncm91bmQ6IHRoZW1lLmJnU3VidGxlLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1c0xnLCBwYWRkaW5nOiAzLCBib3JkZXI6IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCB9fT5cclxuICAgICAgICAgICAgICB7WzIsIDQsIDgsIDEyLCAyNF0ubWFwKCh3KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIGtleT17d31cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB1c2VyQ2hhbmdlZFZpZXdwb3J0LmN1cnJlbnQgPSB0cnVlOyBzZXRWaWV3cG9ydFdlZWtzKHcpOyB9fVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc2cHggMTJweCcsIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNjAwLCBib3JkZXJSYWRpdXM6IHRoZW1lLnJhZGl1cyxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJywgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdmlld3BvcnRXZWVrcyA9PT0gdyA/IHRoZW1lLmFjY2VudCA6ICd0cmFuc3BhcmVudCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHZpZXdwb3J0V2Vla3MgPT09IHcgPyB0aGVtZS5hY2NlbnRGZyA6IHRoZW1lLnRleHRUZXJ0aWFyeSxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge3d9V1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHsvKiBUaW1lbGluZSBzY3JvbGwgYXJlYSAqL31cclxuICAgICAgICA8ZGl2IHJlZj17c2Nyb2xsUmVmfSBzdHlsZT17eyBmbGV4OiAxLCBvdmVyZmxvdzogJ2F1dG8nLCBiYWNrZ3JvdW5kOiB0aGVtZS5jYW52YXMgfX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1pbldpZHRoOiB0b3RhbFdpZHRoLCBwYWRkaW5nOiAnMCAxMnB4IDI0cHgnLCBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuICAgICAgICAgICAgey8qIFRpbWVsaW5lIGhlYWRlciAqL31cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3N0aWNreScsIHRvcDogMCwgekluZGV4OiAyMCwgYmFja2dyb3VuZDogdGhlbWUuY2FudmFzLCBib3JkZXJCb3R0b206IGAxcHggc29saWQgJHt0aGVtZS5ib3JkZXJ9YCB9fT5cclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgaGVpZ2h0OiAyOCwgcG9zaXRpb246ICdyZWxhdGl2ZScsIGJvcmRlckJvdHRvbTogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gIH19PlxyXG4gICAgICAgICAgICAgICAge3dlZWtzLm1hcCgod2ssIGkpID0+IChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIHdrKSAqIHB4UGVySG91cixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNyAqIDI0ICogcHhQZXJIb3VyLCBoZWlnaHQ6IDI4LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIHBhZGRpbmdMZWZ0OiA4LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMCwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dFRlcnRpYXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6IGkgPiAwID8gYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0V2Vlayh3ayl9XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGhlaWdodDogMjQgfX0+XHJcbiAgICAgICAgICAgICAgICB7ZGF5cy5tYXAoKGQsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNUb2RheSA9IGQudG9EYXRlU3RyaW5nKCkgPT09IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzV2Vla2VuZCA9IGQuZ2V0RGF5KCkgPT09IDAgfHwgZC5nZXREYXkoKSA9PT0gNjtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCB3aWR0aDogZGF5V2lkdGgsIG1pbldpZHRoOiBkYXlXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiA5LCB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGlzVG9kYXkgPyB0aGVtZS5hY2NlbnQgOiB0aGVtZS50ZXh0TXV0ZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiBpc1RvZGF5ID8gNzAwIDogNDAwLCBsaW5lSGVpZ2h0OiAnMjRweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBpc1RvZGF5ID8gdGhlbWUuYWNjZW50U3VidGxlIDogKGlzV2Vla2VuZCA/IHRoZW1lLmJnU3VidGxlIDogJ3RyYW5zcGFyZW50JyksXHJcbiAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7dmlld3BvcnRXZWVrcyA8PSA4ID8gZC5nZXREYXRlKCkgOiAoZC5nZXREYXkoKSA9PT0gMSA/IGQuZ2V0RGF0ZSgpIDogJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgey8qIFx1MjU1MFx1MjU1MFx1MjU1MCBUZXN0IFN0YW5kIExhbmVzIFx1MjU1MFx1MjU1MFx1MjU1MCAqL31cclxuICAgICAgICAgICAge3N0YW5kcy5tYXAoKHN0YW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2NoZWR1bGUgPSBzdGFuZFNjaGVkdWxlcy5nZXQoc3RhbmQuaWQpID8/IFtdO1xyXG4gICAgICAgICAgICAgIGNvbnN0IGluZCA9IGluc2VydEluZGljYXRvcjtcclxuICAgICAgICAgICAgICBjb25zdCBzaG93SGVyZSA9IGluZCAmJiBpbmQuc3RhbmRJZCA9PT0gc3RhbmQuaWQ7XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17c3RhbmQuaWR9IHN0eWxlPXt7IG1hcmdpblRvcDogMTYgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4LCBtYXJnaW5Cb3R0b206IDYsIHBhZGRpbmdMZWZ0OiAyIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDYsIGhlaWdodDogNiwgYm9yZGVyUmFkaXVzOiAyLCBiYWNrZ3JvdW5kOiBzdGFuZC50ZXN0cy5sZW5ndGggPiAwID8gdGhlbWUuYWNjZW50IDogdGhlbWUudGV4dERpc2FibGVkIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMSwgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dFNlY29uZGFyeSB9fT57c3RhbmQubmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIGZvbnRTaXplOiAxMCwgY29sb3I6IHRoZW1lLnRleHRNdXRlZCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIHtzdGFuZC50ZXN0cy5sZW5ndGh9IHRlc3R7c3RhbmQudGVzdHMubGVuZ3RoICE9PSAxID8gJ3MnIDogJyd9e3N0YW5kLnRlc3RzLmxlbmd0aCA+IDAgJiYgYCBcXHUwMGI3ICR7c3RhbmQudGVzdHMucmVkdWNlKChhLCB0KSA9PiBhICsgdC5kdXJhdGlvbiwgMCl9aGB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICBvbkRyYWdPdmVyPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IHNldEluc2VydEluZGljYXRvcih7IHN0YW5kSWQ6IHN0YW5kLmlkLCBpbmRleDogc3RhbmQudGVzdHMubGVuZ3RoIH0pOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRHJhZ0xlYXZlPXsoZSkgPT4geyBpZiAoIWUuY3VycmVudFRhcmdldC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQgYXMgTm9kZSkpIHNldEluc2VydEluZGljYXRvcihudWxsKTsgfX1cclxuICAgICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAvLyBSdW5uaW5nIHRlc3RzIGFsd2F5cyBhcHBlbmQgdG8gZW5kIChwb3NpdGlvbiBpcyBnb3Zlcm5lZCBieSB0ZXN0X3N0YXJ0ZWRfZGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChkcmFnZ2VkSXNSdW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BPblN0YW5kKHN0YW5kLmlkLCBzdGFuZC50ZXN0cy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIGluZD8uc3RhbmRJZCA9PT0gc3RhbmQuaWQgPyBpbmQuaW5kZXggOiBzdGFuZC50ZXN0cy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBMQU5FX0hFSUdIVCxcclxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHNob3dIZXJlIHx8IChkcmFnZ2VkVGVzdElkICYmIHN0YW5kLnRlc3RzLmxlbmd0aCA9PT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYWN0aXZlKSByZXR1cm4gdGhlbWUuc3VyZmFjZVNlY29uZGFyeTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyYWdnZWRJc1J1bm5pbmcgPyB0aGVtZS5ydW5uaW5nQmcgOiB0aGVtZS5hY2NlbnRTdWJ0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gc2hvd0hlcmUgfHwgKGRyYWdnZWRUZXN0SWQgJiYgc3RhbmQudGVzdHMubGVuZ3RoID09PSAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3RpdmUpIHJldHVybiB0aGVtZS5ib3JkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkcmFnZ2VkSXNSdW5uaW5nID8gdGhlbWUucnVubmluZ0JvcmRlciA6IHRoZW1lLmFjY2VudE11dGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSkoKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXNMZyxcclxuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0b3RhbFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2JhY2tncm91bmQgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7LyogV2Vla2VuZCBzaGFkaW5nICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtkYXlzLm1hcCgoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGQuZ2V0RGF5KCkgIT09IDAgJiYgZC5nZXREYXkoKSAhPT0gNikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YHdlLSR7aX1gfSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBpICogZGF5V2lkdGgsIHRvcDogMCwgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBkYXlXaWR0aCwgYmFja2dyb3VuZDogdGhlbWUuYm9yZGVyLCBvcGFjaXR5OiAwLjM1LCBwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogRGF5IGdyaWQgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge2RheXMubWFwKChfLCBpKSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IGkgKiBkYXlXaWR0aCwgdG9wOiAwLCBib3R0b206IDAsIHdpZHRoOiAxLCBiYWNrZ3JvdW5kOiB0aGVtZS5ib3JkZXIgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICApKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIE5vdyBsaW5lICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaCA9IGhvdXJzQmV0d2Vlbih2aWV3U3RhcnQsIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGggPCAwIHx8IGggPiB0b3RhbERheXMgKiAyNCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiBoICogcHhQZXJIb3VyLCB0b3A6IDAsIGJvdHRvbTogMCwgd2lkdGg6IDIsIGJhY2tncm91bmQ6ICcjRUY0NDQ0JywgekluZGV4OiA0MCB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IC0zLCBsZWZ0OiAtMywgd2lkdGg6IDgsIGhlaWdodDogOCwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogJyNFRjQ0NDQnIH19IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KSgpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogTm9uLXdvcmtpbmcgYmxvY2tzICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzdGFuZC5ub25Xb3JraW5nQmxvY2tzLm1hcCgoYmxvY2ssIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZnQgPSBob3Vyc0JldHdlZW4odmlld1N0YXJ0LCBibG9jay5zdGFydCkgKiBweFBlckhvdXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IGhvdXJzQmV0d2VlbihibG9jay5zdGFydCwgYmxvY2suZW5kKSAqIHB4UGVySG91cjtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0ICsgd2lkdGggPCAwIHx8IGxlZnQgPiB0b3RhbFdpZHRoKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYW1wZWRMZWZ0ID0gTWF0aC5tYXgoMCwgbGVmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFtcGVkV2lkdGggPSBNYXRoLm1pbih3aWR0aCArIE1hdGgubWluKDAsIGxlZnQpLCB0b3RhbFdpZHRoIC0gY2xhbXBlZExlZnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2Budy0ke2l9YH0gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogY2xhbXBlZExlZnQsIHRvcDogNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogY2xhbXBlZFdpZHRoLCBoZWlnaHQ6IEJBUl9IRUlHSFQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiA2LCBwb2ludGVyRXZlbnRzOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogYHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoNDVkZWcsICR7dGhlbWUuYm9yZGVyfSAwcHgsICR7dGhlbWUuYm9yZGVyfSAxNXB4LCAke3RoZW1lLnN1cmZhY2V9IDE1cHgsICR7dGhlbWUuc3VyZmFjZX0gMzBweClgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogdGhlbWUucmFkaXVzTGcsIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlclN0cm9uZ31gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ3JvdycsIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogNSwgbWluV2lkdGg6IDUsIGJhY2tncm91bmQ6IHRoZW1lLnRleHREaXNhYmxlZCwgZmxleFNocmluazogMCB9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgcGFkZGluZzogJzRweCA4cHgnLCBtaW5XaWR0aDogMCwganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiB0aGVtZS50ZXh0U2Vjb25kYXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsIG1heFdpZHRoOiAnMTAwJScsIGxpbmVIZWlnaHQ6IDEuMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udEZhbWlseSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PntibG9jay5ub3RlcyB8fCAnTWFpbnRlbmFuY2UnfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogVGVzdCBiYXJzICovfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzY2hlZHVsZS5tYXAoKHRlc3QsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNUZXN0UnVubmluZyA9IGlzUnVubmluZ1Rlc3QodGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXJQb3MgPSBpc1Rlc3RSdW5uaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZ2V0UnVubmluZ0JhclBvcyh0ZXN0LnN0YXJ0LCB0ZXN0LmVuZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBnZXRCYXJQb3ModGVzdC5zdGFydCwgdGVzdC5kdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBSdW5uaW5nIHRlc3RzIHRoYXQgZW5kZWQgYmVmb3JlIHRoZSB0aW1lbGluZSBzdGFydHNcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICghYmFyUG9zKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxlZnQsIHdpZHRoIH0gPSBiYXJQb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjRW5kID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZCh0ZXN0LmVuZCwgc3RhbmQuY2hhbmdlb3Zlcl9ob3Vycywgd1N0YXJ0LCB3RW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZW92ZXJXaWR0aCA9IGhvdXJzQmV0d2Vlbih0ZXN0LmVuZCwgY0VuZCkgKiBweFBlckhvdXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5U3RhdHVzID0gZ2V0RGlzcGxheVN0YXR1cyh0ZXN0LCB0ZXN0LnN0YXJ0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZE1haW4gPSByZXNvbHZlVGVtcGxhdGUobWFpblRleHQsIHRlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRJbmZvID0gcmVzb2x2ZVRlbXBsYXRlKGluZm9Sb3csIHRlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hvd0luZm9PbkJhciA9IHJlc29sdmVkSW5mby50cmltKCkgIT09ICcnICYmIHdpZHRoID4gMTIwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXt0ZXN0LmlkfSBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdCwgdG9wOiAwLCB3aWR0aDogd2lkdGggKyBjaGFuZ2VvdmVyV2lkdGgsIGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBEcm9wIHpvbmVzIFx1MjAxNCBzdXBwcmVzc2VkIHdoZW4gZHJhZ2dpbmcgYSBSdW5uaW5nIHRlc3QgKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge2RyYWdnZWRUZXN0SWQgJiYgZHJhZ2dlZFRlc3RJZCAhPT0gdGVzdC5pZCAmJiAhZHJhZ2dlZElzUnVubmluZyAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBzZXRJbnNlcnRJbmRpY2F0b3IoeyBzdGFuZElkOiBzdGFuZC5pZCwgaW5kZXg6IGlkeCB9KTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZHJvcE9uU3RhbmQoc3RhbmQuaWQsIGlkeCk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IC02LCB0b3A6IDAsIHdpZHRoOiAnNTAlJywgaGVpZ2h0OiAnMTAwJScsIHpJbmRleDogMjAsIG1pbldpZHRoOiAyMCB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EcmFnT3Zlcj17KGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyBzZXRJbnNlcnRJbmRpY2F0b3IoeyBzdGFuZElkOiBzdGFuZC5pZCwgaW5kZXg6IGlkeCArIDEgfSk7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Ecm9wPXsoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGRyb3BPblN0YW5kKHN0YW5kLmlkLCBpZHggKyAxKTsgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgcmlnaHQ6IC02LCB0b3A6IDAsIHdpZHRoOiAnNTAlJywgaGVpZ2h0OiAnMTAwJScsIHpJbmRleDogMjAsIG1pbldpZHRoOiAyMCB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIEluc2VydCBpbmRpY2F0b3IgYmVmb3JlIHRoaXMgdGVzdCBcdTIwMTQgc3VwcHJlc3NlZCBmb3IgUnVubmluZyBkcmFncyAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd0hlcmUgJiYgIWRyYWdnZWRJc1J1bm5pbmcgJiYgaW5kIS5pbmRleCA9PT0gaWR4ICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IC00LCB0b3A6IDAsIGJvdHRvbTogMCB9fT48SW5zZXJ0TGluZSB0aGVtZT17dGhlbWV9IC8+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFRlc3QgYmFyICovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGxlZnQ6IDAsIHRvcDogMCwgd2lkdGgsIGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRlc3RCYXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdD17dGVzdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNUZXN0UnVubmluZz17aXNUZXN0UnVubmluZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ2dlZFRlc3RJZD17ZHJhZ2dlZFRlc3RJZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCQVJfSEVJR0hUPXtCQVJfSEVJR0hUfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5U3RhdHVzPXtkaXNwbGF5U3RhdHVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZE1haW49e3Jlc29sdmVkTWFpbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRJbmZvPXtyZXNvbHZlZEluZm99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dJbmZvT25CYXI9e3Nob3dJbmZvT25CYXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EcmFnU3RhcnQ9eyhlKSA9PiB7IGUuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7IGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCBTdHJpbmcodGVzdC5pZCkpOyBzZXREcmFnZ2VkVGVzdElkKHRlc3QuaWQpOyB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWdFbmQ9e2NsZWFyRHJhZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25NZW51T3Blbj17KHJlY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhZ2dlZFRlc3RJZCB8fCBpc0xvY2tlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFByaW9yaXR5SW5wdXRWYWx1ZShTdHJpbmcodGVzdC5wcmlvcml0eSA/PyA1MCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFBvcG92ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yUmVjdDogcmVjdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiAncm9vdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5U3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcExpbmVzOiByZXNvbHZlVGVtcGxhdGUodGlwVGVtcGxhdGUsIHRlc3QpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkOiBpc1Rlc3RSdW5uaW5nID8gbnVsbCA6IHsgc3RhcnQ6IHRlc3Quc3RhcnQsIGVuZDogdGVzdC5lbmQgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDaGFuZ2VvdmVyIGluZGljYXRvciAqL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aWR4IDwgc2NoZWR1bGUubGVuZ3RoICYmIGNoYW5nZW92ZXJXaWR0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogd2lkdGgsIHRvcDogTEFORV9IRUlHSFQgLyAyIC0gOCwgd2lkdGg6IGNoYW5nZW92ZXJXaWR0aCwgaGVpZ2h0OiAxNiwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogMSwgd2lkdGg6ICc4MCUnLCBiYWNrZ3JvdW5kOiBgcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCg5MGRlZywgJHt0aGVtZS50ZXh0RGlzYWJsZWR9IDAsICR7dGhlbWUudGV4dERpc2FibGVkfSA0cHgsIHRyYW5zcGFyZW50IDRweCwgdHJhbnNwYXJlbnQgOHB4KWAgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIEluc2VydCBpbmRpY2F0b3IgYXQgZW5kIFx1MjAxNCBzdXBwcmVzc2VkIHdoZW4gZHJhZ2dpbmcgYSBSdW5uaW5nIHRlc3QgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3Nob3dIZXJlICYmICFkcmFnZ2VkSXNSdW5uaW5nICYmIGluZCEuaW5kZXggPT09IHN0YW5kLnRlc3RzLmxlbmd0aCAmJiBzY2hlZHVsZS5sZW5ndGggPiAwICYmICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0ID0gc2NoZWR1bGVbc2NoZWR1bGUubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxlZnQsIHdpZHRoIH0gPSBnZXRCYXJQb3MobGFzdC5zdGFydCwgbGFzdC5kdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjRW5kID0gY2FsY3VsYXRlQ2hhbmdlb3ZlckVuZChsYXN0LmVuZCwgc3RhbmQuY2hhbmdlb3Zlcl9ob3Vycywgd1N0YXJ0LCB3RW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZW92ZXJXaWR0aCA9IGhvdXJzQmV0d2VlbihsYXN0LmVuZCwgY0VuZCkgKiBweFBlckhvdXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogbGVmdCArIHdpZHRoICsgY2hhbmdlb3ZlcldpZHRoICsgOCwgdG9wOiAwLCBib3R0b206IDAgfX0+PEluc2VydExpbmUgdGhlbWU9e3RoZW1lfSAvPjwvZGl2PjtcclxuICAgICAgICAgICAgICAgICAgICB9KSgpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7LyogRW1wdHkgc3RhdGUgKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3N0YW5kLnRlc3RzLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHRoZW1lLmZvbnRNb25vLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgaW5zZXQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDExLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogZHJhZ2dlZFRlc3RJZCA/IHRoZW1lLmFjY2VudCA6IHRoZW1lLnRleHREaXNhYmxlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogZHJhZ2dlZFRlc3RJZCA/IDYwMCA6IDQwMCxcclxuICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZHJhZ2dlZFRlc3RJZCA/ICdEcm9wIGhlcmUgdG8gc2NoZWR1bGUnIDogJ0Ryb3AgdGVzdHMgaGVyZSB0byBzY2hlZHVsZSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgey8qIE5vIHN0YW5kcyBtZXNzYWdlICovfVxyXG4gICAgICAgICAgICB7c3RhbmRzLmxlbmd0aCA9PT0gMCAmJiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogdGhlbWUuZm9udE1vbm8sIHRleHRBbGlnbjogJ2NlbnRlcicsIHBhZGRpbmc6ICc0OHB4IDI0cHgnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHRNdXRlZCwgZm9udFNpemU6IDEyLFxyXG4gICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgTm8gdGVzdCBzdGFuZHMgbG9hZGVkLiBCaW5kIHRoZSB0ZXN0U3RhbmRzIHByb3BlcnR5IHRvIHlvdXIgZ2V0VGVzdFN0YW5kcyBxdWVyeS5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtwb3BvdmVyICYmIChcclxuICAgICAgICA8QWN0aW9uUG9wb3ZlclxyXG4gICAgICAgICAgcG9wb3Zlcj17cG9wb3Zlcn1cclxuICAgICAgICAgIHN0YXR1c09wdGlvbnNMaXN0PXtzdGF0dXNPcHRpb25zTGlzdH1cclxuICAgICAgICAgIHByaW9yaXR5SW5wdXRWYWx1ZT17cHJpb3JpdHlJbnB1dFZhbHVlfVxyXG4gICAgICAgICAgc3RhcnREYXRlSW5wdXRWYWx1ZT17c3RhcnREYXRlSW5wdXRWYWx1ZX1cclxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cclxuICAgICAgICAgIG9uQ2xvc2U9e2Nsb3NlUG9wb3Zlcn1cclxuICAgICAgICAgIG9uTW9kZUNoYW5nZT17aGFuZGxlUG9wb3Zlck1vZGVDaGFuZ2V9XHJcbiAgICAgICAgICBvblByaW9yaXR5SW5wdXRDaGFuZ2U9e3NldFByaW9yaXR5SW5wdXRWYWx1ZX1cclxuICAgICAgICAgIG9uQ29uZmlybVByaW9yaXR5PXtoYW5kbGVDb25maXJtUHJpb3JpdHl9XHJcbiAgICAgICAgICBvblBpY2tTdGF0dXM9e2hhbmRsZVBpY2tTdGF0dXN9XHJcbiAgICAgICAgICBvbkVkaXRUZXN0PXtoYW5kbGVFZGl0VGVzdH1cclxuICAgICAgICAgIG9uU3RhcnREYXRlSW5wdXRDaGFuZ2U9e3NldFN0YXJ0RGF0ZUlucHV0VmFsdWV9XHJcbiAgICAgICAgICBvbkNvbmZpcm1TdGFydERhdGU9e2hhbmRsZUNvbmZpcm1TdGFydERhdGV9XHJcbiAgICAgICAgICBwYW5lbFJlZj17cG9wb3ZlclJlZn1cclxuICAgICAgICAvPlxyXG4gICAgICApfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuIiwgIlxuICAgICAgICAgIGV4cG9ydCBjb25zdCB7IFJldG9vbCB9ID0gd2luZG93LmNjY19zdXBwb3J0X1JldG9vbEN1c3RvbUNvbXBvbmVuQ29sbGVjdGlvbnM7XG4gICAgICAgICIsICJcbiAgICAgICAgICBleHBvcnQgY29uc3QgeyBGcmFnbWVudCwganN4cywganN4LCBkZWZhdWx0IH0gPSB3aW5kb3cuY2NjX3N1cHBvcnRfUmVhY3RKU1hSdW50aW1lO1xuICAgICAgICAiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ1UsV0FBTyxVQUFVLE9BQU87QUFBQTtBQUFBOzs7QUNEbEMsbUJBQW1FOzs7QUNDbEQsSUFBTSxFQUFFLE9BQU8sSUFBSSxPQUFPOzs7QUNBMUIsSUFBTSxFQUFFLFVBQVUsTUFBTSxLQUFLLFNBQUFBLFNBQVEsSUFBSSxPQUFPOzs7QUY4SGpFLElBQU0sYUFBYSxDQUNqQixLQUNBLGtCQUEwQyxDQUFDLEdBQzNDLHFCQUNnQjtBQUNoQixRQUFNLFNBQVMsS0FBSyxTQUFTO0FBRTdCLFFBQU0sU0FBUyxLQUFLLFdBQVc7QUFDL0IsUUFBTSxTQUFTLEtBQUssV0FBVyxTQUFTLFlBQVk7QUFDcEQsUUFBTSxVQUFVLEtBQUssbUJBQW1CLFNBQVMsWUFBWTtBQUM3RCxRQUFNLG1CQUFtQixLQUFLLHFCQUFxQixTQUFTLFlBQVk7QUFDeEUsUUFBTSxhQUFhLEtBQUssYUFBYSxPQUNqQyxJQUFJLElBQUksWUFBWSxJQUFJLGlFQUN4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QkFDN0M7QUFBQTtBQUFBO0FBQUEsWUFFSjtBQUFBLGVBdE1RLE1BQU0sRUF1TWhCO0FBQUEsUUFFSixDQUFDO0FBQUEsUUFHQSxPQUFPLFdBQVcsS0FDakIsb0JBQUMsU0FBSSxPQUFPO0FBQUEsVUFDVixZQUFZLE1BQU07QUFBQSxVQUFVLFdBQVc7QUFBQSxVQUFVLFNBQVM7QUFBQSxVQUMxRCxPQUFPLE1BQU07QUFBQSxVQUFXLFVBQVU7QUFBQSxRQUNwQyxHQUFHLDhGQUVIO0FBQUEsU0FFSixHQUNGO0FBQUEsT0FDRjtBQUFBLElBRUMsV0FDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxTQUFTO0FBQUEsUUFDVCxjQUFjO0FBQUEsUUFDZCx1QkFBdUI7QUFBQSxRQUN2QixtQkFBbUI7QUFBQSxRQUNuQixjQUFjO0FBQUEsUUFDZCxZQUFZO0FBQUEsUUFDWix3QkFBd0I7QUFBQSxRQUN4QixvQkFBb0I7QUFBQSxRQUNwQixVQUFVO0FBQUE7QUFBQSxJQUNaO0FBQUEsS0FFSjtBQUVKOyIsCiAgIm5hbWVzIjogWyJkZWZhdWx0IiwgIlJlYWN0IiwgIndlZWtzIiwgInQiXQp9Cg==
