export interface ShareLinks {
  xHref: string;
  lineHref: string;
}

export const shareLinks = (url: string, title: string): ShareLinks => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    xHref: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`,
    lineHref: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
  };
};
