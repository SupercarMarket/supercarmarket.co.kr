import styled from 'styled-components';

const ModalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalCallWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color['primary-lighten']};
  padding: 10px 22px;
  margin-bottom: 8px;
  border-radius: 4px;
`;

export { ModalButtonWrapper, ModalCallWrapper };
