import { useUrlQuery } from '@supercarmarket/hooks';
import {
  PartnershipDto,
  PartnershipResponse,
} from '@supercarmarket/types/partnership';
import { Container, Pagination, Tab, Table, Wrapper } from '@supercarmarket/ui';
import { PartnershipSkeleton } from 'components/fallback/loading';
import { css } from 'styled-components';
import { usePartnership } from 'utils/api/partnership/index';
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
  const {
    data: partnerships,
    isLoading,
    isFetching,
  } = usePartnership({
    pageSize: size,
    region,
    category: _category || category,
    keyword,
    page,
  });

  const DummySkeleton = Array.from({ length: 20 }, (_, i) => (
    <PartnershipSkeleton key={i} />
  ));

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
        {isLoading || isFetching
          ? DummySkeleton
          : partnerships &&
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
      {partnerships && pagination && (
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
    </Container>
  );
};

export default PartnershipList;
