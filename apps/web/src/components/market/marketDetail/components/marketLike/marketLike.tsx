import * as React from 'react';
import {
  Button,
  Typography,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import theme from 'constants/theme';
import { css } from 'styled-components';
import { Modal } from 'components/common/modal';
import { useLikeMarketPost } from 'http/server/market';
import FavoriteIcon from '../../../../../assets/svg/favorite.svg';
import FavoriteBorderIcon from '../../../../../assets/svg/favorite-border.svg';
import { ModalContext } from 'feature/ModalProvider';

interface MarketLikeProps {
  id: string;
  isLike: boolean;
}

const MarketLike = ({ id, isLike }: MarketLikeProps) => {
  const { onOpen, onClose } = React.useContext(ModalContext);
  const { status } = useSession();
  const { push } = useRouter();
  const { mutate: toggleLike, isLoading } = useLikeMarketPost(id);

  const likeClick = React.useCallback(async () => {
    if (status !== 'authenticated') {
      onOpen(
        <Modal
          description="로그인 후 찜하기가 가능합니다"
          onCancel={() => {
            onClose();
          }}
          clickText="로그인"
          closeText="회원가입"
          onClick={() => {
            push('/auth/signin');
          }}
          onClose={() => {
            push('/auth/signup');
          }}
        />
      );
    } else {
      toggleLike();
    }
  }, [status, onOpen, onClose, push, toggleLike]);

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
        disabled={isLoading}
        prefixx={
          isLike ? (
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
        <Typography color={isLike ? 'system-1' : 'greyScale-5'}>
          찜하기
        </Typography>
      </Button>
    </Wrapper>
  );
};

export default MarketLike;
