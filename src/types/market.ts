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

export type FilterType = MarketOptionType & MarketLabelType;

export interface MarketDto {
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

export interface MarketResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}
