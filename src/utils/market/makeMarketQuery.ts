import { UseMarketFilterStates } from 'hooks/market/useMarketFilter';

interface MakeMarketQueriesProps {
  states: UseMarketFilterStates;
  page: number;
  category: string;
}

export default function makeMarketQueries({
  states,
  page,
  category,
}: MakeMarketQueriesProps) {
  const { filterList, orderSelect, viewCount } = states;
  const fList = filterList
    .map(({ dataName, value }) => {
      if (
        dataName === 'price' ||
        dataName === 'date' ||
        dataName === 'mileage'
      ) {
        const [rowValue, highValue] = value.split(' ');
        return `min${dataName.replace(/^[a-z]/, (char) =>
          char.toUpperCase()
        )}=${rowValue}&max${dataName.replace(/^[a-z]/, (char) =>
          char.toUpperCase()
        )}=${highValue}`;
      }
      return `${dataName}=${value}`;
    })
    .join('&');

  const [orderName, orderValue] = orderSelect.value.split(' ');
  const oList = `filter=${orderName}&orderBy=${orderValue}`;

  const [viewCountName, viewCountValue] = viewCount.value.split(' ');
  const vList = `${viewCountName}=${viewCountValue}`;

  // const merged = `category=${category}&page=${page}&${fList}&${oList}&${vList}`;
  const merged = `category=슈퍼카&${fList}&${oList}&${vList}&page=${page}&keyword=페라리`;

  console.log(merged);

  return merged;
}
