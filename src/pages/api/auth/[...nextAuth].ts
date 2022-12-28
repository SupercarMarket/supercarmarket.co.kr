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
  /*
    |--------------------------------------------------------------------------
    | Provider : Credentials
    |--------------------------------------------------------------------------
    */
  CredentialsProvider({
    id: 'Credentials',
    name: 'Credentials',
    credentials: {
      id: { label: 'id', type: 'text' },
      password: { label: 'password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials) return null;

      const { id, password } = credentials;

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

      if (!signin) throw new Error('로그인에 실패했습니다.');

      if (signin)
        return {
          id: credentials.id,
          sub: credentials.id,
          accessToken: signin.data.access_token,
          refreshToken: signin.data.refresh_token,
          expire: signin.data.exp,
          newUser: true,
          provider: 'local',
          nickname: credentials.id,
        };

      return null;
    },
  }),
  /*
    |--------------------------------------------------------------------------
    | Provider : Phone
    |--------------------------------------------------------------------------
    */
  CredentialsProvider({
    id: 'Phone',
    name: 'Phone',
    credentials: {
      phone: { label: 'phone', type: 'tel' },
      authentication: { label: 'authentication', type: 'text' },
      uuid: { label: 'phone', type: 'text' },
    },
    async authorize(credentials) {
      if (!credentials) return null;

      const { phone, authentication, uuid } = credentials;

      try {
        const register = await baseFetcher(
          `${process.env.NEXT_PUBLIC_URL}/api/auth/phone/register-phone`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, authentication, uuid }),
          }
        );

        const {
          data: { user, access_token, refresh_token, exp, newUser },
        } = register;

        if (register)
          return {
            id: user.sub,
            sub: user.sub,
            accessToken: access_token,
            refreshToken: refresh_token,
            expire: exp,
            newUser: newUser,
            provider: user.provider,
            nickname: user.name,
          };

        return null;
      } catch (error) {
        return null;
      }
    },
  }),
  /*
    |--------------------------------------------------------------------------
    | Provider : Google
    |--------------------------------------------------------------------------
    */
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
  /*
    |--------------------------------------------------------------------------
    | Provider : Kakao
    |--------------------------------------------------------------------------
    */
  KakaoProvider({
    clientId: process.env.NEXT_PUBLIC_KAKAO_ID,
    clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET,
    profile(profile) {
      return {
        id: profile.id,
        sub: profile.id,
        provider: 'kakao',
        accessToken: '',
        refreshToken: '',
        expire: 0,
        nickname: profile.kakao_account.profile.nickname,
        picture: profile.kakao_account.profile.profile_image_url,
        email: profile.kakao_account.has_email
          ? profile.kakao_account.email
          : null,
      };
    },
  }),
];

const callbacks: Partial<CallbacksOptions<Profile, Account>> | undefined = {
  /*
  |--------------------------------------------------------------------------
  | Callback : Jwt
  |--------------------------------------------------------------------------
  */
  async jwt({ token, account, user }) {
    /**
     * 첫 콜백 호출때 처리
     */
    if (account && user)
      return {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        expire: user.expire,
        sub: user.sub,
        provider: user.provider,
        newUser: user.newUser,
        nickname: user.nickname,
        email: user.email,
      };

    /**
     * 토큰 만료 체크
     */
    if (isExpire(token.expire)) return token;

    const newToken = await refreshToken(token.refreshToken);

    return { ...token, ...newToken };
  },
  /*
    |--------------------------------------------------------------------------
    | Callback : Session
    |--------------------------------------------------------------------------
    */
  session({ session, token }) {
    session.accessToken = token.accessToken;
    session.refreshToken = token.refreshToken;
    session.expire = token.expire;
    session.provider = token.provider;
    session.sub = token.sub;
    session.newUser = token.newUser;
    session.nickname = token.nickname;
    session.email = token.email;

    return session;
  },
  /*
    |--------------------------------------------------------------------------
    | Callback : Sign In
    |--------------------------------------------------------------------------
    */
  async signIn({ user, account }) {
    if (account?.type === 'oauth') {
      const { nickname, provider, email, picture, sub } = user;
      const oauth = await baseFetcher(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/user/oauth`,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({ nickname, provider, email, picture, sub }),
          query: {
            provider,
          },
        }
      );

      const {
        data: { newUser, token, access_token, refresh_token, exp },
      } = oauth;

      user.newUser = newUser;

      /**
       * 처음 가입한 유저 핸드폰 등록으로 리다이렉트
       */
      if (newUser) return `/auth/phone?uuid=${token}`;

      user.accessToken = access_token;
      user.refreshToken = refresh_token;
      user.expire = exp;

      return true;
    }

    return true;
  },
  /*
    |--------------------------------------------------------------------------
    | Callback : Redirect
    |--------------------------------------------------------------------------
    */
  // async redirect({ url, baseUrl }) {
  //   if (url === `${baseUrl}/auth/signin`) {
  //     return Promise.resolve(`${baseUrl}/auth/signin`);
  //   }
  //   return Promise.resolve(url);
  // },
};

const nextAuthOptions: NextAuthOptions = {
  providers,
  callbacks,
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
};

const NextAuthHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, nextAuthOptions);

export { nextAuthOptions };
export default NextAuthHandler;
