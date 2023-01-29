import { ServerApiError } from 'utils/error';
import { getErrorMessage } from 'utils/misc';

export interface FetcherRequestInit extends RequestInit {
  params?: number | string;
  query?: {
    [key: string]: any;
  };
  data?: unknown;
}

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

const baseFetcher = async (url: string, options: FetcherRequestInit) => {
  try {
    const response = await fetcher(url, options);

    if (!response.ok)
      throw new ServerApiError({
        message: response.statusText,
        status: response.status,
      });

    return await response.json();
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const baseFetch = async (url: string, options: FetcherRequestInit) => {
  try {
    const response = await fetcher(url, options);

    const result = await response.json();

    if (!response.ok)
      throw new ServerApiError({
        message: result.message,
        status: response.status,
      });

    return result;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

const baseApi = async <T>(url: string, options: FetcherRequestInit) => {
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

  const result: T = response.ok ? await response.json() : null;

  return { status: response.status, ok: response.ok, ...result };
};

const clientFetcher = async (url: string, options: FetcherRequestInit) => {
  try {
    const response = await fetcher(url, options);

    const result = await response.json();

    if (!response.ok)
      throw new ServerApiError({
        message: result.message,
        status: response.status,
      });

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
        'Content-Type': 'application/json',
        ...headers,
      },
      body: requestBody,
      ...rest,
    });

    const result = await response.json();

    if (!response.ok)
      throw new ServerApiError({
        message: result.message,
        status: response.status,
      });

    return { status: response.status, ok: response.ok, ...result };
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
};

const serverApi = async <T>(url: string, options: FetcherRequestInit) => {
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

  const result: T = response.ok ? await response.json() : null;

  return { status: response.status, ok: response.ok, ...result };
};

const serverFetcher = async <T>(url: string, options: FetcherRequestInit) => {
  const { headers, ...rest } = options;

  const response = await fetcher(url, {
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    ...rest,
  });

  const result: T = response.ok ? await response.json() : null;

  return { status: response.status, ok: response.ok, ...result };
};

export {
  baseApi,
  baseFetch,
  baseFetcher,
  clientApi,
  clientFetcher,
  serverApi,
  serverFetcher,
};
export default fetcher;
