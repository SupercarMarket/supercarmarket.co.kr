import type { NextApiHandler } from 'next';
import type { Params } from 'types/base';
import { ErrorCode } from 'utils/error';
import { catchNoExist } from 'utils/misc';

import { getSession } from './auth/user';
import fetcher from './fetcher';

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

export { accountApi, accountUpdateApi, accountUpdateInfoApi };
