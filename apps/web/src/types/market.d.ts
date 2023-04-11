import { type FormEvent } from 'react';

declare module Market {
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

  type MarketFilterType = MarketOptionType & MarketLabelType;

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
    category: string;
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
    brdSeq: number;
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
    imgSrc: T[];
    isLike: boolean;
    isMine: boolean;
    createdDate: string;
  }
}
