import type { Metadata } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
import { websiteSchema } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3333";
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const lang = h.get("x-lang") ?? "ko";

  return (
    <html lang={lang}>
      <body className="antialiased" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
        {children}
        <Script id="schema-website" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }} />
        {ADSENSE_ID && (
          <Script async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}

