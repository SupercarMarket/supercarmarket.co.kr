import {
  makeFilterDate,
  makeFilterMileage,
  makeFilterPrice,
  makeHowManyResult,
} from 'utils/market/marketFilter';

const CATEGORY = [
  { option: '전체', value: 'all' },
  { option: '스포츠카', value: 'sports-car' },
  { option: '세단', value: 'saloon' },
  { option: 'SUV', value: 'suv' },
  { option: '픽업트럭', value: 'pickup-truck' },
  { option: '클래식카&올드카', value: 'classic-car' },
];

const CATEGORY_MAPPING: { [key: string]: string } = {};
CATEGORY.forEach(({ option, value }) => {
  if (value === 'classic-car') {
    CATEGORY_MAPPING[value] = '클래식카%26올드카';
  } else {
    CATEGORY_MAPPING[value] = option;
  }
});

const CATEGORY_VALUES = CATEGORY.map(({ value }) => value);

const FIRST_MARKET_FILTER = [
  [
    {
      label: '연식',
      defaultLabel: '최소',
      optionSet: makeFilterDate(2023, 1950, 'minDate'),
    },
    {
      label: '연식',
      defaultLabel: '최대',
      optionSet: makeFilterDate(2023, 1950, 'maxDate'),
    },
  ],
  [
    {
      label: '연료',
      defaultLabel: '선택',
      optionSet: [
        {
          option: '휘발유',
          dataName: 'fuel',
          value: '휘발유',
        },
        {
          option: '경유',
          dataName: 'fuel',
          value: '경유',
        },
        {
          option: '전기',
          dataName: 'fuel',
          value: '전기',
        },
      ],
    },
  ],
  [
    {
      label: '주행거리',
      defaultLabel: '최소',
      optionSet: makeFilterMileage(0, 100000, 5000, 'minMileage'),
    },
    {
      label: '주행거리',
      defaultLabel: '최대',
      optionSet: makeFilterMileage(0, 100000, 5000, 'maxMileage'),
    },
  ],
  [
    {
      label: '가격',
      defaultLabel: '최소',
      optionSet: makeFilterPrice(0, 100000, 5000, 'minPrice'),
    },
    {
      label: '가격',
      defaultLabel: '최대',
      optionSet: makeFilterPrice(0, 100000, 5000, 'maxPrice'),
    },
  ],
];

const SECOND_MARKET_FILTER = [
  [
    {
      label: '사고여부',
      defaultLabel: '선택',
      optionSet: [
        { option: '유', dataName: 'accident', value: 'true' },
        { option: '무', dataName: 'accident', value: 'false' },
      ],
    },
  ],
  [
    {
      label: '변속기',
      defaultLabel: '선택',
      optionSet: [
        { option: '자동', dataName: 'transmission', value: '자동' },
        { option: '수동', dataName: 'transmission', value: '수동' },
      ],
    },
  ],
];

const FILTER_OPTION_DATANAMES = FIRST_MARKET_FILTER.map(([arr1, arr2]) => [
  arr1.optionSet[0].dataName,
  arr2?.optionSet[0].dataName,
])
  .concat(
    SECOND_MARKET_FILTER.map(([arr1, arr2]) => [
      arr1.optionSet[0].dataName,
      arr2?.optionSet[0].dataName,
    ])
  )
  .flat(2)
  .filter((v) => v);

const ORDER_OPTIONSET = {
  label: '정렬',
  defaultLabel: '최근 등록순',
  optionSet: [
    {
      option: '최근 등록순',
      dataName: 'filter orderBy',
      value: 'created_date DESC',
    },
    {
      option: '이전 등록순',
      dataName: 'filter orderBy',
      value: 'created_date ASC',
    },
    {
      option: '가격 낮은순',
      dataName: 'filter orderBy',
      value: 'pdt_price ASC',
    },
    {
      option: '가격 높은순',
      dataName: 'filter orderBy',
      value: 'pdt_price DESC',
    },
    {
      option: '주행 짧은순',
      dataName: 'filter orderBy',
      value: 'pinf_mileage ASC',
    },
    {
      option: '주행 많은순',
      dataName: 'filter orderBy',
      value: 'pinf_mileage DESC',
    },
    {
      option: '연식 최신순',
      dataName: 'filter orderBy',
      value: 'pinf_year DESC',
    },
    {
      option: '연식 오래된순',
      dataName: 'filter orderBy',
      value: 'pinf_year ASC',
    },
  ],
};

const SHOW_COUNT_OPTIONS = {
  label: '리스트 개수',
  defaultLabel: '20개씩',
  optionSet: makeHowManyResult(5, 70, 'size'),
};

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

const MARKET_LINKS = [
  {
    title: '전체',
    href: {
      pathname: '/market',
      query: {
        category: 'all',
      },
    },
    category: 'all',
  },
  {
    title: '스포츠카',
    href: {
      pathname: '/market',
      query: {
        category: 'sports-car',
      },
    },
    category: 'sports-car',
  },
  {
    title: '세단',
    href: {
      pathname: '/market',
      query: {
        category: 'saloon',
      },
    },
    category: 'saloon',
  },
  {
    title: 'SUV',
    href: {
      pathname: '/market',
      query: {
        category: 'suv',
      },
    },
    category: 'suv',
  },
  {
    title: '픽업트럭',
    href: {
      pathname: '/market',
      query: {
        category: 'pickup-truck',
      },
    },
    category: 'pickup-truck',
  },
  {
    title: '클래식카&올드카',
    href: {
      pathname: '/market',
      query: {
        category: 'classic-car',
      },
    },
    category: 'classic-car',
  },
];

export {
  CATEGORY,
  CATEGORY_MAPPING,
  CATEGORY_VALUES,
  FILTER_OPTION_DATANAMES,
  FIRST_MARKET_FILTER,
  FUEL_KIND,
  MARKET_LIST_TABLE_HEAD,
  ORDER_OPTIONSET,
  SECOND_MARKET_FILTER,
  SHOW_COUNT_OPTIONS,
  MARKET_LINKS,
};
