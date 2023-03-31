import * as React from 'react';
import { Params } from '@supercarmarket/types/base';
import { useSearchParams } from 'next/navigation';

export const useNextQuery = (
  searchParams: ReturnType<typeof useSearchParams>
) => {
  const query = React.useMemo(() => {
    const stringSearchParams = searchParams.toString();
    const splitAnd = decodeURI(stringSearchParams).split('&');
    const query: Params = {};
    for (const keyValue of splitAnd) {
      const [key, value] = keyValue.split('=');
      query[key] = value;
    }
    return query;
  }, [searchParams]);

  return { query };
};
