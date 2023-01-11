'use client';

import clsx from 'clsx';
import useUrlQuery from 'hooks/useCurrentPage';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useMemo } from 'react';
import { memo } from 'react';

import ArrowLeft from '../../../assets/svg/arrow-left.svg';
import ArrowLeftTwo from '../../../assets/svg/arrow-left-two.svg';
import ArrowRight from '../../../assets/svg/arrow-right.svg';
import Container from '../container';
import { PaginationButton, PaginationItemContainer } from './pagination.styled';

interface PaginationItemProps {
  page: number;
  orderby: string;
  active?: boolean;
  children?: ReactNode;
  pathname: string | null;
}

interface PaginationProps {
  pageSize: number;
  totalCount: number;
  totalPages: number;
  className?: string;
}

const PaginationItem = memo(function PaginationItem({
  page,
  orderby,
  pathname,
  active = false,
  children,
}: PaginationItemProps) {
  return (
    <PaginationItemContainer
      data-active={active}
      className={clsx('pagination-item')}
    >
      <Link
        href={{
          pathname,
          query: {
            page,
            orderby,
          },
        }}
        shallow
      >
        <span>{children}</span>
      </Link>
    </PaginationItemContainer>
  );
});

const Pagination = memo(function Pagination({
  pageSize = 10,
  totalPages,
  className = 'pagination',
}: PaginationProps) {
  const { page, orderby } = useUrlQuery();
  const { push } = useRouter();
  const pathname = usePathname();
  const currentPages = useMemo(() => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return Array(totalPages)
      .fill(0)
      .map(() => new Set(pages.splice(0, pageSize)))
      .filter((v) => v.has(page + 1))
      .shift();
  }, [page, pageSize, totalPages]);

  return (
    <Container
      display="flex"
      justifyContent="center"
      gap="16px"
      className={className}
    >
      <PaginationButton
        variant="Line"
        disabled={page <= pageSize}
        onClick={() =>
          push(`${pathname}?page=${page - pageSize}&orderby=${orderby}`)
        }
      >
        <ArrowLeftTwo />
      </PaginationButton>
      <PaginationButton
        variant="Line"
        disabled={page <= 0}
        onClick={() => push(`${pathname}?page=${page - 1}&orderby=${orderby}`)}
      >
        <ArrowLeft />
      </PaginationButton>
      {currentPages &&
        Array.from(currentPages).map((p) => (
          <PaginationItem
            key={p}
            page={p - 1}
            active={p === page + 1}
            orderby={orderby}
            pathname={pathname}
          >
            {p}
          </PaginationItem>
        ))}
      <PaginationButton
        variant="Line"
        disabled={page + 1 >= totalPages}
        onClick={() => push(`${pathname}?page=${page + 1}&orderby=${orderby}`)}
      >
        <ArrowRight />
      </PaginationButton>
    </Container>
  );
});

export default Pagination;
