"use client";

import { getYoutubeEmbedUrl } from "@/lib/utils/youtube";

interface YouTubeEmbedProps {
  url: string;
  className?: string;
  isPreview?: boolean;
}

export function YouTubeEmbed({
  url,
  className = "",
  isPreview,
}: YouTubeEmbedProps) {
  const embedUrl = getYoutubeEmbedUrl(url);

  if (!embedUrl) return null;

  return (
    <div className={`relative w-full pt-[56.25%] ${className}`}>
      <iframe
        src={isPreview ? embedUrl : embedUrl + "?autoplay=1"}
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
