export function toBrandPath(slug: string): string {
  return `/brands/${slug}/`;
}

export function toComparePath(slug: string): string {
  return `/compare/${slug}/`;
}

export function toGuidePath(slug: string): string {
  return `/guides/articles/${slug}/`;
}
