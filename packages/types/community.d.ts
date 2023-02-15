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

interface CommunityPostDto extends Posting {
  like: number;
}

interface CommunityBestResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
}

export type { CommunityBestResponse, CommunityDto, CommunityPostDto };
