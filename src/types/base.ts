interface User {
  id: string;
  nickName: string;
  address: string;
  email: string;
  call: string;
  profileSrc?: string;
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
  updateAt?: Date;
}

interface ServerResponse<T> {
  data: T;
}

type WithBlurredImage<T> = {
  base64: string;
} & T;

export type { Admin, Posting, ServerResponse, User, WithBlurredImage };
