import Container from 'components/common/container';
import Typography from 'components/common/typography';
import theme from 'constants/theme';
import Image from 'next/image';
import React from 'react';
import { DealerDto } from 'types/market';

import CallIcon from '../../../../assets/svg/call.svg';
import * as S from './market-detail-dealer.styled';

interface MarketDetailDealerProps {
  dealer: DealerDto;
}

const MarketDetailDealer = ({ dealer }: MarketDetailDealerProps) => {
  const { address, company, dealerName, dealerNumber, phone, profile } = dealer;
  console.log(profile);
  return (
    <Container margin="0 0 80px 0">
      <Typography fontSize="header-24" fontWeight="bold">
        딜러정보
      </Typography>
      <S.DealerCard>
        <S.DealerDetail>
          <S.DealerProfile>
            {profile && (
              <Image
                alt="profile"
                src={profile}
                width="80px"
                height="80px"
                layout="fixed"
              />
            )}
          </S.DealerProfile>
          <S.Div>
            <div style={{ marginBottom: 6 }}>
              <Typography
                fontSize="body-20"
                lineHeight="150%"
                style={{ marginRight: 6 }}
              >
                {company}
              </Typography>
              <Typography
                fontSize="body-20"
                fontWeight="bold"
                lineHeight="150%"
                style={{ marginRight: 12 }}
              >
                {dealerName}
              </Typography>
              <Typography
                fontSize="body-20"
                lineHeight="150%"
                color="greyScale-5"
              >
                {address.split(' ', 2).join(' ')}
              </Typography>
            </div>
            <div>
              <Typography fontSize="body-14" color="greyScale-5">
                {dealerNumber}
              </Typography>
            </div>
          </S.Div>
        </S.DealerDetail>
        <S.DealerContact>
          <CallIcon
            width="20px"
            height="20px"
            fill={theme.color['system-1']}
            style={{ marginRight: 13 }}
          />
          <Typography fontSize="header-24" fontWeight="bold" color="system-1">
            {phone}
          </Typography>
        </S.DealerContact>
      </S.DealerCard>
    </Container>
  );
};

export default MarketDetailDealer;
