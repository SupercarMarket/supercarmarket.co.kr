import * as React from 'react';

export interface DeviceContextType {
  userAgent: string;
  isMobile: boolean;
  isIos: boolean;
  isAndroid: boolean;
}

export const DeviceContext = React.createContext<DeviceContextType>({
  userAgent: '',
  isMobile: false,
  isIos: false,
  isAndroid: false,
});
