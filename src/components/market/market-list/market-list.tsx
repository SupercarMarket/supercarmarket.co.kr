import Pagination from 'components/common/pagination';
import Select from 'components/common/select';
import MarketCard from 'components/market/market-card';
import MarketTable from 'components/market/market-table';
import { HOW_MANY_RESULT, ORDER_OPTIONSET } from 'constants/market';
import {
  UseMarketFilterActions,
  UseMarketFilterStates,
} from 'hooks/market/useMarketFilter';
import React, { useMemo, useState } from 'react';
import { WithBlurredImage } from 'types/magazine';
import { MarketDto, MarketResponse } from 'types/market';

import ListIcon from '../../../assets/svg/menu.svg';
import ViewCardIcon from '../../../assets/svg/sqaure.svg';
import * as S from './market-list.styled';

interface MarketListProps {
  data: MarketResponse<WithBlurredImage<MarketDto>>;
  states: UseMarketFilterStates;
  actions: UseMarketFilterActions;
  page: number;
}

const MarketList = ({
  data,
  states: { viewCount, orderSelect },
  actions: { changeOrderSelect, changeViewCount },
  page,
}: MarketListProps) => {
  const markets = useMemo(() => data.data, [data.data]);
  const [listView, setListView] = useState(false);

  const onListView = () => setListView(true);
  const onCardView = () => setListView(false);

  return (
    <S.MarketListContainer>
      <S.ListFilter>
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
            optionSet={HOW_MANY_RESULT(20, 70)}
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
      </S.ListFilter>
      {listView ? (
        <MarketTable markets={markets} />
      ) : (
        <S.MarketCardList>
          {markets.map((m) => (
            <MarketCard key={m.id} {...m} />
          ))}
        </S.MarketCardList>
      )}
      <Pagination
        page={page}
        pageSize={data.pageSize}
        totalCount={data.totalCount}
        totalPages={data.totalPages}
      />
    </S.MarketListContainer>
  );
};

export default MarketList;
