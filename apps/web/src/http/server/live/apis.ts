import { HttpError, get, post } from '@supercarmarket/lib';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { authRequest } from 'http/core';
import { getSession } from 'next-auth/react';

export const getBroadCast = async (
  query: {
    page: number;
    pageSize: number;
  } = {
    page: 1,
    pageSize: 16,
  }
) => {
  return get('/server/supercar/v1/live', {
    query,
  }).then((result) => {
    return result as unknown as Common.PaginationResponse<Live.LiveDto[]>;
  });
};

export const getBroadCastRoom = async (id: string) => {
  return authRequest.get(`/live/${id}`);
};

export const getOpenViduSessionId = async () => {
  return post(
    `${process.env.NEXT_PUBLIC_OPENVIDU_API_URL}/openvidu/api/sessions`,
    undefined,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.NEXT_PUBLIC_OPENVIDU_SECRET,
          'utf8'
        ).toString('base64')}`,
      },
    }
  ).then((data) => data.id);
};

export const getOpenViduSessionToken = async (id: string) => {
  return post(
    `${process.env.NEXT_PUBLIC_OPENVIDU_API_URL}/openvidu/api/sessions/${id}/connection`,
    undefined,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.NEXT_PUBLIC_OPENVIDU_SECRET,
          'utf8'
        ).toString('base64')}`,
      },
    }
  ).then((data) => data.token);
};

export const createBroadCastRoom = async (formData: FormData) => {
  return authRequest(`/live`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
};

export const deleteBroadCastRoom = async (id: number) => {
  return authRequest.delete(`/live`, { data: { seq: id } });
};

export const checkPasswordRoom = async (id: number, pass: string) => {
  return authRequest.post(`/live/password`, {
    seq: id,
    password: pass,
  });
};

export const checkIsMakeRoom = async () => {
  const checkIsMakeRoomAxios = axios.create({
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

  checkIsMakeRoomAxios.interceptors.request.use(setRequest);
  checkIsMakeRoomAxios.interceptors.response.use(setResponse);

  return checkIsMakeRoomAxios.get(`/live/check`);
};
