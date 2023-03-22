import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { Rating } from './account';

interface Links {
  title: string;
  href: string;
  children?: Links[];
}

interface User {
  id: string;
  sub: string;
  nickname: string;
  nickName: string;
  address: string;
  email: string;
  call: string;
  rate: Rating;
  createdDate: string;
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

interface Query {
  page: number;
  category: string;
  orderby: string;
  popular: string;
  variant: 'row' | 'column';
  orderBy: string;
  filter: string | null;
  searchType: string;
  keyword: string | null;
}

interface PaginationResponse<T> {
  data: T;
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

export type {
  Admin,
  Links,
  NextPageWithLayout,
  Params,
  Posting,
  ServerResponse,
  User,
  WithBlurredImage,
  Query,
  PaginationResponse,
};
