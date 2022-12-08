import Select from 'components/common/select';
import Typography from 'components/common/typography';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MarketOptionType } from 'types/market';

import * as Styled from './marketSelect.styled';

interface SelectLabelType {
  name: string;
  dataName: string;
}

interface SelectType {
  firstSelect?: MarketOptionType;
  secondSelect?: MarketOptionType;
}

interface MarketSelectProps {
  subject: string;
  label: {
    first: SelectLabelType;
    second?: SelectLabelType;
  };
  optionSet: MarketOptionType[];
}

const MarketSelect = ({ subject, label, optionSet }: MarketSelectProps) => {
  const { push, query } = useRouter();
  const { first, second } = label;
  const queryToggle = useRef<boolean>(false);

  const [selected, setSelected] = useState<SelectType>({
    firstSelect: undefined,
    secondSelect: undefined,
  });

  useMemo(() => {
    const f = optionSet.find(({ value }) => query[first.dataName] === value);
    let s: MarketOptionType | undefined;

    if (second) {
      s = optionSet.find(({ value }) => query[second.dataName] === value);
    }

    setSelected({ firstSelect: f, secondSelect: s });
  }, [query, first, second, optionSet]);

  const pushQuery = (
    firstSelect?: MarketOptionType,
    secondSelect?: MarketOptionType
  ) => {
    const queryObj = { ...query };
    if (firstSelect) queryObj[first.dataName] = firstSelect.value;
    if (secondSelect && second) queryObj[second.dataName] = secondSelect.value;

    const url = Object.entries(queryObj)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');

    push(`/market/all?${url}`);
    queryToggle.current = true;
  };

  const twinOption = (value: string, option: string, dataName: string) => {
    const { firstSelect, secondSelect } = selected;
    const selectedOption = { value, option };

    const firstConverted =
      Number(secondSelect?.value) >= +value ? selectedOption : secondSelect;

    const secondConverted =
      Number(firstSelect?.value) > +value ? selectedOption : firstSelect;

    if (first.dataName === dataName) {
      pushQuery(firstConverted, secondSelect);
      return;
    }

    pushQuery(secondConverted, selectedOption);
  };

  const singleOption = (value: string, option: string) => {
    const selectedOption = { value, option };
    pushQuery(selectedOption);
  };

  return (
    <Styled.MarketSelectContainer>
      <Typography lineHeight="150%">{subject}</Typography>
      <Styled.FilterBox>
        <Select
          width={second ? undefined : '270'}
          label={first}
          optionSet={optionSet}
          selectOption={second ? twinOption : singleOption}
          overflow={true}
        >
          {selected?.firstSelect?.option || first.name}
        </Select>
        {second && (
          <>
            <Styled.Hyphen />
            <Select
              label={second}
              optionSet={optionSet}
              selectOption={second ? twinOption : singleOption}
              overflow={true}
            >
              {selected?.secondSelect?.option || second.name}
            </Select>
          </>
        )}
      </Styled.FilterBox>
    </Styled.MarketSelectContainer>
  );
};

export default MarketSelect;
