export type PortfolioCategoryId =
  | "residential"
  | "commercial"
  | "new-build"
  | "maintenance";

export type PortfolioCategory = {
  id: PortfolioCategoryId;
  label: string;
};

export type PortfolioImage = {
  src?: string;
  alt: string;
  caption?: string;
  /** 이미지가 없을 때 쓰는 배경 톤 */
  tone?: string;
};

export type PortfolioPhase = {
  label: "시공 전" | "초기 작업" | "시공 후";
  images: PortfolioImage[];
};

export type PortfolioGallerySection = {
  title: string;
  description?: string;
  phases: PortfolioPhase[];
  /** @deprecated phases 사용 */
  images?: PortfolioImage[];
};

export type PortfolioProject = {
  id: number;
  title: string;
  category: PortfolioCategoryId;
  location?: string;
  /** 시공에 사용한 도배지 종류 */
  wallpaper?: string;
  /** 제품명·품번 등 상세 표기 */
  wallpaperProduct?: string;
  summary?: string;
  scope?: string[];
  preview: PortfolioImage;
  gallery?: PortfolioImage[];
  sections?: PortfolioGallerySection[];
  details?: {
    area?: string;
    duration?: string;
    materials?: string[];
    note?: string;
  };
  featured?: boolean;
};

export const portfolioCategories: PortfolioCategory[] = [
  { id: "residential", label: "주거 공간" },
  { id: "commercial", label: "상업 공간" },
  { id: "new-build", label: "신축" },
  { id: "maintenance", label: "유지 보수" },
];

const portfolioProjectEntries: Omit<PortfolioProject, "id">[] = [
  {
    title: "도봉구 주거공간",
    category: "residential",
    location: "도봉구",
    wallpaper: "장폭합지",
    wallpaperProduct: "제일벽지 6965-2",
    preview: {
      src: "/portfolio/도봉구 26-10-26/안방/시공후_안방1.JPG",
      alt: "도봉구 주거공간 안방 시공 후 내부",
    },
    details: {
      area: "12평",
    },
    sections: [
      {
        title: "안방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/도봉구 26-10-26/안방/시공전_안방1.JPG",
                alt: "안방 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/도봉구 26-10-26/안방/시공후_안방1.JPG",
                alt: "안방 시공 후 내부",
              },
            ],
          },
        ],
      },
      {
        title: "작은방 1",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/도봉구 26-10-26/작은방1/시공전_작은방1.JPG",
                alt: "작은방 1 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/도봉구 26-10-26/작은방1/시공후_작은방1.JPG",
                alt: "작은방 1 시공 후 내부",
              },
            ],
          },
        ],
      },
      {
        title: "작은방 2",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/도봉구 26-10-26/작은방2/시공전_작은방2.JPG",
                alt: "작은방 2 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/도봉구 26-10-26/작은방2/시공후_작은방2.JPG",
                alt: "작은방 2 시공 후 내부",
              },
            ],
          },
        ],
      },
      {
        title: "주방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/도봉구 26-10-26/주방/시공전_주방1.JPG",
                alt: "주방 시공 전 내부",
              },
              {
                src: "/portfolio/도봉구 26-10-26/주방/시공전_주방2.JPG",
                alt: "주방 시공 전 다른 각도",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/도봉구 26-10-26/주방/시공후_주방1.JPG",
                alt: "주방 시공 후 내부",
              },
            ],
          },
        ],
      },
    ],
    featured: true,
  },
  {
    title: "노원구 주거공간",
    category: "residential",
    location: "노원구",
    wallpaper: "장폭합지",
    wallpaperProduct: "제일벽지 6984-4",
    preview: {
      src: "/portfolio/노원구 26-10-22/거실/시공후_거실.JPG",
      alt: "노원구 주거공간 거실 시공 후 내부",
    },
    details: {
      area: "13평",
    },
    sections: [
      {
        title: "거실",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/노원구 26-10-22/거실/시공전_거실1.JPG",
                alt: "거실 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/노원구 26-10-22/거실/시공후_거실.JPG",
                alt: "거실 시공 후 내부",
              },
            ],
          },
        ],
      },
      {
        title: "안방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/노원구 26-10-22/안방/시공전_안방1.JPG",
                alt: "안방 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/노원구 26-10-22/안방/시공후_안방.JPG",
                alt: "안방 시공 후 내부",
              },
            ],
          },
        ],
      },
    ],
    featured: true,
  },
  {
    title: "구의동 주거공간",
    category: "residential",
    location: "광진구 구의동",
    wallpaper: "장폭합지",
    preview: {
      src: "/portfolio/구의동 26-10-21/안방/시공후_안방1.JPG",
      alt: "구의동 주거공간 안방 시공 후 내부",
    },
    details: {
      area: "15평",
    },
    sections: [
      {
        title: "거실",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/구의동 26-10-21/거실/시공전_거실1.JPG",
                alt: "거실 시공 전 내부",
              },
              {
                src: "/portfolio/구의동 26-10-21/거실/시공전_거실2.JPG",
                alt: "거실 시공 전 다른 각도",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/구의동 26-10-21/거실/시공후_거실1.JPG",
                alt: "거실 시공 후 내부",
              },
              {
                src: "/portfolio/구의동 26-10-21/거실/시공후_거실2.JPG",
                alt: "거실 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
      {
        title: "안방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/구의동 26-10-21/안방/시공전_안방1.JPG",
                alt: "안방 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/구의동 26-10-21/안방/시공후_안방1.JPG",
                alt: "안방 시공 후 내부",
              },
            ],
          },
        ],
      },
      {
        title: "작은방 1",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/구의동 26-10-21/작은방1/시공전_작은방1.JPG",
                alt: "작은방 1 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/구의동 26-10-21/작은방1/시공후_작은방1.JPG",
                alt: "작은방 1 시공 후 내부",
              },
            ],
          },
        ],
      },
      {
        title: "작은방 2",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/구의동 26-10-21/작은방2/시공전_작은방2.JPG",
                alt: "작은방 2 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/구의동 26-10-21/작은방2/시공후_작은방2.JPG",
                alt: "작은방 2 시공 후 내부",
              },
            ],
          },
        ],
      },
    ],
    featured: true,
  },
  {
    title: "은평구 주거공간",
    category: "residential",
    location: "은평구",
    wallpaper: "소폭합지",
    wallpaperProduct: "660-2",
    preview: {
      src: "/portfolio/은평구 26-10-17/안방/시공후_안방1.JPG",
      alt: "은평구 주거공간 안방 시공 후 내부",
    },
    details: {
      area: "13평",
      note: "장판 시공 포함",
    },
    sections: [
      {
        title: "안방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/은평구 26-10-17/안방/시공전_안방1.JPG",
                alt: "안방 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/은평구 26-10-17/안방/시공후_안방1.JPG",
                alt: "안방 시공 후 내부",
              },
            ],
          },
        ],
      },
      {
        title: "작은방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/은평구 26-10-17/작은방/시공전_작은방1.JPG",
                alt: "작은방 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/은평구 26-10-17/작은방/시공후_작은방1.JPG",
                alt: "작은방 시공 후 내부",
              },
            ],
          },
        ],
      },
      {
        title: "주방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/은평구 26-10-17/주방/시공전_주방1.JPG",
                alt: "주방 시공 전 내부",
              },
              {
                src: "/portfolio/은평구 26-10-17/주방/시공전_주방2.JPG",
                alt: "주방 시공 전 다른 각도",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/은평구 26-10-17/주방/시공후_주방1.JPG",
                alt: "주방 시공 후 내부",
              },
              {
                src: "/portfolio/은평구 26-10-17/주방/시공후_주방2.JPG",
                alt: "주방 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
    ],
    featured: true,
  },
  {
    title: "중곡동 상업공간",
    category: "commercial",
    location: "광진구 중곡동",
    wallpaper: "광폭합지",
    wallpaperProduct: "제일벽지 1986-2",
    preview: {
      src: "/portfolio/중곡동 26-10-14,15/사무실/시공후_사무실1.JPG",
      alt: "중곡동 상업공간 사무실 시공 후 내부",
    },
    details: {
      area: "34평",
      note: "장판 시공 포함",
    },
    sections: [
      {
        title: "사무실",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/중곡동 26-10-14,15/사무실/시공전_사무실1.JPG",
                alt: "사무실 시공 전 내부",
              },
            ],
          },
          {
            label: "초기 작업",
            images: [
              {
                src: "/portfolio/중곡동 26-10-14,15/사무실/벽지제거_사무실1.JPG",
                alt: "사무실 기존 벽지 제거 후 바탕",
              },
              {
                src: "/portfolio/중곡동 26-10-14,15/사무실/벽지제거_사무실2.JPG",
                alt: "사무실 기존 벽지 제거 후 다른 각도",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/중곡동 26-10-14,15/사무실/시공후_사무실1.JPG",
                alt: "사무실 시공 후 내부",
              },
              {
                src: "/portfolio/중곡동 26-10-14,15/사무실/시공후_사무실2.JPG",
                alt: "사무실 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
      {
        title: "대표실",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/중곡동 26-10-14,15/대표실/시공전_대표실1.JPG",
                alt: "대표실 시공 전 내부",
              },
              {
                src: "/portfolio/중곡동 26-10-14,15/대표실/시공전_대표실2.JPG",
                alt: "대표실 시공 전 다른 각도",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/중곡동 26-10-14,15/대표실/시공후_대표실1.JPG",
                alt: "대표실 시공 후 내부",
              },
              {
                src: "/portfolio/중곡동 26-10-14,15/대표실/시공후_대표실2.JPG",
                alt: "대표실 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
    ],
    featured: true,
  },
  {
    title: "오금동 주거공간",
    category: "residential",
    location: "송파구 오금동",
    wallpaper: "실크",
    wallpaperProduct: "제일벽지 K114-1",
    preview: {
      src: "/portfolio/오금동 26-10-9,10/거실/시공후_거실1.JPG",
      alt: "오금동 주거공간 거실 시공 후 내부",
    },
    details: {
      area: "18평",
    },
    sections: [
      {
        title: "거실",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/오금동 26-10-9,10/거실/시공전_거실1.JPG",
                alt: "거실 시공 전 내부",
              },
            ],
          },
          {
            label: "초기 작업",
            images: [
              {
                src: "/portfolio/오금동 26-10-9,10/거실/벽지제거_거실1.JPG",
                alt: "거실 기존 벽지 제거 후 바탕",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/오금동 26-10-9,10/거실/시공후_거실1.JPG",
                alt: "거실 시공 후 창가 쪽 내부",
              },
            ],
          },
        ],
      },
      {
        title: "안방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/오금동 26-10-9,10/안방/시공전_안방1.JPG",
                alt: "안방 시공 전 내부",
              },
            ],
          },
          {
            label: "초기 작업",
            images: [
              {
                src: "/portfolio/오금동 26-10-9,10/안방/벽지제거_안방1.JPG",
                alt: "안방 기존 벽지 제거 후 바탕",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/오금동 26-10-9,10/안방/시공후_안방1.JPG",
                alt: "안방 시공 후 내부",
              },
            ],
          },
        ],
      },
      {
        title: "옷방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/오금동 26-10-9,10/옷방/시공전_옷방1.JPG",
                alt: "옷방 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/오금동 26-10-9,10/옷방/시공후_옷방1.JPG",
                alt: "옷방 시공 후 내부",
              },
            ],
          },
        ],
      },
      {
        title: "작은방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/오금동 26-10-9,10/작은방/시공전_작은방1.JPG",
                alt: "작은방 시공 전 내부",
              },
            ],
          },
          {
            label: "초기 작업",
            images: [
              {
                src: "/portfolio/오금동 26-10-9,10/작은방/벽지제거_작은방1.JPG",
                alt: "작은방 기존 벽지 제거 후 바탕",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/오금동 26-10-9,10/작은방/시공후_작은방1.JPG",
                alt: "작은방 시공 후 내부",
              },
            ],
          },
        ],
      },
    ],
    featured: true,
  },
  {
    title: "하남 주거공간",
    category: "residential",
    location: "하남",
    wallpaper: "실크",
    wallpaperProduct: "제일벽지 K114-1",
    preview: {
      src: "/portfolio/하남 26-10-8/시공후1.JPG",
      alt: "하남 주거공간 시공 후 창가 쪽 내부",
    },
    sections: [
      {
        title: "원룸",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/하남 26-10-8/시공전1.JPG",
                alt: "원룸 시공 전 창가 쪽 내부",
              },
              {
                src: "/portfolio/하남 26-10-8/시공전2.JPG",
                alt: "원룸 시공 전 주방과 현관 쪽",
              },
            ],
          },
          {
            label: "초기 작업",
            images: [
              {
                src: "/portfolio/하남 26-10-8/벽지제거.JPG",
                alt: "원룸 기존 벽지 제거 후 바탕",
              },
              {
                src: "/portfolio/하남 26-10-8/기초.JPG",
                alt: "원룸 초기 작업 중 바탕 처리",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/하남 26-10-8/시공후1.JPG",
                alt: "원룸 시공 후 창가 쪽 내부",
              },
              {
                src: "/portfolio/하남 26-10-8/시공후2.JPG",
                alt: "원룸 시공 후 주방과 현관 쪽",
              },
            ],
          },
        ],
      },
    ],
    details: {
      area: "10평",
    },
    featured: true,
  },
  {
    title: "역삼동 고시텔",
    category: "commercial",
    location: "서울 강남구 역삼동",
    wallpaper: "소폭합지",
    preview: {
      src: "/portfolio/역삼동 26-09-23,29/101호/거실/시공후_거실1.JPG",
      alt: "역삼동 고시텔 101호 거실 시공 후 내부",
    },
    sections: [
      {
        title: "101호 거실",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/역삼동 26-09-23,29/101호/거실/시공전_거실1.JPG",
                alt: "101호 거실 시공 전 내부",
              },
              {
                src: "/portfolio/역삼동 26-09-23,29/101호/거실/시공전_거실2.JPG",
                alt: "101호 거실 시공 전 다른 각도",
              },
            ],
          },
          {
            label: "초기 작업",
            images: [
              {
                src: "/portfolio/역삼동 26-09-23,29/101호/거실/초배_거실1.JPG",
                alt: "101호 거실 초기 작업 중 초배",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/역삼동 26-09-23,29/101호/거실/시공후_거실1.JPG",
                alt: "101호 거실 시공 후 내부",
              },
              {
                src: "/portfolio/역삼동 26-09-23,29/101호/거실/시공후_거실2.JPG",
                alt: "101호 거실 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
      {
        title: "101호 방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/역삼동 26-09-23,29/101호/방/시공전_방1.JPG",
                alt: "101호 방 시공 전 내부",
              },
              {
                src: "/portfolio/역삼동 26-09-23,29/101호/방/시공전_방2.JPG",
                alt: "101호 방 시공 전 다른 각도",
              },
              {
                src: "/portfolio/역삼동 26-09-23,29/101호/방/시공전_방3.JPG",
                alt: "101호 방 시공 전 벽면",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/역삼동 26-09-23,29/101호/방/시공후_방1.JPG",
                alt: "101호 방 시공 후 내부",
              },
              {
                src: "/portfolio/역삼동 26-09-23,29/101호/방/시공후_방2.JPG",
                alt: "101호 방 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
      {
        title: "102호 거실",
        phases: [
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/역삼동 26-09-23,29/102호/거실/시공후_거실1.JPG",
                alt: "102호 거실 시공 후 내부",
              },
              {
                src: "/portfolio/역삼동 26-09-23,29/102호/거실/시공후_거실2.JPG",
                alt: "102호 거실 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
      {
        title: "102호 안방",
        phases: [
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/역삼동 26-09-23,29/102호/안방/시공후_안방1.JPG",
                alt: "102호 안방 시공 후 내부",
              },
              {
                src: "/portfolio/역삼동 26-09-23,29/102호/안방/시공후_안방2.JPG",
                alt: "102호 안방 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
      {
        title: "102호 작은방",
        phases: [
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/역삼동 26-09-23,29/102호/작은방/시공후_작은방1.JPG",
                alt: "102호 작은방 시공 후 내부",
              },
              {
                src: "/portfolio/역삼동 26-09-23,29/102호/작은방/시공후_작은방2.JPG",
                alt: "102호 작은방 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
      {
        title: "210호",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/역삼동 26-09-23,29/210호/시공전.JPG",
                alt: "210호 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/역삼동 26-09-23,29/210호/시공후.JPG",
                alt: "210호 시공 후 내부",
              },
            ],
          },
        ],
      },
      {
        title: "310호",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/역삼동 26-09-23,29/310호/시공전.JPG",
                alt: "310호 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/역삼동 26-09-23,29/310호/시공후.JPG",
                alt: "310호 시공 후 내부",
              },
            ],
          },
        ],
      },
    ],
    featured: true,
  },
  {
    title: "풍납동 주거공간",
    category: "residential",
    location: "서울 송파구 풍납동",
    wallpaper: "실크",
    preview: {
      src: "/portfolio/풍납동26-09-18/작은방/작은방_시공후2.JPG",
      alt: "풍납동 주거공간 작은방 시공 후 내부",
    },
    sections: [
      {
        title: "안방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/풍납동26-09-18/안방/안방_시공전1.JPG",
                alt: "안방 시공 전 내부",
              },
              {
                src: "/portfolio/풍납동26-09-18/안방/안방_시공전2.JPG",
                alt: "안방 시공 전 다른 각도",
              },
              {
                src: "/portfolio/풍납동26-09-18/안방/안방_시공전3.JPG",
                alt: "안방 시공 전 벽면",
              },
            ],
          },
          {
            label: "초기 작업",
            images: [
              {
                src: "/portfolio/풍납동26-09-18/안방/안방_기초1.JPG",
                alt: "안방 초기 작업 중 바탕 처리",
              },
              {
                src: "/portfolio/풍납동26-09-18/안방/안방_기초2.JPG",
                alt: "안방 초기 작업 중 벽면 처리",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/풍납동26-09-18/안방/안방_시공후2.JPG",
                alt: "안방 시공 후 창가 쪽 내부",
              },
              {
                src: "/portfolio/풍납동26-09-18/안방/안방_시공후3.JPG",
                alt: "안방 시공 후 다른 각도",
              },
              {
                src: "/portfolio/풍납동26-09-18/안방/안방_시공후4.JPG",
                alt: "안방 시공 후 출입문 쪽",
              },
            ],
          },
        ],
      },
      {
        title: "작은방",
        phases: [
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/풍납동26-09-18/작은방/작은방_시공후1.JPG",
                alt: "작은방 시공 후 내부",
              },
              {
                src: "/portfolio/풍납동26-09-18/작은방/작은방_시공후2.JPG",
                alt: "작은방 시공 후 창가 쪽",
              },
            ],
          },
        ],
      },
      {
        title: "주방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/풍납동26-09-18/주방/주방_시공전1.JPG",
                alt: "주방 시공 전 내부",
              },
            ],
          },
          {
            label: "초기 작업",
            images: [
              {
                src: "/portfolio/풍납동26-09-18/주방/주방_기초1.JPG",
                alt: "주방 초기 작업 중 바탕 처리",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/풍납동26-09-18/주방/주방_시공후1.JPG",
                alt: "주방 시공 후 내부",
              },
            ],
          },
        ],
      },
    ],
    featured: true,
  },
  {
    title: "이태원 주거공간",
    category: "residential",
    location: "서울 이태원",
    wallpaper: "광폭합지",
    preview: {
      src: "/portfolio/이태원26-09-19/안방/안방_작업후1.JPG",
      alt: "이태원 주거공간 안방 시공 후 내부",
    },
    sections: [
      {
        title: "거실",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/이태원26-09-19/거실/거실_작업전2.JPG",
                alt: "거실 시공 전 창가 쪽 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/이태원26-09-19/거실/거실_작업후1.JPG",
                alt: "거실 시공 후 주방과 연결된 공간",
              },
              {
                src: "/portfolio/이태원26-09-19/거실/거실_작업후2.JPG",
                alt: "거실 시공 후 현관 쪽",
              },
            ],
          },
        ],
      },
      {
        title: "안방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/이태원26-09-19/안방/안방_작업전1.JPG",
                alt: "안방 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/이태원26-09-19/안방/안방_작업후1.JPG",
                alt: "안방 시공 후 창가 쪽 내부",
              },
              {
                src: "/portfolio/이태원26-09-19/안방/안방_작업후2.JPG",
                alt: "안방 시공 후 출입문 쪽",
              },
            ],
          },
        ],
      },
      {
        title: "작은방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/이태원26-09-19/작은방/작은방_작업전1.JPG",
                alt: "작은방 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/이태원26-09-19/작은방/작은방_작업후1.JPG",
                alt: "작은방 시공 후 내부",
              },
            ],
          },
        ],
      },
    ],
    featured: true,
  },
  {
    title: "서초구 주거공간",
    category: "residential",
    location: "서울 서초구",
    wallpaper: "소폭합지",
    preview: {
      src: "/portfolio/서초구26-09-06/거실/시공후_거실1.JPG",
      alt: "서초구 주거공간 거실 시공 후 내부",
    },
    sections: [
      {
        title: "거실",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/서초구26-09-06/거실/시공전_거실.JPG",
                alt: "거실 시공 전 내부",
              },
              {
                src: "/portfolio/서초구26-09-06/거실/시공전_거실2.JPG",
                alt: "거실 시공 전 다른 각도",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/서초구26-09-06/거실/시공후_거실1.JPG",
                alt: "거실 시공 후 내부",
              },
              {
                src: "/portfolio/서초구26-09-06/거실/시공후_거실2.JPG",
                alt: "거실 시공 후 주방과 연결된 공간",
              },
            ],
          },
        ],
      },
      {
        title: "안방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/서초구26-09-06/안방/시공전_안방.JPG",
                alt: "안방 시공 전 내부",
              },
              {
                src: "/portfolio/서초구26-09-06/안방/시공전_안방2.JPG",
                alt: "안방 시공 전 다른 각도",
              },
              {
                src: "/portfolio/서초구26-09-06/안방/시공전_안방3.JPG",
                alt: "안방 시공 전 벽면",
              },
              {
                src: "/portfolio/서초구26-09-06/안방/시공전_안방4.JPG",
                alt: "안방 시공 전 창가 쪽",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/서초구26-09-06/안방/시공후_안방1.JPG",
                alt: "안방 시공 후 내부",
              },
              {
                src: "/portfolio/서초구26-09-06/안방/시공후_안방2.JPG",
                alt: "안방 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
      {
        title: "작은방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/서초구26-09-06/작은방/시공전_작은방1.JPG",
                alt: "작은방 시공 전 내부",
              },
              {
                src: "/portfolio/서초구26-09-06/작은방/시공전_작은방2.JPG",
                alt: "작은방 시공 전 다른 각도",
              },
              {
                src: "/portfolio/서초구26-09-06/작은방/시공전_작은방3.JPG",
                alt: "작은방 시공 전 벽면",
              },
              {
                src: "/portfolio/서초구26-09-06/작은방/시공전_작은방4.JPG",
                alt: "작은방 시공 전 창가 쪽",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/서초구26-09-06/작은방/시공후_작은방1.JPG",
                alt: "작은방 시공 후 내부",
              },
              {
                src: "/portfolio/서초구26-09-06/작은방/시공후_작은방2.JPG",
                alt: "작은방 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
      {
        title: "몰딩",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/서초구26-09-06/몰딩/시공전_몰딩1.JPG",
                alt: "몰딩 시공 전",
              },
              {
                src: "/portfolio/서초구26-09-06/몰딩/시공전_몰딩2.JPG",
                alt: "몰딩 시공 전 다른 각도",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/서초구26-09-06/몰딩/시공후_몰딩1.JPG",
                alt: "몰딩 시공 후",
              },
              {
                src: "/portfolio/서초구26-09-06/몰딩/시공후_몰딩2.JPG",
                alt: "몰딩 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
    ],
    featured: true,
  },
  {
    title: "송파구 주거공간",
    category: "residential",
    location: "서울 송파구",
    wallpaper: "광폭합지",
    preview: {
      src: "/portfolio/송파구26-09-05,07/거실/시공후_거실1.JPG",
      alt: "송파구 주거공간 거실 시공 후 내부",
    },
    sections: [
      {
        title: "거실",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/송파구26-09-05,07/거실/시공전_거실1.JPG",
                alt: "거실 시공 전 내부",
              },
              {
                src: "/portfolio/송파구26-09-05,07/거실/시공전_거실2.JPG",
                alt: "거실 시공 전 다른 각도",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/송파구26-09-05,07/거실/시공후_거실1.JPG",
                alt: "거실 시공 후 내부",
              },
              {
                src: "/portfolio/송파구26-09-05,07/거실/시공후_거실2.JPG",
                alt: "거실 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
      {
        title: "안방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/송파구26-09-05,07/안방/시공전_안방1.JPG",
                alt: "안방 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/송파구26-09-05,07/안방/시공후_안방1.JPG",
                alt: "안방 시공 후 내부",
              },
              {
                src: "/portfolio/송파구26-09-05,07/안방/시공후_안방2.JPG",
                alt: "안방 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
      {
        title: "중간방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/송파구26-09-05,07/중간방/시공전_중간방1.JPG",
                alt: "중간방 시공 전 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/송파구26-09-05,07/중간방/시공후_중간방1.JPG",
                alt: "중간방 시공 후 내부",
              },
              {
                src: "/portfolio/송파구26-09-05,07/중간방/시공후_중간방2.JPG",
                alt: "중간방 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
      {
        title: "작은방",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/송파구26-09-05,07/작은방/시공전_작은방1.JPG",
                alt: "작은방 시공 전 내부",
              },
              {
                src: "/portfolio/송파구26-09-05,07/작은방/시공전_작은방2.JPG",
                alt: "작은방 시공 전 다른 각도",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/송파구26-09-05,07/작은방/시공후_작은방3.JPG",
                alt: "작은방 시공 후 내부",
              },
              {
                src: "/portfolio/송파구26-09-05,07/작은방/시공후_작은방4.JPG",
                alt: "작은방 시공 후 다른 각도",
              },
            ],
          },
        ],
      },
    ],
    featured: true,
  },
  {
    title: "역삼동 상업공간",
    category: "commercial",
    location: "서울 강남구 역삼동",
    wallpaper: "광폭합지",
    preview: {
      src: "/portfolio/역삼동/3층/시공후3.JPG",
      alt: "역삼동 상업공간 3층 아치형 창호가 있는 시공 후 내부",
    },
    sections: [
      {
        title: "지하 1층",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/역삼동/지하1층/시공전2.JPG",
                alt: "지하 1층 시공 전 바닥과 벽면 정리 상태",
              },
            ],
          },
          {
            label: "초기 작업",
            images: [
              {
                src: "/portfolio/역삼동/지하1층/시공전1.JPG",
                alt: "지하 1층 초기 작업 중 네바리 작업",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/역삼동/지하1층/시공후1.JPG",
                alt: "지하 1층 시공 후 흰색 벽면 마감",
              },
              {
                src: "/portfolio/역삼동/지하1층/시공후4.JPG",
                alt: "지하 1층 시공 후 전체 공간 마감",
              },
            ],
          },
        ],
      },
      {
        title: "3층",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/역삼동/3층/시공전2.JPG",
                alt: "3층 시공 전 아치형 창호가 보이는 내부",
              },
            ],
          },
          {
            label: "초기 작업",
            images: [
              {
                src: "/portfolio/역삼동/3층/시공전1.JPG",
                alt: "3층 초기 작업 중 공사 자재가 있는 내부",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/역삼동/3층/시공후1.JPG",
                alt: "3층 시공 후 아치형 창호와 흰색 벽면",
              },
              {
                src: "/portfolio/역삼동/3층/시공후3.JPG",
                alt: "3층 시공 후 창호를 중심으로 한 전체 공간",
              },
            ],
          },
        ],
      },
      {
        title: "4층",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/역삼동/4층/시공전1.JPG",
                alt: "4층 시공 전 내부",
              },
              {
                src: "/portfolio/역삼동/4층/시공전2.JPG",
                alt: "4층 시공 전 구멍 난 벽면",
              },
            ],
          },
          {
            label: "초기 작업",
            images: [
              {
                src: "/portfolio/역삼동/4층/초기작업1.JPG",
                alt: "4층 초기 작업 중 벽면과 자재 정리",
              },
              {
                src: "/portfolio/역삼동/4층/초기작업2.JPG",
                alt: "4층 초기 작업 중 바탕 처리",
              },
              {
                src: "/portfolio/역삼동/4층/시공후1.JPG",
                alt: "4층 초기 작업 중 벽면 마감 진행",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/역삼동/4층/시공후3.JPG",
                alt: "4층 시공 후 창가 벽면 마감",
              },
              {
                src: "/portfolio/역삼동/4층/시공후6.JPG",
                alt: "4층 시공 후 전체 공간 마감",
              },
              {
                src: "/portfolio/역삼동/4층/시공후2.JPG",
                alt: "4층 시공 후 복도와 실 연결 공간",
              },
            ],
          },
        ],
      },
      {
        title: "5층",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/역삼동/5층/초기작업1.JPG",
                alt: "5층 시공 전 공사 자재가 있는 내부",
              },
              {
                src: "/portfolio/역삼동/5층/시공전1.JPG",
                alt: "5층 시공 전 바닥과 벽면 상태",
              },
            ],
          },
          {
            label: "초기 작업",
            images: [
              {
                src: "/portfolio/역삼동/5층/초기작업2.JPG",
                alt: "5층 초기 작업 중 벽면 처리",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/역삼동/5층/시공후5.JPG",
                alt: "5층 시공 후 창가 벽면 마감",
              },
              {
                src: "/portfolio/역삼동/5층/시공후2.JPG",
                alt: "5층 시공 후 흰색 벽면과 몰딩 마감",
              },
            ],
          },
        ],
      },
      {
        title: "다락",
        phases: [
          {
            label: "시공 전",
            images: [
              {
                src: "/portfolio/역삼동/다락/시공전1.JPG",
                alt: "다락 시공 전 공사 자재가 있는 내부",
              },
              {
                src: "/portfolio/역삼동/다락/시공전2.JPG",
                alt: "다락 시공 전 사선 천장과 벽면",
              },
            ],
          },
          {
            label: "시공 후",
            images: [
              {
                src: "/portfolio/역삼동/다락/시공후1.JPG",
                alt: "다락 시공 후 창가와 흰색 벽면",
              },
              {
                src: "/portfolio/역삼동/다락/시공후2.JPG",
                alt: "다락 시공 후 사선 천장 마감",
              },
            ],
          },
        ],
      },
    ],
    featured: true,
  },
];

export const portfolioProjects: PortfolioProject[] =
  portfolioProjectEntries.map((project, index) => ({
    id: portfolioProjectEntries.length - index,
    ...project,
  }));

export function getCategoryLabel(id: PortfolioCategoryId) {
  return portfolioCategories.find((category) => category.id === id)?.label ?? id;
}

export function getProjectById(id: number) {
  return portfolioProjects.find((project) => project.id === id);
}

export function getProjectHref(project: Pick<PortfolioProject, "id">) {
  return `/portfolio/${project.id}`;
}

export function parseProjectId(value: string) {
  if (!/^\d+$/.test(value)) return null;
  const id = Number(value);
  return id > 0 ? id : null;
}

export function getFeaturedProjects(limit = 3) {
  return portfolioProjects.filter((project) => project.featured).slice(0, limit);
}

export function getWallpaperKind(wallpaper?: string) {
  if (!wallpaper) return undefined;
  if (wallpaper.includes("장폭합지") || wallpaper.includes("장폭")) {
    return "장폭합지";
  }
  if (wallpaper.includes("광폭합지")) return "광폭합지";
  if (wallpaper.includes("소폭합지")) return "소폭합지";
  if (wallpaper.includes("합지")) return "합지";
  if (wallpaper.includes("실크")) return "실크";
  if (wallpaper.includes("한지")) return "한지";
  if (wallpaper.includes("뮤럴")) return "뮤럴";
  return wallpaper;
}

export function formatProjectFacts(
  project: Pick<PortfolioProject, "location" | "wallpaper">,
) {
  return [project.location, getWallpaperKind(project.wallpaper)]
    .filter(Boolean)
    .join(" · ");
}

export function getWallpaperGuideHref(wallpaper?: string) {
  if (
    wallpaper?.includes("합지") ||
    wallpaper?.includes("장폭")
  ) {
    return "/wallpaper#hapji";
  }
  if (wallpaper?.includes("실크")) return "/wallpaper#silk";
  return "/wallpaper";
}

const spaceLabels: Record<PortfolioCategoryId, string> = {
  residential: "주거",
  commercial: "상업",
  "new-build": "신축",
  maintenance: "유지 보수",
};

export function getSpaceLabel(id: PortfolioCategoryId) {
  return spaceLabels[id];
}

export function formatWallpaperDetail(
  project: Pick<PortfolioProject, "wallpaper" | "wallpaperProduct">,
) {
  const kind = getWallpaperKind(project.wallpaper);
  if (!kind) return undefined;
  return project.wallpaperProduct ? `${kind} (${project.wallpaperProduct})` : kind;
}

export type PortfolioDetailFact = {
  label: string;
  value: string;
  href?: string;
};

export function getProjectDetailFacts(
  project: Pick<
    PortfolioProject,
    "category" | "location" | "wallpaper" | "wallpaperProduct" | "details"
  >,
): PortfolioDetailFact[] {
  const wallpaper = formatWallpaperDetail(project);

  return [
    project.location
      ? { label: "위치", value: project.location }
      : undefined,
    { label: "공간", value: getSpaceLabel(project.category) },
    wallpaper
      ? {
          label: "벽지",
          value: wallpaper,
          href: getWallpaperGuideHref(project.wallpaper),
        }
      : undefined,
    project.details?.area
      ? { label: "평수", value: project.details.area }
      : undefined,
  ].filter((fact): fact is PortfolioDetailFact => Boolean(fact));
}

export type PortfolioLightboxItem = {
  src: string;
  alt: string;
  caption?: string;
  context: string;
};

export function getProjectLightboxItems(
  project: Pick<PortfolioProject, "sections" | "gallery">,
) {
  const items: PortfolioLightboxItem[] = [];

  if (project.sections?.length) {
    for (const section of project.sections) {
      if (section.phases?.length) {
        for (const phase of section.phases) {
          for (const image of phase.images) {
            if (!image.src) continue;
            items.push({
              src: image.src,
              alt: image.alt,
              caption: image.caption,
              context: `${section.title} · ${phase.label}`,
            });
          }
        }
        continue;
      }

      for (const image of section.images ?? []) {
        if (!image.src) continue;
        items.push({
          src: image.src,
          alt: image.alt,
          caption: image.caption,
          context: section.title,
        });
      }
    }

    return items;
  }

  for (const image of project.gallery ?? []) {
    if (!image.src) continue;
    items.push({
      src: image.src,
      alt: image.alt,
      caption: image.caption,
      context: image.caption ?? image.alt,
    });
  }

  return items;
}
