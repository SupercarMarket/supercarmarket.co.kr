import Container from 'components/common/container';
import Typography from 'components/common/typography';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { MagazineDto, WithBlurredImage } from 'types/magazine';

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
        <Image
          src={imgSrc}
          width={imgWidth}
          height={imgHeight}
          placeholder={base64 ? 'blur' : undefined}
          blurDataURL={base64 ? 'blur' : undefined}
          alt="thumbnail"
          style={{
            borderRadius: '4px',
          }}
        />
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
        >{`2022.09.01`}</Typography>
      </Container>
    </Link>
  );
});

export default MagazineCard;
