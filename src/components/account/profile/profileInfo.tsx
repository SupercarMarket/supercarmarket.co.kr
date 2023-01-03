import Avvvatars from 'avvvatars-react';
import Container from 'components/common/container';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import Link from 'next/link';

import CreateIcon from '../../../assets/svg/create.svg';
import { ProfileProps } from './profile';
import * as style from './profile.styled';

type ProfileInfoProps = Omit<ProfileProps, ''>;

interface ProfileInfoDetailProps {
  title: string;
  content: string;
}

const ProfileInfoDetail = ({ title, content }: ProfileInfoDetailProps) => {
  return (
    <Container display="grid" gridTemplateColumns="1fr 1fr">
      <Wrapper css={style.detail}>
        <Typography
          as="span"
          fontSize="body-14"
          fontWeight="regular"
          lineHeight="150%"
          color="greyScale-5"
        >
          {title}
        </Typography>
      </Wrapper>
      <Wrapper css={style.detail}>
        <Typography
          as="span"
          fontSize="body-14"
          fontWeight="regular"
          lineHeight="150%"
          color="greyScale-6"
        >
          {content}
        </Typography>
      </Wrapper>
    </Container>
  );
};

const ProfileInfo = ({ isMyAccountPage }: ProfileInfoProps) => {
  return (
    <Container
      display="flex"
      position="relative"
      flexDirection="column"
      width="330px"
      height="490px"
      boxSizing="border-box"
      border="1px solid #C3C3C7"
      borderRadius="20px"
      background="#fff"
      padding="40px 50px"
      gap="24px"
    >
      <Avvvatars value="blan19" size={116} />
      <Wrapper css={style.nickname}>
        <Typography
          as="span"
          fontSize="header-20"
          fontWeight="bold"
          color="greyScale-6"
          lineHeight="120%"
        >
          blan19
        </Typography>
        {isMyAccountPage && (
          <Link href={`/account/blan19/update`}>
            <Wrapper.Item css={style.svg}>
              <CreateIcon />
            </Wrapper.Item>
          </Link>
        )}
      </Wrapper>
      <Typography
        as="p"
        fontSize="body-14"
        fontWeight="regular"
        lineHeight="150%"
        color="greyScale-5"
      >
        소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개
      </Typography>
      <Wrapper>
        <ProfileInfoDetail title="등급" content="브론즈" />
        <ProfileInfoDetail title="가입일" content="2022.09.30" />
        <ProfileInfoDetail title="작성 글 수" content="245개" />
        <ProfileInfoDetail title="작성 댓글 수" content="1384개" />
        <ProfileInfoDetail title="방문일 수" content="366일" />
      </Wrapper>
    </Container>
  );
};

export default ProfileInfo;
