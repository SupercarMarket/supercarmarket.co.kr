import { useUrlQuery } from '@supercarmarket/hooks';
import { Container, Table, Wrapper } from '@supercarmarket/ui';
import usePartnership from 'hooks/queries/usePartnership';
import { css } from 'styled-components';
import PartnershipCard from '../partnershipCard';

interface PartnershipListProps {
  category: string;
}

const PartnershipList = (props: PartnershipListProps) => {
  const { category: _category } = props;
  const {
    page,
    size = '20',
    region = '전국',
    category = 'all',
    keyword,
  } = useUrlQuery();
  const {
    data: partnerships,
    isLoading,
    isFetching,
  } = usePartnership({
    page: String(page),
    pageSize: size,
    region,
    category: _category || category,
    keyword,
  });

  if (isLoading || isFetching) return <div>loading..</div>;

  return (
    <Container width="100%">
      <Table tab="partnership" hidden={false} />
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
    </Container>
  );
};

export default PartnershipList;
