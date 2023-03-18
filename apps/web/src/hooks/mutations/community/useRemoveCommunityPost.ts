import { clientApi } from '@supercarmarket/lib';
import { useMutation } from '@tanstack/react-query';

export type UseRemoveCommunityPostData = {
  id: string;
  category?: string;
};

export default function useRemoveCommunityPost(options = {}) {
  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: UseRemoveCommunityPostData[];
      token: string;
    }) =>
      clientApi(`/server/supercar/v1/community`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ACCESS_TOKEN: token,
        },
        data,
      }),
    useErrorBoundary: true,
    ...options,
  });
}
