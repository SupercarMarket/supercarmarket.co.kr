interface Signup {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  email: string;
  phone: string;
  authentication: string;
}

interface Signin {
  id: string;
  password: string;
}

type DuplicationList = 'email' | 'nickname' | 'id';

export type { DuplicationList, Signin, Signup };
