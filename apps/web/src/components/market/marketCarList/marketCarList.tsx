import * as React from 'react';
import {
  applyMediaQuery,
  Pagination,
  Table,
  Wrapper,
} from '@supercarmarket/ui';
import { WithBlurredImage } from '@supercarmarket/types/magazine';
import { MarketDto, MarketResponse } from '@supercarmarket/types/market';
import Select from 'components/common/select';
import MarketCard from 'components/market/marketCard';
import { ORDER_OPTIONSET, SHOW_COUNT_OPTIONS } from 'constants/market';
import { css } from 'styled-components';

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
        <Wrapper
          css={css`
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-bottom: 80px;
            gap: 13px;
          `}
        >
          <Table tab="product" hidden={false} />
          {markets.map((m) => (
            <MarketCard variant="row" key={m.id} {...m} />
          ))}
        </Wrapper>
      ) : (
        <Wrapper
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            row-gap: 40px;
            column-gap: 20px;
            margin-bottom: 80px;
            ${applyMediaQuery('mobile')} {
              grid-template-columns: 1fr 1fr;
              row-gap: 16px;
              column-gap: 8px;
            }
          `}
        >
          {markets.map((m) => (
            <MarketCard key={m.id} {...m} />
          ))}
        </Wrapper>
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
