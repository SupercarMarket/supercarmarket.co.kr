import { useMutation } from '@tanstack/react-query';
import {
  deleteMarketPost,
  likeMarketPost,
  updateMarketSellStatus,
} from './apis';

export const useLikeMarketPost = (id: string, options = {}) => {
  return useMutation({
    mutationFn: ({ token }: { token: string }) => likeMarketPost({ id, token }),
    useErrorBoundary: true,
    ...options,
  });
};

export const useUpdateMarketSellStatus = (options = {}) => {
  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: { brdSeq: number };
      token: string;
    }) => updateMarketSellStatus({ data, token }),
    useErrorBoundary: true,
    ...options,
  });
};

export const useDeleteMarketPost = (options = {}) => {
  return useMutation({
    mutationFn: ({ data, token }: { data: { id: string }[]; token: string }) =>
      deleteMarketPost({ data, token }),
    useErrorBoundary: true,
    ...options,
  });
};
