export type HomeBanner = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
};

export const homeBanners: HomeBanner[] = [
  {
    id: "estimate",
    kicker: "견적 상담",
    title: "무료 견적 요청하기",
    description: "공간에 맞는 도배 견적을 부담 없이 받아 보세요.",
    href: "/contact",
    cta: "견적 문의",
    image: "/banners/wallpaper-roll.jpg",
    imageAlt: "파스텔 톤 도배지가 롤러처럼 풀리는 모습",
  },
  {
    id: "site",
    kicker: "시공 사례",
    title: "시공 현장 확인하기",
    description: "실제 시공 과정과 마감된 공간을 살펴보세요.",
    href: "/portfolio",
    cta: "현장 보기",
    image: "/banners/construction.jpg",
    imageAlt: "아치형 창호가 있는 도배 시공 현장",
  },
];
