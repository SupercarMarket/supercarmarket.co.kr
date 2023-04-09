import * as React from 'react';
import { DeviceContext, DeviceContextType } from 'feature/DeviceProvider';

export const useDevice = (): DeviceContextType => {
  const { userAgent, isMobile, isIos, isAndroid } =
    React.useContext(DeviceContext);

  return {
    userAgent,
    isMobile,
    isIos,
    isAndroid,
  };
};
