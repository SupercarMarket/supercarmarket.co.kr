import { useQuery } from '@tanstack/react-query';
import { type MagazineDto } from '@supercarmarket/types/magazine';
import {
  type Posting,
  type ServerResponse,
  type PaginationResponse,
} from '@supercarmarket/types/base';
import { QUERY_KEYS } from './keys';
import { getMagazine, getMagazinePost } from './apis';

export const useMagazine = ({ page }: { page: number }, options = {}) => {
  return useQuery<PaginationResponse<MagazineDto[]>>({
    queryKey: [...QUERY_KEYS.magazine(), { page }],
    queryFn: () => getMagazine({ page }),
    useErrorBoundary: true,
    refetchOnMount: true,
    ...options,
  });
};

export const useMagazinePost = (id: string, token?: string, options = {}) => {
  return useQuery<
    ServerResponse<
      Posting & {
        imgSrc: string;
      }
    > & {
      isScraped: boolean;
      isCounseling: boolean;
    }
  >({
    queryKey: QUERY_KEYS.id(id),
    queryFn: () => getMagazinePost({ id, token }),
    useErrorBoundary: true,
    ...options,
  });
};
