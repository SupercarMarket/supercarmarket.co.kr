import { Button, Container, Typography } from '@supercarmarket/ui';
import { AccountRoute, AccountTab } from 'constants/account';
import Link from 'next/link';

interface AccountNavbarProps {
  accountRoutes: AccountRoute[];
  tab: AccountTab;
}

const AccountNavbar = ({ accountRoutes, tab }: AccountNavbarProps) => {
  return (
    <Container
      display="flex"
      gap="9px"
      alignItems="center"
      justifyContent="flex-start"
    >
      {accountRoutes.map((accountRoute) => (
        <Button
          key={accountRoute.title}
          variant={accountRoute.route.endsWith(tab) ? 'Primary' : 'Line'}
          border="rounded"
        >
          <Link href={accountRoute.route}>
            <Typography
              as="span"
              fontSize="body-16"
              fontWeight="regular"
              lineHeight="150%"
              color={accountRoute.route.endsWith(tab) ? 'white' : 'black'}
            >
              {accountRoute.title}
            </Typography>
          </Link>
        </Button>
      ))}
    </Container>
  );
};

export default AccountNavbar;
