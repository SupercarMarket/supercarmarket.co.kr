import {
  applyMediaQuery,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import { css } from 'styled-components';

interface AdvertisementProps {
  hidden?: boolean;
}

const Advertisement = (props: AdvertisementProps) => {
  const { hidden = false } = props;
  return (
    <Container position="relative">
      {!hidden && (
        <Wrapper.Item
          css={css`
            width: 100%;
            margin-top: 8px;
            margin-bottom: 40px;
            div {
              width: 100%;
              height: 180px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: ${({ theme }) => theme.color['greyScale-3']};
            }
            ${applyMediaQuery('mobile')} {
              margin-top: 0;
              margin-bottom: 32px;
              div {
                width: 100vw;
                margin-left: calc(-50vw + 50%);
                height: 100px;
              }
            }
          `}
        >
          <div>
            <Typography
              fontSize="body-20"
              fontWeight="regular"
              color="greyScale-6"
            >
              광고 배너
            </Typography>
          </div>
        </Wrapper.Item>
      )}
      <Wrapper.Left
        css={css`
          position: absolute;
          width: 168px;
          height: 590px;
          right: -200px;
          top: 0;
          div {
            width: 100%;
            height: 100%;
            background-color: ${({ theme }) => theme.color['greyScale-3']};
          }
          ${applyMediaQuery('mobile')} {
            display: none;
          }
        `}
      >
        <div />
      </Wrapper.Left>
      <Wrapper.Right
        css={css`
          position: absolute;
          width: 168px;
          height: 590px;
          left: -200px;
          top: 0;
          div {
            width: 100%;
            height: 100%;
            background-color: ${({ theme }) => theme.color['greyScale-3']};
          }
          ${applyMediaQuery('mobile')} {
            display: none;
          }
        `}
      >
        <div />
      </Wrapper.Right>
    </Container>
  );
};

export default Advertisement;
