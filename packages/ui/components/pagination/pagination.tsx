"use client";

import clsx from "clsx";
import { useUrlQuery } from "@supercarmarket/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { memo } from "react";

import Container from "../container";
import { PaginationButton, PaginationItemContainer } from "./pagination.styled";

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
      className={clsx("pagination-item")}
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
  className = "pagination",
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
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_245_3907)">
            <path
              d="M21.3894 20.1296L19.6194 21.8996L9.7194 11.9996L19.6194 2.09961L21.3894 3.86961L13.2594 11.9996L21.3894 20.1296Z"
              fill="current"
            />
            <path
              d="M14.2805 20.1296L12.5105 21.8996L2.61052 11.9996L12.5105 2.09961L14.2805 3.86961L6.15052 11.9996L14.2805 20.1296Z"
              fill="current"
            />
          </g>
          <defs>
            <clipPath id="clip0_245_3907">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </PaginationButton>
      <PaginationButton
        variant="Line"
        disabled={page <= 0}
        onClick={() => push(`${pathname}?page=${page - 1}&orderby=${orderby}`)}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_245_3944)">
            <path
              d="M18.16 3.87039L16.39 2.10039L6.49003 12.0004L16.39 21.9004L18.16 20.1304L10.03 12.0004L18.16 3.87039Z"
              fill="current"
            />
          </g>
          <defs>
            <clipPath id="clip0_245_3944">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
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
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_206_2548)">
            <path
              d="M6.48999 20.1296L8.25999 21.8996L18.16 11.9996L8.25999 2.09961L6.48999 3.86961L14.62 11.9996L6.48999 20.1296Z"
              fill="current"
            />
          </g>
          <defs>
            <clipPath id="clip0_206_2548">
              <rect width="25" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </PaginationButton>
    </Container>
  );
});

export default Pagination;
