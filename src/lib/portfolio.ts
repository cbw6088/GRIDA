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
  slug: string;
  title: string;
  category: PortfolioCategoryId;
  location?: string;
  /** 시공에 사용한 도배지 */
  wallpaper?: string;
  summary?: string;
  scope?: string[];
  preview: PortfolioImage;
  gallery?: PortfolioImage[];
  sections?: PortfolioGallerySection[];
  details?: {
    area?: string;
    duration?: string;
    materials?: string[];
  };
  featured?: boolean;
};

export const portfolioCategories: PortfolioCategory[] = [
  { id: "residential", label: "주거 공간" },
  { id: "commercial", label: "상업 공간" },
  { id: "new-build", label: "신축" },
  { id: "maintenance", label: "유지 보수" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "seocho-residential",
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
    slug: "songpa-residential",
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
    slug: "yeoksam-commercial",
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

export function getCategoryLabel(id: PortfolioCategoryId) {
  return portfolioCategories.find((category) => category.id === id)?.label ?? id;
}

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(limit = 3) {
  return portfolioProjects.filter((project) => project.featured).slice(0, limit);
}

export function formatProjectFacts(
  project: Pick<PortfolioProject, "location" | "wallpaper">,
) {
  return [project.location, project.wallpaper].filter(Boolean).join(" · ");
}

export function getWallpaperGuideHref(wallpaper?: string) {
  if (wallpaper?.includes("합지")) return "/wallpaper#hapji";
  return "/wallpaper";
}
