import { SITE_NAME, SITE_URL, normalizeUrl } from './seo';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: 'zh-CN',
    description:
      '中文网络服务与代理工具知识库、机场品牌评测数据库与套餐选择参考平台。',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/brands/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/avatar.webp`,
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: normalizeUrl(item.href),
    })),
  };
}

export function buildArticleSchema(params: {
  title: string;
  description: string;
  pathname: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  aboutName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    inLanguage: 'zh-CN',
    mainEntityOfPage: normalizeUrl(params.pathname),
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    author: {
      '@type': 'Organization',
      name: params.authorName ?? `${SITE_NAME}编辑部`,
      url: `${SITE_URL}/editorial-policy/`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
    ...(params.aboutName
      ? {
          about: {
            '@type': 'Service',
            name: params.aboutName,
          },
        }
      : {}),
  };
}

export function buildItemListSchema(params: {
  name: string;
  pathname: string;
  items: { name: string; href: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: params.name,
    url: normalizeUrl(params.pathname),
    numberOfItems: params.items.length,
    itemListElement: params.items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      url: normalizeUrl(item.href),
    })),
  };
}

export function buildCollectionPageSchema(params: {
  title: string;
  description: string;
  pathname: string;
  dateModified: string;
  about?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: params.title,
    description: params.description,
    inLanguage: 'zh-CN',
    url: normalizeUrl(params.pathname),
    dateModified: params.dateModified,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
    ...(params.about && params.about.length > 0
      ? {
          about: params.about.map((item) => ({
            '@type': 'Thing',
            name: item,
          })),
        }
      : {}),
  };
}

export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
