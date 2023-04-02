import * as React from 'react';
import { css } from 'styled-components';

import Select from 'components/common/select';
import MarketList from '../marketList';
import { Container, Tab, Wrapper, applyMediaQuery } from '@supercarmarket/ui';
import { ORDER_OPTIONSET, SHOW_COUNT_OPTIONS } from 'constants/market';

const MarketCar = () => {
  return (
    <Container margin="0 0 80px 0">
      <Wrapper
        css={css`
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        `}
      >
        <Wrapper.Top
          css={css`
            display: flex;
            gap: 9px;
          `}
        >
          <Wrapper.Left
            css={css`
              width: 140px;
              ${applyMediaQuery('mobile')} {
                width: 115px;
              }
            `}
          >
            <Select options={ORDER_OPTIONSET} nongray />
          </Wrapper.Left>
          <Wrapper.Right
            css={css`
              width: 100px;
              ${applyMediaQuery('mobile')} {
                width: 80px;
              }
            `}
          >
            <Select options={SHOW_COUNT_OPTIONS} nongray />
          </Wrapper.Right>
          <Tab variant full={false} />
        </Wrapper.Top>
      </Wrapper>
      <MarketList pagination />
    </Container>
  );
};

export default MarketCar;
