import type { NextApiHandler } from 'next';
import type { Params } from 'types/base';
import { ErrorCode } from 'utils/error';
import { catchNoExist } from 'utils/misc';

import { getSession } from './auth/user';
import fetcher from './fetcher';

const dummyBase = {
  totalCount: 1,
  totalPages: 1,
  isLastPage: true,
};

const DummyProduct = {
  id: 'asdasd',
  carName: '람보르기니 우라칸 스파이더 LP640-4',
  description: 'asdasd',
  year: '2020',
  fuel: '가솔린',
  mileage: 3000,
  price: '상담',
  dealer: '슈퍼카마켓',
  imgSrc:
    'https://user-images.githubusercontent.com/66871265/215006317-537abed9-fc19-4a11-9e56-734a971033b0.png',
};

const DummyMagazine = {
  id: 'asdaslkgmqwkgmqwf123',
  title: '새 차 무사고 기원하며 인증합니다!',
  contents: '무사고 기원',
  imgSrc:
    'https://user-images.githubusercontent.com/66871265/215006317-537abed9-fc19-4a11-9e56-734a971033b0.png',
  comments: 23,
  created: '2023-01-22',
};

const DummyCommunity = {
  id: 'asdasdasdasf',
  title: '새 차 무사고 기원하며 인증합니다!',
  category: '제보',
  imgSrc:
    'https://user-images.githubusercontent.com/66871265/215006317-537abed9-fc19-4a11-9e56-734a971033b0.png',
  popular: true,
  view: 999,
  like: 32,
  nickname: 'blan19',
  profileUrl: null,
  comments: 22,
  created: '2023-01-22',
};

const accountApi: NextApiHandler = async (req, res) => {
  const { id, page, orderby } = req.query as Params;
  const session = await getSession({ req });

  const headers = session
    ? {
        ACCESS_TOKEN: session.accessToken,
      }
    : undefined;

  catchNoExist(id, page, orderby);

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/userpage`,
    {
      headers,
      method: 'GET',
      query: {
        id,
      },
    }
  );

  if (!response.ok)
    return res
      .status(response.status)
      .json({ message: ErrorCode[response.status] });

  const account = await response.json();

  return res.status(200).json(account);
};

const accountCategoryApi: NextApiHandler = async (req, res) => {
  const { page, size, category } = req.query as Params;

  catchNoExist(page, size, category);

  if (category === 'product')
    return res.status(200).json({ ...dummyBase, data: [DummyProduct] });
  else if (category === 'magazine')
    return res.status(200).json({ ...dummyBase, data: [DummyMagazine] });
  else return res.status(200).json({ ...dummyBase, data: [DummyCommunity] });
};

const accountUpdateInfoApi: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  const headers = session
    ? {
        ACCESS_TOKEN: session.accessToken,
      }
    : undefined;

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/user/info`,
    {
      method: 'GET',
      headers,
    }
  );

  console.log(response);

  if (!response.ok)
    return res
      .status(response.status)
      .json({ message: ErrorCode[response.status] });

  const info = await response.json();

  console.log(info);

  return res.status(200).json(info);
};

const accountUpdateApi: NextApiHandler = async (req, res) => {
  const data = req.body;
  const session = await getSession({ req });

  const headers = session
    ? {
        ACCESS_TOKEN: session.accessToken,
      }
    : undefined;

  console.log(data);

  // const response = await fetcher(
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}/supercar/v1/mypage`,
  //   {
  //     headers,
  //     method: 'PATCH',
  //     data,
  //   }
  // );

  // if (!response.ok)
  //   return res
  //     .status(response.status)
  //     .json({ message: ErrorCode[response.status] });

  // const update = await response.json();

  return res.status(200).json({ success: true });
};

export {
  accountApi,
  accountCategoryApi,
  accountUpdateApi,
  accountUpdateInfoApi,
};
