import { WithBlurredImage } from '@supercarmarket/types/base';
import { PartnershipDetailDto } from '@supercarmarket/types/partnership';
import { applyMediaQuery, Typography, Wrapper } from '@supercarmarket/ui';
import React from 'react';
import { css } from 'styled-components';

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
    representative,
    partnerName,
    companyName,
    phone,
    treatedItem,
    workTime,
    tel,
    siteUrl,
  } = info;
  return (
    <Wrapper.Top
      css={css`
        ${({ theme }) => css`
          box-sizing: border-box;
          width: 578px;
          padding: 30px 40px;
          border: 1px solid ${({ theme }) => theme.color['greyScale-5']};
          border-radius: 4px;
          box-sizing: border-box;

          .company-name {
            font-size: ${theme.fontSize['header-36']};
            font-weight: ${theme.fontWeight.bold};
            margin-bottom: 42px;
          }
          ${applyMediaQuery('mobile')} {
            width: 100%;
            padding: 24px 16px;
            .company-name {
              font-size: ${theme.fontSize['header-20']};
              margin-bottom: 26px;
            }
          }
        `}
      `}
    >
      <h1 className="company-name">{companyName}</h1>
      <Wrapper.Bottom
        css={css`
          display: flex;
          flex-direction: column;
          gap: 15px;

          ${applyMediaQuery('mobile')} {
            gap: 8px;
          }
        `}
      >
        <Information label="업종">{category}</Information>
        <Information label="취급품목">{treatedItem}</Information>
        <Information label="업무시간">{workTime}</Information>
        <Information
          label="홈페이지"
          margin="0 0 34px 0"
          mobileMargin="0 0 16px 0"
        >
          {siteUrl}
        </Information>
        <Information label="대표자">{representative}</Information>
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
  mobileMargin?: React.CSSProperties['margin'];
}

const Information = ({
  label,
  children,
  margin,
  mobileMargin,
}: InformationProps) => {
  return (
    <Wrapper
      css={css`
        margin: ${margin};
        ${applyMediaQuery('mobile')} {
          margin: ${mobileMargin};
        }
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
