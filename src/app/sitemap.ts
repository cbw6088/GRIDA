import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";

const staticPaths = [
  { path: "/", priority: 1 },
  { path: "/introduction", priority: 0.8 },
  { path: "/wallpaper", priority: 0.8 },
  { path: "/portfolio", priority: 0.9 },
  { path: "/contact", priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticPaths.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.url).href,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const projects = portfolioProjects.map((project) => ({
    url: new URL(`/portfolio/${project.slug}`, siteConfig.url).href,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...projects];
}
