import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import {
  MagazineDto,
  MagazineResponse,
  WithBlurredImage,
} from 'types/magazine';
import { baseFetcher } from 'utils/api/fetcher';

export default function useMagazine(options = {}) {
  return useQuery<MagazineResponse<WithBlurredImage<MagazineDto>>>(
    queries.magazine.lists(),
    () => baseFetcher('/api/magazine', { method: 'GET' }),
    options
  );
}
