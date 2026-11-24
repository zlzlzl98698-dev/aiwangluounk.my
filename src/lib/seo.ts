export const SITE_URL = 'https://aiwangluounk.my';
export const SITE_NAME = '网络AI';

export const SITE_VERIFICATIONS = {
  // 搜索引擎站长平台所有权验证（可在平台获取后直接填入对应 content，或通过环境变量注入）
  google: process.env.PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  bing: process.env.PUBLIC_BING_SITE_VERIFICATION || '',
  shenma: process.env.PUBLIC_SHENMA_SITE_VERIFICATION || '',
  baidu: process.env.PUBLIC_BAIDU_SITE_VERIFICATION || '',
};

export interface SEOInput {
  title: string;
  description: string;
  pathname: string;
  canonicalPath?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  ogImage?: string;
}

export function normalizeUrl(pathname: string): string {
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const withTrailing = clean.endsWith('/') || clean.includes('.') ? clean : `${clean}/`;
  return `${SITE_URL}${withTrailing}`;
}

export function buildSEO(input: SEOInput) {
  const canonical = normalizeUrl(input.canonicalPath ?? input.pathname);
  const fullTitle = input.title.includes(SITE_NAME)
    ? input.title
    : `${input.title}｜${SITE_NAME}`;
  return {
    title: fullTitle,
    description: input.description,
    canonical,
    noindex: input.noindex ?? false,
    type: input.type ?? 'website',
    publishedTime: input.publishedTime,
    modifiedTime: input.modifiedTime,
    ogImage: input.ogImage ? `${SITE_URL}${input.ogImage}` : `${SITE_URL}/og-default.svg`,
  };
}
