import { supercarmarketCodeFormatter } from '@supercarmarket/lib';
import { Container, Wrapper } from '@supercarmarket/ui';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorFallback } from 'components/fallback';
import { PageProps } from 'pages/_app';
import { ErrorBoundary } from 'react-error-boundary';
import { css } from 'styled-components';
import Advertisement from './components/advertisement';
import Banner from './components/banner';
import { usePathname } from 'next/navigation';

const Advertisements = (props: PageProps) => {
  const { $ua } = props;
  const { hints } = $ua;
  const pathname = usePathname() || '/';

  const code = supercarmarketCodeFormatter(pathname.split('/')[1]);

  return (
    <>
      {!(pathname.includes('auth') || pathname.includes('account')) && (
        <Container>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <>
                {code === 'SM001' && (
                  <Wrapper.Item
                    css={css`
                      width: 100vw;
                      margin-left: calc(-50vw + 50%);
                    `}
                  >
                    <ErrorBoundary
                      onReset={reset}
                      fallbackRender={(props) => <ErrorFallback {...props} />}
                    >
                      <Banner isMobile={hints?.isMobile} />
                    </ErrorBoundary>
                  </Wrapper.Item>
                )}
                <Wrapper
                  css={css`
                    width: 100%;
                  `}
                >
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={(props) => <ErrorFallback {...props} />}
                  >
                    <Advertisement
                      isMobile={hints?.isMobile}
                      code={code}
                      hidden={code === 'SM001'}
                    />
                  </ErrorBoundary>
                </Wrapper>
              </>
            )}
          </QueryErrorResetBoundary>
        </Container>
      )}
    </>
  );
};

export default Advertisements;
