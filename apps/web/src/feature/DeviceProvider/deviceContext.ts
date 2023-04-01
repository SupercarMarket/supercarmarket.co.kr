import * as React from 'react';

export interface DeviceInfoContextType {
  userAgent: string;
  isMobile: boolean;
  isIos: boolean;
  isAndroid: boolean;
}

export const DeviceInfoContext = React.createContext<DeviceInfoContextType>({
  userAgent: '',
  isMobile: false,
  isIos: false,
  isAndroid: false,
});
