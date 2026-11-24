import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const brands = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/brands' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    targetKeyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    pubDate: z.string(),
    updatedDate: z.string(),
    verifiedAt: z.string().nullable().default(null),
    sourceScope: z.string(),
    keyTakeaway: z.string(),
    faqs: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .default([]),
    relatedBrands: z.array(z.string()).default([]),
    relatedGuides: z
      .array(
        z.object({
          title: z.string(),
          href: z.string(),
        })
      )
      .default([]),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    pillar: z.string(),
    categoryLabel: z.string(),
    targetKeyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    appliesTo: z.string(),
    prerequisites: z.array(z.string()).default([]),
    pubDate: z.string(),
    updatedDate: z.string(),
    answerSummary: z.string(),
    faqs: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .default([]),
    relatedLinks: z
      .array(
        z.object({
          title: z.string(),
          href: z.string(),
          note: z.string().optional(),
        })
      )
      .default([]),
  }),
});

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    targetKeyword: z.string(),
    brandSlugs: z.array(z.string()),
    pubDate: z.string(),
    updatedDate: z.string(),
    answerSummary: z.string(),
    faqs: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .default([]),
  }),
});

const pillars = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pillars' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    intent: z.string(),
    targetKeyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    longTailKeywords: z.array(z.string()).default([]),
    entities: z.array(z.string()).default([]),
    keywordBoundary: z.string(),
    answerFirst: z.string(),
    updatedDate: z.string(),
    ctaHeading: z.string(),
    ctaActions: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          style: z.enum(['primary', 'secondary']).default('primary'),
        })
      )
      .default([]),
    faqs: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .default([]),
    nextPillarLinks: z
      .array(
        z.object({
          title: z.string(),
          href: z.string(),
          category: z.string(),
          reason: z.string(),
        })
      )
      .default([]),
  }),
});

const secondaryTopics = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/secondary-topics',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    pillarId: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    intent: z.string(),
    targetKeyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    longTailKeywords: z.array(z.string()).default([]),
    entities: z.array(z.string()).default([]),
    keywordBoundary: z.string(),
    answerFirst: z.string(),
    updatedDate: z.string(),
    ctaHeading: z.string().optional(),
    ctaActions: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          style: z.enum(['primary', 'secondary']).default('primary'),
        })
      )
      .default([]),
    relatedLinks: z
      .array(
        z.object({
          title: z.string(),
          href: z.string(),
          category: z.string(),
          reason: z.string(),
        })
      )
      .default([]),
    faqs: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .default([]),
  }),
});

export const collections = { brands, guides, comparisons, pillars, secondaryTopics };
