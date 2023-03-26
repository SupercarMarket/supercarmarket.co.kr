import { css } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { InferGetServerSidePropsType, NextPageContext } from 'next/types';
import { NextPageWithLayout, Params } from '@supercarmarket/types/base';
import { applyMediaQuery, Searchbar, Wrapper } from '@supercarmarket/ui';
import {
  dehydrate,
  QueryClient,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';

import layout from 'components/layout';
import Banner from 'components/partnership/banner';
import { ErrorFallback } from 'components/fallback';
import { useSearchKeyword } from 'hooks/useSearchKeyword';
import { PARTNERSHIP_LINKS } from 'constants/partnership';
import PartnershipList from 'components/partnership/partnershipList';
import PartnershipCategory from 'components/partnership/partnershipCategory';
import Advertisement from 'components/common/advertisement';
import { prefetchPartnership, QUERY_KEYS } from 'http/server/partnership';

const PartnershipPage: NextPageWithLayout = ({
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { keydownHandler, keywordRef } = useSearchKeyword({
    domain: 'partnership',
  });

  return (
    <Wrapper
      css={css`
        ${applyMediaQuery('mobile')} {
          padding: 0 16px;
        }
      `}
    >
      <Advertisement />
      <Banner
        title="제휴업체 등록을 원하시나요?"
        btnTitle="등록 문의하기"
        url="/inquiry/partnership"
      />
      <Wrapper.Top
        css={css`
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Wrapper.Item
          css={css`
            width: 880px;
            ${applyMediaQuery('mobile')} {
              width: 100%;
            }
          `}
        >
          <Searchbar
            width="100%"
            variant="Line"
            placeholder="원하시는 업체를 검색하세요"
            onKeyDown={keydownHandler}
            ref={keywordRef}
          />
        </Wrapper.Item>
      </Wrapper.Top>
      <PartnershipCategory category={category} />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={(props) => <ErrorFallback {...props} />}
          >
            <PartnershipList category={category} pagination />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Wrapper>
  );
};

PartnershipPage.Layout = layout;

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const { category } = query as Params;

  const queryClient = new QueryClient();

  if (
    !category ||
    !PARTNERSHIP_LINKS.map((link) => link.category).includes(category)
  )
    return {
      redirect: {
        destination: '/partnership?category=all',
        permanent: false,
      },
    };

  queryClient.prefetchQuery({
    queryKey: [
      QUERY_KEYS.partnership(),
      {
        page: 0,
        size: '20',
        region: '전국',
        category: 'all',
        keyword: '',
      },
    ],
    queryFn: () => prefetchPartnership(),
  });

  return {
    props: {
      category,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PartnershipPage;
