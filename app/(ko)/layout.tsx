import type { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "뉴스인사이트";
const SITE_DESC = process.env.NEXT_PUBLIC_SITE_DESC ?? "오늘의 핫이슈·연예·스포츠 트렌드를 빠르게 정리합니다.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3334";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESC,
  openGraph: { siteName: SITE_NAME, locale: "ko_KR", url: SITE_URL },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESC },
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 속보 티커 바 */}
      <div style={{ backgroundColor: "#C8000A", color: "#fff" }} className="py-1.5 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-4">
          <span className="text-xs font-black tracking-wider shrink-0 border border-white px-2 py-0.5">속보</span>
          <span className="text-xs truncate">최신 트렌드·이슈·연예·스포츠를 가장 빠르게 전달합니다</span>
          <span className="text-xs shrink-0 ml-auto opacity-75">{new Date().toLocaleDateString("ko-KR")}</span>
        </div>
      </div>
      {/* 신문 마스트헤드 */}
      <header style={{ backgroundColor: "#FFFFFF", borderBottom: "3px solid #111827" }} className="sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4">
          {/* 상단 타이틀 행 */}
          <div style={{ borderBottom: "1px solid #E5E7EB" }} className="py-3 flex items-center justify-between">
            <a href="/" className="block">
              <div style={{ color: "#111827", fontFamily: "serif", letterSpacing: "-0.03em" }} className="text-3xl font-black">뉴스인사이트</div>
              <div style={{ color: "#6B7280" }} className="text-xs tracking-widest">NEWS INSIGHT · KOREA</div>
            </a>
            <div className="flex items-center gap-4">
              <LanguageSwitcher currentLang="ko" />
            </div>
          </div>
          {/* 섹션 내비 */}
          <nav className="flex gap-0 text-sm font-bold overflow-x-auto">
            {[["홈", "/"], ["전체기사", "/blog"], ["연예", "/blog?tag=연예"], ["스포츠", "/blog?tag=스포츠"], ["경제", "/blog?tag=경제"], ["사회", "/blog?tag=사회"]].map(([label, href]) => (
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
              <div style={{ color: "#fff", fontFamily: "serif" }} className="text-2xl font-black">뉴스인사이트</div>
              <div style={{ color: "#9CA3AF" }} className="text-xs mt-1">NEWS INSIGHT · KOREA</div>
            </div>
            <div style={{ color: "#9CA3AF" }} className="text-xs text-right">
              <div>빠르고 정확한 트렌드 뉴스</div>
              <div className="mt-1">© {new Date().getFullYear()} 뉴스인사이트</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #374151" }} className="pt-4 flex justify-between items-center">
            <div style={{ color: "#6B7280" }} className="text-xs">본 사이트의 콘텐츠는 정보 제공 목적이며 투자·법률 조언이 아닙니다.</div>
            <div className="flex gap-4 text-xs" style={{ color: "#6B7280" }}>
              <a href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href="/terms" className="hover:text-white transition-colors">이용약관</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
