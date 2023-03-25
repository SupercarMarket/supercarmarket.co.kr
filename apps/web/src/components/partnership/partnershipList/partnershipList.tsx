import { useUrlQuery } from '@supercarmarket/hooks';
import { Container, Pagination, Table, Wrapper } from '@supercarmarket/ui';
import usePartnership from 'hooks/queries/usePartnership';
import { css } from 'styled-components';
import PartnershipCard from '../partnershipCard';

interface PartnershipListProps {
  category: string;
  pagination?: boolean;
}

const PartnershipList = (props: PartnershipListProps) => {
  const { category: _category, pagination } = props;
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
          {pagination && (
            <Pagination
              pageSize={partnerships.page}
              totalCount={partnerships.totalCount}
              totalPages={partnerships.totalPages}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default PartnershipList;
