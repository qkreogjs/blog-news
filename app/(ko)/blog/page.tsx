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

export default function BlogListPage() {
  const posts = getAllPosts("ko");

  return (
    <div>
      <header className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-2xl font-bold mb-1">전체 글</h1>
        <p className="text-gray-400 text-sm">총 {posts.length}편</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-gray-400 text-center py-20">첫 번째 포스트가 곧 올라옵니다.</p>
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
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
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
              <div className="flex flex-wrap gap-1.5 mt-3 ml-0">
                {post.tags.slice(0, 4).map(tag => (
                  <a
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-600 px-2 py-0.5 rounded-full transition-colors"
                  >
                    {tag}
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
