import { ORDER_OPTIONSET } from 'constants/market';
import { useState } from 'react';
import { FilterType, MarketOptionType } from 'types/market';
import { makeHowManyResult } from 'utils/market/marketFilter';

export interface UseMarketFilterStates {
  filterList: FilterType[];
  orderSelect: MarketOptionType;
  viewCount: MarketOptionType;
}

export interface UseMarketFilterActions {
  changeFilters: (f: FilterType[]) => void;
  changeOrderSelect: (o: MarketOptionType) => void;
  changeViewCount: (o: MarketOptionType) => void;
}

const useMarketFilter = (): [UseMarketFilterStates, UseMarketFilterActions] => {
  const [filterList, setFilterList] = useState<FilterType[]>([]);
  const [orderSelect, setOrderSelect] = useState<MarketOptionType>(
    ORDER_OPTIONSET[0]
  );
  const VIEW_COUNT = makeHowManyResult(20, 70);
  const [viewCount, setViewCount] = useState<MarketOptionType>(VIEW_COUNT[0]);

  const changeFilters = (f: FilterType[]) => setFilterList(f);
  const changeOrderSelect = (option: MarketOptionType) =>
    setOrderSelect(option);
  const changeViewCount = (option: MarketOptionType) => setViewCount(option);

  const states = {
    filterList,
    orderSelect,
    viewCount,
  };

  const actions = {
    changeFilters,
    changeOrderSelect,
    changeViewCount,
  };

  return [states, actions];
};

export default useMarketFilter;
