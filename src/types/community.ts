interface CommunityDto {
  id: string;
  nickName: string;
  title: string;
  date: Date;
  view: number;
  like: number;
  profileSrc: string | null;
  imgSrc: string;
  thumbnailImgSrc: string;
}

interface CommunityBestResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
}

export type { CommunityBestResponse, CommunityDto };
