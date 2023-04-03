import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';
import { ServerStyleSheet } from 'styled-components';
import { pretendard } from './_app';

const APP_NAME = '슈퍼카마켓';
const APP_DESCRIPTION = '안녕하세요 슈퍼카 마켓입니다.';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
  render(): JSX.Element {
    return (
      <Html lang="ko" className={pretendard.className}>
        <Head>
          {/* meta */}
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          {/* 서치 콘솔 */}
          <meta
            name="naver-site-verification"
            content="64a0a231db514bb40ad2899c67e3595109ef6b93"
          />
          <meta
            name="google-site-verification"
            content="Py_afcHdJUFmCzWGXB-EmHItssuvcAhBGPpHjCoa05c"
          />
          {/* favicon */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/logo/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/logo/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/logo/favicon-16x16.png"
          />
          <link rel="manifest" href="/images/logo/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/images/logo/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/pwa/icon-144x144.png"
          />
          <link rel="manifest" href="/manifest.json" />
          {/* 구글 애널리틱스 */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body className={pretendard.className}>
          <Main />
          <div id="__portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
