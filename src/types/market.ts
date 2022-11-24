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
  thumbnailImgSrc: string;
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

export type {
  FilterType,
  MarketDto,
  MarketFormTarget,
  MarketLabelType,
  MarketOptionType,
  MarketResponse,
  WithBlurredImage,
};
