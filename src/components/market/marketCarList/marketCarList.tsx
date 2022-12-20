import Pagination from 'components/common/pagination';
import Select from 'components/common/select';
import MarketCard from 'components/market/marketCard';
import MarketTable from 'components/market/marketTable';
import { ORDER_OPTIONSET } from 'constants/market';
import {
  UseMarketFilterActions,
  UseMarketFilterStates,
} from 'hooks/market/useMarketFilter';
import React, { useMemo, useState } from 'react';
import { WithBlurredImage } from 'types/magazine';
import { MarketDto, MarketResponse } from 'types/market';
import { makeHowManyResult } from 'utils/market/marketFilter';

import ListIcon from '../../../assets/svg/menu.svg';
import ViewCardIcon from '../../../assets/svg/sqaure.svg';
import * as Styled from './marketCarList.styled';

interface MarketCarListProps {
  data: MarketResponse<WithBlurredImage<MarketDto>>;
  states: UseMarketFilterStates;
  actions: UseMarketFilterActions;
  page: number;
}

const MarketCarList = ({
  data,
  states: { viewCount, orderSelect },
  actions: { changeOrderSelect, changeViewCount },
  page,
}: MarketCarListProps) => {
  const markets = useMemo(() => data.data, [data.data]);
  const [listView, setListView] = useState(false);

  const onListView = () => setListView(true);
  const onCardView = () => setListView(false);

  return (
    <Styled.MarketCarListContainer>
      <Styled.ListFilter>
        <Styled.ButtonBox>
          {/* <Select
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
            optionSet={makeHowManyResult(20, 70)}
            defaultLabel={viewCount.option}
            width="112"
            align="center"
          /> */}
          <Styled.ViewButton disabled={listView} onClick={onListView}>
            <ListIcon width="20px" height="20px" />
          </Styled.ViewButton>
          <Styled.ViewButton disabled={!listView} onClick={onCardView}>
            <ViewCardIcon width="20px" height="20px" />
          </Styled.ViewButton>
        </Styled.ButtonBox>
      </Styled.ListFilter>
      {listView ? (
        <MarketTable markets={markets} />
      ) : (
        <Styled.MarketCardList>
          {markets.map((m) => (
            <MarketCard key={m.id} {...m} />
          ))}
        </Styled.MarketCardList>
      )}
      <Pagination
        page={page}
        pageSize={data.pageSize}
        totalCount={data.totalCount}
        totalPages={data.totalPages}
      />
    </Styled.MarketCarListContainer>
  );
};

export default MarketCarList;
