import type { MetadataRoute } from "next";
import { blogPosts, getPostHref } from "@/lib/posts";
import { portfolioProjects } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";

const staticPaths: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  ...siteConfig.nav
    .filter((item) => item.href !== "/")
    .map((item) => ({ path: item.href, priority: 0.9 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticPaths.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.url).href,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const projects = portfolioProjects.map((project) => ({
    url: new URL(`/portfolio/${project.id}`, siteConfig.url).href,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const posts = blogPosts.map((post) => ({
    url: new URL(getPostHref(post), siteConfig.url).href,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...posts, ...projects];
}
