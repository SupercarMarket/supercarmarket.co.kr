import { clientApi } from '@supercarmarket/lib';
import { useMutation } from '@tanstack/react-query';

export type UseChangeSellStatusData = {
  brdSeq: number;
};

export default function useChangeSellStatus(options = {}) {
  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: UseChangeSellStatusData;
      token: string;
    }) =>
      clientApi(`/server/supercar/v1/shop`, {
        method: 'PUT',
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
