import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  currentSlug: string;
  tags: string[];
}

export default function RelatedPosts({ currentSlug, tags }: Props) {
  const all = getAllPosts();

  // 태그 겹치는 수 기준으로 관련 글 정렬
  const related = all
    .filter(p => p.slug !== currentSlug)
    .map(p => ({
      ...p,
      score: p.tags.filter(t => tags.includes(t)).length,
    }))
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  if (!related.length) return null;

  return (
    <section className="mt-16 pt-8 border-t border-gray-100">
      <h2 className="text-lg font-bold mb-5 text-gray-800">관련 글</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {related.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all"
          >
            {post.image && (
              <div className="relative w-full h-28 bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-3">
              <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
