interface CommunityDto {
  id: string;
  nickName: string;
  title: string;
  date: Date;
  view: number;
  like: number;
  profileImgSrc: string | null;
  imgSrc: string;
}

interface CommunityBestResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
}

export type { CommunityBestResponse, CommunityDto };
