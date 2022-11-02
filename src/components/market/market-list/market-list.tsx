import Pagination from 'components/common/pagination';
import Select from 'components/common/select';
import Typography from 'components/common/typography';
import MarketCard from 'components/market/market-card';
import MarketRow from 'components/market/market-row/market-row';
import {
  HOW_MANY_RESULT,
  MARKET_LIST_TABLE_HEAD,
  ORDER_OPTIONSET,
} from 'constants/market';
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
        <S.MarketTable>
          <S.MarketTHead>
            <S.MarketTableRow>
              {MARKET_LIST_TABLE_HEAD.map(({ title, width }) => (
                <S.MarketTableHead width={width} key={title}>
                  <Typography fontSize="body-14">{title}</Typography>
                </S.MarketTableHead>
              ))}
            </S.MarketTableRow>
          </S.MarketTHead>
          <S.MarketTBody>
            {markets.map((m) => (
              <MarketRow key={m.id} {...m} />
            ))}
          </S.MarketTBody>
        </S.MarketTable>
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
