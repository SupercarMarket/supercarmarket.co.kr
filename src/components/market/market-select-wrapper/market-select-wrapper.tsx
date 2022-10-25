import Select from 'components/common/select';
import Typography from 'components/common/typography';
import React, { FormEvent, useEffect, useState } from 'react';
import { OptionType, SelectOptionType } from 'types/market';

import * as S from './market-select-wrapper.styled';

interface FormTarget extends FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

interface MarketSelectWrapperProps {
  subject: string;
  dataName: string;
  firstLabel: string;
  secondLabel?: string;
  dataSet: OptionType[];
}

const MarketSelectWrapper = ({
  subject,
  dataName,
  firstLabel,
  secondLabel,
  dataSet,
}: MarketSelectWrapperProps) => {
  const [firstSelect, setFirstSelect] = useState<
    SelectOptionType | undefined
  >();
  const [secondSelect, setSecondSelect] = useState<
    SelectOptionType | undefined
  >();

  useEffect(() => {
    if (secondLabel) {
      if (firstSelect && secondSelect) {
        if (+firstSelect.value > +secondSelect.value) {
          setFirstSelect(() => secondSelect);
        }
      }
    }
  }, [secondLabel, firstSelect, secondSelect]);

  const singleSelectHandler = (e: FormTarget) => {
    e.preventDefault();
    const { value, ariaLabel } = e.target[dataName];

    setFirstSelect({
      dataName,
      subject,
      value,
      option: ariaLabel,
    });
  };

  const twinSelectHandler = (e: FormTarget) => {
    e.preventDefault();
    const [
      { value: firstValue, ariaLabel: firstAriaLabel },
      { value: secondValue, ariaLabel: secondAriaLabel },
    ] = e.target[dataName];

    setFirstSelect({
      dataName,
      subject,
      option: firstAriaLabel,
      value: firstValue,
    });
    setSecondSelect({
      dataName,
      subject,
      option: secondAriaLabel,
      value: secondValue,
    });
  };

  return (
    <S.MarketSelectWrapperContainer>
      <Typography lineHeight="150%">{subject}</Typography>
      <form onSubmit={secondLabel ? twinSelectHandler : singleSelectHandler}>
        <S.SelectWrapper>
          <Select
            width={secondLabel ? '127' : '270'}
            subject={subject}
            dataName={dataName}
            defaultLabel={firstLabel}
            selectValue={firstSelect}
            dataSet={dataSet}
          />
          {secondLabel && (
            <>
              <S.Hyphen />
              <Select
                subject={subject}
                dataName={dataName}
                defaultLabel={secondLabel}
                selectValue={secondSelect}
                dataSet={dataSet}
              />
            </>
          )}
        </S.SelectWrapper>
      </form>
    </S.MarketSelectWrapperContainer>
  );
};

export default MarketSelectWrapper;
