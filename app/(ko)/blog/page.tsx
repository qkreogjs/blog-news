import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "블로그";

export const metadata: Metadata = {
  title: "전체 글",
  description: `${SITE_NAME}의 모든 글을 모아놓은 페이지입니다.`,
  alternates: { canonical: "/blog" },
};

export default async function BlogListPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const { tag } = await searchParams;
  const allPosts = getAllPosts("ko");
  const posts = tag ? allPosts.filter(p => p.tags?.includes(tag)) : allPosts;

  return (
    <div>
      <header className="mb-8 border-b border-gray-100 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">전체 글</h1>
            <p className="text-gray-400 text-sm">총 {posts.length}편</p>
          </div>
          {tag && (
            <div className="flex items-center gap-2">
              <span style={{ backgroundColor: "var(--color-primary)", color: "#fff" }} className="text-xs px-3 py-1 rounded-full font-medium">
                #{tag}
              </span>
              <a href="/blog" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">전체보기 ×</a>
            </div>
          )}
        </div>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 mb-3">'{tag}' 태그의 글이 없습니다.</p>
          <a href="/blog" style={{ color: "var(--color-primary)" }} className="text-sm">전체 글 보기 →</a>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <article key={post.slug} className="group border-b border-gray-100 pb-6">
              <Link href={`/blog/${post.slug}`} className="flex gap-5 items-start">
                {post.image && (
                  <div className="relative shrink-0 w-40 h-24 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{post.description}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                    <time>{new Date(post.publishedAt).toLocaleDateString("ko-KR")}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
              {/* 태그는 Link 외부에 배치 (a 중첩 방지) */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags?.slice(0, 4).map(t => (
                  <a
                    key={t}
                    href={`/blog?tag=${encodeURIComponent(t)}`}
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
