import Avvvatars from 'avvvatars-react';
import Typography from 'components/common/typography';
import Wrapper from 'components/common/wrapper/wrapper';
import theme from 'constants/theme';
import Image from 'next/image';
import React from 'react';
import { css } from 'styled-components';
import { DealerDto } from 'types/market';

import CallIcon from '../../../../../assets/svg/call.svg';
import * as style from './marketDetailDealer.styled';

interface MarketDetailDealerProps {
  dealer: DealerDto;
}

const MarketDetailDealer = ({ dealer }: MarketDetailDealerProps) => {
  const { address, company, dealerName, dealerNumber, phone, profile } = dealer;

  return (
    <Wrapper css={style.wrapper}>
      <Wrapper.Left css={style.left}>
        <Wrapper
          css={css`
            border-radius: 50%;
            overflow: hidden;
          `}
        >
          {profile ? (
            <Image alt="profile" src={profile} width={80} height={80} />
          ) : (
            <Avvvatars value={dealerName} size={80} />
          )}
        </Wrapper>
        <Wrapper>
          <Wrapper css={style.profile}>
            <Typography fontSize="body-20" lineHeight="150%">
              {company}
            </Typography>
            <Typography fontSize="body-20" fontWeight="bold" lineHeight="150%">
              {dealerName}
            </Typography>
            <Typography
              fontSize="body-20"
              lineHeight="150%"
              color="greyScale-5"
            >
              {address.split(' ', 2).join(' ')}
            </Typography>
          </Wrapper>
          <Typography fontSize="body-14" color="greyScale-5">
            {dealerNumber}
          </Typography>
        </Wrapper>
      </Wrapper.Left>
      <Wrapper.Right css={style.right}>
        <CallIcon
          width="20px"
          height="20px"
          fill={theme.color['system-1']}
          style={{ marginRight: 13 }}
        />
        <Typography fontSize="header-24" fontWeight="bold" color="system-1">
          {phone}
        </Typography>
      </Wrapper.Right>
    </Wrapper>
  );
};

export default MarketDetailDealer;
