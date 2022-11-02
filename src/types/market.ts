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

export interface FilterType {
  subject: string;
  option: string;
  value: string;
}

export interface MarketDto {
  id: string;
  carName: string;
  comment: string;
  year: string;
  fuel: string;
  mileage: string;
  price: string;
  seller: string;
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
