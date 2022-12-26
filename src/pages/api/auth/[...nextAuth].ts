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
import { isExpire, refreshToken } from 'utils/api/auth/token';
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

      try {
        const signin = await baseFetcher(
          `${process.env.NEXT_PUBLIC_URL}/api/auth/user/signin`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password }),
          }
        );

        if (signin)
          return {
            id: credentials.id,
            sub: credentials.id,
            accessToken: signin.data.access_token,
            refreshToken: signin.data.refresh_token,
            expire: signin.data.exp,
            verified: true,
            provider: 'local',
          };

        return null;
      } catch (error) {
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
  async jwt({ token, account, user }) {
    // * next-auth 타입 추론 버그로 인해 단언 사용
    console.log('user : ', user, 'account : ', account);

    // * 첫 로그인 처리
    if (account && user)
      return {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        expire: user.expire,
        sub: user.sub,
        provider: user.provider,
      };

    // * 토큰이 만료 안될 때
    if (isExpire(token.expire)) return token;

    // * 토큰 만료
    const newToken = await refreshToken(token.refreshToken);

    return { ...token, ...newToken };
  },
  session({ session, token }) {
    session.accessToken = token.accessToken;
    session.refreshToken = token.refreshToken;
    session.expire = token.expire;
    session.provider = token.provider;
    session.sub = token.sub;
    console.log('session : ', session);

    return session;
  },
  signIn({ user }) {
    user.verified = true;
    return true;
  },
  redirect({ url, baseUrl }) {
    if (url === '/auth/signup') return `${baseUrl}/auth/signup`;
    if (url === '/auth/signin') return `${baseUrl}/auth/signin`;
    return baseUrl;
  },
};

const nextAuthOptions: NextAuthOptions = {
  providers,
  callbacks,
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signup',
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
};

const NextAuthHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, nextAuthOptions);

export { nextAuthOptions };
export default NextAuthHandler;

// ! oauth 로그인 플로우
// ? 1. oauth 로그인
// ? 2. oauth로 가입한 내역이 있는지 확인
// ? 3-1. 가입했다면 정상적으로 oauth 로그인 -> 이 경우엔 여기서 끝 (내정보 api) -> oauth api -> next-auth
// ? 3-2. phone 인증 페이지로 리다이렉트 가입하지 않았다면 jwt로 oauth 회원 로그인에 필요한 정보들을 쿠키에 저장 (httpOnly, 만료 시간은 1시간)  ->
// ? 4. 추가적인 phone 인증 페이지로 리다이렉트 시키고 인증을 받는다.
// ? 5. 핸드폰 정보를 포함하여 jwt에 저장된 회원 정보들을 포함하여 oauth 로그인 -> 서버 단에서 요청
