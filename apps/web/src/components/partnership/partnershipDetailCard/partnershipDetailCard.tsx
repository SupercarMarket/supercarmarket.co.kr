import { WithBlurredImage } from '@supercarmarket/types/base';
import { Typography, Wrapper } from '@supercarmarket/ui';
import React from 'react';
import { css } from 'styled-components';
import { PartnershipDetailDto } from 'types/partnership';

interface PartnershipDetailCard {
  info: Omit<
    PartnershipDetailDto<WithBlurredImage<string>>,
    'imgSrc' | 'introduction' | 'description'
  >;
}

const PartnershipDetailCard = ({ info }: PartnershipDetailCard) => {
  const {
    address,
    category,
    owner,
    partnerName,
    phone,
    production,
    workTime,
    tel,
    siteUrl,
  } = info;
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
        {partnerName}
      </Typography>
      <Wrapper.Bottom
        css={css`
          display: flex;
          flex-direction: column;
          gap: 15px;
        `}
      >
        <Information label="업종">{category}</Information>
        <Information label="취급품목">{production}</Information>
        <Information label="업무시간">{workTime}</Information>
        <Information label="홈페이지" margin="0 0 34px 0">
          {siteUrl}
        </Information>
        <Information label="대표자">{owner}</Information>
        <Information label="주소">{address}</Information>
        <Information label="전화번호">
          {tel} <Typography color="greyScale-5">|</Typography> {phone}
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
