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

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="bg-secondary rounded-xl p-4 border border-border">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">📅</span>
          <span className="font-bold text-foreground">Agenda hoje</span>
        </div>
        <p className="text-muted-foreground text-sm">Para sua demonstração gratuita</p>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2 text-sm text-muted-foreground border border-border">
          <MapPin className="w-3.5 h-3.5" />
          Hoje é {todayWeekday}, {nowStr}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="font-semibold text-lg text-foreground">{monthNames[currentMonth]} {currentYear}</h3>
        <button onClick={nextMonth} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="border border-border rounded-xl p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map((d, i) => (
            <div key={i} className="text-center text-xs text-muted-foreground font-medium py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
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
            const todayDay = isToday(day);
            return (
              <button
                key={day}
                disabled={isDisabled}
                title={holidayName || undefined}
                onClick={() => { setSelectedDay(day); setSelectedTime(null); setTimeout(() => timeSlotsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 300); }}
                className={`h-10 w-full rounded-full text-sm transition-all duration-200 relative ${
                  selected ? 'bg-foreground text-background font-bold'
                  : todayDay ? 'bg-muted text-foreground font-medium'
                  : isDisabled ? 'text-muted-foreground/30 cursor-not-allowed'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {day}
                {holidayName && !dPast && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-destructive" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDay && (
        <div ref={timeSlotsRef} className="animate-fade-in-up">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Horários para {selectedDay} de {monthNames[currentMonth].toLowerCase()}
          </h4>
          {loadingSlots ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                disabled={disabled}
                onClick={() => handleTimeSelect(SLOT_TIME)}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  disabled ? 'border-border bg-secondary text-muted-foreground/30 cursor-not-allowed'
                  : selectedTime === SLOT_TIME ? 'border-primary bg-primary/10 text-primary'
                  : `border-border bg-secondary text-foreground hover:border-primary/50 ${getScarcityBorder(remaining)}`
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{SLOT_TIME}</span>
                  <div className="flex items-center gap-2">
                    {full ? (
                      <span className="text-xs text-muted-foreground/50">Esgotado</span>
                    ) : (
                      <div className="flex items-center gap-1">
                        {remaining <= 4 && <AlertTriangle className="w-3 h-3 text-orange-500" />}
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span className={`text-xs ${getScarcityColor(remaining)}`}>
                          {remaining === 1 ? 'Última vaga!' : `${remaining} vagas`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {slotCount > 0 && !full && (
                  <div className="text-[10px] text-muted-foreground mt-1 text-right">
                    {slotCount} {slotCount === 1 ? 'inscrito' : 'inscritos'}
                  </div>
                )}
              </button>
            </div>
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
