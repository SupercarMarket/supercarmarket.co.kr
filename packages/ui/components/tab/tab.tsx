"use client";

import { useUrlQuery } from "@supercarmarket/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { css } from "styled-components";

import Button from "../button";
import Container from "../container";
import Wrapper from "../wrapper";

interface TabProps {
  show?: boolean;
}

const Tab = ({ show = true }: TabProps) => {
  const { page, popular, variant, query } = useUrlQuery();
  const isPopular = popular === "true";
  const isVariantRow = variant === "row";
  const pathname = usePathname();

  return (
    <Container
      width="100%"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      gap="9px"
    >
      <Link
        href={{
          pathname,
          query: {
            page,
            query,
            variant,
            popular: isPopular ? "false" : "true",
          },
        }}
      >
        <Button variant={isPopular ? "Primary" : "Line"}>인기글</Button>
      </Link>
      <Link
        href={{
          pathname,
          query: {
            page,
            query,
            variant: "row",
            popular,
          },
        }}
        shallow
      >
        <Wrapper
          css={css`
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 10px;
            background: ${({ theme }) => theme.color.white};
            border: 1px solid ${({ theme }) => theme.color["greyScale-4"]};
            border-radius: 4px;
          `}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_268_8692)">
              <path
                d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
                fill={isVariantRow ? "#1E1E20" : "#C3C3C7"}
              />
            </g>
            <defs>
              <clipPath id="clip0_268_8692">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Wrapper>
      </Link>
      <Link
        href={{
          pathname,
          query: {
            page,
            query,
            variant: "column",
            popular,
          },
        }}
        shallow
      >
        <Wrapper
          css={css`
            padding: 10px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 10px;
            background: ${({ theme }) => theme.color.white};
            border: 1px solid ${({ theme }) => theme.color["greyScale-4"]};
            border-radius: 4px;
          `}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="3"
              width="8"
              height="8"
              fill={isVariantRow ? "#C3C3C7" : "#1E1E20"}
            />
            <rect
              x="13"
              y="3"
              width="8"
              height="8"
              fill={isVariantRow ? "#C3C3C7" : "#1E1E20"}
            />
            <rect
              x="13"
              y="13"
              width="8"
              height="8"
              fill={isVariantRow ? "#C3C3C7" : "#1E1E20"}
            />
            <rect
              x="3"
              y="13"
              width="8"
              height="8"
              fill={isVariantRow ? "#C3C3C7" : "#1E1E20"}
            />
          </svg>
        </Wrapper>
      </Link>
      {show && (
        <Link
          href={{
            pathname,
            query: {
              page,
              query,
              variant,
              popular,
            },
          }}
          shallow
        >
          <Button
            variant="Primary"
            suffix={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_309_5878)">
                  <path
                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM5.92 19H5V18.08L14.06 9.02L14.98 9.94L5.92 19ZM20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3C17.4 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63Z"
                    fill="#fff"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_309_5878">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            }
          >
            글쓰기
          </Button>
        </Link>
      )}
    </Container>
  );
};

export default Tab;
