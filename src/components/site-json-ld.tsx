import { siteConfig } from "@/lib/site";

function toInternationalPhone(phoneTel: string) {
  if (phoneTel.startsWith("010") && phoneTel.length === 11) {
    return `+82-10-${phoneTel.slice(3, 7)}-${phoneTel.slice(7)}`;
  }

  return phoneTel;
}

const mainPages = siteConfig.nav.map((item, index) => {
  const url = new URL(item.href, siteConfig.url).href;

  return {
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: item.label,
      url,
      inLanguage: "ko-KR",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
    },
  };
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      alternateName: ["그리다 공간", siteConfig.nameEn],
      url: siteConfig.url,
      inLanguage: "ko-KR",
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#business` },
      hasPart: mainPages.map((page) => ({ "@id": page.item["@id"] })),
    },
    {
      "@type": "ItemList",
      "@id": `${siteConfig.url}/#main-pages`,
      name: "주요 페이지",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: mainPages.length,
      itemListElement: mainPages,
    },
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      alternateName: ["그리다 공간", siteConfig.nameEn],
      url: siteConfig.url,
      image: new URL(siteConfig.ogImage, siteConfig.url).href,
      logo: new URL("/brand/logo.png", siteConfig.url).href,
      telephone: toInternationalPhone(siteConfig.contact.phoneTel),
      email: siteConfig.contact.email,
      description: siteConfig.description,
      slogan: siteConfig.slogan,
      areaServed: [
        { "@type": "AdministrativeArea", "name": "서울특별시" },
        { "@type": "AdministrativeArea", "name": "경기도" },
      ],
      serviceType: ["도배 시공", "주거 도배", "상업 도배"],
    },
  ],
};

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
