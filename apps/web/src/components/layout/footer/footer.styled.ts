import { applyMediaQuery } from '@supercarmarket/ui';
import DEVICE_LIST from '@supercarmarket/ui/styles/device';
import { css } from 'styled-components';

const availableWidth = {
  wideDesktop: '1200px',
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
  ${applyMediaQuery('mobile')} {
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const footerLeft = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${applyMediaQuery('mobile')} {
    gap: 0;
  }
`;

const footerLeftItem = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const footerRight = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  ${applyMediaQuery('mobile')} {
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
  }
  & > div {
    display: flex;
    gap: 17px;
  }
`;

export { footer, footerLeft, footerLeftItem, footerRight };
