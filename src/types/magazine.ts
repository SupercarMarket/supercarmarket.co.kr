interface MagazineDto {
  id: string;
  title: string;
  contents: string;
}

interface MagazineResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

export type { MagazineDto, MagazineResponse };