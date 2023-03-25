import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inquiryMagazine, scrapMagazinePost } from './apis';
import { QUERY_KEYS } from './keys';

export const useMagazineScrap = (id: string, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => scrapMagazinePost({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.id(id));
    },
    ...options,
  });
};

export const useMagazineInquiry = (id: string, options = {}) => {
  return useMutation({
    mutationFn: (token: string) => inquiryMagazine({ id, token }),
    ...options,
  });
};
