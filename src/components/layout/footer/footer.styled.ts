import DEVICE_LIST from 'constants/device';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

const availableWidth = {
  desktop: '1200px',
  tablet: '768px',
  mobile: '375px',
};

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
  padding: 62px 0;
`;

const footerLeft = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const footerLeftItem = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const footerRight = css`
  display: flex;
  justify-content: flex-end;
  gap: 17px;
`;

export { footer, footerLeft, footerLeftItem, footerRight };
