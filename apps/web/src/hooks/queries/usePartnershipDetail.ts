import { clientFetcher } from '@supercarmarket/lib';
import { PartnershipDetailResponse } from '@supercarmarket/types/partnership';
import { useQuery } from '@tanstack/react-query';

import queries from 'constants/queries';

export default function usePartnershipDetail(id: string, options = {}) {
  return useQuery<PartnershipDetailResponse<string>>(
    queries.partnership.id(id),
    () =>
      clientFetcher(`/server/supercar/v1/partnership`, {
        method: 'GET',
        params: id,
      }),
    options
  );
}
