export const QUERY_KEYS = {
  all: ['home'] as const,
  magazine: () => [...QUERY_KEYS.all, 'magazine'] as const,
  market: () => [...QUERY_KEYS.all, 'market'] as const,
  community: () => [...QUERY_KEYS.all, 'community'] as const,
  partnership: () => [...QUERY_KEYS.all, 'partnership'] as const,
  new: () => [...QUERY_KEYS.all, 'new'] as const,
  best: () => [...QUERY_KEYS.all, 'best'] as const,
  banner: () => [...QUERY_KEYS.all, 'banner'] as const,
  advertisement: () => [...QUERY_KEYS.all, 'advertisement'] as const,
};
