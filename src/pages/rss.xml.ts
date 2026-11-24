import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { ALL_BRANDS } from '../data/brands';

export const GET: APIRoute = async (context) => {
  const guides = await getCollection('guides');
  const comparisons = await getCollection('comparisons');

  const items = [
    ...ALL_BRANDS.map((b) => ({
      title: `${b.name} 评测与结构化档案`,
      description: b.description,
      pubDate: new Date(b.lastUpdated),
      link: `/brands/${b.slug}/`,
    })),
    ...guides.map((g) => ({
      title: g.data.h1,
      description: g.data.description,
      pubDate: new Date(g.data.updatedDate),
      link: `/guides/articles/${g.data.slug}/`,
    })),
    ...comparisons.map((c) => ({
      title: c.data.h1,
      description: c.data.description,
      pubDate: new Date(c.data.updatedDate),
      link: `/compare/${c.data.slug}/`,
    })),
  ];

  return rss({
    title: '网络AI（aiwangluounk.my）评测与教程更新',
    description: '中文网络服务与代理工具知识库、31 家机场品牌档案与实操教程 RSS 订阅。',
    site: context.site ?? 'https://aiwangluounk.my',
    items,
  });
};
