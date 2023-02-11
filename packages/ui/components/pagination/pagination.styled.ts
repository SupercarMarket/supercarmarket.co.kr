import styled from 'styled-components';

import Button from '../button';

const PaginationItemContainer = styled.div`
  width: 34.49px;
  height: 34.49px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  text-align: 150%;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  color: ${({ theme }) => theme.color['greyScale-6']};
  &[data-active='true'] {
    background-color: ${({ theme }) => theme.color['primary']};
    color: ${({ theme }) => theme.color['white']};
  }
  &:hover {
    background-color: ${({ theme }) => theme.color['primary']};
    color: ${({ theme }) => theme.color['white']};
  }
`;

const PaginationButton = styled(Button)`
  box-sizing: border-box;
  padding: 10px !important;
  margin: 0 !important;
  border-radius: 16px !important;
  svg {
    fill: #8e8e95;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export { PaginationButton, PaginationItemContainer };
