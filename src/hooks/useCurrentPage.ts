import { useSearchParams } from 'next/navigation';

export default function useCurrentPage() {
  const searchParams = useSearchParams();

  const page = searchParams.get('page');

  return page ? parseInt(page) : 0;
}
