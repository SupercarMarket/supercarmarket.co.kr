import { clientFetcher } from '@supercarmarket/lib';
import { useMutation } from '@tanstack/react-query';

export default function useMagazineCounseling(postId: string, options = {}) {
  return useMutation({
    mutationFn: (token: string) =>
      clientFetcher(`/server/supercar/v1/magazine/${postId}/inquiry`, {
        method: 'POST',
        headers: {
          ACCESS_TOKEN: token,
          'Content-Type': 'application/json',
        },
      }),
    ...options,
  });
}
