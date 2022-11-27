import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';
import { memo } from 'react';

import ArrowLeft from '../../../assets/svg/arrow-left.svg';
import ArrowLeftTwo from '../../../assets/svg/arrow-left-two.svg';
import ArrowRight from '../../../assets/svg/arrow-right.svg';
import Container from '../container';
import { PaginationButton, PaginationItemContainer } from './pagination.styled';

interface PaginationItemProps {
  page: number;
  active?: boolean;
  children?: ReactNode;
}

interface PaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  className?: string;
}

const PaginationItem = memo(function PaginationItem({
  page,
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
          pathname: '',
          query: {
            page,
          },
        }}
      >
        <span>{children}</span>
      </Link>
    </PaginationItemContainer>
  );
});

const Pagination = memo(function Pagination({
  page,
  pageSize = 10,
  totalPages,
  className = 'pagination',
}: PaginationProps) {
  const { push } = useRouter();
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
          push({
            pathname: '',
            query: {
              page: page - pageSize,
            },
          })
        }
      >
        <ArrowLeftTwo />
      </PaginationButton>
      <PaginationButton
        variant="Line"
        disabled={page <= 0}
        onClick={() =>
          push({
            pathname: '',
            query: {
              page: page - 1,
            },
          })
        }
      >
        <ArrowLeft />
      </PaginationButton>
      {currentPages &&
        Array.from(currentPages).map((p) => (
          <PaginationItem key={p} page={p - 1} active={p === page + 1}>
            {p}
          </PaginationItem>
        ))}
      <PaginationButton
        variant="Line"
        disabled={page + 1 >= totalPages}
        onClick={() =>
          push({
            pathname: '',
            query: {
              page: page + 1,
            },
          })
        }
      >
        <ArrowRight />
      </PaginationButton>
    </Container>
  );
});

export default Pagination;
