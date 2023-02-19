import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper';
import React from 'react';
import { css } from 'styled-components';

const PartnershipDetailCard = () => {
  return (
    <Wrapper.Top
      css={css`
        width: 100%;
        height: 100%;
        padding: 30px 40px;
        border: 1px solid ${({ theme }) => theme.color['greyScale-5']};
        border-radius: 4px;
        box-sizing: border-box;
      `}
    >
      <Typography
        as="h1"
        fontSize="header-36"
        fontWeight="bold"
        style={{ marginBottom: '42px' }}
      >
        슈퍼카타이어
      </Typography>
      <Wrapper.Bottom
        css={css`
          display: flex;
          flex-direction: column;
          gap: 15px;
        `}
      >
        <Information label="업종">공업사</Information>
        <Information label="취급품목">수입 타이어</Information>
        <Information label="업무시간">평일 09:00~18:00</Information>
        <Information label="홈페이지" margin="0 0 34px 0">
          https://supercarmarket.co.kr
        </Information>
        <Information label="대표자">금종선</Information>
        <Information label="주소">
          서울특별시 서초구 양재대로 36길11
        </Information>
        <Information label="전화번호">
          02-9166-5122 <Typography color="greyScale-5">|</Typography>{' '}
          010-6545-5265
        </Information>
      </Wrapper.Bottom>
    </Wrapper.Top>
  );
};

interface InformationProps {
  label: string;
  children?: React.ReactNode;
  margin?: React.CSSProperties['margin'];
}

const Information = ({ label, children, margin }: InformationProps) => {
  return (
    <Wrapper
      css={css`
        margin: ${margin};
      `}
    >
      <Wrapper.Left
        css={css`
          display: inline-block;
          width: 80px;
        `}
      >
        <Typography fontSize="body-14" color="greyScale-5" fontWeight="bold">
          {label}
        </Typography>
      </Wrapper.Left>
      <Typography fontSize="body-14">{children}</Typography>
    </Wrapper>
  );
};

export default PartnershipDetailCard;
