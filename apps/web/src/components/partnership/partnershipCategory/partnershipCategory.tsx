import { Params } from '@supercarmarket/types/base';
import { MarketOptionType } from '@supercarmarket/types/market';
import { applyMediaQuery, Category, Wrapper } from '@supercarmarket/ui';
import SecondSelect from 'components/common/secondSelect';
import { links } from 'constants/link/partnership';
import { PARTNERSHIP_FILTER_OPTIONS } from 'constants/partnership';
import { useRouter } from 'next/router';
import * as React from 'react';
import { css } from 'styled-components';
import { makeQuery } from 'utils/market/marketQuery';

interface PartnershipCategoryProps {
  category: string;
}

const PartnershipCategory = ({ category }: PartnershipCategoryProps) => {
  const { push, query } = useRouter();
  const selectRegion = (option: MarketOptionType) => {
    const queries = query as Params;
    queries[option.dataName] = option.value;

    const url = makeQuery(queries);

    push(`/partnership?&${url}`, undefined, {
      scroll: false,
    });
  };

  return (
    <Wrapper
      css={css`
        display: flex;
        justify-content: space-between;

        ${applyMediaQuery('mobile')} {
          flex-direction: column;
        }
      `}
    >
      <Wrapper.Left>
        <Category links={links} category={category} />
      </Wrapper.Left>
      <Wrapper.Right
        css={css`
          ${applyMediaQuery('mobile')} {
            display: flex;
            justify-content: flex-end;
          }
        `}
      >
        <SecondSelect width="100px">
          <SecondSelect.Button align="left" selected={(query as Params).region}>
            {PARTNERSHIP_FILTER_OPTIONS.defaultLabel}
          </SecondSelect.Button>
          <SecondSelect.List>
            {PARTNERSHIP_FILTER_OPTIONS.optionSet.map((options) => (
              <SecondSelect.Item
                key={options.value}
                onClick={() => selectRegion(options)}
              >
                {options.option}
              </SecondSelect.Item>
            ))}
          </SecondSelect.List>
        </SecondSelect>
      </Wrapper.Right>
    </Wrapper>
  );
};

export default PartnershipCategory;
