import DEVICE_LIST from './device';
import styled from 'styled-components';

import { applyMediaQuery } from './mediaQuery';

const width = {
  desktop: 1200,
  tablet: 768,
  mobile: 375,
};

const Responsive = styled.div`
  ${DEVICE_LIST.map(
    (device) => `${applyMediaQuery(device)} {
    width: ${width[device]}px;
  }`
  )}
`;

export { Responsive };
