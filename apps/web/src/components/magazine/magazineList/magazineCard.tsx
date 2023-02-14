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

interface MagazineCardProps extends WithBlurredImage<MagazineDto> {
  type?: 'small' | 'normal';
}

const MagazineCard = memo(function MagazineCard({
  id,
  title,
  base64,
  imgSrc,
  contents,
  comments,
  type = 'normal',
}: MagazineCardProps) {
  const imgWidth = type === 'normal' ? 387 : 285;
  const imgHeight = type === 'normal' ? 240 : 180;
  const headingFontSize = type === 'normal' ? 'header-24' : 'header-16';
  const headingMarginTop = type === 'normal' ? '22px' : '20px';
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

            ${applyMediaQuery('mobile')} {
              ${type === 'small' && 'width: 178px;'}
              ${type === 'small' && 'height: 120px;'}
            }
          `}
        >
          <Image
            src={imgSrc}
            fill
            placeholder={base64 ? 'blur' : undefined}
            blurDataURL={base64 ? base64 : undefined}
            alt="thumbnail"
            style={{
              borderRadius: '4px',
            }}
          />
        </Wrapper.Item>
        <Typography
          as="h2"
          fontSize={headingFontSize}
          fontWeight="bold"
          color="greyScale-6"
          lineHeight="120%"
          style={{
            marginTop: headingMarginTop,
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
            {contents}
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
          2022.09.01
        </Typography>
      </Container>
    </Link>
  );
});

export default MagazineCard;
