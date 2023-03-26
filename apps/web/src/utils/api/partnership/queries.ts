import { PARTNERSHIP_QUERY_KEY } from './keys';
import { PartnershipDetailResponse } from '@supercarmarket/types/partnership';
import { useQuery } from '@tanstack/react-query';
import { getPartnership, getPartnershipList } from './apis';

const usePartnership = <T>(
  query: {
    page?: string;
    pageSize?: string;
    region?: string;
    category: string;
    keyword?: string;
  },
  options = {}
) => {
  const queryString = Object.values(query);

  return useQuery<T>(
    PARTNERSHIP_QUERY_KEY.partnership.lists(queryString),
    () => getPartnershipList(query),
    { useErrorBoundary: true, ...options }
  );
};

const usePartnershipDetail = (id: string, options = {}) => {
  return useQuery<PartnershipDetailResponse<string>>(
    PARTNERSHIP_QUERY_KEY.partnership.id(id),
    () => getPartnership(id),
    { useErrorBoundary: true, ...options }
  );
};

export { usePartnership, usePartnershipDetail };
