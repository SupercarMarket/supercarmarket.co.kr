import { applyMediaQuery, Typography, Wrapper } from '@supercarmarket/ui';
import * as React from 'react';
import { css } from 'styled-components';

interface PartnershipIntroductionProps {
  introduction?: string;
}

const PartnershipIntroduction = ({
  introduction,
}: PartnershipIntroductionProps) => {
  return (
    <>
      <Typography
        fontSize="header-24"
        fontWeight="bold"
        style={{ marginBottom: '14px' }}
      >
        업체 소개
      </Typography>
      <Wrapper.Bottom
        css={css`
          width: 100%;
          height: 970px;
          border: 1px solid ${({ theme }) => theme.color['greyScale-3']};
          border-radius: 4px;
          padding: 30px 40px;
          box-sizing: border-box;
          margin-bottom: 80px;

          ${applyMediaQuery('mobile')} {
            padding: 16px;
            height: 305px;
            margin-bottom: 32px;
          }
        `}
      >
        {introduction}
      </Wrapper.Bottom>
    </>
  );
};

export default PartnershipIntroduction;
