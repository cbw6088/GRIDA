const font =
  "'IBM Plex Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif";

export type QuoteEmailInput = {
  name: string;
  phone: string;
  space: string;
  scope: string;
  roomCount: string;
  existingWallpaper: string;
  scheduleLabel: string;
  location: string;
  wallpaper: string;
  note: string;
  receivedAt: Date;
};

type QuoteRow = {
  label: string;
  hint?: string;
  value: string;
};

type QuoteEmailContent = Omit<QuoteEmailInput, "receivedAt"> & {
  receivedAt: string;
  rows: QuoteRow[];
};

export function buildQuoteEmail(input: QuoteEmailInput) {
  const phone = displayPhone(input.phone);
  const receivedAt = formatReceivedAt(input.receivedAt);
  const place = input.location || input.space;
  const rows: QuoteRow[] = [
    { label: "시공 공간", value: input.space },
    { label: "평수", value: input.scope },
    { label: "방 개수", hint: "주방 및 거실 제외", value: input.roomCount },
    { label: "기존 벽지", value: input.existingWallpaper },
    { label: "희망 일정", value: input.scheduleLabel },
    { label: "위치", value: input.location },
    { label: "관심 벽지", value: input.wallpaper },
  ];

  return {
    subject: `견적 요청 · ${input.name} · ${place}`,
    text: plainText({ ...input, phone, receivedAt, rows }),
    html: htmlEmail({ ...input, phone, receivedAt, rows }),
  };
}

function plainText(input: QuoteEmailContent) {
  const fields = input.rows
    .map((row) => {
      const label = row.hint ? `${row.label} (${row.hint})` : row.label;
      return `${label}\n${row.value || "미입력"}`;
    })
    .join("\n\n");

  return [
    "견적 요청이 도착했습니다.",
    `접수 ${input.receivedAt}`,
    "",
    "[연락]",
    `이름\n${input.name}`,
    "",
    `연락처\n${input.phone}`,
    "",
    "[시공]",
    fields,
    "",
    "[추가 내용]",
    input.note || "없음",
  ].join("\n");
}

function htmlEmail(input: QuoteEmailContent) {
  const tel = input.phone.replace(/\D/g, "");
  const rows = input.rows.map(renderRow).join("");
  const note = input.note
    ? `<div style="margin:0;font-size:15px;line-height:24px;color:#111111;">${htmlMultiline(input.note)}</div>`
    : `<div style="margin:0;font-size:15px;line-height:24px;color:#737373;">없음</div>`;

  return `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>견적 요청</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f4;">
    <div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(input.name)} · ${escapeHtml(input.phone)} · ${escapeHtml(input.space)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e8e8e8;">
            <tr>
              <td style="height:2px;background:#111111;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px 28px 0;font-family:${font};">
                <p style="margin:0;font-size:12px;letter-spacing:0.18em;color:#737373;">그리다, 공간</p>
                <h1 style="margin:14px 0 0;font-size:24px;font-weight:500;line-height:32px;color:#111111;">견적 요청</h1>
                <p style="margin:8px 0 0;font-size:13px;line-height:20px;color:#737373;">접수 ${escapeHtml(input.receivedAt)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 0;font-family:${font};">
                <p style="margin:0;font-size:12px;letter-spacing:0.12em;color:#737373;">연락</p>
                <p style="margin:10px 0 0;font-size:22px;font-weight:500;line-height:30px;color:#111111;">${escapeHtml(input.name)}</p>
                <p style="margin:6px 0 0;font-size:16px;line-height:24px;color:#111111;">
                  <a href="tel:${tel}" style="color:#111111;text-decoration:none;">${escapeHtml(input.phone)}</a>
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                  <tr>
                    <td style="background:#111111;">
                      <a href="tel:${tel}" style="display:inline-block;padding:11px 16px;font-family:${font};font-size:14px;line-height:20px;color:#ffffff;text-decoration:none;">전화하기</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 28px 0;font-family:${font};">
                <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.12em;color:#737373;">시공</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 32px;font-family:${font};">
                <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.12em;color:#737373;">추가 내용</p>
                ${note}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderRow(row: QuoteRow) {
  const empty = row.value.length === 0;
  const hint = row.hint
    ? `<div style="margin-top:2px;font-size:11px;line-height:16px;color:#737373;">${escapeHtml(row.hint)}</div>`
    : "";

  return `<tr>
    <td style="width:132px;padding:14px 12px 14px 0;border-top:1px solid #e8e8e8;vertical-align:top;font-size:13px;line-height:20px;color:#737373;">${escapeHtml(row.label)}${hint}</td>
    <td style="padding:14px 0;border-top:1px solid #e8e8e8;vertical-align:top;font-size:15px;line-height:22px;color:${empty ? "#737373" : "#111111"};">${empty ? "미입력" : escapeHtml(row.value)}</td>
  </tr>`;
}

function displayPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (/^01\d{9}$/.test(digits)) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }
  return value;
}

function formatReceivedAt(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function htmlMultiline(value: string) {
  return escapeHtml(value).replaceAll("\n", "<br>");
}
