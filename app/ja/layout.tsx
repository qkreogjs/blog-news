import type { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SITE_NAME = "ニュースインサイト";
const SITE_DESC = "最新トレンド・エンタメ・スポーツニュース";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3334";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESC,
  openGraph: { siteName: SITE_NAME, locale: "ja_JP", url: SITE_URL },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESC },
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 速報ティッカーバー */}
      <div style={{ backgroundColor: "#C8000A", color: "#fff" }} className="py-1.5 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-4">
          <span className="text-xs font-black tracking-wider shrink-0 border border-white px-2 py-0.5">速報</span>
          <span className="text-xs truncate">最新トレンド・ニュース・エンタメ・スポーツをいち早くお届けします</span>
          <span className="text-xs shrink-0 ml-auto opacity-75">{new Date().toLocaleDateString("ja-JP")}</span>
        </div>
      </div>
      {/* 新聞マストヘッド */}
      <header style={{ backgroundColor: "#FFFFFF", borderBottom: "3px solid #111827" }} className="sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4">
          {/* 上部タイトル行 */}
          <div style={{ borderBottom: "1px solid #E5E7EB" }} className="py-3 flex items-center justify-between">
            <a href="/ja" className="block">
              <div style={{ color: "#111827", fontFamily: "serif", letterSpacing: "-0.03em" }} className="text-3xl font-black">ニュースインサイト</div>
              <div style={{ color: "#6B7280" }} className="text-xs tracking-widest">ニュースインサイト · 日本</div>
            </a>
            <div className="flex items-center gap-4">
              <LanguageSwitcher currentLang="ja" />
            </div>
          </div>
          {/* セクションナビ */}
          <nav className="flex gap-0 text-sm font-bold overflow-x-auto">
            {[["ホーム", "/ja"], ["全記事", "/ja/blog"], ["エンタメ", "/ja/blog?tag=エンタメ"], ["スポーツ", "/ja/blog?tag=スポーツ"], ["経済", "/ja/blog?tag=経済"], ["社会", "/ja/blog?tag=社会"]].map(([label, href]) => (
              <a key={label} href={href} style={{ color: "#111827", borderRight: "1px solid #E5E7EB" }} className="px-4 py-2.5 text-xs hover:bg-gray-100 transition-colors whitespace-nowrap">{label}</a>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8 min-h-[80vh]">
        {children}
      </main>
      <footer style={{ backgroundColor: "#111827", borderTop: "4px solid #C8000A" }} className="mt-20 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div style={{ color: "#fff", fontFamily: "serif" }} className="text-2xl font-black">ニュースインサイト</div>
              <div style={{ color: "#9CA3AF" }} className="text-xs mt-1">ニュースインサイト · 日本</div>
            </div>
            <div style={{ color: "#9CA3AF" }} className="text-xs text-right">
              <div>速報・正確なトレンドニュース</div>
              <div className="mt-1">© {new Date().getFullYear()} ニュースインサイト</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #374151" }} className="pt-4 flex justify-between items-center">
            <div style={{ color: "#6B7280" }} className="text-xs">本サイトのコンテンツは情報提供目的であり、投資・法律アドバイスではありません。</div>
            <div className="flex gap-4 text-xs" style={{ color: "#6B7280" }}>
              <a href="/ja/privacy" className="hover:text-white transition-colors">プライバシーポリシー</a>
              <a href="/ja/terms" className="hover:text-white transition-colors">利用規約</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
