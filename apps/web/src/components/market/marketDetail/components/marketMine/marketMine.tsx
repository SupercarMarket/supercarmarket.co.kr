import {
  Button,
  Typography,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import {
  useDeleteMarketPost,
  useUpdateMarketSellStatus,
} from 'http/server/market';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { css } from 'styled-components';

interface MarketMineProps {
  id: string;
  brdSeq: number;
}

const MarketMine = ({ id, brdSeq }: MarketMineProps) => {
  const session = useSession();

  const { mutate: removeMarketById } = useDeleteMarketPost();
  const { mutate: changeSellStatus } = useUpdateMarketSellStatus();

  const removeMarket = () => {
    if (!session.data) return;
    removeMarketById({
      data: [{ id }],
    });
  };

  const changeStatus = () => {
    if (!session.data) return;
    changeSellStatus({
      data: { brdSeq },
    });
  };

  return (
    <Wrapper
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 205px;
        gap: 16px;

        ${applyMediaQuery('mobile')} {
          height: 105px;
        }
      `}
    >
      <Button variant="Line" onClick={removeMarket}>
        <Typography color="greyScale-6">삭제</Typography>
      </Button>
      <Button variant="Line" onClick={changeStatus}>
        <Typography color="greyScale-6">판매 완료</Typography>
      </Button>
    </Wrapper>
  );
};

export default MarketMine;
