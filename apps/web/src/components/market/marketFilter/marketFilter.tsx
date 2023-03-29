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

import * as Styled from './marketFilter.styled';
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
        <Styled.MarketFilterList>
          {convertedQuery.map(([key, [val1, val2]], idx) => {
            const [k, value1, value2] = makeFilterLabel(key, val1, val2);
            return (
              <Link key={idx} href={removeFilter(key)} scroll={false}>
                <Styled.MarketFilterItem>
                  <Typography fontSize="body-16" lineHeight="150%">
                    {value2 ? `${k} ${value1}~${value2}` : `${k} ${value1}`}
                  </Typography>
                  <Close
                    width="16px"
                    height="16px"
                    fill={theme.color['greyScale-5']}
                  />
                </Styled.MarketFilterItem>
              </Link>
            );
          })}
        </Styled.MarketFilterList>
        <Styled.ResetButton>
          <Link href={`/market?category=${query.category}`} scroll={false}>
            <Refresh
              width="16px"
              height="16px"
              fill={theme.color['greyScale-5']}
            />
            <Typography fontSize="body-16">초기화</Typography>
          </Link>
        </Styled.ResetButton>
      </Wrapper.Bottom>
    </Container>
  );
};

export default MarketFilter;
