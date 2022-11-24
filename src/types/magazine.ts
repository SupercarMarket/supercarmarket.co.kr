interface MagazineDto {
  id: string;
  title: string;
  contents: string;
  imgSrc: string;
  thumbnailImgSrc: string;
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

export type { MagazineDto, MagazineResponse, WithBlurredImage };
