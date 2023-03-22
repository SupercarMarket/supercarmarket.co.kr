import { clientApi } from '@supercarmarket/lib';
import { useMutation } from '@tanstack/react-query';

export type UseRemoveMarketByIdData = {
  id: string;
};

export default function useRemoveMarketById(options = {}) {
  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: UseRemoveMarketByIdData[];
      token: string;
    }) =>
      clientApi(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/shop`, {
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
