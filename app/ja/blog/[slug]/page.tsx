import { getAllSlugs, getPostBySlug, getAlternateLangs } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import TweetEmbed from "@/components/TweetEmbed";
import YouTubeEmbed from "@/components/YouTubeEmbed";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs("ja").map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "ja") ?? getPostBySlug(slug, "ko");
  if (!post) return {};
  const alts = getAlternateLangs(slug);
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/ja/blog/${slug}`,
      languages: alts as Record<string, string>,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
      locale: "ja_JP",
      ...(post.image ? { images: [{ url: post.image, width: 1200, height: 630 }] } : {}),
    },
  };
}

export default async function BlogPostJa({ params }: Props) {
  const { slug } = await params;
  const jaPost = getPostBySlug(slug, "ja");

  if (!jaPost) notFound();

  return (
    <article>
      <div className="flex items-center justify-between mb-6">
        <nav className="text-xs text-gray-400 flex items-center gap-1.5">
          <a href="/ja" className="hover:text-gray-600">ホーム</a>
          <span>›</span>
          <a href="/ja/blog" className="hover:text-gray-600">記事一覧</a>
          <span>›</span>
          <span className="text-gray-600 line-clamp-1 max-w-[200px]">{jaPost.title}</span>
        </nav>
        <a href="/ja/blog" className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-full hover:border-blue-400 hover:text-blue-600 transition-colors">
          ← 一覧へ戻る
        </a>
      </div>

      {jaPost.image && (
        <div className="relative w-full aspect-[1200/630] rounded-2xl overflow-hidden mb-8">
          <Image src={jaPost.image} alt={jaPost.title} fill className="object-cover" priority />
        </div>
      )}
      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {jaPost.tags.map(tag => (
            <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold leading-snug mb-4">{jaPost.title}</h1>
        <p className="text-gray-500 text-lg mb-4">{jaPost.description}</p>
        <div className="flex items-center gap-3 text-sm text-gray-400 border-b border-gray-100 pb-6">
          <time>{new Date(jaPost.publishedAt).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}</time>
          <span>·</span>
          <span>{jaPost.readingTime}</span>
        </div>
      </header>
      <div className="prose prose-gray max-w-none
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-20
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:leading-8 prose-p:text-gray-700
        prose-li:text-gray-700 prose-li:leading-8
        prose-strong:text-gray-900
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
        prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
        prose-img:rounded-xl">
        <MDXRemote source={jaPost.content} components={{ TweetEmbed, YouTubeEmbed }} />
      </div>
      <div className="my-10 p-4 bg-gray-50 rounded-xl text-center text-xs text-gray-400 min-h-[100px] flex items-center justify-center">
        広告エリア
      </div>
      <div className="mt-10 flex justify-center">
        <a href="/ja/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 border border-gray-200 px-5 py-2.5 rounded-full hover:border-blue-400 hover:text-blue-600 transition-colors">
          ← 一覧へ戻る
        </a>
      </div>
    </article>
  );
}
