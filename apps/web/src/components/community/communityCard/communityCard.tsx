import Avvvatars from 'avvvatars-react';
import Container from 'components/common/container';
import Divider from 'components/common/divider';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import Image from 'next/image';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import type { CommunityDto } from 'types/community';
import type { WithBlurredImage } from 'types/magazine';

import * as style from './communityCard.style';

interface CommunityCardProps extends WithBlurredImage<CommunityDto> {
  variant: 'row' | 'column';
}

type CommunityCardChildrenProps = Omit<CommunityCardProps, 'variant'>;

const CommunityCard = ({ variant, ...rest }: CommunityCardProps) => {
  return {
    column: <CommunityCardColumn {...rest} />,
    row: <CommunityCardRow {...rest} />,
  }[variant];
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

const CommunityCardColumn = (props: CommunityCardChildrenProps) => {
  const { imgSrc, base64, profileSrc, nickname, title } = props;
  return (
    <Container>
      <Wrapper.Item
        css={css`
          position: relative;
          width: 285px;
          height: 180px;
          ${applyMediaQuery('mobile')} {
            width: 178px;
            height: 120px;
          }
        `}
      >
        <Image
          src={imgSrc}
          alt="thumbnail"
          fill
          placeholder={base64 ? 'blur' : undefined}
          blurDataURL={base64 ? base64 : undefined}
        />
      </Wrapper.Item>
      <Wrapper.Item
        css={css`
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
        `}
      >
        {profileSrc ? (
          <Image
            src={profileSrc}
            alt="profile"
            width={24}
            height={24}
            style={{
              borderRadius: '12px',
            }}
          />
        ) : (
          <Avvvatars value={nickname} size={24} radius={12} />
        )}
        <Typography
          as="span"
          fontSize="body-16"
          fontWeight="regular"
          color="greyScale-6"
        >
          {nickname}
        </Typography>
      </Wrapper.Item>
      <Wrapper
        css={css`
          margin-top: 10px;
        `}
      >
        <Typography
          as="h2"
          fontSize="header-16"
          fontWeight="bold"
          color="greyScale-6"
        >
          {title}
        </Typography>
        <Typography
          as="h2"
          fontSize="header-16"
          fontWeight="bold"
          color="system-1"
        ></Typography>
      </Wrapper>
    </Container>
  );
};

export default CommunityCard;
