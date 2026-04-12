import { getAllPosts } from "@/lib/posts";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3333";

export default function sitemap(): MetadataRoute.Sitemap {
  const koPosts = getAllPosts('ko');
  const enPosts = getAllPosts('en');
  const jaPosts = getAllPosts('ja');

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...koPosts.map(post => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...enPosts.map(post => ({
      url: `${SITE_URL}/en/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...jaPosts.map(post => ({
      url: `${SITE_URL}/ja/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
