import * as React from 'react';
import { Typography, Wrapper } from '@supercarmarket/ui';
import { css } from 'styled-components';

import Image from 'next/image';
import ironSrc from '../../../../public/images/rating/lv_iron.png';
import bronzeSrc from '../../../../public/images/rating/lv_bronze.png';
import silverSrc from '../../../../public/images/rating/lv_silver.png';
import goldSrc from '../../../../public/images/rating/lv_gold.png';
import platinumSrc from '../../../../public/images/rating/lv_platinum.png';
import vipSrc from '../../../../public/images/rating/lv_vip.png';
import { Rating } from '@supercarmarket/types/account';

interface AvvatarProps {
  rating: Rating;
  nickname?: string;
  size?: number;
  gap?: number;
  option?: {
    darkMode?: boolean;
    mobile?: boolean;
  };
}

export const ratingFormatter = (
  rating: Rating,
  options?: {
    reverse?: boolean;
  }
) => {
  if (options && options.reverse) {
    return {
      '1': '아이언',
      '2': '브론즈',
      '3': '실버',
      '4': '골드',
      '5': '플래티넘',
      '6': 'VIP',
    }[rating];
  }
  return {
    '1': 'iron',
    '2': 'bronze',
    '3': 'silver',
    '4': 'gold',
    '5': 'platinum',
    '6': 'vip',
  }[rating];
};

const getRatingImageSrc = (rating: Rating) => {
  return {
    '1': ironSrc,
    '2': bronzeSrc,
    '3': silverSrc,
    '4': goldSrc,
    '5': platinumSrc,
    '6': vipSrc,
  }[rating];
};

const Avatar = React.memo(function Avatar({
  rating,
  nickname,
  size = 24,
  gap = 8,
  option = {
    darkMode: false,
    mobile: false,
  },
}: AvvatarProps) {
  return (
    <Wrapper
      css={css`
        display: flex;
        align-items: center;
        gap: ${gap}px;
        & > img {
          width: ${size}px;
          height: ${size}px;
        }
      `}
    >
      <Image
        src={getRatingImageSrc(rating) || ironSrc}
        alt="등급"
        placeholder="blur"
      />
      {nickname && (
        <Typography
          fontSize="body-16"
          fontWeight="regular"
          lineHeight="150%"
          color={option.darkMode ? 'white' : 'greyScale-6'}
        >
          {nickname}
        </Typography>
      )}
    </Wrapper>
  );
});

export default Avatar;
