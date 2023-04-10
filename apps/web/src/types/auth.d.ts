declare module Auth {
  type DuplicationField = 'email' | 'nickname' | 'id';

  interface Common {
    id: string;
    password: string;
  }

  interface SignupRequest extends Auth.Common {
    passwordConfirm: string;
    name: string;
    nickname: string;
    email: string;
    phone: string;
    authentication: string;
  }

  type SigninReqeust = Auth.Common;
}
