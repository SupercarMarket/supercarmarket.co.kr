import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import theme, { pretendard } from 'constants/theme';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/globalStyles';
import { DefaultSeo } from 'next-seo';
import { seoConfig } from 'utils/next-seo.config';

const Nope: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>;

function MyApp({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: false,
            useErrorBoundary: true,
          },
          mutations: {
            useErrorBoundary: true,
          },
        },
      })
  );
  const Layout = (Component as any).Layout || Nope;

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <SessionProvider session={session}>
            <DefaultSeo
              openGraph={{
                ...seoConfig.headSeo,
              }}
              {...seoConfig.defaultNextSeo}
            />
            <GlobalStyle />
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
            <style jsx global>{`
              :root {
                --pretendard: ${pretendard.style.fontFamily};
              }
            `}</style>
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
