import { useMutation } from '@tanstack/react-query';
import {
  deleteMarketPost,
  likeMarketPost,
  updateMarketSellStatus,
} from './apis';

export const useLikeMarketPost = (options = []) => {
  return useMutation({
    mutationFn: ({ id, token }: { id: string; token: string }) =>
      likeMarketPost({ id, token }),
    useErrorBoundary: true,
    ...options,
  });
};

export default function useChangeMarketSellStatus(options = {}) {
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
}

export const useDeleteMarketPost = (options = {}) => {
  return useMutation({
    mutationFn: ({ data, token }: { data: { id: string }[]; token: string }) =>
      deleteMarketPost({ data, token }),
    useErrorBoundary: true,
    ...options,
  });
};
