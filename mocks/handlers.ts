import { rest } from 'msw';
import { ServerResponse } from 'types/base';
import { CommentResponse } from 'types/comment';
import { MagazineDto, MagazinePostDto, MagazineResponse } from 'types/magazine';
import { MarketDto, MarketResponse } from 'types/market';

/**
 * API Constants
 * API에 자주 사용되는 상수
 */
const admin = {
  id: randomId(),
  email: 'abc123@naver.com',
  nickName: '금기사 금종선',
  address: '서울특별시 청와대',
  call: '01012341234',
  description: '금기사 금종선입니다!',
};

const user = {
  id: randomId(),
  nickName: 'blan19',
  email: 'blanzzxz@naver.com',
  address: '서울특별시 청와대',
  call: '01012341234',
};

const marketImages = [
  'https://user-images.githubusercontent.com/66871265/199014391-0b9507b4-e320-4026-83d9-6d021ea490c2.png',
  'https://user-images.githubusercontent.com/66871265/199170644-a4b7114f-4d2d-4a74-85e3-74c5e28c8e22.png',
  'https://user-images.githubusercontent.com/66871265/199170649-90b82214-906d-4321-a559-3bc22528d597.png',
];

const marketList = Array.from(Array(1024)).map(() => ({
  id: randomId(),
  imgSrc: marketImages[randomIndex(2)],
  carName: '람보르기니 우라칸 스파이더 LP640-4',
  description: '무사고 | 짧은 주행',
  year: '20/03',
  fuel: ['gasoline', 'diesel', 'eletric'][randomIndex(2)],
  mileage: [3000, 1000, 6000][randomIndex(2)],
  price: 0,
  dealer: '슈퍼카마켓',
}));

const magazineImages = [
  'https://user-images.githubusercontent.com/66871265/196571825-f136a62d-15f3-4d21-a709-8ea0fd77f98a.png',
  'https://user-images.githubusercontent.com/66871265/197127101-72a805b7-c9f1-4e1c-b464-73a01ca4f033.png',
];

const magazineList = Array.from(Array(1024)).map(() => ({
  id: randomId(),
  title: '람보르기니 우루스 퍼포만테 더 슈퍼 SUV하다.',
  contents:
    '오늘 소개해드릴 차량은 첫 등장부터 모두의 관심을 받았고, 지금도 관심을 받고 있는 슈퍼 SUV입니다. 그것도 엄청난 단어를 붙여 등장합니다. 바로 람보르기니 우루스 퍼포만테 차량...',
  imgSrc: magazineImages[randomIndex(1)],
}));

const magazinePost = {
  id: randomId(),
  admin,
  title:
    '제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄',
  view: 999,
  contentHtml: '<h1>안녕하세요..!</h1><p>본문 내용 무</p>',
  isScraped: false,
  createAt: new Date(),
};

const communityImages = [
  'https://user-images.githubusercontent.com/66871265/199372921-d7f5fb08-3950-4d36-b154-4c13de3ccc1e.png',
];

const communityList = Array.from(Array(1024)).map(() => ({
  id: randomId(),
  nickName: [
    'blan19',
    'minssu86',
    'epikoding',
    'eank0108',
    'biolkj28',
    'doyupK',
    'jigomgom',
    'sunysty',
  ][randomIndex(7)],
  title:
    '혹시 브레이크 오일 안갈면 어찌 되나요?혹시 브레이크 오일 안갈면 어찌 되나요?...',
  date: new Date(),
  view: 999,
  like: 999,
  profileImgSrc: '',
  thumbnailImgSrc: communityImages[randomIndex(0)],
}));

const comment = Array.from(Array(1)).map(() => ({
  id: randomId(),
  user,
  content:
    '댓글 내용 띄어쓰기 포함 총 2000자 댓글 내용 띄어쓰기 포함 총 2000자',
  like: 13,
  isLiked: false,
  isRemoved: false,
  createAt: new Date(),
  children: [
    {
      id: randomId(),
      user,
      content:
        '댓글 내용 띄어쓰기 포함 총 2000자 댓글 내용 띄어쓰기 포함 총 2000자',
      like: 13,
      isLiked: false,
      isRemoved: false,
      createAt: new Date(),
    },
    {
      id: randomId(),
      user,
      content:
        '댓글 내용 띄어쓰기 포함 총 2000자 댓글 내용 띄어쓰기 포함 총 2000자',
      like: 13,
      isLiked: false,
      isRemoved: false,
      createAt: new Date(),
    },
    {
      id: randomId(),
      user,
      content:
        '댓글 내용 띄어쓰기 포함 총 2000자 댓글 내용 띄어쓰기 포함 총 2000자',
      like: 13,
      isLiked: false,
      isRemoved: false,
      createAt: new Date(),
    },
  ],
}));

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
    rest.get('https://server/api/v1/hello', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json('hello world'));
    }),
    /**
     * 마켓
     */
    rest.get('https://server/api/v1/market', getMarketList),
    /**
     * 매거진 리스트를 불러옵니다.
     */
    rest.get('https://server/api/v1/magazine', getMagazineList),
    /**
     * 매거진 포스트 조회
     */
    rest.get('https://server/api/v1/magazine/:postId', getMagazinePost),
    /**
     * 커뮤니티 인기글.
     */
    rest.get('https://server/api/v1/community-best', getCommunityBestList),
    /**
     * 댓글 조회.
     */
    rest.get('https://server/api/v1/comment/:postId', getComment),
    /**
     * 댓글 등록.
     */
    rest.post('https://server/api/v1/comment/:postId', createComment),
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
      data: magazineList.slice(page * size, page * size + size),
      page,
      pageSize: size,
      totalCount,
      totalPages,
      isLastPage: totalPages <= page,
      isFirstPage: page === 0,
    })
  );
};

const getMagazinePost: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json<ServerResponse<MagazinePostDto>>({
      data: magazinePost,
    })
  );
};

const getMarketList: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const { searchParams } = req.url;
  const size = Number(searchParams.get('viewSize')) || 20;
  const page = Number(searchParams.get('page')) || 1;
  const totalCount = marketList.length;
  const totalPages = Math.round(totalCount / size);
  return res(
    ctx.status(200),
    ctx.json<MarketResponse<MarketDto>>({
      data: marketList.slice(page * size, page * size + size),
      page,
      pageSize: size,
      totalCount,
      totalPages,
      isLastPage: totalPages <= page,
      isFirstPage: page === 0,
    })
  );
};

const getCommunityBestList: Parameters<typeof rest.get>[1] = (
  req,
  res,
  ctx
) => {
  const { searchParams } = req.url;
  const size = Number(searchParams.get('pageSize')) || 4;
  const page = Number(searchParams.get('page')) || 1;
  return res(
    ctx.status(200),
    ctx.json({
      data: communityList.slice(page * size, page * size + size),
      page,
    })
  );
};

const getComment: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const { searchParams } = req.url;
  const size = Number(searchParams.get('pageSize')) || 20;
  const page = Number(searchParams.get('page')) || 0;
  const totalCount = comment.length;
  const totalPages = Math.round(totalCount / size);
  const isLastPage = false;
  return res(
    ctx.status(200),
    ctx.json<CommentResponse>({
      data: comment.slice(page * size, page * size + size),
      page,
      totalCount,
      totalPages,
      isLastPage,
    })
  );
};

const createComment: Parameters<typeof rest.post>[1] = async (
  req,
  res,
  ctx
) => {
  const { contents } = await req.json();
  comment.push({
    id: randomId(),
    user,
    like: 0,
    isLiked: false,
    isRemoved: false,
    content: contents,
    createAt: new Date(),
    children: [],
  });
  return res(
    ctx.status(200),
    ctx.json({ message: '댓글 등록에 성공했습니다.' })
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

function randomIndex(length: number) {
  return Math.round(Math.random() * length);
}

// function seconds(s: number) {
//   return s * 1000;
// }
// function minutes(m: number) {
//   return m * seconds(60);
// }

// function timeout(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
// function timeoutError(ms: number) {
//   return new Promise((_, reject) => setTimeout(reject, ms));
// }
