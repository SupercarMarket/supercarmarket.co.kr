'use client';

import styled from 'styled-components';

const Divider = styled.div`
  display: inline-block;
  width: 1px;
  height: 16px;
  background: ${({ theme }) => theme.color['greyScale-4']};
`;

export { Divider };
