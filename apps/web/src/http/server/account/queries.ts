import { type AccountTab } from 'constants/account';
import { type UpdateInfo, type Profile } from '@supercarmarket/types/account';
import { type ServerResponse } from '@supercarmarket/types/base';
import { useQuery } from '@tanstack/react-query';
import { getAccount, getAccountCategory, getAccountUpdateInfo } from './apis';
import { QUERY_KEYS } from './keys';

export const useAccount = (id: string, token?: string, options = {}) => {
  return useQuery<{ data: Profile }>({
    queryKey: QUERY_KEYS.id(id),
    queryFn: () => getAccount({ id, token }),
    useErrorBoundary: true,
    ...options,
  });
};

export const useAccountCategory = (
  id: string,
  query: {
    category: AccountTab;
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

export const useAccountUpdateInfo = (
  id: string,
  token: string,
  options = {}
) => {
  return useQuery<ServerResponse<UpdateInfo>>({
    queryKey: QUERY_KEYS.info(id),
    queryFn: () => getAccountUpdateInfo(token),
    useErrorBoundary: true,
    ...options,
  });
};
