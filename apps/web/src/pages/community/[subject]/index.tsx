import { Container, Tab, Title, Wrapper } from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { CommunityBestList, CommunityList } from 'components/community';
import CommunityNavbar from 'components/community/communityNavbar';
import layout from 'components/layout';
import { css } from 'styled-components';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';

const CommunityCategory: NextPageWithLayout = () => {
  return (
    <Container display="flex" flexDirection="column" gap="27.5px">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <Title>커뮤니티 인기글</Title>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => <ErrorFallback {...props} />}
            >
              <CommunityBestList />
            </ErrorBoundary>
            <Wrapper
              css={css`
                position: relative;
                display: flex;
                flex-direction: column;
                gap: 27.5px;
              `}
            >
              <Wrapper.Item
                css={css`
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                `}
              >
                <Title>제보</Title>
                <Tab />
              </Wrapper.Item>
              <CommunityNavbar />
            </Wrapper>
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(props) => <ErrorFallback {...props} />}
            >
              <CommunityList />
            </ErrorBoundary>
          </>
        )}
      </QueryErrorResetBoundary>
    </Container>
  );
};

CommunityCategory.Layout = layout;

export default CommunityCategory;
