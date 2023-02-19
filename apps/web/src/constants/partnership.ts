const PARTNERSHIP_CATEGORY = [
  {
    option: '전체',
    value: 'all',
  },
  {
    option: '자동차매장',
    value: 'automobile-store',
  },
  {
    option: '공업사',
    value: 'industries',
  },
  {
    option: '디테일링',
    value: 'detail-ring',
  },
  {
    option: '도색',
    value: 'painting',
  },
  {
    option: '기타',
    value: 'misc',
  },
];

const PARTNERSHIP_TABLE_HEAD = [
  {
    title: '사진',
    width: '196',
  },
  {
    title: '업체명',
    width: '404',
  },
  {
    title: '업종',
    width: '120',
  },
  {
    title: '영업시간',
    width: undefined,
  },
  {
    title: '전화',
    width: undefined,
  },
  {
    title: '지역',
    width: undefined,
  },
  {
    title: '사이트',
    width: undefined,
  },
];

const PARTNERSHIP_FILTER_OPTIONS = {
  label: '지역',
  defaultLabel: '전국',
  optionSet: [
    { option: '전국', dataName: 'region', value: '전국' },
    { option: '서울', dataName: 'region', value: '서울' },
    { option: '경기', dataName: 'region', value: '경기' },
    { option: '인천', dataName: 'region', value: '인천' },
    { option: '부산', dataName: 'region', value: '부산' },
    { option: '대구', dataName: 'region', value: '대구' },
    { option: '광주', dataName: 'region', value: '광주' },
    { option: '대전', dataName: 'region', value: '대전' },
    { option: '울산', dataName: 'region', value: '울산' },
    { option: '경남', dataName: 'region', value: '경남' },
    { option: '경북', dataName: 'region', value: '경북' },
    { option: '충남', dataName: 'region', value: '충남' },
    { option: '충북', dataName: 'region', value: '충북' },
    { option: '전남', dataName: 'region', value: '전남' },
    { option: '전북', dataName: 'region', value: '전북' },
    { option: '강원', dataName: 'region', value: '강원' },
    { option: '제주', dataName: 'region', value: '제주' },
    { option: '세종', dataName: 'region', value: '세종' },
  ],
};

export {
  PARTNERSHIP_CATEGORY,
  PARTNERSHIP_FILTER_OPTIONS,
  PARTNERSHIP_TABLE_HEAD,
};
