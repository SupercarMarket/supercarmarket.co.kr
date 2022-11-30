import { useQuery } from '@tanstack/react-query';
import queries from 'constants/queries';
import { CommentResponse } from 'types/comment';
import { commentApiFetcher } from 'utils/api/comment';

export default function useComment(id: string, options = {}) {
  return useQuery<CommentResponse>(
    queries.comment.id(id),
    () =>
      commentApiFetcher(`/api/comment`, {
        method: 'GET',
        params: id,
      }),
    options
  );
}
