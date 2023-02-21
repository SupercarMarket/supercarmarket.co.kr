import { CommunityPostDto } from '@supercarmarket/types/community';
import { Container, Typography, Wrapper } from '@supercarmarket/ui';

import Avvvatars from 'avvvatars-react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Posting } from '@supercarmarket/types/base';

import ChatIcon from '../../../assets/svg/chat.svg';
import EyeIcon from '../../../assets/svg/remove-red-eye.svg';
import * as style from './posting.styled';

const PostingHeadMagainze = ({
  title,
  user,
  view,
  totalCommentCount,
  createAt,
  imgSrc,
}: Omit<Posting & { imgSrc: string }, 'contentHtml'>) => {
  return (
    <Container
      position="relative"
      display="flex"
      height="360px"
      flexDirection="column"
      gap="6px"
      borderBottom="1px solid #EAEAEC"
      boxSizing="border-box"
      background="rgba(0, 0, 0, 0.5)"
    >
      <Image
        src={imgSrc}
        alt="thumbnail"
        fill
        style={{
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <Wrapper css={style.title}>
        <Typography
          as="h2"
          fontSize="header-24"
          fontWeight="regular"
          color="white"
          lineHeight="150%"
        >
          {title}
        </Typography>
        <Wrapper.Left css={style.magazineHeadLeft}>
          <Avvvatars value={user.nickName} size={40} />
          <Typography
            as="span"
            fontSize="body-14"
            fontWeight="regular"
            color="white"
            lineHeight="120%"
          >
            {user.nickName}
          </Typography>
          <Typography
            as="span"
            fontSize="body-14"
            fontWeight="regular"
            color="white"
            lineHeight="120%"
          >
            {createAt.toString()}
          </Typography>
        </Wrapper.Left>
        <Wrapper.Right css={style.magazineHeadRight}>
          <Wrapper css={style.wrapper}>
            <ChatIcon />
            <Typography
              as="span"
              fontSize="body-14"
              fontWeight="regular"
              color="white"
              lineHeight="120%"
            >
              {totalCommentCount}
            </Typography>
          </Wrapper>
          <Wrapper css={style.wrapper}>
            <EyeIcon />
            <Typography
              as="span"
              fontSize="body-14"
              fontWeight="regular"
              color="white"
              lineHeight="120%"
            >
              {view}
            </Typography>
          </Wrapper>
        </Wrapper.Right>
      </Wrapper>
    </Container>
  );
};

const PostingHeadCommunity = ({
  title,
  nickname,
  view,
  comments,
  created,
  updated,
}: CommunityPostDto) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      gap="6px"
      borderBottom="1px solid #EAEAEC"
      boxSizing="border-box"
    >
      <Wrapper.Top>
        <Typography
          as="h2"
          fontSize="header-24"
          fontWeight="regular"
          color="greyScale-6"
          lineHeight="150%"
        >
          {title}
        </Typography>
      </Wrapper.Top>
      <Wrapper.Bottom css={style.bottom}>
        <Wrapper.Left css={style.left}>
          <Avvvatars value={nickname} size={40} />
          <Typography
            as="span"
            fontSize="body-14"
            fontWeight="regular"
            color="greyScale-6"
            lineHeight="120%"
          >
            {nickname}
          </Typography>
          <Typography
            as="span"
            fontSize="body-14"
            fontWeight="regular"
            color="greyScale-5"
            lineHeight="120%"
          >
            {dayjs(created).format('YYYY-MM-DD')}
          </Typography>
        </Wrapper.Left>
        <Wrapper.Right css={style.right}>
          <Wrapper css={style.wrapper}>
            <ChatIcon />
            <Typography
              as="span"
              fontSize="body-14"
              fontWeight="regular"
              color="greyScale-5"
              lineHeight="120%"
            >
              {comments}
            </Typography>
          </Wrapper>
          <Wrapper css={style.wrapper}>
            <EyeIcon />
            <Typography
              as="span"
              fontSize="body-14"
              fontWeight="regular"
              color="greyScale-5"
              lineHeight="120%"
            >
              {view}
            </Typography>
          </Wrapper>
        </Wrapper.Right>
      </Wrapper.Bottom>
    </Container>
  );
};

export { PostingHeadCommunity, PostingHeadMagainze };
