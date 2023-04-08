import * as React from 'react';
import type { PropsWithChildren } from 'react';
import { DeviceContext } from './deviceContext';

export interface DeviceInfoProviderProps {
  $ua: {
    userAgent?: string;
    hints?: {
      isMobile: boolean;
    };
  };
}

const validateMobile = (userAgent: string) => /mobi/gi.test(userAgent);
const validateIos = (userAgent: string) => /iPhone|iPod|iPad/gi.test(userAgent);
const validateAndroid = (userAgent: string) => /Android/gi.test(userAgent);

export const DeviceProvider = ({
  $ua: { userAgent, hints },
  children,
}: PropsWithChildren<DeviceInfoProviderProps>) => {
  const clientUserAgent = userAgent ?? globalThis.navigator?.userAgent ?? '';
  const [isMobile] = React.useState<boolean>(
    hints?.isMobile ?? validateMobile(clientUserAgent)
  );

  const isIos = validateIos(clientUserAgent);
  const isAndroid = validateAndroid(clientUserAgent);

  const value = React.useMemo(
    () => ({ userAgent: clientUserAgent, isMobile, isIos, isAndroid }),
    [clientUserAgent, isAndroid, isIos, isMobile]
  );

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};
