import type { NextApiHandler } from 'next';
import type {
  Account,
  CallbacksOptions,
  NextAuthOptions,
  Profile,
} from 'next-auth';
import type { Provider } from 'next-auth/providers';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { HttpError, post } from '@supercarmarket/lib';
import { refreshToken, signInOAuth } from 'http/server/auth/apis';
import { isExpire } from 'utils/misc';

const EMPTY_FIELD = 'empty';

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

      const { data } = await post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/login`,
        {
          id,
          password,
        }
      );

      if (data)
        return {
          id: data.user.id,
          sub: data.user.id,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expire: data.exp,
          newUser: true,
          provider: 'local',
          nickname: data.user.name,
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
      uuid: { label: 'uuid', type: 'text' },
      name: { label: 'name', type: 'text' },
    },
    async authorize(credentials) {
      if (!credentials) return null;

      const { phone, authentication, uuid, name } = credentials;

      const { data } = await post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/register-phone`,
        { phone, code: authentication, token: uuid, name }
      );

      const { access_token, refresh_token, exp, newUser, user } = data;

      if (data)
        return {
          id: user.id,
          sub: user.id,
          accessToken: access_token,
          refreshToken: refresh_token,
          expire: exp,
          newUser: newUser,
          provider: user.provider,
          nickname: user.name,
        };

      return null;
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
    token: {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/login/google`,
      request: async (ctx) => {
        const { code } = ctx.params;
        const { code_verifier } = ctx.checks;

        if (!code)
          throw new HttpError({
            message: '인가코드가 존재하지 않습니다.',
            statusCode: 500,
          });

        const tokens = await signInOAuth({ code, code_verifier }, 'google');

        return {
          tokens: tokens.data,
        };
      },
    },
    userinfo: {
      request: async (ctx) => {
        const { tokens } = ctx;

        return {
          ...tokens,
          newUser: tokens.newUser,
          uuid: tokens.token,
          id: EMPTY_FIELD,
          sub: EMPTY_FIELD,
        };
      },
    },
    profile: (profile) => {
      return {
        provider: 'google',
        newUser: profile.newUser,
        id: profile.user?.id ?? EMPTY_FIELD,
        sub: profile.user?.id ?? EMPTY_FIELD,
        nickname: profile.user?.name ?? EMPTY_FIELD,
        uuid: profile.uuid ?? EMPTY_FIELD,
        accessToken: profile.access_token ?? EMPTY_FIELD,
        refreshToken: profile.refresh_token ?? EMPTY_FIELD,
        picture: profile.picture ?? EMPTY_FIELD,
        email: profile.email ?? EMPTY_FIELD,
        expire: profile.exp ?? 0,
      };
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
    token: {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/login/kakao`,
      request: async (ctx) => {
        const { code } = ctx.params;

        if (!code)
          throw new HttpError({
            message: '인가코드가 존재하지 않습니다.',
            statusCode: 500,
          });

        const tokens = await signInOAuth({ code }, 'kakao');

        return {
          tokens: tokens.data,
        };
      },
    },
    userinfo: {
      request: async (ctx) => {
        const { tokens } = ctx;

        return {
          ...tokens,
          newUser: tokens.newUser,
          uuid: tokens.token,
          id: EMPTY_FIELD,
          sub: EMPTY_FIELD,
        };
      },
    },
    profile: (profile) => {
      return {
        provider: 'kakao',
        newUser: profile.newUser,
        id: profile.user?.id ?? EMPTY_FIELD,
        sub: profile.user?.id ?? EMPTY_FIELD,
        nickname: profile.user?.name ?? EMPTY_FIELD,
        uuid: profile.uuid ?? EMPTY_FIELD,
        accessToken: profile.access_token ?? EMPTY_FIELD,
        refreshToken: profile.refresh_token ?? EMPTY_FIELD,
        picture: profile.picture ?? EMPTY_FIELD,
        email: profile.email ?? EMPTY_FIELD,
        expire: profile.exp ?? 0,
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

    const newToken = await refreshToken(token.accessToken, token.refreshToken);

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
      /**
       * 처음 가입한 유저 핸드폰 등록으로 리다이렉트
       */
      if (user.newUser) return `/auth/phone?uuid=${user.uuid}`;
    }
    return true;
  },
};

const nextAuthOptions: NextAuthOptions = {
  debug: true,
  providers,
  callbacks,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
};

const NextAuthHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, nextAuthOptions);

export { nextAuthOptions };
export default NextAuthHandler;
