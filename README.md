# 그리다, 공간

도배 시공 브랜드 **그리다, 공간** 웹사이트입니다.

> 공간을 그리고, 벽을 완성하다.

## 기술 스택

- [Next.js](https://nextjs.org/) 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- IBM Plex Sans KR

## 시작하기

```bash
npm install
npm run dev
```

```bash
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행
npm run lint    # ESLint
```

## 페이지 구성

| 경로 | 메뉴 | 설명 |
|------|------|------|
| `/` | 홈 | 히어로, 소개 요약, 시공 미리보기, 문의 CTA |
| `/introduction` | 소개 | 브랜드 이야기, 시공 가치, 진행 절차 |
| `/wallpaper` | 도배지 안내 | 합지·실크 등 고객용 벽지 안내 |
| `/portfolio` | 포트폴리오 | 시공 사례 (플레이스홀더) |
| `/contact` | 연락하기 | 전화·메일·시공 지역, 문의 안내 |

## 디자인 방향

- 기본 배경: 흰색
- 포인트 컬러: 채도 낮은 sage / clay / slate / sand
- 히어로·섹션에 부드러운 도형 모션 (위치·크기 위주, 투명도 깜빡임 없음)
- 상단 가로 내비 + 푸터
- 앵커 이동 시 `scroll-behavior: smooth`

## 브랜드·연락처

설정 파일: `src/lib/site.ts`

| 항목 | 내용 |
|------|------|
| 상호 | 그리다, 공간 |
| 전화 | 010 4186 6088 |
| 메일 | cbw60881@gmail.com |
| 시공 지역 | 서울 / 경기 |

## 로고·에셋

| 파일 | 용도 |
|------|------|
| `public/brand/logo-d-mark.png` | D 마크 (투명 배경) |
| `public/brand/logo-horizontal.png` | 가로형 로고 (탑바) |
| `src/app/icon.png` | 파비콘 |
| `src/app/apple-icon.png` | Apple 터치 아이콘 |
| `public/wallpapers/` | 도배지 안내 페이지 이미지 |

## 폴더 구조

```
src/
  app/                 # 라우트 (page / layout / globals.css)
  components/          # SiteHeader, SiteFooter, HeroGeometry 등
  lib/
    site.ts            # 사이트 공통 설정·내비·연락처
    wallpapers.ts      # 도배지 안내 콘텐츠
public/
  brand/               # 로고
  wallpapers/          # 도배지 이미지
```

## 도배지 안내 메모

- **합지·실크**: 주력 시공 품목. 관리·단가 관련 안내 포함
- **천연·한지 / 뮤럴 등**: 정보성 소개 위주 (관리·단가 안내 제외)
- 콘텐츠: `src/lib/wallpapers.ts`