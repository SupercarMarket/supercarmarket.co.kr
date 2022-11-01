import Typography from 'components/common/typography';
import MarketSelect from 'components/market/market-select';
import { FIRST_MARKET_FILTER, SECOND_MARKET_FILTER } from 'constants/market';
import theme from 'constants/theme';
import React, { useState } from 'react';
import { MarketFormTarget, MarketLabelType } from 'types/market';

import Close from '../../../assets/svg/close.svg';
import Refresh from '../../../assets/svg/refresh.svg';
import * as S from './market-filter.styled';

interface FilterType {
  subject: string;
  option: string;
  value: string;
}

const MarketFilter = () => {
  const [filterList, setFilterList] = useState<FilterType[]>([]);

  const submitHander = (
    e: MarketFormTarget,
    { subject, dataName }: MarketLabelType
  ) => {
    e.preventDefault();
    const filters = [...filterList.filter((f) => f.subject !== subject)];
    const form = e.target[dataName];

    if (form.value) {
      const { value, ariaLabel: option } = form;
      filters.push({ subject, value, option });
    }

    if (!form.value) {
      const [
        { ariaLabel: firstLabel, value: firstValue },
        { ariaLabel: secondLabel, value: secondValue },
      ] = form;

      if (firstValue && secondValue)
        filters.push({
          subject,
          option:
            +firstValue > +secondValue
              ? `${secondLabel}~${secondLabel}`
              : `${firstLabel}~${secondLabel}`,
          value:
            +firstValue > +secondValue
              ? `${secondValue} ${secondValue}`
              : `${firstValue} ${secondValue}`,
        });
    }
    setFilterList(filters);
  };

  const removeFilter = (idx: number) => {
    setFilterList((prev) => prev.filter((_, index) => index !== idx));
  };

  const resetfilter = () => {
    setFilterList([]);
  };

  return (
    <S.MarketFilterContainer>
      <S.MarketFilterArea>
        <S.MarketFilterBox>
          {FIRST_MARKET_FILTER.map(
            ({ label, optionSet, firstLabel, secondLabel }) => (
              <MarketSelect
                key={label.subject}
                label={label}
                firstLabel={firstLabel}
                secondLabel={secondLabel}
                optionSet={optionSet}
                formHandler={submitHander}
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
                formHandler={submitHander}
              />
            )
          )}
        </S.MarketFilterBox>
      </S.MarketFilterArea>
      <S.FilterListArea>
        <S.MarketFilterList>
          {filterList.map(({ subject, option }, idx) => (
            <S.MarketFilterItem key={subject} onClick={() => removeFilter(idx)}>
              <Typography
                fontSize="body-16"
                lineHeight="150%"
              >{`${subject} ${option}`}</Typography>
              <Close
                width="16px"
                height="16px"
                fill={theme.color['greyScale-5']}
              />
            </S.MarketFilterItem>
          ))}
        </S.MarketFilterList>
        <S.ResetButton onClick={resetfilter}>
          <Refresh
            width="16px"
            height="16px"
            fill={theme.color['greyScale-5']}
          />
          <Typography fontSize="body-16">초기화</Typography>
        </S.ResetButton>
      </S.FilterListArea>
    </S.MarketFilterContainer>
  );
};

export default MarketFilter;
