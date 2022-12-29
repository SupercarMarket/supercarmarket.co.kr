import { AuthProvider } from 'feature/authProvider';
import { PropsWithChildren } from 'react';

import Layout from './layout';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <AuthProvider>{children}</AuthProvider>
    </Layout>
  );
};

export default AuthLayout;
