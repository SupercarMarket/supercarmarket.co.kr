import Select from 'components/common/select';
import { HOW_MANY_RESULT, ORDER_OPTIONSET } from 'constants/market';
import React, { useState } from 'react';
import { MarketOptionType } from 'types/market';

import ListIcon from '../../../assets/svg/menu.svg';
import ViewCardIcon from '../../../assets/svg/sqaure.svg';
import * as S from './market-list.styled';

const MarketList = () => {
  const VIEW_COUNT = HOW_MANY_RESULT(20, 70);
  const [listView, setListView] = useState(false);
  const [orderSelect, setOrderSelect] = useState<MarketOptionType>(
    ORDER_OPTIONSET[0]
  );
  const [viewCount, setViewCount] = useState<MarketOptionType>(VIEW_COUNT[0]);

  const changeOrderSelect = (option: MarketOptionType) => {
    setOrderSelect(option);
  };

  const changeViewCount = (option: MarketOptionType) => {
    setViewCount(option);
  };

  const onListView = () => setListView(true);
  const onCardView = () => setListView(false);

  return (
    <S.MarketListContainer>
      <S.ButtonBox>
        <Select
          select={orderSelect}
          label={{ subject: '', dataName: 'order' }}
          changeSelect={changeOrderSelect}
          optionSet={ORDER_OPTIONSET}
          defaultLabel={orderSelect.option}
          align="center"
        />
        <Select
          select={viewCount}
          label={{ subject: '', dataName: 'viewCount' }}
          changeSelect={changeViewCount}
          optionSet={VIEW_COUNT}
          defaultLabel={viewCount.option}
          width="112"
          align="center"
        />
        <S.ViewButton disabled={listView} onClick={onListView}>
          <ListIcon width="20px" height="20px" />
        </S.ViewButton>
        <S.ViewButton disabled={!listView} onClick={onCardView}>
          <ViewCardIcon width="20px" height="20px" />
        </S.ViewButton>
      </S.ButtonBox>
    </S.MarketListContainer>
  );
};

export default MarketList;
