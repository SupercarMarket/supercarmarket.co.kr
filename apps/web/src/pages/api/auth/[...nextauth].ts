import type { NextApiHandler } from 'next';
import type {
  Account,
  CallbacksOptions,
  NextAuthOptions,
  Profile,
} from 'next-auth';
import { type ServerResponse } from '@supercarmarket/types/base';
import type { Provider } from 'next-auth/providers';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { post } from '@supercarmarket/lib';
import { refreshToken, signInOAuth } from 'http/server/auth/apis';
import { isExpire } from 'utils/misc';

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

      const { data } = await post<
        {
          id: string;
          password: string;
        },
        ServerResponse<{
          access_token: string;
          refresh_token: string;
          exp: number;
          newUser: boolean;
          user: {
            id: string;
            name: string;
            email: string;
          };
        }>
      >(`${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/login`, {
        id,
        password,
      });

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
  async signIn({ user, account, profile }) {
    if (account?.type === 'oauth') {
      const {
        provider = 'google',
        nickname,
        email,
        picture,
        sub,
        image,
        name,
        id,
      } = user;

      const { data } = await signInOAuth(
        {
          nickname: nickname ?? name,
          picture: picture ?? image ?? undefined,
          sub: sub ?? id,
          email,
        },
        provider
      );

      const {
        newUser,
        token,
        access_token,
        refresh_token,
        exp,
        user: _user,
      } = data;

      user.newUser = newUser;

      /**
       * 처음 가입한 유저 핸드폰 등록으로 리다이렉트
       */
      if (newUser) return `/auth/phone?uuid=${token}`;

      user.accessToken = access_token;
      user.refreshToken = refresh_token;
      user.expire = exp;
      user.sub = _user.id;

      return true;
    }

    return true;
  },
};

const nextAuthOptions: NextAuthOptions = {
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
