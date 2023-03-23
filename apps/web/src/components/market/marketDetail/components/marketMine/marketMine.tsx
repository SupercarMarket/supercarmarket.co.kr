import {
  Button,
  Container,
  Typography,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import useChangeSellStatus from 'hooks/mutations/market/useChangeSellStatus';
import useRemoveMarketById from 'hooks/mutations/market/useRemoveMarketById';
import { useSession } from 'next-auth/react';
import React from 'react';
import { css } from 'styled-components';

interface MarketMineProps {
  id: string;
  brdSeq: number;
}

const MarketMine = ({ id, brdSeq }: MarketMineProps) => {
  const session = useSession();

  const { mutate: removeMarketById } = useRemoveMarketById();
  const { mutate: changeSellStatus } = useChangeSellStatus();

  const removeMarket = () => {
    if (!session.data) return;
    const result = removeMarketById({
      data: [{ id }],
      token: session.data?.accessToken,
    });
    console.log(result);
  };

  const changeStatus = () => {
    if (!session.data) return;
    const result = changeSellStatus({
      data: { brdSeq },
      token: session.data?.accessToken,
    });
    console.log(result);
  };

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
