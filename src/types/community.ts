import { Posting, User } from './base';

interface CommunityDto {
  id: string;
  nickName: string;
  title: string;
  date: Date;
  view: number;
  like: number;
  profileSrc?: string;
  imgSrc: string;
}

interface CommunityPostDto extends Posting {
  user: User;
  like: number;
}

interface CommunityBestResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
}

export type { CommunityBestResponse, CommunityDto, CommunityPostDto };
