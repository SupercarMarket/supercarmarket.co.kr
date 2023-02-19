import SecondSelect from 'components/common/secondSelect';
import { PARTNERSHIP_FILTER_OPTIONS } from 'constants/partnership';
import { Typography } from '@supercarmarket/ui';
import { useRouter } from 'next/router';
import React from 'react';
import { Params } from 'types/base';
import { MarketOptionType } from 'types/market';

import * as Styled from './category.styled';

interface CategoryProps {
  category: {
    option: string;
    value: string;
  }[];
  domain: string;
}

const makeQuery = (q: object) =>
  Object.entries(q)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

const Category = ({ domain, category }: CategoryProps) => {
  const { query, push } = useRouter();
  const defaultUrl = makeQuery(query);

  const selectCategory = (value: string) => {
    push(`/${domain}/${value}?${defaultUrl}`, undefined, {
      scroll: false,
    });
  };

  const selectRegion = (option: MarketOptionType) => {
    const queries = query as Params;
    queries[option.dataName] = option.value;

    const url = makeQuery(queries);

    push(`/${domain}/${queries.category}?${url}`, undefined, {
      scroll: false,
    });
  };

  return (
    <Styled.CategoryContainer>
      <Styled.CategoryList>
        {category.map(({ option, value }) => (
          <Styled.CategoryItem
            key={option}
            active={query.category === value}
            onClick={() => selectCategory(value)}
          >
            <Typography>{option}</Typography>
          </Styled.CategoryItem>
        ))}
      </Styled.CategoryList>
      <SecondSelect width="100px">
        <SecondSelect.Button align="left">
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
    </Styled.CategoryContainer>
  );
};

export default Category;
