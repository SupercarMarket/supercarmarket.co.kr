import { useQuery } from '@tanstack/react-query';
import {
  type CommentQuery,
  type CommentResponse,
} from '@supercarmarket/types/comment';
import { QUERY_KEYS } from './keys';
import { getComments } from './apis';

export const useComment = (
  payload: {
    postId: string;
    query: CommentQuery;
    token?: string;
  },
  options = {}
) => {
  const { postId, query, token } = payload;
  return useQuery<CommentResponse>({
    queryKey: [...QUERY_KEYS.comment(postId), query],
    queryFn: () => getComments({ postId, query, token }),
    ...options,
  });
};
