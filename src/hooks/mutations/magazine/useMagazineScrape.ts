import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';
import { baseFetcher } from 'utils/api/fetcher';

export default function useMagazineScrape(postId: string, options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      baseFetcher('/api/magazine/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        query: {
          postId,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.magazine.id(postId));
    },
    ...options,
  });
}
