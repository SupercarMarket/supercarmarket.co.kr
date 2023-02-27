import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type {
  MagazineDto,
  MagazineResponse,
  WithBlurredImage,
} from '@supercarmarket/types/magazine';
import { baseFetch } from 'utils/api/fetcher';

export default function useMagazine(page = 0, options = {}) {
  return useQuery<MagazineResponse<WithBlurredImage<MagazineDto>>>(
    [...queries.magazine.lists(), ...queries.magazine.query({ page })],
    () =>
      baseFetch('/api/magazine', {
        method: 'GET',
        query: {
          page,
        },
      }),
    { ...options, useErrorBoundary: true }
  );
}
