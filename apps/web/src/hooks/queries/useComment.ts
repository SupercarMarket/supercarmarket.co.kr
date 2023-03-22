import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type {
  CommentQuery,
  CommentResponse,
} from '@supercarmarket/types/comment';
import { clientFetcher } from '@supercarmarket/lib';

export default function useComment(
  id: string,
  query: CommentQuery = {
    page: 0,
    orderBy: 'DESC',
    category: 'magazine',
  },
  token?: string,
  options = {}
) {
  const { page, orderBy, category } = query;

  const headers: HeadersInit = token
    ? {
        ACCESS_TOKEN: token,
      }
    : {};

  return useQuery<CommentResponse>({
    queryKey: [...queries.comment.id(id), query],
    queryFn: () =>
      clientFetcher(`/server/supercar/v1/post/${id}/comment`, {
        method: 'GET',
        headers,
        query: {
          page: page + 1,
          orderby:
            orderBy === 'DESC' ? false : orderBy === 'ASC' ? true : false,
          category,
        },
      }),
    ...options,
  });
}
