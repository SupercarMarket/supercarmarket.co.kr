import Avvvatars from 'avvvatars-react';
import Container from 'components/common/container';
import Divider from 'components/common/divider';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import Image from 'next/image';

import * as style from './communityCard.style';

interface CommunityCardProps {
  variant: 'row' | 'column';
  popular?: boolean;
}

type CommunityCardChildrenProps = Omit<CommunityCardProps, 'variant'>;

const CommunityCard = ({ variant, ...rest }: CommunityCardProps) => {
  switch (variant) {
    case 'row':
      return <CommunityCardRow {...rest} />;
    case 'column':
      return <CommunityCardColumn {...rest} />;
  }
};

const CommunityCardRow = ({}: CommunityCardChildrenProps) => {
  return (
    <>
      <Container display="flex" alignItems="center">
        <Wrapper.Left css={style.rowLeft}>
          <Image
            src="https://user-images.githubusercontent.com/66871265/210489106-611e72ee-94f8-49e8-9faa-60f9f20ae50f.png"
            alt="thumbnail"
            width={196}
            height={124}
            style={{ borderRadius: '4px' }}
          />
          <Wrapper.Item css={style.rowTitle}>
            <Typography
              as="b"
              fontSize="header-16"
              fontWeight="bold"
              color="system-1"
              lineHeight="120%"
            >
              인기
            </Typography>
            <Typography
              as="span"
              fontSize="body-16"
              fontWeight="regular"
              color="greyScale-5"
              lineHeight="150%"
            >{`[제보]`}</Typography>
            <Typography
              as="span"
              fontSize="body-16"
              fontWeight="regular"
              color="greyScale-6"
              lineHeight="150%"
            >
              새 차 무사고 기원하며 인증합니다!
            </Typography>
            <Typography
              as="span"
              fontSize="body-16"
              fontWeight="regular"
              color="system-1"
              lineHeight="150%"
            >{`(12)`}</Typography>
          </Wrapper.Item>
        </Wrapper.Left>
        <Wrapper.Right css={style.rowRight}>
          <Wrapper.Item css={style.rowUser}>
            <Avvvatars size={40} value="blan19" />
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              color="greyScale-6"
              lineHeight="150%"
            >
              blan19
            </Typography>
          </Wrapper.Item>
          <Typography
            fontSize="body-14"
            fontWeight="regular"
            color="greyScale-6"
            lineHeight="150%"
          >
            16:24
          </Typography>
          <Typography
            fontSize="body-14"
            fontWeight="regular"
            color="greyScale-6"
            lineHeight="150%"
          >
            64792
          </Typography>
          <Typography
            fontSize="body-14"
            fontWeight="regular"
            color="greyScale-6"
            lineHeight="150%"
          >
            999
          </Typography>
        </Wrapper.Right>
      </Container>
      <Divider color="#EAEAEC" width="100%" height="1px" margin="6px 0" />
    </>
  );
};

const CommunityCardColumn = ({}: CommunityCardChildrenProps) => {
  return (
    <Container>
      <h1>Column</h1>
    </Container>
  );
};

export default CommunityCard;
