declare module Comment {
  interface CommentDto {
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
}
