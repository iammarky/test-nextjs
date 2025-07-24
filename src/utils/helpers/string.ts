export const sanitizeTitle = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric chars
    .replace(/\s+/g, '-')         // replace spaces with dashes
    .replace(/-+/g, '-');         // collapse multiple dashes

export const getImgSrc = (src: string) => {
  // Skip cache buster for blob or data URLs
  if (src.startsWith('blob:') || src.startsWith('data:')) return src;

  // Add cache buster for normal image paths
  return `${src}?cb=${Date.now()}`;
};