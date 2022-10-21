import { rest } from 'msw';
import { MagazineDto, MagazineResponse } from 'types/magazine';

/**
 * API Constants
 * API에 자주 사용되는 상수
 */
const magazineList = Array.from(Array(1024)).map(() => ({
  id: randomId(),
  title: '람보르기니 우루스 퍼포만테 더 슈퍼 SUV하다.',
  contents:
    '오늘 소개해드릴 차량은 첫 등장부터 모두의 관심을 받았고, 지금도 관심을 받고 있는 슈퍼 SUV입니다. 그것도 엄청난 단어를 붙여 등장합니다. 바로 람보르기니 우루스 퍼포만테 차량...',
}));

const magazineImages = [
  'https://user-images.githubusercontent.com/66871265/196571825-f136a62d-15f3-4d21-a709-8ea0fd77f98a.png',
];

/**
 * API Endpoint
 * 각 API 모킹은 Notion API 스펙에 맞춰 만들어주세요.
 * 아래 handlers와 관련 주석 참고
 */
export function handlers() {
  return [
    /**
     * 모킹 테스트
     */
    rest.get('/api/v1/hello', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json('hello world'));
    }),
    /**
     * 매거진 리스트를 불러옵니다.
     */
    rest.get('/api/v1/magazine', getMagazineList),
  ];
}

const getMagazineList: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const { searchParams } = req.url;
  const size = Number(searchParams.get('pageSize')) || 12;
  const page = Number(searchParams.get('page')) || 1;
  const totalCount = magazineList.length;
  const totalPages = Math.round(totalCount / size);
  return res(
    ctx.status(200),
    ctx.json<MagazineResponse<MagazineDto>>({
      data: magazineList.slice(page * size, (page + 1) * size),
      page,
      pageSize: size,
      totalCount,
      totalPages,
      isLastPage: totalPages <= page,
      isFirstPage: page === 0,
    })
  );
};

/**
 * API Helper
 * 각 API 로직에 도움을 주는 헬퍼 함수들
 */

function randomId() {
  return (
    Math.random().toString(36).substring(2, 12) +
    Math.random().toString(36).substring(2, 12)
  );
}

function seconds(s: number) {
  return s * 1000;
}
function minutes(m: number) {
  return m * seconds(60);
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function timeoutError(ms: number) {
  return new Promise((_, reject) => setTimeout(reject, ms));
}
