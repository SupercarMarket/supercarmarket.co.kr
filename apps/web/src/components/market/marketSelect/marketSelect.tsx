import Select from 'components/common/select';
import { useRouter } from 'next/router';
import { SelectType } from '@supercarmarket/types/market';
import { makeSelectQuery } from 'utils/market/marketQuery';

import { Wrapper } from '@supercarmarket/ui';
import { css } from 'styled-components';

interface SelectWrapperProps {
  options1: SelectType;
  options2?: SelectType;
}

const MarketSelect = ({ options1, options2 }: SelectWrapperProps) => {
  const { push, query } = useRouter();

  if (options1 && options2) {
    const op1 = query[options1.optionSet[0].dataName] as string;
    const op2 = query[options2.optionSet[0].dataName] as string;

    if (+op1 > +op2) {
      const url = makeSelectQuery(query, options1.optionSet[0].dataName, op2);
      push(`/market?${url}`, undefined, { scroll: false });
    }
  }

  return (
    <Wrapper
      css={css`
        display: flex;
        align-items: center;
        width: 100%;
      `}
    >
      <Select options={options1} />
      {options2 && (
        <>
          <Wrapper.Item
            css={css`
              width: 16px;
              height: 1px;
              margin: 0 8px;
              background: ${({ theme }) => theme.color.black};
            `}
          />
          <Select options={options2} />
        </>
      )}
    </Wrapper>
  );
};

export default MarketSelect;
