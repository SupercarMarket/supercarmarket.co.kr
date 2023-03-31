import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useNextQuery } from 'hooks/useNextQuery';

interface SearchParams {
  domain: string;
}

const useSearchKeyword = ({ domain }: SearchParams) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { query } = useNextQuery(searchParams);
  const keywordRef = React.useRef<HTMLInputElement>(null);

  const keydownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && keywordRef.current !== null) {
      const queries = { ...query };

      queries.keyword = keywordRef.current.value;
      delete queries.id;
      keywordRef.current.value = '';

      const queryString = Object.entries(queries)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      push(`/${domain}?${queryString}`);
    }
  };

  return { keywordRef, keydownHandler };
};

export { useSearchKeyword };
