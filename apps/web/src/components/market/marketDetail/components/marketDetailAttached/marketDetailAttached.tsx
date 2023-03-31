import { applyMediaQuery, Typography, Wrapper } from '@supercarmarket/ui';
import type { MarketAttachment } from '@supercarmarket/types/market';
import theme from 'constants/theme';
import * as React from 'react';
import { css } from 'styled-components';

import DownloadIcon from '../../../../../assets/svg/download.svg';

interface MarketDetailAttachedProps {
  registration: string;
  attrSrc: MarketAttachment[];
}

const MarketDetailAttached = ({ attrSrc }: MarketDetailAttachedProps) => {
  return (
    <Wrapper
      css={css`
        height: fit-content;
      `}
    >
      <Wrapper.Item
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          min-height: 140px;
          margin-top: 20px;
          padding: 30px 40px;
          border: 1px solid ${({ theme }) => theme.color['greyScale-3']};
          border-radius: 4px;
          box-sizing: border-box;

          ${applyMediaQuery('mobile')} {
            padding: 16px;
            min-height: initial;
          }
        `}
      >
        {attrSrc.map(({ originName, attAttachmentUrl }) => (
          <AttachedFile key={originName} url={attAttachmentUrl}>
            {originName}
          </AttachedFile>
        ))}
      </Wrapper.Item>
    </Wrapper>
  );
};

interface AttachedFileProps {
  children: React.ReactNode;
  url: string;
}

const AttachedFile = ({ children, url }: AttachedFileProps) => {
  return (
    <Wrapper.Item
      css={css`
        a {
          display: inline-flex;
          align-items: center;
          gap: 10px;

          :hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      `}
    >
      <a href={url}>
        <DownloadIcon
          width="12px"
          height="12px"
          fill={theme.color['greyScale-5']}
        />
        <Typography fontSize="body-16" lineHeight="150%">
          {children}
        </Typography>
      </a>
    </Wrapper.Item>
  );
};

export default MarketDetailAttached;
