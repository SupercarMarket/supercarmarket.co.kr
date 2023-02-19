import { WithBlurredImage } from './base';

interface PartnershipDto {
  id: string;
  partnerName: string;
  description: string;
  category: string;
  workTime: string;
  phone: string;
  region: string;
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
  owner: string;
  address: string;
  production: string;
  tel?: string;
  introduction: string;
  imgSrc: T[];
};

interface PartnershipDetailResponse<T> {
  data: {
    partnerDetail: PartnershipDetailDto<T>;
    partnerList: WithBlurredImage<PartnershipDto>[];
  };
  page: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
}

export type {
  PartnershipDetailDto,
  PartnershipDetailResponse,
  PartnershipDto,
  PartnershipResponse,
};
