import * as React from 'react';
import {
  DeviceInfoContext,
  DeviceInfoContextType,
} from 'feature/DeviceProvider';

export const useDeviceInfo = (): DeviceInfoContextType => {
  const { userAgent, isMobile, isIos, isAndroid } =
    React.useContext(DeviceInfoContext);

  return {
    userAgent,
    isMobile,
    isIos,
    isAndroid,
  };
};
