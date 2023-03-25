import {
  applyMediaQuery,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { css } from 'styled-components';
import { WithBlurredImage } from '@supercarmarket/types/base';
import { PartnershipDto } from '@supercarmarket/types/partnership';

const PartnershipCard = ({
  brdSeq,
  base64,
  partnerName,
  category,
  workTime,
  phone,
  address,
  siteUrl,
  imgSrc,
}: WithBlurredImage<PartnershipDto>) => {
  return (
    <Container
      width="100%"
      display="flex"
      alignItems="center"
      borderBottom="1px solid #EAEAEC"
      padding="0 0 6px 0"
    >
      <Link
        href={`/partnership/${category.toLowerCase()}/${brdSeq}`}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Wrapper
          css={css`
            width: 196px;
            height: 124px;
            position: relative;

            ${applyMediaQuery('mobile')} {
              width: 64px;
              height: 64px;
              object-fit: cover;
            }
          `}
        >
          <Image
            placeholder={base64 ? 'blur' : undefined}
            blurDataURL={base64 ? base64 : undefined}
            src={imgSrc}
            alt="thumbnail"
            style={{ borderRadius: '4px', objectFit: 'cover' }}
            fill
          />
        </Wrapper>
        <Wrapper.Item
          css={css`
            display: flex;

            ${applyMediaQuery('mobile')} {
              flex-direction: column;
              gap: 4px;
            }
          `}
        >
          <Wrapper.Item
            css={css`
              ${({ theme }) => css`
                flex: 1;
                width: 403px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 12px;
                padding-left: 30px;

                .title {
                  font-size: ${theme.fontSize['body-24']};
                  font-weight: ${theme.fontWeight.bold};
                }

                .address {
                  font-size: ${theme.fontSize['body-14']};
                  color: ${theme.color['greyScale-5']};
                }

                ${applyMediaQuery('mobile')} {
                  gap: 4px;
                  padding-left: 12px;

                  .title {
                    font-size: ${theme.fontSize['body-14']};
                  }
                  .address {
                    font-size: ${theme.fontSize['body-12']};
                  }
                }
              `}
            `}
          >
            <p className="title">{partnerName}</p>
            <p className="address">{address}</p>
          </Wrapper.Item>
          <Wrapper.Item
            css={css`
              ${({ theme }) => css`
                display: flex;
                font-size: ${theme.fontSize['body-14']};
                padding-left: 30px;

                .category {
                  width: 120px;
                }
                .work-time {
                  width: 119px;
                }
                .phone {
                  width: 142px;
                }
                .address {
                  width: 137px;
                }
                .vertical-bar {
                  display: none;
                }
                ${applyMediaQuery('mobile')} {
                  padding-left: 12px;
                  gap: 8px;

                  .category,
                  .work-time,
                  .phone {
                    width: auto;
                  }
                  .address {
                    display: none;
                  }
                  .vertical-bar {
                    display: block;
                  }
                }
              `}
            `}
          >
            <p className="category">{category}</p>
            <p className="vertical-bar">|</p>
            <p className="work-time">{workTime}</p>
            <p className="vertical-bar">|</p>
            <p className="phone">{phone}</p>
            <p className="address">
              {address.split(' ').slice(0, 2).join(' ')}
            </p>
          </Wrapper.Item>
        </Wrapper.Item>
      </Link>
      <Link
        href={siteUrl}
        style={{
          display: 'inline-block',
          width: '80px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <Typography
          fontSize="body-14"
          style={{
            textDecorationLine: 'underline',
          }}
        >
          바로가기
        </Typography>
      </Link>
    </Container>
  );
};

export default PartnershipCard;
