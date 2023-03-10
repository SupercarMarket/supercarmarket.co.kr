import * as React from 'react';
import Select from 'components/common/select';
import { ORDER_OPTIONSET, SHOW_COUNT_OPTIONS } from 'constants/market';

import * as Styled from './marketCar.styled';
import MarketList from '../marketList';
import { Tab } from '@supercarmarket/ui';

const MarketCar = () => {
  return (
    <Styled.MarketCarListContainer>
      <Styled.ListFilter>
        <Styled.ButtonBox>
          <Styled.SelectBox width="140px">
            <Select options={ORDER_OPTIONSET} />
          </Styled.SelectBox>
          <Styled.SelectBox width="100px">
            <Select options={SHOW_COUNT_OPTIONS} />
          </Styled.SelectBox>
          <Tab variant />
        </Styled.ButtonBox>
      </Styled.ListFilter>
      <MarketList pagination />
    </Styled.MarketCarListContainer>
  );
};

export default MarketCar;
