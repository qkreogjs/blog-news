import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

const SITE_NAME = "ニュースインサイト";
const SITE_DESC = "今日のホットニュース・エンタメ・スポーツを速報。";

export default function JaHome() {
  const recentPosts = getAllPosts("ja").slice(0, 3);

  return (
    <div>
      <section className="mb-12 py-8 border-b border-gray-100">
        <h1 className="text-4xl font-bold mb-3 tracking-tight">{SITE_NAME}</h1>
        <p className="text-gray-500 text-lg mb-6">{SITE_DESC}</p>
        <a href="/ja/blog" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors font-medium">
          記事をすべて見る →
        </a>
      </section>
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">最新記事</h2>
          <a href="/ja/blog" className="text-sm text-blue-500 hover:text-blue-700">もっと見る →</a>
        </div>
        {recentPosts.length === 0 ? (
          <p className="text-gray-400 text-center py-20">最初の記事が間もなく公開されます。</p>
        ) : (
          <div className="space-y-8">
            {recentPosts.map(post => (
              <article key={post.slug} className="group border-b border-gray-100 pb-8">
                <Link href={`/ja/blog/${post.slug}`} className="flex gap-5 items-start">
                  {post.image && (
                    <div className="relative shrink-0 w-40 h-24 rounded-xl overflow-hidden bg-gray-100">
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{post.description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <time>{new Date(post.publishedAt).toLocaleDateString("ja-JP")}</time>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
