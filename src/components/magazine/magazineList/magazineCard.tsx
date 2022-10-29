import Container from 'components/common/container';
import Typography from 'components/common/typography';
import Image from 'next/image';
import { memo } from 'react';
import { MagazineDto, WithBlurredImage } from 'types/magazine';

const MagazineCard = memo(function MagazineCard({
  title,
  base64,
  imgSrc,
  contents,
}: WithBlurredImage<MagazineDto>) {
  return (
    <Container position="relative">
      <Image
        src={imgSrc}
        width={387}
        height={240}
        placeholder="blur"
        blurDataURL={base64}
        alt="thumbnail"
        layout="fixed"
        style={{
          borderRadius: '4px',
        }}
      />
      <Typography
        as="h2"
        fontSize="header-24"
        fontWeight="bold"
        color="greyScale-6"
        lineHeight="120%"
        style={{
          marginTop: '22px',
          marginBottom: '10px',
        }}
      >
        {title}
        {` `}
        <Typography
          as="b"
          color="system-1"
          lineHeight="120%"
        >{`(999)`}</Typography>
      </Typography>
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
      <Typography
        as="span"
        fontSize="body-16"
        fontWeight="regular"
        color="greyScale-5"
        lineHeight="150%"
        style={{
          lineHeight: '19.36px',
        }}
      >{`2022.09.01`}</Typography>
    </Container>
  );
});

export default MagazineCard;
