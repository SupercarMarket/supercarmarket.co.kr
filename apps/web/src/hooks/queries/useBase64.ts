import { clientApi } from '@supercarmarket/lib';
import type { ServerResponse } from '@supercarmarket/types/base';
import { useQuery } from '@tanstack/react-query';

export default function useBase64(
  src: string,
  query: {
    category: string;
    id: string;
    detail: boolean;
    idx?: number;
  },
  options = {}
) {
  const { category = 'market', id, detail = false, idx } = query;

  const detailImage = detail ? [detail] : [detail, idx];

  return useQuery<ServerResponse<{ base64: string }>>(
    [category, id, ...detailImage],
    () =>
      clientApi('/api/image/base64', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: { src },
      }),
    { ...options, useErrorBoundary: true }
  );
}
