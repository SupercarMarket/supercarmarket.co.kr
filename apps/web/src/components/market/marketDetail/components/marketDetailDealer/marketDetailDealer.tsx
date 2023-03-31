import { Typography, Wrapper, applyMediaQuery } from '@supercarmarket/ui';
import type { DealerDto } from '@supercarmarket/types/market';
import Image from 'next/image';
import { css } from 'styled-components';

import CallIcon from '../../../../../assets/svg/call.svg';

interface MarketDetailDealerProps {
  dealer: DealerDto;
}

const MarketDetailDealer = ({ dealer }: MarketDetailDealerProps) => {
  const { address, company, dealerName, dealerNumber, phone, profile } = dealer;

  return (
    <Wrapper
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 40px;
        height: 140px;
        margin-top: 20px;
        margin-bottom: 80px;
        padding: 30px 40px;
        border: 1px solid ${({ theme }) => theme.color['greyScale-3']};
        border-radius: 4px;
        box-sizing: border-box;

        ${applyMediaQuery('mobile')} {
          padding: 20px 16px;
          margin-bottom: 32px;
          align-items: flex-start;
          gap: 16px;
        }
      `}
    >
      <Wrapper.Item
        css={css`
          width: 80px;
          height: 80px;

          ${applyMediaQuery('mobile')} {
            width: 60px;
            height: 60px;
          }
          border-radius: 50%;
          overflow: hidden;
          position: relative;
        `}
      >
        {profile && <Image alt="profile" src={profile} fill />}
      </Wrapper.Item>
      <Wrapper
        css={css`
          flex: 1;
          display: flex;
          justify-content: space-between;

          ${applyMediaQuery('mobile')} {
            flex-direction: column;
          }
        `}
      >
        <Wrapper
          css={css`
            ${({ theme }) => css`
              display: flex;
              flex-direction: column;
              gap: 6px;
              line-height: 150%;
              font-size: ${theme.fontSize['body-20']};

              ${applyMediaQuery('mobile')} {
                font-size: ${theme.fontSize['body-16']};
                margin-bottom: 6px;
              }
            `}
          `}
        >
          <Wrapper
            css={css`
              ${({ theme }) => css`
                display: flex;
                gap: 6px;

                .bold {
                  font-weight: ${theme.fontWeight['bold']};
                }

                .gray {
                  color: ${theme.color['greyScale-5']};
                }
                ${applyMediaQuery('mobile')} {
                  flex-direction: column;
                  justify-content: center;
                }
              `}
            `}
          >
            <Wrapper.Item
              css={css`
                display: flex;
                align-items: center;
                gap: 6px;
              `}
            >
              <p>{company}</p>
              <p className="bold">{dealerName}</p>
            </Wrapper.Item>
            <p className="gray">{address.split(' ', 2).join(' ')}</p>
          </Wrapper>
          <Typography fontSize="body-14" color="greyScale-5">
            {dealerNumber}
          </Typography>
        </Wrapper>
        <Wrapper.Right
          css={css`
            ${({ theme }) => css`
              display: flex;
              align-items: center;

              p {
                font-size: ${theme.fontSize['body-24']};
                font-weight: ${theme.fontWeight['bold']};
                color: ${theme.color['system-1']};
                padding-bottom: 2px;
              }

              svg {
                width: 20px;
                fill: ${theme.color['system-1']};
                margin-right: 12px;
              }

              ${applyMediaQuery('mobile')} {
                p {
                  font-size: ${theme.fontSize['body-16']};
                }

                svg {
                  width: 16px;
                  margin-right: 6px;
                }
              }
            `}
          `}
        >
          <CallIcon />
          <p>{phone}</p>
        </Wrapper.Right>
      </Wrapper>
    </Wrapper>
  );
};

export default MarketDetailDealer;
