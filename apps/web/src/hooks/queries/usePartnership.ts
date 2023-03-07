import { clientFetcher } from '@supercarmarket/lib';
import { WithBlurredImage } from '@supercarmarket/types/base';
import {
  PartnershipDto,
  PartnershipResponse,
} from '@supercarmarket/types/partnership';
import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';

export default function usePartnership(
  query: {
    page?: string;
    pageSize?: string;
    region?: string;
    category?: string;
    keyword?: string;
  },
  options = {}
) {
  const queryString = Object.values(query);

  return useQuery<PartnershipResponse<WithBlurredImage<PartnershipDto>>>(
    queries.partnership.lists(queryString),
    () => clientFetcher('/api/partnership', { method: 'GET', query }),
    options
  );
}
