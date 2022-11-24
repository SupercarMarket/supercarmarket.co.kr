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

export default fetcher;
