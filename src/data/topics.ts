import type { L2TopicConfig } from './topicsPart1';
import { topicsPart1 } from './topicsPart1';
import { topicsPart2, topicsPart2Tail } from './topicsPart2';

export type { L2TopicConfig, L3ClusterPlan } from './topicsPart1';

export const ALL_L2_TOPICS: L2TopicConfig[] = [
  ...topicsPart1,
  ...topicsPart2,
  ...topicsPart2Tail,
];

export function getL2Topic(pillarId: string, slug: string): L2TopicConfig | undefined {
  return ALL_L2_TOPICS.find((t) => t.pillarId === pillarId && t.slug === slug);
}

export function getL2TopicsByPillar(pillarId: string): L2TopicConfig[] {
  return ALL_L2_TOPICS.filter((t) => t.pillarId === pillarId);
}
