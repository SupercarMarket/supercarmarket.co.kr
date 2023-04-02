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
import { PartnershipDto } from '@supercarmarket/types/partnership';
import { partnershipFormatter } from '@supercarmarket/lib';

const PartnershipCard = ({
  brdSeq,
  partnerName,
  category,
  workTime,
  wireNumber,
  address,
  siteUrl,
  imgSrc,
}: PartnershipDto) => {
  const engCategory = partnershipFormatter(category.replaceAll(' ', ''));

  return (
    <Container
      width="100%"
      display="flex"
      alignItems="center"
      borderBottom="1px solid #EAEAEC"
      padding="6px 0"
    >
      <Link
        href={`/partnership/${engCategory.toLowerCase()}/${brdSeq}`}
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
                box-sizing: border-box;
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
                  width: 100%;
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
                padding-left: 0;
                align-items: center;
                justify-content: center;
                text-align: center;

                .category {
                  width: 120px;
                }
                .work-time {
                  width: 119px;
                }
                .wire-number {
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
                  justify-content: flex-start;
                  text-align: center;

                  .category,
                  .work-time,
                  .wire-number {
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
            <p className="wire-number">{wireNumber}</p>
            <p className="address">
              {address.split(' ').slice(0, 2).join(' ')}
            </p>
          </Wrapper.Item>
        </Wrapper.Item>
      </Link>
      <Wrapper
        css={css`
          ${applyMediaQuery('mobile')} {
            display: none;
          }
        `}
      >
        <Link
          href={`http://${siteUrl}`}
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
      </Wrapper>
    </Container>
  );
};

export default PartnershipCard;
