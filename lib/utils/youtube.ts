export function getYoutubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  
  try {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^"&?\/\s]{11})/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export function isValidYoutubeUrl(url: string): boolean {
  return !!getYoutubeEmbedUrl(url);
}