import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all articles.",
  alternates: { canonical: "/en/blog" },
};

export default async function EnNewsBlogList({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const allPosts = getAllPosts("en");
  const posts = tag ? allPosts.filter(p => p.tags?.includes(tag)) : allPosts;

  return (
    <div>
      <header className="mb-8 border-b border-gray-100 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">All Posts</h1>
            <p className="text-gray-400 text-sm">{posts.length} posts total</p>
          </div>
          {tag && (
            <div className="flex items-center gap-2">
              <span style={{ backgroundColor: "var(--color-primary)", color: "#fff" }} className="text-xs px-3 py-1 rounded-full font-medium">
                #{tag}
              </span>
              <a href="/en/blog" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Clear ×</a>
            </div>
          )}
        </div>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 mb-3">No posts found for &apos;{tag}&apos;.</p>
          <a href="/en/blog" style={{ color: "var(--color-primary)" }} className="text-sm">View all posts →</a>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <article key={post.slug} className="group border-b border-gray-100 pb-6">
              <Link href={`/en/blog/${post.slug}`} className="flex gap-5 items-start">
                {post.image && (
                  <div className="relative shrink-0 w-40 h-24 rounded-xl overflow-hidden bg-gray-100">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-red-600 transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{post.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <time>{new Date(post.publishedAt).toLocaleDateString("en-US")}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags?.slice(0, 4).map(t => (
                  <a
                    key={t}
                    href={`/en/blog?tag=${encodeURIComponent(t)}`}
                    style={t === tag ? { backgroundColor: "var(--color-primary)", color: "#fff" } : {}}
                    className="text-xs bg-gray-100 hover:bg-red-50 hover:text-red-600 px-2 py-0.5 rounded-full transition-colors"
                  >
                    {t}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
