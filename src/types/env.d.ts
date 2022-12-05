namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_AUTH_SECRET: string;
    NEXT_PUBLIC_GOOGLE_ID: string;
    NEXT_PUBLIC_GOOGLE_SECRET: string;
    NEXT_PUBLIC_KAKAO_ID: string;
    NEXT_PUBLIC_KAKAO_SECRET: string;
  }
}
