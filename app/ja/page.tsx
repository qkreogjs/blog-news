import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

const SITE_DESC = "最新トレンド・エンタメ・スポーツニュース";

export default function Home() {
  const allPosts = getAllPosts("ja");
  const lead = allPosts[0];
  const secondary = allPosts.slice(1, 3);
  const listPosts = allPosts.slice(3, 10);

  return (
    <div>
      {/* 新聞1面レイアウト */}
      {lead ? (
        <section style={{ borderBottom: "2px solid #111827" }} className="mb-8 pb-8">
          {/* 日付ヘッダー */}
          <div style={{ borderBottom: "1px solid #D1D5DB", borderTop: "1px solid #D1D5DB", color: "#6B7280" }} className="py-1 mb-6 flex justify-between text-xs">
            <span>{new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "long" })}</span>
            <span>今日のニュースインサイト</span>
          </div>

          {/* メイン記事（2段グリッド） */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* 左：ヘッドライン */}
            <div className="md:col-span-3">
              <Link href={`/ja/blog/${lead.slug}`} className="group block">
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ background: "#C8000A", color: "#fff" }} className="text-xs font-black px-2 py-0.5 tracking-wider">TOP STORY</span>
                  {lead.tags?.[0] && <span style={{ color: "#6B7280" }} className="text-xs">{lead.tags[0]}</span>}
                </div>
                <h1 style={{ color: "#111827", fontFamily: "serif", lineHeight: "1.2" }} className="text-3xl font-black mb-3 group-hover:text-red-700 transition-colors">{lead.title}</h1>
                <p style={{ color: "#374151", lineHeight: "1.7" }} className="text-sm mb-4 line-clamp-4">{lead.description}</p>
                <div style={{ color: "#6B7280" }} className="text-xs flex items-center gap-3">
                  <time>{new Date(lead.publishedAt).toLocaleDateString("ja-JP")}</time>
                  {lead.readingTime && <><span>·</span><span>{lead.readingTime}</span></>}
                </div>
              </Link>
            </div>
            {/* 右：画像 */}
            {lead.image && (
              <div className="md:col-span-2">
                <Link href={`/ja/blog/${lead.slug}`} className="group block">
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image src={lead.image} alt={lead.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p style={{ color: "#9CA3AF", borderTop: "1px solid #E5E7EB" }} className="text-xs pt-1 mt-1 italic">{lead.title}</p>
                </Link>
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="text-center py-20">
          <p style={{ color: "#9CA3AF" }}>最初の記事が間もなく公開されます。</p>
        </div>
      )}

      {/* 2段サブ記事＋リスト */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 左2/3：サブ記事2本 */}
        <div className="md:col-span-2">
          {secondary.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {secondary.map(post => (
                <article key={post.slug} style={{ borderTop: "2px solid #111827" }} className="pt-3 group">
                  <Link href={`/ja/blog/${post.slug}`}>
                    {post.image && (
                      <div className="relative w-full h-28 overflow-hidden mb-2">
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
                    <h3 style={{ color: "#111827", fontFamily: "serif" }} className="text-base font-bold mb-1 line-clamp-2 group-hover:text-red-700 transition-colors">{post.title}</h3>
                    <p style={{ color: "#6B7280" }} className="text-xs line-clamp-2 mb-2">{post.description}</p>
                    <time style={{ color: "#9CA3AF" }} className="text-xs">{new Date(post.publishedAt).toLocaleDateString("ja-JP")}</time>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* 右1/3：記事リスト */}
        <div>
          <div style={{ borderTop: "2px solid #C8000A", borderBottom: "1px solid #D1D5DB" }} className="py-2 mb-3">
            <h2 style={{ color: "#111827" }} className="text-xs font-black tracking-widest">MORE STORIES</h2>
          </div>
          <div className="space-y-0">
            {listPosts.map((post, i) => (
              <article key={post.slug} style={{ borderBottom: "1px solid #E5E7EB" }} className="py-3 group">
                <Link href={`/ja/blog/${post.slug}`} className="flex gap-3 items-start">
                  <span style={{ color: "#C8000A", fontFamily: "monospace" }} className="text-xs font-bold shrink-0 w-5">{String(i + 4).padStart(2, "0")}</span>
                  <div>
                    <h3 style={{ color: "#111827" }} className="text-xs font-semibold line-clamp-2 group-hover:text-red-700 transition-colors">{post.title}</h3>
                    <time style={{ color: "#9CA3AF" }} className="text-xs">{new Date(post.publishedAt).toLocaleDateString("ja-JP", { month: "2-digit", day: "2-digit" })}</time>
                  </div>
                </Link>
              </article>
            ))}
            {listPosts.length === 0 && secondary.length === 0 && lead === undefined && (
              <p style={{ color: "#9CA3AF" }} className="text-xs py-4">記事がありません。</p>
            )}
          </div>
          <a href="/ja/blog" style={{ color: "#C8000A", borderTop: "1px solid #E5E7EB" }} className="block pt-3 text-xs font-bold hover:opacity-80">全記事を見る →</a>
        </div>
      </div>
    </div>
  );
}
