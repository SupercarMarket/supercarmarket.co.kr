import clsx from 'clsx';
import Button from 'components/common/button';
import Typography from 'components/common/typography';
import useMagazine from 'hooks/queries/useMagazine';
import Image from 'next/image';

import Arrow from '../../../assets/svg/arrow-right.svg';
import * as Styled from './magazineBanner.styled';

interface MagazineBannerProps {
  reverse?: boolean;
  className?: string;
  button?: boolean;
}

const MagazineBanner = ({
  reverse,
  button,
  className,
}: MagazineBannerProps) => {
  const { data: magazine } = useMagazine();

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
      {magazine && (
        <>
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
              src={magazine.data[0].imgSrc}
              alt="thumbnail"
              width={590}
              height={394}
              placeholder="blur"
              blurDataURL={magazine.data[0].base64}
              style={{
                borderRadius: '4px',
              }}
              priority
            />
          </Styled.ImageWrapper>
        </>
      )}
    </Styled.Container>
  );
};

export default MagazineBanner;
