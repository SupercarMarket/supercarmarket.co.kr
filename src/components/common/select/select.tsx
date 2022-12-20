import Typography from 'components/common/typography';
import { useRouter } from 'next/router';
import React from 'react';
import { SelectType } from 'types/market';
import { makeSelectQuery } from 'utils/market/marketFilter';

import ArrowBottom from '../../../assets/svg/arrow-bottom.svg';
import * as S from './select.styled';

interface SelectProps {
  width?: string;
  align?: 'left' | 'center' | 'right';
  options: SelectType;
}

const Select = ({ options, width = '100%', align }: SelectProps) => {
  const { optionSet, dataName, defaultLabel } = options;
  const { push, query } = useRouter();
  const [toggle, setToggle] = React.useState<boolean>(false);

  const optionValue = React.useMemo(() => {
    const value = query[dataName] as string;
    const option = optionSet.find(({ value: v }) => v === value)?.option || '';
    return { option, value };
  }, [optionSet, query, dataName]);

  const onToggle = () => setToggle(!toggle);
  const closeToggle = () => setToggle(false);

  const selectOption = (value: string) => {
    const url = makeSelectQuery(
      query as { [key: string]: string },
      dataName,
      value
    );

    push(`/market/all?${url}`, undefined, { scroll: false });
    closeToggle();
  };

  return (
    <S.SelectContainer width={width}>
      <S.Backdrop toggle={toggle} onClick={closeToggle} />
      <S.SelectCurrentButton type="button" onClick={onToggle} align={align}>
        <Typography fontSize="body-16">
          {optionValue.option || defaultLabel}
        </Typography>
        <ArrowBottom width="13px" height="13px" />
      </S.SelectCurrentButton>
      <S.SelectOptionList width={width} toggle={toggle}>
        {optionSet.map(({ option, value }) => (
          <S.SelectOptionItem key={option} onClick={() => selectOption(value)}>
            <S.SelectOptionButton
              type="button"
              active={optionValue.option === option}
              align={align}
            >
              <Typography fontSize="body-16">{option}</Typography>
            </S.SelectOptionButton>
          </S.SelectOptionItem>
        ))}
      </S.SelectOptionList>
    </S.SelectContainer>
  );
};

export default React.memo(Select);
