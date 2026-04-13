import type { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SITE_NAME = "News Insight";
const SITE_DESC = "Breaking trends, entertainment, and sports news";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3334";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESC,
  openGraph: { siteName: SITE_NAME, locale: "en_US", url: SITE_URL },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESC },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Breaking news ticker bar */}
      <div style={{ backgroundColor: "#C8000A", color: "#fff" }} className="py-1.5 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-4">
          <span className="text-xs font-black tracking-wider shrink-0 border border-white px-2 py-0.5">BREAKING</span>
          <span className="text-xs truncate">Latest trends, breaking news, entertainment &amp; sports — delivered fast</span>
          <span className="text-xs shrink-0 ml-auto opacity-75">{new Date().toLocaleDateString("en-US")}</span>
        </div>
      </div>
      {/* Newspaper masthead */}
      <header style={{ backgroundColor: "#FFFFFF", borderBottom: "3px solid #111827" }} className="sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4">
          {/* Top title row */}
          <div style={{ borderBottom: "1px solid #E5E7EB" }} className="py-3 flex items-center justify-between">
            <a href="/en" className="block">
              <div style={{ color: "#111827", fontFamily: "serif", letterSpacing: "-0.03em" }} className="text-3xl font-black">News Insight</div>
              <div style={{ color: "#6B7280" }} className="text-xs tracking-widest">NEWS INSIGHT · WORLD</div>
            </a>
            <div className="flex items-center gap-4">
              <LanguageSwitcher currentLang="en" />
            </div>
          </div>
          {/* Section nav */}
          <nav className="flex gap-0 text-sm font-bold overflow-x-auto">
            {[["Home", "/en"], ["All Articles", "/en/blog"], ["Entertainment", "/en/blog?tag=Entertainment"], ["Sports", "/en/blog?tag=Sports"], ["Economy", "/en/blog?tag=Economy"], ["Society", "/en/blog?tag=Society"]].map(([label, href]) => (
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
              <div style={{ color: "#fff", fontFamily: "serif" }} className="text-2xl font-black">News Insight</div>
              <div style={{ color: "#9CA3AF" }} className="text-xs mt-1">NEWS INSIGHT · WORLD</div>
            </div>
            <div style={{ color: "#9CA3AF" }} className="text-xs text-right">
              <div>Fast and accurate trend news</div>
              <div className="mt-1">© {new Date().getFullYear()} News Insight</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #374151" }} className="pt-4 flex justify-between items-center">
            <div style={{ color: "#6B7280" }} className="text-xs">Content on this site is for informational purposes only and does not constitute investment or legal advice.</div>
            <div className="flex gap-4 text-xs" style={{ color: "#6B7280" }}>
              <a href="/en/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/en/terms" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
