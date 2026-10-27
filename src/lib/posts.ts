import { getProjectHref, portfolioProjects } from "@/lib/portfolio";

export type BlogImage = {
  src: string;
  alt: string;
  caption: string;
};

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "figure"; image: BlogImage }
  | { type: "pair"; images: BlogImage[] }
  | { type: "links"; title: string; items: { href: string; label: string }[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  publishedAt: string;
  excerpt: string;
  lead: string;
  cover: BlogImage;
  relatedSlugs: string[];
  blocks: BlogBlock[];
};

function portfolioHref(title: string) {
  const project = portfolioProjects.find((item) => item.title === title);
  if (!project) {
    throw new Error(`포트폴리오를 찾을 수 없습니다: ${title}`);
  }
  return getProjectHref(project);
}

export const blogPosts: BlogPost[] = [
  {
    slug: "hapji-vs-silk",
    title: "합지와 실크, 뭐가 다를까",
    description:
      "합지 벽지와 실크 벽지의 관리, 단가, 어울리는 공간을 현장 기준으로 비교합니다. 임대·거실·아이 방에서 어떻게 고르면 좋은지 정리했습니다.",
    keywords: [
      "합지 실크 차이",
      "합지 벽지",
      "실크 벽지",
      "벽지 종류",
      "도배지 비교",
    ],
    category: "벽지 비교",
    publishedAt: "2026-10-27",
    excerpt:
      "둘 다 집 전체에 쓰이지만, 닦는 방법과 단가, 벽이 주는 느낌이 다릅니다. 어느 쪽이 더 좋다기보다 그 집을 어떻게 쓰는지로 고릅니다.",
    lead: "합지와 실크는 상담에서 가장 많이 나란히 놓이는 두 가지입니다. 둘 다 거실과 방에 쓰이지만, 관리 방법과 단가, 공간이 주는 느낌이 다릅니다. 더 좋은 벽지를 고르는 일이라기보다, 그 집에서 벽을 어떻게 쓸지에 맞추는 일에 가깝습니다.",
    cover: {
      src: "/portfolio/오금동 26-10-9,10/거실/시공후_거실1.JPG",
      alt: "송파 오금동 거실 실크 도배 시공 후",
      caption: "송파 오금동 거실. 실크로 마감한 뒤의 벽입니다. 창이 큰 공간에서도 면이 비교적 고르게 보입니다.",
    },
    relatedSlugs: ["wide-vs-narrow-hapji", "wallpaper-cost"],
    blocks: [
      {
        type: "h2",
        text: "합지는 선택을 넓게, 관리는 건조하게",
      },
      {
        type: "p",
        text: "합지는 종이를 겹쳐 만든 기본형 벽지입니다. 색과 패턴이 넓고, 원룸·임대·예산에 맞춘 전체 교체에 많이 씁니다. 표면이 종이인 만큼 습기와 오염에는 약한 편입니다. 주방 옆이나 손이 자주 닿는 벽이라면, 마른 걸레로만 관리할 수 있는 공간인지 먼저 보시면 됩니다.",
      },
      {
        type: "p",
        text: "광폭과 소폭으로도 나뉩니다. 폭에 따라 이음새와 자재 단가가 달라서, 합지를 마음에 두셨다면 폭 비교를 이어서 보시는 편이 좋습니다. 현장에서는 광폭을 장폭합지라고 부르기도 합니다.",
      },
      {
        type: "h2",
        text: "실크는 닦을 수 있고, 단가는 더 높습니다",
      },
      {
        type: "p",
        text: "실크는 국내에서 가장 많이 선택하는 벽지 중 하나입니다. 표면을 닦아 관리할 수 있어 거실, 침실, 아이 방, 상가처럼 생활 흔적이 남는 곳에 잘 맞습니다. 은은한 광택이 있어 같은 흰색이라도 합지보다 벽이 정돈되어 보이는 경우가 많습니다.",
      },
      {
        type: "p",
        text: "단가는 합지보다 높습니다. 그 차이를 관리와 마감으로 받아들이고 실크를 고르는 고객이 많습니다. 다만 닦을 수 있다는 뜻이 물을 쏟아도 괜찮다는 뜻은 아닙니다. 오염이 잦은 주방 후면은 상담 때 따로 말씀해 주세요.",
      },
      {
        type: "pair",
        images: [
          {
            src: "/wallpapers/wallpaper-hapji.jpg",
            alt: "합지 벽지 표면 질감",
            caption: "합지. 종이 결이 그대로 보이는 표면입니다.",
          },
          {
            src: "/wallpapers/wallpaper-silk.jpg",
            alt: "실크 벽지 표면 질감",
            caption: "실크. 결이 고르고, 빛을 받으면 은은한 광택이 있습니다.",
          },
        ],
      },
      {
        type: "h2",
        text: "공간마다 이렇게 나누면 됩니다",
      },
      {
        type: "ul",
        items: [
          "손때와 얼룩이 걱정되는 거실·아이 방은 실크를 먼저 봅니다.",
          "예산이 먼저이고 건조한 방이라면 합지로도 충분합니다.",
          "임대나 짧은 거주라면 합지로 전체 톤을 맞추고, 거실만 실크를 검토하기도 합니다.",
          "방마다 종류를 섞을 수는 있습니다. 다만 한눈에 이어지는 거실은 한 종류로 맞추는 편이 자연스럽습니다.",
        ],
      },
      {
        type: "figure",
        image: {
          src: "/portfolio/노원구 26-10-22/거실/시공후_거실.JPG",
          alt: "노원구 거실 장폭합지 도배 시공 후",
          caption:
            "노원구 거실. 장폭합지로 시공한 뒤입니다. 무난한 색이면 가구를 들인 뒤에도 배경으로 남습니다.",
        },
      },
      {
        type: "p",
        text: "사진을 나란히 보면 차이가 더 분명합니다. 실크는 면이 매끈하게 정리된 느낌이 강하고, 합지는 종이 특유의 순한 결이 남습니다. 샘플만으로 결정이 어렵다면 공간 용도를 알려 주세요. 합지·실크를 중심으로 범위를 같이 정리해 드립니다.",
      },
      {
        type: "links",
        title: "이어서 보면 좋은 곳",
        items: [
          { href: "/blog/wide-vs-narrow-hapji", label: "광폭합지와 소폭합지" },
          { href: "/wallpaper#hapji", label: "합지 벽지 안내" },
          { href: "/wallpaper#silk", label: "실크 벽지 안내" },
          { href: portfolioHref("오금동 주거공간"), label: "오금동 실크 시공" },
          { href: portfolioHref("노원구 주거공간"), label: "노원구 장폭합지 시공" },
        ],
      },
    ],
  },
  {
    slug: "wide-vs-narrow-hapji",
    title: "광폭합지와 소폭합지, 어떻게 고를까",
    description:
      "광폭합지와 소폭합지의 폭, 이음새, 비용 차이를 정리합니다. 거실처럼 긴 벽과 작은 방에서 자주 쓰는 기준도 함께 적었습니다.",
    keywords: [
      "광폭합지",
      "소폭합지",
      "장폭합지",
      "합지 폭",
      "도배 이음새",
    ],
    category: "벽지 비교",
    publishedAt: "2026-10-27",
    excerpt:
      "광폭은 한 장이 약 930mm, 소폭은 약 530mm입니다. 이음 간격과 단가가 달라서, 거실과 작은 방의 선택이 자주 갈립니다.",
    lead: "합지를 고르면 곧이어 폭을 묻게 됩니다. 광폭합지는 한 장 폭이 약 930mm, 소폭합지는 약 530mm입니다. 현장에서는 광폭을 장폭합지라고 부르기도 합니다. 같은 합지라도 폭이 바뀌면 이음새와 비용이 달라집니다.",
    cover: {
      src: "/portfolio/송파구26-09-05,07/거실/시공후_거실1.JPG",
      alt: "송파구 거실 광폭합지 도배 시공 후",
      caption:
        "송파구 거실. 광폭합지로 맞춘 긴 벽입니다. 이음이 없는 것은 아니고, 간격이 넓어 면이 이어져 보입니다.",
    },
    relatedSlugs: ["hapji-vs-silk", "wallpaper-cost"],
    blocks: [
      {
        type: "h2",
        text: "차이는 이음이 얼마나 띄엄띄엄 있느냐입니다",
      },
      {
        type: "p",
        text: "폭이 넓으면 같은 벽에 이음이 덜 들어갑니다. 거실이나 복도처럼 시선이 길게 머무는 면에서 벽이 한 장으로 이어져 보이는 이유입니다. 폭이 좁으면 이음이 더 자주 보이고, 자재 단가는 대체로 광폭보다 낮습니다.",
      },
      {
        type: "p",
        text: "이음이 전혀 없는 벽지는 아닙니다. 광폭도 폭마다 선이 있고, 빛이 스치는 방향에 따라 그 선이 드러날 수 있습니다. 고를 때는 ‘선이 사라지느냐’보다 ‘그 선이 거슬릴 만한 벽인가’를 보시면 됩니다.",
      },
      {
        type: "figure",
        image: {
          src: "/portfolio/서초구26-09-06/거실/시공후_거실1.JPG",
          alt: "서초구 거실 소폭합지 도배 시공 후",
          caption:
            "서초구 거실. 소폭합지입니다. 왼쪽처럼 긴 벽에서는 이음이 광폭보다 자주 보입니다.",
        },
      },
      {
        type: "h2",
        text: "작은 방은 소폭으로도 충분한 경우가 많습니다",
      },
      {
        type: "p",
        text: "창과 문으로 벽이 잘게 나뉘면, 광폭이 주는 연속감이 거실만큼 크지 않을 때가 있습니다. 작은 방, 임대 전체, 비용을 먼저 맞추는 시공에서는 소폭을 같이 견적합니다. 은평구 안방처럼 면이 크지 않은 방은 소폭으로도 벽이 단정해 보입니다.",
      },
      {
        type: "figure",
        image: {
          src: "/portfolio/은평구 26-10-17/안방/시공후_안방1.JPG",
          alt: "은평구 안방 소폭합지 도배 시공 후",
          caption: "은평구 안방. 소폭합지로 마친 방입니다. 벽이 잘게 나뉘면 폭의 차이가 거실보다 덜합니다.",
        },
      },
      {
        type: "ul",
        items: [
          "거실, 긴 복도, 시선이 오래 머무는 면은 광폭을 먼저 봅니다.",
          "작은 방과 단가를 낮추는 전체 도배는 소폭을 함께 견적합니다.",
          "거실은 광폭, 작은 방은 소폭처럼 나눌 수는 있습니다. 한눈에 이어지는 공간은 폭을 맞추는 편이 좋습니다.",
          "광폭이 일반적으로 더 비쌉니다. 평수가 같아도 폭을 바꾸면 견적이 달라집니다.",
        ],
      },
      {
        type: "p",
        text: "상담 때는 합지인지 실크인지만 정하지 마시고, 합지라면 어느 폭을 생각하시는지도 같이 알려 주세요. 거실 사진이 있으면 긴 벽 기준으로 폭을 제안하기 쉽습니다.",
      },
      {
        type: "links",
        title: "이어서 보면 좋은 곳",
        items: [
          { href: "/blog/hapji-vs-silk", label: "합지와 실크 비교" },
          { href: "/wallpaper#hapji", label: "합지 벽지 안내" },
          { href: portfolioHref("송파구 주거공간"), label: "송파구 광폭합지 시공" },
          { href: portfolioHref("서초구 주거공간"), label: "서초구 소폭합지 시공" },
        ],
      },
    ],
  },
  {
    slug: "wallpaper-cost",
    title: "도배 비용은 어떻게 정해질까",
    description:
      "도배 견적이 면적, 바탕 상태, 벽지 종류, 시공 범위에 따라 달라지는 이유를 설명합니다. 평당 가격 하나만으로 보기 어려운 이유를 정리했습니다.",
    keywords: [
      "도배 비용",
      "도배 견적",
      "도배 평당 가격",
      "아파트 도배 비용",
      "방 도배 비용",
    ],
    category: "견적",
    publishedAt: "2026-10-27",
    excerpt:
      "같은 평수라도 벽 상태, 합지·실크, 집 전체인지 방 하나인지에 따라 일이 달라집니다. 금액은 그 집의 작업 범위를 듣고 안내합니다.",
    lead: "도배 비용을 평당 하나의 숫자로 말하기 어려운 이유가 있습니다. 같은 아파트라도 벽 상태, 고른 벽지, 거실만 할지 집 전체일지에 따라 실제 일이 달라지기 때문입니다. 가격표의 한 칸보다, 그 집에 필요한 작업을 먼저 맞추는 편이 나중에 차이가 적습니다.",
    cover: {
      src: "/portfolio/하남 26-10-8/시공후1.JPG",
      alt: "하남 원룸 실크 도배 시공 후",
      caption:
        "하남 원룸. 실크로 마친 작은 공간입니다. 평수가 작아도 창 주변과 문 옆까지 면을 맞춰야 견적이 나옵니다.",
    },
    relatedSlugs: ["hapji-vs-silk", "before-move-in"],
    blocks: [
      {
        type: "h2",
        text: "견적을 가를 때 보는 것",
      },
      {
        type: "ul",
        items: [
          "실제로 바를 벽 면적과 방 개수. 공급 평수와는 다를 수 있습니다.",
          "기존 벽지를 걷어 내야 하는지, 벽이 떠 있거나 울퉁불퉁한지.",
          "합지인지 실크인지. 합지라면 광폭인지 소폭인지.",
          "집 전체인지, 방 하나인지, 한쪽 벽인지.",
          "가구를 비울 수 있는지, 일정을 나눠야 하는지.",
        ],
      },
      {
        type: "p",
        text: "바탕 보수가 많으면 벽지만 바르는 날보다 시간이 늘고, 비용도 달라집니다. 방 하나나 부분 도배는 당일에 끝나는 경우가 많습니다. 집 전체이거나 보수가 많으면 하루이틀을 더 잡기도 합니다.",
      },
      {
        type: "h2",
        text: "작은 방과 큰 거실이 같은 단가가 아닌 이유",
      },
      {
        type: "p",
        text: "원룸은 면적이 작아 보여도 창, 문, 콘센트 주변을 맞춰야 일이 끝납니다. 반대로 거실이 넓고 실크를 쓰면, 자재와 맞댐이 늘어 같은 ‘한 칸’이라도 구성이 달라집니다. 그래서 평수를 단순히 곱한 금액과 실제 견적은 어긋날 수 있습니다.",
      },
      {
        type: "figure",
        image: {
          src: "/portfolio/오금동 26-10-9,10/거실/시공후_거실1.JPG",
          alt: "창이 큰 오금동 거실 실크 시공 후",
          caption:
            "오금동 거실. 실크이고 창이 많은 공간은, 같은 한 실이라도 맞댐과 마감이 더 있습니다.",
        },
      },
      {
        type: "h2",
        text: "상담 때 알려 주시면 좋은 것",
      },
      {
        type: "p",
        text: "공간 사진을 보거나 범위를 들은 뒤 금액을 안내합니다. 벽 보수가 많거나 범위가 애매할 때만 현장을 보고 조율합니다. 방 개수나 대략적인 평수, 합지·실크 중 관심 있는 쪽, 원하시는 날짜를 알려 주시면 그 자리에서 방향을 잡기 쉽습니다.",
      },
      {
        type: "p",
        text: "이 글에는 고정 단가를 적지 않았습니다. 벽 상태와 폭, 범위가 집마다 달라 하나의 가격이 다른 집의 견적이 되기 쉽기 때문입니다. 범위를 편하게 남겨 주세요.",
      },
      {
        type: "links",
        title: "이어서 보면 좋은 곳",
        items: [
          { href: "/contact", label: "도배 상담·견적" },
          { href: "/blog/hapji-vs-silk", label: "합지와 실크 비교" },
          { href: "/blog/before-move-in", label: "이사 전에 도배하면 좋은 이유" },
          { href: portfolioHref("하남 주거공간"), label: "하남 원룸 시공" },
          { href: portfolioHref("도봉구 주거공간"), label: "도봉구 12평 시공" },
        ],
      },
    ],
  },
  {
    slug: "wallpaper-aftercare",
    title: "도배 후 관리, 냄새와 닦는 법",
    description:
      "도배 직후 환기, 이음새 관리, 합지와 실크를 닦는 방법을 안내합니다. 풀이 마르는 하루이틀에 피하면 좋은 일도 함께 적었습니다.",
    keywords: [
      "도배 후 관리",
      "도배 냄새",
      "도배 후 환기",
      "실크 벽지 관리",
      "합지 벽지 청소",
    ],
    category: "시공 후",
    publishedAt: "2026-10-27",
    excerpt:
      "풀이 마르는 하루이틀이 중요합니다. 환기와 이음새, 합지는 마른 걸레, 실크는 며칠 뒤 부드러운 걸레로 나뉩니다.",
    lead: "시공이 끝난 직후가 관리의 대부분입니다. 풀이 마르는 하루이틀을 어떻게 보내느냐가, 이음새와 냄새, 벽이 자리 잡는 데 영향을 줍니다. 거창한 관리보다 그때 하지 말아야 할 일이 더 분명합니다.",
    cover: {
      src: "/portfolio/오금동 26-10-9,10/안방/시공후_안방1.JPG",
      alt: "오금동 안방 실크 도배 시공 후",
      caption:
        "오금동 안방. 실크 시공 직후의 빈 방입니다. 가구를 붙이기 전에 환기할 시간이 있으면 관리가 수월합니다.",
    },
    relatedSlugs: ["hapji-vs-silk", "wallpaper-process"],
    blocks: [
      {
        type: "h2",
        text: "하루이틀은 환기, 이음새는 그대로",
      },
      {
        type: "p",
        text: "풀 냄새가 빠지도록 창문을 조금 열어 두세요. 강한 바람이 벽에 오래 닿거나, 한낮 직사광선이 갓 바른 면에 바로 내리쬐는 것은 피하시는 편이 좋습니다. 겨울에도 잠깐씩 공기를 바꾸면 충분하고, 벽을 향해 온풍기를 오래 켜 둘 필요는 없습니다.",
      },
      {
        type: "p",
        text: "마르는 동안 이음새와 코너를 손으로 문지르지 않습니다. 들뜬 것처럼 보여도 젖은 상태에서 누르면 자국이 남을 수 있습니다. 가구와 가전도 벽에서 조금만 떼어 두고, 하루이틀 뒤에 붙이시는 것이 좋습니다.",
      },
      {
        type: "h2",
        text: "합지와 실크는 닦는 법이 다릅니다",
      },
      {
        type: "ul",
        items: [
          "합지는 물기를 피합니다. 먼지와 가벼운 자국은 마른 걸레로만 살살 닦습니다.",
          "실크는 시공 후 며칠이 지나 풀이 마른 뒤에, 부드러운 걸레로 관리할 수 있습니다.",
          "세제와 수세미는 둘 다 피합니다. 실크도 방수 벽은 아닙니다.",
          "얼룩은 넓게 문지르기보다 그 부분만 가볍게 눌러 닦습니다.",
        ],
      },
      {
        type: "pair",
        images: [
          {
            src: "/wallpapers/wallpaper-hapji.jpg",
            alt: "물기를 피해야 하는 합지 벽지 표면",
            caption: "합지. 물걸레를 오래 문지르면 종이가 상할 수 있습니다.",
          },
          {
            src: "/wallpapers/wallpaper-silk.jpg",
            alt: "마른 뒤 걸레질이 가능한 실크 벽지 표면",
            caption: "실크. 며칠 지난 뒤 부드러운 걸레로 닦을 수 있습니다.",
          },
        ],
      },
      {
        type: "h2",
        text: "자국이 보이면 그대로 두고 알려 주세요",
      },
      {
        type: "p",
        text: "들뜸이나 찢김이 보이면 젖은 면에 풀을 덧바르지 않는 것이 좋습니다. 임의로 손보면 자국이 커지기도 합니다. 어느 벽인지 알려 주시면 상태를 보고 이어서 안내합니다. 주방처럼 오염이 잦은 면은 일반 합지·실크와 관리가 다를 수 있어, 시공 전에 말씀해 주시는 편이 맞습니다.",
      },
      {
        type: "links",
        title: "이어서 보면 좋은 곳",
        items: [
          { href: "/blog/hapji-vs-silk", label: "합지와 실크 비교" },
          { href: "/blog/wallpaper-process", label: "도배 시공 순서" },
          { href: "/introduction", label: "시공 후 관리가 포함된 소개" },
        ],
      },
    ],
  },
  {
    slug: "wallpaper-process",
    title: "도배 시공 순서",
    description:
      "기존 벽지 제거부터 바탕 보수, 초배, 정배까지 도배 시공 순서를 현장 사진으로 설명합니다. 일정과 가구 정리에 참고하세요.",
    keywords: [
      "도배 순서",
      "도배 시공 과정",
      "초배",
      "벽지 제거",
      "도배 기간",
    ],
    category: "시공",
    publishedAt: "2026-10-27",
    excerpt:
      "벽지를 바르기 전에 제거와 바탕, 초배가 있습니다. 방 하나는 당일인 경우가 많고, 집 전체나 보수가 많으면 하루이틀이 더 필요합니다.",
    lead: "도배는 벽지를 바르는 장면만으로 끝나지 않습니다. 기존 벽을 걷어 내고, 면을 고르고, 밑지를 붙인 뒤에야 고르신 합지나 실크가 올라갑니다. 순서를 알고 있으면 가구를 언제 비울지, 입주일을 얼마나 띄울지 정하기 쉽습니다.",
    cover: {
      src: "/portfolio/오금동 26-10-9,10/거실/벽지제거_거실1.JPG",
      alt: "오금동 거실 기존 벽지 제거와 바탕 정리",
      caption:
        "오금동 거실. 실크를 바르기 전, 기존 마감을 정리하고 면을 고르는 단계입니다.",
    },
    relatedSlugs: ["wallpaper-aftercare", "before-move-in"],
    blocks: [
      {
        type: "h2",
        text: "현장에서 거치는 순서",
      },
      {
        type: "ul",
        items: [
          "공간 비우기. 벽을 비워 주시면 시공이 수월합니다. 옮기기 어려운 큰 가구는 미리 말씀해 주세요.",
          "기존 벽지 제거. 떠 있는 벽지와 낡은 초배를 걷어 냅니다. 여러 겹이 남아 있으면 이 과정이 길어집니다.",
          "바탕 보수. 구멍과 울퉁불퉁한 면을 메우고 고릅니다. 여기를 넘기면 새 벽지 위로 자국이 남습니다.",
          "초배. 벽이 벽지를 고르게 받아 주도록 밑지를 바릅니다. 상태가 좋은 면은 범위를 조절하기도 합니다.",
          "정배. 고르신 합지나 실크를 맞대어 바르고, 코너와 문틀, 콘센트 주변을 다듬습니다.",
          "마감 확인과 환기. 이음과 모서리를 보고, 풀 냄새가 빠지도록 창문을 조금 열어 둡니다.",
        ],
      },
      {
        type: "h2",
        text: "정배 전에 벽이 이렇게 바뀝니다",
      },
      {
        type: "p",
        text: "걷어 낸 직후의 벽은 색이 제각각입니다. 퍼티로 메운 자리와 초배가 붙는 자리가 사진에 함께 보입니다. 이 상태가 정돈되어야 마지막에 보이는 면이 고르게 나옵니다.",
      },
      {
        type: "figure",
        image: {
          src: "/portfolio/역삼동 26-09-23,29/101호/거실/초배_거실1.JPG",
          alt: "역삼동 고시텔 거실 초배와 바탕 보수",
          caption:
            "역삼동 고시텔 거실. 정배 전, 바탕을 메우고 초배를 정리하는 장면입니다.",
        },
      },
      {
        type: "figure",
        image: {
          src: "/portfolio/하남 26-10-8/기초.JPG",
          alt: "하남 원룸 벽 초배 작업",
          caption:
            "하남 원룸. 벽 아래와 천장 쪽에 밑지를 맞추는 중입니다. 바닥에 걷어 낸 벽지가 남아 있습니다.",
        },
      },
      {
        type: "figure",
        image: {
          src: "/portfolio/오금동 26-10-9,10/거실/시공후_거실1.JPG",
          alt: "바탕 작업을 마친 오금동 거실 실크 시공 후",
          caption:
            "같은 오금동 거실의 시공 후입니다. 제거와 바탕이 끝나야 이런 면이 나옵니다.",
        },
      },
      {
        type: "h2",
        text: "일정은 범위에 따라 달라집니다",
      },
      {
        type: "p",
        text: "방 하나나 부분 도배는 당일에 끝나는 경우가 많습니다. 집 전체이거나, 걷어 낸 뒤 보수가 많으면 하루이틀이 더 필요합니다. 입주일이 정해져 있다면 시공일 다음에 환기할 하루이틀을 일정에 넣어 두세요. 가구를 들이기 전이 이 순서와 가장 잘 맞습니다.",
      },
      {
        type: "links",
        title: "이어서 보면 좋은 곳",
        items: [
          { href: "/blog/wallpaper-aftercare", label: "도배 후 관리" },
          { href: "/blog/before-move-in", label: "이사 전에 도배하면 좋은 이유" },
          { href: portfolioHref("오금동 주거공간"), label: "오금동 시공 전후" },
          { href: portfolioHref("하남 주거공간"), label: "하남 원룸 시공 전후" },
        ],
      },
    ],
  },
  {
    slug: "before-move-in",
    title: "이사 전에 도배하면 좋은 이유",
    description:
      "입주·이사 전 도배 일정, 가구를 들이기 전 시공, 환기에 필요한 시간을 정리합니다. 퇴실 직후와 입주일 사이에 맞추는 방법을 안내합니다.",
    keywords: [
      "입주 전 도배",
      "이사 전 도배",
      "전세 도배",
      "아파트 도배 시기",
      "빈집 도배",
    ],
    category: "입주",
    publishedAt: "2026-10-27",
    excerpt:
      "가구가 없는 날이 도배에는 가장 편합니다. 시공 다음 날까지 환기할 수 있도록, 입주일과 하루이틀을 띄워 잡으면 좋습니다.",
    lead: "가구가 없는 날이 도배에는 가장 편한 날입니다. 이사 전, 또는 이전 거주자가 나간 직후가 그래서 많이 겹칩니다. 빈 집이면 벽을 온전히 볼 수 있고, 풀 냄새를 빼는 하루이틀을 가구 없이 보낼 수 있습니다.",
    cover: {
      src: "/portfolio/노원구 26-10-22/거실/시공후_거실.JPG",
      alt: "가구를 들이기 전 노원구 거실 도배 시공 후",
      caption:
        "노원구 거실. 장폭합지로 맞춘 뒤, 가구를 들이기 전의 모습입니다. 빈 상태에서 벽 전체를 확인하기 좋습니다.",
    },
    relatedSlugs: ["wallpaper-process", "wallpaper-cost"],
    blocks: [
      {
        type: "h2",
        text: "짐을 들인 뒤보다 일이 단순합니다",
      },
      {
        type: "p",
        text: "가구가 있는 집도 시공하지만, 큰 장을 빼야 하고 마르는 동안 가구를 벽에 붙이지 못하는 날이 생깁니다. 입주 전에 마치면 그 과정을 한 번에 줄일 수 있습니다. 콘센트와 문틀 주변도 가전에 가려지기 전에 다듬어 둡니다.",
      },
      {
        type: "p",
        text: "임대 집이라면 다음 입주 전에 합지로 전체 톤을 맞추는 요청이 많습니다. 실거주라면 거실과 아이 방을 실크로 두는 경우가 많습니다. 전세 만기처럼 날짜가 정해진 집은, 벽지 종류를 오래 고민하기보다 범위를 먼저 정하는 편이 일정이 덜 밀립니다.",
      },
      {
        type: "h2",
        text: "입주일과의 간격",
      },
      {
        type: "ul",
        items: [
          "퇴실 직후, 또는 도배할 수 있는 빈 날을 먼저 확보합니다.",
          "시공 다음 날까지는 환기 시간으로 둡니다. 입주일이 붙어 있으면 미리 말씀해 주세요.",
          "방 하나면 당일인 경우가 많고, 집 전체나 바탕 보수가 많으면 하루이틀이 더 필요할 수 있습니다.",
          "주말 입주라면 주말 시공도 일정에 따라 상담합니다.",
        ],
      },
      {
        type: "figure",
        image: {
          src: "/portfolio/하남 26-10-8/시공후1.JPG",
          alt: "입주 전 하남 원룸 실크 도배 시공 후",
          caption:
            "하남 원룸. 실크로 마친 빈 공간입니다. 입주 전에 창 주변과 문 옆 마감까지 확인하기 좋습니다.",
        },
      },
      {
        type: "figure",
        image: {
          src: "/portfolio/송파구26-09-05,07/거실/시공후_거실1.JPG",
          alt: "입주 전 송파구 거실 광폭합지 도배 시공 후",
          caption:
            "송파구 거실. 광폭합지로 긴 벽을 맞춘 빈 공간입니다. 가전을 들이기 전에 콘센트 주변을 정리해 둡니다.",
        },
      },
      {
        type: "p",
        text: "열쇠를 받은 날과 입주일, 방 개수를 알려 주시면 그 사이에 들어갈 수 있는 날로 맞춰 드립니다. 벽지 비교가 필요하면 합지와 실크, 광폭과 소폭 글부터 보시고 관심 있는 쪽을 같이 적어 주세요.",
      },
      {
        type: "links",
        title: "이어서 보면 좋은 곳",
        items: [
          { href: "/contact", label: "입주 일정 상담" },
          { href: "/blog/wallpaper-process", label: "도배 시공 순서" },
          { href: "/blog/hapji-vs-silk", label: "합지와 실크 비교" },
          { href: portfolioHref("노원구 주거공간"), label: "노원구 시공 사례" },
          { href: portfolioHref("하남 주거공간"), label: "하남 원룸 시공 사례" },
        ],
      },
    ],
  },
];

export function getPostHref(post: Pick<BlogPost, "slug">) {
  return `/blog/${post.slug}`;
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsBySlug(slugs: string[]) {
  return slugs
    .map((slug) => getBlogPost(slug))
    .filter((post): post is BlogPost => Boolean(post));
}

export function getRelatedPosts(post: BlogPost) {
  return getBlogPostsBySlug(post.relatedSlugs);
}

export function formatPostDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${year}.${month}.${day}`;
}
