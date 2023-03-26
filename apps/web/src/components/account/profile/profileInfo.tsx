import {
  applyMediaQuery,
  Container,
  theme,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import Avatar from 'components/common/avatar';
import { ratingFormatter } from 'components/common/avatar/avatar';
import dayjs from 'dayjs';
import Link from 'next/link';
import { css } from 'styled-components';
import { ProfileProps } from './profile';
import * as style from './profile.styled';

type ProfileInfoProps = ProfileProps & { sub: string };

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

const ProfileInfo = ({ isMyAccountPage, profile, sub }: ProfileInfoProps) => {
  return (
    <Wrapper
      css={css`
        display: flex;
        position: relative;
        flex-direction: column;
        width: 330px;
        height: 490px;
        box-sizing: border-box;
        border: 1px solid #c3c3c7;
        border-radius: 20px;
        background: #fff;
        padding: 40px 50px;
        gap: 24px;
        ${applyMediaQuery('mobile')} {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          padding: 24px;
          height: 100%;
          border: 1px solid ${theme.color.white};
        }
      `}
    >
      <Wrapper.Item
        css={css`
          display: flex;
          flex-direction: column;
          ${applyMediaQuery('mobile')} {
            flex-direction: row-reverse;
            width: 100%;
            justify-content: space-between;
            align-items: flex-end;
          }
        `}
      >
        <Avatar
          rating={profile.userRating}
          size={116}
          option={{
            mobile: '78',
          }}
        />
        <Typography
          as="span"
          fontSize="header-20"
          fontWeight="bold"
          color="greyScale-6"
          lineHeight="120%"
        >
          {profile.nickname}
        </Typography>
      </Wrapper.Item>
      <Typography
        as="p"
        fontSize="body-14"
        fontWeight="regular"
        lineHeight="150%"
        color="greyScale-5"
      >
        {profile.description ? profile.description : '소개글을 작성해주세요.'}
      </Typography>
      <Wrapper.Item>
        <ProfileInfoDetail
          title="등급"
          content={ratingFormatter(profile.userRating, { reverse: true })}
        />
        <ProfileInfoDetail
          title="가입일"
          content={dayjs(profile.createdDate).format('YYYY.MM.DD')}
        />
        <ProfileInfoDetail
          title="작성 글 수"
          content={`${profile.boardCount}`}
        />
        <ProfileInfoDetail
          title="작성 댓글 수"
          content={`${profile.commentCount}`}
        />
        <ProfileInfoDetail
          title="방문일 수"
          content={`${profile.visitCount}`}
        />
      </Wrapper.Item>
      {isMyAccountPage && (
        <Wrapper.Item
          css={css`
            display: flex;
            gap: 16px;
          `}
        >
          <Link href={`/account/${sub}/update`}>
            <Typography
              fontSize="body-12"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-5"
              style={{
                textDecoration: 'underline',
              }}
            >
              회원정보 수정
            </Typography>
          </Link>
          <Link href={`/account/${sub}/update-password`}>
            <Typography
              fontSize="body-12"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-5"
              style={{
                textDecoration: 'underline',
              }}
            >
              비밀번호 수정
            </Typography>
          </Link>
        </Wrapper.Item>
      )}
    </Wrapper>
  );
};

export default ProfileInfo;
