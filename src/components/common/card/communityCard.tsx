import Avvvatars from 'avvvatars-react';
import Image from 'next/image';
import type { CommunityDto } from 'types/community';
import type { WithBlurredImage } from 'types/magazine';

import Container from '../container';
import Typography from '../typography';
import * as Styled from './card.styled';

const CommunityCard = ({
  profileSrc,
  imgSrc,
  title,
  nickName,
  base64,
  view,
  date,
  like,
}: WithBlurredImage<CommunityDto>) => {
  return (
    <Container>
      <Image
        src={thumbnailImgSrc}
        alt="thumbnail"
        width={285}
        height={180}
        placeholder="blur"
        blurDataURL={base64}
      />
      <Styled.CommunityUserWrapper>
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
          <Avvvatars value={nickName} size={24} radius={12} />
        )}
        <Typography
          as="span"
          fontSize="body-16"
          fontWeight="regular"
          color="greyScale-6"
        >
          {nickName}
        </Typography>
      </Styled.CommunityUserWrapper>
      <Styled.CommunityTitleWrapper>
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
      </Styled.CommunityTitleWrapper>
      <Styled.CommunityInfoWrapper></Styled.CommunityInfoWrapper>
    </Container>
  );
};

export default CommunityCard;
