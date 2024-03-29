import type { DehydratedState } from '@tanstack/react-query';
import type { NextComponentType, NextPageContext } from 'next';
import type { Router } from 'next/router';
import type { Session } from 'next-auth';

export declare module 'next/app' {
  type AppProps<P = Record<string, unknown>> = {
    Component: NextComponentType<NextPageContext, any, P>;
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P & {
      session?: Session;
      dehydratedState: DehydratedState;
    };
  };
}
