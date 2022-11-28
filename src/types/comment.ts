interface Comment {
  nickName: string;
  profileSrc: string;
  content: string;
  like: number;
  createAt: Date;
  updateAt: Date;
  children?: Comment[];
}

interface CommentResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

export type { Comment, CommentResponse };
