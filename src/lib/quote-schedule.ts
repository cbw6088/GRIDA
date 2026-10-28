const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"] as const;

type DateParts = {
  year: number;
  month: number;
  day: number;
  weekday: number;
};

function toIso(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parts(iso: string): DateParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return { year, month, day, weekday: date.getUTCDay() };
}

export function seoulTodayIso() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function maxScheduleIso(today = seoulTodayIso()) {
  const parsed = parts(today);
  if (!parsed) return today;

  const target = new Date(Date.UTC(parsed.year + 2, parsed.month - 1, 1));
  const lastDay = new Date(
    Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0),
  ).getUTCDate();

  return toIso(
    target.getUTCFullYear(),
    target.getUTCMonth() + 1,
    Math.min(parsed.day, lastDay),
  );
}

export function isSelectableSchedule(iso: string, today = seoulTodayIso()) {
  if (!parts(iso)) return false;
  return iso >= today && iso <= maxScheduleIso(today);
}

export function formatScheduleLabel(iso: string) {
  const parsed = parts(iso);
  if (!parsed) return iso;
  return `${parsed.year}년 ${parsed.month}월 ${parsed.day}일 (${weekdayLabels[parsed.weekday]})`;
}

export function monthStartIso(iso: string) {
  const parsed = parts(iso);
  if (!parsed) return iso;
  return toIso(parsed.year, parsed.month, 1);
}

export function shiftMonth(iso: string, amount: number) {
  const parsed = parts(monthStartIso(iso));
  if (!parsed) return iso;
  const date = new Date(Date.UTC(parsed.year, parsed.month - 1 + amount, 1));
  return toIso(date.getUTCFullYear(), date.getUTCMonth() + 1, 1);
}

export function shiftDays(iso: string, amount: number) {
  const parsed = parts(iso);
  if (!parsed) return iso;
  const date = new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day + amount));
  return toIso(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}

export function monthLabel(iso: string) {
  const parsed = parts(monthStartIso(iso));
  if (!parsed) return iso;
  return `${parsed.year}년 ${parsed.month}월`;
}

export function monthDayIsos(iso: string) {
  const parsed = parts(monthStartIso(iso));
  if (!parsed) return [];

  const leading = new Date(Date.UTC(parsed.year, parsed.month - 1, 1)).getUTCDay();
  const count = new Date(Date.UTC(parsed.year, parsed.month, 0)).getUTCDate();
  const cells: Array<string | null> = Array.from({ length: leading }, () => null);

  for (let day = 1; day <= count; day += 1) {
    cells.push(toIso(parsed.year, parsed.month, day));
  }

  return cells;
}

export { weekdayLabels };
