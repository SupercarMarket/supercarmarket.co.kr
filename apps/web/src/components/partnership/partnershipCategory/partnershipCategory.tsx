import Link from 'next/link';
import { css } from 'styled-components';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';

import { links } from 'constants/link/partnership';
import SecondSelect from 'components/common/secondSelect';
import { MarketOptionType } from '@supercarmarket/types/market';
import { applyMediaQuery, Category, Wrapper } from '@supercarmarket/ui';
import { PARTNERSHIP_FILTER_OPTIONS } from 'constants/partnership';
import { useNextQuery } from 'hooks/useNextQuery';
import { makeQuery } from 'utils/market/marketQuery';

interface PartnershipCategoryProps {
  category: string;
}

const PartnershipCategory = ({ category }: PartnershipCategoryProps) => {
  const searchParams = useSearchParams();
  const { query } = useNextQuery(searchParams);
  const selectRegion = (option: MarketOptionType) => {
    const queries = query;
    queries[option.dataName] = option.value;

    const url = makeQuery(queries);

    return `/partnership?&${url}`;
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
          <SecondSelect.Button align="left" selected={query.region}>
            {PARTNERSHIP_FILTER_OPTIONS.defaultLabel}
          </SecondSelect.Button>
          <SecondSelect.List>
            {PARTNERSHIP_FILTER_OPTIONS.optionSet.map((options) => (
              <Link
                key={options.value}
                href={selectRegion(options)}
                scroll={false}
              >
                <SecondSelect.Item>{options.option}</SecondSelect.Item>
              </Link>
            ))}
          </SecondSelect.List>
        </SecondSelect>
      </Wrapper.Right>
    </Wrapper>
  );
};

export default PartnershipCategory;
