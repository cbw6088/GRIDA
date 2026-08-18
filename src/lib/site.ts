export const siteConfig = {
  name: "그리다, 공간",
  nameEn: "Grida, Space",
  description: "공간을 그리고, 벽을 완성하다.",
  contact: {
    phoneDisplay: "010 4186 6088",
    phoneTel: "01041866088",
    email: "cbw60881@gmail.com",
    area: "서울 / 경기",
  },
  nav: [
    { href: "/", label: "홈", labelEn: "Home" },
    { href: "/introduction", label: "소개", labelEn: "Introduction" },
    { href: "/wallpaper", label: "도배지 안내", labelEn: "Wallpaper" },
    { href: "/portfolio", label: "포트폴리오", labelEn: "Portfolio" },
    { href: "/contact", label: "연락하기", labelEn: "Contact us" },
  ],
} as const;
