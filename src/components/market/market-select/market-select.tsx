import Select from 'components/common/select';
import Typography from 'components/common/typography';
import React, { useEffect, useState } from 'react';
import { OptionType } from 'types/market';

import * as S from './market-select.styled';

interface MarketSelectProps {
  label: {
    subject: string;
    dataName: string;
  };
  firstLabel: string;
  secondLabel?: string;
  optionSet: OptionType[];
  reset: boolean;
}

const MarketSelect = ({
  label,
  firstLabel,
  secondLabel,
  optionSet,
  reset,
}: MarketSelectProps) => {
  const [firstSelect, setFirstSelect] = useState<OptionType | null>(null);
  const [secondSelect, setSecondSelect] = useState<OptionType | null>(null);

  const changeFirstSelect = (option: OptionType) => {
    setFirstSelect(option);
  };
  const changeSecondSelect = (option: OptionType) => {
    setSecondSelect(option);
  };

  useEffect(() => {
    if (reset) {
      setFirstSelect(null);
      setSecondSelect(null);
    }
  }, [reset]);

  useEffect(() => {
    if (
      firstSelect &&
      secondSelect &&
      +firstSelect.value > +secondSelect.value
    ) {
      setFirstSelect(secondSelect);
    }
  }, [firstSelect, secondSelect]);

  return (
    <S.MarketSelectContainer>
      <Typography lineHeight="150%">{label.subject}</Typography>
      <S.FilterBox>
        <Select
          width={secondLabel ? undefined : '270'}
          defaultLabel={firstLabel}
          label={label}
          select={firstSelect}
          changeSelect={changeFirstSelect}
          optionSet={optionSet}
        />
        {secondLabel && (
          <>
            <S.Hyphen />
            <Select
              defaultLabel={secondLabel}
              label={label}
              select={secondSelect}
              changeSelect={changeSecondSelect}
              optionSet={optionSet}
            />
          </>
        )}
      </S.FilterBox>
    </S.MarketSelectContainer>
  );
};

export default MarketSelect;
