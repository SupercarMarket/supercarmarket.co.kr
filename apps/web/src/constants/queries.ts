const queries = {
  /**
   * Market Query Keys
   */
  market: {
    all: ['market'] as const,
    lists: (marketKey: string[]) =>
      [...queries.market.all, 'list', ...marketKey] as const,
    detail: (id: string) => [...queries.market.all, 'detail', id] as const,
    best: () => [...queries.market.lists([]), 'best'] as const,
    new: () => [...queries.market.lists([]), 'new'] as const,
  },
};

export default queries;
