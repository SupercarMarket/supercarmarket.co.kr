import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

interface Links {
  title: string;
  href: string;
  children?: Links[];
}

interface User {
  id: string;
  sub: string;
  nickName: string;
  address: string;
  email: string;
  call: string;
  profileSrc?: string;
  createAt: string;
}

interface Admin extends User {
  description: string;
}

interface Posting {
  id: string;
  title: string;
  view: number;
  contentHtml: string;
  createAt: Date;
  user: User;
  totalCommentCount: number;
  updateAt?: Date;
}

interface ServerResponse<T> {
  data: T;
}

type WithBlurredImage<T> = {
  base64: string;
} & T;

interface Params {
  [key: string]: string;
}

type NextPageWithLayout = NextPage & {
  Layout?: any;
};

export type {
  Admin,
  Links,
  NextPageWithLayout,
  Params,
  Posting,
  ServerResponse,
  User,
  WithBlurredImage,
};
