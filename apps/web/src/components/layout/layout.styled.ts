import { applyMediaQuery } from '@supercarmarket/ui';
import DEVICE_LIST from '@supercarmarket/ui/styles/device';
import styled, { css } from 'styled-components';

const availableWidth = {
  wideDesktop: '1200px',
  desktop: '1200px',
  tablet: '768px',
  mobile: '328px',
};

const Container = styled.div`
  margin: 0 auto;
  ${DEVICE_LIST.map(
    (device) => `${applyMediaQuery(device)} {
    width: ${availableWidth[device]};
  }`
  ).join('')}
  min-height: calc(100vh - 17.5rem);
  padding-bottom: 85px;
  ${applyMediaQuery('mobile')} {
    padding-bottom: 0;
    & > .navbar {
      display: none !important;
    }
  }
`;

const footer = css`
  margin: 0 auto;
  padding-top: 1.25rem;
  ${DEVICE_LIST.map(
    (device) => `${applyMediaQuery(device)} {
    width: ${availableWidth[device]};
  }`
  ).join('')}
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const account = css`
  margin: 0 auto;
  ${DEVICE_LIST.map(
    (device) => `${applyMediaQuery(device)} {
      width: ${availableWidth[device]};
    }`
  ).join('')}
  ${applyMediaQuery('mobile')} {
    & > .navbar {
      display: none !important;
    }
  }
`;

export { account, Container, footer };
