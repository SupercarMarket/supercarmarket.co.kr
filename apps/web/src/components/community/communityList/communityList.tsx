import { useRouter, usePathname } from 'next/navigation';
import {
  Alert,
  applyMediaQuery,
  Container,
  FormSelect,
  Pagination,
  Searchbar,
  Tab,
  Table,
  Wrapper,
} from '@supercarmarket/ui';
import { useUrlQuery } from '@supercarmarket/hooks';
import useCommunity from 'hooks/queries/community/useCommunity';
import { css } from 'styled-components';
import CommunityCard from '../communityCard';
import { CardSkeleton } from 'components/fallback/loading';

interface CommunityListProps {
  category?: string;
  subject?: 'magazine' | 'paparazzi' | 'partnership';
  status?: 'authenticated' | 'loading' | 'unauthenticated';
}

const CommunityList = (props: CommunityListProps) => {
  const { category: iCategory, status } = props;
  const pathname = usePathname();
  const { push } = useRouter();
  const { variant, category, page, searchType, keyword, filter } =
    useUrlQuery();

  const { data, isFetching, isLoading } = useCommunity({
    category: iCategory || category || 'report',
    filter: filter === 'popular' ? filter : undefined,
    searchType,
    keyword,
    page,
  });

  if (isFetching || isLoading) {
    if (variant === 'column')
      return <CardSkeleton variant="column" size={20} />;
    else return <CardSkeleton variant="row" size={20} />;
  }

  return (
    <Container display="flex" flexDirection="column" alignItems="center">
      <Wrapper
        css={css`
          width: 100%;
          padding-bottom: 6px;
        `}
      >
        {variant === 'row' && <Table tab="community" hidden={false} />}
      </Wrapper>
      <Wrapper
        css={css`
          display: flex;
          width: 100%;
        `}
      >
        {data?.data && data.data.length > 0 ? (
          <Wrapper.Item
            css={
              variant === 'row'
                ? css`
                    width: 100%;
                  `
                : css`
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                    row-gap: 40px;
                    column-gap: 20px;

                    ${applyMediaQuery('tablet')} {
                      grid-template-columns: 1fr 1fr 1fr;
                    }

                    ${applyMediaQuery('mobile')} {
                      grid-template-columns: 1fr 1fr;
                    }
                  `
            }
          >
            {data.data.map((value) => (
              <CommunityCard key={value.id} variant={variant} {...value} />
            ))}
          </Wrapper.Item>
        ) : (
          <Alert
            severity="info"
            title={
              keyword
                ? '검색 결과가 존재하지 않습니다.'
                : '게시글이 존재하지 않습니다.'
            }
          />
        )}
      </Wrapper>
      <Wrapper
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 32px;
          padding-top: 20px;
          padding-bottom: 32px;
        `}
      >
        <Tab
          scroll
          create={status === 'authenticated' ? '/community/create' : undefined}
        />
        {data && (
          <Pagination
            pageSize={20}
            totalCount={data.totalCount}
            totalPages={data.totalPages}
          />
        )}
      </Wrapper>
      <Wrapper
        css={css`
          width: 703px;
          display: flex;
          gap: 20px;
          justify-content: center;
          ${applyMediaQuery('mobile')} {
            width: 375px;
          }
        `}
      >
        <Wrapper.Item
          css={css`
            width: 134px;
            ${applyMediaQuery('mobile')} {
              width: 100px;
            }
          `}
        >
          <FormSelect
            option={{
              name: 'serachType',
              values: ['제목', '제목 + 본문', '닉네임'],
            }}
            style={{
              width: '100%',
              height: '44px',
            }}
          />
        </Wrapper.Item>
        <Searchbar
          variant="Line"
          border="normal"
          defaultValue={keyword}
          handleClick={(query) =>
            push(
              `${pathname}?category=${category}&variant=${variant}&searchType=${searchType}&keyword=${query}`
            )
          }
          style={{
            height: '44px',
          }}
        />
      </Wrapper>
    </Container>
  );
};

export default CommunityList;
