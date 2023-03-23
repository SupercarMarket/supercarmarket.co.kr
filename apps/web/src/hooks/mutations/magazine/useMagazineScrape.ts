import { clientFetcher } from '@supercarmarket/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';

export default function useMagazineScrape(
  postId: string,
  token?: string,
  options = {}
) {
  const queryClient = useQueryClient();
  const headers: HeadersInit = token
    ? {
        ACCESS_TOKEN: token,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };

  return useMutation({
    mutationFn: () =>
      clientFetcher(`/server/supercar/v1/magazine/${postId}/scrap`, {
        method: 'POST',
        headers,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.magazine.id(postId));
    },
    ...options,
  });
}
