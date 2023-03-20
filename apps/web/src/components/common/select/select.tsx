import { Typography } from '@supercarmarket/ui';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SelectType } from '@supercarmarket/types/market';
import { makeSelectQuery } from 'utils/market/marketQuery';

import ArrowBottom from '../../../assets/svg/arrow-bottom.svg';
import * as S from './select.styled';

interface SelectProps {
  width?: string;
  align?: 'left' | 'center' | 'right';
  options: SelectType;
}

const Select = ({ options, width = '100%', align }: SelectProps) => {
  const { optionSet, defaultLabel } = options;
  const { push, query } = useRouter();
  const [toggle, setToggle] = React.useState<boolean>(false);

  const optionValue = React.useMemo(() => {
    const check = (val: string, dat: string) => {
      const [v1, v2] = val.split(' ');
      const [d1, d2] = dat.split(' ');
      return v1 === query[d1] && v2 === query[d2];
    };

    const options = optionSet.find(({ value, dataName }) =>
      check(value, dataName)
    );

    return { option: options?.option, value: options?.value };
  }, [optionSet, query]);

  const onToggle = () => setToggle(!toggle);
  const closeToggle = () => setToggle(false);

  const selectOption = (dataName: string, value: string) => {
    const queryObj = { ...query };

    const url = makeSelectQuery(
      queryObj as { [key: string]: string },
      dataName,
      value
    );

    push(`/market?${url}`, undefined, {
      scroll: false,
    });

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
        {optionSet.map(({ option, dataName, value }) => (
          <S.SelectOptionItem
            key={option}
            onClick={() => selectOption(dataName, value)}
          >
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
