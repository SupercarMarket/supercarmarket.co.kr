import { Button, Container, Typography } from '@supercarmarket/ui';
import React from 'react';

const MarketMine = () => {
  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="16px"
      height="205px"
    >
      <Button variant="Line">
        <Typography color="greyScale-6">삭제</Typography>
      </Button>
      <Button variant="Line">
        <Typography color="greyScale-6">판매 완료</Typography>
      </Button>
    </Container>
  );
};

export default MarketMine;
