const queries = {
  /**
   * Magazine Query Keys
   */
  magazine: {
    all: ['magazine'] as const,
    lists: () => [...queries.magazine.all, 'list'] as const,
  },
  /**
   * Market Query Keys
   */
  market: {
    all: ['market'] as const,
    lists: (marketKey: string[]) => [...queries.market.all, 'list', ...marketKey] as const,
  },
};

export default queries;
