import { SupercarMarketApiError } from '../embeds/error';
import getErrorMessage from '../getErrorMessage';
import { FetcherRequestInit } from './fetcherWrapper';

export type BaseApiHandlerResponse<T> = {
  status: number;
  ok: boolean;
} & T;

const fetcher = (url: string, options: FetcherRequestInit) => {
  const { params, query, ...rest } = options;

  if (params) url += `/${params}`;
  if (query) url += `?${new URLSearchParams(query)}`;

  const response = fetch(url, rest);

  return response;
};

const clientFetcher = async (url: string, options: FetcherRequestInit) => {
  try {
    const response = await fetcher(url, options);

    const result = await response.json();

    if (!response.ok) throw new SupercarMarketApiError(response.status);

    return result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const clientApi = async (url: string, options: FetcherRequestInit) => {
  const { data, headers, ...rest } = options;
  const requestBody = JSON.stringify(data);

  try {
    const response = await fetcher(url, {
      headers: {
        Accept: 'application/json',
        ...headers,
      },
      body: requestBody,
      ...rest,
    });

    const result = await response.json();

    if (!response.ok) throw new SupercarMarketApiError(response.status);

    return result;
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

const serverApi = async (url: string, options: FetcherRequestInit) => {
  const { data, headers, ...rest } = options;
  const requestBody = JSON.stringify(data);

  const response = await fetcher(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: requestBody,
    ...rest,
  });

  const result = response.ok ? await response.json() : null;

  return { status: response.status, ok: response.ok, ...result };
};

const serverFetcher = async (url: string, options: FetcherRequestInit) => {
  const { headers, ...rest } = options;

  const response = await fetcher(url, {
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    ...rest,
  });

  const result = response.ok ? await response.json() : null;

  return { status: response.status, ok: response.ok, ...result };
};

export { clientApi, clientFetcher, serverApi, serverFetcher, fetcher };
