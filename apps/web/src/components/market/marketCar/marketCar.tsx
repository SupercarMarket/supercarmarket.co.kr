import * as React from 'react';
import Select from 'components/common/select';
import { ORDER_OPTIONSET, SHOW_COUNT_OPTIONS } from 'constants/market';

import ListIcon from '../../../assets/svg/menu.svg';
import ViewCardIcon from '../../../assets/svg/sqaure.svg';
import * as Styled from './marketCar.styled';
import MarketList from '../marketList';

const MarketCar = () => {
  const [listView, setListView] = React.useState(false);

  const onListView = () => setListView(true);
  const onCardView = () => setListView(false);

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
          <Styled.ViewButton disabled={listView} onClick={onListView}>
            <ListIcon width="20px" height="20px" />
          </Styled.ViewButton>
          <Styled.ViewButton disabled={!listView} onClick={onCardView}>
            <ViewCardIcon width="20px" height="20px" />
          </Styled.ViewButton>
        </Styled.ButtonBox>
      </Styled.ListFilter>
      <MarketList pagination />
    </Styled.MarketCarListContainer>
  );
};

export default MarketCar;
