export const convertToSlug = (x: string) =>
  x
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
