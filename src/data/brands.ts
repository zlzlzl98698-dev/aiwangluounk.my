import { BrandSchema, type BrandRecord } from './brandSchema';
import { brandsPart1 } from './brandsPart1';
import { brandsPart2 } from './brandsPart2';

const rawBrands: BrandRecord[] = [...brandsPart1, ...brandsPart2];

export const ALL_BRANDS: BrandRecord[] = rawBrands.map((b) => BrandSchema.parse(b));

export function getBrandBySlug(slug: string): BrandRecord | undefined {
  return ALL_BRANDS.find((b) => b.slug === slug);
}

export function getPriorityBrands(): BrandRecord[] {
  return ALL_BRANDS.filter((b) => b.editorPriorityCandidate !== null).sort(
    (a, b) => (a.editorPriorityCandidate ?? 99) - (b.editorPriorityCandidate ?? 99)
  );
}

export function getTopTenCandidates(): BrandRecord[] {
  return getPriorityBrands().filter((b) => (b.editorPriorityCandidate ?? 99) <= 10);
}
