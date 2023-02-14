import { Typography } from '@supercarmarket/ui';
import MarketSelect from 'components/market/marketSelect';
import { FIRST_MARKET_FILTER, SECOND_MARKET_FILTER } from 'constants/market';
import theme from 'constants/theme';
import { useRouter } from 'next/router';
import * as React from 'react';
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

    push(`/market/${query.category}?${url}`, undefined, { scroll: false });
  };

  const resetfilter = () => {
    push(`/market/${query.category}?category=${query.category}`, undefined, {
      scroll: false,
    });
  };

  return (
    <Styled.MarketFilterContainer>
      <Styled.MarketFilterArea>
        <Styled.MarketFilterBox>
          {FIRST_MARKET_FILTER.map(([options1, options2], idx) => (
            <Styled.MarketFilterWrapper key={idx}>
              <Typography>{options1.label}</Typography>
              <MarketSelect options1={options1} options2={options2} />
            </Styled.MarketFilterWrapper>
          ))}
        </Styled.MarketFilterBox>
        <Styled.MarketFilterBox>
          {SECOND_MARKET_FILTER.map(([options1, options2], idx) => (
            <Styled.MarketFilterWrapper key={idx}>
              <Typography>{options1.label}</Typography>
              <MarketSelect options1={options1} options2={options2} />
            </Styled.MarketFilterWrapper>
          ))}
        </Styled.MarketFilterBox>
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
    </Styled.MarketFilterContainer>
  );
};

export default MarketFilter;
