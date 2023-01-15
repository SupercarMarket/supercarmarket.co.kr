import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type { CommentQuery, CommentResponse } from 'types/comment';
import { baseFetch } from 'utils/api/fetcher';

export default function useComment(
  id: string,
  query: CommentQuery = {
    page: 0,
    orderby: 'false',
    category: 'magazine',
  },
  options = {}
) {
  return useQuery<CommentResponse>({
    queryKey: [...queries.comment.id(id), ...queries.comment.query(query)],
    queryFn: () =>
      baseFetch('/api/comment', { method: 'GET', params: id, query }),
    suspense: true,
    ...options,
  });
}
