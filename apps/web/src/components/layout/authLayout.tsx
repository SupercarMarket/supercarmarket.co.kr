import { PropsWithChildren } from 'react';

import Layout from './layout';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <Layout>{children}</Layout>;
};

export default AuthLayout;
