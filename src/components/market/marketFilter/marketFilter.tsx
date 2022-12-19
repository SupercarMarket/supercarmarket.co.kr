import Typography from 'components/common/typography';
import MarketSelect from 'components/market/marketSelect';
import {
  FILTER_SUBJECT,
  FIRST_MARKET_FILTER,
  SECOND_MARKET_FILTER,
} from 'constants/market';
import theme from 'constants/theme';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { FilterType, MarketFormTarget, MarketLabelType } from 'types/market';

import Close from '../../../assets/svg/close.svg';
import Refresh from '../../../assets/svg/refresh.svg';
import * as Styled from './marketFilter.styled';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MarketFilterProps {}

const MarketFilter = ({}: MarketFilterProps) => {
  const { push, query } = useRouter();

  const convertedQuery = useMemo(() => {
    return Object.entries(query);
  }, [query]);

  const submitHander = (e: MarketFormTarget) => {
    e.preventDefault();
    console.log(e.target.minDate);
  };

  const removeFilter = (idx: number) => {
    // changeFilters(filterList.filter((_, index) => index !== idx));
  };

  const resetfilter = () => {
    push('/market/all');
  };

  return (
    <Styled.MarketFilterContainer>
      <Styled.MarketFilterArea>
        <Styled.MarketFilterBox>
          {FIRST_MARKET_FILTER.map(({ subject, label, optionSet }, idx) => (
            <MarketSelect
              key={idx}
              subject={subject}
              label={label}
              optionSet={optionSet}
            />
          ))}
        </Styled.MarketFilterBox>
        <Styled.MarketFilterBox>
          {SECOND_MARKET_FILTER.map(({ subject, label, optionSet }, idx) => (
            <MarketSelect
              key={idx}
              subject={subject}
              label={label}
              optionSet={optionSet}
            />
          ))}
        </Styled.MarketFilterBox>
      </Styled.MarketFilterArea>
      <Styled.FilterListArea>
        <Styled.MarketFilterList>
          {convertedQuery.map(([key, value], idx) => (
            <Styled.MarketFilterItem
              key={key}
              onClick={() => removeFilter(idx)}
            >
              <Typography
                fontSize="body-16"
                lineHeight="150%"
              >{`${FILTER_SUBJECT[key]} ${value}`}</Typography>
              <Close
                width="16px"
                height="16px"
                fill={theme.color['greyScale-5']}
              />
            </Styled.MarketFilterItem>
          ))}
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
