import {
  PartnershipDetailResponse,
  type PartnershipDto,
  type PartnershipResponse,
} from '@supercarmarket/types/partnership';
import { useQuery } from '@tanstack/react-query';
import { getPartnership, getPartnershipPost } from './apis';
import { QUERY_KEYS } from './keys';

export const usePartnership = (
  query: {
    page: number;
    pageSize?: string;
    region?: string;
    category: string;
    keyword?: string;
  },
  options = {}
) => {
  return useQuery<PartnershipResponse<PartnershipDto>>(
    [...QUERY_KEYS.partnership(), query],
    () => getPartnership(query),
    options
  );
};

export const usePartnershipPost = (id: string, options = {}) => {
  return useQuery<PartnershipDetailResponse<string>>(
    QUERY_KEYS.id(id),
    () => getPartnershipPost({ id }),
    options
  );
};
