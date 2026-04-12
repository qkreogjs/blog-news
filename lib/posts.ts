import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');

export type Lang = 'ko' | 'en' | 'ja';

export interface PostMeta {
  slug: string;
  lang: Lang;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  readingTime: string;
  seo_score?: number;
  image?: string;
}

export interface Post extends PostMeta {
  content: string;
}

function getPostsDir(lang: Lang = 'ko'): string {
  return lang === 'ko' ? POSTS_DIR : path.join(POSTS_DIR, lang);
}

export function getAllSlugs(lang: Lang = 'ko'): string[] {
  const dir = getPostsDir(lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => f.replace(/\.(mdx|md)$/, ''));
}

export function getPostBySlug(slug: string, lang: Lang = 'ko'): Post | null {
  const dir = getPostsDir(lang);
  const filePath = path.join(dir, `${slug}.mdx`);
  const fallback = path.join(dir, `${slug}.md`);
  const target = fs.existsSync(filePath) ? filePath : fs.existsSync(fallback) ? fallback : null;
  if (!target) return null;

  const raw = fs.readFileSync(target, 'utf8');
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    lang: (data.lang as Lang) ?? lang,
    title: data.title ?? slug,
    description: data.description ?? '',
    publishedAt: data.publishedAt ?? new Date().toISOString(),
    tags: data.tags ?? [],
    readingTime: rt.text,
    seo_score: data.seo_score,
    image: data.image,
    content,
  };
}

export function getAllPosts(lang: Lang = 'ko'): PostMeta[] {
  return getAllSlugs(lang)
    .map(slug => getPostBySlug(slug, lang))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// hreflang 링크 생성용: 슬러그의 다른 언어 버전 확인
export function getAlternateLangs(slug: string): Partial<Record<Lang, string>> {
  const langs: Lang[] = ['ko', 'en', 'ja'];
  const result: Partial<Record<Lang, string>> = {};
  for (const l of langs) {
    const dir = getPostsDir(l);
    const exists = fs.existsSync(path.join(dir, `${slug}.mdx`)) || fs.existsSync(path.join(dir, `${slug}.md`));
    if (exists) {
      result[l] = l === 'ko' ? `/blog/${slug}` : `/${l}/blog/${slug}`;
    }
  }
  return result;
}

// 이전글/다음글 반환 (날짜 내림차순 정렬 기준)
export function getAdjacentPosts(slug: string, lang: Lang = 'ko'): { prev: PostMeta | null; next: PostMeta | null } {
  const posts = getAllPosts(lang);
  const idx = posts.findIndex(p => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    next: idx > 0 ? posts[idx - 1] : null,           // 더 최신 글
    prev: idx < posts.length - 1 ? posts[idx + 1] : null, // 더 오래된 글
  };
}
