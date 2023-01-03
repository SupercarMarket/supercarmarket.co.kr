'use client';

import Button from 'components/common/button';
import Container from 'components/common/container';
import Typography from 'components/common/typography';
import { AccountRoute } from 'constants/account';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AccountNavbarProps {
  accountRoutes: AccountRoute[];
}

const AccountNavbar = ({ accountRoutes }: AccountNavbarProps) => {
  const pathname = usePathname();
  // console.log(pathname, accountRoutes);
  return (
    <Container
      display="flex"
      gap="9px"
      alignItems="center"
      justifyContent="flex-start"
    >
      {accountRoutes.map((accountRoute) => (
        <Button key={accountRoute.title} variant="Line" border="rounded">
          <Link href={accountRoute.route}>
            <Typography
              as="span"
              fontSize="body-16"
              fontWeight="regular"
              lineHeight="150%"
              color="black"
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
