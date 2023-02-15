import 'react-loading-skeleton/dist/skeleton.css';

import { Container, Wrapper } from '@supercarmarket/ui';
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
    <Container>
      {Array.from({ length: size }).map((_, index) => (
        <Container
          key={index}
          width="100%"
          display="flex"
          alignItems="center"
          gap="30px"
        >
          <Skeleton />
        </Container>
      ))}
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
