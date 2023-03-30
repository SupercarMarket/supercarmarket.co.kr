import { useMutation } from '@tanstack/react-query';
import {
  deleteMarketPost,
  likeMarketPost,
  updateMarketSellStatus,
} from './apis';

export const useLikeMarketPost = (id: string, options = {}) => {
  return useMutation({
    mutationFn: () => likeMarketPost({ id }),
    useErrorBoundary: true,
    ...options,
  });
};

export const useUpdateMarketSellStatus = (options = {}) => {
  return useMutation({
    mutationFn: ({ data }: { data: { brdSeq: number } }) =>
      updateMarketSellStatus({ data }),
    useErrorBoundary: true,
    ...options,
  });
};

export const useDeleteMarketPost = (options = {}) => {
  return useMutation({
    mutationFn: ({ data }: { data: { id: string }[] }) =>
      deleteMarketPost({ data }),
    useErrorBoundary: true,
    ...options,
  });
};
