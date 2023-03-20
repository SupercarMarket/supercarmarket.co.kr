import { SelectType } from '@supercarmarket/types/market';
import {
  FILTER_OPTION_DATANAMES,
  FIRST_MARKET_FILTER,
  SECOND_MARKET_FILTER,
} from 'constants/market';

const formatter = Intl.NumberFormat('ko-KR', {
  notation: 'compact',
}).format;

const makeQuery = (obj: { [key: string]: string }) => {
  if (obj.id) delete obj.id;

  return Object.entries(obj)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
};

const makeSelectQuery = (query: object, key: string, value: string) => {
  const queryCopy: { [key: string]: string } = { ...query };
  const keys = key.split(' ');
  const values = value.split(' ');

  queryCopy[keys[0]] = values[0];
  if (keys[1] && values[1]) queryCopy[keys[1]] = values[1];

  const converted = makeQuery(queryCopy);
  return converted;
};

const LABEL_OBJECT: { [key: string]: (s: string) => string } = {
  category: (s: string) => s,
  Date: (s: string) => `${s}년`,
  fuel: (s: string) => s,
  Mileage: (s: string) => `${formatter(+s)}km`,
  Price: (s: string) => `${formatter(+s * 10000)}원`,
  accident: (s: string) => (s ? '유' : '무'),
  transmission: (s: string) => s,
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
      const o1Key = extractKey(options1.optionSet[0].dataName);
      labelObject[o1Key] = options1.label;

      if (options2) {
        const o2Key = extractKey(options2.optionSet[0].dataName);
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
    if (!FILTER_OPTION_DATANAMES.includes(key)) return;

    const pattern = /min|max/;
    const test = pattern.test(key);
    const extractedKey = key.replace(pattern, '');
    const existed = con[extractedKey] || '';

    if (test) {
      const length = decodeURI(path).match(
        new RegExp(extractedKey, 'g')
      )?.length;
      if (length === 2) {
        con[extractedKey] = [...existed, val].sort((a, b) => +a - +b);
      }
      return;
    }

    con[extractedKey] = [val];
  });

  return Object.entries(con);
};

export { makeQuery, makeSelectQuery, makeFilterLabel, convertQuery };
