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
    slug: "yeoksam-commercial",
    title: "역삼동 상업공간",
    category: "commercial",
    location: "서울 강남구 역삼동",
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
