import React, { FC, useRef, useMemo, useCallback, useEffect } from "react";
import { Retool } from "@tryretool/custom-component-support";

// ============================================================
// Types
// ============================================================
interface TestData {
  id: number | string;
  name: string;
  duration: number;
  owner: string;
  priority: number;
  notes: string;
  status: string;
  test_stand_id: number | null;
  priority_order: number | null;
  allocation_id: number | null;
  assigned_parts: string | null;
  part_ready_date: string | null;
  part_status: string;
  test_started_date: string | null;
  [key: string]: any; // allow arbitrary fields for template resolution
}

interface StandDef {
  id: number | string;
  name: string;
  changeover_hours?: number | null;
}

interface NonWorkingBlock {
  start: Date;
  end: Date;
  notes?: string;
}

interface InternalStand {
  id: number | string;
  name: string;
  tests: TestData[];
  changeover_hours: number;
  nonWorkingBlocks: NonWorkingBlock[];
}

interface ScheduledTest extends TestData {
  start: Date;
  end: Date;
}

interface InsertIndicator {
  standId: number | string;
  index: number;
}

interface AllocationRecord {
  test_id: number | string;
  test_stand_id: number | string;
  priority_order: number;
}

interface AnchorRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface PopoverState {
  anchorRect: AnchorRect;
  test: TestData;
  mode: 'root' | 'priority' | 'status' | 'start_date' | 'end_date';
  displayStatus: string;
  tooltipLines: string;
  scheduled: { start: Date; end: Date } | null;
}

// ============================================================
// Theme
// ============================================================
interface ThemeTokens {
  isDark: boolean;

  // Backgrounds
  canvas: string;
  surface: string;
  surfaceSecondary: string;
  bgSubtle: string;
  surfaceHover: string;
  accentSubtle: string;

  // Running (purple) tints
  runningBg: string;
  runningBorder: string;
  runningText: string;
  runningTextDark: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textMuted: string;
  textDisabled: string;

  // Borders
  border: string;
  borderStrong: string;

  // Accent (primary action)
  accent: string;
  accentFg: string;
  accentMuted: string;

  // Typography
  fontFamily: string;
  fontMono: string;

  // Radii (numeric px)
  radiusSm: number;
  radius: number;
  radiusLg: number;
  radiusXl: number;

  // Status colours (cap bars & text)
  statusCap: Record<string, string>;
  statusText: Record<string, string>;
}

const buildTheme = (
  raw: any,
  statusOverrides: Record<string, string> = {},
  monoFontOverride?: string
): ThemeTokens => {
  const isDark = raw?.mode === 'dark';

  const accent = raw?.primary || '#3B82F6';
  const canvas = raw?.canvas || (isDark ? '#1C1C2E' : '#F9FAFB');
  const surface = raw?.surfacePrimary || (isDark ? '#252535' : '#FFFFFF');
  const surfaceSecondary = raw?.surfaceSecondary || (isDark ? '#1E1E30' : '#F3F4F6');
  const fontFamily = raw?.defaultFont?.name
    ? `'${raw.defaultFont.name}', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
    : "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif";

  const baseRadius = (() => {
    const r = raw?.borderRadius;
    if (!r) return 6;
    const n = parseInt(String(r), 10);
    return isNaN(n) ? 6 : n;
  })();

  // Text
  const textPrimary  = isDark ? '#F9FAFB' : '#111827';
  const textSecondary = isDark ? '#D1D5DB' : '#374151';
  const textTertiary = isDark ? '#A0AEC0' : '#4B5563';
  const textMuted    = isDark ? '#718096' : '#6B7280';
  const textDisabled = isDark ? '#4B5563' : '#9CA3AF';

  // Borders
  const border       = isDark ? '#374151' : '#E5E7EB';
  const borderStrong = isDark ? '#4B5563' : '#D1D5DB';

  // Backgrounds
  const bgSubtle     = isDark ? '#1A1A2E' : '#F3F4F6';
  const surfaceHover = isDark ? '#2E2E3E' : '#F3F4F6';
  const accentSubtle = isDark ? `${accent}33` : '#EFF6FF';
  const accentMuted  = isDark ? `${accent}80` : '#93C5FD';

  // Running purple
  const runningBg       = isDark ? '#2D1B4E' : '#F3E8FF';
  const runningBorder   = isDark ? '#7E3DAA' : '#C4B5FD';
  const runningText     = '#7E22CE';
  const runningTextDark = '#3B0764';

  // Status cap colours
  const defaultCap: Record<string, string> = {
    'Running':            '#9333EA',
    'Ready':              '#22C55E',
    'On Time':            '#E5A00D',
    'Delayed':            '#EF4444',
    'Parts Not Assigned': '#9CA3AF',
    'In Progress':        '#E5A00D',
  };
  const defaultText: Record<string, string> = {
    'Running':            '#7E22CE',
    'Ready':              '#16A34A',
    'On Time':            '#B45309',
    'Delayed':            '#DC2626',
    'Parts Not Assigned': '#6B7280',
    'In Progress':        '#B45309',
  };

  const statusCap: Record<string, string> = {};
  const statusText: Record<string, string> = {};
  for (const key of Object.keys(defaultCap)) {
    statusCap[key]  = statusOverrides[key] || defaultCap[key];
    // derive text colour: if overridden, darken the cap colour slightly; otherwise use default
    statusText[key] = statusOverrides[key]
      ? statusOverrides[key]
      : defaultText[key];
  }

  return {
    isDark,
    canvas, surface, surfaceSecondary, bgSubtle, surfaceHover, accentSubtle,
    runningBg, runningBorder, runningText, runningTextDark,
    textPrimary, textSecondary, textTertiary, textMuted, textDisabled,
    border, borderStrong,
    accent, accentFg: '#FFFFFF', accentMuted,
    fontFamily,
    fontMono: monoFontOverride ? `'${monoFontOverride}', monospace` : fontFamily,
    radiusSm: Math.max(2, baseRadius - 2),
    radius:   baseRadius,
    radiusLg: baseRadius + 2,
    radiusXl: baseRadius + 4,
    statusCap,
    statusText,
  };
};

// ============================================================
// Template Resolution
// ============================================================
const formatFieldValue = (val: any): string => {
  if (val === null || val === undefined || val === '' || val === 'nan') return '';
  const str = String(val);
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    }
  }
  return str;
};

const resolveTemplate = (template: any, data: Record<string, any>): string => {
  if (!template) return '';
  const str = typeof template === 'string' ? template : String(template);
  return str.replace(/\{(\w+)\}/g, (_, field) => formatFieldValue(data[field]));
};

const isTemplateEmpty = (template: any, data: Record<string, any>): boolean => {
  const str = typeof template === 'string' ? template : String(template || '');
  const resolved = resolveTemplate(str, data);
  const staticOnly = str.replace(/\{(\w+)\}/g, '');
  return resolved.trim() === staticOnly.trim() || resolved.trim() === '';
};

// ============================================================
// Date Utilities
// ============================================================
const MS_PER_HOUR = 3600000;

const parseLocalDate = (dateStr: string | null): Date | null => {
  if (!dateStr) return null;
  const datePart = dateStr.split('T')[0]; // strip time component if present (e.g. ISO timestamps)
  const parts = datePart.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  const d = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
  return isNaN(d.getTime()) ? null : d;
};

const toMidnight = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const formatDateInputValue = (value: string | null | undefined): string => {
  if (!value) return '';
  const datePart = String(value).split('T')[0];
  return /^\d{4}-\d{2}-\d{2}$/.test(datePart) ? datePart : '';
};

const getTodayDateInputValue = (): string => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

const formatMenuDateLabel = (value: string | null | undefined): string => {
  const parsed = parseLocalDate(value ?? null);
  if (!parsed) return '';
  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};

const isWorkDay = (d: Date): boolean => d.getDay() !== 0 && d.getDay() !== 6;

const getNextWorkdayStart = (date: Date, workStart: number): Date => {
  const d = new Date(date);
  d.setHours(workStart, 0, 0, 0);
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  return d;
};

const calculateChangeoverEnd = (
  prevTestEnd: Date,
  changeoverHours: number,
  workStart: number,
  workEnd: number
): Date => {
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

const parseNonWorkingBlocks = (raw: any): NonWorkingBlock[] => {
  if (!Array.isArray(raw)) return [];
  const result: NonWorkingBlock[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue;
    const start = new Date(entry.start);
    const end = new Date(entry.end);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) continue;
    result.push({ start, end, notes: entry.notes ?? undefined });
  }
  return result;
};

const advancePastNonWorking = (date: Date, blocks: NonWorkingBlock[]): Date => {
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

// Push start forward until the full window [start, start+duration) doesn't overlap any block.
const findValidStart = (proposedStart: Date, durationHours: number, blocks: NonWorkingBlock[]): Date => {
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

const generateDays = (start: Date, numDays: number): Date[] => {
  const days: Date[] = [];
  let cur = new Date(start);
  for (let i = 0; i < numDays; i++) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
};

const generateWeeks = (start: Date, numDays: number): Date[] => {
  const result: Date[] = [];
  let cur = new Date(start);
  while (cur.getDay() !== 1) cur.setDate(cur.getDate() - 1);
  const endDate = new Date(start);
  endDate.setDate(endDate.getDate() + numDays);
  while (cur < endDate) {
    result.push(new Date(cur));
    cur.setDate(cur.getDate() + 7);
  }
  return result;
};

const hoursBetween = (a: Date, b: Date): number => (b.getTime() - a.getTime()) / MS_PER_HOUR;
const formatWeek = (d: Date): string => `W/C ${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;

// ============================================================
// Part Status Logic
// ============================================================
const normalizePartStatus = (rawStatus: string): string => {
  if (!rawStatus || rawStatus === 'nan') return 'In Progress';
  const lower = rawStatus.toLowerCase().trim();
  if (lower === 'ready') return 'Ready';
  if (lower === 'parts not assigned') return 'Parts Not Assigned';
  return 'In Progress';
};

const getCalculatedStatus = (test: TestData, testStartDate: Date | null = null): string => {
  const baseStatus = normalizePartStatus(test.part_status);
  if (baseStatus === 'Ready') return 'Ready';
  if (baseStatus === 'Parts Not Assigned') return 'Parts Not Assigned';

  if (testStartDate && test.part_ready_date) {
    const readyDate = parseLocalDate(test.part_ready_date);
    const startDate = toMidnight(testStartDate);
    if (readyDate && startDate) {
      return readyDate.getTime() > startDate.getTime() ? 'Delayed' : 'On Time';
    }
  }
  return 'In Progress';
};

// ============================================================
// Status / Priority helpers (theme-aware)
// ============================================================
const isRunningTest = (test: TestData): boolean => test.status === 'Running';

const getCapColor = (status: string, theme: ThemeTokens): string =>
  theme.statusCap[status] || theme.statusCap['In Progress'] || '#E5A00D';

const getStatusTextColor = (status: string, theme: ThemeTokens): string =>
  theme.statusText[status] || theme.statusText['In Progress'] || '#B45309';

// Returns 'Running' for Running tests (overrides part status for display colours)
const getDisplayStatus = (test: TestData, testStartDate: Date | null = null): string => {
  if (isRunningTest(test)) return 'Running';
  return getCalculatedStatus(test, testStartDate);
};

const getPriorityTextColor = (priority: number | null | undefined): string => {
  const value = typeof priority === 'number' ? priority : 50;
  const clamped = Math.max(0, Math.min(100, value));
  if (clamped <= 30) return '#6B7280';
  if (clamped <= 60) return '#F59E0B';
  if (clamped <= 80) return '#EA580C';
  return '#DC2626';
};

const getPriorityColor = (priority: number | null | undefined): string => {
  const value = typeof priority === 'number' ? priority : 50;
  const clamped = Math.max(0, Math.min(100, value));
  const ratio = clamped / 100;
  const g = Math.round(255 * (1 - ratio));
  const b = Math.round(255 * (1 - ratio));
  return `rgba(255, ${g}, ${b}, 0.6)`;
};

// ============================================================
// Sub-components
// ============================================================
const InsertLine: FC<{ theme: ThemeTokens }> = ({ theme }) => (
  <div style={{
    position: 'absolute', top: 2, bottom: 2, width: 3,
    background: theme.accent, borderRadius: 2, zIndex: 30,
    boxShadow: `0 0 12px ${theme.accent}, 0 0 4px ${theme.accent}`,
    pointerEvents: 'none',
  }}>
    <div style={{ position: 'absolute', top: -4, left: -4, width: 11, height: 11, borderRadius: '50%', background: theme.accent }} />
    <div style={{ position: 'absolute', bottom: -4, left: -4, width: 11, height: 11, borderRadius: '50%', background: theme.accent }} />
  </div>
);

const OutlineKey: FC<{ theme: ThemeTokens }> = ({ theme }) => (
  <div style={{ padding: '10px 16px', borderTop: `1px solid ${theme.border}`, background: theme.canvas }}>
    <h3 style={{ fontFamily: theme.fontMono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.textTertiary, marginBottom: 6 }}>Status Key</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 0' }}>
      {(['Running', 'Ready', 'On Time', 'Delayed', 'Parts Not Assigned'] as const).map((key) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, width: '50%', minWidth: 0 }}>
          <div style={{ width: 4, height: 14, background: theme.statusCap[key], borderRadius: 2, flexShrink: 0 }} />
          <span style={{ fontFamily: theme.fontMono, fontSize: 9, color: theme.statusText[key], fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{key.toUpperCase()}</span>
        </div>
      ))}
    </div>
  </div>
);

interface QueueCardProps {
  test: TestData;
  draggedTestId: string | number | null;
  status: string;
  mainText: string;
  subText: string;
  infoRow: string;
  showSub: boolean;
  theme: ThemeTokens;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onMenuOpen: (rect: AnchorRect) => void;
}

const QueueCard: FC<QueueCardProps> = ({
  test, draggedTestId, status, mainText, subText, infoRow, showSub, theme,
  onDragStart, onDragEnd, onDragOver, onMenuOpen,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const capColor = getCapColor(status, theme);
  return (
    <div
      draggable
      onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; onDragStart(); }}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        marginBottom: 6,
        background: draggedTestId === test.id ? theme.bgSubtle : theme.surface,
        border: hovered ? `2px solid ${capColor}` : `1px solid ${theme.border}`,
        borderRadius: theme.radiusLg,
        cursor: 'grab',
        opacity: draggedTestId === test.id ? 0.35 : 1,
        overflow: 'hidden',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease',
        fontFamily: theme.fontFamily,
      }}
    >
      {/* Status cap bar */}
      <div style={{ width: 5, minWidth: 5, background: capColor, borderRadius: `${theme.radiusLg}px 0 0 ${theme.radiusLg}px`, flexShrink: 0 }} />
      <div style={{ flex: 1, padding: '8px 12px', minWidth: 0 }}>
        {/* Top row: priority left, status right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, paddingRight: 20 }}>
          <span style={{ fontFamily: theme.fontMono, fontSize: 13, fontWeight: 700, color: getPriorityTextColor(test.priority) }}>
            P{test.priority}
          </span>
          <span style={{ fontFamily: theme.fontMono, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: getStatusTextColor(status, theme), textTransform: 'uppercase' as const }}>
            {status.toUpperCase()}
          </span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, marginBottom: 2, lineHeight: 1.3 }}>
          {mainText}
        </div>
        {showSub && (
          <div style={{ fontFamily: theme.fontMono, fontSize: 11, color: theme.textMuted, marginBottom: 4, fontWeight: 400 }}>
            {subText}
          </div>
        )}
        <div style={{ fontFamily: theme.fontMono, display: 'flex', gap: 8, fontSize: 11, color: theme.textTertiary, flexWrap: 'wrap' }}>
          {infoRow.split('\u00b7').map((part, i, arr) => (
            <React.Fragment key={i}>
              <span>{part.trim()}</span>
              {i < arr.length - 1 && <span>{'\u00b7'}</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Three-dot menu pill */}
      <div
        ref={pillRef}
        draggable={false}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          if (pillRef.current) {
            const r = pillRef.current.getBoundingClientRect();
            onMenuOpen({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
          }
        }}
        style={{
          position: 'absolute',
          top: 6,
          right: 6,
          background: hovered ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.04)',
          borderRadius: 10,
          padding: '2px 7px',
          fontSize: 13,
          color: theme.textMuted,
          cursor: 'pointer',
          letterSpacing: '0.1em',
          lineHeight: 1,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.15s, background 0.15s',
          userSelect: 'none',
          fontWeight: 700,
        }}
      >···</div>
    </div>
  );
};

interface TestBarProps {
  test: ScheduledTest;
  isTestRunning: boolean;
  draggedTestId: string | number | null;
  width: number;
  BAR_HEIGHT: number;
  displayStatus: string;
  resolvedMain: string;
  resolvedInfo: string;
  showInfoOnBar: boolean;
  theme: ThemeTokens;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onMenuOpen: (rect: AnchorRect) => void;
}

const TestBar: FC<TestBarProps> = ({
  test, isTestRunning, draggedTestId, width, BAR_HEIGHT,
  displayStatus, resolvedMain, resolvedInfo, showInfoOnBar, theme,
  onDragStart, onDragEnd, onMenuOpen,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const capColor = getCapColor(displayStatus, theme);
  const useVerticalDots = width <= 40;
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseEnter={() => { if (!draggedTestId) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute', left: 0, top: 6,
        width, height: BAR_HEIGHT,
        background: isTestRunning ? theme.runningBg : theme.surface,
        borderRadius: theme.radiusLg, cursor: 'grab',
        display: 'flex', flexDirection: 'row',
        overflow: 'hidden',
        opacity: draggedTestId === test.id ? 0.25 : 1,
        zIndex: hovered ? 25 : 15,
        border: hovered
          ? `2px solid ${capColor}`
          : isTestRunning ? `1px solid ${theme.runningBorder}` : `1px solid ${theme.border}`,
        boxShadow: hovered
          ? '0 4px 12px rgba(0,0,0,0.15)'
          : isTestRunning ? `0 1px 3px ${theme.runningBorder}66` : '0 1px 3px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease',
        fontFamily: theme.fontFamily,
      }}
    >
      {/* Status cap bar */}
      <div style={{ width: 5, minWidth: 5, background: capColor, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4px 8px', minWidth: 0, justifyContent: 'center' }}>
        {/* Top row: priority + status (leave room for pill) */}
        {width > 70 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, paddingRight: width > 90 ? 22 : 0 }}>
            <span style={{ fontFamily: theme.fontMono, fontSize: width > 120 ? 11 : 9, fontWeight: 700, color: isTestRunning ? theme.runningText : getPriorityTextColor(test.priority) }}>
              {isTestRunning ? '▶ RUNNING' : `P${test.priority}`}
            </span>
            {width > 110 && !isTestRunning && (
              <span style={{ fontFamily: theme.fontMono, fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', color: getStatusTextColor(displayStatus, theme), textTransform: 'uppercase' as const }}>
                {displayStatus.toUpperCase()}
              </span>
            )}
          </div>
        )}
        {/* Main text */}
        <span style={{
          fontSize: width > 120 ? 12 : width > 80 ? 11 : 10,
          fontWeight: 600, color: isTestRunning ? theme.runningTextDark : theme.textPrimary,
          whiteSpace: 'nowrap', overflow: 'hidden',
          textOverflow: 'ellipsis', maxWidth: '100%', lineHeight: 1.2,
        }}>
          {resolvedMain}
        </span>

        {/* Info row */}
        {showInfoOnBar && (
          <span style={{
            fontFamily: theme.fontMono, fontSize: 9, fontWeight: 400,
            color: isTestRunning ? theme.runningText : theme.textTertiary,
            whiteSpace: 'nowrap', overflow: 'hidden',
            textOverflow: 'ellipsis', maxWidth: '100%', marginTop: 2,
          }}>
            {resolvedInfo}
          </span>
        )}
      </div>

      {/* Menu pill — ··· on wide bars, ⋮ on narrow bars, always visible */}
      <div
        ref={pillRef}
        draggable={false}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          if (pillRef.current) {
            const r = pillRef.current.getBoundingClientRect();
            onMenuOpen({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
          }
        }}
        style={{
          position: 'absolute',
          top: 4,
          right: 4,
          background: hovered ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.04)',
          borderRadius: 10,
          padding: useVerticalDots ? '3px 4px' : '2px 6px',
          fontSize: useVerticalDots ? 10 : 12,
          color: isTestRunning ? theme.runningText : theme.textMuted,
          cursor: 'pointer',
          letterSpacing: useVerticalDots ? 0 : '0.1em',
          lineHeight: 1,
          opacity: hovered ? 1 : 0.35,
          transition: 'opacity 0.15s, background 0.15s',
          userSelect: 'none',
          fontWeight: 700,
        }}
      >{useVerticalDots ? '⋮' : '···'}</div>
    </div>
  );
};

// ============================================================
// Context Menu
// ============================================================
const MenuItem: FC<{ label: string; detail?: string; icon?: string; theme: ThemeTokens; onClick: () => void }> = ({ label, detail, icon, theme, onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        padding: '8px 14px',
        fontSize: 12,
        fontWeight: 500,
        color: theme.textPrimary,
        cursor: 'pointer',
        background: hovered ? theme.surfaceHover : 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        userSelect: 'none',
        fontFamily: theme.fontFamily,
      }}
    >
      {icon && <span style={{ fontSize: 13, width: 18, textAlign: 'center', color: theme.textMuted }}>{icon}</span>}
      <div style={{ minWidth: 0, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, width: '100%' }}>
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
        {detail && (
          <span style={{ flexShrink: 0, fontFamily: theme.fontMono, fontSize: 10, color: theme.textMuted }}>
            {detail}
          </span>
        )}
      </div>
    </div>
  );
};

interface ActionPopoverProps {
  popover: PopoverState;
  statusOptionsList: string[];
  priorityInputValue: string;
  startDateInputValue: string;
  endDateInputValue: string;
  theme: ThemeTokens;
  onClose: () => void;
  onModeChange: (mode: 'root' | 'priority' | 'status' | 'start_date' | 'end_date') => void;
  onPriorityInputChange: (val: string) => void;
  onConfirmPriority: () => void;
  onPickStatus: (status: string) => void;
  onEditTest: () => void;
  onStartDateInputChange: (val: string) => void;
  onConfirmStartDate: () => void;
  onEndDateInputChange: (val: string) => void;
  onConfirmEndDate: () => void;
  panelRef: React.RefObject<HTMLDivElement>;
}

const ActionPopover: FC<ActionPopoverProps> = ({
  popover, statusOptionsList, priorityInputValue, startDateInputValue, endDateInputValue, theme,
  onClose, onModeChange, onPriorityInputChange, onConfirmPriority, onPickStatus, onEditTest,
  onStartDateInputChange, onConfirmStartDate, onEndDateInputChange, onConfirmEndDate, panelRef,
}) => {
  const [flippedV, setFlippedV] = React.useState(false);
  const popoverWidth = 248;
  const { anchorRect, test, mode, displayStatus, tooltipLines, scheduled } = popover;
  const capColor = getCapColor(displayStatus, theme);
  const startDateLabel = formatMenuDateLabel(test.test_started_date);
  const endDateLabel = formatMenuDateLabel(test.test_ended_date);

  // Horizontal: right-align to button, clamp to viewport edges
  let left = anchorRect.right - popoverWidth;
  left = Math.max(8, Math.min(left, window.innerWidth - popoverWidth - 8));

  // Vertical: below button by default; flip above if near bottom
  const topBelow = anchorRect.bottom + 6;
  const bottomAbove = window.innerHeight - anchorRect.top + 6;

  // Measure panel height and decide flip direction on every mode/anchor change
  React.useLayoutEffect(() => {
    if (panelRef.current) {
      const panelHeight = panelRef.current.scrollHeight;
      const spaceBelow = window.innerHeight - anchorRect.bottom - 6 - 8;
      const spaceAbove = anchorRect.top - 6 - 8;
      // Flip above only if it doesn't fit below AND there's more space above
      setFlippedV(panelHeight > spaceBelow && spaceAbove > spaceBelow);
    }
  }, [mode, anchorRect]);

  const posStyle: React.CSSProperties = flippedV
    ? { position: 'fixed', left, bottom: bottomAbove, zIndex: 3000 }
    : { position: 'fixed', left, top: topBelow, zIndex: 3000 };

  const lines = tooltipLines.split('\n').filter(l => {
    const parts = l.split(':');
    if (parts.length < 2) return l.trim() !== '';
    return parts.slice(1).join(':').trim() !== '';
  });

  return (
    <div
      ref={panelRef}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        ...posStyle,
        background: theme.surface,
        border: `1px solid ${theme.border}`,
        borderRadius: theme.radiusXl,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)',
        width: popoverWidth,
        overflow: 'hidden',
        fontFamily: theme.fontFamily,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 24,
          height: 24,
          border: 'none',
          borderRadius: theme.radiusSm,
          background: 'transparent',
          color: theme.textMuted,
          cursor: 'pointer',
          fontSize: 18,
          lineHeight: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
        aria-label="Close menu"
      >
        ×
      </button>
      {mode === 'root' ? (
        <>
          {/* Details section */}
          <div style={{ padding: '12px 38px 10px 14px', borderBottom: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.textPrimary, lineHeight: 1.3, marginBottom: 6, wordBreak: 'break-word' }}>
              {test.name}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: (lines.length > 0 || scheduled) ? 8 : 0 }}>
              <span style={{ fontFamily: theme.fontMono, fontSize: 12, fontWeight: 700, color: getPriorityTextColor(test.priority) }}>
                P{test.priority}
              </span>
              <span style={{
                fontFamily: theme.fontMono,
                fontSize: 10, fontWeight: 700, color: getStatusTextColor(displayStatus, theme),
                textTransform: 'uppercase' as const, letterSpacing: '0.05em',
                padding: '1px 6px', background: `${capColor}18`,
                borderRadius: theme.radiusSm, border: `1px solid ${capColor}40`,
              }}>
                {displayStatus}
              </span>
            </div>
            {lines.length > 0 && (
              <>
                <div style={{ height: 1, background: theme.border, margin: '0 -2px 6px' }} />
                {lines.map((line, i) => {
                  const colonIdx = line.indexOf(':');
                  if (colonIdx === -1) return (
                    <div key={i} style={{ fontSize: 12, color: theme.textSecondary, marginBottom: 2, lineHeight: 1.4 }}>{line}</div>
                  );
                  const label = line.slice(0, colonIdx).trim();
                  const value = line.slice(colonIdx + 1).trim();
                  return (
                    <div key={i} style={{ display: 'flex', gap: 6, fontSize: 12, marginBottom: 2, lineHeight: 1.4 }}>
                      <span style={{ color: theme.textMuted, fontWeight: 500, flexShrink: 0 }}>{label}:</span>
                      <span style={{ color: theme.textPrimary }}>{value}</span>
                    </div>
                  );
                })}
              </>
            )}
            {scheduled && (
              <>
                <div style={{ height: 1, background: theme.border, margin: `${lines.length > 0 ? 6 : 0}px -2px 6px` }} />
                <div style={{ display: 'flex', gap: 6, fontSize: 12, marginBottom: 2 }}>
                  <span style={{ color: theme.textMuted, fontWeight: 500 }}>Starts:</span>
                  <span style={{ color: theme.textPrimary }}>{scheduled.start.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, fontSize: 12 }}>
                  <span style={{ color: theme.textMuted, fontWeight: 500 }}>Ends:</span>
                  <span style={{ color: theme.textPrimary }}>{scheduled.end.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </>
            )}
          </div>
          {/* Actions */}
          <div style={{ padding: '4px 0' }}>
            <MenuItem label="Change Priority" icon="⬆" theme={theme} onClick={() => onModeChange('priority')} />
            <MenuItem label="Change Status" icon="◉" theme={theme} onClick={() => onModeChange('status')} />
            {displayStatus === 'Running' && (
              <>
                <MenuItem label="Change Start Date" detail={startDateLabel || undefined} icon="📅" theme={theme} onClick={() => onModeChange('start_date')} />
                <MenuItem label="Change End Date" detail={endDateLabel || undefined} icon="📅" theme={theme} onClick={() => onModeChange('end_date')} />
              </>
            )}
            <MenuItem label="Edit Test" icon="✎" theme={theme} onClick={onEditTest} />
          </div>
        </>
      ) : mode === 'priority' ? (
        <>
          <div style={{ padding: '10px 38px 8px 14px', borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span onClick={() => onModeChange('root')} style={{ cursor: 'pointer', color: theme.textMuted, fontSize: 16, lineHeight: 1 }}>←</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary }}>Change Priority</span>
          </div>
          <div style={{ padding: '10px 14px' }}>
            <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>Enter priority (0–100):</div>
            <input
              type="number"
              min={0}
              max={100}
              autoFocus
              value={priorityInputValue}
              onChange={(e) => onPriorityInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onConfirmPriority();
                if (e.key === 'Escape') onClose();
              }}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '6px 8px', fontSize: 13, borderRadius: theme.radius,
                border: `1px solid ${theme.borderStrong}`, outline: 'none',
                marginBottom: 8, fontFamily: theme.fontFamily,
                background: theme.surface, color: theme.textPrimary,
              }}
            />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={onConfirmPriority}
                style={{
                  flex: 1, padding: '6px 0', fontSize: 12, fontWeight: 600,
                  background: theme.accent, color: theme.accentFg, border: 'none',
                  borderRadius: theme.radius, cursor: 'pointer', fontFamily: theme.fontFamily,
                }}
              >Confirm</button>
              <span onClick={onClose} style={{ fontSize: 12, color: theme.textMuted, cursor: 'pointer', textDecoration: 'underline' }}>Cancel</span>
            </div>
          </div>
        </>
      ) : mode === 'status' ? (
        <>
          <div style={{ padding: '10px 38px 8px 14px', borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span onClick={() => onModeChange('root')} style={{ cursor: 'pointer', color: theme.textMuted, fontSize: 16, lineHeight: 1 }}>←</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary }}>Change Status</span>
          </div>
          <div style={{ padding: '4px 0' }}>
            {statusOptionsList.map((s) => (
              <MenuItem key={s} label={s === 'NULL' ? 'Clear Status (NULL)' : s} theme={theme} onClick={() => onPickStatus(s)} />
            ))}
          </div>
        </>
      ) : mode === 'start_date' ? (
        <>
          <div style={{ padding: '10px 38px 8px 14px', borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span onClick={() => onModeChange('root')} style={{ cursor: 'pointer', color: theme.textMuted, fontSize: 16, lineHeight: 1 }}>←</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary }}>Change Start Date</span>
          </div>
          <div style={{ padding: '10px 14px' }}>
            <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>Enter start date:</div>
            <input
              type="date"
              autoFocus
              value={startDateInputValue}
              onChange={(e) => onStartDateInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onConfirmStartDate();
                if (e.key === 'Escape') onClose();
              }}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '6px 8px', fontSize: 13, borderRadius: theme.radius,
                border: `1px solid ${theme.borderStrong}`, outline: 'none',
                marginBottom: 8, fontFamily: theme.fontFamily,
                background: theme.surface, color: theme.textPrimary,
              }}
            />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={onConfirmStartDate}
                disabled={!startDateInputValue}
                style={{
                  flex: 1, padding: '6px 0', fontSize: 12, fontWeight: 600,
                  background: startDateInputValue ? theme.accent : theme.border,
                  color: startDateInputValue ? theme.accentFg : theme.textMuted,
                  border: 'none', borderRadius: theme.radius, cursor: startDateInputValue ? 'pointer' : 'default',
                  fontFamily: theme.fontFamily,
                }}
              >Confirm</button>
              <span onClick={onClose} style={{ fontSize: 12, color: theme.textMuted, cursor: 'pointer', textDecoration: 'underline' }}>Cancel</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ padding: '10px 38px 8px 14px', borderBottom: `1px solid ${theme.border}`, background: theme.canvas, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span onClick={() => onModeChange('root')} style={{ cursor: 'pointer', color: theme.textMuted, fontSize: 16, lineHeight: 1 }}>←</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary }}>Change End Date</span>
          </div>
          <div style={{ padding: '10px 14px' }}>
            <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 8 }}>Enter end date:</div>
            <input
              type="date"
              autoFocus
              value={endDateInputValue}
              onChange={(e) => onEndDateInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onConfirmEndDate();
                if (e.key === 'Escape') onClose();
              }}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '6px 8px', fontSize: 13, borderRadius: theme.radius,
                border: `1px solid ${theme.borderStrong}`, outline: 'none',
                marginBottom: 8, fontFamily: theme.fontFamily,
                background: theme.surface, color: theme.textPrimary,
              }}
            />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={onConfirmEndDate}
                disabled={!endDateInputValue}
                style={{
                  flex: 1, padding: '6px 0', fontSize: 12, fontWeight: 600,
                  background: endDateInputValue ? theme.accent : theme.border,
                  color: endDateInputValue ? theme.accentFg : theme.textMuted,
                  border: 'none', borderRadius: theme.radius, cursor: endDateInputValue ? 'pointer' : 'default',
                  fontFamily: theme.fontFamily,
                }}
              >Confirm</button>
              <span onClick={onClose} style={{ fontSize: 12, color: theme.textMuted, cursor: 'pointer', textDecoration: 'underline' }}>Cancel</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ============================================================
// Save Overlay
// ============================================================
interface SaveOverlayProps {
  isError: boolean;
  theme: ThemeTokens;
  onRetry: () => void;
  onDiscard: () => void;
}

const SaveOverlay: FC<SaveOverlayProps> = ({ isError, theme, onRetry, onDiscard }) => (
  <div style={{
    position: 'absolute', inset: 0, zIndex: 2000,
    background: theme.isDark ? 'rgba(28,28,46,0.82)' : 'rgba(249,250,251,0.82)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: theme.fontFamily,
  }}>
    {!isError ? (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          border: `3px solid ${theme.border}`, borderTopColor: theme.accent,
          animation: 'ccl-spin 0.7s linear infinite',
        }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: theme.textSecondary }}>Saving…</span>
      </div>
    ) : (
      <div style={{
        background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: theme.radiusXl,
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)', padding: '24px 28px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        maxWidth: 300,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: theme.isDark ? '#3B0000' : '#FEF2F2',
          border: `1px solid ${theme.isDark ? '#7F1D1D' : '#FECACA'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: '#EF4444', fontWeight: 700,
        }}>!</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary }}>Save failed</div>
        <div style={{ fontSize: 12, color: theme.textMuted, textAlign: 'center', lineHeight: 1.5 }}>
          The allocation could not be saved. You can retry or discard your changes.
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <button
            onClick={onDiscard}
            style={{
              padding: '7px 16px', fontSize: 12, fontWeight: 600, borderRadius: theme.radius,
              border: `1px solid ${theme.borderStrong}`, cursor: 'pointer',
              background: theme.surface, color: theme.textSecondary, fontFamily: theme.fontFamily,
            }}
          >Discard</button>
          <button
            onClick={onRetry}
            style={{
              padding: '7px 16px', fontSize: 12, fontWeight: 600, borderRadius: theme.radius,
              border: 'none', cursor: 'pointer',
              background: theme.accent, color: theme.accentFg,
              boxShadow: `0 1px 3px ${theme.accent}4D`,
              fontFamily: theme.fontFamily,
            }}
          >Retry</button>
        </div>
      </div>
    )}
  </div>
);


// ============================================================
// Allocation Helpers
// ============================================================
const buildAllocations = (stands: InternalStand[]): AllocationRecord[] => {
  const allocations: AllocationRecord[] = [];
  stands.forEach(stand => {
    stand.tests.forEach((test, idx) => {
      allocations.push({
        test_id: test.id,
        test_stand_id: stand.id,
        priority_order: idx + 1,
      });
    });
  });
  return allocations;
};

const allocationsKey = (allocs: AllocationRecord[]): string => {
  return JSON.stringify(allocs.map(a => `${a.test_id}:${a.test_stand_id}:${a.priority_order}`).sort());
};

const parseStands = (
  testsArr: any[],
  standsArr: StandDef[],
  chHours: number,
  nonWorkingArr: any[] = []
): { stands: InternalStand[]; unallocated: TestData[] } => {
  // Group non-working rows by test_stand_id
  const nonWorkingByStand = new Map<string | number, any[]>();
  for (const row of nonWorkingArr) {
    if (!row || row.test_stand_id == null) continue;
    const key = row.test_stand_id;
    if (!nonWorkingByStand.has(key)) nonWorkingByStand.set(key, []);
    nonWorkingByStand.get(key)!.push({ start: row.start_time, end: row.end_time, notes: row.notes });
  }

  const standMap = new Map<number | string, InternalStand>();
  standsArr.forEach(s => standMap.set(s.id, {
    id: s.id,
    name: s.name,
    tests: [],
    changeover_hours: s.changeover_hours ?? chHours,
    nonWorkingBlocks: parseNonWorkingBlocks(nonWorkingByStand.get(s.id) ?? []),
  }));

  const unallocated: TestData[] = [];
  testsArr.forEach((t: any) => {
    const test: TestData = {
      id: t.id,
      name: t.name || '',
      duration: t.duration || 72,
      owner: t.owner || '',
      priority: t.priority ?? 50,
      notes: t.notes || '',
      status: t.status || '',
      test_stand_id: t.test_stand_id,
      priority_order: t.priority_order,
      allocation_id: t.allocation_id,
      assigned_parts: t.assigned_parts || null,
      part_ready_date: t.part_ready_date || null,
      part_status: t.part_status || '',
      test_started_date: t.test_started_date || null,
      ...t,
    };

    if (test.test_stand_id != null && standMap.has(test.test_stand_id)) {
      standMap.get(test.test_stand_id)!.tests.push(test);
    } else {
      unallocated.push(test);
    }
  });

  standMap.forEach(s => {
    s.tests.sort((a, b) => (a.priority_order || 999) - (b.priority_order || 999));
  });

  return {
    stands: standsArr.map(s => standMap.get(s.id)!),
    unallocated,
  };
};

// ============================================================
// Main Component
// ============================================================
export const TestStandScheduler: FC = () => {
  // ── Input data from Retool ──────────────────────────────
  const [inputTests] = Retool.useStateArray({
    name: "tests",
    initialValue: [],
    inspector: "text",
    label: "Tests Data",
    description: "Array of test objects from getSchedulerData query",
  });

  const [inputStands] = Retool.useStateArray({
    name: "testStands",
    initialValue: [],
    inspector: "text",
    label: "Test Stands Data",
    description: "Array of test stand objects from getTestStands query (id, name, changeover_hours)",
  });

  const [inputNonWorking] = Retool.useStateArray({
    name: "nonWorkingData",
    initialValue: [],
    inspector: "text",
    label: "Non-Working Blocks",
    description: "Array of non-working periods from getNonWorking query (id, test_stand_id, start_time, end_time, notes)",
  });

  // ── Configuration properties ────────────────────────────
  const [saveMode, setSaveMode] = Retool.useStateEnumeration({
    name: "saveMode",
    initialValue: "batch",
    enumDefinition: ["batch", "live"],
    inspector: "segmented",
    label: "Save Mode",
    description: "batch = save button, live = emit on every change",
  });

  const [isSaving] = Retool.useStateBoolean({
    name: "isSaving",
    initialValue: false,
    inspector: "checkbox",
    label: "Is Saving",
    description: "Bind to: {{ saveAllocations.isFetching }}",
  });

  const [hasSaveError] = Retool.useStateBoolean({
    name: "hasSaveError",
    initialValue: false,
    inspector: "checkbox",
    label: "Has Save Error",
    description: "Bind to: {{ !!saveAllocations.error }}",
  });

  const [savedAt] = Retool.useStateString({
    name: "savedAt",
    initialValue: "",
    inspector: "text",
    label: "Saved At",
    description: "Bind to: {{ saveAllocations.lastRunAt }}",
  });

  const [changeoverHours] = Retool.useStateNumber({
    name: "changeoverHours",
    initialValue: 3,
    inspector: "text",
    label: "Changeover Hours",
    description: "Hours for changeover between tests (work hours only)",
  });

  const [workStart] = Retool.useStateNumber({
    name: "workStart",
    initialValue: 9,
    inspector: "text",
    label: "Work Start Hour",
  });

  const [workEnd] = Retool.useStateNumber({
    name: "workEnd",
    initialValue: 17,
    inspector: "text",
    label: "Work End Hour",
  });

  const [initialViewWeeksStr] = Retool.useStateEnumeration({
    name: "defaultViewWeeks",
    initialValue: "4",
    enumDefinition: ["2", "4", "8", "12", "24"],
    inspector: "segmented",
    label: "Default View",
  });
  const initialViewWeeks = Number(initialViewWeeksStr) || 4;

  // ── Configurable display templates ──────────────────────
  const [cardMainText] = Retool.useStateString({
    name: "cardMainText",
    initialValue: "{name}",
    inspector: "text",
    label: "Card Title",
    description: "Template for card title. Use {fieldName} for data fields.",
  });

  const [cardSubText] = Retool.useStateString({
    name: "cardSubText",
    initialValue: "Parts: {part_ready_date}",
    inspector: "text",
    label: "Card Subtitle",
    description: "Template for subtitle. Hidden when all fields are empty.",
  });

  const [cardInfoRow] = Retool.useStateString({
    name: "cardInfoRow",
    initialValue: "{owner} \u00b7 {duration}h \u00b7 P{priority}",
    inspector: "text",
    label: "Card Info Row",
    description: "Template for the info row shown on cards and bars.",
  });

  const [tooltipTemplate] = Retool.useStateString({
    name: "tooltipTemplate",
    initialValue: "Notes: {notes}\nOwner: {owner}\nPriority: {priority}\nPart Status: {part_status}\nParts Due: {part_ready_date}\nAssigned Parts: {assigned_parts}\nTest Started: {test_started_date}",
    inspector: "text",
    label: "Tooltip Template",
    description: "Template for hover tooltip. Use \\n for newlines.",
  });

  const [statusOptions] = Retool.useStateArray({
    name: "statusOptions",
    initialValue: ["NULL", "Running", "Created", "Tested", "Cancelled"],
    inspector: "text",
    label: "Status Options",
    description: "Status strings shown in the right-click Change Status menu. 'NULL' clears the status.",
  });

  // ── Theme ───────────────────────────────────────────────
  const [appTheme] = Retool.useStateObject({
    name: "appTheme",
    initialValue: {},
    inspector: "text",
    label: "App Theme",
    description: "Bind to {{ theme }} to inherit app colours, fonts, and border radius",
  });

  // Optional status colour overrides (leave blank to use defaults)
  const [colorRunning] = Retool.useStateString({
    name: "colorRunning",
    initialValue: "",
    inspector: "text",
    label: "Running Colour",
    description: "Override cap colour for Running status. Leave blank to use default (#9333EA).",
  });
  const [colorReady] = Retool.useStateString({
    name: "colorReady",
    initialValue: "",
    inspector: "text",
    label: "Ready Colour",
    description: "Override cap colour for Ready status. Leave blank to use default (#22C55E).",
  });
  const [colorOnTime] = Retool.useStateString({
    name: "colorOnTime",
    initialValue: "",
    inspector: "text",
    label: "On Time Colour",
    description: "Override cap colour for On Time status. Leave blank to use default (#E5A00D).",
  });
  const [colorDelayed] = Retool.useStateString({
    name: "colorDelayed",
    initialValue: "",
    inspector: "text",
    label: "Delayed Colour",
    description: "Override cap colour for Delayed status. Leave blank to use default (#EF4444).",
  });
  const [colorPartsNotAssigned] = Retool.useStateString({
    name: "colorPartsNotAssigned",
    initialValue: "",
    inspector: "text",
    label: "Parts Not Assigned Colour",
    description: "Override cap colour for Parts Not Assigned status. Leave blank to use default (#9CA3AF).",
  });
  const [colorInProgress] = Retool.useStateString({
    name: "colorInProgress",
    initialValue: "",
    inspector: "text",
    label: "In Progress Colour",
    description: "Override cap colour for In Progress status. Leave blank to use default (#E5A00D).",
  });
  const [monoFont] = Retool.useStateString({
    name: "monoFont",
    initialValue: "",
    inspector: "text",
    label: "Monospace Font",
    description: "Font used for labels, badges, and stats. Leave blank to inherit the app theme font.",
  });

  // ── Build theme tokens ───────────────────────────────────
  const theme = useMemo((): ThemeTokens => {
    const statusOverrides: Record<string, string> = {};
    if (colorRunning)           statusOverrides['Running']            = colorRunning as string;
    if (colorReady)             statusOverrides['Ready']              = colorReady as string;
    if (colorOnTime)            statusOverrides['On Time']            = colorOnTime as string;
    if (colorDelayed)           statusOverrides['Delayed']            = colorDelayed as string;
    if (colorPartsNotAssigned)  statusOverrides['Parts Not Assigned'] = colorPartsNotAssigned as string;
    if (colorInProgress)        statusOverrides['In Progress']        = colorInProgress as string;
    return buildTheme(appTheme, statusOverrides, monoFont as string || undefined);
  }, [appTheme, colorRunning, colorReady, colorOnTime, colorDelayed, colorPartsNotAssigned, colorInProgress, monoFont]);

  // ── Output state ────────────────────────────────────────
  const [, setAllocations] = Retool.useStateArray({
    name: "allocations",
    initialValue: [],
    inspector: "hidden",
    description: "Current allocation state: [{test_id, test_stand_id, priority_order}]",
  });

  const [, setAllTestIds] = Retool.useStateArray({
    name: "allTestIds",
    initialValue: [],
    inspector: "hidden",
    description: "All test IDs managed by the scheduler (for the delete step in save)",
  });

  const [, setHasUnsavedChanges] = Retool.useStateBoolean({
    name: "hasUnsavedChanges",
    initialValue: false,
    inspector: "hidden",
    description: "Whether there are unsaved allocation changes",
  });

  const [, setSelectedTestId] = Retool.useStateString({
    name: "selectedTestId",
    initialValue: "",
    inspector: "hidden",
    description: "ID of test actioned via right-click menu (set before events fire)",
  });

  const [, setSelectedTestPriority] = Retool.useStateString({
    name: "selectedTestPriority",
    initialValue: "",
    inspector: "hidden",
    description: "New priority value from Change Priority action (numeric string)",
  });

  const [, setSelectedTestStartDate] = Retool.useStateString({
    name: "selectedTestStartDate",
    initialValue: "",
    inspector: "hidden",
    description: "New start date from Change Start Date action (ISO date string YYYY-MM-DD). Only set for Running tests.",
  });

  const [, setSelectedTestEndDate] = Retool.useStateString({
    name: "selectedTestEndDate",
    initialValue: "",
    inspector: "hidden",
    description: "New end date from Change End Date action (ISO date string YYYY-MM-DD). Only set for Running tests.",
  });

  const [, setSelectedTestStatus] = Retool.useStateString({
    name: "selectedTestStatus",
    initialValue: "",
    inspector: "hidden",
    description: "New status from Change Status action. Empty string = NULL in DB.",
  });

  const [, setPlannedDates] = Retool.useStateArray({
    name: "plannedDates",
    initialValue: [],
    inspector: "hidden",
    description: "Array of {test_id, planned_date} for all stand-scheduled tests. Use with savePlannedDates query.",
  });

  // ── Events ──────────────────────────────────────────────
  const onSave = Retool.useEventCallback({ name: "onSave" });
  const onChange = Retool.useEventCallback({ name: "onChange" });
  const onRetry = Retool.useEventCallback({ name: "onRetry" });
  const onChangePriority = Retool.useEventCallback({ name: "onChangePriority" });
  const onChangeStatus = Retool.useEventCallback({ name: "onChangeStatus" });
  const onChangeStartDate = Retool.useEventCallback({ name: "onChangeStartDate" });
  const onChangeEndDate = Retool.useEventCallback({ name: "onChangeEndDate" });
  const onEditTest = Retool.useEventCallback({ name: "onEditTest" });

  // ── Component settings ──────────────────────────────────
  Retool.useComponentSettings({
    defaultHeight: 600,
    defaultWidth: 12,
  });

  // ── Internal state ──────────────────────────────────────
  const [stands, setStands] = React.useState<InternalStand[]>([]);
  const [unallocated, setUnallocated] = React.useState<TestData[]>([]);
  const [viewportWeeks, setViewportWeeks] = React.useState<number>(initialViewWeeks || 4);
  const userChangedViewport = React.useRef(false);
  useEffect(() => {
    const weeks = Number(initialViewWeeksStr);
    if (weeks && !userChangedViewport.current) setViewportWeeks(weeks);
  }, [initialViewWeeksStr]);
  const [draggedTestId, setDraggedTestId] = React.useState<string | number | null>(null);
  const [insertIndicator, setInsertIndicator] = React.useState<InsertIndicator | null>(null);
  const [queueInsertIndex, setQueueInsertIndex] = React.useState<number | null>(null);
  const [isDirty, setIsDirty] = React.useState(false);
  const [pendingSave, setPendingSave] = React.useState(false);
  const [saveError, setSaveError] = React.useState(false);
  const [popover, setPopover] = React.useState<PopoverState | null>(null);
  const [priorityInputValue, setPriorityInputValue] = React.useState<string>('');
  const [startDateInputValue, setStartDateInputValue] = React.useState<string>('');
  const [endDateInputValue, setEndDateInputValue] = React.useState<string>('');
  const [pendingStatusChange, setPendingStatusChange] = React.useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const currentSaveMode = ((saveMode as string) === 'live' ? 'live' : 'batch') as 'batch' | 'live';
  const isLocked = pendingSave || (isSaving as boolean) || saveError;

  useEffect(() => {
    if (isSaving as boolean) {
      setPendingSave(false); // Retool has picked up the save; drop our local pending flag
    }
    if (hasSaveError as boolean) {
      setPendingSave(false);
      setSaveError(true);
    } else if (!(isSaving as boolean)) {
      // Not saving and no error = idle; clear error (covers recovery after retry)
      setSaveError(false);
    }
  }, [isSaving, hasSaveError]);

  useEffect(() => {
    if (!popover) return;
    const onMouseDown = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node))
        setPopover(null);
    };
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setPopover(null); };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [popover]);

  const originalAllocationsRef = useRef<string>('');
  const prevSavedAtRef = React.useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width || 800);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Optimistic save: when savedAt changes the DB write succeeded — snapshot the
  // current state as the new baseline without waiting for a getSchedulerData re-fetch.
  useEffect(() => {
    const ts = savedAt as string;
    if (!ts || ts === prevSavedAtRef.current) return; // skip initial mount + duplicates
    prevSavedAtRef.current = ts;
    // Snapshot current allocations as the new "original" so dirty-check resets correctly
    const currentAllocs = buildAllocations(stands);
    originalAllocationsRef.current = allocationsKey(currentAllocs);
    setIsDirty(false);
    setPendingSave(false);
    setSaveError(false);
  }, [savedAt, stands]);
  const [containerWidth, setContainerWidth] = React.useState(800);
  const [queueSort, setQueueSort] = React.useState<'az' | 'priority' | 'status'>('az');
  const [queueFilter, setQueueFilter] = React.useState('');

  const statusOptionsList = useMemo<string[]>(() => {
    const arr = Array.isArray(statusOptions) ? statusOptions as any[] : [];
    return arr.length > 0 ? arr.map(String) : ["NULL", "Running", "Created", "Tested", "Cancelled"];
  }, [statusOptions]);

  // ── Initialize from input data ──────────────────────────
  const inputKey = useMemo(
    () => JSON.stringify(inputTests) + JSON.stringify(inputStands) + JSON.stringify(inputNonWorking),
    [inputTests, inputStands, inputNonWorking]
  );

  useEffect(() => {
    const testsArr = Array.isArray(inputTests) ? inputTests : [];
    const standsArr = Array.isArray(inputStands) ? (inputStands as StandDef[]) : [];
    const nonWorkingArr = Array.isArray(inputNonWorking) ? inputNonWorking : [];

    if (standsArr.length === 0 && testsArr.length === 0) return;

    const { stands: newStands, unallocated: unalloc } = parseStands(testsArr, standsArr, chHours, nonWorkingArr);
    setStands(newStands);
    setUnallocated(unalloc);
    setIsDirty(false);

    // Snapshot the initial allocations
    const initialAllocs = buildAllocations(newStands);
    originalAllocationsRef.current = allocationsKey(initialAllocs);

    // Set output state
    setAllocations(initialAllocs);
    setAllTestIds(testsArr.map((t: any) => t.id));
    setHasUnsavedChanges(false);

    // Clear save lock — new data arriving from Retool means the save round-trip completed.
    // This is more reliable than waiting for the saveState binding to transition through
    // 'saving' → 'idle', which Retool can batch away so the useEffect never fires.
    setPendingSave(false);
    setSaveError(false);
  }, [inputKey]);

  // ── Scheduling config ───────────────────────────────────
  const chHours = (changeoverHours as number) || 3;
  const wStart = (workStart as number) || 9;
  const wEnd = (workEnd as number) || 17;

  // ── View computations ───────────────────────────────────
  const viewStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    while (d.getDay() !== 1) d.setDate(d.getDate() - 1);
    return d;
  }, []);

  // ── Schedule computation (must be defined before timelineEnd) ──
  const computeSchedule = useCallback((tests: TestData[], standChangeover: number, nonWorkingBlocks: NonWorkingBlock[]): ScheduledTest[] => {
    const runningTests = tests.filter(t => isRunningTest(t));
    const queuedTests = tests.filter(t => !isRunningTest(t));

    // Sort Running tests by actual start date, then priority desc for ties
    const sortedRunning = [...runningTests].sort((a, b) => {
      const dateA = parseLocalDate(a.test_started_date) || new Date();
      const dateB = parseLocalDate(b.test_started_date) || new Date();
      if (dateA.getTime() !== dateB.getTime()) return dateA.getTime() - dateB.getTime();
      return (b.priority ?? 50) - (a.priority ?? 50);
    });

    // Running tests use their actual test_started_date. Only later Running tests are
    // pushed forward to avoid overlap; the first one should not be clamped to viewStart.
    let lastRunningEnd: Date | null = null;
    const runningScheduled = sortedRunning.map(test => {
      const testDate = parseLocalDate(test.test_started_date) || new Date(viewStart);
      const start = lastRunningEnd && testDate < lastRunningEnd ? new Date(lastRunningEnd) : new Date(testDate);
      const durationEnd = new Date(start.getTime() + test.duration * MS_PER_HOUR);
      const end = durationEnd < new Date() ? new Date() : durationEnd;
      lastRunningEnd = calculateChangeoverEnd(end, standChangeover, wStart, wEnd);
      return { ...test, start, end };
    });

    // Queued tests start after last Running test's changeover (or now+changeover, whichever is later).
    // We never schedule a planned test to start in the past.
    // findValidStart pushes the start forward until the full [start, start+duration) window
    // doesn't overlap any non-working block (covers both start-inside and end-inside cases).
    const nowPlusChangeover = calculateChangeoverEnd(new Date(), standChangeover, wStart, wEnd);
    let currentEnd = new Date(Math.max((lastRunningEnd ?? viewStart).getTime(), nowPlusChangeover.getTime()));
    const queuedScheduled = queuedTests.map(test => {
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

  const standSchedules = useMemo(
    () => new Map(stands.map(s => [s.id, computeSchedule(s.tests, s.changeover_hours, s.nonWorkingBlocks)])),
    [stands, computeSchedule]
  );

  const timelineEnd = useMemo(() => {
    let latestEnd = new Date(viewStart);
    latestEnd.setDate(latestEnd.getDate() + viewportWeeks * 7);

    stands.forEach(stand => {
      const schedule = standSchedules.get(stand.id) ?? [];
      if (schedule.length > 0) {
        const last = schedule[schedule.length - 1];
        const changeoverEnd = calculateChangeoverEnd(last.end, stand.changeover_hours, wStart, wEnd);
        if (changeoverEnd > latestEnd) latestEnd = changeoverEnd;
      }
    });

    latestEnd.setDate(latestEnd.getDate() + 7);
    return latestEnd;
  }, [standSchedules, stands, viewStart, viewportWeeks, wStart, wEnd]);

  const totalDays = useMemo(() => Math.ceil(hoursBetween(viewStart, timelineEnd) / 24), [viewStart, timelineEnd]);

  // ── Planned dates for scheduled tests ───────────────────
  const scheduledPlannedDates = useMemo(() => {
    const result: Array<{ test_id: number | string; planned_date: string }> = [];
    stands.forEach(stand => {
      const schedule = standSchedules.get(stand.id) ?? [];
      schedule.forEach(st => {
        const d = st.start;
        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        result.push({ test_id: st.id, planned_date: dateStr });
      });
    });
    return result;
  }, [stands, standSchedules]);

  useEffect(() => {
    setPlannedDates(scheduledPlannedDates);
  }, [scheduledPlannedDates]);

  const pxPerHour = containerWidth / (viewportWeeks * 7 * 24);
  const days = useMemo(() => generateDays(viewStart, totalDays), [viewStart, totalDays]);
  const weeks = useMemo(() => generateWeeks(viewStart, totalDays), [viewStart, totalDays]);
  const totalWidth = totalDays * 24 * pxPerHour;
  const dayWidth = 24 * pxPerHour;

  // ── After-change handler ────────────────────────────────
  const afterChange = useCallback((newStands: InternalStand[]) => {
    const allocs = buildAllocations(newStands);
    const dirty = allocationsKey(allocs) !== originalAllocationsRef.current;
    setIsDirty(dirty);
    setAllocations(allocs);
    setHasUnsavedChanges(dirty);

    if (currentSaveMode === 'live') {
      setPendingSave(true);
      onChange();
    }
  }, [currentSaveMode, setAllocations, setHasUnsavedChanges, onChange]);

  // ── Drag and drop ───────────────────────────────────────
  const findTest = useCallback((testId: string | number): TestData | null => {
    const q = unallocated.find(t => t.id === testId);
    if (q) return q;
    for (const s of stands) {
      const t = s.tests.find(t => t.id === testId);
      if (t) return t;
    }
    return null;
  }, [unallocated, stands]);

  const clearDrag = useCallback(() => {
    setDraggedTestId(null);
    setInsertIndicator(null);
    setQueueInsertIndex(null);
  }, []);

  const dropOnStand = useCallback((standId: string | number, index: number) => {
    if (!draggedTestId) return;
    const test = findTest(draggedTestId);
    if (!test) return;

    // Remove from unallocated
    setUnallocated(prev => prev.filter(t => t.id !== draggedTestId));

    // Remove from all stands and insert at target
    const newStands = stands.map(s => {
      const originalIndex = s.tests.findIndex(t => t.id === draggedTestId);
      const filtered = s.tests.filter(t => t.id !== draggedTestId);
      if (s.id === standId) {
        // Adjust index if the dragged test was originally in this stand before the drop position
        const adjustedIndex = (originalIndex !== -1 && originalIndex < index) ? index - 1 : index;
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

  const dropOnQueue = useCallback((index: number) => {
    if (!draggedTestId) return;
    const test = findTest(draggedTestId);
    if (!test) return;

    // Remove from stands
    const newStands = stands.map(s => ({
      ...s,
      tests: s.tests.filter(t => t.id !== draggedTestId),
    }));

    // Add to unallocated
    setUnallocated(prev => {
      const filtered = prev.filter(t => t.id !== draggedTestId);
      const next = [...filtered];
      next.splice(index, 0, test);
      return next;
    });

    setStands(newStands);
    afterChange(newStands);
    clearDrag();
  }, [draggedTestId, findTest, stands, afterChange, clearDrag]);

  // ── Save / Discard ──────────────────────────────────────
  const handleSave = useCallback(() => {
    setPendingSave(true);
    onSave();
  }, [onSave]);

  const handleSaveModeChange = useCallback((nextMode: 'batch' | 'live') => {
    if (nextMode === currentSaveMode || isLocked) return;
    setSaveMode(nextMode);
    if (nextMode === 'live' && isDirty) {
      setPendingSave(true);
      onChange();
    }
  }, [currentSaveMode, isDirty, isLocked, onChange, setSaveMode]);

  const handleDiscard = useCallback(() => {
    setSaveError(false);
    setPendingSave(false);
    // Re-parse from input data
    const testsArr = Array.isArray(inputTests) ? inputTests : [];
    const standsArr = Array.isArray(inputStands) ? (inputStands as StandDef[]) : [];
    const nonWorkingArr = Array.isArray(inputNonWorking) ? inputNonWorking : [];

    const { stands: newStands, unallocated: unalloc } = parseStands(testsArr, standsArr, chHours, nonWorkingArr);
    setStands(newStands);
    setUnallocated(unalloc);
    setIsDirty(false);
    setAllocations(buildAllocations(newStands));
    setHasUnsavedChanges(false);
  }, [inputTests, inputStands, inputNonWorking, chHours, setAllocations, setHasUnsavedChanges]);

  const handleRetry = useCallback(() => {
    setSaveError(false);
    setPendingSave(true);
    onRetry();
  }, [onRetry]);

  // ── Popover actions ──────────────────────────────────────
  const closePopover = useCallback(() => {
    setPopover(null);
    setPendingStatusChange(null);
    setStartDateInputValue('');
    setEndDateInputValue('');
  }, []);

  const handlePopoverModeChange = useCallback((mode: 'root' | 'priority' | 'status' | 'start_date' | 'end_date') => {
    setPopover(prev => prev ? { ...prev, mode } : null);
  }, []);

  const handleConfirmPriority = useCallback(() => {
    if (!popover) return;
    const parsed = parseInt(priorityInputValue, 10);
    if (isNaN(parsed) || parsed < 0 || parsed > 100) return;
    setSelectedTestId(String(popover.test.id));
    setSelectedTestPriority(String(parsed));
    onChangePriority();
    closePopover();
  }, [popover, priorityInputValue, setSelectedTestId, setSelectedTestPriority, onChangePriority, closePopover]);

  const handlePickStatus = useCallback((status: string) => {
    if (!popover) return;
    if (status === 'Running') {
      setPendingStatusChange(status);
      setStartDateInputValue(formatDateInputValue(popover.test.test_started_date) || getTodayDateInputValue());
      setEndDateInputValue('');
      setPopover(prev => prev ? { ...prev, mode: 'start_date' } : null);
      return;
    }
    if (status === 'Tested') {
      setPendingStatusChange(status);
      setEndDateInputValue(getTodayDateInputValue());
      setStartDateInputValue('');
      setPopover(prev => prev ? { ...prev, mode: 'end_date' } : null);
      return;
    }
    setSelectedTestId(String(popover.test.id));
    setSelectedTestStatus(status === 'NULL' ? '' : status);
    onChangeStatus();
    closePopover();
  }, [popover, setSelectedTestId, setSelectedTestStatus, onChangeStatus, closePopover]);

  const handleEditTest = useCallback(() => {
    if (!popover) return;
    setSelectedTestId(String(popover.test.id));
    onEditTest();
    closePopover();
  }, [popover, setSelectedTestId, onEditTest, closePopover]);

  const handleConfirmStartDate = useCallback(() => {
    if (!popover || !startDateInputValue) return;
    setSelectedTestId(String(popover.test.id));
    if (pendingStatusChange) {
      setSelectedTestStatus(pendingStatusChange === 'NULL' ? '' : pendingStatusChange);
      onChangeStatus();
    }
    setSelectedTestStartDate(startDateInputValue);
    onChangeStartDate();
    closePopover();
  }, [popover, startDateInputValue, pendingStatusChange, setSelectedTestId, setSelectedTestStatus, onChangeStatus, setSelectedTestStartDate, onChangeStartDate, closePopover]);

  const handleConfirmEndDate = useCallback(() => {
    if (!popover || !endDateInputValue) return;
    setSelectedTestId(String(popover.test.id));
    if (pendingStatusChange) {
      setSelectedTestStatus(pendingStatusChange === 'NULL' ? '' : pendingStatusChange);
      onChangeStatus();
    }
    setSelectedTestEndDate(endDateInputValue);
    onChangeEndDate();
    closePopover();
  }, [popover, endDateInputValue, pendingStatusChange, setSelectedTestId, setSelectedTestStatus, onChangeStatus, setSelectedTestEndDate, onChangeEndDate, closePopover]);

  // ── Bar position ────────────────────────────────────────
  const getBarPos = useCallback((start: Date, duration: number) => ({
    left: Math.max(0, hoursBetween(viewStart, start)) * pxPerHour,
    width: Math.max(duration * pxPerHour, 2),
  }), [viewStart, pxPerHour]);

  // For Running tests: clip left to viewStart, adjust width to actual end time.
  // Returns null if the test ended before the timeline starts.
  const getRunningBarPos = useCallback((start: Date, end: Date): { left: number; width: number } | null => {
    const effectiveStartMs = Math.max(start.getTime(), viewStart.getTime());
    const endMs = end.getTime();
    if (endMs <= effectiveStartMs) return null;
    return {
      left: hoursBetween(viewStart, new Date(effectiveStartMs)) * pxPerHour,
      width: Math.max(hoursBetween(new Date(effectiveStartMs), new Date(endMs)) * pxPerHour, 2),
    };
  }, [viewStart, pxPerHour]);

  const draggedTest = draggedTestId != null ? findTest(draggedTestId) : null;
  const draggedIsRunning = draggedTest != null ? isRunningTest(draggedTest) : false;

  // ── Stats ───────────────────────────────────────────────
  const totalAllocated = stands.reduce((a, s) => a + s.tests.length, 0);
  const totalHours = stands.reduce((a, s) => a + s.tests.reduce((b, t) => b + t.duration, 0), 0);

  // ── Template accessors ──────────────────────────────────
  const mainText = String(cardMainText || '{name}');
  const subText = String(cardSubText || '');
  const infoRow = String(cardInfoRow || '');
  const tipTemplate = String(tooltipTemplate || '').replace(/\\n/g, '\n');

  // ── Filtered & sorted queue ─────────────────────────────
  const STATUS_SORT_ORDER: Record<string, number> = {
    'Running': 0, 'Delayed': 1, 'On Time': 2, 'Ready': 3, 'In Progress': 4, 'Parts Not Assigned': 5,
  };

  const sortedUnallocated = useMemo(() => {
    let list = [...unallocated];
    if (queueFilter.trim()) {
      const q = queueFilter.toLowerCase().trim();
      // Search across all readable string/number fields of the test
      list = list.filter(t => {
        const searchable = [t.name, t.owner, t.notes, t.status, t.part_status, t.assigned_parts,
          t.priority != null ? String(t.priority) : '', t.duration != null ? String(t.duration) : '']
          .join(' ').toLowerCase();
        return searchable.includes(q);
      });
    }
    if (queueSort === 'az') {
      list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (queueSort === 'priority') {
      list.sort((a, b) => (b.priority ?? 50) - (a.priority ?? 50));
    } else {
      // Sort by display status using a fixed urgency order
      list.sort((a, b) => {
        const sa = STATUS_SORT_ORDER[getDisplayStatus(a)] ?? 99;
        const sb = STATUS_SORT_ORDER[getDisplayStatus(b)] ?? 99;
        return sa !== sb ? sa - sb : (b.priority ?? 50) - (a.priority ?? 50);
      });
    }
    return list;
  }, [unallocated, queueSort, queueFilter]);

  // ── Bar height ──────────────────────────────────────────
  const BAR_HEIGHT = 72;
  const LANE_HEIGHT = 84;

  // ── Render ──────────────────────────────────────────────
  return (
    <div style={{
      display: 'flex', height: '100%', background: theme.canvas,
      overflow: 'hidden', fontFamily: theme.fontFamily, position: 'relative',
    }}>
      <style>{`@keyframes ccl-spin { to { transform: rotate(360deg); } }`}</style>
      {isLocked && (
        <SaveOverlay
          isError={saveError}
          theme={theme}
          onRetry={handleRetry}
          onDiscard={handleDiscard}
        />
      )}
      {/* ═══ Queue Sidebar ═══ */}
      <div style={{ width: 320, minWidth: 320, background: theme.canvas, borderRight: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${theme.border}`, background: theme.surface }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: unallocated.length > 0 ? '#F59E0B' : '#10B981' }} />
              <span style={{ fontFamily: theme.fontMono, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.textTertiary }}>Queue</span>
            </div>
            <div style={{ display: 'flex', gap: 2, background: theme.bgSubtle, borderRadius: theme.radius, padding: 2, border: `1px solid ${theme.border}` }}>
              {([['az', 'A→Z'], ['priority', 'Priority'], ['status', 'Status']] as const).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setQueueSort(val)}
                  style={{
                    fontFamily: theme.fontMono, padding: '3px 8px', fontSize: 9, fontWeight: 600, borderRadius: theme.radiusSm,
                    border: 'none', cursor: 'pointer',
                    background: queueSort === val ? theme.accent : 'transparent',
                    color: queueSort === val ? theme.accentFg : theme.textMuted,
                  }}
                >{label}</button>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', marginTop: 6 }}>
            <input
              type="text"
              value={queueFilter}
              onChange={(e) => setQueueFilter(e.target.value)}
              placeholder="Filter tests..."
              style={{
                fontFamily: theme.fontMono, width: '100%', boxSizing: 'border-box', padding: '5px 28px 5px 8px', fontSize: 11,
                border: `1px solid ${theme.border}`, borderRadius: theme.radius, background: theme.canvas,
                color: theme.textPrimary, outline: 'none',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = theme.accent; e.currentTarget.style.background = theme.surface; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.canvas; }}
            />
            {queueFilter && (
              <button
                onClick={() => setQueueFilter('')}
                style={{
                  position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: theme.textDisabled,
                  fontSize: 14, lineHeight: 1, padding: 0,
                }}
              >&times;</button>
            )}
          </div>
        </div>

        <div
          style={{ flex: 1, overflowY: 'auto', padding: '8px 10px' }}
          onDragOver={(e) => { e.preventDefault(); if (e.target === e.currentTarget) setQueueInsertIndex(unallocated.length); }}
          onDragLeave={(e) => { if (e.currentTarget === e.target) setQueueInsertIndex(null); }}
          onDrop={(e) => { e.preventDefault(); dropOnQueue(queueInsertIndex ?? unallocated.length); }}
        >
          {sortedUnallocated.map((test, idx) => {
            const status = getDisplayStatus(test, null);
            const showSub = !isTemplateEmpty(subText, test);
            const resolvedMain = resolveTemplate(mainText, test);
            const resolvedSub = resolveTemplate(subText, test);
            const resolvedInfo = resolveTemplate(infoRow, test);

            return (
              <div key={test.id}>
                <div
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setQueueInsertIndex(idx); }}
                  onDrop={(e) => { e.preventDefault(); e.stopPropagation(); dropOnQueue(idx); }}
                  style={{
                    height: queueInsertIndex === idx && draggedTestId && draggedTestId !== test.id ? 6 : 0,
                    background: theme.accent,
                    borderRadius: 3,
                    transition: 'height 0.12s ease',
                  }}
                />
                <QueueCard
                  test={test}
                  draggedTestId={draggedTestId}
                  status={status}
                  mainText={resolvedMain}
                  subText={resolvedSub}
                  infoRow={resolvedInfo}
                  showSub={showSub}
                  theme={theme}
                  onDragStart={() => setDraggedTestId(test.id)}
                  onDragEnd={clearDrag}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); const rect = e.currentTarget.getBoundingClientRect(); setQueueInsertIndex(e.clientY < rect.top + rect.height / 2 ? idx : idx + 1); }}
                  onMenuOpen={(rect) => {
                    if (draggedTestId || isLocked) return;
                    setPriorityInputValue(String(test.priority ?? 50));
                    setStartDateInputValue(formatDateInputValue(test.test_started_date));
                    setEndDateInputValue('');
                    setPendingStatusChange(null);
                    setPopover({
                      anchorRect: rect,
                      test,
                      mode: 'root',
                      displayStatus: status,
                      tooltipLines: resolveTemplate(tipTemplate, test),
                      scheduled: null,
                    });
                  }}
                />
              </div>
            );
          })}
          <div
            onDragOver={(e) => { e.preventDefault(); setQueueInsertIndex(unallocated.length); }}
            onDrop={(e) => { e.preventDefault(); dropOnQueue(unallocated.length); }}
            style={{
              height: (queueInsertIndex === unallocated.length && draggedTestId) ? 6 : 0,
              background: theme.accent,
              borderRadius: 3,
              transition: 'height 0.12s ease',
              margin: '0 4px',
            }}
          />
          {unallocated.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '32px 16px', color: theme.textMuted, fontSize: 12,
              border: draggedTestId ? `2px dashed ${theme.accent}` : `2px dashed ${theme.borderStrong}`,
              borderRadius: theme.radiusLg, marginTop: 8,
              background: draggedTestId ? theme.accentSubtle : 'transparent',
              fontFamily: theme.fontMono,
            }}>
              {draggedTestId ? 'Drop to return to queue' : 'All tests allocated'}
            </div>
          )}
        </div>

        <OutlineKey theme={theme} />

        <div style={{ padding: '12px 16px', borderTop: `1px solid ${theme.border}`, background: theme.canvas }}>
          <div style={{ fontFamily: theme.fontMono, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: theme.textMuted }}>
            <span>{totalAllocated}/{totalAllocated + unallocated.length} allocated</span><span>{totalHours}h</span>
          </div>
        </div>
      </div>

      {/* ═══ Main Timeline ═══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header bar */}
        <div style={{ padding: '12px 24px', borderBottom: `1px solid ${theme.border}`, background: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: theme.textPrimary, letterSpacing: '-0.02em', fontFamily: theme.fontFamily }}>Test Stand Scheduler</h1>
              <p style={{ fontFamily: theme.fontMono, fontSize: 11, color: theme.textMuted, marginTop: 2 }}>
                Continuous testing · {chHours}h changeover (default) · {wStart}:00–{wEnd}:00 Mon–Fri
              {currentSaveMode === 'live' && <span> · Live sync</span>}
              </p>
            </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            {/* Save/Discard buttons (batch mode) */}
            {currentSaveMode === 'batch' && (
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', alignSelf: 'stretch' }}>
                <button
                  onClick={handleDiscard}
                  disabled={!isDirty || isLocked}
                  style={{
                    fontFamily: theme.fontMono,
                    alignSelf: 'flex-end',
                    width: 130, padding: '6px 0', fontSize: 11, fontWeight: 600, borderRadius: theme.radius,
                    border: `1px solid ${isDirty && !isLocked ? theme.accent : theme.border}`,
                    cursor: (isDirty && !isLocked) ? 'pointer' : 'default',
                    background: (isDirty && !isLocked) ? theme.accent : 'transparent',
                    color: (isDirty && !isLocked) ? theme.accentFg : theme.textDisabled,
                    boxShadow: (isDirty && !isLocked) ? `0 1px 3px ${theme.accent}4D` : 'none',
                  }}
                >
                  Discard Changes
                </button>
                <button
                  onClick={handleSave}
                  disabled={!isDirty || isLocked}
                  style={{
                    fontFamily: theme.fontMono,
                    alignSelf: 'flex-end',
                    width: 130, padding: '6px 0', fontSize: 11, fontWeight: 600, borderRadius: theme.radius,
                    border: `1px solid ${isDirty && !isLocked ? theme.accent : theme.border}`,
                    cursor: (isDirty && !isLocked) ? 'pointer' : 'default',
                    background: (isDirty && !isLocked) ? theme.accent : 'transparent',
                    color: (isDirty && !isLocked) ? theme.accentFg : theme.textDisabled,
                    boxShadow: (isDirty && !isLocked) ? `0 1px 3px ${theme.accent}4D` : 'none',
                  }}
                >
                  Save Changes
                </button>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: theme.fontMono, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.textMuted }}>
                Save Mode
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 2, minWidth: 122, background: theme.bgSubtle, borderRadius: theme.radiusLg, padding: 2, border: `1px solid ${theme.border}` }}>
                  {(['batch', 'live'] as const).map(mode => {
                    const active = currentSaveMode === mode;
                    const disabled = isLocked;
                    return (
                      <button
                        key={mode}
                        onClick={() => handleSaveModeChange(mode)}
                        disabled={disabled}
                        style={{
                          flex: 1,
                          fontFamily: theme.fontMono,
                          padding: '6px 10px',
                          fontSize: 10,
                          fontWeight: 700,
                          borderRadius: theme.radius,
                          border: 'none',
                          cursor: disabled ? 'default' : 'pointer',
                          background: active ? theme.accent : 'transparent',
                          color: active ? theme.accentFg : theme.textTertiary,
                          opacity: disabled ? 0.65 : 1,
                          textTransform: 'lowercase' as const,
                        }}
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>

                {/* Viewport selector */}
                <div style={{ display: 'flex', gap: 4, background: theme.bgSubtle, borderRadius: theme.radiusLg, padding: 3, border: `1px solid ${theme.border}` }}>
                  {[2, 4, 8, 12, 24].map((w) => (
                    <button
                      key={w}
                      onClick={() => { userChangedViewport.current = true; setViewportWeeks(w); }}
                      style={{
                        fontFamily: theme.fontMono,
                        padding: '6px 12px', fontSize: 11, fontWeight: 600, borderRadius: theme.radius,
                        border: 'none', cursor: 'pointer',
                        background: viewportWeeks === w ? theme.accent : 'transparent',
                        color: viewportWeeks === w ? theme.accentFg : theme.textTertiary,
                      }}
                    >
                      {w}W
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline scroll area */}
        <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', background: theme.canvas }}>
          <div style={{ minWidth: totalWidth, padding: '0 12px 24px', position: 'relative' }}>
            {/* Timeline header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 20, background: theme.canvas, borderBottom: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', height: 28, borderBottom: `1px solid ${theme.border}` }}>
                {days.map((d, i) => {
                  const isMonday = d.getDay() === 1;
                  return (
                    <div key={i} style={{
                      fontFamily: theme.fontMono, width: dayWidth, minWidth: dayWidth, height: 28,
                      display: 'flex', alignItems: 'center',
                      fontSize: 10, fontWeight: 600, color: theme.textTertiary,
                      borderLeft: `1px solid ${isMonday && i > 0 ? theme.border : 'transparent'}`,
                      paddingLeft: isMonday ? 7 : 0,
                      overflow: 'visible', whiteSpace: 'nowrap',
                    }}>
                      {isMonday ? formatWeek(d) : ''}
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', height: 24 }}>
                {days.map((d, i) => {
                  const isToday = d.toDateString() === new Date().toDateString();
                  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                  return (
                    <div key={i} style={{
                      fontFamily: theme.fontMono, width: dayWidth, minWidth: dayWidth,
                      fontSize: 9, textAlign: 'center',
                      color: isToday ? theme.accent : theme.textMuted,
                      fontWeight: isToday ? 700 : 400, lineHeight: '24px',
                      borderLeft: `1px solid ${theme.border}`,
                      background: isToday ? theme.accentSubtle : (isWeekend ? theme.bgSubtle : 'transparent'),
                    }}>
                      {viewportWeeks <= 8 ? d.getDate() : (d.getDay() === 1 ? d.getDate() : '')}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ═══ Test Stand Lanes ═══ */}
            {stands.map((stand) => {
              const schedule = standSchedules.get(stand.id) ?? [];
              const ind = insertIndicator;
              const showHere = ind && ind.standId === stand.id;

              return (
                <div key={stand.id} style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, paddingLeft: 2 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 2, background: stand.tests.length > 0 ? theme.accent : theme.textDisabled }} />
                    <span style={{ fontFamily: theme.fontMono, fontSize: 11, fontWeight: 600, color: theme.textSecondary }}>{stand.name}</span>
                    <span style={{ fontFamily: theme.fontMono, fontSize: 10, color: theme.textMuted }}>
                      {stand.tests.length} test{stand.tests.length !== 1 ? 's' : ''}{stand.tests.length > 0 && ` \u00b7 ${stand.tests.reduce((a, t) => a + t.duration, 0)}h`}
                    </span>
                  </div>

                  <div
                    onDragOver={(e) => { e.preventDefault(); setInsertIndicator({ standId: stand.id, index: stand.tests.length }); }}
                    onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setInsertIndicator(null); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      // Running tests always append to end (position is governed by test_started_date)
                      if (draggedIsRunning) {
                        dropOnStand(stand.id, stand.tests.length);
                      } else {
                        dropOnStand(stand.id, ind?.standId === stand.id ? ind.index : stand.tests.length);
                      }
                    }}
                    style={{
                      position: 'relative',
                      height: LANE_HEIGHT,
                      background: (() => {
                        const active = showHere || (draggedTestId && stand.tests.length === 0);
                        if (!active) return theme.surfaceSecondary;
                        return draggedIsRunning ? theme.runningBg : theme.accentSubtle;
                      })(),
                      border: `1px solid ${(() => {
                        const active = showHere || (draggedTestId && stand.tests.length === 0);
                        if (!active) return theme.border;
                        return draggedIsRunning ? theme.runningBorder : theme.accentMuted;
                      })()}`,
                      borderRadius: theme.radiusLg,
                      width: totalWidth,
                      transition: 'background 0.15s ease, border-color 0.15s ease',
                    }}
                  >
                    {/* Weekend shading */}
                    {days.map((d, i) => {
                      if (d.getDay() !== 0 && d.getDay() !== 6) return null;
                      return (
                        <div key={`we-${i}`} style={{
                          position: 'absolute', left: i * dayWidth, top: 0, bottom: 0,
                          width: dayWidth, background: theme.border, opacity: 0.35, pointerEvents: 'none',
                        }} />
                      );
                    })}

                    {/* Day grid */}
                    {days.map((_, i) => (
                      <div key={i} style={{ position: 'absolute', left: i * dayWidth, top: 0, bottom: 0, width: 1, background: theme.border }} />
                    ))}

                    {/* Now line */}
                    {(() => {
                      const h = hoursBetween(viewStart, new Date());
                      if (h < 0 || h > totalDays * 24) return null;
                      return (
                        <div style={{ position: 'absolute', left: h * pxPerHour, top: 0, bottom: 0, width: 2, background: '#EF4444', zIndex: 18, pointerEvents: 'none' }}>
                          <div style={{ position: 'absolute', top: -3, left: -3, width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
                        </div>
                      );
                    })()}

                    {/* Non-working blocks */}
                    {stand.nonWorkingBlocks.map((block, i) => {
                      const left = hoursBetween(viewStart, block.start) * pxPerHour;
                      const width = hoursBetween(block.start, block.end) * pxPerHour;
                      if (left + width < 0 || left > totalWidth) return null;
                      const clampedLeft = Math.max(0, left);
                      const clampedWidth = Math.min(width + Math.min(0, left), totalWidth - clampedLeft);
                      return (
                        <div key={`nw-${i}`} style={{
                          position: 'absolute', left: clampedLeft, top: 6,
                          width: clampedWidth, height: BAR_HEIGHT,
                          zIndex: 6, pointerEvents: 'none',
                          background: `repeating-linear-gradient(45deg, ${theme.border} 0px, ${theme.border} 15px, ${theme.surface} 15px, ${theme.surface} 30px)`,
                          borderRadius: theme.radiusLg, border: `1px solid ${theme.borderStrong}`,
                          display: 'flex', flexDirection: 'row', overflow: 'hidden',
                        }}>
                          <div style={{ width: 5, minWidth: 5, background: theme.textDisabled, flexShrink: 0 }} />
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4px 8px', minWidth: 0, justifyContent: 'center' }}>
                            <span style={{
                              fontSize: 12, fontWeight: 700, color: theme.textSecondary,
                              whiteSpace: 'nowrap', overflow: 'hidden',
                              textOverflow: 'ellipsis', maxWidth: '100%', lineHeight: 1.2,
                              fontFamily: theme.fontFamily,
                            }}>{block.notes || 'Maintenance'}</span>
                          </div>
                        </div>
                      );
                    })}

                    {/* Test bars */}
                    {schedule.map((test, idx) => {
                      const isTestRunning = isRunningTest(test);
                      const barPos = isTestRunning
                        ? getRunningBarPos(test.start, test.end)
                        : getBarPos(test.start, test.duration);

                      // Skip Running tests that ended before the timeline starts
                      if (!barPos) return null;

                      const { left, width } = barPos;
                      const cEnd = calculateChangeoverEnd(test.end, stand.changeover_hours, wStart, wEnd);
                      const changeoverWidth = hoursBetween(test.end, cEnd) * pxPerHour;
                      const displayStatus = getDisplayStatus(test, test.start);

                      const resolvedMain = resolveTemplate(mainText, test);
                      const resolvedInfo = resolveTemplate(infoRow, test);
                      const showInfoOnBar = resolvedInfo.trim() !== '' && width > 120;

                      return (
                        <div key={test.id} style={{ position: 'absolute', left, top: 0, width: width + changeoverWidth, height: '100%' }}>
                          {/* Drop zones — suppressed when dragging a Running test */}
                          {draggedTestId && draggedTestId !== test.id && !draggedIsRunning && (
                            <>
                              <div
                                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setInsertIndicator({ standId: stand.id, index: idx }); }}
                                onDrop={(e) => { e.preventDefault(); e.stopPropagation(); dropOnStand(stand.id, idx); }}
                                style={{ position: 'absolute', left: -6, top: 0, width: '50%', height: '100%', zIndex: 20, minWidth: 20 }}
                              />
                              <div
                                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setInsertIndicator({ standId: stand.id, index: idx + 1 }); }}
                                onDrop={(e) => { e.preventDefault(); e.stopPropagation(); dropOnStand(stand.id, idx + 1); }}
                                style={{ position: 'absolute', right: -6, top: 0, width: '50%', height: '100%', zIndex: 20, minWidth: 20 }}
                              />
                            </>
                          )}

                          {/* Insert indicator before this test — suppressed for Running drags */}
                          {showHere && !draggedIsRunning && ind!.index === idx && (
                            <div style={{ position: 'absolute', left: -4, top: 0, bottom: 0 }}><InsertLine theme={theme} /></div>
                          )}

                          {/* Test bar */}
                          <div style={{ position: 'absolute', left: 0, top: 0, width, height: '100%' }}>
                            <TestBar
                              test={test}
                              isTestRunning={isTestRunning}
                              draggedTestId={draggedTestId}
                              width={width}
                              BAR_HEIGHT={BAR_HEIGHT}
                              displayStatus={displayStatus}
                              resolvedMain={resolvedMain}
                              resolvedInfo={resolvedInfo}
                              showInfoOnBar={showInfoOnBar}
                              theme={theme}
                              onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(test.id)); setDraggedTestId(test.id); }}
                              onDragEnd={clearDrag}
                              onMenuOpen={(rect) => {
                                if (draggedTestId || isLocked) return;
                                setPriorityInputValue(String(test.priority ?? 50));
                                setStartDateInputValue(formatDateInputValue(test.test_started_date));
                                setEndDateInputValue('');
                                setPendingStatusChange(null);
                                setPopover({
                                  anchorRect: rect,
                                  test,
                                  mode: 'root',
                                  displayStatus,
                                  tooltipLines: resolveTemplate(tipTemplate, test),
                                  scheduled: { start: test.start, end: test.end },
                                });
                              }}
                            />
                          </div>

                          {/* Changeover indicator */}
                          {idx < schedule.length && changeoverWidth > 0 && (
                            <div style={{ position: 'absolute', left: width, top: LANE_HEIGHT / 2 - 8, width: changeoverWidth, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div style={{ height: 1, width: '80%', background: `repeating-linear-gradient(90deg, ${theme.textDisabled} 0, ${theme.textDisabled} 4px, transparent 4px, transparent 8px)` }} />
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Insert indicator at end — suppressed when dragging a Running test */}
                    {showHere && !draggedIsRunning && ind!.index === stand.tests.length && schedule.length > 0 && (() => {
                      const last = schedule[schedule.length - 1];
                      const { left, width } = getBarPos(last.start, last.duration);
                      const cEnd = calculateChangeoverEnd(last.end, stand.changeover_hours, wStart, wEnd);
                      const changeoverWidth = hoursBetween(last.end, cEnd) * pxPerHour;
                      return <div style={{ position: 'absolute', left: left + width + changeoverWidth + 8, top: 0, bottom: 0 }}><InsertLine theme={theme} /></div>;
                    })()}

                    {/* Empty state */}
                    {stand.tests.length === 0 && (
                      <div style={{
                        fontFamily: theme.fontMono, position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11,
                        color: draggedTestId ? theme.accent : theme.textDisabled,
                        fontWeight: draggedTestId ? 600 : 400,
                      }}>
                        {draggedTestId ? 'Drop here to schedule' : 'Drop tests here to schedule'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* No stands message */}
            {stands.length === 0 && (
              <div style={{
                fontFamily: theme.fontMono, textAlign: 'center', padding: '48px 24px',
                color: theme.textMuted, fontSize: 12,
              }}>
                No test stands loaded. Bind the testStands property to your getTestStands query.
              </div>
            )}
          </div>
        </div>
      </div>

      {popover && (
        <ActionPopover
          popover={popover}
          statusOptionsList={statusOptionsList}
          priorityInputValue={priorityInputValue}
          startDateInputValue={startDateInputValue}
          endDateInputValue={endDateInputValue}
          theme={theme}
          onClose={closePopover}
          onModeChange={handlePopoverModeChange}
          onPriorityInputChange={setPriorityInputValue}
          onConfirmPriority={handleConfirmPriority}
          onPickStatus={handlePickStatus}
          onEditTest={handleEditTest}
          onStartDateInputChange={setStartDateInputValue}
          onConfirmStartDate={handleConfirmStartDate}
          onEndDateInputChange={setEndDateInputValue}
          onConfirmEndDate={handleConfirmEndDate}
          panelRef={popoverRef}
        />
      )}
    </div>
  );
};
