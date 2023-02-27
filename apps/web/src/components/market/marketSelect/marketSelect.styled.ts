import styled from 'styled-components';

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Hyphen = styled.div`
  width: 16px;
  height: 1px;
  margin: 0 8px;
  background: ${({ theme }) => theme.color.black};
`;

export { Hyphen, SelectBox };
