import type { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SITE_NAME = "ニュースインサイト";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3333";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: "ニュースインサイトの最新情報をお届けします。",
  openGraph: { siteName: SITE_NAME, locale: "ja_JP", url: `${SITE_URL}/ja` },
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/ja" className="text-xl font-bold text-gray-900">{SITE_NAME}</a>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4 text-sm text-gray-500">
              <a href="/ja" className="hover:text-gray-900 transition-colors">ホーム</a>
              <a href="/ja/blog" className="hover:text-gray-900 transition-colors">記事一覧</a>
            </nav>
            <LanguageSwitcher currentLang="ja" />
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10 min-h-[80vh]">
        {children}
      </main>
      <footer className="border-t border-gray-100 mt-20 py-8 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="/privacy" className="hover:text-gray-600">プライバシーポリシー</a>
          <a href="/terms" className="hover:text-gray-600">利用規約</a>
        </div>
      </footer>
    </>
  );
}
