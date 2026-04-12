import { getAllSlugs, getPostBySlug, getAlternateLangs, getAllPosts, getAdjacentPosts } from "@/lib/posts";
import { articleSchema, breadcrumbSchema, faqSchema, extractToc } from "@/lib/seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import TableOfContents from "@/components/TableOfContents";
import RelatedPosts from "@/components/RelatedPosts";
import TweetEmbed from "@/components/TweetEmbed";
import YouTubeEmbed from "@/components/YouTubeEmbed";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs('ko').map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'ko');
  if (!post) return {};
  const alts = getAlternateLangs(slug);
  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'AI인사이트';

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    alternates: {
      canonical: `/blog/${slug}`,
      languages: alts as Record<string, string>,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      tags: post.tags,
      locale: "ko_KR",
      siteName: SITE_NAME,
      ...(post.image ? { images: [{ url: post.image, width: 1200, height: 630, alt: post.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'ko');
  if (!post) notFound();

  const toc = extractToc(post.content);
  const { prev, next } = getAdjacentPosts(slug, 'ko');
  const recentPosts = getAllPosts('ko').filter(p => p.slug !== slug).slice(0, 5);

  const article = articleSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    publishedAt: post.publishedAt,
    tags: post.tags,
    image: post.image,
    wordCount: post.content.split(/\s+/).length,
  });
  const breadcrumb = breadcrumbSchema({ title: post.title, slug: post.slug });
  const faq = faqSchema(post.content);

  return (
    <>
      {/* JSON-LD 스키마 */}
      <Script id="schema-article" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <Script id="schema-breadcrumb" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faq && (
        <Script id="schema-faq" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      )}

      {/* 상단 네비게이션 바 */}
      <div className="flex items-center justify-between mb-6">
        <nav aria-label="breadcrumb" className="text-xs text-gray-400 flex items-center gap-1.5">
          <a href="/" className="hover:text-gray-600">홈</a>
          <span>›</span>
          <a href="/blog" className="hover:text-gray-600">전체글</a>
          <span>›</span>
          <span className="text-gray-600 line-clamp-1 max-w-[200px]">{post.title}</span>
        </nav>
        <a
          href="/blog"
          className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-full hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          ← 목록으로
        </a>
      </div>

      <article itemScope itemType="https://schema.org/Article">
        {/* 썸네일 */}
        {post.image && (
          <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              itemProp="image"
            />
          </div>
        )}

        {/* 헤더 */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <a
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
          <h1 className="text-3xl font-bold leading-snug mb-4" itemProp="headline">
            {post.title}
          </h1>
          <p className="text-gray-500 text-lg mb-4" itemProp="description">
            {post.description}
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-400 border-b border-gray-100 pb-6">
            <time itemProp="datePublished" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("ko-KR", {
                year: "numeric", month: "long", day: "numeric"
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
            <span>·</span>
            <span>{post.content.split(/\s+/).length.toLocaleString()}자</span>
          </div>
        </header>

        {/* 목차 */}
        <TableOfContents items={toc} />

        {/* 본문 */}
        <div
          className="prose prose-gray max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-20
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-8 prose-p:text-gray-700
            prose-li:text-gray-700 prose-li:leading-8
            prose-strong:text-gray-900
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
            prose-img:rounded-xl"
          itemProp="articleBody"
        >
          <MDXRemote
            source={post.content}
            components={{ TweetEmbed, YouTubeEmbed }}
          />
        </div>

        {/* AdSense 인아티클 */}
        <div className="my-10 p-4 bg-gray-50 rounded-xl text-center text-xs text-gray-400 min-h-[100px] flex items-center justify-center">
          광고 영역
        </div>

        {/* 태그 푸터 */}
        <footer className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <a
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-xs border border-gray-200 text-gray-500 px-3 py-1 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                # {tag}
              </a>
            ))}
          </div>
        </footer>
      </article>

      {/* 이전글 / 다음글 */}
      {(prev || next) && (
        <nav className="mt-10 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4" aria-label="이전/다음 글">
          <div>
            {prev && (
              <Link href={`/blog/${prev.slug}`} className="group flex flex-col gap-1 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <span>←</span> 이전 글
                </span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 line-clamp-2 transition-colors">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link href={`/blog/${next.slug}`} className="group flex flex-col gap-1 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors text-right">
                <span className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                  다음 글 <span>→</span>
                </span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 line-clamp-2 transition-colors">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* 관련 글 */}
      <RelatedPosts currentSlug={post.slug} tags={post.tags} />

      {/* 최신 글 5개 */}
      {recentPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-gray-800">최신 글</h2>
            <a href="/blog" className="text-xs text-blue-500 hover:text-blue-700">전체보기 →</a>
          </div>
          <ul className="space-y-3">
            {recentPosts.map(p => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="flex items-start gap-3 group"
                >
                  {p.image && (
                    <div className="relative shrink-0 w-16 h-10 rounded-lg overflow-hidden bg-gray-100">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 line-clamp-1 transition-colors">
                      {p.title}
                    </p>
                    <time className="text-xs text-gray-400">
                      {new Date(p.publishedAt).toLocaleDateString("ko-KR")}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 하단 목록으로 버튼 */}
      <div className="mt-10 flex justify-center">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 border border-gray-200 px-5 py-2.5 rounded-full hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          ← 목록으로 돌아가기
        </a>
      </div>
    </>
  );
}
