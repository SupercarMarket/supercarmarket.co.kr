interface Comment {
  nickname?: string;
  profileSrc?: string;
  content?: string;
  like?: number;
  createAt?: Date;
  updateAt?: Date;
  children?: Comment[];
}

interface CommentProps {
  comments?: Comment[];
  totalPages?: number;
  totalCount?: number;
  isLast?: boolean;
}

export type { Comment, CommentProps };
