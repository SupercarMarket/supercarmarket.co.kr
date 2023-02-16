import { FormEvent } from 'react';

interface MarketOptionType {
  option: string;
  dataName: string;
  value: string;
}

interface MarketLabelType {
  label: string;
  defaultLabel: string;
  optionSet: MarketOptionType[];
}

interface SelectType {
  label: string;
  defaultLabel: string;
  optionSet: MarketOptionType[];
}

interface MarketFormTarget extends FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

type FilterType = MarketOptionType & MarketLabelType;

interface MarketDto {
  id: string;
  carName: string;
  description: string;
  year: string;
  fuel: string;
  mileage: number;
  price: number;
  dealer: string;
  imgSrc: string;
}

type WithBlurredImage<T> = {
  base64?: string;
} & T;

interface MarketResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}

interface DealerDto {
  profile: string;
  company: string;
  dealerName: string;
  address: string;
  dealerNumber: string;
  phone: string;
}

interface MarketAttachment {
  originName: string;
  attAttachmentUrl: string;
}

interface MarketDetailDto<T> {
  dealer: DealerDto;
  view: number;
  dirSeq: number;
  likeCount: number;
  registration: string;
  attSrc: MarketAttachment[];
  carName: string;
  introduction: string;
  year: string;
  fuel: string;
  mileage: number;
  price: number;
  accident: boolean;
  regDate: string;
  cc: number;
  color: string;
  trasmissionType: string;
  category: string;
  isLike: boolean;
  imgSrc: T[];
  createdDate: string;
}

interface MarketDetailResponse<T> {
  data: T;
  carList: WithBlurredImage<MarketDto>[];
}

export type {
  DealerDto,
  FilterType,
  MarketAttachment,
  MarketDetailDto,
  MarketDetailResponse,
  MarketDto,
  MarketFormTarget,
  MarketLabelType,
  MarketOptionType,
  MarketResponse,
  SelectType,
  WithBlurredImage,
};
