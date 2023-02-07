import { useSearchParams } from 'next/navigation';

export default function useUrlQuery() {
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const orderby = searchParams.get('orderby');
  const popular = searchParams.get('popular');
  const variant = searchParams.get('variant');
  const query = searchParams.get('query');

  return {
    page: page ? parseInt(page) : 0,
    orderby: orderby ? orderby : 'false',
    popular: popular ? popular : 'false',
    variant: variant ? variant : 'row',
    query: query ? query : undefined,
  };
}
