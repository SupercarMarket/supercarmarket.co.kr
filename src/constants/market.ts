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

/**
 *
 * @param startYear 연식 시작할 년도
 * @param endYear 연식 마지막 년도
 * @returns [{ option: '년도', value: 숫자 값 }];
 */
const CAR_FILTER_DATE = (
  startYear: number,
  endYear: number
): MarketOptionType[] => {
  const arr: MarketOptionType[] = [];

  for (let i = startYear; i >= endYear; i--) {
    arr.push({ option: `${i}년`, value: i + '' });
  }

  return arr;
};

/**
 *
 * @param startPrice 시작 가격
 * @param endPrice 끝 가격
 * @param step 가격 간 격차
 * @returns [{ option: '${가격}만원 || 억', value: 숫자 값 }];
 */
const CAR_FILTER_PRICE = (
  startPrice: number,
  endPrice: number,
  step: number
) => {
  const arr: MarketOptionType[] = [];

  for (let i = startPrice; i <= endPrice; i += step) {
    if (i >= 10000) {
      arr.push({
        option:
          i % 10000 === 0
            ? `${Math.floor(i / 10000)}억원`
            : `${Math.floor(i / 10000)}억${(i % 10000) / 1000}천만원`,
        value: i + '',
      });
    } else {
      arr.push({ option: `${i / 1000}천만원`, value: i + '' });
    }
  }

  return arr;
};

/**
 *
 * @param startMileage 시작 주행거리
 * @param endMileage 마지막 주행거리
 * @param step 주행거리 간 격차
 * @returns [{ option: `${주행거리}천km || 만km`, value: 숫자 값 }];
 */
const CAR_FILTER_MILEAGE = (
  startMileage: number,
  endMileage: number,
  step: number
) => {
  const arr: MarketOptionType[] = [];

  for (let i = startMileage; i <= endMileage; i += step) {
    if (i >= 10000) {
      arr.push({
        option:
          i % 10000 === 0
            ? `${Math.floor(i / 10000)}만km`
            : `${Math.floor(i / 10000)}만${(i % 10000) / 1000}천km`,
        value: i + '',
      });
      continue;
    }
    if (i >= 1000) {
      arr.push({ option: `${i / 1000}천km`, value: i + '' });
      continue;
    }
    if (i < 1000) {
      arr.push({ option: `${i}km`, value: i + '' });
    }
  }

  return arr;
};

const FIRST_MARKET_FILTER = [
  {
    subject: '연식',
    label: {
      first: {
        name: '최소',
        dataName: 'minDate',
      },
      second: {
        name: '최대',
        dataName: 'maxDate',
      },
    },
    optionSet: CAR_FILTER_DATE(2023, 2010),
  },
  {
    subject: '가격',
    label: {
      first: {
        name: '최소',
        dataName: 'minPrice',
      },
      second: {
        name: '최대',
        dataName: 'maxPrice',
      },
    },
    optionSet: CAR_FILTER_PRICE(2000, 20000, 2000),
  },
  {
    subject: '주행거리',
    label: {
      first: {
        name: '최소',
        dataName: 'minMileage',
      },
      second: {
        name: '최대',
        dataName: 'maxMileage',
      },
    },
    optionSet: CAR_FILTER_MILEAGE(2000, 30000, 2000),
  },
  {
    subject: '연료',
    label: {
      first: {
        name: '선택',
        dataName: 'fuel',
      },
    },
    optionSet: [
      { option: '디젤', value: 'diesel' },
      { option: '가솔린', value: 'gasoline' },
      { option: '전기', value: 'electric' },
    ],
  },
];

const SECOND_MARKET_FILTER = [
  {
    subject: '사고여부',
    label: {
      first: {
        name: '선택',
        dataName: 'accident',
      },
    },
    optionSet: [
      { option: '유', value: 'true' },
      { option: '무', value: 'false' },
    ],
  },
];

const concatSubject = FIRST_MARKET_FILTER.map(({ subject, label }) => ({
  subject,
  label,
})).concat(
  SECOND_MARKET_FILTER.map(({ subject, label }) => ({ subject, label }))
);

const FILTER_SUBJECT: { [key: string]: string } = {};
concatSubject.forEach(({ subject, label }) => {
  const { first, second } = label;
  FILTER_SUBJECT[first.dataName] = subject;
  if (second) FILTER_SUBJECT[second.dataName] = subject;
});

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

/**
 * @param start 시작 개수
 * @param end 마지막 개수
 * @returns [{ option: `${개수}개씩 || 만km`, value: 개수 }];
 */
const HOW_MANY_RESULT = (start: number, end: number) => {
  const options: MarketOptionType[] = [];

  for (let i = start; i <= end; i += 10) {
    options.push({ option: `${i}개씩`, value: `viewSize ${i}` });
  }

  return options;
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

export {
  CAR_FILTER_DATE,
  CAR_FILTER_MILEAGE,
  CAR_FILTER_PRICE,
  CATEGORY,
  CATEGORY_VALUES,
  FILTER_SUBJECT,
  FIRST_MARKET_FILTER,
  FUEL_KIND,
  HOW_MANY_RESULT,
  MARKET_LIST_TABLE_HEAD,
  ORDER_OPTIONSET,
  SECOND_MARKET_FILTER,
};
