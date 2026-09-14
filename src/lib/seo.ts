import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const defaultKeywords = [
  "그리다, 공간",
  "그리다 공간",
  "도배",
  "도배 시공",
  "인테리어",
  "시공",
  "주거 도배",
  "상업 도배",
  "서울 도배",
  "경기 도배",
] as const;

type PageMetadataInput = {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
};

export function pageMetadata({
  title,
  description,
  keywords = [],
  path,
}: PageMetadataInput): Metadata {
  const ogTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
    },
    twitter: {
      title: ogTitle,
      description,
    },
  };
}
