import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Button, Typography } from '@supercarmarket/ui';
import ArrowRight from '../../../assets/svg/arrow-right.svg';
import * as Styled from './banner.styled';

interface BannerProps {
  title: string;
  subtitle?: string;
  btnTitle: string;
  url: string;
}

const Banner = ({ title, subtitle, btnTitle, url }: BannerProps) => {
  const { push } = useRouter();

  const moveToUrl = () => {
    push(url);
  };

  return (
    <Styled.BannerContainer>
      <Styled.Paragraph>
        <Typography fontSize="header-24" fontWeight="bold" display="block">
          {title}
        </Typography>
        {subtitle && (
          <Typography fontSize="body-14" color="greyScale-5" lineHeight="150%">
            {subtitle}
          </Typography>
        )}
      </Styled.Paragraph>
      <Styled.BannerButtonArea>
        <Button
          variant="Black"
          border="rounded"
          suffix={<ArrowRight fill="white" />}
          onClick={moveToUrl}
        >
          {btnTitle}
        </Button>
      </Styled.BannerButtonArea>
    </Styled.BannerContainer>
  );
};

export default React.memo(Banner);
