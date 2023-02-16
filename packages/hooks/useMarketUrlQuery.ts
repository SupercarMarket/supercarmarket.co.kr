import { useSearchParams } from 'next/navigation';

export default function useMarketUrlQuery() {
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const orderBy = searchParams.get('orderBy');
  const orderby = searchParams.get('orderby');
  const filter = searchParams.get('filter');
  const category = searchParams.get('category');
  const keyword = searchParams.get('keyword');
  const minDate = searchParams.get('minDate');
  const maxDate = searchParams.get('maxDate');
  const fuel = searchParams.get('fuel');
  const minMileage = searchParams.get('minMileage');
  const maxMileage = searchParams.get('maxMileage');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const accident = searchParams.get('accident');
  const transmission = searchParams.get('transmission');
  const size = searchParams.get('size');

  return {
    page: page ? parseInt(page) : 0,
    orderby: orderby ? orderby : 'false',
    orderBy: orderBy ?? 'DESC',
    filter: filter ?? 'created_date',
    category: category ?? 'all',
    keyword: keyword ?? undefined,
    minDate: minDate ?? undefined,
    maxDate: maxDate ?? undefined,
    fuel: fuel ?? undefined,
    minMileage: minMileage ? minMileage : undefined,
    maxMileage: maxMileage ? maxMileage : undefined,
    minPrice: minPrice ?? undefined,
    maxPrice: maxPrice ?? undefined,
    accident: accident ?? undefined,
    transmission: transmission ?? undefined,
    size: size ? size : undefined,
  };
}
