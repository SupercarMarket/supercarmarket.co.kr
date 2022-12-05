import type { NextApiHandler } from 'next';
import type {
  Account,
  CallbacksOptions,
  NextAuthOptions,
  Profile,
} from 'next-auth';
import NextAuth from 'next-auth';
import type { Provider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { env } from 'utils/misc';

const providers: Provider[] = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      username: { label: 'Username', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize() {
      const user = { id: '1', name: 'junseo', email: 'junseo@naver.com' };

      if (user) {
        return user;
      } else {
        return null;
      }
    },
  }),
  GoogleProvider({
    clientId: env('GOOGLE_ID'),
    clientSecret: env('GOOGLE_SECRET'),
    authorization: {
      params: {
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
      },
    },
  }),
  KakaoProvider({
    clientId: env('KAKAO_CLIENT_ID'),
    clientSecret: env('KAKAO_CLIENT_SECRET'),
  }),
];

const callbacks: Partial<CallbacksOptions<Profile, Account>> | undefined = {
  jwt({ token }) {
    return token;
  },
  session({ session, token, user }) {
    return session;
  },
};

const nextAuthOptions: NextAuthOptions = {
  providers,
  callbacks,
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
};

const NextAuthHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, nextAuthOptions);

export { nextAuthOptions };
export default NextAuthHandler;
