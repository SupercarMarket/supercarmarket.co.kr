import clsx from 'clsx';
import Button from 'components/common/button';
import Typography from 'components/common/typography';
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
          람보르기니 우루스 퍼포만테 더 슈퍼 SUV하다.
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
          슈퍼하고도 슈퍼SUV모델 등장 람보르기니 우루스 퍼포만테 과연 우라칸의
          이어 갈 수 있을까? 오늘 소개해드릴 차량은 첫 등장부터 모두의 관심을
          받았고, 지금도 관심을 받고 있는 슈퍼 SUV입니다. 그것도 엄청난 ...
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
          src="https://user-images.githubusercontent.com/66871265/196571825-f136a62d-15f3-4d21-a709-8ea0fd77f98a.png"
          alt="thumbnail"
          layout="fixed"
          width={590}
          height={394}
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
