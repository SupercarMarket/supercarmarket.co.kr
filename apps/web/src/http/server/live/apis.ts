import { post } from '@supercarmarket/lib';
import { authRequest } from 'http/core';

export const getBroadCast = async (
  query: {
    page: number;
    pageSize: number;
  } = {
    page: 1,
    pageSize: 16,
  }
) => {
  return authRequest({
    method: 'GET',
    url: '/live',
    params: query,
  }).then((res) => {
    const result = res as unknown as {
      list: Live.LiveDto[];
      isLastPage: boolean;
      totalCount: number;
      totalPages: number;
    };
    return result;
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
  return authRequest.post(`/live`, formData);
};

export const deleteBroadCastRoom = async (id: number) => {
  return authRequest.delete(`/live`, { data: { seq: id } });
};
