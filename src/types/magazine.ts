import { Posting } from './base';

interface MagazineDto {
  id: string;
  title: string;
  contents: string;
  imgSrc: string;
  comments: number;
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

interface MagazinePostingResponse {
  data: Posting & {
    thumbnailSrc: string;
  };
  isScraped: boolean;
  isCounseling: boolean;
}

export type {
  MagazineDto,
  MagazinePostingResponse,
  MagazineResponse,
  WithBlurredImage,
};
