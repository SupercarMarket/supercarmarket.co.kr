import clsx from 'clsx';
import Button from 'components/common/button';
import Typography from 'components/common/typography';
import Image from 'next/image';
import { MagazineDto, WithBlurredImage } from 'types/magazine';

import Arrow from '../../../assets/svg/arrow-right.svg';
import * as Styled from './magazineBanner.styled';

interface MagazineBannerProps {
  data: WithBlurredImage<MagazineDto>;
  reverse?: boolean;
  className?: string;
  button?: boolean;
}

const MagazineBanner = ({
  reverse,
  button,
  className,
  data,
}: MagazineBannerProps) => {
  return (
    <Styled.Container
      className={clsx(
        'mb',
        {
          [`mb-reverse`]: reverse,
        },
        className
      )}
    >
      <Styled.ContentsWrapper>
        <Typography
          as="span"
          color="system-1"
          style={{
            width: '480px',
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
          {data.title}
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
          {data.contents}
        </Typography>
        {button && (
          <Styled.ButtonWrapper>
            <Button
              variant="Black"
              border="rounded"
              type="button"
              suffix={<Arrow />}
            >
              보러가기
            </Button>
          </Styled.ButtonWrapper>
        )}
      </Styled.ContentsWrapper>
      <Styled.ImageWrapper>
        <Image
          src={data.imgSrc}
          alt="thumbnail"
          width={590}
          height={394}
          placeholder="blur"
          blurDataURL={data.base64}
          style={{
            borderRadius: '4px',
          }}
          priority
        />
      </Styled.ImageWrapper>
    </Styled.Container>
  );
};

export default MagazineBanner;
