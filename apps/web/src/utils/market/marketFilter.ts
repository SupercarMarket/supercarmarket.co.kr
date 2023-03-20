import { MarketOptionType } from '@supercarmarket/types/market';

const formatter = Intl.NumberFormat('ko-KR', {
  notation: 'compact',
}).format;

/**
 *
 * @param startYear 연식 시작할 년도
 * @param endYear 연식 마지막 년도
 * @param dataName 데이터 이름 (쿼리 키 값)
 * @returns [{ option: '년도', value: 숫자 값 }];
 */
const makeFilterDate = (
  startYear: number,
  endYear: number,
  dataName: string
): MarketOptionType[] => {
  const arr: MarketOptionType[] = [];

  for (let i = startYear; i >= endYear; i--) {
    arr.push({ option: `${i}년`, dataName, value: i + '' });
  }

  return arr;
};

/**
 *
 * @param startPrice 시작 가격
 * @param endPrice 끝 가격
 * @param step 가격 간 격차
 * @param dataName 데이터 이름 (쿼리 키 값)
 * @returns [{ option: '${가격}만원 || 억', value: 숫자 값 }];
 */
const makeFilterPrice = (
  startPrice: number,
  endPrice: number,
  step: number,
  dataName: string
) => {
  const arr: MarketOptionType[] = [];

  for (let i = startPrice; i <= endPrice; i += step) {
    arr.push({ option: `${formatter(i * 10000)}원`, dataName, value: i + '' });
  }

  return arr;
};

/**
 *
 * @param startMileage 시작 주행거리
 * @param endMileage 마지막 주행거리
 * @param step 주행거리 간 격차
 * @param dataName 데이터 이름 (쿼리 키 값)
 * @returns [{ option: `${주행거리}천km || 만km`, value: 숫자 값 }];
 */
const makeFilterMileage = (
  startMileage: number,
  endMileage: number,
  step: number,
  dataName: string
) => {
  const arr: MarketOptionType[] = [];

  for (let i = startMileage; i <= endMileage; i += step) {
    arr.push({ option: `${formatter(i)}km`, dataName, value: i + '' });
  }

  return arr;
};

/**
 * @param start 시작 개수
 * @param end 마지막 개수
 * @param dataName 데이터 이름 (쿼리 키 값)
 * @returns [{ option: `${개수}개씩 || 만km`, value: 개수 }];
 */
const makeHowManyResult = (start: number, end: number, dataName: string) => {
  const options: MarketOptionType[] = [];

  for (let i = start; i <= end; i += 10) {
    options.push({ option: `${i}개씩`, dataName, value: `${i}` });
  }

  return options;
};

export {
  makeFilterDate,
  makeFilterMileage,
  makeFilterPrice,
  makeHowManyResult,
};
