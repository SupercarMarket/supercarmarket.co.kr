import {
  applyMediaQuery,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import theme from 'constants/theme';
import Link from 'next/link';
import { css } from 'styled-components';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { convertQuery, makeFilterLabel } from 'utils/market/marketQuery';
import MarketFilterArea from './marketFilterArea';
import { useNextQuery } from 'hooks/useNextQuery';

import Close from '../../../assets/svg/close.svg';
import Refresh from '../../../assets/svg/refresh.svg';

const MarketFilter = () => {
  const searchParams = useSearchParams();
  const { query } = useNextQuery(searchParams);

  const removeFilter = (key: string) => {
    const pattern = new RegExp(key);
    const queries = Object.entries(query);
    const filtered = queries.filter(([key]) => !key.match(pattern));
    const url = filtered.map(([key, value]) => `${key}=${value}`).join('&');

    return `/market?${url}`;
  };

  const convertedQuery = React.useMemo(
    () => convertQuery(query, searchParams.toString()),
    [query, searchParams]
  );

  return (
    <Container>
      <MarketFilterArea />
      <Wrapper.Bottom
        css={css`
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 80px;
          ${applyMediaQuery('mobile')} {
            flex-direction: column;
            gap: 8px;
            margin-bottom: 32px;
          }
        `}
      >
        <Wrapper
          css={css`
            display: flex;
            flex-wrap: wrap;
            gap: 9px;
          `}
        >
          {convertedQuery.map(([key, [val1, val2]], idx) => {
            const [k, value1, value2] = makeFilterLabel(key, val1, val2);
            return (
              <Link key={idx} href={removeFilter(key)} scroll={false}>
                <Wrapper.Item
                  css={css`
                    ${({ theme }) => css`
                      box-sizing: border-box;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 7px;
                      height: 44px;
                      padding: 10px 22px;
                      background: ${theme.color.white};
                      border: 1px solid ${theme.color['greyScale-4']};
                      border-radius: 20px;
                      cursor: pointer;
                    `}
                  `}
                >
                  <Typography fontSize="body-16" lineHeight="150%">
                    {value2 ? `${k} ${value1}~${value2}` : `${k} ${value1}`}
                  </Typography>
                  <Close
                    width="16px"
                    height="16px"
                    fill={theme.color['greyScale-5']}
                  />
                </Wrapper.Item>
              </Link>
            );
          })}
        </Wrapper>
        <Wrapper.Item
          css={css`
            width: 100px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            background: none;
            border: none;
            color: ${({ theme }) => theme.color['greyScale-5']};
            cursor: pointer;

            ${applyMediaQuery('mobile')} {
              width: 100%;
            }
          `}
        >
          <Link href={`/market?category=${query.category}`} scroll={false}>
            <Refresh
              width="16px"
              height="16px"
              fill={theme.color['greyScale-5']}
            />
            <Typography fontSize="body-16">초기화</Typography>
          </Link>
        </Wrapper.Item>
      </Wrapper.Bottom>
    </Container>
  );
};

export default MarketFilter;
