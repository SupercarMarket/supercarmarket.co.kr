import {
  applyMediaQuery,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import type { InquiryDto } from '@supercarmarket/types/inquiry';
import { css } from 'styled-components';
import dayjs from 'dayjs';
import { isToday } from 'utils/misc';
import { inquiryStatusFormatter } from '@supercarmarket/lib';

const InquiryCard = (props: InquiryDto) => {
  const { title, category, created, status } = props;

  const today = isToday(created);
  return (
    <Container width="100%">
      <Wrapper
        css={css`
          display: flex;
          padding: 20px 0;
          background-color: ${({ theme }) => theme.color.white};
          ${applyMediaQuery('mobile')} {
            padding: 0;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            border-bottom: 1px solid
              ${({ theme }) => theme.color['greyScale-3']};
          }
        `}
      >
        <Wrapper.Item
          css={css`
            width: 200px;
            text-align: center;
            ${applyMediaQuery('mobile')} {
              display: none;
            }
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
            display: flex;
            text-align: center;
            strong {
              width: 140px;
              display: none !important;
            }
            span {
              width: 140px;
            }
            ${applyMediaQuery('mobile')} {
              gap: 8px;
              strong {
                width: fit-content;
                display: block !important;
              }
              span {
                width: fit-content;
              }
            }
          `}
        >
          <Typography
            as="strong"
            fontSize="body-14"
            fontWeight="regular"
            lineHeight="150%"
            color="greyScale-5"
          >
            {category}
          </Typography>
          <Typography
            fontSize="body-14"
            fontWeight="regular"
            lineHeight="150%"
            color="greyScale-6"
          >
            {today
              ? dayjs(created).format('HH:mm')
              : dayjs(created).format('YYYY-MM-DD')}
          </Typography>
          <Typography
            fontSize="body-14"
            fontWeight="regular"
            lineHeight="150%"
            color="greyScale-6"
          >
            {inquiryStatusFormatter(status)}
          </Typography>
        </Wrapper.Item>
      </Wrapper>
    </Container>
  );
};

export default InquiryCard;
