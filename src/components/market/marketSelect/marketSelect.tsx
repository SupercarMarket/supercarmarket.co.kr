import Select from 'components/common/select';
import Typography from 'components/common/typography';
import React, { useEffect, useState } from 'react';
import { MarketFormTarget, MarketOptionType } from 'types/market';

import * as Styled from './marketSelect.styled';

interface MarketSelectProps {
  label: {
    subject: string;
    dataName: string;
  };
  firstLabel: string;
  secondLabel?: string;
  optionSet: MarketOptionType[];
  formHandler: (
    e: MarketFormTarget,
    label: { subject: string; dataName: string }
  ) => void;
}

const MarketSelect = ({
  label,
  firstLabel,
  secondLabel,
  optionSet,
  formHandler,
}: MarketSelectProps) => {
  const [firstSelect, setFirstSelect] = useState<MarketOptionType | null>(null);
  const [secondSelect, setSecondSelect] = useState<MarketOptionType | null>(
    null
  );

  const changeFirstSelect = (option: MarketOptionType) => {
    setFirstSelect(option);
  };
  const changeSecondSelect = (option: MarketOptionType) => {
    setSecondSelect(option);
  };

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
    <Styled.MarketSelectContainer>
      <form
        name={label.dataName}
        onSubmit={(e: MarketFormTarget) => formHandler(e, label)}
      >
        <Typography lineHeight="150%">{label.subject}</Typography>
        <Styled.FilterBox>
          <Select
            width={secondLabel ? undefined : '270'}
            defaultLabel={firstLabel}
            label={label}
            select={firstSelect}
            changeSelect={changeFirstSelect}
            optionSet={optionSet}
            overflow={true}
          />
          {secondLabel && (
            <>
              <Styled.Hyphen />
              <Select
                defaultLabel={secondLabel}
                label={label}
                select={secondSelect}
                changeSelect={changeSecondSelect}
                optionSet={optionSet}
                overflow={true}
              />
            </>
          )}
        </Styled.FilterBox>
      </form>
    </Styled.MarketSelectContainer>
  );
};

export default MarketSelect;
