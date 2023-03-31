import { css } from 'styled-components';
import { applyMediaQuery, Wrapper } from '@supercarmarket/ui';

interface MarketDetailIntroductionProps {
  introduction: string;
}

const MarketDetailIntroduction = ({
  introduction,
}: MarketDetailIntroductionProps) => {
  return (
    <Wrapper
      css={css`
        margin-top: 20px;
        height: fit-content;
        margin-bottom: 80px;
        padding: 30px 40px;
        border: 1px solid ${({ theme }) => theme.color['greyScale-3']};
        border-radius: 4px;
        box-sizing: border-box;

        ${applyMediaQuery('mobile')} {
          padding: 16px;
          margin-bottom: 32px;
        }
      `}
    >
      <Wrapper.Item
        css={css`
          width: 100%;
          height: 100%;
          word-wrap: break-word;
          white-space: pre-wrap;
          line-height: 150%;
        `}
      >
        {introduction.split('"\n"')}
      </Wrapper.Item>
    </Wrapper>
  );
};

export default MarketDetailIntroduction;
