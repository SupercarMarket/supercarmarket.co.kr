import Typography from 'components/common/typography';
import React, { PropsWithChildren, useState } from 'react';
import { MarketOptionType } from 'types/market';

import ArrowBottom from '../../../assets/svg/arrow-bottom.svg';
import * as S from './select.styled';
interface SelectLabelType {
  name: string;
  dataName: string;
}
interface SelectProps extends PropsWithChildren {
  width?: string;
  label: SelectLabelType;
  select?: string;
  optionSet: MarketOptionType[];
  selectOption: (v: string, o: string, d: string) => void;
  overflow?: boolean;
  align?: 'left' | 'center' | 'right';
}

const Select = ({
  width = '127',
  label: { dataName },
  children,
  optionSet,
  selectOption,
  overflow,
  align = 'left',
}: SelectProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const onToggle = () => setToggle(!toggle);
  const closeToggle = () => setToggle(false);

  const onClickSelectOption = (
    value: string,
    option: string,
    selectedDataName: string
  ) => {
    selectOption(value, option, selectedDataName);
    closeToggle();
  };

  return (
    <S.SelectContainer width={width}>
      <S.Backdrop toggle={toggle} onClick={closeToggle} />
      <S.SelectCurrentButton type="button" onClick={onToggle} align={align}>
        <Typography fontSize="body-16">{children}</Typography>
        <ArrowBottom width="13px" height="13px" />
      </S.SelectCurrentButton>
      <S.SelectOptionList width={width} toggle={toggle} over={overflow}>
        {optionSet.map(({ option, value }) => (
          <S.SelectOptionItem
            key={option}
            onClick={() => onClickSelectOption(value, option, dataName)}
          >
            <S.SelectOptionButton active={children === option} align={align}>
              <input name={dataName} defaultValue={value} hidden />
              <Typography fontSize="body-16">{option}</Typography>
            </S.SelectOptionButton>
          </S.SelectOptionItem>
        ))}
      </S.SelectOptionList>
    </S.SelectContainer>
  );
};

export default Select;
