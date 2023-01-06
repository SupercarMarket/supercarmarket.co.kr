import Container from 'components/common/container';
import { CommunityCard } from 'components/community';
import { AccountTab } from 'constants/account';
import * as React from 'react';

interface AccountCategoryProps {
  tab: AccountTab;
}

const AccountCategory = React.memo(function AccountCategory({
  tab,
}: AccountCategoryProps) {
  switch (tab) {
    case 'my-post':
      return (
        <Container margin="80px 0">
          <CommunityCard variant="row" />
          <CommunityCard variant="row" />
          <CommunityCard variant="row" />
        </Container>
      );
    case 'my-commented-post':
      return (
        <Container margin="80px 0">
          <CommunityCard variant="row" />
          <CommunityCard variant="row" />
          <CommunityCard variant="row" />
          <CommunityCard variant="row" />
        </Container>
      );
    default:
      return (
        <Container>
          <h1>알맞은 탭이 없습니다.</h1>
        </Container>
      );
  }
});

export default AccountCategory;
