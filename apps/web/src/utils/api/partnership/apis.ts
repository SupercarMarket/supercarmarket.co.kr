import { CATEGORY_MAPPING } from 'constants/market';
import { clientFetcher, serverFetcher } from '@supercarmarket/lib';
import { PARTNERSHIP_API_CATEGORY_MAPPER } from 'constants/partnership';

interface GetPartnershipListProps {
  page?: string;
  pageSize?: string;
  region?: string;
  category: string;
  keyword?: string;
}

const getPartnershipList = async (query: GetPartnershipListProps) => {
  const { category, page, ...rest } = query;

  const queries =
    query.category === 'all'
      ? { page: Number(query.page) + 1 || '1', ...rest }
      : {
          category: PARTNERSHIP_API_CATEGORY_MAPPER[category].toUpperCase(),
          ...rest,
        };

  return clientFetcher(`/server/supercar/v1/partnership`, {
    method: 'GET',
    query: queries,
  });
};

const getPartnership = async (id: string) => {
  return serverFetcher(`/server/supercar/v1/partnership/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export { getPartnershipList, getPartnership };
