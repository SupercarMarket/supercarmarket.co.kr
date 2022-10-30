import Typography from 'components/common/typography';
import React, { useState } from 'react';
import { MarketOptionType } from 'types/market';

import ArrowBottom from '../../../assets/svg/arrow-bottom.svg';
import * as S from './select.styled';

interface SelectProps {
  width?: string;
  defaultLabel: string;
  select: MarketOptionType | null;
  optionSet: MarketOptionType[];
  changeSelect: (o: MarketOptionType) => void;
  overflow?: boolean;
  align?: 'left' | 'center' | 'right';
  label: {
    subject?: string;
    dataName: string;
  };
}

const Select = ({
  width = '127',
  label: { subject, dataName },
  defaultLabel,
  select,
  changeSelect,
  overflow,
  align = 'left',
  optionSet,
}: SelectProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const onToggle = () => setToggle(!toggle);
  const closeToggle = () => setToggle(false);

  const changeCurrent = (option: MarketOptionType) => {
    changeSelect(option);
    closeToggle();
  };

  return (
    <S.SelectContainer width={width}>
      <input
        readOnly
        hidden
        name={dataName}
        value={(select && select.value) || ''}
        aria-label={(select && select.option) || ''}
      />
      <S.Backdrop toggle={toggle} onClick={closeToggle} />
      <S.SelectCurrentButton type="button" onClick={onToggle} align={align}>
        <Typography fontSize="body-16">
          {select !== null ? select.option : defaultLabel}
        </Typography>
        <ArrowBottom width="13px" height="13px" />
      </S.SelectCurrentButton>
      <S.SelectOptionList width={width} toggle={toggle} over={overflow}>
        {optionSet.map((option) => (
          <S.SelectOptionItem
            key={option.option}
            onClick={() => changeCurrent(option)}
          >
            <S.SelectOptionButton align={align}>
              <Typography fontSize="body-16">{option.option}</Typography>
            </S.SelectOptionButton>
          </S.SelectOptionItem>
        ))}
      </S.SelectOptionList>
    </S.SelectContainer>
  );
};

export default Select;
