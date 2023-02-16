import { ServerResponse, User } from './base';

interface CommentQuery {
  page: number;
  orderBy: string;
  category: 'magazine' | 'paparazzi' | 'partnership';
}

interface Comment {
  id: string;
  user: User;
  content: string;
  like: number;
  isLiked: boolean;
  isRemoved: boolean;
  isMyComment: boolean;
  createAt: Date;
  updateAt?: Date;
  children?: Comment[];
}

interface CommentResponse extends ServerResponse<Comment[]> {
  page: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
}

export type { Comment, CommentQuery, CommentResponse };
