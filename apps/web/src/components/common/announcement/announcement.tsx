import * as React from 'react';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';
import {
  applyMediaQuery,
  Button,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import ArrowRight from '../../../assets/svg/arrow-right.svg';

interface BannerProps {
  title: string;
  subtitle?: string;
  btnTitle: string;
  url: string;
}

const Announcement = ({ title, subtitle, btnTitle, url }: BannerProps) => {
  const { push } = useRouter();

  const moveToUrl = () => {
    push(url);
  };

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
          padding: 24px;
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
          {title}
        </Typography>
        {subtitle && (
          <Typography fontSize="body-14" color="greyScale-5" lineHeight="150%">
            {subtitle}
          </Typography>
        )}
      </Wrapper.Top>
      <Wrapper.Bottom
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Button
          variant="Black"
          border="rounded"
          suffix={<ArrowRight fill="white" />}
          onClick={moveToUrl}
        >
          {btnTitle}
        </Button>
      </Wrapper.Bottom>
    </Wrapper>
  );
};

export default React.memo(Announcement);
