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

const MarketDetailSkeleton = () => {
  return (
    <Container width="100%" display="flex" flexDirection="column">
      <Wrapper
        css={css`
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;

          ${applyMediaQuery('mobile')} {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        `}
      >
        <Skeleton width={250} height={50} />
        <Skeleton width={70} height={35} />
      </Wrapper>
      <Wrapper
        css={css`
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          ${applyMediaQuery('mobile')} {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        `}
      >
        <Skeleton width={160} height={20} />
        <Skeleton width={180} height={20} />
      </Wrapper>
      <Wrapper
        css={css`
          height: 900px;
          margin-top: 24px;
          margin-bottom: 10px;

          ${applyMediaQuery('mobile')} {
            height: 257px;
          }
        `}
      >
        <Skeleton height="100%" />
      </Wrapper>
      <Wrapper
        css={css`
          display: flex;
          gap: 10.5px;
        `}
      >
        {Array.from({ length: 4 }).map((_, idx) => (
          <Wrapper
            key={idx}
            css={css`
              width: 141px;
              height: 89px;

              ${applyMediaQuery('mobile')} {
                width: 80px;
                height: 60px;
              }
            `}
          >
            <Skeleton key={idx} width="100%" height="100%" />
          </Wrapper>
        ))}
      </Wrapper>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Wrapper
          key={idx}
          css={css`
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 60px;
            margin-bottom: 25px;
          `}
        >
          <Skeleton width={83} height={24} />
          <Skeleton height={140} />
        </Wrapper>
      ))}
    </Container>
  );
};

const PartnershipDetailSkeleton = () => {
  return (
    <Container>
      <Wrapper
        css={css`
          display: flex;
          gap: 20px;
          margin-bottom: 220px;
        `}
      >
        <Skeleton width={590} height={386} />
        <Skeleton width={590} height={386} />
      </Wrapper>
      <Wrapper
        css={css`
          width: 100%;
        `}
      >
        <Skeleton height={500} />
      </Wrapper>
    </Container>
  );
};

export {
  CardSkeleton,
  LinkSkeleton,
  MagazineBannerSkeleton,
  MarketDetailSkeleton,
  PartnershipDetailSkeleton,
};
