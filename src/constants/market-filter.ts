export type DefaultSelectOptionType = {
  option: string;
  value: string;
};

/**
 *
 * @param startYear 연식 시작할 년도
 * @param endYear 연식 마지막 년도
 * @returns [{option: '년도', value: 숫자 값 }];
 */
export const CAR_FILTER_DATE = (
  startYear: number,
  endYear: number
): DefaultSelectOptionType[] => {
  const arr: DefaultSelectOptionType[] = [];

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
 * @returns [{ type: 'price', option: '${가격}만원 || 억', value: 숫자 값 }];
 */
export const CAR_FILTER_PRICE = (
  startPrice: number,
  endPrice: number,
  step: number
) => {
  const arr: DefaultSelectOptionType[] = [];

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
 * @returns [{ type: 'mileage', option: `${주행거리}천km || 만km`, value: 숫자 값 }];
 */
export const CAR_FILTER_MILEAGE = (
  startMileage: number,
  endMileage: number,
  step: number
) => {
  const arr: DefaultSelectOptionType[] = [];

  for (let i = startMileage; i <= endMileage; i += step) {
    if (i >= 10000) {
      arr.push({
        option:
          i % 10000 === 0
            ? `${Math.floor(i / 10000)}만km`
            : `${Math.floor(i / 10000)}만${(i % 10000) / 1000}천km`,
        value: i + '',
      });
    } else if (i >= 1000) {
      arr.push({ option: `${i / 1000}천km`, value: i + '' });
    } else {
      arr.push({ option: `${i}km`, value: i + '' });
    }
  }

  return arr;
};

export const FIRST_MARKET_FILTER = [
  {
    subject: '연식',
    dataName: 'year',
    firstLabel: '최소',
    secondLabel: '최대',
    dataSet: CAR_FILTER_DATE(2023, 2010),
  },
  {
    subject: '가격',
    dataName: 'price',
    firstLabel: '최소',
    secondLabel: '최대',
    dataSet: CAR_FILTER_PRICE(2000, 20000, 2000),
  },
  {
    subject: '주행거리',
    dataName: 'mileage',
    firstLabel: '최소',
    secondLabel: '최대',
    dataSet: CAR_FILTER_MILEAGE(2000, 10000, 2000),
  },
  {
    subject: '연료',
    dataName: 'fuel',
    firstLabel: '선택',
    secondLabel: undefined,
    dataSet: [
      { option: '경유', value: 'diesel' },
      { option: '가솔린', value: 'gasoline' },
    ],
  },
];

export const SECOND_MARKET_FILTER = [
  {
    subject: '색상',
    dataName: 'color',
    firstLabel: '선택',
    secondLabel: undefined,
    dataSet: [
      { option: '빨간색', value: 'red' },
      { option: '파란색', value: 'blue' },
    ],
  },
  {
    subject: '사고여부',
    dataName: 'accident',
    firstLabel: '최소',
    secondLabel: undefined,
    dataSet: [
      { option: '유', value: 'true' },
      { option: '무', value: 'false' },
    ],
  },
];

export const FILTER_DATANAMES = FIRST_MARKET_FILTER.map(
  ({ dataName }) => dataName
).concat(SECOND_MARKET_FILTER.map(({ dataName }) => dataName));
