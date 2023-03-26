import { useUrlQuery } from '@supercarmarket/hooks';
import { Container, Pagination, Tab, Table, Wrapper } from '@supercarmarket/ui';
import { css } from 'styled-components';
import { usePartnership } from 'utils/api/partnership';
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
    keyword,
    size = '20',
    region = '전국',
    category = 'all',
  } = useUrlQuery();
  const { data: partnerships } = usePartnership({
    pageSize: size,
    region,
    category: _category || category,
    keyword,
    page,
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
