import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
<<<<<<< HEAD
    sub: string;
    accessToken: string;
    refreshToken: string;
    expire: number;
    provider: 'local' | 'kakao' | 'google';
  }
  interface User {
    id: string;
    sub: string;
    accessToken: string;
    refreshToken: string;
    expire: number;
    provider: 'local' | 'kakao' | 'google';
    verified: boolean;
=======
    user: {
      email: string;
    };
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
<<<<<<< HEAD
    accessToken: string;
    refreshToken: string;
    expire: number;
    sub: string;
    provider: 'local' | 'kakao' | 'google';
=======
    accessToken?: string;
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
  }
}
