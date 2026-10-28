"use server";

import {
  formatScheduleLabel,
  isSelectableSchedule,
} from "@/lib/quote-schedule";
import { siteConfig } from "@/lib/site";

const wallpaperOptions = ["합지", "실크", "합지+실크", "상담 후 결정"] as const;

type WallpaperOption = (typeof wallpaperOptions)[number];

type QuoteField =
  | "name"
  | "phone"
  | "space"
  | "scope"
  | "schedule"
  | "location"
  | "note";

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<QuoteField, string>>;
};

const successState: QuoteFormState = {
  status: "success",
  message: "견적 요청이 접수되었습니다. 확인 후 연락드리겠습니다.",
  fieldErrors: {},
};

const sendErrorState: QuoteFormState = {
  status: "error",
  message: "요청을 보내지 못했습니다. 잠시 후 다시 시도해 주세요.",
  fieldErrors: {},
};

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function isPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^0\d{8,10}$/.test(digits);
}

function isWallpaper(value: string): value is WallpaperOption {
  return wallpaperOptions.some((option) => option === value);
}

export async function submitQuoteRequest(
  _prev: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  if (readText(formData, "company_website")) {
    return successState;
  }

  const name = oneLine(readText(formData, "name"));
  const phone = oneLine(readText(formData, "phone"));
  const space = oneLine(readText(formData, "space"));
  const scope = oneLine(readText(formData, "scope"));
  const schedule = oneLine(readText(formData, "schedule"));
  const location = oneLine(readText(formData, "location"));
  const wallpaper = readText(formData, "wallpaper");
  const note = readText(formData, "note");

  const fieldErrors: QuoteFormState["fieldErrors"] = {};

  if (!name || name.length > 40) {
    fieldErrors.name = "이름을 40자 안으로 입력해 주세요.";
  }
  if (!isPhone(phone)) {
    fieldErrors.phone = "연락 가능한 전화번호를 입력해 주세요.";
  }
  if (!space || space.length > 80) {
    fieldErrors.space = "시공 공간을 80자 안으로 입력해 주세요.";
  }
  if (scope.length > 80) {
    fieldErrors.scope = "평수는 80자 안으로 입력해 주세요.";
  }
  if (schedule && !isSelectableSchedule(schedule)) {
    fieldErrors.schedule = "오늘부터 2년 이내의 날짜를 선택해 주세요.";
  }
  if (location.length > 40) {
    fieldErrors.location = "위치는 시, 구만 40자 안으로 입력해 주세요.";
  }
  if (note.length > 1000) {
    fieldErrors.note = "내용은 1000자 안으로 입력해 주세요.";
  }
  if (wallpaper && !isWallpaper(wallpaper)) {
    return {
      status: "error",
      message: "벽지 선택을 다시 확인해 주세요.",
      fieldErrors: {},
    };
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "입력 내용을 다시 확인해 주세요.",
      fieldErrors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return sendErrorState;
  }

  const from = process.env.QUOTE_FROM_EMAIL ?? "Grida <onboarding@resend.dev>";
  const text = [
    "견적 요청이 도착했습니다.",
    "",
    `이름: ${name}`,
    `연락처: ${phone}`,
    `시공 공간: ${space}`,
    `평수: ${scope || "미입력"}`,
    `희망 일정: ${schedule ? formatScheduleLabel(schedule) : "미입력"}`,
    `위치: ${location || "미입력"}`,
    `벽지: ${wallpaper || "미입력"}`,
    `추가 내용: ${note || "미입력"}`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [siteConfig.contact.email],
        subject: `견적 요청 · ${name}`,
        text,
      }),
    });

    if (!response.ok) {
      console.error("Resend error", response.status, await response.text());
      return sendErrorState;
    }
  } catch (error) {
    console.error("Resend request failed", error);
    return sendErrorState;
  }

  return successState;
}
