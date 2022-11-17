import Container from 'components/common/container';
import Typography from 'components/common/typography';
import theme from 'constants/theme';
import React, { ReactNode } from 'react';

import DownloadIcon from '../../../../../assets/svg/download.svg';
import * as S from './market-detail-attached.styled';

interface MarketDetailAttachedProps {
  registration: string;
}

const MarketDetailAttached = ({ registration }: MarketDetailAttachedProps) => {
  return (
    <Container margin="0 0 80px 0">
      <Typography fontSize="header-24" fontWeight="bold">
        첨부파일
      </Typography>
      <S.AttachedCard>
        <AttachedFile>성능검사표1.jpg</AttachedFile>
        <AttachedFile>성능검사표2.jpg</AttachedFile>
        <AttachedFile>보험이력.pdf</AttachedFile>
      </S.AttachedCard>
    </Container>
  );
};

interface AttachedFileProps {
  children: ReactNode;
}

const AttachedFile = ({ children }: AttachedFileProps) => {
  return (
    <S.File>
      <a>
        <DownloadIcon
          width="12px"
          height="12px"
          fill={theme.color['greyScale-5']}
        />
        <Typography fontSize="body-16" lineHeight="150%">
          {children}
        </Typography>
      </a>
    </S.File>
  );
};

export default MarketDetailAttached;
