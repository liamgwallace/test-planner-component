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
}

interface InternalStand {
  id: number | string;
  name: string;
  tests: TestData[];
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
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3) return null;
  return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
};

const toMidnight = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
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
// Styling
// ============================================================
const isRunningTest = (test: TestData): boolean => test.status === 'Running';

const statusCapColors: Record<string, string> = {
  'Running': '#9333EA',
  'Ready': '#22C55E',
  'On Time': '#E5A00D',
  'Delayed': '#EF4444',
  'Parts Not Assigned': '#9CA3AF',
  'In Progress': '#D1D5DB',
};

const statusTextColors: Record<string, string> = {
  'Running': '#7E22CE',
  'Ready': '#16A34A',
  'On Time': '#B45309',
  'Delayed': '#DC2626',
  'Parts Not Assigned': '#6B7280',
  'In Progress': '#9CA3AF',
};

const getCapColor = (status: string): string => statusCapColors[status] || statusCapColors['In Progress'];
const getStatusTextColor = (status: string): string => statusTextColors[status] || statusTextColors['In Progress'];

// Returns 'Running' for Running tests (overrides part status for display colours)
const getDisplayStatus = (test: TestData, testStartDate: Date | null = null): string => {
  if (isRunningTest(test)) return 'Running';
  return getCalculatedStatus(test, testStartDate);
};

const getPriorityTextColor = (priority: number | null | undefined): string => {
  const value = typeof priority === 'number' ? priority : 50;
  const clamped = Math.max(0, Math.min(100, value));
  if (clamped <= 30) return '#6B7280'; // grey for low priority
  if (clamped <= 60) return '#F59E0B'; // orange for medium
  if (clamped <= 80) return '#EA580C'; // dark orange for high
  return '#DC2626'; // red for critical
};

// Keep old getPriorityColor for sidebar cards
const getPriorityColor = (priority: number | null | undefined): string => {
  const value = typeof priority === 'number' ? priority : 50;
  const clamped = Math.max(0, Math.min(100, value));
  const ratio = clamped / 100;
  const g = Math.round(255 * (1 - ratio));
  const b = Math.round(255 * (1 - ratio));
  return `rgba(255, ${g}, ${b}, 0.6)`;
};

const styles = {
  container: { display: 'flex', height: '100%', background: '#F9FAFB', overflow: 'hidden', fontFamily: "'DM Sans', sans-serif", position: 'relative' } as React.CSSProperties,
  sidebar: { width: 320, minWidth: 320, background: '#FFFFFF', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' } as React.CSSProperties,
  mono: { fontFamily: "'JetBrains Mono', monospace" } as React.CSSProperties,
};

// ============================================================
// Sub-components
// ============================================================
const InsertLine: FC = () => (
  <div style={{
    position: 'absolute', top: 2, bottom: 2, width: 3,
    background: '#3B82F6', borderRadius: 2, zIndex: 30,
    boxShadow: '0 0 12px #3B82F6, 0 0 4px #3B82F6',
    pointerEvents: 'none',
  }}>
    <div style={{ position: 'absolute', top: -4, left: -4, width: 11, height: 11, borderRadius: '50%', background: '#3B82F6' }} />
    <div style={{ position: 'absolute', bottom: -4, left: -4, width: 11, height: 11, borderRadius: '50%', background: '#3B82F6' }} />
  </div>
);

const OutlineKey: FC = () => (
  <div style={{ padding: '10px 16px', borderTop: '1px solid #E5E7EB', background: '#F9FAFB' }}>
    <h3 style={{ ...styles.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4B5563', marginBottom: 6 }}>Status Key</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 0' }}>
      {(['Running', 'Ready', 'On Time', 'Delayed', 'Parts Not Assigned'] as const).map((key) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, width: '50%', minWidth: 0 }}>
          <div style={{ width: 4, height: 14, background: statusCapColors[key], borderRadius: 2, flexShrink: 0 }} />
          <span style={{ ...styles.mono, fontSize: 9, color: getStatusTextColor(key), fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{key.toUpperCase()}</span>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// Save Overlay
// ============================================================
interface SaveOverlayProps {
  isError: boolean;
  onRetry: () => void;
  onDiscard: () => void;
}

const SaveOverlay: FC<SaveOverlayProps> = ({ isError, onRetry, onDiscard }) => (
  <div style={{
    position: 'absolute', inset: 0, zIndex: 2000,
    background: 'rgba(249,250,251,0.82)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <style>{`@keyframes ccl-spin { to { transform: rotate(360deg); } }`}</style>
    {!isError ? (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          border: '3px solid #E5E7EB', borderTopColor: '#3B82F6',
          animation: 'ccl-spin 0.7s linear infinite',
        }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Saving…</span>
      </div>
    ) : (
      <div style={{
        background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 12,
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)', padding: '24px 28px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        maxWidth: 300,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: '#FEF2F2',
          border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: '#EF4444', fontWeight: 700,
        }}>!</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>Save failed</div>
        <div style={{ fontSize: 12, color: '#6B7280', textAlign: 'center', lineHeight: 1.5 }}>
          The allocation could not be saved. You can retry or discard your changes.
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <button
            onClick={onDiscard}
            style={{
              padding: '7px 16px', fontSize: 12, fontWeight: 600, borderRadius: 6,
              border: '1px solid #D1D5DB', cursor: 'pointer',
              background: '#FFFFFF', color: '#374151',
            }}
          >Discard</button>
          <button
            onClick={onRetry}
            style={{
              padding: '7px 16px', fontSize: 12, fontWeight: 600, borderRadius: 6,
              border: 'none', cursor: 'pointer',
              background: '#3B82F6', color: '#FFFFFF',
              boxShadow: '0 1px 3px rgba(59,130,246,0.3)',
            }}
          >Retry</button>
        </div>
      </div>
    )}
  </div>
);

// ============================================================
// Custom Tooltip Component
// ============================================================
interface TooltipWrapperProps {
  testName: string;
  priority: number;
  status: string;
  tooltipLines: string;
  scheduled?: { start: Date; end: Date } | null;
  wrapperStyle?: React.CSSProperties;
  children: React.ReactNode;
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({ testName, priority, status, tooltipLines, scheduled, wrapperStyle, children }) => {
  const [show, setShow] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0, bottom: 0 });
  const [flipped, setFlipped] = React.useState(false);
  const timeoutRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback(() => {
    if (wrapRef.current) {
      const rect = wrapRef.current.getBoundingClientRect();
      setPos({ x: rect.left + rect.width / 2, y: rect.top, bottom: rect.bottom });
    }
    timeoutRef.current = window.setTimeout(() => setShow(true), 400);
  }, []);
  const handleLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(false);
    setFlipped(false);
  }, []);

  // After tooltip renders, check if it clips above the viewport and flip if needed
  React.useLayoutEffect(() => {
    if (show && tipRef.current) {
      const rect = tipRef.current.getBoundingClientRect();
      if (rect.top < 0) {
        setFlipped(true);
      }
    }
  }, [show, pos]);

  const lines = tooltipLines.split('\n').filter(l => {
    const parts = l.split(':');
    if (parts.length < 2) return l.trim() !== '';
    return parts.slice(1).join(':').trim() !== '';
  });

  const tooltipContent = (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E5E7EB',
      borderRadius: 10,
      boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)',
      padding: '12px 16px',
      maxWidth: 300,
      minWidth: 180,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 6, lineHeight: 1.3 }}>
        {testName}
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: getPriorityTextColor(priority) }}>
          P{priority}
        </span>
        <span style={{
          fontSize: 11, fontWeight: 700,
          color: getStatusTextColor(status),
          textTransform: 'uppercase' as const,
          letterSpacing: '0.05em',
          padding: '1px 6px',
          background: `${getCapColor(status)}18`,
          borderRadius: 4,
          border: `1px solid ${getCapColor(status)}40`,
        }}>
          {status}
        </span>
      </div>
      <div style={{ height: 1, background: '#E5E7EB', margin: '0 -4px 8px' }} />
      {lines.map((line, i) => {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) return (
          <div key={i} style={{ fontSize: 11, color: '#374151', marginBottom: 3, lineHeight: 1.4 }}>{line}</div>
        );
        const label = line.slice(0, colonIdx).trim();
        const value = line.slice(colonIdx + 1).trim();
        return (
          <div key={i} style={{ display: 'flex', gap: 6, fontSize: 11, marginBottom: 3, lineHeight: 1.4 }}>
            <span style={{ color: '#6B7280', fontWeight: 500, flexShrink: 0 }}>{label}:</span>
            <span style={{ color: '#111827', fontWeight: 400 }}>{value}</span>
          </div>
        );
      })}
      {scheduled && (
        <>
          <div style={{ height: 1, background: '#E5E7EB', margin: '6px -4px 6px' }} />
          <div style={{ display: 'flex', gap: 6, fontSize: 11, marginBottom: 2 }}>
            <span style={{ color: '#6B7280', fontWeight: 500 }}>Starts:</span>
            <span style={{ color: '#111827' }}>{scheduled.start.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, fontSize: 11 }}>
            <span style={{ color: '#6B7280', fontWeight: 500 }}>Ends:</span>
            <span style={{ color: '#111827' }}>{scheduled.end.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
        </>
      )}
    </div>
  );

  // Arrow pointing up (when tooltip is below) or down (when above)
  const arrowDown = (
    <div style={{
      width: 10, height: 10, background: '#FFFFFF',
      border: '1px solid #E5E7EB', borderTop: 'none', borderLeft: 'none',
      transform: 'rotate(45deg)',
      margin: '-6px auto 0',
    }} />
  );
  const arrowUp = (
    <div style={{
      width: 10, height: 10, background: '#FFFFFF',
      border: '1px solid #E5E7EB', borderBottom: 'none', borderRight: 'none',
      transform: 'rotate(45deg)',
      margin: '0 auto -6px',
    }} />
  );

  return (
    <div ref={wrapRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={wrapperStyle || { position: 'relative' }}>
      {children}
      {show && (
        <div ref={tipRef} style={{
          position: 'fixed',
          left: pos.x,
          top: flipped ? pos.bottom + 8 : pos.y - 8,
          transform: flipped ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
          zIndex: 1000, pointerEvents: 'none',
        }}>
          {flipped ? (
            <>{arrowUp}{tooltipContent}</>
          ) : (
            <>{tooltipContent}{arrowDown}</>
          )}
        </div>
      )}
    </div>
  );
};

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
    description: "Array of test stand objects from getTestStands query",
  });

  // ── Configuration properties ────────────────────────────
  const [saveMode] = Retool.useStateEnumeration({
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
    initialValue: "Notes: {notes}\nOwner: {owner}\nPriority: {priority}\nPart Status: {part_status}\nParts Due: {part_ready_date}\nAssigned Parts: {assigned_parts}",
    inspector: "text",
    label: "Tooltip Template",
    description: "Template for hover tooltip. Use \\n for newlines.",
  });

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

  // ── Events ──────────────────────────────────────────────
  const onSave = Retool.useEventCallback({ name: "onSave" });
  const onChange = Retool.useEventCallback({ name: "onChange" });
  const onRetry = Retool.useEventCallback({ name: "onRetry" });

  // ── Component settings ──────────────────────────────────
  Retool.useComponentSettings({
    defaultHeight: 600,
    defaultWidth: 12,
  });

  // ── Internal state ──────────────────────────────────────
  const [stands, setStands] = React.useState<InternalStand[]>([]);
  const [unallocated, setUnallocated] = React.useState<TestData[]>([]);
  const [viewportWeeks, setViewportWeeks] = React.useState<number>(initialViewWeeks as number || 4);
  const [draggedTestId, setDraggedTestId] = React.useState<string | number | null>(null);
  const [insertIndicator, setInsertIndicator] = React.useState<InsertIndicator | null>(null);
  const [queueInsertIndex, setQueueInsertIndex] = React.useState<number | null>(null);
  const [isDirty, setIsDirty] = React.useState(false);
  const [pendingSave, setPendingSave] = React.useState(false);
  const [saveError, setSaveError] = React.useState(false);
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

  const originalAllocationsRef = useRef<string>('');
  const prevSavedAtRef = React.useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

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
  const [queueSort, setQueueSort] = React.useState<'az' | 'priority' | 'status'>('az');
  const [queueFilter, setQueueFilter] = React.useState('');

  // ── Initialize from input data ──────────────────────────
  const inputKey = useMemo(
    () => JSON.stringify(inputTests) + JSON.stringify(inputStands),
    [inputTests, inputStands]
  );

  useEffect(() => {
    const testsArr = Array.isArray(inputTests) ? inputTests : [];
    const standsArr = Array.isArray(inputStands) ? (inputStands as StandDef[]) : [];

    if (standsArr.length === 0 && testsArr.length === 0) return;

    // Build stand map
    const standMap = new Map<number | string, InternalStand>();
    standsArr.forEach(s => standMap.set(s.id, { id: s.id, name: s.name, tests: [] }));

    // Group tests
    const unalloc: TestData[] = [];
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
        ...t, // preserve any extra fields for template resolution
      };

      if (test.test_stand_id != null && standMap.has(test.test_stand_id)) {
        standMap.get(test.test_stand_id)!.tests.push(test);
      } else {
        unalloc.push(test);
      }
    });

    // Sort each stand's tests by priority_order
    standMap.forEach(s => {
      s.tests.sort((a, b) => (a.priority_order || 999) - (b.priority_order || 999));
    });

    const newStands = standsArr.map(s => standMap.get(s.id)!);
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
  const computeSchedule = useCallback((tests: TestData[]): ScheduledTest[] => {
    const runningTests = tests.filter(t => isRunningTest(t));
    const queuedTests = tests.filter(t => !isRunningTest(t));

    // Sort Running tests by actual start date, then priority desc for ties
    const sortedRunning = [...runningTests].sort((a, b) => {
      const dateA = parseLocalDate(a.test_started_date) || new Date();
      const dateB = parseLocalDate(b.test_started_date) || new Date();
      if (dateA.getTime() !== dateB.getTime()) return dateA.getTime() - dateB.getTime();
      return (b.priority ?? 50) - (a.priority ?? 50);
    });

    // Running tests use their actual test_started_date; overlapping ones are made sequential
    let lastRunningEnd = new Date(viewStart);
    const runningScheduled = sortedRunning.map(test => {
      const testDate = parseLocalDate(test.test_started_date) || new Date(viewStart);
      const start = testDate < lastRunningEnd ? new Date(lastRunningEnd) : new Date(testDate);
      const end = new Date(start.getTime() + test.duration * MS_PER_HOUR);
      lastRunningEnd = calculateChangeoverEnd(end, chHours, wStart, wEnd);
      return { ...test, start, end };
    });

    // Queued tests start after last Running test's changeover (or now+changeover, whichever is later).
    // We never schedule a planned test to start in the past.
    const nowPlusChangeover = calculateChangeoverEnd(new Date(), chHours, wStart, wEnd);
    let currentEnd = new Date(Math.max(lastRunningEnd.getTime(), nowPlusChangeover.getTime()));
    const queuedScheduled = queuedTests.map(test => {
      const start = new Date(currentEnd);
      const end = new Date(start.getTime() + test.duration * MS_PER_HOUR);
      currentEnd = calculateChangeoverEnd(end, chHours, wStart, wEnd);
      return { ...test, start, end };
    });

    return [...runningScheduled, ...queuedScheduled];
  }, [viewStart, chHours, wStart, wEnd]);

  const timelineEnd = useMemo(() => {
    let latestEnd = new Date(viewStart);
    latestEnd.setDate(latestEnd.getDate() + viewportWeeks * 7);

    stands.forEach(stand => {
      const schedule = computeSchedule(stand.tests);
      if (schedule.length > 0) {
        const last = schedule[schedule.length - 1];
        const changeoverEnd = calculateChangeoverEnd(last.end, chHours, wStart, wEnd);
        if (changeoverEnd > latestEnd) latestEnd = changeoverEnd;
      }
    });

    latestEnd.setDate(latestEnd.getDate() + 7);
    return latestEnd;
  }, [stands, viewStart, viewportWeeks, chHours, wStart, wEnd, computeSchedule]);

  const totalDays = useMemo(() => Math.ceil(hoursBetween(viewStart, timelineEnd) / 24), [viewStart, timelineEnd]);

  const viewportWidth = 800;
  const pxPerHour = viewportWidth / (viewportWeeks * 7 * 24);
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

    if ((saveMode as string) === 'live') {
      setPendingSave(true);
      onChange();
    }
  }, [saveMode, setAllocations, setHasUnsavedChanges, onChange]);

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
      const filtered = s.tests.filter(t => t.id !== draggedTestId);
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

  const handleDiscard = useCallback(() => {
    setSaveError(false);
    setPendingSave(false);
    // Re-parse from input data
    const testsArr = Array.isArray(inputTests) ? inputTests : [];
    const standsArr = Array.isArray(inputStands) ? (inputStands as StandDef[]) : [];

    const standMap = new Map<number | string, InternalStand>();
    standsArr.forEach(s => standMap.set(s.id, { id: s.id, name: s.name, tests: [] }));

    const unalloc: TestData[] = [];
    testsArr.forEach((t: any) => {
      const test: TestData = { ...t, duration: t.duration || 72, priority: t.priority ?? 50 };
      if (test.test_stand_id != null && standMap.has(test.test_stand_id)) {
        standMap.get(test.test_stand_id)!.tests.push(test);
      } else {
        unalloc.push(test);
      }
    });
    standMap.forEach(s => s.tests.sort((a, b) => (a.priority_order || 999) - (b.priority_order || 999)));

    const newStands = standsArr.map(s => standMap.get(s.id)!);
    setStands(newStands);
    setUnallocated(unalloc);
    setIsDirty(false);
    setAllocations(buildAllocations(newStands));
    setHasUnsavedChanges(false);
  }, [inputTests, inputStands, setAllocations, setHasUnsavedChanges]);

  const handleRetry = useCallback(() => {
    setSaveError(false);
    setPendingSave(true);
    onRetry();
  }, [onRetry]);

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
    <div style={styles.container}>
      {isLocked && (
        <SaveOverlay
          isError={saveError}
          onRetry={handleRetry}
          onDiscard={handleDiscard}
        />
      )}
      {/* ═══ Queue Sidebar ═══ */}
      <div style={styles.sidebar}>
        <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: unallocated.length > 0 ? '#F59E0B' : '#10B981' }} />
              <span style={{ ...styles.mono, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4B5563' }}>Queue</span>
            </div>
            <div style={{ display: 'flex', gap: 2, background: '#F3F4F6', borderRadius: 6, padding: 2, border: '1px solid #E5E7EB' }}>
              {([['az', 'A→Z'], ['priority', 'Priority'], ['status', 'Status']] as const).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setQueueSort(val)}
                  style={{
                    ...styles.mono, padding: '3px 8px', fontSize: 9, fontWeight: 600, borderRadius: 4,
                    border: 'none', cursor: 'pointer',
                    background: queueSort === val ? '#3B82F6' : 'transparent',
                    color: queueSort === val ? '#FFF' : '#6B7280',
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
                ...styles.mono, width: '100%', boxSizing: 'border-box', padding: '5px 28px 5px 8px', fontSize: 11,
                border: '1px solid #E5E7EB', borderRadius: 6, background: '#F9FAFB',
                color: '#111827', outline: 'none',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.background = '#FFFFFF'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = '#F9FAFB'; }}
            />
            {queueFilter && (
              <button
                onClick={() => setQueueFilter('')}
                style={{
                  position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF',
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

            return (
              <div key={test.id}>
                <div
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setQueueInsertIndex(idx); }}
                  onDrop={(e) => { e.preventDefault(); e.stopPropagation(); dropOnQueue(idx); }}
                  style={{
                    height: queueInsertIndex === idx && draggedTestId && draggedTestId !== test.id ? 6 : 0,
                    background: '#3B82F6',
                    borderRadius: 3,
                    transition: 'height 0.12s ease',
                  }}
                />
                <TooltipWrapper
                  testName={resolveTemplate(mainText, test)}
                  priority={test.priority}
                  status={status}
                  tooltipLines={resolveTemplate(tipTemplate, test)}
                >
                  <div
                    draggable
                    onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; setDraggedTestId(test.id); }}
                    onDragEnd={clearDrag}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); const rect = e.currentTarget.getBoundingClientRect(); setQueueInsertIndex(e.clientY < rect.top + rect.height / 2 ? idx : idx + 1); }}
                    onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; el.style.border = `2px solid ${getCapColor(status)}`; }}
                    onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; el.style.border = '1px solid #E5E7EB'; }}
                    style={{
                      display: 'flex',
                      marginBottom: 6,
                      background: draggedTestId === test.id ? '#F3F4F6' : '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: 8,
                      cursor: 'grab',
                      opacity: draggedTestId === test.id ? 0.35 : 1,
                      overflow: 'hidden',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease',
                    }}
                  >
                    {/* Status cap bar */}
                    <div style={{ width: 5, minWidth: 5, background: getCapColor(status), borderRadius: '8px 0 0 8px', flexShrink: 0 }} />
                    <div style={{ flex: 1, padding: '8px 12px', minWidth: 0 }}>
                      {/* Top row: priority left, status right */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ ...styles.mono, fontSize: 13, fontWeight: 700, color: getPriorityTextColor(test.priority) }}>
                          P{test.priority}
                        </span>
                        <span style={{ ...styles.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: getStatusTextColor(status), textTransform: 'uppercase' as const }}>
                          {status.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 2, lineHeight: 1.3 }}>
                        {resolveTemplate(mainText, test)}
                      </div>
                      {showSub && (
                        <div style={{ ...styles.mono, fontSize: 11, color: '#6B7280', marginBottom: 4, fontWeight: 400 }}>
                          {resolveTemplate(subText, test)}
                        </div>
                      )}
                      <div style={{ ...styles.mono, display: 'flex', gap: 8, fontSize: 11, color: '#4B5563', flexWrap: 'wrap' }}>
                        {resolveTemplate(infoRow, test).split('\u00b7').map((part, i, arr) => (
                          <React.Fragment key={i}>
                            <span>{part.trim()}</span>
                            {i < arr.length - 1 && <span>{'\u00b7'}</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </TooltipWrapper>
              </div>
            );
          })}
          <div
            onDragOver={(e) => { e.preventDefault(); setQueueInsertIndex(unallocated.length); }}
            onDrop={(e) => { e.preventDefault(); dropOnQueue(unallocated.length); }}
            style={{
              height: (queueInsertIndex === unallocated.length && draggedTestId) ? 6 : 0,
              background: '#3B82F6',
              borderRadius: 3,
              transition: 'height 0.12s ease',
              margin: '0 4px',
            }}
          />
          {unallocated.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '32px 16px', color: '#6B7280', fontSize: 12,
              border: draggedTestId ? '2px dashed #3B82F6' : '2px dashed #D1D5DB',
              borderRadius: 8, marginTop: 8,
              background: draggedTestId ? '#EFF6FF' : 'transparent',
            }}>
              {draggedTestId ? 'Drop to return to queue' : 'All tests allocated'}
            </div>
          )}
        </div>

        <OutlineKey />

        <div style={{ padding: '12px 16px', borderTop: '1px solid #E5E7EB', background: '#F9FAFB' }}>
          <div style={{ ...styles.mono, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6B7280' }}>
            <span>{totalAllocated}/{totalAllocated + unallocated.length} allocated</span><span>{totalHours}h</span>
          </div>
        </div>
      </div>

      {/* ═══ Main Timeline ═══ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header bar */}
        <div style={{ padding: '12px 24px', borderBottom: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>Test Stand Scheduler</h1>
            <p style={{ ...styles.mono, fontSize: 11, color: '#6B7280', marginTop: 2 }}>
              Continuous testing · {chHours}h changeover ({wStart}:00–{wEnd}:00 Mon–Fri)
              {(saveMode as string) === 'live' && <span> · Live sync</span>}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Save/Discard buttons (batch mode) */}
            {(saveMode as string) === 'batch' && (
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={handleDiscard}
                  disabled={!isDirty || isLocked}
                  style={{
                    ...styles.mono,
                    padding: '6px 14px', fontSize: 11, fontWeight: 600, borderRadius: 6,
                    border: '1px solid #D1D5DB', cursor: (isDirty && !isLocked) ? 'pointer' : 'default',
                    background: '#FFFFFF', color: (isDirty && !isLocked) ? '#374151' : '#9CA3AF',
                    opacity: (isDirty && !isLocked) ? 1 : 0.5,
                  }}
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={!isDirty || isLocked}
                  style={{
                    ...styles.mono,
                    padding: '6px 14px', fontSize: 11, fontWeight: 600, borderRadius: 6,
                    border: 'none', cursor: (isDirty && !isLocked) ? 'pointer' : 'default',
                    background: (isDirty && !isLocked) ? '#3B82F6' : '#93C5FD',
                    color: '#FFFFFF',
                    boxShadow: (isDirty && !isLocked) ? '0 1px 3px rgba(59,130,246,0.3)' : 'none',
                  }}
                >
                  Save Changes{isDirty && ' •'}
                </button>
              </div>
            )}

            {/* Viewport selector */}
            <div style={{ display: 'flex', gap: 4, background: '#F3F4F6', borderRadius: 8, padding: 3, border: '1px solid #E5E7EB' }}>
              {[2, 4, 8, 12, 24].map((w) => (
                <button
                  key={w}
                  onClick={() => setViewportWeeks(w)}
                  style={{
                    ...styles.mono,
                    padding: '6px 12px', fontSize: 11, fontWeight: 600, borderRadius: 6,
                    border: 'none', cursor: 'pointer',
                    background: viewportWeeks === w ? '#3B82F6' : 'transparent',
                    color: viewportWeeks === w ? '#FFF' : '#4B5563',
                  }}
                >
                  {w}W
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline scroll area */}
        <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', background: '#F9FAFB' }}>
          <div style={{ minWidth: totalWidth, padding: '0 12px 24px', position: 'relative' }}>
            {/* Timeline header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 20, background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', height: 28, position: 'relative', borderBottom: '1px solid #E5E7EB' }}>
                {weeks.map((wk, i) => (
                  <div key={i} style={{
                    ...styles.mono, position: 'absolute',
                    left: hoursBetween(viewStart, wk) * pxPerHour,
                    width: 7 * 24 * pxPerHour, height: 28,
                    display: 'flex', alignItems: 'center', paddingLeft: 8,
                    fontSize: 10, fontWeight: 600, color: '#4B5563',
                    borderLeft: i > 0 ? '1px solid #E5E7EB' : 'none',
                  }}>
                    {formatWeek(wk)}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', height: 24 }}>
                {days.map((d, i) => {
                  const isToday = d.toDateString() === new Date().toDateString();
                  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                  return (
                    <div key={i} style={{
                      ...styles.mono, width: dayWidth, minWidth: dayWidth,
                      fontSize: 9, textAlign: 'center',
                      color: isToday ? '#2563EB' : '#6B7280',
                      fontWeight: isToday ? 700 : 400, lineHeight: '24px',
                      borderLeft: '1px solid #E5E7EB',
                      background: isToday ? '#EFF6FF' : (isWeekend ? '#F3F4F6' : 'transparent'),
                    }}>
                      {viewportWeeks <= 8 ? d.getDate() : (d.getDay() === 1 ? d.getDate() : '')}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ═══ Test Stand Lanes ═══ */}
            {stands.map((stand) => {
              const schedule = computeSchedule(stand.tests);
              const ind = insertIndicator;
              const showHere = ind && ind.standId === stand.id;

              return (
                <div key={stand.id} style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, paddingLeft: 2 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 2, background: stand.tests.length > 0 ? '#3B82F6' : '#9CA3AF' }} />
                    <span style={{ ...styles.mono, fontSize: 11, fontWeight: 600, color: '#374151' }}>{stand.name}</span>
                    <span style={{ ...styles.mono, fontSize: 10, color: '#6B7280' }}>
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
                        if (!active) return '#F3F4F6';
                        return draggedIsRunning ? '#F5F3FF' : '#EFF6FF';
                      })(),
                      border: `1px solid ${(() => {
                        const active = showHere || (draggedTestId && stand.tests.length === 0);
                        if (!active) return '#E5E7EB';
                        return draggedIsRunning ? '#A78BFA' : '#BFDBFE';
                      })()}`,
                      borderRadius: 8,
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
                          width: dayWidth, background: '#E5E7EB', pointerEvents: 'none',
                        }} />
                      );
                    })}

                    {/* Day grid */}
                    {days.map((_, i) => (
                      <div key={i} style={{ position: 'absolute', left: i * dayWidth, top: 0, bottom: 0, width: 1, background: '#E5E7EB' }} />
                    ))}

                    {/* Now line */}
                    {(() => {
                      const h = hoursBetween(viewStart, new Date());
                      if (h < 0 || h > totalDays * 24) return null;
                      return (
                        <div style={{ position: 'absolute', left: h * pxPerHour, top: 0, bottom: 0, width: 2, background: '#EF4444', zIndex: 10 }}>
                          <div style={{ position: 'absolute', top: -3, left: -3, width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
                        </div>
                      );
                    })()}

                    {/* Test bars */}
                    {schedule.map((test, idx) => {
                      const isTestRunning = isRunningTest(test);
                      const barPos = isTestRunning
                        ? getRunningBarPos(test.start, test.end)
                        : getBarPos(test.start, test.duration);

                      // Skip Running tests that ended before the timeline starts
                      if (!barPos) return null;

                      const { left, width } = barPos;
                      const cEnd = calculateChangeoverEnd(test.end, chHours, wStart, wEnd);
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
                            <div style={{ position: 'absolute', left: -4, top: 0, bottom: 0 }}><InsertLine /></div>
                          )}

                          {/* Test bar */}
                          <TooltipWrapper
                            testName={resolvedMain}
                            priority={test.priority}
                            status={displayStatus}
                            tooltipLines={resolveTemplate(tipTemplate, test)}
                            scheduled={isTestRunning ? null : test}
                            wrapperStyle={{ position: 'absolute', left: 0, top: 0, width: width, height: '100%' }}
                          >
                            <div
                              draggable
                              onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(test.id)); setDraggedTestId(test.id); }}
                              onDragEnd={clearDrag}
                              onMouseEnter={(e) => { if (!draggedTestId) { const el = e.currentTarget; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; el.style.border = `2px solid ${getCapColor(displayStatus)}`; el.style.zIndex = '25'; } }}
                              onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; el.style.border = isTestRunning ? '1px solid #C4B5FD' : '1px solid #E5E7EB'; el.style.zIndex = '15'; }}
                              style={{
                                position: 'absolute', left: 0, top: 6,
                                width, height: BAR_HEIGHT,
                                background: isTestRunning ? '#F3E8FF' : '#FFFFFF',
                                borderRadius: 8, cursor: 'grab',
                                display: 'flex', flexDirection: 'row',
                                overflow: 'hidden',
                                opacity: draggedTestId === test.id ? 0.25 : 1,
                                zIndex: 15,
                                border: isTestRunning ? '1px solid #C4B5FD' : '1px solid #E5E7EB',
                                boxShadow: isTestRunning ? '0 1px 3px rgba(147,51,234,0.15)' : '0 1px 3px rgba(0,0,0,0.06)',
                                transition: 'transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease',
                              }}
                            >
                              {/* Status cap bar */}
                              <div style={{ width: 5, minWidth: 5, background: getCapColor(displayStatus), flexShrink: 0 }} />
                              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4px 8px', minWidth: 0, justifyContent: 'center' }}>
                                {/* Top row: priority + status */}
                                {width > 70 && (
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                                    <span style={{ ...styles.mono, fontSize: width > 120 ? 11 : 9, fontWeight: 700, color: isTestRunning ? '#7E22CE' : getPriorityTextColor(test.priority) }}>
                                      {isTestRunning ? '▶ RUNNING' : `P${test.priority}`}
                                    </span>
                                    {width > 100 && !isTestRunning && (
                                      <span style={{ ...styles.mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', color: getStatusTextColor(displayStatus), textTransform: 'uppercase' as const }}>
                                        {displayStatus.toUpperCase()}
                                      </span>
                                    )}
                                  </div>
                                )}
                                {/* Main text */}
                                <span style={{
                                  fontSize: width > 120 ? 12 : width > 80 ? 11 : 10,
                                  fontWeight: 600, color: isTestRunning ? '#3B0764' : '#111827',
                                  whiteSpace: 'nowrap', overflow: 'hidden',
                                  textOverflow: 'ellipsis', maxWidth: '100%', lineHeight: 1.2,
                                }}>
                                  {resolvedMain}
                                </span>

                                {/* Info row */}
                                {showInfoOnBar && (
                                  <span style={{
                                    ...styles.mono, fontSize: 9, fontWeight: 400, color: isTestRunning ? '#7E22CE' : '#4B5563',
                                    whiteSpace: 'nowrap', overflow: 'hidden',
                                    textOverflow: 'ellipsis', maxWidth: '100%', marginTop: 2,
                                  }}>
                                    {resolvedInfo}
                                  </span>
                                )}
                              </div>
                            </div>
                          </TooltipWrapper>

                          {/* Changeover indicator */}
                          {idx < schedule.length && changeoverWidth > 0 && (
                            <div style={{ position: 'absolute', left: width, top: LANE_HEIGHT / 2 - 8, width: changeoverWidth, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div style={{ height: 1, width: '80%', background: 'repeating-linear-gradient(90deg, #9CA3AF 0, #9CA3AF 4px, transparent 4px, transparent 8px)' }} />
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Insert indicator at end — suppressed when dragging a Running test */}
                    {showHere && !draggedIsRunning && ind!.index === stand.tests.length && schedule.length > 0 && (() => {
                      const last = schedule[schedule.length - 1];
                      const { left, width } = getBarPos(last.start, last.duration);
                      const cEnd = calculateChangeoverEnd(last.end, chHours, wStart, wEnd);
                      const changeoverWidth = hoursBetween(last.end, cEnd) * pxPerHour;
                      return <div style={{ position: 'absolute', left: left + width + changeoverWidth + 8, top: 0, bottom: 0 }}><InsertLine /></div>;
                    })()}

                    {/* Empty state */}
                    {stand.tests.length === 0 && (
                      <div style={{
                        ...styles.mono, position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11,
                        color: draggedTestId ? '#3B82F6' : '#9CA3AF',
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
                ...styles.mono, textAlign: 'center', padding: '48px 24px',
                color: '#6B7280', fontSize: 12,
              }}>
                No test stands loaded. Bind the testStands property to your getTestStands query.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
