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
  options = {}
) {
  return useQuery<CommentResponse>({
    queryKey: [...queries.comment.id(id), ...queries.comment.query(query)],
    queryFn: () =>
      clientFetcher('/api/comment', {
        method: 'GET',
        params: id,
        query: {
          ...query,
          orderby: query.orderBy === 'DESC' ? 'false' : 'true',
        },
      }),
    suspense: true,
    ...options,
  });
}
