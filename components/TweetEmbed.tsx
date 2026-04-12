'use client';

import { useEffect, useRef } from 'react';

interface Props {
  url: string;
}

// 트위터/X 공식 임베드 컴포넌트
// 저작권: 트위터 임베드 정책상 공식 허용
export default function TweetEmbed({ url }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Twitter widget script 로드
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';

    ref.current.innerHTML = `<blockquote class="twitter-tweet" data-dnt="true"><a href="${url}"></a></blockquote>`;
    ref.current.appendChild(script);

    return () => {
      if (ref.current) ref.current.innerHTML = '';
    };
  }, [url]);

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center min-h-[200px] items-center"
      aria-label="트위터 임베드"
    />
  );
}
