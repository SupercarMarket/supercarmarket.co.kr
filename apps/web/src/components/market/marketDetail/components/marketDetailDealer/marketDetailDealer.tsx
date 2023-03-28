import { Typography, Wrapper, applyMediaQuery } from '@supercarmarket/ui';
import type { DealerDto } from '@supercarmarket/types/market';
import Image from 'next/image';
import { css } from 'styled-components';

import CallIcon from '../../../../../assets/svg/call.svg';
import * as style from './marketDetailDealer.styled';
import Avatar from 'components/common/avatar';

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
          {profile ? (
            <Image alt="profile" src={profile} fill />
          ) : (
            <Avatar rating="6" size={80} />
          )}
        </Wrapper>
        <Wrapper css={style.profile}>
          <Wrapper css={style.innerProfile}>
            <p>{company}</p>
            <p className="bold">{dealerName}</p>
            <p className="gray">{address.split(' ', 2).join(' ')}</p>
          </Wrapper>
          <Typography fontSize="body-14" color="greyScale-5">
            {dealerNumber}
          </Typography>
        </Wrapper>
      </Wrapper.Left>
      <Wrapper.Right css={style.right}>
        <CallIcon />
        <p>{phone}</p>
      </Wrapper.Right>
    </Wrapper>
  );
};

export default MarketDetailDealer;
