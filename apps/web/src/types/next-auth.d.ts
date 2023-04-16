import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    sub: string;
    accessToken: string;
    refreshToken: string;
    expire: number;
    provider: 'local' | 'kakao' | 'google';
    newUser?: boolean;
    nickname: string;
    email?: string;
    picture?: string;
  }
  interface User {
    sub: string;
    accessToken: string;
    refreshToken: string;
    expire: number;
    provider: 'local' | 'kakao' | 'google';
    nickname: string;
    email?: string;
    picture?: string;
    id: string;
    newUser?: boolean;
    uuid?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    expire: number;
    sub: string;
    provider: 'local' | 'kakao' | 'google';
    newUser?: boolean;
    nickname: string;
    email?: string;
    picture?: string;
  }
}
