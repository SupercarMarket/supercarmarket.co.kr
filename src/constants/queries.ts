const queries = {
  /**
   * Market Query Keys
   */
  market: {
    all: ['market'] as const,
    lists: () => [...queries.market.all, 'list'] as const,
    best: () => [...queries.market.lists(), 'best'] as const,
    new: () => [...queries.market.lists(), 'new'] as const,
  },
  /**
   * Magazine Query Keys
   */
  magazine: {
    all: ['magazine'] as const,
    lists: () => [...queries.magazine.all, 'list'] as const,
  },
};

export default queries;
