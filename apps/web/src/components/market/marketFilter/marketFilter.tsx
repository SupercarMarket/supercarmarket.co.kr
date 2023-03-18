import {
  applyMediaQuery,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import MarketSelect from 'components/market/marketSelect';
import { FIRST_MARKET_FILTER, SECOND_MARKET_FILTER } from 'constants/market';
import theme from 'constants/theme';
import { useRouter } from 'next/router';
import * as React from 'react';
import { css } from 'styled-components';
import { convertQuery, makeFilterLabel } from 'utils/market/marketFilter';

import Close from '../../../assets/svg/close.svg';
import Refresh from '../../../assets/svg/refresh.svg';
import * as Styled from './marketFilter.styled';

const MarketFilter = () => {
  const { push, query, asPath } = useRouter();

  const convertedQuery = React.useMemo(
    () => convertQuery(query, asPath),
    [query, asPath]
  );

  const removeFilter = (key: string) => {
    const pattern = new RegExp(key);
    const queries = Object.entries(query as { [key: string]: string });
    const filtered = queries.filter(([key]) => !key.match(pattern));
    const url = filtered.map(([key, value]) => `${key}=${value}`).join('&');

    push(`/market?${url}`, undefined, { scroll: false });
  };

  const resetfilter = () => {
    push(`/market?category=${query.category}`, undefined, {
      scroll: false,
    });
  };

  return (
    <Container>
      <Styled.MarketFilterArea>
        <Wrapper
          css={css`
            display: flex;
            gap: 24px;
            ${applyMediaQuery('mobile')} {
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
          `}
        >
          {FIRST_MARKET_FILTER.map(([options1, options2], idx) => (
            <Wrapper.Item
              key={idx}
              css={css`
                width: 270px;
                display: flex;
                flex-direction: column;
                gap: 5px;
                ${applyMediaQuery('mobile')} {
                  width: 311px;
                }
              `}
            >
              <Typography>{options1.label}</Typography>
              <MarketSelect options1={options1} options2={options2} />
            </Wrapper.Item>
          ))}
        </Wrapper>
        <Wrapper
          css={css`
            display: flex;
            gap: 24px;
            ${applyMediaQuery('mobile')} {
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
          `}
        >
          {SECOND_MARKET_FILTER.map(([options1, options2], idx) => (
            <Wrapper.Item
              key={idx}
              css={css`
                width: 270px;
                display: flex;
                flex-direction: column;
                gap: 5px;
                ${applyMediaQuery('mobile')} {
                  width: 311px;
                }
              `}
            >
              <Typography>{options1.label}</Typography>
              <MarketSelect options1={options1} options2={options2} />
            </Wrapper.Item>
          ))}
        </Wrapper>
      </Styled.MarketFilterArea>
      <Styled.FilterListArea>
        <Styled.MarketFilterList>
          {convertedQuery.map(([key, [val1, val2]], idx) => {
            const [k, value1, value2] = makeFilterLabel(key, val1, val2);
            return (
              <Styled.MarketFilterItem
                key={idx}
                onClick={() => removeFilter(key)}
              >
                <Typography fontSize="body-16" lineHeight="150%">
                  {value2 ? `${k} ${value1}~${value2}` : `${k} ${value1}`}
                </Typography>
                <Close
                  width="16px"
                  height="16px"
                  fill={theme.color['greyScale-5']}
                />
              </Styled.MarketFilterItem>
            );
          })}
        </Styled.MarketFilterList>
        <Styled.ResetButton onClick={resetfilter}>
          <Refresh
            width="16px"
            height="16px"
            fill={theme.color['greyScale-5']}
          />
          <Typography fontSize="body-16">초기화</Typography>
        </Styled.ResetButton>
      </Styled.FilterListArea>
    </Container>
  );
};

export default MarketFilter;
