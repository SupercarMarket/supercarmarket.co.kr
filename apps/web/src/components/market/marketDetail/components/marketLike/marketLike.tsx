import * as React from 'react';
import {
  Button,
  Container,
  Typography,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import theme from 'constants/theme';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import FavoriteIcon from '../../../../../assets/svg/favorite.svg';
import FavoriteBorderIcon from '../../../../../assets/svg/favorite-border.svg';
import ModalContext from 'feature/modalContext';
import AuthModal from 'components/common/modal/authModal';
import { css } from 'styled-components';

interface MarketLikeProps {
  isLike: boolean;
}

const MarketLike = ({ isLike }: MarketLikeProps) => {
  const [like, setLike] = React.useState<boolean>(isLike);
  const { onOpen, onClose, onClick } = React.useContext(ModalContext);
  const { data: user } = useSession();

  const {
    query: { id },
  } = useRouter();

  const toggleLike = React.useCallback(
    async () =>
      await fetch(`/server/supercar/v1/shop/${id}/scrap`, {
        method: 'POST',
        headers: {
          ACCESS_TOKEN: user?.accessToken || '',
        },
      }),
    [id, user]
  );

  const likeClick = React.useCallback(async () => {
    if (!user) {
      onOpen(<AuthModal onClose={onClose} onClick={onClick} onOpen={onOpen} />);
    } else {
      const result = await toggleLike();

      console.log(result);

      if (result.ok) {
        setLike(!like);
      }
    }
  }, [like, setLike, toggleLike, user, onClick, onClose, onOpen]);

  return (
    <Wrapper
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 205px;

        ${applyMediaQuery('mobile')} {
          height: 105px;
        }
      `}
    >
      <Button
        onClick={likeClick}
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
    </Wrapper>
  );
};

export default MarketLike;
