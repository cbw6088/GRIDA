"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import {
  submitQuoteRequest,
  type QuoteFormState,
} from "@/app/contact/actions";
import {
  formatScheduleLabel,
  isSelectableSchedule,
  monthDayIsos,
  monthLabel,
  monthStartIso,
  seoulTodayIso,
  shiftDays,
  shiftMonth,
  weekdayLabels,
} from "@/lib/quote-schedule";

const initialQuoteFormState: QuoteFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

const fieldClassName =
  "mt-2 w-full border border-line bg-white px-3 text-sm text-foreground outline-none transition-colors duration-300 focus:border-foreground";

const wallpaperOptions = ["합지", "실크", "합지+실크", "상담 후 결정"] as const;

export function QuoteRequestForm() {
  const [state, formAction, pending] = useActionState(
    submitQuoteRequest,
    initialQuoteFormState,
  );
  const successRef = useRef<HTMLHeadingElement>(null);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    space: "",
    scope: "",
    schedule: "",
    location: "",
    note: "",
    wallpaper: "",
  });

  function update(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  useEffect(() => {
    if (state.status !== "success") return;
    successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="border border-line bg-white px-6 py-10 sm:px-8">
        <p className="text-sm tracking-[0.22em] text-muted">접수 완료</p>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-4 text-2xl font-medium tracking-tight text-foreground outline-none"
        >
          견적 요청이 접수되었습니다
        </h3>
        <p className="mt-4 text-pretty break-keep leading-7 text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="relative border border-line bg-white px-5 py-6 sm:px-8 sm:py-8">
      <div className="sr-only" aria-hidden="true">
        <label>
          웹사이트
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="quote-name"
          name="name"
          label="이름"
          autoComplete="name"
          maxLength={40}
          required
          value={values.name}
          onChange={update}
          error={state.fieldErrors.name}
        />
        <TextField
          id="quote-phone"
          name="phone"
          label="연락처"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="010 0000 0000"
          maxLength={20}
          required
          value={values.phone}
          onChange={update}
          error={state.fieldErrors.phone}
        />
        <TextField
          id="quote-space"
          name="space"
          label="시공 공간"
          placeholder="예: 아파트, 오피스텔, 상가"
          maxLength={80}
          required
          value={values.space}
          onChange={update}
          error={state.fieldErrors.space}
        />
        <TextField
          id="quote-scope"
          name="scope"
          label="평수"
          placeholder="예: 24평"
          maxLength={80}
          value={values.scope}
          onChange={update}
          error={state.fieldErrors.scope}
        />
        <ScheduleField
          id="quote-schedule"
          value={values.schedule}
          onChange={(schedule) =>
            setValues((current) => ({ ...current, schedule }))
          }
          error={state.fieldErrors.schedule}
        />
        <TextField
          id="quote-location"
          name="location"
          label="위치"
          placeholder="예: 서울시 강남구"
          maxLength={40}
          value={values.location}
          onChange={update}
          error={state.fieldErrors.location}
        />
        <fieldset className="sm:col-span-2">
          <legend className="text-sm text-foreground">관심 벽지</legend>
          <input type="hidden" name="wallpaper" value={values.wallpaper} />
          <div className="mt-2 flex flex-wrap gap-2 sm:flex-nowrap">
            {wallpaperOptions.map((option) => {
              const selected = values.wallpaper === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected}
                  onClick={() =>
                    setValues((current) => ({ ...current, wallpaper: option }))
                  }
                  className={`inline-flex h-11 items-center border px-3 text-sm ${
                    selected
                      ? "border-foreground bg-foreground text-white"
                      : "border-line text-foreground"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>
        <TextField
          id="quote-note"
          name="note"
          label="추가로 남길 내용"
          multiline
          maxLength={1000}
          className="sm:col-span-2"
          value={values.note}
          onChange={update}
          error={state.fieldErrors.note}
        />
      </div>

      {state.status === "error" ? (
        <p role="alert" className="mt-5 text-sm text-[#8d3b32]">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex h-11 items-center bg-foreground px-5 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-85 disabled:translate-y-0 disabled:opacity-60"
      >
        {pending ? "보내는 중" : "견적 요청"}
      </button>
    </form>
  );
}

function ScheduleField({
  id,
  value,
  onChange,
  error,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const today = seoulTodayIso();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() =>
    monthStartIso(value || today),
  );
  const errorId = `${id}-error`;
  const calendarId = `${id}-calendar`;
  const earliestMonth = monthStartIso(today);
  const latestMonth = monthStartIso(shiftMonth(today, 24));

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function openCalendar() {
    setVisibleMonth(monthStartIso(value || today));
    setOpen(true);
  }

  function selectDate(iso: string) {
    onChange(iso);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function moveFocus(iso: string, amount: number) {
    const next = shiftDays(iso, amount);
    if (!isSelectableSchedule(next, today)) return;
    setVisibleMonth(monthStartIso(next));
    window.requestAnimationFrame(() => {
      rootRef.current
        ?.querySelector<HTMLButtonElement>(`[data-date="${next}"]`)
        ?.focus();
    });
  }

  function onDayKeyDown(event: KeyboardEvent<HTMLButtonElement>, iso: string) {
    const amount =
      event.key === "ArrowLeft"
        ? -1
        : event.key === "ArrowRight"
          ? 1
          : event.key === "ArrowUp"
            ? -7
            : event.key === "ArrowDown"
              ? 7
              : 0;
    if (!amount) return;
    event.preventDefault();
    moveFocus(iso, amount);
  }

  return (
    <div ref={rootRef} className={`relative ${open ? "z-20" : ""}`}>
      <label htmlFor={id} className="text-sm text-foreground">
        희망 일정
      </label>
      <input type="hidden" name="schedule" value={value} />
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={calendarId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onClick={() => (open ? setOpen(false) : openCalendar())}
        className={`mt-2 flex h-11 w-full items-center justify-between border bg-white px-3 text-left text-sm outline-none transition-colors duration-300 focus:border-foreground ${
          open ? "border-foreground" : "border-line"
        } ${value ? "text-foreground" : "text-muted"}`}
      >
        <span>{value ? formatScheduleLabel(value) : "날짜를 선택해 주세요"}</span>
        <CalendarIcon />
      </button>
      {open ? (
        <div
          id={calendarId}
          role="dialog"
          aria-label="희망 일정"
          className="absolute left-0 right-0 z-30 mt-2 border border-line bg-white p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              aria-label="이전 달"
              disabled={visibleMonth <= earliestMonth}
              onClick={() => setVisibleMonth((month) => shiftMonth(month, -1))}
              className="flex h-8 w-8 items-center justify-center border border-line text-foreground disabled:opacity-30"
            >
              <Chevron direction="left" />
            </button>
            <p className="text-sm text-foreground">{monthLabel(visibleMonth)}</p>
            <button
              type="button"
              aria-label="다음 달"
              disabled={visibleMonth >= latestMonth}
              onClick={() => setVisibleMonth((month) => shiftMonth(month, 1))}
              className="flex h-8 w-8 items-center justify-center border border-line text-foreground disabled:opacity-30"
            >
              <Chevron direction="right" />
            </button>
          </div>
          <div className="grid grid-cols-7">
            {weekdayLabels.map((label) => (
              <div key={label} className="py-1 text-center text-xs text-muted">
                {label}
              </div>
            ))}
            {monthDayIsos(visibleMonth).map((iso, index) =>
              iso ? (
                <button
                  key={iso}
                  type="button"
                  data-date={iso}
                  disabled={!isSelectableSchedule(iso, today)}
                  aria-pressed={iso === value}
                  aria-label={formatScheduleLabel(iso)}
                  onClick={() => selectDate(iso)}
                  onKeyDown={(event) => onDayKeyDown(event, iso)}
                  className={`flex h-9 items-center justify-center border text-sm disabled:cursor-default disabled:border-transparent disabled:text-muted disabled:opacity-35 ${
                    iso === value
                      ? "border-foreground bg-foreground text-white"
                      : iso === today
                        ? "border-foreground text-foreground"
                        : "border-transparent text-foreground enabled:hover:bg-soft"
                  }`}
                >
                  {Number(iso.slice(8))}
                </button>
              ) : (
                <span key={`empty-${index}`} />
              ),
            )}
          </div>
          {value ? (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="mt-2 h-8 w-full text-sm text-muted"
            >
              날짜 지우기
            </button>
          ) : null}
        </div>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-[#8d3b32]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="shrink-0 text-muted"
    >
      <rect x="1.75" y="2.75" width="12.5" height="11.5" fill="none" stroke="currentColor" />
      <path d="M1.75 6.25h12.5M5 1.5v2.5M11 1.5v2.5" fill="none" stroke="currentColor" />
    </svg>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d={direction === "left" ? "M10 3.5 5.5 8 10 12.5" : "M6 3.5 10.5 8 6 12.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  error?: string;
  className?: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  type?: string;
  inputMode?: "tel" | "text";
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function TextField({
  id,
  name,
  label,
  error,
  className,
  multiline = false,
  ...props
}: FieldProps) {
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : undefined;
  const control = multiline ? (
    <textarea
      id={id}
      name={name}
      rows={5}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      placeholder={props.placeholder}
      maxLength={props.maxLength}
      required={props.required}
      autoComplete={props.autoComplete}
      value={props.value}
      onChange={props.onChange}
      className={`${fieldClassName} py-3 leading-6`}
    />
  ) : (
    <input
      id={id}
      name={name}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      className={`${fieldClassName} h-11`}
      {...props}
    />
  );

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm text-foreground">
        {label}
      </label>
      {control}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-[#8d3b32]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
