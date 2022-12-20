import {
  makeFilterDate,
  makeFilterMileage,
  makeFilterPrice,
} from 'utils/market/marketFilter';

import { MarketOptionType } from '../types/market';

const CATEGORY: MarketOptionType[] = [
  { option: '전체', value: 'all' },
  { option: '스포츠카', value: 'sports-car' },
  { option: '세단', value: 'saloon' },
  { option: 'SUV', value: 'suv' },
  { option: '픽업트럭', value: 'pickup-truck' },
  { option: '클래식카&올드카', value: 'classic-car&old-car' },
];

const CATEGORY_VALUES = CATEGORY.map(({ value }) => value);

const FIRST_MARKET_FILTER = [
  [
    {
      label: '연식',
      dataName: 'minDate',
      defaultLabel: '최소',
      optionSet: makeFilterDate(2023, 2010),
    },
    {
      label: '연식',
      dataName: 'maxDate',
      defaultLabel: '최대',
      optionSet: makeFilterDate(2023, 2010),
    },
  ],
  [
    {
      label: '연료',
      dataName: 'fuel',
      defaultLabel: '선택',
      optionSet: [
        {
          option: '가솔린',
          value: 'gasoline',
        },
        {
          option: '경유',
          value: 'diesel',
        },
        {
          option: '전기',
          value: 'electric',
        },
      ],
    },
  ],
  [
    {
      label: '주행거리',
      dataName: 'minMileage',
      defaultLabel: '최소',
      optionSet: makeFilterMileage(1000, 20000, 1000),
    },
    {
      label: '주행거리',
      dataName: 'maxMileage',
      defaultLabel: '최대',
      optionSet: makeFilterMileage(1000, 20000, 1000),
    },
  ],
  [
    {
      label: '가격',
      dataName: 'minPrice',
      defaultLabel: '최소',
      optionSet: makeFilterPrice(2000, 30000, 2000),
    },
    {
      label: '가격',
      dataName: 'maxPrice',
      defaultLabel: '최대',
      optionSet: makeFilterPrice(2000, 30000, 2000),
    },
  ],
];

const SECOND_MARKET_FILTER = [
  [
    {
      label: '사고여부',
      dataName: 'accident',
      defaultLabel: '선택',
      optionSet: [
        { option: '유', value: 'true' },
        { option: '무', value: 'false' },
      ],
    },
  ],
  [
    {
      label: '변속기',
      dataName: 'transmission',
      defaultLabel: '선택',
      optionSet: [
        { option: '자동', value: 'auto' },
        { option: '수동', value: 'manual' },
      ],
    },
  ],
];

const FILTER_OPTION_DATANAMES = FIRST_MARKET_FILTER.map(([arr1, arr2]) => [
  arr1.dataName,
  arr2?.dataName,
])
  .concat(
    SECOND_MARKET_FILTER.map(([arr1, arr2]) => [arr1.dataName, arr2?.dataName])
  )
  .flat(2)
  .filter((v) => v);

const ORDER_OPTIONSET: MarketOptionType[] = [
  {
    option: '최근 등록순',
    value: 'created_date DESC',
  },
  {
    option: '이전 등록순',
    value: 'created_date ASC',
  },
  {
    option: '가격 낮은순',
    value: 'pdt_price ASC',
  },
  {
    option: '가격 높은순',
    value: 'pdt_price DESC',
  },
  {
    option: '주행 짧은순',
    value: 'pinf_mileage ASC',
  },
  {
    option: '주행 많은순',
    value: 'pinf_mileage DESC',
  },
  {
    option: '연식 최신순',
    value: 'pinf_year DESC',
  },
  {
    option: '연식 오래된순',
    value: 'pinf_year ASC',
  },
];

const MARKET_LIST_TABLE_HEAD = [
  {
    title: '사진',
    width: '196',
  },
  {
    title: '차량정보',
    width: '564',
  },
  {
    title: '연식',
    width: undefined,
  },
  {
    title: '연료',
    width: undefined,
  },
  {
    title: '주행',
    width: undefined,
  },
  {
    title: '가격',
    width: undefined,
  },
  {
    title: '판매자',
    width: undefined,
  },
];

const FUEL_KIND: { [key: string]: string } = {
  gasoline: '가솔린',
  diesel: '디젤',
  electric: '전기',
};

const TRANSMISSION_KIND: { [key: string]: string } = {
  auto: '자동',
  manual: '수동',
};

export {
  CATEGORY,
  CATEGORY_VALUES,
  FILTER_OPTION_DATANAMES,
  FIRST_MARKET_FILTER,
  FUEL_KIND,
  MARKET_LIST_TABLE_HEAD,
  ORDER_OPTIONSET,
  SECOND_MARKET_FILTER,
  TRANSMISSION_KIND,
};
