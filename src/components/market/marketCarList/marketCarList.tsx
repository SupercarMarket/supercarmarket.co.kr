import Pagination from 'components/common/pagination';
import Select from 'components/common/select';
import MarketCard from 'components/market/marketCard';
import MarketTable from 'components/market/marketTable';
import { ORDER_OPTIONSET, SHOW_COUNT_OPTIONS } from 'constants/market';
import React from 'react';
import { WithBlurredImage } from 'types/magazine';
import { MarketDto, MarketResponse } from 'types/market';

import ListIcon from '../../../assets/svg/menu.svg';
import ViewCardIcon from '../../../assets/svg/sqaure.svg';
import * as Styled from './marketCarList.styled';

interface MarketCarListProps {
  data: MarketResponse<WithBlurredImage<MarketDto>>;
  page: number;
}

const MarketCarList = ({ data }: MarketCarListProps) => {
  const markets = React.useMemo(() => data.data, [data.data]);
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
        pageSize={data.pageSize}
        totalCount={data.totalCount}
        totalPages={data.totalPages}
      />
    </Styled.MarketCarListContainer>
  );
};

export default MarketCarList;
