import type { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "뉴스인사이트";
const SITE_DESC = process.env.NEXT_PUBLIC_SITE_DESC ?? "오늘의 핫이슈·연예·스포츠 트렌드를 빠르게 정리합니다.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3333";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESC,
  openGraph: { siteName: SITE_NAME, locale: "ko_KR", url: SITE_URL },
  twitter: { card: "summary_large_image", site: "@insightlab_kr", title: SITE_NAME, description: SITE_DESC },
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-gray-900">{SITE_NAME}</a>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4 text-sm text-gray-500">
              <a href="/" className="hover:text-gray-900 transition-colors">홈</a>
              <a href="/blog" className="hover:text-gray-900 transition-colors">전체글</a>
            </nav>
            <LanguageSwitcher currentLang="ko" />
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10 min-h-[80vh]">
        {children}
      </main>
      <footer className="border-t border-gray-100 mt-20 py-8 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="/privacy" className="hover:text-gray-600">개인정보처리방침</a>
          <a href="/terms" className="hover:text-gray-600">이용약관</a>
        </div>
      </footer>
    </>
  );
}
