import theme from 'constants/theme';
import type { AppProps } from 'next/app';
import type { FC, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/globalStyles';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../../mocks');
}

const Nope: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Nope;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
