import { Posting } from './base';

interface CommunityDto {
  id: string;
  nickname: string;
  title: string;
  date: Date;
  view: number;
  like: number;
  profileSrc?: string;
  category: string;
  imgSrc: string;
  comments: number;
  created: string;
  popular: boolean;
}

interface CommunityPostDto {
  id: number;
  title: string;
  like: number;
  contents: string;
  created: string;
  updated: string;
  nickname: string;
  rate: string;
  comments: number;
  isLiked: boolean;
  isMyPost: boolean;
  view: number;
}

interface CommunityTemporaryStorageDto {
  category: string;
  tempId: string;
  title: string;
  contents: string;
  images: stirng[];
  files: { url: string; name: string }[];
}

interface CommunityBestResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
}

export type {
  CommunityBestResponse,
  CommunityTemporaryStorageDto,
  CommunityDto,
  CommunityPostDto,
};
