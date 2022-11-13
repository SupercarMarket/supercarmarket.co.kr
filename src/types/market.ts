import { FormEvent } from 'react';

interface MarketOptionType {
  option: string;
  value: string;
}

interface MarketLabelType {
  subject: string;
  dataName: string;
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
  base64: string;
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

interface MarketDetailDto<T> {
  dealer: DealerDto;
  viewCount: number;
  dirSeq: number;
  likeCount: number;
  registration: string;
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
  imgSrc: T[];
}

interface MarketDetailResponse<T> {
  data: T;
  carList: WithBlurredImage<MarketDto>[];
}

export type {
  FilterType,
  MarketDetailDto,
  MarketDetailResponse,
  MarketDto,
  MarketFormTarget,
  MarketLabelType,
  MarketOptionType,
  MarketResponse,
  WithBlurredImage,
};
