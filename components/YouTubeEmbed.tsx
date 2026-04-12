'use client';

interface Props {
  videoId: string;
  title?: string;
}

// YouTube 공식 임베드 - YouTube ToS상 완전 합법
export default function YouTubeEmbed({ videoId, title = '영상' }: Props) {
  return (
    <div className="my-8">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
      {title && (
        <p className="text-xs text-center text-gray-400 mt-2">
          📺 {title}
        </p>
      )}
    </div>
  );
}
