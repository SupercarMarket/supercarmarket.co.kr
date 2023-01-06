import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import {
  MagazineDto,
  MagazineResponse,
  WithBlurredImage,
} from 'types/magazine';
import { baseFetch } from 'utils/api/fetcher';

export default function useMagazine(options = {}) {
  return useQuery<MagazineResponse<WithBlurredImage<MagazineDto>>>(
    queries.magazine.lists(),
    () => baseFetch('/api/magazine', { method: 'GET' }),
    { ...options, useErrorBoundary: true }
  );
}
