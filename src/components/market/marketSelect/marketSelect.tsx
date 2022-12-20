import Select from 'components/common/select';
import { useRouter } from 'next/router';
import React from 'react';
import { SelectType } from 'types/market';
import { makeSelectQuery } from 'utils/market/marketFilter';

import * as Styled from './marketSelect.styled';

interface SelectWrapperProps {
  options1: SelectType;
  options2?: SelectType;
}

const MarketSelect = ({ options1, options2 }: SelectWrapperProps) => {
  const { push, query } = useRouter();

  if (options1 && options2) {
    const op1 = query[options1.dataName] as string;
    const op2 = query[options2.dataName] as string;

    if (+op1 > +op2) {
      const url = makeSelectQuery(query, options1.dataName, op2);
      push(`/market/all?${url}`, undefined, { scroll: false });
    }
  }

  return (
    <Styled.SelectBox>
      <Select options={options1} />
      {options2 && (
        <>
          <Styled.Hyphen />
          <Select options={options2} />
        </>
      )}
    </Styled.SelectBox>
  );
};

export default MarketSelect;
