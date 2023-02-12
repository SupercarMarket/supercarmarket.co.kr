import 'react-loading-skeleton/dist/skeleton.css';

import Container from 'components/common/container';
import Wrapper from 'components/common/wrapper';
import Skeleton from 'react-loading-skeleton';
import { css } from 'styled-components';

interface CardSkeletonProps {
  variant?: 'row' | 'column';
}

const CardRowSkeleton = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      gap="12px"
      padding="35px 0 0 0"
    >
      {Array.from({ length: 12 }).map((_, index) => (
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

const CardColumnSkeleton = () => {
  return (
    <div>
      <h1 />
    </div>
  );
};

const CardSkeleton = ({ variant = 'column' }: CardSkeletonProps) => {
  return {
    column: <CardColumnSkeleton />,
    row: <CardRowSkeleton />,
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
