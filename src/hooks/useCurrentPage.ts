import { useSearchParams } from 'next/navigation';

export default function useUrlQuery() {
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const orderby = searchParams.get('orderby');

  return {
    page: page ? parseInt(page) : 0,
    orderby: orderby ? orderby : 'false',
  };
}
