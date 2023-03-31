import { post } from '@supercarmarket/lib';
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
    () => post('/api/image/base64', { src }),
    { ...options, useErrorBoundary: true }
  );
}
