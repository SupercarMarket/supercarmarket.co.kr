import { useUrlQuery } from '@supercarmarket/hooks';
import { Container, Pagination, Tab, Table, Wrapper } from '@supercarmarket/ui';
import usePartnership from 'hooks/queries/usePartnership';
import { css } from 'styled-components';
import PartnershipCard from '../partnershipCard';

interface PartnershipListProps {
  category: string;
  pagination?: boolean;
  tab?: boolean;
}

const PartnershipList = (props: PartnershipListProps) => {
  const { category: _category, pagination, tab } = props;
  const {
    page,
    size = '20',
    region = '전국',
    category = 'all',
    keyword,
  } = useUrlQuery();
  const { data: partnerships } = usePartnership({
    page: String(page),
    pageSize: size,
    region,
    category: _category || category,
    keyword,
  });

  return (
    <Container width="100%">
      <Table tab="partnership" hidden={false} />
      {partnerships && (
        <>
          <Wrapper
            css={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              margin-bottom: 80px;
            `}
          >
            {partnerships &&
              partnerships.data.map((p) => (
                <PartnershipCard key={p.brdSeq} {...p} />
              ))}
          </Wrapper>
          {tab && (
            <Wrapper
              css={css`
                width: 100%;
                margin-bottom: 32px;
              `}
            >
              <Tab list={`/partnership?category=${category}`} scroll />
            </Wrapper>
          )}
          {pagination && (
            <Wrapper
              css={css`
                margin-bottom: 32px;
              `}
            >
              <Pagination
                pageSize={partnerships.page}
                totalCount={partnerships.totalCount}
                totalPages={partnerships.totalPages}
              />
            </Wrapper>
          )}
        </>
      )}
    </Container>
  );
};

export default PartnershipList;
