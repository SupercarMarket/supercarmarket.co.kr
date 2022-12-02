import Avvvatars from 'avvvatars-react';

import ChatIcon from '../../../assets/svg/chat.svg';
import EyeIcon from '../../../assets/svg/remove-red-eye.svg';
import Container from '../container';
import Typography from '../typography';
import {
  PostingHeadBottom,
  PostingHeadBottomLeft,
  PostingHeadBottomRight,
  PostingHeadBottomRightWrapper,
  PostingHeadTop,
} from './posting.styled';

const PostingHead = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      gap="6px"
      borderBottom="1px solid #EAEAEC"
      boxSizing="border-box"
    >
      <PostingHeadTop>
        <Typography
          as="h2"
          fontSize="header-24"
          fontWeight="regular"
          color="greyScale-6"
          lineHeight="150%"
        >
          제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄제목총100글자두줄
        </Typography>
      </PostingHeadTop>
      <PostingHeadBottom>
        <PostingHeadBottomLeft>
          <Avvvatars value="금종선" size={40} />
          <Typography
            as="span"
            fontSize="body-14"
            fontWeight="regular"
            color="greyScale-6"
            lineHeight="120%"
          >
            슈퍼카마켓슈퍼카마켓
          </Typography>
          <Typography
            as="span"
            fontSize="body-14"
            fontWeight="regular"
            color="greyScale-5"
            lineHeight="120%"
          >
            2022. 9. 14 16:24
          </Typography>
        </PostingHeadBottomLeft>
        <PostingHeadBottomRight>
          <PostingHeadBottomRightWrapper>
            <ChatIcon />
            <Typography
              as="span"
              fontSize="body-14"
              fontWeight="regular"
              color="greyScale-5"
              lineHeight="120%"
            >
              15554
            </Typography>
          </PostingHeadBottomRightWrapper>
          <PostingHeadBottomRightWrapper>
            <EyeIcon />
            <Typography
              as="span"
              fontSize="body-14"
              fontWeight="regular"
              color="greyScale-5"
              lineHeight="120%"
            >
              12
            </Typography>
          </PostingHeadBottomRightWrapper>
        </PostingHeadBottomRight>
      </PostingHeadBottom>
    </Container>
  );
};

export default PostingHead;
