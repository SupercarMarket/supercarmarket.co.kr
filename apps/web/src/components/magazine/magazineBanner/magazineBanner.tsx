import {
  Button,
  Container,
  Typography,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import type { MagazineDto } from '@supercarmarket/types/magazine';
import clsx from 'clsx';
import Image from 'next/image';
import { css } from 'styled-components';

import Arrow from '../../../assets/svg/arrow-right.svg';
import Link from 'next/link';
import useBase64 from 'hooks/queries/useBase64';
import Skeleton from 'react-loading-skeleton';
import { ServerResponse } from '@supercarmarket/types/base';
import { useMagazine } from 'http/server/magazine';

interface MagazineBannerProps {
  reverse?: boolean;
  className?: string;
  button?: boolean;
  initialData?: ServerResponse<MagazineDto[]>;
}

const baseSrc = `${process.env.NEXT_PUBLIC_URL}/images/base.png`;

const MagazineBanner = ({
  reverse,
  button,
  className,
  initialData,
}: MagazineBannerProps) => {
  const { data: magazine } = useMagazine(
    { page: 0 },
    {
      initialData,
    }
  );
  const {
    data: base64,
    isFetching,
    isLoading,
  } = useBase64(
    magazine && magazine.data && magazine.data.length > 0
      ? magazine.data[0].imgSrc
      : baseSrc,
    {
      src: magazine?.data[0].imgSrc || baseSrc,
      category: 'magazine',
    },
    {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: Infinity,
      enabled: magazine && magazine.data.length > 0,
    }
  );

  return (
    <Container width="100%" className={className}>
      {magazine && magazine.data.length > 0 && (
        <Wrapper
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            ${reverse && 'flex-direction: row-reverse;'}
            ${reverse && 'gap: 75px;'}
            ${applyMediaQuery('mobile')} {
              flex-direction: column-reverse;
              gap: 20px;
            }
          `}
        >
          <Wrapper.Item
            css={css`
              width: 590px;
              height: 394px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 16px;
              fill: ${({ theme }) => theme.color.white};

              ${applyMediaQuery('mobile')} {
                width: 343px;
                height: auto;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                gap: 12px;
                h1 {
                  font-size: ${({ theme }) =>
                    theme.fontSize['header-24']} !important;
                }
                p {
                  height: 63px !important;
                  overflow: hidden !important;
                  white-space: normal !important;
                  text-overflow: ellipsis !important;
                  display: -webkit-box !important;
                  -webkit-line-clamp: 3 !important;
                  -webkit-box-orient: vertical !important;
                  word-break: keep-all !important;
                }
              }
            `}
          >
            <Typography
              as="span"
              color="system-1"
              style={{
                width: '100%',
                textAlign: 'start',
              }}
            >
              NEW
            </Typography>
            <Typography
              as="h1"
              fontSize="header-36"
              fontWeight="bold"
              color="black"
              lineHeight="150%"
              className={clsx('mb-contents-heading')}
            >
              {magazine.data[0].title}
            </Typography>
            <Typography
              as="p"
              fontSize="body-16"
              color="black"
              fontWeight="regular"
              lineHeight="150%"
              className={clsx('mb-contents-body', {
                [`mb-button`]: button,
              })}
            >
              {magazine.data[0].contents}
            </Typography>
            {button && (
              <Link href={`/magazine/${magazine.data[0].id}`}>
                <Wrapper.Item
                  css={css`
                    width: 100%;
                    display: flex;
                  `}
                >
                  <Button
                    variant="Black"
                    border="rounded"
                    type="button"
                    suffix={<Arrow />}
                  >
                    보러가기
                  </Button>
                </Wrapper.Item>
              </Link>
            )}
          </Wrapper.Item>
          <Wrapper.Item
            css={css`
              position: relative;
              width: 590px;
              height: 394px;
              gap: 16px;
              .react-loading-skeleton {
                width: 590px;
                height: 394px;
                border-radius: 4px;
              }
              ${applyMediaQuery('mobile')} {
                width: 343px;
                height: 264px;
                .react-loading-skeleton {
                  width: 343px;
                  height: 264px;
                }
              }
            `}
          >
            {isFetching || isLoading ? (
              <Skeleton />
            ) : (
              <Image
                src={magazine.data[0].imgSrc}
                alt="thumbnail"
                fill
                placeholder="blur"
                blurDataURL={base64?.data.base64}
                style={{
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
                priority
                sizes={`${applyMediaQuery('desktop')} 590px, ${applyMediaQuery(
                  'mobile'
                )} 343px`}
              />
            )}
          </Wrapper.Item>
        </Wrapper>
      )}
    </Container>
  );
};

export default MagazineBanner;
