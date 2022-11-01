import Select from 'components/common/select';
import Typography from 'components/common/typography';
import {
  HOW_MANY_RESULT,
  MARKET_LIST_TABLE_HEAD,
  ORDER_OPTIONSET,
} from 'constants/market';
import Image from 'next/image';
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
          <S.MarketTableRow>
            <S.MarketTableData>
              <Image
                width="196"
                height="124"
                layout="responsive"
                src={
                  'https://user-images.githubusercontent.com/59536977/199271635-41da7db0-ba03-4154-b9be-b7d6ca4ca73a.png'
                }
                alt="thumbnail"
              />
            </S.MarketTableData>
            <S.MarketTableData>
              <S.CarInformation>
                <Typography fontSize="body-24" fontWeight="bold">
                  람보르기니 우라칸 스파이더 LP640-4
                </Typography>
                <Typography fontSize="body-14" color="greyScale-5">
                  무사고 | 짧은 주행
                </Typography>
              </S.CarInformation>
            </S.MarketTableData>
            <S.MarketTableData>
              <Typography fontSize="body-14">20/03</Typography>
            </S.MarketTableData>
            <S.MarketTableData>
              <Typography fontSize="body-14">가솔린</Typography>
            </S.MarketTableData>
            <S.MarketTableData>
              <Typography fontSize="body-14">3천km</Typography>
            </S.MarketTableData>
            <S.MarketTableData>
              <Typography fontSize="body-14" style={{ color: '#ED7474' }}>
                상담
              </Typography>
            </S.MarketTableData>
            <S.MarketTableData>
              <Typography fontSize="body-14">슈퍼카마켓</Typography>
            </S.MarketTableData>
          </S.MarketTableRow>
        </S.MarketTBody>
      </S.MarketTable>
    </S.MarketListContainer>
  );
};

export default MarketList;
