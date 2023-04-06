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
import { truncateOnWord } from '@supercarmarket/lib';

interface MagazineBannerProps {
  reverse?: boolean;
  className?: string;
  button?: boolean;
  initialData: MagazineDto;
}

const baseSrc = `${process.env.NEXT_PUBLIC_URL}/images/base.png`;

const MagazineBanner = ({
  reverse,
  button,
  className,
  initialData,
}: MagazineBannerProps) => {
  const {
    data: base64,
    isFetching,
    isLoading,
  } = useBase64(
    initialData.imgSrc ? initialData.imgSrc : baseSrc,
    {
      src: initialData.imgSrc || baseSrc,
      category: 'magazine',
    },
    {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: Infinity,
      enabled: !!initialData,
    }
  );

  return (
    <Container width="100%" className={className}>
      {initialData && (
        <Wrapper
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            ${reverse && 'flex-direction: row-reverse;'}
            ${applyMediaQuery('mobile')} {
              flex-direction: column-reverse;
              gap: 20px;
            }
          `}
        >
          <Wrapper.Top
            css={css`
              width: 590px;
              height: 394px;
              display: flex;
              justify-content: center;
              align-items: center;
              fill: ${({ theme }) => theme.color.white};
              ${applyMediaQuery('mobile')} {
                width: 328px;
                height: 219px;
                ${reverse ? 'height: 229px;' : 'height: 173px;'}
                h1 {
                  font-size: ${({ theme }) =>
                    theme.fontSize['header-24']} !important;
                }
              }
            `}
          >
            <Wrapper.Item
              css={css`
                width: 480px;
                height: 246px;
                display: flex;
                flex-direction: column;
                gap: 16px;
                ${applyMediaQuery('mobile')} {
                  width: 100%;
                  height: 219px;
                }
              `}
            >
              <Typography
                as="span"
                color="system-1"
                fontWeight="medium"
                style={{
                  width: '100%',
                  textAlign: 'start',
                  fontFamily: 'var(--font-inter)',
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
                {initialData.title}
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
                {truncateOnWord(initialData.contents, 100)}
              </Typography>
              {button && (
                <Link href={`/magazine/${initialData.id}`}>
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
          </Wrapper.Top>
          <Wrapper.Bottom
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
                width: 328px;
                height: 219px;
                .react-loading-skeleton {
                  width: 323px;
                  height: 219px;
                }
              }
            `}
          >
            {isFetching || isLoading ? (
              <Skeleton />
            ) : (
              <Image
                src={initialData.imgSrc}
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
                )} 328px`}
              />
            )}
          </Wrapper.Bottom>
        </Wrapper>
      )}
    </Container>
  );
};

export default MagazineBanner;
