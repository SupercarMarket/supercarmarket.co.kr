import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import type { CommentResponse } from 'types/comment';
import { baseFetcher } from 'utils/api/fetcher';

export default function useComment(id: string, options = {}) {
  return useQuery<CommentResponse>({
    queryKey: queries.comment.id(id),
    queryFn: () => baseFetcher('/api/comment', { method: 'GET', params: id }),
    ...options,
  });
}
