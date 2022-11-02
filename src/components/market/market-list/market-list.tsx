import Select from 'components/common/select';
import Typography from 'components/common/typography';
import MarketRow from 'components/market/market-row/market-row';
import {
  HOW_MANY_RESULT,
  MARKET_LIST_TABLE_HEAD,
  ORDER_OPTIONSET,
} from 'constants/market';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { WithBlurredImage } from 'types/magazine';
import { MarketDto, MarketOptionType, MarketResponse } from 'types/market';

import ListIcon from '../../../assets/svg/menu.svg';
import ViewCardIcon from '../../../assets/svg/sqaure.svg';
import * as S from './market-list.styled';

interface MarketListProps {
  data: MarketResponse<WithBlurredImage<MarketDto>>;
}

const MarketList = ({ data }: MarketListProps) => {
  const VIEW_COUNT = HOW_MANY_RESULT(20, 70);
  const [listView, setListView] = useState(false);
  const [orderSelect, setOrderSelect] = useState<MarketOptionType>(
    ORDER_OPTIONSET[0]
  );
  const [viewCount, setViewCount] = useState<MarketOptionType>(VIEW_COUNT[0]);

  const markets = useMemo(() => data.data, [data.data]);

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
          <S.MarketCard>
            <Image
              width={285}
              height={180}
              // placeholder="blur"
              // blurDataURL={base64}
              layout="fixed"
              src={markets[0].imgSrc}
              alt="thumbnail"
              style={{ borderRadius: '4px' }}
            />
            <Typography fontSize="header-16" fontWeight="bold">
              람보르기니 우라칸 스파이더
            </Typography>
            <Typography
              fontSize="body-14"
              lineHeight="150%"
              color="greyScale-5"
            >
              무사고 | 짧은 주행
            </Typography>
            <Typography fontSize="body-14">22/06</Typography>
            <Typography fontSize="body-16" color="greyScale-4">
              |
            </Typography>
            <Typography fontSize="body-14">가솔린</Typography>
            <Typography fontSize="body-16" color="greyScale-4">
              |
            </Typography>
            <Typography fontSize="body-14">3천km</Typography>
          </S.MarketCard>
        </S.MarketCardList>
      )}
    </S.MarketListContainer>
  );
};

export default MarketList;
