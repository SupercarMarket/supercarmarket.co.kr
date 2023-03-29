import { CommunityPostDto } from '@supercarmarket/types/community';
import {
  applyMediaQuery,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Posting } from '@supercarmarket/types/base';
import ChatIcon from '../../../assets/svg/chat.svg';
import EyeIcon from '../../../assets/svg/eye.svg';
import * as style from './posting.styled';
import { PostingProps } from './posting';
import { formatter } from 'components/community/communityCard/communityCard';
import { css } from 'styled-components';
import Avatar from '../avatar';
import { truncateOnWord } from '@supercarmarket/lib';
import Link from 'next/link';

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
        sizes={`${applyMediaQuery('desktop')} 1200px, ${applyMediaQuery(
          'mobile'
        )} 425px`}
      />
      <Wrapper
        css={css`
          position: relative;
          height: 100%;
          display: flex;
          padding: 0 40px;
          flex-direction: column;
          ${applyMediaQuery('mobile')} {
            padding: 0 16px;
          }
        `}
      >
        <Wrapper.Item
          css={css`
            flex: 1;
            padding: 40px 0;
            display: flex;
            align-items: center;
            ${applyMediaQuery('mobile')} {
              padding: 24px 0;
            }
          `}
        >
          <Typography
            as="h2"
            fontSize="header-24"
            fontWeight="regular"
            color="white"
            lineHeight="150%"
          >
            {truncateOnWord(title, 100)}
          </Typography>
        </Wrapper.Item>
        <Wrapper.Item
          css={css`
            display: flex;
            justify-content: space-between;
            padding-bottom: 40px;
            ${applyMediaQuery('mobile')} {
              flex-direction: column;
              padding-bottom: 24px;
              gap: 8px;
            }
          `}
        >
          <Wrapper.Left css={style.magazineHeadLeft}>
            <Avatar
              rating="6"
              size={40}
              nickname={user.nickname}
              option={{
                darkMode: true,
              }}
            />
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
            <Wrapper
              css={css`
                display: flex;
                align-items: center;
                gap: 4px;
                & > svg {
                  width: 16px;
                  height: 16px;
                  fill: ${({ theme }) => theme.color.white};
                }
              `}
            >
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
            <Wrapper
              css={css`
                display: flex;
                align-items: center;
                gap: 4px;
                & > svg {
                  width: 16px;
                  height: 16px;
                  fill: ${({ theme }) => theme.color.white};
                }
              `}
            >
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
        </Wrapper.Item>
      </Wrapper>
    </Container>
  );
};

const PostingHeadCommunity = ({
  title,
  user,
  view,
  comments,
  created,
  updated,
  category = 'report',
}: CommunityPostDto & Pick<PostingProps, 'category'>) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      gap="6px"
      borderBottom="1px solid #EAEAEC"
      boxSizing="border-box"
    >
      <Wrapper.Top
        css={css`
          display: flex;
          flex-direction: column;
          gap: 6px;
        `}
      >
        <Typography
          fontSize="body-16"
          fontWeight="regular"
          color="primary"
          lineHeight="150%"
        >
          {formatter(category)} {`>`}
        </Typography>
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
          <Link href={`/account/${user.id}`}>
            <Avatar rating={user.rate} size={40} nickname={user.nickname} />
          </Link>
          <Typography
            as="span"
            fontSize="body-14"
            fontWeight="regular"
            color="greyScale-5"
            lineHeight="120%"
          >
            {dayjs(created).format('YYYY.MM.DD HH:MM')}
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
