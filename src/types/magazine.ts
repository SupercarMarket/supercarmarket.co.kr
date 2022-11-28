interface MagazineDto {
  id: string;
  title: string;
  contents: string;
  imgSrc: string;
}

interface MagazinePostDto {
  title: string;
  nickName: string;
  profileSrc: string | null;
  view: number;
  contentHtml: string;
  createAt: string;
  updateAt: string | null;
}

type WithBlurredImage<T> = {
  base64: string;
} & T;

interface MagazineResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

export type {
  MagazineDto,
  MagazinePostDto,
  MagazineResponse,
  WithBlurredImage,
};
