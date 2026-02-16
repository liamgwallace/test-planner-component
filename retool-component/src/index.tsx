import React, { FC, useRef, useMemo, useCallback } from "react";
import { Retool } from "@anthropic-ai/retool-ccl";

// ============================================================
// Types
// ============================================================
interface Test {
  id: string;
  name: string;
  duration: number;
  owner: string;
  priority: number;
  notes: string;
  partStatus: string;
  assignedParts: string;
  partReadyDate: string | null;
}

interface ScheduledTest extends Test {
  start: Date;
  end: Date;
}

interface Stand {
  id: string;
  name: string;
  tests: Test[];
}

interface InsertIndicator {
  standId: string;
  index: number;
}

// ============================================================
// Configuration
// ============================================================
const DEFAULT_CONFIG = {
  CHANGEOVER_HOURS: 3,
  WORK_START: 9,
  WORK_END: 17,
  MS_PER_HOUR: 3600000,
};

// ============================================================
// Date Utilities
// ============================================================
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

const getNextWorkdayStart = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(DEFAULT_CONFIG.WORK_START, 0, 0, 0);
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  return d;
};

const calculateChangeoverEnd = (prevTestEnd: Date): Date => {
  const { CHANGEOVER_HOURS, WORK_START, WORK_END, MS_PER_HOUR } = DEFAULT_CONFIG;
  let changeoverStart = new Date(prevTestEnd);

  if (!isWorkDay(changeoverStart) || changeoverStart.getHours() >= WORK_END) {
    changeoverStart = getNextWorkdayStart(new Date(changeoverStart.getTime() + MS_PER_HOUR * 12));
  } else if (changeoverStart.getHours() < WORK_START) {
    changeoverStart.setHours(WORK_START, 0, 0, 0);
  }

  let remainingChangeover = CHANGEOVER_HOURS;
  let changeoverEnd = new Date(changeoverStart);

  while (remainingChangeover > 0) {
    if (!isWorkDay(changeoverEnd)) {
      changeoverEnd = getNextWorkdayStart(new Date(changeoverEnd.getTime() + MS_PER_HOUR * 12));
      continue;
    }
    const availableHoursToday = WORK_END - changeoverEnd.getHours();
    const hoursToApply = Math.min(remainingChangeover, availableHoursToday);
    changeoverEnd.setTime(changeoverEnd.getTime() + hoursToApply * MS_PER_HOUR);
    remainingChangeover -= hoursToApply;
    if (remainingChangeover > 0) {
      changeoverEnd = getNextWorkdayStart(new Date(changeoverEnd.getTime() + MS_PER_HOUR * 12));
    }
  }
  return changeoverEnd;
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

const hoursBetween = (a: Date, b: Date): number => (b.getTime() - a.getTime()) / DEFAULT_CONFIG.MS_PER_HOUR;

const formatWeek = (d: Date): string => `W/C ${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`;

const formatReadyDate = (dateStr: string | null): string | null => {
  if (!dateStr) return null;
  const d = parseLocalDate(dateStr);
  if (!d) return null;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
};

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

const getCalculatedStatus = (test: Test, testStartDate: Date | null = null): string => {
  const baseStatus = normalizePartStatus(test.partStatus);

  if (baseStatus === 'Ready') return 'Ready';
  if (baseStatus === 'Parts Not Assigned') return 'Parts Not Assigned';

  if (testStartDate && test.partReadyDate) {
    const readyDate = parseLocalDate(test.partReadyDate);
    const startDate = toMidnight(testStartDate);

    if (readyDate && startDate) {
      if (readyDate.getTime() > startDate.getTime()) {
        return 'Delayed';
      } else {
        return 'On Time';
      }
    }
  }

  return 'In Progress';
};

// ============================================================
// Styling
// ============================================================
const outlineStyles: Record<string, string> = {
  'Ready': '2px solid #22C55E',
  'On Time': '2px dotted #22C55E',
  'Delayed': '2px solid #EF4444',
  'Parts Not Assigned': '2px solid #9CA3AF',
  'In Progress': '1px solid #D1D5DB',
};

const getOutlineStyle = (status: string): string => {
  return outlineStyles[status] || outlineStyles['In Progress'];
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
// Styles (inline for Retool compatibility)
// ============================================================
const styles = {
  container: { display: 'flex', height: '100%', background: '#F9FAFB', overflow: 'hidden', fontFamily: "'DM Sans', sans-serif" },
  sidebar: { width: 320, minWidth: 320, background: '#FFFFFF', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' as const },
  mono: { fontFamily: "'JetBrains Mono', monospace" },
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
    <div style={{
      position: 'absolute', top: -4, left: -4, width: 11, height: 11,
      borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 8px #3B82F680',
    }} />
    <div style={{
      position: 'absolute', bottom: -4, left: -4, width: 11, height: 11,
      borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 8px #3B82F680',
    }} />
  </div>
);

const OutlineKey: FC = () => (
  <div style={{ padding: '12px 16px', borderTop: '1px solid #E5E7EB', background: '#F9FAFB' }}>
    <h3 style={{ ...styles.mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4B5563', marginBottom: 8 }}>Border Key</h3>
    {[
      ['Ready', 'Parts in hand'],
      ['On Time', 'Parts arriving before test'],
      ['Delayed', 'Parts arriving after test starts'],
      ['Parts Not Assigned', 'No parts ordered'],
    ].map(([key]) => (
      <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ width: 24, height: 12, border: outlineStyles[key], borderRadius: 2 }}></div>
        <span style={{ ...styles.mono, fontSize: 10, color: '#6B7280' }}>{key}</span>
      </div>
    ))}
  </div>
);

// ============================================================
// Main Component
// ============================================================
export const TestStandScheduler: FC = () => {
  // Retool state - tests data from Retool
  const [tests, setTests] = Retool.useStateArray({
    name: "tests",
    initialValue: [],
    inspector: "hidden",
    description: "Array of test objects to schedule"
  });

  // Retool state - stands configuration
  const [stands, setStands] = Retool.useStateArray({
    name: "stands",
    initialValue: [
      { id: 'S1', name: 'Test Stand 1', tests: [] },
      { id: 'S2', name: 'Test Stand 2', tests: [] },
      { id: 'S3', name: 'Test Stand 3', tests: [] },
      { id: 'S4', name: 'Test Stand 4', tests: [] },
      { id: 'S5', name: 'Test Stand 5', tests: [] },
      { id: 'S6', name: 'Test Stand 6', tests: [] },
    ],
    inspector: "hidden",
    description: "Array of test stand objects with their scheduled tests"
  });

  // Retool state - viewport weeks
  const [viewportWeeks, setViewportWeeks] = Retool.useStateNumber({
    name: "viewportWeeks",
    initialValue: 4,
    inspector: "segmented",
    enumOptions: [
      { value: 2, label: "2W" },
      { value: 4, label: "4W" },
      { value: 8, label: "8W" },
      { value: 12, label: "12W" },
      { value: 24, label: "24W" },
    ],
    description: "Number of weeks visible in viewport"
  });

  // Retool events
  const onScheduleChange = Retool.useEventCallback({ name: "scheduleChange" });
  const onTestScheduled = Retool.useEventCallback({ name: "testScheduled" });

  // Component settings
  Retool.useComponentSettings({
    defaultHeight: 600,
    defaultWidth: 12,
  });

  // Local state (not exposed to Retool)
  const [draggedTestId, setDraggedTestId] = React.useState<string | null>(null);
  const [insertIndicator, setInsertIndicator] = React.useState<InsertIndicator | null>(null);
  const [queueInsertIndex, setQueueInsertIndex] = React.useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Unallocated tests (from tests prop, not in any stand)
  const unallocated = useMemo(() => {
    const allocatedIds = new Set<string>();
    (stands as Stand[]).forEach(s => s.tests.forEach(t => allocatedIds.add(t.id)));
    return (tests as Test[]).filter(t => !allocatedIds.has(t.id));
  }, [tests, stands]);

  const viewStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    while (d.getDay() !== 1) d.setDate(d.getDate() - 1);
    return d;
  }, []);

  const timelineEnd = useMemo(() => {
    let latestEnd = new Date(viewStart);
    latestEnd.setDate(latestEnd.getDate() + (viewportWeeks as number) * 7);

    (stands as Stand[]).forEach(stand => {
      let currentEnd = new Date(viewStart);
      stand.tests.forEach(test => {
        const testEnd = new Date(currentEnd.getTime() + test.duration * DEFAULT_CONFIG.MS_PER_HOUR);
        currentEnd = calculateChangeoverEnd(testEnd);
      });
      if (currentEnd > latestEnd) {
        latestEnd = currentEnd;
      }
    });

    latestEnd.setDate(latestEnd.getDate() + 7);
    return latestEnd;
  }, [stands, viewStart, viewportWeeks]);

  const totalDays = useMemo(() => Math.ceil(hoursBetween(viewStart, timelineEnd) / 24), [viewStart, timelineEnd]);

  const viewportWidth = 800; // Will be sized by Retool container
  const pxPerHour = viewportWidth / ((viewportWeeks as number) * 7 * 24);

  const days = useMemo(() => generateDays(viewStart, totalDays), [viewStart, totalDays]);
  const weeks = useMemo(() => generateWeeks(viewStart, totalDays), [viewStart, totalDays]);
  const totalWidth = totalDays * 24 * pxPerHour;
  const dayWidth = 24 * pxPerHour;

  const computeSchedule = useCallback((standTests: Test[]): ScheduledTest[] => {
    let lastTestEnd = new Date(viewStart);
    return standTests.map((test) => {
      const start = new Date(lastTestEnd);
      const end = new Date(start.getTime() + test.duration * DEFAULT_CONFIG.MS_PER_HOUR);
      lastTestEnd = calculateChangeoverEnd(end);
      return { ...test, start, end };
    });
  }, [viewStart]);

  const findTest = useCallback((testId: string): Test | null => {
    const q = unallocated.find(t => t.id === testId);
    if (q) return q;
    for (const s of stands as Stand[]) {
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

  const dropOnStand = useCallback((standId: string, index: number) => {
    if (!draggedTestId) return;
    const test = findTest(draggedTestId);
    if (!test) return;

    const newStands = (stands as Stand[]).map(s => {
      // Remove test from this stand if present
      const filtered = s.tests.filter(t => t.id !== draggedTestId);
      if (s.id === standId) {
        // Add test at index
        const newTests = [...filtered];
        newTests.splice(index, 0, test);
        return { ...s, tests: newTests };
      }
      return { ...s, tests: filtered };
    });

    setStands(newStands);
    onScheduleChange();
    onTestScheduled();
    clearDrag();
  }, [draggedTestId, findTest, stands, setStands, onScheduleChange, onTestScheduled, clearDrag]);

  const dropOnQueue = useCallback((index: number) => {
    if (!draggedTestId) return;

    // Remove from all stands
    const newStands = (stands as Stand[]).map(s => ({
      ...s,
      tests: s.tests.filter(t => t.id !== draggedTestId)
    }));

    setStands(newStands);
    onScheduleChange();
    clearDrag();
  }, [draggedTestId, stands, setStands, onScheduleChange, clearDrag]);

  const getBarPos = useCallback((start: Date, duration: number) => ({
    left: Math.max(0, hoursBetween(viewStart, start)) * pxPerHour,
    width: Math.max(duration * pxPerHour, 2),
  }), [viewStart, pxPerHour]);

  const totalAllocated = (stands as Stand[]).reduce((a, s) => a + s.tests.length, 0);
  const totalHours = (stands as Stand[]).reduce((a, s) => a + s.tests.reduce((b, t) => b + t.duration, 0), 0);

  return (
    <div style={styles.container}>
      {/* Queue Sidebar */}
      <div style={styles.sidebar}>
        <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: unallocated.length > 0 ? '#F59E0B' : '#10B981' }} />
            <span style={{ ...styles.mono, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4B5563' }}>Queue</span>
          </div>
          <span style={{ ...styles.mono, fontSize: 11, color: '#6B7280' }}>{unallocated.length} test{unallocated.length !== 1 ? 's' : ''} pending</span>
        </div>

        <div
          style={{ flex: 1, overflowY: 'auto', padding: '8px 10px' }}
          onDragOver={(e) => { e.preventDefault(); if (e.target === e.currentTarget) setQueueInsertIndex(unallocated.length); }}
          onDragLeave={(e) => { if (e.currentTarget === e.target) setQueueInsertIndex(null); }}
          onDrop={(e) => { e.preventDefault(); dropOnQueue(queueInsertIndex ?? unallocated.length); }}
        >
          {unallocated.map((test, idx) => {
            const status = getCalculatedStatus(test, null);
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
                <div
                  draggable
                  onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; setDraggedTestId(test.id); }}
                  onDragEnd={clearDrag}
                  style={{
                    padding: '10px 12px',
                    marginBottom: 6,
                    background: draggedTestId === test.id ? '#F3F4F6' : getPriorityColor(test.priority),
                    border: getOutlineStyle(status),
                    borderRadius: 6,
                    cursor: 'grab',
                    opacity: draggedTestId === test.id ? 0.35 : 1
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#111827', marginBottom: 2 }}>{test.name}</div>
                  {test.partReadyDate && (
                    <div style={{ ...styles.mono, fontSize: 10, color: '#6B7280', marginBottom: 4 }}>
                      Parts ready: {formatReadyDate(test.partReadyDate)}
                    </div>
                  )}
                  <div style={{ ...styles.mono, display: 'flex', gap: 8, fontSize: 10, color: '#4B5563' }}>
                    <span>{test.owner}</span><span>•</span><span>{test.duration}h</span><span>•</span><span>P{test.priority}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {unallocated.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '32px 16px',
              color: '#6B7280',
              fontSize: 12,
              border: draggedTestId ? '2px dashed #3B82F6' : '2px dashed #D1D5DB',
              borderRadius: 8,
              background: draggedTestId ? '#EFF6FF' : 'transparent'
            }}>
              {draggedTestId ? 'Drop to return to queue' : 'All tests allocated'}
            </div>
          )}
        </div>

        <OutlineKey />

        <div style={{ padding: '12px 16px', borderTop: '1px solid #E5E7EB', background: '#F9FAFB' }}>
          <div style={{ ...styles.mono, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#6B7280' }}>
            <span>Allocated: {totalAllocated}</span><span>Total: {totalHours}h</span>
          </div>
        </div>
      </div>

      {/* Main Timeline */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #E5E7EB', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>Test Stand Scheduler</h1>
            <p style={{ ...styles.mono, fontSize: 11, color: '#6B7280', marginTop: 2 }}>
              Continuous testing · {DEFAULT_CONFIG.CHANGEOVER_HOURS}h changeover ({DEFAULT_CONFIG.WORK_START}:00–{DEFAULT_CONFIG.WORK_END}:00 Mon–Fri)
            </p>
          </div>
          <div style={{ display: 'flex', gap: 4, background: '#F3F4F6', borderRadius: 8, padding: 3 }}>
            {[2, 4, 8, 12, 24].map((w) => (
              <button
                key={w}
                onClick={() => setViewportWeeks(w)}
                style={{
                  ...styles.mono,
                  padding: '6px 12px',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 6,
                  border: 'none',
                  cursor: 'pointer',
                  background: viewportWeeks === w ? '#3B82F6' : 'transparent',
                  color: viewportWeeks === w ? '#FFF' : '#4B5563'
                }}
              >
                {w}W
              </button>
            ))}
          </div>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', background: '#F9FAFB' }}>
          <div style={{ minWidth: totalWidth, padding: '0 12px 24px' }}>
            {/* Timeline Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 20, background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', height: 28, position: 'relative', borderBottom: '1px solid #E5E7EB' }}>
                {weeks.map((wk, i) => (
                  <div
                    key={i}
                    style={{
                      ...styles.mono,
                      position: 'absolute',
                      left: hoursBetween(viewStart, wk) * pxPerHour,
                      width: 7 * 24 * pxPerHour,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 8,
                      fontSize: 10,
                      fontWeight: 600,
                      color: '#4B5563',
                      borderLeft: i > 0 ? '1px solid #E5E7EB' : 'none'
                    }}
                  >
                    {formatWeek(wk)}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', height: 24 }}>
                {days.map((d, i) => {
                  const isToday = d.toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={i}
                      style={{
                        ...styles.mono,
                        width: dayWidth,
                        minWidth: dayWidth,
                        fontSize: 9,
                        textAlign: 'center',
                        color: isToday ? '#2563EB' : '#6B7280',
                        fontWeight: isToday ? 700 : 400,
                        lineHeight: '24px',
                        borderLeft: '1px solid #E5E7EB',
                        background: isToday ? '#EFF6FF' : 'transparent'
                      }}
                    >
                      {(viewportWeeks as number) <= 8 ? d.getDate() : (d.getDay() === 1 ? d.getDate() : '')}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Test Stands */}
            {(stands as Stand[]).map((stand) => {
              const schedule = computeSchedule(stand.tests);
              const ind = insertIndicator;
              const showHere = ind && ind.standId === stand.id;

              return (
                <div key={stand.id} style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 2, background: stand.tests.length > 0 ? '#3B82F6' : '#9CA3AF' }} />
                    <span style={{ ...styles.mono, fontSize: 11, fontWeight: 600, color: '#374151' }}>{stand.name}</span>
                    <span style={{ ...styles.mono, fontSize: 10, color: '#6B7280' }}>
                      {stand.tests.length} test{stand.tests.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div
                    onDragOver={(e) => { e.preventDefault(); setInsertIndicator({ standId: stand.id, index: stand.tests.length }); }}
                    onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setInsertIndicator(null); }}
                    onDrop={(e) => { e.preventDefault(); dropOnStand(stand.id, ind?.index ?? stand.tests.length); }}
                    style={{
                      position: 'relative',
                      height: 52,
                      background: (showHere || (draggedTestId && stand.tests.length === 0)) ? '#EFF6FF' : '#FFFFFF',
                      border: `1px solid ${(showHere || (draggedTestId && stand.tests.length === 0)) ? '#BFDBFE' : '#E5E7EB'}`,
                      borderRadius: 8,
                      width: totalWidth,
                    }}
                  >
                    {/* Day grid */}
                    {days.map((_, i) => (
                      <div key={i} style={{ position: 'absolute', left: i * dayWidth, top: 0, bottom: 0, width: 1, background: '#F3F4F6' }} />
                    ))}

                    {/* Now line */}
                    {(() => {
                      const h = hoursBetween(viewStart, new Date());
                      if (h < 0) return null;
                      return (
                        <div style={{ position: 'absolute', left: h * pxPerHour, top: 0, bottom: 0, width: 2, background: '#EF4444', zIndex: 10 }}>
                          <div style={{ position: 'absolute', top: -3, left: -3, width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
                        </div>
                      );
                    })()}

                    {/* Test bars */}
                    {schedule.map((test, idx) => {
                      const { left, width } = getBarPos(test.start, test.duration);
                      const changeoverEnd = calculateChangeoverEnd(test.end);
                      const changeoverWidth = hoursBetween(test.end, changeoverEnd) * pxPerHour;
                      const status = getCalculatedStatus(test, test.start);

                      return (
                        <div key={test.id} style={{ position: 'absolute', left, top: 0, width: width + changeoverWidth, height: '100%' }}>
                          {draggedTestId && draggedTestId !== test.id && (
                            <>
                              <div
                                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setInsertIndicator({ standId: stand.id, index: idx }); }}
                                onDrop={(e) => { e.preventDefault(); e.stopPropagation(); dropOnStand(stand.id, idx); }}
                                style={{ position: 'absolute', left: -6, top: 0, width: '50%', height: '100%', zIndex: 20 }}
                              />
                              <div
                                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setInsertIndicator({ standId: stand.id, index: idx + 1 }); }}
                                onDrop={(e) => { e.preventDefault(); e.stopPropagation(); dropOnStand(stand.id, idx + 1); }}
                                style={{ position: 'absolute', right: -6, top: 0, width: '50%', height: '100%', zIndex: 20 }}
                              />
                            </>
                          )}

                          {showHere && ind.index === idx && (
                            <div style={{ position: 'absolute', left: -4, top: 0, bottom: 0 }}><InsertLine /></div>
                          )}

                          <div
                            draggable
                            onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; setDraggedTestId(test.id); }}
                            onDragEnd={clearDrag}
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: 6,
                              width,
                              height: 40,
                              background: getPriorityColor(test.priority),
                              borderRadius: 6,
                              cursor: 'grab',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '0 8px',
                              overflow: 'hidden',
                              opacity: draggedTestId === test.id ? 0.25 : 1,
                              zIndex: 15,
                              border: getOutlineStyle(status)
                            }}
                          >
                            <span style={{ fontSize: 10, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                              {test.name}
                            </span>
                            {test.partReadyDate && width > 80 && (
                              <span style={{ ...styles.mono, fontSize: 8, color: '#6B7280', marginTop: 2 }}>
                                {formatReadyDate(test.partReadyDate)}
                              </span>
                            )}
                          </div>

                          {changeoverWidth > 0 && (
                            <div style={{ position: 'absolute', left: width, top: 18, width: changeoverWidth, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div style={{ height: 1, width: '80%', background: 'repeating-linear-gradient(90deg, #9CA3AF 0, #9CA3AF 4px, transparent 4px, transparent 8px)' }} />
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {showHere && ind.index === stand.tests.length && schedule.length > 0 && (() => {
                      const last = schedule[schedule.length - 1];
                      const { left, width } = getBarPos(last.start, last.duration);
                      const changeoverWidth = hoursBetween(last.end, calculateChangeoverEnd(last.end)) * pxPerHour;
                      return <div style={{ position: 'absolute', left: left + width + changeoverWidth + 8, top: 0, bottom: 0 }}><InsertLine /></div>;
                    })()}

                    {stand.tests.length === 0 && (
                      <div style={{
                        ...styles.mono,
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        color: draggedTestId ? '#3B82F6' : '#9CA3AF',
                        fontWeight: draggedTestId ? 600 : 400
                      }}>
                        {draggedTestId ? 'Drop here to schedule' : 'Drop tests here to schedule'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
