import Typography from 'components/common/typography';
import React, { useEffect, useState } from 'react';
import { OptionType } from 'types/market';

import ArrowBottom from '../../../assets/svg/arrow-bottom.svg';
import * as S from './select.styled';

interface SelectProps {
  subject: string;
  dataName: string;
  defaultLabel: string;
  dataSet: OptionType[];
  selectValue: OptionType | undefined;
  width?: string;
}

const Select = ({
  width = '127',
  subject,
  dataName,
  dataSet,
  defaultLabel,
  selectValue,
}: SelectProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [current, setCurrent] = useState<OptionType | undefined>(selectValue);

  const onToggle = () => setToggle(!toggle);
  const closeToggle = () => setToggle(false);

  const selectOption = (option: OptionType) => {
    setCurrent(option);
    setTimeout(() => closeToggle(), 1);
  };

  useEffect(() => {
    if(selectValue) setCurrent(selectValue)
  }, [selectValue])

  return (
    <S.SelectContainer width={width}>
      <S.Backdrop toggle={toggle} onClick={closeToggle} />
      <S.SelectCurrent type="button" onClick={onToggle}>
        <input
          name={dataName}
          aria-label={current?.option || ''}
          value={current?.value || ''}
          readOnly
          hidden
        />
        <Typography fontSize="body-16">
          {current?.option || defaultLabel}
        </Typography>
        <ArrowBottom width="14px" />
      </S.SelectCurrent>
      <S.SelectOptionList toggle={toggle} width={width}>
        {dataSet?.map(({ option, value }) => (
          <S.SelectOptionItem
            key={option}
            onClick={() => selectOption({ option, value })}
          >
            <S.SelectOption>
              <Typography fontSize="body-16">{option}</Typography>
            </S.SelectOption>
          </S.SelectOptionItem>
        ))}
      </S.SelectOptionList>
    </S.SelectContainer>
  );
};

export default Select;
