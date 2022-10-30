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
    lists: (marketKeys: string[]) =>
      [...queries.market.all, 'list', ...marketKeys] as const,
  },
};

export default queries;
