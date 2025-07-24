export const sanitizeTitle = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric chars
    .replace(/\s+/g, '-')         // replace spaces with dashes
    .replace(/-+/g, '-');         // collapse multiple dashes
