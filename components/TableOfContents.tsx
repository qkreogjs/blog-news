'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/seo';

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-20% 0% -60% 0%' }
    );
    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="목차"
      className="my-8 p-5 bg-gray-50 rounded-2xl border border-gray-100"
    >
      <p className="text-sm font-semibold text-gray-700 mb-3">📋 목차</p>
      <ol className="space-y-1.5">
        {items.map(item => (
          <li
            key={item.id}
            className={item.level === 3 ? 'pl-4' : ''}
          >
            <a
              href={`#${item.id}`}
              className={`text-sm transition-colors hover:text-blue-600 ${
                active === item.id
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-500'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
