import { applyMediaQuery, Typography, Wrapper } from '@supercarmarket/ui';
import MarketSelect from 'components/market/marketSelect';
import { FIRST_MARKET_FILTER, SECOND_MARKET_FILTER } from 'constants/market';
import React from 'react';
import { css } from 'styled-components';

const MarketFilterArea = () => {
  return (
    <Wrapper.Top
      css={css`
        box-sizing: border-box;
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 32px;
        margin-bottom: 20px;
        padding: 16px 12px;
        background: ${({ theme }) => theme.color['greyScale-2']};
        border-radius: 4px;
      `}
    >
      <Wrapper
        css={css`
          display: flex;
          gap: 24px;
          ${applyMediaQuery('mobile')} {
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      >
        {FIRST_MARKET_FILTER.map(([options1, options2], idx) => (
          <Wrapper.Item
            key={idx}
            css={css`
              width: 270px;
              display: flex;
              flex-direction: column;
              box-sizing: border-box;
              padding: 10px;
              padding-bottom: 0;
              gap: 5px;
              ${applyMediaQuery('mobile')} {
                width: 311px;
              }
            `}
          >
            <Typography>{options1.label}</Typography>
            <MarketSelect options1={options1} options2={options2} />
          </Wrapper.Item>
        ))}
      </Wrapper>
      <Wrapper
        css={css`
          display: flex;
          gap: 24px;
          ${applyMediaQuery('mobile')} {
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      >
        {SECOND_MARKET_FILTER.map(([options1, options2], idx) => (
          <Wrapper.Item
            key={idx}
            css={css`
              width: 270px;
              display: flex;
              flex-direction: column;
              box-sizing: border-box;
              padding: 10px;
              gap: 5px;
              ${applyMediaQuery('mobile')} {
                width: 311px;
              }
            `}
          >
            <Typography>{options1.label}</Typography>
            <MarketSelect options1={options1} options2={options2} />
          </Wrapper.Item>
        ))}
      </Wrapper>
    </Wrapper.Top>
  );
};

export default MarketFilterArea;
