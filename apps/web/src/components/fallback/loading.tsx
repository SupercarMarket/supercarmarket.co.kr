import 'react-loading-skeleton/dist/skeleton.css';

import { applyMediaQuery, Container, Wrapper } from '@supercarmarket/ui';
import Skeleton from 'react-loading-skeleton';
import { css } from 'styled-components';

interface CardSkeletonProps {
  variant?: 'row' | 'column';
  size?: number;
}

const CardRowSkeleton = ({ size = 12 }: Pick<CardSkeletonProps, 'size'>) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      gap="12px"
      padding="35px 0 0 0"
    >
      {Array.from({ length: size }).map((_, index) => (
        <Container
          key={index}
          width="100%"
          display="flex"
          alignItems="center"
          gap="30px"
        >
          <Skeleton
            style={{
              width: '178px',
              height: '120px',
              borderRadius: '4px',
            }}
          />
          <Wrapper.Item
            css={css`
              flex: 1;
              display: flex;
              & > span {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
            `}
          >
            <Skeleton count={2} style={{ width: '100%', height: '25px' }} />
          </Wrapper.Item>
        </Container>
      ))}
    </Container>
  );
};

const CardColumnSkeleton = ({ size = 12 }: Pick<CardSkeletonProps, 'size'>) => {
  return (
    <Container width="100%" display="flex">
      <Wrapper
        css={css`
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 20px;
          ${applyMediaQuery('tablet')} {
            grid-template-columns: 1fr 1fr 1fr;
          }

          ${applyMediaQuery('mobile')} {
            grid-template-columns: 1fr 1fr;
          }
        `}
      >
        {Array.from({ length: size }).map((_, index) => (
          <Container
            key={index}
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="20px"
          >
            <Wrapper.Item
              css={css`
                flex: 1;
                width: 100%;
                height: 180px;
                display: flex;
                & > span {
                  flex: 1;
                  display: flex;
                  width: 100%;
                  height: 180px;
                }
              `}
            >
              <Skeleton />
            </Wrapper.Item>
            <Wrapper.Item
              css={css`
                flex: 1;
                width: 100%;
                display: flex;
                & > span {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                }
              `}
            >
              <Skeleton count={2} />
            </Wrapper.Item>
          </Container>
        ))}
      </Wrapper>
    </Container>
  );
};

const CardSkeleton = ({ variant = 'column', size }: CardSkeletonProps) => {
  return {
    column: <CardColumnSkeleton size={size} />,
    row: <CardRowSkeleton size={size} />,
  }[variant];
};

const MagazineBannerSkeleton = () => {
  return (
    <div>
      <h1 />
    </div>
  );
};

const LinkSkeleton = () => {
  return <Skeleton />;
};

export { CardSkeleton, LinkSkeleton, MagazineBannerSkeleton };
