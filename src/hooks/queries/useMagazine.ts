/**
 * Fetcher 함수는 이후 다른 폴더로 뺼 예정
 */

import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import {
  MagazineDto,
  MagazineResponse,
  WithBlurredImage,
} from 'types/magazine';

const fetcher = async () =>
  await fetch('/api/magazine', {
    method: 'GET',
  }).then((res) => res.json());

export default function useMagazine(options = {}) {
  return useQuery<MagazineResponse<WithBlurredImage<MagazineDto>>>(
    queries.magazine.lists(),
    fetcher,
    options
  );
}
