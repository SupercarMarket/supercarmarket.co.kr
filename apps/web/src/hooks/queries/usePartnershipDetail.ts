import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { PartnershipDetailResponse } from 'types/partnership';
import { baseFetcher } from 'utils/api/fetcher';

export default function usePartnershipDetail(id: string, options = {}) {
  return useQuery<PartnershipDetailResponse<{ imgSrc: string; base64: string }>>(
    queries.partnership.id(id),
    () => baseFetcher(`/api/partnership/${id}`, { method: 'GET' }),
    options
  );
}
