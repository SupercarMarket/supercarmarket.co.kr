import {
  applyMediaQuery,
  Button,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import Link from 'next/link';
import { css } from 'styled-components';
import * as React from 'react';

import ArrowRight from '../../../assets/svg/arrow-right.svg';

const MarketBanner = () => {
  return (
    <Wrapper
      css={css`
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 34px 40px;
        background: ${({ theme }) => theme.color['greyScale-2']};
        border-radius: 4px;

        ${applyMediaQuery('mobile')} {
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }
      `}
    >
      <Wrapper.Top
        css={css`
          display: flex;
          flex-direction: column;
          gap: 4px;
        `}
      >
        <Typography fontSize="header-24" fontWeight="bold" display="block">
          판매차량 등록을 원하시나요?
        </Typography>
        <Typography fontSize="body-14" color="greyScale-5" lineHeight="150%">
          판매차량 등록 문의는 딜러 등록을 완료한 후에 가능합니다.
        </Typography>
      </Wrapper.Top>
      <Wrapper.Bottom
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Link href="/inquiry/market">
          <Button
            variant="Black"
            border="rounded"
            suffix={<ArrowRight fill="white" />}
          >
            등록 문의하기
          </Button>
        </Link>
      </Wrapper.Bottom>
    </Wrapper>
  );
};

export default React.memo(MarketBanner);
