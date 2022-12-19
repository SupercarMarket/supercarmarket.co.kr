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
import { baseFetcher } from 'utils/api/fetcher';

const providers: Provider[] = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      id: { label: 'id', type: 'text' },
      password: { label: 'password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials) return null;
      const { id, password } = credentials;

      const signin = await baseFetcher('/auth/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });

      if (signin) {
        return {
          ...credentials,
        };
      } else {
        return null;
      }
    },
  }),
  GoogleProvider({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    authorization: {
      params: {
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
      },
    },
  }),
  KakaoProvider({
    clientId: process.env.NEXT_PUBLIC_KAKAO_ID,
    clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET,
  }),
];

const callbacks: Partial<CallbacksOptions<Profile, Account>> | undefined = {
  jwt({ token, account }) {
    console.log('token : ', token, 'account : ', account);
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
