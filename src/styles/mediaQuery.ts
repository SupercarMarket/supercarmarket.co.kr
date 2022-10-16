export type Device = 'desktop' | 'wideDesktop';
type DeviceQuery = {
  [key in Device]: string;
};

export const deviceQuery: DeviceQuery = {
  desktop: '(max-width: 1200px)',
  wideDesktop: '(min-width: 1201px)',
};

export const applyMediaQuery = (...deviceList: Device[]) =>
  '@media screen and ' +
  deviceList.map((device) => deviceQuery[device]).join(',');
