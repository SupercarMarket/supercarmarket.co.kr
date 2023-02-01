import DEVICE_LIST from 'constants/device';
import styled, { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

const availableWidth = {
  desktop: '1200px',
  tablet: '768px',
  mobile: '375px',
};

const Container = styled.div`
  margin: 0 auto;
  padding-top: 1.25rem;
  ${DEVICE_LIST.map(
    (device) => `${applyMediaQuery(device)} {
    width: ${availableWidth[device]};
  }`
  ).join('')}
  min-height: calc(100vh - 1.25rem);
  padding-bottom: 85px;
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
`;

export { account, Container, footer };
