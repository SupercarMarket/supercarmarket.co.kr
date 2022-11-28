import Container from 'components/common/container';
import DEVICE_LIST from 'constants/device';
import styled from 'styled-components';

import { applyMediaQuery } from './mediaQuery';

const width = {
  desktop: 1200,
  wideDesktop: 1200,
};

const Responsive = styled.div`
  ${DEVICE_LIST.map(
    (device) => `${applyMediaQuery(device)} {
    width: ${width[device]}px;
  }`
  )}
`;

export { Responsive };
