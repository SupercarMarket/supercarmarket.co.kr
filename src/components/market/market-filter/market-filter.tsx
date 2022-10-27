import Typography from 'components/common/typography';
import MarketSelect from 'components/market/market-select';
import {
  FIRST_MARKET_FILTER,
  SECOND_MARKET_FILTER,
} from 'constants/market';
import theme from 'constants/theme';
import React, { FormEvent, useState } from 'react';
import { makeFilter } from 'utils/market/filter';

import Close from '../../../assets/svg/close.svg';
import * as S from './market-filter.styled';

interface FilterType {
  subject: string;
  option: string;
  value: string;
}

const MarketFilter = () => {
  const [filterList, setFilterList] = useState<FilterType[]>([]);
  
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const filters = makeFilter();
    setFilterList(filters);
  };

  const removeFilter = (idx: number) => {
    setFilterList((prev) => prev.filter((_, index) => index !== idx));
  };

  return (
    <S.MarketFilterContainer>
      <S.MarketFilterForm id="market-filter" onSubmit={submitHandler}>
        <S.MarketFilterBox>
          {FIRST_MARKET_FILTER.map(
            ({ label, optionSet, firstLabel, secondLabel }) => (
              <MarketSelect
                key={label.subject}
                label={label}
                firstLabel={firstLabel}
                secondLabel={secondLabel}
                optionSet={optionSet}
              />
            )
          )}
        </S.MarketFilterBox>
        <S.MarketFilterBox>
          {SECOND_MARKET_FILTER.map(
            ({ label, optionSet, firstLabel, secondLabel }) => (
              <MarketSelect
                key={label.subject}
                label={label}
                firstLabel={firstLabel}
                secondLabel={secondLabel}
                optionSet={optionSet}
              />
            )
          )}
        </S.MarketFilterBox>
      </S.MarketFilterForm>
      <S.MarketFilterList>
        {filterList.map(({ subject, option }, idx) => (
          <S.MArketFilterItem key={subject} onClick={() => removeFilter(idx)}>
            <Typography
              fontSize="body-16"
              lineHeight="150%"
            >{`${subject} ${option}`}</Typography>
            <Close
              width="16px"
              height="16px"
              fill={theme.color['greyScale-5']}
            />
          </S.MArketFilterItem>
        ))}
      </S.MarketFilterList>
    </S.MarketFilterContainer>
  );
};

export default MarketFilter;
