import Typography from 'components/common/typography';
import MarketSelect from 'components/market/marketSelect';
import { FIRST_MARKET_FILTER, SECOND_MARKET_FILTER } from 'constants/market';
import theme from 'constants/theme';
import React from 'react';
import { FilterType, MarketFormTarget, MarketLabelType } from 'types/market';

import Close from '../../../assets/svg/close.svg';
import Refresh from '../../../assets/svg/refresh.svg';
import * as Styled from './marketFilter.styled';

interface MarketFilterProps {
  filterList: FilterType[];
  changeFilters: (f: FilterType[]) => void;
}

const MarketFilter = ({ filterList, changeFilters }: MarketFilterProps) => {
  const submitHander = (
    e: MarketFormTarget,
    { subject, dataName }: MarketLabelType
  ) => {
    e.preventDefault();
    const filters = [...filterList.filter((f) => f.subject !== subject)];
    const form = e.target[dataName];

    if (form.value) {
      const { value, ariaLabel: option } = form;
      filters.push({ subject, value, option, dataName });
    }

    if (!form.value) {
      const [
        { ariaLabel: firstLabel, value: firstValue },
        { ariaLabel: secondLabel, value: secondValue },
      ] = form;

      if (firstValue && secondValue)
        filters.push({
          subject,
          dataName,
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
    changeFilters(filters);
  };

  const removeFilter = (idx: number) => {
    changeFilters(filterList.filter((_, index) => index !== idx));
  };

  const resetfilter = () => {
    changeFilters([]);
  };

  return (
    <Styled.MarketFilterContainer>
      <Styled.MarketFilterArea>
        <Styled.MarketFilterBox>
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
        </Styled.MarketFilterBox>
        <Styled.MarketFilterBox>
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
        </Styled.MarketFilterBox>
      </Styled.MarketFilterArea>
      <Styled.FilterListArea>
        <Styled.MarketFilterList>
          {filterList.map(({ subject, option }, idx) => (
            <Styled.MarketFilterItem key={subject} onClick={() => removeFilter(idx)}>
              <Typography
                fontSize="body-16"
                lineHeight="150%"
              >{`${subject} ${option}`}</Typography>
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
