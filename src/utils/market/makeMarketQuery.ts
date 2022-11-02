import { UseMarketFilterStates } from 'hooks/market/useMarketFilter';

export default function makeMarketQueries(
  queries: UseMarketFilterStates,
  kind: string
) {
  const { filterList, orderSelect, viewCount } = queries;
  const fList = filterList
    .map(({ dataName, value }) => {
      if (
        dataName === 'price' ||
        dataName === 'year' ||
        dataName === 'mileage'
      ) {
        const [rowValue, highValue] = value.split(' ');
        return `low_${dataName}=${rowValue}&high_${dataName}=${highValue}`;
      }
      return `${dataName}=${value}`;
    })
    .join('&');
  const [orderName, orderValue] = orderSelect.value.split(' ');
  const oList = `filter=${orderName}&orderBy=${orderValue}`;

  const [viewCountName, viewCountValue] = viewCount.value.split(' ');
  const vList = `${viewCountName}=${viewCountValue}`;

  const merged = `${fList}&${oList}&${vList}&kind=${kind}`;
  console.log('merged', merged);
  return merged;
}
