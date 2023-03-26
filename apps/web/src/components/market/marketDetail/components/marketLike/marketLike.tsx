import * as React from 'react';
import {
  Button,
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
import { css } from 'styled-components';
import { Modal } from 'components/common/modal';
import { useLikeMarketPost } from 'utils/api/market';
import { type Params } from '@supercarmarket/types/base';

interface MarketLikeProps {
  isLike: boolean;
}

const MarketLike = ({ isLike }: MarketLikeProps) => {
  const [like, setLike] = React.useState<boolean>(isLike);
  const { onOpen, onClose } = React.useContext(ModalContext);
  const { push, query } = useRouter();
  const { id } = query as Params;
  const { data: session } = useSession();
  const likeMutation = useLikeMarketPost(id, {
    enabled: !!id,
    onSuccess: () => {
      setLike((prev) => !prev);
    },
  });

  const likeClick = React.useCallback(async () => {
    if (!session) {
      onOpen(
        <Modal
          description="로그인 후 상담 신청이 가능합니다"
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
      likeMutation.mutate({ token: session.accessToken });
    }
  }, [session, onOpen, onClose, push, likeMutation]);

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
