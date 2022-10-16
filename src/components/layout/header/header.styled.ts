import styled from 'styled-components';

const Container = styled.header`
  width: 100%;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export { Buttons, Container };
