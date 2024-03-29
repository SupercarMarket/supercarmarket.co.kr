export type Device = 'wideDesktop' | 'desktop' | 'tablet' | 'mobile';
type DeviceQuery = {
  [key in Device]: string;
};

export const deviceQuery: DeviceQuery = {
  wideDesktop: '(min-width: 1920px)',
  desktop: '(min-width: 1200px)',
  tablet: '(min-width: 768px) and (max-width: 1199px)',
  mobile: '(min-width: 100px) and (max-width: 767px)',
};

export const applyMediaQuery = (...deviceList: Device[]) =>
  '@media screen and ' +
  deviceList.map((device) => deviceQuery[device]).join(',');
