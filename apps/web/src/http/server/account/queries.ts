import { type UpdateInfo } from '@supercarmarket/types/account';
import { type ServerResponse } from '@supercarmarket/types/base';
import { type AccountCategory } from 'constants/link/account';
import { useQuery } from '@tanstack/react-query';
import { getAccount, getAccountCategory, getAccountUpdateInfo } from './apis';
import { QUERY_KEYS } from './keys';

export const useAccount = (id: string, token?: string, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.id(id),
    queryFn: () => getAccount({ id, token }),
    useErrorBoundary: true,
    ...options,
  });
};

export const useAccountCategory = (
  id: string,
  query: {
    category: AccountCategory;
    page: number;
    size: number;
  },
  token?: string,
  options = {}
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.id(id), query],
    queryFn: () => getAccountCategory({ query, id, token }),
    useErrorBoundary: true,
    ...options,
  });
};

export const useAccountUpdateInfo = (id: string, options = {}) => {
  return useQuery<ServerResponse<UpdateInfo>>({
    queryKey: QUERY_KEYS.info(id),
    queryFn: () => getAccountUpdateInfo(),
    useErrorBoundary: true,
    ...options,
  });
};
