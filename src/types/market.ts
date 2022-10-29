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
