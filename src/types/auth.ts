interface Signup {
  id: string;
  password: string;
<<<<<<< HEAD
  passwordConfirm: string;
=======
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
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
