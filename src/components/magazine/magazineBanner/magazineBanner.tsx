import Typography from 'components/common/typography';

import * as Styled from './magazineBanner.styled';

interface MagazineBannerProps {
  reverse?: boolean;
}

const MagazineBanner = ({}: MagazineBannerProps) => {
  return (
    <Styled.Container>
      <Styled.ContentsWrapper>
        <Typography
          as="span"
          color="system-1"
          style={{
            marginBottom: '16px',
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
          style={{
            marginBottom: '12px',
          }}
        >
          람보르기니 우루스 퍼포만테 더 슈퍼 SUV하다.
        </Typography>
        <Typography
          as="p"
          fontSize="body-16"
          color="black"
          fontWeight="regular"
          lineHeight="150%"
        >
          슈퍼하고도 슈퍼SUV모델 등장 람보르기니 우루스 퍼포만테 과연 우라칸의
          이어 갈 수 있을까? 오늘 소개해드릴 차량은 첫 등장부터 모두의 관심을
          받았고, 지금도 관심을 받고 있는 슈퍼 SUV입니다. 그것도 엄청난 ...
        </Typography>
      </Styled.ContentsWrapper>
      <Styled.ImageWrapper></Styled.ImageWrapper>
    </Styled.Container>
  );
};

export default MagazineBanner;
