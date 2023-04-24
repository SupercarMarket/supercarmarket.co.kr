import {
  Container,
  Typography,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import type {
  MagazineDto,
  WithBlurredImage,
} from '@supercarmarket/types/magazine';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { css } from 'styled-components';
import useBase64 from 'hooks/queries/useBase64';
import Skeleton from 'react-loading-skeleton';
import { truncateOnWord } from '@supercarmarket/lib';
import dayjs from 'dayjs';

interface MagazineCardProps extends WithBlurredImage<MagazineDto> {
  type?: 'small' | 'normal';
}

const MagazineCard = memo(function MagazineCard({
  id,
  title,
  imgSrc,
  contents,
  comments,
  created,
  type = 'normal',
}: MagazineCardProps) {
  const {
    data: base64,
    isFetching,
    isLoading,
  } = useBase64(
    imgSrc || `${process.env.NEXT_PUBLIC_URL}/images/base.png`,
    {
      src: imgSrc,
      category: 'magazine',
    },
    {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: Infinity,
    }
  );
  const imgWidth = type === 'normal' ? 387 : 285;
  const imgHeight = type === 'normal' ? 240 : 180;
  const marginBottom = type === 'normal' ? '22px' : '20px';
  const headingFontSize = type === 'normal' ? 'header-24' : 'header-16';
  const bodyFontSize = type === 'normal' ? 'body-16' : 'body-14';
  const visible = type === 'normal';

  return (
    <Link
      href={`/magazine/${id}`}
      style={{
        cursor: 'pointer',
      }}
    >
      <Container position="relative" display="flex" flexDirection="column">
        <Wrapper.Item
          css={css`
            position: relative;
            width: ${imgWidth}px;
            height: ${imgHeight}px;
            margin-bottom: ${marginBottom};
            .react-loading-skeleton {
              width: ${imgWidth}px;
              height: ${imgHeight}px;
              border-radius: 4px;
            }
            ${applyMediaQuery('mobile')} {
              width: 160px;
              height: 106px;
              margin-bottom: 8px;
              .react-loading-skeleton {
                width: 160px;
                height: 106px;
              }
            }
          `}
        >
          {isFetching || isLoading ? (
            <Skeleton />
          ) : (
            <Image
              src={imgSrc}
              fill
              placeholder="blur"
              blurDataURL={base64?.data.base64}
              alt="thumbnail"
              style={{
                objectFit: 'cover',
                borderRadius: '4px',
              }}
              sizes={`${applyMediaQuery('desktop')} 387px, ${applyMediaQuery(
                'mobile'
              )} 167.5px`}
            />
          )}
        </Wrapper.Item>
        <Wrapper.Item
          css={css`
            display: flex;
            flex-direction: column;
            ${applyMediaQuery('mobile')} {
              p {
                display: none !important;
              }
              h2 {
                font-size: ${({ theme }) =>
                  theme.fontSize['body-16']} !important;
                font-weight: ${({ theme }) =>
                  theme.fontWeight.regular} !important;
              }
              span {
                font-size: ${({ theme }) =>
                  theme.fontSize['body-14']} !important;
              }
            }
          `}
        >
          <Typography
            as="h2"
            fontSize={headingFontSize}
            fontWeight="bold"
            color="greyScale-6"
            lineHeight="120%"
            style={{
              marginBottom: '10px',
            }}
          >
            {title}
            {` `}
            <Typography
              as="b"
              color="system-1"
              lineHeight="120%"
            >{`(${comments})`}</Typography>
          </Typography>
          {visible && (
            <Typography
              as="p"
              fontSize="body-16"
              fontWeight="regular"
              color="greyScale-5"
              lineHeight="150%"
              style={{
                marginBottom: '10px',
              }}
            >
              {truncateOnWord(contents, 80)}
            </Typography>
          )}
          <Typography
            as="span"
            fontSize={bodyFontSize}
            fontWeight="regular"
            color="greyScale-5"
            lineHeight="150%"
            style={{
              lineHeight: '19.36px',
            }}
          >
            {dayjs(created).format('YYYY.MM.DD')}
          </Typography>
        </Wrapper.Item>
      </Container>
    </Link>
  );
});

export default MagazineCard;
