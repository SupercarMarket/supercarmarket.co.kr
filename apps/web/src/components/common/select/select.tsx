import * as React from 'react';
import Link from 'next/link';
import { css } from 'styled-components';
import { makeQuery } from 'utils/market/marketQuery';
import { SelectType } from '@supercarmarket/types/market';
import { useNextQuery } from 'hooks/useNextQuery';
import { useSearchParams } from 'next/navigation';
import { Wrapper, applyMediaQuery } from '@supercarmarket/ui';

import * as S from './select.styled';
import ArrowBottom from '../../../assets/svg/arrow-bottom.svg';

interface SelectProps {
  width?: string;
  align?: 'left' | 'center' | 'right';
  options: SelectType;
  nongray?: boolean;
}

const Select = ({ options, width = '100%', align, nongray }: SelectProps) => {
  const { optionSet, defaultLabel } = options;
  const searchParams = useSearchParams();
  const { query } = useNextQuery(searchParams);
  const [toggle, setToggle] = React.useState<boolean>(false);

  const onToggle = () => setToggle(!toggle);
  const closeToggle = () => setToggle(false);

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

  const selectOption = (dataName: string, value: string) => {
    const [key1, key2] = dataName.split(' ');
    const [value1, value2] = value.split(' ');

    query[key1] = value1;
    if (key2 && value2) query[key2] = value2;

    const url = makeQuery(query);

    return `/market?${url}`;
  };

  React.useEffect(() => closeToggle(), [query]);

  return (
    <Wrapper
      css={css`
        box-sizing: border-box;
        position: relative;
        width: ${width};

        ${({ theme }) => css`
          p {
            font-size: ${theme.fontSize['body-16']};
          }
          .gray {
            color: ${theme.color['greyScale-5']};
          }
          ${applyMediaQuery('mobile')} {
            p {
              font-size: ${theme.fontSize['body-14']};
            }
          }
        `}
      `}
    >
      <S.Backdrop toggle={toggle} onClick={closeToggle} />
      <S.SelectCurrentButton type="button" onClick={onToggle} align={align}>
        {!optionValue.option ? (
          <p className={nongray ? '' : 'gray'}>{defaultLabel}</p>
        ) : (
          <p>{optionValue.option}</p>
        )}
        <ArrowBottom width="13px" height="13px" />
      </S.SelectCurrentButton>
      <S.SelectOptionList width={width} toggle={toggle}>
        {optionSet.map(({ option, dataName, value }) => (
          <S.SelectOptionItem key={option}>
            <Link href={selectOption(dataName, value)} scroll={false}>
              <S.SelectOptionButton
                type="button"
                active={optionValue.option === option}
                align={align}
              >
                <p>{option}</p>
              </S.SelectOptionButton>
            </Link>
          </S.SelectOptionItem>
        ))}
      </S.SelectOptionList>
    </Wrapper>
  );
};

export default React.memo(Select);
