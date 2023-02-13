// import Alert from 'components/common/alert';
// import Container from 'components/common/container';
// import { FormCheckbox } from 'components/common/form';
// import Table from 'components/common/table';
// import Wrapper from 'components/common/wrapper';
import { CommunityCard } from 'components/community';
import { CardSkeleton } from 'components/fallback/loading';
import InquiryCard from 'components/inquiry/inquiryCard/inquiryCard';
import MagazineCard from 'components/magazine/magazineList/magazineCard';
import MarketCard from 'components/market/marketCard';
import type { AccountTab } from 'constants/account';
import useAccountCategory from 'hooks/queries/useAccountCategory';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { css } from 'styled-components';
import type { CommunityDto } from '@supercarmarket/types/community';
import type { InquiryDto } from '@supercarmarket/types/inquiry';
import type { MagazineDto } from '@supercarmarket/types/magazine';
import type { MarketDto } from '@supercarmarket/types/market';
// import { CommunityDto } from 'types/community';
// import { InquiryDto } from 'types/inquiry';
// import { MagazineDto } from 'types/magazine';
// import type { MarketDto } from 'types/market';
import {
  Alert,
  Container,
  FormCheckbox,
  Table,
  Wrapper,
} from '@supercarmarket/ui';

interface AccountCategoryProps {
  sub: string;
  tab: AccountTab;
  isMyAccountPage: boolean;
}

type AccountCategoryItemWrapperProps = React.PropsWithChildren & {
  hidden: boolean;
  id: string;
  handleCheckbox?: () => void;
};

const AccountCategoryItemWrapper = ({
  id,
  hidden,
  children,
  handleCheckbox,
}: AccountCategoryItemWrapperProps) => {
  return (
    <Container display="flex" alignItems="center">
      {hidden && (
        <Wrapper
          css={css`
            padding: 0 11.5px;
          `}
        >
          <FormCheckbox
            name={id}
            id={id}
            hidden={hidden}
            onChange={handleCheckbox}
          />
        </Wrapper>
      )}
      {children}
    </Container>
  );
};

const AccountCategory = React.memo(function AccountCategory({
  sub,
  tab,
  isMyAccountPage,
}: AccountCategoryProps) {
  const session = useSession();
  const hidden = isMyAccountPage && tab !== 'magazine';
  const { data, isLoading, isFetching } = useAccountCategory(
    sub,
    session.data?.accessToken,
    {
      category: tab,
      page: 1,
      size: 20,
    }
  );

  if (isFetching || isLoading) return <CardSkeleton variant="row" />;

  return (
    <Container margin="80px 0">
      <Table tab={tab} hidden={hidden} padding="0 0 6px 0" />
      {data?.data.length < 1 ? (
        <Wrapper
          css={css`
            padding-top: 35px;
          `}
        >
          <Alert severity="info" title="게시글이 존재하지 않습니다." />
        </Wrapper>
      ) : (
        {
          product: data.data.map((d: MarketDto) => (
            <AccountCategoryItemWrapper key={d.id} id={d.id} hidden={hidden}>
              <MarketCard {...d} />
            </AccountCategoryItemWrapper>
          )),
          magazine: data.data.map((d: MagazineDto) => (
            <AccountCategoryItemWrapper key={d.id} id={d.id} hidden={hidden}>
              <MagazineCard key={d.id} {...d} />
            </AccountCategoryItemWrapper>
          )),
          comment: data.data.map((d: CommunityDto) => (
            <AccountCategoryItemWrapper key={d.id} id={d.id} hidden={hidden}>
              <CommunityCard key={d.id} variant="row" {...d} />
            </AccountCategoryItemWrapper>
          )),
          community: data.data.map((d: CommunityDto) => (
            <AccountCategoryItemWrapper key={d.id} id={d.id} hidden={hidden}>
              <CommunityCard key={d.id} variant="row" {...d} />
            </AccountCategoryItemWrapper>
          )),
          inquiry: data.data.map((d: InquiryDto) => (
            <AccountCategoryItemWrapper key={d.id} id={d.id} hidden={hidden}>
              <InquiryCard key={d.id} {...d} />
            </AccountCategoryItemWrapper>
          )),
        }[tab]
      )}
    </Container>
  );
});

export default AccountCategory;
