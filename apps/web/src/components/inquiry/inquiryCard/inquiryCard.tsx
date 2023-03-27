import { Container, Typography, Wrapper } from '@supercarmarket/ui';
import type { InquiryDto } from '@supercarmarket/types/inquiry';
import { css } from 'styled-components';
import dayjs from 'dayjs';

const InquiryCard = (props: InquiryDto) => {
  const { title, category, created, progress } = props;
  return (
    <Container display="flex" padding="20px 0" background="#fff">
      <Wrapper.Item
        css={css`
          width: 200px;
          text-align: center;
        `}
      >
        <Typography
          width="200px"
          fontSize="body-14"
          fontWeight="regular"
          lineHeight="150%"
          color="greyScale-6"
        >
          {category}
        </Typography>
      </Wrapper.Item>
      <Wrapper.Item
        css={css`
          flex: 1;
          text-align: center;
        `}
      >
        <Typography
          fontSize="body-14"
          fontWeight="regular"
          lineHeight="150%"
          color="greyScale-6"
        >
          {title}
        </Typography>
      </Wrapper.Item>
      <Wrapper.Item
        css={css`
          width: 140px;
          text-align: center;
        `}
      >
        <Typography
          fontSize="body-14"
          fontWeight="regular"
          lineHeight="150%"
          color="greyScale-6"
        >
          {dayjs(created).format('HH:mm')}
        </Typography>
      </Wrapper.Item>
      <Wrapper.Item
        css={css`
          width: 140px;
          text-align: center;
        `}
      >
        <Typography
          fontSize="body-14"
          fontWeight="regular"
          lineHeight="150%"
          color="greyScale-6"
        >
          {progress}
        </Typography>
      </Wrapper.Item>
    </Container>
  );
};

export default InquiryCard;
