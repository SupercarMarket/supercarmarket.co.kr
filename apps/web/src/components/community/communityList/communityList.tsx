import { useRouter, usePathname } from 'next/navigation';
import {
  Alert,
  Container,
  FormSelect,
  Pagination,
  Searchbar,
  Table,
  Wrapper,
} from '@supercarmarket/ui';
import { useUrlQuery } from '@supercarmarket/hooks';
import useCommunity from 'hooks/queries/useCommunity';
import { css } from 'styled-components';
import CommunityCard from '../communityCard';

const CommunityList = () => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { variant, category, page, popular, searchType, keyword } =
    useUrlQuery();
  const { data } = useCommunity({
    category: category || 'report',
    page,
    filter: popular === 'true' ? 'popular' : null,
    searchType: searchType ?? null,
    keyword: keyword ?? null,
  });

  return (
    <Container display="flex" flexDirection="column" gap="32px">
      <Table tab="community" hidden={false} />
      <Wrapper
        css={css`
          padding-bottom: 16px;
        `}
      >
        {data?.data && data.data.length > 0 ? (
          <>
            {data.data.map((value) => (
              <CommunityCard key={value.id} variant={variant} {...value} />
            ))}
          </>
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
      <Pagination pageSize={12} totalCount={1} totalPages={1} />
      <Wrapper
        css={css`
          width: 100%;
          display: flex;
          gap: 20px;
          justify-content: center;
        `}
      >
        <Wrapper.Item
          css={css`
            width: 134px;
          `}
        >
          <FormSelect
            option={{
              name: 'serachType',
              values: ['제목', '본문', '제목+본문'],
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
