interface User {
  id: string;
  sub: string;
  nickName: string;
  address: string;
  email: string;
  call: string;
  profileSrc?: string;
  createAt: string;
}

interface Admin extends User {
  description: string;
}

interface Posting {
  id: string;
  title: string;
  view: number;
  contentHtml: string;
  createAt: Date;
  user: User;
  totalCommentCount: number;
  updateAt?: Date;
}

interface ServerResponse<T> {
  data: T;
}

type WithBlurredImage<T> = {
  base64: string;
} & T;

interface Params {
  [key: string]: string;
}

export type { Admin, Params, Posting, ServerResponse, User, WithBlurredImage };
