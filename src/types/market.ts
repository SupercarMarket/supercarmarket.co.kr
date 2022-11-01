import { FormEvent } from 'react';

export interface MarketOptionType {
  option: string;
  value: string;
}

export interface MarketLabelType {
  subject: string;
  dataName: string;
}

export interface MarketFormTarget extends FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

interface MarketDto {
  id: string;
  title: string;
  accident: boolean;
  mileage: number;
  year: Date;
  fuel: string;
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

export type { MarketDto, MarketResponse, WithBlurredImage };
