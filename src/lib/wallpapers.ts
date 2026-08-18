export type WallpaperGuide = {
  id: string;
  name: string;
  summary: string;
  bestFor: string;
  points: string[];
  /** 합지·실크 등 주력 시공 품목에만 사용 */
  note?: string;
  image: string;
  imageAlt: string;
  tone: string;
};

/** 고객 안내용 — 현장·상담에서 자주 다루는 종류 우선 */
export const wallpaperGuides: WallpaperGuide[] = [
  {
    id: "hapji",
    name: "합지 벽지",
    summary:
      "종이를 겹쳐 만든 기본형 벽지입니다. 비용 부담이 적고 색·패턴 선택지가 넓어, 원룸·임대·빠른 부분 교체에 많이 쓰입니다.",
    bestFor: "원룸, 임대주택, 예산에 맞춘 전체 도배",
    points: [
      "비교적 합리적인 시공 비용",
      "다양한 색상·패턴으로 분위기 맞추기 쉬움",
      "광폭/소폭에 따라 이음새와 마감 느낌이 달라집니다",
    ],
    note: "습기·오염에는 약한 편이라, 주방·욕실 인근보다는 건조한 생활 공간에 잘 맞습니다.",
    image: "/wallpapers/wallpaper-hapji.png",
    imageAlt: "합지 벽지 질감 예시",
    tone: "rgba(198, 186, 158, 0.35)",
  },
  {
    id: "silk",
    name: "실크 벽지",
    summary:
      "국내에서 가장 많이 선택하는 벽지 중 하나입니다. 표면을 닦아 관리할 수 있어, 일상 생활이 잦은 집·상가에 특히 잘 맞습니다.",
    bestFor: "거실, 침실, 아이 방, 상업 공간",
    points: [
      "걸레질이 가능해 관리가 수월함",
      "내구성이 좋아 오래 쓰기 좋음",
      "은은한 광택으로 공간이 한결 정돈되어 보임",
    ],
    note: "합지보다 단가는 높지만, 관리 편의와 마감 완성도를 보면 많은 고객이 실크를 고릅니다.",
    image: "/wallpapers/wallpaper-silk.png",
    imageAlt: "실크 벽지 질감 예시",
    tone: "rgba(142, 158, 148, 0.35)",
  },
  {
    id: "hanji",
    name: "천연·한지 벽지",
    summary:
      "자연 소재의 질감과 은은한 색감이 특징입니다. 공간이 부드럽고 편안하게 보이길 원할 때 많이 찾는 종류입니다.",
    bestFor: "거실, 안방, 서재 등 머무는 시간이 긴 공간",
    points: [
      "자연스러운 질감으로 따뜻한 분위기 연출",
      "통기·습도 측면에서 쾌적함을 기대할 수 있음",
      "목재·간접 조명과 잘 어울림",
    ],
    image: "/wallpapers/wallpaper-hanji.png",
    imageAlt: "한지·천연 벽지 질감 예시",
    tone: "rgba(188, 160, 138, 0.32)",
  },
  {
    id: "mural",
    name: "뮤럴 벽지",
    summary:
      "한쪽 벽을 그림처럼 완성하는 포인트 벽지입니다. TV 벽, 침대 헤드 쪽처럼 ‘시선이 모이는 면’에 쓰면 공간이 확 살아납니다.",
    bestFor: "거실 포인트 벽, 침실 헤드월, 카페·매장",
    points: [
      "한 면만으로도 인테리어 포인트가 분명해짐",
      "풍경·그래픽 등 디자인 폭이 넓음",
      "무광에 가까운 마감이 세련되게 느껴지는 경우가 많음",
    ],
    image: "/wallpapers/wallpaper-mural.png",
    imageAlt: "뮤럴 벽지 분위기 예시",
    tone: "rgba(132, 148, 168, 0.32)",
  },
];

export const wallpaperExtras = [
  {
    name: "방수·코팅 벽지",
    text: "습기·오염이 잦은 주방 후면처럼, 일반 벽지보다 강한 마감이 필요할 때 고려하는 종류입니다.",
  },
  {
    name: "기능성 벽지",
    text: "항균·단열·흡음처럼 목적에 맞는 기능이 더해진 벽지입니다. 아이 방, 학원, 결로가 걱정되는 벽에서 고려됩니다.",
  },
  {
    name: "레자·벨벳 등 특수 벽지",
    text: "질감과 고급감을 살리는 선택입니다. 호텔·레스토랑·안방 헤드월 같은 포인트 벽에 쓰이곤 합니다.",
  },
] as const;
