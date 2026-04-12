/**
 * SEO JSON-LD 스키마 생성 유틸리티
 * Google Rich Results 최적화
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://insightlab.kr';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'AI인사이트';

// ─── WebSite + Organization 스키마 (layout에 삽입) ──────────────────────
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: 'ko-KR',
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
      },
    ],
  };
}

// ─── Article 스키마 (포스트 페이지에 삽입) ──────────────────────────────
export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  tags: string[];
  image?: string;
  wordCount?: number;
}) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.image ? [`${SITE_URL}${post.image}`] : undefined,
    keywords: post.tags.join(', '),
    wordCount: post.wordCount,
    inLanguage: 'ko-KR',
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

// ─── BreadcrumbList 스키마 ───────────────────────────────────────────────
export function breadcrumbSchema(post: { title: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: '블로그', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };
}

// ─── FAQ 스키마 (마크다운에서 Q&A 추출) ────────────────────────────────
export function faqSchema(content: string) {
  const faqs: { q: string; a: string }[] = [];

  // ## FAQ / ### Q: 패턴 추출
  const faqSection = content.match(/#{2,3}\s*FAQ[\s\S]*?(?=#{1,2}\s|$)/i)?.[0] || '';
  const qaPattern = /\*\*Q[:：]?\s*(.+?)\*\*[\s\S]*?(?:\*\*A[:：]?\*\*|A[:：])\s*(.+?)(?=\*\*Q|$)/gi;

  let match;
  const src = faqSection || content;
  while ((match = qaPattern.exec(src)) !== null) {
    const q = match[1].trim();
    const a = match[2].replace(/\n+/g, ' ').trim().slice(0, 300);
    if (q && a) faqs.push({ q, a });
    if (faqs.length >= 5) break;
  }

  if (!faqs.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// ─── 목차용 헤딩 추출 ───────────────────────────────────────────────────
export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractToc(content: string): TocItem[] {
  const headings = content.matchAll(/^(#{2,3})\s+(.+)$/gm);
  const toc: TocItem[] = [];

  for (const match of headings) {
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\*\*/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s]/g, '')
      .replace(/\s+/g, '-');
    toc.push({ id, text, level });
  }

  return toc.slice(0, 12); // 최대 12개
}
