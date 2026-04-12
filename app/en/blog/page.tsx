import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all articles.",
  alternates: { canonical: "/en/blog" },
};

export default function EnNewsBlogList() {
  const posts = getAllPosts("en");
  return (
    <div>
      <header className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-2xl font-bold mb-1">All Posts</h1>
        <p className="text-gray-400 text-sm">{posts.length} articles</p>
      </header>
      {posts.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.slug} className="group border-b border-gray-100 pb-8">
              <Link href={`/en/blog/${post.slug}`} className="flex gap-5 items-start">
                {post.image && (
                  <div className="relative shrink-0 w-40 h-24 rounded-xl overflow-hidden bg-gray-100">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{post.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <time>{new Date(post.publishedAt).toLocaleDateString("en-US")}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
