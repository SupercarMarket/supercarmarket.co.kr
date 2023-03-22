import { Button, Container, Typography } from '@supercarmarket/ui';
import useChangeSellStatus from 'hooks/mutations/market/useChangeSellStatus';
import useRemoveMarketById from 'hooks/mutations/market/useRemoveMarketById';
import { useSession } from 'next-auth/react';
import React from 'react';

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
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="16px"
      height="205px"
    >
      <Button variant="Line" onClick={removeMarket}>
        <Typography color="greyScale-6">삭제</Typography>
      </Button>
      <Button variant="Line" onClick={changeStatus}>
        <Typography color="greyScale-6">판매 완료</Typography>
      </Button>
    </Container>
  );
};

export default MarketMine;
