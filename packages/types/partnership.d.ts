interface PartnershipDto {
  brdSeq: string;
  partnerName: string;
  description: string;
  category: string;
  workTime: string;
  wireNumber: string;
  address: string;
  siteUrl: string;
  imgSrc: string;
}

interface PartnershipResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
}

type PartnershipDetailDto<T> = Omit<PartnershipDto, 'imgSrc'> & {
  representative: string;
  address: string;
  treatedItem: string;
  introduction: string;
  imgSrc: T[];
  companyName: string;
};

interface PartnershipDetailResponse<T> {
  data: PartnershipDetailDto<T>;
  isLastPage: boolean;
  totalPages: number;
  totalCount: number;
}

export type {
  PartnershipDetailDto,
  PartnershipDetailResponse,
  PartnershipDto,
  PartnershipResponse,
};
