import Avvvatars from 'avvvatars-react';

import ChatIcon from '../../../assets/svg/chat.svg';
import EyeIcon from '../../../assets/svg/remove-red-eye.svg';
import Container from '../container';
import Typography from '../typography';
import Wrapper from '../wrapper';
import { PostingProps } from './posting';
import * as style from './posting.styled';

type PostingHeadProps = Omit<PostingProps, 'contentHtml'>;

const PostingHead = ({
  title,
  user,
  view,
  totalCommentCount,
  createAt,
}: PostingHeadProps) => {
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
          <Avvvatars value={user.nickName} size={40} />
          <Typography
            as="span"
            fontSize="body-14"
            fontWeight="regular"
            color="greyScale-6"
            lineHeight="120%"
          >
            {user.nickName}
          </Typography>
          <Typography
            as="span"
            fontSize="body-14"
            fontWeight="regular"
            color="greyScale-5"
            lineHeight="120%"
          >
            {createAt.toString()}
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
              {totalCommentCount}
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

export default PostingHead;
