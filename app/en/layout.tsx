import type { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SITE_NAME = "News Insight";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3333";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: "Today's hot issues — entertainment, sports, trending topics.",
  openGraph: { siteName: SITE_NAME, locale: "en_US", url: `${SITE_URL}/en` },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/en" className="text-xl font-bold text-gray-900">{SITE_NAME}</a>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4 text-sm text-gray-500">
              <a href="/en" className="hover:text-gray-900 transition-colors">Home</a>
              <a href="/en/blog" className="hover:text-gray-900 transition-colors">All Posts</a>
            </nav>
            <LanguageSwitcher currentLang="en" />
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10 min-h-[80vh]">
        {children}
      </main>
      <footer className="border-t border-gray-100 mt-20 py-8 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="/privacy" className="hover:text-gray-600">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-600">Terms of Service</a>
        </div>
      </footer>
    </>
  );
}
