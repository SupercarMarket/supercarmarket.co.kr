import { clientApi } from '@supercarmarket/lib';
import type { ServerResponse } from '@supercarmarket/types/base';
import { useQuery } from '@tanstack/react-query';

export default function useBase64(
  src: string,
  query: {
    [key: string]: string | number | boolean;
  },
  options = {}
) {
  return useQuery<ServerResponse<{ base64: string }>>(
    ['base64', query],
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
