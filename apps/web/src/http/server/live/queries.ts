import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './keys';
import { getBroadCast, getBroadCastRoom } from './apis';

export const useBroadCast = (
  query?: { page: number; pageSize: number },
  options = {}
) => {
  return useQuery([...QUERY_KEYS.live(), query], () => getBroadCast(query), {
    useErrorBoundary: true,
    ...options,
  });
};

export const useBroadCastRoom = (id: string, options = {}) => {
  return useQuery<Common.Response<Live.LiveRoomDto>>({
    queryKey: QUERY_KEYS.id(id),
    queryFn: () => getBroadCastRoom(id),
    useErrorBoundary: true,
    ...options,
  });
};
