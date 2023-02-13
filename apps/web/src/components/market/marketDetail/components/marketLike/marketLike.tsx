import Button from 'components/common/button';
import Container from 'components/common/container';
import Typography from 'components/common/typography';
import theme from 'constants/theme';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import FavoriteIcon from '../../../../../assets/svg/favorite.svg';
import FavoriteBorderIcon from '../../../../../assets/svg/favorite-border.svg';

interface MarketLikeProps {
  isLike: boolean;
}

const MarketLike = ({ isLike }: MarketLikeProps) => {
  const [like, setLike] = React.useState<boolean>(isLike);
  const { data } = useSession();

  const {
    query: { id },
  } = useRouter();

  const toggleLike = async () =>
    await fetch(`/server/supercar/v1/shop/${id}/scrap`, {
      method: 'POST',
      headers: {
        ACCESS_TOKEN: data?.accessToken || '',
      },
    });

  const onClick = async () => {
    const result = await toggleLike();
    if (result.ok) {
      setLike(!like);
    }
  };

  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="205px"
    >
      <Button
        onClick={onClick}
        variant="Line"
        prefixx={
          like ? (
            <FavoriteIcon
              width={16}
              height="100%"
              fill={theme.color['system-1']}
            />
          ) : (
            <FavoriteBorderIcon
              width={16}
              height="100%"
              fill={theme.color['greyScale-5']}
            />
          )
        }
      >
        <Typography color={like ? 'system-1' : 'greyScale-5'}>
          찜하기
        </Typography>
      </Button>
    </Container>
  );
};

export default MarketLike;
