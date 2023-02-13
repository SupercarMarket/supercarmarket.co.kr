import { Typography, Wrapper } from '@supercarmarket/ui';
import type { MarketAttachment } from '@supercarmarket/types/market';
import theme from 'constants/theme';
import * as React from 'react';
import { css } from 'styled-components';

import DownloadIcon from '../../../../../assets/svg/download.svg';
import * as Styled from './marketDetailAttached.styled';

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
      <Styled.AttachedCard>
        {attrSrc.map(({ originName, attAttachmentUrl }) => (
          <AttachedFile key={originName} url={attAttachmentUrl}>
            {originName}
          </AttachedFile>
        ))}
      </Styled.AttachedCard>
    </Wrapper>
  );
};

interface AttachedFileProps {
  children: React.ReactNode;
  url: string;
}

const AttachedFile = ({ children, url }: AttachedFileProps) => {
  return (
    <Styled.File>
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
    </Styled.File>
  );
};

export default MarketDetailAttached;
