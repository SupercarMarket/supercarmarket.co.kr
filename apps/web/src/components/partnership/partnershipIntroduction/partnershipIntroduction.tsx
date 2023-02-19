import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import React from 'react';
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
        `}
      >
        업체 소개 내용입니다.
      </Wrapper.Bottom>
    </>
  );
};

export default PartnershipIntroduction;
