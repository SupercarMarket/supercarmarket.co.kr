import { ServerApiError } from 'utils/error';
import { getErrorMessage } from 'utils/misc';

export interface FetcherRequestInit extends RequestInit {
  params?: number | string;
  query?: {
    [key: string]: any;
  };
}

const fetcher = (url: string, options: FetcherRequestInit) => {
  const { params, query, ...rest } = options;

  if (params) url += `/${params}`;
  if (query) url += `?${new URLSearchParams(query)}`;

  const response = fetch(url, rest);

  return response;
};

const baseFetcher = async (url: string, options: FetcherRequestInit) => {
  try {
    const response = await fetcher(url, options);

    if (!response.ok)
      throw new ServerApiError({
        message: url,
      });

    return await response.json();
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export { baseFetcher };
export default fetcher;
