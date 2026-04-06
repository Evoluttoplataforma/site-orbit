'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Loader2, Users, AlertTriangle } from 'lucide-react';
import { supabaseMkt } from '@/lib/supabase-mkt';

interface CalendarPickerProps {
  onSelect: (date: string, time: string) => void;
}

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const HOLIDAYS_2026: Record<string, string> = {
  '2026-01-01': 'Confraternização Universal',
  '2026-04-03': 'Sexta-feira Santa',
  '2026-04-21': 'Tiradentes',
  '2026-05-01': 'Dia do Trabalho',
  '2026-09-07': 'Independência do Brasil',
  '2026-10-12': 'Nossa Sra. Aparecida',
  '2026-11-02': 'Finados',
  '2026-11-15': 'Proclamação da República',
  '2026-11-20': 'Consciência Negra',
  '2026-12-25': 'Natal',
};

const MAX_VAGAS = 8;
const SLOT_TIME = '14:00';

function isHoliday(year: number, month: number, day: number): string | null {
  const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return HOLIDAYS_2026[key] || null;
}

function getScarcityColor(remaining: number) {
  if (remaining <= 2) return 'text-destructive font-bold';
  if (remaining <= 4) return 'text-orange-500 font-semibold';
  return 'text-muted-foreground';
}
function getScarcityBorder(remaining: number) {
  if (remaining <= 2) return 'border-destructive/50 bg-destructive/5';
  if (remaining <= 4) return 'border-orange-400/50';
  return '';
}

export default function CalendarPicker({ onSelect }: CalendarPickerProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const getInitialDay = () => {
    const d = today.getDay();
    if (d === 0 || d === 6) return null;
    const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    if (HOLIDAYS_2026[key]) return null;
    return today.getDate();
  };

  const [selectedDay, setSelectedDay] = useState<number | null>(getInitialDay);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slotCount, setSlotCount] = useState(0);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const timeSlotsRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const weekdayNames = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];

  const daysInMonth = useMemo(() => new Date(currentYear, currentMonth + 1, 0).getDate(), [currentMonth, currentYear]);
  const firstDayOfMonth = useMemo(() => new Date(currentYear, currentMonth, 1).getDay(), [currentMonth, currentYear]);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
    setSelectedDay(null); setSelectedTime(null);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
    setSelectedDay(null); setSelectedTime(null);
  };

  const isToday = (day: number) => day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };
  const isWeekend = (day: number) => {
    const d = new Date(currentYear, currentMonth, day).getDay();
    return d === 0 || d === 6;
  };

  const now = new Date();
  const nowStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const todayWeekday = weekdayNames[now.getDay()];

  const isTimePast = (time: string) => {
    if (!selectedDay) return false;
    const selected = new Date(currentYear, currentMonth, selectedDay);
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (selected.getTime() !== todayDate.getTime()) return false;
    const [h, m] = time.split(':').map(Number);
    const now2 = new Date();
    return h < now2.getHours() || (h === now2.getHours() && m <= now2.getMinutes());
  };

  // Fetch occupancy via RPC when day changes
  useEffect(() => {
    if (!selectedDay) return;
    const dateStr = `${selectedDay}/${currentMonth + 1}/${currentYear}`;
    setLoadingSlots(true);
    supabaseMkt.rpc('get_slot_occupancy', { p_date: dateStr })
      .then(({ data, error }) => {
        if (error) {
          console.warn('Slot occupancy fetch failed:', error);
          setSlotCount(0);
        } else {
          const row = (data || []).find((r: { horario: string; count: number }) => r.horario === SLOT_TIME);
          setSlotCount(row ? Number(row.count) : 0);
        }
        setLoadingSlots(false);
      });
  }, [selectedDay, currentMonth, currentYear]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setIsSubmitting(true);
    setTimeout(() => loadingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    if (selectedDay) {
      const dateStr = `${selectedDay}/${currentMonth + 1}/${currentYear}`;
      setTimeout(() => onSelect(dateStr, time), 1500);
    }
  };

  const remaining = MAX_VAGAS - slotCount;
  const full = remaining <= 0;
  const past = isTimePast(SLOT_TIME);
  const disabled = past || full;

  // Tokens
  const T = {
    bg: '#0d1117',
    border: 'rgba(255,255,255,0.1)',
    text: '#e6edf3',
    textMuted: '#8b949e',
    textDim: 'rgba(139,148,158,0.4)',
    primary: '#ffba1a',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fade-in-up 0.4s ease-out' }}>
      {/* "Agenda hoje" pill */}
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '14px',
          padding: '14px 18px',
          border: `1px solid ${T.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '18px' }}>📅</span>
          <span style={{ fontWeight: 700, color: T.text, fontSize: '15px' }}>Agenda hoje</span>
        </div>
        <p style={{ color: T.textMuted, fontSize: '13px', margin: 0 }}>Para sua demonstração gratuita</p>
      </div>

      {/* Hoje é ... pill */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '999px',
            padding: '8px 16px',
            fontSize: '13px',
            color: T.textMuted,
            border: `1px solid ${T.border}`,
          }}
        >
          <MapPin size={13} />
          Hoje é {todayWeekday}, {nowStr}
        </div>
      </div>

      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <button
          onClick={prevMonth}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: `1px solid ${T.border}`,
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: T.text,
          }}
        >
          <ChevronLeft size={16} />
        </button>
        <h3 style={{ fontWeight: 600, fontSize: '17px', color: T.text, margin: 0 }}>
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <button
          onClick={nextMonth}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: `1px solid ${T.border}`,
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: T.text,
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Calendar grid */}
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
          {WEEKDAYS.map((d, i) => (
            <div key={i} style={{ textAlign: 'center', fontSize: '12px', color: T.textMuted, fontWeight: 500, padding: '6px 0' }}>
              {d}
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dPast = isPast(day);
            const weekend = isWeekend(day);
            const holidayName = isHoliday(currentYear, currentMonth, day);
            const beyondLimit = (() => {
              const d = new Date(currentYear, currentMonth, day);
              const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const daysUntilNextSunday = (7 - todayDate.getDay()) + 7;
              const limit = new Date(todayDate);
              limit.setDate(limit.getDate() + daysUntilNextSunday);
              return d > limit;
            })();
            const isDisabled = dPast || weekend || beyondLimit || !!holidayName;
            const selected = selectedDay === day;

            const dayStyle: React.CSSProperties = {
              height: '44px',
              width: '100%',
              borderRadius: '999px',
              border: 'none',
              fontSize: '14px',
              fontFamily: 'inherit',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
              position: 'relative',
              background: selected ? '#ffffff' : 'transparent',
              color: selected ? '#0d1117' : isDisabled ? T.textDim : T.textMuted,
              fontWeight: selected ? 700 : 400,
            };

            return (
              <button
                key={day}
                disabled={isDisabled}
                title={holidayName || undefined}
                onClick={() => {
                  setSelectedDay(day);
                  setSelectedTime(null);
                  setTimeout(() => timeSlotsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 300);
                }}
                style={dayStyle}
                onMouseEnter={(e) => {
                  if (!isDisabled && !selected) e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                }}
                onMouseLeave={(e) => {
                  if (!selected) e.currentTarget.style.background = 'transparent';
                }}
              >
                {day}
                {holidayName && !dPast && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#f85149',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDay && (
        <div ref={timeSlotsRef} style={{ animation: 'fade-in-up 0.4s ease-out' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 500, color: T.textMuted, marginBottom: '12px', margin: '0 0 12px' }}>
            Horários para {selectedDay} de {monthNames[currentMonth].toLowerCase()}
          </h4>
          {loadingSlots ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
              <Loader2 size={20} style={{ animation: 'spin 1s linear infinite', color: T.textMuted }} />
            </div>
          ) : (
            <button
              disabled={disabled}
              onClick={() => handleTimeSelect(SLOT_TIME)}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '14px',
                border: `1px solid ${
                  disabled
                    ? T.border
                    : selectedTime === SLOT_TIME
                    ? T.primary
                    : remaining <= 2
                    ? 'rgba(248,81,73,0.5)'
                    : remaining <= 4
                    ? 'rgba(251,146,60,0.5)'
                    : T.border
                }`,
                background: selectedTime === SLOT_TIME ? 'rgba(255,186,26,0.1)' : 'rgba(255,255,255,0.04)',
                fontFamily: 'inherit',
                fontSize: '14px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ color: disabled ? T.textDim : selectedTime === SLOT_TIME ? T.primary : T.text, fontWeight: 500 }}>
                {SLOT_TIME}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {full ? (
                  <span style={{ fontSize: '12px', color: T.textDim }}>Esgotado</span>
                ) : (
                  <>
                    {remaining <= 4 && <AlertTriangle size={12} color="#fb923c" />}
                    <Users size={12} color={T.textMuted} />
                    <span
                      style={{
                        fontSize: '12px',
                        color: remaining <= 2 ? '#f85149' : remaining <= 4 ? '#fb923c' : T.textMuted,
                        fontWeight: remaining <= 4 ? 600 : 400,
                      }}
                    >
                      {remaining === 1 ? 'Última vaga!' : `${remaining} vagas`}
                    </span>
                  </>
                )}
              </div>
            </button>
          )}
        </div>
      )}
      {isSubmitting && (
        <div ref={loadingRef} className="animate-fade-in-up flex flex-col items-center gap-3 py-6">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm font-medium text-foreground">Agendando sua demonstração...</p>
          <p className="text-xs text-muted-foreground">Só um instante, estamos confirmando tudo para você!</p>
        </div>
      )}
    </div>
  );
}
