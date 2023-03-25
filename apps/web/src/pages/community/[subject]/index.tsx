import {
  applyMediaQuery,
  Container,
  Tab,
  Title,
  Wrapper,
} from '@supercarmarket/ui';
import type { NextPageWithLayout } from '@supercarmarket/types/base';
import { CommunityBestList, CommunityList } from 'components/community';
import CommunityNavbar from 'components/community/communityNavbar';
import layout from 'components/layout';
import { css } from 'styled-components';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/fallback';
import { useSession } from 'next-auth/react';
import HeadSeo from 'components/common/headSeo';
import { useUrlQuery } from '@supercarmarket/hooks';
import { formatter } from 'components/community/communityCard/communityCard';
import Advertisement from 'components/common/advertisement';

const CommunityCategory: NextPageWithLayout = () => {
  const { status } = useSession();
  const { category } = useUrlQuery();

  return (
    <>
      <HeadSeo title="커뮤니티" description="슈퍼카를 위한 커뮤니티" />
      <Container>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <Wrapper
              css={css`
                display: flex;
                flex-direction: column;
                gap: 27.5px;
                ${applyMediaQuery('mobile')} {
                  padding: 0 16px;
                }
              `}
            >
              <Advertisement />
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
                  <Title>{formatter(category)}</Title>
                  <Tab
                    popular
                    variant
                    create={
                      status === 'authenticated'
                        ? '/community/create'
                        : undefined
                    }
                  />
                </Wrapper.Item>
                <CommunityNavbar />
              </Wrapper>
              <ErrorBoundary
                onReset={reset}
                fallbackRender={(props) => <ErrorFallback {...props} />}
              >
                <CommunityList status={status} />
              </ErrorBoundary>
            </Wrapper>
          )}
        </QueryErrorResetBoundary>
      </Container>
    </>
  );
};

CommunityCategory.Layout = layout;

export default CommunityCategory;
