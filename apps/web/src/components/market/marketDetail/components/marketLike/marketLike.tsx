import * as React from 'react';
import { Button, Container, Typography } from '@supercarmarket/ui';
import theme from 'constants/theme';
import useMarketLike from 'hooks/mutations/useMarketLike';
import { useRouter } from 'next/router';

import FavoriteIcon from '../../../../../assets/svg/favorite.svg';
import FavoriteBorderIcon from '../../../../../assets/svg/favorite-border.svg';

interface MarketLikeProps {
  isLike: boolean;
}

const MarketLike = ({ isLike }: MarketLikeProps) => {
  const [like, setLike] = React.useState<boolean>(isLike);

  const {
    query: { id },
  } = useRouter();
  const { mutate } = useMarketLike(id as string);

  const onClick = () => {
    // mutate(id as string);
    setLike(!like);
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
