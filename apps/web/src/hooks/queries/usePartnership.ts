import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { WithBlurredImage } from 'types/base';
import { PartnershipDto, PartnershipResponse } from 'types/partnership';
import { baseFetcher } from 'utils/api/fetcher';

export default function usePartnership(options = {}) {
  return useQuery<PartnershipResponse<WithBlurredImage<PartnershipDto>>>(
    queries.partnership.lists(),
    () => baseFetcher('/api/partnership', { method: 'GET' }),
    options
  );
}
