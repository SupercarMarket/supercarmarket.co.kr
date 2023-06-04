import { HttpError } from '@supercarmarket/lib';
import axios, {
  AxiosResponse,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';
import { getSession } from 'next-auth/react';

/**
 * @description
 * client-side 전용
 * server-side인 경우엔 직접 토큰 넣어줘야합니다.
 */
const authRequest: AxiosInstance = axios.create({
  baseURL: `/server/supercar/v1`,
});

const setRequest = async (
  config: AxiosRequestConfig,
  contentType = 'application/json'
) => {
  const session = await getSession();

  if (!session?.accessToken)
    throw new HttpError({ message: '로그인이 필요합니다.', statusCode: 401 });

  if (config && config.headers)
    config.headers = {
      ACCESS_TOKEN: `${session.accessToken}`,
      ContentType: contentType,
    };

  return config;
};

const setResponse = async (response: AxiosResponse) => {
  return response.data;
};

// API 통신 직전 쿠키에 있는 값으로 헤더를 세팅
authRequest.interceptors.request.use(setRequest);
authRequest.interceptors.response.use(setResponse, (error) => {
  const { request, response } = error;

  if (!response) throw error;

  const errorJson = response.data;

  const customErr = HttpError.fromRequest(request, {
    ...response,
    statusText: errorJson.message || response.statusText,
  });
  throw customErr;
});

export { authRequest };
