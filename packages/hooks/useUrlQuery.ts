import { useSearchParams } from 'next/navigation';

export default function useUrlQuery() {
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const orderby = searchParams.get('orderby');
  const orderBy = searchParams.get('orderBy');
  const popular = searchParams.get('popular');
  const variant = searchParams.get('variant');
  const filter = searchParams.get('filter');
  const category = searchParams.get('category');
  const searchType = searchParams.get('searchType');

  return {
    page: page ? parseInt(page) : 0,
    orderby: orderby ? orderby : 'false',
    popular: popular ? popular : 'false',
    variant: variant ? variant : 'row',
    orderBy: orderBy ? orderBy : undefined,
    filter: filter ? filter : undefined,
    category: category ? category : undefined,
    searchType: searchType ? searchType : undefined,
  };
}
