import {
  FILTER_OPTION_DATANAMES,
  FIRST_MARKET_FILTER,
  FUEL_KIND,
  SECOND_MARKET_FILTER,
  TRANSMISSION_KIND,
} from 'constants/market';
import { MarketOptionType, SelectType } from 'types/market';

const formatter = Intl.NumberFormat('ko-KR', {
  notation: 'compact',
}).format;

/**
 *
 * @param startYear 연식 시작할 년도
 * @param endYear 연식 마지막 년도
 * @returns [{ option: '년도', value: 숫자 값 }];
 */
const makeFilterDate = (
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
const makeFilterPrice = (
  startPrice: number,
  endPrice: number,
  step: number
) => {
  const arr: MarketOptionType[] = [];

  for (let i = startPrice; i <= endPrice; i += step) {
    arr.push({ option: `${formatter(i * 10000)}원`, value: i + '' });
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
const makeFilterMileage = (
  startMileage: number,
  endMileage: number,
  step: number
) => {
  const arr: MarketOptionType[] = [];

  for (let i = startMileage; i <= endMileage; i += step) {
    arr.push({ option: `${formatter(i)}km`, value: i + '' });
  }

  return arr;
};

const makeQuery = (obj: { [key: string]: string }) =>
  Object.entries(obj)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

const makeSelectQuery = (query: object, key: string, value: string) => {
  const queryCopy: { [key: string]: string } = { ...query };
  queryCopy[key] = value;
  const converted = makeQuery(queryCopy);
  return converted;
};

const LABEL_OBJECT: { [key: string]: (s: string) => string } = {
  category: (s: string) => s,
  Date: (s: string) => `${s}년`,
  fuel: (s: string) => FUEL_KIND[s],
  Mileage: (s: string) => `${formatter(+s)}km`,
  Price: (s: string) => `${formatter(+s * 10000)}원`,
  accident: (s: string) => (s ? '유' : '무'),
  transmission: (s: string) => TRANSMISSION_KIND[s],
};

const makeFilterLabel = (
  key: string,
  val1: string,
  val2?: string
): [string, string, string | undefined] => {
  const labelObject: { [key: string]: string } = {};

  const makeLabel = (arr: SelectType[][]) => {
    const extractKey = (s: string) => s.replace(/min|max/, '');

    arr.forEach(([options1, options2]) => {
      const o1Key = extractKey(options1.dataName);
      labelObject[o1Key] = options1.label;

      if (options2) {
        const o2Key = extractKey(options2.dataName);
        labelObject[o2Key] = options2.label;
      }
    });
  };

  makeLabel(FIRST_MARKET_FILTER);
  makeLabel(SECOND_MARKET_FILTER);

  const labelKey = labelObject[key];
  const notation = LABEL_OBJECT[key];

  return [labelKey, notation(val1), (val2 && notation(val2)) || ''];
};

const convertQuery = (query: object, asPath: string) => {
  const objectQuery = { ...query } as { [key: string]: string };
  const converted: string[][] = Object.entries(objectQuery);

  const path = asPath.split('?')[1]?.replaceAll(/min|max/g, '');
  const con: { [key: string]: string[] } = {};

  converted.forEach(([key, val]) => {
    console.log('key', key, FILTER_OPTION_DATANAMES.includes(key));
    if (!FILTER_OPTION_DATANAMES.includes(key)) return;

    const pattern = /min|max/;
    const test = pattern.test(key);
    const extractedKey = key.replace(pattern, '');
    const existed = con[extractedKey] || '';

    console.log('test', test);

    if (test) {
      const length = path.match(new RegExp(extractedKey, 'g'))?.length;
      if (length === 2) {
        con[extractedKey] = [...existed, val].sort((a, b) => +a - +b);
      }
      return;
    }

    con[extractedKey] = [val];
  });

  console.log(con);

  return Object.entries(con);
};

/**
 * @param start 시작 개수
 * @param end 마지막 개수
 * @returns [{ option: `${개수}개씩 || 만km`, value: 개수 }];
 */
const makeHowManyResult = (start: number, end: number) => {
  const options: MarketOptionType[] = [];

  for (let i = start; i <= end; i += 10) {
    options.push({ option: `${i}개씩`, value: `viewSize ${i}` });
  }

  return options;
};

export {
  convertQuery,
  makeFilterDate,
  makeFilterLabel,
  makeFilterMileage,
  makeFilterPrice,
  makeHowManyResult,
  makeQuery,
  makeSelectQuery,
};
