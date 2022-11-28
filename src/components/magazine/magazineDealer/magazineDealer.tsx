import Avvvatars from 'avvvatars-react';
import Button from 'components/common/button';
import Container from 'components/common/container';
import Typography from 'components/common/typography';

import {
  MagazineDealerLeft,
  MagazineDealerLeftWrapper,
  MagazineDealerRight,
} from './magazine.styled';

const MagazineDealer = () => {
  return (
    <Container
      display="flex"
      justifyContent="space-between"
      border="1px solid #EAEAEC"
      borderRadius="4px"
      padding="30px 40px"
    >
      <MagazineDealerLeft>
        <Avvvatars value="금종선" size={80} />
        <MagazineDealerLeftWrapper>
          <Typography
            as="h4"
            fontSize="header-24"
            fontWeight="bold"
            lineHeight="150%"
            color="greyScale-6"
            space
          >
            금기사 금종선
          </Typography>
          <Typography
            as="p"
            fontSize="body-16"
            fontWeight="regular"
            lineHeight="150%"
            color="greyScale-5"
            space
          >
            금기사 금종선입니다!
          </Typography>
        </MagazineDealerLeftWrapper>
      </MagazineDealerLeft>
      <MagazineDealerRight>
        <Typography
          as="p"
          fontSize="body-14"
          fontWeight="regular"
          lineHeight="150%"
          color="greyScale-6"
          space
        >{`더 자세한 정보를 원하신다면\n언제든지 문의 주세요.`}</Typography>
        <Button variant="Primary">상담 신청</Button>
      </MagazineDealerRight>
    </Container>
  );
};

export default MagazineDealer;
