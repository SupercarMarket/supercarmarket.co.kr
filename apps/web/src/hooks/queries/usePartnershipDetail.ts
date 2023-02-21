import { clientFetcher } from '@supercarmarket/lib';
import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { PartnershipDetailResponse } from 'types/partnership';

export default function usePartnershipDetail(id: string, options = {}) {
  return useQuery<PartnershipDetailResponse>(
    queries.partnership.id(id),
    () => clientFetcher(`/api/partnership/${id}`, { method: 'GET' }),
    options
  );
}
